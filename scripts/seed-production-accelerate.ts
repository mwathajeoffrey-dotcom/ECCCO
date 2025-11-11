/**
 * Seed Production Accelerate Database
 * Creates basic modules and topics for testing
 */

async function seedProductionDatabase() {
  console.log('🌱 Seeding production Accelerate database...')
  
  // Import the generated Prisma client
  const { PrismaClient } = require('@prisma/client-production')
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.ACCELERATE_URL
      }
    }
  })
  
  try {
    console.log('🔗 Connecting to production database...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Connected successfully')
    
    // Check if data already exists
    const existingModules = await prisma.module.count()
    console.log(`📊 Found ${existingModules} existing modules`)
    
    if (existingModules > 0) {
      console.log('✅ Database already has data!')
      return
    }
    
    console.log('🏗️  Creating basic modules and topics...')
    
    // Create Adult Emergency Medicine Module
    const adultModule = await prisma.module.create({
      data: {
        id: 'adult_module',
        name: 'Adult Emergency Medicine',
        description: 'Adult emergency care, ACLS, trauma, and critical care topics',
        ageGroup: 'adult',
        isActive: true
      }
    })
    
    console.log('✅ Created Adult Emergency Medicine module')
    
    // Create Pediatric Emergency Medicine Module  
    const pediatricModule = await prisma.module.create({
      data: {
        id: 'pediatric_module',
        name: 'Pediatric Emergency Medicine',
        description: 'Pediatric emergency care, PALS, and critical care topics',
        ageGroup: 'pediatric',
        isActive: true
      }
    })
    
    console.log('✅ Created Pediatric Emergency Medicine module')
    
    // Create a few topics for testing
    const adultTopics = await Promise.all([
      prisma.topic.create({
        data: {
          id: 'adult-acls',
          name: 'ACLS Algorithms',
          description: 'Advanced Cardiovascular Life Support protocols',
          moduleId: adultModule.id,
          category: 'cardiac',
          subcategory: 'algorithms'
        }
      }),
      prisma.topic.create({
        data: {
          id: 'adult-sepsis',
          name: 'Sepsis Management',
          description: 'Recognition and treatment of sepsis in adults',
          moduleId: adultModule.id,
          category: 'sepsis',
          subcategory: 'management'
        }
      })
    ])
    
    console.log('✅ Created adult topics')
    
    const pediatricTopics = await Promise.all([
      prisma.topic.create({
        data: {
          id: 'peds-pals',
          name: 'PALS Algorithms',
          description: 'Pediatric Advanced Life Support protocols',
          moduleId: pediatricModule.id,
          category: 'pediatric_advanced_life_support',
          subcategory: 'algorithms'
        }
      }),
      prisma.topic.create({
        data: {
          id: 'peds-airway',
          name: 'Pediatric Airway Management',
          description: 'Advanced airway techniques in children',
          moduleId: pediatricModule.id,
          category: 'ventilation',
          subcategory: 'airway_management'
        }
      })
    ])
    
    console.log('✅ Created pediatric topics')
    
    // Create a few test questions
    const testQuestions = await Promise.all([
      prisma.question.create({
        data: {
          question: 'What is the initial dose of epinephrine in adult cardiac arrest?',
          options: '["1 mg IV/IO", "0.1 mg IV/IO", "0.01 mg/kg IV/IO", "10 mg IV/IO"]',
          correctIndex: 0,
          explanation: 'The initial dose of epinephrine in adult cardiac arrest is 1 mg (1:10,000) IV/IO, repeated every 3-5 minutes.',
          references: '["AHA ACLS Guidelines 2020"]',
          difficulty: 'medium',
          topicId: adultTopics[0].id
        }
      }),
      prisma.question.create({
        data: {
          question: 'What is the initial fluid bolus for pediatric septic shock?',
          options: '["10 mL/kg", "20 mL/kg", "30 mL/kg", "40 mL/kg"]',
          correctIndex: 1,
          explanation: 'The initial fluid bolus for pediatric septic shock is 20 mL/kg of isotonic crystalloid given rapidly.',
          references: '["SCCM Pediatric Sepsis Guidelines"]',
          difficulty: 'medium',
          topicId: pediatricTopics[1].id
        }
      })
    ])
    
    console.log('✅ Created test questions')
    
    // Final count
    const moduleCount = await prisma.module.count()
    const topicCount = await prisma.topic.count()
    const questionCount = await prisma.question.count()
    
    console.log('🎉 Production database seeded successfully!')
    console.log(`📊 Final counts:`)
    console.log(`  📚 Modules: ${moduleCount}`)
    console.log(`  📝 Topics: ${topicCount}`)
    console.log(`  ❓ Questions: ${questionCount}`)
    
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  const accelerateUrl = process.env.ACCELERATE_URL
  if (!accelerateUrl) {
    console.error('❌ ACCELERATE_URL environment variable is required')
    process.exit(1)
  }
  
  seedProductionDatabase()
    .then(() => {
      console.log('✅ Production seeding completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Production seeding failed:', error)
      process.exit(1)
    })
}

export { seedProductionDatabase }