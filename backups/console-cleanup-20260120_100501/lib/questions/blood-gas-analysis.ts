import { Question } from './types';

export const bloodGasAnalysisQuestions: Question[] = [
  {
    id: 'abg-001',
    question: 'A patient presents with shortness of breath. ABG shows: pH 7.52, PCO2 28 mmHg, HCO3- 22 mEq/L, PO2 68 mmHg. What is the acid-base status and most likely cause?',
    options: [
      'Respiratory acidosis with hypoxemia',
      'Respiratory alkalosis with hypoxemia',
      'Metabolic alkalosis with compensation',
      'Mixed respiratory and metabolic alkalosis'
    ],
    correctIndex: 1,
    explanation: 'pH 7.52 (alkalotic) with PCO2 28 (low) indicates respiratory alkalosis. Normal HCO3- suggests acute process without metabolic compensation. PO2 68 indicates hypoxemia, suggesting hyperventilation due to hypoxic drive or pulmonary pathology.',
    references: [
      'Seifter JL. Acid-base disorders. In: Longo DL, ed. Harrison\'s Principles of Internal Medicine, 20th Edition',
      'Berend K, et al. Physiological approach to assessment of acid-base disturbances. N Engl J Med. 2014;371(15):1434-1445'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-002',
    question: 'A diabetic patient presents with Kussmaul breathing. ABG: pH 7.18, PCO2 15 mmHg, HCO3- 6 mEq/L, glucose 480 mg/dL. What is the expected PCO2 using Winter\'s formula?',
    options: [
      '12-16 mmHg',
      '18-22 mmHg',
      '8-12 mmHg',
      '20-24 mmHg'
    ],
    correctIndex: 0,
    explanation: 'Winter\'s formula for metabolic acidosis: Expected PCO2 = 1.5 × [HCO3-] + 8 ± 2. With HCO3- of 6: Expected PCO2 = 1.5 × 6 + 8 ± 2 = 17 ± 2 (15-19 mmHg). Measured PCO2 of 15 mmHg indicates appropriate respiratory compensation.',
    references: [
      'Winter SD, et al. The fall of the serum anion and bicarbonate concentrations during diabetic ketoacidosis',
      'Adrogué HJ, et al. Management of life-threatening acid-base disorders'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis',
    patientPresentation: {
      age: 45,
      gender: 'Female',
      chiefComplaint: 'Shortness of breath and altered mental status',
      vitalSigns: {
        heartRate: 120,
        bloodPressure: '95/60 mmHg',
        temperature: 100.4,
        respiratoryRate: 28,
        oxygenSaturation: 96
      },
      pastMedicalHistory: ['Type 1 Diabetes', 'Hypertension'],
      currentMedications: ['Insulin glargine', 'Lisinopril 10mg daily'],
      physicalExam: 'Deep, rapid breathing (Kussmaul respirations), fruity breath odor, mild dehydration'
    }
  },
  {
    id: 'abg-003',
    question: 'A patient on mechanical ventilation has ABG: pH 7.35, PCO2 55 mmHg, HCO3- 29 mEq/L, PO2 95 mmHg on FiO2 0.4. What ventilator adjustment is most appropriate?',
    options: [
      'Increase respiratory rate',
      'Decrease respiratory rate',
      'Increase FiO2',
      'No changes needed'
    ],
    correctIndex: 3,
    explanation: 'pH 7.35 is at lower limit of normal, PCO2 55 shows mild retention with metabolic compensation (HCO3- 29), and oxygenation is adequate (PO2 95 on FiO2 0.4). This represents compensated respiratory acidosis and is acceptable.',
    references: [
      'Slutsky AS, et al. Ventilator-induced lung injury. N Engl J Med. 2013;369(22):2126-2136',
      'Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-004',
    question: 'A COPD patient on supplemental oxygen presents with confusion. ABG: pH 7.28, PCO2 68 mmHg, HCO3- 30 mEq/L, PO2 85 mmHg. What is the primary acid-base disorder?',
    options: [
      'Respiratory acidosis with metabolic compensation',
      'Mixed respiratory and metabolic acidosis',
      'Metabolic alkalosis with respiratory compensation',
      'Acute respiratory acidosis'
    ],
    correctIndex: 0,
    explanation: 'Primary disorder is respiratory acidosis (low pH, high PCO2). The elevated HCO3- (30 mEq/L, normal 22-26) indicates metabolic compensation. Expected compensation: HCO3- increases by 3.5 mEq/L for every 10 mmHg rise in PCO2 above 40.',
    references: [
      'Bateman NT, et al. 35th Pulmonary physiology',
      'Albert MS, et al. Simple and mixed acid-base disorders'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis',
    patientPresentation: {
      age: 68,
      gender: 'Male',
      chiefComplaint: 'Confusion and drowsiness',
      vitalSigns: {
        heartRate: 95,
        bloodPressure: '145/85 mmHg',
        temperature: 98.8,
        respiratoryRate: 20,
        oxygenSaturation: 88
      },
      pastMedicalHistory: ['COPD', 'Former smoker (40 pack-years)', 'Hypertension'],
      currentMedications: ['Albuterol inhaler', 'Tiotropium', 'Home oxygen 2L/min'],
      physicalExam: 'Barrel chest, prolonged expiration, mild asterixis, use of accessory muscles'
    }
  },
  {
    id: 'abg-005',
    question: 'A patient with COPD exacerbation has ABG: pH 7.25, PCO2 70 mmHg, HCO3- 30 mEq/L, PO2 55 mmHg. What is the acid-base interpretation?',
    options: [
      'Acute respiratory acidosis',
      'Chronic respiratory acidosis with partial compensation',
      'Mixed respiratory and metabolic acidosis',
      'Acute on chronic respiratory acidosis'
    ],
    correctIndex: 3,
    explanation: 'pH 7.25 (acidotic) with PCO2 70 (high) indicates respiratory acidosis. HCO3- 30 suggests chronic compensation, but pH remains acidotic indicating acute worsening. This is acute-on-chronic respiratory acidosis common in COPD exacerbations.',
    references: [
      'Global Initiative for Chronic Obstructive Lung Disease. Global Strategy for the Diagnosis, Management and Prevention of COPD, 2023 Report',
      'Seifter JL. Acid-base disorders'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-006',
    question: 'A patient presents with weakness and confusion. ABG: pH 7.22, PCO2 15 mmHg, HCO3- 6 mEq/L, anion gap 28. What additional test is most important?',
    options: [
      'Serum lactate',
      'Serum ketones',
      'Serum salicylate level',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'High anion gap metabolic acidosis (anion gap 28) with appropriate respiratory compensation requires identifying the cause. Common causes include lactic acidosis, ketoacidosis, and toxic ingestions (salicylates). All tests help narrow the differential.',
    references: [
      'Kraut JA, et al. Metabolic acidosis: pathophysiology, diagnosis and management',
      'Emmett M, et al. Clinical use of the anion gap. Medicine. 1977;56(1):38-54'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-007',
    question: 'A patient on high-flow oxygen shows ABG: pH 7.40, PCO2 40 mmHg, PO2 80 mmHg on FiO2 1.0. What is the A-a gradient and interpretation?',
    options: [
      'A-a gradient 580 mmHg - severe shunt',
      'A-a gradient 280 mmHg - moderate V/Q mismatch',
      'A-a gradient 580 mmHg - normal for age',
      'A-a gradient 60 mmHg - normal'
    ],
    correctIndex: 0,
    explanation: 'A-a gradient = PAO2 - PaO2. PAO2 = (FiO2 × 713) - (PCO2/0.8) = (1.0 × 713) - (40/0.8) = 713 - 50 = 663 mmHg. A-a gradient = 663 - 80 = 583 mmHg. This severe elevation suggests significant shunt or V/Q mismatch.',
    references: [
      'West JB. Respiratory Physiology: The Essentials. 10th Edition',
      'Wagner PD, et al. Ventilation-perfusion inequality in chronic obstructive pulmonary disease'
    ],
    difficulty: 'hard',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-008',
    question: 'A patient with methanol poisoning has ABG: pH 7.15, PCO2 12 mmHg, HCO3- 4 mEq/L, anion gap 32. What is the most appropriate treatment?',
    options: [
      'Sodium bicarbonate infusion',
      'Fomepizole and hemodialysis',
      'Supportive care only',
      'Ethanol infusion'
    ],
    correctIndex: 1,
    explanation: 'Severe high anion gap metabolic acidosis with methanol poisoning requires specific antidotal therapy. Fomepizole blocks alcohol dehydrogenase preventing toxic metabolite formation. Hemodialysis removes methanol and corrects acidosis.',
    references: [
      'Barceloux DG, et al. American Academy of Clinical Toxicology practice guidelines on the treatment of methanol poisoning',
      'Kruse JA. Methanol and ethylene glycol intoxication'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-009',
    question: 'A post-operative patient has ABG: pH 7.55, PCO2 25 mmHg, HCO3- 21 mEq/L, PO2 110 mmHg. What is the most likely cause of alkalosis?',
    options: [
      'Pain-induced hyperventilation',
      'Mechanical ventilation settings',
      'Nasogastric suction',
      'Anxiety'
    ],
    correctIndex: 0,
    explanation: 'pH 7.55 with PCO2 25 and normal HCO3- indicates acute respiratory alkalosis. In post-operative patients, pain is a common cause of hyperventilation leading to CO2 washout. Adequate pain control should resolve the alkalosis.',
    references: [
      'Foster GT, et al. Respiratory alkalosis. Respir Care. 2001;46(4):384-391',
      'Laffey JG, et al. Hypocapnia. N Engl J Med. 2002;347(1):43-53'
    ],
    difficulty: 'easy',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-010',
    question: 'A patient with heart failure has ABG: pH 7.38, PCO2 32 mmHg, HCO3- 18 mEq/L, lactate 4.2 mmol/L. What type of acid-base disorder?',
    options: [
      'Normal acid-base status',
      'Compensated metabolic acidosis',
      'Compensated respiratory alkalosis',
      'Mixed acid-base disorder'
    ],
    correctIndex: 1,
    explanation: 'pH 7.38 (low-normal) with HCO3- 18 (low) indicates metabolic acidosis. PCO2 32 shows appropriate respiratory compensation. Elevated lactate suggests lactic acidosis from poor tissue perfusion in heart failure.',
    references: [
      'Kraut JA, et al. Lactic acidosis. N Engl J Med. 2014;371(24):2309-2319',
      'Berend K, et al. Physiological approach to assessment of acid-base disturbances'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-011',
    question: 'A patient presents with muscle weakness. ABG shows: pH 7.50, PCO2 48 mmHg, HCO3- 36 mEq/L, K+ 2.8 mEq/L, Cl- 88 mEq/L. What is the most likely cause?',
    options: [
      'Hyperaldosteronism',
      'Diuretic abuse',
      'Pyloric stenosis',
      'Chronic kidney disease'
    ],
    correctIndex: 1,
    explanation: 'Metabolic alkalosis (pH 7.50, HCO3- 36) with hypokalemia and hypochloremia suggests diuretic abuse. Volume depletion from diuretics causes chloride loss and potassium wasting, leading to contraction alkalosis.',
    references: [
      'Galla JH. Metabolic alkalosis. J Am Soc Nephrol. 2000;11(2):369-375',
      'Palmer BF, et al. Metabolic alkalosis'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-012',
    question: 'A mechanically ventilated patient has ABG: pH 7.28, PCO2 65 mmHg, HCO3- 30 mEq/L, PO2 65 mmHg on PEEP 12, FiO2 0.6. What is the priority intervention?',
    options: [
      'Increase respiratory rate',
      'Decrease PEEP',
      'Increase FiO2',
      'Add bicarbonate'
    ],
    correctIndex: 2,
    explanation: 'PO2 65 on FiO2 0.6 indicates severe hypoxemia requiring immediate intervention. Oxygenation takes priority over ventilation. Increase FiO2 first, then consider PEEP optimization. pH 7.28 with PCO2 65 shows compensated respiratory acidosis.',
    references: [
      'Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes',
      'Brower RG, et al. Higher versus lower positive end-expiratory pressures in patients with the acute respiratory distress syndrome'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-013',
    question: 'A patient with chronic diarrhea has ABG: pH 7.32, PCO2 28 mmHg, HCO3- 14 mEq/L, anion gap 12. What type of metabolic acidosis?',
    options: [
      'High anion gap metabolic acidosis',
      'Normal anion gap (hyperchloremic) metabolic acidosis',
      'Mixed high and normal anion gap acidosis',
      'Respiratory acidosis with metabolic compensation'
    ],
    correctIndex: 1,
    explanation: 'Normal anion gap (12) with metabolic acidosis indicates hyperchloremic acidosis. Chronic diarrhea causes bicarbonate loss in stool and compensatory chloride retention. PCO2 28 shows appropriate respiratory compensation.',
    references: [
      'Kraut JA, et al. Metabolic acidosis: pathophysiology, diagnosis and management',
      'Adrogue HJ, et al. Management of life-threatening acid-base disorders'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-014',
    question: 'A patient with salicylate poisoning initially has ABG: pH 7.48, PCO2 22 mmHg, HCO3- 16 mEq/L. Four hours later: pH 7.25, PCO2 20 mmHg, HCO3- 8 mEq/L. What explains this progression?',
    options: [
      'Respiratory compensation failure',
      'Development of lactic acidosis',
      'Salicylate\'s direct effect on metabolism',
      'Renal failure'
    ],
    correctIndex: 2,
    explanation: 'Salicylate poisoning initially causes respiratory alkalosis (direct CNS stimulation), then progresses to metabolic acidosis through uncoupling of oxidative phosphorylation, leading to mixed disorder. This biphasic pattern is characteristic of salicylate toxicity.',
    references: [
      'Dargan PI, et al. Salicylate poisoning. Clin Toxicol. 2002;40(2):109-124',
      'O\'Malley GF. Emergency department management of the salicylate-poisoned patient'
    ],
    difficulty: 'hard',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-015',
    question: 'A patient with ARDS on mechanical ventilation has ABG: pH 7.35, PCO2 55 mmHg, HCO3- 29 mEq/L, PO2 68 mmHg on FiO2 0.8, PEEP 15. What strategy is most appropriate?',
    options: [
      'Increase respiratory rate to normalize PCO2',
      'Accept permissive hypercapnia and focus on oxygenation',
      'Add bicarbonate to correct acidosis',
      'Decrease PEEP to improve ventilation'
    ],
    correctIndex: 1,
    explanation: 'In ARDS, permissive hypercapnia with pH >7.30 is acceptable to maintain lung-protective ventilation. Focus should be on oxygenation optimization. Increasing respiratory rate may worsen lung injury. pH 7.35 with compensation is acceptable.',
    references: [
      'Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes',
      'Slutsky AS, et al. Ventilator-induced lung injury'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-016',
    question: 'A patient presents with confusion and fruity breath odor. ABG: pH 7.08, PCO2 18 mmHg, HCO3- 5 mEq/L, glucose 420 mg/dL, ketones positive. What is the most important initial treatment?',
    options: [
      'Insulin 10 units IV bolus',
      'Sodium bicarbonate 100 mEq IV',
      'Normal saline 1-2 liters IV',
      'Potassium replacement'
    ],
    correctIndex: 2,
    explanation: 'Diabetic ketoacidosis with severe acidosis requires immediate fluid resuscitation to restore intravascular volume and tissue perfusion. This improves ketone clearance and reduces acidosis. Insulin and electrolyte management follow initial resuscitation.',
    references: [
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes',
      'Wolfsdorf JI, et al. ISPAD Clinical Practice Consensus Guidelines: Diabetic ketoacidosis and hyperglycemic hyperosmolar state'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-017',
    question: 'A patient has ABG: pH 7.40, PCO2 40 mmHg, HCO3- 24 mEq/L, but anion gap is 20. What condition should be suspected?',
    options: [
      'Normal acid-base status',
      'Hidden metabolic acidosis with concurrent alkalosis',
      'Laboratory error',
      'Chronic kidney disease'
    ],
    correctIndex: 1,
    explanation: 'Normal pH and bicarbonate with elevated anion gap suggests hidden high anion gap metabolic acidosis with concurrent metabolic alkalosis (mixed disorder). The alkalosis masks the acidosis, maintaining normal pH and bicarbonate levels.',
    references: [
      'Emmett M, et al. Clinical use of the anion gap',
      'Kraut JA, et al. Metabolic acidosis: pathophysiology, diagnosis and management'
    ],
    difficulty: 'hard',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-018',
    question: 'A patient with pneumonia has ABG: pH 7.45, PCO2 35 mmHg, HCO3- 23 mEq/L, PO2 58 mmHg on room air. What is the most appropriate oxygen therapy?',
    options: [
      'Nasal cannula 2L/min',
      'High-flow nasal cannula',
      'Non-rebreather mask',
      'BiPAP'
    ],
    correctIndex: 2,
    explanation: 'PO2 58 mmHg indicates severe hypoxemia requiring high FiO2 delivery. Non-rebreather mask provides FiO2 0.8-1.0. Normal pH and PCO2 indicate no hypercapnia, so non-invasive ventilation is not immediately needed.',
    references: [
      'O\'Driscoll BR, et al. BTS guideline for emergency oxygen use in adult patients',
      'Siemieniuk RAC, et al. Oxygen therapy for acutely ill medical patients: a clinical practice guideline'
    ],
    difficulty: 'easy',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-019',
    question: 'A patient with end-stage liver disease has ABG: pH 7.48, PCO2 30 mmHg, HCO3- 22 mEq/L, lactate 2.8 mmol/L. What explains this acid-base pattern?',
    options: [
      'Hepatic encephalopathy causing hyperventilation',
      'Compensated metabolic acidosis',
      'Primary respiratory alkalosis',
      'Mixed respiratory alkalosis and metabolic acidosis'
    ],
    correctIndex: 0,
    explanation: 'Chronic liver disease can cause hyperventilation due to hepatic encephalopathy, leading to chronic respiratory alkalosis. The normal HCO3- suggests metabolic compensation. Mild lactate elevation is common in liver disease.',
    references: [
      'Khungar V, et al. Hepatic encephalopathy. Clin Liver Dis. 2012;16(2):301-320',
      'Foster GT, et al. Respiratory alkalosis'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-020',
    question: 'A patient with aspirin overdose has ABG: pH 7.42, PCO2 15 mmHg, HCO3- 10 mEq/L, salicylate level 65 mg/dL. What is the acid-base interpretation?',
    options: [
      'Compensated metabolic acidosis',
      'Mixed respiratory alkalosis and metabolic acidosis',
      'Primary respiratory alkalosis',
      'Normal acid-base status'
    ],
    correctIndex: 1,
    explanation: 'Salicylate toxicity causes both respiratory alkalosis (CNS stimulation) and metabolic acidosis (uncoupling oxidative phosphorylation). Normal pH with low PCO2 and low HCO3- indicates mixed disorder. Both effects occur simultaneously.',
    references: [
      'Dargan PI, et al. Salicylate poisoning',
      'O\'Malley GF. Emergency department management of the salicylate-poisoned patient'
    ],
    difficulty: 'hard',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-021',
    question: 'A patient on mechanical ventilation develops sudden hypotension. ABG shows: pH 7.20, PCO2 85 mmHg, HCO3- 32 mEq/L, PO2 45 mmHg. What is the most likely cause?',
    options: [
      'Ventilator malfunction',
      'Pneumothorax',
      'Pulmonary embolism',
      'Ventilator-associated pneumonia'
    ],
    correctIndex: 1,
    explanation: 'Sudden onset severe hypercapnia (PCO2 85) and hypoxemia (PO2 45) with hypotension in mechanically ventilated patient suggests tension pneumothorax. This causes both gas exchange failure and hemodynamic compromise.',
    references: [
      'Leigh-Smith S, et al. Tension pneumothorax--time for a re-think?',
      'Barton ED. Tension pneumothorax'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-022',
    question: 'A patient with chronic kidney disease has ABG: pH 7.35, PCO2 30 mmHg, HCO3- 16 mEq/L, anion gap 18. What is the most likely cause of acidosis?',
    options: [
      'Uremic acidosis',
      'Lactic acidosis',
      'Ketoacidosis',
      'Toxic alcohol ingestion'
    ],
    correctIndex: 0,
    explanation: 'CKD causes high anion gap metabolic acidosis through decreased acid excretion and retention of organic anions. Mild elevation of anion gap (18) with appropriate respiratory compensation is typical. Uremic toxins accumulate as GFR declines.',
    references: [
      'Kraut JA, et al. Chronic kidney disease mineral and bone disorder and metabolic acidosis',
      'KDIGO 2012 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-023',
    question: 'A patient presents with altered mental status. ABG: pH 7.15, PCO2 12 mmHg, HCO3- 4 mEq/L, anion gap 30, osmolar gap 45. What is the most likely diagnosis?',
    options: [
      'Diabetic ketoacidosis',
      'Methanol poisoning',
      'Ethylene glycol poisoning',
      'Lactic acidosis'
    ],
    correctIndex: 2,
    explanation: 'Severe high anion gap metabolic acidosis with elevated osmolar gap (>10) suggests toxic alcohol poisoning. Ethylene glycol produces both anion gap acidosis and osmolar gap. Methanol also possible but osmolar gap may be lower if metabolized.',
    references: [
      'Kruse JA. Methanol and ethylene glycol intoxication',
      'Barceloux DG, et al. American Academy of Clinical Toxicology practice guidelines on the treatment of ethylene glycol poisoning'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-024',
    question: 'A patient with severe asthma has ABG: pH 7.38, PCO2 42 mmHg, HCO3- 24 mEq/L, PO2 72 mmHg. What is the significance of these values?',
    options: [
      'Normal values - patient is stable',
      'Concerning - suggests impending respiratory failure',
      'Mild hypoxemia only',
      'Compensated respiratory acidosis'
    ],
    correctIndex: 1,
    explanation: 'In severe asthma, normal PCO2 (42 mmHg) is concerning because patients should hyperventilate and have low PCO2. Normal or rising PCO2 suggests respiratory muscle fatigue and impending respiratory failure requiring close monitoring.',
    references: [
      'National Heart, Lung, and Blood Institute. Expert Panel Report 3: Guidelines for the Diagnosis and Management of Asthma',
      'Brenner B, et al. Management of asthma exacerbations'
    ],
    difficulty: 'hard',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-025',
    question: 'A patient has ABG: pH 7.50, PCO2 48 mmHg, HCO3- 36 mEq/L, Cl- 85 mEq/L. Urine chloride is 8 mEq/L. What is the most likely cause?',
    options: [
      'Diuretic use',
      'Hyperaldosteronism',
      'Vomiting/nasogastric suction',
      'Bartter syndrome'
    ],
    correctIndex: 2,
    explanation: 'Metabolic alkalosis with low urine chloride (<20 mEq/L) indicates chloride-responsive alkalosis, typically from volume depletion. Vomiting or nasogastric suction causes loss of HCl and volume, leading to contraction alkalosis.',
    references: [
      'Galla JH. Metabolic alkalosis',
      'Palmer BF, et al. Metabolic alkalosis'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-026',
    question: 'A patient with COPD on home oxygen has ABG: pH 7.32, PCO2 68 mmHg, HCO3- 34 mEq/L, PO2 88 mmHg on 2L NC. What is the appropriate oxygen management?',
    options: [
      'Increase oxygen to improve PO2',
      'Continue current oxygen - appropriate for COPD',
      'Decrease oxygen to prevent CO2 retention',
      'Switch to high-flow nasal cannula'
    ],
    correctIndex: 1,
    explanation: 'PO2 88 mmHg provides adequate oxygen saturation (~95%) for COPD patients. Target PO2 is 60-70 mmHg (SaO2 90-92%) to avoid suppressing hypoxic drive. This represents stable compensated respiratory acidosis.',
    references: [
      'Global Initiative for Chronic Obstructive Lung Disease. Global Strategy for the Diagnosis, Management and Prevention of COPD',
      'O\'Driscoll BR, et al. BTS guideline for emergency oxygen use in adult patients'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-027',
    question: 'A patient presents with weakness and polyuria. ABG: pH 7.48, PCO2 44 mmHg, HCO3- 32 mEq/L, K+ 2.4 mEq/L. Urine chloride is 35 mEq/L. What is the most likely diagnosis?',
    options: [
      'Primary hyperaldosteronism',
      'Diuretic abuse',
      'Gitelman syndrome',
      'Hypovolemia from diarrhea'
    ],
    correctIndex: 0,
    explanation: 'Metabolic alkalosis with high urine chloride (>20 mEq/L) indicates chloride-resistant alkalosis. With severe hypokalemia and polyuria, primary hyperaldosteronism is most likely. Aldosterone causes potassium wasting and metabolic alkalosis.',
    references: [
      'Funder JW, et al. The Management of Primary Aldosteronism: Case Detection, Diagnosis, and Treatment',
      'Galla JH. Metabolic alkalosis'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-028',
    question: 'A patient with carbon monoxide poisoning has ABG: pH 7.40, PCO2 40 mmHg, HCO3- 24 mEq/L, PO2 110 mmHg, COHb 25%. What is the oxygen carrying capacity?',
    options: [
      'Normal - PO2 is adequate',
      'Reduced by 25% despite normal PO2',
      'Slightly reduced',
      'Cannot be determined'
    ],
    correctIndex: 1,
    explanation: 'COHb of 25% means 25% of hemoglobin is bound to CO and unavailable for oxygen transport. Despite normal PO2, oxygen carrying capacity is reduced by 25%. High-flow oxygen is needed to displace CO from hemoglobin.',
    references: [
      'Weaver LK, et al. Hyperbaric oxygen for acute carbon monoxide poisoning',
      'Hampson NB, et al. Practice recommendations in the diagnosis, management, and prevention of carbon monoxide poisoning'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-029',
    question: 'A patient with heart failure has ABG: pH 7.45, PCO2 32 mmHg, HCO3- 22 mEq/L, PO2 75 mmHg, lactate 3.8 mmol/L. What explains the normal bicarbonate with elevated lactate?',
    options: [
      'Laboratory error',
      'Concurrent metabolic alkalosis',
      'Acute lactic acidosis',
      'Chronic compensated acidosis'
    ],
    correctIndex: 1,
    explanation: 'Elevated lactate should cause metabolic acidosis, but HCO3- is normal. This suggests concurrent metabolic alkalosis (possibly from diuretics) masking the lactic acidosis. The net effect maintains normal bicarbonate levels.',
    references: [
      'Kraut JA, et al. Lactic acidosis',
      'Emmett M, et al. Clinical use of the anion gap'
    ],
    difficulty: 'hard',
    topicId: 'blood-gas-analysis'
  },
  {
    id: 'abg-030',
    question: 'A mechanically ventilated patient has ABG: pH 7.25, PCO2 80 mmHg, HCO3- 34 mEq/L, PO2 95 mmHg. The ventilator shows high peak pressures. What is the most likely problem?',
    options: [
      'Pneumothorax',
      'Ventilator malfunction',
      'Mucus plugging',
      'Patient-ventilator dyssynchrony'
    ],
    correctIndex: 2,
    explanation: 'High peak pressures with adequate oxygenation but poor ventilation (high PCO2) suggests airway obstruction, most commonly mucus plugging. This increases airway resistance while alveolar recruitment remains adequate for oxygenation.',
    references: [
      'Slutsky AS, et al. Ventilator-induced lung injury',
      'Tobin MJ. Principles and Practice of Mechanical Ventilation, 3rd Edition'
    ],
    difficulty: 'medium',
    topicId: 'blood-gas-analysis'
  }
];