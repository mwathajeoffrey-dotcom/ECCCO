import { logger } from '@/lib/logger';
/**
 * Evidence Synthesis Caching Layer
 *
 * Caches synthesis results to provide instant responses for common queries
 * Uses Vercel KV for distributed caching (with in-memory fallback)
 */

let kv: any;
let useInMemoryCache = false;
const inMemoryCache = new Map<string, any>();

// Check if Vercel KV environment variables are set
const hasKvEnv = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

if (hasKvEnv) {
  try {
    // Try to use Vercel KV
    const kvModule = await import("@vercel/kv");
    kv = kvModule.kv;
    logger.debug("[Cache] ✅ Using Vercel KV for distributed caching");
  } catch (error) {
    useInMemoryCache = true;
    logger.debug("[Cache] ⚠️ Vercel KV import failed, using in-memory cache");
  }
} else {
  // Use in-memory cache if no environment variables
  useInMemoryCache = true;
  logger.debug("[Cache] 💾 Using in-memory cache (Vercel KV not configured)");
}

if (useInMemoryCache) {
  kv = {
    get: async (key: string) => inMemoryCache.get(key),
    set: async (key: string, value: any, options?: any) => {
      inMemoryCache.set(key, value);
      return "OK";
    },
    del: async (key: string) => inMemoryCache.delete(key),
    keys: async (pattern: string) =>
      Array.from(inMemoryCache.keys()).filter((k) => k.startsWith(pattern.replace("*", ""))),
  };
}

export interface CacheEntry {
  query: string;
  synthesis: any;
  timestamp: number;
  expiresAt: number;
}

const CACHE_TTL_DAYS = 7; // Cache for 7 days
const CACHE_PREFIX = "evidence:synthesis:";

/**
 * Normalize query for consistent cache keys
 */
function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/[^\w\s]/g, ""); // Remove punctuation
}

/**
 * Get cached synthesis if available and fresh
 */
export async function getCachedSynthesis(query: string): Promise<any | null> {
  try {
    const normalizedQuery = normalizeQuery(query);
    const cacheKey = `${CACHE_PREFIX}${normalizedQuery}`;

    const cached = (await kv.get(cacheKey)) as CacheEntry | null;

    if (!cached) {
      logger.debug(`[Cache] MISS - No cached result for: "${query}"`);
      return null;
    }

    // Check if cache is still fresh
    const now = Date.now();
    if (now > cached.expiresAt) {
      logger.debug(`[Cache] EXPIRED - Cached result too old for: "${query}"`);
      await kv.del(cacheKey); // Clean up expired entry
      return null;
    }

    const ageMinutes = Math.round((now - cached.timestamp) / 1000 / 60);
    logger.debug(`[Cache] ⚡ HIT - Using cached result from ${ageMinutes} minutes ago for: "${query}"`);

    return cached.synthesis;
  } catch (error) {
    logger.error("[Cache] Error reading from cache:", error);
    return null; // Fail gracefully
  }
}

/**
 * Cache synthesis results
 */
export async function cacheSynthesis(query: string, synthesis: any): Promise<void> {
  try {
    const normalizedQuery = normalizeQuery(query);
    const cacheKey = `${CACHE_PREFIX}${normalizedQuery}`;

    const now = Date.now();
    const expiresAt = now + CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;

    const entry: CacheEntry = {
      query,
      synthesis,
      timestamp: now,
      expiresAt,
    };

    await kv.set(cacheKey, entry, {
      ex: CACHE_TTL_DAYS * 24 * 60 * 60, // Auto-expire in Redis
    });

    logger.debug(`[Cache] STORED - Cached synthesis for: "${query}" (expires in ${CACHE_TTL_DAYS} days)`);
  } catch (error) {
    logger.error("[Cache] Error writing to cache:", error);
    // Don't throw - caching failure shouldn't break the app
  }
}

/**
 * Invalidate cache for a specific query
 */
export async function invalidateCache(query: string): Promise<void> {
  try {
    const normalizedQuery = normalizeQuery(query);
    const cacheKey = `${CACHE_PREFIX}${normalizedQuery}`;

    await kv.del(cacheKey);
    logger.debug(`[Cache] INVALIDATED - Removed cache for: "${query}"`);
  } catch (error) {
    logger.error("[Cache] Error invalidating cache:", error);
  }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
  totalEntries: number;
  queries: string[];
}> {
  try {
    // Scan for all cache keys
    const keys = await kv.keys(`${CACHE_PREFIX}*`);

    const queries: string[] = [];
    for (const key of keys) {
      const entry = (await kv.get(key)) as CacheEntry | null;
      if (entry) {
        queries.push(entry.query);
      }
    }

    return {
      totalEntries: keys.length,
      queries,
    };
  } catch (error) {
    logger.error("[Cache] Error getting cache stats:", error);
    return { totalEntries: 0, queries: [] };
  }
}

/**
 * Clear all cached syntheses (use carefully!)
 */
export async function clearAllCache(): Promise<number> {
  try {
    const keys = await kv.keys(`${CACHE_PREFIX}*`);

    if (keys.length === 0) {
      return 0;
    }

    // Delete all cache entries
    await Promise.all(keys.map((key: string) => kv.del(key)));

    logger.debug(`[Cache] CLEARED - Removed ${keys.length} cached entries`);
    return keys.length;
  } catch (error) {
    logger.error("[Cache] Error clearing cache:", error);
    return 0;
  }
}
