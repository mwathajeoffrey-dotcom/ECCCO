import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/database/prisma-client';

export async function GET(request: NextRequest) {
  try {
    console.log('📡 Fetching modules with topics...');
    console.log('🔗 DATABASE_URL configured:', !!process.env.DATABASE_URL);
    console.log('🔗 Environment:', process.env.NODE_ENV);
    console.log('🔗 VERCEL:', process.env.VERCEL);
    
    // Test database connection first
    try {
      await prisma.$queryRaw`SELECT 1 as test`;
      console.log('✅ Database connection test successful');
    } catch (connError) {
      console.error('❌ Database connection test failed:', connError);
      throw connError;
    }

    // Query modules with topics and question counts
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
      }
    });

    console.log(`✅ Found ${modules.length} modules with topics`);

    return NextResponse.json({
      success: true,
      data: modules,
      message: `Successfully fetched ${modules.length} modules`,
      debug: {
        environment: process.env.NODE_ENV,
        hasDatabase: !!process.env.DATABASE_URL,
        modulesCount: modules.length
      }
    });

  } catch (error) {
    console.error('❌ Error fetching modules:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch modules',
      details: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        environment: process.env.NODE_ENV,
        hasDatabase: !!process.env.DATABASE_URL,
        errorType: error?.constructor?.name
      }
    }, { status: 500 });
    
  } finally {
    // Note: Don't disconnect in serverless - let connection pooling handle it
    // await prisma.$disconnect();
  }
}