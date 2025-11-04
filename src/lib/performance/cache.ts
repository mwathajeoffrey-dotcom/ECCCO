/**
 * ECCCO Performance Cache System
 * 
 * Provides intelligent caching for questions, topics, and exam data
 * with memory management and TTL (Time To Live) support.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
  size: number; // Approximate size in bytes
}

interface CacheStats {
  hits: number;
  misses: number;
  totalSize: number;
  entryCount: number;
  hitRate: number;
}

class PerformanceCache {
  private static instance: PerformanceCache;
  private cache = new Map<string, CacheEntry<any>>();
  private maxSize = 50 * 1024 * 1024; // 50MB max cache size
  private maxEntries = 1000;
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    totalSize: 0,
    entryCount: 0,
    hitRate: 0
  };

  private constructor() {
    // Cleanup expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
    
    // Listen for memory pressure events
    if (typeof window !== 'undefined' && 'memory' in (performance as any)) {
      setInterval(() => this.checkMemoryPressure(), 30000);
    }
  }

  static getInstance(): PerformanceCache {
    if (!PerformanceCache.instance) {
      PerformanceCache.instance = new PerformanceCache();
    }
    return PerformanceCache.instance;
  }

  /**
   * Store data in cache with TTL
   */
  set<T>(key: string, data: T, ttl: number = 30 * 60 * 1000): void {
    const size = this.estimateSize(data);
    
    // Check if adding this entry would exceed limits
    if (size > this.maxSize / 4) {
      console.warn(`Cache entry too large: ${key} (${Math.round(size / 1024)}KB)`);
      return;
    }

    // Remove old entry if exists
    if (this.cache.has(key)) {
      this.remove(key);
    }

    // Ensure we have space
    this.ensureSpace(size);

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      size
    };

    this.cache.set(key, entry);
    this.stats.totalSize += size;
    this.stats.entryCount++;
  }

  /**
   * Retrieve data from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      this.updateHitRate();
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.remove(key);
      this.stats.misses++;
      this.updateHitRate();
      return null;
    }

    this.stats.hits++;
    this.updateHitRate();
    return entry.data;
  }

  /**
   * Check if key exists and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.remove(key);
      return false;
    }
    
    return true;
  }

  /**
   * Remove specific entry
   */
  remove(key: string): boolean {
    const entry = this.cache.get(key);
    if (entry) {
      this.stats.totalSize -= entry.size;
      this.stats.entryCount--;
      return this.cache.delete(key);
    }
    return false;
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    this.cache.clear();
    this.stats.totalSize = 0;
    this.stats.entryCount = 0;
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Preload data with priority
   */
  async preload<T>(
    key: string, 
    dataLoader: () => Promise<T>, 
    priority: 'high' | 'normal' | 'low' = 'normal',
    ttl?: number
  ): Promise<T> {
    // Check if already cached
    const cached = this.get<T>(key);
    if (cached) {
      return cached;
    }

    // Set priority-based delay for non-high priority items
    if (priority === 'low') {
      await new Promise(resolve => setTimeout(resolve, 100));
    } else if (priority === 'normal') {
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    try {
      const data = await dataLoader();
      this.set(key, data, ttl);
      return data;
    } catch (error) {
      console.error(`Failed to preload ${key}:`, error);
      throw error;
    }
  }

  /**
   * Batch preload multiple items
   */
  async batchPreload<T>(
    items: Array<{
      key: string;
      loader: () => Promise<T>;
      priority?: 'high' | 'normal' | 'low';
      ttl?: number;
    }>,
    concurrency: number = 3
  ): Promise<void> {
    // Sort by priority
    const sortedItems = items.sort((a, b) => {
      const priorityOrder = { high: 0, normal: 1, low: 2 };
      return priorityOrder[a.priority || 'normal'] - priorityOrder[b.priority || 'normal'];
    });

    // Process in batches
    for (let i = 0; i < sortedItems.length; i += concurrency) {
      const batch = sortedItems.slice(i, i + concurrency);
      const promises = batch.map(item => 
        this.preload(item.key, item.loader, item.priority, item.ttl)
          .catch(error => console.error(`Batch preload failed for ${item.key}:`, error))
      );
      
      await Promise.allSettled(promises);
      
      // Small delay between batches to prevent overwhelming
      if (i + concurrency < sortedItems.length) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
  }

  // Private methods

  private estimateSize(data: any): number {
    try {
      return new Blob([JSON.stringify(data)]).size;
    } catch {
      // Fallback estimation
      const str = JSON.stringify(data);
      return str.length * 2; // Rough UTF-16 estimation
    }
  }

  private ensureSpace(requiredSize: number): void {
    while (
      this.stats.totalSize + requiredSize > this.maxSize || 
      this.stats.entryCount >= this.maxEntries
    ) {
      this.evictLRU();
    }
  }

  private evictLRU(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.remove(oldestKey);
    }
  }

  private cleanup(): void {
    const now = Date.now();
    const toRemove: string[] = [];

    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > entry.ttl) {
        toRemove.push(key);
      }
    }

    toRemove.forEach(key => this.remove(key));
  }

  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? this.stats.hits / total : 0;
  }

  private checkMemoryPressure(): void {
    if (typeof window === 'undefined') return;
    
    const memory = (performance as any).memory;
    if (memory) {
      const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
      
      // If memory usage is high, reduce cache size
      if (usageRatio > 0.8) {
        console.warn('High memory usage detected, reducing cache size');
        this.reduceCacheSize(0.5); // Reduce by 50%
      }
    }
  }

  private reduceCacheSize(factor: number): void {
    const targetSize = this.stats.totalSize * factor;
    
    while (this.stats.totalSize > targetSize && this.stats.entryCount > 0) {
      this.evictLRU();
    }
  }
}

// Export singleton instance
export const performanceCache = PerformanceCache.getInstance();

// Cache key generators
export const CacheKeys = {
  questions: (topicId: string, limit?: number) => 
    `questions:${topicId}${limit ? `:${limit}` : ''}`,
  
  topics: () => 'topics:all',
  
  questionDetail: (questionId: string) => 
    `question:${questionId}`,
  
  examSession: (sessionId: string) => 
    `session:${sessionId}`,
  
  analytics: (type: string, params?: string) => 
    `analytics:${type}${params ? `:${params}` : ''}`,
  
  userProgress: (userId: string, topicId?: string) => 
    `progress:${userId}${topicId ? `:${topicId}` : ''}`,
};

// Cache TTL constants (in milliseconds)
export const CacheTTL = {
  SHORT: 5 * 60 * 1000,      // 5 minutes
  MEDIUM: 30 * 60 * 1000,    // 30 minutes  
  LONG: 2 * 60 * 60 * 1000,  // 2 hours
  PERSISTENT: 24 * 60 * 60 * 1000, // 24 hours
};