// Oncologic Emergency Tier System Integration
// This file provides the complete 210-question tier system

import { Question } from './types';
import { adultOncologicEmergenciesQuestions } from './adult-oncologic-emergencies';
import { pediatricOncologicEmergenciesQuestions } from './pediatric-oncologic-emergencies';
import { createOncologicTierManager, QuestionTier, OncologicEmergencyTierManager } from './tierManager';

// Combine all oncologic emergency questions (210 total)
export const allOncologicEmergencyQuestions: Question[] = [
  ...adultOncologicEmergenciesQuestions,    // 105 questions
  ...pediatricOncologicEmergenciesQuestions  // 105 questions
];

// Create the tier manager instance
export const oncologicTierManager = createOncologicTierManager(allOncologicEmergencyQuestions);

// Export all 7 tiers
export const oncologicTiers = oncologicTierManager.getAllTiers();

// Utility functions for the exam interface
export const getOncologicTier = (tierNumber: number): QuestionTier | null => {
  return oncologicTierManager.getTier(tierNumber);
};

export const getAvailableTiers = (completedTiers: number[]): QuestionTier[] => {
  return oncologicTiers.filter(tier => 
    oncologicTierManager.isEligibleForTier(tier.tier, completedTiers)
  );
};

export const getNextTier = (completedTiers: number[]): QuestionTier | null => {
  return oncologicTierManager.getNextAvailableTier(completedTiers);
};

export const getTierProgress = (completedTiers: number[]) => {
  return oncologicTierManager.getProgressStats(completedTiers);
};

export const validateTierIntegrity = () => {
  return oncologicTierManager.validateNoDuplicates();
};

// Export tier information for display
export const tierInformation = {
  totalQuestions: 210,
  questionsPerTier: 30,
  totalTiers: 7,
  tierStructure: [
    {
      tier: 1,
      name: 'Foundation Tier',
      focus: 'Basic recognition and initial management',
      difficulty: 'Foundation',
      topics: ['Basic TLS', 'Simple hypercalcemia', 'Neutropenic fever basics']
    },
    {
      tier: 2,
      name: 'Core Emergency Tier',
      focus: 'Common emergencies with standard protocols',
      difficulty: 'Intermediate',
      topics: ['SVCS', 'Spinal cord compression', 'Standard chemotherapy toxicities']
    },
    {
      tier: 3,
      name: 'Advanced Management Tier',
      focus: 'Complex scenarios requiring advanced decisions',
      difficulty: 'Advanced',
      topics: ['Refractory TLS', 'Complex MSCC', 'Drug-specific toxicities']
    },
    {
      tier: 4,
      name: 'Critical Care Tier',
      focus: 'ICU-level emergencies and complications',
      difficulty: 'Expert',
      topics: ['Multi-organ failure', 'Advanced hemodynamic support', 'Complex drug interactions']
    },
    {
      tier: 5,
      name: 'Specialist Tier',
      focus: 'Rare emergencies and specialist knowledge',
      difficulty: 'Master',
      topics: ['Rare toxicities', 'Immunotherapy complications', 'Transplant emergencies']
    },
    {
      tier: 6,
      name: 'Consultant Tier',
      focus: 'Multi-system emergencies',
      difficulty: 'Specialist',
      topics: ['CAR-T toxicities', 'Complex GVHD', 'Rare syndromes']
    },
    {
      tier: 7,
      name: 'Master Clinician Tier',
      focus: 'Most challenging scenarios',
      difficulty: 'Consultant',
      topics: ['Novel therapies', 'Experimental complications', 'Research-level knowledge']
    }
  ]
};

// Question distribution validation
export const validateQuestionDistribution = () => {
  const adultCount = adultOncologicEmergenciesQuestions.length;
  const pediatricCount = pediatricOncologicEmergenciesQuestions.length;
  const totalCount = allOncologicEmergencyQuestions.length;
  
  console.log(`Adult Oncologic Questions: ${adultCount}`);
  console.log(`Pediatric Oncologic Questions: ${pediatricCount}`);
  console.log(`Total Questions: ${totalCount}`);
  console.log(`Target: 210 questions (${totalCount >= 210 ? '✅' : '❌'})`);
  
  return {
    adultCount,
    pediatricCount,
    totalCount,
    isComplete: totalCount >= 210,
    tierValidation: validateTierIntegrity()
  };
};

export default {
  allQuestions: allOncologicEmergencyQuestions,
  tierManager: oncologicTierManager,
  tiers: oncologicTiers,
  tierInfo: tierInformation,
  validation: validateQuestionDistribution()
};