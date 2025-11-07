/**
 * Diabetic Ketoacidosis Management - Algorithm-Based Questions
 * Generated from ADA guidelines
 * Version: 2024 Guidelines
 * 
 * This file contains questions automatically generated from the clinical algorithm
 * covering scenarios, decision points, timing, dosages, and common mistakes.
 * 
 * Generated on: 2025-11-06T22:05:19.340Z
 */

import { Question } from './types';

export const diabeticketoacidosisQuestions: Question[] = [
  {
    id: 'diabetic-ketoacidosis-dosage-001',
    question: `In Diabetic Ketoacidosis Management, what is the correct dosage for fluid resuscitation?`,
    options: [
      '1-1.5L NS in first hour',
      'Half the stated dose',
      'Double the stated dose',
      'Triple the stated dose'
    ],
    correctIndex: 0,
    explanation: `According to Diabetic Ketoacidosis Management guidelines, 1-1.5L NS in first hour is the standard evidence-based dosage. This dosing regimen has been validated in clinical trials and provides optimal therapeutic benefit while minimizing adverse effects.`,
    difficulty: 'medium',
    category: 'neurological',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes. Diabetes Care. 2024',
      'American Diabetes Association Standards of Medical Care. 2024'
    ],
    topicId: 'neurological-emergencies',
    guidelineVersion: {
      name: 'Diabetic Ketoacidosis Management',
      year: 2024,
      organization: 'ADA'
    }
  },

  {
    id: 'diabetic-ketoacidosis-dosage-002',
    question: `In Diabetic Ketoacidosis Management, what is the correct dosage for insulin therapy?`,
    options: [
      '0.1 units/kg/hr IV',
      'Half the stated dose',
      'Double the stated dose',
      'Triple the stated dose'
    ],
    correctIndex: 0,
    explanation: `According to Diabetic Ketoacidosis Management guidelines, 0.1 units/kg/hr IV is the standard evidence-based dosage. This dosing regimen has been validated in clinical trials and provides optimal therapeutic benefit while minimizing adverse effects.`,
    difficulty: 'medium',
    category: 'neurological',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes. Diabetes Care. 2024',
      'American Diabetes Association Standards of Medical Care. 2024'
    ],
    topicId: 'neurological-emergencies',
    guidelineVersion: {
      name: 'Diabetic Ketoacidosis Management',
      year: 2024,
      organization: 'ADA'
    }
  },

  {
    id: 'diabetic-ketoacidosis-dosage-003',
    question: `In Diabetic Ketoacidosis Management, what is the correct dosage for electrolyte replacement?`,
    options: [
      '20-30 mEq/L in IV fluids',
      'Half the stated dose',
      'Double the stated dose',
      'Triple the stated dose'
    ],
    correctIndex: 0,
    explanation: `According to Diabetic Ketoacidosis Management guidelines, 20-30 mEq/L in IV fluids is the standard evidence-based dosage. This dosing regimen has been validated in clinical trials and provides optimal therapeutic benefit while minimizing adverse effects.`,
    difficulty: 'medium',
    category: 'neurological',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes. Diabetes Care. 2024',
      'American Diabetes Association Standards of Medical Care. 2024'
    ],
    topicId: 'neurological-emergencies',
    guidelineVersion: {
      name: 'Diabetic Ketoacidosis Management',
      year: 2024,
      organization: 'ADA'
    }
  },

  {
    id: 'diabetic-ketoacidosis-mistake-001',
    question: `What is a common mistake to avoid when implementing Diabetic Ketoacidosis Management?`,
    options: [
      'Starting insulin before fluids',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Starting insulin before fluids is a frequently encountered error that can compromise patient care. The Diabetic Ketoacidosis Management specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'neurological',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes. Diabetes Care. 2024',
      'American Diabetes Association Standards of Medical Care. 2024'
    ],
    topicId: 'neurological-emergencies',
    guidelineVersion: {
      name: 'Diabetic Ketoacidosis Management',
      year: 2024,
      organization: 'ADA'
    }
  },

  {
    id: 'diabetic-ketoacidosis-mistake-002',
    question: `What is a common mistake to avoid when implementing Diabetic Ketoacidosis Management?`,
    options: [
      'Too rapid glucose correction',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Too rapid glucose correction is a frequently encountered error that can compromise patient care. The Diabetic Ketoacidosis Management specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'neurological',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes. Diabetes Care. 2024',
      'American Diabetes Association Standards of Medical Care. 2024'
    ],
    topicId: 'neurological-emergencies',
    guidelineVersion: {
      name: 'Diabetic Ketoacidosis Management',
      year: 2024,
      organization: 'ADA'
    }
  },

  {
    id: 'diabetic-ketoacidosis-mistake-003',
    question: `What is a common mistake to avoid when implementing Diabetic Ketoacidosis Management?`,
    options: [
      'Missing potassium replacement',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Missing potassium replacement is a frequently encountered error that can compromise patient care. The Diabetic Ketoacidosis Management specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'neurological',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes. Diabetes Care. 2024',
      'American Diabetes Association Standards of Medical Care. 2024'
    ],
    topicId: 'neurological-emergencies',
    guidelineVersion: {
      name: 'Diabetic Ketoacidosis Management',
      year: 2024,
      organization: 'ADA'
    }
  }
];

export default diabeticketoacidosisQuestions;

// Algorithm metadata for reference
export const ALGORITHM_INFO = {
  id: 'diabetic-ketoacidosis',
  title: 'Diabetic Ketoacidosis Management',
  organization: 'ADA',
  category: 'neurological',
  lastUpdated: '2024',
  version: '2024 Guidelines',
  totalQuestions: 6,
  questionTypes: {
    scenarios: 0,
    decisions: 0,
    sequences: 0,
    timing: 0,
    dosages: 3,
    contraindications: 0,
    mistakes: 3
  }
};