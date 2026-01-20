import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

/**
 * Database health check endpoint
 * GET /api/debug/db-check
 */
export async function GET() {
  try {
    // Check environment
    const isDev = process.env.NODE_ENV === 'development';
    const hasAccelerate = !!process.env.ACCELERATE_URL;
    const hasDatabase = !!process.env.DATABASE_URL;
    
    // Test database connection
    const userCount = await prisma.user.count();
    
    // Check if User model has required fields (try to find one with sessionId)
    const sampleUser = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        role: true,  // This will fail if migration not run
        sessionId: true, // This will fail if migration not run
      }
    });
    
    return NextResponse.json({
      status: 'ok',
      database: {
        connected: true,
        userCount,
        sampleUserFound: !!sampleUser,
        hasRoleField: true, // If we got here, field exists
        hasSessionIdField: true, // If we got here, field exists
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        isDevelopment: isDev,
        hasAccelerateUrl: hasAccelerate,
        hasDatabaseUrl: hasDatabase,
        usingAccelerate: !isDev && hasAccelerate,
      },
      migration: {
        status: 'Schema appears up to date',
        requiredFields: ['role', 'sessionId'],
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    logger.error('Database check error:', error);
    
    // Parse Prisma errors
    let errorDetails = 'Unknown error';
    let missingFields: string[] = [];
    
    if (error instanceof Error) {
      errorDetails = error.message;
      
      // Check for missing column errors
      if (errorDetails.includes('column') && errorDetails.includes('does not exist')) {
        if (errorDetails.includes('role')) missingFields.push('role');
        if (errorDetails.includes('sessionId')) missingFields.push('sessionId');
      }
    }
    
    return NextResponse.json({
      status: 'error',
      database: {
        connected: false,
      },
      error: {
        message: errorDetails,
        missingFields: missingFields.length > 0 ? missingFields : undefined,
        suggestion: missingFields.length > 0 
          ? 'Run database migration: npx prisma migrate deploy'
          : 'Check database connection and credentials',
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        isDevelopment: process.env.NODE_ENV === 'development',
        hasAccelerateUrl: !!process.env.ACCELERATE_URL,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      },
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
