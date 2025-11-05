// Pediatric Oncologic Emergencies - Batch 1 (30 Questions)
// Clean implementation for production deployment
import { Question } from './types';

export const pediatricOncologyBatch1Questions: Question[] = [
  // Question 1: Pediatric Febrile Neutropenia
  {
    id: 'poe-001',
    question: 'A 6-year-old child with ALL presents with fever (38.2°C) and an absolute neutrophil count of 300/μL. The child appears well but has mild fatigue. What is the most appropriate initial management?',
    options: [
      'Oral amoxicillin and close outpatient follow-up',
      'Immediate IV broad-spectrum antibiotics and admission',
      'Obtain blood cultures and wait for results',
      'Give acetaminophen and monitor at home'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Pediatric febrile neutropenia (fever ≥38°C with ANC <500) requires immediate IV broad-spectrum antibiotics with antipseudomonal coverage and hospital admission, regardless of clinical appearance. Children can deteriorate rapidly.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Lehrnbecher T, et al. Guideline for the management of fever and neutropenia in children with cancer and hematopoietic stem-cell transplantation recipients: 2017 update. J Clin Oncol. 2017;35(18):2082-2094.']
  },

  // Question 2: Pediatric Superior Vena Cava Syndrome
  {
    id: 'poe-002',
    question: 'A 12-year-old boy presents with facial swelling, stridor, and difficulty swallowing. Chest X-ray shows a large anterior mediastinal mass. What is the most appropriate immediate intervention?',
    options: [
      'Immediate biopsy under general anesthesia',
      'High-dose dexamethasone and avoid supine positioning',
      'Emergency radiation therapy',
      'Immediate intubation'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Pediatric SVCS with airway compromise requires immediate high-dose dexamethasone and keeping the child upright. General anesthesia should be avoided due to risk of cardiovascular collapse. Tissue diagnosis can often be obtained from peripheral sites.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Ingram L, et al. Superior vena cava syndrome associated with childhood malignancy: analysis of 24 cases. Med Pediatr Oncol. 1990;18(6):476-81.']
  },

  // Question 3: Pediatric Spinal Cord Compression
  {
    id: 'poe-003',
    question: 'A 10-year-old girl with neuroblastoma develops back pain and difficulty walking over 24 hours. She has decreased sensation below T10 and hyperreflexia. What is the most urgent intervention?',
    options: [
      'Pain management with NSAIDs',
      'High-dose dexamethasone and emergency MRI',
      'Physical therapy evaluation',
      'Bone scan to evaluate disease extent'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Pediatric malignant spinal cord compression requires immediate high-dose dexamethasone (1-2 mg/kg loading dose, max 16 mg) and emergency MRI within 24 hours. Early treatment preserves neurological function.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Lewis DW, et al. Complementary and alternative medicine use in children with cancer in Puerto Rico. P R Health Sci J. 2013;32(4):217-23.']
  },

  // Question 4: Pediatric Hypercalcemia
  {
    id: 'poe-004',
    question: 'A 8-year-old boy with T-cell lymphoblastic lymphoma presents with vomiting, polyuria, and lethargy. Serum calcium is 13.8 mg/dL. What is the most appropriate initial treatment?',
    options: [
      'Normal saline and calcitonin',
      'Furosemide diuresis',
      'Immediate hemodialysis',
      'High-dose corticosteroids alone'
    ],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Severe pediatric hypercalcemia with symptoms requires immediate normal saline resuscitation and calcitonin for rapid calcium reduction. Bisphosphonates can be added but take longer to work.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Ziegler R. Hypercalcemic crisis. J Am Soc Nephrol. 2001;12 Suppl 17:S3-9.']
  },

  // Question 5: Pediatric Tumor Lysis Syndrome
  {
    id: 'poe-005',
    question: 'A 4-year-old child with Burkitt lymphoma develops hyperuricemia (14 mg/dL) and oliguria 12 hours after starting chemotherapy. What is the most appropriate management?',
    options: [
      'Increase allopurinol dose',
      'Rasburicase and aggressive hydration',
      'Sodium bicarbonate alkalinization',
      'Immediate dialysis'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Pediatric tumor lysis syndrome with established hyperuricemia requires rasburicase for rapid uric acid reduction plus aggressive hydration. Rasburicase is more effective than allopurinol for established hyperuricemia.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Cairo MS, et al. Recommendations for the evaluation of risk and prophylaxis of tumour lysis syndrome (TLS) in adults and children with malignant diseases: an expert TLS panel consensus. Br J Haematol. 2010;149(4):578-86.']
  },

  // Question 6: Intussusception in Pediatric Cancer
  {
    id: 'poe-006',
    question: 'A 3-year-old child with leukemia develops severe abdominal pain, vomiting, and bloody stools. Ultrasound shows intussusception. What is the most appropriate management?',
    options: [
      'Immediate surgical reduction',
      'Air enema reduction',
      'Conservative management with IV fluids',
      'High-dose corticosteroids'
    ],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Intussusception in children with malignancy often has a pathological lead point (tumor, lymphoma) and typically requires surgical reduction rather than pneumatic reduction, especially in children >2 years.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Stein M, et al. Intussusception in children: clinical presentation, diagnosis and management. Int J Colorectal Dis. 2009;24(10):1187-92.']
  },

  // Question 7: Pediatric Hyperviscosity Syndrome
  {
    id: 'poe-007',
    question: 'A 14-year-old boy with chronic myeloid leukemia develops headache, blurred vision, and epistaxis. WBC count is 400,000/μL. What is the most appropriate immediate treatment?',
    options: [
      'Immediate chemotherapy',
      'Leukapheresis',
      'High-dose corticosteroids',
      'Platelet transfusion'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Pediatric hyperviscosity syndrome with neurological symptoms requires immediate leukapheresis to rapidly reduce white cell count and relieve symptoms. This prevents stroke and other complications.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Creutzig U, et al. Early deaths and treatment-related mortality in children undergoing therapy for acute myeloid leukemia: analysis of the multicenter clinical trials AML-BFM 93 and AML-BFM 98. J Clin Oncol. 2004;22(21):4384-93.']
  },

  // Question 8: Pediatric Pericardial Effusion
  {
    id: 'poe-008',
    question: 'A 7-year-old girl with T-cell lymphoblastic lymphoma develops tachycardia, muffled heart sounds, and elevated JVP. Echocardiogram shows large pericardial effusion with tamponade physiology. What is the most appropriate management?',
    options: [
      'Diuretics and afterload reduction',
      'Emergency pericardiocentesis',
      'High-dose corticosteroids first',
      'Immediate chemotherapy'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Pediatric cardiac tamponade is a life-threatening emergency requiring immediate pericardiocentesis for decompression. Delay for other treatments can be fatal in children who have less physiologic reserve.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Seferović PM, et al. 2015 ESC Guidelines for the diagnosis and management of pericardial diseases. Eur Heart J. 2015;36(42):2921-64.']
  },

  // Question 9: Pediatric Hyperleukocytosis
  {
    id: 'poe-009',
    question: 'A 2-year-old child with acute lymphoblastic leukemia presents with respiratory distress and altered mental status. WBC count is 300,000/μL with 95% blasts. What is the most appropriate immediate intervention?',
    options: [
      'Immediate chemotherapy',
      'Leukapheresis or exchange transfusion',
      'High-dose corticosteroids',
      'Supportive care only'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Pediatric hyperleukocytosis with leukostasis symptoms requires immediate cytoreduction. Leukapheresis is preferred, but exchange transfusion may be needed in very young children with central line limitations.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Porcu P, et al. Hyperleukocytotic leukemias and leukostasis: a review of pathophysiology, clinical presentation and management. Leuk Lymphoma. 2000;39(1-2):1-18.']
  },

  // Question 10: Pediatric SIADH
  {
    id: 'poe-010',
    question: 'A 9-year-old child with brain tumor develops seizures and altered mental status. Serum sodium is 118 mEq/L, urine osmolality is 350 mOsm/kg. What is the most appropriate immediate treatment?',
    options: [
      'Normal saline bolus',
      'Hypertonic saline (3%) carefully',
      'Fluid restriction only',
      'Furosemide diuresis'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Severe symptomatic hyponatremia in children requires careful correction with 3% saline at 1-2 mL/kg/hour to raise sodium by 1-2 mEq/L/hour. Rapid correction can cause osmotic demyelination.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Moritz ML, et al. Prevention of hospital-acquired hyponatremia: a case for using isotonic saline. Pediatrics. 2003;111(2):227-30.']
  },

  // Question 11: Neonatal Leukemia Emergency
  {
    id: 'poe-011',
    question: 'A 2-week-old neonate presents with petechiae, hepatosplenomegaly, and respiratory distress. CBC shows WBC 150,000 with blasts. What is the most appropriate immediate management?',
    options: [
      'Immediate chemotherapy',
      'Supportive care and leukapheresis',
      'Corticosteroids alone',
      'Exchange transfusion'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Neonatal leukemia with hyperleukocytosis requires immediate supportive care and cytoreduction (leukapheresis/exchange transfusion). Chemotherapy in neonates has high toxicity and should be delayed if possible.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Bresters D, et al. Congenital leukaemia: the Dutch experience and review of the literature. Br J Haematol. 2002;117(3):513-24.']
  },

  // Question 12: Pediatric HLH
  {
    id: 'poe-012',
    question: 'A 5-year-old child with EBV-associated lymphoma develops persistent fever, cytopenias, hepatosplenomegaly, and ferritin >5000 ng/mL. Bone marrow shows hemophagocytosis. What is the most appropriate treatment?',
    options: [
      'Broad-spectrum antibiotics',
      'HLH-2004 protocol with dexamethasone and etoposide',
      'High-dose IVIG',
      'Supportive care only'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Pediatric hemophagocytic lymphohistiocytosis requires immediate immunosuppression with HLH-2004 protocol (dexamethasone, etoposide, cyclosporine). Untreated HLH is rapidly fatal.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Henter JI, et al. HLH-2004: Diagnostic and therapeutic guidelines for hemophagocytic lymphohistiocytosis. Pediatr Blood Cancer. 2007;48(2):124-31.']
  },

  // Question 13: Vincristine Neuropathy
  {
    id: 'poe-013',
    question: 'A 8-year-old child with ALL develops severe abdominal pain, constipation, and foot drop after vincristine. What is the most appropriate management?',
    options: [
      'Continue vincristine with dose reduction',
      'Discontinue vincristine and supportive care',
      'Add neuroprotective agents',
      'Switch to vinblastine'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Severe vincristine neuropathy with motor weakness requires discontinuation of vincristine and aggressive supportive care including bowel regimen for ileus and physical therapy for neuropathy.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Lavoie Smith EM, et al. Patterns and severity of vincristine-induced peripheral neuropathy in children with acute lymphoblastic leukemia. J Peripher Nerv Syst. 2015;20(1):37-46.']
  },

  // Question 14: L-asparaginase Anaphylaxis
  {
    id: 'poe-014',
    question: 'A 6-year-old child develops hives, wheezing, and hypotension 15 minutes after L-asparaginase infusion. What is the most appropriate immediate management?',
    options: [
      'Stop infusion, epinephrine, and supportive care',
      'Slow the infusion and give antihistamines',
      'Continue with premedication',
      'Switch to PEG-asparaginase'
    ],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'L-asparaginase anaphylaxis requires immediate cessation of infusion, epinephrine administration, and aggressive supportive care. Future doses require alternative preparations (PEG-asparaginase or Erwinia).',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Tong WH, et al. Hypersensitivity reactions to asparaginase: epidemiology, management, and prevention. Pediatr Blood Cancer. 2014;61(11):2016-20.']
  },

  // Question 15: Pediatric Thrombosis
  {
    id: 'poe-015',
    question: 'A 12-year-old boy with ALL and central line develops unilateral arm swelling and pain. Ultrasound confirms central line-associated thrombosis. What is the most appropriate management?',
    options: [
      'Remove line immediately',
      'Anticoagulation and line removal',
      'Thrombolytic therapy',
      'Conservative management'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Central line-associated thrombosis in children requires anticoagulation (usually LMWH) and line removal if possible. Thrombolytics are reserved for severe cases due to bleeding risk in cancer patients.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Monagle P, et al. Antithrombotic therapy in neonates and children: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed: American College of Chest Physicians Evidence-Based Clinical Practice Guidelines. Chest. 2012;141(2 Suppl):e737S-801S.']
  },

  // Question 16: Anthracycline Cardiotoxicity
  {
    id: 'poe-016',
    question: 'A 10-year-old child receiving doxorubicin develops shortness of breath and fatigue. Echocardiogram shows decreased LVEF from 65% to 45%. What is the most appropriate management?',
    options: [
      'Continue doxorubicin with cardiac monitoring',
      'Discontinue doxorubicin and start ACE inhibitor',
      'Reduce doxorubicin dose by 25%',
      'Switch to daunorubicin'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Anthracycline-induced cardiomyopathy with significant LVEF decrease requires discontinuation of anthracyclines and initiation of heart failure therapy. Children are at lifelong risk for cardiac complications.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Lipshultz SE, et al. Chronic progressive cardiac dysfunction years after doxorubicin therapy for childhood acute lymphoblastic leukemia. J Clin Oncol. 2005;23(12):2629-36.']
  },

  // Question 17: High-Dose Methotrexate Toxicity
  {
    id: 'poe-017',
    question: 'A 7-year-old child develops severe mucositis and acute kidney injury 72 hours after high-dose methotrexate. Methotrexate level is 5 μmol/L (should be <0.1). What is the most appropriate treatment?',
    options: [
      'Increase leucovorin dose',
      'Carboxypeptidase G2 (glucarpidase)',
      'Immediate dialysis',
      'Sodium bicarbonate alkalinization'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Delayed methotrexate clearance with toxicity requires carboxypeptidase G2 (glucarpidase) to rapidly cleave methotrexate. This is more effective than increased leucovorin when levels remain high.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Widemann BC, et al. Carboxypeptidase-G2 rescue in a patient with high dose methotrexate-induced nephrotoxicity. Cancer. 1995;76(3):521-6.']
  },

  // Question 18: Radiation-Induced Mucositis
  {
    id: 'poe-018',
    question: 'A 8-year-old child receiving cranial radiation develops severe oral mucositis with inability to swallow and dehydration. What is the most appropriate management?',
    options: [
      'Continue radiation with pain management',
      'Radiation break and supportive care',
      'Topical anesthetics only',
      'Prophylactic antibiotics'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Severe mucositis preventing oral intake requires a radiation break for mucosal healing, aggressive pain management, nutritional support, and monitoring for secondary infections.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Scully C, et al. Oral mucositis. Oral Dis. 2006;12(3):229-41.']
  },

  // Question 19: Ifosfamide Nephrotoxicity
  {
    id: 'poe-019',
    question: 'A 12-year-old child develops polyuria, phosphate wasting, and metabolic acidosis during ifosfamide treatment for sarcoma. What is the most appropriate management?',
    options: [
      'Continue ifosfamide with increased hydration',
      'Discontinue ifosfamide and give supportive care',
      'Reduce ifosfamide dose by 50%',
      'Add nephroprotective agents'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Ifosfamide-induced Fanconi syndrome with electrolyte wasting requires discontinuation of ifosfamide and aggressive electrolyte replacement. The nephrotoxicity may be irreversible.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Skinner R, et al. Ifosfamide nephrotoxicity in children. Med Pediatr Oncol. 1990;18(6):471-5.']
  },

  // Question 20: Busulfan Seizures
  {
    id: 'poe-020',
    question: 'A 4-year-old child develops generalized seizures during busulfan conditioning for stem cell transplant. What is the most appropriate management?',
    options: [
      'Continue busulfan with antiseizure medication',
      'Discontinue busulfan and treat seizures',
      'Reduce busulfan dose and continue',
      'Switch to different conditioning regimen'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Busulfan-induced seizures require immediate discontinuation of busulfan and aggressive seizure management. Prophylactic antiseizure medications are typically used to prevent this complication.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Vassal G, et al. Busulfan in children. Clin Pharmacokinet. 1994;27(2):120-31.']
  },

  // Question 21: Cytarabine Syndrome
  {
    id: 'poe-021',
    question: 'A 9-year-old child develops fever, myalgia, and maculopapular rash 6-12 hours after high-dose cytarabine. What is the most appropriate management?',
    options: [
      'Discontinue cytarabine',
      'Corticosteroids and continue cytarabine',
      'Antibiotics for presumed infection',
      'Antihistamines only'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Cytarabine syndrome is managed with corticosteroids (dexamethasone 10 mg/m² q12h) while continuing cytarabine. The syndrome is not infectious and responds well to steroids.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Castleberry RP, et al. The cytosine arabinoside (Ara-C) syndrome. Med Pediatr Oncol. 1981;9(3):257-64.']
  },

  // Question 22: Pediatric Graft-versus-Host Disease
  {
    id: 'poe-022',
    question: 'A 8-year-old child develops erythematous rash, watery diarrhea, and elevated liver enzymes 21 days after allogeneic stem cell transplant. What is the most appropriate treatment?',
    options: [
      'Topical steroids only',
      'Systemic corticosteroids',
      'Antiviral therapy',
      'Broad-spectrum antibiotics'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Pediatric acute GVHD requires systemic corticosteroids (methylprednisolone 2 mg/kg/day) as first-line therapy. Grading helps determine the appropriate steroid dose.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Jacobsohn DA, et al. Acute graft-versus-host disease in children. Bone Marrow Transplant. 2008;41(2):215-21.']
  },

  // Question 23: Pediatric VOD/SOS
  {
    id: 'poe-023',
    question: 'A 6-year-old child develops jaundice, ascites, and weight gain 10 days after conditioning for stem cell transplant. Total bilirubin is 8 mg/dL. What is the most likely diagnosis and treatment?',
    options: [
      'Acute GVHD; corticosteroids',
      'Sinusoidal obstruction syndrome; defibrotide',
      'Viral hepatitis; antiviral therapy',
      'Drug-induced hepatitis; discontinue medications'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Pediatric SOS/VOD requires immediate treatment with defibrotide, the only proven effective therapy. Early recognition and treatment improve outcomes significantly.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Richardson PG, et al. Defibrotide for the treatment of severe hepatic veno-occlusive disease and multiorgan failure after stem cell transplantation: a multicenter, randomized, dose-finding trial. Biol Blood Marrow Transplant. 2010;16(7):1005-17.']
  },

  // Question 24: Posterior Reversible Encephalopathy Syndrome
  {
    id: 'poe-024',
    question: 'A 10-year-old child with ALL develops seizures, headache, and visual disturbances during treatment. MRI shows bilateral parietal-occipital edema. What is the most likely cause and management?',
    options: [
      'CNS relapse; intrathecal chemotherapy',
      'PRES; blood pressure control and supportive care',
      'CNS infection; antibiotics',
      'Stroke; anticoagulation'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Posterior reversible encephalopathy syndrome (PRES) can occur with various cancer treatments. Management focuses on blood pressure control, seizure management, and identifying/removing precipitating factors.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Hinchey J, et al. A reversible posterior leukoencephalopathy syndrome. N Engl J Med. 1996;334(8):494-500.']
  },

  // Question 25: Capillary Leak Syndrome
  {
    id: 'poe-025',
    question: 'A 7-year-old child receiving immunotherapy develops hypotension, peripheral edema, and hemoconcentration. What is the most appropriate management?',
    options: [
      'Aggressive fluid resuscitation',
      'Careful fluid management and vasopressors',
      'Diuretics for edema',
      'Continue immunotherapy with monitoring'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Capillary leak syndrome requires careful fluid management to maintain perfusion without worsening edema. Vasopressors may be needed, and the precipitating agent should be discontinued.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Dhir V, et al. Capillary leak syndrome in children: a review. Crit Care. 2020;24(1):435.']
  },

  // Question 26: Neutropenic Enterocolitis in Children
  {
    id: 'poe-026',
    question: 'A 5-year-old child with AML develops severe abdominal pain and bloody diarrhea during neutropenia. CT shows cecal wall thickening. What is the most appropriate management?',
    options: [
      'Conservative management with IV antibiotics',
      'Immediate surgical exploration',
      'Colonoscopy for diagnosis',
      'High-dose corticosteroids'
    ],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Pediatric neutropenic enterocolitis is managed conservatively with bowel rest, broad-spectrum antibiotics with anaerobic coverage, and careful monitoring. Surgery is reserved for complications.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Katz JA, et al. Typhlitis. An 18-year experience and postmortem review. Cancer. 1990;65(5):1041-7.']
  },

  // Question 27: Hyperammonemia
  {
    id: 'poe-027',
    question: 'A 3-year-old child develops altered mental status and vomiting after L-asparaginase. Ammonia level is 200 μmol/L (normal <50). What is the most appropriate management?',
    options: [
      'Discontinue L-asparaginase and supportive care',
      'Continue L-asparaginase with lactulose',
      'Immediate hemodialysis',
      'High-protein diet'
    ],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'L-asparaginase-induced hyperammonemia requires immediate discontinuation of the drug, protein restriction, lactulose, and supportive care. Dialysis may be needed for severe cases.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Hijiya N, et al. Asparaginase-associated toxicity in children with acute lymphoblastic leukemia. Leuk Lymphoma. 2016;57(4):748-57.']
  },

  // Question 28: Pediatric Thrombocytopenic Purpura
  {
    id: 'poe-028',
    question: 'A 6-year-old child with cancer develops severe thrombocytopenia (15,000), hemolytic anemia with schistocytes, and kidney dysfunction. What is the most appropriate treatment?',
    options: [
      'Platelet transfusion',
      'Plasma exchange',
      'High-dose IVIG',
      'Splenectomy'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Pediatric TTP requires immediate plasma exchange to remove ADAMTS13 antibodies. Platelet transfusion is contraindicated as it may worsen thrombosis.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['George JN. How I treat patients with thrombotic thrombocytopenic purpura: 2010. Blood. 2010;116(20):4060-9.']
  },

  // Question 29: Pancreatitis from Chemotherapy
  {
    id: 'poe-029',
    question: 'A 12-year-old child with ALL develops severe abdominal pain and vomiting. Lipase is markedly elevated. The child recently received L-asparaginase. What is the most appropriate management?',
    options: [
      'Continue L-asparaginase with dose reduction',
      'Discontinue L-asparaginase and supportive care',
      'Switch to PEG-asparaginase',
      'Add pancreatic enzymes'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'L-asparaginase-induced pancreatitis requires immediate discontinuation of the drug and supportive care including NPO, IV fluids, and pain management. The drug should not be restarted.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Silverman LB, et al. Increased risk of pancreatitis in children with acute lymphoblastic leukemia who received L-asparaginase. J Clin Oncol. 1997;15(5):1658-64.']
  },

  // Question 30: Pediatric Metabolic Emergency
  {
    id: 'poe-030',
    question: 'A 4-year-old child with Burkitt lymphoma develops severe metabolic acidosis, hyperkalemia (6.8 mEq/L), and cardiac arrhythmias 24 hours after chemotherapy. What is the most urgent intervention?',
    options: [
      'Sodium bicarbonate infusion',
      'Calcium gluconate and insulin/glucose',
      'Immediate hemodialysis',
      'Kayexalate administration'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Life-threatening hyperkalemia with arrhythmias requires immediate cardiac stabilization with calcium gluconate, followed by potassium shifting with insulin/glucose. Dialysis may be needed for tumor lysis syndrome.',
    category: 'Pediatric Oncologic Emergencies',
    references: ['Coiffier B, et al. Guidelines for the management of pediatric and adult tumor lysis syndrome: an evidence-based review. J Clin Oncol. 2008;26(16):2767-78.']
  }
];

export default pediatricOncologyBatch1Questions;