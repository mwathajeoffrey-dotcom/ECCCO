// Test script to add a participant to the quiz
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: "file:./prisma/dev.db"
});

async function addTestParticipant() {
  try {
    console.log('Adding test participant...');
    
    // Find the quiz session we created
    const session = await prisma.liveQuizSession.findFirst({
      where: { accessCode: '48OO73' }
    });
    
    if (!session) {
      console.log('Quiz session not found with access code 48OO73');
      return;
    }
    
    console.log('Found quiz session:', session.title);
    
    // Add a test participant
    const participant = await prisma.liveQuizParticipant.create({
      data: {
        sessionId: session.id,
        nickname: 'Dr. Test User',
        score: 0,
        isActive: true
      }
    });
    
    console.log('✅ Test participant added:');
    console.log('- Participant ID:', participant.id);
    console.log('- Nickname:', participant.nickname);
    console.log('- Session ID:', participant.sessionId);
    
    // Get all participants for this session
    const allParticipants = await prisma.liveQuizParticipant.findMany({
      where: { sessionId: session.id, isActive: true }
    });
    
    console.log(`\n📊 Total participants in quiz: ${allParticipants.length}`);
    allParticipants.forEach((p, i) => {
      console.log(`${i + 1}. ${p.nickname} (Score: ${p.score})`);
    });
    
    console.log('\n🔗 Test the quiz now:');
    console.log('Host Dashboard:', `http://localhost:3000/live-quiz/host/${session.id}`);
    console.log('Join as participant:', `http://localhost:3000/live-quiz/join/${session.accessCode}`);
    
  } catch (error) {
    console.error('Error adding participant:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestParticipant();