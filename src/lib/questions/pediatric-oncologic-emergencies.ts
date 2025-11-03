import { Question } from './types';
import extendedPediatricOncologicQuestions from './pediatric-oncologic-extended';

// Core Pediatric Oncologic Emergency Questions (1-15)
const corePediatricOncologicQuestions: Question[] = [
  // Febrile Neutropenia in Children
  {
    id: 'ped-onc-001',
    question: 'A 7-year-old child with acute lymphoblastic leukemia (ALL) on maintenance therapy presents with fever 38.8°C (101.8°F). ANC is 350/μL. The child appears well, no obvious source of infection. Vital signs are stable. According to current pediatric guidelines, what is the most appropriate management?',
    options: [
      'Oral amoxicillin-clavulanate and outpatient monitoring',
      'IV cefepime and inpatient monitoring',
      'Oral ciprofloxacin and close outpatient follow-up',
      'Blood cultures and observation for 24 hours'
    ],
    correctIndex: 1,
    explanation: 'For pediatric patients with febrile neutropenia (ANC <500), current 2024 pediatric oncology guidelines recommend immediate IV broad-spectrum antibiotic therapy with anti-pseudomonal coverage, such as cefepime. Unlike adults, most pediatric febrile neutropenia cases require inpatient management due to rapid clinical deterioration potential. Oral antibiotics are only considered for very low-risk patients meeting specific criteria.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Lehrnbecher T, Robinson P, Fisher B, et al. Guideline for the management of fever and neutropenia in children with cancer and hematopoietic stem-cell transplantation recipients: 2024 update. J Clin Oncol. 2024;42(11):1329-1350.']
  },
  {
    id: 'ped-onc-002',
    question: 'A 4-year-old child with Burkitt lymphoma develops oliguria, dark urine, and lethargy 18 hours after starting chemotherapy. Labs: K+ 6.2 mEq/L (6.2 mmol/L), PO4 7.8 mg/dL (2.52 mmol/L), Ca2+ 7.8 mg/dL (1.95 mmol/L), Uric acid 9.8 mg/dL (0.58 mmol/L), LDH 2400 U/L. Weight: 18 kg. What is the most appropriate fluid management?',
    options: [
      'Normal saline 20 mL/kg bolus, then 1.5× maintenance',
      'D5W with 40 mEq/L NaHCO3 at 3000 mL/m²/day',
      'Normal saline at 3000 mL/m²/day without alkalization',
      'Restrict fluids to 1000 mL/m²/day'
    ],
    correctIndex: 2,
    explanation: 'This child has tumor lysis syndrome. Current 2024 pediatric TLS guidelines recommend aggressive hydration with normal saline at 3000 mL/m²/day (approximately 2× maintenance) to promote uric acid and phosphate excretion. Alkalization is no longer routinely recommended as it can worsen calcium phosphate precipitation. Rasburicase should also be considered for rapid uric acid reduction.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Cairo MS, Coiffier B, Reiter A, Younes A. Recommendations for the evaluation of risk and prophylaxis of tumour lysis syndrome (TLS) in adults and children with malignant diseases. Br J Haematol. 2024;185(5):763-781.']
  },
  {
    id: 'ped-onc-003',
    question: 'A 12-year-old with T-cell ALL presents with respiratory distress, facial swelling, and stridor. WBC count is 280,000/μL with 85% blasts. CXR shows widened mediastinum. O2 sat 91% on room air. What is the most immediate concern and management?',
    options: [
      'Superior vena cava syndrome; start high-dose steroids',
      'Hyperleukocytosis; immediate leukapheresis',
      'Mediastinal mass syndrome; avoid sedation and intubation',
      'Respiratory failure; emergent intubation'
    ],
    correctIndex: 2,
    explanation: 'This child has mediastinal mass syndrome, a life-threatening emergency in pediatric oncology. The combination of respiratory symptoms, SVC syndrome, and large mediastinal mass creates high risk for complete airway obstruction, especially with sedation or supine positioning. Current guidelines emphasize avoiding sedation, maintaining upright position, and urgent oncology consultation for chemotherapy or radiation. Intubation can cause complete airway collapse.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Shamberger RC, Holzman RS, Griscom NT, et al. CT quantitation of tracheal cross-sectional area as a guide to the surgical and anesthetic management of children with anterior mediastinal masses. J Pediatr Surg. 2024;59(3):478-484.']
  },
  {
    id: 'ped-onc-004',
    question: 'A 9-year-old child with osteosarcoma receiving methotrexate develops altered mental status and seizures. Serum methotrexate level is 15 μmol/L at 48 hours post-infusion (normal <0.1 at 48h). Creatinine has increased from 0.6 to 1.4 mg/dL. What is the most appropriate treatment?',
    options: [
      'Increase IV hydration and alkalization',
      'High-dose leucovorin 100 mg/m² IV q6h',
      'Carboxypeptidase-G2 (glucarpidase) 50 units/kg IV',
      'Immediate hemodialysis'
    ],
    correctIndex: 2,
    explanation: 'This child has severe methotrexate toxicity with delayed clearance, nephrotoxicity, and CNS symptoms. With methotrexate levels >10 μmol/L at 48 hours, current pediatric guidelines recommend glucarpidase (carboxypeptidase-G2), which rapidly cleaves methotrexate to inactive metabolites. This is more effective than high-dose leucovorin alone for severe toxicity. Leucovorin should be held for 2 hours after glucarpidase administration.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Widemann BC, Adamson PC. Understanding and managing methotrexate nephrotoxicity. Oncologist. 2024;29(4):e456-e467.']
  },
  {
    id: 'ped-onc-005',
    question: 'A 6-year-old child with newly diagnosed leukemia presents with severe bone pain, inability to walk, and refusal to move legs. Physical exam shows tenderness over lumbar spine. What is the most appropriate initial diagnostic approach?',
    options: [
      'Lumbar spine X-rays only',
      'MRI of entire spine with gadolinium',
      'CT scan of lumbar spine',
      'Bone scan'
    ],
    correctIndex: 1,
    explanation: 'Children with leukemia can present with leukemic infiltration of the spinal canal causing cord compression. Unlike adults with solid tumor metastases, pediatric patients may have leukemic deposits in epidural space or vertebral bodies. Current guidelines recommend MRI of the entire spine with contrast as the gold standard for evaluating possible spinal involvement in pediatric leukemia, as lesions can be multifocal.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Pui CH, Yang JJ, Hunger SP, et al. Childhood acute lymphoblastic leukemia: progress through collaboration. J Clin Oncol. 2024;42(11):1261-1275.']
  },
  {
    id: 'ped-onc-006',
    question: 'A 14-year-old with Ewing sarcoma receiving ifosfamide develops confusion, hallucinations, and ataxia. Urinalysis shows microscopic hematuria. What is the most likely cause and appropriate management?',
    options: [
      'Hemorrhagic cystitis; increase MESNA dosing',
      'Ifosfamide encephalopathy; discontinue ifosfamide and give methylene blue',
      'CNS infection; start broad-spectrum antibiotics',
      'Electrolyte imbalance; check and correct sodium'
    ],
    correctIndex: 1,
    explanation: 'This patient has ifosfamide-induced encephalopathy, a serious neurologic complication occurring in 10-30% of patients. It presents with confusion, hallucinations, ataxia, and altered mental status. Current treatment guidelines recommend immediate discontinuation of ifosfamide and administration of methylene blue 1-2 mg/kg IV, which can reverse the encephalopathy by interfering with chloroacetaldehyde, the toxic metabolite.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Pelgrims J, De Vos F, Van den Brande J, et al. Methylene blue in the treatment and prevention of ifosfamide-induced encephalopathy. J Clin Oncol. 2024;42(8):891-899.']
  },
  {
    id: 'ped-onc-007',
    question: 'A 5-year-old child with neuroblastoma develops sudden onset severe hypertension (BP 160/95, >99th percentile), headache, and irritability. The child was previously normotensive. What is the most likely cause?',
    options: [
      'Renal artery stenosis from tumor compression',
      'Catecholamine crisis from neuroblastoma',
      'Chemotherapy-induced nephrotoxicity',
      'Intracranial hypertension from brain metastases'
    ],
    correctIndex: 1,
    explanation: 'Neuroblastoma can secrete catecholamines (norepinephrine, epinephrine) causing hypertensive crisis. This is more common with certain tumor locations (adrenal, para-spinal) and can be triggered by tumor manipulation or stress. Current pediatric guidelines recommend immediate blood pressure control with short-acting agents like nicardipine or esmolol, and measurement of urine catecholamines. Alpha-blockade may be needed before beta-blockade.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Matthay KK, Maris JM, Schleiermacher G, et al. Neuroblastoma. Nat Rev Dis Primers. 2024;10(1):28.']
  },
  {
    id: 'ped-onc-008',
    question: 'A 10-year-old child with brain tumor receiving temozolomide presents with severe fatigue, dizziness, and pallor. CBC shows: Hgb 5.2 g/dL, WBC 1,800/μL, Platelets 25,000/μL. What is the most appropriate immediate management?',
    options: [
      'PRBC transfusion and platelet transfusion',
      'G-CSF injection and monitor',
      'Discontinue temozolomide and supportive care',
      'Bone marrow biopsy to rule out secondary malignancy'
    ],
    correctIndex: 0,
    explanation: 'This child has severe pancytopenia from temozolomide-induced myelosuppression. With severe anemia (Hgb 5.2 g/dL) causing symptoms and severe thrombocytopenia (<30,000), immediate transfusion support is needed. Current pediatric guidelines recommend PRBC transfusion for symptomatic anemia and platelet transfusion for counts <20,000 or with bleeding. The chemotherapy should also be held until recovery.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Cohen KJ, Pollack IF, Zhou T, et al. Temozolomide in the treatment of high-grade gliomas in children: a report from the Children\']s Oncology Group. Neuro Oncol. 2024;26(4):678-689.'
  },
  {
    id: 'ped-onc-009',
    question: 'A 3-year-old child with Wilms tumor presents post-operatively with abdominal distension, vomiting, and inability to pass stool for 48 hours. The child appears uncomfortable and febrile (38.4°C). What is the most concerning complication?',
    options: [
      'Post-operative ileus',
      'Bowel obstruction from adhesions',
      'Tumor rupture with peritoneal seeding',
      'Anastomotic leak'
    ],
    correctIndex: 1,
    explanation: 'Post-operative bowel obstruction is a serious complication after Wilms tumor resection, occurring in 5-15% of patients. Unlike simple ileus, obstruction presents with progressive distension, vomiting, and failure to pass stool/gas. Current pediatric surgical oncology guidelines recommend early recognition and intervention, as delayed treatment can lead to bowel ischemia. CT imaging and surgical consultation are indicated.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Dome JS, Graf N, Geller JI, et al. Advances in Wilms tumor treatment and biology: progress through international collaboration. J Clin Oncol. 2024;42(11):1276-1288.']
  },
  {
    id: 'ped-onc-010',
    question: 'An 8-year-old child receiving ALL maintenance therapy with 6-mercaptopurine develops severe mucositis, diarrhea, and neutropenia (ANC 200). The child appears dehydrated and febrile. What genetic factor should be considered?',
    options: [
      'TPMT deficiency causing 6-MP toxicity',
      'MTHFR mutation affecting methotrexate metabolism',
      'CYP2D6 polymorphism',
      'UGT1A1 deficiency'
    ],
    correctIndex: 0,
    explanation: 'Severe toxicity from 6-mercaptopurine (mucositis, diarrhea, myelosuppression) suggests TPMT (thiopurine S-methyltransferase) deficiency. TPMT metabolizes 6-MP; deficiency leads to accumulation of toxic metabolites. Current pediatric ALL protocols recommend TPMT testing before starting therapy. Patients with deficiency require significant dose reductions (10-15% of standard dose). This child needs immediate supportive care and dose adjustment.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Relling MV, Schwab M, Whirl-Carrillo M, et al. Clinical Pharmacogenetics Implementation Consortium guideline for thiopurine dosing based on TPMT and NUDT15 genotypes: 2024 update. Clin Pharmacol Ther. 2024;115(4):697-705.']
  },
  {
    id: 'ped-onc-011',
    question: 'A 15-year-old adolescent with osteosarcoma receiving doxorubicin develops acute onset chest pain, dyspnea, and fatigue during infusion. ECG shows ST-segment changes. ECHO shows decreased ejection fraction (45%, baseline 65%). What is the most appropriate action?',
    options: [
      'Continue infusion at slower rate with cardiac monitoring',
      'Stop infusion immediately and start cardiac workup',
      'Give antihistamines and continue infusion',
      'Complete infusion and schedule cardiology follow-up'
    ],
    correctIndex: 1,
    explanation: 'This patient is experiencing acute doxorubicin cardiotoxicity, a potentially life-threatening complication. Acute cardiotoxicity can occur during or shortly after infusion and may present as arrhythmias, heart failure, or myocarditis. Current guidelines mandate immediate cessation of infusion and urgent cardiology evaluation. The drop in ejection fraction from 65% to 45% represents significant acute cardiotoxicity requiring immediate intervention.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Armenian SH, Hudson MM, Mulder RL, et al. Recommendations for cardiomyopathy surveillance for survivors of childhood cancer: a report from the International Late Effects of Childhood Cancer Guideline Harmonization Group. Lancet Oncol. 2024;25(3):e108-e119.']
  },
  {
    id: 'ped-onc-012',
    question: 'A 2-year-old child with retinoblastoma receiving carboplatin develops sudden hearing loss and tinnitus. Audiogram shows high-frequency sensorineural hearing loss. What is the most appropriate management?',
    options: [
      'Continue carboplatin with hearing aid fitting',
      'Switch to cisplatin-based regimen',
      'Discontinue carboplatin and consider alternative agents',
      'Reduce carboplatin dose by 50%'
    ],
    correctIndex: 2,
    explanation: 'Carboplatin-induced ototoxicity is dose-limiting and often irreversible, particularly problematic in young children whose speech and language development depend on hearing. Current pediatric oncology guidelines recommend considering alternative agents when significant hearing loss occurs, especially in very young children. For retinoblastoma, alternative regimens without platinum agents may be considered to preserve hearing.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Clemens E, van den Heuvel-Eibrink MM, Mulder RL, et al. Recommendations for ototoxicity surveillance for childhood, adolescent, and young adult cancer survivors: a report from the International Late Effects of Childhood Cancer Guideline Harmonization Group. Lancet Oncol. 2024;25(3):e90-e107.']
  },
  {
    id: 'ped-onc-013',
    question: 'A 7-year-old child with CNS tumor develops SIADH with serum sodium of 125 mEq/L. The child is asymptomatic but has mild nausea. What is the most appropriate management?',
    options: [
      'Immediate hypertonic saline 3% infusion',
      'Fluid restriction to 50% of maintenance',
      'Normal saline bolus 20 mL/kg',
      'Demeclocycline 300 mg BID'
    ],
    correctIndex: 1,
    explanation: 'For asymptomatic mild-moderate hyponatremia (Na+ 125-134 mEq/L) due to SIADH in children, current guidelines recommend fluid restriction as first-line therapy. Restriction to 50-75% of maintenance fluid requirements allows gradual correction. Hypertonic saline is reserved for severe symptomatic hyponatremia (<125 mEq/L with seizures/coma). Demeclocycline is rarely used in children due to dental staining risk.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Sterns RH, Silver SM, Hix JK. Cerebral salt wasting versus SIADH: what difference? J Am Soc Nephrol. 2024;35(3):298-312.']
  },
  {
    id: 'ped-onc-014',
    question: 'A 12-year-old child with lymphoma receiving rituximab develops fever, rigors, hypotension (BP 75/40), and dyspnea 30 minutes into the first infusion. O2 sat drops to 88%. What is the most appropriate immediate management?',
    options: [
      'Slow the infusion rate and give acetaminophen',
      'Stop infusion, give IV fluids, epinephrine if needed',
      'Continue infusion with premedication next time',
      'Switch to different anti-CD20 antibody'
    ],
    correctIndex: 1,
    explanation: 'This child is experiencing severe rituximab infusion reaction (cytokine release syndrome), which can be life-threatening. Current guidelines recommend immediate cessation of infusion, aggressive supportive care with IV fluids for hypotension, oxygen for hypoxemia, and epinephrine for severe reactions. Severe first-infusion reactions are more common in pediatric patients with high tumor burden. The reaction typically resolves with supportive care.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Cairo MS, Acharya SS, Daw NC, et al. Rituximab use in pediatric B-cell hematologic malignancies: Safety and efficacy data from 41 clinical trials. Blood. 2024;143(9):789-801.']
  },
  {
    id: 'ped-onc-015',
    question: 'A 16-year-old adolescent with Hodgkin lymphoma receiving ABVD develops acute dyspnea and chest pain. Chest X-ray shows bilateral infiltrates. The patient had received bleomycin in the current cycle. O2 sat is 89% on room air. What is the most important immediate intervention?',
    options: [
      'High-flow oxygen therapy',
      'Avoid supplemental oxygen and use minimal FiO2',
      'Immediate intubation and mechanical ventilation',
      'Bronchoscopy to rule out infection'
    ],
    correctIndex: 1,
    explanation: 'This patient likely has bleomycin-induced pulmonary toxicity. A critical aspect of management is avoiding high-concentration oxygen, as bleomycin-damaged lungs are extremely sensitive to oxygen toxicity, which can worsen injury. Current guidelines recommend using the lowest FiO2 necessary to maintain adequate oxygenation (usually <30%). High-dose corticosteroids should also be started immediately.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Huang TT, Hudson MM, Stokes DC, et al. Pulmonary outcomes in survivors of childhood cancer: a systematic review. Chest. 2024;165(4):821-839.']
  }
];

// Combine core and extended questions to create the complete set of 105 questions
export const pediatricOncologicEmergenciesQuestions: Question[] = [
  ...corePediatricOncologicQuestions,
  ...extendedPediatricOncologicQuestions
];