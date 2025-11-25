// Test script to create a quiz session
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: "file:./prisma/dev.db"
});

// Generate a unique 6-character access code
function generateAccessCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function createTestQuiz() {
  try {
    console.log('Creating test quiz...');
    
    // Get some questions
    const questions = await prisma.question.findMany({
      where: { topicId: 'cardiac-emergencies' },
      take: 3
    });
    
    if (questions.length === 0) {
      console.log('No questions found! Make sure database is seeded.');
      return;
    }
    
    console.log(`Found ${questions.length} questions:`, questions.map(q => q.id));
    
    // Get or create a test user
    let user = await prisma.user.findFirst({
      where: { email: 'test@example.com' }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          password: 'test123'
        }
      });
      console.log('Created test user:', user.id);
    }
    
    // Create quiz session
    const accessCode = generateAccessCode();
    const questionIds = questions.map(q => q.id);
    
    const session = await prisma.liveQuizSession.create({
      data: {
        title: 'Test Cardiac Emergencies Quiz',
        description: 'A test quiz for cardiac emergencies',
        accessCode,
        hostId: user.id,
        topicId: 'cardiac-emergencies',
        questionIds: JSON.stringify(questionIds),
        questionTimeLimit: 30,
        maxParticipants: 50,
        status: 'WAITING'
      }
    });
    
    console.log('\n🎉 Quiz created successfully!');
    console.log('Quiz ID:', session.id);
    console.log('Access Code:', session.accessCode);
    console.log('Title:', session.title);
    console.log('Questions:', questionIds);
    console.log('\n📋 Test URLs:');
    console.log('Host Dashboard:', `http://localhost:3000/live-quiz/host/${session.id}`);
    console.log('Join Quiz:', `http://localhost:3000/live-quiz/join/${session.accessCode}`);
    console.log('Simple Join:', `http://localhost:3000/simple-live-quiz (enter code: ${session.accessCode})`);
    
  } catch (error) {
    console.error('Error creating quiz:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestQuiz();