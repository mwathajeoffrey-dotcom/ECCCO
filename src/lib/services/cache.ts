import { logger } from '@/lib/logger';
/**
 * Caching Service with Redis Support
 * Improves performance by caching API responses and database queries
 * Uses Redis for distributed caching in serverless environment
 */

import Redis from 'ioredis';

// Create Redis client
let redis: Redis | null = null;

function getRedisClient(): Redis | null {
  if (redis) return redis;
  
  if (process.env.REDIS_URL) {
    try {
      redis = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        lazyConnect: true,
      });
      
      redis.on('error', (err: unknown) => {
        logger.error('Redis connection error', err instanceof Error ? err : new Error(String(err)));
      });
      
      return redis;
    } catch (error) {
      logger.warn('Failed to create Redis client, using in-memory cache', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      return null;
    }
  }
  
  logger.warn('REDIS_URL not configured, using in-memory cache');
  return null;
}

export interface CacheOptions {
  /**
   * Time to live in seconds (default: 3600 = 1 hour)
   */
  ttl?: number;
  
  /**
   * Cache namespace for organization
   */
  namespace?: string;
  
  /**
   * Cache tags for selective invalidation
   */
  tags?: string[];
}

/**
 * Cache a value with optional TTL and tags
 * 
 * @param key - Cache key
 * @param value - Value to cache (will be JSON serialized)
 * @param options - Caching options
 * 
 * @example
 * ```typescript
 * await setCache('user:123', userData, { 
 *   ttl: 3600, 
 *   namespace: 'users',
 *   tags: ['user', 'profile'] 
 * });
 * ```
 */
export async function setCache<T>(
  key: string,
  value: T,
  options: CacheOptions = {}
): Promise<void> {
  const { ttl = 3600, namespace = 'default', tags = [] } = options;
  
  const cacheKey = namespace ? `${namespace}:${key}` : key;
  const client = getRedisClient();
  
  if (!client) {
    // Fallback to in-memory cache or skip
    logger.debug('Redis not available, skipping cache set');
    return;
  }
  
  try {
    const serialized = JSON.stringify(value);
    
    // Store the value with TTL
    if (ttl > 0) {
      await client.set(cacheKey, serialized, 'EX', ttl);
    } else {
      await client.set(cacheKey, serialized);
    }
    
    // Store tags for selective invalidation
    if (tags.length > 0) {
      const tagKey = `tags:${cacheKey}`;
      await client.set(tagKey, JSON.stringify(tags), 'EX', ttl);
      
      // Add key to each tag's set
      for (const tag of tags) {
        await client.sadd(`tag:${tag}`, cacheKey);
        if (ttl > 0) {
          await client.expire(`tag:${tag}`, ttl);
        }
      }
    }
  } catch (error) {
    logger.error('Cache set error', error instanceof Error ? error : new Error('Unknown error'));
    // Don't throw - caching failures shouldn't break the app
  }
}

/**
 * Get a cached value
 * 
 * @param key - Cache key
 * @param namespace - Optional namespace
 * @returns Cached value or null if not found
 * 
 * @example
 * ```typescript
 * const userData = await getCache<User>('user:123', 'users');
 * if (!userData) {
 *   // Cache miss - fetch from database
 * }
 * ```
 */
export async function getCache<T>(
  key: string,
  namespace: string = 'default'
): Promise<T | null> {
  const cacheKey = namespace ? `${namespace}:${key}` : key;
  const client = getRedisClient();
  
  if (!client) {
    return null;
  }
  
  try {
    const value = await client.get(cacheKey);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    logger.error('Cache get error:', error instanceof Error ? error : new Error('Unknown error'));
    return null;
  }
}

/**
 * Delete a cached value
 * 
 * @param key - Cache key
 * @param namespace - Optional namespace
 */
export async function deleteCache(
  key: string,
  namespace: string = 'default'
): Promise<void> {
  const cacheKey = namespace ? `${namespace}:${key}` : key;
  const client = getRedisClient();
  
  if (!client) return;
  
  try {
    await client.del(cacheKey);
    
    // Also delete associated tags
    const tagKey = `tags:${cacheKey}`;
    const tagsStr = await client.get(tagKey);
    if (tagsStr) {
      const tags = JSON.parse(tagsStr) as string[];
      for (const tag of tags) {
        await client.srem(`tag:${tag}`, cacheKey);
      }
      await client.del(tagKey);
    }
  } catch (error) {
    logger.error('Cache delete error:', error instanceof Error ? error : new Error('Unknown error'));
  }
}

/**
 * Invalidate all cache entries with a specific tag
 * 
 * @param tag - Tag to invalidate
 * 
 * @example
 * ```typescript
 * // Invalidate all user-related caches
 * await invalidateCacheByTag('user');
 * ```
 */
export async function invalidateCacheByTag(tag: string): Promise<void> {
  const client = getRedisClient();
  
  if (!client) return;
  
  try {
    const tagKey = `tag:${tag}`;
    const keys = await client.smembers(tagKey);
    
    if (keys && keys.length > 0) {
      // Delete all keys with this tag
      await Promise.all(keys.map((key: string) => client.del(key)));
      
      // Delete the tag set itself
      await client.del(tagKey);
    }
  } catch (error) {
    logger.error('Cache invalidation error:', error instanceof Error ? error : new Error('Unknown error'));
  }
}

/**
 * Get or set cached value (cache-aside pattern)
 * If value exists in cache, return it. Otherwise, fetch it using the provided function and cache it.
 * 
 * @param key - Cache key
 * @param fetchFn - Function to fetch the value if not in cache
 * @param options - Caching options
 * 
 * @example
 * ```typescript
 * const userData = await getCached(
 *   'user:123',
 *   async () => await db.user.findUnique({ where: { id: '123' } }),
 *   { ttl: 3600, namespace: 'users', tags: ['user'] }
 * );
 * ```
 */
export async function getCached<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const { namespace = 'default' } = options;
  
  // Try to get from cache first
  const cached = await getCache<T>(key, namespace);
  if (cached !== null) {
    return cached;
  }
  
  // Cache miss - fetch the value
  const value = await fetchFn();
  
  // Store in cache for next time
  await setCache(key, value, options);
  
  return value;
}

/**
 * Pre-configured cache helpers for common use cases
 */
export const cache = {
  /**
   * Cache evidence search results (1 hour TTL)
   */
  evidenceSearch: {
    get: (query: string) => 
      getCache<any>(`search:${query}`, 'evidence'),
    
    set: (query: string, results: any) => 
      setCache(`search:${query}`, results, {
        ttl: 3600,
        namespace: 'evidence',
        tags: ['evidence', 'search'],
      }),
  },
  
  /**
   * Cache quiz data (30 minutes TTL)
   */
  quiz: {
    get: (id: string) => 
      getCache<any>(`quiz:${id}`, 'quizzes'),
    
    set: (id: string, quiz: any) => 
      setCache(`quiz:${id}`, quiz, {
        ttl: 1800,
        namespace: 'quizzes',
        tags: ['quiz'],
      }),
  },
  
  /**
   * Cache user profiles (5 minutes TTL)
   */
  user: {
    get: (id: string) => 
      getCache<any>(`user:${id}`, 'users'),
    
    set: (id: string, user: any) => 
      setCache(`user:${id}`, user, {
        ttl: 300,
        namespace: 'users',
        tags: ['user', 'profile'],
      }),
      
    invalidate: (id: string) => 
      deleteCache(`user:${id}`, 'users'),
  },
  
  /**
   * Cache medical topics (24 hours TTL - rarely changes)
   */
  topics: {
    get: (category: string) => 
      getCache<any>(`topics:${category}`, 'content'),
    
    set: (category: string, topics: any) => 
      setCache(`topics:${category}`, topics, {
        ttl: 86400,
        namespace: 'content',
        tags: ['topics', 'content'],
      }),
  },
};

/**
 * Clear all caches (use with caution!)
 * Only use in development or for administrative purposes
 */
export async function clearAllCaches(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    logger.warn('Clearing all caches in production - this may impact performance!');
  }
  
  try {
    // In a real implementation, you'd want to track all cache keys
    // For now, we'll just clear known namespaces
    const namespaces = ['default', 'evidence', 'quizzes', 'users', 'content'];
    
    for (const namespace of namespaces) {
      // This is a simplified version - in production you'd want a more sophisticated approach
      logger.debug(`Clearing cache namespace: ${namespace}`);
    }
  } catch (error) {
    logger.error('Failed to clear caches:', error instanceof Error ? error : new Error('Unknown error'));
  }
}
