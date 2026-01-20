import { logger } from '@/lib/logger';
// Cache utilities for production optimization
type CacheOptions = {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
};

class InMemoryCache {
  private cache = new Map<string, { value: any; expiry: number }>();
  private maxSize: number;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 1000;
  }

  set(key: string, value: any, ttl: number = 60000): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Global cache instances
export const questionCache = new InMemoryCache({ maxSize: 2000, ttl: 300000 }); // 5 minutes
export const topicCache = new InMemoryCache({ maxSize: 500, ttl: 600000 }); // 10 minutes
export const userCache = new InMemoryCache({ maxSize: 1000, ttl: 180000 }); // 3 minutes

// Cache key generators
export const cacheKeys = {
  question: (id: string) => `question:${id}`,
  questionsByTopic: (topicId: string) => `questions:topic:${topicId}`,
  topicsList: () => 'topics:all',
  topicById: (id: string) => `topic:${id}`,
  userProfile: (id: string) => `user:${id}`,
  examResults: (userId: string, examId: string) => `results:${userId}:${examId}`,
  leaderboard: (moduleId?: string) => `leaderboard${moduleId ? `:${moduleId}` : ''}`,
  questionStats: (questionId: string) => `stats:question:${questionId}`,
};

// Cached database operations
export async function getCachedQuestions(topicId: string, fetcher: () => Promise<any[]>) {
  const cacheKey = cacheKeys.questionsByTopic(topicId);
  let cached = questionCache.get(cacheKey);
  
  if (!cached) {
    cached = await fetcher();
    questionCache.set(cacheKey, cached);
  }
  
  return cached;
}

export async function getCachedTopics(fetcher: () => Promise<any[]>) {
  const cacheKey = cacheKeys.topicsList();
  let cached = topicCache.get(cacheKey);
  
  if (!cached) {
    cached = await fetcher();
    topicCache.set(cacheKey, cached);
  }
  
  return cached;
}

export async function getCachedUserProfile(userId: string, fetcher: () => Promise<any>) {
  const cacheKey = cacheKeys.userProfile(userId);
  let cached = userCache.get(cacheKey);
  
  if (!cached) {
    cached = await fetcher();
    userCache.set(cacheKey, cached);
  }
  
  return cached;
}

// Cache invalidation utilities
export function invalidateQuestionCaches(topicId?: string) {
  if (topicId) {
    questionCache.delete(cacheKeys.questionsByTopic(topicId));
  } else {
    // Clear all question caches - simplified approach
    questionCache.clear();
  }
}

export function invalidateUserCache(userId: string) {
  userCache.delete(cacheKeys.userProfile(userId));
  // Also clear related exam results
  // This is a simple implementation - in production you might want more sophisticated cache tagging
}

// Automatic cache cleanup (run periodically)
setInterval(() => {
  questionCache.cleanup();
  topicCache.cleanup();
  userCache.cleanup();
}, 300000); // Every 5 minutes

// Higher-order function for caching API responses
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  getCacheKey: (...args: Parameters<T>) => string,
  cache: InMemoryCache = questionCache,
  ttl: number = 300000
): T {
  return (async (...args: Parameters<T>) => {
    const cacheKey = getCacheKey(...args);
    let result = cache.get(cacheKey);
    
    if (!result) {
      result = await fn(...args);
      cache.set(cacheKey, result, ttl);
    }
    
    return result;
  }) as T;
}

// Performance monitoring integration
export function getCacheStats() {
  return {
    questions: {
      size: questionCache.size(),
      maxSize: 2000,
    },
    topics: {
      size: topicCache.size(),
      maxSize: 500,
    },
    users: {
      size: userCache.size(),
      maxSize: 1000,
    },
  };
}

// Response compression utility
export function shouldCompress(req: Request): boolean {
  const acceptEncoding = req.headers.get('accept-encoding') || '';
  return acceptEncoding.includes('gzip') || acceptEncoding.includes('br');
}

// Static asset optimization
export const staticAssetConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    sizes: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200],
    quality: 80,
  },
  fonts: {
    preload: ['Inter-Regular.woff2', 'Inter-Medium.woff2', 'Inter-SemiBold.woff2'],
  },
};

// Bundle size monitoring
export function logBundleMetrics() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      const resources = performance.getEntriesByType('resource');
      
      logger.debug('Page Load Metrics:', {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        pageLoad: navigation.loadEventEnd - navigation.loadEventStart,
        totalResources: resources.length,
        jsResources: resources.filter(r => r.name.includes('.js')).length,
        cssResources: resources.filter(r => r.name.includes('.css')).length,
      });
    });
  }
}