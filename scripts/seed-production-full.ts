#!/usr/bin/env tsx

/**
 * Seed Production Database with All Questions
 * 
 * This script copies all data from local database to production
 * Run with: DATABASE_URL='<prod-url>' npx tsx scripts/seed-production-full.ts
 */

import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function seedProduction() {
  console.log('🌱 Starting production database seed...\n');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is required');
    console.log('Usage: DATABASE_URL=\'<your-prod-url>\' npx tsx scripts/seed-production-full.ts');
    process.exit(1);
  }
  
  const prodDbUrl = process.env.DATABASE_URL;
  
  // Step 1: Read from local database
  console.log('📊 Checking local database...');
  
  // Temporarily use local database
  process.env.DATABASE_URL = "file:./prisma/dev.db";
  const { PrismaClient: LocalPrismaClient } = await import('@prisma/client');
  const localPrisma = new LocalPrismaClient();
  
  const localModules = await localPrisma.module.findMany();
  const localTopics = await localPrisma.topic.findMany();
  const localQuestions = await localPrisma.question.findMany();
  
  console.log(`✅ Found locally:`);
  console.log(`   - ${localModules.length} modules`);
  console.log(`   - ${localTopics.length} topics`);
  console.log(`   - ${localQuestions.length} questions\n`);
  
  await localPrisma.$disconnect();
  
  if (localQuestions.length === 0) {
    console.log('❌ No data in local database!');
    console.log('💡 Run: npx tsx scripts/seed.ts first\n');
    process.exit(1);
  }
  
  // Step 2: Connect to production
  console.log('📊 Connecting to production database...');
  process.env.DATABASE_URL = prodDbUrl;
  const prodPrisma = new PrismaClient();
  
  try {
    // Step 1: Check local data
    console.log('📊 Checking local database...');
    const localModules = await localPrisma.module.findMany();
    const localTopics = await localPrisma.topic.findMany();
    const localQuestions = await localPrisma.question.findMany();
    
    console.log(`✅ Found locally:`);
    console.log(`   - ${localModules.length} modules`);
    console.log(`   - ${localTopics.length} topics`);
    console.log(`   - ${localQuestions.length} questions\n`);
    
    if (localQuestions.length === 0) {
      console.log('❌ No data in local database!');
      console.log('💡 Run: npx tsx scripts/seed.ts first\n');
      process.exit(1);
    }
    
    // Step 2: Check production data
    console.log('📊 Checking production database...');
    const prodModuleCount = await prodPrisma.module.count();
    const prodTopicCount = await prodPrisma.topic.count();
    const prodQuestionCount = await prodPrisma.question.count();
    
    console.log(`✅ Found in production:`);
    console.log(`   - ${prodModuleCount} modules`);
    console.log(`   - ${prodTopicCount} topics`);
    console.log(`   - ${prodQuestionCount} questions\n`);
    
    if (prodQuestionCount > 0) {
      console.log('⚠️  Production database already has data!');
      console.log('💡 To re-seed, first clear production data or use different script\n');
      
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const answer = await new Promise<string>((resolve) => {
        readline.question('Continue anyway? (yes/no): ', resolve);
      });
      readline.close();
      
      if (answer.toLowerCase() !== 'yes') {
        console.log('❌ Cancelled by user');
        process.exit(0);
      }
    }
    
    // Step 3: Copy modules
    console.log('\n🏗️  Copying modules to production...');
    for (const module of localModules) {
      await prodPrisma.module.upsert({
        where: { id: module.id },
        update: {
          name: module.name,
          description: module.description,
          ageGroup: module.ageGroup,
          isActive: module.isActive
        },
        create: {
          id: module.id,
          name: module.name,
          description: module.description,
          ageGroup: module.ageGroup,
          isActive: module.isActive
        }
      });
      console.log(`   ✅ ${module.name}`);
    }
    
    // Step 4: Copy topics
    console.log('\n📚 Copying topics to production...');
    for (const topic of localTopics) {
      await prodPrisma.topic.upsert({
        where: { id: topic.id },
        update: {
          name: topic.name,
          description: topic.description,
          moduleId: topic.moduleId
        },
        create: {
          id: topic.id,
          name: topic.name,
          description: topic.description,
          moduleId: topic.moduleId
        }
      });
      console.log(`   ✅ ${topic.name}`);
    }
    
    // Step 5: Copy questions
    console.log('\n❓ Copying questions to production...');
    console.log(`   Processing ${localQuestions.length} questions...`);
    
    let copied = 0;
    let skipped = 0;
    
    for (const question of localQuestions) {
      try {
        await prodPrisma.question.create({
          data: {
            id: question.id,
            question: question.question,
            options: question.options,
            correctIndex: question.correctIndex,
            explanation: question.explanation,
            references: question.references,
            difficulty: question.difficulty,
            topicId: question.topicId,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt
          }
        });
        copied++;
        
        if (copied % 50 === 0) {
          console.log(`   📦 Copied ${copied}/${localQuestions.length}...`);
        }
      } catch (error: any) {
        if (error.code === 'P2002') {
          // Unique constraint violation - question already exists
          skipped++;
        } else {
          console.error(`   ❌ Error copying question ${question.id}:`, error.message);
        }
      }
    }
    
    console.log(`\n✅ Completed:`);
    console.log(`   - ${copied} questions copied`);
    console.log(`   - ${skipped} questions skipped (already exist)`);
    
    // Step 6: Verify
    console.log('\n🔍 Verifying production database...');
    const finalModuleCount = await prodPrisma.module.count();
    const finalTopicCount = await prodPrisma.topic.count();
    const finalQuestionCount = await prodPrisma.question.count();
    
    console.log(`✅ Production now has:`);
    console.log(`   - ${finalModuleCount} modules`);
    console.log(`   - ${finalTopicCount} topics`);
    console.log(`   - ${finalQuestionCount} questions`);
    
    console.log('\n🎉 Production database seeded successfully!\n');
    
  } catch (error) {
    console.error('\n❌ Error seeding production:', error);
    throw error;
  } finally {
    await localPrisma.$disconnect();
    await prodPrisma.$disconnect();
  }
}

// Run the seed
seedProduction()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
