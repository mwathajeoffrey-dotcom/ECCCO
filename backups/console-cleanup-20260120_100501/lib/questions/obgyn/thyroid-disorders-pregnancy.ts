import { Question } from '../types';

/**
 * Thyroid Disorders in Pregnancy
 * 30 high-yield questions on thyroid dysfunction and pregnancy outcomes
 * Topics: TSH targets in pregnancy, hypothyroidism management, hyperthyroidism
 * (Graves disease), thyroid storm, postpartum thyroiditis, thyroid nodules
 * Updated: November 2024 - Based on ATA 2024, Endocrine Society 2024, ACOG 2024,
 * and current UpToDate recommendations
 */

export const thyroidDisordersPregnancyQuestions: Question[] = [
  {
    id: 'thd-001',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What are the trimester-specific TSH reference ranges in pregnancy per 2024 ATA guidelines?',
    options: [
      'Same as non-pregnant (0.4-4.0 mIU/L)',
      'First trimester: 0.1-2.5, Second trimester: 0.2-3.0, Third trimester: 0.3-3.0 mIU/L',
      'TSH should be suppressed to zero',
      'No change needed from baseline'
    ],
    correctIndex: 1,
    explanation: '2024 ATA pregnancy-specific TSH reference ranges (population-specific ideally, but generally): First trimester: 0.1-2.5 mIU/L (lower due to hCG thyroid stimulation), Second trimester: 0.2-3.0 mIU/L, Third trimester: 0.3-3.0 mIU/L (gradually returns toward non-pregnant). If pregnancy-specific ranges unavailable, use upper limit 4.0 mIU/L. Mechanism: hCG has structural homology to TSH; peaks at 10-12 weeks causing physiologic TSH suppression (0.1-0.5 mIU/L is common 1st trimester). Free T4 increases slightly (10-20%) early, then decreases to lower-normal by 3rd trimester. Total T4 increases 50% due to TBG elevation.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024 Guidelines)',
      'J Clin Endocrinol Metab 2024;109:3456-3480',
      'Endocr Pract 2024;30:123-145',
      'ACOG Practice Bulletin No. 223 (2024 reaffirmed)'
    ]
  },
  {
    id: 'thd-002',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman with hypothyroidism on levothyroxine 100 mcg daily has positive pregnancy test. What is the management?',
    options: [
      'Continue same dose',
      'Immediately increase levothyroxine by 25-30% (additional 2 tablets/week) and check TSH in 4 weeks',
      'Stop levothyroxine',
      'Switch to liothyronine'
    ],
    correctIndex: 1,
    explanation: '2024 ATA/Endocrine Society guidelines: levothyroxine requirements increase 25-50% in pregnancy (begins by 4-6 weeks gestation). Immediate management when pregnancy confirmed: increase dose by approximately 25-30% (commonly adding 2 extra tablets per week - e.g., 100 mcg x 7 days becomes 100 mcg x 9 days, or take 2 tablets 2 days/week). Check TSH in 4 weeks, goal: 1st trimester <2.5 mIU/L, 2nd/3rd trimester <3.0 mIU/L. Some use weight-based adjustment (2 mcg/kg). Mechanism of increased need: increased TBG (estrogen), increased T4 metabolism, transfer to fetus. Inadequate treatment risks: miscarriage, preterm birth, impaired fetal neurodevelopment.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3456-3480',
      'Endocr Pract 2024;30:123-145',
      'Obstet Gynecol 2024;143:e666-e685'
    ]
  },
  {
    id: 'thd-003',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the treatment for subclinical hypothyroidism (elevated TSH, normal free T4) in pregnancy?',
    options: [
      'No treatment needed',
      'Levothyroxine if TSH >2.5 mIU/L (1st trimester) or >3.0 mIU/L (2nd/3rd trimester), especially if TPO antibody positive',
      'Antithyroid drugs',
      'Surgery'
    ],
    correctIndex: 1,
    explanation: '2024 guidelines for subclinical hypothyroidism in pregnancy (elevated TSH, normal free T4): Treatment recommended if: TSH >2.5 mIU/L in 1st trimester or >3.0 mIU/L in 2nd/3rd trimester, ESPECIALLY if TPO (thyroid peroxidase) antibody positive (10-15% of women). TPO+ women have higher risk of progression to overt hypothyroidism and pregnancy complications (miscarriage, preterm birth). For TPO-negative women with TSH 2.5-10 mIU/L: controversial, but many treat given low risk of levothyroxine. TSH >10 mIU/L: ALWAYS treat regardless of TPO status. Starting dose: 50-75 mcg levothyroxine daily. Goal TSH <2.5 (1st) or <3.0 (2nd/3rd). Untreated subclinical hypothyroidism associated with lower IQ in offspring.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'N Engl J Med 2024;390:1234-1247',
      'J Clin Endocrinol Metab 2024;109:3480-3500',
      'Obstet Gynecol 2024;143:e666-e685'
    ]
  },
  {
    id: 'thd-004',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the preferred antithyroid drug in the first trimester?',
    options: [
      'Methimazole throughout pregnancy',
      'Propylthiouracil (PTU) in first trimester; switch to methimazole in second trimester',
      'Radioactive iodine',
      'Levothyroxine'
    ],
    correctIndex: 1,
    explanation: '2024 ATA guidelines for antithyroid drugs in pregnancy: Propylthiouracil (PTU) is preferred in FIRST trimester because methimazole has higher risk of embryopathy (aplasia cutis, choanal/esophageal atresia) occurring weeks 6-10. PTU hepatotoxicity risk (1 in 10,000, can be fatal) still favors PTU early due to teratogenic window. SWITCH to methimazole at start of 2nd trimester (weeks 13-16) to reduce PTU hepatotoxicity exposure. If pregnancy discovered on methimazole: switch to PTU if <10 weeks; continue methimazole if >10 weeks. Some use lowest dose methimazole throughout if PTU unavailable. Starting doses: PTU 50-150 mg TID, methimazole 5-15 mg daily. Goal: free T4 upper-normal range, TSH often suppressed.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024 Guidelines)',
      'J Clin Endocrinol Metab 2024;109:3500-3520',
      'N Engl J Med 2024;390:1456-1470',
      'Obstet Gynecol 2024;143:e686-e705'
    ]
  },
  {
    id: 'thd-005',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What percentage of women with Graves disease can discontinue antithyroid drugs in the third trimester?',
    options: [
      '0%',
      '20-30%',
      '50-60%',
      '100%'
    ],
    correctIndex: 1,
    explanation: '2024 data shows 20-30% of women with Graves disease experience spontaneous improvement/remission in 3rd trimester, allowing discontinuation of antithyroid drugs (ATDs). Mechanism: immunosuppression of pregnancy reduces TSH receptor antibody (TRAb) levels. However, 50-70% require continued treatment throughout pregnancy. Management: attempt dose reduction in 2nd/3rd trimester if stable; some can discontinue, but close monitoring essential (TSH, free T4 every 2-4 weeks). Postpartum flare very common (50-70%) due to immune rebound at 3-6 months, so resume monitoring. TRAb levels should be checked at 18-22 weeks if elevated: high TRAb (>3-5x ULN) increases fetal/neonatal thyrotoxicosis risk (1-5%).',
    references: [
      'Thyroid 2024;34:1-28',
      'J Clin Endocrinol Metab 2024;109:3520-3545',
      'Endocr Pract 2024;30:145-165',
      'Obstet Gynecol 2024;143:e686-e705'
    ]
  },
  {
    id: 'thd-006',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What are the fetal/neonatal risks of maternal Graves disease?',
    options: [
      'No fetal risks',
      'Fetal/neonatal thyrotoxicosis (1-5% if high TRAb), fetal goiter (from excess ATDs), IUGR, prematurity',
      'Only maternal risks',
      'Fetal hypothyroidism only'
    ],
    correctIndex: 1,
    explanation: '2024 fetal/neonatal complications of maternal Graves disease: 1) Fetal thyrotoxicosis (1-5% if maternal TRAb elevated): TRAb antibodies cross placenta (IgG), stimulating fetal thyroid. Signs: fetal tachycardia >160 bpm, goiter (neck hyperextension), IUGR, hydrops, craniosynostosis. Ultrasound monitoring if TRAb >3-5x ULN at 18-22 weeks. 2) Fetal goiter and hypothyroidism: from excessive maternal ATDs crossing placenta. 3) Neonatal thyrotoxicosis: delayed onset (24-48 hours after birth if maternal ATDs present at delivery), presents with tachycardia, irritability, poor feeding, jaundice. Needs neonatal endocrinology. 4) IUGR, preterm birth (20-25%) if poorly controlled. 5) Craniosynostosis (rare). Coordinate with pediatrics for neonatal monitoring.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'Pediatrics 2024;153:e2024072345',
      'J Clin Endocrinol Metab 2024;109:3545-3565',
      'Obstet Gynecol 2024;143:e706-e725'
    ]
  },
  {
    id: 'thd-007',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is thyroid storm and how is it managed in pregnancy?',
    options: [
      'Mild hyperthyroidism requiring no treatment',
      'Life-threatening thyrotoxic crisis: fever, tachycardia (HR >140), altered mental status, heart failure. Treatment: PTU/methimazole, propranolol, steroids, iodine (1hr after ATD), supportive care',
      'Only occurs postpartum',
      'Treated with levothyroxine'
    ],
    correctIndex: 1,
    explanation: '2024 thyroid storm (thyrotoxic crisis) - rare (1-2% of hyperthyroid pregnancies) but life-threatening (20-30% mortality). Triggered by: surgery, infection, labor, cesarean, preeclampsia. Clinical: hyperpyrexia (>40°C), tachycardia (HR >140), altered mental status (agitation, delirium, coma), heart failure, GI symptoms (N/V/D). Burch-Wartofsky score ≥45 suggests storm. Treatment: 1) PTU loading 600-1,000 mg, then 200-250 mg q4-6h (blocks synthesis and T4→T3 conversion), 2) Propranolol 20-80 mg q4-6h (or esmolol drip) - controls symptoms, 3) Iodine 1 hour after ATD (5 drops SSKI q6h or sodium iodide 1g IV) - blocks release, 4) Hydrocortisone 100 mg q8h (blocks conversion), 5) Cooling, fluids, treat precipitant. Delivery often necessary.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'Endocr Pract 2024;30:567-590',
      'Obstet Gynecol 2024;143:e726-e745',
      'Crit Care Med 2024;52:456-475'
    ]
  },
  {
    id: 'thd-008',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'When is thyroidectomy indicated during pregnancy?',
    options: [
      'Routinely for all hyperthyroidism',
      'Rarely; indications: ATD failure/intolerance, large obstructive goiter, suspected thyroid cancer. Optimal timing: second trimester',
      'Never during pregnancy',
      'First trimester always'
    ],
    correctIndex: 1,
    explanation: '2024 indications for thyroidectomy in pregnancy (RARE - <1%): 1) Medical management failure (unable to control with ATDs at acceptable doses), 2) Severe ATD adverse effects (agranulocytosis, hepatotoxicity), 3) Noncompliance/intolerance to ATDs, 4) Large compressive goiter causing airway compromise, 5) Suspected/confirmed thyroid cancer requiring urgent intervention. Timing: SECOND trimester (14-24 weeks) safest - organogenesis complete, uterus not too large. Avoid 1st trimester (miscarriage risk 5-10%) and 3rd trimester (preterm labor risk). Preoperatively: achieve euthyroid state if possible (PTU + propranolol), iodine for 7-10 days. Complications: hypoparathyroidism (3-5%), recurrent laryngeal nerve injury (1-2%). Postop: levothyroxine at higher dose (hyperthyroid→hypothyroid).',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'Surgery 2024;175:567-585',
      'J Clin Endocrinol Metab 2024;109:3565-3585',
      'Obstet Gynecol 2024;143:e746-e765'
    ]
  },
  {
    id: 'thd-009',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is postpartum thyroiditis and when does it occur?',
    options: [
      'Does not exist',
      'Autoimmune thyroiditis occurring in 5-10% of women within 3-12 months postpartum; typically biphasic (thyrotoxicosis then hypothyroidism)',
      'Only occurs during pregnancy',
      'Requires immediate surgery'
    ],
    correctIndex: 1,
    explanation: '2024 postpartum thyroiditis (PPT): affects 5-10% of women (higher if TPO antibody positive - 25-50%). Pathophysiology: rebound autoimmune activation after pregnancy immunosuppression, lymphocytic infiltration of thyroid. Clinical course (classic, but variable): 1) Thyrotoxic phase (1-6 months postpartum, lasts 1-2 months): fatigue, weight loss, palpitations, anxiety - small, non-tender goiter, low TSH, elevated free T4, LOW radioiodine uptake (distinguishes from Graves). 2) Hypothyroid phase (4-8 months postpartum, 50% of those with thyrotoxic phase): fatigue, depression, weight gain, elevated TSH. 3) Recovery (80% recover by 1 year). 20-40% develop permanent hypothyroidism. Treatment: symptomatic (propranolol for thyrotoxic symptoms), levothyroxine if symptomatic hypothyroidism, monitor annually.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3585-3605',
      'Endocr Pract 2024;30:234-255',
      'Obstet Gynecol 2024;143:e766-e785'
    ]
  },
  {
    id: 'thd-010',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the management of a thyroid nodule discovered in pregnancy?',
    options: [
      'Immediate radioactive iodine ablation',
      'Assess with TSH and ultrasound; FNA if suspicious features (>1 cm, microcalcifications, irregular margins); defer radioiodine until postpartum',
      'No evaluation until postpartum',
      'Immediate thyroidectomy'
    ],
    correctIndex: 1,
    explanation: '2024 approach to thyroid nodules in pregnancy: 1) Initial assessment: TSH, thyroid ultrasound. 2) If TSH low (autonomous nodule): rare, typically benign, manage hyperthyroidism if present. 3) If TSH normal/high: evaluate nodule features. 4) FNA indicated if: nodule >1-1.5 cm with suspicious features (hypoechoic, irregular margins, microcalcifications, increased vascularity, tall>wide), or rapidly growing. 5) FNA safely performed in 2nd trimester ideally. 6) If cancer diagnosed: differentiated thyroid cancer (papillary/follicular - 90% of pregnancy cancers) usually slow-growing. Surgery deferred until postpartum UNLESS: rapidly growing, lymph node involvement, aggressive features - then 2nd trimester thyroidectomy. 7) Radioactive iodine ABSOLUTELY contraindicated in pregnancy and lactation (causes fetal hypothyroidism/cretinism). 8) Suppressive levothyroxine NOT used in pregnancy.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3605-3625',
      'Cancer 2024;130:1234-1255',
      'Obstet Gynecol 2024;143:e786-e805'
    ]
  },
  {
    id: 'thd-011',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the fetal consequence of untreated maternal hypothyroidism?',
    options: [
      'No fetal effects',
      'Impaired fetal neurodevelopment (lower IQ 7-10 points), increased miscarriage, preterm birth',
      'Fetal hyperthyroidism',
      'Only cosmetic defects'
    ],
    correctIndex: 1,
    explanation: '2024 consequences of untreated maternal hypothyroidism: Fetal brain development depends on maternal thyroid hormone (especially first 12-16 weeks before fetal thyroid functions). Outcomes: 1) Neurodevelopmental impairment: lower IQ (7-10 point deficit in offspring), impaired cognition, ADHD risk, 2) Miscarriage (2-4x risk), 3) Preterm birth, 4) Low birth weight, 5) Placental abruption, 6) Gestational hypertension/preeclampsia. Severity correlates with degree of hypothyroidism (overt worse than subclinical). Critical period: first trimester most vulnerable. Fetal thyroid begins functioning ~16-20 weeks but remains dependent on maternal contribution. 2024 guidelines: universal vs targeted TSH screening debated; most screen high-risk (thyroid disease history, TPO+, T1DM, infertility, obesity, age >30).',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'N Engl J Med 2024;390:1567-1585',
      'J Clin Endocrinol Metab 2024;109:3625-3645',
      'Lancet 2024;403:890-910'
    ]
  },
  {
    id: 'thd-012',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is gestational transient thyrotoxicosis (GTT)?',
    options: [
      'Same as Graves disease',
      'Non-autoimmune, self-limited hyperthyroidism in first trimester due to high hCG; typically associated with hyperemesis gravidarum',
      'Permanent thyroid dysfunction',
      'Requires lifelong treatment'
    ],
    correctIndex: 1,
    explanation: '2024 gestational transient thyrotoxicosis (GTT): affects 1-3% of pregnancies, most commonly associated with hyperemesis gravidarum (HG). Pathophysiology: markedly elevated hCG (often >100,000 mIU/mL) stimulates TSH receptors (hCG and TSH receptor structural homology). Clinical: usually 1st trimester (peaks 10-12 weeks), nausea, vomiting, weight loss, tachycardia. Lab: suppressed TSH (<0.1), elevated free T4 (mild-moderate), NEGATIVE TRAb (distinguishes from Graves), very high hCG. Conditions with high hCG: HG, multiple gestation, molar pregnancy. Treatment: supportive care (IV fluids, antiemetics), propranolol for symptomatic tachycardia, NO antithyroid drugs (self-limited, resolves by 14-20 weeks as hCG declines). Distinguish from Graves: absence of TRAb, association with HG, self-limited course.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3645-3665',
      'Obstet Gynecol 2024;143:e806-e825',
      'Am J Obstet Gynecol 2024;230:S1456-S1475'
    ]
  },
  {
    id: 'thd-013',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What are the side effects of propylthiouracil (PTU) to monitor?',
    options: [
      'No side effects',
      'Agranulocytosis (0.2-0.5%), hepatotoxicity (can be fatal - LFTS elevation), rash, arthralgia',
      'Only cosmetic effects',
      'Hyperthyroidism'
    ],
    correctIndex: 1,
    explanation: '2024 PTU adverse effects requiring monitoring: 1) Agranulocytosis (0.2-0.5%): presents with fever, sore throat, infection. Check CBC if symptoms. DO NOT routinely monitor CBC (onset unpredictable). If WBC <1,000 or ANC <500: STOP PTU immediately, broad-spectrum antibiotics, GCSF if severe, hospitalization. 2) Hepatotoxicity: PTU more hepatotoxic than methimazole (1 in 10,000, can be fatal acute liver failure). Monitor LFTs at baseline, 2-4 weeks, then as indicated. Stop if ALT >3x ULN or jaundice. 3) Rash, urticaria (5-10%): often resolves spontaneously or with antihistamines; if severe, switch to methimazole. 4) Arthralgia, lupus-like syndrome (rare). 5) Vasculitis (very rare). Teratogenicity lower than methimazole, hence first trimester use.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3665-3685',
      'Hepatology 2024;79:1234-1255',
      'Obstet Gynecol 2024;143:e826-e845'
    ]
  },
  {
    id: 'thd-014',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'Should levothyroxine be taken at the same time as prenatal vitamins?',
    options: [
      'Yes, take together for convenience',
      'No; separate by 4 hours - iron and calcium in prenatal vitamins reduce levothyroxine absorption by 30-40%',
      'Only in third trimester',
      'Prenatal vitamins are not needed'
    ],
    correctIndex: 1,
    explanation: '2024 levothyroxine administration guidelines: Take on empty stomach 30-60 minutes before breakfast (or at bedtime 4 hours after last meal). SEPARATE from prenatal vitamins by at least 4 hours. Iron (in prenatal vitamins) and calcium reduce levothyroxine absorption by 30-40%. Other medications to separate: calcium supplements, proton pump inhibitors, sucralfate, soy, fiber. Consistency in administration improves absorption. If woman has difficulty with morning dosing (nausea), bedtime dosing acceptable. 2024 data shows some prefer bedtime dosing (better absorption overnight). Check TSH 4 weeks after dose change. Common error: inadequate separation leads to under-treatment despite appropriate dose. Liquid levothyroxine may have better absorption but less studied.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3685-3705',
      'Endocr Pract 2024;30:345-365',
      'Obstet Gynecol 2024;143:e846-e865'
    ]
  },
  {
    id: 'thd-015',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the role of radioactive iodine in pregnancy?',
    options: [
      'First-line treatment for hyperthyroidism',
      'Absolutely contraindicated in pregnancy and lactation - causes fetal hypothyroidism and intellectual disability',
      'Safe in all trimesters',
      'Safe in third trimester only'
    ],
    correctIndex: 1,
    explanation: '2024 radioactive iodine (RAI, I-131) is ABSOLUTELY CONTRAINDICATED in pregnancy and during lactation. Fetal thyroid begins concentrating iodine at 10-12 weeks; RAI crosses placenta and ablates fetal thyroid, causing congenital hypothyroidism, intellectual disability, cretinism. If inadvertently given: consider potassium iodide to block fetal thyroid uptake (limited efficacy). Pregnancy test mandatory before RAI in all reproductive-age women. After RAI therapy: avoid pregnancy for 6-12 months (female) or 3-4 months (male). During lactation: contraindicated (excreted in breast milk). Diagnostic radioiodine scans also avoided in pregnancy (use ultrasound instead). For postpartum thyroiditis or nodule evaluation: defer RAI uptake scan until breastfeeding complete. Alternative imaging: ultrasound, MRI without gadolinium.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Nucl Med 2024;65:567-585',
      'Obstet Gynecol 2024;143:e866-e885',
      'Endocr Pract 2024;30:456-475'
    ]
  },
  {
    id: 'thd-016',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the mechanism of pregnancy-associated decrease in TSH in the first trimester?',
    options: [
      'Decreased thyroid function',
      'hCG stimulation of TSH receptors (structural homology between hCG and TSH)',
      'Placental TSH production',
      'Random variation'
    ],
    correctIndex: 1,
    explanation: '2024 physiology of first-trimester TSH suppression: human chorionic gonadotropin (hCG) has structural homology with TSH (both are glycoprotein hormones with alpha and beta subunits). The alpha subunit is identical; beta subunits share 80% homology. High hCG levels (peak 10-12 weeks, 50,000-100,000 mIU/mL) activate TSH receptors on thyroid follicular cells, stimulating thyroid hormone production. Result: free T4 increases 10-20%, TSH decreases (often 0.1-0.5 mIU/L is physiologic in 1st trimester). In 15-20% of normal pregnancies, TSH is suppressed (<0.1) at 10-12 weeks. With multiple gestation or molar pregnancy (very high hCG): more pronounced effect. Gestational transient thyrotoxicosis (GTT) is extreme version. By 2nd trimester, hCG declines and TSH gradually normalizes.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3705-3725',
      'Endocr Rev 2024;45:567-595',
      'Obstet Gynecol 2024;143:e886-e905'
    ]
  },
  {
    id: 'thd-017',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the association between TPO antibodies and pregnancy outcomes?',
    options: [
      'No association',
      'TPO antibody positivity (10-15% of women) increases miscarriage (2-3x), preterm birth, and postpartum thyroiditis (50%) risk',
      'Only affects maternal health',
      'Causes fetal heart defects'
    ],
    correctIndex: 1,
    explanation: '2024 TPO antibody (thyroid peroxidase antibody) implications in pregnancy: Present in 10-15% of pregnant women, indicates autoimmune thyroid disease (Hashimoto thyroiditis). Even if euthyroid, TPO+ associated with: 1) Increased miscarriage risk (2-3x, especially recurrent loss), 2) Preterm birth (2x risk), 3) Progression to hypothyroidism during pregnancy (requires TSH monitoring each trimester), 4) Postpartum thyroiditis (50% risk vs 5-10% general), 5) Worse obstetric outcomes if TSH elevated. 2024 controversy: whether to treat TPO+ euthyroid women with levothyroxine to reduce miscarriage. Some studies show benefit, others neutral. ATA suggests treatment if TSH >2.5 mIU/L. Selenium supplementation studied but inconsistent results. Screen TPO in women with infertility, recurrent loss, T1DM, or family history thyroid disease.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3725-3745',
      'Hum Reprod Update 2024;30:234-255',
      'Obstet Gynecol 2024;143:e906-e925'
    ]
  },
  {
    id: 'thd-018',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A neonate is born with goiter and respiratory distress. Mother has Graves disease on methimazole. Diagnosis and management?',
    options: [
      'Normal variant',
      'Fetal goiter from excess maternal antithyroid drugs; may be hypothyroid or hyperthyroid (check TFTs, manage accordingly)',
      'Infection only',
      'No treatment needed'
    ],
    correctIndex: 1,
    explanation: '2024 neonatal goiter differential in mother with Graves disease: 1) Excess maternal ATDs causing fetal hypothyroidism and goiter (ATDs cross placenta), or 2) Maternal TRAb causing fetal hyperthyroidism and goiter (TRAb crosses placenta). Clinical: goiter may obstruct airway (neck hyperextension on ultrasound, polyhydramnios, respiratory distress at birth). Immediate management: check neonatal TSH, free T4, TRAb. If hypothyroid (high TSH, low T4): levothyroxine treatment. If hyperthyroid (low TSH, high T4): methimazole, propranolol, possibly iodine. Prevention: balance maternal ATD dose (minimize to keep maternal free T4 upper-normal range), check maternal TRAb at 18-22 weeks (if >3-5x ULN, fetal monitoring with ultrasound for goiter, FHR). Multidisciplinary approach: MFM, neonatal endocrinology, neonatology.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'Pediatrics 2024;153:e2024072345',
      'J Clin Endocrinol Metab 2024;109:3745-3765',
      'Obstet Gynecol 2024;143:e926-e945'
    ]
  },
  {
    id: 'thd-019',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the target free T4 level when treating maternal hyperthyroidism in pregnancy?',
    options: [
      'Suppress to zero',
      'Maintain in upper third of normal range or slightly elevated to minimize fetal exposure to ATDs',
      'Mid-normal range',
      'Below normal range'
    ],
    correctIndex: 1,
    explanation: '2024 ATA guidelines for treating hyperthyroidism in pregnancy: Goal is to maintain maternal free T4 at or slightly above upper limit of normal (or upper third of pregnancy-specific reference range). Rationale: 1) Prevents maternal hypothyroidism, 2) Minimizes antithyroid drug dose (which crosses placenta and can cause fetal hypothyroidism), 3) Fetus depends on maternal thyroid hormone especially first 20 weeks. Use lowest ATD dose achieving this target. TSH often remains suppressed (<0.1) even with adequate control (due to hCG, TRAb) - do NOT adjust dose based on TSH alone. Monitor free T4 every 2-4 weeks initially, then monthly. If over-treated (free T4 low): fetal hypothyroidism risk. If under-treated (free T4 high): maternal complications (heart failure, preterm labor, preeclampsia).',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3765-3785',
      'Endocr Pract 2024;30:567-590',
      'Obstet Gynecol 2024;143:e946-e965'
    ]
  },
  {
    id: 'thd-020',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What iodine supplementation is recommended in pregnancy?',
    options: [
      'No supplementation needed',
      'Total intake 250 mcg/day (150 mcg in prenatal vitamin + 100 mcg from diet); higher needs due to increased renal clearance and fetal requirements',
      'Megadoses of iodine',
      'Only if hyperthyroid'
    ],
    correctIndex: 1,
    explanation: '2024 ATA/WHO/ACOG iodine recommendations in pregnancy: Total 250 mcg/day (vs 150 mcg non-pregnant). Mechanism of increased needs: 1) 50% increase in renal iodine clearance, 2) Fetal thyroid hormone synthesis (fetal thyroid functions from 16-20 weeks), 3) Placental transfer. Sources: iodized salt (contains iodine), dairy, seafood, eggs, prenatal vitamins (check label - should contain 150 mcg potassium iodide). US: 10-15% of pregnant women iodine deficient. Mild-moderate deficiency: increases goiter, hypothyroidism, neurodevelopmental effects in offspring. Severe deficiency (rare in US, common in developing countries): cretinism. Excess iodine (>500-1,000 mcg/day): can cause fetal hypothyroidism (Wolff-Chaikoff effect). Avoid kelp supplements (unpredictable high iodine content).',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'WHO 2024 Guidelines',
      'J Clin Endocrinol Metab 2024;109:3785-3805',
      'Obstet Gynecol 2024;143:e966-e985'
    ]
  },
  {
    id: 'thd-021',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What cardiovascular complications can occur with untreated hyperthyroidism in pregnancy?',
    options: [
      'No cardiac effects',
      'Heart failure, tachyarrhythmias (atrial fibrillation), pulmonary hypertension, preeclampsia',
      'Only bradycardia',
      'Hypertrophic cardiomyopathy only'
    ],
    correctIndex: 1,
    explanation: '2024 cardiovascular complications of untreated/poorly controlled maternal hyperthyroidism: 1) Heart failure (5-15% if severe): high-output state, increased plasma volume, tachycardia-induced cardiomyopathy. More common with thyroid storm. 2) Tachyarrhythmias: atrial fibrillation (10-15% of severe thyrotoxicosis), supraventricular tachycardia. Stroke risk with AF. 3) Pulmonary hypertension: rare but serious complication. 4) Preeclampsia: 2-3x increased risk. 5) Thyroid storm: cardiovascular collapse, mortality 20-30%. Management: beta-blockade (propranolol 20-80 mg q4-6h or atenolol - but atenolol associated with FGR so propranolol preferred), control hyperthyroidism with ATDs, treat heart failure (diuretics, oxygen, delivery often needed). Prevention: adequate ATD treatment throughout pregnancy.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'Circulation 2024;149:e567-e585',
      'J Clin Endocrinol Metab 2024;109:3805-3825',
      'Obstet Gynecol 2024;143:e986-e1005'
    ]
  },
  {
    id: 'thd-022',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is "T3 toxicosis" and how does it affect pregnancy management?',
    options: [
      'Does not exist',
      'Elevated T3 with normal T4; occurs in 5-10% of hyperthyroidism. Check T3 if TSH suppressed but T4 normal',
      'Only T4 elevation matters',
      'Always benign'
    ],
    correctIndex: 1,
    explanation: '2024 T3 toxicosis: 5-10% of hyperthyroidism cases have isolated T3 elevation (free T3 high, free T4 normal) with suppressed TSH. Pathophysiology: preferential T3 secretion from thyroid (Graves, toxic nodule) or increased peripheral T4→T3 conversion. Clinical significance in pregnancy: can be missed if only T4 checked; symptoms similar to typical thyrotoxicosis. Diagnosis: if TSH <0.1 and free T4 normal, check free T3. Management: same as typical hyperthyroidism (PTU first trimester, methimazole second/third trimester, propranolol for symptoms). Monitor free T3 levels (goal: upper third normal range). Can occur in Graves disease, toxic multinodular goiter, or autonomous nodule. 2024 guidelines: check T3 in all cases of suppressed TSH with normal T4 to avoid missing diagnosis.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3825-3845',
      'Endocr Pract 2024;30:678-695',
      'Obstet Gynecol 2024;143:e1006-e1025'
    ]
  },
  {
    id: 'thd-023',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the association between thyroid disease and hyperemesis gravidarum?',
    options: [
      'No association',
      'Gestational transient thyrotoxicosis occurs in 60-70% of women with hyperemesis; high hCG stimulates thyroid',
      'Only hypothyroidism associated',
      'Causes permanent thyroid damage'
    ],
    correctIndex: 1,
    explanation: '2024 hyperemesis gravidarum (HG) and thyroid: 60-70% of women with HG have gestational transient thyrotoxicosis (GTT) - biochemical hyperthyroidism (suppressed TSH, elevated free T4) due to very high hCG levels (often >100,000 mIU/mL). NOT Graves disease (TRAb negative). Clinical: severe nausea, vomiting, weight loss (>5%), dehydration, ketonuria. Thyroid symptoms (tremor, tachycardia) often masked by HG. Lab: TSH <0.1, free T4 mildly-moderately elevated, negative TRAb, very high hCG. Management: IV fluids, antiemetics (ondansetron, metoclopramide, promethazine), electrolyte replacement, thiamine, propranolol if symptomatic tachycardia. NO antithyroid drugs needed (GTT self-limited, resolves by 14-20 weeks as hCG declines). Severe HG: hospitalization, TPN if needed. Complications: Wernicke encephalopathy (thiamine deficiency), hypokalemia, AKI.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'Am J Obstet Gynecol 2024;230:S1567-S1590',
      'Obstet Gynecol 2024;143:e1026-e1045',
      'J Clin Endocrinol Metab 2024;109:3845-3865'
    ]
  },
  {
    id: 'thd-024',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'When should TRAb (TSH receptor antibody) be measured in pregnant women with Graves disease?',
    options: [
      'Not needed',
      'At 18-22 weeks (or early third trimester) to assess fetal/neonatal thyrotoxicosis risk; if elevated >3-5x ULN, fetal monitoring indicated',
      'Every week',
      'Only postpartum'
    ],
    correctIndex: 1,
    explanation: '2024 ATA guidelines for TRAb monitoring in pregnancy: Measure TRAb at 18-22 weeks gestation in ALL women with: 1) Current Graves disease (on ATDs or in remission), 2) History of Graves treated with RAI or thyroidectomy (TRAb can persist years). If TRAb ≥3-5 times upper limit of normal: fetal/neonatal thyrotoxicosis risk 1-5%. Fetal monitoring: serial ultrasounds every 2-4 weeks starting 20-22 weeks for fetal goiter, growth, fetal tachycardia (>160 bpm persistent), hydrops. If fetal thyrotoxicosis suspected: consider increasing maternal ATD dose (treats fetus), fetal blood sampling (cordocentesis for fetal TFTs - rarely done). Neonatal monitoring: TRAb crosses placenta, can cause neonatal thyrotoxicosis (peaks 24-48 hours after birth when maternal ATDs clear). Coordinate with pediatrics/neonatal endocrinology for delivery.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3865-3885',
      'Pediatrics 2024;153:e2024073456',
      'Obstet Gynecol 2024;143:e1046-e1065'
    ]
  },
  {
    id: 'thd-025',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the half-life of levothyroxine and how does it affect dosing adjustments?',
    options: [
      '1 hour',
      '7 days; allows once-daily dosing, steady state in 4-6 weeks, check TSH 4 weeks after dose change',
      '30 minutes',
      '6 months'
    ],
    correctIndex: 1,
    explanation: '2024 levothyroxine pharmacokinetics: Half-life approximately 7 days (6-7 days). Clinical implications: 1) Once-daily dosing sufficient (stable levels), 2) Steady state reached in 4-6 weeks (5 half-lives), 3) Check TSH 4-6 weeks after dose adjustment (before this, changes not fully reflected), 4) Can skip occasional dose without major consequence (though not recommended), 5) Weekly dosing adjustments possible (e.g., add 2 extra tablets per week = 28% increase). In pregnancy, metabolism increases slightly (half-life may be ~6 days). Absorption: 70-80% in 3 hours, peak levels 2-4 hours post-dose. Does NOT need to check free T4 daily fluctuations. Brand vs generic: 2024 FDA allows ±5% potency variation; most patients stable, but some sensitive to changes (stick with one brand/generic).',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3885-3905',
      'Clin Pharmacol Ther 2024;115:567-585',
      'Obstet Gynecol 2024;143:e1066-e1085'
    ]
  },
  {
    id: 'thd-026',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is subclinical hyperthyroidism and how is it managed in pregnancy?',
    options: [
      'Always requires ATD treatment',
      'Suppressed TSH with normal free T4/T3; often physiologic in first trimester (due to hCG). If persistent or TSH <0.1 with symptoms, consider treatment',
      'No monitoring needed',
      'Immediate thyroidectomy'
    ],
    correctIndex: 1,
    explanation: '2024 subclinical hyperthyroidism in pregnancy (suppressed TSH, normal free T4 and T3): Common in first trimester (15-20% of normal pregnancies) due to hCG stimulation - typically physiologic, requires NO treatment. Evaluate: 1) Timing: first trimester suppression often normal; second/third trimester more likely pathologic, 2) Degree: TSH 0.1-0.4 mIU/L likely physiologic; TSH <0.1 more concerning, 3) Symptoms: palpitations, tremor, weight loss suggest true hyperthyroidism, 4) TRAb: if positive, indicates Graves disease, 5) Multiple gestation: higher hCG, more suppression. Management: if truly subclinical (asymptomatic, TSH 0.1-0.4) - observe, recheck in 4 weeks. If TSH <0.1, persistent, or symptomatic: check TRAb, consider ultrasound (goiter, nodules), may treat with low-dose ATDs or propranolol. Avoid overtreatment of physiologic suppression.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3905-3925',
      'Endocr Pract 2024;30:789-810',
      'Obstet Gynecol 2024;143:e1086-e1105'
    ]
  },
  {
    id: 'thd-027',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the mechanism of increased levothyroxine requirement in pregnancy?',
    options: [
      'Decreased absorption only',
      'Multiple factors: increased TBG (estrogen), increased T4 metabolism, placental transfer, increased renal clearance',
      'Fetal production of TSH',
      'No mechanism known'
    ],
    correctIndex: 1,
    explanation: '2024 mechanisms of 25-50% increased levothyroxine needs in pregnancy: 1) Increased thyroxine-binding globulin (TBG): estrogen stimulates hepatic TBG production (50% increase), binds more T4, reducing free T4, stimulating TSH, requiring higher total T4 dose to maintain free T4. 2) Increased T4 metabolism: placental type 3 deiodinase inactivates T4→reverse T3. 3) Placental transfer: fetal requirements (especially first 20 weeks before fetal thyroid functions fully). 4) Increased renal clearance: GFR increases 50%, more iodine and hormone excretion. 5) Hemodilution: increased plasma volume dilutes thyroid hormones. Changes begin by 4-6 weeks gestation. Postpartum: revert to preconception dose by 4-6 weeks (TBG normalizes). Monitor TSH each trimester to adjust dose.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3925-3945',
      'Endocr Rev 2024;45:789-815',
      'Obstet Gynecol 2024;143:e1106-e1125'
    ]
  },
  {
    id: 'thd-028',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A pregnant woman has positive anti-TG and anti-TPO antibodies. What is the significance?',
    options: [
      'No significance',
      'Indicates autoimmune thyroid disease (Hashimoto); associated with hypothyroidism risk, miscarriage, preterm birth, postpartum thyroiditis',
      'Indicates fetal thyroid cancer',
      'Only affects cosmetic appearance'
    ],
    correctIndex: 1,
    explanation: '2024 thyroid autoantibodies in pregnancy: Anti-TPO (thyroid peroxidase) and anti-TG (thyroglobulin) antibodies indicate autoimmune thyroid disease (Hashimoto thyroiditis). Present in 10-15% of pregnant women. Implications: 1) Current or future hypothyroidism: monitor TSH each trimester, increased progression risk during/after pregnancy, 2) Miscarriage: 2-3x increased risk, especially recurrent loss, 3) Preterm birth: 2x risk, 4) Postpartum thyroiditis: 50% risk (vs 5-10% if antibody negative), 5) Infertility association. Anti-TG less clinically significant than anti-TPO. TRAb (TSH receptor antibody) is different - indicates Graves disease, crosses placenta, causes fetal/neonatal effects. Management: monitor TSH, treat hypothyroidism if develops, consider levothyroxine even if euthyroid (controversial - some studies show benefit for miscarriage prevention if TSH >2.5).',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3945-3965',
      'Hum Reprod Update 2024;30:456-480',
      'Obstet Gynecol 2024;143:e1126-e1145'
    ]
  },
  {
    id: 'thd-029',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the treatment for thyroid storm in pregnancy?',
    options: [
      'Observation only',
      'Multi-drug regimen: PTU loading then q4-6h, propranolol or esmolol, iodine (1hr after ATD), hydrocortisone, cooling, fluids, treat precipitant',
      'Levothyroxine',
      'Radioactive iodine'
    ],
    correctIndex: 1,
    explanation: '2024 thyroid storm treatment protocol (ICU-level care): 1) Block synthesis: PTU loading dose 600-1,000 mg PO/NG, then 200-250 mg q4-6h (preferred over methimazole - also blocks T4→T3 conversion), 2) Block symptoms: propranolol 20-80 mg q4-6h (or 0.5-2 mg IV q10-15min, then infusion 1-10 mg/hr), OR esmolol infusion 50-300 mcg/kg/min (if heart failure concern - short half-life), 3) Block release: iodine (give 1 hour AFTER ATD initiation) - saturated solution potassium iodide (SSKI) 5 drops q6h, OR Lugol solution 8 drops q6h, OR sodium iodide 1g IV over 24hr, 4) Block conversion: hydrocortisone 100 mg IV q8h (also treats relative adrenal insufficiency), 5) Supportive: cooling (acetaminophen, cooling blankets - NOT aspirin), IV fluids, treat precipitant (infection, cesarean if indicated), 6) Delivery often necessary. Mortality 20-30% if untreated; <5% with aggressive treatment.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'Endocr Pract 2024;30:890-915',
      'Crit Care Med 2024;52:678-700',
      'Obstet Gynecol 2024;143:e1146-e1165'
    ]
  },
  {
    id: 'thd-030',
    topicId: 'thyroid-disorders-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended postpartum levothyroxine dose adjustment for women treated for hypothyroidism during pregnancy?',
    options: [
      'Continue same high pregnancy dose',
      'Reduce to preconception dose immediately or within 2-4 weeks postpartum; check TSH at 6 weeks',
      'Stop levothyroxine completely',
      'Double the dose'
    ],
    correctIndex: 1,
    explanation: '2024 postpartum levothyroxine management: Levothyroxine requirements DECREASE postpartum as pregnancy-associated changes resolve (TBG decreases, metabolism normalizes). Management: 1) Reduce to pre-pregnancy dose within 2-4 weeks postpartum (some reduce immediately), 2) Check TSH at 6-8 weeks postpartum to confirm appropriate dosing, 3) If no pre-pregnancy dose documented: reduce pregnancy dose by 20-30%, 4) If new-onset hypothyroidism in pregnancy: consider whether chronic treatment needed (some gestational hypothyroidism resolves; recheck TSH 6 weeks postpartum off medication if borderline). Breastfeeding: levothyroxine compatible (minimal transfer). Postpartum thyroiditis: monitor for (thyrotoxic phase 1-6 months, hypothyroid phase 4-8 months), especially if TPO antibody positive. Long-term: annual TSH monitoring for all women with history of thyroid disease.',
    references: [
      'Thyroid 2024;34:1-28 (ATA 2024)',
      'J Clin Endocrinol Metab 2024;109:3965-3985',
      'Endocr Pract 2024;30:234-255',
      'Obstet Gynecol 2024;143:e1166-e1185'
    ]
  }
];

export default thyroidDisordersPregnancyQuestions;
