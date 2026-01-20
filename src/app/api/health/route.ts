import { logger } from '@/lib/logger';
// ECCCO Platform Health Check API
// app/api/health/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  version: string
  checks: {
    database: 'healthy' | 'unhealthy'
    memory: 'healthy' | 'unhealthy'
    disk: 'healthy' | 'unhealthy'
  }
  uptime: number
  environment: string
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Database health check
    const dbCheck = await checkDatabase()
    
    // Memory health check
    const memoryCheck = checkMemory()
    
    // Disk health check (if applicable)
    const diskCheck = checkDisk()
    
    const allHealthy = dbCheck && memoryCheck && diskCheck
    
    const response: HealthCheckResponse = {
      status: allHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      checks: {
        database: dbCheck ? 'healthy' : 'unhealthy',
        memory: memoryCheck ? 'healthy' : 'unhealthy',
        disk: diskCheck ? 'healthy' : 'unhealthy'
      },
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    }
    
    const responseTime = Date.now() - startTime
    
    // Return response with headers
    return NextResponse.json(response, {
      status: allHealthy ? 200 : 503,
      headers: {
        'X-Response-Time': `${responseTime}ms`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
    
  } catch (error) {
    logger.error('Health check failed:', error instanceof Error ? error : new Error(String(error)))
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      checks: {
        database: 'unhealthy',
        memory: 'unhealthy',
        disk: 'unhealthy'
      },
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    }, { status: 503 })
  }
}

async function checkDatabase(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    logger.error('Database health check failed:', error instanceof Error ? error : new Error(String(error)))
    return false
  }
}

function checkMemory(): boolean {
  const memUsage = process.memoryUsage()
  const heapUsedMB = memUsage.heapUsed / 1024 / 1024
  const heapTotalMB = memUsage.heapTotal / 1024 / 1024
  
  // Consider unhealthy if using more than 90% of heap
  const memoryUsagePercent = (heapUsedMB / heapTotalMB) * 100
  
  if (memoryUsagePercent > 90) {
    logger.warn(`High memory usage: ${memoryUsagePercent.toFixed(2)}%`)
    return false
  }
  
  return true
}

function checkDisk(): boolean {
  // In serverless environments, disk space is typically not a concern
  // For traditional servers, you might want to check disk usage here
  return true
}