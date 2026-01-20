import { Question } from './types';

export const hematologicEmergenciesQuestions: Question[] = [
  {
    id: 'heme-001',
    question: 'A patient presents with severe anemia (Hgb 4.2 g/dL), thrombocytopenia (platelets 15,000), schistocytes on blood smear, and acute kidney injury. What is the most likely diagnosis?',
    options: [
      'Disseminated intravascular coagulation',
      'Thrombotic thrombocytopenic purpura',
      'Hemolytic uremic syndrome',
      'Immune thrombocytopenic purpura'
    ],
    correctIndex: 1,
    explanation: 'The pentad of TTP includes thrombocytopenia, microangiopathic hemolytic anemia (schistocytes), neurologic symptoms, fever, and renal dysfunction. However, only thrombocytopenia and hemolytic anemia are required for diagnosis. TTP is a medical emergency requiring immediate plasmapheresis.',
    references: [
      'Scully M, et al. Guidelines on the diagnosis and management of thrombotic thrombocytopenic purpura and other thrombotic microangiopathies',
      'Zheng XL, et al. ISTH guidelines for the diagnosis of thrombotic thrombocytopenic purpura'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies',
    patientPresentation: {
      age: 42,
      gender: 'Female',
      chiefComplaint: 'Severe fatigue, confusion, and easy bruising for 3 days',
      vitalSigns: {
        heartRate: 125,
        bloodPressure: '110/75 mmHg',
        temperature: 100.8,
        respiratoryRate: 22,
        oxygenSaturation: 96
      },
      pastMedicalHistory: ['No significant past medical history'],
      currentMedications: ['Birth control pills'],
      physicalExam: 'Pale, petechial rash on extremities, mild confusion, no organomegaly',
      labsImaging: 'Hemoglobin: 4.2 g/dL, Platelets: 15,000/μL, LDH: 2500 U/L, Creatinine: 2.8 mg/dL, Blood smear: numerous schistocytes'
    }
  },
  {
    id: 'heme-002',
    question: 'A patient with sickle cell disease presents with severe chest pain, shortness of breath, and pulmonary infiltrates. What is the most likely diagnosis?',
    options: [
      'Pneumonia',
      'Pulmonary embolism',
      'Acute chest syndrome',
      'Myocardial infarction'
    ],
    correctIndex: 2,
    explanation: 'Acute chest syndrome is a life-threatening complication of sickle cell disease characterized by chest pain, fever, shortness of breath, and new pulmonary infiltrates. Treatment includes oxygen, pain control, antibiotics, and exchange transfusion if severe.',
    references: [
      'Yawn BP, et al. Management of sickle cell disease: summary of the 2014 evidence-based report by expert panel members',
      'Vichinsky EP, et al. Acute chest syndrome in sickle cell disease: clinical presentation and course'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-003',
    question: 'A patient presents with severe bleeding, prolonged PT/PTT, low fibrinogen, and elevated D-dimer. Platelets are 45,000. What is the most likely diagnosis?',
    options: [
      'Liver disease',
      'Disseminated intravascular coagulation',
      'Hemophilia',
      'Warfarin overdose'
    ],
    correctIndex: 1,
    explanation: 'DIC presents with consumption of clotting factors and platelets, leading to prolonged coagulation times, low fibrinogen, elevated D-dimer, and paradoxical bleeding despite thrombosis. Treatment focuses on the underlying cause and supportive care.',
    references: [
      'Levi M, et al. Disseminated intravascular coagulation. N Engl J Med. 1999;341(8):586-592',
      'Taylor FB Jr, et al. Towards definition, clinical and laboratory criteria, and a scoring system for disseminated intravascular coagulation'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-004',
    question: 'A patient with chronic lymphocytic leukemia presents with fatigue, weakness, and laboratory results showing WBC 200,000/μL. What is the most immediate concern?',
    options: [
      'Infection risk',
      'Leukostasis',
      'Tumor lysis syndrome',
      'Bleeding risk'
    ],
    correctIndex: 1,
    explanation: 'Hyperleukocytosis (WBC >100,000/μL) can cause leukostasis, leading to impaired circulation in brain, lungs, and other organs. This can cause stroke, respiratory failure, and other life-threatening complications. Immediate leukapheresis may be needed.',
    references: [
      'Porcu P, et al. Hyperleukocytosis and leukostasis: a review of pathophysiology, clinical presentation and management',
      'Ganzel C, et al. Very high levels of circulating blasts and leukostasis: physiology, pathophysiology, and therapeutic implications'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-005',
    question: 'A patient presents with spontaneous bleeding from gums and skin, petechiae, and platelet count of 8,000/μL. PT/PTT are normal. What is the most likely diagnosis?',
    options: [
      'Disseminated intravascular coagulation',
      'Immune thrombocytopenic purpura',
      'Thrombotic thrombocytopenic purpura',
      'Medication-induced thrombocytopenia'
    ],
    correctIndex: 1,
    explanation: 'ITP presents with isolated thrombocytopenia and bleeding symptoms. Normal PT/PTT distinguish it from DIC. No schistocytes rules out TTP. Treatment includes corticosteroids, IVIG, and platelet transfusion only for life-threatening bleeding.',
    references: [
      'Neunert C, et al. The American Society of Hematology 2011 evidence-based practice guideline for immune thrombocytopenia',
      'Rodeghiero F, et al. Standardization of terminology, definitions and outcome criteria in immune thrombocytopenic purpura of adults and children'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-006',
    question: 'A patient with hemophilia A presents with severe hip pain after minor trauma. Factor VIII level is <1%. What is the target factor VIII level for treatment?',
    options: [
      '25-30%',
      '50-80%',
      '80-100%',
      '100-150%'
    ],
    correctIndex: 2,
    explanation: 'Joint bleeding in severe hemophilia requires factor VIII levels of 80-100% for adequate hemostasis. Hip joint bleeding is particularly serious due to risk of avascular necrosis. Higher levels may be needed for life-threatening bleeding.',
    references: [
      'Srivastava A, et al. Guidelines for the management of hemophilia',
      'National Hemophilia Foundation. MASAC recommendations concerning products licensed for the treatment of hemophilia and other bleeding disorders'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-007',
    question: 'A patient receiving chemotherapy presents with fever, neutropenia (ANC 300), and hypotension. What is the most appropriate initial antibiotic?',
    options: [
      'Vancomycin',
      'Ceftriaxone',
      'Cefepime',
      'Azithromycin'
    ],
    correctIndex: 2,
    explanation: 'Febrile neutropenia with hypotension requires broad-spectrum anti-pseudomonal coverage. Cefepime is a fourth-generation cephalosporin with excellent gram-negative coverage including Pseudomonas. Vancomycin may be added if gram-positive infection suspected.',
    references: [
      'Freifeld AG, et al. Clinical practice guideline for the use of antimicrobial agents in neutropenic patients with cancer: 2010 update by the infectious diseases society of america',
      'Baden LR, et al. Prevention and treatment of cancer-related infections, version 2.2016'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-008',
    question: 'A patient with polycythemia vera presents with severe itching after hot showers and splenomegaly. Hematocrit is 65%. What is the most immediate treatment?',
    options: [
      'Hydroxyurea',
      'Phlebotomy',
      'Aspirin',
      'Allopurinol'
    ],
    correctIndex: 1,
    explanation: 'Symptomatic polycythemia with high hematocrit (>60% in men, >55% in women) requires immediate phlebotomy to reduce hyperviscosity and thrombotic risk. Target hematocrit is <45% in men and <42% in women. Hydroxyurea is for long-term management.',
    references: [
      'Marchioli R, et al. Cardiovascular events and intensity of treatment in polycythemia vera',
      'Tefferi A, et al. Polycythemia vera and essential thrombocythemia: 2021 update on diagnosis, risk-stratification and management'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-009',
    question: 'A patient presents with fatigue, bone pain, and laboratory results showing calcium 13.5 mg/dL, creatinine 2.8 mg/dL, and anemia. What is the most likely diagnosis?',
    options: [
      'Acute leukemia',
      'Multiple myeloma',
      'Lymphoma',
      'Metastatic cancer'
    ],
    correctIndex: 1,
    explanation: 'The combination of hypercalcemia, renal dysfunction, anemia, and bone pain suggests multiple myeloma (CRAB features: hypercalcemia, Renal dysfunction, Anemia, Bone lesions). Serum protein electrophoresis and bone marrow biopsy are diagnostic.',
    references: [
      'Rajkumar SV, et al. International Myeloma Working Group updated criteria for the diagnosis of multiple myeloma',
      'Kyle RA, et al. Review of 1027 patients with newly diagnosed multiple myeloma'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-010',
    question: 'A patient with acute leukemia starts chemotherapy and develops hyperkalemia (K+ 6.8), hyperphosphatemia, hyperuricemia, and acute kidney injury. What is the diagnosis?',
    options: [
      'Chemotherapy toxicity',
      'Tumor lysis syndrome',
      'Acute kidney injury',
      'Adrenal insufficiency'
    ],
    correctIndex: 1,
    explanation: 'Tumor lysis syndrome occurs when rapid cell death releases intracellular contents, causing hyperkalemia, hyperphosphatemia, hyperuricemia, and hypocalcemia. This can lead to acute kidney injury and cardiac arrhythmias. Prevention includes allopurinol and aggressive hydration.',
    references: [
      'Cairo MS, et al. Tumour lysis syndrome: new therapeutic strategies and classification',
      'Howard SC, et al. The tumor lysis syndrome. N Engl J Med. 2011;364(19):1844-1854'
    ],
    difficulty: 'easy',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-011',
    question: 'A patient presents with fatigue, weight loss, night sweats, and massive splenomegaly. WBC is 180,000 with left shift. What is the most likely diagnosis?',
    options: [
      'Acute myeloid leukemia',
      'Chronic myeloid leukemia',
      'Chronic lymphocytic leukemia',
      'Myelofibrosis'
    ],
    correctIndex: 1,
    explanation: 'CML typically presents with marked leukocytosis, left shift (blasts and promyelocytes), massive splenomegaly, and constitutional symptoms. Philadelphia chromosome (BCR-ABL) is diagnostic. Treatment includes tyrosine kinase inhibitors like imatinib.',
    references: [
      'Deininger MW, et al. The molecular biology of chronic myeloid leukemia',
      'Baccarani M, et al. European LeukemiaNet recommendations for the management of chronic myeloid leukemia: 2013 update'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-012',
    question: 'A patient with a prosthetic heart valve on warfarin presents with GI bleeding. INR is 8.5. What is the most appropriate reversal strategy?',
    options: [
      'Vitamin K 10mg IV',
      'Fresh frozen plasma',
      'Prothrombin complex concentrate',
      'Hold warfarin only'
    ],
    correctIndex: 2,
    explanation: 'For life-threatening bleeding with elevated INR, prothrombin complex concentrate (PCC) provides rapid reversal within 15-30 minutes. FFP takes longer and requires large volumes. Vitamin K takes hours to work. PCC plus vitamin K is optimal.',
    references: [
      'Keeling D, et al. Guidelines on oral anticoagulation with warfarin - fourth edition',
      'Sarode R, et al. Efficacy and safety of a 4-factor prothrombin complex concentrate in patients on vitamin K antagonists presenting with major bleeding'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-013',
    question: 'A patient presents with severe fatigue and pallor. Hemoglobin is 3.2 g/dL, MCV is 72 fL, and iron studies show low iron and ferritin. What is the most appropriate initial management?',
    options: [
      'Iron supplementation',
      'Blood transfusion',
      'Bone marrow biopsy',
      'Endoscopy'
    ],
    correctIndex: 1,
    explanation: 'Severe anemia (Hgb <4 g/dL) with symptoms requires immediate blood transfusion to prevent cardiac complications. Iron deficiency anemia in adults suggests GI bleeding and requires investigation, but transfusion takes priority over diagnostic workup.',
    references: [
      'Carson JL, et al. Red blood cell transfusion: a clinical practice guideline from the AABB',
      'Goddard AF, et al. Guidelines for the management of iron deficiency anaemia'
    ],
    difficulty: 'easy',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-014',
    question: 'A patient with von Willebrand disease presents with severe menorrhagia. What is the most appropriate acute treatment?',
    options: [
      'Factor VIII concentrate',
      'DDAVP (desmopressin)',
      'Platelet transfusion',
      'Oral contraceptives'
    ],
    correctIndex: 1,
    explanation: 'DDAVP stimulates release of von Willebrand factor from endothelial cells and is first-line treatment for type 1 VWD bleeding. It raises both VWF and factor VIII levels. Factor VIII concentrates that contain VWF are used if DDAVP is ineffective.',
    references: [
      'Nichols WL, et al. von Willebrand disease (VWD): evidence-based diagnosis and management guidelines',
      'James PD, et al. ASH ISTH NHF WFH 2021 guidelines on the diagnosis of von Willebrand disease'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-015',
    question: 'A patient presents with easy bruising, fatigue, and recurrent infections. CBC shows pancytopenia. Bone marrow biopsy shows hypocellularity. What is the most likely diagnosis?',
    options: [
      'Acute leukemia',
      'Aplastic anemia',
      'Myelodysplastic syndrome',
      'Myelofibrosis'
    ],
    correctIndex: 1,
    explanation: 'Aplastic anemia presents with pancytopenia and hypocellular bone marrow. Causes include medications, radiation, viruses, and autoimmune conditions. Treatment includes immunosuppressive therapy or bone marrow transplantation depending on age and severity.',
    references: [
      'Bacigalupo A. How I treat acquired aplastic anemia',
      'Killick SB, et al. Guidelines for the diagnosis and management of adult aplastic anaemia'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-016',
    question: 'A patient with glucose-6-phosphate dehydrogenase deficiency presents with dark urine, jaundice, and anemia after taking trimethoprim-sulfamethoxazole. What is the pathophysiology?',
    options: [
      'Autoimmune hemolysis',
      'Mechanical hemolysis',
      'Oxidative hemolysis',
      'Membrane defect'
    ],
    correctIndex: 2,
    explanation: 'G6PD deficiency causes oxidative hemolysis when exposed to oxidant stresses like certain medications (sulfonamides, antimalarials), foods (fava beans), or infections. G6PD is needed to protect red cells from oxidative damage. Treatment is supportive and avoiding triggers.',
    references: [
      'Cappellini MD, et al. Glucose-6-phosphate dehydrogenase deficiency. Lancet. 2008;371(9606):64-74',
      'Nkhoma ET, et al. The global prevalence of glucose-6-phosphate dehydrogenase deficiency: a systematic review and meta-analysis'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-017',
    question: 'A patient presents with severe fatigue, megaloblastic anemia (MCV 118 fL), and neurologic symptoms including paresthesias. B12 level is low. What is the most appropriate treatment?',
    options: [
      'Oral B12 supplements',
      'Intramuscular B12 injections',
      'Folic acid supplementation',
      'Blood transfusion'
    ],
    correctIndex: 1,
    explanation: 'B12 deficiency with neurologic symptoms requires immediate intramuscular B12 (cyanocobalamin or hydroxycobalamin) to prevent irreversible nerve damage. Oral B12 may not be adequately absorbed, especially in pernicious anemia. Folic acid alone can worsen neurologic symptoms.',
    references: [
      'Green R, et al. Vitamin B12 deficiency. Nat Rev Dis Primers. 2017;3:17040',
      'Stabler SP. Vitamin B12 deficiency. N Engl J Med. 2013;368(2):149-160'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-018',
    question: 'A patient with sickle cell disease presents with sudden onset severe abdominal pain, distention, and rapidly dropping hemoglobin. What is the most likely diagnosis?',
    options: [
      'Vaso-occlusive crisis',
      'Splenic sequestration',
      'Acute chest syndrome',
      'Cholangitis'
    ],
    correctIndex: 1,
    explanation: 'Splenic sequestration crisis presents with sudden severe anemia, abdominal pain, and splenomegaly as red cells become trapped in the spleen. This is more common in children but can occur in adults with HbSC disease. Treatment includes urgent transfusion and possible splenectomy.',
    references: [
      'Brousse V, et al. Acute splenic sequestration crisis in sickle cell disease: cohort study of 190 paediatric patients',
      'Yawn BP, et al. Management of sickle cell disease: summary of the 2014 evidence-based report by expert panel members'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-019',
    question: 'A patient presents with thrombocytopenia (platelets 25,000) and normal-appearing bone marrow with increased megakaryocytes. What is the most likely mechanism?',
    options: [
      'Decreased platelet production',
      'Increased platelet destruction',
      'Sequestration',
      'Dilution'
    ],
    correctIndex: 1,
    explanation: 'Normal bone marrow with increased megakaryocytes indicates peripheral platelet destruction rather than production failure. This pattern is seen in ITP, drug-induced thrombocytopenia, and other immune-mediated destruction. Decreased production would show decreased megakaryocytes.',
    references: [
      'Rodeghiero F, et al. Standardization of terminology, definitions and outcome criteria in immune thrombocytopenic purpura of adults and children',
      'Stasi R, et al. Evidence-based management of immune thrombocytopenic purpura with intravenous immunoglobulin, anti-D, and corticosteroids'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-020',
    question: 'A patient with chronic kidney disease presents with severe anemia (Hgb 6.8 g/dL) and fatigue. What is the most likely cause of anemia?',
    options: [
      'Iron deficiency',
      'Erythropoietin deficiency',
      'Chronic inflammation',
      'Bone marrow failure'
    ],
    correctIndex: 1,
    explanation: 'Chronic kidney disease causes anemia primarily through decreased erythropoietin production by the kidneys. This typically develops when GFR falls below 30 mL/min. Treatment includes erythropoiesis-stimulating agents and iron supplementation if iron deficient.',
    references: [
      'Kidney Disease: Improving Global Outcomes (KDIGO) Anemia Work Group. KDIGO Clinical Practice Guideline for Anemia in Chronic Kidney Disease',
      'Babitt JL, et al. Mechanisms of anemia in CKD. J Am Soc Nephrol. 2012;23(10):1631-1634'
    ],
    difficulty: 'easy',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-021',
    question: 'A patient presents with recurrent venous thromboembolism despite adequate anticoagulation. Family history is positive for clots. What hereditary thrombophilia is most common?',
    options: [
      'Factor V Leiden mutation',
      'Prothrombin gene mutation',
      'Antithrombin deficiency',
      'Protein C deficiency'
    ],
    correctIndex: 0,
    explanation: 'Factor V Leiden mutation is the most common hereditary thrombophilia, present in 3-8% of Caucasians. It causes resistance to activated protein C, increasing thrombotic risk 3-8 fold in heterozygotes. Testing is indicated for unprovoked VTE at young age or family history.',
    references: [
      'Rosendaal FR, et al. High risk of thrombosis in patients homozygous for factor V Leiden (activated protein C resistance)',
      'Middeldorp S. Inherited thrombophilias: a double-edged sword'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-022',
    question: 'A patient with essential thrombocythemia has platelet count of 1,200,000/μL and presents with headache and visual changes. What is the most appropriate immediate treatment?',
    options: [
      'Aspirin',
      'Hydroxyurea',
      'Plateletpheresis',
      'Phlebotomy'
    ],
    correctIndex: 2,
    explanation: 'Extreme thrombocytosis (>1,000,000) with neurologic symptoms suggests hyperviscosity or platelet dysfunction paradoxically causing bleeding. Plateletpheresis provides rapid platelet reduction. Hydroxyurea is for long-term control. Aspirin may increase bleeding risk at very high counts.',
    references: [
      'Harrison CN, et al. Hydroxyurea compared with anagrelide in high-risk essential thrombocythemia',
      'Tefferi A, et al. Essential thrombocythemia: 2019 update on diagnosis, risk-stratification and management'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-023',
    question: 'A patient presents with hemolytic anemia, spherocytes on blood smear, positive direct antiglobulin test, and recent viral infection. What is the most likely diagnosis?',
    options: [
      'Hereditary spherocytosis',
      'Autoimmune hemolytic anemia',
      'Microangiopathic hemolytic anemia',
      'G6PD deficiency'
    ],
    correctIndex: 1,
    explanation: 'Positive direct antiglobulin test (Coombs test) with spherocytes indicates autoimmune hemolytic anemia. This can be triggered by infections, medications, or underlying diseases like lymphoma. Treatment includes corticosteroids and managing the underlying cause.',
    references: [
      'Lechner K, et al. Autoimmune hemolytic anemias',
      'Gehrs BC, et al. Autoimmune hemolytic anemia. Am J Hematol. 2002;69(4):258-271'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-024',
    question: 'A patient with acute myeloid leukemia presents with WBC 150,000/μL, altered mental status, and dyspnea. What is the most appropriate immediate intervention?',
    options: [
      'Chemotherapy',
      'Leukapheresis',
      'Antibiotics',
      'Platelet transfusion'
    ],
    correctIndex: 1,
    explanation: 'Hyperleukocytosis with neurologic and pulmonary symptoms indicates leukostasis, where high white cell count impairs microcirculation. Leukapheresis rapidly reduces white cell count and improves symptoms. This should be done before starting chemotherapy.',
    references: [
      'Porcu P, et al. Hyperleukocytosis and leukostasis: a review of pathophysiology, clinical presentation and management',
      'Ganzel C, et al. Very high levels of circulating blasts and leukostasis: physiology, pathophysiology, and therapeutic implications'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-025',
    question: 'A patient with warfarin overdose has an INR of 12 but no active bleeding. What is the most appropriate management?',
    options: [
      'Hold warfarin only',
      'Vitamin K 2.5mg orally',
      'Fresh frozen plasma',
      'Prothrombin complex concentrate'
    ],
    correctIndex: 1,
    explanation: 'For asymptomatic warfarin overdose with very high INR (>9), low-dose oral vitamin K (2.5-5mg) is appropriate. This avoids the prolonged anticoagulant resistance seen with high-dose vitamin K. FFP and PCC are reserved for active bleeding.',
    references: [
      'Holbrook A, et al. Evidence-based management of anticoagulant therapy: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed',
      'Keeling D, et al. Guidelines on oral anticoagulation with warfarin - fourth edition'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-026',
    question: 'A patient presents with bone pain, hypercalcemia, and rouleaux formation on blood smear. Serum protein electrophoresis shows M-spike. What additional test is most important?',
    options: [
      'Bone marrow biopsy',
      'CT scan',
      'Urine protein electrophoresis',
      'Flow cytometry'
    ],
    correctIndex: 2,
    explanation: 'While bone marrow biopsy confirms multiple myeloma, urine protein electrophoresis is crucial to detect Bence Jones proteins (light chains) which can cause renal damage. About 20% of myeloma patients have light chain disease without serum M-spike.',
    references: [
      'Rajkumar SV, et al. International Myeloma Working Group updated criteria for the diagnosis of multiple myeloma',
      'Dispenzieri A, et al. International Myeloma Working Group guidelines for serum-free light chain analysis in multiple myeloma and related disorders'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-027',
    question: 'A patient presents with fatigue, petechiae, and leukocytosis. Blood smear shows >20% blasts. What is the most appropriate next step?',
    options: [
      'Bone marrow biopsy',
      'Flow cytometry',
      'Cytogenetics',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'Acute leukemia (>20% blasts) requires comprehensive evaluation including bone marrow biopsy for morphology, flow cytometry for immunophenotyping, and cytogenetics/molecular studies for prognosis and treatment planning. All are essential for proper classification.',
    references: [
      'Döhner H, et al. Diagnosis and management of AML in adults: 2017 ELN recommendations from an international expert panel',
      'Arber DA, et al. The 2016 revision to the World Health Organization classification of myeloid neoplasms and acute leukemia'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-028',
    question: 'A patient with hereditary spherocytosis presents with severe anemia, jaundice, and fatigue. Hemoglobin dropped from 10 to 5 g/dL. What is the most likely cause?',
    options: [
      'Hemolytic crisis',
      'Aplastic crisis',
      'Sequestration crisis',
      'Iron deficiency'
    ],
    correctIndex: 1,
    explanation: 'Aplastic crisis in hereditary spherocytosis typically caused by parvovirus B19 infection results in temporary cessation of erythropoiesis and severe anemia. This is different from hemolytic crisis (increased hemolysis) and requires supportive care until marrow recovery.',
    references: [
      'Perrotta S, et al. Hereditary spherocytosis. Lancet. 2008;372(9647):1411-1426',
      'Bolton-Maggs PH, et al. Guidelines for the diagnosis and management of hereditary spherocytosis--2011 update'
    ],
    difficulty: 'hard',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-029',
    question: 'A patient receiving heparin develops thrombocytopenia (platelets drop from 300,000 to 80,000) and new arterial thrombosis. What is the most likely diagnosis?',
    options: [
      'Immune thrombocytopenic purpura',
      'Heparin-induced thrombocytopenia',
      'Thrombotic thrombocytopenic purpura',
      'Medication-induced thrombocytopenia'
    ],
    correctIndex: 1,
    explanation: 'HIT presents with thrombocytopenia (usually >50% drop) and paradoxical thrombosis 5-14 days after heparin exposure. It\'s caused by antibodies against heparin-PF4 complexes. Treatment requires stopping all heparin and using alternative anticoagulants like argatroban.',
    references: [
      'Cuker A, et al. American Society of Hematology 2018 guidelines for management of venous thromboembolism: heparin-induced thrombocytopenia',
      'Greinacher A. Heparin-induced thrombocytopenia. J Thromb Haemost. 2009;7 Suppl 1:9-12'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  },
  {
    id: 'heme-030',
    question: 'A patient with thalassemia major presents with heart failure and bronze skin discoloration. Iron studies show ferritin >3000 ng/mL. What is the most likely cause?',
    options: [
      'Hemolysis',
      'Iron overload',
      'Infection',
      'Cardiac disease'
    ],
    correctIndex: 1,
    explanation: 'Chronic transfusion therapy in thalassemia major leads to iron overload (hemosiderosis) causing cardiomyopathy, liver disease, diabetes, and skin pigmentation. Treatment includes iron chelation therapy with deferoxamine, deferiprone, or deferasirox.',
    references: [
      'Cappellini MD, et al. Iron overload disorders: an overview',
      'Taher AT, et al. Thalassemia intermedia: revisited. Blood. 2006;108(12):3699-3707'
    ],
    difficulty: 'medium',
    topicId: 'hematologic-emergencies'
  }
];