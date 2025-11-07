/**
 * Pediatric Advanced Life Support (PALS) - Algorithm-Based Questions
 * Generated from American Heart Association guidelines
 * Version: 2025 Guidelines
 * 
 * This file contains questions automatically generated from the clinical algorithm
 * covering scenarios, decision points, timing, dosages, and common mistakes.
 * 
 * Generated on: 2025-11-06T22:05:19.334Z
 */

import { Question } from './types';

export const pediatricCardiacArrestQuestions: Question[] = [
  {
    id: 'peds-arrest-001',
    question: 'You are performing CPR on a 4-year-old who collapsed at daycare. A second rescuer arrives to help. What compression-to-ventilation ratio should you now use?',
    options: [
      '30:2 (same as single rescuer)',
      '15:2 (switch to two-rescuer ratio)', 
      '5:1 (continuous compressions)',
      '100:2 (minimize interruptions)'
    ],
    correctIndex: 1,
    explanation: 'When a second trained rescuer arrives during pediatric CPR, switch from 30:2 (single rescuer) to 15:2 (two-rescuer). This higher ventilation rate addresses the respiratory etiology of most pediatric cardiac arrests. One rescuer provides compressions while the other manages airway and ventilation.',
    references: ['AHA PALS Guidelines 2020', 'Berg MD, et al. Part 13: Pediatric Basic Life Support. Circulation. 2020'],
    difficulty: 'medium',
    category: 'pediatric-emergencies',
    topicId: 'pals',
    clinicalScenario: 'A 4-year-old child has collapsed at daycare and you are providing single-rescuer CPR when help arrives.',
    learningObjectives: [
      'Understand when to change compression-to-ventilation ratios',
      'Apply team-based pediatric CPR principles',
      'Recognize respiratory nature of pediatric arrests'
    ]
  },

  {
    id: 'pediatric-cardiac-arrest-dosage-001',
    question: `In Pediatric Advanced Life Support (PALS), what is the correct dosage for epinephrine?`,
    options: [
      '0.01 mg/kg IV/IO every 3-5 minutes',
      'Half the stated dose',
      'Double the stated dose',
      'Triple the stated dose'
    ],
    correctIndex: 0,
    explanation: `According to Pediatric Advanced Life Support (PALS) guidelines, 0.01 mg/kg IV/IO every 3-5 minutes is the standard evidence-based dosage. This dosing regimen has been validated in clinical trials and provides optimal therapeutic benefit while minimizing adverse effects.`,
    difficulty: 'medium',
    category: 'pediatric',
    references: [
      'AHA Guidelines for CPR and ECC 2025 - Pediatric',
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'pediatric-emergencies',
    guidelineVersion: {
      name: 'Pediatric Advanced Life Support (PALS)',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'pediatric-cardiac-arrest-contraindication-001',
    question: `Which of the following is a contraindication to Pediatric Advanced Life Support (PALS)?`,
    options: [
      'DNR order',
      'Advanced age over 80 years',
      'History of diabetes mellitus',
      'Mild hypertension'
    ],
    correctIndex: 0,
    explanation: `DNR order is a contraindication to Pediatric Advanced Life Support (PALS). Understanding contraindications is crucial for patient safety and appropriate clinical decision-making.`,
    difficulty: 'medium',
    category: 'pediatric',
    references: [
      'AHA Guidelines for CPR and ECC 2025 - Pediatric',
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'pediatric-emergencies',
    guidelineVersion: {
      name: 'Pediatric Advanced Life Support (PALS)',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'pediatric-cardiac-arrest-mistake-001',
    question: `What is a common mistake to avoid when implementing Pediatric Advanced Life Support (PALS)?`,
    options: [
      'Using adult compression ratios',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Using adult compression ratios is a frequently encountered error that can compromise patient care. The Pediatric Advanced Life Support (PALS) specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'pediatric',
    references: [
      'AHA Guidelines for CPR and ECC 2025 - Pediatric',
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'pediatric-emergencies',
    guidelineVersion: {
      name: 'Pediatric Advanced Life Support (PALS)',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'pediatric-cardiac-arrest-mistake-002',
    question: `What is a common mistake to avoid when implementing Pediatric Advanced Life Support (PALS)?`,
    options: [
      'Incorrect weight-based dosing',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Incorrect weight-based dosing is a frequently encountered error that can compromise patient care. The Pediatric Advanced Life Support (PALS) specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'pediatric',
    references: [
      'AHA Guidelines for CPR and ECC 2025 - Pediatric',
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'pediatric-emergencies',
    guidelineVersion: {
      name: 'Pediatric Advanced Life Support (PALS)',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'pediatric-cardiac-arrest-mistake-003',
    question: `What is a common mistake to avoid when implementing Pediatric Advanced Life Support (PALS)?`,
    options: [
      'Over-ventilation',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Over-ventilation is a frequently encountered error that can compromise patient care. The Pediatric Advanced Life Support (PALS) specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'pediatric',
    references: [
      'AHA Guidelines for CPR and ECC 2025 - Pediatric',
      'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'pediatric-emergencies',
    guidelineVersion: {
      name: 'Pediatric Advanced Life Support (PALS)',
      year: 2025,
      organization: 'American Heart Association'
    }
  }
];

export default pediatricCardiacArrestQuestions;

// Algorithm metadata for reference
export const ALGORITHM_INFO = {
  id: 'pediatric-cardiac-arrest',
  title: 'Pediatric Advanced Life Support (PALS)',
  organization: 'American Heart Association',
  category: 'pediatric',
  lastUpdated: '2025',
  version: '2025 Guidelines',
  totalQuestions: 6,
  questionTypes: {
    scenarios: 0,
    decisions: 0,
    sequences: 0,
    timing: 1,
    dosages: 1,
    contraindications: 1,
    mistakes: 3
  }
};