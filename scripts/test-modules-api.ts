import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testModulesAPI() {
  try {
    console.log('🔍 Testing modules API...')
    
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
    })

    console.log('✅ Modules found:', modules.length)
    modules.forEach(module => {
      console.log(`📋 ${module.name} (${module.ageGroup}): ${module._count.topics} topics`)
    })

    return {
      success: true,
      data: modules
    }
  } catch (error) {
    console.error('❌ Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  } finally {
    await prisma.$disconnect()
  }
}

testModulesAPI().then(result => {
  console.log('📊 Final result:', JSON.stringify(result, null, 2))
})