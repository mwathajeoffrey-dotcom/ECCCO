/**
 * Check PALS questions in database
 */

import { prisma } from '@/lib/db';

async function checkPALSQuestions() {
  try {
    // Get all topics
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            Question: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    console.log(`\n📚 Total Topics: ${topics.length}\n`);
    
    // Check for PALS-related topics
    const palsTopics = topics.filter(t => 
      t.name.toLowerCase().includes('pals') || 
      t.name.toLowerCase().includes('pediatric')
    );
    
    if (palsTopics.length > 0) {
      console.log('✅ PALS/Pediatric Topics Found:');
      palsTopics.forEach(t => {
        console.log(`  - ${t.name}: ${t._count.Question} questions`);
        if (t.description) {
          console.log(`    ${t.description}`);
        }
      });
    } else {
      console.log('⚠️  No PALS/Pediatric topics found\n');
      console.log('📋 All topics:');
      topics.forEach(t => {
        console.log(`  - ${t.name}: ${t._count.Question} questions`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking PALS questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPALSQuestions();
