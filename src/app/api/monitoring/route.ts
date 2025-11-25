// Enhanced monitoring API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { PerformanceMonitor, getMemoryUsage } from '@/lib/performance';
import { getCacheStats } from '@/lib/cache';
import { logger } from '@/lib/logger';

interface MonitoringMetrics {
  timestamp: string;
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  } | null;
  performance: Record<string, { average: number; samples: number; p95: number }>;
  cache: {
    questions: { size: number; maxSize: number };
    topics: { size: number; maxSize: number };
    users: { size: number; maxSize: number };
  };
  environment: string;
  nodeVersion: string;
  platform: string;
}

export async function GET(request: NextRequest) {
  try {
    const performanceMetrics = PerformanceMonitor.getInstance().getAllMetrics();
    const memoryUsage = getMemoryUsage();
    const cacheStats = getCacheStats();

    const metrics: MonitoringMetrics = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: memoryUsage,
      performance: performanceMetrics,
      cache: cacheStats,
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      platform: process.platform,
    };

    logger.info('Monitoring metrics requested', {
      requestedBy: request.headers.get('X-Forwarded-For')?.split(',')[0] ?? 'unknown',
      metricsCount: Object.keys(performanceMetrics).length,
    });

    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    logger.error('Failed to generate monitoring metrics', error as Error);
    
    return NextResponse.json(
      { error: 'Failed to generate metrics' },
      { status: 500 }
    );
  }
}

// Reset metrics (useful for testing or maintenance)
export async function DELETE(request: NextRequest) {
  try {
    PerformanceMonitor.getInstance().clear();
    
    logger.info('Monitoring metrics cleared', {
      requestedBy: request.headers.get('X-Forwarded-For')?.split(',')[0] ?? 'unknown',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Metrics cleared successfully' });
  } catch (error) {
    logger.error('Failed to clear monitoring metrics', error as Error);
    
    return NextResponse.json(
      { error: 'Failed to clear metrics' },
      { status: 500 }
    );
  }
}