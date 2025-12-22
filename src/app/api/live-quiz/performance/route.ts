// Performance monitoring API for live quiz system
import { NextRequest } from 'next/server';
import { liveQuizPerformanceManager } from '@/lib/live-quiz/performance-manager';
import { auth } from '@clerk/nextjs/server';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For production, you might want to restrict this to admin users
    // if (session.user.role !== 'admin') {
    //   return Response.json({ error: 'Insufficient permissions' }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'overview';
    const timeRange = parseInt(searchParams.get('timeRange') || '3600000'); // Default 1 hour

    switch (action) {
      case 'overview':
        return getPerformanceOverview();
      
      case 'metrics':
        return getCurrentMetrics();
      
      case 'history':
        return getPerformanceHistory(timeRange);
      
      case 'pools':
        return getConnectionPools();
      
      case 'queues':
        return getMessageQueues();
      
      case 'health':
        return getSystemHealth();

      default:
        return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Error in performance monitoring API', error as Error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Get performance overview
async function getPerformanceOverview() {
  try {
    const metrics = liveQuizPerformanceManager.getMetrics();
    const currentLoad = liveQuizPerformanceManager.getCurrentLoad();
    const availableCapacity = liveQuizPerformanceManager.getAvailableCapacity();

    const overview = {
      timestamp: Date.now(),
      systemStatus: {
        currentLoad: Math.round(currentLoad * 100) / 100,
        availableCapacity: Math.round(availableCapacity * 100) / 100,
        health: currentLoad < 80 ? 'healthy' : currentLoad < 95 ? 'warning' : 'critical',
      },
      currentMetrics: {
        connections: metrics.connectionCount,
        messageRate: Math.round(metrics.messageRate * 100) / 100,
        memoryUsage: Math.round(metrics.memoryUsage / 1024 / 1024 * 100) / 100, // MB
        responseTime: Math.round(metrics.responseTime * 100) / 100,
        errorRate: Math.round(metrics.errorRate * 10000) / 100, // Percentage
        throughput: metrics.throughput,
      },
      thresholds: {
        maxConnections: 10000, // This would come from configuration
        maxMemoryMB: 512,
        maxResponseTimeMs: 1000,
        maxErrorRatePercent: 5,
      },
      recommendations: generatePerformanceRecommendations(metrics, currentLoad),
    };

    return Response.json(overview);

  } catch (error) {
    logger.error('Error getting performance overview', error as Error);
    return Response.json({ error: 'Failed to get performance overview' }, { status: 500 });
  }
}

// Get current metrics
async function getCurrentMetrics() {
  try {
    const metrics = liveQuizPerformanceManager.getMetrics();
    
    return Response.json({
      timestamp: Date.now(),
      metrics: {
        connectionCount: metrics.connectionCount,
        messageRate: metrics.messageRate,
        memoryUsageBytes: metrics.memoryUsage,
        memoryUsageMB: Math.round(metrics.memoryUsage / 1024 / 1024 * 100) / 100,
        cpuUsage: metrics.cpuUsage,
        responseTimeMs: metrics.responseTime,
        errorRate: metrics.errorRate,
        throughput: metrics.throughput,
      },
      load: {
        current: liveQuizPerformanceManager.getCurrentLoad(),
        available: liveQuizPerformanceManager.getAvailableCapacity(),
      },
    });

  } catch (error) {
    logger.error('Error getting current metrics', error as Error);
    return Response.json({ error: 'Failed to get current metrics' }, { status: 500 });
  }
}

// Get performance history
async function getPerformanceHistory(timeRange: number) {
  try {
    const history = liveQuizPerformanceManager.getPerformanceHistory();
    const cutoffTime = Date.now() - timeRange;
    
    // Filter history to time range
    const filteredHistory = history.filter((_, index) => {
      // Assuming metrics are collected every 5 seconds
      const timestamp = Date.now() - ((history.length - index - 1) * 5000);
      return timestamp > cutoffTime;
    });

    // Sample data for charting (max 200 points)
    const maxPoints = 200;
    const sampleInterval = Math.max(1, Math.floor(filteredHistory.length / maxPoints));
    const sampledHistory = filteredHistory.filter((_, index) => index % sampleInterval === 0);

    const chartData = {
      timestamps: sampledHistory.map((_, index) => 
        Date.now() - ((sampledHistory.length - index - 1) * 5000 * sampleInterval)
      ),
      connectionCount: sampledHistory.map(m => m.connectionCount),
      messageRate: sampledHistory.map(m => m.messageRate),
      memoryUsage: sampledHistory.map(m => Math.round(m.memoryUsage / 1024 / 1024)),
      responseTime: sampledHistory.map(m => m.responseTime),
      errorRate: sampledHistory.map(m => m.errorRate * 100),
      throughput: sampledHistory.map(m => m.throughput),
    };

    // Calculate trends
    const trends = calculateTrends(sampledHistory);

    return Response.json({
      timeRange,
      dataPoints: sampledHistory.length,
      sampleInterval: sampleInterval * 5000, // Convert to milliseconds
      chartData,
      trends,
      summary: {
        averageConnections: Math.round(chartData.connectionCount.reduce((a, b) => a + b, 0) / chartData.connectionCount.length),
        averageMessageRate: Math.round((chartData.messageRate.reduce((a, b) => a + b, 0) / chartData.messageRate.length) * 100) / 100,
        averageMemoryMB: Math.round(chartData.memoryUsage.reduce((a, b) => a + b, 0) / chartData.memoryUsage.length),
        averageResponseTime: Math.round((chartData.responseTime.reduce((a, b) => a + b, 0) / chartData.responseTime.length) * 100) / 100,
      },
    });

  } catch (error) {
    logger.error('Error getting performance history', error as Error);
    return Response.json({ error: 'Failed to get performance history' }, { status: 500 });
  }
}

// Get connection pools status
async function getConnectionPools() {
  try {
    // This would access the performance manager's internal state
    // For now, we'll return mock data that represents the structure
    
    const poolsData = {
      totalPools: 3, // This would come from the performance manager
      totalConnections: liveQuizPerformanceManager.getMetrics().connectionCount,
      pools: [
        {
          id: 'pool_1',
          connections: 245,
          maxConnections: 1000,
          currentLoad: 24.5,
          healthy: true,
          lastHealthCheck: Date.now() - 30000,
        },
        {
          id: 'pool_2',
          connections: 156,
          maxConnections: 1000,
          currentLoad: 15.6,
          healthy: true,
          lastHealthCheck: Date.now() - 25000,
        },
        {
          id: 'pool_3',
          connections: 89,
          maxConnections: 1000,
          currentLoad: 8.9,
          healthy: true,
          lastHealthCheck: Date.now() - 20000,
        },
      ],
      distribution: {
        healthy: 3,
        warning: 0,
        critical: 0,
      },
    };

    return Response.json(poolsData);

  } catch (error) {
    logger.error('Error getting connection pools', error as Error);
    return Response.json({ error: 'Failed to get connection pools' }, { status: 500 });
  }
}

// Get message queues status
async function getMessageQueues() {
  try {
    // This would access the performance manager's internal state
    // For now, we'll return mock data that represents the structure
    
    const queuesData = {
      totalQueues: 5,
      totalMessages: 42,
      queues: [
        {
          id: 'queue_0',
          messages: 8,
          maxSize: 10000,
          processing: false,
          priority: 'NORMAL',
          oldestMessage: Date.now() - 5000,
        },
        {
          id: 'queue_1',
          messages: 12,
          maxSize: 10000,
          processing: true,
          priority: 'HIGH',
          oldestMessage: Date.now() - 3000,
        },
        {
          id: 'queue_2',
          messages: 5,
          maxSize: 10000,
          processing: false,
          priority: 'NORMAL',
          oldestMessage: Date.now() - 8000,
        },
      ],
      processingStats: {
        totalProcessed: liveQuizPerformanceManager.getMetrics().throughput,
        averageProcessingTime: 150, // ms
        failedMessages: 2,
        retryQueue: 1,
      },
    };

    return Response.json(queuesData);

  } catch (error) {
    logger.error('Error getting message queues', error as Error);
    return Response.json({ error: 'Failed to get message queues' }, { status: 500 });
  }
}

// Get system health
async function getSystemHealth() {
  try {
    const metrics = liveQuizPerformanceManager.getMetrics();
    const currentLoad = liveQuizPerformanceManager.getCurrentLoad();

    const health = {
      timestamp: Date.now(),
      overall: currentLoad < 80 ? 'healthy' : currentLoad < 95 ? 'warning' : 'critical',
      components: {
        connections: {
          status: metrics.connectionCount < 8000 ? 'healthy' : metrics.connectionCount < 9500 ? 'warning' : 'critical',
          value: metrics.connectionCount,
          threshold: 10000,
        },
        memory: {
          status: metrics.memoryUsage < 400 * 1024 * 1024 ? 'healthy' : metrics.memoryUsage < 480 * 1024 * 1024 ? 'warning' : 'critical',
          value: metrics.memoryUsage,
          threshold: 512 * 1024 * 1024,
        },
        responseTime: {
          status: metrics.responseTime < 500 ? 'healthy' : metrics.responseTime < 1000 ? 'warning' : 'critical',
          value: metrics.responseTime,
          threshold: 1000,
        },
        errorRate: {
          status: metrics.errorRate < 0.01 ? 'healthy' : metrics.errorRate < 0.05 ? 'warning' : 'critical',
          value: metrics.errorRate,
          threshold: 0.05,
        },
        throughput: {
          status: 'healthy', // Throughput is informational
          value: metrics.throughput,
          threshold: null,
        },
      },
      recommendations: generateHealthRecommendations(metrics, currentLoad),
      nextCheckIn: Date.now() + 30000, // 30 seconds
    };

    return Response.json(health);

  } catch (error) {
    logger.error('Error getting system health', error as Error);
    return Response.json({ error: 'Failed to get system health' }, { status: 500 });
  }
}

// Calculate performance trends
function calculateTrends(history: any[]) {
  if (history.length < 2) {
    return {
      connectionCount: 'stable',
      messageRate: 'stable',
      memoryUsage: 'stable',
      responseTime: 'stable',
      errorRate: 'stable',
    };
  }

  const calculateTrend = (values: number[]) => {
    const recent = values.slice(-Math.min(10, values.length)); // Last 10 points
    if (recent.length < 2) return 'stable';
    
    const first = recent[0];
    const last = recent[recent.length - 1];
    const change = ((last - first) / first) * 100;
    
    if (Math.abs(change) < 5) return 'stable';
    return change > 0 ? 'increasing' : 'decreasing';
  };

  return {
    connectionCount: calculateTrend(history.map(h => h.connectionCount)),
    messageRate: calculateTrend(history.map(h => h.messageRate)),
    memoryUsage: calculateTrend(history.map(h => h.memoryUsage)),
    responseTime: calculateTrend(history.map(h => h.responseTime)),
    errorRate: calculateTrend(history.map(h => h.errorRate)),
  };
}

// Generate performance recommendations
function generatePerformanceRecommendations(metrics: any, currentLoad: number): string[] {
  const recommendations: string[] = [];

  if (currentLoad > 80) {
    recommendations.push('System load is high - consider scaling horizontally');
  }

  if (metrics.connectionCount > 8000) {
    recommendations.push('High connection count - monitor for capacity limits');
  }

  if (metrics.memoryUsage > 400 * 1024 * 1024) {
    recommendations.push('Memory usage is elevated - consider optimization or scaling');
  }

  if (metrics.responseTime > 500) {
    recommendations.push('Response times are elevated - check for bottlenecks');
  }

  if (metrics.errorRate > 0.02) {
    recommendations.push('Error rate is above normal - investigate error causes');
  }

  if (metrics.messageRate > 1000) {
    recommendations.push('High message rate - ensure message processing is keeping up');
  }

  if (recommendations.length === 0) {
    recommendations.push('System is performing within normal parameters');
  }

  return recommendations;
}

// Generate health recommendations
function generateHealthRecommendations(metrics: any, currentLoad: number): string[] {
  const recommendations: string[] = [];

  if (currentLoad > 95) {
    recommendations.push('URGENT: System at capacity - immediate scaling required');
  } else if (currentLoad > 80) {
    recommendations.push('Prepare for scaling - system approaching capacity limits');
  }

  if (metrics.memoryUsage > 480 * 1024 * 1024) {
    recommendations.push('High memory usage - consider memory optimization or restart');
  }

  if (metrics.responseTime > 1000) {
    recommendations.push('Poor response times - investigate performance bottlenecks');
  }

  if (metrics.errorRate > 0.05) {
    recommendations.push('High error rate - check logs and system stability');
  }

  return recommendations;
}