/**
 * ECCCO Question Preloader
 * 
 * Intelligent preloading system for exam questions with adaptive loading
 * based on user behavior, network conditions, and device capabilities.
 */

import { performanceCache, CacheKeys, CacheTTL } from './cache';

interface PreloadConfig {
  enabled: boolean;
  maxConcurrentRequests: number;
  batchSize: number;
  prefetchRadius: number; // How many questions ahead/behind to preload
  adaptiveLoading: boolean;
  respectDataSaver: boolean;
}

interface NetworkInfo {
  effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
  downlink: number;
  saveData: boolean;
}

interface PreloadMetrics {
  questionsPreloaded: number;
  cacheHitRate: number;
  averageLoadTime: number;
  networkCondition: string;
  lastPreloadTime: number;
}

class QuestionPreloader {
  private static instance: QuestionPreloader;
  private config: PreloadConfig = {
    enabled: true,
    maxConcurrentRequests: 3,
    batchSize: 5,
    prefetchRadius: 3,
    adaptiveLoading: true,
    respectDataSaver: true,
  };
  
  private metrics: PreloadMetrics = {
    questionsPreloaded: 0,
    cacheHitRate: 0,
    averageLoadTime: 0,
    networkCondition: 'unknown',
    lastPreloadTime: 0,
  };

  private activeRequests = new Set<string>();
  private preloadQueue: Array<{ key: string; loader: () => Promise<any>; priority: number }> = [];
  private isProcessingQueue = false;

  private constructor() {
    this.detectNetworkConditions();
    this.setupAdaptiveConfiguration();
  }

  static getInstance(): QuestionPreloader {
    if (!QuestionPreloader.instance) {
      QuestionPreloader.instance = new QuestionPreloader();
    }
    return QuestionPreloader.instance;
  }

  /**
   * Preload questions for an exam topic
   */
  async preloadExamQuestions(
    topicId: string,
    totalQuestions: number = 30,
    currentIndex: number = 0
  ): Promise<void> {
    if (!this.config.enabled || this.shouldSkipPreload()) {
      return;
    }

    const startTime = performance.now();

    try {
      // Calculate preload range
      const startIndex = Math.max(0, currentIndex - this.config.prefetchRadius);
      const endIndex = Math.min(totalQuestions - 1, currentIndex + this.config.prefetchRadius);

      // Create preload tasks
      const preloadTasks: Array<{
        key: string;
        loader: () => Promise<any>;
        priority: number;
      }> = [];

      for (let i = startIndex; i <= endIndex; i++) {
        const questionKey = CacheKeys.questionDetail(`${topicId}-${i}`);
        
        if (!performanceCache.has(questionKey)) {
          const priority = this.calculatePriority(i, currentIndex);
          preloadTasks.push({
            key: questionKey,
            loader: () => this.loadQuestionData(topicId, i),
            priority,
          });
        }
      }

      // Sort by priority and process
      preloadTasks.sort((a, b) => b.priority - a.priority);
      
      // Add to queue
      this.preloadQueue.push(...preloadTasks);
      
      // Process queue if not already processing
      if (!this.isProcessingQueue) {
        this.processPreloadQueue();
      }

      const endTime = performance.now();
      this.updateMetrics(preloadTasks.length, endTime - startTime);

    } catch (error) {
      console.error('Question preload failed:', error);
    }
  }

  /**
   * Preload all questions for a topic (background loading)
   */
  async preloadTopicQuestions(topicId: string): Promise<void> {
    if (!this.config.enabled || this.shouldSkipPreload()) {
      return;
    }

    const questionsKey = CacheKeys.questions(topicId);
    
    try {
      // Check if questions are already cached
      let questions = performanceCache.get(questionsKey);
      
      if (!questions) {
        // Load questions list first
        questions = await this.loadTopicQuestions(topicId);
        performanceCache.set(questionsKey, questions, CacheTTL.MEDIUM);
      }

      // Preload individual question details in background
      if (Array.isArray(questions)) {
        const preloadTasks = questions.map((_, index) => ({
          key: CacheKeys.questionDetail(`${topicId}-${index}`),
          loader: () => this.loadQuestionData(topicId, index),
          priority: 1, // Low priority for background loading
        }));

        // Add to queue with low priority
        this.preloadQueue.push(...preloadTasks);
        
        if (!this.isProcessingQueue) {
          this.processPreloadQueue();
        }
      }

    } catch (error) {
      console.error(`Failed to preload topic questions for ${topicId}:`, error);
    }
  }

  /**
   * Prefetch adjacent questions based on current position
   */
  async prefetchAdjacentQuestions(
    topicId: string,
    currentIndex: number,
    totalQuestions: number
  ): Promise<void> {
    if (!this.config.enabled) return;

    const adjacentIndices = this.getAdjacentIndices(currentIndex, totalQuestions);
    
    const prefetchTasks = adjacentIndices.map(index => ({
      key: CacheKeys.questionDetail(`${topicId}-${index}`),
      loader: () => this.loadQuestionData(topicId, index),
      priority: this.calculatePriority(index, currentIndex),
    }));

    this.preloadQueue.push(...prefetchTasks);
    
    if (!this.isProcessingQueue) {
      this.processPreloadQueue();
    }
  }

  /**
   * Get preload metrics
   */
  getMetrics(): PreloadMetrics {
    return { ...this.metrics };
  }

  /**
   * Update preload configuration
   */
  updateConfig(newConfig: Partial<PreloadConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Clear preload queue and active requests
   */
  clearQueue(): void {
    this.preloadQueue = [];
    this.activeRequests.clear();
  }

  // Private methods

  private async processPreloadQueue(): Promise<void> {
    if (this.isProcessingQueue || this.preloadQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    try {
      while (this.preloadQueue.length > 0) {
        // Respect concurrent request limit
        if (this.activeRequests.size >= this.config.maxConcurrentRequests) {
          await new Promise(resolve => setTimeout(resolve, 100));
          continue;
        }

        // Take highest priority item
        const task = this.preloadQueue.shift();
        if (!task) break;

        // Skip if already cached or being loaded
        if (performanceCache.has(task.key) || this.activeRequests.has(task.key)) {
          continue;
        }

        // Start loading
        this.activeRequests.add(task.key);
        
        this.loadWithRetry(task.key, task.loader)
          .finally(() => {
            this.activeRequests.delete(task.key);
          });

        // Small delay to prevent overwhelming
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    } finally {
      this.isProcessingQueue = false;
    }
  }

  private async loadWithRetry(
    key: string,
    loader: () => Promise<any>,
    maxRetries: number = 2
  ): Promise<void> {
    let attempts = 0;
    
    while (attempts <= maxRetries) {
      try {
        const data = await loader();
        performanceCache.set(key, data, CacheTTL.MEDIUM);
        this.metrics.questionsPreloaded++;
        return;
      } catch (error) {
        attempts++;
        if (attempts > maxRetries) {
          console.error(`Failed to load ${key} after ${maxRetries} retries:`, error);
          return;
        }
        
        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempts) * 1000)
        );
      }
    }
  }

  private async loadTopicQuestions(topicId: string): Promise<any[]> {
    const response = await fetch(`/api/questions?topicId=${topicId}&limit=30`);
    if (!response.ok) {
      throw new Error(`Failed to load questions for topic ${topicId}`);
    }
    return response.json();
  }

  private async loadQuestionData(topicId: string, index: number): Promise<any> {
    // This would load specific question data - for now return placeholder
    // In real implementation, this might load additional question details,
    // explanations, references, or related content
    return {
      topicId,
      index,
      loadedAt: Date.now(),
      // Additional question data would go here
    };
  }

  private calculatePriority(questionIndex: number, currentIndex: number): number {
    const distance = Math.abs(questionIndex - currentIndex);
    
    if (distance === 0) return 10; // Current question
    if (distance === 1) return 8;  // Adjacent questions
    if (distance <= 3) return 5;   // Nearby questions
    return 1; // Distant questions
  }

  private getAdjacentIndices(currentIndex: number, totalQuestions: number): number[] {
    const indices: number[] = [];
    
    // Previous questions
    for (let i = 1; i <= this.config.prefetchRadius; i++) {
      const prevIndex = currentIndex - i;
      if (prevIndex >= 0) {
        indices.push(prevIndex);
      }
    }
    
    // Next questions
    for (let i = 1; i <= this.config.prefetchRadius; i++) {
      const nextIndex = currentIndex + i;
      if (nextIndex < totalQuestions) {
        indices.push(nextIndex);
      }
    }
    
    return indices;
  }

  private shouldSkipPreload(): boolean {
    // Respect user's data saver preference
    if (this.config.respectDataSaver && this.getNetworkInfo()?.saveData) {
      return true;
    }

    // Skip on slow networks
    const networkInfo = this.getNetworkInfo();
    if (networkInfo && (networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g')) {
      return true;
    }

    // Skip if recently preloaded
    if (Date.now() - this.metrics.lastPreloadTime < 5000) {
      return true;
    }

    return false;
  }

  private detectNetworkConditions(): void {
    const connection = this.getNetworkInfo();
    if (connection) {
      this.metrics.networkCondition = connection.effectiveType;
      
      // Adapt configuration based on network
      if (connection.effectiveType === '4g' && connection.downlink > 10) {
        this.config.maxConcurrentRequests = 5;
        this.config.batchSize = 8;
      } else if (connection.effectiveType === '3g') {
        this.config.maxConcurrentRequests = 3;
        this.config.batchSize = 5;
      } else {
        this.config.maxConcurrentRequests = 2;
        this.config.batchSize = 3;
      }
    }
  }

  private getNetworkInfo(): NetworkInfo | null {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        saveData: connection.saveData,
      };
    }
    return null;
  }

  private setupAdaptiveConfiguration(): void {
    if (typeof window === 'undefined') return;

    // Adapt to device memory
    if ('deviceMemory' in navigator) {
      const memory = (navigator as any).deviceMemory;
      if (memory <= 2) {
        // Low memory device
        this.config.prefetchRadius = 2;
        this.config.maxConcurrentRequests = 2;
      } else if (memory >= 8) {
        // High memory device
        this.config.prefetchRadius = 5;
        this.config.maxConcurrentRequests = 6;
      }
    }

    // Adapt to CPU cores
    if ('hardwareConcurrency' in navigator) {
      const cores = navigator.hardwareConcurrency;
      if (cores >= 8) {
        this.config.maxConcurrentRequests = Math.min(cores - 2, 8);
      }
    }
  }

  private updateMetrics(preloadedCount: number, loadTime: number): void {
    this.metrics.questionsPreloaded += preloadedCount;
    this.metrics.lastPreloadTime = Date.now();
    
    // Update average load time
    const currentAverage = this.metrics.averageLoadTime;
    this.metrics.averageLoadTime = currentAverage === 0 
      ? loadTime 
      : (currentAverage + loadTime) / 2;
    
    // Update cache hit rate
    const cacheStats = performanceCache.getStats();
    this.metrics.cacheHitRate = cacheStats.hitRate;
  }
}

// Export singleton instance
export const questionPreloader = QuestionPreloader.getInstance();

// React hook for question preloading
export function useQuestionPreloader() {
  return {
    preloadExamQuestions: questionPreloader.preloadExamQuestions.bind(questionPreloader),
    preloadTopicQuestions: questionPreloader.preloadTopicQuestions.bind(questionPreloader),
    prefetchAdjacentQuestions: questionPreloader.prefetchAdjacentQuestions.bind(questionPreloader),
    getMetrics: questionPreloader.getMetrics.bind(questionPreloader),
    updateConfig: questionPreloader.updateConfig.bind(questionPreloader),
    clearQueue: questionPreloader.clearQueue.bind(questionPreloader),
  };
}