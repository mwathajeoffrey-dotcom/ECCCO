/**
 * Anaphylaxis Management Algorithm - Algorithm-Based Questions
 * Generated from AAAAI/ACAAI guidelines
 * Version: 2024 Guidelines
 * 
 * This file contains questions automatically generated from the clinical algorithm
 * covering scenarios, decision points, timing, dosages, and common mistakes.
 * 
 * Generated on: 2025-11-06T22:05:19.338Z
 */

import { Question } from './types';

export const anaphylaxismanagementQuestions: Question[] = [
  {
    id: 'anaphylaxis-management-sequence-001',
    question: `What is the correct sequence for the first four steps in the Anaphylaxis Management Algorithm?`,
    options: [
      'Positioning → Recognition → Epinephrine → Airway Support',
      'Recognition → Epinephrine → Positioning → Airway Support',
      'Recognition → Airway Support → Positioning → Epinephrine',
      'Recognition → Positioning → Epinephrine → Airway Support'
    ],
    correctIndex: 1,
    explanation: `The correct sequence follows the Anaphylaxis Management Algorithm: Recognition → Epinephrine → Positioning → Airway Support. This systematic approach ensures no critical steps are missed and prioritizes life-threatening conditions appropriately.`,
    difficulty: 'medium',
    category: 'respiratory',
    references: [
      'Shaker MS, et al. Anaphylaxis-a 2020 practice parameter update. Ann Allergy Asthma Immunol. 2020',
      'Simons FER, et al. World Allergy Organization anaphylaxis guidelines. J Allergy Clin Immunol. 2022'
    ],
    topicId: 'respiratory-emergencies',
    guidelineVersion: {
      name: 'Anaphylaxis Management Algorithm',
      year: 2024,
      organization: 'AAAAI/ACAAI'
    }
  },

  {
    id: 'anaphylaxis-management-dosage-001',
    question: `In Anaphylaxis Management Algorithm, what is the correct dosage for epinephrine?`,
    options: [
      '0.3-0.5mg IM, may repeat q5-15 minutes',
      'Half the stated dose',
      'Double the stated dose',
      'Triple the stated dose'
    ],
    correctIndex: 0,
    explanation: `According to Anaphylaxis Management Algorithm guidelines, 0.3-0.5mg IM, may repeat q5-15 minutes is the standard evidence-based dosage. This dosing regimen has been validated in clinical trials and provides optimal therapeutic benefit while minimizing adverse effects.`,
    difficulty: 'medium',
    category: 'respiratory',
    references: [
      'Shaker MS, et al. Anaphylaxis-a 2020 practice parameter update. Ann Allergy Asthma Immunol. 2020',
      'Simons FER, et al. World Allergy Organization anaphylaxis guidelines. J Allergy Clin Immunol. 2022'
    ],
    topicId: 'respiratory-emergencies',
    guidelineVersion: {
      name: 'Anaphylaxis Management Algorithm',
      year: 2024,
      organization: 'AAAAI/ACAAI'
    }
  },

  {
    id: 'anaphylaxis-management-mistake-001',
    question: `What is a common mistake to avoid when implementing Anaphylaxis Management Algorithm?`,
    options: [
      'Delayed epinephrine administration',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Delayed epinephrine administration is a frequently encountered error that can compromise patient care. The Anaphylaxis Management Algorithm specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'respiratory',
    references: [
      'Shaker MS, et al. Anaphylaxis-a 2020 practice parameter update. Ann Allergy Asthma Immunol. 2020',
      'Simons FER, et al. World Allergy Organization anaphylaxis guidelines. J Allergy Clin Immunol. 2022'
    ],
    topicId: 'respiratory-emergencies',
    guidelineVersion: {
      name: 'Anaphylaxis Management Algorithm',
      year: 2024,
      organization: 'AAAAI/ACAAI'
    }
  },

  {
    id: 'anaphylaxis-management-mistake-002',
    question: `What is a common mistake to avoid when implementing Anaphylaxis Management Algorithm?`,
    options: [
      'Using antihistamines first',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Using antihistamines first is a frequently encountered error that can compromise patient care. The Anaphylaxis Management Algorithm specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'respiratory',
    references: [
      'Shaker MS, et al. Anaphylaxis-a 2020 practice parameter update. Ann Allergy Asthma Immunol. 2020',
      'Simons FER, et al. World Allergy Organization anaphylaxis guidelines. J Allergy Clin Immunol. 2022'
    ],
    topicId: 'respiratory-emergencies',
    guidelineVersion: {
      name: 'Anaphylaxis Management Algorithm',
      year: 2024,
      organization: 'AAAAI/ACAAI'
    }
  },

  {
    id: 'anaphylaxis-management-mistake-003',
    question: `What is a common mistake to avoid when implementing Anaphylaxis Management Algorithm?`,
    options: [
      'Inadequate monitoring',
      'Following guidelines exactly',
      'Consulting senior staff',
      'Documenting interventions'
    ],
    correctIndex: 0,
    explanation: `Inadequate monitoring is a frequently encountered error that can compromise patient care. The Anaphylaxis Management Algorithm specifically addresses this to improve outcomes and reduce complications.`,
    difficulty: 'hard',
    category: 'respiratory',
    references: [
      'Shaker MS, et al. Anaphylaxis-a 2020 practice parameter update. Ann Allergy Asthma Immunol. 2020',
      'Simons FER, et al. World Allergy Organization anaphylaxis guidelines. J Allergy Clin Immunol. 2022'
    ],
    topicId: 'respiratory-emergencies',
    guidelineVersion: {
      name: 'Anaphylaxis Management Algorithm',
      year: 2024,
      organization: 'AAAAI/ACAAI'
    }
  }
];

export default anaphylaxismanagementQuestions;

// Algorithm metadata for reference
export const ALGORITHM_INFO = {
  id: 'anaphylaxis-management',
  title: 'Anaphylaxis Management Algorithm',
  organization: 'AAAAI/ACAAI',
  category: 'respiratory',
  lastUpdated: '2024',
  version: '2024 Guidelines',
  totalQuestions: 5,
  questionTypes: {
    scenarios: 0,
    decisions: 0,
    sequences: 1,
    timing: 0,
    dosages: 1,
    contraindications: 0,
    mistakes: 3
  }
};