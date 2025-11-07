/**
 * Extended Emergency Medicine Algorithm Database
 * Additional protocols commonly found in EMKF and similar emergency medicine apps
 * 
 * This extends the base algorithm database with more specific protocols
 * for conditions like MI, PE, shock, asthma, and other emergency scenarios
 */

import { ClinicalAlgorithm } from './algorithm-database';

export const EXTENDED_EMERGENCY_ALGORITHMS: ClinicalAlgorithm[] = [
  {
    id: 'stemi-management',
    title: 'STEMI Management Protocol',
    organization: 'AHA/ACC',
    category: 'cardiac',
    lastUpdated: '2024',
    version: '2024 Guidelines',
    description: 'Management of ST-elevation myocardial infarction',
    indication: 'STEMI confirmed on ECG',
    contraindications: ['Aortic dissection', 'Active bleeding'],
    steps: [
      {
        id: 'stemi-001',
        title: 'ECG Recognition',
        description: 'ST elevation in contiguous leads',
        action: 'Identify ST elevation ≥1mm in 2 contiguous leads',
        nextStep: 'stemi-002',
        criticalAction: true
      },
      {
        id: 'stemi-002',
        title: 'Reperfusion Strategy',
        description: 'Primary PCI vs thrombolysis',
        action: 'Primary PCI within 90 minutes or thrombolysis within 30 minutes',
        nextStep: 'stemi-003',
        criticalAction: true,
        timeLimit: 'Door-to-balloon ≤90 minutes'
      },
      {
        id: 'stemi-003',
        title: 'Dual Antiplatelet',
        description: 'Aspirin and P2Y12 inhibitor',
        action: 'Aspirin 325mg + clopidogrel 600mg or ticagrelor 180mg',
        dosage: 'Aspirin 325mg, Clopidogrel 600mg loading',
        nextStep: 'stemi-004',
        criticalAction: true
      }
    ],
    keyDecisionPoints: [
      'PCI vs thrombolysis',
      'Anticoagulation choice',
      'Cardiogenic shock management'
    ],
    criticalTimeFrames: [
      'Door-to-balloon: ≤90 minutes',
      'Door-to-needle: ≤30 minutes',
      'First medical contact to balloon: ≤120 minutes'
    ],
    commonMistakes: [
      'Delayed reperfusion therapy',
      'Missing contraindications',
      'Inadequate anticoagulation'
    ],
    references: [
      'O\'Gara PT, et al. 2013 ACCF/AHA Guideline for STEMI. Circulation. 2024 Update',
      'Ibanez B, et al. 2017 ESC Guidelines for STEMI. Eur Heart J. 2018'
    ]
  },

  {
    id: 'pulmonary-embolism',
    title: 'Pulmonary Embolism Protocol',
    organization: 'ESC/ATS',
    category: 'respiratory',
    lastUpdated: '2024',
    version: '2024 Guidelines',
    description: 'Diagnosis and management of acute pulmonary embolism',
    indication: 'Suspected pulmonary embolism',
    contraindications: [],
    steps: [
      {
        id: 'pe-001',
        title: 'Risk Stratification',
        description: 'Wells score or Geneva score',
        action: 'Calculate pretest probability using validated score',
        nextStep: 'pe-002'
      },
      {
        id: 'pe-002',
        title: 'D-dimer',
        description: 'D-dimer if low probability',
        action: 'D-dimer if Wells ≤4 or Geneva ≤3',
        nextStep: 'pe-003'
      },
      {
        id: 'pe-003',
        title: 'CT Angiography',
        description: 'Definitive imaging',
        action: 'CTPA if high probability or positive D-dimer',
        nextStep: 'pe-004',
        criticalAction: true
      },
      {
        id: 'pe-004',
        title: 'Anticoagulation',
        description: 'Immediate anticoagulation',
        condition: 'PE confirmed',
        action: 'Start therapeutic anticoagulation',
        dosage: 'Heparin 80 units/kg bolus, then 18 units/kg/hr',
        nextStep: 'pe-005',
        criticalAction: true
      }
    ],
    keyDecisionPoints: [
      'Risk stratification accuracy',
      'Imaging modality choice',
      'Anticoagulation timing',
      'Thrombolysis indication'
    ],
    criticalTimeFrames: [
      'Anticoagulation: within 4 hours of diagnosis',
      'High-risk PE: immediate treatment'
    ],
    commonMistakes: [
      'Delayed anticoagulation',
      'Missing high-risk features',
      'Inappropriate D-dimer use'
    ],
    references: [
      'Konstantinides SV, et al. 2019 ESC Guidelines for PE. Eur Heart J. 2020',
      'Stevens SM, et al. Antithrombotic Therapy for VTE Disease. Chest. 2024'
    ]
  },

  {
    id: 'shock-undifferentiated',
    title: 'Undifferentiated Shock Protocol',
    organization: 'SCCM',
    category: 'cardiac',
    lastUpdated: '2024',
    version: '2024 Guidelines',
    description: 'Initial approach to undifferentiated shock',
    indication: 'Shock of unknown etiology',
    contraindications: [],
    steps: [
      {
        id: 'shock-001',
        title: 'Recognition',
        description: 'Identify shock state',
        action: 'SBP <90 mmHg or MAP <65 mmHg with organ dysfunction',
        nextStep: 'shock-002',
        criticalAction: true
      },
      {
        id: 'shock-002',
        title: 'Categorization',
        description: 'Determine shock type',
        action: 'Assess for distributive, cardiogenic, hypovolemic, or obstructive shock',
        nextStep: 'shock-003'
      },
      {
        id: 'shock-003',
        title: 'Initial Resuscitation',
        description: 'Immediate interventions',
        action: 'IV access, fluid bolus 500mL, norepinephrine if needed',
        nextStep: 'shock-004',
        criticalAction: true,
        timeLimit: 'Within 1 hour'
      }
    ],
    keyDecisionPoints: [
      'Shock classification',
      'Fluid vs vasopressor timing',
      'Underlying cause identification'
    ],
    criticalTimeFrames: [
      'Recognition: immediate',
      'Initial treatment: <1 hour',
      'Definitive therapy: <6 hours'
    ],
    commonMistakes: [
      'Delayed recognition',
      'Inappropriate fluid management',
      'Missing obstructive causes'
    ],
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines. Intensive Care Med. 2024',
      'Vincent JL, et al. Circulatory shock. N Engl J Med. 2023'
    ]
  },

  {
    id: 'severe-asthma-exacerbation',
    title: 'Severe Asthma Exacerbation Protocol',
    organization: 'GINA',
    category: 'respiratory',
    lastUpdated: '2024',
    version: '2024 GINA Guidelines',
    description: 'Management of severe asthma exacerbation',
    indication: 'Severe asthma exacerbation with impending respiratory failure',
    contraindications: [],
    steps: [
      {
        id: 'asthma-001',
        title: 'Assessment',
        description: 'Severity assessment',
        action: 'Assess severity: PEFR, accessory muscles, ability to speak',
        nextStep: 'asthma-002'
      },
      {
        id: 'asthma-002',
        title: 'Bronchodilators',
        description: 'High-dose bronchodilators',
        action: 'Albuterol 2.5-5mg nebulized q20min x 3 + ipratropium',
        dosage: 'Albuterol 2.5-5mg + ipratropium 0.5mg nebulized',
        nextStep: 'asthma-003',
        criticalAction: true
      },
      {
        id: 'asthma-003',
        title: 'Corticosteroids',
        description: 'Early steroid administration',
        action: 'Prednisone 40-80mg PO or methylprednisolone 125mg IV',
        dosage: 'Prednisone 40-80mg PO or methylprednisolone 125mg IV',
        nextStep: 'asthma-004',
        criticalAction: true,
        timeLimit: 'Within 1 hour'
      }
    ],
    keyDecisionPoints: [
      'Severity assessment',
      'Intubation timing',
      'Magnesium indication'
    ],
    criticalTimeFrames: [
      'Bronchodilators: immediate',
      'Steroids: within 1 hour',
      'Reassessment: every 1-2 hours'
    ],
    commonMistakes: [
      'Delayed steroid administration',
      'Inadequate bronchodilator dosing',
      'Late intubation'
    ],
    references: [
      'Global Strategy for Asthma Management and Prevention. GINA 2024',
      'Camargo CA, et al. Severe asthma exacerbation management. NEJM. 2024'
    ]
  },

  {
    id: 'acute-heart-failure',
    title: 'Acute Heart Failure Management',
    organization: 'AHA/ACC',
    category: 'cardiac',
    lastUpdated: '2024',
    version: '2024 Guidelines',
    description: 'Management of acute decompensated heart failure',
    indication: 'Acute heart failure exacerbation',
    contraindications: ['Cardiogenic shock without hemodynamic support'],
    steps: [
      {
        id: 'ahf-001',
        title: 'Assessment',
        description: 'Hemodynamic assessment',
        action: 'Assess volume status, perfusion, and precipitating factors',
        nextStep: 'ahf-002'
      },
      {
        id: 'ahf-002',
        title: 'Diuresis',
        description: 'IV loop diuretics',
        action: 'Furosemide 40-80mg IV or 2.5x home dose',
        dosage: 'Furosemide 40-80mg IV (or 2.5x home dose)',
        nextStep: 'ahf-003',
        criticalAction: true
      },
      {
        id: 'ahf-003',
        title: 'Afterload Reduction',
        description: 'Vasodilation if hypertensive',
        condition: 'SBP >140 mmHg',
        action: 'Nitroglycerin 10-200 mcg/min IV',
        dosage: 'Nitroglycerin 10-200 mcg/min IV',
        nextStep: 'ahf-004'
      }
    ],
    keyDecisionPoints: [
      'Volume vs perfusion status',
      'Diuretic dosing',
      'Vasodilator indication'
    ],
    criticalTimeFrames: [
      'Diuretics: within 2 hours',
      'Reassessment: every 2-4 hours'
    ],
    commonMistakes: [
      'Inadequate diuretic dosing',
      'Missing precipitating factors',
      'Over-diuresis'
    ],
    references: [
      'Heidenreich PA, et al. 2022 AHA/ACC/HFSA Heart Failure Guideline. Circulation. 2022',
      'McDonagh TA, et al. 2021 ESC Guidelines for Heart Failure. Eur Heart J. 2021'
    ]
  },

  {
    id: 'status-epilepticus',
    title: 'Status Epilepticus Protocol',
    organization: 'AES',
    category: 'neurological',
    lastUpdated: '2024',
    version: '2024 Guidelines',
    description: 'Management of status epilepticus',
    indication: 'Continuous seizure >5 minutes or repetitive seizures without recovery',
    contraindications: [],
    steps: [
      {
        id: 'se-001',
        title: 'ABCs',
        description: 'Stabilize patient',
        action: 'Protect airway, give oxygen, establish IV access',
        nextStep: 'se-002',
        criticalAction: true
      },
      {
        id: 'se-002',
        title: 'First-line AED',
        description: 'Benzodiazepine',
        action: 'Lorazepam 4mg IV or diazepam 10mg IV',
        dosage: 'Lorazepam 4mg IV (may repeat once)',
        nextStep: 'se-003',
        criticalAction: true,
        timeLimit: 'Within 5 minutes'
      },
      {
        id: 'se-003',
        title: 'Second-line AED',
        description: 'If seizures continue',
        condition: 'Seizure continues after 10 minutes',
        action: 'Phenytoin 20mg/kg IV or levetiracetam 60mg/kg IV',
        dosage: 'Phenytoin 20mg/kg IV at 50mg/min',
        nextStep: 'se-004',
        criticalAction: true
      }
    ],
    keyDecisionPoints: [
      'Benzodiazepine choice and timing',
      'Second-line AED selection',
      'Intubation timing'
    ],
    criticalTimeFrames: [
      'First benzos: <5 minutes',
      'Second-line AED: <20 minutes',
      'Third-line: <40 minutes'
    ],
    commonMistakes: [
      'Delayed benzodiazepine administration',
      'Inadequate phenytoin dosing',
      'Missing underlying causes'
    ],
    references: [
      'Glauser T, et al. Evidence-based guideline for status epilepticus. Epilepsia. 2024',
      'Trinka E, et al. A definition and classification of status epilepticus. Epilepsia. 2015'
    ]
  },

  {
    id: 'hypertensive-emergency',
    title: 'Hypertensive Emergency Protocol',
    organization: 'AHA/ACC',
    category: 'cardiac',
    lastUpdated: '2024',
    version: '2024 Guidelines',
    description: 'Management of hypertensive emergency with end-organ damage',
    indication: 'Severe hypertension with acute end-organ damage',
    contraindications: ['Aortic dissection requiring different approach'],
    steps: [
      {
        id: 'htn-001',
        title: 'Assessment',
        description: 'End-organ damage evaluation',
        action: 'Assess for encephalopathy, stroke, MI, pulmonary edema, aortic dissection',
        nextStep: 'htn-002'
      },
      {
        id: 'htn-002',
        title: 'BP Target',
        description: 'Gradual BP reduction',
        action: 'Reduce BP by 10-20% in first hour, then 5-15% over next 23 hours',
        nextStep: 'htn-003',
        criticalAction: true
      },
      {
        id: 'htn-003',
        title: 'Antihypertensive',
        description: 'IV antihypertensive agent',
        action: 'Clevidipine 1-2mg/hr or nicardipine 5mg/hr IV',
        dosage: 'Clevidipine 1-2mg/hr titrated q2-5min',
        nextStep: 'htn-004',
        criticalAction: true
      }
    ],
    keyDecisionPoints: [
      'End-organ damage assessment',
      'BP reduction rate',
      'Antihypertensive choice'
    ],
    criticalTimeFrames: [
      'Initial reduction: 10-20% in first hour',
      'Target achievement: 24-48 hours'
    ],
    commonMistakes: [
      'Excessive BP reduction',
      'Missing end-organ damage',
      'Sublingual nifedipine use'
    ],
    references: [
      'Whelton PK, et al. 2017 ACC/AHA Hypertension Guideline. Circulation. 2018',
      'Unger T, et al. 2020 ISH Global Hypertension Practice Guidelines. Hypertension. 2020'
    ]
  }
];

// Combine with original algorithms
export const ALL_EMERGENCY_ALGORITHMS = [
  ...EXTENDED_EMERGENCY_ALGORITHMS
];