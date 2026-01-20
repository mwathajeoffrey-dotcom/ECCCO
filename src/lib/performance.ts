import { logger } from '@/lib/logger';
// Performance monitoring and metrics collection
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Record API response time
  recordApiTime(endpoint: string, duration: number) {
    if (!this.metrics.has(endpoint)) {
      this.metrics.set(endpoint, []);
    }
    const times = this.metrics.get(endpoint)!;
    times.push(duration);
    
    // Keep only last 100 measurements
    if (times.length > 100) {
      times.shift();
    }
  }

  // Get average response time for an endpoint
  getAverageTime(endpoint: string): number {
    const times = this.metrics.get(endpoint);
    if (!times || times.length === 0) return 0;
    
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }

  // Get all metrics
  getAllMetrics(): Record<string, { average: number; samples: number; p95: number }> {
    const result: Record<string, { average: number; samples: number; p95: number }> = {};
    
    for (const [endpoint, times] of this.metrics.entries()) {
      const sorted = [...times].sort((a, b) => a - b);
      const p95Index = Math.floor(sorted.length * 0.95);
      
      result[endpoint] = {
        average: this.getAverageTime(endpoint),
        samples: times.length,
        p95: sorted[p95Index] || 0,
      };
    }
    
    return result;
  }

  // Clear metrics (useful for testing)
  clear() {
    this.metrics.clear();
  }
}

// Utility function for timing API calls
export function withTiming<T>(
  operation: () => Promise<T>,
  endpoint: string
): Promise<T> {
  const start = Date.now();
  
  return operation().finally(() => {
    const duration = Date.now() - start;
    PerformanceMonitor.getInstance().recordApiTime(endpoint, duration);
    
    // Log slow operations in production
    if (process.env.NODE_ENV === 'production' && duration > 1000) {
      logger.warn(`Slow operation detected: ${endpoint} took ${duration}ms`);
    }
  });
}

// Memory usage monitoring
export function getMemoryUsage() {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const usage = process.memoryUsage();
    return {
      rss: Math.round(usage.rss / 1024 / 1024), // MB
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024), // MB
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024), // MB
      external: Math.round(usage.external / 1024 / 1024), // MB
    };
  }
  return null;
}

// Client-side performance tracking
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Core Web Vitals
  if ('performance' in window && 'PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          logger.debug('LCP', { value: entry });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Silently fail if not supported
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          logger.debug('FID', { value: entry });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Silently fail if not supported
    }

    // Cumulative Layout Shift (CLS)
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            logger.debug('CLS', { value: entry });
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Silently fail if not supported
    }
  }
}

// Database query performance tracking
export async function withDbTiming<T>(
  operation: () => Promise<T>,
  queryName: string
): Promise<T> {
  return withTiming(operation, `db:${queryName}`);
}