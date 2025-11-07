/**
 * Massive Transfusion Protocol - Algorithm-Based Questions
 * Generated from ASA/AABB guidelines
 * Version: 2024 Guidelines
 * 
 * This file contains questions automatically generated from the clinical algorithm
 * covering scenarios, decision points, timing, dosages, and common mistakes.
 * 
 * Generated on: 2025-11-06T22:05:19.339Z
 */

import { Question } from './types';

export const massivetransfusionQuestions: Question[] = [
  {
    id: 'massive-transfusion-timing-001',
    question: `According to Massive Transfusion Protocol guidelines, what is the target timeframe for: product delivery: <15 minutes?`,
    options: [
      'Product delivery: <15 minutes',
      'No time limit',
      'As convenient',
      'Within 24 hours'
    ],
    correctIndex: 0,
    explanation: `The Massive Transfusion Protocol specifies Product delivery: <15 minutes as a critical benchmark for optimal patient outcomes. This timing is based on evidence showing improved survival/recovery when interventions are delivered within this window.`,
    difficulty: 'easy',
    category: 'trauma',
    references: [
      'Callum JL, et al. Bloody Easy 4: Blood Transfusions, Blood Alternatives and Transfusion Reactions. 2020',
      'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs 1:1:2 ratio. JAMA. 2015'
    ],
    topicId: 'trauma-management',
    guidelineVersion: {
      name: 'Massive Transfusion Protocol',
      year: 2024,
      organization: 'ASA/AABB'
    }
  },

  {
    id: 'massive-transfusion-contraindication-001',
    question: `Which of the following is a contraindication to Massive Transfusion Protocol?`,
    options: [
      'Religious objection to blood products',
      'Advanced age over 80 years',
      'History of diabetes mellitus',
      'Mild hypertension'
    ],
    correctIndex: 0,
    explanation: `Religious objection to blood products is a contraindication to Massive Transfusion Protocol. Understanding contraindications is crucial for patient safety and appropriate clinical decision-making.`,
    difficulty: 'medium',
    category: 'trauma',
    references: [
      'Callum JL, et al. Bloody Easy 4: Blood Transfusions, Blood Alternatives and Transfusion Reactions. 2020',
      'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs 1:1:2 ratio. JAMA. 2015'
    ],
    topicId: 'trauma-management',
    guidelineVersion: {
      name: 'Massive Transfusion Protocol',
      year: 2024,
      organization: 'ASA/AABB'
    }
  },

  {
    id: 'massive-transfusion-mistake-001',
    question: `What is a common mistake to avoid when implementing Massive Transfusion Protocol?`,
    options: [
      'Late MTP activation',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Late MTP activation is a frequently encountered error that can compromise patient care. The Massive Transfusion Protocol specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'trauma',
    references: [
      'Callum JL, et al. Bloody Easy 4: Blood Transfusions, Blood Alternatives and Transfusion Reactions. 2020',
      'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs 1:1:2 ratio. JAMA. 2015'
    ],
    topicId: 'trauma-management',
    guidelineVersion: {
      name: 'Massive Transfusion Protocol',
      year: 2024,
      organization: 'ASA/AABB'
    }
  },

  {
    id: 'massive-transfusion-mistake-002',
    question: `What is a common mistake to avoid when implementing Massive Transfusion Protocol?`,
    options: [
      'Imbalanced ratios',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Imbalanced ratios is a frequently encountered error that can compromise patient care. The Massive Transfusion Protocol specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'trauma',
    references: [
      'Callum JL, et al. Bloody Easy 4: Blood Transfusions, Blood Alternatives and Transfusion Reactions. 2020',
      'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs 1:1:2 ratio. JAMA. 2015'
    ],
    topicId: 'trauma-management',
    guidelineVersion: {
      name: 'Massive Transfusion Protocol',
      year: 2024,
      organization: 'ASA/AABB'
    }
  },

  {
    id: 'massive-transfusion-mistake-003',
    question: `What is a common mistake to avoid when implementing Massive Transfusion Protocol?`,
    options: [
      'Inadequate monitoring',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Inadequate monitoring is a frequently encountered error that can compromise patient care. The Massive Transfusion Protocol specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'trauma',
    references: [
      'Callum JL, et al. Bloody Easy 4: Blood Transfusions, Blood Alternatives and Transfusion Reactions. 2020',
      'Holcomb JB, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs 1:1:2 ratio. JAMA. 2015'
    ],
    topicId: 'trauma-management',
    guidelineVersion: {
      name: 'Massive Transfusion Protocol',
      year: 2024,
      organization: 'ASA/AABB'
    }
  }
];

export default massivetransfusionQuestions;

// Algorithm metadata for reference
export const ALGORITHM_INFO = {
  id: 'massive-transfusion',
  title: 'Massive Transfusion Protocol',
  organization: 'ASA/AABB',
  category: 'trauma',
  lastUpdated: '2024',
  version: '2024 Guidelines',
  totalQuestions: 5,
  questionTypes: {
    scenarios: 0,
    decisions: 0,
    sequences: 0,
    timing: 1,
    dosages: 0,
    contraindications: 1,
    mistakes: 3
  }
};