#!/usr/bin/env npx tsx

import { PrismaClient } from '@prisma/client';

// Script to set up the Accelerate database with schema and initial data
async function setupAccelerateDatabase() {
  const accelerateUrl = process.env.ACCELERATE_URL;
  
  if (!accelerateUrl) {
    console.error('❌ ACCELERATE_URL environment variable not set');
    process.exit(1);
  }

  console.log('🚀 Setting up Accelerate database...');
  
  // Create Prisma client with Accelerate URL
  const prisma = new PrismaClient({
    datasourceUrl: accelerateUrl,
  });

  try {
    // Try to create the schema using raw SQL
    console.log('📦 Creating database schema...');
    
    // Check if we can connect
    await prisma.$queryRaw`SELECT 1 as connected`;
    console.log('✅ Connected to Accelerate database');

    // Create modules table and data
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Module" (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        "ageGroup" TEXT NOT NULL,
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Topic" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        "moduleId" TEXT NOT NULL,
        category TEXT DEFAULT 'general',
        subcategory TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("moduleId") REFERENCES "Module"(id) ON DELETE CASCADE,
        UNIQUE ("moduleId", name)
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Question" (
        id TEXT PRIMARY KEY,
        question TEXT NOT NULL,
        options TEXT NOT NULL,
        "correctIndex" INTEGER NOT NULL,
        explanation TEXT NOT NULL,
        references TEXT NOT NULL,
        difficulty TEXT DEFAULT 'medium',
        "topicId" TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("topicId") REFERENCES "Topic"(id)
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "User" (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        name TEXT,
        "sessionId" TEXT UNIQUE NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "ExamSession" (
        id TEXT PRIMARY KEY,
        "userId" TEXT,
        "sessionId" TEXT NOT NULL,
        "topicId" TEXT NOT NULL,
        "topicName" TEXT NOT NULL,
        questions TEXT NOT NULL,
        "questionsData" TEXT,
        answers TEXT NOT NULL,
        "answersData" TEXT,
        score INTEGER,
        "totalQuestions" INTEGER DEFAULT 0,
        "correctAnswers" INTEGER DEFAULT 0,
        "totalTime" INTEGER,
        "timeSpent" INTEGER,
        completed BOOLEAN DEFAULT false,
        "completedAt" TIMESTAMP,
        metadata TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES "User"(id),
        FOREIGN KEY ("topicId") REFERENCES "Topic"(id)
      );
    `;

    console.log('✅ Database schema created successfully');

    // Now insert initial data
    console.log('🌱 Seeding initial data...');
    
    // Insert modules using raw SQL
    await prisma.$executeRaw`
      INSERT INTO "Module" (id, name, description, "ageGroup", "isActive")
      VALUES 
        ('adult_module', 'Adult Emergency Medicine', 'Adult emergency care, ACLS, trauma, and critical care topics', 'adult', true),
        ('pediatric_module', 'Pediatric Emergency Medicine', 'Pediatric emergency care, PALS, and critical care topics', 'pediatric', true)
      ON CONFLICT (id) DO NOTHING;
    `;

    // Insert some basic topics
    await prisma.$executeRaw`
      INSERT INTO "Topic" (id, name, description, "moduleId", category, subcategory)
      VALUES 
        ('acls_topic', 'Advanced Cardiovascular Life Support (ACLS)', 'Advanced cardiac algorithms', 'adult_module', 'cardiac', 'algorithms'),
        ('pals_topic', 'Pediatric Advanced Life Support (PALS)', 'Pediatric emergency care protocols', 'pediatric_module', 'pediatric_advanced_life_support', 'algorithms'),
        ('airway_adult', 'Adult Airway Management', 'Advanced airway techniques in adults', 'adult_module', 'ventilation', 'airway_management'),
        ('airway_pediatric', 'Pediatric Airway Management', 'Advanced airway techniques in children', 'pediatric_module', 'ventilation', 'airway_management')
      ON CONFLICT ("moduleId", name) DO NOTHING;
    `;

    console.log('✅ Initial data seeded successfully');
    
    // Verify the setup
    const modules = await prisma.module.findMany({
      include: { _count: { select: { topics: true } } }
    });
    
    console.log('📊 Database setup complete:');
    modules.forEach(module => {
      console.log(`   - ${module.name} (${module.ageGroup}): ${module._count.topics} topics`);
    });

  } catch (error) {
    console.error('❌ Setup failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the setup
setupAccelerateDatabase()
  .then(() => {
    console.log('🎉 Accelerate database setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Setup failed:', error);
    process.exit(1);
  });