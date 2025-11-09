import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma with explicit configuration for production
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

export async function GET(request: NextRequest) {
  try {
    console.log('📡 Fetching modules with topics from PostgreSQL...');
    console.log('🔗 DATABASE_URL configured:', !!process.env.DATABASE_URL);
    
    // For now, return mock data until we resolve the Prisma issue
    const mockModules = [
      {
        id: 'pediatric_module',
        name: 'Pediatric Emergency Medicine',
        description: 'Pediatric emergency care, PALS, and critical care topics',
        ageGroup: 'pediatric',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        topics: [
          {
            id: 'pediatric_airway',
            name: 'Pediatric Airway Management',
            description: 'Advanced airway techniques in children',
            moduleId: 'pediatric_module',
            category: 'ventilation',
            subcategory: 'airway_management',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            _count: { questions: 5 }
          }
        ],
        _count: { topics: 16 }
      },
      {
        id: 'adult_module',
        name: 'Adult Emergency Medicine',
        description: 'Adult emergency care, ACLS, trauma, and critical care topics',
        ageGroup: 'adult',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        topics: [
          {
            id: 'adult_acls',
            name: 'ACLS Algorithms',
            description: 'Advanced Cardiovascular Life Support protocols',
            moduleId: 'adult_module',
            category: 'cardiac',
            subcategory: 'algorithms',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            _count: { questions: 8 }
          }
        ],
        _count: { topics: 24 }
      }
    ];
    
    console.log(`✅ Returning ${mockModules.length} modules (temporary mock data)`);

    return NextResponse.json({
      success: true,
      data: mockModules,
      message: `Successfully fetched ${mockModules.length} modules (temporary mock data)`
    });

    // TODO: Replace with actual Prisma query once DATABASE_URL issue is resolved
    // const modules = await prisma.module.findMany({
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