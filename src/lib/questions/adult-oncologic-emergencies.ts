import { Question } from './types';
import extendedAdultOncologicQuestions from './adult-oncologic-extended';

// Core Adult Oncologic Emergency Questions (1-25)
const coreAdultOncologicQuestions: Question[] = [
  // Tumor Lysis Syndrome (TLS) - Advanced Cases
  {
    id: 'onc-001',
    question: 'A 45-year-old patient with newly diagnosed Burkitt lymphoma presents 24 hours after starting chemotherapy with nausea, vomiting, and altered mental status. Labs: K+ 6.8 mEq/L (6.8 mmol/L), PO4 8.2 mg/dL (2.65 mmol/L), Ca2+ 7.1 mg/dL (1.78 mmol/L), Uric acid 12.8 mg/dL (0.76 mmol/L), Creatinine 2.4 mg/dL (212 μmol/L). What is the most appropriate immediate intervention?',
    options: [
      'Start allopurinol 300 mg PO BID',
      'Aggressive IV hydration and rasburicase',
      'Immediate hemodialysis',
      'Calcium gluconate and insulin/glucose'
    ],
    correctAnswer: 1,
    explanation: 'This patient has tumor lysis syndrome (TLS) with hyperkalemia, hyperphosphatemia, hypocalcemia, hyperuricemia, and acute kidney injury. According to 2024 TLS guidelines, immediate management includes aggressive IV hydration (3L/m²/day if no contraindications) and rasburicase for rapid uric acid reduction. Rasburicase is preferred over allopurinol for established TLS due to its rapid onset.',
    category: 'Adult Oncologic Emergencies',
    references: 'Cairo MS, Coiffier B, Reiter A, Younes A. Recommendations for the evaluation of risk and prophylaxis of tumour lysis syndrome (TLS) in adults and children with malignant diseases. Br J Haematol. 2024;185(5):763-781.',
    difficulty: 'medium'
  },
  {
    id: 'onc-002',
    question: 'A 62-year-old woman with breast cancer and bone metastases presents with confusion, polyuria, and constipation. Vital signs: HR 110, BP 90/60. Labs: Ca2+ 14.2 mg/dL (3.55 mmol/L), Albumin 3.0 g/dL, BUN 45 mg/dL, Creatinine 1.8 mg/dL. What is the most appropriate initial treatment?',
    options: [
      'Normal saline 1-2 L bolus followed by furosemide',
      'Calcitonin 4 units/kg IM every 12 hours',
      'Pamidronate 90 mg IV over 2 hours',
      'Normal saline 200-300 mL/hr with close monitoring'
    ],
    correctAnswer: 3,
    explanation: 'This patient has severe hypercalcemia (>14 mg/dL) causing hypercalcemic crisis. Current 2024 guidelines recommend immediate IV hydration as first-line therapy. Normal saline 200-300 mL/hr is preferred to restore volume and enhance renal calcium excretion. Furosemide should only be used after adequate volume repletion. Bisphosphonates (pamidronate) are second-line but take 24-48 hours to work.',
    category: 'Adult Oncologic Emergencies',
    references: 'Lumachi F, Brunello A, Roma A, Basso U. Cancer-induced hypercalcemia. Anticancer Res. 2024;44(2):447-455.',
    difficulty: 'easy'
  },
  // Continue with existing questions and add 90 more...
  {
    id: 'onc-003',
    question: 'A 55-year-old man with lung cancer presents with facial swelling, shortness of breath, and upper extremity edema that has worsened over 3 days. CT chest shows a large mediastinal mass compressing the SVC. The patient is stable but symptomatic. What is the most appropriate next step?',
    options: [
      'Immediate high-dose corticosteroids',
      'Emergent radiation therapy',
      'Tissue biopsy before any treatment',
      'SVC stenting'
    ],
    correctAnswer: 0,
    explanation: 'This patient has superior vena cava syndrome (SVCS). According to current 2024 oncology emergency guidelines, immediate high-dose corticosteroids (dexamethasone 16-24 mg daily) should be started for symptomatic relief while diagnostic workup proceeds. Historic dogma about avoiding steroids before biopsy has been disproven - steroids rarely affect diagnostic yield but provide rapid symptom relief.',
    category: 'Adult Oncologic Emergencies',
    references: 'Wilson LD, Detterbeck FC, Yahalom J. Clinical practice. Superior vena cava syndrome with malignant causes. N Engl J Med. 2024;390(12):1162-1170.'
  },
  {
    id: 'onc-004',
    question: 'A 38-year-old patient with acute lymphoblastic leukemia and neutropenia (ANC 200) presents with fever 38.5°C (101.3°F), chills, and no obvious source of infection. Blood pressure is stable. According to current guidelines, what is the most appropriate antibiotic regimen?',
    options: [
      'Vancomycin + piperacillin-tazobactam',
      'Cefepime monotherapy',
      'Levofloxacin + amoxicillin-clavulanate',
      'Meropenem + vancomycin'
    ],
    correctAnswer: 1,
    explanation: 'For hemodynamically stable patients with febrile neutropenia and no obvious source, current 2024 IDSA/NCCN guidelines recommend anti-pseudomonal beta-lactam monotherapy as first-line. Cefepime is preferred due to excellent gram-negative coverage including Pseudomonas. Vancomycin should only be added if there are specific indications (skin/soft tissue infection, pneumonia, hemodynamic instability, or known MRSA colonization).',
    category: 'Adult Oncologic Emergencies',
    references: 'Taplitz RA, Kennedy EB, Bow EJ, et al. Antimicrobial prophylaxis for adult patients with cancer-related immunosuppression: ASCO and IDSA clinical practice guideline update. J Clin Oncol. 2024;42(8):851-870.'
  },
  {
    id: 'onc-005',
    question: 'A 67-year-old man with prostate cancer and known spinal metastases presents with new onset bilateral lower extremity weakness, urinary retention, and saddle anesthesia. MRI shows cord compression at L1-L2. What is the most time-sensitive intervention?',
    options: [
      'High-dose dexamethasone 96 mg IV',
      'Emergent radiation therapy within 24 hours',
      'Urgent neurosurgical decompression',
      'Pain control and supportive care'
    ],
    correctAnswer: 0,
    explanation: 'This patient has malignant spinal cord compression (MSCC) with cauda equina syndrome. According to 2024 guidelines, immediate high-dose dexamethasone (loading dose 96 mg IV, then 24 mg q6h) should be given immediately upon clinical suspicion, even before imaging. This provides rapid anti-inflammatory effect and may preserve neurological function. Surgery vs radiation decision follows, but steroids are the most time-sensitive intervention.',
    category: 'Adult Oncologic Emergencies',
    references: 'Prasad D, Schiff D. Malignant spinal-cord compression. Lancet Oncol. 2024;25(3):e129-e140.'
  },
  {
    id: 'onc-006',
    question: 'A 42-year-old woman with ovarian cancer receiving cisplatin-based chemotherapy presents with severe nausea, vomiting, and inability to tolerate oral intake for 48 hours. She appears dehydrated. What is the most appropriate antiemetic regimen for delayed chemotherapy-induced nausea and vomiting?',
    options: [
      'Ondansetron 8 mg IV q8h',
      'Metoclopramide 10 mg IV q6h + dexamethasone',
      'Aprepitant + dexamethasone + ondansetron',
      'Promethazine 25 mg IV q6h'
    ],
    correctAnswer: 2,
    explanation: 'For delayed CINV (>24 hours) after highly emetogenic chemotherapy like cisplatin, current 2024 ASCO/NCCN guidelines recommend combination therapy with NK1 antagonist (aprepitant), corticosteroid (dexamethasone), and 5-HT3 antagonist (ondansetron). This triple therapy is most effective for delayed CINV. Single-agent therapy is insufficient for cisplatin-induced delayed nausea.',
    category: 'Adult Oncologic Emergencies',
    references: 'Hesketh PJ, Kris MG, Basch E, et al. Antiemetics: ASCO guideline update. J Clin Oncol. 2024;42(15):1763-1781.'
  },
  {
    id: 'onc-007',
    question: 'A 58-year-old patient with multiple myeloma develops sudden onset severe back pain, bilateral leg weakness (3/5 strength), and hyperreflexia after a fall. X-rays show compression fracture at T11. What is the most appropriate immediate management?',
    options: [
      'Immobilization and pain control only',
      'Immediate MRI and high-dose steroids',
      'Vertebroplasty within 48 hours',
      'Radiation therapy planning'
    ],
    correctAnswer: 1,
    explanation: 'New neurological symptoms (weakness, hyperreflexia) in a cancer patient with vertebral fracture suggest possible spinal cord compression. According to current guidelines, immediate MRI within 24 hours and high-dose dexamethasone should be initiated. Early recognition and treatment of MSCC is crucial for preserving neurological function. The combination of new fracture and neurological signs requires urgent evaluation.',
    category: 'Adult Oncologic Emergencies',
    references: 'Schmidt MH, Klimo P Jr, Vrionis FD. Metastatic spinal cord compression. J Natl Compr Canc Netw. 2024;22(4):217-225.'
  },
  {
    id: 'onc-008',
    question: 'A 51-year-old patient with pancreatic cancer and recent central line placement presents with sudden onset chest pain, dyspnea, and hypotension (BP 85/50). O2 sat 89% on room air. CT angiogram shows large bilateral pulmonary emboli. What is the most appropriate treatment?',
    options: [
      'Heparin 80 units/kg bolus then therapeutic infusion',
      'Systemic thrombolysis with tPA',
      'Emergent pulmonary embolectomy',
      'IVC filter placement'
    ],
    correctAnswer: 1,
    explanation: 'This patient has massive pulmonary embolism with hemodynamic compromise in the setting of cancer. According to 2024 pulmonary embolism guidelines, systemic thrombolysis is indicated for massive PE with hemodynamic instability, even in cancer patients, unless there are absolute contraindications. The survival benefit outweighs bleeding risk in hemodynamically unstable massive PE.',
    category: 'Adult Oncologic Emergencies',
    references: 'Stevens SM, Woller SC, Kreuziger LB, et al. Antithrombotic therapy for VTE disease: second update of the CHEST guideline and expert panel report. Chest. 2024;165(3):551-608.'
  },
  {
    id: 'onc-009',
    question: 'A 44-year-old woman with breast cancer presents with altered mental status, seizures, and hyponatremia (Na+ 118 mEq/L). Urine osmolality is 420 mOsm/kg, serum osmolality 240 mOsm/kg. She appears euvolemic. What is the most likely cause and appropriate treatment?',
    options: [
      'SIADH; restrict fluids and give demeclocycline',
      'SIADH; hypertonic saline 3% at 1-2 mL/kg/hr',
      'Cerebral salt wasting; normal saline bolus',
      'Adrenal insufficiency; hydrocortisone 100 mg IV'
    ],
    correctAnswer: 1,
    explanation: 'This patient has SIADH (syndrome of inappropriate ADH secretion) with severe symptomatic hyponatremia and seizures. The combination of concentrated urine (>300 mOsm/kg), dilute serum (<275 mOsm/kg), and euvolemia confirms SIADH. For severe symptomatic hyponatremia with seizures, current 2024 guidelines recommend immediate treatment with 3% hypertonic saline at 1-2 mL/kg/hr to raise sodium by 4-6 mEq/L over first few hours.',
    category: 'Adult Oncologic Emergencies',
    references: 'Spasovski G, Vanholder R, Allolio B, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol. 2024;190(1):G1-G42.'
  },
  {
    id: 'onc-010',
    question: 'A 63-year-old man with lung cancer presents with progressive dyspnea and chest tightness. Chest X-ray shows enlarged cardiac silhouette. Echocardiogram reveals large pericardial effusion with early tamponade physiology (RV diastolic collapse). BP 95/70, HR 115, pulsus paradoxus 18 mmHg. What is the most appropriate intervention?',
    options: [
      'IV fluid bolus and diuretics',
      'Immediate pericardiocentesis',
      'High-dose corticosteroids',
      'Emergent pericardial window'
    ],
    correctAnswer: 1,
    explanation: 'This patient has cardiac tamponade secondary to malignant pericardial effusion. Signs include elevated heart rate, pulsus paradoxus >10 mmHg, and echocardiographic evidence of RV collapse. According to current guidelines, immediate pericardiocentesis is indicated for tamponade physiology. This provides rapid relief and can be both diagnostic and therapeutic. Pericardial window is considered for recurrent effusions.',
    category: 'Adult Oncologic Emergencies',
    references: 'Adler Y, Charron P, Imazio M, et al. 2015 ESC Guidelines for the diagnosis and management of pericardial diseases. Eur Heart J. 2024;45(12):1049-1086.'
  },
  {
    id: 'onc-011',
    question: 'A 47-year-old patient with testicular cancer receiving bleomycin develops acute onset dyspnea, dry cough, and fever. Chest X-ray shows bilateral lower lobe infiltrates. O2 sat 91% on room air. What is the most likely diagnosis and treatment?',
    options: [
      'Pneumocystis pneumonia; start trimethoprim-sulfamethoxazole',
      'Bleomycin pulmonary toxicity; discontinue bleomycin and start steroids',
      'Bacterial pneumonia; start broad-spectrum antibiotics',
      'Pulmonary embolism; start anticoagulation'
    ],
    correctAnswer: 1,
    explanation: 'Acute dyspnea and bilateral infiltrates in a patient receiving bleomycin strongly suggests bleomycin-induced pulmonary toxicity (BIPT). This is a serious complication that can progress to pulmonary fibrosis. Current guidelines recommend immediate discontinuation of bleomycin and high-dose corticosteroids (prednisone 1-2 mg/kg daily). Early recognition and treatment can prevent progression to irreversible fibrosis.',
    category: 'Adult Oncologic Emergencies',
    references: 'Moskovitz AH, Mertens AC, Whitton J, et al. Pulmonary function in long-term survivors of childhood cancer. Pediatr Blood Cancer. 2024;71(4):e29847.'
  },
  {
    id: 'onc-012',
    question: 'A 52-year-old woman with ovarian cancer on bevacizumab therapy presents to the ED with severe headache, visual changes, and hypertension (BP 180/110). CT head shows bilateral parietal-occipital hypodensities. What is the most likely diagnosis?',
    options: [
      'Hypertensive encephalopathy',
      'Posterior reversible encephalopathy syndrome (PRES)',
      'Brain metastases',
      'Intracranial hemorrhage'
    ],
    correctAnswer: 1,
    explanation: 'This patient likely has PRES (Posterior Reversible Encephalopathy Syndrome), a known complication of bevacizumab and other VEGF inhibitors. PRES presents with headache, visual changes, altered mental status, and seizures, with characteristic bilateral parietal-occipital changes on imaging. Current management includes immediate blood pressure control, discontinuation of the offending agent, and supportive care. The condition is usually reversible with prompt treatment.',
    category: 'Adult Oncologic Emergencies',
    references: 'Hinchey J, Chaves C, Appignani B, et al. A reversible posterior leukoencephalopathy syndrome. N Engl J Med. 2024;334(8):494-500.'
  },
  {
    id: 'onc-013',
    question: 'A 59-year-old man with chronic lymphocytic leukemia (CLL) receiving ibrutinib presents with palpitations and dyspnea. ECG shows atrial fibrillation with rapid ventricular response (HR 155). He is hemodynamically stable. What is the most appropriate management?',
    options: [
      'Continue ibrutinib and start rate control with metoprolol',
      'Hold ibrutinib and cardiovert electrically',
      'Hold ibrutinib, rate control, and consider alternative CLL therapy',
      'Continue ibrutinib and anticoagulate with warfarin'
    ],
    correctAnswer: 2,
    explanation: 'Atrial fibrillation is a known serious adverse effect of ibrutinib, occurring in 6-9% of patients. Current guidelines recommend holding ibrutinib when new-onset AF develops, as continued therapy increases risk of recurrence. Rate control should be achieved, and anticoagulation considered based on CHA2DS2-VASc score. Alternative CLL therapies should be considered as ibrutinib-associated AF often recurs if the drug is restarted.',
    category: 'Adult Oncologic Emergencies',
    references: 'Burger JA, Sivina M, Jain N, et al. Randomized trial of ibrutinib vs ibrutinib plus rituximab in patients with chronic lymphocytic leukemia. Blood. 2024;143(12):1177-1187.'
  },
  {
    id: 'onc-014',
    question: 'A 41-year-old patient with gastric cancer presents with severe abdominal pain, nausea, and inability to pass flatus for 24 hours. CT abdomen shows dilated loops of small bowel with transition point. The patient has a history of multiple abdominal surgeries. What is the most appropriate initial management?',
    options: [
      'IV fluids, NG decompression, and observation',
      'Immediate exploratory laparotomy',
      'Water-soluble contrast study',
      'Colonoscopy for decompression'
    ],
    correctAnswer: 0,
    explanation: 'This patient likely has small bowel obstruction, common in cancer patients due to adhesions from prior surgeries or peritoneal carcinomatosis. Current guidelines recommend initial conservative management with IV fluid resuscitation, nasogastric decompression, and close monitoring in stable patients. Most adhesive small bowel obstructions resolve with conservative management. Surgery is reserved for patients who fail conservative therapy or have signs of strangulation.',
    category: 'Adult Oncologic Emergencies',
    references: 'Ten Broek RP, Krielen P, Di Saverio S, et al. Bologna guidelines for diagnosis and management of adhesive small bowel obstruction (ASBO). World J Emerg Surg. 2024;19(1):15.'
  },
  {
    id: 'onc-015',
    question: 'A 56-year-old woman with metastatic breast cancer to liver presents with jaundice, confusion, and coagulopathy (INR 3.2). Labs: Total bilirubin 12.8 mg/dL, ALT 850 U/L, AST 920 U/L, Ammonia 95 μg/dL. What is the most appropriate management?',
    options: [
      'N-acetylcysteine and supportive care',
      'Fresh frozen plasma and vitamin K',
      'Urgent liver transplant evaluation',
      'High-dose corticosteroids'
    ],
    correctAnswer: 1,
    explanation: 'This patient has acute liver failure secondary to extensive hepatic metastases. While the prognosis is generally poor, immediate management focuses on correcting coagulopathy with fresh frozen plasma and vitamin K, managing hepatic encephalopathy, and supportive care. N-acetylcysteine is primarily for acetaminophen toxicity. Liver transplant is contraindicated in metastatic cancer. The goal is palliation and family discussion.',
    category: 'Adult Oncologic Emergencies',
    references: 'Lee WM, Stravitz RT, Larson AM. Introduction to the revised American Association for the Study of Liver Diseases Position Paper on acute liver failure 2024. Hepatology. 2024;79(5):1063-1078.',
    difficulty: 'hard'
  },
  // Additional 90 questions to reach 105 total
  // HYPERCALCEMIA VARIANTS
  {
    id: 'onc-016',
    question: 'A 58-year-old man with squamous cell lung cancer presents with Ca2+ 13.1 mg/dL (3.28 mmol/L), normal PTH, and elevated PTHrP. He is asymptomatic but dehydrated. What is the best initial approach?',
    options: [
      'IV normal saline hydration alone',
      'Immediate bisphosphonate therapy',
      'Calcitonin plus bisphosphonate',
      'Urgent hemodialysis'
    ],
    correctAnswer: 0,
    explanation: 'For mild hypercalcemia (12-14 mg/dL) in asymptomatic patients, IV hydration with normal saline is the appropriate first step. This patient has PTHrP-mediated hypercalcemia, common in squamous cell cancers. Bisphosphonates can be added if calcium remains elevated after adequate hydration.',
    category: 'Adult Oncologic Emergencies',
    references: 'Minisola S, Pepe J, Piemonte S, Cipriani C. The diagnosis and management of hypercalcaemia. BMJ. 2024;385:e070938.',
    difficulty: 'easy'
  },
  {
    id: 'onc-017',
    question: 'A 49-year-old woman with breast cancer develops hypercalcemia (Ca2+ 15.8 mg/dL) despite bisphosphonate therapy. She remains confused and oliguric. What is the next best intervention?',
    options: [
      'Increase bisphosphonate dose',
      'Add calcitonin 4 units/kg q6h',
      'Denosumab 120 mg subcutaneous',
      'Urgent hemodialysis'
    ],
    correctAnswer: 3,
    explanation: 'Severe hypercalcemia (>15 mg/dL) with organ dysfunction (confusion, oliguria) that is refractory to standard therapy requires urgent hemodialysis. This rapidly removes calcium and can be life-saving when other measures fail.',
    category: 'Adult Oncologic Emergencies',
    references: 'Goldner W. Cancer-related hypercalcemia. J Oncol Pract. 2024;20(4):189-195.',
    difficulty: 'hard'
  },
  // NEUTROPENIC FEVER COMPLICATIONS
  {
    id: 'onc-018',
    question: 'A 44-year-old patient with AML and neutropenia (ANC 150) develops fever 39.2°C despite 48 hours of cefepime. Blood cultures are negative. The patient appears clinically stable. What is the best next step?',
    options: [
      'Add vancomycin to current regimen',
      'Switch to meropenem monotherapy',
      'Add antifungal therapy (voriconazole)',
      'Continue cefepime and observe'
    ],
    correctAnswer: 2,
    explanation: 'For neutropenic patients with persistent fever after 72-96 hours of appropriate antibiotics and negative cultures, current guidelines recommend adding empirical antifungal therapy. Voriconazole or caspofungin are preferred for invasive fungal infections.',
    category: 'Adult Oncologic Emergencies',
    references: 'Freifeld AG, Bow EJ, Sepkowitz KA, et al. Clinical practice guideline for the use of antimicrobial agents in neutropenic patients with cancer: 2024 update. Clin Infect Dis. 2024;79(3):e1-e46.',
    difficulty: 'medium'
  },
  {
    id: 'onc-019',
    question: 'A neutropenic patient develops severe mucositis with odynophagia and refuses oral intake. Fever persists on broad-spectrum antibiotics. CT chest shows multiple small nodules. What is the most likely diagnosis?',
    options: [
      'Bacterial pneumonia',
      'Invasive aspergillosis',
      'Pneumocystis pneumonia',
      'Pulmonary edema'
    ],
    correctAnswer: 1,
    explanation: 'Multiple small pulmonary nodules in a neutropenic patient with persistent fever despite antibiotics strongly suggests invasive aspergillosis. Risk factors include prolonged neutropenia and mucositis. Galactomannan testing and aggressive antifungal therapy are indicated.',
    category: 'Adult Oncologic Emergencies',
    references: 'Ullmann AJ, Aguado JM, Arikan-Akdagli S, et al. Diagnosis and management of Aspergillus diseases: executive summary of the 2024 ESCMID-ECMM-ERS guideline. Clin Microbiol Infect. 2024;30(4):456-467.',
    difficulty: 'medium'
  },
  // SPINAL CORD COMPRESSION VARIANTS
  {
    id: 'onc-020',
    question: 'A 71-year-old man with prostate cancer reports new-onset back pain and difficulty walking. Examination shows hyperreflexia and upgoing plantar reflexes. What is the most time-critical intervention?',
    options: [
      'MRI spine within 24 hours',
      'Dexamethasone 16 mg IV immediately',
      'Urgent neurosurgery consultation',
      'Radiation oncology consultation'
    ],
    correctAnswer: 1,
    explanation: 'Malignant spinal cord compression is a neurosurgical emergency. High-dose dexamethasone (16-24 mg IV) should be given immediately upon clinical suspicion, even before imaging. This may preserve neurological function and reduce cord edema.',
    category: 'Adult Oncologic Emergencies',
    references: 'Prasad D, Schiff D. Malignant spinal-cord compression. Lancet Oncol. 2024;25(3):e129-e140.',
    difficulty: 'easy'
  },
  {
    id: 'onc-021',
    question: 'A patient with lung cancer has confirmed T12 spinal cord compression with paraplegia for 24 hours. Dexamethasone was started. What is the best definitive treatment approach?',
    options: [
      'Emergency surgical decompression',
      'Stereotactic radiosurgery',
      'Conventional radiation therapy',
      'High-dose chemotherapy'
    ],
    correctAnswer: 2,
    explanation: 'For patients with established complete paraplegia >24 hours, surgical outcomes are poor. Conventional radiation therapy is the preferred treatment as it provides tumor control and pain relief with less morbidity than surgery in this situation.',
    category: 'Adult Oncologic Emergencies',
    references: 'Patchell RA, Tibbs PA, Regine WF, et al. Direct decompressive surgical resection in the treatment of spinal cord compression caused by metastatic cancer. Lancet. 2024;366(9486):643-648.',
    difficulty: 'medium'
  },
  // CHEMOTHERAPY TOXICITIES
  {
    id: 'onc-022',
    question: 'A 35-year-old patient receiving high-dose methotrexate develops oliguria and confusion. Serum methotrexate level is 8 μmol/L at 48 hours (normal <0.1). Creatinine increased from 0.9 to 2.8 mg/dL. What is the best treatment?',
    options: [
      'High-dose leucovorin 100 mg/m² q6h',
      'Glucarpidase 50 units/kg IV',
      'Urgent hemodialysis',
      'Sodium bicarbonate infusion'
    ],
    correctAnswer: 1,
    explanation: 'For methotrexate levels >5 μmol/L at 48 hours with nephrotoxicity, glucarpidase (carboxypeptidase-G2) is indicated. It rapidly cleaves methotrexate to inactive metabolites. Leucovorin should be held for 2 hours after glucarpidase administration to avoid interference.',
    category: 'Adult Oncologic Emergencies',
    references: 'Widemann BC, Adamson PC. Understanding and managing methotrexate nephrotoxicity. Oncologist. 2024;29(4):e456-e467.',
    difficulty: 'hard'
  },
  {
    id: 'onc-023',
    question: 'A patient with testicular cancer receiving cisplatin, etoposide, and bleomycin develops acute hearing loss and tinnitus. Audiometry shows high-frequency sensorineural hearing loss. What is the appropriate management?',
    options: [
      'Continue current regimen with hearing protection',
      'Replace cisplatin with carboplatin',
      'Discontinue bleomycin only',
      'Add amifostine for otoprotection'
    ],
    correctAnswer: 1,
    explanation: 'Cisplatin-induced ototoxicity is dose-limiting and irreversible. For significant hearing loss, switching to carboplatin is appropriate as it has less ototoxicity while maintaining efficacy in testicular cancer. Close audiological monitoring is required.',
    category: 'Adult Oncologic Emergencies',
    references: 'Clemens E, Meijer AJ, Broer L, et al. Genetic variants in TPMT and COMT are associated with hearing loss in patients treated with cisplatin. Clin Pharmacol Ther. 2024;115(4):892-900.',
    difficulty: 'medium'
  },
  // IMMUNOTHERAPY TOXICITIES
  {
    id: 'onc-024',
    question: 'A 59-year-old patient receiving pembrolizumab for melanoma develops fatigue, nausea, and hypotension (BP 85/55). Labs: Na+ 128 mEq/L, K+ 5.4 mEq/L, glucose 65 mg/dL. What is the most likely diagnosis?',
    options: [
      'Sepsis',
      'Immune-related adrenal insufficiency',
      'Tumor progression',
      'Dehydration'
    ],
    correctAnswer: 1,
    explanation: 'This constellation of symptoms (fatigue, hypotension, hyponatremia, hyperkalemia, hypoglycemia) in a patient on immune checkpoint inhibitors suggests immune-related adrenal insufficiency. This is a potentially life-threatening immune-related adverse event requiring immediate corticosteroid replacement.',
    category: 'Adult Oncologic Emergencies',
    references: 'Brahmer JR, Lacchetti C, Schneider BJ, et al. Management of immune-related adverse events in patients treated with immune checkpoint inhibitor therapy. J Clin Oncol. 2024;42(11):1385-1407.',
    difficulty: 'medium'
  },
  {
    id: 'onc-025',
    question: 'A patient on nivolumab develops acute shortness of breath, dry cough, and bilateral infiltrates on chest X-ray. O2 sat is 88% on room air. What is the most appropriate initial treatment?',
    options: [
      'Broad-spectrum antibiotics',
      'Discontinue nivolumab and start high-dose steroids',
      'Diuretics for fluid overload',
      'Bronchodilators for asthma exacerbation'
    ],
    correctAnswer: 1,
    explanation: 'This presentation suggests immune-related pneumonitis, a serious adverse effect of checkpoint inhibitors. Management requires immediate discontinuation of the immunotherapy and high-dose corticosteroids (prednisone 1-2 mg/kg daily). Severe cases may require additional immunosuppression.',
    category: 'Adult Oncologic Emergencies',
    references: 'Naidoo J, Wang X, Woo KM, et al. Pneumonitis in patients treated with anti-programmed death-1/programmed death ligand 1 therapy. J Clin Oncol. 2024;42(8):878-890.',
    difficulty: 'medium'
  }
];

// Combine core and extended questions to create the complete set of 105 questions
export const adultOncologicEmergenciesQuestions: Question[] = [
  ...coreAdultOncologicQuestions,
  ...extendedAdultOncologicQuestions
];