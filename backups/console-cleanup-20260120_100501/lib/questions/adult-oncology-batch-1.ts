// Adult Oncologic Emergencies - Batch 1 (30 Questions)
// Clean implementation for production deployment
import { Question } from './types';

export const adultOncologyBatch1Questions: Question[] = [
  // Question 1: Febrile Neutropenia
  {
    id: 'aoe-001',
    question: 'A 45-year-old man with acute leukemia presents with fever (38.5°C) and an absolute neutrophil count of 200/μL. He appears well but has mild fatigue. What is the most appropriate initial management?',
    options: [
      'Oral antibiotics and close outpatient follow-up',
      'Immediate IV broad-spectrum antibiotics and admission',
      'Obtain blood cultures and start antibiotics only if positive',
      'Give antipyretics and monitor for 24 hours'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Febrile neutropenia (fever ≥38°C with ANC <500) is a medical emergency requiring immediate IV broad-spectrum antibiotics with antipseudomonal coverage (e.g., cefepime, piperacillin-tazobactam) and hospital admission, even in well-appearing patients.',
    category: 'Adult Oncologic Emergencies',
    references: ['Freifeld AG, et al. Clinical practice guideline for the use of antimicrobial agents in neutropenic patients with cancer: 2010 update by the IDSA. Clin Infect Dis. 2011;52(4):e56-93.']
  },

  // Question 2: Superior Vena Cava Syndrome
  {
    id: 'aoe-002',
    question: 'A 60-year-old smoker presents with progressive facial swelling, neck vein distention, and shortness of breath over 2 weeks. Chest X-ray shows a large right mediastinal mass. What is the most appropriate immediate intervention?',
    options: [
      'High-dose corticosteroids',
      'Emergency mediastinoscopy and biopsy',
      'Immediate radiation therapy',
      'IV diuretics and head elevation'
    ],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Superior vena cava syndrome (SVCS) with respiratory symptoms requires immediate high-dose dexamethasone (16-24 mg daily) for rapid symptom relief while diagnostic workup proceeds. Current guidelines support steroids before tissue diagnosis.',
    category: 'Adult Oncologic Emergencies',
    references: ['Wilson LD, et al. Clinical practice. Superior vena cava syndrome with malignant causes. N Engl J Med. 2007;356(18):1862-9.']
  },

  // Question 3: Spinal Cord Compression
  {
    id: 'aoe-003',
    question: 'A 55-year-old woman with breast cancer develops progressive back pain and lower extremity weakness over 48 hours. She has decreased sensation below T8 and hyperreflexia. What is the most urgent intervention?',
    options: [
      'Pain management with opioids',
      'High-dose dexamethasone and emergency MRI',
      'Physical therapy consultation',
      'Bone scan to evaluate for metastases'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Malignant spinal cord compression requires immediate high-dose dexamethasone (16-20 mg loading dose) and emergency MRI within 24 hours. Early treatment within 48 hours significantly improves neurological outcomes.',
    category: 'Adult Oncologic Emergencies',
    references: ['Loblaw DA, et al. Emergency treatment of malignant extradural spinal cord compression: an evidence-based guideline. J Clin Oncol. 2010;28(7):1206-12.']
  },

  // Question 4: Hypercalcemia of Malignancy
  {
    id: 'aoe-004',
    question: 'A 50-year-old man with lung cancer presents with confusion, nausea, and polyuria. Serum calcium is 13.5 mg/dL (corrected for albumin). What is the most appropriate initial treatment?',
    options: [
      'Calcitonin followed by bisphosphonate',
      'Normal saline resuscitation followed by furosemide',
      'Immediate hemodialysis',
      'High-dose corticosteroids'
    ],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Severe hypercalcemia (>12 mg/dL) with symptoms requires immediate treatment with IV fluids, calcitonin (rapid onset), followed by bisphosphonate (longer-acting). Calcitonin works within hours while bisphosphonates take 2-4 days.',
    category: 'Adult Oncologic Emergencies',
    references: ['Lewis MA, et al. Diagnosis and management of hypercalcemia in patients with malignancy. Oncologist. 2014;19(7):723-31.']
  },

  // Question 5: Tumor Lysis Syndrome
  {
    id: 'aoe-005',
    question: 'A 40-year-old man with Burkitt lymphoma develops hyperuricemia (12 mg/dL), hyperphosphatemia, and acute kidney injury 24 hours after starting chemotherapy. What is the most appropriate management?',
    options: [
      'Increase IV fluids and monitor',
      'Rasburicase and aggressive hydration',
      'Allopurinol and sodium bicarbonate',
      'Emergency dialysis'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Tumor lysis syndrome with established hyperuricemia and renal dysfunction requires rasburicase (recombinant urate oxidase) for rapid uric acid reduction, plus aggressive hydration. Allopurinol prevents further uric acid formation but doesn\'t reduce existing levels.',
    category: 'Adult Oncologic Emergencies',
    references: ['Cairo MS, et al. Tumour lysis syndrome: new therapeutic strategies and classification. Br J Haematol. 2004;127(1):3-11.']
  },

  // Question 6: Neutropenic Enterocolitis
  {
    id: 'aoe-006',
    question: 'A 35-year-old woman with AML develops severe abdominal pain, bloody diarrhea, and fever during neutropenia. CT shows bowel wall thickening in the cecum. What is the most appropriate management?',
    options: [
      'Conservative management with IV antibiotics',
      'Immediate surgical resection',
      'Colonoscopy for tissue diagnosis',
      'High-dose corticosteroids'
    ],
    correctIndex: 0,
    difficulty: 'hard',
    explanation: 'Neutropenic enterocolitis (typhlitis) is initially managed conservatively with bowel rest, IV antibiotics with anaerobic coverage, and careful monitoring. Surgery is reserved for perforation, uncontrolled bleeding, or clinical deterioration.',
    category: 'Adult Oncologic Emergencies',
    references: ['Ullery BW, et al. Neutropenic enterocolitis. Curr Gastroenterol Rep. 2011;13(4):386-94.']
  },

  // Question 7: Hyperviscosity Syndrome
  {
    id: 'aoe-007',
    question: 'A 65-year-old man with Waldenström macroglobulinemia presents with headache, visual changes, and bleeding. Serum viscosity is markedly elevated. What is the most appropriate immediate treatment?',
    options: [
      'High-dose corticosteroids',
      'Plasmapheresis',
      'Immediate chemotherapy',
      'Phlebotomy'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Hyperviscosity syndrome with neurological symptoms requires immediate plasmapheresis to rapidly reduce serum viscosity and relieve symptoms. This buys time for definitive treatment of the underlying malignancy.',
    category: 'Adult Oncologic Emergencies',
    references: ['Gertz MA. Acute hyperviscosity: syndromes and management. Blood. 2018;132(13):1379-1385.']
  },

  // Question 8: Cardiac Tamponade
  {
    id: 'aoe-008',
    question: 'A 50-year-old woman with lung cancer develops progressive dyspnea, elevated JVP, and muffled heart sounds. Echocardiogram shows large pericardial effusion with diastolic collapse. What is the most appropriate management?',
    options: [
      'Diuretics and afterload reduction',
      'Emergency pericardiocentesis',
      'High-dose corticosteroids',
      'Immediate chemotherapy'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Cardiac tamponade is a life-threatening emergency requiring immediate pericardiocentesis for decompression. This provides immediate relief and allows time for definitive management of the underlying malignancy.',
    category: 'Adult Oncologic Emergencies',
    references: ['Adler Y, et al. 2015 ESC Guidelines for the diagnosis and management of pericardial diseases. Eur Heart J. 2015;36(42):2921-64.']
  },

  // Question 9: Hyperleukocytosis
  {
    id: 'aoe-009',
    question: 'A 30-year-old man with acute myeloid leukemia presents with altered mental status and dyspnea. WBC count is 180,000/μL with 80% blasts. What is the most appropriate immediate intervention?',
    options: [
      'Immediate chemotherapy',
      'Leukapheresis',
      'High-dose corticosteroids',
      'Supportive care and monitoring'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Hyperleukocytosis (WBC >100,000) with symptoms of leukostasis requires immediate leukapheresis to rapidly reduce white cell count and prevent cerebral or pulmonary complications. This is followed by chemotherapy.',
    category: 'Adult Oncologic Emergencies',
    references: ['Porcu P, et al. Hyperleukocytotic leukemias and leukostasis: a review of pathophysiology, clinical presentation and management. Leuk Lymphoma. 2000;39(1-2):1-18.']
  },

  // Question 10: Syndrome of Inappropriate ADH
  {
    id: 'aoe-010',
    question: 'A 60-year-old man with small cell lung cancer develops confusion and seizures. Serum sodium is 115 mEq/L, urine osmolality is elevated. What is the most appropriate immediate treatment?',
    options: [
      'Normal saline infusion',
      'Hypertonic saline (3%)',
      'Fluid restriction only',
      'Demeclocycline'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Severe symptomatic hyponatremia (<120 mEq/L) with neurological symptoms requires careful correction with hypertonic saline (3%). Correction rate should be limited to 1-2 mEq/L/hour to prevent osmotic demyelination.',
    category: 'Adult Oncologic Emergencies',
    references: ['Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations. Am J Med. 2013;126(10 Suppl 1):S1-42.']
  },

  // Question 11: Hemophagocytic Lymphohistiocytosis
  {
    id: 'aoe-011',
    question: 'A 45-year-old man with T-cell lymphoma develops persistent fever, cytopenias, hepatomegaly, and markedly elevated ferritin (8000 ng/mL). What is the most likely diagnosis and appropriate treatment?',
    options: [
      'Sepsis; broad-spectrum antibiotics',
      'Hemophagocytic lymphohistiocytosis; HLH-94 protocol',
      'Hepatitis; supportive care',
      'Iron overload; chelation therapy'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Hemophagocytic lymphohistiocytosis (HLH) presents with fever, cytopenias, hepatomegaly, hyperferritinemia, and hemophagocytosis. Treatment requires immunosuppression with protocols like HLH-94 (dexamethasone, etoposide, cyclosporine).',
    category: 'Adult Oncologic Emergencies',
    references: ['Henter JI, et al. HLH-2004: Diagnostic and therapeutic guidelines for hemophagocytic lymphohistiocytosis. Pediatr Blood Cancer. 2007;48(2):124-31.']
  },

  // Question 12: Thrombotic Thrombocytopenic Purpura
  {
    id: 'aoe-012',
    question: 'A 40-year-old woman with breast cancer develops thrombocytopenia (30,000), hemolytic anemia with schistocytes, and altered mental status. Creatinine is elevated. What is the most appropriate treatment?',
    options: [
      'Platelet transfusion',
      'Plasma exchange',
      'High-dose corticosteroids',
      'Splenectomy'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Thrombotic thrombocytopenic purpura (TTP) with the pentad of findings requires immediate plasma exchange to remove ADAMTS13 antibodies and replace the missing enzyme. Platelet transfusion is contraindicated as it may worsen thrombosis.',
    category: 'Adult Oncologic Emergencies',
    references: ['Zheng XL, et al. ISTH guidelines for treatment of thrombotic thrombocytopenic purpura. J Thromb Haemost. 2020;18(10):2496-2502.']
  },

  // Question 13: Disseminated Intravascular Coagulation
  {
    id: 'aoe-013',
    question: 'A 55-year-old man with acute promyelocytic leukemia develops bleeding, elevated PT/PTT, low platelets (20,000), and elevated D-dimer. What is the most appropriate management?',
    options: [
      'Immediate chemotherapy only',
      'All-trans retinoic acid (ATRA) and supportive care',
      'Heparin anticoagulation',
      'Platelet transfusion and FFP'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'APL-associated DIC requires immediate ATRA to differentiate malignant cells and reduce procoagulant activity, plus aggressive supportive care with platelets and coagulation factors. ATRA is life-saving in this setting.',
    category: 'Adult Oncologic Emergencies',
    references: ['Sanz MA, et al. Management of acute promyelocytic leukemia: updated recommendations from an expert panel of the European LeukemiaNet. Blood. 2019;133(15):1630-1643.']
  },

  // Question 14: Severe Thrombocytopenia with Bleeding
  {
    id: 'aoe-014',
    question: 'A 50-year-old woman with chemotherapy-induced thrombocytopenia (platelet count 8,000) develops epistaxis and petechiae. What is the most appropriate platelet transfusion threshold?',
    options: [
      'Transfuse for any bleeding',
      'Transfuse when platelets <10,000',
      'Transfuse when platelets <20,000',
      'Transfuse when platelets <50,000'
    ],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'Active bleeding in the setting of severe thrombocytopenia requires immediate platelet transfusion regardless of platelet count. The goal is to achieve hemostasis, typically targeting platelets >50,000 for active bleeding.',
    category: 'Adult Oncologic Emergencies',
    references: ['Kaufman RM, et al. Platelet transfusion: a clinical practice guideline from the AABB. Ann Intern Med. 2015;162(3):205-13.']
  },

  // Question 15: Chemotherapy-Induced Anaphylaxis
  {
    id: 'aoe-015',
    question: 'A 45-year-old woman develops hives, wheezing, and hypotension 10 minutes after starting carboplatin infusion. What is the most appropriate immediate management?',
    options: [
      'Stop infusion, epinephrine, and supportive care',
      'Slow the infusion rate and give antihistamines',
      'Continue infusion with premedication',
      'Switch to oral chemotherapy'
    ],
    correctIndex: 0,
    difficulty: 'easy',
    explanation: 'Anaphylaxis to chemotherapy requires immediate cessation of the infusion, epinephrine administration, and aggressive supportive care including IV fluids, corticosteroids, and H1/H2 antihistamines.',
    category: 'Adult Oncologic Emergencies',
    references: ['Chung CH. Managing premedications and the risk for reactions to infusional monoclonal antibody therapy. Oncologist. 2008;13(6):725-32.']
  },

  // Question 16: Methotrexate Toxicity
  {
    id: 'aoe-016',
    question: 'A 40-year-old man develops mucositis, diarrhea, and elevated creatinine 3 days after high-dose methotrexate. Methotrexate level remains elevated. What is the most appropriate treatment?',
    options: [
      'Increase IV fluids and alkalinization',
      'Leucovorin (folinic acid) rescue',
      'Carboxypeptidase G2 (glucarpidase)',
      'Hemodialysis'
    ],
    correctIndex: 2,
    difficulty: 'hard',
    explanation: 'Methotrexate toxicity with delayed clearance and elevated levels requires carboxypeptidase G2 (glucarpidase) to rapidly cleave methotrexate to inactive metabolites. This is more effective than leucovorin when levels remain high.',
    category: 'Adult Oncologic Emergencies',
    references: ['Widemann BC, et al. Guidelines for the administration of high-dose methotrexate. Oncologist. 2006;11(6):694-703.']
  },

  // Question 17: Ifosfamide Encephalopathy
  {
    id: 'aoe-017',
    question: 'A 35-year-old woman develops confusion, somnolence, and myoclonus during ifosfamide treatment. What is the most appropriate management?',
    options: [
      'Continue treatment with dose reduction',
      'Discontinue ifosfamide and give methylene blue',
      'Supportive care and monitor',
      'Antiseizure medications'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Ifosfamide encephalopathy requires immediate discontinuation of the drug and treatment with methylene blue (1-2 mg/kg IV), which reverses the toxic metabolite-induced mitochondrial dysfunction.',
    category: 'Adult Oncologic Emergencies',
    references: ['Pelgrims J, et al. The enigma of ifosfamide encephalopathy. Anticancer Drugs. 2000;11(4):249-53.']
  },

  // Question 18: Capecitabine Hand-Foot Syndrome
  {
    id: 'aoe-018',
    question: 'A 60-year-old man on capecitabine develops severe erythema, swelling, and pain of hands and feet that interferes with activities of daily living. What is the most appropriate management?',
    options: [
      'Continue treatment with topical steroids',
      'Dose reduction and supportive care',
      'Switch to IV 5-fluorouracil',
      'Add prophylactic antibiotics'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Grade 3 hand-foot syndrome (interfering with ADLs) requires interruption of capecitabine until toxicity resolves to grade 1, then resume at reduced dose. Supportive care includes emollients and pain management.',
    category: 'Adult Oncologic Emergencies',
    references: ['Gressett SM, et al. Management of capecitabine-associated hand-foot syndrome. Am J Health Syst Pharm. 2006;63(4):365-74.']
  },

  // Question 19: Bleomycin Pulmonary Toxicity
  {
    id: 'aoe-019',
    question: 'A 25-year-old man with testicular cancer develops progressive dyspnea and dry cough after 200 units of bleomycin. Chest X-ray shows bilateral infiltrates. What is the most appropriate management?',
    options: [
      'Continue bleomycin with dose reduction',
      'Discontinue bleomycin and start corticosteroids',
      'Add prophylactic antibiotics',
      'Bronchoscopy with lavage'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Bleomycin pulmonary toxicity requires immediate discontinuation of the drug and high-dose corticosteroids (prednisone 1 mg/kg/day). The toxicity is dose-related and potentially fatal if not recognized early.',
    category: 'Adult Oncologic Emergencies',
    references: ['Reinert T, et al. Bleomycin-induced lung injury. J Cancer Res. 2013;2013:480608.']
  },

  // Question 20: Cisplatin Nephrotoxicity
  {
    id: 'aoe-020',
    question: 'A 50-year-old woman develops rising creatinine (baseline 1.0 to 2.5 mg/dL) and oliguria after cisplatin. Urinalysis shows proteinuria and granular casts. What is the most appropriate management?',
    options: [
      'Continue cisplatin with pre-hydration',
      'Switch to carboplatin',
      'Discontinue cisplatin and supportive care',
      'Add nephroprotective agents'
    ],
    correctIndex: 2,
    difficulty: 'medium',
    explanation: 'Cisplatin nephrotoxicity with significant creatinine rise requires discontinuation of the drug and supportive care. Alternative platinum agents like carboplatin may be considered for future cycles.',
    category: 'Adult Oncologic Emergencies',
    references: ['Miller RP, et al. Mechanisms of Cisplatin nephrotoxicity. Toxins (Basel). 2010;2(11):2490-518.']
  },

  // Question 21: Trastuzumab Cardiotoxicity
  {
    id: 'aoe-021',
    question: 'A 50-year-old woman on trastuzumab develops heart failure symptoms. Echocardiogram shows LVEF decrease from 65% to 40%. What is the most appropriate management?',
    options: [
      'Continue trastuzumab with cardiac monitoring',
      'Discontinue trastuzumab and start ACE inhibitor',
      'Reduce trastuzumab dose by 50%',
      'Switch to another HER2-targeted agent'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Trastuzumab-induced cardiomyopathy with LVEF drop >10% to <50% requires discontinuation of trastuzumab and initiation of heart failure therapy (ACE inhibitor, beta-blocker). Cardiotoxicity may be reversible.',
    category: 'Adult Oncologic Emergencies',
    references: ['Curigliano G, et al. Cardiotoxicity of anticancer treatments: Epidemiology, detection, and management. CA Cancer J Clin. 2016;66(4):309-25.']
  },

  // Question 22: Immune Checkpoint Inhibitor Pneumonitis
  {
    id: 'aoe-022',
    question: 'A 65-year-old man on pembrolizumab develops dyspnea and cough. CT chest shows ground-glass opacities. Infectious workup is negative. What is the most appropriate management?',
    options: [
      'Continue pembrolizumab with monitoring',
      'Discontinue pembrolizumab and start corticosteroids',
      'Empiric antibiotics',
      'Bronchoscopy with biopsy'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Immune checkpoint inhibitor pneumonitis requires immediate discontinuation of the drug and high-dose corticosteroids (prednisone 1-2 mg/kg/day). This is a potentially life-threatening immune-related adverse event.',
    category: 'Adult Oncologic Emergencies',
    references: ['Brahmer JR, et al. Management of immune-related adverse events in patients treated with immune checkpoint inhibitor therapy: American Society of Clinical Oncology Clinical Practice Guideline. J Clin Oncol. 2018;36(17):1714-1768.']
  },

  // Question 23: CAR-T Cell Cytokine Release Syndrome
  {
    id: 'aoe-023',
    question: 'A 40-year-old man develops fever (39°C), hypotension, and confusion 5 days after CAR-T cell infusion. IL-6 level is markedly elevated. What is the most appropriate treatment?',
    options: [
      'Broad-spectrum antibiotics',
      'Tocilizumab and supportive care',
      'High-dose corticosteroids',
      'Plasmapheresis'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'CAR-T cell cytokine release syndrome (CRS) with hypotension requires tocilizumab (IL-6 receptor antagonist) and supportive care. Corticosteroids are reserved for severe cases or if tocilizumab is ineffective.',
    category: 'Adult Oncologic Emergencies',
    references: ['Lee DW, et al. ASTCT Consensus Grading for Cytokine Release Syndrome and Neurologic Toxicity Associated with Immune Effector Cells. Biol Blood Marrow Transplant. 2019;25(4):625-638.']
  },

  // Question 24: Differentiation Syndrome
  {
    id: 'aoe-024',
    question: 'A 30-year-old woman with APL develops fever, dyspnea, and pulmonary infiltrates on day 5 of ATRA treatment. What is the most appropriate management?',
    options: [
      'Discontinue ATRA',
      'Continue ATRA and add dexamethasone',
      'Switch to arsenic trioxide',
      'Supportive care only'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Differentiation syndrome during ATRA treatment requires immediate dexamethasone (10 mg IV q12h) while continuing ATRA. Temporary ATRA interruption may be needed for severe cases, but complete discontinuation risks disease progression.',
    category: 'Adult Oncologic Emergencies',
    references: ['Montesinos P, et al. Differentiation syndrome in patients with acute promyelocytic leukemia treated with all-trans retinoic acid and anthracycline chemotherapy. Blood. 2009;113(4):775-83.']
  },

  // Question 25: Graft-versus-Host Disease
  {
    id: 'aoe-025',
    question: 'A 45-year-old man develops a maculopapular rash, diarrhea, and elevated liver enzymes 30 days after allogeneic stem cell transplant. What is the most likely diagnosis and treatment?',
    options: [
      'Viral infection; antiviral therapy',
      'Acute GVHD; corticosteroids',
      'Drug reaction; discontinue medications',
      'Sepsis; broad-spectrum antibiotics'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Acute graft-versus-host disease (aGVHD) typically presents with skin rash, GI symptoms, and liver dysfunction within 100 days post-transplant. First-line treatment is high-dose corticosteroids (methylprednisolone 1-2 mg/kg/day).',
    category: 'Adult Oncologic Emergencies',
    references: ['Harris AC, et al. International, multicenter standardization of acute graft-versus-host disease clinical data collection: a report from the Mount Sinai Acute GVHD International Consortium. Biol Blood Marrow Transplant. 2016;22(1):4-10.']
  },

  // Question 26: Veno-occlusive Disease
  {
    id: 'aoe-026',
    question: 'A 35-year-old woman develops jaundice, hepatomegaly, ascites, and weight gain 2 weeks after conditioning chemotherapy for stem cell transplant. What is the most likely diagnosis?',
    options: [
      'Viral hepatitis',
      'Sinusoidal obstruction syndrome (veno-occlusive disease)',
      'Acute GVHD',
      'Sepsis with liver dysfunction'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Sinusoidal obstruction syndrome (SOS/VOD) presents with jaundice, hepatomegaly, ascites, and weight gain within 3 weeks of conditioning chemotherapy. It results from endothelial damage to hepatic sinusoids and central veins.',
    category: 'Adult Oncologic Emergencies',
    references: ['Mohty M, et al. Sinusoidal obstruction syndrome/veno-occlusive disease: current situation and perspectives-a position statement from the European Society for Blood and Marrow Transplantation (EBMT). Bone Marrow Transplant. 2015;50(6):781-9.']
  },

  // Question 27: Engraftment Syndrome
  {
    id: 'aoe-027',
    question: 'A 40-year-old man develops fever, noncardiogenic pulmonary edema, and skin rash coinciding with neutrophil recovery after autologous stem cell transplant. What is the most appropriate treatment?',
    options: [
      'Broad-spectrum antibiotics',
      'Corticosteroids',
      'Diuretics only',
      'Plasmapheresis'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Engraftment syndrome occurs during neutrophil recovery and is characterized by fever, capillary leak, and organ dysfunction. Treatment is supportive care with corticosteroids for severe cases.',
    category: 'Adult Oncologic Emergencies',
    references: ['Maiolino A, et al. Engraftment syndrome following autologous hematopoietic stem cell transplantation: definition of diagnostic criteria. Bone Marrow Transplant. 2003;31(5):393-7.']
  },

  // Question 28: Secondary Malignancy Hypercalcemia
  {
    id: 'aoe-028',
    question: 'A 70-year-old man with squamous cell lung cancer develops hypercalcemia (14 mg/dL) and bone pain. PTHrP is elevated. What is the most appropriate treatment sequence?',
    options: [
      'Calcitonin then bisphosphonate',
      'Bisphosphonate then calcitonin',
      'Corticosteroids alone',
      'Emergency parathyroidectomy'
    ],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: 'PTHrP-mediated hypercalcemia requires rapid treatment with calcitonin (immediate effect) followed by bisphosphonate (sustained effect). Calcitonin works within hours while bisphosphonates take days to reach peak effect.',
    category: 'Adult Oncologic Emergencies',
    references: ['Stewart AF. Clinical practice. Hypercalcemia associated with cancer. N Engl J Med. 2005;352(4):373-9.']
  },

  // Question 29: Massive Hemoptysis
  {
    id: 'aoe-029',
    question: 'A 55-year-old man with lung cancer develops massive hemoptysis (>500 mL in 24 hours). He is hemodynamically stable. What is the most appropriate immediate management?',
    options: [
      'Emergency surgery',
      'Position affected side down and bronchoscopy',
      'High-dose corticosteroids',
      'Immediate intubation'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    explanation: 'Massive hemoptysis requires positioning the affected lung in dependent position to prevent aspiration into the healthy lung, followed by urgent bronchoscopy for localization and possible intervention (bronchial artery embolization).',
    category: 'Adult Oncologic Emergencies',
    references: ['Sakr L, et al. Management of massive hemoptysis: selective bronchial artery embolization experience. J Med Liban. 2005;53(4):195-9.']
  },

  // Question 30: Acute Leukemia with Hyperleukocytosis
  {
    id: 'aoe-030',
    question: 'A 25-year-old woman presents with fatigue and dyspnea. CBC shows WBC 250,000 with 90% blasts. She develops altered mental status. What is the most urgent intervention?',
    options: [
      'Immediate induction chemotherapy',
      'Leukapheresis',
      'High-dose corticosteroids',
      'Exchange transfusion'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    explanation: 'Hyperleukocytosis with leukostasis symptoms (altered mental status, dyspnea) requires immediate leukapheresis to rapidly reduce blast count and prevent cerebral or pulmonary complications. Chemotherapy follows once count is reduced.',
    category: 'Adult Oncologic Emergencies',
    references: ['Ganzel C, et al. Very high white blood cell count at diagnosis of acute myeloid leukemia - contemporary treatment and outcomes. Am J Hematol. 2016;91(8):770-3.']
  }
];

export default adultOncologyBatch1Questions;