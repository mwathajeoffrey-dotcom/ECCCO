// Central export file for all ECCCO questions
import { adultOncologicEmergenciesQuestions } from './adult-oncologic-emergencies';
import { pediatricOncologicEmergenciesQuestions } from './pediatric-oncologic-emergencies';
import { 
  allOncologicEmergencyQuestions,
  oncologicTiers,
  getOncologicTier,
  getAvailableTiers,
  getNextTier,
  getTierProgress,
  tierInformation 
} from './oncologic-tier-system';
import { Question } from './types';

// Import other existing question sets (you'll need to import these as they're created)
// import { aclsQuestions } from './acls';
// import { blsQuestions } from './bls';
// import { cardiacEmergenciesQuestions } from './cardiac-emergencies';
// ... and so on for other topics

export const allQuestions: Question[] = [
  ...allOncologicEmergencyQuestions, // 210 questions in tiered system
  // Add other question arrays here as they're imported
];

export const questionsByCategory = {
  'Adult Oncologic Emergencies': adultOncologicEmergenciesQuestions,
  'Pediatric Oncologic Emergencies': pediatricOncologicEmergenciesQuestions,
  // Add other categories here
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

// Tier System Exports
export {
  allOncologicEmergencyQuestions,
  oncologicTiers,
  getOncologicTier,
  getAvailableTiers,
  getNextTier,
  getTierProgress,
  tierInformation
};

// Export the new question sets
export { adultOncologicEmergenciesQuestions, pediatricOncologicEmergenciesQuestions };

// Export types
export type { Question } from './types';