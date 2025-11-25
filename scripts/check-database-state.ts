#!/usr/bin/env tsx
console.log('📊 Checking current database state...');

import { default as prisma } from '../src/lib/database/prisma-client';

async function checkCurrentData() {
  try {
    const modules = await prisma.module.findMany({ 
      include: { 
        topics: { 
          include: { 
            questions: true 
          } 
        } 
      } 
    });
    
    console.log('📊 Current Database State:');
    modules.forEach((module: any) => {
      console.log(`📚 ${module.name} (${module.ageGroup})`);
      module.topics.forEach((topic: any) => {
        console.log(`  📝 ${topic.name}: ${topic.questions.length} questions`);
      });
    });
    
    const totalQuestions = modules.reduce((total: number, module: any) => 
      total + module.topics.reduce((topicTotal: number, topic: any) => topicTotal + topic.questions.length, 0), 0
    );
    
    console.log(`\n🔢 Total Questions: ${totalQuestions}`);
    
    if (totalQuestions === 0) {
      console.log('\n🌱 Database has modules but no questions yet. Ready to populate!');
    }
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkCurrentData();