import { Question } from './types';

export const advancedEcgInterpretationQuestions: Question[] = [
  {
    id: 'adv-ecg-001',
    question: 'Based on the ECG findings described below, what is the most likely diagnosis?',
    clinicalScenario: 'A 45-year-old construction worker presents to the ED with sudden onset chest pain while lifting heavy equipment.',
    patientPresentation: {
      age: '45 years old',
      gender: 'Male',
      chiefComplaint: 'Sudden onset crushing chest pain radiating to left arm',
      vitals: 'BP 160/95, HR 95, RR 18, O2 Sat 96% RA, Temp 98.6°F',
      physicalExam: 'Diaphoretic, anxious, S1S2 regular, no murmurs, clear lungs',
      labsImaging: 'Troponin pending, CXR shows clear lungs'
    },
    imageDescription: 'ECG Shows: Lead II rhythm strip reveals regular QRS complexes at 95 bpm. Leads II, III, aVF show 4mm ST elevation with hyperacute T waves. Lead aVR shows 1mm ST depression. Precordial leads V1-V6 show no acute changes. Q waves are absent.',
    options: [
      'Inferior STEMI',
      'Posterior STEMI', 
      'Pericarditis',
      'Early repolarization'
    ],
    correctIndex: 0,
    explanation: 'This ECG pattern of ST elevation in leads II, III, aVF with reciprocal depression in aVR is classic for inferior STEMI. The presence of hyperacute T waves indicates acute occlusion, likely of the right coronary artery. Immediate cardiac catheterization is indicated.',
    references: [
      'Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction (2018)',
      'AHA/ACC STEMI Guidelines 2023',
      'Ibanez B, et al. 2017 ESC STEMI Guidelines'
    ],
    difficulty: 'easy',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize inferior STEMI pattern',
      'Identify reciprocal changes',
      'Understand coronary anatomy correlation'
    ],
    clinicalPearls: [
      'RCA occlusion causes inferior STEMI in 80% of cases',
      'Check V7-V9 for posterior extension',
      'Right-sided ECG if RV involvement suspected'
    ]
  },
  {
    id: 'adv-ecg-002',
    question: 'What is the most appropriate immediate management for this rhythm?',
    clinicalScenario: 'A 72-year-old woman with known heart failure is brought by EMS for weakness and dizziness.',
    patientPresentation: {
      age: '72 years old',
      gender: 'Female',
      chiefComplaint: 'Weakness, dizziness, and near-syncope for 2 hours',
      vitals: 'BP 85/50, HR 35, RR 20, O2 Sat 94% RA, Temp 97.8°F',
      physicalExam: 'Pale, cool skin, JVD present, S3 gallop, bilateral rales',
      labsImaging: 'BUN/Cr elevated, BNP 1200, CXR shows pulmonary edema'
    },
    imageDescription: 'ECG Shows: Ventricular rate 35 bpm with wide QRS complexes (140ms). P waves are visible at rate of 75 bpm with no relationship to QRS complexes. AV dissociation is present. QRS morphology shows LBBB pattern. No capture or fusion beats visible.',
    options: [
      'Atropine 0.5mg IV',
      'Transcutaneous pacing',
      'Dopamine infusion',
      'Synchronized cardioversion'
    ],
    correctIndex: 1,
    explanation: 'This is complete heart block (3rd degree AV block) with hemodynamic compromise. The wide QRS escape rhythm at 35 bpm with AV dissociation indicates infranodal block. Transcutaneous pacing is the immediate treatment of choice for symptomatic bradycardia with heart block.',
    references: [
      'AHA Guidelines for CPR and ECC 2020',
      'Kusumoto FM, et al. 2018 AHA/ACC/HRS Bradycardia Guidelines',
      'Epstein AE, et al. 2012 ACCF/AHA/HRS Pacemaker Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize complete heart block',
      'Assess hemodynamic stability',
      'Select appropriate emergency intervention'
    ],
    clinicalPearls: [
      'Wide QRS escape suggests infranodal block',
      'Atropine ineffective for infranodal blocks',
      'Prepare for transvenous pacing if transcutaneous fails'
    ]
  },
  {
    id: 'adv-ecg-003',
    question: 'This rhythm pattern is most concerning for which complication?',
    clinicalScenario: 'A 28-year-old athlete collapses during basketball practice and is found to have an irregular pulse.',
    patientPresentation: {
      age: '28 years old',
      gender: 'Male',
      chiefComplaint: 'Syncope during athletic activity',
      vitals: 'BP 90/60, HR 220 (irregular), RR 24, O2 Sat 98% RA',
      physicalExam: 'Athletic build, alert but anxious, irregular pulse, no heart failure signs',
      labsImaging: 'Electrolytes normal, echo shows normal LV function'
    },
    imageDescription: 'ECG Shows: Irregular wide-complex tachycardia at rates varying from 180-250 bpm. QRS complexes are wide (>120ms) with varying morphology. Some QRS complexes appear narrow. No clear P waves visible. R-R intervals are irregularly irregular. QRS axis changes beat to beat.',
    options: [
      'Hemodynamically stable VT',
      'Atrial fibrillation with aberrancy',
      'Atrial fibrillation with pre-excitation (WPW)',
      'Multifocal atrial tachycardia'
    ],
    correctIndex: 2,
    explanation: 'This is atrial fibrillation with pre-excitation (Wolff-Parkinson-White syndrome). The combination of irregular wide-complex tachycardia with varying QRS morphology and extremely rapid rates (>250 bpm) is pathognomonic for AF with WPW. This can degenerate into VF.',
    references: [
      'Katritsis DG, et al. WPW Guidelines ESC 2019',
      'Page RL, et al. 2015 ACC/AHA/HRS SVT Guidelines',
      'Brugada J, et al. 2019 ESC SVT Guidelines'
    ],
    difficulty: 'hard',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize AF with pre-excitation',
      'Understand WPW pathophysiology',
      'Identify life-threatening arrhythmias'
    ],
    clinicalPearls: [
      'Avoid AV node blockers (adenosine, CCB, BB)',
      'Can degenerate to VF',
      'Emergency cardioversion if unstable'
    ]
  },
  {
    id: 'adv-ecg-004',
    question: 'What is the most likely diagnosis based on this ECG pattern?',
    clinicalScenario: 'A 65-year-old diabetic male presents with 30 minutes of substernal chest pressure.',
    patientPresentation: {
      age: '65 years old',
      gender: 'Male',
      chiefComplaint: 'Substernal chest pressure for 30 minutes',
      vitals: 'BP 140/85, HR 88, RR 16, O2 Sat 99% RA, Temp 98.4°F',
      physicalExam: 'Mild diaphoresis, S1S2 regular, no murmurs, lungs clear',
      labsImaging: 'Initial troponin normal, CXR normal'
    },
    imageDescription: 'ECG Shows: Sinus rhythm at 88 bpm. Leads V1-V4 show prominent R waves with R/S ratio >1 in V1. ST depression 2-3mm in leads V1-V3. Tall, symmetric T waves in V1-V3. Lead V6 shows 1mm ST elevation. No Q waves present.',
    options: [
      'Anterior STEMI',
      'Posterior STEMI',
      'Right ventricular infarction',
      'Left bundle branch block'
    ],
    correctIndex: 1,
    explanation: 'This ECG shows classic signs of posterior STEMI: prominent R waves in V1-V3 (posterior Q wave equivalent), ST depression in V1-V3 (posterior ST elevation equivalent), and tall T waves in V1-V3. The ST elevation in V6 supports the diagnosis.',
    references: [
      'Thygesen K, et al. Fourth Universal Definition MI 2018',
      'Mattu A, et al. Posterior MI Recognition 2019',
      'AHA STEMI Guidelines 2023'
    ],
    difficulty: 'hard',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize posterior STEMI equivalent',
      'Understand ECG reciprocal changes',
      'Identify subtle STEMI presentations'
    ],
    clinicalPearls: [
      'Obtain V7-V9 leads for confirmation',
      'Often missed on initial ECG',
      'Usually LCX or RCA occlusion'
    ]
  },
  {
    id: 'adv-ecg-005',
    question: 'What is the most appropriate next step in management?',
    clinicalScenario: 'A 55-year-old woman with known CAD presents with palpitations and chest discomfort.',
    patientPresentation: {
      age: '55 years old',
      gender: 'Female',
      chiefComplaint: 'Palpitations and chest discomfort for 1 hour',
      vitals: 'BP 110/70, HR 180, RR 18, O2 Sat 97% RA, Temp 98.2°F',
      physicalExam: 'Alert, mild distress, regular tachycardia, no signs of CHF',
      labsImaging: 'Electrolytes normal, troponin pending'
    },
    imageDescription: 'ECG Shows: Regular wide-complex tachycardia at 180 bpm. QRS width 140ms with RBBB morphology. AV dissociation present with occasional capture beats. Concordance in precordial leads. Northwest axis deviation present.',
    options: [
      'Adenosine 6mg IV push',
      'Amiodarone 150mg IV over 10 minutes',
      'Synchronized cardioversion',
      'Verapamil 5mg IV push'
    ],
    correctIndex: 1,
    explanation: 'This is sustained monomorphic ventricular tachycardia (VT) based on wide QRS, AV dissociation, capture beats, and concordance. Since the patient is hemodynamically stable, antiarrhythmic therapy with amiodarone is appropriate first-line treatment.',
    references: [
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS VT Guidelines',
      'Zipes DP, et al. ACC/AHA/ESC VT Guidelines 2006',
      'Priori SG, et al. 2015 ESC Ventricular Arrhythmia Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Distinguish VT from SVT with aberrancy',
      'Assess hemodynamic stability',
      'Select appropriate VT treatment'
    ],
    clinicalPearls: [
      'AV dissociation strongly suggests VT',
      'Capture/fusion beats confirm VT',
      'Avoid adenosine/verapamil in wide-complex tachycardia'
    ]
  },
  {
    id: 'adv-ecg-006',
    question: 'What is the most likely underlying condition?',
    clinicalScenario: 'A 22-year-old college student is brought to ED after collapsing during a fraternity party.',
    patientPresentation: {
      age: '22 years old',
      gender: 'Male',
      chiefComplaint: 'Syncope at party, possible alcohol use',
      vitals: 'BP 125/75, HR 58, RR 16, O2 Sat 99% RA, Temp 97.9°F',
      physicalExam: 'Young male, alert, no acute distress, bradycardic but regular',
      labsImaging: 'Alcohol level 0.08, electrolytes normal, echo pending'
    },
    imageDescription: 'ECG Shows: Sinus bradycardia at 58 bpm. PR interval 240ms. QRS 90ms. QT interval 520ms (QTc 485ms). Leads V1-V3 show coved ST elevation 2-3mm followed by negative T waves. No delta waves visible.',
    options: [
      'Long QT syndrome',
      'Brugada syndrome',
      'Wolff-Parkinson-White syndrome',
      'Alcohol-induced bradycardia'
    ],
    correctIndex: 1,
    explanation: 'This ECG shows the classic Brugada Type 1 pattern: coved ST elevation ≥2mm in V1-V3 followed by negative T waves. This is associated with sudden cardiac death in young adults and can be unmasked by alcohol, fever, or certain medications.',
    references: [
      'Antzelevitch C, et al. Brugada Syndrome Expert Consensus 2018',
      'Priori SG, et al. 2015 ESC Brugada Guidelines',
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guidelines'
    ],
    difficulty: 'hard',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize Brugada Type 1 pattern',
      'Understand sudden cardiac death risk',
      'Identify hereditary arrhythmia syndromes'
    ],
    clinicalPearls: [
      'Type 1 pattern diagnostic for Brugada syndrome',
      'High risk for sudden cardiac death',
      'ICD indicated for Type 1 pattern'
    ]
  },
  {
    id: 'adv-ecg-007',
    question: 'What medication should be avoided in this patient?',
    clinicalScenario: 'A 35-year-old woman presents to ED with chest pain and anxiety after starting a new antidepressant.',
    patientPresentation: {
      age: '35 years old',
      gender: 'Female',
      chiefComplaint: 'Chest pain and palpitations since starting new medication',
      vitals: 'BP 95/60, HR 45, RR 20, O2 Sat 98% RA, Temp 98.1°F',
      physicalExam: 'Anxious, bradycardic, no murmurs, clear lungs',
      labsImaging: 'Troponin negative, basic metabolic panel normal'
    },
    imageDescription: 'ECG Shows: Sinus bradycardia at 45 bpm. PR interval 200ms. QRS duration 140ms with RBBB pattern. QT interval 600ms (QTc 520ms). Prominent U waves visible in precordial leads. T waves are flattened.',
    options: [
      'Metoprolol',
      'Amiodarone',
      'Atropine',
      'Magnesium sulfate'
    ],
    correctIndex: 1,
    explanation: 'This patient has drug-induced QT prolongation (QTc 520ms) with associated bradycardia and U waves. Amiodarone should be avoided as it significantly prolongs the QT interval and could precipitate torsades de pointes in a patient with already prolonged QT.',
    references: [
      'Roden DM. Drug-Induced QT Prolongation NEJM 2004',
      'Tisdale JE, et al. Drug-Induced QT Prolongation 2020',
      'Schwartz PJ, et al. Long QT Syndrome Guidelines 2013'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize drug-induced QT prolongation',
      'Understand torsades de pointes risk',
      'Identify contraindicated medications'
    ],
    clinicalPearls: [
      'QTc >500ms significantly increases TdP risk',
      'U waves suggest electrolyte abnormality',
      'Stop offending medications immediately'
    ]
  },
  {
    id: 'adv-ecg-008',
    question: 'What is the most likely mechanism of this arrhythmia?',
    clinicalScenario: 'A 78-year-old man with COPD presents with irregular palpitations and shortness of breath.',
    patientPresentation: {
      age: '78 years old',
      gender: 'Male',
      chiefComplaint: 'Irregular palpitations and worsening dyspnea',
      vitals: 'BP 130/80, HR 135 (irregular), RR 24, O2 Sat 91% RA',
      physicalExam: 'Irregularly irregular pulse, JVD, bilateral wheeze, pedal edema',
      labsImaging: 'BNP elevated, ABG shows mild hypoxemia, CXR shows hyperinflation'
    },
    imageDescription: 'ECG Shows: Irregularly irregular rhythm with ventricular rate 100-150 bpm. No clear P waves visible. Fibrillatory waves present in V1. QRS complexes vary slightly in morphology. Occasional wide beats with RBBB pattern following long R-R intervals.',
    options: [
      'Multiple ectopic atrial foci',
      'Re-entrant circuit in atria',
      'AV nodal re-entry',
      'Accessory pathway conduction'
    ],
    correctIndex: 1,
    explanation: 'This is atrial fibrillation with Ashman phenomenon (aberrant conduction). AF is caused by multiple micro re-entrant circuits in the atria creating chaotic electrical activity. The wide beats represent aberrant ventricular conduction following long-short R-R sequences.',
    references: [
      'Ashman R, et al. Original Description 1947',
      'January CT, et al. 2019 AHA/ACC/HRS AF Guidelines',
      'Hindricks G, et al. 2020 ESC AF Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Understand AF pathophysiology',
      'Recognize Ashman phenomenon',
      'Distinguish aberrancy from ectopy'
    ],
    clinicalPearls: [
      'Ashman beats follow long-short sequences',
      'RBBB morphology most common',
      'Does not require additional treatment'
    ]
  },
  {
    id: 'adv-ecg-009',
    question: 'What is the most appropriate immediate action?',
    clinicalScenario: 'A 42-year-old marathon runner collapses during a race and is found unconscious by race medics.',
    patientPresentation: {
      age: '42 years old',
      gender: 'Male',
      chiefComplaint: 'Cardiac arrest during marathon race',
      vitals: 'No pulse, no blood pressure, agonal respirations',
      physicalExam: 'Unconscious, no pulse, CPR in progress',
      labsImaging: 'Field ECG shows chaotic rhythm'
    },
    imageDescription: 'ECG Shows: Chaotic, irregular waveforms with no identifiable P, QRS, or T waves. Amplitude varies from 2-8mm. Frequency appears around 300-600 per minute. No organized electrical activity visible. Baseline appears to undulate randomly.',
    options: [
      'Immediate defibrillation',
      'Epinephrine 1mg IV',
      'Amiodarone 300mg IV',
      'Synchronized cardioversion'
    ],
    correctIndex: 0,
    explanation: 'This is ventricular fibrillation (VF), a shockable rhythm. According to ACLS guidelines, immediate defibrillation is the priority treatment for VF. Early defibrillation significantly improves survival rates in cardiac arrest.',
    references: [
      'AHA Guidelines for CPR and ECC 2020',
      'Panchal AR, et al. Adult Advanced Life Support 2020',
      'Link MS, et al. Cardiac Arrest in Athletes 2017'
    ],
    difficulty: 'easy',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize ventricular fibrillation',
      'Prioritize ACLS interventions',
      'Understand shockable rhythms'
    ],
    clinicalPearls: [
      'VF is a shockable rhythm',
      'Minimize interruptions to compressions',
      'Early defibrillation improves survival'
    ]
  },
  {
    id: 'adv-ecg-010',
    question: 'What additional ECG leads would be most helpful?',
    clinicalScenario: 'A 58-year-old diabetic woman presents with atypical chest discomfort and nausea.',
    patientPresentation: {
      age: '58 years old',
      gender: 'Female',
      chiefComplaint: 'Atypical chest discomfort, nausea, and fatigue',
      vitals: 'BP 155/95, HR 92, RR 18, O2 Sat 98% RA, Temp 98.0°F',
      physicalExam: 'Mild distress, S1S2 regular, no murmurs, clear lungs',
      labsImaging: 'Troponin elevated, glucose 185'
    },
    imageDescription: 'ECG Shows: Sinus rhythm at 92 bpm. Lead II shows 2mm ST elevation. Lead III shows 3mm ST elevation. Lead aVF shows 2mm ST elevation. Lead aVR shows 1mm ST depression. Leads V1-V6 appear normal. No Q waves present.',
    options: [
      'V7, V8, V9 (posterior leads)',
      'V3R, V4R, V5R (right-sided leads)',
      'Lead aVL and high lateral leads',
      'Esophageal leads'
    ],
    correctIndex: 1,
    explanation: 'This is an inferior STEMI. Right-sided leads (V3R-V5R) should be obtained to evaluate for right ventricular involvement, which occurs in 30-50% of inferior STEMIs and significantly affects management (preload dependent, avoid nitrates).',
    references: [
      'Ibanez B, et al. 2017 ESC STEMI Guidelines',
      'O\'Gara PT, et al. 2013 ACCF/AHA STEMI Guidelines',
      'Thygesen K, et al. Fourth Universal Definition MI 2018'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize inferior STEMI',
      'Understand RV involvement assessment',
      'Select appropriate additional ECG leads'
    ],
    clinicalPearls: [
      'RV involvement in 30-50% of inferior STEMI',
      'ST elevation ≥1mm in V4R is diagnostic',
      'Avoid nitrates if RV involvement present'
    ]
  }
];