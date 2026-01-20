import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';

// Simple database connection test
export async function GET() {
  try {
    logger.debug('🔧 Testing DATABASE_URL...');
    
    // Parse the DATABASE_URL
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL not configured');
    }
    
    logger.debug('Database URL prefix:', databaseUrl.substring(0, 30) + '...');
    
    // Just test URL parsing first
    const url = new URL(databaseUrl);
    
    return NextResponse.json({
      success: true,
      message: 'Database URL parsed successfully',
      debug: {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        hasPassword: !!url.password
      }
    });

  } catch (error) {
    logger.error('❌ Test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Database URL test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        hasUrl: !!process.env.DATABASE_URL,
        urlPrefix: process.env.DATABASE_URL?.substring(0, 30) + '...',
        errorName: error?.constructor?.name
      }
    }, { status: 500 });
  }
}