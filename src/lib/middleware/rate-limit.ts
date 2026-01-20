import { logger } from '@/lib/logger';
// Rate limiting middleware for API routes
import { NextRequest } from 'next/server';

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store for rate limiting (use Redis in production)
const store: RateLimitStore = {};

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 60000); // Clean every minute

export function rateLimit(options: RateLimitOptions) {
  return async (request: NextRequest): Promise<Response | null> => {
    try {
      // Get client IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
         request.headers.get('x-real-ip') || 
         'unknown';

      const key = `${ip}:${request.nextUrl.pathname}`;
      const now = Date.now();
      
      // Initialize or get existing record
      if (!store[key] || store[key].resetTime < now) {
        store[key] = {
          count: 1,
          resetTime: now + options.windowMs,
        };
        return null; // Allow request
      }

      // Increment count
      store[key].count++;

      // Check if limit exceeded
      if (store[key].count > options.max) {
        return Response.json(
          { error: options.message },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Limit': options.max.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': Math.ceil(store[key].resetTime / 1000).toString(),
              'Retry-After': Math.ceil((store[key].resetTime - now) / 1000).toString(),
            },
          }
        );
      }

      // Add rate limit headers to successful requests
      request.headers.set('X-RateLimit-Limit', options.max.toString());
      request.headers.set('X-RateLimit-Remaining', (options.max - store[key].count).toString());
      request.headers.set('X-RateLimit-Reset', Math.ceil(store[key].resetTime / 1000).toString());

      return null; // Allow request

    } catch (error) {
      logger.error('Rate limiting error:', error);
      return null; // Allow request on error
    }
  };
}

// Specific rate limiters for common use cases
export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many API requests from this IP, please try again later.',
});

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
});

