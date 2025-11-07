import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ECCCO production database...');

  // Create all medical topics
  const topics = [
    { id: 'bls', name: 'Basic Life Support (BLS)', description: 'Essential life-saving techniques for cardiac arrest and respiratory emergencies' },
    { id: 'acls', name: 'Advanced Cardiovascular Life Support (ACLS)', description: 'Advanced algorithms for cardiac arrest and cardiovascular emergencies' },
    { id: 'atls', name: 'Advanced Trauma Life Support (ATLS)', description: 'Systematic approach to trauma patient assessment and management' },
    { id: 'airway-management', name: 'Airway Management', description: 'Techniques for securing and maintaining patient airways in emergency situations' },
    { id: 'blood-gas-analysis', name: 'Blood Gas Analysis', description: 'Interpretation of arterial blood gases and acid-base disorders' },
    { id: 'chest-xray-interpretation', name: 'Chest X-ray Interpretation', description: 'Systematic approach to reading and interpreting chest radiographs' },
    { id: 'cardiac-emergencies', name: 'Cardiac Emergencies', description: 'Management of acute cardiac conditions and arrhythmias' },
    { id: 'ecg-emergencies', name: 'ECG Emergencies', description: 'Recognition and management of life-threatening ECG findings' },
    { id: 'ecg-rhythm-identification', name: 'ECG Rhythm Identification', description: 'Systematic approach to identifying cardiac rhythms and arrhythmias' },
    { id: 'advanced-ecg-interpretation', name: 'Advanced ECG Interpretation', description: 'Complex ECG analysis including ST elevation, conduction blocks, and intervals' },
    { id: 'critical-care-emergencies', name: 'Critical Care Emergencies', description: 'Management of critically ill patients requiring intensive care' },
    { id: 'electrolyte-emergencies', name: 'Electrolyte Emergencies', description: 'Recognition and treatment of dangerous electrolyte imbalances' },
    { id: 'endocrine-emergencies', name: 'Endocrine Emergencies', description: 'Management of diabetic ketoacidosis, thyroid storm, and adrenal crisis' },
    { id: 'environmental-emergencies', name: 'Environmental Emergencies', description: 'Treatment of heat stroke, hypothermia, and environmental exposures' },
    { id: 'geriatric-emergencies', name: 'Geriatric Emergencies', description: 'Special considerations for emergency care in elderly patients' },
    { id: 'hematologic-emergencies', name: 'Hematologic Emergencies', description: 'Management of bleeding disorders and hematologic crises' },
    { id: 'infectious-disease-emergencies', name: 'Infectious Disease Emergencies', description: 'Recognition and treatment of serious infections and sepsis' },
    { id: 'mechanical-ventilation', name: 'Mechanical Ventilation', description: 'Principles and management of mechanical ventilation in critical care' },
    { id: 'neurological-emergencies', name: 'Neurological Emergencies', description: 'Management of stroke, seizures, and altered mental status' },
    { id: 'obstetric-gynecologic-emergencies', name: 'OB/GYN Emergencies', description: 'Emergency care for pregnancy-related and gynecologic conditions' },
    { id: 'pals', name: 'Pediatric Advanced Life Support (PALS)', description: 'Advanced life support algorithms for pediatric patients' },
    { id: 'pediatric-emergencies', name: 'Pediatric Emergencies', description: 'Emergency care considerations specific to children and infants' },
    { id: 'pharmacology-emergencies', name: 'Pharmacology Emergencies', description: 'Emergency medications, dosing, and drug interactions' },
    { id: 'point-of-care-ultrasound', name: 'Point-of-Care Ultrasound', description: 'Bedside ultrasound techniques for emergency diagnosis' },
    { id: 'procedures', name: 'Procedures', description: 'Emergency procedures including intubation, chest tubes, and central lines' },
    { id: 'psychiatric-emergencies', name: 'Psychiatric Emergencies', description: 'Management of agitation, psychosis, and suicidal patients' },
    { id: 'renal-emergencies', name: 'Renal Emergencies', description: 'Acute kidney injury, dialysis complications, and urologic emergencies' },
    { id: 'respiratory-emergencies', name: 'Respiratory Emergencies', description: 'Management of asthma, COPD exacerbations, and respiratory failure' },
    { id: 'sepsis-management', name: 'Sepsis Management', description: 'Early recognition and management of sepsis and septic shock' },
    { id: 'toxicology', name: 'Toxicology', description: 'Management of poisoning, overdoses, and toxic exposures' },
    { id: 'trauma-management', name: 'Trauma Management', description: 'Comprehensive approach to multi-system trauma patients' }
  ];

  console.log('📚 Creating topics...');
  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { id: topic.id },
      update: {},
      create: topic
    });
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
        topicId: 'bls',
        questions: JSON.stringify(['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']),
        answers: JSON.stringify([0, 1, 2, 0, 1, 0, 2, 1, 0, 1]),
        score: 85,
        totalQuestions: 10,
        correctAnswers: 8,
        totalTime: 600,
        completed: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        sessionId: 'demo-session-124',
        userId: demoUser.id,
        topicId: 'acls',
        questions: JSON.stringify(Array.from({length: 15}, (_, i) => `q${i+1}`)),
        answers: JSON.stringify([0, 1, 2, 0, 1, 0, 2, 1, 0, 1, 2, 0, 1, 0, 2]),
        score: 72,
        totalQuestions: 15,
        correctAnswers: 11,
        totalTime: 900,
        completed: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        sessionId: 'demo-session-125',
        userId: demoUser.id,
        topicId: 'atls',
        questions: JSON.stringify(Array.from({length: 20}, (_, i) => `q${i+1}`)),
        answers: JSON.stringify([0, 1, 2, 0, 1, 0, 2, 1, 0, 1, 2, 0, 1, 0, 2, 1, 0, 2, 1, 0]),
        score: 90,
        totalQuestions: 20,
        correctAnswers: 18,
        totalTime: 1200,
        completed: true,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
      }
    ];

    for (const session of sampleSessions) {
      await prisma.examSession.create({
        data: session
      });
    }
  }

  console.log('✅ ECCCO database seeded successfully!');
  console.log(`📊 Created ${topics.length} medical topics`);
  if (process.env.NODE_ENV !== 'production') {
    console.log('🎯 Demo data available for testing');
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