import { errorTracker } from './tracking';

export interface APIError extends Error {
  status?: number;
  statusCode?: number;
  code?: string;
  endpoint?: string;
  method?: string;
  response?: any;
  retryable?: boolean;
}

export interface RetryConfig {
  maxRetries: number;
  delay: number;
  backoffMultiplier: number;
  retryCondition?: (error: APIError) => boolean;
  onRetry?: (attempt: number, error: APIError) => void;
}

import { performanceCache, CacheKeys, CacheTTL } from '@/lib/performance/cache';
import { performanceMonitor } from '@/lib/performance/monitor';

interface RequestConfig {
  timeout?: number;
  retries?: number;
  backoffFactor?: number;
  cache?: boolean;
  cacheTTL?: number;
  priority?: 'high' | 'normal' | 'low';
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  delay: 1000,
  backoffMultiplier: 2,
  retryCondition: (error) => {
    // Retry on network errors and 5xx errors
    return !error.status || error.status >= 500 || error.status === 0;
  },
  onRetry: (attempt, error) => {
    console.warn(`Retrying request (attempt ${attempt}):`, error.endpoint);
  }
};

class APIClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string = '', defaultHeaders: HeadersInit = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
  }

  private createAPIError(
    message: string,
    status?: number,
    endpoint?: string,
    method?: string,
    response?: any
  ): APIError {
    const error = new Error(message) as APIError;
    error.status = status;
    error.statusCode = status;
    error.endpoint = endpoint;
    error.method = method;
    error.response = response;
    error.retryable = !status || status >= 500 || status === 0;
    return error;
  }

  private async withTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number,
    endpoint: string
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(this.createAPIError(
          `Request timeout after ${timeoutMs}ms`,
          0,
          endpoint,
          'unknown'
        ));
      }, timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]);
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    config: RetryConfig,
    endpoint: string,
    method: string
  ): Promise<T> {
    let lastError: APIError;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as APIError;

        // Don't retry on the last attempt
        if (attempt === config.maxRetries) {
          break;
        }

        // Check if we should retry
        if (!config.retryCondition?.(lastError)) {
          break;
        }

        // Call retry callback
        config.onRetry?.(attempt + 1, lastError);

        // Wait before retrying with exponential backoff
        const delayMs = config.delay * Math.pow(config.backoffMultiplier, attempt);
        await this.delay(delayMs);
      }
    }

    // Track the final error
    errorTracker.logNetworkError(
      endpoint,
      method,
      lastError.status,
      JSON.stringify(lastError.response),
      { attempts: config.maxRetries + 1 }
    );

    throw lastError;
  }

  async request<T = unknown>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      timeout = 30000,
      retries = 3,
      backoffFactor = 2,
      cache = false,
      cacheTTL = CacheTTL.MEDIUM,
      priority = 'normal',
      ...requestOptions
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    const method = (requestOptions as any)?.method || 'GET';
    const cacheKey = cache ? CacheKeys.questions(endpoint) : null;
    
    // Check cache first for GET requests
    if (cache && method === 'GET' && cacheKey) {
      const cached = performanceCache.get<T>(cacheKey);
      if (cached) {
        performanceMonitor.trackAPICall(endpoint, method, Date.now(), Date.now(), 200, true);
        return cached;
      }
    }

    const startTime = performance.now();
    let lastError: APIError | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.withTimeout(
          fetch(url, {
            ...requestOptions,
            headers: {
              ...this.defaultHeaders,
              ...(requestOptions as any)?.headers
            }
          }),
          timeout
        );

        if (!response.ok) {
          throw new APIError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            'HTTP_ERROR',
            response.statusText
          );
        }

        let responseData: unknown;
        const contentType = response.headers.get('content-type');
        
        if (contentType?.includes('application/json')) {
          responseData = await response.json();
        } else {
          responseData = await response.text();
        }

        const endTime = performance.now();
        
        // Track performance
        performanceMonitor.trackAPICall(endpoint, method, startTime, endTime, response.status, false);
        
        // Cache successful GET responses
        if (cache && method === 'GET' && cacheKey) {
          performanceCache.set(cacheKey, responseData as T, cacheTTL);
        }

        return responseData as T;

      } catch (error) {
        const apiError = error instanceof APIError 
          ? error 
          : new APIError(
              `Network request failed: ${(error as Error).message}`,
              0,
              'NETWORK_ERROR',
              error
            );

        lastError = apiError;

        // Don't retry on certain errors
        if (apiError.status >= 400 && apiError.status < 500 && apiError.status !== 429) {
          break;
        }

        // Don't retry on the last attempt
        if (attempt === retries) {
          break;
        }

        // Wait before retrying with exponential backoff
        const delayMs = 1000 * Math.pow(backoffFactor, attempt);
        await this.delay(delayMs);
      }
    }

    const endTime = performance.now();
    
    // Track failed API call
    if (lastError) {
      performanceMonitor.trackAPICall(
        endpoint, 
        method, 
        startTime, 
        endTime, 
        lastError.status || 0, 
        false
      );
      
      // Log error to tracking system
      errorTracker.logNetworkError(
        endpoint,
        method,
        lastError.status || 0,
        JSON.stringify(lastError.response),
        { attempts: retries + 1 }
      );
    }

    throw lastError;
  }
        timeout,
        endpoint
      );

      // Handle non-2xx responses
      if (!response.ok) {
        let responseData: any;
        const contentType = response.headers.get('content-type');
        
        try {
          if (contentType?.includes('application/json')) {
            responseData = await response.json();
          } else {
            responseData = await response.text();
          }
        } catch {
          responseData = null;
        }

        const error = this.createAPIError(
          responseData?.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          endpoint,
          method,
          responseData
        );

        if (!skipErrorTracking) {
          errorTracker.logAPIError(
            endpoint,
            response.status,
            responseData?.code,
            error.message
          );
        }

        throw error;
      }

      // Parse successful response
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return response.json();
      }
      
      return response.text() as unknown as T;
    };

    return this.executeWithRetry(operation, retryConfig, endpoint, method);
  }

  // Convenience methods
  async get<T = any>(endpoint: string, config?: Omit<APIRequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T = any>(endpoint: string, data?: any, config?: Omit<APIRequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async put<T = any>(endpoint: string, data?: any, config?: Omit<APIRequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async patch<T = any>(endpoint: string, data?: any, config?: Omit<APIRequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async delete<T = any>(endpoint: string, config?: Omit<APIRequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// Create default API client instance
export const api = new APIClient();

// Create specialized clients for different services
export const questionsAPI = new APIClient('', {
  'X-Service': 'questions'
});

export const analyticsAPI = new APIClient('', {
  'X-Service': 'analytics'
});

// Hook for components
export function useAPI() {
  return {
    api,
    questionsAPI,
    analyticsAPI,
    createError: (message: string, status?: number, endpoint?: string) => {
      const error = new Error(message) as APIError;
      error.status = status;
      error.endpoint = endpoint;
      return error;
    }
  };
}