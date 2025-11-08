import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding dashboard demo data...');

  // Get existing modules (should already exist from migration)
  const adultModule = await prisma.module.findFirst({
    where: { ageGroup: 'adult' }
  });

  if (!adultModule) {
    throw new Error('Adult module not found. Please run the migration first.');
  }

  // Create demo topics using existing module structure
  const demoTopics = [
    { name: 'Demo Basic Life Support', description: 'Demo BLS questions', moduleId: adultModule.id, category: 'basic_life_support' },
    { name: 'Demo ACLS Training', description: 'Demo ACLS questions', moduleId: adultModule.id, category: 'cardiac' },
    { name: 'Demo Sepsis Management', description: 'Demo sepsis questions', moduleId: adultModule.id, category: 'sepsis' }
  ];

  for (const topic of demoTopics) {
    await prisma.topic.upsert({
      where: { 
        moduleId_name: {
          moduleId: topic.moduleId,
          name: topic.name
        }
      },
      update: {},
      create: topic
    });
  }

  // Create a demo user
  const demoUser = await prisma.user.upsert({
    where: { sessionId: 'demo-session-123' },
    update: {},
    create: {
      sessionId: 'demo-session-123',
      name: 'Demo User',
      email: 'demo@eccco.com'
    }
  });

  // Get created topics for demo sessions
  const createdTopics = await prisma.topic.findMany({
    where: {
      name: {
        in: ['Demo Basic Life Support', 'Demo ACLS Training', 'Demo Sepsis Management']
      }
    }
  });

  // Get pediatric topics for additional demo sessions
  const pediatricTopics = await prisma.topic.findMany({
    where: {
      module: {
        ageGroup: 'pediatric'
      }
    },
    take: 1
  });

  const sessionData = [
    {
      sessionId: 'demo-session-123',
      userId: demoUser.id,
      topicId: createdTopics[0]?.id || 'fallback-topic-1',
      topicName: 'Demo Basic Life Support',
      questions: JSON.stringify(['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']),
      answers: JSON.stringify([0, 1, 2, 0, 1, 0, 2, 1, 0, 1]),
      score: 85,
      totalQuestions: 10,
      correctAnswers: 8,
      totalTime: 600, // 10 minutes
      completed: true,
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      sessionId: 'demo-session-124',
      userId: demoUser.id,
      topicId: createdTopics[1]?.id || 'fallback-topic-2',
      topicName: 'Demo ACLS Training',
      questions: JSON.stringify(Array.from({length: 15}, (_, i) => `q${i+1}`)),
      answers: JSON.stringify([0, 1, 2, 0, 1, 0, 2, 1, 0, 1, 2, 0, 1, 0, 2]),
      score: 72,
      totalQuestions: 15,
      correctAnswers: 11,
      totalTime: 900, // 15 minutes
      completed: true,
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      sessionId: 'demo-session-125',
      userId: demoUser.id,
      topicId: createdTopics[2]?.id || 'fallback-topic-3',
      topicName: 'Demo Sepsis Management',
      questions: JSON.stringify(Array.from({length: 20}, (_, i) => `q${i+1}`)),
      answers: JSON.stringify([0, 1, 2, 0, 1, 0, 2, 1, 0, 1, 2, 0, 1, 0, 2, 1, 0, 2, 1, 0]),
      score: 90,
      totalQuestions: 20,
      correctAnswers: 18,
      totalTime: 1200, // 20 minutes
      completed: true,
      completedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
    },
    {
      sessionId: 'demo-session-126',
      userId: demoUser.id,
      topicId: pediatricTopics[0]?.id || createdTopics[0]?.id || 'fallback-topic-4',
      topicName: pediatricTopics[0]?.name || 'Demo Pediatric Topic',
      questions: JSON.stringify(['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12']),
      answers: JSON.stringify([0, 1, 2, 0, 1, 0, 2, 1, 0, 1, 2, 0]),
      score: 58,
      totalQuestions: 12,
      correctAnswers: 7,
      totalTime: 720, // 12 minutes
      completed: true,
      completedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
    },
    {
      sessionId: 'demo-session-127',
      userId: demoUser.id,
      topicId: 'sepsis',
      topicName: 'Sepsis Management',
      questions: JSON.stringify(['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18']),
      answers: JSON.stringify([0, 1, 2, 0, 1, 0, 2, 1, 0, 1, 2, 0, 1, 0, 2, 1, 0, 2]),
      score: 78,
      totalQuestions: 18,
      correctAnswers: 14,
      totalTime: 1080, // 18 minutes
      completed: true,
      completedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
    }
  ];

  for (const session of sessionData) {
    await prisma.examSession.create({
      data: session
    });
  }

  console.log('✅ Dashboard demo data seeded successfully!');
  console.log('Demo user session ID: demo-session-123');
  console.log('You can test the dashboard by setting this session ID in localStorage');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });