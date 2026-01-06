const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testLiveQuiz() {
  try {
    console.log('🧪 Testing Live Quiz Database Access...\n');
    
    // Test 1: Can we query LiveQuizSession?
    console.log('1️⃣  Testing LiveQuizSession table...');
    const sessionCount = await prisma.$queryRaw`
      SELECT COUNT(*) FROM "LiveQuizSession"
    `;
    console.log(`   ✅ LiveQuizSession accessible - ${sessionCount[0].count} records\n`);
    
    // Test 2: Can we query LiveQuizParticipant?
    console.log('2️⃣  Testing LiveQuizParticipant table...');
    const participantCount = await prisma.$queryRaw`
      SELECT COUNT(*) FROM "LiveQuizParticipant"
    `;
    console.log(`   ✅ LiveQuizParticipant accessible - ${participantCount[0].count} records\n`);
    
    // Test 3: Can we query LiveQuizAnswer?
    console.log('3️⃣  Testing LiveQuizAnswer table...');
    const answerCount = await prisma.$queryRaw`
      SELECT COUNT(*) FROM "LiveQuizAnswer"
    `;
    console.log(`   ✅ LiveQuizAnswer accessible - ${answerCount[0].count} records\n`);
    
    console.log('🎉 All Live Quiz tables are accessible and working!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n💡 Tip: Make sure your DATABASE_URL is set correctly in .env.local');
  } finally {
    await prisma.$disconnect();
  }
}

testLiveQuiz();
