// Central export file for all ECCCO questions
import { Question } from './types';

// Import existing question sets
import { aclsQuestions } from './acls';
import { blsQuestions } from './bls';
import { cardiacEmergenciesQuestions } from './cardiac-emergencies';
import adultOncologyBatch1Questions from './adult-oncology-batch-1';
import pediatricOncologyBatch1Questions from './pediatric-oncology-batch-1';
import { pediatricCardiacArrestQuestions } from './pediatric-cardiac-arrest-questions';
import { enhancedPalsQuestions } from './enhanced-pals-questions';

export const allQuestions: Question[] = [
  ...aclsQuestions,
  ...blsQuestions,
  ...cardiacEmergenciesQuestions,
  ...adultOncologyBatch1Questions,
  ...pediatricOncologyBatch1Questions,
  ...pediatricCardiacArrestQuestions,
  ...enhancedPalsQuestions,
];

export const questionsByCategory = {
  'ACLS': aclsQuestions,
  'BLS': blsQuestions,
  'Cardiac Emergencies': cardiacEmergenciesQuestions,
  'Adult Oncologic Emergencies': adultOncologyBatch1Questions,
  'Pediatric Oncologic Emergencies': pediatricOncologyBatch1Questions,
  'PALS': [...pediatricCardiacArrestQuestions, ...enhancedPalsQuestions],
  'Pediatric Emergencies': [...pediatricCardiacArrestQuestions, ...enhancedPalsQuestions],
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return questionsByCategory[category as keyof typeof questionsByCategory] || [];
};

export const getAllQuestions = (): Question[] => {
  return allQuestions;
};

export const getRandomQuestions = (count: number, category?: string): Question[] => {
  const sourceQuestions = category ? getQuestionsByCategory(category) : allQuestions;
  const shuffled = sourceQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, sourceQuestions.length));
};

// Export types
export type { Question } from './types';