import { NextRequest, NextResponse } from 'next/server';
import { Question } from '@/lib/questions/types';

// Import all question modules
import { aclsQuestions } from '@/lib/questions/acls';
import { airwayManagementQuestions } from '@/lib/questions/airway-management';
import { atlsQuestions } from '@/lib/questions/atls';
import { bloodGasAnalysisQuestions } from '@/lib/questions/blood-gas-analysis';
import { blsQuestions } from '@/lib/questions/bls';
import { cardiacEmergencyQuestions } from '@/lib/questions/cardiac-emergencies';
import { criticalCareEmergencyQuestions } from '@/lib/questions/critical-care-emergencies';
import { ecgEmergencyQuestions } from '@/lib/questions/ecg-emergencies';
import { ecgRhythmIdentificationQuestions } from '@/lib/questions/ecg-rhythm-identification';
import { electrolyteEmergencyQuestions } from '@/lib/questions/electrolyte-emergencies';
import { endocrineEmergencyQuestions } from '@/lib/questions/endocrine-emergencies';
import { environmentalEmergencyQuestions } from '@/lib/questions/environmental-emergencies';
import { geriatricEmergencyQuestions } from '@/lib/questions/geriatric-emergencies';
import { hematologicEmergencyQuestions } from '@/lib/questions/hematologic-emergencies';
import { infectiousDiseaseEmergencyQuestions } from '@/lib/questions/infectious-disease-emergencies';
import { mechanicalVentilationQuestions } from '@/lib/questions/mechanical-ventilation';
import { neurologicalEmergencyQuestions } from '@/lib/questions/neurological-emergencies';
import { obstetricGynecologicEmergencyQuestions } from '@/lib/questions/obstetric-gynecologic-emergencies';
import { palsQuestions } from '@/lib/questions/pals';
import { pediatricEmergencyQuestions } from '@/lib/questions/pediatric-emergencies';
import { pharmacologyEmergencyQuestions } from '@/lib/questions/pharmacology-emergencies';
import { procedureQuestions } from '@/lib/questions/procedures';
import { psychiatricEmergencyQuestions } from '@/lib/questions/psychiatric-emergencies';
import { renalEmergencyQuestions } from '@/lib/questions/renal-emergencies';
import { respiratoryEmergencyQuestions } from '@/lib/questions/respiratory-emergencies';
import { sepsisManagementQuestions } from '@/lib/questions/sepsis-management';
import { toxicologyQuestions } from '@/lib/questions/toxicology';
import { traumaManagementQuestions } from '@/lib/questions/trauma-management';

// Combine all questions by topic
const questionsByTopic: { [key: string]: Question[] } = {
  'acls': aclsQuestions,
  'airway-management': airwayManagementQuestions,
  'atls': atlsQuestions,
  'blood-gas-analysis': bloodGasAnalysisQuestions,
  'bls': blsQuestions,
  'cardiac-emergencies': cardiacEmergencyQuestions,
  'critical-care-emergencies': criticalCareEmergencyQuestions,
  'ecg-emergencies': ecgEmergencyQuestions,
  'ecg-rhythm-identification': ecgRhythmIdentificationQuestions,
  'electrolyte-emergencies': electrolyteEmergencyQuestions,
  'endocrine-emergencies': endocrineEmergencyQuestions,
  'environmental-emergencies': environmentalEmergencyQuestions,
  'geriatric-emergencies': geriatricEmergencyQuestions,
  'hematologic-emergencies': hematologicEmergencyQuestions,
  'infectious-disease-emergencies': infectiousDiseaseEmergencyQuestions,
  'mechanical-ventilation': mechanicalVentilationQuestions,
  'neurological-emergencies': neurologicalEmergencyQuestions,
  'obstetric-gynecologic-emergencies': obstetricGynecologicEmergencyQuestions,
  'pals': palsQuestions,
  'pediatric-emergencies': pediatricEmergencyQuestions,
  'pharmacology-emergencies': pharmacologyEmergencyQuestions,
  'procedures': procedureQuestions,
  'psychiatric-emergencies': psychiatricEmergencyQuestions,
  'renal-emergencies': renalEmergencyQuestions,
  'respiratory-emergencies': respiratoryEmergencyQuestions,
  'sepsis-management': sepsisManagementQuestions,
  'toxicology': toxicologyQuestions,
  'trauma-management': traumaManagementQuestions,
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topicId');
    const limit = parseInt(searchParams.get('limit') || '30');
    const difficulty = searchParams.get('difficulty');

    let questions: Question[] = [];

    if (topicId && questionsByTopic[topicId]) {
      questions = questionsByTopic[topicId];
    } else {
      // Get all questions from all topics
      questions = Object.values(questionsByTopic).flat();
    }

    // Filter by difficulty if specified
    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    // Shuffle questions for randomization
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    // Limit the number of questions
    const limitedQuestions = shuffledQuestions.slice(0, limit);

    return NextResponse.json(limitedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}