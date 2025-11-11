/**
 * Ensure Production Accelerate Database Schema
 * This script directly aligns the production Accelerate database with the required schema
 */

import { PrismaClient } from '@prisma/client'

async function ensureProductionSchema() {
  console.log('🎯 Ensuring production Accelerate database schema alignment...')
  
  try {
    // Get production environment variables
    const accelerateUrl = process.env.ACCELERATE_URL
    if (!accelerateUrl) {
      console.error('❌ ACCELERATE_URL environment variable is required')
      console.log('💡 Run: ACCELERATE_URL="your_accelerate_url" npm run ensure-production-schema')
      process.exit(1)
    }
    
    console.log('🔗 Connecting to Prisma Accelerate production database...')
    
    // Create Prisma client with direct Accelerate URL configuration
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: accelerateUrl
        }
      }
    })
    
    console.log('🔍 Testing database connectivity...')
    
    try {
      // Test basic connection
      await prisma.$queryRaw`SELECT 1 as test`
      console.log('✅ Database connection successful')
      
      // Check if tables exist by querying PostgreSQL information schema
      console.log('📋 Checking existing schema...')
      
      const existingTables = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('User', 'Module', 'Topic', 'Question', 'ExamSession')
      ` as Array<{ table_name: string }>
      
      const tableNames = existingTables.map(row => row.table_name).sort()
      console.log('📊 Found tables:', tableNames.length ? tableNames : 'None')
      
      if (tableNames.length === 5) {
        console.log('✅ All required tables exist! Verifying data...')
        
        // Test data access
        const moduleCount = await prisma.module.count()
        const topicCount = await prisma.topic.count()
        const questionCount = await prisma.question.count()
        
        console.log('📊 Current data:')
        console.log(`  📚 Modules: ${moduleCount}`)
        console.log(`  📝 Topics: ${topicCount}`)
        console.log(`  ❓ Questions: ${questionCount}`)
        
        if (moduleCount > 0) {
          console.log('🎉 Production database schema and data are properly aligned!')
          return
        } else {
          console.log('⚠️  Tables exist but no data found. This might indicate a schema mismatch.')
        }
      }
      
      // If we reach here, schema needs to be created or updated
      console.log('🛠️  Creating/updating database schema...')
      
      await createProductionSchema(prisma)
      
      console.log('✅ Production schema alignment completed!')
      
    } catch (queryError: any) {
      console.log('❌ Schema verification failed:', queryError.message)
      console.log('🔄 Attempting to create schema from scratch...')
      
      await createProductionSchema(prisma)
      console.log('✅ Schema created successfully!')
    }
    
  } catch (error: any) {
    console.error('❌ Production schema alignment failed:', error.message)
    throw error
  }
}

async function createProductionSchema(prisma: PrismaClient) {
  console.log('🏗️  Creating production database schema...')
  
  // Create complete schema based on your current models
  const schemaSQL = `
    -- Drop existing tables if they exist (CASCADE to handle dependencies)
    DROP TABLE IF EXISTS "ExamSession" CASCADE;
    DROP TABLE IF EXISTS "Question" CASCADE;
    DROP TABLE IF EXISTS "Topic" CASCADE;
    DROP TABLE IF EXISTS "Module" CASCADE;
    DROP TABLE IF EXISTS "User" CASCADE;
    
    -- Create User table
    CREATE TABLE "User" (
      "id" TEXT NOT NULL,
      "email" TEXT UNIQUE,
      "name" TEXT,
      "sessionId" TEXT UNIQUE NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY ("id")
    );
    
    -- Create Module table
    CREATE TABLE "Module" (
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
    );
    
    -- Create Question table
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
    );
    
    -- Create ExamSession table
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
    );
    
    -- Create indexes for performance
    CREATE INDEX "User_sessionId_idx" ON "User"("sessionId");
    CREATE INDEX "Module_ageGroup_idx" ON "Module"("ageGroup");
    CREATE INDEX "Topic_moduleId_idx" ON "Topic"("moduleId");
    CREATE INDEX "Topic_category_idx" ON "Topic"("category");
    CREATE UNIQUE INDEX "Topic_moduleId_name_key" ON "Topic"("moduleId", "name");
    CREATE INDEX "Question_topicId_idx" ON "Question"("topicId");
    CREATE INDEX "Question_difficulty_idx" ON "Question"("difficulty");
    CREATE INDEX "ExamSession_userId_idx" ON "ExamSession"("userId");
    CREATE INDEX "ExamSession_topicId_idx" ON "ExamSession"("topicId");
    CREATE INDEX "ExamSession_sessionId_idx" ON "ExamSession"("sessionId");
    CREATE INDEX "ExamSession_createdAt_idx" ON "ExamSession"("createdAt");
    CREATE INDEX "ExamSession_completedAt_idx" ON "ExamSession"("completedAt");
  `
  
  console.log('📝 Executing schema creation SQL...')
  await prisma.$executeRawUnsafe(schemaSQL)
  
  console.log('✅ Database schema created successfully')
  
  // Verify the creation
  console.log('🔍 Verifying schema creation...')
  
  const tables = await prisma.$queryRaw`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name
  ` as Array<{ table_name: string }>
  
  console.log('📋 Created tables:', tables.map(t => t.table_name))
  
  // Test basic functionality
  console.log('🧪 Testing basic functionality...')
  
  try {
    const moduleCount = await prisma.module.count()
    const topicCount = await prisma.topic.count()
    const questionCount = await prisma.question.count()
    
    console.log('📊 Schema verification successful:')
    console.log(`  ✅ Module table: ${moduleCount} records`)
    console.log(`  ✅ Topic table: ${topicCount} records`)
    console.log(`  ✅ Question table: ${questionCount} records`)
    
  } catch (testError: any) {
    console.warn('⚠️  Basic functionality test failed:', testError.message)
    console.log('💡 This might be normal for a fresh database')
  }
  
  console.log('🎉 Production schema setup completed!')
}

// Execute if run directly
if (require.main === module) {
  ensureProductionSchema()
    .then(() => {
      console.log('✅ Production database schema alignment completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Failed to align production schema:', error)
      process.exit(1)
    })
}

export { ensureProductionSchema }