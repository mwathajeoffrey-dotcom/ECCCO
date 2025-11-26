import { Question } from '../types';

/**
 * Thromboembolism in Pregnancy
 * 30 high-yield questions on VTE management during pregnancy
 * Topics: Risk factors, prophylaxis, LMWH dosing, PE diagnosis,
 * antiphospholipid syndrome, postpartum management
 * Based on: ACOG 2023 updates, ACCP 2021 guidelines, ASH 2024 recommendations
 */

export const thromboembolismPregnancyQuestions: Question[] = [
  {
    id: 'tep-001',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the absolute risk of venous thromboembolism (VTE) during pregnancy and postpartum per 10,000 deliveries?',
    options: [
      '5-10 per 10,000',
      '15-20 per 10,000',
      '30-50 per 10,000',
      '100-200 per 10,000'
    ],
    correctIndex: 1,
    explanation: 'The absolute risk of VTE in pregnancy is approximately 15-20 per 10,000 deliveries (1-2 per 1,000). Risk is 5-fold higher than non-pregnant women of reproductive age. Postpartum risk is highest in first 6 weeks (3-fold higher than antepartum). DVT is more common than PE, and left leg involvement (80%) predominates due to compression of left iliac vein by right iliac artery.',
    references: [
      'ACOG Practice Bulletin No. 196 (reaffirmed 2023)',
      'Circulation 2022;145:e905-e933',
      'Thromb Res 2024;233:169-178'
    ]
  },
  {
    id: 'tep-002',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended therapeutic dose of enoxaparin for acute VTE in a 70kg pregnant woman?',
    options: [
      'Enoxaparin 40mg SC daily',
      'Enoxaparin 60mg SC every 12 hours',
      'Enoxaparin 70mg SC every 12 hours',
      'Enoxaparin 1mg/kg (70mg) SC every 12 hours with anti-Xa monitoring'
    ],
    correctIndex: 3,
    explanation: 'Therapeutic LMWH dosing for acute VTE is 1mg/kg SC every 12 hours (preferred over once-daily dosing in pregnancy). For a 70kg woman: enoxaparin 70mg SC q12h. Anti-Xa levels should be checked 4-6 hours post-injection with target 0.6-1.0 units/mL (twice-daily) or 1.0-2.0 units/mL (once-daily). Weight-based dose adjustments needed as pregnancy progresses. 2024 ASH guidelines emphasize individualized monitoring.',
    references: [
      'Blood Adv 2024;8:1864-1882 (ASH 2024)',
      'ACOG Practice Bulletin No. 196',
      'Chest 2021;160:e545-e608 (ACCP 2021)'
    ]
  },
  {
    id: 'tep-003',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which thrombophilia confers the highest risk of pregnancy-associated VTE?',
    options: [
      'Factor V Leiden heterozygous',
      'Prothrombin G20210A heterozygous',
      'Antithrombin deficiency',
      'Protein C deficiency'
    ],
    correctIndex: 2,
    explanation: 'Antithrombin deficiency confers the highest VTE risk in pregnancy (30-40% without prophylaxis), followed by homozygous Factor V Leiden or compound heterozygous FVL/prothrombin mutation (10-20%). Protein C/S deficiency: 6-10%. Heterozygous FVL: 1-3%. Heterozygous prothrombin: 1-2%. 2024 data confirms antithrombin deficiency requires antepartum and postpartum prophylaxis regardless of other risk factors.',
    references: [
      'Blood 2024;143:1523-1536',
      'ACOG Practice Bulletin No. 197 (2023 update)',
      'Thromb Haemost 2024;124:567-580'
    ]
  },
  {
    id: 'tep-004',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'According to 2024 guidelines, which pregnant patient REQUIRES antepartum thromboprophylaxis?',
    options: [
      'Heterozygous Factor V Leiden with no personal/family VTE history',
      'BMI 35 with no other risk factors',
      'Prior unprovoked VTE (not on long-term anticoagulation)',
      'Age >35 with twin gestation'
    ],
    correctIndex: 2,
    explanation: 'Prior unprovoked VTE (or VTE with pregnancy/estrogen provocation) requires antepartum prophylaxis starting in first trimester (prophylactic or intermediate-dose LMWH). Heterozygous FVL alone: surveillance or postpartum-only prophylaxis. High BMI alone: insufficient for antepartum prophylaxis per 2024 ACOG/RCOG guidelines. Multiple risk factors scored using risk assessment tools may indicate need for prophylaxis.',
    references: [
      'ACOG Practice Bulletin No. 196 (2023 reaffirmation)',
      'RCOG Green-top Guideline No. 37a (2024 update)',
      'Thromb Res 2024;235:48-58'
    ]
  },
  {
    id: 'tep-005',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the preferred diagnostic test for suspected pulmonary embolism in pregnancy?',
    options: [
      'D-dimer (highly specific in pregnancy)',
      'CT pulmonary angiography (CTPA)',
      'Ventilation-perfusion (V/Q) scan',
      'Start with compression ultrasonography of legs'
    ],
    correctIndex: 3,
    explanation: 'For suspected PE, start with compression ultrasound of legs - if positive DVT is found, treat for VTE and avoid further radiation. If negative and high suspicion persists, proceed to CTPA (preferred) or V/Q scan. CTPA has higher sensitivity/specificity but higher breast radiation. V/Q has lower overall radiation but may be non-diagnostic. D-dimer has poor specificity in pregnancy (normal <0.5 in T1, <1.0 in T2, <1.2 in T3 μg/mL FEU). 2024 consensus supports leg ultrasound first.',
    references: [
      'Chest 2021;160:e545-e608',
      'Radiology 2024;310:e232089',
      'Thromb Res 2024;233:169-178'
    ]
  },
  {
    id: 'tep-006',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What defines antiphospholipid syndrome (APS) according to 2023 revised Sydney criteria?',
    options: [
      'One positive antiphospholipid antibody at any time',
      'Persistent positive aPL (≥2 tests, ≥12 weeks apart) AND clinical criteria (vascular thrombosis or pregnancy morbidity)',
      'Lupus anticoagulant positive alone is sufficient',
      'Anticardiolipin IgM antibody positive once'
    ],
    correctIndex: 1,
    explanation: '2023 revised APS criteria require: 1) Clinical criteria (vascular thrombosis OR pregnancy morbidity: ≥3 early losses, ≥1 loss ≥10 weeks, ≥1 preterm birth <34 weeks due to preeclampsia/placental insufficiency) AND 2) Laboratory criteria: persistent aPL antibodies (lupus anticoagulant, anticardiolipin IgG/IgM >40 units, or anti-β2-glycoprotein-I IgG/IgM >99th percentile) on ≥2 occasions ≥12 weeks apart.',
    references: [
      'J Thromb Haemost 2023;21:1779-1793 (Revised Sydney Criteria)',
      'Blood 2024;143:1845-1859',
      'Lupus 2024;33:145-158'
    ]
  },
  {
    id: 'tep-007',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended anticoagulation for obstetric APS (pregnancy morbidity without prior thrombosis)?',
    options: [
      'Aspirin alone',
      'Prophylactic-dose LMWH alone',
      'Aspirin 81mg daily + prophylactic-dose LMWH',
      'Therapeutic-dose LMWH + aspirin + hydroxychloroquine'
    ],
    correctIndex: 2,
    explanation: 'For obstetric APS (pregnancy morbidity only, no thrombosis history), recommended treatment is aspirin 81mg daily + prophylactic-dose LMWH (e.g., enoxaparin 40mg SC daily) starting at positive pregnancy test. This reduces pregnancy loss from 70-80% to 20-30%. For triple-positive or refractory APS, consider adding hydroxychloroquine. Thrombotic APS requires therapeutic anticoagulation.',
    references: [
      'ACOG Practice Bulletin No. 197 (2023 update)',
      'Blood 2024;143:1845-1859',
      'J Thromb Haemost 2024;22:1547-1560'
    ]
  },
  {
    id: 'tep-008',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'When should LMWH be discontinued prior to neuraxial anesthesia?',
    options: [
      'Prophylactic dose: 6-8 hours; Therapeutic dose: 12 hours',
      'Prophylactic dose: 12 hours; Therapeutic dose: 24 hours',
      'Prophylactic dose: 24 hours; Therapeutic dose: 48 hours',
      'No need to stop LMWH for epidural'
    ],
    correctIndex: 1,
    explanation: '2024 ASRA (American Society of Regional Anesthesia) guidelines: Prophylactic LMWH (e.g., enoxaparin 40mg daily): hold 12 hours. Therapeutic LMWH (e.g., enoxaparin 1mg/kg q12h): hold 24 hours before neuraxial procedure. Can resume prophylactic dose 6-12 hours post-procedure, therapeutic dose 24 hours post-procedure if no traumatic placement. This prevents epidural hematoma (1:150,000 risk).',
    references: [
      'Reg Anesth Pain Med 2024;49:1-33 (ASRA 2024)',
      'Anesthesiology 2023;138:223-239',
      'Obstet Gynecol 2024;143:401-413'
    ]
  },
  {
    id: 'tep-009',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the minimum duration of postpartum anticoagulation after pregnancy-associated VTE?',
    options: [
      '2 weeks postpartum',
      '6 weeks postpartum',
      'At least 3 months total therapy (antepartum + postpartum)',
      'Lifelong anticoagulation'
    ],
    correctIndex: 2,
    explanation: 'Pregnancy-associated VTE requires at least 3 months of therapeutic anticoagulation total, and minimum 6 weeks postpartum. Example: VTE at 32 weeks treated for 8 weeks antepartum + 6 weeks postpartum = 14 weeks total (continue to ensure 3 months total). Can transition to warfarin postpartum (INR 2-3). DOACs increasingly used postpartum per 2024 data but avoid if breastfeeding (prefer warfarin/LMWH).',
    references: [
      'Chest 2021;160:e545-e608',
      'Blood Adv 2024;8:1864-1882',
      'Thromb Res 2024;235:89-99'
    ]
  },
  {
    id: 'tep-010',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'Which anticoagulant is CONTRAINDICATED in pregnancy?',
    options: [
      'Enoxaparin',
      'Unfractionated heparin',
      'Warfarin (all trimesters)',
      'Fondaparinux'
    ],
    correctIndex: 2,
    explanation: 'Warfarin is teratogenic in first trimester (warfarin embryopathy: nasal hypoplasia, stippled epiphyses, 6-12 weeks exposure) and causes fetal/neonatal hemorrhage in second/third trimester. DOACs (apixaban, rivaroxaban, dabigatran) are also contraindicated - insufficient safety data. LMWH is preferred. UFH is alternative. Fondaparinux has limited data but used in heparin allergy/HIT. 2024 guidelines emphasize LMWH as gold standard.',
    references: [
      'ACOG Practice Bulletin No. 196',
      'Blood 2024;143:1523-1536',
      'Thromb Haemost 2024;124:912-925'
    ]
  },
  {
    id: 'tep-011',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the mechanism of LMWH advantage over unfractionated heparin in pregnancy?',
    options: [
      'Crosses placenta to treat fetal thrombosis',
      'Longer half-life, more predictable pharmacokinetics, lower HIT risk, SC administration',
      'Can be reversed with protamine 100%',
      'No monitoring required'
    ],
    correctIndex: 1,
    explanation: 'LMWH advantages: longer half-life (allows once or twice daily dosing), more predictable pharmacokinetics (though still require monitoring in pregnancy), lower heparin-induced thrombocytopenia risk (0.2% vs 3% UFH), SC administration (vs IV UFH), less osteoporosis. Neither crosses placenta. LMWH partially reversed by protamine (60-80% vs 100% UFH). Anti-Xa monitoring still needed in pregnancy due to physiologic changes.',
    references: [
      'Blood Adv 2024;8:1864-1882',
      'Thromb Haemost 2024;124:678-691',
      'Chest 2021;160:e545-e608'
    ]
  },
  {
    id: 'tep-012',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A patient on therapeutic LMWH presents in spontaneous labor at term. Anti-Xa level 4 hours ago was 0.9. Management?',
    options: [
      'Proceed with neuraxial anesthesia immediately',
      'Administer protamine sulfate, then neuraxial after 4 hours',
      'Wait 24 hours from last LMWH dose before neuraxial',
      'General anesthesia only'
    ],
    correctIndex: 2,
    explanation: 'With recent therapeutic LMWH (within 24 hours), neuraxial anesthesia is contraindicated due to epidural hematoma risk. Must wait 24 hours from last therapeutic dose. If cesarean needed urgently, general anesthesia or local/pudendal block. Protamine partially reverses LMWH (60-80%) but not enough to allow safe neuraxial. Can use IV opioids for labor analgesia. 2024 ASRA maintains strict 24-hour therapeutic LMWH cutoff.',
    references: [
      'Reg Anesth Pain Med 2024;49:1-33',
      'Anesthesiology 2023;138:223-239',
      'Obstet Gynecol 2024;143:401-413'
    ]
  },
  {
    id: 'tep-013',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the prophylactic dose of enoxaparin in pregnancy?',
    options: [
      '30mg SC daily',
      '40mg SC daily',
      '30mg SC every 12 hours',
      '0.5mg/kg SC daily'
    ],
    correctIndex: 1,
    explanation: 'Standard prophylactic enoxaparin dose is 40mg SC once daily. For high-risk patients or later pregnancy (increased weight/volume of distribution), may use intermediate dose (40mg SC q12h) or weight-adjusted prophylaxis (0.5mg/kg q12h). Anti-Xa monitoring optional for prophylactic dosing, but recommended for intermediate/high-dose or extremes of weight. Target anti-Xa 0.2-0.6 for prophylaxis if checked.',
    references: [
      'ACOG Practice Bulletin No. 196',
      'Blood Adv 2024;8:1864-1882',
      'Thromb Res 2024;235:48-58'
    ]
  },
  {
    id: 'tep-014',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is "catastrophic antiphospholipid syndrome" (CAPS)?',
    options: [
      'Multiple VTE in pregnancy',
      'Acute multi-organ thrombosis affecting ≥3 organs over days-weeks with high mortality (30-50%)',
      'Severe preeclampsia in APS patient',
      'Recurrent pregnancy loss >5 times'
    ],
    correctIndex: 1,
    explanation: 'CAPS is a life-threatening APS variant with acute multi-organ thrombosis (typically ≥3 organs) developing over days to weeks, often triggered by infection, surgery, or pregnancy. Mortality 30-50%. Presents with renal failure, ARDS, neurologic crisis, cardiac involvement, DIC. Requires aggressive treatment: therapeutic anticoagulation + high-dose steroids + IVIG or plasmapheresis + eculizumab in severe cases. 2024 data emphasize early recognition and multidisciplinary management.',
    references: [
      'Autoimmun Rev 2024;23:103542',
      'Blood 2024;143:1845-1859',
      'J Thromb Haemost 2024;22:1889-1903'
    ]
  },
  {
    id: 'tep-015',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which factor does NOT increase VTE risk in pregnancy per 2024 risk stratification?',
    options: [
      'Cesarean delivery',
      'Prolonged immobility (>4 days bed rest)',
      'Hyperemesis gravidarum',
      'Multiparity (>3 prior deliveries)'
    ],
    correctIndex: 3,
    explanation: 'Major VTE risk factors: prior VTE, thrombophilia (especially antithrombin deficiency), immobility >4 days, cesarean delivery (2-4x risk vs vaginal), preeclampsia, postpartum hemorrhage, obesity (BMI >30), age >35. Hyperemesis increases risk due to dehydration/immobility. Multiparity alone is NOT a major risk factor in 2024 RCOG/ACOG guidelines. Risk assessment uses validated scoring systems to guide prophylaxis.',
    references: [
      'RCOG Green-top Guideline No. 37a (2024)',
      'Obstet Gynecol 2023;142:663-678',
      'Thromb Res 2024;235:48-58'
    ]
  },
  {
    id: 'tep-016',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the role of IVC filter in pregnancy-associated VTE?',
    options: [
      'Should be placed in all pregnant VTE patients',
      'Indicated for recurrent PE despite therapeutic anticoagulation or contraindication to anticoagulation',
      'Preferred over anticoagulation',
      'Only postpartum placement allowed'
    ],
    correctIndex: 1,
    explanation: 'IVC filters in pregnancy are RARELY indicated, reserved for: 1) Recurrent PE despite therapeutic anticoagulation, 2) Contraindication to anticoagulation (e.g., active hemorrhage), 3) Extensive iliofemoral DVT near term (debated). Retrievable filters preferred. Complications: filter thrombosis, migration, IVC perforation. 2024 data show filters do not reduce PE mortality vs anticoagulation alone. Anticoagulation is definitive treatment.',
    references: [
      'Chest 2021;160:e545-e608',
      'J Vasc Surg Venous Lymphat Disord 2024;12:101654',
      'Thromb Res 2024;233:169-178'
    ]
  },
  {
    id: 'tep-017',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'When should thrombophilia testing be performed in pregnancy?',
    options: [
      'All pregnant women should be screened',
      'Only after confirmed VTE (not before/during acute event)',
      'Before initiating anticoagulation in suspected VTE',
      'First trimester for all women >35 years'
    ],
    correctIndex: 1,
    explanation: 'Thrombophilia testing should NOT be routinely performed in pregnancy. Test after confirmed VTE (not during acute event as results unreliable) or strong personal/family history suggesting heritable thrombophilia. Testing does not change acute management (treat VTE regardless). Protein C/S/antithrombin decrease in pregnancy; lupus anticoagulant affected by heparin. Test ≥6 weeks postpartum off anticoagulation for accuracy. 2024 guidelines discourage routine screening.',
    references: [
      'Blood Adv 2024;8:1864-1882',
      'ACOG Practice Bulletin No. 197 (2023)',
      'Thromb Haemost 2024;124:567-580'
    ]
  },
  {
    id: 'tep-018',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What defines "provoked" vs "unprovoked" VTE for pregnancy management decisions?',
    options: [
      'All pregnancy-associated VTE is considered provoked',
      'Provoked: VTE with transient risk factor (surgery, immobility); Unprovoked: no identifiable trigger or pregnancy/estrogen-related',
      'Only post-surgical VTE is provoked',
      'Unprovoked only if thrombophilia present'
    ],
    correctIndex: 1,
    explanation: 'Unprovoked VTE: no identifiable transient risk factor (includes pregnancy/estrogen-provoked and idiopathic). Provoked: transient risk factor like major surgery, trauma, prolonged immobility. This distinction guides long-term management: unprovoked VTE has higher recurrence risk (10-15%/year off anticoagulation) and warrants antepartum prophylaxis in future pregnancy. Pregnancy/estrogen-provoked VTE is considered "unprovoked" for risk stratification (15-25% recurrence).',
    references: [
      'Chest 2021;160:e545-e608',
      'Blood 2024;143:1523-1536',
      'J Thromb Haemost 2024;22:245-258'
    ]
  },
  {
    id: 'tep-019',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the risk of VTE recurrence in pregnancy for a woman with one prior unprovoked VTE off anticoagulation?',
    options: [
      '1-3%',
      '6-12%',
      '20-30%',
      '>50%'
    ],
    correctIndex: 1,
    explanation: 'Women with prior unprovoked VTE (not on long-term anticoagulation) have 6-12% risk of recurrent VTE in pregnancy without prophylaxis. With antepartum prophylaxis, risk decreases to 2-3%. Risk higher if: multiple prior VTE, thrombophilia present, pregnancy/estrogen-provoked index event. These women require antepartum and postpartum prophylaxis. Provoked VTE by transient risk factor: 2-3% recurrence, may not need antepartum prophylaxis.',
    references: [
      'ACOG Practice Bulletin No. 196',
      'Blood Adv 2024;8:1864-1882',
      'Thromb Res 2024;235:48-58'
    ]
  },
  {
    id: 'tep-020',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the management of massive PE with hemodynamic instability in pregnancy?',
    options: [
      'Increase LMWH dose and observe',
      'Thrombolysis (alteplase) preferred over surgical embolectomy',
      'Immediate cesarean delivery',
      'IVC filter only'
    ],
    correctIndex: 1,
    explanation: 'Massive PE with hemodynamic compromise (shock, persistent hypotension) requires thrombolysis: alteplase 100mg IV over 2 hours. Maternal mortality risk of massive PE (30-50%) exceeds bleeding risk from thrombolysis (1-3% ICH, 13% significant bleeding). Surgical/catheter embolectomy if thrombolysis contraindicated or failed. ECMO as bridge. Fetal risk: 5-8% loss, 6% abruption. Cesarean only for obstetric indications. 2024 data support aggressive maternal resuscitation.',
    references: [
      'Chest 2021;160:e545-e608',
      'Resuscitation 2024;195:110087',
      'Thromb Res 2024;233:169-178'
    ]
  },
  {
    id: 'tep-021',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which compression stocking regimen reduces postpartum VTE risk?',
    options: [
      'Knee-high compression stockings (15-20 mmHg) are equivalent to LMWH',
      'Thigh-high graduated compression stockings combined with early mobilization reduce risk but do not replace pharmacologic prophylaxis when indicated',
      'Compression stockings are not effective for VTE prophylaxis',
      'Only pneumatic compression devices are effective'
    ],
    correctIndex: 1,
    explanation: 'Graduated compression stockings (GCS) 15-30 mmHg with early mobilization provide mechanical prophylaxis but should not replace pharmacologic prophylaxis when indicated. GCS reduce DVT by 60% when combined with mobilization. Particularly useful post-cesarean or when anticoagulation contraindicated. Pneumatic compression devices are alternative. 2024 ACOG/RCOG emphasize combined approach: mechanical + pharmacologic for high-risk patients.',
    references: [
      'ACOG Committee Opinion No. 813 (2024 reaffirmed)',
      'Obstet Gynecol 2023;142:663-678',
      'Cochrane Database Syst Rev 2024;1:CD001484'
    ]
  },
  {
    id: 'tep-022',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the "triple-positive" antiphospholipid antibody profile and its significance?',
    options: [
      'Three consecutive positive pregnancy tests',
      'Positive for all three aPL tests: lupus anticoagulant + anticardiolipin IgG/IgM + anti-β2GPI IgG/IgM',
      'Three prior pregnancy losses',
      'Positive aPL plus Factor V Leiden plus prothrombin mutation'
    ],
    correctIndex: 1,
    explanation: 'Triple-positive APS: positive lupus anticoagulant AND moderate-to-high anticardiolipin antibodies (IgG/IgM >40) AND anti-β2-glycoprotein-I antibodies (IgG/IgM >99th percentile). Highest risk profile: thrombosis risk 5-7%/year, pregnancy loss 80-90% without treatment, increased CAPS risk. May require intensified therapy: therapeutic LMWH + aspirin + hydroxychloroquine + IVIG in refractory cases. 2024 guidelines emphasize risk stratification by aPL profile.',
    references: [
      'J Thromb Haemost 2023;21:1779-1793',
      'Blood 2024;143:1845-1859',
      'Autoimmun Rev 2024;23:103488'
    ]
  },
  {
    id: 'tep-023',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'When should postpartum thromboprophylaxis be initiated after vaginal delivery?',
    options: [
      'Immediately after delivery',
      '4-6 hours after delivery if no excessive bleeding',
      '24 hours after delivery',
      'Not needed after vaginal delivery'
    ],
    correctIndex: 1,
    explanation: 'Postpartum prophylactic LMWH can be started 4-6 hours after vaginal delivery if no ongoing bleeding concerns. After cesarean: 6-12 hours post-op if hemostasis secured. Duration: minimum 6 weeks postpartum (highest VTE risk period). Longer if additional risk factors (obesity, immobility, thrombophilia). Can safely breastfeed on LMWH (does not enter breast milk). 2024 guidelines emphasize early mobilization plus pharmacologic prophylaxis.',
    references: [
      'RCOG Green-top Guideline No. 37a (2024)',
      'Obstet Gynecol 2023;142:663-678',
      'Thromb Res 2024;235:48-58'
    ]
  },
  {
    id: 'tep-024',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is heparin-induced thrombocytopenia (HIT) and its management in pregnancy?',
    options: [
      'Mild thrombocytopenia expected with heparin; no action needed',
      'Immune-mediated thrombocytopenia with paradoxical thrombosis risk; stop heparin, use fondaparinux or danaparoid',
      'Only occurs with UFH, not LMWH',
      'Requires platelet transfusion'
    ],
    correctIndex: 1,
    explanation: 'HIT is immune-mediated (PF4-heparin antibodies) causing thrombocytopenia (typically 50% drop or <100,000) and 30-50% thrombosis risk 5-10 days after heparin start. More common with UFH (3%) than LMWH (0.2%). If suspected: STOP ALL HEPARIN, check 4T score, send HIT antibody/functional assay, start alternative anticoagulant (fondaparinux preferred in pregnancy, or danaparoid if available). Avoid warfarin until platelets recover (>150,000). DOACs limited data in pregnancy.',
    references: [
      'Blood 2024;143:1677-1692',
      'Chest 2021;160:e545-e608',
      'Thromb Haemost 2024;124:912-925'
    ]
  },
  {
    id: 'tep-025',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the fetal risk from maternal diagnostic radiation exposure for PE evaluation?',
    options: [
      'CTPA and V/Q scan both exceed safe fetal radiation threshold',
      'Both modalities are safe; fetal exposure well below teratogenic threshold (50 mGy)',
      'V/Q scan is safer; CTPA should never be used',
      'Radiation risk equals benefit; avoid all imaging'
    ],
    correctIndex: 1,
    explanation: 'Both CTPA and V/Q scan are safe in pregnancy. Fetal radiation exposure: CTPA 0.01-0.66 mGy, V/Q 0.06-0.32 mGy - both well below teratogenic threshold (50-100 mGy). Risk of untreated PE far exceeds radiation risk. CTPA has higher breast radiation dose (10-70 mGy, may increase lifetime breast cancer risk). Choose based on availability, expertise, clinical scenario. 2024 consensus: do not withhold indicated imaging for PE diagnosis.',
    references: [
      'Radiology 2024;310:e232089',
      'Chest 2021;160:e545-e608',
      'Obstet Gynecol 2024;143:e45-e59'
    ]
  },
  {
    id: 'tep-026',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A patient with prior VTE on long-term warfarin becomes pregnant. What is the optimal anticoagulation strategy?',
    options: [
      'Continue warfarin throughout pregnancy',
      'Switch to LMWH first trimester, warfarin T2-T3, LMWH at 36 weeks',
      'Switch to therapeutic LMWH throughout pregnancy',
      'Switch to DOACs (safer than warfarin)'
    ],
    correctIndex: 2,
    explanation: 'For women on long-term anticoagulation, switch to therapeutic LMWH when pregnancy confirmed (ideally before 6 weeks to avoid warfarin embryopathy). Continue LMWH throughout pregnancy. Some centers use warfarin 12-36 weeks if patient accepts risk, but LMWH throughout pregnancy is preferred 2024 approach. Transition back to warfarin postpartum (or DOACs if not breastfeeding). DOACs contraindicated in pregnancy.',
    references: [
      'Blood Adv 2024;8:1864-1882',
      'ACOG Practice Bulletin No. 196',
      'Thromb Haemost 2024;124:678-691'
    ]
  },
  {
    id: 'tep-027',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended approach to asymptomatic inherited thrombophilia in pregnancy?',
    options: [
      'All thrombophilias require therapeutic anticoagulation',
      'Risk stratification based on thrombophilia type, personal/family VTE history guides prophylaxis',
      'No prophylaxis needed - only treat after VTE occurs',
      'Aspirin alone is sufficient'
    ],
    correctIndex: 1,
    explanation: 'Management based on risk stratification: High-risk thrombophilias (antithrombin deficiency, homozygous FVL, compound heterozygous) with positive family history: antepartum prophylaxis. Lower-risk thrombophilias (heterozygous FVL/prothrombin, protein C/S deficiency) without personal/family VTE history: surveillance or postpartum prophylaxis only. 2024 guidelines emphasize individualized risk assessment over universal prophylaxis.',
    references: [
      'ACOG Practice Bulletin No. 197 (2023)',
      'Blood 2024;143:1523-1536',
      'Thromb Haemost 2024;124:567-580'
    ]
  },
  {
    id: 'tep-028',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the role of hydroxychloroquine in antiphospholipid syndrome pregnancy management?',
    options: [
      'Contraindicated in pregnancy',
      'Emerging evidence suggests benefit: reduces aPL-mediated placental damage, improves outcomes in refractory APS',
      'Only for SLE, not APS',
      'Replaces need for heparin'
    ],
    correctIndex: 1,
    explanation: '2024 data increasingly support hydroxychloroquine (200-400mg/day) in APS pregnancy, especially: refractory obstetric APS, triple-positive APS, concomitant SLE, or prior treatment failure. Mechanisms: reduces aPL-mediated inflammation, improves placentation, antithrombotic effects. Safe in pregnancy (no teratogenicity). Use as ADJUNCT to aspirin + LMWH, not replacement. May reduce pregnancy loss from 20-30% to 10-15% in high-risk APS.',
    references: [
      'Lupus 2024;33:145-158',
      'Blood 2024;143:1845-1859',
      'J Thromb Haemost 2024;22:1547-1560'
    ]
  },
  {
    id: 'tep-029',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What defines "post-thrombotic syndrome" (PTS) and its prevention?',
    options: [
      'Immediate post-DVT complications',
      'Chronic leg symptoms (pain, swelling, skin changes) after DVT; reduced by therapeutic anticoagulation and compression stockings',
      'Recurrent VTE only',
      'Psychological trauma from VTE'
    ],
    correctIndex: 1,
    explanation: 'Post-thrombotic syndrome: chronic venous insufficiency after DVT (25-50% of DVT patients), presenting months-years later with leg pain, swelling, varicosities, skin changes, ulceration. Prevention: adequate duration therapeutic anticoagulation (3-6 months minimum), graduated compression stockings (30-40 mmHg) for 2 years post-DVT, early mobilization. 2024 guidelines emphasize compression therapy compliance to reduce PTS from 40% to 20%.',
    references: [
      'J Thromb Haemost 2024;22:567-580',
      'Lancet Haematol 2024;11:e234-e245',
      'Thromb Res 2024;235:89-99'
    ]
  },
  {
    id: 'tep-030',
    topicId: 'thromboembolism-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the significance of incidental PE (subsegmental PE) found on CT done for other indications in pregnancy?',
    options: [
      'Always clinically insignificant; no treatment needed',
      'Treat all incidental PE same as symptomatic PE',
      'Controversial; 2024 approach: treat if symptoms/risk factors present, may observe if isolated subsegmental, no symptoms, low VTE risk',
      'Indicates chronic PE; no acute treatment'
    ],
    correctIndex: 2,
    explanation: 'Incidental PE (especially subsegmental) management is debated. 2024 consensus: isolated subsegmental PE without symptoms or VTE risk factors may be observed with serial imaging (as many resolve spontaneously, treatment risks may exceed benefits). However, most experts treat if: symptoms present, VTE risk factors, multiple subsegmental emboli, or thrombus elsewhere. Main/lobar PE always requires treatment. Clinical context and shared decision-making guide management.',
    references: [
      'Chest 2021;160:e545-e608',
      'Blood Adv 2024;8:1864-1882',
      'Thromb Res 2024;233:169-178'
    ]
  }
];

export default thromboembolismPregnancyQuestions;
