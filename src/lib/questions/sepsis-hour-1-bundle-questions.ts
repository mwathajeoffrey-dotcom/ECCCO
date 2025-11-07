/**
 * Sepsis Hour-1 Bundle - Algorithm-Based Questions
 * Generated from Surviving Sepsis Campaign guidelines
 * Version: 2024 Guidelines
 * 
 * This file contains questions automatically generated from the clinical algorithm
 * covering scenarios, decision points, timing, dosages, and common mistakes.
 * 
 * Generated on: 2025-11-06T22:05:19.328Z
 */

import { Question } from './types';

export const sepsishour1bundleQuestions: Question[] = [
  {
    id: 'sepsis-hour-1-bundle-scenario-001',
    question: `A 45-year-old woman presents to the ED with fever, tachycardia, and hypotension. Her lactate is 3.2 mmol/L. According to the 2024 Surviving Sepsis Campaign guidelines, what is the target time for antibiotic administration?`,
    options: [
      'Within 3 hours',
      'Within 6 hours',
      'Within 1 hour',
      'Within 30 minutes'
    ],
    correctIndex: 2,
    explanation: `The 2024 Surviving Sepsis Campaign guidelines recommend antibiotic administration within 1 hour for patients with suspected sepsis or septic shock. The phrase "as soon as possible" emphasizes the urgency while acknowledging practical constraints.`,
    difficulty: 'easy',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-sequence-001',
    question: `What is the correct sequence for the first four steps in the Sepsis Hour-1 Bundle?`,
    options: [
      'Recognition → Antibiotics → Lactate Measurement → Blood Cultures',
      'Recognition → Lactate Measurement → Blood Cultures → Antibiotics',
      'Lactate Measurement → Blood Cultures → Recognition → Antibiotics',
      'Blood Cultures → Lactate Measurement → Antibiotics → Recognition'
    ],
    correctIndex: 1,
    explanation: `The correct sequence follows the Sepsis Hour-1 Bundle: Recognition → Lactate Measurement → Blood Cultures → Antibiotics. This systematic approach ensures no critical steps are missed and prioritizes life-threatening conditions appropriately.`,
    difficulty: 'medium',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-decision-002',
    question: `A septic patient received 30 mL/kg of crystalloids but remains hypotensive with poor urine output. What is the next step in fluid management according to 2024 guidelines?`,
    options: [
      'Give another 30 mL/kg bolus automatically',
      'Reassess volume status and consider vasopressors',
      'Switch to colloid solutions',
      'Continue current management'
    ],
    correctIndex: 1,
    explanation: `The 2024 guidelines emphasize reassessing volume status after initial fluid resuscitation rather than automatic additional boluses, to prevent fluid overload while considering early vasopressor support.`,
    difficulty: 'hard',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-timing-002',
    question: `According to Sepsis Hour-1 Bundle guidelines, what is the target timeframe for: lactate: within 1 hour?`,
    options: [
      'Lactate: within 1 hour',
      '≤30 minutes',
      '≤2 hours',
      '≤4 hours'
    ],
    correctIndex: 0,
    explanation: `The Sepsis Hour-1 Bundle specifies Lactate: within 1 hour as a critical benchmark for optimal patient outcomes. This timing is based on evidence showing improved survival/recovery when interventions are delivered within this window.`,
    difficulty: 'easy',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-timing-003',
    question: `According to Sepsis Hour-1 Bundle guidelines, what is the target timeframe for: blood cultures: within 45 minutes?`,
    options: [
      'Blood cultures: within 45 minutes',
      'No time limit',
      'As convenient',
      'Within 24 hours'
    ],
    correctIndex: 0,
    explanation: `The Sepsis Hour-1 Bundle specifies Blood cultures: within 45 minutes as a critical benchmark for optimal patient outcomes. This timing is based on evidence showing improved survival/recovery when interventions are delivered within this window.`,
    difficulty: 'easy',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-timing-004',
    question: `According to Sepsis Hour-1 Bundle guidelines, what is the target timeframe for: antibiotics: within 1 hour?`,
    options: [
      'Antibiotics: within 1 hour',
      '≤30 minutes',
      '≤2 hours',
      '≤4 hours'
    ],
    correctIndex: 0,
    explanation: `The Sepsis Hour-1 Bundle specifies Antibiotics: within 1 hour as a critical benchmark for optimal patient outcomes. This timing is based on evidence showing improved survival/recovery when interventions are delivered within this window.`,
    difficulty: 'easy',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-timing-005',
    question: `According to Sepsis Hour-1 Bundle guidelines, what is the target timeframe for: fluids: within 3 hours?`,
    options: [
      'Fluids: within 3 hours',
      'No time limit',
      'As convenient',
      'Within 24 hours'
    ],
    correctIndex: 0,
    explanation: `The Sepsis Hour-1 Bundle specifies Fluids: within 3 hours as a critical benchmark for optimal patient outcomes. This timing is based on evidence showing improved survival/recovery when interventions are delivered within this window.`,
    difficulty: 'easy',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-dosage-001',
    question: `In Sepsis Hour-1 Bundle, what is the correct dosage for antibiotics?`,
    options: [
      'Weight-based dosing per local protocols',
      'Half the stated dose',
      'Double the stated dose',
      'Triple the stated dose'
    ],
    correctIndex: 0,
    explanation: `According to Sepsis Hour-1 Bundle guidelines, Weight-based dosing per local protocols is the standard evidence-based dosage. This dosing regimen has been validated in clinical trials and provides optimal therapeutic benefit while minimizing adverse effects.`,
    difficulty: 'medium',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-dosage-002',
    question: `In Sepsis Hour-1 Bundle, what is the correct dosage for vasopressors?`,
    options: [
      'Norepinephrine preferred, target MAP ≥65 mmHg',
      'Half the stated dose',
      'Double the stated dose',
      'Triple the stated dose'
    ],
    correctIndex: 0,
    explanation: `According to Sepsis Hour-1 Bundle guidelines, Norepinephrine preferred, target MAP ≥65 mmHg is the standard evidence-based dosage. This dosing regimen has been validated in clinical trials and provides optimal therapeutic benefit while minimizing adverse effects.`,
    difficulty: 'medium',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-contraindication-001',
    question: `Which of the following is a contraindication to Sepsis Hour-1 Bundle?`,
    options: [
      'Comfort care measures only',
      'Advanced age over 80 years',
      'History of diabetes mellitus',
      'Mild hypertension'
    ],
    correctIndex: 0,
    explanation: `Comfort care measures only is a contraindication to Sepsis Hour-1 Bundle. Understanding contraindications is crucial for patient safety and appropriate clinical decision-making.`,
    difficulty: 'medium',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-mistake-001',
    question: `What is a common mistake to avoid when implementing Sepsis Hour-1 Bundle?`,
    options: [
      'Delayed antibiotic administration',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Delayed antibiotic administration is a frequently encountered error that can compromise patient care. The Sepsis Hour-1 Bundle specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-mistake-002',
    question: `What is a common mistake to avoid when implementing Sepsis Hour-1 Bundle?`,
    options: [
      'Inadequate fluid resuscitation',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Inadequate fluid resuscitation is a frequently encountered error that can compromise patient care. The Sepsis Hour-1 Bundle specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-mistake-003',
    question: `What is a common mistake to avoid when implementing Sepsis Hour-1 Bundle?`,
    options: [
      'Using wrong antibiotic spectrum',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Using wrong antibiotic spectrum is a frequently encountered error that can compromise patient care. The Sepsis Hour-1 Bundle specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-mistake-004',
    question: `What is a common mistake to avoid when implementing Sepsis Hour-1 Bundle?`,
    options: [
      'Missing blood culture collection',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Missing blood culture collection is a frequently encountered error that can compromise patient care. The Sepsis Hour-1 Bundle specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  },

  {
    id: 'sepsis-hour-1-bundle-mistake-005',
    question: `What is a common mistake to avoid when implementing Sepsis Hour-1 Bundle?`,
    options: [
      'Delayed vasopressor initiation',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Delayed vasopressor initiation is a frequently encountered error that can compromise patient care. The Sepsis Hour-1 Bundle specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'sepsis',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2024',
      'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
    ],
    topicId: 'sepsis-management',
    guidelineVersion: {
      name: 'Sepsis Hour-1 Bundle',
      year: 2024,
      organization: 'Surviving Sepsis Campaign'
    }
  }
];

export default sepsishour1bundleQuestions;

// Algorithm metadata for reference
export const ALGORITHM_INFO = {
  id: 'sepsis-hour-1-bundle',
  title: 'Sepsis Hour-1 Bundle',
  organization: 'Surviving Sepsis Campaign',
  category: 'sepsis',
  lastUpdated: '2024',
  version: '2024 Guidelines',
  totalQuestions: 15,
  questionTypes: {
    scenarios: 1,
    decisions: 1,
    sequences: 1,
    timing: 4,
    dosages: 2,
    contraindications: 1,
    mistakes: 5
  }
};