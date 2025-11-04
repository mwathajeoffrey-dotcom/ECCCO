/**
 * Enhanced API Client with Performance Optimization
 * 
 * Intelligent caching, performance monitoring, and adaptive loading
 * for optimal user experience in the ECCCO platform.
 */

import { performanceCache, CacheKeys, CacheTTL } from '@/lib/performance/cache';
import { performanceMonitor } from '@/lib/performance/monitor';
import { errorTracker } from './tracking';

interface APIRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
  backoffFactor?: number;
  cache?: boolean;
  cacheTTL?: number;
  priority?: 'high' | 'normal' | 'low';
}

interface APIError extends Error {
  status: number;
  code: string;
  response?: unknown;
}

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public response?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

class EnhancedAPIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private requestQueue: Map<string, Promise<unknown>> = new Map();

  constructor(baseURL = '', defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  /**
   * Enhanced request method with caching and performance monitoring
   */
  async request<T = unknown>(
    endpoint: string,
    config: APIRequestConfig = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = 30000,
      retries = 3,
      backoffFactor = 2,
      cache = method === 'GET',
      cacheTTL = CacheTTL.MEDIUM,
      priority = 'normal',
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = cache ? this.generateCacheKey(endpoint, method, body) : null;
    
    // Check cache first for GET requests
    if (cache && method === 'GET' && cacheKey) {
      const cached = performanceCache.get<T>(cacheKey);
      if (cached) {
        performanceMonitor.trackAPICall(endpoint, method, Date.now(), Date.now(), 200, true);
        return cached;
      }
    }

    // Deduplicate concurrent requests
    const requestKey = `${method}:${endpoint}:${JSON.stringify(body || {})}`;
    if (this.requestQueue.has(requestKey)) {
      return this.requestQueue.get(requestKey) as Promise<T>;
    }

    const requestPromise = this.executeRequest<T>(
      url,
      {
        method,
        headers: { ...this.defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : undefined,
      },
      {
        endpoint,
        timeout,
        retries,
        backoffFactor,
        cache,
        cacheTTL,
        cacheKey,
        priority,
      }
    );

    // Store in queue and clean up when done
    this.requestQueue.set(requestKey, requestPromise);
    requestPromise.finally(() => {
      this.requestQueue.delete(requestKey);
    });

    return requestPromise;
  }

  /**
   * Execute the actual request with retry logic
   */
  private async executeRequest<T>(
    url: string,
    fetchConfig: RequestInit,
    options: {
      endpoint: string;
      timeout: number;
      retries: number;
      backoffFactor: number;
      cache: boolean;
      cacheTTL: number;
      cacheKey: string | null;
      priority: string;
    }
  ): Promise<T> {
    const { endpoint, timeout, retries, backoffFactor, cache, cacheTTL, cacheKey } = options;
    const method = fetchConfig.method || 'GET';
    const startTime = performance.now();
    let lastError: APIError | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.withTimeout(fetch(url, fetchConfig), timeout);

        if (!response.ok) {
          throw new APIError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            'HTTP_ERROR',
            await this.parseErrorResponse(response)
          );
        }

        const responseData = await this.parseResponse<T>(response);
        const endTime = performance.now();
        
        // Track successful API call
        performanceMonitor.trackAPICall(endpoint, method, startTime, endTime, response.status, false);
        
        // Cache successful GET responses
        if (cache && method === 'GET' && cacheKey) {
          performanceCache.set(cacheKey, responseData, cacheTTL);
        }

        return responseData;

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

        // Don't retry on client errors (except 429)
        if (apiError.status >= 400 && apiError.status < 500 && apiError.status !== 429) {
          break;
        }

        // Don't retry on the last attempt
        if (attempt === retries) {
          break;
        }

        // Wait before retrying with exponential backoff + jitter
        const baseDelay = 1000 * Math.pow(backoffFactor, attempt);
        const jitter = Math.random() * 0.1 * baseDelay;
        await this.delay(baseDelay + jitter);
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

  /**
   * Parse response based on content type
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return response.json();
    } else if (contentType?.includes('text/')) {
      return response.text() as unknown as T;
    } else {
      return response.blob() as unknown as T;
    }
  }

  /**
   * Parse error response
   */
  private async parseErrorResponse(response: Response): Promise<unknown> {
    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch {
      return response.statusText;
    }
  }

  /**
   * Generate cache key for request
   */
  private generateCacheKey(endpoint: string, method: string, body?: unknown): string {
    const bodyHash = body ? btoa(JSON.stringify(body)).slice(0, 8) : '';
    return `${method}:${endpoint}${bodyHash ? `:${bodyHash}` : ''}`;
  }

  /**
   * Timeout wrapper for fetch requests
   */
  private withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new APIError('Request timeout', 0, 'TIMEOUT'));
        }, timeoutMs);
      }),
    ]);
  }

  /**
   * Delay utility
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Batch requests with intelligent batching
   */
  async batchRequest<T>(
    requests: Array<{
      endpoint: string;
      config?: APIRequestConfig;
    }>,
    options: {
      maxConcurrency?: number;
      batchSize?: number;
      delayBetweenBatches?: number;
    } = {}
  ): Promise<T[]> {
    const {
      maxConcurrency = 6,
      batchSize = 10,
      delayBetweenBatches = 100,
    } = options;

    const results: T[] = [];
    
    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      
      // Process batch with concurrency limit
      const batchPromises = batch.map(({ endpoint, config }, index) => {
        const delay = Math.floor(index / maxConcurrency) * 50; // Stagger requests
        return new Promise<T>((resolve, reject) => {
          setTimeout(() => {
            this.request<T>(endpoint, config).then(resolve).catch(reject);
          }, delay);
        });
      });

      const batchResults = await Promise.allSettled(batchPromises);
      
      for (const result of batchResults) {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          console.error('Batch request failed:', result.reason);
          results.push(null as unknown as T);
        }
      }

      // Delay between batches
      if (i + batchSize < requests.length) {
        await this.delay(delayBetweenBatches);
      }
    }

    return results;
  }

  // Convenience methods
  async get<T = unknown>(
    endpoint: string, 
    config?: Omit<APIRequestConfig, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T = unknown>(
    endpoint: string, 
    data?: unknown, 
    config?: Omit<APIRequestConfig, 'method'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body: data });
  }

  async put<T = unknown>(
    endpoint: string, 
    data?: unknown, 
    config?: Omit<APIRequestConfig, 'method'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body: data });
  }

  async patch<T = unknown>(
    endpoint: string, 
    data?: unknown, 
    config?: Omit<APIRequestConfig, 'method'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body: data });
  }

  async delete<T = unknown>(
    endpoint: string, 
    config?: Omit<APIRequestConfig, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  /**
   * Preload endpoint data
   */
  async preload(
    endpoint: string, 
    config?: APIRequestConfig
  ): Promise<void> {
    try {
      await this.request(endpoint, { ...config, priority: 'low' });
    } catch (error) {
      // Silently fail preload requests
      console.warn(`Preload failed for ${endpoint}:`, error);
    }
  }

  /**
   * Clear cache for specific patterns
   */
  clearCache(pattern?: string): void {
    if (pattern) {
      // Would need to implement pattern matching in cache
      console.warn('Pattern-based cache clearing not implemented');
    } else {
      performanceCache.clear();
    }
  }

  /**
   * Get API performance metrics
   */
  getPerformanceMetrics() {
    return {
      cache: performanceCache.getStats(),
      monitor: performanceMonitor.getPerformanceSummary(),
    };
  }
}

// Create and export client instances
export const apiClient = new EnhancedAPIClient();

// Specific clients for different services
export const questionsAPI = new EnhancedAPIClient();
export const analyticsAPI = new EnhancedAPIClient();
export const userAPI = new EnhancedAPIClient();

// Re-export for backward compatibility
export { EnhancedAPIClient as APIClient, APIError };