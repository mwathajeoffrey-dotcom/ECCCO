import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding dashboard demo data...');

  // Create demo topics
  const topics = [
    { id: 'bls', name: 'Basic Life Support (BLS)', description: 'Essential life-saving techniques' },
    { id: 'acls', name: 'Advanced Cardiovascular Life Support (ACLS)', description: 'Advanced cardiac algorithms' },
    { id: 'atls', name: 'Advanced Trauma Life Support (ATLS)', description: 'Trauma patient management' },
    { id: 'pals', name: 'Pediatric Advanced Life Support (PALS)', description: 'Pediatric emergency care' },
    { id: 'sepsis', name: 'Sepsis Management', description: 'Recognition and treatment of sepsis' }
  ];

  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { id: topic.id },
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

  // Create demo exam sessions with realistic data
  const sessionData = [
    {
      sessionId: 'demo-session-123',
      userId: demoUser.id,
      topicId: 'bls',
      topicName: 'Basic Life Support',
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
      topicId: 'acls',
      topicName: 'Advanced Cardiovascular Life Support',
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
      topicId: 'atls',
      topicName: 'Advanced Trauma Life Support',
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
      topicId: 'pals',
      topicName: 'Pediatric Advanced Life Support',
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