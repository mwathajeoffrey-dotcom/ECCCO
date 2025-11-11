#!/usr/bin/env tsx
console.log('🎯 Testing API response simulation...');

import { default as prisma } from '../src/lib/database/prisma-client';

async function simulateAPIResponse() {
  try {
    const modules = await prisma.module.findMany({
      include: { 
        topics: { 
          include: { 
            questions: {
              select: {
                id: true,
                question: true,
                difficulty: true
              }
            }
          } 
        } 
      }
    });
    
    console.log('🎯 API Response Simulation:');
    console.log(JSON.stringify({
      success: true,
      modules: modules.map(m => ({
        id: m.id,
        name: m.name,
        description: m.description,
        ageGroup: m.ageGroup,
        isActive: m.isActive,
        topicCount: m.topics.length,
        questionCount: m.topics.reduce((sum, t) => sum + t.questions.length, 0),
        topics: m.topics.map(t => ({
          id: t.id,
          name: t.name,
          category: t.category,
          questionCount: t.questions.length,
          sampleQuestion: t.questions[0]?.question.substring(0, 100) + '...' || 'No questions'
        }))
      }))
    }, null, 2));
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

simulateAPIResponse();