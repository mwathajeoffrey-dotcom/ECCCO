import { Question } from './types';

export const advancedEcgInterpretationQuestions: Question[] = [
  {
    id: 'adv-ecg-001',
    question: 'Based on the ECG findings described below, what is the most likely diagnosis?',
    clinicalScenario: 'A 45-year-old construction worker presents to the ED with sudden onset chest pain while lifting heavy equipment.',
    patientPresentation: {
      age: 45,
      gender: 'Male',
      chiefComplaint: 'Sudden onset crushing chest pain radiating to left arm',
      vitalSigns: {
        heartRate: 95,
        bloodPressure: '160/95',
        temperature: 98.6,
        respiratoryRate: 18,
        oxygenSaturation: 96
      }
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
      age: 72,
      gender: 'Female',
      chiefComplaint: 'Weakness, dizziness, and near-syncope for 2 hours',
      vitalSigns: {
        heartRate: 35,
        bloodPressure: '85/50',
        temperature: 97.8,
        respiratoryRate: 20,
        oxygenSaturation: 94
      }
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
  },
  {
    id: 'adv-ecg-011',
    question: 'What is the most likely diagnosis?',
    clinicalScenario: 'A 65-year-old man with chest pain presents 6 hours after symptom onset.',
    patientPresentation: {
      age: 65,
      gender: 'Male',
      chiefComplaint: 'Severe substernal chest pain radiating to left arm',
      vitalSigns: {
        heartRate: 88,
        bloodPressure: '140/90',
        temperature: 98.6,
        respiratoryRate: 18,
        oxygenSaturation: 97
      },
      pastMedicalHistory: ['Hypertension', 'Hyperlipidemia'],
      currentMedications: ['Lisinopril', 'Atorvastatin']
    },
    imageDescription: 'ECG Shows: Sinus rhythm at 88 bpm. Deep Q waves in leads V1-V4 (>25% of R wave amplitude). Poor R wave progression V1-V4. T waves are inverted in V1-V4. ST segments are isoelectric.',
    options: [
      'Acute anterior STEMI',
      'Old anterior myocardial infarction',
      'Hypertrophic cardiomyopathy',
      'Left bundle branch block'
    ],
    correctIndex: 1,
    explanation: 'Deep Q waves in V1-V4 with poor R wave progression and T wave inversions indicate an old anterior MI. The absence of ST elevation and presence of mature Q waves suggest this is not an acute event.',
    references: [
      'Wagner GS, et al. Marriott\'s Practical Electrocardiography 2014',
      'Thygesen K, et al. Fourth Universal Definition of MI 2018',
      'Amsterdam EA, et al. 2014 AHA/ACC NSTE-ACS Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Distinguish acute from chronic MI changes',
      'Recognize pathological Q waves',
      'Understand ECG evolution post-MI'
    ],
    clinicalPearls: [
      'Q waves >40ms and >25% R wave amplitude are pathological',
      'Q waves may persist indefinitely after MI',
      'Poor R wave progression suggests anterior wall damage'
    ]
  },
  {
    id: 'adv-ecg-012',
    question: 'What is the primary concern with this rhythm?',
    clinicalScenario: 'A 72-year-old woman on digoxin presents with confusion and visual disturbances.',
    patientPresentation: {
      age: 72,
      gender: 'Female',
      chiefComplaint: 'Confusion, nausea, and seeing yellow halos',
      vitalSigns: {
        heartRate: 45,
        bloodPressure: '110/70',
        temperature: 98.2,
        respiratoryRate: 16,
        oxygenSaturation: 98
      },
      pastMedicalHistory: ['Atrial fibrillation', 'Heart failure'],
      currentMedications: ['Digoxin', 'Furosemide', 'Metoprolol']
    },
    imageDescription: 'ECG Shows: Regular rhythm at 45 bpm. Each QRS is preceded by two P waves. P-P interval is regular at 150ms (rate 100 bpm). QRS complexes are narrow and regular. PR interval of conducted beats is normal.',
    options: [
      'Complete heart block with junctional escape',
      '2:1 AV block due to digoxin toxicity',
      'Sinus bradycardia with PACs',
      'Mobitz Type II second-degree AV block'
    ],
    correctIndex: 1,
    explanation: 'This is 2:1 AV block in the setting of digoxin toxicity (visual disturbances, confusion). Digoxin increases AV node refractoriness. The regular atrial rate of 100 with every other beat conducted at 45 bpm confirms 2:1 block.',
    references: [
      'Lip GYH, et al. Digoxin Toxicity in AF Management 2020',
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Bradycardia Guidelines',
      'Bauman JL, et al. Digoxin Toxicity Recognition 2019'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize digoxin toxicity presentation',
      'Identify 2:1 AV block pattern',
      'Understand drug-induced conduction abnormalities'
    ],
    clinicalPearls: [
      'Visual disturbances are classic for digoxin toxicity',
      '2:1 block can progress to complete heart block',
      'Digoxin level may not correlate with toxicity'
    ]
  },
  {
    id: 'adv-ecg-013',
    question: 'What is the mechanism of this wide-complex tachycardia?',
    clinicalScenario: 'A 28-year-old healthy man develops palpitations during exercise.',
    patientPresentation: {
      age: 28,
      gender: 'Male',
      chiefComplaint: 'Sudden onset palpitations during basketball game',
      vitalSigns: {
        heartRate: 220,
        bloodPressure: '100/60',
        temperature: 99.0,
        respiratoryRate: 24,
        oxygenSaturation: 96
      },
      pastMedicalHistory: ['None'],
      currentMedications: ['None']
    },
    imageDescription: 'ECG Shows: Wide-complex tachycardia at 220 bpm. QRS width 180ms. Lead V1 shows positive QRS with rSR\' pattern. Leads V5-V6 show deep S waves. AV dissociation is present with P waves marching through at different rate.',
    options: [
      'Antidromic AVRT via accessory pathway',
      'Atrial fibrillation with aberrancy',
      'Ventricular tachycardia',
      'Orthodromic AVRT with aberrancy'
    ],
    correctIndex: 0,
    explanation: 'This is antidromic AVRT. The extremely fast rate (220 bpm), wide QRS with LBBB pattern, and regular rhythm in a young patient suggests accessory pathway conduction antegrade through the pathway with retrograde conduction through AV node.',
    references: [
      'Katritsis DG, et al. WPW Syndrome Management 2018',
      'Page RL, et al. 2015 ACC/AHA/HRS SVT Guidelines',
      'Brugada P, et al. Wide QRS Tachycardia Differentiation 2019'
    ],
    difficulty: 'hard',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Distinguish antidromic from orthodromic AVRT',
      'Recognize accessory pathway patterns',
      'Understand pre-excitation syndromes'
    ],
    clinicalPearls: [
      'Antidromic AVRT uses pathway antegrade',
      'Rate >250 bpm suggests accessory pathway',
      'Avoid AV blockers in pre-excited AF'
    ]
  },
  {
    id: 'adv-ecg-014',
    question: 'What electrolyte abnormality is most likely?',
    clinicalScenario: 'A 55-year-old diabetic on diuretics presents with weakness and cramps.',
    patientPresentation: {
      age: 55,
      gender: 'Female',
      chiefComplaint: 'Progressive weakness, muscle cramps, and fatigue',
      vitalSigns: {
        heartRate: 55,
        bloodPressure: '95/60',
        temperature: 98.4,
        respiratoryRate: 14,
        oxygenSaturation: 99
      },
      pastMedicalHistory: ['Type 2 DM', 'Hypertension'],
      currentMedications: ['HCTZ', 'Metformin', 'Lisinopril']
    },
    imageDescription: 'ECG Shows: Sinus bradycardia at 55 bpm. Prolonged PR interval 240ms. QRS width 100ms. Prominent U waves visible in V2-V5, amplitude equal to T waves. T waves are flattened. ST depression 1mm in multiple leads.',
    options: [
      'Hyperkalemia',
      'Hypokalemia',
      'Hypercalcemia',
      'Hyponatremia'
    ],
    correctIndex: 1,
    explanation: 'Prominent U waves, flattened T waves, ST depression, and prolonged PR interval are classic ECG findings of hypokalemia. This is common with diuretic use and can cause dangerous arrhythmias.',
    references: [
      'Parham WA, et al. Hyperkalemia Revisited 2006',
      'Weiss JN, et al. Electrolyte Disorders and Arrhythmias 2017',
      'Palmer BF, et al. Hypokalemia and Arrhythmias 2017'
    ],
    difficulty: 'easy',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize hypokalemia ECG changes',
      'Understand electrolyte-induced arrhythmias',
      'Identify medication-related electrolyte disorders'
    ],
    clinicalPearls: [
      'U waves become prominent when K+ <3.0',
      'Hypokalemia predisposes to torsades de pointes',
      'Always check Mg2+ when treating hypokalemia'
    ]
  },
  {
    id: 'adv-ecg-015',
    question: 'What is the most likely cause of these ST changes?',
    clinicalScenario: 'A 35-year-old man presents with chest pain after a viral illness.',
    patientPresentation: {
      age: 35,
      gender: 'Male',
      chiefComplaint: 'Sharp chest pain worse with inspiration, 3 days after flu',
      vitalSigns: {
        heartRate: 95,
        bloodPressure: '125/80',
        temperature: 100.2,
        respiratoryRate: 20,
        oxygenSaturation: 98
      },
      pastMedicalHistory: ['Recent viral upper respiratory infection'],
      currentMedications: ['Ibuprofen', 'Acetaminophen']
    },
    imageDescription: 'ECG Shows: Sinus rhythm at 95 bpm. Diffuse concave ST elevation 1-2mm in leads I, II, aVF, V2-V6. PR depression present in multiple leads. No reciprocal ST depression. T waves are upright. No Q waves present.',
    options: [
      'Acute myocardial infarction',
      'Acute pericarditis',
      'Early repolarization',
      'Prinzmetal angina'
    ],
    correctIndex: 1,
    explanation: 'Diffuse concave ST elevation with PR depression and no reciprocal changes is classic for acute pericarditis. The recent viral illness, pleuritic chest pain, and fever support this diagnosis.',
    references: [
      'Adler Y, et al. 2015 ESC Pericardial Disease Guidelines',
      'Klein AL, et al. Pericarditis NEJM 2014',
      'Imazio M, et al. Acute Pericarditis Management 2020'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Distinguish pericarditis from MI',
      'Recognize diffuse ST elevation pattern',
      'Understand PR depression significance'
    ],
    clinicalPearls: [
      'Pericarditis shows diffuse ST elevation',
      'PR depression is highly specific for pericarditis',
      'Reciprocal changes suggest MI, not pericarditis'
    ]
  },
  {
    id: 'adv-ecg-016',
    question: 'What intervention is most urgently needed?',
    clinicalScenario: 'A 68-year-old man with chest pain becomes hypotensive and diaphoretic.',
    patientPresentation: {
      age: 68,
      gender: 'Male',
      chiefComplaint: 'Severe chest pain, became hypotensive and sweaty',
      vitalSigns: {
        heartRate: 45,
        bloodPressure: '80/50',
        temperature: 97.8,
        respiratoryRate: 22,
        oxygenSaturation: 94
      },
      pastMedicalHistory: ['CAD', 'Prior inferior MI'],
      currentMedications: ['Aspirin', 'Metoprolol', 'Atorvastatin']
    },
    imageDescription: 'ECG Shows: Sinus rhythm at 45 bpm. Complete AV dissociation present. P waves march through at 75 bpm. QRS complexes are wide at 120ms with LBBB morphology. Capture beats and fusion beats occasionally seen.',
    options: [
      'Atropine 0.5mg IV',
      'Transcutaneous pacing',
      'Epinephrine infusion',
      'Temporary transvenous pacemaker'
    ],
    correctIndex: 1,
    explanation: 'This is complete heart block with hemodynamic compromise. Transcutaneous pacing is the most rapidly available intervention for symptomatic bradycardia with heart block, especially when hypotensive.',
    references: [
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Bradycardia Guidelines',
      'Panchal AR, et al. Adult Advanced Life Support 2020',
      'Epstein AE, et al. Pacemaker Guidelines 2012'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize complete heart block',
      'Prioritize interventions for symptomatic bradycardia',
      'Understand hemodynamic significance'
    ],
    clinicalPearls: [
      'Complete heart block requires pacing if symptomatic',
      'Transcutaneous pacing is fastest temporary solution',
      'Atropine rarely effective in complete heart block'
    ]
  },
  {
    id: 'adv-ecg-017',
    question: 'What is the significance of this finding?',
    clinicalScenario: 'A 45-year-old woman with lupus presents with dyspnea and leg swelling.',
    patientPresentation: {
      age: 45,
      gender: 'Female',
      chiefComplaint: 'Progressive shortness of breath and bilateral leg edema',
      vitalSigns: {
        heartRate: 110,
        bloodPressure: '100/70',
        temperature: 98.6,
        respiratoryRate: 24,
        oxygenSaturation: 92
      },
      pastMedicalHistory: ['Systemic lupus erythematosus'],
      currentMedications: ['Hydroxychloroquine', 'Prednisone']
    },
    imageDescription: 'ECG Shows: Sinus tachycardia at 110 bpm. Low voltage QRS complexes in all limb leads (<5mm). Precordial leads show reduced voltage as well. Electrical alternans present - QRS amplitude alternates beat-to-beat in multiple leads.',
    options: [
      'Pulmonary embolism',
      'Pericardial effusion with tamponade',
      'Pleural effusion',
      'Pneumothorax'
    ],
    correctIndex: 1,
    explanation: 'Low voltage QRS complexes with electrical alternans (beat-to-beat variation in QRS amplitude) is highly suggestive of pericardial effusion with cardiac tamponade. This is a medical emergency requiring immediate pericardiocentesis.',
    references: [
      'Adler Y, et al. 2015 ESC Pericardial Disease Guidelines',
      'Klein AL, et al. Cardiac Tamponade NEJM 2001',
      'Spodick DH. Electrical Alternans NEJM 1979'
    ],
    difficulty: 'hard',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize electrical alternans significance',
      'Identify low voltage QRS causes',
      'Understand cardiac tamponade physiology'
    ],
    clinicalPearls: [
      'Electrical alternans + low voltage = tamponade',
      'Alternans due to heart swinging in effusion',
      'Beck\'s triad: JVD, hypotension, muffled heart sounds'
    ]
  },
  {
    id: 'adv-ecg-018',
    question: 'What is the most appropriate next step?',
    clinicalScenario: 'A 29-year-old pregnant woman at 36 weeks presents with palpitations.',
    patientPresentation: {
      age: 29,
      gender: 'Female',
      chiefComplaint: 'Sudden onset palpitations, feels like heart racing',
      vitalSigns: {
        heartRate: 180,
        bloodPressure: '110/70',
        temperature: 98.4,
        respiratoryRate: 20,
        oxygenSaturation: 98
      },
      pastMedicalHistory: ['G2P1, 36 weeks pregnant'],
      currentMedications: ['Prenatal vitamins']
    },
    imageDescription: 'ECG Shows: Narrow complex tachycardia at 180 bpm. Regular R-R intervals. No clear P waves visible. QRS width 90ms. Rate is exactly 180 bpm. Sudden onset reported by patient.',
    options: [
      'Adenosine 6mg IV push',
      'Synchronized cardioversion 50J',
      'Metoprolol 5mg IV',
      'Valsalva maneuver'
    ],
    correctIndex: 3,
    explanation: 'This is likely SVT (AVNRT or AVRT). In pregnancy, vagal maneuvers should be tried first as they are safest for both mother and fetus. Adenosine is pregnancy category C and should be reserved if vagal maneuvers fail.',
    references: [
      'Page RL, et al. 2015 ACC/AHA/HRS SVT Guidelines',
      'Regitz-Zagrosek V, et al. 2018 ESC Pregnancy Guidelines',
      'Tromp CH, et al. Arrhythmias in Pregnancy 2011'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Manage SVT in pregnancy',
      'Prioritize safe interventions',
      'Understand pregnancy arrhythmia considerations'
    ],
    clinicalPearls: [
      'Vagal maneuvers are safest in pregnancy',
      'SVT more common in pregnancy',
      'Avoid class IC antiarrhythmics in pregnancy'
    ]
  },
  {
    id: 'adv-ecg-019',
    question: 'What does this ECG pattern indicate?',
    clinicalScenario: 'A 52-year-old construction worker presents with chest pain after cocaine use.',
    patientPresentation: {
      age: 52,
      gender: 'Male',
      chiefComplaint: 'Severe chest pain 2 hours after cocaine use',
      vitalSigns: {
        heartRate: 105,
        bloodPressure: '170/100',
        temperature: 99.5,
        respiratoryRate: 18,
        oxygenSaturation: 97
      },
      pastMedicalHistory: ['Substance abuse'],
      currentMedications: ['None admitted']
    },
    imageDescription: 'ECG Shows: Sinus tachycardia at 105 bpm. ST elevation 3-4mm in leads V1-V4. Reciprocal ST depression in leads II, III, aVF. QRS width 100ms. T waves are peaked in precordial leads. No Q waves present.',
    options: [
      'Coronary vasospasm',
      'Acute anterior STEMI',
      'Cocaine-induced cardiomyopathy',
      'Ventricular aneurysm'
    ],
    correctIndex: 0,
    explanation: 'Cocaine causes coronary artery vasospasm through alpha-adrenergic stimulation and sodium channel blockade. The ST elevation pattern with recent cocaine use suggests vasospasm rather than thrombotic occlusion, though treatment is similar.',
    references: [
      'McCord J, et al. Cocaine-Associated Chest Pain NEJM 2008',
      'Hollander JE, et al. Cocaine-Associated MI AEM 2004',
      'Lange RA, et al. Cocaine and Cardiovascular Disease 2014'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize cocaine-induced coronary syndromes',
      'Understand vasospasm vs thrombosis',
      'Identify substance-related cardiac emergencies'
    ],
    clinicalPearls: [
      'Cocaine causes vasospasm and thrombosis',
      'Avoid beta-blockers in cocaine use',
      'Benzodiazepines are first-line for agitation'
    ]
  },
  {
    id: 'adv-ecg-020',
    question: 'What is the underlying pathophysiology?',
    clinicalScenario: 'A 19-year-old athlete collapses during basketball practice after a timeout.',
    patientPresentation: {
      age: 19,
      gender: 'Male',
      chiefComplaint: 'Syncope during basketball practice, brief loss of consciousness',
      vitalSigns: {
        heartRate: 65,
        bloodPressure: '130/70',
        temperature: 98.8,
        respiratoryRate: 16,
        oxygenSaturation: 99
      },
      pastMedicalHistory: ['High school athlete, family history of sudden death'],
      currentMedications: ['None']
    },
    imageDescription: 'ECG Shows: Sinus rhythm at 65 bpm. LVH criteria met (S in V1 + R in V5 = 45mm). Deep septal Q waves in leads I, aVL, V5-V6. ST depression in V5-V6. T wave inversions in leads I, aVL, V4-V6. Left axis deviation present.',
    options: [
      'Asymmetric septal hypertrophy',
      'Athlete\'s heart syndrome',
      'Aortic stenosis',
      'Dilated cardiomyopathy'
    ],
    correctIndex: 0,
    explanation: 'This ECG pattern with LVH, deep septal Q waves, and T wave inversions in a young athlete with syncope and family history suggests hypertrophic cardiomyopathy (HCM), specifically asymmetric septal hypertrophy.',
    references: [
      'Gersh BJ, et al. 2011 ACCF/AHA HCM Guidelines',
      'Elliott PM, et al. 2014 ESC HCM Guidelines',
      'Maron BJ, et al. HCM in Athletes Circulation 2007'
    ],
    difficulty: 'hard',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize HCM ECG patterns',
      'Understand sudden death risk in athletes',
      'Distinguish pathologic from physiologic LVH'
    ],
    clinicalPearls: [
      'HCM most common cause of sudden death in young athletes',
      'Deep septal Q waves are characteristic',
      'Family screening indicated for HCM'
    ]
  },
  {
    id: 'adv-ecg-021',
    question: 'What complication is most concerning?',
    clinicalScenario: 'A 70-year-old diabetic presents with chest pain and diaphoresis for 8 hours.',
    patientPresentation: {
      age: 70,
      gender: 'Female',
      chiefComplaint: 'Chest pressure and sweating, started 8 hours ago',
      vitalSigns: {
        heartRate: 48,
        bloodPressure: '90/60',
        temperature: 97.9,
        respiratoryRate: 22,
        oxygenSaturation: 94
      },
      pastMedicalHistory: ['Type 2 DM', 'Hypertension'],
      currentMedications: ['Metformin', 'Lisinopril']
    },
    imageDescription: 'ECG Shows: Sinus bradycardia at 48 bpm. ST elevation 4-5mm in leads II, III, aVF. ST depression in leads I, aVL. New right bundle branch block present. First-degree AV block with PR interval 220ms.',
    options: [
      'Cardiogenic shock',
      'Complete heart block',
      'Ventricular tachycardia',
      'Pericardial tamponade'
    ],
    correctIndex: 1,
    explanation: 'Inferior STEMI with new RBBB and first-degree AV block indicates involvement of the RCA which supplies the AV node. This constellation of findings has high risk for progression to complete heart block.',
    references: [
      'Ibanez B, et al. 2017 ESC STEMI Guidelines',
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Bradycardia Guidelines',
      'Antman EM, et al. STEMI Management ACC/AHA 2013'
    ],
    difficulty: 'hard',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize high-risk inferior STEMI features',
      'Understand RCA anatomy and AV node supply',
      'Anticipate conduction system complications'
    ],
    clinicalPearls: [
      'Inferior MI + new RBBB = high CHB risk',
      'RCA supplies AV node in 90% of patients',
      'Prophylactic pacing may be indicated'
    ]
  },
  {
    id: 'adv-ecg-022',
    question: 'What is the most likely electrolyte disturbance?',
    clinicalScenario: 'A 38-year-old woman with eating disorder presents with weakness and cramping.',
    patientPresentation: {
      age: 38,
      gender: 'Female',
      chiefComplaint: 'Severe weakness, muscle cramps, and tingling around mouth',
      vitalSigns: {
        heartRate: 65,
        bloodPressure: '115/75',
        temperature: 98.3,
        respiratoryRate: 14,
        oxygenSaturation: 99
      },
      pastMedicalHistory: ['Bulimia nervosa', 'Depression'],
      currentMedications: ['Sertraline']
    },
    imageDescription: 'ECG Shows: Sinus rhythm at 65 bpm. Prolonged QT interval 520ms (QTc 480ms). ST segment appears lengthened rather than T wave prolonged. T waves have normal morphology but appear delayed. No U waves present.',
    options: [
      'Hypokalemia',
      'Hypomagnesemia',
      'Hypocalcemia',
      'Hyponatremia'
    ],
    correctIndex: 2,
    explanation: 'Prolonged QT interval with lengthened ST segment (rather than prolonged T wave) and perioral tingling suggests hypocalcemia. This can occur in eating disorders due to malnutrition and vomiting.',
    references: [
      'Rude RK, et al. Disorders of Calcium Metabolism 2016',
      'Mehler PS, et al. Medical Complications of Eating Disorders 2010',
      'Cooper MS, et al. Hypocalcemia NEJM 2008'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize hypocalcemia ECG changes',
      'Distinguish QT prolongation mechanisms',
      'Understand eating disorder complications'
    ],
    clinicalPearls: [
      'Hypocalcemia lengthens ST segment specifically',
      'Chvostek and Trousseau signs may be present',
      'Check ionized calcium, not total calcium'
    ]
  },
  {
    id: 'adv-ecg-023',
    question: 'What medication adjustment is needed?',
    clinicalScenario: 'A 75-year-old man on amiodarone presents for routine follow-up.',
    patientPresentation: {
      age: 75,
      gender: 'Male',
      chiefComplaint: 'Routine cardiology follow-up, feeling well',
      vitalSigns: {
        heartRate: 58,
        bloodPressure: '130/80',
        temperature: 98.4,
        respiratoryRate: 16,
        oxygenSaturation: 98
      },
      pastMedicalHistory: ['Atrial fibrillation', 'Heart failure'],
      currentMedications: ['Amiodarone 200mg daily', 'Warfarin', 'Metoprolol']
    },
    imageDescription: 'ECG Shows: Sinus rhythm at 58 bpm. QT interval 560ms (QTc 520ms). T waves appear broad and flattened. PR interval 200ms. QRS width 110ms. No U waves visible.',
    options: [
      'Increase amiodarone dose',
      'Decrease amiodarone dose',
      'Add magnesium supplementation',
      'Switch to dronedarone'
    ],
    correctIndex: 1,
    explanation: 'QTc >500ms on amiodarone significantly increases torsades de pointes risk. The dose should be reduced or the drug discontinued. Amiodarone has a very long half-life, so effects persist for weeks after changes.',
    references: [
      'January CT, et al. 2019 AHA/ACC/HRS AF Guidelines',
      'Zimetbaum P. Antiarrhythmic Drug Therapy NEJM 2012',
      'Tisdale JE, et al. Drug-Induced QT Prolongation 2020'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Monitor amiodarone toxicity',
      'Recognize dangerous QT prolongation',
      'Understand antiarrhythmic drug management'
    ],
    clinicalPearls: [
      'QTc >500ms significantly increases TdP risk',
      'Amiodarone has 40-day half-life',
      'Monitor thyroid, liver, and lung function'
    ]
  },
  {
    id: 'adv-ecg-024',
    question: 'What is the mechanism of this arrhythmia?',
    clinicalScenario: 'A 60-year-old woman develops irregular palpitations after thyroid surgery.',
    patientPresentation: {
      age: 60,
      gender: 'Female',
      chiefComplaint: 'Irregular heart rhythm 2 days after thyroidectomy',
      vitalSigns: {
        heartRate: 140,
        bloodPressure: '120/80',
        temperature: 98.6,
        respiratoryRate: 18,
        oxygenSaturation: 97
      },
      pastMedicalHistory: ['Thyroid cancer'],
      currentMedications: ['Levothyroxine replacement initiated']
    },
    imageDescription: 'ECG Shows: Irregular rhythm with ventricular rate 100-150 bpm. P waves have three distinct morphologies cycling through leads II, III, aVF. P-P intervals vary. PR intervals vary with P wave morphology. QRS complexes are narrow and consistent.',
    options: [
      'Atrial fibrillation',
      'Multifocal atrial tachycardia',
      'Atrial flutter with variable conduction',
      'Sinus tachycardia with PACs'
    ],
    correctIndex: 1,
    explanation: 'Three or more distinct P wave morphologies with varying P-P and PR intervals defines multifocal atrial tachycardia (MAT). This often occurs with metabolic disturbances, including post-surgical stress or thyroid hormone changes.',
    references: [
      'McCord J, et al. Multifocal Atrial Tachycardia Chest 1998',
      'Lipman J, et al. MAT Recognition and Management 2007',
      'Kastor JA. Multifocal Atrial Tachycardia NEJM 1990'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize multifocal atrial tachycardia',
      'Understand post-operative arrhythmias',
      'Distinguish MAT from other irregular rhythms'
    ],
    clinicalPearls: [
      'MAT requires ≥3 distinct P wave morphologies',
      'Often associated with pulmonary disease',
      'Treat underlying cause rather than rhythm'
    ]
  },
  {
    id: 'adv-ecg-025',
    question: 'What intervention is contraindicated?',
    clinicalScenario: 'A 25-year-old soccer player collapses on field and regains consciousness quickly.',
    patientPresentation: {
      age: 25,
      gender: 'Male',
      chiefComplaint: 'Brief syncope during soccer match, felt dizzy beforehand',
      vitalSigns: {
        heartRate: 70,
        bloodPressure: '125/75',
        temperature: 99.1,
        respiratoryRate: 16,
        oxygenSaturation: 99
      },
      pastMedicalHistory: ['College athlete, no known heart disease'],
      currentMedications: ['None']
    },
    imageDescription: 'ECG Shows: Sinus rhythm at 70 bpm. Short PR interval 100ms. Delta waves present in leads II, III, aVF, V4-V6. QRS width 130ms. Upright delta waves in inferior and lateral leads. No ST-T changes.',
    options: [
      'Digoxin administration',
      'Electrophysiology study',
      'Exercise stress testing',
      'Echocardiogram'
    ],
    correctIndex: 0,
    explanation: 'This is Wolff-Parkinson-White syndrome (pre-excitation). Digoxin and other AV node blockers can increase conduction through the accessory pathway and precipitate ventricular fibrillation if atrial fibrillation develops.',
    references: [
      'Katritsis DG, et al. WPW Syndrome Management 2017',
      'Page RL, et al. 2015 ACC/AHA/HRS SVT Guidelines',
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guidelines'
    ],
    difficulty: 'hard',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize WPW syndrome ECG pattern',
      'Understand dangerous drug interactions',
      'Identify pre-excitation in athletes'
    ],
    clinicalPearls: [
      'Avoid AV blockers in WPW syndrome',
      'Can cause 1:1 conduction down accessory pathway',
      'Risk of ventricular fibrillation with AF'
    ]
  },
  {
    id: 'adv-ecg-026',
    question: 'What is the most likely diagnosis?',
    clinicalScenario: 'A 82-year-old man with dementia is brought in by family for confusion and weakness.',
    patientPresentation: {
      age: 82,
      gender: 'Male',
      chiefComplaint: 'Increased confusion and weakness over past week',
      vitalSigns: {
        heartRate: 40,
        bloodPressure: '100/60',
        temperature: 97.8,
        respiratoryRate: 16,
        oxygenSaturation: 96
      },
      pastMedicalHistory: ['Dementia', 'Hypertension', 'Atrial fibrillation'],
      currentMedications: ['Donepezil', 'Metoprolol', 'Digoxin']
    },
    imageDescription: 'ECG Shows: Severe bradycardia at 40 bpm. P waves are present but irregular, morphology varies. Some P waves are not followed by QRS complexes. When QRS follows P wave, PR interval varies from 160-300ms. Occasional junctional escape beats present.',
    options: [
      'Complete heart block',
      'Sick sinus syndrome',
      'Digitalis toxicity',
      'High-grade AV block'
    ],
    correctIndex: 1,
    explanation: 'Irregular P waves with varying morphologies, intermittent sinus arrest, and junctional escape beats characterize sick sinus syndrome (sinus node dysfunction). Common in elderly patients with multiple cardiac medications.',
    references: [
      'Jensen PN, et al. Incidence and Risk Factors for Sick Sinus Syndrome 2014',
      'Kusumoto FM, et al. 2018 ACC/AHA/HRS Bradycardia Guidelines',
      'Gregoratos G, et al. Sick Sinus Syndrome ACC/AHA 2002'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize sick sinus syndrome patterns',
      'Understand sinus node dysfunction',
      'Identify bradycardia-tachycardia syndrome'
    ],
    clinicalPearls: [
      'Often requires permanent pacemaker',
      'May have alternating brady- and tachyarrhythmias',
      'Common cause of syncope in elderly'
    ]
  },
  {
    id: 'adv-ecg-027',
    question: 'What immediate intervention is required?',
    clinicalScenario: 'A 45-year-old woman with a history of anorexia nervosa presents with syncope.',
    patientPresentation: {
      age: 45,
      gender: 'Female',
      chiefComplaint: 'Syncope and palpitations, feels weak and dizzy',
      vitalSigns: {
        heartRate: 200,
        bloodPressure: '80/50',
        temperature: 96.8,
        respiratoryRate: 24,
        oxygenSaturation: 95
      },
      pastMedicalHistory: ['Anorexia nervosa', 'Chronic malnutrition'],
      currentMedications: ['Multivitamin', 'Fluoxetine']
    },
    imageDescription: 'ECG Shows: Polymorphic ventricular tachycardia at 200 bpm. QRS morphology changes beat-to-beat with twisting appearance around isoelectric line. Preceding sinus beats show QTc 580ms. T waves are notched with prominent U waves.',
    options: [
      'Synchronized cardioversion',
      'Magnesium sulfate 2g IV',
      'Lidocaine 1mg/kg IV',
      'Amiodarone 150mg IV'
    ],
    correctIndex: 1,
    explanation: 'This is torsades de pointes in setting of prolonged QT (likely from malnutrition/hypomagnesemia). Magnesium sulfate is first-line treatment even if serum levels are normal, as it terminates the arrhythmia and prevents recurrence.',
    references: [
      'Roden DM. Drug-Induced Long QT Syndrome NEJM 2008',
      'Tzivoni D, et al. Treatment of Torsades de Pointes 1988',
      'Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guidelines'
    ],
    difficulty: 'hard',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize torsades de pointes',
      'Understand magnesium therapy for TdP',
      'Identify malnutrition-related arrhythmias'
    ],
    clinicalPearls: [
      'Magnesium is first-line for TdP',
      'Give magnesium even if levels normal',
      'May need temporary pacing to overdrive'
    ]
  },
  {
    id: 'adv-ecg-028',
    question: 'What underlying condition is suggested?',
    clinicalScenario: 'A 30-year-old man presents with chest pain and shortness of breath after a long flight.',
    patientPresentation: {
      age: 30,
      gender: 'Male',
      chiefComplaint: 'Sudden chest pain and shortness of breath after 12-hour flight',
      vitalSigns: {
        heartRate: 110,
        bloodPressure: '105/70',
        temperature: 98.9,
        respiratoryRate: 26,
        oxygenSaturation: 89
      },
      pastMedicalHistory: ['Recent orthopedic surgery'],
      currentMedications: ['Ibuprofen']
    },
    imageDescription: 'ECG Shows: Sinus tachycardia at 110 bpm. S wave in lead I. Q wave and T wave inversion in lead III. Incomplete RBBB in V1. T wave inversions in V1-V3. Right axis deviation present. P waves peaked in lead II.',
    options: [
      'Acute myocardial infarction',
      'Pulmonary embolism',
      'Pneumothorax',
      'Pericarditis'
    ],
    correctIndex: 1,
    explanation: 'The S1Q3T3 pattern (S wave in I, Q wave and T inversion in III) with right heart strain pattern (RBBB, right axis deviation, anterior T inversions) and clinical context suggests acute pulmonary embolism.',
    references: [
      'Konstantinides SV, et al. 2019 ESC Pulmonary Embolism Guidelines',
      'Kearon C, et al. Antithrombotic Therapy for VTE Disease 2016',
      'Tapson VF. Acute Pulmonary Embolism NEJM 2008'
    ],
    difficulty: 'medium',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize ECG signs of right heart strain',
      'Understand S1Q3T3 pattern significance',
      'Identify acute cor pulmonale changes'
    ],
    clinicalPearls: [
      'S1Q3T3 classic but not sensitive for PE',
      'Right heart strain more common ECG finding',
      'Normal ECG doesn\'t exclude PE'
    ]
  },
  {
    id: 'adv-ecg-029',
    question: 'What is the most appropriate treatment approach?',
    clinicalScenario: 'A 16-year-old swimmer is found to have an abnormal ECG during sports physical.',
    patientPresentation: {
      age: 16,
      gender: 'Female',
      chiefComplaint: 'Asymptomatic, routine sports physical examination',
      vitalSigns: {
        heartRate: 55,
        bloodPressure: '110/60',
        temperature: 98.6,
        respiratoryRate: 14,
        oxygenSaturation: 99
      },
      pastMedicalHistory: ['Competitive swimmer, no symptoms'],
      currentMedications: ['None']
    },
    imageDescription: 'ECG Shows: Sinus bradycardia at 55 bpm. First-degree AV block with PR interval 220ms. Early repolarization pattern with J-point elevation 2mm in V4-V6. Notched QRS complexes. High QRS voltage in precordial leads.',
    options: [
      'Restrict from competitive sports',
      'Normal variant in trained athlete',
      'Requires electrophysiology study',
      'Start beta-blocker therapy'
    ],
    correctIndex: 1,
    explanation: 'Sinus bradycardia, first-degree AV block, early repolarization, and high QRS voltage are common findings in trained athletes representing adaptive changes to regular intensive exercise. No intervention needed if asymptomatic.',
    references: [
      'Sharma S, et al. International Criteria for ECG Interpretation in Athletes 2017',
      'Drezner JA, et al. Electrocardiographic Interpretation in Athletes 2013',
      'Corrado D, et al. Recommendations for Athletes 2005'
    ],
    difficulty: 'easy',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize normal athletic heart adaptations',
      'Distinguish physiologic from pathologic changes',
      'Understand sports screening guidelines'
    ],
    clinicalPearls: [
      'Athletic heart shows predictable ECG changes',
      'Bradycardia and AV blocks common in athletes',
      'Early repolarization benign in asymptomatic athletes'
    ]
  },
  {
    id: 'adv-ecg-030',
    question: 'What is the most critical intervention?',
    clinicalScenario: 'A 85-year-old nursing home resident presents with altered mental status and weakness.',
    patientPresentation: {
      age: 85,
      gender: 'Male',
      chiefComplaint: 'Confusion and weakness, decreased oral intake for 3 days',
      vitalSigns: {
        heartRate: 30,
        bloodPressure: '70/40',
        temperature: 96.5,
        respiratoryRate: 12,
        oxygenSaturation: 92
      },
      pastMedicalHistory: ['CKD stage 4', 'Diabetes', 'Hypertension'],
      currentMedications: ['Insulin', 'Lisinopril', 'Amlodipine']
    },
    imageDescription: 'ECG Shows: Severe bradycardia at 30 bpm. Tall peaked T waves in precordial leads, amplitude 8-10mm. Prolonged PR interval 260ms. QRS widening to 140ms. P waves are flattened. No clear relationship between P waves and QRS complexes.',
    options: [
      'Immediate hemodialysis',
      'Calcium gluconate 1g IV',
      'Transcutaneous pacing',
      'Insulin and glucose IV'
    ],
    correctIndex: 1,
    explanation: 'Tall peaked T waves, widened QRS, and severe bradycardia in a CKD patient suggest severe hyperkalemia. Calcium gluconate immediately stabilizes cardiac membranes and prevents cardiac arrest. This takes priority over other interventions.',
    references: [
      'Palmer BF, et al. Hyperkalemia Management 2017',
      'Rossignol P, et al. Emergency Management of Severe Hyperkalemia 2019',
      'Parham WA, et al. Hyperkalemia Revisited 2006'
    ],
    difficulty: 'hard',
    topicId: 'advanced-ecg-interpretation',
    learningObjectives: [
      'Recognize life-threatening hyperkalemia',
      'Prioritize membrane stabilization',
      'Understand hyperkalemia ECG progression'
    ],
    clinicalPearls: [
      'Calcium stabilizes membranes immediately',
      'K+ >6.5 can cause cardiac arrest',
      'Widened QRS indicates severe hyperkalemia'
    ]
  }
];