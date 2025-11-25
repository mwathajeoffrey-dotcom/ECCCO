#!/usr/bin/env tsx

/**
 * Direct Production Seed
 * Seeds production database directly from question files
 * No local database dependency - works around Prisma schema provider conflicts
 * 
 * Usage: DATABASE_URL='<prod-url>' npx tsx scripts/seed-direct.ts
 */

import { PrismaClient } from '@prisma/client';

// Import all question files
import { airwayManagementQuestions } from '../src/lib/questions/airway-management';
import { mechanicalVentilationQuestions } from '../src/lib/questions/mechanical-ventilation';
import { sepsisManagementQuestions } from '../src/lib/questions/sepsis-management';
import { cardiacEmergenciesQuestions } from '../src/lib/questions/cardiac-emergencies';
import { neurologicalEmergenciesQuestions } from '../src/lib/questions/neurological-emergencies';
import { toxicologyQuestions } from '../src/lib/questions/toxicology';
import { traumaManagementQuestions } from '../src/lib/questions/trauma-management';
import { pediatricEmergenciesQuestions } from '../src/lib/questions/pediatric-emergencies';
import { ecgEmergenciesQuestions } from '../src/lib/questions/ecg-emergencies';
import { electrolyteEmergenciesQuestions } from '../src/lib/questions/electrolyte-emergencies';
import { bloodGasAnalysisQuestions } from '../src/lib/questions/blood-gas-analysis';
import { aclsQuestions } from '../src/lib/questions/acls';
import { blsQuestions } from '../src/lib/questions/bls';
import { atlsQuestions } from '../src/lib/questions/atls';
import { palsQuestions } from '../src/lib/questions/pals';
import { ecgRhythmIdentificationQuestions } from '../src/lib/questions/ecg-rhythm-identification';
import { shockManagementQuestions } from '../src/lib/questions/shock-management';
import { respiratoryEmergenciesQuestions } from '../src/lib/questions/respiratory-emergencies';
import { renalEmergenciesQuestions } from '../src/lib/questions/renal-emergencies';
import { endocrineEmergenciesQuestions } from '../src/lib/questions/endocrine-emergencies';
import { infectiousDiseaseQuestions } from '../src/lib/questions/infectious-diseases';
import { environmentalEmergenciesQuestions } from '../src/lib/questions/environmental-emergencies';
import { obstetricalEmergenciesQuestions } from '../src/lib/questions/obstetrical-emergencies';
import { psychiatricEmergenciesQuestions } from '../src/lib/questions/psychiatric-emergencies';

async function seedDirect() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is required');
    console.log('Usage: DATABASE_URL=\'<prod-url>\' npx tsx scripts/seed-direct.ts');
    process.exit(1);
  }

  console.log('🌱 Starting direct production seed...\n');
  
  const prisma = new PrismaClient();

  try {
    // Check if already seeded
    const existingQuestions = await prisma.question.count();
    if (existingQuestions > 0) {
      console.log(`⚠️  Database already has ${existingQuestions} questions`);
      console.log('Skipping seed to avoid duplicates.\n');
      return;
    }

    console.log('📚 Creating modules...');
    
    const emergencyMedicine = await prisma.module.upsert({
      where: { name: 'Emergency Medicine' },
      update: {},
      create: {
        name: 'Emergency Medicine',
        description: 'Core emergency medicine topics and protocols',
        ageGroup: 'adult',
        isActive: true
      }
    });

    const criticalCare = await prisma.module.upsert({
      where: { name: 'Critical Care' },
      update: {},
      create: {
        name: 'Critical Care',
        description: 'Critical care and intensive care medicine',
        ageGroup: 'adult',
        isActive: true
      }
    });

    const pediatricEmergency = await prisma.module.upsert({
      where: { name: 'Pediatric Emergency' },
      update: {},
      create: {
        name: 'Pediatric Emergency',
        description: 'Pediatric emergency medicine and critical care',
        ageGroup: 'pediatric',
        isActive: true
      }
    });

    console.log('✅ Modules created\n');
    console.log('📖 Creating topics and questions...\n');

    // Define all topics with their questions
    const topicsData = [
      {
        name: 'Airway Management',
        description: 'Advanced airway management techniques and emergency procedures',
        moduleId: emergencyMedicine.id,
        category: 'airway',
        questions: airwayManagementQuestions
      },
      {
        name: 'Mechanical Ventilation',
        description: 'Mechanical ventilation principles, modes, and management',
        moduleId: criticalCare.id,
        category: 'ventilation',
        questions: mechanicalVentilationQuestions
      },
      {
        name: 'Sepsis Management',
        description: 'Early recognition and management of sepsis',
        moduleId: emergencyMedicine.id,
        category: 'sepsis',
        questions: sepsisManagementQuestions
      },
      {
        name: 'Cardiac Emergencies',
        description: 'Acute cardiac conditions and interventions',
        moduleId: emergencyMedicine.id,
        category: 'cardiac',
        questions: cardiacEmergenciesQuestions
      },
      {
        name: 'Neurological Emergencies',
        description: 'Acute neurological conditions and management',
        moduleId: emergencyMedicine.id,
        category: 'neuro',
        questions: neurologicalEmergenciesQuestions
      },
      {
        name: 'Toxicology',
        description: 'Poisoning and overdose management',
        moduleId: emergencyMedicine.id,
        category: 'toxicology',
        questions: toxicologyQuestions
      },
      {
        name: 'Trauma Management',
        description: 'Trauma assessment and resuscitation',
        moduleId: emergencyMedicine.id,
        category: 'trauma',
        questions: traumaManagementQuestions
      },
      {
        name: 'Pediatric Emergencies',
        description: 'Pediatric emergency presentations and management',
        moduleId: pediatricEmergency.id,
        category: 'pediatric',
        questions: pediatricEmergenciesQuestions
      },
      {
        name: 'ECG Emergencies',
        description: 'ECG interpretation in emergency situations',
        moduleId: emergencyMedicine.id,
        category: 'ecg',
        questions: ecgEmergenciesQuestions
      },
      {
        name: 'Electrolyte Emergencies',
        description: 'Electrolyte disorders and management',
        moduleId: criticalCare.id,
        category: 'electrolytes',
        questions: electrolyteEmergenciesQuestions
      },
      {
        name: 'Blood Gas Analysis',
        description: 'ABG interpretation and acid-base disorders',
        moduleId: criticalCare.id,
        category: 'diagnostics',
        questions: bloodGasAnalysisQuestions
      },
      {
        name: 'ACLS',
        description: 'Advanced Cardiovascular Life Support protocols',
        moduleId: emergencyMedicine.id,
        category: 'resuscitation',
        questions: aclsQuestions
      },
      {
        name: 'BLS',
        description: 'Basic Life Support fundamentals',
        moduleId: emergencyMedicine.id,
        category: 'resuscitation',
        questions: blsQuestions
      },
      {
        name: 'ATLS',
        description: 'Advanced Trauma Life Support protocols',
        moduleId: emergencyMedicine.id,
        category: 'trauma',
        questions: atlsQuestions
      },
      {
        name: 'PALS',
        description: 'Pediatric Advanced Life Support',
        moduleId: pediatricEmergency.id,
        category: 'resuscitation',
        questions: palsQuestions
      },
      {
        name: 'ECG Rhythm Identification',
        description: 'ECG rhythm recognition and analysis',
        moduleId: emergencyMedicine.id,
        category: 'ecg',
        questions: ecgRhythmIdentificationQuestions
      },
      {
        name: 'Shock Management',
        description: 'Recognition and management of shock states',
        moduleId: criticalCare.id,
        category: 'shock',
        questions: shockManagementQuestions
      },
      {
        name: 'Respiratory Emergencies',
        description: 'Acute respiratory failure and emergencies',
        moduleId: emergencyMedicine.id,
        category: 'respiratory',
        questions: respiratoryEmergenciesQuestions
      },
      {
        name: 'Renal Emergencies',
        description: 'Acute renal and urological emergencies',
        moduleId: emergencyMedicine.id,
        category: 'renal',
        questions: renalEmergenciesQuestions
      },
      {
        name: 'Endocrine Emergencies',
        description: 'Endocrine crises and management',
        moduleId: emergencyMedicine.id,
        category: 'endocrine',
        questions: endocrineEmergenciesQuestions
      },
      {
        name: 'Infectious Diseases',
        description: 'Infectious disease emergencies',
        moduleId: emergencyMedicine.id,
        category: 'infectious',
        questions: infectiousDiseaseQuestions
      },
      {
        name: 'Environmental Emergencies',
        description: 'Environmental exposure emergencies',
        moduleId: emergencyMedicine.id,
        category: 'environmental',
        questions: environmentalEmergenciesQuestions
      },
      {
        name: 'Obstetrical Emergencies',
        description: 'Pregnancy and childbirth emergencies',
        moduleId: emergencyMedicine.id,
        category: 'obstetric',
        questions: obstetricalEmergenciesQuestions
      },
      {
        name: 'Psychiatric Emergencies',
        description: 'Psychiatric crisis management',
        moduleId: emergencyMedicine.id,
        category: 'psychiatric',
        questions: psychiatricEmergenciesQuestions
      }
    ];

    let totalQuestions = 0;

    // Create each topic and its questions
    for (const topicData of topicsData) {
      const topic = await prisma.topic.upsert({
        where: {
          moduleId_name: {
            moduleId: topicData.moduleId,
            name: topicData.name
          }
        },
        update: {},
        create: {
          name: topicData.name,
          description: topicData.description,
          moduleId: topicData.moduleId,
          category: topicData.category
        }
      });

      console.log(`   📝 ${topicData.name}: ${topicData.questions.length} questions`);

      // Create questions for this topic
      for (const q of topicData.questions) {
        await prisma.question.create({
          data: {
            topicId: topic.id,
            question: q.questionText,
            options: JSON.stringify(q.options),
            correctIndex: q.correctAnswer,
            explanation: q.explanation,
            difficulty: q.difficulty || 'medium',
            references: JSON.stringify(q.references || [])
          }
        });
        totalQuestions++;
      }
    }

    console.log(`\n✅ Seed completed successfully!`);
    console.log(`   - 3 modules`);
    console.log(`   - ${topicsData.length} topics`);
    console.log(`   - ${totalQuestions} questions\n`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDirect();
