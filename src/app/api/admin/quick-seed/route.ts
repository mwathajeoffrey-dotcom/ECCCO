import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Quick seed - creates only essential topics with a few questions each
// This is fast enough to run within Vercel's 10-second timeout

export async function POST() {
  try {
    console.log('🌱 Quick seed starting...');
    
    const prisma = new PrismaClient();
    
    // Check if already seeded
    const questionCount = await prisma.question.count();
    if (questionCount > 0) {
      return NextResponse.json({
        success: true,
        message: 'Database already has data',
        counts: { questions: questionCount }
      });
    }
    
    // Create modules
    const emergencyMedicine = await prisma.module.upsert({
      where: { name: 'Emergency Medicine' },
      update: {},
      create: {
        name: 'Emergency Medicine',
        description: 'Core emergency medicine topics',
        ageGroup: 'adult',
        isActive: true
      }
    });
    
    // Create ACLS topic with sample questions
    const aclsTopic = await prisma.topic.upsert({
      where: {
        name_moduleId: {
          name: 'ACLS',
          moduleId: emergencyMedicine.id
        }
      },
      update: {},
      create: {
        name: 'ACLS',
        description: 'Advanced Cardiovascular Life Support',
        moduleId: emergencyMedicine.id,
        difficulty: 'advanced',
        isActive: true
      }
    });
    
    // Create BLS topic
    const blsTopic = await prisma.topic.upsert({
      where: {
        name_moduleId: {
          name: 'BLS',
          moduleId: emergencyMedicine.id
        }
      },
      update: {},
      create: {
        name: 'BLS',
        description: 'Basic Life Support',
        moduleId: emergencyMedicine.id,
        difficulty: 'foundational',
        isActive: true
      }
    });
    
    // Create Cardiac topic
    const cardiacTopic = await prisma.topic.upsert({
      where: {
        name_moduleId: {
          name: 'Cardiac Emergencies',
          moduleId: emergencyMedicine.id
        }
      },
      update: {},
      create: {
        name: 'Cardiac Emergencies',
        description: 'Cardiac emergency management',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        isActive: true
      }
    });
    
    // Sample questions
    const sampleQuestions = [
      {
        topicId: aclsTopic.id,
        questionText: 'What is the first step in the ACLS cardiac arrest algorithm?',
        options: [
          'Start CPR',
          'Check for pulse',
          'Attach defibrillator',
          'Give epinephrine'
        ],
        correctAnswer: 0,
        explanation: 'High-quality CPR should be initiated immediately upon recognition of cardiac arrest.',
        difficulty: 'intermediate',
        category: 'ACLS',
        tags: ['cardiac-arrest', 'cpr', 'acls-algorithm']
      },
      {
        topicId: aclsTopic.id,
        questionText: 'What is the recommended compression depth for adult CPR?',
        options: [
          '1-2 inches',
          '2-2.4 inches',
          '3-4 inches',
          '4-5 inches'
        ],
        correctAnswer: 1,
        explanation: 'Current guidelines recommend compression depth of 2 to 2.4 inches (5-6 cm) for adults.',
        difficulty: 'foundational',
        category: 'BLS',
        tags: ['cpr', 'compression-depth']
      },
      {
        topicId: blsTopic.id,
        questionText: 'What is the compression to ventilation ratio for single-rescuer adult CPR?',
        options: [
          '15:2',
          '30:2',
          '15:1',
          '30:1'
        ],
        correctAnswer: 1,
        explanation: 'For single-rescuer adult CPR, the ratio is 30 compressions to 2 ventilations.',
        difficulty: 'foundational',
        category: 'BLS',
        tags: ['cpr', 'ventilation']
      },
      {
        topicId: cardiacTopic.id,
        questionText: 'What is the first-line treatment for unstable bradycardia?',
        options: [
          'Epinephrine',
          'Atropine',
          'Dopamine',
          'Transcutaneous pacing'
        ],
        correctAnswer: 1,
        explanation: 'Atropine 0.5 mg IV is the first-line treatment for unstable bradycardia, repeated every 3-5 minutes up to 3 mg.',
        difficulty: 'intermediate',
        category: 'Cardiac',
        tags: ['bradycardia', 'acls']
      },
      {
        topicId: cardiacTopic.id,
        questionText: 'Which of the following is a shockable rhythm in cardiac arrest?',
        options: [
          'Asystole',
          'Pulseless electrical activity (PEA)',
          'Ventricular fibrillation',
          'Sinus bradycardia'
        ],
        correctAnswer: 2,
        explanation: 'Ventricular fibrillation (VF) and pulseless ventricular tachycardia (pVT) are shockable rhythms. Asystole and PEA are non-shockable.',
        difficulty: 'foundational',
        category: 'Cardiac',
        tags: ['cardiac-arrest', 'arrhythmia', 'defibrillation']
      }
    ];
    
    // Create the questions
    for (const q of sampleQuestions) {
      await prisma.question.create({
        data: {
          ...q,
          references: [],
          metadata: {}
        }
      });
    }
    
    await prisma.$disconnect();
    
    const finalCount = await new PrismaClient().question.count();
    
    return NextResponse.json({
      success: true,
      message: 'Quick seed completed',
      counts: {
        questions: finalCount
      }
    });
    
  } catch (error) {
    console.error('Error in quick seed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
