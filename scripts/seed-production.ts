import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ECCCO production database...');

  // Get or create modules
  const adultModule = await prisma.module.upsert({
    where: { name: 'Adult Emergency Medicine' },
    update: {},
    create: {
      name: 'Adult Emergency Medicine',
      description: 'Adult emergency care, ACLS, trauma, and critical care topics',
      ageGroup: 'adult'
    }
  });

  const pediatricModule = await prisma.module.upsert({
    where: { name: 'Pediatric Emergency Medicine' },
    update: {},
    create: {
      name: 'Pediatric Emergency Medicine',
      description: 'Pediatric emergency care, PALS, and critical care topics',
      ageGroup: 'pediatric'
    }
  });

  // Create adult medical topics
  const adultTopics = [
    { name: 'Basic Life Support (BLS)', description: 'Essential life-saving techniques for cardiac arrest', moduleId: adultModule.id, category: 'basic_life_support' },
    { name: 'Advanced Cardiovascular Life Support (ACLS)', description: 'Advanced algorithms for cardiac arrest', moduleId: adultModule.id, category: 'cardiac' },
    { name: 'Advanced Trauma Life Support (ATLS)', description: 'Systematic approach to trauma patient assessment', moduleId: adultModule.id, category: 'trauma' },
    { name: 'Airway Management', description: 'Techniques for securing and maintaining airways', moduleId: adultModule.id, category: 'ventilation' },
    { name: 'Blood Gas Analysis', description: 'Interpretation of arterial blood gases', moduleId: adultModule.id, category: 'ventilation' },
    { name: 'Cardiac Emergencies', description: 'Management of acute cardiac conditions', moduleId: adultModule.id, category: 'cardiac' },
    { name: 'ECG Emergencies', description: 'Recognition and management of life-threatening ECG findings', moduleId: adultModule.id, category: 'cardiac' },
    { name: 'Critical Care Emergencies', description: 'Management of critically ill patients', moduleId: adultModule.id, category: 'general' },
    { name: 'Electrolyte Emergencies', description: 'Recognition and treatment of electrolyte imbalances', moduleId: adultModule.id, category: 'electrolytes' },
    { name: 'Mechanical Ventilation', description: 'Principles and management of mechanical ventilation', moduleId: adultModule.id, category: 'ventilation' },
    { name: 'Sepsis Management', description: 'Early recognition and management of sepsis', moduleId: adultModule.id, category: 'sepsis' },
    { name: 'Trauma Management', description: 'Comprehensive approach to multi-system trauma', moduleId: adultModule.id, category: 'trauma' }
  ];

  // Create pediatric medical topics  
  const pediatricTopics = [
    { name: 'Pediatric Advanced Life Support (PALS)', description: 'Advanced life support algorithms for pediatric patients', moduleId: pediatricModule.id, category: 'pediatric_advanced_life_support' },
    { name: 'Pediatric Emergencies', description: 'Emergency care considerations specific to children', moduleId: pediatricModule.id, category: 'general' },
    { name: 'Pediatric Airway Management', description: 'Pediatric-specific airway management techniques', moduleId: pediatricModule.id, category: 'ventilation' },
    { name: 'Pediatric Sepsis', description: 'Recognition and management of pediatric sepsis', moduleId: pediatricModule.id, category: 'sepsis' },
    { name: 'Pediatric Trauma', description: 'Trauma management in children', moduleId: pediatricModule.id, category: 'trauma' }
  ];

  console.log('📚 Creating adult topics...');
  for (const topic of adultTopics) {
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

  console.log('� Creating pediatric topics...');
  for (const topic of pediatricTopics) {
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

  // Create essential PALS questions for production
  console.log('❓ Creating essential PALS questions...');
  const palsTopicId = (await prisma.topic.findFirst({
    where: { 
      name: 'Pediatric Advanced Life Support (PALS)',
      moduleId: pediatricModule.id
    }
  }))?.id;

  if (palsTopicId) {
    const palsQuestions = [
      {
        question: "What is the recommended initial dose of epinephrine for pediatric cardiac arrest?",
        options: JSON.stringify([
          "0.01 mg/kg (0.1 mL/kg of 1:10,000)",
          "0.1 mg/kg (0.1 mL/kg of 1:1,000)", 
          "0.01 mg/kg (0.01 mL/kg of 1:1,000)",
          "1 mg regardless of weight"
        ]),
        correctIndex: 0,
        explanation: "The recommended initial dose of epinephrine for pediatric cardiac arrest is 0.01 mg/kg (0.1 mL/kg of 1:10,000 solution) administered IV/IO. This dose may be repeated every 3-5 minutes during resuscitation.",
        references: JSON.stringify([
          "AHA PALS Provider Manual 2020",
          "Part 11: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines"
        ]),
        difficulty: "medium",
        topicId: palsTopicId
      },
      
      {
        question: "In pediatric CPR, what is the correct compression-to-ventilation ratio for 2-rescuer CPR?",
        options: JSON.stringify([
          "30:2",
          "15:2",
          "5:1",
          "3:1"
        ]),
        correctIndex: 1,
        explanation: "For 2-rescuer pediatric CPR, the compression-to-ventilation ratio is 15:2. This allows for more frequent ventilations while maintaining adequate compressions. Single-rescuer CPR uses 30:2 ratio.",
        references: JSON.stringify([
          "AHA PALS Provider Manual 2020",
          "Pediatric CPR Guidelines 2020"
        ]),
        difficulty: "easy",
        topicId: palsTopicId
      },
      
      {
        question: "A 4-year-old child presents with supraventricular tachycardia (SVT) with a heart rate of 220 bpm and poor perfusion. What is the initial energy dose for synchronized cardioversion?",
        options: JSON.stringify([
          "0.5-1 J/kg",
          "2 J/kg",
          "4 J/kg",
          "6 J/kg"
        ]),
        correctIndex: 0,
        explanation: "The initial energy dose for synchronized cardioversion in pediatric SVT is 0.5-1 J/kg. If unsuccessful, increase to 2 J/kg for subsequent attempts. This graduated approach minimizes potential cardiac injury.",
        references: JSON.stringify([
          "AHA PALS Provider Manual 2020",
          "Pediatric Arrhythmia Management Guidelines"
        ]),
        difficulty: "hard",
        topicId: palsTopicId
      },
      
      {
        question: "What is the minimum systolic blood pressure for a 6-year-old child?",
        options: JSON.stringify([
          "70 + (2 × age in years) = 82 mmHg",
          "90 mmHg regardless of age",
          "60 + (2 × age in years) = 72 mmHg",
          "80 mmHg for all school-age children"
        ]),
        correctIndex: 0,
        explanation: "The minimum systolic blood pressure for children 1-10 years is calculated as 70 + (2 × age in years). For a 6-year-old: 70 + (2 × 6) = 82 mmHg. This formula helps identify hypotension in pediatric patients.",
        references: JSON.stringify([
          "AHA PALS Provider Manual 2020",
          "Pediatric Vital Signs Reference"
        ]),
        difficulty: "medium",
        topicId: palsTopicId
      },
      
      {
        question: "Which of the following best describes the appropriate treatment for pediatric bradycardia with poor perfusion?",
        options: JSON.stringify([
          "Immediate transcutaneous pacing",
          "Epinephrine 0.01 mg/kg IV/IO",
          "Support ventilation and oxygenation first, then epinephrine if needed",
          "Atropine 0.02 mg/kg IV/IO"
        ]),
        correctIndex: 2,
        explanation: "For pediatric bradycardia with poor perfusion, first support ventilation and oxygenation as hypoxemia is often the cause. If bradycardia persists despite adequate oxygenation and ventilation, then consider epinephrine 0.01 mg/kg IV/IO.",
        references: JSON.stringify([
          "AHA PALS Provider Manual 2020",
          "Pediatric Bradycardia Algorithm"
        ]),
        difficulty: "hard",
        topicId: palsTopicId
      }
    ];

    for (const questionData of palsQuestions) {
      await prisma.question.create({
        data: questionData
      });
    }
  }

  // Create essential BLS questions for production
  console.log('❓ Creating essential BLS questions...');
  const blsTopicId = (await prisma.topic.findFirst({
    where: { 
      name: 'Basic Life Support (BLS)',
      moduleId: adultModule.id
    }
  }))?.id;
  
  if (blsTopicId) {
    const blsQuestions = [
      {
        question: "What is the correct compression depth for adult CPR?",
        options: JSON.stringify([
          "At least 2 inches (5 cm) but no more than 2.4 inches (6 cm)",
          "Exactly 2 inches (5 cm)",
          "1.5-2 inches (4-5 cm)", 
          "2-3 inches (5-7.5 cm)"
        ]),
        correctIndex: 0,
        explanation: "Adult CPR compressions should be at least 2 inches (5 cm) deep but should not exceed 2.4 inches (6 cm) to avoid injury while ensuring adequate circulation.",
        references: JSON.stringify([
          "AHA BLS Provider Manual 2020",
          "Part 5: Adult Basic Life Support and Cardiopulmonary Resuscitation Quality"
        ]),
        difficulty: "easy",
        topicId: blsTopicId
      },
      
      {
        question: "At what rate should chest compressions be performed during CPR?",
        options: JSON.stringify([
          "100-120 compressions per minute",
          "At least 120 compressions per minute",
          "80-100 compressions per minute",
          "60-80 compressions per minute"
        ]),
        correctIndex: 0,
        explanation: "Chest compressions should be performed at a rate of 100-120 compressions per minute. This rate ensures adequate perfusion while allowing for complete chest recoil between compressions.",
        references: JSON.stringify([
          "AHA BLS Provider Manual 2020"
        ]),
        difficulty: "easy",
        topicId: blsTopicId
      }
    ];

    for (const questionData of blsQuestions) {
      await prisma.question.create({
        data: questionData
      });
    }
  }

  // Only create demo user and data in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('👤 Creating demo user and sample data...');
    
    const demoUser = await prisma.user.upsert({
      where: { sessionId: 'demo-session-123' },
      update: {},
      create: {
        sessionId: 'demo-session-123',
        name: 'Demo User',
        email: 'demo@eccco.com'
      }
    });

    // Create realistic demo exam sessions
    const sampleSessions = [
      {
        sessionId: 'demo-session-123',
        userId: demoUser.id,
        topicId: blsTopicId || '',
        topicName: 'Basic Life Support (BLS)',
        questions: JSON.stringify(['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']),
        answers: JSON.stringify([0, 1, 2, 0, 1, 0, 2, 1, 0, 1]),
        score: 85,
        totalQuestions: 10,
        correctAnswers: 8,
        totalTime: 600,
        completed: true,
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        sessionId: 'demo-session-124',
        userId: demoUser.id,
        topicId: palsTopicId || '',
        topicName: 'Pediatric Advanced Life Support (PALS)',
        questions: JSON.stringify(Array.from({length: 15}, (_, i) => `q${i+1}`)),
        answers: JSON.stringify([0, 1, 2, 0, 1, 0, 2, 1, 0, 1, 2, 0, 1, 0, 2]),
        score: 72,
        totalQuestions: 15,
        correctAnswers: 11,
        totalTime: 900,
        completed: true,
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];

    for (const session of sampleSessions) {
      await prisma.examSession.create({
        data: session
      });
    }
  } else {
    // Create analytics tracking structure for production
    console.log('📊 Creating production analytics structure...');
    await prisma.user.upsert({
      where: { sessionId: 'production-analytics' },
      update: {},
      create: {
        sessionId: 'production-analytics',
        name: 'Analytics Tracker'
      }
    });
  }

  const questionCount = await prisma.question.count();
  const topicCount = await prisma.topic.count();

  console.log('✅ ECCCO database seeded successfully!');
  console.log(`📊 Created ${topicCount} medical topics and ${questionCount} questions`);
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('🎯 Demo data available for testing');
  } else {
    console.log('🚀 Production database ready with essential content');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });