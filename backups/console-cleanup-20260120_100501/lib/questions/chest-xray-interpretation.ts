import { Question } from './types';

export const chestXrayInterpretationQuestions: Question[] = [
  {
    id: 'cxr-001',
    question: 'Based on the chest X-ray findings described below, what is the most likely diagnosis?',
    clinicalScenario: 'A 67-year-old smoker presents to the ED with acute onset of severe dyspnea and chest pain.',
    patientPresentation: {
      age: 67,
      gender: 'Male',
      chiefComplaint: 'Sudden onset severe shortness of breath and sharp chest pain',
      vitalSigns: {
        heartRate: 110,
        bloodPressure: '145/90',
        temperature: 98.2,
        respiratoryRate: 28,
        oxygenSaturation: 89
      }
    },
    imageType: 'xray',
    imageDescription: 'Chest X-ray PA view: Complete absence of lung markings in the left upper and middle lung zones. Sharp pleural line visible along the left chest wall at approximately the midclavicular line. Left costophrenic angle is sharp. Mediastinum appears slightly shifted toward the right. Right lung shows normal vascular markings and aeration.',
    imageCaption: 'PA Chest X-ray showing left-sided pneumothorax with pleural line and absent lung markings',
    options: [
      'Left-sided pneumonia',
      'Left-sided pleural effusion',
      'Left-sided pneumothorax',
      'Left lower lobe atelectasis'
    ],
    correctIndex: 2,
    explanation: 'The absence of lung markings beyond a visible pleural line, combined with the clinical presentation of sudden chest pain and dyspnea, is diagnostic of pneumothorax. The sharp costophrenic angle rules out pleural effusion, and the hyperresonance supports pneumothorax.',
    references: [
      'MacDuff A, et al. Management of spontaneous pneumothorax: British Thoracic Society Guidelines 2010',
      'Baumann MH, et al. Management of spontaneous pneumothorax: ACCP Guidelines 2001',
      'Tschopp JM, et al. ERS task force statement on pneumothorax 2015'
    ],
    difficulty: 'easy',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize pneumothorax on chest X-ray',
      'Identify pleural line and absent lung markings',
      'Correlate imaging with clinical presentation'
    ],
    clinicalPearls: [
      'Pleural line is pathognomonic for pneumothorax',
      'Absence of lung markings beyond pleural line',
      'Hyperresonance distinguishes from effusion'
    ]
  },
  {
    id: 'cxr-002',
    question: 'What is the most appropriate immediate management?',
    clinicalScenario: 'A 45-year-old construction worker presents after falling from scaffolding with chest and abdominal pain.',
    patientPresentation: {
      age: 45,
      gender: 'Male',
      chiefComplaint: 'Chest and abdominal pain after fall from height',
      vitalSigns: {
        heartRate: 120,
        bloodPressure: '95/65',
        temperature: 98.0,
        respiratoryRate: 22,
        oxygenSaturation: 94
      }
    },
    imageType: 'xray',
    imageDescription: 'Chest X-ray AP view (portable): Bilateral lower lobe opacification with meniscus sign - curved upper borders of opacity that are concave upward. Costophrenic angles are blunted bilaterally. Cardiac silhouette appears normal size but lower border is obscured. Trachea is midline. Upper lung zones show normal aeration.',
    imageCaption: 'AP Chest X-ray showing bilateral pleural effusions with classic meniscus sign',
    options: [
      'Bilateral chest tubes',
      'Urgent thoracentesis',
      'CT chest with contrast',
      'Serial chest X-rays'
    ],
    correctIndex: 0,
    explanation: 'In trauma with hemodynamic instability and bilateral pleural effusions, these likely represent hemothoraces. Given the mechanism of injury and positive FAST exam, bilateral chest tubes are indicated for both diagnostic and therapeutic purposes.',
    references: [
      'Advanced Trauma Life Support (ATLS) Guidelines 10th Edition',
      'Eastern Association for Surgery of Trauma Practice Guidelines',
      'Light RW. Pleural Disease 6th Edition 2013'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize bilateral pleural effusions',
      'Understand trauma-related hemothorax',
      'Prioritize life-saving interventions'
    ],
    clinicalPearls: [
      'Meniscus sign indicates significant effusion',
      'Trauma + effusion = hemothorax until proven otherwise',
      'Bilateral chest tubes for unstable trauma patients'
    ]
  },
  {
    id: 'cxr-003',
    question: 'What additional imaging study is most urgently needed?',
    clinicalScenario: 'A 72-year-old woman with acute chest pain radiating to her back and history of hypertension.',
    patientPresentation: {
      age: '72 years old',
      gender: 'Female',
      chiefComplaint: 'Tearing chest pain radiating to back, started 2 hours ago',
      vitals: 'BP 180/110 (right arm), 155/95 (left arm), HR 95, RR 20, O2 Sat 97% RA',
      physicalExam: 'Diaphoretic, blood pressure differential between arms, faint murmur',
      labsImaging: 'Troponin negative, D-dimer markedly elevated'
    },
    imageType: 'xray',
    imageDescription: 'Chest X-ray PA view: Widened mediastinum measuring 9.5 cm at the level of the aortic arch (normal <8 cm). Aortic knob appears prominent and irregular in contour. Left pleural effusion with blunting of the left costophrenic angle. Trachea appears slightly deviated to the right. Lung fields show no focal infiltrates.',
    imageCaption: 'PA Chest X-ray showing widened mediastinum suspicious for aortic pathology',
    options: [
      'Echocardiogram',
      'CT angiography of chest',
      'MRI chest',
      'Repeat chest X-ray in 6 hours'
    ],
    correctIndex: 1,
    explanation: 'Widened mediastinum (>8 cm) with tearing chest pain, blood pressure differential, and elevated D-dimer strongly suggests aortic dissection. CT angiography is the most urgent and appropriate imaging to confirm the diagnosis and guide treatment.',
    references: [
      'Hiratzka LF, et al. 2010 ACCF/AHA/AATS Guidelines for Aortic Disease',
      'Erbel R, et al. 2014 ESC Guidelines on Aortic Diseases',
      'Braverman AC. Acute Aortic Dissection NEJM 2021'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize widened mediastinum',
      'Identify signs of aortic dissection',
      'Select appropriate urgent imaging'
    ],
    clinicalPearls: [
      'Mediastinum >8 cm is abnormal',
      'Blood pressure differential suggests dissection',
      'CT angiography is imaging of choice'
    ]
  },
  {
    id: 'cxr-004',
    question: 'What is the most likely causative organism?',
    clinicalScenario: 'A 28-year-old IV drug user presents with fever, cough, and dyspnea for 1 week.',
    patientPresentation: {
      age: '28 years old',
      gender: 'Male',
      chiefComplaint: 'Fever, productive cough, and shortness of breath for 1 week',
      vitals: 'BP 110/70, HR 105, RR 24, O2 Sat 91% RA, Temp 101.8°F',
      physicalExam: 'Injection site tracks on arms, new heart murmur, bilateral rales',
      labsImaging: 'WBC 16,000, blood cultures pending, echo shows vegetation on tricuspid valve'
    },
    imageType: 'xray',
    imageDescription: 'Chest X-ray PA view: Multiple round, well-defined nodular opacities scattered throughout both lung fields, ranging from 1-4 cm in diameter. Several nodules show central cavitation with air-fluid levels. Upper and lower lobes are affected bilaterally. No pleural effusion. Heart size appears normal.',
    imageCaption: 'PA Chest X-ray showing multiple bilateral cavitary lung nodules',
    options: [
      'Streptococcus pneumoniae',
      'Staphylococcus aureus',
      'Pseudomonas aeruginosa',
      'Klebsiella pneumoniae'
    ],
    correctIndex: 1,
    explanation: 'IV drug user with tricuspid valve endocarditis and multiple bilateral cavitary lung lesions suggests septic pulmonary emboli from right-sided endocarditis. Staphylococcus aureus is the most common cause of acute endocarditis in IV drug users.',
    references: [
      'Baddour LM, et al. Infective Endocarditis in Adults AHA 2015',
      'Habib G, et al. 2015 ESC Guidelines for Endocarditis',
      'Murdoch DR, et al. Clinical presentation of infective endocarditis 2009'
    ],
    difficulty: 'hard',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize septic pulmonary emboli pattern',
      'Understand right-sided endocarditis complications',
      'Identify high-risk patient populations'
    ],
    clinicalPearls: [
      'Cavitary nodules suggest septic emboli',
      'S. aureus most common in IVDU endocarditis',
      'Right-sided endocarditis causes lung findings'
    ]
  },
  {
    id: 'cxr-005',
    question: 'What is the most appropriate next step?',
    clinicalScenario: 'A 85-year-old nursing home resident presents with altered mental status and fever.',
    patientPresentation: {
      age: '85 years old',
      gender: 'Female',
      chiefComplaint: 'Confusion and fever, brought from nursing home',
      vitals: 'BP 90/55, HR 110, RR 28, O2 Sat 88% RA, Temp 102.4°F',
      physicalExam: 'Altered mental status, poor oral hygiene, decreased breath sounds right base',
      labsImaging: 'WBC 18,000 with left shift, lactate 3.2, procalcitonin elevated'
    },
    imageType: 'xray',
    imageDescription: 'Chest X-ray PA view: Right lower lobe consolidation with air bronchograms visible within the opacity. Right costophrenic angle shows blunting suggesting small pleural effusion. Heart size is upper normal. Left lung appears clear. No pneumothorax present.',
    imageCaption: 'PA Chest X-ray showing right lower lobe pneumonia with air bronchograms',
    options: [
      'Outpatient oral antibiotics',
      'Inpatient IV antibiotics',
      'ICU admission with broad-spectrum antibiotics',
      'Observation with supportive care'
    ],
    correctIndex: 2,
    explanation: 'This elderly nursing home patient presents with pneumonia and signs of sepsis (hypotension, tachycardia, elevated lactate, altered mental status). ICU admission with broad-spectrum antibiotics is indicated for severe sepsis/septic shock.',
    references: [
      'Metlay JP, et al. Diagnosis and Treatment of CAP in Adults 2019',
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2021',
      'Kalil AC, et al. Management of Adults with HAP/VAP 2016'
    ],
    difficulty: 'easy',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize pneumonia on chest X-ray',
      'Assess severity using clinical criteria',
      'Select appropriate level of care'
    ],
    clinicalPearls: [
      'Air bronchograms indicate consolidation',
      'Sepsis requires ICU-level care',
      'Nursing home residents need broader coverage'
    ]
  },
  {
    id: 'cxr-006',
    question: 'What is the most likely diagnosis?',
    clinicalScenario: 'A 45-year-old construction worker presents with progressive dyspnea over 6 months.',
    patientPresentation: {
      age: 45,
      gender: 'Male',
      chiefComplaint: 'Progressive shortness of breath with exertion over 6 months',
      vitalSigns: {
        heartRate: 85,
        bloodPressure: '135/80',
        temperature: 98.6,
        respiratoryRate: 20,
        oxygenSaturation: 94
      },
      pastMedicalHistory: ['20-year history of construction work, possible asbestos exposure'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray PA view: Bilateral lower lobe reticular opacities with honeycomb pattern. Pleural plaques visible along bilateral chest walls and diaphragmatic surfaces. Loss of lung volume with elevated hemidiaphragms. No pneumothorax or effusion.',
    options: [
      'Idiopathic pulmonary fibrosis',
      'Asbestosis',
      'Sarcoidosis',
      'Hypersensitivity pneumonitis'
    ],
    correctIndex: 1,
    explanation: 'Construction worker with bilateral lower lobe reticular opacities, honeycomb pattern, and characteristic pleural plaques suggests asbestosis. The occupational history and bilateral pleural plaques are highly suggestive.',
    references: [
      'American Thoracic Society. Diagnosis and Initial Management of Nonmalignant Diseases Related to Asbestos 2004',
      'Wolff H, et al. Asbestos, asbestosis, and cancer 2015',
      'Peacock C, et al. Asbestos-related lung disease 2000'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize asbestos-related lung disease',
      'Identify pleural plaques',
      'Understand occupational lung diseases'
    ],
    clinicalPearls: [
      'Pleural plaques are pathognomonic for asbestos exposure',
      'Lower lobe predominance typical in asbestosis',
      'Latency period 15-30 years from exposure'
    ]
  },
  {
    id: 'cxr-007',
    question: 'What immediate intervention is needed?',
    clinicalScenario: 'A 22-year-old tall, thin man presents with sudden onset chest pain and dyspnea.',
    patientPresentation: {
      age: 22,
      gender: 'Male',
      chiefComplaint: 'Sudden onset sharp chest pain and shortness of breath',
      vitalSigns: {
        heartRate: 110,
        bloodPressure: '100/70',
        temperature: 98.4,
        respiratoryRate: 28,
        oxygenSaturation: 91
      },
      pastMedicalHistory: ['Tall stature, previously healthy'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray PA view: Complete absence of lung markings in the right upper and middle lung fields. Sharp pleural edge visible along the right chest wall. Right lung appears collapsed to approximately 50%. Heart and mediastinum appear shifted slightly to the left.',
    options: [
      'High-flow oxygen and observation',
      'Needle thoracostomy 2nd intercostal space',
      'Chest tube placement',
      'CPAP ventilation'
    ],
    correctIndex: 2,
    explanation: 'Large spontaneous pneumothorax (>50% collapse) in a young patient requires immediate chest tube placement. The degree of collapse and symptoms indicate this is not suitable for conservative management.',
    references: [
      'MacDuff A, et al. Management of spontaneous pneumothorax BTS 2010',
      'Baumann MH, et al. Management of spontaneous pneumothorax ACCP 2001',
      'Tschopp JM, et al. ERS task force statement on management of pleural disease 2010'
    ],
    difficulty: 'easy',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize large pneumothorax',
      'Understand emergency management',
      'Assess pneumothorax severity'
    ],
    clinicalPearls: [
      'Pneumothorax >50% requires drainage',
      'Young tall males at highest risk',
      'Chest tube preferred over needle thoracostomy'
    ]
  },
  {
    id: 'cxr-008',
    question: 'What is the most concerning finding?',
    clinicalScenario: 'A 55-year-old smoker presents with chronic cough and unintentional weight loss.',
    patientPresentation: {
      age: 55,
      gender: 'Female',
      chiefComplaint: 'Chronic cough with blood-tinged sputum and 15-pound weight loss',
      vitalSigns: {
        heartRate: 88,
        bloodPressure: '125/75',
        temperature: 98.8,
        respiratoryRate: 18,
        oxygenSaturation: 96
      },
      pastMedicalHistory: ['40-pack-year smoking history'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray PA view: 4 cm irregular mass in the right upper lobe with spiculated margins. Right hilar lymphadenopathy present. No pleural effusion. Left lung appears clear. Heart size normal.',
    options: [
      'Hilar lymphadenopathy',
      'Spiculated lung mass',
      'Weight loss history',
      'Smoking history'
    ],
    correctIndex: 1,
    explanation: 'A spiculated lung mass in a smoker with hemoptysis and weight loss is highly suspicious for lung cancer. The irregular, spiculated margins are characteristic of malignancy and require urgent investigation.',
    references: [
      'Aberle DR, et al. Reduced lung-cancer mortality with low-dose computed tomographic screening 2011',
      'Gould MK, et al. Evaluation of patients with pulmonary nodules 2013',
      'Wood DE, et al. Lung cancer screening guidelines NCCN 2012'
    ],
    difficulty: 'easy',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize suspicious lung mass features',
      'Identify malignancy risk factors',
      'Understand urgent referral criteria'
    ],
    clinicalPearls: [
      'Spiculated margins suggest malignancy',
      'Size >3cm increases malignancy risk',
      'Smoking history strongest risk factor'
    ]
  },
  {
    id: 'cxr-009',
    question: 'What is the most likely cause?',
    clinicalScenario: 'A 35-year-old woman presents with acute dyspnea 2 weeks after cesarean section.',
    patientPresentation: {
      age: 35,
      gender: 'Female',
      chiefComplaint: 'Sudden onset shortness of breath and chest pain',
      vitalSigns: {
        heartRate: 115,
        bloodPressure: '110/70',
        temperature: 98.6,
        respiratoryRate: 24,
        oxygenSaturation: 89
      },
      pastMedicalHistory: ['Recent cesarean section 2 weeks ago'],
      currentMedications: ['Iron supplements', 'Ibuprofen']
    },
    imageDescription: 'Chest X-ray PA view: Peripheral wedge-shaped opacity in the right lower lobe extending to the pleural surface. Small right pleural effusion present. Right hemidiaphragm is elevated. Heart size appears normal.',
    options: [
      'Pulmonary embolism',
      'Pneumonia',
      'Fat embolism',
      'Amniotic fluid embolism'
    ],
    correctIndex: 0,
    explanation: 'Wedge-shaped peripheral opacity (Hampton\'s hump) with pleural effusion in a postpartum patient suggests pulmonary embolism. Pregnancy and recent surgery are major risk factors for VTE.',
    references: [
      'Konstantinides SV, et al. 2019 ESC Guidelines for acute pulmonary embolism',
      'Bates SM, et al. VTE in pregnancy Antithrombotic Therapy 2012',
      'James AH, et al. Venous thromboembolism during pregnancy and the postpartum period 2005'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize Hampton\'s hump sign',
      'Understand postpartum VTE risk',
      'Identify pulmonary embolism patterns'
    ],
    clinicalPearls: [
      'Hampton\'s hump indicates pulmonary infarction',
      'Postpartum period has 6x increased VTE risk',
      'CT pulmonary angiogram is diagnostic test'
    ]
  },
  {
    id: 'cxr-010',
    question: 'What is the most appropriate initial management?',
    clinicalScenario: 'A 28-year-old recent immigrant presents with productive cough and night sweats for 6 weeks.',
    patientPresentation: {
      age: 28,
      gender: 'Male',
      chiefComplaint: 'Productive cough, night sweats, and weight loss for 6 weeks',
      vitalSigns: {
        heartRate: 92,
        bloodPressure: '120/80',
        temperature: 100.8,
        respiratoryRate: 20,
        oxygenSaturation: 94
      },
      pastMedicalHistory: ['Recent immigration from high TB prevalence area'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray PA view: Right upper lobe consolidation with cavitation. Multiple small nodular opacities in both upper lobes. Right hilar lymphadenopathy present. No pleural effusion.',
    options: [
      'Empiric antibiotic therapy',
      'Respiratory isolation and sputum AFB',
      'CT chest for further evaluation',
      'Bronchoscopy with BAL'
    ],
    correctIndex: 1,
    explanation: 'Upper lobe cavitation with constitutional symptoms in a patient from high TB prevalence area strongly suggests pulmonary tuberculosis. Respiratory isolation and AFB sputum testing are immediately indicated.',
    references: [
      'Lewinsohn DM, et al. Official ATS/IDSA/CDC Clinical Practice Guidelines TB 2017',
      'WHO Global tuberculosis report 2020',
      'Sterling TR, et al. Treatment of tuberculosis MMWR 2016'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize pulmonary tuberculosis patterns',
      'Understand infection control measures',
      'Identify high-risk populations'
    ],
    clinicalPearls: [
      'Upper lobe cavitation classic for TB',
      'Immediate isolation required',
      'Three sputum AFB samples needed'
    ]
  },
  {
    id: 'cxr-011',
    question: 'What complication is most likely developing?',
    clinicalScenario: 'A 70-year-old man with COPD presents with worsening dyspnea and chest pain.',
    patientPresentation: {
      age: 70,
      gender: 'Male',
      chiefComplaint: 'Sudden worsening of shortness of breath and right-sided chest pain',
      vitalSigns: {
        heartRate: 105,
        bloodPressure: '90/60',
        temperature: 98.4,
        respiratoryRate: 30,
        oxygenSaturation: 84
      },
      pastMedicalHistory: ['Severe COPD', 'Emphysema'],
      currentMedications: ['Albuterol', 'Ipratropium', 'Prednisone']
    },
    imageDescription: 'Chest X-ray PA view: Hyperinflated lungs with flattened diaphragms consistent with emphysema. Large area of absent lung markings in the right lung field extending from apex to base. Mediastinal shift to the left.',
    options: [
      'COPD exacerbation',
      'Pneumonia',
      'Spontaneous pneumothorax',
      'Pleural effusion'
    ],
    correctIndex: 2,
    explanation: 'Sudden worsening dyspnea with absent lung markings and mediastinal shift in a COPD patient indicates spontaneous pneumothorax. This is a known complication of emphysema due to rupture of subpleural blebs.',
    references: [
      'Tschopp JM, et al. ERS Task Force Statement: Management of spontaneous pneumothorax 2015',
      'Noppen M, et al. Spontaneous pneumothorax in chronic obstructive pulmonary disease 2003',
      'Henry M, et al. Pneumothorax and mortality in the COPD patient 2007'
    ],
    difficulty: 'easy',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize pneumothorax in COPD',
      'Understand emphysema complications',
      'Identify mediastinal shift'
    ],
    clinicalPearls: [
      'COPD patients at risk for spontaneous pneumothorax',
      'Blebs rupture causing pneumothorax',
      'May be life-threatening in severe COPD'
    ]
  },
  {
    id: 'cxr-012',
    question: 'What is the most likely diagnosis?',
    clinicalScenario: 'A 25-year-old African American woman presents with fatigue and bilateral ankle swelling.',
    patientPresentation: {
      age: 25,
      gender: 'Female',
      chiefComplaint: 'Progressive fatigue and bilateral ankle swelling over 2 months',
      vitalSigns: {
        heartRate: 85,
        bloodPressure: '125/80',
        temperature: 98.6,
        respiratoryRate: 18,
        oxygenSaturation: 96
      },
      pastMedicalHistory: ['No significant past medical history'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray PA view: Bilateral hilar lymphadenopathy with symmetric enlargement creating a "butterfly" appearance. Multiple small nodular opacities throughout both lung fields. No pleural effusion or pneumothorax.',
    options: [
      'Lymphoma',
      'Sarcoidosis',
      'Tuberculosis',
      'Metastatic disease'
    ],
    correctIndex: 1,
    explanation: 'Bilateral symmetric hilar lymphadenopathy in a young African American woman is highly suggestive of sarcoidosis. The "butterfly" pattern of hilar enlargement is characteristic of this multisystem granulomatous disease.',
    references: [
      'Iannuzzi MC, et al. Sarcoidosis NEJM 2007',
      'Statement on sarcoidosis ATS/ERS/WASOG 1999',
      'Judson MA, et al. The clinical course of sarcoidosis 1999'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize sarcoidosis chest X-ray pattern',
      'Understand bilateral hilar lymphadenopathy',
      'Identify high-risk demographics'
    ],
    clinicalPearls: [
      'Bilateral hilar LAD classic for sarcoidosis',
      'Higher prevalence in African Americans',
      'Stage I sarcoidosis: hilar LAD only'
    ]
  },
  {
    id: 'cxr-013',
    question: 'What intervention is most urgently needed?',
    clinicalScenario: 'A 65-year-old man presents with sudden severe chest pain radiating to his back.',
    patientPresentation: {
      age: 65,
      gender: 'Male',
      chiefComplaint: 'Sudden severe tearing chest pain radiating to back',
      vitalSigns: {
        heartRate: 95,
        bloodPressure: '180/110 right arm, 140/85 left arm',
        temperature: 98.6,
        respiratoryRate: 20,
        oxygenSaturation: 97
      },
      pastMedicalHistory: ['Hypertension', 'Smoking history'],
      currentMedications: ['Lisinopril', 'HCTZ']
    },
    imageDescription: 'Chest X-ray PA view: Widened mediastinum measuring 10 cm at the level of the aortic arch. Aortic knob appears enlarged and irregular. Left pleural effusion present. Trachea appears slightly deviated to the right.',
    options: [
      'Emergency CT angiography',
      'Echocardiogram',
      'Cardiac catheterization',
      'MRI chest'
    ],
    correctIndex: 0,
    explanation: 'Widened mediastinum with tearing chest pain and blood pressure differential strongly suggests aortic dissection. Emergency CT angiography is needed to confirm diagnosis and plan urgent surgical intervention.',
    references: [
      'Hiratzka LF, et al. 2010 ACCF/AHA/AATS Guidelines for Thoracic Aortic Disease',
      'Erbel R, et al. 2014 ESC Guidelines on aortic diseases',
      'Nienaber CA, et al. Aortic dissection NEJM 1993'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize aortic dissection imaging',
      'Understand emergency evaluation',
      'Identify high-risk clinical features'
    ],
    clinicalPearls: [
      'Mediastinum >8cm suggests dissection',
      'Blood pressure differential indicates dissection',
      'Type A dissection requires emergency surgery'
    ]
  },
  {
    id: 'cxr-014',
    question: 'What is the most appropriate next step?',
    clinicalScenario: 'A 40-year-old woman presents with progressive dyspnea and dry cough for 3 months.',
    patientPresentation: {
      age: 40,
      gender: 'Female',
      chiefComplaint: 'Progressive shortness of breath and dry cough for 3 months',
      vitalSigns: {
        heartRate: 90,
        bloodPressure: '130/85',
        temperature: 98.4,
        respiratoryRate: 22,
        oxygenSaturation: 92
      },
      pastMedicalHistory: ['Recently started amiodarone for atrial fibrillation'],
      currentMedications: ['Amiodarone', 'Warfarin']
    },
    imageDescription: 'Chest X-ray PA view: Bilateral lower lobe reticular opacities with ground-glass appearance. Loss of lung volume with elevated diaphragms. No pleural effusion or pneumothorax. Heart size appears normal.',
    options: [
      'Continue amiodarone and monitor',
      'Discontinue amiodarone immediately',
      'Add corticosteroids',
      'Obtain high-resolution CT chest'
    ],
    correctIndex: 1,
    explanation: 'Bilateral lower lobe reticular opacities with ground-glass appearance in a patient on amiodarone suggests amiodarone-induced pulmonary toxicity. Immediate discontinuation of amiodarone is essential to prevent progression.',
    references: [
      'Wolkove N, et al. Amiodarone pulmonary toxicity 1997',
      'Ernawati DK, et al. Amiodarone-induced pulmonary toxicity 2008',
      'Papiris SA, et al. Amiodarone Review of pulmonary effects and toxicity 2010'
    ],
    difficulty: 'hard',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize drug-induced pulmonary toxicity',
      'Understand amiodarone side effects',
      'Prioritize medication discontinuation'
    ],
    clinicalPearls: [
      'Amiodarone toxicity can be fatal',
      'Bilateral lower lobe pattern typical',
      'May require corticosteroids after discontinuation'
    ]
  },
  {
    id: 'cxr-015',
    question: 'What is the most likely underlying condition?',
    clinicalScenario: 'A 50-year-old alcoholic man presents with productive cough and foul-smelling sputum.',
    patientPresentation: {
      age: 50,
      gender: 'Male',
      chiefComplaint: 'Productive cough with foul-smelling sputum for 2 weeks',
      vitalSigns: {
        heartRate: 95,
        bloodPressure: '125/80',
        temperature: 101.2,
        respiratoryRate: 22,
        oxygenSaturation: 93
      },
      pastMedicalHistory: ['Chronic alcoholism', 'Poor dental hygiene'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray PA view: Large cavitary lesion in the right upper lobe with thick walls and air-fluid level. Surrounding consolidation present. Right hilar fullness. No pleural effusion.',
    options: [
      'Lung cancer',
      'Tuberculosis',
      'Lung abscess',
      'Pneumonia'
    ],
    correctIndex: 2,
    explanation: 'Cavitary lesion with air-fluid level and foul-smelling sputum in an alcoholic with poor dental hygiene is classic for lung abscess, likely due to aspiration of oral anaerobes.',
    references: [
      'Bartlett JG. The role of anaerobic bacteria in lung abscess 2005',
      'Mansharamani NG, et al. Management of lung abscess 2000',
      'Hammond JM, et al. The etiology and antimicrobial susceptibility patterns of microorganisms in acute community-acquired lung abscess 1995'
    ],
    difficulty: 'easy',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize lung abscess imaging',
      'Understand aspiration risk factors',
      'Identify air-fluid levels'
    ],
    clinicalPearls: [
      'Air-fluid level pathognomonic for abscess',
      'Alcoholism increases aspiration risk',
      'Anaerobic bacteria cause foul odor'
    ]
  },
  {
    id: 'cxr-016',
    question: 'What is the most concerning complication?',
    clinicalScenario: 'A 75-year-old woman with rheumatoid arthritis presents with progressive dyspnea.',
    patientPresentation: {
      age: 75,
      gender: 'Female',
      chiefComplaint: 'Progressive shortness of breath over 6 months',
      vitalSigns: {
        heartRate: 88,
        bloodPressure: '140/90',
        temperature: 98.6,
        respiratoryRate: 24,
        oxygenSaturation: 90
      },
      pastMedicalHistory: ['Rheumatoid arthritis for 20 years'],
      currentMedications: ['Methotrexate', 'Prednisone']
    },
    imageDescription: 'Chest X-ray PA view: Bilateral lower lobe reticular opacities with honeycomb pattern. Loss of lung volume. Small bilateral pleural effusions. Heart appears enlarged.',
    options: [
      'Methotrexate pneumonitis',
      'Rheumatoid lung disease',
      'Heart failure',
      'Pulmonary embolism'
    ],
    correctIndex: 1,
    explanation: 'Bilateral lower lobe reticular opacities with honeycomb pattern in a patient with long-standing rheumatoid arthritis suggests rheumatoid lung disease (usual interstitial pneumonia pattern), which carries a poor prognosis.',
    references: [
      'Bongartz T, et al. Incidence and mortality of interstitial lung disease in rheumatoid arthritis 2010',
      'Skeoch S, et al. Drug-induced interstitial lung disease: a systematic review 2018',
      'Kelly CA, et al. Rheumatoid arthritis-related interstitial lung disease 2014'
    ],
    difficulty: 'hard',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize rheumatoid lung disease',
      'Understand autoimmune lung complications',
      'Distinguish from drug-induced pneumonitis'
    ],
    clinicalPearls: [
      'RA lung disease has poor prognosis',
      'UIP pattern most common in RA',
      'Higher mortality than idiopathic pulmonary fibrosis'
    ]
  },
  {
    id: 'cxr-017',
    question: 'What immediate action is required?',
    clinicalScenario: 'A 30-year-old man presents after motor vehicle accident with chest pain and dyspnea.',
    patientPresentation: {
      age: 30,
      gender: 'Male',
      chiefComplaint: 'Chest pain and difficulty breathing after car accident',
      vitalSigns: {
        heartRate: 120,
        bloodPressure: '85/50',
        temperature: 98.2,
        respiratoryRate: 32,
        oxygenSaturation: 88
      },
      pastMedicalHistory: ['No significant past medical history'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray AP portable: Multiple bilateral rib fractures. Bilateral pulmonary contusions with patchy airspace opacities. Pneumothorax on the right side. Mediastinum appears widened. Endotracheal tube in good position.',
    options: [
      'Pain control and pulmonary toilet',
      'Right chest tube placement',
      'Surgical fixation of rib fractures',
      'CT angiogram of chest'
    ],
    correctIndex: 1,
    explanation: 'Pneumothorax in a trauma patient with respiratory distress and hypotension requires immediate chest tube placement. This takes priority over other interventions in the initial management.',
    references: [
      'American College of Surgeons Committee on Trauma. ATLS Student Course Manual 2018',
      'Mowery NT, et al. Practice management guidelines for management of hemothorax and occult pneumothorax 2011',
      'de Lesquen H, et al. Chest trauma management 2020'
    ],
    difficulty: 'easy',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize traumatic pneumothorax',
      'Prioritize trauma interventions',
      'Understand flail chest complications'
    ],
    clinicalPearls: [
      'Pneumothorax requires immediate drainage in trauma',
      'Multiple rib fractures suggest flail chest',
      'Widened mediastinum may indicate aortic injury'
    ]
  },
  {
    id: 'cxr-018',
    question: 'What is the most likely diagnosis?',
    clinicalScenario: 'A 6-month-old infant presents with fever, cough, and poor feeding for 3 days.',
    patientPresentation: {
      age: 0.5,
      gender: 'Female',
      chiefComplaint: 'Fever, cough, and poor feeding for 3 days',
      vitalSigns: {
        heartRate: 150,
        bloodPressure: '80/50',
        temperature: 102.0,
        respiratoryRate: 45,
        oxygenSaturation: 91
      },
      pastMedicalHistory: ['Born full-term, up-to-date on vaccinations'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray AP view: Bilateral perihilar infiltrates with a "butterfly" pattern. Hyperinflation present with flattened diaphragms. Small areas of atelectasis in both lower lobes. Heart size appears normal.',
    options: [
      'Respiratory syncytial virus bronchiolitis',
      'Bacterial pneumonia',
      'Congenital heart disease',
      'Foreign body aspiration'
    ],
    correctIndex: 0,
    explanation: 'Bilateral perihilar infiltrates with hyperinflation in a young infant during respiratory season is classic for RSV bronchiolitis. The "butterfly" pattern and hyperinflation are characteristic findings.',
    references: [
      'Ralston SL, et al. Clinical practice guideline: bronchiolitis AAP 2014',
      'Meissner HC. Viral Bronchiolitis in Children NEJM 2016',
      'American Academy of Pediatrics Subcommittee on Diagnosis and Management of Bronchiolitis 2006'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize RSV bronchiolitis pattern',
      'Understand pediatric chest X-ray interpretation',
      'Identify viral vs bacterial pneumonia'
    ],
    clinicalPearls: [
      'Hyperinflation typical in bronchiolitis',
      'Peak incidence 2-6 months of age',
      'Bilateral perihilar pattern characteristic'
    ]
  },
  {
    id: 'cxr-019',
    question: 'What is the most appropriate management?',
    clinicalScenario: 'A 45-year-old woman presents with left-sided chest pain and dyspnea after recent travel.',
    patientPresentation: {
      age: 45,
      gender: 'Female',
      chiefComplaint: 'Left-sided chest pain and shortness of breath after long flight',
      vitalSigns: {
        heartRate: 105,
        bloodPressure: '115/75',
        temperature: 98.4,
        respiratoryRate: 22,
        oxygenSaturation: 92
      },
      pastMedicalHistory: ['Oral contraceptive use'],
      currentMedications: ['Oral contraceptives']
    },
    imageDescription: 'Chest X-ray PA view: Normal heart size and mediastinum. Clear lung fields bilaterally. No pneumothorax or pleural effusion. Costophrenic angles are sharp. No focal consolidation.',
    options: [
      'Discharge with reassurance',
      'CT pulmonary angiogram',
      'Echocardiogram',
      'Antibiotics for pneumonia'
    ],
    correctIndex: 1,
    explanation: 'Normal chest X-ray in a patient with high pretest probability for pulmonary embolism (recent travel, OCP use, pleuritic chest pain) requires CT pulmonary angiogram. Normal CXR does not exclude PE.',
    references: [
      'Konstantinides SV, et al. 2019 ESC Guidelines for acute pulmonary embolism',
      'Raja AS, et al. Evaluation of patients with suspected acute pulmonary embolism 2015',
      'Righini M, et al. Age-adjusted D-dimer cutoff levels to rule out pulmonary embolism 2012'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Understand PE evaluation with normal CXR',
      'Recognize high-risk patient factors',
      'Select appropriate imaging modality'
    ],
    clinicalPearls: [
      'Normal CXR common in pulmonary embolism',
      'OCP use increases VTE risk 3-6 fold',
      'CTPA is imaging of choice for PE'
    ]
  },
  {
    id: 'cxr-020',
    question: 'What is the most likely cause of this pattern?',
    clinicalScenario: 'A 60-year-old farmer presents with chronic dyspnea and restrictive lung pattern on PFTs.',
    patientPresentation: {
      age: 60,
      gender: 'Male',
      chiefComplaint: 'Progressive shortness of breath over 2 years, worse with exertion',
      vitalSigns: {
        heartRate: 85,
        bloodPressure: '130/80',
        temperature: 98.6,
        respiratoryRate: 20,
        oxygenSaturation: 93
      },
      pastMedicalHistory: ['30-year history of farming, exposure to hay and grain dust'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray PA view: Bilateral upper lobe reticulonodular opacities with fibrotic changes. Hilar retraction present. Lower lobes appear relatively spared. No pleural effusion or pneumothorax.',
    options: [
      'Hypersensitivity pneumonitis',
      'Idiopathic pulmonary fibrosis',
      'Sarcoidosis',
      'Silicosis'
    ],
    correctIndex: 0,
    explanation: 'Upper lobe predominant reticulonodular opacities in a farmer with chronic organic dust exposure is characteristic of chronic hypersensitivity pneumonitis (farmer\'s lung). The upper lobe distribution distinguishes it from IPF.',
    references: [
      'Raghu G, et al. Diagnosis of hypersensitivity pneumonitis in adults ATS 2020',
      'Vasakova M, et al. Hypersensitivity pneumonitis: perspectives in diagnosis and management 2017',
      'Selman M, et al. Hypersensitivity pneumonitis: insights in diagnosis and pathobiology 2012'
    ],
    difficulty: 'hard',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize hypersensitivity pneumonitis pattern',
      'Understand occupational lung diseases',
      'Distinguish upper vs lower lobe fibrosis'
    ],
    clinicalPearls: [
      'Upper lobe predominance typical of HP',
      'Farmer\'s lung from moldy hay exposure',
      'Antigen avoidance is key treatment'
    ]
  },
  {
    id: 'cxr-021',
    question: 'What intervention is most urgently needed?',
    clinicalScenario: 'A 80-year-old nursing home resident presents with altered mental status and fever.',
    patientPresentation: {
      age: 80,
      gender: 'Male',
      chiefComplaint: 'Confusion and fever, brought from nursing home',
      vitalSigns: {
        heartRate: 110,
        bloodPressure: '85/55',
        temperature: 103.2,
        respiratoryRate: 30,
        oxygenSaturation: 85
      },
      pastMedicalHistory: ['Dementia', 'Dysphagia', 'CVA'],
      currentMedications: ['Donepezil', 'Aspirin']
    },
    imageDescription: 'Chest X-ray AP portable: Right lower lobe consolidation with air bronchograms. Patchy bilateral infiltrates. Small bilateral pleural effusions. Heart appears enlarged. Patient has nasogastric tube in place.',
    options: [
      'IV antibiotics and supportive care',
      'Intubation and mechanical ventilation',
      'Chest tube placement',
      'Hemodialysis'
    ],
    correctIndex: 1,
    explanation: 'Severe hypoxemia (SpO2 85%), altered mental status, and signs of septic shock in elderly patient with aspiration pneumonia indicates need for immediate intubation and mechanical ventilation.',
    references: [
      'Evans L, et al. Surviving Sepsis Campaign Guidelines 2021',
      'Niederman MS, et al. Guidelines for HAP and VAP 2016',
      'Metlay JP, et al. Diagnosis and Treatment of Adults with CAP 2019'
    ],
    difficulty: 'easy',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize severe pneumonia requiring intubation',
      'Understand aspiration pneumonia risk factors',
      'Identify respiratory failure criteria'
    ],
    clinicalPearls: [
      'SpO2 <88% often requires intubation',
      'Aspiration common in nursing home residents',
      'Bilateral infiltrates suggest ARDS development'
    ]
  },
  {
    id: 'cxr-022',
    question: 'What is the most likely underlying etiology?',
    clinicalScenario: 'A 35-year-old woman with systemic lupus erythematosus presents with acute dyspnea.',
    patientPresentation: {
      age: 35,
      gender: 'Female',
      chiefComplaint: 'Sudden onset shortness of breath and chest pain',
      vitalSigns: {
        heartRate: 110,
        bloodPressure: '95/65',
        temperature: 98.8,
        respiratoryRate: 28,
        oxygenSaturation: 88
      },
      pastMedicalHistory: ['Systemic lupus erythematosus', 'Antiphospholipid syndrome'],
      currentMedications: ['Hydroxychloroquine', 'Prednisone']
    },
    imageDescription: 'Chest X-ray PA view: Bilateral alveolar infiltrates in a "butterfly" or "bat wing" pattern. Kerley B lines present. Heart size appears normal. No pleural effusion.',
    options: [
      'Lupus pneumonitis',
      'Pulmonary edema',
      'Pulmonary embolism',
      'Pneumonia'
    ],
    correctIndex: 0,
    explanation: 'Bilateral alveolar infiltrates in a "butterfly" pattern in a patient with SLE suggests acute lupus pneumonitis. This is a serious complication requiring immediate high-dose corticosteroids.',
    references: [
      'Keane MP, et al. Pulmonary manifestations of systemic lupus erythematosus 2000',
      'Mittoo S, et al. Pulmonary manifestations of systemic lupus erythematosus 2004',
      'Fanouriakis A, et al. 2019 EULAR recommendations for SLE management'
    ],
    difficulty: 'hard',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize lupus pneumonitis pattern',
      'Understand autoimmune lung complications',
      'Distinguish from cardiogenic edema'
    ],
    clinicalPearls: [
      'Lupus pneumonitis has butterfly pattern',
      'Normal heart size excludes cardiac cause',
      'High-dose steroids are first-line treatment'
    ]
  },
  {
    id: 'cxr-023',
    question: 'What is the most appropriate next step?',
    clinicalScenario: 'A 55-year-old man presents with hemoptysis and weight loss over 6 weeks.',
    patientPresentation: {
      age: 55,
      gender: 'Male',
      chiefComplaint: 'Coughing up blood and 20-pound weight loss over 6 weeks',
      vitalSigns: {
        heartRate: 90,
        bloodPressure: '135/85',
        temperature: 99.2,
        respiratoryRate: 18,
        oxygenSaturation: 94
      },
      pastMedicalHistory: ['50-pack-year smoking history'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray PA view: 3.5 cm spiculated mass in the left upper lobe. Left hilar enlargement present. No obvious metastatic disease. Heart size normal.',
    options: [
      'Sputum cytology',
      'CT chest with contrast',
      'Bronchoscopy with biopsy',
      'PET scan'
    ],
    correctIndex: 1,
    explanation: 'Spiculated lung mass suspicious for malignancy requires CT chest with contrast for staging and evaluation of mediastinal involvement before tissue diagnosis. This guides the approach for biopsy.',
    references: [
      'Gould MK, et al. Evaluation of individuals with pulmonary nodules 2013',
      'Detterbeck FC, et al. The eighth edition lung cancer stage classification 2017',
      'NCCN Guidelines Version 5.2021 Non-Small Cell Lung Cancer'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Prioritize lung cancer workup steps',
      'Understand staging importance',
      'Select appropriate imaging sequence'
    ],
    clinicalPearls: [
      'CT chest guides biopsy approach',
      'Staging determines treatment options',
      'Spiculated margins highly suggestive of malignancy'
    ]
  },
  {
    id: 'cxr-024',
    question: 'What complication is most likely occurring?',
    clinicalScenario: 'A 25-year-old woman develops sudden dyspnea during routine central line placement.',
    patientPresentation: {
      age: 25,
      gender: 'Female',
      chiefComplaint: 'Sudden shortness of breath during central line insertion',
      vitalSigns: {
        heartRate: 125,
        bloodPressure: '100/60',
        temperature: 98.6,
        respiratoryRate: 30,
        oxygenSaturation: 89
      },
      pastMedicalHistory: ['No significant past medical history'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray AP portable: Central venous catheter tip appears to be in the right ventricle. Right-sided pneumothorax present with 40% lung collapse. Mediastinal shift to the left. No pleural effusion.',
    options: [
      'Catheter malposition',
      'Pneumothorax',
      'Hemothorax',
      'Air embolism'
    ],
    correctIndex: 1,
    explanation: 'Pneumothorax is a known complication of central line placement, especially subclavian approach. The 40% collapse with mediastinal shift requires immediate chest tube placement.',
    references: [
      'McGee DC, et al. Preventing complications of central venous catheterization 2003',
      'Ruesch S, et al. Complications of central venous catheters 2002',
      'Mansfield PF, et al. Complications of central venous access 1994'
    ],
    difficulty: 'easy',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize procedural complications',
      'Identify iatrogenic pneumothorax',
      'Understand central line complications'
    ],
    clinicalPearls: [
      'Pneumothorax most common CVC complication',
      'Post-procedure CXR always needed',
      'Large pneumothorax requires tube thoracostomy'
    ]
  },
  {
    id: 'cxr-025',
    question: 'What is the most likely diagnosis?',
    clinicalScenario: 'A 40-year-old coal miner presents with progressive dyspnea over 15 years.',
    patientPresentation: {
      age: 40,
      gender: 'Male',
      chiefComplaint: 'Progressive shortness of breath over 15 years',
      vitalSigns: {
        heartRate: 88,
        bloodPressure: '130/80',
        temperature: 98.6,
        respiratoryRate: 22,
        oxygenSaturation: 91
      },
      pastMedicalHistory: ['20-year history of coal mining'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray PA view: Multiple small, rounded opacities scattered throughout both upper lobes. Progressive massive fibrosis in bilateral upper lobes. Eggshell calcification of hilar lymph nodes. Lower lobes relatively spared.',
    options: [
      'Silicosis',
      'Coal worker\'s pneumoconiosis',
      'Asbestosis',
      'Sarcoidosis'
    ],
    correctIndex: 1,
    explanation: 'Multiple small rounded opacities with progressive massive fibrosis in upper lobes of a coal miner is diagnostic of coal worker\'s pneumoconiosis. Eggshell calcification of hilar nodes is characteristic.',
    references: [
      'Laney AS, et al. Pneumoconiosis among US coal miners 2018',
      'Perret JL, et al. Coal mine dust lung disease in the modern era 2017',
      'Blackley DJ, et al. Progressive massive fibrosis in coal miners 2018'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize pneumoconiosis patterns',
      'Understand occupational lung diseases',
      'Identify progressive massive fibrosis'
    ],
    clinicalPearls: [
      'PMF indicates severe pneumoconiosis',
      'Eggshell calcification characteristic of CWP',
      'Upper lobe predominance typical'
    ]
  },
  {
    id: 'cxr-026',
    question: 'What immediate intervention is required?',
    clinicalScenario: 'A 70-year-old man presents with sudden onset chest pain and syncope.',
    patientPresentation: {
      age: 70,
      gender: 'Male',
      chiefComplaint: 'Sudden severe chest pain and brief loss of consciousness',
      vitalSigns: {
        heartRate: 110,
        bloodPressure: '80/40',
        temperature: 98.4,
        respiratoryRate: 26,
        oxygenSaturation: 88
      },
      pastMedicalHistory: ['Recent orthopedic surgery'],
      currentMedications: ['Warfarin']
    },
    imageDescription: 'Chest X-ray PA view: Enlarged right heart border with prominent pulmonary arteries. Right lower lobe atelectasis present. Small bilateral pleural effusions. No pneumothorax.',
    options: [
      'Immediate anticoagulation',
      'Thrombolytic therapy',
      'Embolectomy',
      'IVC filter placement'
    ],
    correctIndex: 1,
    explanation: 'Massive pulmonary embolism with hemodynamic compromise (hypotension, syncope) in a high-risk patient (recent surgery) requires immediate thrombolytic therapy to prevent cardiovascular collapse.',
    references: [
      'Konstantinides SV, et al. 2019 ESC Guidelines for acute pulmonary embolism',
      'Jaff MR, et al. Management of massive and submassive pulmonary embolism 2011',
      'Meyer G, et al. Fibrinolysis for patients with intermediate-risk pulmonary embolism 2014'
    ],
    difficulty: 'hard',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize massive pulmonary embolism',
      'Understand hemodynamic significance',
      'Select appropriate urgent therapy'
    ],
    clinicalPearls: [
      'Massive PE = hemodynamic instability',
      'Thrombolytics indicated in massive PE',
      'Recent surgery increases VTE risk 100-fold'
    ]
  },
  {
    id: 'cxr-027',
    question: 'What is the most appropriate management?',
    clinicalScenario: 'A 45-year-old HIV-positive man presents with dry cough and dyspnea.',
    patientPresentation: {
      age: 45,
      gender: 'Male',
      chiefComplaint: 'Dry cough and progressive shortness of breath for 3 weeks',
      vitalSigns: {
        heartRate: 95,
        bloodPressure: '120/80',
        temperature: 100.4,
        respiratoryRate: 24,
        oxygenSaturation: 89
      },
      pastMedicalHistory: ['HIV infection, CD4 count 150'],
      currentMedications: ['Antiretroviral therapy']
    },
    imageDescription: 'Chest X-ray PA view: Bilateral diffuse interstitial infiltrates with ground-glass appearance. No focal consolidation, pleural effusion, or pneumothorax. Heart size normal.',
    options: [
      'Empiric antibiotics for bacterial pneumonia',
      'High-dose trimethoprim-sulfamethoxazole',
      'Antifungal therapy',
      'Bronchoscopy with BAL'
    ],
    correctIndex: 1,
    explanation: 'Bilateral diffuse interstitial infiltrates in an HIV patient with low CD4 count is highly suggestive of Pneumocystis jirovecii pneumonia. High-dose TMP-SMX is first-line treatment.',
    references: [
      'Panel on Opportunistic Infections in HIV-Infected Adults. Guidelines for PCP prevention and treatment 2019',
      'Thomas CF Jr, et al. Pneumocystis pneumonia NEJM 2004',
      'Kovacs JA, et al. Pneumocystis jirovecii pneumonia: new concepts in pathogenesis 2009'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize PCP pneumonia pattern',
      'Understand opportunistic infections in HIV',
      'Select appropriate empiric therapy'
    ],
    clinicalPearls: [
      'Bilateral interstitial pattern classic for PCP',
      'CD4 <200 high risk for PCP',
      'Add corticosteroids if severe hypoxemia'
    ]
  },
  {
    id: 'cxr-028',
    question: 'What is the most likely cause of these findings?',
    clinicalScenario: 'A 30-year-old woman presents with chest pain and dyspnea 24 hours postpartum.',
    patientPresentation: {
      age: 30,
      gender: 'Female',
      chiefComplaint: 'Chest pain and shortness of breath 24 hours after delivery',
      vitalSigns: {
        heartRate: 120,
        bloodPressure: '90/60',
        temperature: 98.8,
        respiratoryRate: 28,
        oxygenSaturation: 87
      },
      pastMedicalHistory: ['Recent cesarean delivery'],
      currentMedications: ['Iron supplements']
    },
    imageDescription: 'Chest X-ray PA view: Bilateral patchy infiltrates with predominant right-sided involvement. Right pleural effusion present. Heart size appears normal. No pneumothorax.',
    options: [
      'Amniotic fluid embolism',
      'Fat embolism syndrome',
      'Pulmonary embolism',
      'Postpartum cardiomyopathy'
    ],
    correctIndex: 0,
    explanation: 'Bilateral patchy infiltrates with acute respiratory distress in the immediate postpartum period, especially after cesarean section, suggests amniotic fluid embolism, a rare but life-threatening obstetric emergency.',
    references: [
      'Knight M, et al. Amniotic fluid embolism incidence, risk factors and outcomes 2012',
      'Society for Maternal-Fetal Medicine. Amniotic fluid embolism 2016',
      'Clark SL, et al. Amniotic fluid embolism: analysis of the national registry 1995'
    ],
    difficulty: 'hard',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize amniotic fluid embolism',
      'Understand obstetric emergencies',
      'Identify postpartum complications'
    ],
    clinicalPearls: [
      'AFE has 60-80% mortality rate',
      'Often presents with cardiopulmonary collapse',
      'Requires immediate multidisciplinary care'
    ]
  },
  {
    id: 'cxr-029',
    question: 'What is the most appropriate next step?',
    clinicalScenario: 'A 65-year-old man with COPD presents with sudden worsening dyspnea and pleuritic chest pain.',
    patientPresentation: {
      age: 65,
      gender: 'Male',
      chiefComplaint: 'Sudden worsening of shortness of breath and sharp chest pain',
      vitalSigns: {
        heartRate: 105,
        bloodPressure: '110/70',
        temperature: 98.6,
        respiratoryRate: 26,
        oxygenSaturation: 87
      },
      pastMedicalHistory: ['Severe COPD', 'Former smoker'],
      currentMedications: ['Albuterol', 'Tiotropium', 'Prednisone']
    },
    imageDescription: 'Chest X-ray PA view: Hyperinflated lungs with flattened diaphragms. Small pneumothorax in left apex, approximately 20% collapse. No pleural effusion. Emphysematous changes throughout.',
    options: [
      'Observation with high-flow oxygen',
      'Needle decompression',
      'Chest tube placement',
      'Non-invasive positive pressure ventilation'
    ],
    correctIndex: 0,
    explanation: 'Small pneumothorax (<50%) in a stable COPD patient can be managed conservatively with observation and supplemental oxygen. The pneumothorax will likely reabsorb with high-flow oxygen therapy.',
    references: [
      'MacDuff A, et al. Management of spontaneous pneumothorax: British Thoracic Society Pleural Disease Guideline 2010',
      'Baumann MH, et al. Management of spontaneous pneumothorax: an American College of Chest Physicians Delphi consensus statement 2001',
      'Noppen M, et al. Spontaneous pneumothorax in chronic obstructive pulmonary disease 2003'
    ],
    difficulty: 'medium',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Assess pneumothorax size and stability',
      'Understand conservative management criteria',
      'Recognize COPD-related complications'
    ],
    clinicalPearls: [
      'Small pneumothorax <50% can be observed',
      'High-flow O2 accelerates reabsorption',
      'COPD patients tolerate small pneumothorax better'
    ]
  },
  {
    id: 'cxr-030',
    question: 'What is the most likely underlying pathophysiology?',
    clinicalScenario: 'A 18-year-old competitive swimmer presents with exertional dyspnea and palpitations.',
    patientPresentation: {
      age: 18,
      gender: 'Female',
      chiefComplaint: 'Shortness of breath and palpitations during swimming practice',
      vitalSigns: {
        heartRate: 105,
        bloodPressure: '110/70',
        temperature: 98.6,
        respiratoryRate: 22,
        oxygenSaturation: 94
      },
      pastMedicalHistory: ['Competitive athlete, no known heart disease'],
      currentMedications: ['None']
    },
    imageDescription: 'Chest X-ray PA view: Enlarged cardiac silhouette with increased pulmonary vascularity. Right heart border appears prominent. Pulmonary arteries are enlarged. No pleural effusion or pneumothorax.',
    options: [
      'Athlete\'s heart syndrome',
      'Atrial septal defect',
      'Mitral valve prolapse',
      'Hypertrophic cardiomyopathy'
    ],
    correctIndex: 1,
    explanation: 'Enlarged heart with increased pulmonary vascularity and prominent right heart in a young athlete with exertional symptoms suggests atrial septal defect with left-to-right shunt causing right heart volume overload.',
    references: [
      'Warnes CA, et al. ACC/AHA 2008 Guidelines for Management of Adults with Congenital Heart Disease',
      'Geva T, et al. Atrial septal defects NEJM 2014',
      'Webb G, et al. Congenital heart disease in the adult NEJM 2001'
    ],
    difficulty: 'hard',
    topicId: 'chest-xray-interpretation',
    learningObjectives: [
      'Recognize congenital heart disease in adults',
      'Understand shunt physiology',
      'Identify right heart volume overload'
    ],
    clinicalPearls: [
      'ASD often presents in young adulthood',
      'Increased pulmonary vascularity indicates left-to-right shunt',
      'Exertional symptoms suggest significant shunt'
    ]
  }
];