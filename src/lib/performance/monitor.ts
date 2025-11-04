/**
 * ECCCO Performance Monitoring
 * 
 * Real-time performance monitoring for page load times, API responses,
 * user interactions, and system resource usage.
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

interface PageLoadMetrics {
  domContentLoaded: number;
  loadComplete: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

interface APIMetrics {
  endpoint: string;
  method: string;
  responseTime: number;
  status: number;
  timestamp: number;
  cacheHit: boolean;
}

interface UserInteractionMetrics {
  type: 'click' | 'scroll' | 'input' | 'navigation';
  element: string;
  duration: number;
  timestamp: number;
}

interface SystemMetrics {
  memoryUsage: number;
  cpuUsage: number;
  networkSpeed: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  batteryLevel?: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private apiMetrics: APIMetrics[] = [];
  private userMetrics: UserInteractionMetrics[] = [];
  private systemMetrics: SystemMetrics | null = null;
  private observers: Map<string, PerformanceObserver> = new Map();
  private isEnabled = true;
  private maxMetrics = 1000;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Initialize all performance monitoring
   */
  private initializeMonitoring(): void {
    this.setupPageLoadMonitoring();
    this.setupWebVitalsMonitoring();
    this.setupResourceMonitoring();
    this.setupUserInteractionMonitoring();
    this.setupSystemMonitoring();
    this.setupNetworkMonitoring();
  }

  /**
   * Track custom metric
   */
  trackMetric(name: string, value: number, tags?: Record<string, string>): void {
    if (!this.isEnabled) return;

    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      tags,
    };

    this.metrics.push(metric);
    this.trimMetrics();

    // Log critical performance issues
    if (this.isCriticalMetric(name, value)) {
      console.warn(`Performance issue detected: ${name} = ${value}`, tags);
    }
  }

  /**
   * Track API call performance
   */
  trackAPICall(
    endpoint: string,
    method: string,
    startTime: number,
    endTime: number,
    status: number,
    cacheHit: boolean = false
  ): void {
    if (!this.isEnabled) return;

    const apiMetric: APIMetrics = {
      endpoint,
      method,
      responseTime: endTime - startTime,
      status,
      timestamp: startTime,
      cacheHit,
    };

    this.apiMetrics.push(apiMetric);
    this.trimArray(this.apiMetrics, this.maxMetrics);

    // Track as general metric
    this.trackMetric('api_response_time', apiMetric.responseTime, {
      endpoint,
      method,
      status: status.toString(),
      cache_hit: cacheHit.toString(),
    });
  }

  /**
   * Track user interaction
   */
  trackUserInteraction(
    type: UserInteractionMetrics['type'],
    element: string,
    startTime: number,
    endTime?: number
  ): void {
    if (!this.isEnabled) return;

    const duration = endTime ? endTime - startTime : 0;
    
    const userMetric: UserInteractionMetrics = {
      type,
      element,
      duration,
      timestamp: startTime,
    };

    this.userMetrics.push(userMetric);
    this.trimArray(this.userMetrics, this.maxMetrics);

    this.trackMetric('user_interaction', duration, {
      type,
      element,
    });
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): {
    pageLoad: Partial<PageLoadMetrics>;
    api: {
      averageResponseTime: number;
      slowestEndpoint: string;
      errorRate: number;
      cacheHitRate: number;
    };
    user: {
      totalInteractions: number;
      averageInteractionTime: number;
      slowestInteraction: string;
    };
    system: SystemMetrics | null;
  } {
    const pageLoad = this.getPageLoadMetrics();
    const api = this.getAPIMetricsSummary();
    const user = this.getUserMetricsSummary();

    return {
      pageLoad,
      api,
      user,
      system: this.systemMetrics,
    };
  }

  /**
   * Get real-time performance score (0-100)
   */
  getPerformanceScore(): number {
    const pageLoad = this.getPageLoadMetrics();
    const api = this.getAPIMetricsSummary();
    
    let score = 100;

    // Page load score (40% weight)
    if (pageLoad.loadComplete) {
      if (pageLoad.loadComplete > 3000) score -= 30;
      else if (pageLoad.loadComplete > 2000) score -= 20;
      else if (pageLoad.loadComplete > 1000) score -= 10;
    }

    if (pageLoad.largestContentfulPaint) {
      if (pageLoad.largestContentfulPaint > 4000) score -= 20;
      else if (pageLoad.largestContentfulPaint > 2500) score -= 10;
    }

    // API performance score (30% weight)
    if (api.averageResponseTime > 2000) score -= 20;
    else if (api.averageResponseTime > 1000) score -= 10;
    else if (api.averageResponseTime > 500) score -= 5;

    if (api.errorRate > 0.1) score -= 15;
    else if (api.errorRate > 0.05) score -= 10;

    // Cache performance bonus (10% weight)
    if (api.cacheHitRate > 0.8) score += 5;
    else if (api.cacheHitRate < 0.3) score -= 5;

    // System performance (20% weight)
    if (this.systemMetrics) {
      if (this.systemMetrics.memoryUsage > 0.8) score -= 10;
      if (this.systemMetrics.networkSpeed < 1) score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Export metrics for external analysis
   */
  exportMetrics(): {
    general: PerformanceMetric[];
    api: APIMetrics[];
    user: UserInteractionMetrics[];
    system: SystemMetrics | null;
    timestamp: number;
  } {
    return {
      general: [...this.metrics],
      api: [...this.apiMetrics],
      user: [...this.userMetrics],
      system: this.systemMetrics,
      timestamp: Date.now(),
    };
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
    this.apiMetrics = [];
    this.userMetrics = [];
  }

  /**
   * Enable/disable monitoring
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  // Private methods

  private setupPageLoadMonitoring(): void {
    // Navigation timing
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const nav = entry as PerformanceNavigationTiming;
          
          this.trackMetric('dom_content_loaded', nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart);
          this.trackMetric('load_complete', nav.loadEventEnd - nav.loadEventStart);
          this.trackMetric('dns_lookup', nav.domainLookupEnd - nav.domainLookupStart);
          this.trackMetric('tcp_connect', nav.connectEnd - nav.connectStart);
          this.trackMetric('request_response', nav.responseEnd - nav.requestStart);
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });
    this.observers.set('navigation', observer);
  }

  private setupWebVitalsMonitoring(): void {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.trackMetric('first_contentful_paint', entry.startTime);
        }
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });
    this.observers.set('paint', fcpObserver);

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.trackMetric('largest_contentful_paint', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.set('lcp', lcpObserver);

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = (entry as any).processingStart - entry.startTime;
        this.trackMetric('first_input_delay', fid);
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    this.observers.set('fid', fidObserver);

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.trackMetric('cumulative_layout_shift', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    this.observers.set('cls', clsObserver);
  }

  private setupResourceMonitoring(): void {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        
        this.trackMetric('resource_load_time', resource.duration, {
          type: resource.initiatorType,
          name: resource.name.split('/').pop() || 'unknown',
        });

        // Track slow resources
        if (resource.duration > 1000) {
          this.trackMetric('slow_resource', resource.duration, {
            type: resource.initiatorType,
            name: resource.name,
          });
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
    this.observers.set('resource', observer);
  }

  private setupUserInteractionMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Click tracking
    document.addEventListener('click', (event) => {
      const element = (event.target as Element)?.tagName || 'unknown';
      this.trackUserInteraction('click', element, Date.now());
    });

    // Scroll tracking
    let scrollStart = 0;
    document.addEventListener('scroll', () => {
      if (scrollStart === 0) {
        scrollStart = Date.now();
      }
    });

    document.addEventListener('scrollend', () => {
      if (scrollStart > 0) {
        this.trackUserInteraction('scroll', 'document', scrollStart, Date.now());
        scrollStart = 0;
      }
    });
  }

  private setupSystemMonitoring(): void {
    if (typeof window === 'undefined') return;

    const updateSystemMetrics = () => {
      const memory = (performance as any).memory;
      const connection = (navigator as any).connection;
      const battery = (navigator as any).getBattery?.();

      this.systemMetrics = {
        memoryUsage: memory ? memory.usedJSHeapSize / memory.jsHeapSizeLimit : 0,
        cpuUsage: 0, // Would need more complex calculation
        networkSpeed: connection ? connection.downlink : 0,
        deviceType: this.getDeviceType(),
        batteryLevel: battery?.level,
      };

      this.trackMetric('memory_usage', this.systemMetrics.memoryUsage);
      this.trackMetric('network_speed', this.systemMetrics.networkSpeed);
    };

    updateSystemMetrics();
    setInterval(updateSystemMetrics, 30000); // Update every 30 seconds
  }

  private setupNetworkMonitoring(): void {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateNetworkInfo = () => {
        this.trackMetric('network_downlink', connection.downlink);
        this.trackMetric('network_rtt', connection.rtt);
        
        if (connection.saveData) {
          this.trackMetric('data_saver_enabled', 1);
        }
      };

      updateNetworkInfo();
      connection.addEventListener('change', updateNetworkInfo);
    }
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private isCriticalMetric(name: string, value: number): boolean {
    const thresholds: Record<string, number> = {
      'load_complete': 5000,
      'first_contentful_paint': 3000,
      'largest_contentful_paint': 4000,
      'api_response_time': 3000,
      'memory_usage': 0.9,
    };

    return name in thresholds && value > thresholds[name];
  }

  private trimMetrics(): void {
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  private trimArray<T>(array: T[], maxLength: number): void {
    if (array.length > maxLength) {
      array.splice(0, array.length - maxLength);
    }
  }

  private getPageLoadMetrics(): Partial<PageLoadMetrics> {
    const metrics: Partial<PageLoadMetrics> = {};
    
    for (const metric of this.metrics) {
      switch (metric.name) {
        case 'dom_content_loaded':
          metrics.domContentLoaded = metric.value;
          break;
        case 'load_complete':
          metrics.loadComplete = metric.value;
          break;
        case 'first_contentful_paint':
          metrics.firstContentfulPaint = metric.value;
          break;
        case 'largest_contentful_paint':
          metrics.largestContentfulPaint = metric.value;
          break;
        case 'first_input_delay':
          metrics.firstInputDelay = metric.value;
          break;
        case 'cumulative_layout_shift':
          metrics.cumulativeLayoutShift = metric.value;
          break;
      }
    }

    return metrics;
  }

  private getAPIMetricsSummary() {
    if (this.apiMetrics.length === 0) {
      return {
        averageResponseTime: 0,
        slowestEndpoint: '',
        errorRate: 0,
        cacheHitRate: 0,
      };
    }

    const totalResponseTime = this.apiMetrics.reduce((sum, m) => sum + m.responseTime, 0);
    const averageResponseTime = totalResponseTime / this.apiMetrics.length;

    const slowestMetric = this.apiMetrics.reduce((max, current) => 
      current.responseTime > max.responseTime ? current : max
    );
    const slowestEndpoint = slowestMetric.endpoint;

    const errorCount = this.apiMetrics.filter(m => m.status >= 400).length;
    const errorRate = errorCount / this.apiMetrics.length;

    const cacheHits = this.apiMetrics.filter(m => m.cacheHit).length;
    const cacheHitRate = cacheHits / this.apiMetrics.length;

    return {
      averageResponseTime,
      slowestEndpoint,
      errorRate,
      cacheHitRate,
    };
  }

  private getUserMetricsSummary() {
    if (this.userMetrics.length === 0) {
      return {
        totalInteractions: 0,
        averageInteractionTime: 0,
        slowestInteraction: '',
      };
    }

    const totalInteractions = this.userMetrics.length;
    const totalTime = this.userMetrics.reduce((sum, m) => sum + m.duration, 0);
    const averageInteractionTime = totalTime / totalInteractions;

    const slowestMetric = this.userMetrics.reduce((max, current) => 
      current.duration > max.duration ? current : max
    );
    const slowestInteraction = `${slowestMetric.type}:${slowestMetric.element}`;

    return {
      totalInteractions,
      averageInteractionTime,
      slowestInteraction,
    };
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// React hook for performance monitoring
export function usePerformanceMonitor() {
  return {
    trackMetric: performanceMonitor.trackMetric.bind(performanceMonitor),
    trackAPICall: performanceMonitor.trackAPICall.bind(performanceMonitor),
    trackUserInteraction: performanceMonitor.trackUserInteraction.bind(performanceMonitor),
    getPerformanceSummary: performanceMonitor.getPerformanceSummary.bind(performanceMonitor),
    getPerformanceScore: performanceMonitor.getPerformanceScore.bind(performanceMonitor),
    exportMetrics: performanceMonitor.exportMetrics.bind(performanceMonitor),
    clearMetrics: performanceMonitor.clearMetrics.bind(performanceMonitor),
    setEnabled: performanceMonitor.setEnabled.bind(performanceMonitor),
  };
}