/**
 * Rate Limiting Service with Redis Support
 * Prevents API abuse and DDoS attacks in serverless environment
 * Uses Vercel KV (Redis) for distributed rate limiting
 */

import { kv } from '@vercel/kv';

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed
   */
  limit: number;
  
  /**
   * Time window in seconds
   */
  window: number;
  
  /**
   * Unique identifier for the rate limit (e.g., IP address, user ID)
   */
  identifier: string;
  
  /**
   * Optional namespace for grouping rate limits
   */
  namespace?: string;
}

export interface RateLimitResult {
  /**
   * Whether the request is allowed
   */
  allowed: boolean;
  
  /**
   * Number of requests remaining in current window
   */
  remaining: number;
  
  /**
   * Total limit for the window
   */
  limit: number;
  
  /**
   * When the rate limit window resets (Unix timestamp)
   */
  resetAt: number;
  
  /**
   * Current request count
   */
  current: number;
}

/**
 * Check if a request is within rate limits using Redis
 * 
 * @param config - Rate limit configuration
 * @returns Rate limit result
 * 
 * @example
 * ```typescript
 * const result = await checkRateLimit({
 *   identifier: req.ip,
 *   limit: 100,
 *   window: 60, // 1 minute
 *   namespace: 'api'
 * });
 * 
 * if (!result.allowed) {
 *   return new Response('Too Many Requests', { 
 *     status: 429,
 *     headers: {
 *       'X-RateLimit-Limit': result.limit.toString(),
 *       'X-RateLimit-Remaining': '0',
 *       'X-RateLimit-Reset': result.resetAt.toString()
 *     }
 *   });
 * }
 * ```
 */
export async function checkRateLimit(
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { limit, window, identifier, namespace = 'global' } = config;
  
  // Create unique key for this rate limit
  const key = `ratelimit:${namespace}:${identifier}`;
  
  // Get current timestamp in seconds
  const now = Math.floor(Date.now() / 1000);
  
  // Calculate reset time (start of next window)
  const resetAt = now + window;
  
  try {
    // Use Redis INCR for atomic counter increment
    const current = await kv.incr(key);
    
    // Set expiry on first request
    if (current === 1) {
      await kv.expire(key, window);
    }
    
    const allowed = current <= limit;
    const remaining = Math.max(0, limit - current);
    
    return {
      allowed,
      remaining,
      limit,
      resetAt,
      current,
    };
  } catch (error) {
    // Fallback: Allow request if Redis is unavailable
    // Log error for monitoring
    console.error('Rate limit check failed:', error);
    
    return {
      allowed: true,
      remaining: limit,
      limit,
      resetAt,
      current: 0,
    };
  }
}

/**
 * Reset rate limit for a specific identifier
 * Useful for administrative purposes or testing
 * 
 * @param identifier - The identifier to reset
 * @param namespace - Optional namespace
 */
export async function resetRateLimit(
  identifier: string,
  namespace: string = 'global'
): Promise<void> {
  const key = `ratelimit:${namespace}:${identifier}`;
  
  try {
    await kv.del(key);
  } catch (error) {
    console.error('Failed to reset rate limit:', error);
    throw error;
  }
}

/**
 * Get current rate limit status without incrementing counter
 * 
 * @param identifier - The identifier to check
 * @param namespace - Optional namespace
 * @param limit - The configured limit
 * @returns Current rate limit status
 */
export async function getRateLimitStatus(
  identifier: string,
  namespace: string = 'global',
  limit: number
): Promise<Pick<RateLimitResult, 'current' | 'remaining' | 'limit'>> {
  const key = `ratelimit:${namespace}:${identifier}`;
  
  try {
    const current = (await kv.get<number>(key)) || 0;
    const remaining = Math.max(0, limit - current);
    
    return {
      current,
      remaining,
      limit,
    };
  } catch (error) {
    console.error('Failed to get rate limit status:', error);
    return {
      current: 0,
      remaining: limit,
      limit,
    };
  }
}

/**
 * Middleware helper to add rate limit headers to responses
 * 
 * @param headers - Headers object to modify
 * @param result - Rate limit result
 */
export function addRateLimitHeaders(
  headers: Headers,
  result: RateLimitResult
): void {
  headers.set('X-RateLimit-Limit', result.limit.toString());
  headers.set('X-RateLimit-Remaining', result.remaining.toString());
  headers.set('X-RateLimit-Reset', result.resetAt.toString());
  
  if (!result.allowed) {
    headers.set('Retry-After', (result.resetAt - Math.floor(Date.now() / 1000)).toString());
  }
}

/**
 * Pre-configured rate limiters for common use cases
 */
export const rateLimiters = {
  /**
   * Strict rate limit for authentication endpoints
   * 5 requests per 15 minutes
   */
  auth: (identifier: string) => checkRateLimit({
    identifier,
    limit: 5,
    window: 900, // 15 minutes
    namespace: 'auth',
  }),
  
  /**
   * Standard rate limit for API endpoints
   * 100 requests per minute
   */
  api: (identifier: string) => checkRateLimit({
    identifier,
    limit: 100,
    window: 60,
    namespace: 'api',
  }),
  
  /**
   * Generous rate limit for public content
   * 1000 requests per hour
   */
  public: (identifier: string) => checkRateLimit({
    identifier,
    limit: 1000,
    window: 3600,
    namespace: 'public',
  }),
  
  /**
   * Very strict rate limit for expensive operations
   * 10 requests per hour
   */
  expensive: (identifier: string) => checkRateLimit({
    identifier,
    limit: 10,
    window: 3600,
    namespace: 'expensive',
  }),
};
