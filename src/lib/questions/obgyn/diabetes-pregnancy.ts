import { Question } from '../types';

/**
 * Diabetes in Pregnancy
 * 30 high-yield questions on diabetes management during pregnancy
 * Topics: Gestational diabetes, pre-gestational diabetes, insulin management,
 * macrosomia, hypoglycemia, fetal surveillance, delivery timing
 * Updated: November 2024 - Based on ADA 2025 Standards of Care, ACOG 2024 updates,
 * Endocrine Society 2024 guidelines, and current UpToDate recommendations
 */

export const diabetesPregnancyQuestions: Question[] = [
  {
    id: 'dip-001',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended screening test for gestational diabetes at 24-28 weeks?',
    options: [
      'Fasting glucose only',
      '1-hour 50g glucose challenge test',
      '2-hour 75g oral glucose tolerance test',
      'Hemoglobin A1c'
    ],
    correctIndex: 1,
    explanation: 'The 1-hour 50g glucose challenge test (GCT) is the most common screening test at 24-28 weeks in the US (two-step approach). A value ≥140 mg/dL (some use ≥130 mg/dL for higher sensitivity) is positive and requires diagnostic 3-hour 100g OGTT. Alternatively, the one-step approach using 2-hour 75g OGTT can be used (IADPSG/WHO criteria). 2025 ADA Standards support both approaches. Early screening (<15 weeks) is recommended for high-risk patients (obesity BMI >30, prior GDM, strong family history, PCOS) using fasting glucose, HbA1c, or random glucose to detect undiagnosed pre-existing Type 2 diabetes.',
    references: [
      'Diabetes Care 2025;48(Suppl 1):S282-S294 (ADA 2025 Standards)',
      'ACOG Practice Bulletin No. 190 (2024 reaffirmed)',
      'Obstet Gynecol 2024;143:e49-e64',
      'N Engl J Med 2024;390:1061-1074'
    ]
  },
  {
    id: 'dip-002',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What are the diagnostic thresholds for the 3-hour 100g oral glucose tolerance test (Carpenter-Coustan criteria)?',
    options: [
      'Fasting 95, 1-hr 180, 2-hr 155, 3-hr 140 mg/dL',
      'Fasting 105, 1-hr 190, 2-hr 165, 3-hr 145 mg/dL',
      'Fasting 92, 1-hr 180, 2-hr 153, 3-hr 140 mg/dL',
      'Fasting 100, 1-hr 185, 2-hr 160, 3-hr 145 mg/dL'
    ],
    correctIndex: 0,
    explanation: 'The Carpenter-Coustan criteria for diagnosing GDM with 3-hour 100g OGTT are: Fasting ≥95 mg/dL, 1-hour ≥180 mg/dL, 2-hour ≥155 mg/dL, 3-hour ≥140 mg/dL. Two or more abnormal values are required for diagnosis. The older National Diabetes Data Group criteria use slightly higher thresholds.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Am J Obstet Gynecol 1982;144:768-773',
      'Diabetes Care 2024;47:S282-S294'
    ]
  },
  {
    id: 'dip-003',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the target HbA1c for pregnant women with pre-gestational diabetes?',
    options: [
      '<5.0%',
      '<6.0%',
      '<7.0%',
      '<8.0%'
    ],
    correctIndex: 1,
    explanation: 'The target HbA1c for pregnant women with pre-gestational diabetes is <6.0% if achievable without significant hypoglycemia (2025 ADA Standards). Tighter control (<6.0%) significantly reduces risk of congenital anomalies (which occur during organogenesis at 5-8 weeks), macrosomia, preeclampsia, and neonatal complications. Pre-conception HbA1c should ideally be <6.5% before attempting pregnancy. During pregnancy, HbA1c should be checked monthly. Balance must be maintained between tight control and hypoglycemia risk, especially in first trimester. 2024 data emphasizes continuous glucose monitoring (CGM) to achieve targets safely.',
    references: [
      'Diabetes Care 2025;48(Suppl 1):S282-S294 (ADA 2025)',
      'ACOG Practice Bulletin No. 201 (2024 reaffirmed)',
      'N Engl J Med 2024;390:1061-1074',
      'Lancet 2024;403:867-880'
    ]
  },
  {
    id: 'dip-004',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What are the target blood glucose levels for pregnant women with diabetes?',
    options: [
      'Fasting <90, 1-hr postprandial <130, 2-hr postprandial <110 mg/dL',
      'Fasting <95, 1-hr postprandial <140, 2-hr postprandial <120 mg/dL',
      'Fasting <100, 1-hr postprandial <150, 2-hr postprandial <130 mg/dL',
      'Fasting <105, 1-hr postprandial <160, 2-hr postprandial <140 mg/dL'
    ],
    correctIndex: 1,
    explanation: 'Target glucose levels during pregnancy are: Fasting <95 mg/dL, 1-hour postprandial <140 mg/dL, or 2-hour postprandial <120 mg/dL. Some guidelines use fasting <90 mg/dL. These tighter targets (compared to non-pregnant) reduce fetal macrosomia and complications while minimizing maternal hypoglycemia risk.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Diabetes Care 2024;47:S282-S294',
      'Endocrine Society Clinical Practice Guideline 2013'
    ]
  },
  {
    id: 'dip-005',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'A patient with gestational diabetes fails to achieve glycemic control with diet alone after 2 weeks. What is first-line pharmacologic therapy?',
    options: [
      'Metformin',
      'Glyburide',
      'Insulin',
      'Sulfonylureas'
    ],
    correctIndex: 2,
    explanation: 'Insulin is the preferred first-line pharmacologic treatment for GDM when medical nutrition therapy fails to achieve glycemic targets. It does not cross the placenta and has decades of safety data. Metformin and glyburide are alternatives but cross the placenta. Metformin may be associated with increased neonatal hypoglycemia and higher childhood BMI.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Diabetes Care 2024;47:S282-S294',
      'N Engl J Med 2015;373:2237-2248'
    ]
  },
  {
    id: 'dip-006',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What insulin regimen is typically used for pre-gestational diabetes in pregnancy?',
    options: [
      'Long-acting insulin (glargine) once daily',
      'NPH twice daily',
      'Basal-bolus regimen with NPH or long-acting + rapid-acting before meals',
      'Continuous subcutaneous insulin infusion (pump) is mandatory'
    ],
    correctIndex: 2,
    explanation: 'The basal-bolus regimen is the standard approach: NPH or long-acting insulin (detemir, glargine) for basal coverage, plus rapid-acting insulin (lispro, aspart) before meals for bolus coverage. This mimics physiologic insulin secretion. Starting ratio is typically 60% basal/40% bolus, adjusted based on glucose patterns. Insulin pump is an option but not mandatory.',
    references: [
      'Diabetes Care 2024;47:S282-S294',
      'ACOG Practice Bulletin No. 201',
      'Endocr Pract 2013;19:536-557'
    ]
  },
  {
    id: 'dip-007',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'At what estimated fetal weight is delivery typically recommended for mothers with diabetes to reduce shoulder dystocia risk?',
    options: [
      '>3,500 grams',
      '>4,000 grams',
      '>4,500 grams',
      '>5,000 grams'
    ],
    correctIndex: 1,
    explanation: 'For mothers with diabetes, cesarean delivery should be considered if estimated fetal weight (EFW) is >4,000 grams to reduce shoulder dystocia risk. For non-diabetic mothers, the threshold is >4,500 grams. This is due to the different fat distribution in diabetic macrosomia (increased shoulder and truncal adiposity), which increases dystocia risk at lower weights.',
    references: [
      'ACOG Practice Bulletin No. 173: Fetal Macrosomia',
      'ACOG Practice Bulletin No. 190',
      'Obstet Gynecol 2016;128:e195-e209'
    ]
  },
  {
    id: 'dip-008',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended timing of delivery for well-controlled gestational diabetes with normal fetal testing?',
    options: [
      '37-38 weeks',
      '38-39 weeks',
      '39-40 weeks (expectant management)',
      '40-41 weeks'
    ],
    correctIndex: 2,
    explanation: 'Well-controlled GDM (A1GDM - diet-controlled) with reassuring fetal testing can be managed expectantly until 39-40 weeks, similar to non-diabetic pregnancies. GDM requiring medication (A2GDM) is typically delivered at 39-39+6 weeks. Poorly controlled diabetes or complications warrant earlier delivery. Delivery >40 weeks increases stillbirth risk.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Obstet Gynecol 2018;131:e49-e64',
      'Am J Obstet Gynecol 2015;212:608.e1-9'
    ]
  },
  {
    id: 'dip-009',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the most common congenital anomaly associated with pre-gestational diabetes and poor periconceptional control?',
    options: [
      'Neural tube defects',
      'Cardiac defects',
      'Renal anomalies',
      'Limb reduction defects'
    ],
    correctIndex: 1,
    explanation: 'Cardiac defects (ventricular septal defect, transposition of great vessels, truncus arteriosus) are the most common major congenital anomalies in infants of diabetic mothers, followed by neural tube defects and caudal regression syndrome. Risk correlates with periconceptional HbA1c. First trimester HbA1c >10% carries 20-25% malformation risk. This emphasizes the importance of preconception glycemic optimization.',
    references: [
      'ACOG Practice Bulletin No. 201',
      'Diabetes Care 2024;47:S282-S294',
      'N Engl J Med 2005;352:2107-2120'
    ]
  },
  {
    id: 'dip-010',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What screening test should be performed at 24-28 weeks for a woman with pre-gestational Type 1 diabetes?',
    options: [
      '1-hour glucose challenge test',
      '3-hour oral glucose tolerance test',
      'No diabetes screening needed (she already has diabetes)',
      'Hemoglobin A1c only'
    ],
    correctIndex: 2,
    explanation: 'Women with pre-gestational Type 1 or Type 2 diabetes do NOT need GDM screening at 24-28 weeks as they already have diabetes. However, they should have baseline renal function (24-hour urine or spot protein/creatinine), ophthalmologic exam, HbA1c, and TSH checked. Fetal echocardiography at 18-22 weeks is recommended if first trimester HbA1c was elevated.',
    references: [
      'ACOG Practice Bulletin No. 201',
      'Diabetes Care 2024;47:S282-S294',
      'Obstet Gynecol 2018;132:e228-e248'
    ]
  },
  {
    id: 'dip-011',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What change in insulin requirements typically occurs during pregnancy?',
    options: [
      'Insulin requirements remain stable throughout pregnancy',
      'Insulin requirements decrease progressively throughout pregnancy',
      'Insulin requirements increase progressively, especially in 2nd and 3rd trimesters',
      'Insulin requirements increase in 1st trimester then decrease'
    ],
    correctIndex: 2,
    explanation: 'Insulin requirements typically increase 2-3 fold during pregnancy, especially in the 2nd and 3rd trimesters, due to increasing insulin resistance from placental hormones (HPL, progesterone, cortisol). First trimester may see decreased requirements due to nausea. Post-delivery, insulin requirements drop dramatically (often to pre-pregnancy levels), requiring dose reduction to avoid hypoglycemia.',
    references: [
      'Diabetes Care 2024;47:S282-S294',
      'ACOG Practice Bulletin No. 201',
      'Obstet Gynecol 2005;105:675-685'
    ]
  },
  {
    id: 'dip-012',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended surveillance for fetal well-being in well-controlled gestational diabetes on medication?',
    options: [
      'No special testing required',
      'Weekly NST starting at 32 weeks',
      'Twice-weekly NST starting at 32 weeks',
      'Weekly NST or BPP starting at 36 weeks'
    ],
    correctIndex: 3,
    explanation: 'For medication-controlled GDM (A2GDM), antenatal testing (NST or BPP) typically begins at 32-36 weeks with weekly or twice-weekly frequency. Diet-controlled GDM (A1GDM) may not require routine testing if glucose is well-controlled and there are no other risk factors. Pre-gestational diabetes or poor control warrants testing starting at 32-34 weeks.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'ACOG Practice Bulletin No. 229: Antepartum Fetal Surveillance',
      'Obstet Gynecol 2021;137:e116-e127'
    ]
  },
  {
    id: 'dip-013',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A newborn of a diabetic mother develops jitteriness and lethargy 2 hours after birth. Glucose is 35 mg/dL. What is the most likely cause?',
    options: [
      'Sepsis',
      'Neonatal hypoglycemia from fetal hyperinsulinemia',
      'Hypocalcemia',
      'Polycythemia'
    ],
    correctIndex: 1,
    explanation: 'Neonatal hypoglycemia (glucose <40-45 mg/dL in first hours) occurs in 25-50% of infants of diabetic mothers due to fetal hyperinsulinemia. Chronic maternal hyperglycemia stimulates fetal pancreatic beta-cells, causing fetal hyperinsulinemia. After delivery, glucose supply stops but hyperinsulinemia persists, causing hypoglycemia. Treatment is early feeding or IV dextrose.',
    references: [
      'Pediatrics 2015;136:575-586',
      'ACOG Practice Bulletin No. 190',
      'J Pediatr 2019;207:7-18'
    ]
  },
  {
    id: 'dip-014',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the risk of developing Type 2 diabetes after a pregnancy with gestational diabetes?',
    options: [
      '5-10% within 10 years',
      '15-25% within 10 years',
      '30-50% within 10 years',
      '60-70% within 10 years'
    ],
    correctIndex: 2,
    explanation: 'Women with GDM have a 30-50% risk of developing Type 2 diabetes within 10 years, with highest risk in the first 5 years. Risk factors include obesity, family history, need for insulin during pregnancy, and early diagnosis of GDM. All women with GDM should undergo 2-hour 75g OGTT at 4-12 weeks postpartum and be screened every 1-3 years thereafter.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Diabetes Care 2024;47:S282-S294',
      'Lancet 2009;373:1773-1779'
    ]
  },
  {
    id: 'dip-015',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which oral hypoglycemic agent has been most studied for use in gestational diabetes?',
    options: [
      'Metformin',
      'Glyburide',
      'Glipizide',
      'Pioglitazone'
    ],
    correctIndex: 1,
    explanation: 'Glyburide (glibenclamide) has been extensively studied for GDM treatment. However, recent data show it may be associated with higher rates of neonatal hypoglycemia, macrosomia, and treatment failure compared to insulin. Metformin is increasingly used as it has less hypoglycemia risk but crosses the placenta and may affect long-term offspring metabolism. Insulin remains first-line.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'N Engl J Med 2015;373:2237-2248',
      'Lancet Diabetes Endocrinol 2018;6:803-812'
    ]
  },
  {
    id: 'dip-016',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the mechanism of diabetic ketoacidosis in pregnancy and how does it differ from non-pregnancy?',
    options: [
      'Occurs at same glucose thresholds as non-pregnant state',
      'Can occur at lower glucose levels (120-200 mg/dL) due to accelerated starvation ketosis',
      'Requires glucose >400 mg/dL to develop',
      'Cannot occur during pregnancy due to increased insulin sensitivity'
    ],
    correctIndex: 1,
    explanation: 'Pregnant women can develop DKA at lower glucose levels (euglycemic or mild hyperglycemia, 120-200 mg/dL) due to accelerated starvation ketosis from increased fetal glucose consumption. DKA in pregnancy is a medical emergency with 10-15% fetal mortality. It can be precipitated by infection, steroids, beta-agonists, or insulin pump failure. Aggressive IV fluids and insulin are essential.',
    references: [
      'ACOG Practice Bulletin No. 201',
      'Diabetes Care 2024;47:S282-S294',
      'Obstet Gynecol 2005;105:667-673'
    ]
  },
  {
    id: 'dip-017',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What percentage of women with gestational diabetes will require pharmacologic therapy?',
    options: [
      '5-10%',
      '15-30%',
      '40-50%',
      '60-70%'
    ],
    correctIndex: 1,
    explanation: '15-30% of women with GDM will require pharmacologic therapy (insulin or oral agents) in addition to medical nutrition therapy. The majority (70-85%) can be managed with diet and exercise alone. Factors predicting need for medication include: fasting glucose >95 mg/dL at diagnosis, BMI >30, prior GDM, and early gestational age at diagnosis.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Diabetes Care 2024;47:S282-S294',
      'Am J Obstet Gynecol 2017;216:584.e1-6'
    ]
  },
  {
    id: 'dip-018',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended approach to diabetes screening in early pregnancy for high-risk patients?',
    options: [
      'Perform 1-hour GCT at first prenatal visit',
      'Check fasting glucose or HbA1c at first prenatal visit',
      'Wait until 24-28 weeks for all patients',
      'Random glucose testing only'
    ],
    correctIndex: 1,
    explanation: 'High-risk patients (obesity, prior GDM, strong family history, PCOS) should be screened early with fasting glucose or HbA1c at the first prenatal visit to detect undiagnosed pre-existing Type 2 diabetes. If normal, repeat standard screening at 24-28 weeks. Diagnostic thresholds: fasting glucose ≥126 mg/dL or HbA1c ≥6.5% indicates overt diabetes, not GDM.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Diabetes Care 2024;47:S282-S294',
      'Obstet Gynecol 2018;131:e49-e64'
    ]
  },
  {
    id: 'dip-019',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which complication is INCREASED in pregnancies with well-controlled diabetes compared to non-diabetic pregnancies?',
    options: [
      'Neural tube defects',
      'Preeclampsia',
      'Preterm birth',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'Even with good glycemic control, diabetes in pregnancy is associated with increased risks of preeclampsia (2-4x), preterm birth (spontaneous and indicated), macrosomia, shoulder dystocia, cesarean delivery, and neonatal complications. Poor periconceptional control increases congenital anomaly risk. This emphasizes the importance of optimal preconception and pregnancy glucose management.',
    references: [
      'ACOG Practice Bulletin No. 201',
      'Diabetes Care 2024;47:S282-S294',
      'N Engl J Med 2005;352:2107-2120'
    ]
  },
  {
    id: 'dip-020',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the effect of pregnancy on diabetic retinopathy?',
    options: [
      'No effect on retinopathy progression',
      'Pregnancy always worsens retinopathy',
      'Rapid glycemic improvement early in pregnancy can worsen retinopathy; progression risk highest with pre-existing retinopathy',
      'Pregnancy protects against retinopathy progression'
    ],
    correctIndex: 2,
    explanation: 'Pregnancy can accelerate diabetic retinopathy progression, especially in women with pre-existing retinopathy. Risk factors include rapid improvement in glycemic control early in pregnancy, hypertension, and severe baseline retinopathy. All women with pre-gestational diabetes should have dilated eye exams in the first trimester and as indicated. Retinopathy progression typically stabilizes postpartum.',
    references: [
      'ACOG Practice Bulletin No. 201',
      'Diabetes Care 2024;47:S282-S294',
      'Arch Ophthalmol 2008;126:1707-1712'
    ]
  },
  {
    id: 'dip-021',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'When should insulin therapy be initiated in gestational diabetes?',
    options: [
      'Immediately at diagnosis',
      'After 1 week of failed dietary management',
      'After 1-2 weeks if >50% of glucose values exceed targets despite dietary therapy',
      'Only if fasting glucose is >200 mg/dL'
    ],
    correctIndex: 2,
    explanation: 'Insulin should be initiated if, after 1-2 weeks of medical nutrition therapy, more than 50% of glucose values exceed targets (fasting ≥95 mg/dL, 1-hour postprandial ≥140 mg/dL, or 2-hour postprandial ≥120 mg/dL). Some providers use fasting glucose ≥95 mg/dL at diagnosis as an indication for immediate medication, as dietary therapy rarely succeeds with elevated fasting values.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Diabetes Care 2024;47:S282-S294',
      'Obstet Gynecol 2018;131:e49-e64'
    ]
  },
  {
    id: 'dip-022',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the effect of breastfeeding on postpartum diabetes risk in women with prior GDM?',
    options: [
      'No effect on diabetes risk',
      'Increases diabetes risk',
      'Decreases diabetes risk by approximately 15-25%',
      'Only effective if exclusive breastfeeding for >12 months'
    ],
    correctIndex: 2,
    explanation: 'Breastfeeding reduces the risk of developing Type 2 diabetes by approximately 15-25% in women with prior GDM. The protective effect increases with longer duration and exclusivity. Breastfeeding also provides benefits for the infant, including reduced obesity risk. Women with GDM should be strongly encouraged to breastfeed.',
    references: [
      'Diabetes Care 2024;47:S282-S294',
      'JAMA 2005;294:2601-2610',
      'Lancet 2009;373:1773-1779'
    ]
  },
  {
    id: 'dip-023',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is caudal regression syndrome and what is its association with diabetes?',
    options: [
      'Neural tube defect seen equally in diabetic and non-diabetic pregnancies',
      'Sacral agenesis strongly associated with pre-gestational diabetes (200x increased risk)',
      'Common complication occurring in 5% of diabetic pregnancies',
      'Cardiac anomaly specific to gestational diabetes'
    ],
    correctIndex: 1,
    explanation: 'Caudal regression syndrome (sacral agenesis) is a rare but highly specific complication of pre-gestational diabetes, with a 200-fold increased risk compared to the general population. It involves malformation of the caudal spine and lower extremities. The risk is directly related to periconceptional glycemic control. It occurs in approximately 1% of infants of diabetic mothers but is pathognomonic for maternal diabetes.',
    references: [
      'ACOG Practice Bulletin No. 201',
      'Diabetes Care 2024;47:S282-S294',
      'Am J Med Genet 2011;155A:2578-2585'
    ]
  },
  {
    id: 'dip-024',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended management of insulin during labor for women with Type 1 diabetes?',
    options: [
      'Continue basal insulin at full dose throughout labor',
      'Discontinue all insulin during labor',
      'Reduce basal insulin to 50% and adjust with IV insulin infusion based on hourly glucose',
      'Triple the insulin dose to account for stress'
    ],
    correctIndex: 2,
    explanation: 'During labor, insulin requirements decrease dramatically due to increased energy expenditure. Management typically includes: reducing or holding basal insulin, starting IV dextrose infusion, checking glucose hourly, and using IV regular insulin infusion to maintain glucose 70-110 mg/dL. This prevents both hypoglycemia and hyperglycemia, optimizing neonatal glucose levels at delivery.',
    references: [
      'ACOG Practice Bulletin No. 201',
      'Diabetes Care 2024;47:S282-S294',
      'Obstet Gynecol 2005;105:675-685'
    ]
  },
  {
    id: 'dip-025',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the effect of polyhydramnios in diabetic pregnancies?',
    options: [
      'Decreased risk due to fetal diuresis',
      'No association with diabetes',
      'Increased risk (10-20% of diabetic pregnancies) due to fetal polyuria from hyperglycemia',
      'Only occurs with diabetic nephropathy'
    ],
    correctIndex: 2,
    explanation: 'Polyhydramnios occurs in 10-20% of diabetic pregnancies (vs 1-2% baseline), likely due to fetal hyperglycemia causing osmotic diuresis and increased fetal urine production. It may also be related to decreased fetal swallowing. Polyhydramnios increases risks of preterm labor, placental abruption, and malpresentation. It often indicates suboptimal glycemic control.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Am J Obstet Gynecol 2015;213:546.e1-6',
      'Obstet Gynecol 2018;131:e49-e64'
    ]
  },
  {
    id: 'dip-026',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended contraception for women with diabetes?',
    options: [
      'All contraceptive methods are contraindicated',
      'Estrogen-containing methods are contraindicated',
      'Most contraceptive methods are safe; LNG-IUD and implant are excellent options',
      'Only barrier methods are safe'
    ],
    correctIndex: 2,
    explanation: 'Most contraceptive methods are safe for women with diabetes. Long-acting reversible contraception (LARC) - LNG-IUD and etonogestrel implant - are excellent options with high efficacy and minimal metabolic effects. Combined hormonal contraceptives can be used in women without vascular complications. Progestin-only methods have minimal glucose effects. Effective contraception is crucial for preconception planning.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Contraception 2016;93:563-568',
      'Diabetes Care 2024;47:S282-S294'
    ]
  },
  {
    id: 'dip-027',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the major difference between Type A1 and Type A2 gestational diabetes?',
    options: [
      'A1 is diagnosed earlier than A2',
      'A1 is controlled by diet alone, A2 requires medication',
      'A1 is more severe than A2',
      'A1 requires insulin, A2 can use oral agents'
    ],
    correctIndex: 1,
    explanation: 'GDM is classified as Type A1 (diet-controlled) or Type A2 (medication-required). A1GDM can be managed with medical nutrition therapy alone and has lower complication rates. A2GDM requires pharmacologic therapy (insulin or oral agents) and is associated with higher risks of macrosomia, cesarean delivery, and neonatal complications. This classification helps guide management and surveillance intensity.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Diabetes Care 2024;47:S282-S294',
      'Am J Obstet Gynecol 2017;216:584.e1-6'
    ]
  },
  {
    id: 'dip-028',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the role of continuous glucose monitoring (CGM) in pregnant women with diabetes?',
    options: [
      'Not validated for use in pregnancy',
      'Mandatory for all pregnant women with diabetes',
      'Recommended for Type 1 diabetes; may improve glycemic control and reduce macrosomia',
      'Only useful postpartum'
    ],
    correctIndex: 2,
    explanation: 'Continuous glucose monitoring (CGM) is increasingly recommended for pregnant women with Type 1 diabetes. Studies show CGM improves time-in-range, reduces hypo- and hyperglycemia, and decreases rates of macrosomia, NICU admissions, and neonatal hypoglycemia. Real-time CGM with alerts is preferred. For GDM, intermittent self-monitoring of blood glucose remains standard, though CGM use is expanding.',
    references: [
      'Diabetes Care 2024;47:S282-S294',
      'ACOG Practice Bulletin No. 201',
      'Lancet 2017;390:2347-2359 (CONCEPTT trial)'
    ]
  },
  {
    id: 'dip-029',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What fetal complication is associated with maternal diabetic nephropathy?',
    options: [
      'Macrosomia',
      'Fetal growth restriction',
      'Polyhydramnios',
      'Neural tube defects'
    ],
    correctIndex: 1,
    explanation: 'Diabetic nephropathy (proteinuria, elevated creatinine) is associated with INCREASED risk of fetal growth restriction, preeclampsia, and preterm delivery, rather than macrosomia. This is likely due to placental insufficiency from microvascular disease. Women with diabetic nephropathy require close fetal surveillance and may benefit from low-dose aspirin for preeclampsia prophylaxis.',
    references: [
      'ACOG Practice Bulletin No. 201',
      'Diabetes Care 2024;47:S282-S294',
      'Am J Kidney Dis 2014;64:383-393'
    ]
  },
  {
    id: 'dip-030',
    topicId: 'diabetes-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended postpartum screening for women with gestational diabetes?',
    options: [
      'Fasting glucose at 6 weeks postpartum',
      '2-hour 75g OGTT at 4-12 weeks postpartum',
      'HbA1c at 3 months postpartum',
      'No screening needed if glucose normalized after delivery'
    ],
    correctIndex: 1,
    explanation: 'All women with GDM should undergo 2-hour 75g OGTT at 4-12 weeks postpartum to identify persistent diabetes or prediabetes. This is preferred over fasting glucose or HbA1c as it detects impaired glucose tolerance. Results guide classification: normal, prediabetes (IFG/IGT), or diabetes. Even if normal, lifelong screening every 1-3 years is recommended due to 30-50% lifetime diabetes risk.',
    references: [
      'ACOG Practice Bulletin No. 190',
      'Diabetes Care 2024;47:S282-S294',
      'Obstet Gynecol 2018;131:e49-e64'
    ]
  }
];

export default diabetesPregnancyQuestions;
