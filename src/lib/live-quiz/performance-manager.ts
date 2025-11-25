// Performance optimization and scaling manager for live quiz sessions
import { EventEmitter } from 'events';
import { logger } from '@/lib/logger';
import { Redis } from 'ioredis';

export interface PerformanceMetrics {
  connectionCount: number;
  messageRate: number;
  memoryUsage: number;
  cpuUsage: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
}

export interface ConnectionPool {
  id: string;
  connections: Set<string>;
  maxConnections: number;
  currentLoad: number;
  healthy: boolean;
  lastHealthCheck: number;
}

export interface MessageQueue {
  id: string;
  messages: QueuedMessage[];
  processing: boolean;
  maxSize: number;
  priority: MessagePriority;
}

export interface QueuedMessage {
  id: string;
  sessionId: string;
  type: string;
  data: any;
  priority: MessagePriority;
  timestamp: number;
  attempts: number;
  maxAttempts: number;
}

export enum MessagePriority {
  LOW = 1,
  NORMAL = 2,
  HIGH = 3,
  CRITICAL = 4,
}

export class LiveQuizPerformanceManager extends EventEmitter {
  private static instance: LiveQuizPerformanceManager;
  
  // Performance monitoring
  private metrics: PerformanceMetrics = {
    connectionCount: 0,
    messageRate: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    responseTime: 0,
    errorRate: 0,
    throughput: 0,
  };

  // Connection pooling
  private connectionPools: Map<string, ConnectionPool> = new Map();
  private readonly maxConnectionsPerPool = 1000;
  private readonly maxPoolsPerServer = 10;

  // Message queuing
  private messageQueues: Map<string, MessageQueue> = new Map();
  private readonly maxMessageQueueSize = 10000;
  private readonly processingInterval = 100; // 100ms
  
  // Redis for horizontal scaling
  private redis: Redis | null = null;
  private redisSubscriber: Redis | null = null;
  private readonly redisPrefix = 'lq_perf:';

  // Memory management
  private readonly maxMemoryThreshold = 512 * 1024 * 1024; // 512MB
  private memoryCleanupInterval: NodeJS.Timeout | null = null;

  // Performance tracking
  private performanceHistory: PerformanceMetrics[] = [];
  private readonly maxHistorySize = 1000;
  private lastMetricsUpdate = 0;

  private constructor() {
    super();
    this.initializeRedis();
    this.startPerformanceMonitoring();
    this.startMessageProcessing();
    this.startMemoryManagement();
  }

  static getInstance(): LiveQuizPerformanceManager {
    if (!LiveQuizPerformanceManager.instance) {
      LiveQuizPerformanceManager.instance = new LiveQuizPerformanceManager();
    }
    return LiveQuizPerformanceManager.instance;
  }

  // Initialize Redis for scaling
  private async initializeRedis() {
    try {
      if (process.env.REDIS_URL) {
        this.redis = new Redis(process.env.REDIS_URL, {
          maxRetriesPerRequest: 3,
        });

        this.redisSubscriber = new Redis(process.env.REDIS_URL, {
          maxRetriesPerRequest: 3,
        });

        // Subscribe to performance events from other instances
        await this.redisSubscriber.subscribe(`${this.redisPrefix}events`);
        this.redisSubscriber.on('message', (channel, message) => {
          this.handleRedisMessage(channel, message);
        });

        logger.info('Redis initialized for performance scaling');
      }
    } catch (error) {
      logger.warn('Redis not available for performance scaling', error as Error);
    }
  }

  // Handle Redis messages from other instances
  private handleRedisMessage(channel: string, message: string) {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'metrics_update':
          this.handleRemoteMetricsUpdate(data.metrics);
          break;
        case 'load_balance_request':
          this.handleLoadBalanceRequest(data);
          break;
        case 'scale_event':
          this.handleScaleEvent(data);
          break;
      }
    } catch (error) {
      logger.error('Error handling Redis message', error as Error);
    }
  }

  // Connection pool management
  createConnectionPool(poolId: string): ConnectionPool {
    const pool: ConnectionPool = {
      id: poolId,
      connections: new Set(),
      maxConnections: this.maxConnectionsPerPool,
      currentLoad: 0,
      healthy: true,
      lastHealthCheck: Date.now(),
    };

    this.connectionPools.set(poolId, pool);
    
    logger.info('Connection pool created', { poolId, maxConnections: pool.maxConnections });
    return pool;
  }

  // Add connection to optimal pool
  addConnection(connectionId: string, sessionId: string): string | null {
    try {
      // Find the best pool (least loaded, healthy)
      let bestPool: ConnectionPool | null = null;
      let lowestLoad = Infinity;

      for (const pool of this.connectionPools.values()) {
        if (pool.healthy && pool.connections.size < pool.maxConnections && pool.currentLoad < lowestLoad) {
          bestPool = pool;
          lowestLoad = pool.currentLoad;
        }
      }

      // Create new pool if needed and within limits
      if (!bestPool && this.connectionPools.size < this.maxPoolsPerServer) {
        const newPoolId = `pool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        bestPool = this.createConnectionPool(newPoolId);
      }

      if (!bestPool) {
        logger.warn('No available connection pools', { 
          totalPools: this.connectionPools.size,
          connectionId,
          sessionId,
        });
        return null;
      }

      // Add connection to pool
      bestPool.connections.add(connectionId);
      bestPool.currentLoad = this.calculatePoolLoad(bestPool);
      
      this.metrics.connectionCount++;
      
      logger.debug('Connection added to pool', {
        poolId: bestPool.id,
        connectionId,
        poolSize: bestPool.connections.size,
        poolLoad: bestPool.currentLoad,
      });

      return bestPool.id;

    } catch (error) {
      logger.error('Error adding connection to pool', error as Error);
      return null;
    }
  }

  // Remove connection from pool
  removeConnection(connectionId: string, poolId?: string): boolean {
    try {
      if (poolId) {
        const pool = this.connectionPools.get(poolId);
        if (pool && pool.connections.has(connectionId)) {
          pool.connections.delete(connectionId);
          pool.currentLoad = this.calculatePoolLoad(pool);
          this.metrics.connectionCount--;
          
          // Remove empty pools
          if (pool.connections.size === 0) {
            this.connectionPools.delete(poolId);
            logger.debug('Empty connection pool removed', { poolId });
          }
          
          return true;
        }
      } else {
        // Search all pools
        for (const [id, pool] of this.connectionPools.entries()) {
          if (pool.connections.has(connectionId)) {
            pool.connections.delete(connectionId);
            pool.currentLoad = this.calculatePoolLoad(pool);
            this.metrics.connectionCount--;
            
            if (pool.connections.size === 0) {
              this.connectionPools.delete(id);
            }
            
            return true;
          }
        }
      }

      return false;

    } catch (error) {
      logger.error('Error removing connection from pool', error as Error);
      return false;
    }
  }

  // Calculate pool load based on connections and activity
  private calculatePoolLoad(pool: ConnectionPool): number {
    const connectionRatio = pool.connections.size / pool.maxConnections;
    // Add message rate and other factors here if available
    return connectionRatio * 100;
  }

  // Message queue management
  queueMessage(sessionId: string, message: any, priority: MessagePriority = MessagePriority.NORMAL): boolean {
    try {
      const queueId = this.getQueueId(sessionId);
      let queue = this.messageQueues.get(queueId);

      if (!queue) {
        queue = {
          id: queueId,
          messages: [],
          processing: false,
          maxSize: this.maxMessageQueueSize,
          priority: MessagePriority.NORMAL,
        };
        this.messageQueues.set(queueId, queue);
      }

      if (queue.messages.length >= queue.maxSize) {
        // Remove oldest low-priority messages
        queue.messages = queue.messages
          .filter(m => m.priority >= MessagePriority.HIGH)
          .sort((a, b) => b.priority - a.priority)
          .slice(0, queue.maxSize - 1);
      }

      const queuedMessage: QueuedMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sessionId,
        type: message.type,
        data: message.data,
        priority,
        timestamp: Date.now(),
        attempts: 0,
        maxAttempts: priority >= MessagePriority.HIGH ? 5 : 3,
      };

      // Insert based on priority
      const insertIndex = queue.messages.findIndex(m => m.priority < priority);
      if (insertIndex === -1) {
        queue.messages.push(queuedMessage);
      } else {
        queue.messages.splice(insertIndex, 0, queuedMessage);
      }

      return true;

    } catch (error) {
      logger.error('Error queuing message', error as Error);
      return false;
    }
  }

  // Process message queues
  private async processMessageQueues() {
    for (const [queueId, queue] of this.messageQueues.entries()) {
      if (queue.processing || queue.messages.length === 0) {
        continue;
      }

      queue.processing = true;

      try {
        const message = queue.messages.shift();
        if (!message) {
          queue.processing = false;
          continue;
        }

        const success = await this.deliverMessage(message);
        
        if (!success) {
          message.attempts++;
          if (message.attempts < message.maxAttempts) {
            // Re-queue with lower priority
            message.priority = Math.max(message.priority - 1, MessagePriority.LOW);
            queue.messages.unshift(message);
          } else {
            logger.warn('Message delivery failed after max attempts', {
              messageId: message.id,
              sessionId: message.sessionId,
              attempts: message.attempts,
            });
          }
        }

        this.metrics.throughput++;

      } catch (error) {
        logger.error('Error processing message queue', error as Error);
      } finally {
        queue.processing = false;
      }

      // Remove empty queues
      if (queue.messages.length === 0) {
        this.messageQueues.delete(queueId);
      }
    }
  }

  // Deliver message to session
  private async deliverMessage(message: QueuedMessage): Promise<boolean> {
    try {
      const startTime = Date.now();
      
      // This would integrate with the WebSocket manager
      // For now, we'll simulate delivery
      await new Promise(resolve => setTimeout(resolve, 10)); // Simulate network delay
      
      const responseTime = Date.now() - startTime;
      this.updateResponseTime(responseTime);
      
      return true;

    } catch (error) {
      this.metrics.errorRate++;
      logger.error('Message delivery failed', error as Error);
      return false;
    }
  }

  // Get queue ID for session (implement sharding logic)
  private getQueueId(sessionId: string): string {
    const hash = this.simpleHash(sessionId);
    const shardId = hash % 10; // 10 shards
    return `queue_${shardId}`;
  }

  // Simple hash function for sharding
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Memory management
  private startMemoryManagement() {
    this.memoryCleanupInterval = setInterval(() => {
      this.performMemoryCleanup();
    }, 60 * 1000); // Every minute
  }

  private performMemoryCleanup() {
    try {
      const memUsage = process.memoryUsage();
      this.metrics.memoryUsage = memUsage.heapUsed;

      if (memUsage.heapUsed > this.maxMemoryThreshold) {
        logger.warn('High memory usage detected, performing cleanup', {
          heapUsed: memUsage.heapUsed,
          threshold: this.maxMemoryThreshold,
        });

        // Clean up old performance history
        if (this.performanceHistory.length > this.maxHistorySize / 2) {
          this.performanceHistory = this.performanceHistory.slice(-this.maxHistorySize / 2);
        }

        // Clean up old message queues
        const cutoffTime = Date.now() - 5 * 60 * 1000; // 5 minutes ago
        for (const [queueId, queue] of this.messageQueues.entries()) {
          queue.messages = queue.messages.filter(m => m.timestamp > cutoffTime);
          if (queue.messages.length === 0) {
            this.messageQueues.delete(queueId);
          }
        }

        // Force garbage collection if available
        if (global.gc) {
          global.gc();
        }

        this.emit('memory_cleanup', {
          beforeCleanup: memUsage.heapUsed,
          afterCleanup: process.memoryUsage().heapUsed,
        });
      }

    } catch (error) {
      logger.error('Error during memory cleanup', error as Error);
    }
  }

  // Performance monitoring
  private startPerformanceMonitoring() {
    setInterval(() => {
      this.updatePerformanceMetrics();
    }, 5000); // Every 5 seconds
  }

  private updatePerformanceMetrics() {
    try {
      const now = Date.now();
      const interval = now - this.lastMetricsUpdate;
      
      if (interval === 0) return;

      // Calculate message rate
      const messageRate = (this.metrics.throughput / interval) * 1000; // Messages per second
      this.metrics.messageRate = messageRate;

      // Update memory usage
      this.metrics.memoryUsage = process.memoryUsage().heapUsed;

      // Calculate CPU usage (simplified)
      const cpuUsage = process.cpuUsage();
      this.metrics.cpuUsage = (cpuUsage.user + cpuUsage.system) / 1000000; // Convert to seconds

      // Store metrics history
      this.performanceHistory.push({ ...this.metrics });
      if (this.performanceHistory.length > this.maxHistorySize) {
        this.performanceHistory.shift();
      }

      // Publish metrics to Redis for other instances
      if (this.redis) {
        this.redis.publish(`${this.redisPrefix}events`, JSON.stringify({
          type: 'metrics_update',
          metrics: this.metrics,
          timestamp: now,
        })).catch(error => {
          logger.error('Error publishing metrics to Redis', error);
        });
      }

      // Check for performance issues
      this.checkPerformanceThresholds();

      this.lastMetricsUpdate = now;
      this.emit('metrics_updated', this.metrics);

    } catch (error) {
      logger.error('Error updating performance metrics', error as Error);
    }
  }

  // Check performance thresholds and trigger scaling events
  private checkPerformanceThresholds() {
    const issues: string[] = [];

    if (this.metrics.connectionCount > this.maxConnectionsPerPool * this.maxPoolsPerServer * 0.8) {
      issues.push('High connection count');
      this.emit('scale_required', { type: 'connections', current: this.metrics.connectionCount });
    }

    if (this.metrics.responseTime > 1000) {
      issues.push('High response time');
      this.emit('performance_degraded', { type: 'response_time', value: this.metrics.responseTime });
    }

    if (this.metrics.errorRate > 0.05) { // 5% error rate
      issues.push('High error rate');
      this.emit('error_threshold_exceeded', { rate: this.metrics.errorRate });
    }

    if (this.metrics.memoryUsage > this.maxMemoryThreshold) {
      issues.push('High memory usage');
      this.emit('memory_pressure', { usage: this.metrics.memoryUsage });
    }

    if (issues.length > 0) {
      logger.warn('Performance issues detected', { issues, metrics: this.metrics });
    }
  }

  // Handle remote metrics updates
  private handleRemoteMetricsUpdate(remoteMetrics: PerformanceMetrics) {
    // Aggregate metrics from multiple instances
    this.emit('remote_metrics', remoteMetrics);
  }

  // Handle load balance requests
  private handleLoadBalanceRequest(data: any) {
    const currentLoad = this.getCurrentLoad();
    
    if (this.redis) {
      this.redis.publish(`${this.redisPrefix}load_response`, JSON.stringify({
        instanceId: process.env.INSTANCE_ID || 'unknown',
        currentLoad,
        availableCapacity: this.getAvailableCapacity(),
        timestamp: Date.now(),
      }));
    }
  }

  // Handle scaling events
  private handleScaleEvent(data: any) {
    this.emit('scale_event', data);
  }

  // Update response time
  private updateResponseTime(responseTime: number) {
    this.metrics.responseTime = (this.metrics.responseTime * 0.9) + (responseTime * 0.1); // Moving average
  }

  // Get current load percentage
  getCurrentLoad(): number {
    const connectionLoad = this.metrics.connectionCount / (this.maxConnectionsPerPool * this.maxPoolsPerServer);
    const memoryLoad = this.metrics.memoryUsage / this.maxMemoryThreshold;
    const responseTimeLoad = Math.min(this.metrics.responseTime / 1000, 1); // Normalize to 0-1
    
    return Math.max(connectionLoad, memoryLoad, responseTimeLoad) * 100;
  }

  // Get available capacity
  getAvailableCapacity(): number {
    return Math.max(0, 100 - this.getCurrentLoad());
  }

  // Get performance metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Get performance history
  getPerformanceHistory(limit?: number): PerformanceMetrics[] {
    return limit ? this.performanceHistory.slice(-limit) : [...this.performanceHistory];
  }

  // Start message processing
  private startMessageProcessing() {
    setInterval(() => {
      this.processMessageQueues();
    }, this.processingInterval);
  }

  // Shutdown cleanup
  shutdown() {
    if (this.memoryCleanupInterval) {
      clearInterval(this.memoryCleanupInterval);
    }
    
    if (this.redis) {
      this.redis.disconnect();
    }
    
    if (this.redisSubscriber) {
      this.redisSubscriber.disconnect();
    }

    this.connectionPools.clear();
    this.messageQueues.clear();
    
    logger.info('Performance manager shut down');
  }
}

// Export singleton instance
export const liveQuizPerformanceManager = LiveQuizPerformanceManager.getInstance();