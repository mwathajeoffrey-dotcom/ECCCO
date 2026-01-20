import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/database/prisma-client';

export async function GET(request: NextRequest) {
  try {
    logger.debug('📡 Fetching modules with topics...');
    logger.debug('🔗 DATABASE_URL configured', { configured: !!process.env.DATABASE_URL });
    logger.debug('🔗 ACCELERATE_URL configured', { configured: !!process.env.ACCELERATE_URL });
    logger.debug('🔗 Environment', { env: process.env.NODE_ENV });
    
    // Test database connection first
    try {
      await prisma.$queryRaw`SELECT 1 as test`;
      logger.debug('✅ Database connection test successful');
    } catch (connError) {
      logger.error('❌ Database connection test failed', connError instanceof Error ? connError : new Error(String(connError)));
      throw connError;
    }

    // Query modules with topics and question counts
    // Note: Accelerate will automatically cache this query for better performance
    const modules = await prisma.module.findMany({
      where: {
        isActive: true
      },
      include: {
        topics: {
          include: {
            _count: {
              select: {
                questions: true
              }
            }
          },
          orderBy: [
            { category: 'asc' },
            { name: 'asc' }
          ]
        },
        _count: {
          select: {
            topics: true
          }
        }
      },
      orderBy: {
        ageGroup: 'asc'
      },
      // Accelerate caching: Cache for 30 minutes since modules rarely change
      cacheStrategy: {
        swr: 1800, // 30 minutes
        ttl: 3600,  // 1 hour
      }
    });

    logger.debug(`✅ Found ${modules.length} modules with topics`);

    return NextResponse.json({
      success: true,
      data: modules,
      message: `Successfully fetched ${modules.length} modules`,
      debug: {
        environment: process.env.NODE_ENV,
        hasDatabase: !!process.env.DATABASE_URL,
        hasAccelerate: !!process.env.ACCELERATE_URL,
        modulesCount: modules.length,
        cached: true // Accelerate handles this automatically
      }
    });

  } catch (error) {
    logger.error('❌ Error fetching modules:', error instanceof Error ? error : new Error(String(error)));
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch modules',
      details: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        environment: process.env.NODE_ENV,
        hasDatabase: !!process.env.DATABASE_URL,
        hasAccelerate: !!process.env.ACCELERATE_URL,
        errorType: error?.constructor?.name
      }
    }, { status: 500 });
    
  }
  // Note: No need to disconnect with Accelerate - it handles connection pooling
}