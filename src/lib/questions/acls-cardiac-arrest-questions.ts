/**
 * ACLS Cardiac Arrest Algorithm - Algorithm-Based Questions
 * Generated from American Heart Association guidelines
 * Version: 2025 Guidelines
 * 
 * This file contains questions automatically generated from the clinical algorithm
 * covering scenarios, decision points, timing, dosages, and common mistakes.
 * 
 * Generated on: 2025-11-06T22:05:19.323Z
 */

import { Question } from './types';

export const aclscardiacarrestQuestions: Question[] = [
  {
    id: 'acls-cardiac-arrest-scenario-001',
    question: `A 65-year-old man collapses in the hospital cafeteria. He is unresponsive and not breathing normally. Security confirms no pulse. What is the first priority action according to ACLS guidelines?`,
    options: [
      'Check blood glucose level',
      'Begin chest compressions immediately',
      'Insert an advanced airway',
      'Establish IV access'
    ],
    correctIndex: 1,
    explanation: `In witnessed cardiac arrest with confirmed absence of pulse, high-quality chest compressions should be started immediately. The 2025 ACLS guidelines emphasize minimizing delays to chest compressions, which are the cornerstone of cardiac arrest management.`,
    difficulty: 'easy',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-scenario-002',
    question: `During a cardiac arrest, the monitor shows ventricular fibrillation. After delivering a shock, what is the immediate next action?`,
    options: [
      'Check for pulse',
      'Analyze rhythm again',
      'Resume chest compressions immediately',
      'Give epinephrine'
    ],
    correctIndex: 2,
    explanation: `Immediately after defibrillation, chest compressions should be resumed without checking pulse or rhythm. The 2025 ACLS guidelines emphasize minimizing peri-shock pauses to maintain coronary perfusion pressure.`,
    difficulty: 'medium',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-sequence-001',
    question: `What is the correct sequence for the first four steps in the ACLS Cardiac Arrest Algorithm?`,
    options: [
      'Initial Assessment → Activate Emergency Response → Begin CPR → Check Pulse',
      'Begin CPR → Initial Assessment → Activate Emergency Response → Check Pulse',
      'Initial Assessment → Activate Emergency Response → Check Pulse → Begin CPR',
      'Initial Assessment → Activate Emergency Response → Begin CPR → Check Pulse'
    ],
    correctIndex: 2,
    explanation: `The correct sequence follows the ACLS Cardiac Arrest Algorithm: Initial Assessment → Activate Emergency Response → Check Pulse → Begin CPR. This systematic approach ensures no critical steps are missed and prioritizes life-threatening conditions appropriately.`,
    difficulty: 'medium',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-decision-001',
    question: `A patient in cardiac arrest has an organized rhythm on the monitor with a rate of 40 bpm but no palpable pulse. What type of rhythm is this and what is the appropriate treatment?`,
    options: [
      'Shockable rhythm - deliver immediate shock',
      'Non-shockable rhythm - continue CPR and give epinephrine',
      'Normal rhythm - check blood pressure',
      'Shockable rhythm - give amiodarone first'
    ],
    correctIndex: 1,
    explanation: `This describes pulseless electrical activity (PEA), which is a non-shockable rhythm. Treatment includes high-quality CPR, epinephrine, and addressing reversible causes (H's and T's).`,
    difficulty: 'medium',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-timing-001',
    question: `According to ACLS Cardiac Arrest Algorithm guidelines, what is the target timeframe for: pulse check: ≤10 seconds?`,
    options: [
      'Pulse check: ≤10 seconds',
      '≤5 seconds',
      '≤15 seconds',
      '≤30 seconds'
    ],
    correctIndex: 0,
    explanation: `The ACLS Cardiac Arrest Algorithm specifies Pulse check: ≤10 seconds as a critical benchmark for optimal patient outcomes. This timing is based on evidence showing improved survival/recovery when interventions are delivered within this window.`,
    difficulty: 'easy',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-timing-002',
    question: `According to ACLS Cardiac Arrest Algorithm guidelines, what is the target timeframe for: time to first shock: ≤2 minutes?`,
    options: [
      'Time to first shock: ≤2 minutes',
      'No time limit',
      'As convenient',
      'Within 24 hours'
    ],
    correctIndex: 0,
    explanation: `The ACLS Cardiac Arrest Algorithm specifies Time to first shock: ≤2 minutes as a critical benchmark for optimal patient outcomes. This timing is based on evidence showing improved survival/recovery when interventions are delivered within this window.`,
    difficulty: 'easy',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-dosage-001',
    question: `In ACLS Cardiac Arrest Algorithm, what is the correct dosage for post-shock cpr (shockable)?`,
    options: [
      'Epinephrine 1mg IV/IO every 3-5 minutes',
      '0.5mg',
      '2mg',
      '5mg'
    ],
    correctIndex: 0,
    explanation: `According to ACLS Cardiac Arrest Algorithm guidelines, Epinephrine 1mg IV/IO every 3-5 minutes is the standard evidence-based dosage. This dosing regimen has been validated in clinical trials and provides optimal therapeutic benefit while minimizing adverse effects.`,
    difficulty: 'medium',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-dosage-002',
    question: `In ACLS Cardiac Arrest Algorithm, what is the correct dosage for cpr non-shockable?`,
    options: [
      'Epinephrine 1mg IV/IO every 3-5 minutes',
      '0.5mg',
      '2mg',
      '5mg'
    ],
    correctIndex: 0,
    explanation: `According to ACLS Cardiac Arrest Algorithm guidelines, Epinephrine 1mg IV/IO every 3-5 minutes is the standard evidence-based dosage. This dosing regimen has been validated in clinical trials and provides optimal therapeutic benefit while minimizing adverse effects.`,
    difficulty: 'medium',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-contraindication-001',
    question: `Which of the following is a contraindication to ACLS Cardiac Arrest Algorithm?`,
    options: [
      'DNR order',
      'Advanced age over 80 years',
      'History of diabetes mellitus',
      'Mild hypertension'
    ],
    correctIndex: 0,
    explanation: `DNR order is a contraindication to ACLS Cardiac Arrest Algorithm. Understanding contraindications is crucial for patient safety and appropriate clinical decision-making.`,
    difficulty: 'medium',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-mistake-001',
    question: `What is a common mistake to avoid when implementing ACLS Cardiac Arrest Algorithm?`,
    options: [
      'Prolonged pulse checks',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Prolonged pulse checks is a frequently encountered error that can compromise patient care. The ACLS Cardiac Arrest Algorithm specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-mistake-002',
    question: `What is a common mistake to avoid when implementing ACLS Cardiac Arrest Algorithm?`,
    options: [
      'Inadequate compression depth',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Inadequate compression depth is a frequently encountered error that can compromise patient care. The ACLS Cardiac Arrest Algorithm specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-mistake-003',
    question: `What is a common mistake to avoid when implementing ACLS Cardiac Arrest Algorithm?`,
    options: [
      'Excessive ventilation',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Excessive ventilation is a frequently encountered error that can compromise patient care. The ACLS Cardiac Arrest Algorithm specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-mistake-004',
    question: `What is a common mistake to avoid when implementing ACLS Cardiac Arrest Algorithm?`,
    options: [
      'Prolonged rhythm analysis',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Prolonged rhythm analysis is a frequently encountered error that can compromise patient care. The ACLS Cardiac Arrest Algorithm specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  },

  {
    id: 'acls-cardiac-arrest-mistake-005',
    question: `What is a common mistake to avoid when implementing ACLS Cardiac Arrest Algorithm?`,
    options: [
      'Late epinephrine administration',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Late epinephrine administration is a frequently encountered error that can compromise patient care. The ACLS Cardiac Arrest Algorithm specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'cardiac',
    references: [
      'AHA Guidelines for CPR and ECC 2025',
      'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2025'
    ],
    topicId: 'cardiac-emergencies',
    guidelineVersion: {
      name: 'ACLS Cardiac Arrest Algorithm',
      year: 2025,
      organization: 'American Heart Association'
    }
  }
];

export default aclscardiacarrestQuestions;

// Algorithm metadata for reference
export const ALGORITHM_INFO = {
  id: 'acls-cardiac-arrest',
  title: 'ACLS Cardiac Arrest Algorithm',
  organization: 'American Heart Association',
  category: 'cardiac',
  lastUpdated: '2025',
  version: '2025 Guidelines',
  totalQuestions: 14,
  questionTypes: {
    scenarios: 2,
    decisions: 1,
    sequences: 1,
    timing: 2,
    dosages: 2,
    contraindications: 1,
    mistakes: 5
  }
};