import { prisma } from '../src/lib/database/prisma';
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

    // Create topics
    const topics = [
      {
        id: 'airway-management',
        name: 'Airway Management',
        description: 'Comprehensive airway management in emergency and critical care settings'
      },
      {
        id: 'mechanical-ventilation',
        name: 'Mechanical Ventilation',
        description: 'Principles and management of mechanical ventilation'
      },
      {
        id: 'sepsis-management',
        name: 'Sepsis Management',
        description: 'Early recognition and evidence-based treatment of sepsis'
      },
      {
        id: 'shock-resuscitation',
        name: 'Shock and Resuscitation',
        description: 'Recognition and management of different types of shock'
      },
      {
        id: 'cardiac-emergencies',
        name: 'Cardiac Emergencies',
        description: 'Acute cardiac conditions and interventions'
      },
      {
        id: 'neurological-emergencies',
        name: 'Neurological Emergencies',
        description: 'Acute neurological conditions and management'
      },
      {
        id: 'toxicology',
        name: 'Toxicology',
        description: 'Poisoning and overdose management'
      },
      {
        id: 'trauma-management',
        name: 'Trauma Management',
        description: 'Primary and secondary trauma assessment and management'
      },
      {
        id: 'respiratory-emergencies',
        name: 'Respiratory Emergencies',
        description: 'Acute respiratory conditions and interventions'
      },
      {
        id: 'renal-emergencies',
        name: 'Renal Emergencies',
        description: 'Acute kidney injury and renal replacement therapy'
      },
      {
        id: 'endocrine-emergencies',
        name: 'Endocrine Emergencies',
        description: 'Diabetic emergencies and endocrine crises'
      },
      {
        id: 'infectious-disease-emergencies',
        name: 'Infectious Disease Emergencies',
        description: 'Severe infections, sepsis, and antimicrobial therapy'
      },
      {
        id: 'pharmacology-emergencies',
        name: 'Pharmacology Emergencies',
        description: 'Critical care pharmacology, drug interactions, and toxicity'
      },
      {
        id: 'environmental-emergencies',
        name: 'Environmental Emergencies',
        description: 'Heat illness, hypothermia, drowning, and environmental toxins'
      },
      {
        id: 'obstetric-gynecologic-emergencies',
        name: 'Obstetric & Gynecologic Emergencies',
        description: 'Pregnancy complications and gynecologic emergencies'
      },
      {
        id: 'pharmacology',
        name: 'Critical Care Pharmacology',
        description: 'Drug dosing, interactions, and monitoring in critical illness'
      },
      {
        id: 'procedures',
        name: 'Procedures',
        description: 'Common emergency and critical care procedures'
      },
      {
        id: 'geriatric-emergencies',
        name: 'Geriatric Emergencies',
        description: 'Emergency conditions specific to elderly patients'
      },
      {
        id: 'critical-care-emergencies',
        name: 'Critical Care Emergencies',
        description: 'Advanced critical care concepts and emergency interventions'
      },
      {
        id: 'psychiatric-emergencies',
        name: 'Psychiatric Emergencies',
        description: 'Mental health crises and psychiatric medication emergencies'
      },
      {
        id: 'hematologic-emergencies',
        name: 'Hematologic Emergencies',
        description: 'Blood disorders, coagulation emergencies, and transfusion medicine'
      },
      {
        id: 'infection-control',
        name: 'Infection Control',
        description: 'Hospital-acquired infections and antimicrobial stewardship'
      },
      {
        id: 'pediatric-emergencies',
        name: 'Pediatric Emergencies',
        description: 'Emergency conditions specific to infants, children, and adolescents'
      },
      {
        id: 'ethical-legal',
        name: 'Ethical and Legal Issues',
        description: 'End-of-life care, consent, and legal considerations'
      },
      // New specialized topics
      {
        id: 'ecg-emergencies',
        name: 'ECG Emergencies',
        description: 'Complex ECG interpretation, arrhythmias, and electrolyte effects'
      },
      {
        id: 'electrolyte-emergencies',
        name: 'Electrolyte Emergencies',
        description: 'Sodium, potassium, calcium, magnesium, and phosphorus disorders'
      },
      {
        id: 'blood-gas-analysis',
        name: 'Blood Gas Analysis',
        description: 'Acid-base disorders, hypoxia assessment, and blood gas interpretation'
      },
      {
        id: 'acls',
        name: 'ACLS (Advanced Cardiac Life Support)',
        description: 'AHA ACLS guidelines for cardiac arrest and emergency cardiovascular care'
      },
      {
        id: 'bls',
        name: 'BLS (Basic Life Support)',
        description: 'AHA BLS guidelines for CPR, AED use, and basic resuscitation'
      },
      {
        id: 'atls',
        name: 'ATLS (Advanced Trauma Life Support)',
        description: 'Trauma assessment, management protocols, and damage control'
      },
      {
        id: 'pals',
        name: 'PALS (Pediatric Advanced Life Support)',
        description: 'AHA PALS guidelines for pediatric emergencies and resuscitation'
      },
      {
        id: 'ecg-rhythm-identification',
        name: 'ECG Rhythm Identification',
        description: 'Comprehensive rhythm analysis and arrhythmia identification'
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