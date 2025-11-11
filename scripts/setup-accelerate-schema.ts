/**
 * Setup script for Prisma Accelerate database schema
 * This script handles the initial database setup when using Prisma Accelerate
 */

async function setupAccelerateSchema() {
  console.log('🚀 Setting up Prisma Accelerate database schema...')
  
  try {
    // Check for required environment variable
    const accelerateUrl = process.env.ACCELERATE_URL
    if (!accelerateUrl) {
      throw new Error('ACCELERATE_URL environment variable is required')
    }
    
    console.log('📡 Connecting to Prisma Accelerate...')
    
    // First, set up the correct schema for production
    console.log('🔧 Configuring production schema...')
    const { execSync } = require('child_process')
    
    // Copy production schema to main schema location
    execSync('cp prisma/schema.production.prisma prisma/schema.prisma', { stdio: 'inherit' })
    console.log('✅ Production schema configured')
    
    // Update schema to use Accelerate URL
    const fs = require('fs')
    let schemaContent = fs.readFileSync('prisma/schema.prisma', 'utf8')
    
    // Update the schema to use Accelerate URL
    schemaContent = schemaContent.replace(
      'url      = env("DATABASE_URL")',
      'url      = env("ACCELERATE_URL")'
    )
    
    // Write updated schema
    fs.writeFileSync('prisma/schema.prisma', schemaContent)
    console.log('✅ Schema updated to use ACCELERATE_URL')
    
    // Generate Prisma client with the updated schema
    console.log('🔧 Generating Prisma client...')
    execSync('npx prisma generate', { stdio: 'inherit' })
    console.log('✅ Prisma client generated')
    
    // Now import and use the client
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    
    // Test connection
    console.log('🔍 Testing database connection...')
    await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database connection successful')
    
    // Check if tables exist
    console.log('🔍 Checking existing schema...')
    try {
      const result = await prisma.$queryRaw`SELECT to_regclass('public."Module"') as table_exists`
      if (result[0]?.table_exists) {
        console.log('✅ Schema already exists')
        const moduleCount = await prisma.module.count()
        console.log(`📊 Found ${moduleCount} modules in database`)
        return
      }
    } catch (error) {
      console.log('📋 Schema does not exist, setting up...')
    }
    
    // Create the schema manually using raw SQL
    console.log('🛠️ Creating database schema manually...')
    await createSchemaManually(prisma)
    
    console.log('✅ Schema setup completed successfully!')
    
  } catch (error) {
    console.error('❌ Schema setup failed:', error)
    throw error
  }
}

async function createSchemaManually(prisma: any) {
  console.log('📝 Creating tables...')
  
  // Create the schema using PostgreSQL-compatible SQL based on your current schema.prisma
  const createTables = `
    -- Create User table
    CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT NOT NULL,
      "email" TEXT UNIQUE,
      "name" TEXT,
      "sessionId" TEXT UNIQUE NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY ("id")
    );

    -- Create Module table
    CREATE TABLE IF NOT EXISTS "Module" (
      "id" TEXT NOT NULL,
      "name" TEXT UNIQUE NOT NULL,
      "description" TEXT,
      "ageGroup" TEXT NOT NULL,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY ("id")
    );

    -- Create Topic table
    CREATE TABLE IF NOT EXISTS "Topic" (
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
    );

    -- Create Question table
    CREATE TABLE IF NOT EXISTS "Question" (
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
    );

    -- Create ExamSession table
    CREATE TABLE IF NOT EXISTS "ExamSession" (
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
    );

    -- Create indexes
    CREATE INDEX IF NOT EXISTS "User_sessionId_idx" ON "User"("sessionId");
    CREATE INDEX IF NOT EXISTS "Module_ageGroup_idx" ON "Module"("ageGroup");
    CREATE INDEX IF NOT EXISTS "Topic_moduleId_idx" ON "Topic"("moduleId");
    CREATE INDEX IF NOT EXISTS "Topic_category_idx" ON "Topic"("category");
    CREATE UNIQUE INDEX IF NOT EXISTS "Topic_moduleId_name_key" ON "Topic"("moduleId", "name");
    CREATE INDEX IF NOT EXISTS "Question_topicId_idx" ON "Question"("topicId");
    CREATE INDEX IF NOT EXISTS "Question_difficulty_idx" ON "Question"("difficulty");
    CREATE INDEX IF NOT EXISTS "ExamSession_userId_idx" ON "ExamSession"("userId");
    CREATE INDEX IF NOT EXISTS "ExamSession_topicId_idx" ON "ExamSession"("topicId");
    CREATE INDEX IF NOT EXISTS "ExamSession_sessionId_idx" ON "ExamSession"("sessionId");
    CREATE INDEX IF NOT EXISTS "ExamSession_createdAt_idx" ON "ExamSession"("createdAt");
    CREATE INDEX IF NOT EXISTS "ExamSession_completedAt_idx" ON "ExamSession"("completedAt");
  `
  
  // Execute the schema creation
  console.log('📝 Executing schema creation SQL...')
  await prisma.$executeRawUnsafe(createTables)
  
  console.log('✅ Database schema created successfully')
  
  // Verify tables were created
  console.log('🔍 Verifying schema creation...')
  const moduleCount = await prisma.module.count()
  console.log(`✅ Module table created (current count: ${moduleCount})`)
  
  const topicCount = await prisma.topic.count()
  console.log(`✅ Topic table created (current count: ${topicCount})`)
  
  const questionCount = await prisma.question.count()
  console.log(`✅ Question table created (current count: ${questionCount})`)
  
  console.log('🎉 All tables created and verified!')
}

// Run the setup
if (require.main === module) {
  setupAccelerateSchema().catch((error) => {
    console.error('Setup failed:', error)
    process.exit(1)
  })
}

export { setupAccelerateSchema }