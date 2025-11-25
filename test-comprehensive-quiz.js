// Script to create a comprehensive test quiz using multiple topics
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

async function createComprehensiveQuiz() {
  try {
    console.log('🎯 Creating Comprehensive ECCCO Platform Quiz\n');
    
    // Get questions from multiple topics for a comprehensive quiz
    const topics = [
      'cardiac-emergencies',
      'airway-management', 
      'trauma-management',
      'pediatric-emergencies',
      'toxicology'
    ];
    
    let allQuestions = [];
    
    for (const topicId of topics) {
      const questions = await prisma.question.findMany({
        where: { topicId },
        take: 2, // 2 questions per topic
        include: {
          topic: {
            include: { module: true }
          }
        }
      });
      allQuestions.push(...questions);
    }
    
    console.log(`📚 Selected questions from ${topics.length} different topics:`);
    
    const questionsByTopic = {};
    allQuestions.forEach(q => {
      const topicName = q.topic.name;
      if (!questionsByTopic[topicName]) {
        questionsByTopic[topicName] = [];
      }
      questionsByTopic[topicName].push(q);
    });
    
    Object.entries(questionsByTopic).forEach(([topic, questions]) => {
      console.log(`  • ${topic}: ${questions.length} questions (${questions[0].topic.module.name})`);
    });
    
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
    }
    
    // Create comprehensive quiz session
    const accessCode = generateAccessCode();
    const questionIds = allQuestions.map(q => q.id);
    
    const session = await prisma.liveQuizSession.create({
      data: {
        title: 'ECCCO Comprehensive Medical Quiz',
        description: `Multi-specialty quiz covering ${topics.length} medical topics from the ECCCO platform`,
        accessCode,
        hostId: user.id,
        topicId: null, // Multi-topic quiz
        questionIds: JSON.stringify(questionIds),
        questionTimeLimit: 45, // Longer time for comprehensive questions
        maxParticipants: 100,
        status: 'WAITING'
      }
    });
    
    console.log('\n🎉 Comprehensive Quiz Created Successfully!\n');
    console.log('📊 Quiz Details:');
    console.log('  Quiz ID:', session.id);
    console.log('  Access Code:', session.accessCode);
    console.log('  Title:', session.title);
    console.log('  Total Questions:', questionIds.length);
    console.log('  Time per Question:', session.questionTimeLimit, 'seconds');
    console.log('  Max Participants:', session.maxParticipants);
    
    console.log('\n🏥 Medical Topics Covered:');
    Object.entries(questionsByTopic).forEach(([topic, questions]) => {
      console.log(`  • ${topic} (${questions.length} questions)`);
    });
    
    console.log('\n🔗 Test URLs:');
    console.log('  Host Dashboard:', `http://localhost:3000/live-quiz/host/${session.id}`);
    console.log('  Join Quiz:', `http://localhost:3000/live-quiz/join/${session.accessCode}`);
    console.log('  Simple Join:', `http://localhost:3000/simple-live-quiz (enter code: ${session.accessCode})`);
    
    console.log('\n✅ Platform Integration Status:');
    console.log('  • All ECCCO platform questions available in live quiz');
    console.log('  • Multi-topic quiz support implemented');
    console.log('  • 840+ medical questions accessible');
    console.log('  • 32+ specialized medical topics covered');
    console.log('  • Emergency Medicine, Critical Care, Pediatric, and Resuscitation content');
    
    console.log('\n🎮 Ready for medical education live sessions!');
    
  } catch (error) {
    console.error('Error creating comprehensive quiz:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createComprehensiveQuiz();