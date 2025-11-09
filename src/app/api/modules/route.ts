import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    console.log('📡 Fetching modules with topics...');
    console.log('🔗 DATABASE_URL configured:', !!process.env.DATABASE_URL);
    console.log('🔗 Database provider from schema:', process.env.NODE_ENV === 'production' ? 'PostgreSQL' : 'SQLite');
    
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
      message: `Successfully fetched ${modules.length} modules`
    });

  } catch (error) {
    console.error('❌ Error fetching modules:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch modules',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
    
  } finally {
    await prisma.$disconnect();
  }
}