const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testLiveQuizTables() {
  try {
    console.log('🧪 Testing Live Quiz tables...\n');
    
    // Test 1: Count sessions
    const sessionCount = await prisma.liveQuizSession.count();
    console.log(`✅ LiveQuizSession table accessible - ${sessionCount} records`);
    
    // Test 2: Count participants
    const participantCount = await prisma.liveQuizParticipant.count();
    console.log(`✅ LiveQuizParticipant table accessible - ${participantCount} records`);
    
    // Test 3: Count answers
    const answerCount = await prisma.liveQuizAnswer.count();
    console.log(`✅ LiveQuizAnswer table accessible - ${answerCount} records`);
    
    console.log('\n🎉 All Live Quiz tables are working!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testLiveQuizTables();
