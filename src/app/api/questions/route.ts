import { NextRequest, NextResponse } from 'next/server';
import { Question } from '@/lib/questions/types';

// Import all question modules with correct export names
import { aclsQuestions } from '@/lib/questions/acls';
import { advancedEcgInterpretationQuestions } from '@/lib/questions/advanced-ecg-interpretation';
import { airwayManagementQuestions } from '@/lib/questions/airway-management';
import { atlsQuestions } from '@/lib/questions/atls';
import { bloodGasAnalysisQuestions } from '@/lib/questions/blood-gas-analysis';
import { blsQuestions } from '@/lib/questions/bls';
import { cardiacEmergenciesQuestions } from '@/lib/questions/cardiac-emergencies';
import { chestXrayInterpretationQuestions } from '@/lib/questions/chest-xray-interpretation';
import { criticalCareEmergenciesQuestions } from '@/lib/questions/critical-care-emergencies';
import { ecgEmergenciesQuestions } from '@/lib/questions/ecg-emergencies';
import { ecgRhythmIdentificationQuestions } from '@/lib/questions/ecg-rhythm-identification';
import { electrolyteEmergenciesQuestions } from '@/lib/questions/electrolyte-emergencies';
import { endocrineEmergenciesQuestions } from '@/lib/questions/endocrine-emergencies';
import { environmentalEmergenciesQuestions } from '@/lib/questions/environmental-emergencies';
import { geriatricEmergenciesQuestions } from '@/lib/questions/geriatric-emergencies';
import { hematologicEmergenciesQuestions } from '@/lib/questions/hematologic-emergencies';
import { infectiousDiseaseEmergenciesQuestions } from '@/lib/questions/infectious-disease-emergencies';
import { mechanicalVentilationQuestions } from '@/lib/questions/mechanical-ventilation';
import { neurologicalEmergenciesQuestions } from '@/lib/questions/neurological-emergencies';
import { obstetricGynelogicEmergenciesQuestions } from '@/lib/questions/obstetric-gynecologic-emergencies';
import { palsQuestions } from '@/lib/questions/pals';
import { pediatricEmergenciesQuestions } from '@/lib/questions/pediatric-emergencies';
import { pharmacologyEmergenciesQuestions } from '@/lib/questions/pharmacology-emergencies';
import { pointOfCareUltrasoundQuestions } from '@/lib/questions/point-of-care-ultrasound';
import { proceduresQuestions } from '@/lib/questions/procedures';
import { psychiatricEmergenciesQuestions } from '@/lib/questions/psychiatric-emergencies';
import { renalEmergenciesQuestions } from '@/lib/questions/renal-emergencies';
import { respiratoryEmergenciesQuestions } from '@/lib/questions/respiratory-emergencies';
import { sepsisManagementQuestions } from '@/lib/questions/sepsis-management';
import { toxicologyQuestions } from '@/lib/questions/toxicology';
import { traumaManagementQuestions } from '@/lib/questions/trauma-management';

// Import new oncology batch questions
import adultOncologyBatch1Questions from '@/lib/questions/adult-oncology-batch-1';
import pediatricOncologyBatch1Questions from '@/lib/questions/pediatric-oncology-batch-1';

// Combine all questions by topic with correct variable names
const questionsByTopic: { [key: string]: Question[] } = {
  'acls': aclsQuestions,
  'advanced-ecg-interpretation': advancedEcgInterpretationQuestions,
  'airway-management': airwayManagementQuestions,
  'atls': atlsQuestions,
  'blood-gas-analysis': bloodGasAnalysisQuestions,
  'bls': blsQuestions,
  'cardiac-emergencies': cardiacEmergenciesQuestions,
  'chest-xray-interpretation': chestXrayInterpretationQuestions,
  'critical-care-emergencies': criticalCareEmergenciesQuestions,
  'ecg-emergencies': ecgEmergenciesQuestions,
  'ecg-rhythm-identification': ecgRhythmIdentificationQuestions,
  'electrolyte-emergencies': electrolyteEmergenciesQuestions,
  'endocrine-emergencies': endocrineEmergenciesQuestions,
  'environmental-emergencies': environmentalEmergenciesQuestions,
  'geriatric-emergencies': geriatricEmergenciesQuestions,
  'hematologic-emergencies': hematologicEmergenciesQuestions,
  'infectious-disease-emergencies': infectiousDiseaseEmergenciesQuestions,
  'mechanical-ventilation': mechanicalVentilationQuestions,
  'neurological-emergencies': neurologicalEmergenciesQuestions,
  'obstetric-gynecologic-emergencies': obstetricGynelogicEmergenciesQuestions,
  'pals': palsQuestions,
  'pediatric-emergencies': pediatricEmergenciesQuestions,
  'pharmacology-emergencies': pharmacologyEmergenciesQuestions,
  'point-of-care-ultrasound': pointOfCareUltrasoundQuestions,
  'procedures': proceduresQuestions,
  'psychiatric-emergencies': psychiatricEmergenciesQuestions,
  'renal-emergencies': renalEmergenciesQuestions,
  'respiratory-emergencies': respiratoryEmergenciesQuestions,
  'sepsis-management': sepsisManagementQuestions,
  'toxicology': toxicologyQuestions,
  'trauma-management': traumaManagementQuestions,
  'adult-oncology-batch-1': adultOncologyBatch1Questions,
  'pediatric-oncology-batch-1': pediatricOncologyBatch1Questions,
};

export async function GET(request: NextRequest) {
  console.log('Questions API route hit!');
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topicId');
    const limit = parseInt(searchParams.get('limit') || '30');
    const difficulty = searchParams.get('difficulty');
    
    console.log('Request params:', { topicId, limit, difficulty });

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