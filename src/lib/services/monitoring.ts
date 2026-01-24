/**
 * Monitoring & Analytics Service
 * Tracks performance, errors, and user behavior with privacy-first approach
 * Integrates with Sentry for error tracking and custom analytics
 */

import * as Sentry from "@sentry/nextjs";
import { logger } from "./logger";

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: "ms" | "bytes" | "count";
  tags?: Record<string, string>;
}

export interface UserEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export interface WebVitals {
  name: "CLS" | "FID" | "FCP" | "LCP" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  id: string;
}

class MonitoringService {
  private isProduction: boolean;
  private isDevelopment: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === "production";
    this.isDevelopment = process.env.NODE_ENV === "development";
  }

  /**
   * Track custom performance metric
   */
  trackPerformance(metric: PerformanceMetric): void {
    const { name, value, unit, tags } = metric;

    logger.info(`Performance: ${name}`, {
      value,
      unit,
      ...tags,
    });

    if (this.isProduction) {
      Sentry.metrics.distribution(name, value, {
        unit,
      });
    }
  }

  /**
   * Track user event (privacy-friendly - no PII)
   */
  trackEvent(event: UserEvent): void {
    const { action, category, label, value, metadata } = event;

    logger.info(`Event: ${category}/${action}`, {
      label,
      value,
      ...metadata,
    });

    if (this.isProduction) {
      Sentry.addBreadcrumb({
        category,
        message: action,
        data: { label, value, ...metadata },
        level: "info",
      });
    }
  }

  /**
   * Track Web Vitals (Core Web Vitals)
   */
  trackWebVital(metric: WebVitals): void {
    const { name, value, rating, id } = metric;

    logger.info(`Web Vital: ${name}`, {
      value,
      rating,
      id,
    });

    if (this.isProduction) {
      Sentry.metrics.distribution(`web-vital.${name.toLowerCase()}`, value, {
        unit: "millisecond",
      });
    }
  }

  /**
   * Track API call performance
   */
  async trackApiCall<T>(endpoint: string, method: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();

    try {
      const result = await fn();
      const duration = performance.now() - startTime;

      this.trackPerformance({
        name: "api.call.duration",
        value: duration,
        unit: "ms",
        tags: {
          endpoint,
          method,
          status: "success",
        },
      });

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;

      this.trackPerformance({
        name: "api.call.duration",
        value: duration,
        unit: "ms",
        tags: {
          endpoint,
          method,
          status: "error",
        },
      });

      throw error;
    }
  }

  /**
   * Track database query performance
   */
  async trackDbQuery<T>(operation: string, model: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();

    try {
      const result = await fn();
      const duration = performance.now() - startTime;

      this.trackPerformance({
        name: "db.query.duration",
        value: duration,
        unit: "ms",
        tags: {
          operation,
          model,
          status: "success",
        },
      });

      // Warn if query takes too long
      if (duration > 500) {
        logger.warn("Slow database query detected", {
          operation,
          model,
          duration,
          threshold: 500,
        });
      }

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;

      this.trackPerformance({
        name: "db.query.duration",
        value: duration,
        unit: "ms",
        tags: {
          operation,
          model,
          status: "error",
        },
      });

      throw error;
    }
  }

  /**
   * Track cache hit/miss
   */
  trackCacheEvent(hit: boolean, key: string, namespace: string): void {
    this.trackEvent({
      action: hit ? "cache_hit" : "cache_miss",
      category: "cache",
      label: namespace,
      metadata: { key },
    });

    if (this.isProduction) {
      // Sentry metrics API - using gauge instead of increment
      Sentry.metrics.gauge("cache.operation", hit ? 1 : 0, {
        unit: "none",
      });
    }
  }

  /**
   * Set user context for error tracking (no PII)
   */
  setUserContext(userId: string, role?: string): void {
    if (this.isProduction) {
      Sentry.setUser({
        id: userId,
        role,
      });
    }
  }

  /**
   * Clear user context (on logout)
   */
  clearUserContext(): void {
    if (this.isProduction) {
      Sentry.setUser(null);
    }
  }

  /**
   * Track feature usage
   */
  trackFeatureUsage(featureName: string, metadata?: Record<string, any>): void {
    this.trackEvent({
      action: "feature_used",
      category: "feature",
      label: featureName,
      metadata,
    });
  }

  /**
   * Track page view
   */
  trackPageView(path: string, title?: string): void {
    this.trackEvent({
      action: "page_view",
      category: "navigation",
      label: path,
      metadata: { title },
    });
  }
}

// Export singleton
export const monitoring = new MonitoringService();

// Convenience exports
export const track = {
  performance: (metric: PerformanceMetric) => monitoring.trackPerformance(metric),
  event: (event: UserEvent) => monitoring.trackEvent(event),
  webVital: (metric: WebVitals) => monitoring.trackWebVital(metric),
  apiCall: <T>(endpoint: string, method: string, fn: () => Promise<T>) => monitoring.trackApiCall(endpoint, method, fn),
  dbQuery: <T>(operation: string, model: string, fn: () => Promise<T>) => monitoring.trackDbQuery(operation, model, fn),
  cache: (hit: boolean, key: string, namespace: string) => monitoring.trackCacheEvent(hit, key, namespace),
  featureUsage: (featureName: string, metadata?: Record<string, any>) =>
    monitoring.trackFeatureUsage(featureName, metadata),
  pageView: (path: string, title?: string) => monitoring.trackPageView(path, title),
};

export default monitoring;
