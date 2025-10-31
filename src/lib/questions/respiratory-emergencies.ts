import { Question } from './types';

export const respiratoryEmergenciesQuestions: Question[] = [
  {
    id: 'resp-001',
    question: 'A patient presents with acute onset dyspnea, pleuritic chest pain, and hemoptysis. D-dimer is elevated. What is the most appropriate next step?',
    options: [
      'Chest X-ray',
      'CT pulmonary angiogram (CTPA)',
      'Ventilation-perfusion scan',
      'Echocardiogram'
    ],
    correctIndex: 1,
    explanation: 'With high clinical suspicion for pulmonary embolism (acute dyspnea, pleuritic pain, hemoptysis, elevated D-dimer), CT pulmonary angiogram (CTPA) is the gold standard diagnostic test. It provides rapid, accurate diagnosis and can identify alternative diagnoses.',
    references: [
      'Konstantinides SV, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism',
      'Raja AS, et al. Evaluation of patients with suspected acute pulmonary embolism: best practice advice from the Clinical Guidelines Committee of the American College of Physicians'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-002',
    question: 'A patient with COPD presents with increased dyspnea, purulent sputum, and fever. ABG shows pH 7.25, PCO2 65 mmHg, HCO3 28 mEq/L. What is the most appropriate treatment?',
    options: [
      'High-flow oxygen',
      'Non-invasive positive pressure ventilation',
      'Immediate intubation',
      'Bronchodilators only'
    ],
    correctIndex: 1,
    explanation: 'This patient has COPD exacerbation with acute respiratory acidosis (pH 7.25, elevated PCO2). Non-invasive positive pressure ventilation (BiPAP/CPAP) is first-line treatment for COPD exacerbation with respiratory acidosis, as it can prevent the need for intubation.',
    references: [
      'Global Initiative for Chronic Obstructive Lung Disease. Global Strategy for the Diagnosis, Management and Prevention of COPD, 2023 Report',
      'Osadnik CR, et al. Non-invasive ventilation for the management of acute hypercapnic respiratory failure due to exacerbation of chronic obstructive pulmonary disease'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-003',
    question: 'A patient presents with severe asthma exacerbation. Peak flow is 150 L/min (baseline 500 L/min). What is the most appropriate initial treatment?',
    options: [
      'Oral prednisone',
      'Nebulized albuterol + ipratropium + IV corticosteroids',
      'IV magnesium sulfate',
      'Immediate intubation'
    ],
    correctIndex: 1,
    explanation: 'Severe asthma exacerbation (peak flow <50% predicted) requires aggressive treatment with nebulized bronchodilators (albuterol + ipratropium) and systemic corticosteroids. This combination provides optimal bronchodilation through different mechanisms.',
    references: [
      'Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention, 2023',
      'National Heart, Lung, and Blood Institute. 2020 Focused Updates to the Asthma Management Guidelines'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-004',
    question: 'A patient presents with sudden onset severe dyspnea and chest pain. Chest X-ray shows complete opacity of the right hemithorax. What is the most likely diagnosis?',
    options: [
      'Pneumothorax',
      'Massive pleural effusion',
      'Pneumonia',
      'Pulmonary embolism'
    ],
    correctIndex: 1,
    explanation: 'Complete opacity of one hemithorax suggests massive pleural effusion. This can cause severe dyspnea due to lung compression and mediastinal shift. Immediate thoracentesis may be life-saving. Common causes include malignancy, heart failure, and infection.',
    references: [
      'Light RW. Pleural diseases. 6th ed. Philadelphia: Lippincott Williams & Wilkins; 2013',
      'Porcel JM, et al. Pleural effusions from congestive heart failure'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-005',
    question: 'A patient with pneumonia develops ARDS. What is the recommended tidal volume for mechanical ventilation?',
    options: [
      '4-6 mL/kg ideal body weight',
      '6-8 mL/kg ideal body weight',
      '8-10 mL/kg ideal body weight',
      '10-12 mL/kg ideal body weight'
    ],
    correctIndex: 1,
    explanation: 'The ARDSnet protocol recommends low tidal volume ventilation at 6 mL/kg ideal body weight (range 4-8 mL/kg) to prevent ventilator-induced lung injury. This lung-protective strategy has been shown to reduce mortality in ARDS patients.',
    references: [
      'Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome',
      'Fan E, et al. An Official American Thoracic Society/European Society of Intensive Care Medicine/Society of Critical Care Medicine Clinical Practice Guideline: Mechanical Ventilation in Adult Patients with ARDS'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-006',
    question: 'A patient presents with acute respiratory failure. ABG shows pH 7.15, PCO2 25 mmHg, HCO3 8 mEq/L. What is the primary acid-base disorder?',
    options: [
      'Respiratory acidosis',
      'Metabolic acidosis with respiratory compensation',
      'Respiratory alkalosis',
      'Mixed disorder'
    ],
    correctIndex: 1,
    explanation: 'This is metabolic acidosis (low pH, low HCO3) with appropriate respiratory compensation (low PCO2). The expected PCO2 can be calculated using Winter\'s formula: expected PCO2 = 1.5 × (HCO3) + 8 ± 2. Here: 1.5 × 8 + 8 = 20 ± 2, so PCO2 of 25 shows appropriate compensation.',
    references: [
      'Kraut JA, et al. Serum anion gap: its uses and limitations in clinical medicine',
      'Berend K, et al. Physiological approach to assessment of acid-base disturbances'
    ],
    difficulty: 'hard',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-007',
    question: 'A patient with status asthmaticus is intubated. What ventilator settings should be used to prevent auto-PEEP?',
    options: [
      'High respiratory rate, short expiratory time',
      'Low respiratory rate, long expiratory time',
      'High PEEP, normal respiratory rate',
      'Normal settings with sedation'
    ],
    correctIndex: 1,
    explanation: 'In status asthmaticus, use low respiratory rate (8-10/min) and long expiratory time (I:E ratio 1:3 or 1:4) to allow complete exhalation and prevent air trapping (auto-PEEP). This requires accepting permissive hypercapnia to avoid barotrauma.',
    references: [
      'Leatherman JW, et al. Mechanical ventilation for severe asthma',
      'Tuxen DV, et al. Prior volume history of the lung and regional distribution of gas'
    ],
    difficulty: 'hard',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-008',
    question: 'A patient presents with sudden onset dyspnea and left-sided chest pain. Chest X-ray shows 50% pneumothorax. What is the most appropriate treatment?',
    options: [
      'Observation',
      'Needle decompression',
      'Chest tube insertion',
      'Video-assisted thoracoscopy'
    ],
    correctIndex: 2,
    explanation: 'A pneumothorax >50% or in a symptomatic patient requires chest tube insertion. Large pneumothoraces (>50%) are unlikely to resolve quickly with observation alone and may worsen. Needle decompression is for tension pneumothorax.',
    references: [
      'MacDuff A, et al. Management of spontaneous pneumothorax: British Thoracic Society pleural disease guideline 2010',
      'Baumann MH, et al. Management of spontaneous pneumothorax: an American College of Chest Physicians Delphi consensus statement'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-009',
    question: 'A patient with community-acquired pneumonia has a parapneumonic effusion. Pleural fluid analysis shows pH 7.20, glucose 40 mg/dL, LDH 1000 U/L. What is the most appropriate management?',
    options: [
      'Antibiotics only',
      'Thoracentesis and antibiotics',
      'Chest tube drainage',
      'Video-assisted thoracoscopy'
    ],
    correctIndex: 2,
    explanation: 'This is a complicated parapneumonic effusion/empyema based on low pH (<7.30), low glucose (<60 mg/dL), and high LDH. These effusions require chest tube drainage in addition to antibiotics. Simple observation or thoracentesis alone is inadequate.',
    references: [
      'Colice GL, et al. Medical and surgical treatment of parapneumonic effusions: an evidence-based guideline',
      'Davies HE, et al. Management of pleural infection in adults: British Thoracic Society pleural disease guideline 2010'
    ],
    difficulty: 'hard',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-010',
    question: 'A patient on mechanical ventilation has a plateau pressure of 35 cmH2O. What is the most appropriate intervention?',
    options: [
      'Increase PEEP',
      'Decrease tidal volume',
      'Increase respiratory rate',
      'Increase FiO2'
    ],
    correctIndex: 1,
    explanation: 'Plateau pressure >30 cmH2O indicates high risk for ventilator-induced lung injury. The most appropriate intervention is to decrease tidal volume to reduce plateau pressure. This is part of lung-protective ventilation strategy.',
    references: [
      'Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes',
      'Slutsky AS, et al. Ventilator-induced lung injury. N Engl J Med. 2013;369(22):2126-2136'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-011',
    question: 'A patient presents with acute respiratory failure and bilateral pulmonary infiltrates. P/F ratio is 150. What is the diagnosis?',
    options: [
      'Mild ARDS',
      'Moderate ARDS',
      'Severe ARDS',
      'Not ARDS'
    ],
    correctIndex: 1,
    explanation: 'ARDS is classified by P/F ratio: Mild ARDS 200-300, Moderate ARDS 100-200, Severe ARDS <100. With P/F ratio of 150, this represents moderate ARDS. Diagnosis also requires bilateral infiltrates and no evidence of left heart failure.',
    references: [
      'ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition',
      'Ranieri VM, et al. Acute respiratory distress syndrome: the Berlin Definition'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-012',
    question: 'A patient with COPD has chronic CO2 retention. What is the target oxygen saturation?',
    options: [
      '88-92%',
      '92-96%',
      '94-98%',
      '98-100%'
    ],
    correctIndex: 0,
    explanation: 'For COPD patients with chronic CO2 retention, target oxygen saturation is 88-92%. Higher oxygen levels may suppress respiratory drive in chronic CO2 retainers. However, do not withhold oxygen if patient is severely hypoxemic.',
    references: [
      'O\'Driscoll BR, et al. BTS guideline for emergency oxygen use in adult patients',
      'Kane B, et al. Effect of oxygen therapy on respiratory rate in chronic obstructive pulmonary disease'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-013',
    question: 'A patient presents with hemoptysis, weight loss, and a lung mass on chest X-ray. What is the most appropriate next step?',
    options: [
      'Bronchoscopy',
      'CT chest with contrast',
      'Sputum cytology',
      'PET scan'
    ],
    correctIndex: 1,
    explanation: 'CT chest with contrast is the most appropriate next step for evaluating a lung mass. It provides detailed anatomical information, helps stage the tumor, and guides further diagnostic procedures like bronchoscopy or CT-guided biopsy.',
    references: [
      'National Comprehensive Cancer Network. Non-Small Cell Lung Cancer Clinical Practice Guidelines',
      'Silvestri GA, et al. Methods for staging non-small cell lung cancer: Diagnosis and management of lung cancer'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-014',
    question: 'A patient with acute respiratory failure requires intubation. What is the most appropriate medication for rapid sequence intubation?',
    options: [
      'Propofol + succinylcholine',
      'Etomidate + rocuronium',
      'Midazolam + vecuronium',
      'Ketamine + atracurium'
    ],
    correctIndex: 1,
    explanation: 'Etomidate + rocuronium is preferred for rapid sequence intubation in critically ill patients. Etomidate has minimal hemodynamic effects, and rocuronium provides rapid, reliable paralysis. Succinylcholine is avoided in certain conditions (hyperkalemia, burns, neuromuscular disease).',
    references: [
      'Higgs A, et al. Guidelines for the management of tracheal intubation in critically ill adults',
      'Brown CA 3rd, et al. Emergency department rapid sequence intubation: a review of current practice'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-015',
    question: 'A patient presents with acute onset dyspnea and a "saddle" pulmonary embolism on CTPA. What is the most appropriate treatment?',
    options: [
      'Heparin anticoagulation',
      'Thrombolytic therapy',
      'Surgical embolectomy',
      'IVC filter placement'
    ],
    correctIndex: 1,
    explanation: 'A saddle pulmonary embolism indicates massive PE with high mortality risk. Thrombolytic therapy is indicated for massive PE or submassive PE with evidence of right heart strain and hemodynamic compromise. Systemic thrombolysis can be life-saving.',
    references: [
      'Kearon C, et al. Antithrombotic therapy for VTE disease: CHEST Guideline and Expert Panel Report',
      'Konstantinides SV, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism'
    ],
    difficulty: 'hard',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-016',
    question: 'A patient with severe pneumonia develops septic shock. Lactate is 4.0 mmol/L. What is the target blood pressure?',
    options: [
      'MAP ≥60 mmHg',
      'MAP ≥65 mmHg',
      'MAP ≥70 mmHg',
      'MAP ≥75 mmHg'
    ],
    correctIndex: 1,
    explanation: 'According to Surviving Sepsis Campaign guidelines, the initial target mean arterial pressure (MAP) is ≥65 mmHg. This target may need to be higher in patients with chronic hypertension. Lactate should be remeasured if initially elevated (>2 mmol/L).',
    references: [
      'Evans L, et al. Surviving sepsis campaign: international guidelines for management of sepsis and septic shock 2021',
      'Rhodes A, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock: 2016'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-017',
    question: 'A patient with interstitial lung disease presents with acute worsening dyspnea. HRCT shows new ground-glass opacities. What is the most likely diagnosis?',
    options: [
      'Pneumonia',
      'Acute exacerbation of IPF',
      'Pulmonary embolism',
      'Heart failure'
    ],
    correctIndex: 1,
    explanation: 'Acute exacerbation of idiopathic pulmonary fibrosis (IPF) presents with acute worsening of dyspnea and new ground-glass opacities on HRCT in patients with existing interstitial lung disease. It has a poor prognosis and requires high-dose corticosteroids.',
    references: [
      'Collard HR, et al. Acute exacerbation of idiopathic pulmonary fibrosis. An international working group report',
      'Raghu G, et al. An official ATS/ERS/JRS/ALAT statement: idiopathic pulmonary fibrosis'
    ],
    difficulty: 'hard',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-018',
    question: 'A patient presents with severe dyspnea and frothy pink sputum. Chest X-ray shows bilateral infiltrates. What is the most likely diagnosis?',
    options: [
      'Pneumonia',
      'ARDS',
      'Acute cardiogenic pulmonary edema',
      'Aspiration pneumonitis'
    ],
    correctIndex: 2,
    explanation: 'Frothy pink sputum is characteristic of acute cardiogenic pulmonary edema. The bilateral infiltrates represent alveolar flooding from elevated left ventricular filling pressures. Treatment includes diuretics, afterload reduction, and possibly BiPAP.',
    references: [
      'Yancy CW, et al. 2013 ACCF/AHA Guideline for the Management of Heart Failure',
      'Weintraub NL, et al. Acute heart failure syndromes: emergency department presentation, treatment, and disposition'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-019',
    question: 'A patient with asthma is intubated for status asthmaticus. Immediately after intubation, blood pressure drops to 70/40 mmHg. What is the most likely cause?',
    options: [
      'Anesthetic effect',
      'Auto-PEEP from air trapping',
      'Pneumothorax',
      'Anaphylaxis'
    ],
    correctIndex: 1,
    explanation: 'Severe hypotension immediately after intubating an asthmatic patient is most likely due to auto-PEEP from air trapping. The positive pressure ventilation exacerbates air trapping, reducing venous return. Treatment includes disconnecting the ventilator briefly and reducing respiratory rate.',
    references: [
      'Leatherman JW, et al. Mechanical ventilation for severe asthma',
      'Tuxen DV, et al. Detrimental effects of positive end-expiratory pressure during controlled mechanical ventilation of patients with severe airflow obstruction'
    ],
    difficulty: 'hard',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-020',
    question: 'A patient presents with acute dyspnea and unilateral leg swelling. Wells score is 6. What is the most appropriate next step?',
    options: [
      'D-dimer',
      'CTPA',
      'Ultrasound of leg',
      'Start anticoagulation'
    ],
    correctIndex: 1,
    explanation: 'With a Wells score ≥4 (high probability), CTPA is the most appropriate next step rather than D-dimer. The Wells score >4 indicates high pre-test probability for pulmonary embolism, making CTPA the preferred diagnostic test.',
    references: [
      'Wells PS, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism',
      'Konstantinides SV, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-021',
    question: 'A patient with ARDS requires prone positioning. What is the minimum duration for each prone session?',
    options: [
      '6 hours',
      '12 hours',
      '16 hours',
      '24 hours'
    ],
    correctIndex: 2,
    explanation: 'For ARDS patients, prone positioning should be performed for at least 12-16 hours per day when P/F ratio is <150. The PROSEVA trial used 16-hour prone sessions. Longer duration provides better oxygenation improvement and mortality benefit.',
    references: [
      'Guérin C, et al. Prone positioning in severe acute respiratory distress syndrome',
      'Fan E, et al. An Official American Thoracic Society/European Society of Intensive Care Medicine/Society of Critical Care Medicine Clinical Practice Guideline: Mechanical Ventilation in Adult Patients with ARDS'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-022',
    question: 'A patient presents with sudden onset severe dyspnea after central line insertion. What is the most likely complication?',
    options: [
      'Air embolism',
      'Pneumothorax',
      'Hemothorax',
      'Cardiac tamponade'
    ],
    correctIndex: 1,
    explanation: 'Pneumothorax is the most common serious complication of central line insertion, especially subclavian and internal jugular approaches. It presents with sudden onset dyspnea and chest pain. Chest X-ray should be obtained after central line placement.',
    references: [
      'McGee DC, et al. Preventing complications of central venous catheterization',
      'Sznajder JI, et al. Central vein catheterization. Failure and complication rates by three percutaneous approaches'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-023',
    question: 'A patient with severe COPD exacerbation requires BiPAP. What are the appropriate initial settings?',
    options: [
      'IPAP 8, EPAP 4',
      'IPAP 12, EPAP 5',
      'IPAP 16, EPAP 8',
      'IPAP 20, EPAP 10'
    ],
    correctIndex: 1,
    explanation: 'Initial BiPAP settings for COPD exacerbation typically start with IPAP 8-12 cmH2O and EPAP 4-5 cmH2O, then titrate based on patient comfort and gas exchange. The pressure support (IPAP-EPAP) should be at least 8 cmH2O for effective ventilation.',
    references: [
      'Brochard L, et al. Noninvasive ventilation for acute exacerbations of chronic obstructive pulmonary disease',
      'Global Initiative for Chronic Obstructive Lung Disease. Global Strategy for the Diagnosis, Management and Prevention of COPD, 2023 Report'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-024',
    question: 'A patient presents with acute respiratory failure and cavitary lung lesions. They have a history of injection drug use. What is the most likely pathogen?',
    options: [
      'Streptococcus pneumoniae',
      'Staphylococcus aureus',
      'Klebsiella pneumoniae',
      'Pseudomonas aeruginosa'
    ],
    correctIndex: 1,
    explanation: 'Staphylococcus aureus commonly causes cavitary pneumonia, especially in injection drug users who develop septic pulmonary emboli from tricuspid valve endocarditis. The cavities result from septic emboli causing pulmonary infarction and necrosis.',
    references: [
      'Mandell LA, et al. Infectious Diseases Society of America/American Thoracic Society consensus guidelines on the management of community-acquired pneumonia in adults',
      'Fowler VG Jr, et al. Staphylococcus aureus endocarditis: a consequence of medical progress'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-025',
    question: 'A patient with acute respiratory failure has a chest tube for pneumothorax. The water seal chamber is bubbling continuously. What does this indicate?',
    options: [
      'Normal function',
      'Air leak',
      'Tube malposition',
      'Suction too high'
    ],
    correctIndex: 1,
    explanation: 'Continuous bubbling in the water seal chamber indicates an air leak, either from the lung (persistent pneumothorax) or from the chest tube system itself. Intermittent bubbling with respiration is normal, but continuous bubbling suggests ongoing air leak.',
    references: [
      'Laws D, et al. BTS guidelines for the insertion of a chest drain',
      'Havelock T, et al. Pleural procedures and thoracic ultrasound: British Thoracic Society pleural disease guideline 2010'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-026',
    question: 'A patient presents with acute onset dyspnea and chest pain. Chest X-ray shows a "deep sulcus sign." What is the most likely diagnosis?',
    options: [
      'Pneumonia',
      'Pleural effusion',
      'Pneumothorax',
      'Pneumomediastinum'
    ],
    correctIndex: 2,
    explanation: 'The "deep sulcus sign" is a chest X-ray finding suggestive of pneumothorax in supine patients. It appears as an unusually deep and lucent costophrenic angle. This sign is important in ICU patients who are typically supine when chest X-rays are obtained.',
    references: [
      'Kong A. The deep sulcus sign. Radiology. 2003;228(2):415-416',
      'Woodring JH. Recognition of pleural effusion on supine radiographs'
    ],
    difficulty: 'hard',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-027',
    question: 'A patient with severe asthma exacerbation is given IV magnesium sulfate. What is the mechanism of action?',
    options: [
      'Anti-inflammatory effect',
      'Smooth muscle relaxation',
      'Mucolytic effect',
      'Antihistamine effect'
    ],
    correctIndex: 1,
    explanation: 'Magnesium sulfate causes bronchodilation through smooth muscle relaxation by blocking calcium channels and reducing intracellular calcium. It\'s used as adjunctive therapy in severe asthma exacerbations when standard bronchodilators are insufficient.',
    references: [
      'Kew KM, et al. Intravenous magnesium sulfate for treating adults with acute asthma in the emergency department',
      'Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention, 2023'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-028',
    question: 'A patient presents with progressive dyspnea and bilateral lower lobe crackles. BNP is 1200 pg/mL. What is the most likely diagnosis?',
    options: [
      'Pneumonia',
      'Heart failure',
      'COPD exacerbation',
      'Pulmonary embolism'
    ],
    correctIndex: 1,
    explanation: 'Elevated BNP (>400 pg/mL) or NT-proBNP (>900 pg/mL) in the setting of dyspnea and bilateral crackles strongly suggests heart failure. BNP is released from ventricular myocytes in response to volume overload and pressure overload.',
    references: [
      'Yancy CW, et al. 2017 ACC/AHA/HFSA Focused Update of the 2013 ACCF/AHA Guideline for the Management of Heart Failure',
      'Wang CS, et al. Does this dyspneic patient in the emergency department have congestive heart failure?'
    ],
    difficulty: 'easy',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-029',
    question: 'A patient with respiratory failure requires high PEEP (15 cmH2O). What is the most concerning complication?',
    options: [
      'Pneumothorax',
      'Decreased cardiac output',
      'Ventilator-associated pneumonia',
      'Oxygen toxicity'
    ],
    correctIndex: 1,
    explanation: 'High PEEP can significantly reduce venous return and cardiac output, especially in hypovolemic patients. This occurs through increased intrathoracic pressure reducing venous return. Fluid loading or vasopressors may be needed to maintain cardiac output.',
    references: [
      'Luecke T, et al. Clinical review: Positive end-expiratory pressure and cardiac output',
      'Pinsky MR. Cardiovascular issues in respiratory care'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  },
  {
    id: 'resp-030',
    question: 'A patient presents with acute dyspnea and a pleural friction rub. Pleural fluid analysis shows protein ratio >0.5, LDH ratio >0.6. What type of effusion is this?',
    options: [
      'Transudative',
      'Exudative',
      'Hemorrhagic',
      'Chylous'
    ],
    correctIndex: 1,
    explanation: 'Light\'s criteria classify pleural effusions as exudative if any of the following are present: pleural fluid protein/serum protein >0.5, pleural fluid LDH/serum LDH >0.6, or pleural fluid LDH >2/3 upper limit of normal serum LDH. This effusion meets criteria for exudate.',
    references: [
      'Light RW, et al. Pleural effusions: the diagnostic separation of transudates and exudates',
      'Porcel JM, et al. Pleural effusions from congestive heart failure'
    ],
    difficulty: 'medium',
    topicId: 'respiratory-emergencies'
  }
];