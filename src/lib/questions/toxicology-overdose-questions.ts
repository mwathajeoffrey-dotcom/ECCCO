/**
 * Toxicology Overdose Management - Algorithm-Based Questions
 * Generated from ACMT guidelines
 * Version: 2024 Guidelines
 * 
 * This file contains questions automatically generated from the clinical algorithm
 * covering scenarios, decision points, timing, dosages, and common mistakes.
 * 
 * Generated on: 2025-11-06T22:05:19.339Z
 */

import { Question } from './types';

export const toxicologyoverdoseQuestions: Question[] = [
  {
    id: 'toxicology-overdose-timing-001',
    question: `According to Toxicology Overdose Management guidelines, what is the target timeframe for: charcoal: <1 hour post-ingestion?`,
    options: [
      'Charcoal: <1 hour post-ingestion',
      '≤30 minutes',
      '≤2 hours',
      '≤4 hours'
    ],
    correctIndex: 0,
    explanation: `The Toxicology Overdose Management specifies Charcoal: <1 hour post-ingestion as a critical benchmark for optimal patient outcomes. This timing is based on evidence showing improved survival/recovery when interventions are delivered within this window.`,
    difficulty: 'easy',
    category: 'toxicology',
    references: [
      'Gummin DD, et al. 2022 Annual Report of the National Poison Data System. Clin Toxicol. 2023',
      'American College of Medical Toxicology Practice Guidelines'
    ],
    topicId: 'toxicology',
    guidelineVersion: {
      name: 'Toxicology Overdose Management',
      year: 2024,
      organization: 'ACMT'
    }
  },

  {
    id: 'toxicology-overdose-mistake-001',
    question: `What is a common mistake to avoid when implementing Toxicology Overdose Management?`,
    options: [
      'Late or inappropriate charcoal use',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Late or inappropriate charcoal use is a frequently encountered error that can compromise patient care. The Toxicology Overdose Management specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'toxicology',
    references: [
      'Gummin DD, et al. 2022 Annual Report of the National Poison Data System. Clin Toxicol. 2023',
      'American College of Medical Toxicology Practice Guidelines'
    ],
    topicId: 'toxicology',
    guidelineVersion: {
      name: 'Toxicology Overdose Management',
      year: 2024,
      organization: 'ACMT'
    }
  },

  {
    id: 'toxicology-overdose-mistake-002',
    question: `What is a common mistake to avoid when implementing Toxicology Overdose Management?`,
    options: [
      'Missing antidote indications',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Missing antidote indications is a frequently encountered error that can compromise patient care. The Toxicology Overdose Management specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'toxicology',
    references: [
      'Gummin DD, et al. 2022 Annual Report of the National Poison Data System. Clin Toxicol. 2023',
      'American College of Medical Toxicology Practice Guidelines'
    ],
    topicId: 'toxicology',
    guidelineVersion: {
      name: 'Toxicology Overdose Management',
      year: 2024,
      organization: 'ACMT'
    }
  },

  {
    id: 'toxicology-overdose-mistake-003',
    question: `What is a common mistake to avoid when implementing Toxicology Overdose Management?`,
    options: [
      'Inadequate supportive care',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Inadequate supportive care is a frequently encountered error that can compromise patient care. The Toxicology Overdose Management specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'toxicology',
    references: [
      'Gummin DD, et al. 2022 Annual Report of the National Poison Data System. Clin Toxicol. 2023',
      'American College of Medical Toxicology Practice Guidelines'
    ],
    topicId: 'toxicology',
    guidelineVersion: {
      name: 'Toxicology Overdose Management',
      year: 2024,
      organization: 'ACMT'
    }
  }
];

export default toxicologyoverdoseQuestions;

// Algorithm metadata for reference
export const ALGORITHM_INFO = {
  id: 'toxicology-overdose',
  title: 'Toxicology Overdose Management',
  organization: 'ACMT',
  category: 'toxicology',
  lastUpdated: '2024',
  version: '2024 Guidelines',
  totalQuestions: 4,
  questionTypes: {
    scenarios: 0,
    decisions: 0,
    sequences: 0,
    timing: 1,
    dosages: 0,
    contraindications: 0,
    mistakes: 3
  }
};