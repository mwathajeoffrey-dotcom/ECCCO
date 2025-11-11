/**
 * Complete Production Database Setup
 * Creates schema and seeds data for Prisma Accelerate
 */

async function setupProductionDatabase() {
  console.log('🚀 Complete production database setup starting...')
  
  const accelerateUrl = process.env.ACCELERATE_URL
  if (!accelerateUrl) {
    console.error('❌ ACCELERATE_URL environment variable is required')
    process.exit(1)
  }
  
  // Import the generated Prisma client
  const { PrismaClient } = require('@prisma/client-production')
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: accelerateUrl
      }
    }
  })
  
  try {
    console.log('🔗 Connecting to Prisma Accelerate...')
    await prisma.$connect()
    console.log('✅ Connected successfully')
    
    console.log('🏗️  Creating database schema...')
    
    // Create the schema step by step (PostgreSQL doesn't allow multiple commands in one statement)
    
    // Drop existing tables
    console.log('🗑️  Dropping existing tables...')
    try {
      await prisma.$executeRawUnsafe('DROP TABLE IF EXISTS "ExamSession" CASCADE')
      await prisma.$executeRawUnsafe('DROP TABLE IF EXISTS "Question" CASCADE')
      await prisma.$executeRawUnsafe('DROP TABLE IF EXISTS "Topic" CASCADE')
      await prisma.$executeRawUnsafe('DROP TABLE IF EXISTS "Module" CASCADE')
      await prisma.$executeRawUnsafe('DROP TABLE IF EXISTS "User" CASCADE')
    } catch (error) {
      console.log('📝 Tables may not exist yet, continuing...')
    }
    
    console.log('🔨 Creating tables...')
    
    // Create User table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "User" (
        "id" TEXT NOT NULL,
        "email" TEXT UNIQUE,
        "name" TEXT,
        "sessionId" TEXT UNIQUE NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY ("id")
      )
    `)
    
    // Create Module table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "Module" (
        "id" TEXT NOT NULL,
        "name" TEXT UNIQUE NOT NULL,
        "description" TEXT,
        "ageGroup" TEXT NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY ("id")
      )
    `)
    
    // Create Topic table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "Topic" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "moduleId" TEXT NOT NULL,
        "category" TEXT NOT NULL DEFAULT 'general',
        "subcategory" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY ("id"),
        FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `)
    
    // Create Question table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "Question" (
        "id" TEXT NOT NULL,
        "question" TEXT NOT NULL,
        "options" TEXT NOT NULL,
        "correctIndex" INTEGER NOT NULL,
        "explanation" TEXT NOT NULL,
        "references" TEXT NOT NULL,
        "difficulty" TEXT NOT NULL DEFAULT 'medium',
        "topicId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY ("id"),
        FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `)
    
    // Create ExamSession table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "ExamSession" (
        "id" TEXT NOT NULL,
        "userId" TEXT,
        "sessionId" TEXT NOT NULL,
        "topicId" TEXT NOT NULL,
        "topicName" TEXT NOT NULL,
        "questions" TEXT NOT NULL,
        "questionsData" TEXT,
        "answers" TEXT NOT NULL,
        "answersData" TEXT,
        "score" INTEGER,
        "totalQuestions" INTEGER NOT NULL DEFAULT 0,
        "correctAnswers" INTEGER NOT NULL DEFAULT 0,
        "totalTime" INTEGER,
        "timeSpent" INTEGER,
        "completed" BOOLEAN NOT NULL DEFAULT false,
        "completedAt" TIMESTAMP(3),
        "metadata" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY ("id"),
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE,
        FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `)
    
    console.log('🔍 Creating indexes...')
    
    // Create indexes for performance
    await prisma.$executeRawUnsafe('CREATE INDEX "User_sessionId_idx" ON "User"("sessionId")')
    await prisma.$executeRawUnsafe('CREATE INDEX "Module_ageGroup_idx" ON "Module"("ageGroup")')
    await prisma.$executeRawUnsafe('CREATE INDEX "Topic_moduleId_idx" ON "Topic"("moduleId")')
    await prisma.$executeRawUnsafe('CREATE INDEX "Topic_category_idx" ON "Topic"("category")')
    await prisma.$executeRawUnsafe('CREATE UNIQUE INDEX "Topic_moduleId_name_key" ON "Topic"("moduleId", "name")')
    await prisma.$executeRawUnsafe('CREATE INDEX "Question_topicId_idx" ON "Question"("topicId")')
    await prisma.$executeRawUnsafe('CREATE INDEX "Question_difficulty_idx" ON "Question"("difficulty")')
    await prisma.$executeRawUnsafe('CREATE INDEX "ExamSession_userId_idx" ON "ExamSession"("userId")')
    await prisma.$executeRawUnsafe('CREATE INDEX "ExamSession_topicId_idx" ON "ExamSession"("topicId")')
    await prisma.$executeRawUnsafe('CREATE INDEX "ExamSession_sessionId_idx" ON "ExamSession"("sessionId")')
    await prisma.$executeRawUnsafe('CREATE INDEX "ExamSession_createdAt_idx" ON "ExamSession"("createdAt")')
    await prisma.$executeRawUnsafe('CREATE INDEX "ExamSession_completedAt_idx" ON "ExamSession"("completedAt")')
    
    console.log('✅ Database schema created successfully!')
    
    console.log('🌱 Seeding with initial data...')
    
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
    
    console.log('✅ Created modules')
    
    // Create topics for testing
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
          name: 'Adult Sepsis Recognition',
          description: 'Early identification using qSOFA and SOFA scores',
          moduleId: adultModule.id,
          category: 'sepsis',
          subcategory: 'recognition'
        }
      })
    ])
    
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
    
    console.log('✅ Created topics')
    
    // Create test questions
    await Promise.all([
      prisma.question.create({
        data: {
          question: 'What is the initial dose of epinephrine in adult cardiac arrest?',
          options: JSON.stringify(['1 mg IV/IO', '0.1 mg IV/IO', '0.01 mg/kg IV/IO', '10 mg IV/IO']),
          correctIndex: 0,
          explanation: 'The initial dose of epinephrine in adult cardiac arrest is 1 mg (1:10,000) IV/IO, repeated every 3-5 minutes.',
          references: JSON.stringify(['AHA ACLS Guidelines 2020']),
          difficulty: 'medium',
          topicId: adultTopics[0].id
        }
      }),
      prisma.question.create({
        data: {
          question: 'In adult sepsis recognition, which qSOFA criteria indicate high risk?',
          options: JSON.stringify(['Temperature >38°C', 'Altered mental status', 'Heart rate >90 bpm', 'White blood cell count >12,000']),
          correctIndex: 1,
          explanation: 'qSOFA criteria include altered mental status, systolic BP ≤100 mmHg, and respiratory rate ≥22/min. Altered mental status is a key high-risk indicator.',
          references: JSON.stringify(['Sepsis-3 Consensus Definitions 2016']),
          difficulty: 'medium',
          topicId: adultTopics[1].id
        }
      }),
      prisma.question.create({
        data: {
          question: 'What is the correct pediatric epinephrine dose for cardiac arrest?',
          options: JSON.stringify(['0.01 mg/kg IV/IO', '0.1 mg/kg IV/IO', '1 mg IV/IO', '0.001 mg/kg IV/IO']),
          correctIndex: 0,
          explanation: 'Pediatric epinephrine dose for cardiac arrest is 0.01 mg/kg (0.1 mL/kg of 1:10,000) IV/IO, repeated every 3-5 minutes.',
          references: JSON.stringify(['AHA PALS Guidelines 2020']),
          difficulty: 'medium',
          topicId: pediatricTopics[0].id
        }
      }),
      prisma.question.create({
        data: {
          question: 'What is the preferred method for pediatric difficult airway management?',
          options: JSON.stringify(['Immediate cricothyrotomy', 'Video laryngoscopy', 'Blind nasotracheal intubation', 'Emergency tracheostomy']),
          correctIndex: 1,
          explanation: 'Video laryngoscopy is preferred for pediatric difficult airway management as it provides better visualization and higher success rates.',
          references: JSON.stringify(['Pediatric Advanced Life Support Provider Manual 2020']),
          difficulty: 'medium',
          topicId: pediatricTopics[1].id
        }
      })
    ])
    
    console.log('✅ Created questions')
    
    // Final verification
    const moduleCount = await prisma.module.count()
    const topicCount = await prisma.topic.count()
    const questionCount = await prisma.question.count()
    
    console.log('🎉 Production database setup completed successfully!')
    console.log(`📊 Final database state:`)
    console.log(`  📚 Modules: ${moduleCount}`)
    console.log(`  📝 Topics: ${topicCount}`)
    console.log(`  ❓ Questions: ${questionCount}`)
    
    console.log('🧪 Testing production API...')
    
  } catch (error) {
    console.error('❌ Production setup failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  setupProductionDatabase()
    .then(() => {
      console.log('✅ Complete production setup finished!')
      setTimeout(() => {
        console.log('🔍 Testing production API...')
        const { execSync } = require('child_process')
        try {
          const result = execSync('curl -s "https://eccco.vercel.app/api/modules" | head -5', { encoding: 'utf8' })
          console.log('API Response:', result)
        } catch (error: any) {
          console.log('API test error:', error.message)
        }
        process.exit(0)
      }, 5000)
    })
    .catch((error) => {
      console.error('❌ Production setup failed:', error)
      process.exit(1)
    })
}

export { setupProductionDatabase }