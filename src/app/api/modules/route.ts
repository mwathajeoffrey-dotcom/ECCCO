import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    console.log('📡 Fetching modules with topics...');
    
    // Fetch all modules with their topics and question counts
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

    // Log module structure for debugging
    modules.forEach(module => {
      console.log(`📋 ${module.name} (${module.ageGroup}): ${module._count.topics} topics`);
      
      const topicsByCategory = module.topics.reduce((acc, topic) => {
        if (!acc[topic.category]) acc[topic.category] = 0;
        acc[topic.category]++;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('   Categories:', Object.entries(topicsByCategory)
        .map(([cat, count]) => `${cat} (${count})`)
        .join(', ')
      );
    });

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