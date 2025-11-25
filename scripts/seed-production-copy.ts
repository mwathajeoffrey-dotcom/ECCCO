import { PrismaClient } from '@prisma/client';

// Use DATABASE_URL from environment for production
const prisma = new PrismaClient();
import { airwayManagementQuestions } from '../src/lib/questions/airway-management';
import { mechanicalVentilationQuestions } from '../src/lib/questions/mechanical-ventilation';
import { sepsisManagementQuestions } from '../src/lib/questions/sepsis-management';
import { cardiacEmergenciesQuestions } from '../src/lib/questions/cardiac-emergencies';
import { neurologicalEmergenciesQuestions } from '../src/lib/questions/neurological-emergencies';
import { toxicologyQuestions } from '../src/lib/questions/toxicology';
import { traumaManagementQuestions } from '../src/lib/questions/trauma-management';
import { pediatricEmergenciesQuestions } from '../src/lib/questions/pediatric-emergencies';
import { respiratoryEmergenciesQuestions } from '../src/lib/questions/respiratory-emergencies';
import { endocrineEmergenciesQuestions } from '../src/lib/questions/endocrine-emergencies';
import { renalEmergenciesQuestions } from '../src/lib/questions/renal-emergencies';
import { infectiousDiseaseEmergenciesQuestions } from '../src/lib/questions/infectious-disease-emergencies';
import { pharmacologyEmergenciesQuestions } from '../src/lib/questions/pharmacology-emergencies';
import { environmentalEmergenciesQuestions } from '../src/lib/questions/environmental-emergencies';
import { obstetricGynelogicEmergenciesQuestions } from '../src/lib/questions/obstetric-gynecologic-emergencies';
import { proceduresQuestions } from '../src/lib/questions/procedures';
import { geriatricEmergenciesQuestions } from '../src/lib/questions/geriatric-emergencies';
import { criticalCareEmergenciesQuestions } from '../src/lib/questions/critical-care-emergencies';
import { psychiatricEmergenciesQuestions } from '../src/lib/questions/psychiatric-emergencies';
import { hematologicEmergenciesQuestions } from '../src/lib/questions/hematologic-emergencies';
// New specialized question sets
import { ecgEmergenciesQuestions } from '../src/lib/questions/ecg-emergencies';
import { electrolyteEmergenciesQuestions } from '../src/lib/questions/electrolyte-emergencies';
import { bloodGasAnalysisQuestions } from '../src/lib/questions/blood-gas-analysis';
import { aclsQuestions } from '../src/lib/questions/acls';
import { blsQuestions } from '../src/lib/questions/bls';
import { atlsQuestions } from '../src/lib/questions/atls';
import { palsQuestions } from '../src/lib/questions/pals';
import { ecgRhythmIdentificationQuestions } from '../src/lib/questions/ecg-rhythm-identification';

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Create modules first
    const modules = [
      {
        id: 'emergency-medicine',
        name: 'Emergency Medicine',
        description: 'Comprehensive emergency medicine education',
        ageGroup: 'adult'
      },
      {
        id: 'critical-care',
        name: 'Critical Care',
        description: 'Intensive care and critical care medicine',
        ageGroup: 'adult'
      },
      {
        id: 'pediatric-medicine',
        name: 'Pediatric Medicine',
        description: 'Emergency and critical care for children',
        ageGroup: 'pediatric'
      },
      {
        id: 'resuscitation',
        name: 'Resuscitation',
        description: 'Life support and resuscitation protocols',
        ageGroup: 'all'
      }
    ];

    // Create modules
    for (const module of modules) {
      await prisma.module.upsert({
        where: { id: module.id },
        update: module,
        create: module
      });
    }

    console.log('Modules created successfully');

    // Create topics
    const topics = [
      {
        id: 'airway-management',
        name: 'Airway Management',
        description: 'Comprehensive airway management in emergency and critical care settings',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'mechanical-ventilation',
        name: 'Mechanical Ventilation',
        description: 'Principles and management of mechanical ventilation',
        moduleId: 'critical-care'
      },
      {
        id: 'sepsis-management',
        name: 'Sepsis Management',
        description: 'Early recognition and evidence-based treatment of sepsis',
        moduleId: 'critical-care'
      },
      {
        id: 'shock-resuscitation',
        name: 'Shock and Resuscitation',
        description: 'Recognition and management of different types of shock',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'cardiac-emergencies',
        name: 'Cardiac Emergencies',
        description: 'Acute cardiac conditions and interventions',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'neurological-emergencies',
        name: 'Neurological Emergencies',
        description: 'Acute neurological conditions and management',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'toxicology',
        name: 'Toxicology',
        description: 'Poisoning and overdose management',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'trauma-management',
        name: 'Trauma Management',
        description: 'Primary and secondary trauma assessment and management',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'respiratory-emergencies',
        name: 'Respiratory Emergencies',
        description: 'Acute respiratory conditions and interventions',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'renal-emergencies',
        name: 'Renal Emergencies',
        description: 'Acute kidney injury and renal replacement therapy',
        moduleId: 'critical-care'
      },
      {
        id: 'endocrine-emergencies',
        name: 'Endocrine Emergencies',
        description: 'Diabetic emergencies and endocrine crises',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'infectious-disease-emergencies',
        name: 'Infectious Disease Emergencies',
        description: 'Severe infections, sepsis, and antimicrobial therapy',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'pharmacology-emergencies',
        name: 'Pharmacology Emergencies',
        description: 'Critical care pharmacology, drug interactions, and toxicity',
        moduleId: 'critical-care'
      },
      {
        id: 'environmental-emergencies',
        name: 'Environmental Emergencies',
        description: 'Heat illness, hypothermia, drowning, and environmental toxins',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'obstetric-gynecologic-emergencies',
        name: 'Obstetric & Gynecologic Emergencies',
        description: 'Pregnancy complications and gynecologic emergencies',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'pharmacology',
        name: 'Critical Care Pharmacology',
        description: 'Drug dosing, interactions, and monitoring in critical illness',
        moduleId: 'critical-care'
      },
      {
        id: 'procedures',
        name: 'Procedures',
        description: 'Common emergency and critical care procedures',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'geriatric-emergencies',
        name: 'Geriatric Emergencies',
        description: 'Emergency conditions specific to elderly patients',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'critical-care-emergencies',
        name: 'Critical Care Emergencies',
        description: 'Advanced critical care concepts and emergency interventions',
        moduleId: 'critical-care'
      },
      {
        id: 'psychiatric-emergencies',
        name: 'Psychiatric Emergencies',
        description: 'Mental health crises and psychiatric medication emergencies',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'hematologic-emergencies',
        name: 'Hematologic Emergencies',
        description: 'Blood disorders, coagulation emergencies, and transfusion medicine',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'infection-control',
        name: 'Infection Control',
        description: 'Hospital-acquired infections and antimicrobial stewardship',
        moduleId: 'critical-care'
      },
      {
        id: 'pediatric-emergencies',
        name: 'Pediatric Emergencies',
        description: 'Emergency conditions specific to infants, children, and adolescents',
        moduleId: 'pediatric-medicine'
      },
      {
        id: 'ethical-legal',
        name: 'Ethical and Legal Issues',
        description: 'End-of-life care, consent, and legal considerations',
        moduleId: 'critical-care'
      },
      // New specialized topics
      {
        id: 'ecg-emergencies',
        name: 'ECG Emergencies',
        description: 'Complex ECG interpretation, arrhythmias, and electrolyte effects',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'electrolyte-emergencies',
        name: 'Electrolyte Emergencies',
        description: 'Sodium, potassium, calcium, magnesium, and phosphorus disorders',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'blood-gas-analysis',
        name: 'Blood Gas Analysis',
        description: 'Acid-base disorders, hypoxia assessment, and blood gas interpretation',
        moduleId: 'critical-care'
      },
      {
        id: 'acls',
        name: 'ACLS (Advanced Cardiac Life Support)',
        description: 'AHA ACLS guidelines for cardiac arrest and emergency cardiovascular care',
        moduleId: 'resuscitation'
      },
      {
        id: 'bls',
        name: 'BLS (Basic Life Support)',
        description: 'AHA BLS guidelines for CPR, AED use, and basic resuscitation',
        moduleId: 'resuscitation'
      },
      {
        id: 'atls',
        name: 'ATLS (Advanced Trauma Life Support)',
        description: 'Trauma assessment, management protocols, and damage control',
        moduleId: 'emergency-medicine'
      },
      {
        id: 'pals',
        name: 'PALS (Pediatric Advanced Life Support)',
        description: 'AHA PALS guidelines for pediatric emergencies and resuscitation',
        moduleId: 'pediatric-medicine'
      },
      {
        id: 'ecg-rhythm-identification',
        name: 'ECG Rhythm Identification',
        description: 'Comprehensive rhythm analysis and arrhythmia identification',
        moduleId: 'emergency-medicine'
      }
    ];

    // Create topics
    for (const topic of topics) {
      await prisma.topic.upsert({
        where: { id: topic.id },
        update: topic,
        create: topic
      });
    }

    console.log('Topics created successfully');

    // Create questions
    const allQuestions = [
      ...airwayManagementQuestions,
      ...mechanicalVentilationQuestions,
      ...sepsisManagementQuestions,
      ...cardiacEmergenciesQuestions,
      ...neurologicalEmergenciesQuestions,
      ...toxicologyQuestions,
      ...traumaManagementQuestions,
      ...pediatricEmergenciesQuestions,
      ...respiratoryEmergenciesQuestions,
      ...endocrineEmergenciesQuestions,
      ...renalEmergenciesQuestions,
      ...infectiousDiseaseEmergenciesQuestions,
      ...pharmacologyEmergenciesQuestions,
      ...environmentalEmergenciesQuestions,
      ...obstetricGynelogicEmergenciesQuestions,
      ...proceduresQuestions,
      ...geriatricEmergenciesQuestions,
      ...criticalCareEmergenciesQuestions,
      ...psychiatricEmergenciesQuestions,
      ...hematologicEmergenciesQuestions,
      // New specialized question sets
      ...ecgEmergenciesQuestions,
      ...electrolyteEmergenciesQuestions,
      ...bloodGasAnalysisQuestions,
      ...aclsQuestions,
      ...blsQuestions,
      ...atlsQuestions,
      ...palsQuestions,
      ...ecgRhythmIdentificationQuestions
    ];

    for (const question of allQuestions) {
      // Skip questions without topicId
      if (!question.topicId) {
        console.warn(`Skipping question ${question.id} - no topicId`);
        continue;
      }
      
      await prisma.question.upsert({
        where: { id: question.id },
        update: {
          question: question.question,
          options: JSON.stringify(question.options),
          correctIndex: question.correctIndex,
          explanation: question.explanation,
          references: JSON.stringify(question.references),
          difficulty: question.difficulty,
          topicId: question.topicId
        },
        create: {
          id: question.id,
          question: question.question,
          options: JSON.stringify(question.options),
          correctIndex: question.correctIndex,
          explanation: question.explanation,
          references: JSON.stringify(question.references),
          difficulty: question.difficulty,
          topicId: question.topicId
        }
      });
    }

    console.log(`${allQuestions.length} questions seeded successfully`);
    console.log('Database seeding completed!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedDatabase().catch(console.error);
}

export { seedDatabase };