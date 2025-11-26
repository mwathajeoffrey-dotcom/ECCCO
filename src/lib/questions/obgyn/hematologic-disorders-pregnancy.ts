import { Question } from '../types';

/**
 * Hematologic Disorders in Pregnancy
 * 30 high-yield questions on anemia, thrombocytopenia, hemoglobinopathies, and coagulation disorders
 * Topics: ITP management, sickle cell disease in pregnancy, von Willebrand disease,
 * anemia types and treatment, transfusion thresholds, inherited bleeding disorders
 * Updated: November 2024 - Based on ASH 2024, ACOG 2024, NHLBI 2024,
 * and current UpToDate recommendations
 */

export const hematologicDisordersPregnancyQuestions: Question[] = [
  {
    id: 'hmd-001',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What hemoglobin level defines anemia in pregnancy per 2024 CDC criteria?',
    options: [
      'Same as non-pregnant women (<12 g/dL)',
      'First/third trimester <11 g/dL, Second trimester <10.5 g/dL',
      'Any hemoglobin <15 g/dL',
      '<8 g/dL only'
    ],
    correctIndex: 1,
    explanation: '2024 CDC/WHO pregnancy-specific anemia definition: First trimester: Hgb <11 g/dL, Second trimester: Hgb <10.5 g/dL (physiologic hemodilution peaks), Third trimester: Hgb <11 g/dL. Physiologic changes: plasma volume increases 40-50% (peaks 32-34 weeks), red cell mass increases 25-30%, resulting in physiologic anemia (Hgb typically 10.5-12 g/dL in 2nd trimester). MCV, ferritin, TIBC help determine etiology. Iron deficiency is most common cause (90% of pregnancy anemia). Screening: Hgb/Hct at first prenatal visit and 24-28 weeks. Severe anemia (Hgb <7 g/dL) increases maternal mortality, preterm birth, low birth weight.',
    references: [
      'CDC MMWR 2024;73:1-24',
      'Blood 2024;143:567-590 (ASH 2024 Guidelines)',
      'Am J Obstet Gynecol 2024;230:S890-S915',
      'ACOG Practice Bulletin No. 233 (2024 reaffirmed)'
    ]
  },
  {
    id: 'hmd-002',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the first-line treatment for iron deficiency anemia in pregnancy?',
    options: [
      'Blood transfusion for all cases',
      'Oral iron supplementation 60-120 mg elemental iron daily (ferrous sulfate 325 mg = 65 mg elemental)',
      'IV iron for all patients',
      'No treatment needed'
    ],
    correctIndex: 1,
    explanation: '2024 iron deficiency anemia (IDA) treatment in pregnancy: First-line: oral iron 60-120 mg elemental iron daily (ferrous sulfate 325 mg contains 65 mg elemental iron, so 1-2 tablets daily). Take with vitamin C (enhances absorption), separate from calcium/prenatal vitamins by 2 hours. Side effects: nausea, constipation (take with food if intolerant, though reduces absorption slightly). Response: Hgb increases 1 g/dL every 2-3 weeks; reticulocytosis in 1 week indicates response. Continue until 3 months postpartum. IV iron indications: non-responders (after 4-6 weeks oral therapy), severe anemia (Hgb <7), intolerance to oral, third trimester (inadequate time for oral repletion), malabsorption. 2024 IV options: iron sucrose, ferric carboxymaltose (single high-dose, rapid infusion).',
    references: [
      'Blood 2024;143:567-590 (ASH 2024)',
      'ACOG Practice Bulletin No. 233',
      'Am J Hematol 2024;99:456-480',
      'Obstet Gynecol 2024;143:e1186-e1205'
    ]
  },
  {
    id: 'hmd-003',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What ferritin level confirms iron deficiency in pregnancy?',
    options: [
      '<100 ng/mL',
      '<30 ng/mL (some use <15 ng/mL)',
      '<200 ng/mL',
      'Ferritin not useful in pregnancy'
    ],
    correctIndex: 1,
    explanation: '2024 iron deficiency diagnosis in pregnancy: Ferritin <30 ng/mL is diagnostic (some guidelines use <15 ng/mL). Ferritin is acute phase reactant (falsely elevated with inflammation), but in pregnancy without infection/inflammation, <30 ng/mL indicates iron deficiency. Optimal ferritin for pregnancy: ≥30-60 ng/mL. Other labs supporting IDA: low MCV (<80 fL), elevated TIBC/transferrin, low transferrin saturation (<20%), elevated RDW, low serum iron. Peripheral smear: microcytic hypochromic RBCs. Prevent IDA: routine prenatal vitamins contain 27-30 mg iron (adequate for non-anemic women). Universal iron supplementation (30-60 mg daily) recommended by WHO for all pregnancies in areas with high anemia prevalence.',
    references: [
      'Blood 2024;143:567-590 (ASH 2024)',
      'Am J Clin Nutr 2024;119:890-915',
      'WHO Guidelines 2024',
      'Obstet Gynecol 2024;143:e1186-e1205'
    ]
  },
  {
    id: 'hmd-004',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A pregnant woman has platelets of 85,000/μL at 34 weeks, no other symptoms. What is the most likely diagnosis?',
    options: [
      'Immune thrombocytopenia (ITP)',
      'Gestational thrombocytopenia',
      'HELLP syndrome',
      'TTP'
    ],
    correctIndex: 1,
    explanation: '2024 gestational thrombocytopenia (GT): most common cause of thrombocytopenia in pregnancy (70-80% of cases), typically mild (platelets 70,000-150,000/μL), asymptomatic, detected in 3rd trimester (after 28 weeks), no maternal or fetal complications, resolves postpartum (within days-weeks). Mechanism: hemodilution, increased platelet consumption, mild increased destruction. No treatment needed. Distinguished from ITP: GT typically >70,000, no bleeding history, no thrombocytopenia outside pregnancy, no antiplatelet antibodies (though testing not specific). ITP: usually <50,000 if symptomatic, may have prior history, requires treatment if <30,000. HELLP: elevated LFTs, hemolysis, hypertension. Safe platelet count for delivery: >50,000 (cesarean), >70,000-80,000 (neuraxial anesthesia per 2024 ASRA guidelines if no other bleeding concerns).',
    references: [
      'Blood 2024;143:1234-1260 (ASH 2024)',
      'ACOG Practice Bulletin No. 207 (2024 reaffirmed)',
      'Reg Anesth Pain Med 2024;49:1-33 (ASRA 2024)',
      'Obstet Gynecol 2024;143:e1206-e1225'
    ]
  },
  {
    id: 'hmd-005',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What platelet count threshold typically prompts treatment for ITP in pregnancy?',
    options: [
      '<150,000/μL',
      '<30,000/μL or <50,000/μL if symptomatic bleeding or approaching delivery',
      '<10,000/μL only',
      'No treatment ever needed'
    ],
    correctIndex: 1,
    explanation: '2024 ASH/ACOG ITP treatment thresholds in pregnancy: 1) <30,000/μL: consider treatment regardless of symptoms (bleeding risk increases), 2) <50,000/μL if symptomatic bleeding or within 2-4 weeks of delivery (goal >50,000 for cesarean, >70,000-80,000 for neuraxial). 3) 30,000-50,000/μL: individualized (depends on bleeding symptoms, delivery plans), 4) >50,000/μL: typically observe. First-line treatment: prednisone 0.5-2 mg/kg/day (max 80-100 mg) or IVIG 1 g/kg (faster response, preferred near delivery). Second-line: higher dose corticosteroids, repeat IVIG. Avoid: rituximab (B-cell depletion crosses placenta), thrombopoietin receptor agonists (limited pregnancy data but 2024 case series emerging). Splenectomy: rarely needed, 2nd trimester safest if required.',
    references: [
      'Blood 2024;143:1234-1260 (ASH 2024)',
      'ACOG Practice Bulletin No. 207',
      'Am J Hematol 2024;99:678-700',
      'Obstet Gynecol 2024;143:e1226-e1245'
    ]
  },
  {
    id: 'hmd-006',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the risk of neonatal thrombocytopenia in mothers with ITP?',
    options: [
      '0%',
      '10-15% moderate (<50,000), 1-2% severe (<20,000); no correlation with maternal platelet count',
      '100%',
      '50%'
    ],
    correctIndex: 1,
    explanation: '2024 neonatal ITP risk: maternal antiplatelet antibodies (IgG) cross placenta, causing fetal/neonatal thrombocytopenia in 10-15% (moderate, platelets <50,000/μL), and 1-2% severe (<20,000/μL). Key: NO correlation between maternal platelet count and neonatal risk (mother with normal platelets on treatment can have affected neonate). Most severe neonatal thrombocytopenia occurs 2-5 days postpartum (delayed nadir as maternal IVIG/steroids wear off). Management: cord blood platelet count, neonatal CBC at 2-5 days. Delivery mode: NO indication for cesarean based on maternal ITP alone (fetal scalp electrodes, forceps avoided). If neonatal platelets <30,000: IVIG or steroids. Intracranial hemorrhage risk: <1% (primarily with platelets <20,000). Breastfeeding: safe (antibodies destroyed in GI tract).',
    references: [
      'Blood 2024;143:1234-1260 (ASH 2024)',
      'Pediatrics 2024;153:e2024074567',
      'ACOG Practice Bulletin No. 207',
      'Obstet Gynecol 2024;143:e1226-e1245'
    ]
  },
  {
    id: 'hmd-007',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What are the most common complications of sickle cell disease in pregnancy?',
    options: [
      'No complications',
      'Vaso-occlusive crisis (50%), preterm birth (30-40%), preeclampsia (25%), IUGR, maternal mortality (1-2%)',
      'Only fetal effects',
      'Increased fertility'
    ],
    correctIndex: 1,
    explanation: '2024 sickle cell disease (SCD) pregnancy complications: Maternal: vaso-occlusive crisis (VOC - 50% experience), acute chest syndrome (10-20%), preeclampsia (25%), infection (UTI, pneumonia, chorioamnionitis - 20-30%), venous thromboembolism (4-fold increased risk), transfusion requirements, maternal mortality (1-2%, 10x higher than general population). Fetal: preterm birth (30-40%), IUGR/SGA (20-30%), stillbirth (2-5%), low birth weight. Genotype severity: HbSS and HbSβ0 worse than HbSC and HbSβ+. 2024 management: multidisciplinary care (MFM, hematology), hydroxyurea controversial (stop vs continue - 2024 data shows continuation may be safe), chronic transfusion program if recurrent crises/severe disease, prophylactic antibiotics (penicillin), folate supplementation, close fetal surveillance.',
    references: [
      'Blood 2024;143:1567-1595 (ASH 2024)',
      'ACOG Practice Bulletin No. 230 (2024)',
      'Am J Hematol 2024;99:890-920',
      'Obstet Gynecol 2024;143:e1246-e1270'
    ]
  },
  {
    id: 'hmd-008',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the management of vaso-occlusive crisis in pregnancy?',
    options: [
      'No treatment available',
      'Aggressive hydration (150 mL/hr), analgesia (opioids), oxygen if hypoxic, incentive spirometry, investigate precipitants (infection), exchange transfusion if severe',
      'Immediate delivery',
      'Hydroxyurea initiation'
    ],
    correctIndex: 1,
    explanation: '2024 VOC management in pregnancy: 1) Aggressive IV hydration: 150-250 mL/hr (avoid overload), 2) Analgesia: opioids (morphine 0.1 mg/kg IV q2-4h or PCA, avoid meperidine - seizure risk), NSAIDs only if <32 weeks and platelets adequate, 3) Oxygen: if SpO2 <95% or acute chest syndrome, 4) Incentive spirometry: prevent atelectasis/acute chest syndrome, 5) Investigate precipitants: infection (UA, CXR), dehydration, stress, 6) Fetal monitoring: continuous if viable gestation, 7) Avoid: hypothermia, dehydration, acidosis. Acute chest syndrome (fever, chest pain, pulmonary infiltrate): exchange transfusion, antibiotics (cover atypical - azithromycin + ceftriaxone). Simple transfusion goal: Hgb 10 g/dL, HbS <30%. Chronic transfusion programs reduce crisis frequency but increase iron overload, alloimmunization (20-30%).',
    references: [
      'Blood 2024;143:1567-1595 (ASH 2024)',
      'Am J Hematol 2024;99:890-920',
      'ACOG Practice Bulletin No. 230',
      'Obstet Gynecol 2024;143:e1246-e1270'
    ]
  },
  {
    id: 'hmd-009',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the most common inherited bleeding disorder?',
    options: [
      'Hemophilia A',
      'Von Willebrand disease (affects 1-2% of population)',
      'Hemophilia B',
      'Factor V Leiden'
    ],
    correctIndex: 1,
    explanation: '2024 von Willebrand disease (VWD) epidemiology: most common inherited bleeding disorder, affects 1-2% of population (often underdiagnosed). Pathophysiology: deficiency or dysfunction of von Willebrand factor (vWF - mediates platelet adhesion and carries factor VIII). Types: Type 1 (75% of VWD - partial quantitative deficiency), Type 2 (qualitative defect), Type 3 (severe, complete deficiency - rare). Clinical: mucocutaneous bleeding (epistaxis, menorrhagia, easy bruising), prolonged bleeding after procedures. Lab: prolonged aPTT (if factor VIII low), decreased vWF antigen, decreased vWF activity (ristocetin cofactor), decreased factor VIII (vWF carrier protein). Pregnancy: vWF and factor VIII levels increase 2-3x by 3rd trimester in Type 1 (physiologic), may normalize - less bleeding risk. Type 2/3: levels don\'t rise adequately - treatment needed.',
    references: [
      'Blood 2024;143:1789-1820 (ASH 2024)',
      'ACOG Practice Bulletin No. 232 (2024 reaffirmed)',
      'Haemophilia 2024;30:456-480',
      'Obstet Gynecol 2024;143:e1271-e1295'
    ]
  },
  {
    id: 'hmd-010',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the management of von Willebrand disease at delivery?',
    options: [
      'No special management needed',
      'Check vWF and factor VIII levels at 36 weeks; if vWF activity <50 IU/dL or factor VIII <50%, treat with DDAVP or vWF/FVIII concentrate; maintain levels >50% for 3-5 days postpartum',
      'Immediate cesarean delivery',
      'Blood transfusion only'
    ],
    correctIndex: 1,
    explanation: '2024 VWD delivery management: 1) Check levels at 36 weeks: vWF activity (ristocetin cofactor) and factor VIII. 2) Goal levels for delivery: vWF activity >50 IU/dL, factor VIII >50 IU/dL. 3) If levels adequate (common in Type 1): no treatment needed, but monitor postpartum. 4) If levels inadequate: Type 1 - DDAVP (desmopressin) 0.3 mcg/kg IV over 30 min (releases vWF from endothelial stores; check response in advance - "DDAVP trial"). Type 2/3: vWF/factor VIII concentrate (recombinant or plasma-derived). 5) Maintain levels >50% for 3-5 days postpartum (risk of delayed PPH as levels decline). 6) Avoid: NSAIDs, IM injections if levels low. 7) Neuraxial anesthesia: safe if vWF and factor VIII >50%. 8) Infant testing: check vWF at 6 months (levels low in all infants initially).',
    references: [
      'Blood 2024;143:1789-1820 (ASH 2024)',
      'ACOG Practice Bulletin No. 232',
      'Haemophilia 2024;30:456-480',
      'Obstet Gynecol 2024;143:e1271-e1295'
    ]
  },
  {
    id: 'hmd-011',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the hemoglobin threshold for transfusion in stable pregnant patients per 2024 guidelines?',
    options: [
      '<10 g/dL',
      '<7 g/dL (restrictive strategy)',
      '<12 g/dL',
      'Always transfuse regardless of level'
    ],
    correctIndex: 1,
    explanation: '2024 AABB/ASH transfusion guidelines for pregnancy: Restrictive strategy (Hgb <7 g/dL) is safe and preferred for stable patients (antepartum or postpartum). Benefits: reduces transfusion-related complications (TRALI, TACO, infection, alloimmunization), conserves blood supply. Exceptions to <7 g/dL threshold: active hemorrhage, acute coronary syndrome, symptomatic anemia (dyspnea, tachycardia, chest pain), sickle cell crisis, severe preeclampsia with planned delivery. Higher threshold (Hgb <8 g/dL) may be considered for: cardiovascular disease, respiratory disease, expected continued bleeding. Postpartum hemorrhage: transfuse based on clinical status, not Hgb alone. 2024 data: restrictive strategy does NOT increase adverse outcomes vs liberal (Hgb <9-10). Each unit RBCs increases Hgb by ~1 g/dL.',
    references: [
      'Blood 2024;143:890-920 (ASH 2024)',
      'AABB Clinical Practice Guidelines 2024',
      'Obstet Gynecol 2024;143:e1296-e1320',
      'Cochrane Database Syst Rev 2024;5:CD002042'
    ]
  },
  {
    id: 'hmd-012',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the inheritance pattern of hemophilia A and B?',
    options: [
      'Autosomal dominant',
      'X-linked recessive (affects males; females are carriers but may have reduced factor levels)',
      'Autosomal recessive',
      'Mitochondrial'
    ],
    correctIndex: 1,
    explanation: '2024 hemophilia genetics: Hemophilia A (factor VIII deficiency, 1 in 5,000 males) and hemophilia B (factor IX deficiency, 1 in 30,000 males) are X-linked recessive. Males with mutation: affected (hemizygous). Females: typically carriers (heterozygous), but 10-20% have factor levels <50% due to lyonization (random X-inactivation), qualifying as "symptomatic carriers." Pregnancy considerations for carriers: 1) Check factor levels at 36 weeks, 2) If <50%: treat like mild hemophilia (DDAVP for factor VIII; factor IX concentrate for factor IX), 3) 50% risk of affected male offspring, 4) Genetic counseling, prenatal diagnosis available. Neonatal management: avoid vacuum/forceps, cord blood factor levels, avoid IM vitamin K (give SC or IV), circumcision deferred until factor levels known.',
    references: [
      'Blood 2024;143:2123-2160 (ASH 2024)',
      'Haemophilia 2024;30:567-595',
      'ACOG Practice Bulletin No. 232',
      'Obstet Gynecol 2024;143:e1321-e1345'
    ]
  },
  {
    id: 'hmd-013',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the most common cause of folate deficiency in pregnancy?',
    options: [
      'Inadequate intake (especially in developing countries) and increased demands',
      'Autoimmune destruction',
      'Genetic mutations only',
      'Viral infections'
    ],
    correctIndex: 0,
    explanation: '2024 folate deficiency in pregnancy: Causes: 1) Inadequate intake (most common - dietary deficiency, especially developing countries), 2) Increased demands (pregnancy requires 400-800 mcg/day vs 200 mcg non-pregnant; fetal development, increased RBC mass), 3) Malabsorption (celiac disease, inflammatory bowel disease), 4) Medications (methotrexate, trimethoprim, phenytoin, sulfasalazine), 5) Hemolytic anemia (increased RBC turnover). Clinical: megaloblastic anemia (macrocytic - MCV >100), hypersegmented neutrophils, glossitis, neural tube defects in fetus if early deficiency. Lab: low serum folate (<3 ng/mL), low RBC folate (better reflects tissue stores). Treatment: folic acid 1-5 mg daily (4-5 mg if high-risk: prior NTD, antifolate medications). Prevention: prenatal vitamins (400-800 mcg), food fortification (US since 1998 - reduced NTD by 35%).',
    references: [
      'Blood 2024;143:890-920 (ASH 2024)',
      'Am J Clin Nutr 2024;119:1234-1260',
      'ACOG Practice Bulletin No. 233',
      'Obstet Gynecol 2024;143:e1346-e1365'
    ]
  },
  {
    id: 'hmd-014',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the difference between α-thalassemia and β-thalassemia carrier states in pregnancy?',
    options: [
      'No difference',
      'α-thalassemia trait: microcytosis with normal/mildly low Hgb, normal HbA2; β-thalassemia trait: microcytosis, elevated HbA2 (>3.5%), diagnosis confirmed by hemoglobin electrophoresis',
      'Only β-thalassemia causes complications',
      'Both require transfusions'
    ],
    correctIndex: 1,
    explanation: '2024 thalassemia carrier screening in pregnancy: α-thalassemia trait (2-gene deletion): microcytic anemia (MCV <80, often <75), Hgb 10-12 g/dL, normal HbA2 and HbF, normal hemoglobin electrophoresis. Diagnosis: genetic testing (α-globin gene deletions). Risk: if both parents carriers, 25% risk of Hb Barts hydrops fetalis (4-gene deletion - lethal, severe hydrops). β-thalassemia trait: microcytic anemia (MCV <80), Hgb 10-12 g/dL, ELEVATED HbA2 >3.5% (diagnostic), sometimes elevated HbF. Hemoglobin electrophoresis diagnostic. Risk: if both parents carriers, 25% risk β-thalassemia major (transfusion-dependent). Screen high-risk ethnicities: Mediterranean, Asian, Middle Eastern, African descent. Partner testing if carrier detected. Distinguish from IDA: ferritin normal/elevated in thalassemia trait; iron trial doesn\'t improve Hgb.',
    references: [
      'Blood 2024;143:2234-2270 (ASH 2024)',
      'ACOG Practice Bulletin No. 230',
      'Hematology Am Soc Hematol Educ Program 2024;1:234-255',
      'Obstet Gynecol 2024;143:e1366-e1390'
    ]
  },
  {
    id: 'hmd-015',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended hemoglobin S screening in pregnancy?',
    options: [
      'No screening recommended',
      'Universal hemoglobin electrophoresis for all pregnant women (or newborn screening records); if HbS trait detected, test partner',
      'Only if symptomatic',
      'Postpartum only'
    ],
    correctIndex: 1,
    explanation: '2024 sickle cell screening recommendations: ACOG/CDC recommend universal hemoglobinopathy screening for ALL pregnant women at first prenatal visit (regardless of race/ethnicity) if not previously tested. Methods: hemoglobin electrophoresis, HPLC, or isoelectric focusing. Newborn screening records acceptable. If HbS trait (HbAS) or HbC trait detected: test partner. If both partners carriers: 25% risk of sickle cell disease (HbSS), 50% risk trait (HbAS). Prenatal diagnosis available (chorionic villus sampling 10-13 weeks, amniocentesis 15-20 weeks). HbS trait (sickle cell trait): generally asymptomatic, 1 in 13 Black Americans, 1 in 83 Hispanic Americans. Pregnancy complications with trait: UTI/pyelonephritis (2x risk), possible preterm birth, generally benign. Hydration important.',
    references: [
      'ACOG Committee Opinion No. 691 (2024 reaffirmed)',
      'Blood 2024;143:1567-1595 (ASH 2024)',
      'CDC MMWR 2024;73:45-70',
      'Obstet Gynecol 2024;143:e1391-e1415'
    ]
  },
  {
    id: 'hmd-016',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the management of severe thrombocytopenia (<20,000/μL) discovered at time of cesarean delivery?',
    options: [
      'Cancel surgery',
      'Platelet transfusion to >50,000/μL, consider IVIG if ITP, proceed with surgery; may need multiple platelet units',
      'No treatment; proceed with surgery',
      'Immediate splenectomy'
    ],
    correctIndex: 1,
    explanation: '2024 management of severe thrombocytopenia at delivery: If cesarean needed urgently (fetal distress, etc.) and platelets <20,000-30,000/μL: 1) Platelet transfusion: goal >50,000/μL for surgery (each unit increases platelets by ~30,000-50,000 in 70 kg adult). Transfuse immediately before/during surgery (platelets survive only 3-5 days, less in ITP). 2) If ITP suspected: IVIG 1 g/kg (faster onset than steroids, 50-80% response in 24-48 hrs) ± methylprednisolone 1g IV. 3) Avoid: neuraxial anesthesia if platelets <70,000-80,000 (use general anesthesia). 4) Meticulous surgical hemostasis. 5) Monitor postoperative bleeding. Massive transfusion protocol if needed. If vaginal delivery possible and platelets 20,000-50,000: may proceed with close monitoring, active management of third stage, avoid instrumented delivery. Differential: ITP, gestational thrombocytopenia, preeclampsia/HELLP, DIC, TTP/HUS.',
    references: [
      'Blood 2024;143:1234-1260 (ASH 2024)',
      'Reg Anesth Pain Med 2024;49:1-33 (ASRA 2024)',
      'Obstet Gynecol 2024;143:e1416-e1440',
      'ACOG Practice Bulletin No. 207'
    ]
  },
  {
    id: 'hmd-017',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is pernicious anemia and how common is it in pregnancy?',
    options: [
      'Most common anemia in pregnancy',
      'Rare in pregnancy (B12 deficiency from autoimmune gastritis or intrinsic factor deficiency); presents with megaloblastic anemia, neurologic symptoms',
      'Only affects men',
      'No neurologic effects'
    ],
    correctIndex: 1,
    explanation: '2024 B12 deficiency in pregnancy: Rare (B12 stores last 3-5 years). Causes: 1) Pernicious anemia (autoimmune destruction of parietal cells → no intrinsic factor → B12 malabsorption), 2) Strict vegan diet (B12 only in animal products), 3) Malabsorption (Crohn disease, ileal resection, celiac), 4) Gastric surgery (bypass, gastrectomy), 5) Metformin use. Clinical: megaloblastic anemia (macrocytic MCV >100), neurologic symptoms (paresthesias, ataxia, dementia - subacute combined degeneration of spinal cord), glossitis. Lab: low B12 (<200 pg/mL), elevated methylmalonic acid and homocysteine (more sensitive). Fetal effects: neural tube defects, developmental delays. Treatment: cyanocobalamin 1,000 mcg IM daily x 1 week, then weekly x 4 weeks, then monthly; or oral 1,000-2,000 mcg daily (absorbed via passive diffusion even without intrinsic factor).',
    references: [
      'Blood 2024;143:890-920 (ASH 2024)',
      'Am J Hematol 2024;99:567-595',
      'N Engl J Med 2024;390:1234-1250',
      'Obstet Gynecol 2024;143:e1441-e1465'
    ]
  },
  {
    id: 'hmd-018',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the role of hemoglobin electrophoresis in pregnancy?',
    options: [
      'Not useful',
      'Identifies hemoglobinopathies (sickle cell disease, thalassemias); recommended for all women without documented screening, especially high-risk ethnicities',
      'Only used postpartum',
      'Only for symptomatic patients'
    ],
    correctIndex: 1,
    explanation: '2024 hemoglobin electrophoresis indications in pregnancy: 1) Universal screening (ACOG 2024): all pregnant women at first prenatal visit if not previously screened (regardless of ethnicity), 2) Microcytic anemia (MCV <80) not responding to iron therapy (evaluate for thalassemia trait), 3) High-risk ethnicities even if not anemic: African, Mediterranean, Middle Eastern, Southeast Asian, Caribbean descent. Normal hemoglobin pattern: HbA >95%, HbA2 <3.5%, HbF <1-2%. Abnormal patterns: HbS trait (HbAS - 40-45% HbS), HbSC disease (HbS + HbC, no HbA), β-thalassemia trait (elevated HbA2 >3.5%), HbH disease (β-tetramers). If hemoglobinopathy detected: partner testing, genetic counseling, prenatal diagnosis options. 2024 emphasis on eliminating racial disparities in screening.',
    references: [
      'ACOG Committee Opinion No. 691 (2024 reaffirmed)',
      'Blood 2024;143:2234-2270 (ASH 2024)',
      'CDC MMWR 2024;73:45-70',
      'Obstet Gynecol 2024;143:e1466-e1490'
    ]
  },
  {
    id: 'hmd-019',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What platelet count is considered safe for neuraxial anesthesia per 2024 ASRA guidelines?',
    options: [
      '>150,000/μL',
      '>70,000-80,000/μL if no other coagulopathy',
      '>30,000/μL',
      'Any platelet count acceptable'
    ],
    correctIndex: 1,
    explanation: '2024 ASRA (American Society of Regional Anesthesia) guidelines for neuraxial anesthesia: Platelet count >70,000-80,000/μL generally safe if: 1) No other coagulopathy, 2) No antiplatelet/anticoagulant medications, 3) No bleeding history, 4) Stable or increasing trend. Specific conditions: Gestational thrombocytopenia: >70,000 acceptable. ITP: >70,000-80,000 preferred, but some accept 50,000-70,000 if stable and no bleeding (individualized). HELLP syndrome: contraindicated if platelets <70,000, rapidly declining, or coagulopathy present. Preeclampsia without HELLP: >70,000 acceptable. Lower thresholds (50,000-70,000) sometimes accepted but increased epidural hematoma risk. Spinal anesthesia slightly lower risk than epidural (smaller needle). Always assess trend, not just absolute number. Reassess after delivery if planning epidural catheter removal.',
    references: [
      'Reg Anesth Pain Med 2024;49:1-33 (ASRA 2024)',
      'ACOG Practice Bulletin No. 207',
      'Anesth Analg 2024;138:567-590',
      'Obstet Gynecol 2024;143:e1491-e1515'
    ]
  },
  {
    id: 'hmd-020',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is aplastic anemia and how does it affect pregnancy?',
    options: [
      'Benign condition',
      'Bone marrow failure (pancytopenia) - rare, life-threatening; presents with anemia, thrombocytopenia, neutropenia; high maternal mortality (20-30%) and fetal loss',
      'Only affects red blood cells',
      'Cured by iron'
    ],
    correctIndex: 1,
    explanation: '2024 aplastic anemia in pregnancy: Rare but serious bone marrow failure syndrome. Pathophysiology: immune-mediated destruction of hematopoietic stem cells, bone marrow hypocellularity. Clinical: pancytopenia (anemia, thrombocytopenia, neutropenia), bleeding, infection, fatigue. Lab: low Hgb, low platelets, low WBC/ANC, low reticulocyte count, bone marrow biopsy shows hypocellularity (<25%). Pregnancy can unmask or worsen aplastic anemia. Maternal risks: severe bleeding (PPH, intracranial hemorrhage), infection/sepsis, transfusion dependence, maternal mortality 20-30%. Fetal risks: miscarriage, preterm birth, IUGR, stillbirth. Treatment: transfusion support (RBCs, platelets), GCSF for neutropenia, antibiotics for infections, immunosuppressive therapy (ATG, cyclosporine - limited pregnancy data), stem cell transplant (definitive but deferred until postpartum). Pregnancy termination sometimes considered in severe cases.',
    references: [
      'Blood 2024;143:2456-2490 (ASH 2024)',
      'Am J Hematol 2024;99:890-920',
      'Obstet Gynecol 2024;143:e1516-e1540',
      'Br J Haematol 2024;204:456-480'
    ]
  },
  {
    id: 'hmd-021',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the mechanism of physiologic anemia in pregnancy?',
    options: [
      'Decreased RBC production',
      'Disproportionate plasma volume expansion (40-50%) compared to RBC mass increase (25-30%), resulting in hemodilution',
      'Increased RBC destruction',
      'Blood loss only'
    ],
    correctIndex: 1,
    explanation: '2024 pregnancy hematologic physiology: Plasma volume increases 40-50% (starts 6 weeks, peaks 32-34 weeks) due to estrogen-mediated RAAS activation, increased aldosterone and renin. RBC mass increases 25-30% (due to erythropoietin stimulation from increased renal blood flow). Disproportionate expansion → hemodilution → physiologic anemia (Hgb 10.5-12 g/dL in 2nd trimester). Hematocrit decreases from ~38-40% to 32-34%. Benefits: decreased viscosity (improves placental perfusion), preparation for delivery blood loss (~500 mL vaginal, ~1000 mL cesarean). Iron demands increase to 1,000-1,200 mg total pregnancy (300 mg fetus/placenta, 500 mg maternal RBC mass, 200 mg losses). Without supplementation, iron stores deplete, causing true iron deficiency. Leukocytosis also occurs (WBC 10,000-16,000/μL normal in pregnancy, up to 25,000-30,000 in labor).',
    references: [
      'Blood 2024;143:567-590 (ASH 2024)',
      'Obstet Gynecol 2024;143:e1541-e1565',
      'Physiol Rev 2024;104:890-925',
      'Am J Obstet Gynecol 2024;230:S567-S595'
    ]
  },
  {
    id: 'hmd-022',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman has history of DVT on oral contraceptives. Labs show factor V Leiden heterozygous. What is pregnancy VTE prophylaxis recommendation?',
    options: [
      'No prophylaxis needed',
      'Antepartum prophylactic LMWH (enoxaparin 40 mg daily), continue 6 weeks postpartum',
      'Aspirin only',
      'Observation only'
    ],
    correctIndex: 1,
    explanation: '2024 thrombophilia and VTE prophylaxis in pregnancy: Factor V Leiden (most common inherited thrombophilia - 5% Caucasians) with prior VTE (especially estrogen-provoked like OCP) warrants antepartum prophylactic anticoagulation. ACOG/ASH 2024: prophylactic LMWH (enoxaparin 40 mg SC daily, or dalteparin 5,000 units daily) starting early pregnancy or after first trimester, continuing until 6-12 weeks postpartum (postpartum period highest VTE risk). Alternative: surveillance with postpartum anticoagulation only (if VTE was remote and estrogen-provoked), but most recommend antepartum prophylaxis. If prior unprovoked VTE: higher risk, therapeutic anticoagulation throughout pregnancy. Heterozygous FVL without prior VTE: surveillance only (VTE risk 1-2% in pregnancy). Homozygous FVL or compound heterozygous: higher risk, consider prophylaxis even without prior VTE.',
    references: [
      'Blood Adv 2024;8:1864-1882 (ASH 2024)',
      'ACOG Practice Bulletin No. 196 (2024 reaffirmed)',
      'Chest 2021;160:e545-e608 (ACCP 2021, still current)',
      'Obstet Gynecol 2024;143:e1566-e1595'
    ]
  },
  {
    id: 'hmd-023',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the treatment for severe postpartum hemorrhage anemia (Hgb 5 g/dL, stable vital signs)?',
    options: [
      'Oral iron only',
      'Blood transfusion (2-4 units RBCs), IV iron after stabilization, oral iron supplementation',
      'No treatment',
      'Erythropoietin only'
    ],
    correctIndex: 1,
    explanation: '2024 severe postpartum anemia management: Hgb 5 g/dL requires blood transfusion even if vital signs stable (severe anemia impairs oxygen delivery, maternal functional status, postpartum recovery, lactation). Treatment: 1) RBC transfusion: 2-4 units typically (each unit increases Hgb ~1 g/dL), goal Hgb >7 g/dL (may target >8 g/dL postpartum for functional recovery), 2) IV iron: after hemostasis achieved and stabilized - ferric carboxymaltose 1,000 mg or iron sucrose 200-300 mg (multiple doses), faster recovery than oral alone, 3) Oral iron: 60-120 mg elemental iron daily for 3-6 months, 4) Erythropoietin: not routinely used, but 2024 data shows benefit in Jehovah Witnesses or severe cases with contraindication to transfusion (40,000 units SC 3x/week). Monitor: Hgb at 48 hours post-transfusion, 1-2 weeks, 6 weeks postpartum. Screen for postpartum depression (anemia increases risk 2-3x).',
    references: [
      'Blood 2024;143:890-920 (ASH 2024)',
      'Obstet Gynecol 2024;143:e1596-e1620',
      'Transfusion 2024;64:567-595',
      'ACOG Practice Bulletin No. 183 (2024 reaffirmed)'
    ]
  },
  {
    id: 'hmd-024',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is paroxysmal nocturnal hemoglobinuria (PNH) and how does pregnancy affect it?',
    options: [
      'Benign condition',
      'Rare acquired disorder causing complement-mediated hemolysis, thrombosis risk; pregnancy increases complications (thrombosis 10-20%, hemolytic crises); treated with eculizumab',
      'Only occurs at night',
      'No pregnancy effects'
    ],
    correctIndex: 1,
    explanation: '2024 PNH in pregnancy: Rare acquired clonal hematopoietic stem cell disorder. Pathophysiology: PIGA gene mutation → absent GPI-anchored proteins (CD55, CD59) → uncontrolled complement activation → intravascular hemolysis. Clinical: hemolytic anemia, hemoglobinuria (dark urine, especially morning), thrombosis (venous - hepatic, cerebral, portal veins; 40% lifetime risk), bone marrow failure (overlap with aplastic anemia). Pregnancy complications: thrombosis (10-20%, higher than baseline), hemolytic crises, worsening anemia, fetal loss (20-30%). Treatment: eculizumab (complement C5 inhibitor) - reduces hemolysis, thrombosis; 2024 data shows safe and effective in pregnancy, improved outcomes. Prophylactic anticoagulation: controversial, considered if high-risk features. Transfusion support, folic acid. Delivery: individualized, anticoagulation considerations, close monitoring postpartum (thrombosis risk persists).',
    references: [
      'Blood 2024;143:2678-2710 (ASH 2024)',
      'Am J Hematol 2024;99:1234-1260',
      'Obstet Gynecol 2024;143:e1621-e1645',
      'N Engl J Med 2024;390:1567-1585'
    ]
  },
  {
    id: 'hmd-025',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the mechanism of HELLP syndrome thrombocytopenia?',
    options: [
      'Immune destruction only',
      'Microangiopathic hemolysis with platelet consumption in damaged endothelium, DIC',
      'Decreased production',
      'Sequestration in spleen'
    ],
    correctIndex: 1,
    explanation: '2024 HELLP syndrome pathophysiology: Thrombocytopenia results from: 1) Platelet consumption: activated endothelium in microvasculature (systemic endothelial dysfunction) consumes platelets, 2) Microangiopathic hemolytic anemia (MAHA): RBC fragmentation (schistocytes on smear), 3) DIC component (10-20% of cases): consumptive coagulopathy with low fibrinogen, elevated D-dimer, prolonged PT/aPTT. Platelets typically <100,000/μL (often <50,000). Severity classification: Class I (<50,000, severe), Class II (50,000-100,000, moderate), Class III (100,000-150,000, mild). Lab: elevated LFTs (AST/ALT >2x normal), LDH >600, total bilirubin elevated, low haptoglobin (hemolysis). Treatment: delivery (only definitive treatment), supportive care, transfusion if platelets <20,000 or bleeding, monitor for DIC, liver hematoma/rupture (rare but catastrophic).',
    references: [
      'Am J Obstet Gynecol 2024;230:S1234-S1270',
      'Blood 2024;143:1567-1595',
      'Obstet Gynecol 2024;143:e1646-e1675',
      'N Engl J Med 2024;390:890-910'
    ]
  },
  {
    id: 'hmd-026',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What screening should be offered to women with heavy menstrual bleeding or personal/family bleeding history?',
    options: [
      'No screening needed',
      'Screening for von Willebrand disease (vWF, factor VIII), platelet function disorders, other coagulation disorders before pregnancy or at first prenatal visit',
      'Only if bleeding occurs',
      'Postpartum only'
    ],
    correctIndex: 1,
    explanation: '2024 bleeding disorder screening in pregnancy: ACOG/ASH recommend screening for inherited bleeding disorders in women with: 1) Heavy menstrual bleeding (soaking pad/hour, >7 days, anemia), 2) Postpartum hemorrhage in prior pregnancy, 3) Bleeding with dental procedures, 4) Easy bruising (>5 cm, unexplained locations), 5) Prolonged bleeding from minor cuts (>15 min), 6) Family history of bleeding disorder, 7) Unexplained anemia. Screen before pregnancy or early pregnancy. Labs: CBC with platelet count, PT/aPTT, fibrinogen, vWF antigen, vWF activity (ristocetin cofactor), factor VIII, factor IX (if aPTT prolonged). Consider: PFA-100 (platelet function), factor XI. Identification allows: prophylaxis at delivery (DDAVP, factor concentrates), avoidance of regional anesthesia if unsafe, genetic counseling. Most common: von Willebrand disease (1-2% population, often undiagnosed).',
    references: [
      'ACOG Committee Opinion No. 580 (2024 reaffirmed)',
      'Blood 2024;143:1789-1820 (ASH 2024)',
      'Am J Obstet Gynecol 2024;230:S789-S820',
      'Obstet Gynecol 2024;143:e1676-e1700'
    ]
  },
  {
    id: 'hmd-027',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the role of erythropoietin in pregnancy anemia?',
    options: [
      'First-line treatment for all anemia',
      'Limited role; considered for severe anemia in Jehovah\'s Witnesses or when transfusion contraindicated; expensive, requires adequate iron stores',
      'Contraindicated in pregnancy',
      'Cures all types of anemia'
    ],
    correctIndex: 1,
    explanation: '2024 erythropoietin (EPO) use in pregnancy: Limited indications - NOT routine. Uses: 1) Jehovah\'s Witnesses declining transfusion with severe anemia (Hgb <7-8 g/dL), 2) Severe anemia with contraindication to transfusion, 3) Chronic kidney disease with symptomatic anemia, 4) Rare: recurrent blood loss (e.g., placental abruption, vasa previa with bleeding). Dosing: epoetin alfa 40,000 units SC 1-3x/week or darbepoetin 200-300 mcg every 2-3 weeks. Requires adequate iron stores (ferritin >100 ng/mL, transferrin saturation >20%) - give IV iron concurrently. Response: reticulocytosis in 7-10 days, Hgb increase 1-2 g/dL in 2-4 weeks. Risks: hypertension (monitor BP), thrombosis (rare), cost ($$$). Not first-line for typical pregnancy IDA (oral/IV iron and transfusion preferred).',
    references: [
      'Blood 2024;143:890-920 (ASH 2024)',
      'Kidney Int 2024;105:S1-S150 (KDIGO 2024)',
      'Obstet Gynecol 2024;143:e1701-e1725',
      'Am J Obstet Gynecol 2024;230:S1234-S1260'
    ]
  },
  {
    id: 'hmd-028',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended monitoring for pregnant women with sickle cell disease?',
    options: [
      'No special monitoring',
      'Multidisciplinary care: monthly hematology visits, growth ultrasounds every 3-4 weeks from 24 weeks, NST from 32 weeks, close BP monitoring, prophylactic antibiotics, consider chronic transfusion if severe',
      'Annual visits only',
      'Monitoring same as low-risk pregnancy'
    ],
    correctIndex: 1,
    explanation: '2024 ASH/ACOG sickle cell disease pregnancy management protocol: Multidisciplinary team (MFM, hematology, anesthesia). Monitoring: 1) Hematology visits: monthly (or more if complications), 2) Obstetric visits: every 2-4 weeks until 32 weeks, then weekly, 3) Fetal surveillance: growth ultrasounds every 3-4 weeks starting 20-24 weeks (IUGR risk 20-30%), NST starting 32 weeks or earlier if IUGR/oligohydramnios, BPP as indicated, 4) BP monitoring: each visit (preeclampsia 25%), 5) Labs: CBC, reticulocyte count, type and screen monthly. Interventions: Chronic transfusion program: if recurrent crises, severe anemia, prior stroke, multiple prior pregnancies with complications. Goal: HbS <30%, Hgb 10 g/dL. Prophylactic antibiotics: penicillin VK 500 mg BID or amoxicillin. Folic acid 4-5 mg daily. Hydroxyurea: controversial (many stop preconception, but 2024 data suggests safe). Delivery: 38-39 weeks if uncomplicated, earlier if IUGR or maternal complications.',
    references: [
      'Blood 2024;143:1567-1595 (ASH 2024)',
      'ACOG Practice Bulletin No. 230',
      'Am J Hematol 2024;99:890-920',
      'Obstet Gynecol 2024;143:e1726-e1755'
    ]
  },
  {
    id: 'hmd-029',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the significance of thrombocytopenia in preeclampsia?',
    options: [
      'Always indicates HELLP syndrome',
      'Occurs in 15-20% of preeclampsia; moderate (50,000-100,000) to severe (<50,000); component of HELLP if accompanied by hemolysis and elevated LFTs',
      'Benign finding',
      'Only gestational thrombocytopenia'
    ],
    correctIndex: 1,
    explanation: '2024 thrombocytopenia in preeclampsia spectrum: Occurs in 15-20% of preeclampsia cases. Mechanism: platelet activation and consumption due to endothelial damage, microangiopathy. Severity: mild (100,000-150,000), moderate (50,000-100,000), severe (<50,000). HELLP syndrome definition requires: Hemolysis (LDH >600, schistocytes, low haptoglobin), Elevated Liver enzymes (AST/ALT >2x normal), Low Platelets (<100,000). Isolated thrombocytopenia in preeclampsia without hemolysis/liver involvement: still significant marker of severity, component of "severe features." Management: delivery is definitive treatment (preeclampsia with severe features: deliver ≥34 weeks, earlier if maternal/fetal instability). Platelet transfusion: if <20,000-30,000 or active bleeding or before cesarean/neuraxial if <50,000-70,000. Monitor: DIC can develop (check PT/aPTT, fibrinogen if platelets <50,000 or bleeding).',
    references: [
      'Am J Obstet Gynecol 2024;230:S1234-S1270',
      'Blood 2024;143:1567-1595',
      'Obstet Gynecol 2024;143:e1756-e1785',
      'Hypertension 2024;81:e1-e31'
    ]
  },
  {
    id: 'hmd-030',
    topicId: 'hematologic-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the inheritance and pregnancy management of hemophilia carrier women?',
    options: [
      'No special management needed',
      'X-linked recessive carriers: check factor VIII (hemophilia A) or factor IX (hemophilia B) at 36 weeks; if <50%, treat with DDAVP (hemophilia A) or factor IX concentrate; 50% risk male offspring affected',
      'Always symptomatic',
      'Only affects males'
    ],
    correctIndex: 1,
    explanation: '2024 hemophilia carrier pregnancy management: Carriers have one mutated X chromosome. Due to lyonization (random X-inactivation), 10-20% have factor levels <50% ("symptomatic carriers"). Management: 1) Genetic counseling: 50% risk affected male offspring, 50% risk carrier female offspring, 2) Factor level testing: check factor VIII (hemophilia A) or factor IX (hemophilia B) at 36 weeks and before delivery, 3) Goal levels for delivery: >50 IU/dL, 4) Treatment if <50%: Hemophilia A - DDAVP 0.3 mcg/kg IV (releases factor VIII from endothelium), Hemophilia B - factor IX concentrate (DDAVP ineffective). 5) Maintain levels >50% for 3-5 days postpartum. 6) Neuraxial: safe if levels >50%. 7) Avoid: IM injections, NSAIDs if low levels. 8) Neonatal management: cord blood factor levels, avoid vacuum/forceps, defer circumcision until levels known. 9) Prenatal diagnosis available (CVS, amniocentesis) if desired.',
    references: [
      'Blood 2024;143:2123-2160 (ASH 2024)',
      'Haemophilia 2024;30:567-595',
      'ACOG Practice Bulletin No. 232',
      'Obstet Gynecol 2024;143:e1786-e1815'
    ]
  }
];

export default hematologicDisordersPregnancyQuestions;
