import { NextRequest, NextResponse } from 'next/server';

interface MetricsData {
  timestamp: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  cpu: {
    load: number[];
    usage: number;
  };
  requests: {
    total: number;
    errors: number;
    latency: number;
  };
  database: {
    status: 'connected' | 'disconnected' | 'error';
    responseTime: number;
    connections: number;
  };
  cache: {
    hits: number;
    misses: number;
    ratio: number;
  };
}

// In-memory metrics store (in production, use Redis or similar)
const metrics = {
  requests: { total: 0, errors: 0, totalLatency: 0 },
  cache: { hits: 0, misses: 0 },
  startTime: Date.now(),
};

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Update request metrics
    metrics.requests.total++;
    
    // Gather system metrics
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    const uptime = process.uptime();
    
    // Test database connection
    const dbStartTime = Date.now();
    let dbStatus: 'connected' | 'disconnected' | 'error' = 'connected';
    let dbResponseTime = 0;
    
    try {
      // Simple database health check using our centralized client
      const { prisma } = await import('@/lib/database/prisma-client');
      
      await prisma.$queryRaw`SELECT 1`;
      dbResponseTime = Date.now() - dbStartTime;
    } catch (error) {
      dbStatus = 'error';
      dbResponseTime = Date.now() - dbStartTime;
      console.error('Database health check failed:', error);
    }
    
    // Calculate cache ratio
    const cacheTotal = metrics.cache.hits + metrics.cache.misses;
    const cacheRatio = cacheTotal > 0 ? metrics.cache.hits / cacheTotal : 0;
    
    // Calculate average latency
    const avgLatency = metrics.requests.total > 0 
      ? metrics.requests.totalLatency / metrics.requests.total 
      : 0;
    
    const metricsData: MetricsData = {
      timestamp: new Date().toISOString(),
      uptime: uptime,
      memory: {
        used: memoryUsage.heapUsed,
        total: memoryUsage.heapTotal,
        percentage: (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100,
      },
      cpu: {
        load: [0], // Would need OS-specific implementation
        usage: 0,  // Simplified - would need proper CPU monitoring
      },
      requests: {
        total: metrics.requests.total,
        errors: metrics.requests.errors,
        latency: avgLatency,
      },
      database: {
        status: dbStatus,
        responseTime: dbResponseTime,
        connections: 1, // Simplified
      },
      cache: {
        hits: metrics.cache.hits,
        misses: metrics.cache.misses,
        ratio: cacheRatio,
      },
    };
    
    // Update latency metrics
    const requestLatency = Date.now() - startTime;
    metrics.requests.totalLatency += requestLatency;
    
    return NextResponse.json({
      status: 'healthy',
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      metrics: metricsData,
    });
    
  } catch (error) {
    metrics.requests.errors++;
    console.error('Metrics endpoint error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        error: 'Failed to gather metrics',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Helper function to increment cache metrics (can be called from other parts of the app)
export function incrementCacheHit() {
  metrics.cache.hits++;
}

export function incrementCacheMiss() {
  metrics.cache.misses++;
}