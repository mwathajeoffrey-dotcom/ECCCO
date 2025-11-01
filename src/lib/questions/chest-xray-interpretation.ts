import { Question } from './types';

export const chestXrayInterpretationQuestions: Question[] = [
  {
    id: 'cxr-001',
    question: 'Based on the chest X-ray findings described below, what is the most likely diagnosis?',
    clinicalScenario: 'A 67-year-old smoker presents to the ED with acute onset of severe dyspnea and chest pain.',
    patientPresentation: {
      age: '67 years old',
      gender: 'Male',
      chiefComplaint: 'Sudden onset severe shortness of breath and sharp chest pain',
      vitals: 'BP 145/90, HR 110, RR 28, O2 Sat 89% RA, Temp 98.2°F',
      physicalExam: 'Distressed, decreased breath sounds left side, hyperresonant to percussion left chest',
      labsImaging: 'ABG shows hypoxemia, D-dimer elevated'
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
      age: '45 years old',
      gender: 'Male',
      chiefComplaint: 'Chest and abdominal pain after fall from height',
      vitals: 'BP 95/65, HR 120, RR 22, O2 Sat 94% RA, Temp 98.0°F',
      physicalExam: 'Tender left chest wall, decreased breath sounds bilaterally lower lobes, abdominal tenderness',
      labsImaging: 'FAST exam positive for free fluid, hemoglobin 9.2 g/dL'
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
  }
];