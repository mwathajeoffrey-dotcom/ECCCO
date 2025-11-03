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

export interface APIRequestConfig extends RequestInit {
  timeout?: number;
  retry?: Partial<RetryConfig>;
  skipErrorTracking?: boolean;
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

  async request<T = any>(
    endpoint: string,
    config: APIRequestConfig = {}
  ): Promise<T> {
    const {
      timeout = 30000,
      retry = {},
      skipErrorTracking = false,
      ...fetchConfig
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    const method = fetchConfig.method || 'GET';
    
    const retryConfig: RetryConfig = {
      ...DEFAULT_RETRY_CONFIG,
      ...retry
    };

    const operation = async (): Promise<T> => {
      const response = await this.withTimeout(
        fetch(url, {
          ...fetchConfig,
          headers: {
            ...this.defaultHeaders,
            ...fetchConfig.headers
          }
        }),
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