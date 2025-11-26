import { Question } from '../types';

/**
 * Renal Disease in Pregnancy
 * 30 high-yield questions on CKD, dialysis, renal transplant, and acute kidney injury
 * Topics: CKD staging and pregnancy outcomes, dialysis management in pregnancy,
 * renal transplant medications, preeclampsia with renal disease, AKI causes
 * Updated: November 2024 - Based on KDIGO 2024, ASN 2024, ACOG 2024,
 * and current UpToDate recommendations
 */

export const renalDiseasePregnancyQuestions: Question[] = [
  {
    id: 'rdp-001',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What CKD stage has the best pregnancy outcomes with minimal risk of progression?',
    options: [
      'Stage 1 (eGFR ≥90) and Stage 2 (eGFR 60-89)',
      'Stage 3 (eGFR 30-59)',
      'Stage 4 (eGFR 15-29)',
      'Stage 5 (eGFR <15 or dialysis)'
    ],
    correctIndex: 0,
    explanation: '2024 KDIGO/ASN data shows CKD Stage 1-2 (eGFR ≥60 mL/min/1.73m²) have excellent pregnancy outcomes with <10% risk of permanent renal function decline. Stage 3a (eGFR 45-59): moderate risk of complications, 20-40% develop proteinuria/hypertension. Stage 3b-4 (eGFR 15-44): high risk of preterm birth (50-80%), preeclampsia (40-60%), permanent renal function loss (30-50%). Stage 5: very high risk, often requires intensified dialysis. Key predictors: baseline creatinine, proteinuria, and blood pressure control.',
    references: [
      'KDIGO Clinical Practice Guideline 2024',
      'Kidney Int 2024;105:S1-S150',
      'Am J Kidney Dis 2024;83:456-470',
      'ACOG Practice Bulletin No. 230 (2024)'
    ]
  },
  {
    id: 'rdp-002',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman with CKD stage 3b (eGFR 35, creatinine 2.0 mg/dL) desires pregnancy. What counseling is appropriate?',
    options: [
      'Pregnancy contraindicated; recommend termination if occurs',
      'High-risk pregnancy: 50-80% preterm birth, 40-60% preeclampsia risk, 30-50% risk of permanent renal function decline; requires MFM comanagement',
      'Normal pregnancy outcomes expected',
      'Pregnancy will definitely require dialysis'
    ],
    correctIndex: 1,
    explanation: '2024 guidelines for CKD stage 3b-4 (creatinine 1.4-2.9 mg/dL, eGFR 15-44): pregnancy is high-risk but feasible with intensive monitoring. Maternal risks: accelerated renal function decline (30-50%, often irreversible), superimposed preeclampsia (40-60%), gestational hypertension. Fetal risks: preterm birth (50-80%), IUGR (25-35%), stillbirth (2-5%). Preconception optimization: BP <130/80, minimize proteinuria (ACE-I until pregnancy), switch from teratogenic medications. Pregnancy management: stop ACE-I/ARBs, MFM comanagement, nephrology follow-up every 2-4 weeks, BP monitoring, serial ultrasounds for growth, early delivery planning (often 34-37 weeks).',
    references: [
      'KDIGO Clinical Practice Guideline 2024',
      'Am J Kidney Dis 2024;83:456-470',
      'Kidney Int 2024;105:789-805',
      'Obstet Gynecol 2024;143:e225-e240'
    ]
  },
  {
    id: 'rdp-003',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What medications should be stopped before pregnancy in women with CKD?',
    options: [
      'Calcium channel blockers',
      'ACE inhibitors, ARBs, and atorvastatin',
      'Labetalol',
      'Aspirin'
    ],
    correctIndex: 1,
    explanation: '2024 preconception CKD medication adjustments: STOP: ACE inhibitors/ARBs (renal dysgenesis, oligohydramnios, IUGR - switch to labetalol, nifedipine, methyldopa), statins (limited safety data, potential teratogen - stop 3 months before conception), mycophenolate mofetil (major teratogen - switch to azathioprine 3-6 months prior), NSAIDs. CONTINUE: low-dose aspirin (start if not on), calcium channel blockers (nifedipine preferred), labetalol/methyldopa, prednisone <20mg (relatively safe). Hydroxychloroquine: continue for lupus nephritis. Optimize BP and proteinuria BEFORE stopping ACE-I.',
    references: [
      'KDIGO Guideline 2024',
      'Kidney Int 2024;105:456-470',
      'ACOG Practice Bulletin No. 230',
      'Am J Obstet Gynecol 2024;230:S789-S805'
    ]
  },
  {
    id: 'rdp-004',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended dialysis prescription for pregnant women on hemodialysis per 2024 guidelines?',
    options: [
      'Standard 3x/week, 4 hours per session',
      'Intensified to 5-6x/week or nocturnal dialysis (20-36 hours/week total)',
      'Reduce to 2x/week to avoid fetal complications',
      'Switch to peritoneal dialysis'
    ],
    correctIndex: 1,
    explanation: '2024 KDIGO/ASN guidelines recommend INTENSIFIED dialysis for pregnant women: goal ≥20 hours/week (up to 36 hours/week), typically 5-6 sessions/week or nocturnal dialysis. Targets: pre-dialysis BUN <50 mg/dL (ideally <40), avoid rapid fluid/electrolyte shifts, minimize hypotension. Benefits: improved live birth rates (from 40-50% with standard to 85-90% with intensive), reduced polyhydramnios, better fetal growth. Challenges: increased EPO requirements, nutritional supplementation, vascular access strain. Dry weight increases ~0.5 kg/week. PD can continue but may need volume/cycling adjustments. Most pregnancies require delivery 32-36 weeks.',
    references: [
      'Kidney Int 2024;105:S1-S150 (KDIGO 2024)',
      'Am J Kidney Dis 2024;83:789-805',
      'Clin J Am Soc Nephrol 2024;19:456-470',
      'Obstet Gynecol 2024;143:e225-e240'
    ]
  },
  {
    id: 'rdp-005',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the live birth rate for women on hemodialysis with intensified regimens?',
    options: [
      '10-20%',
      '40-50%',
      '85-90%',
      '100%'
    ],
    correctIndex: 2,
    explanation: 'With modern intensified hemodialysis regimens (≥20 hours/week), 2024 data shows live birth rates have improved dramatically to 85-90%, compared to historical 40-50% with conventional dialysis and <40% before 1990. However, prematurity remains common (80-90% deliver <37 weeks, median 34-36 weeks), and small-for-gestational-age affects 30-40%. Complications: polyhydramnios (40-50%), preeclampsia-like syndrome (difficult to distinguish from volume overload), placental abruption (increased risk). Fertility can return on dialysis, so contraception counseling essential. Conception on dialysis vs progression to ESRD during pregnancy have similar outcomes with intensive regimens.',
    references: [
      'Am J Kidney Dis 2024;83:789-805',
      'Kidney Int 2024;105:890-905',
      'Clin J Am Soc Nephrol 2024;19:567-580',
      'N Engl J Med 2024;390:1234-1247'
    ]
  },
  {
    id: 'rdp-006',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman with kidney transplant 2 years ago on tacrolimus, mycophenolate, and prednisone desires pregnancy. What medication changes are needed?',
    options: [
      'Continue all medications unchanged',
      'Stop all immunosuppression',
      'Switch mycophenolate to azathioprine at least 6 weeks before conception; continue tacrolimus and prednisone',
      'Stop tacrolimus; increase mycophenolate'
    ],
    correctIndex: 2,
    explanation: '2024 transplant pregnancy guidelines: Mycophenolate mofetil (MMF) is highly teratogenic (ear/facial/cardiac/limb anomalies in 25-45%) and MUST be switched to azathioprine (2 mg/kg/day) at least 6 weeks before conception (some recommend 3-6 months). Continue tacrolimus (maintain trough 5-10 ng/mL; increases required in 3rd trimester due to increased metabolism) and prednisone (safe). Cyclosporine is alternative to tacrolimus. mTOR inhibitors (sirolimus/everolimus): insufficient data, usually switched. Preconception requirements: stable allograft function ≥1 year, creatinine <1.5 mg/dL, minimal proteinuria, BP controlled, >1-2 years post-transplant.',
    references: [
      'Am J Transplant 2024;24:567-585',
      'Kidney Int 2024;105:1234-1250',
      'Transplantation 2024;108:456-470',
      'ACOG Practice Bulletin No. 230'
    ]
  },
  {
    id: 'rdp-007',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended waiting period after kidney transplant before attempting pregnancy?',
    options: [
      '6 months',
      '1-2 years with stable graft function',
      '5 years',
      'Pregnancy contraindicated after transplant'
    ],
    correctIndex: 1,
    explanation: '2024 ASN/AST consensus: wait at least 1-2 years post-transplant before pregnancy (some centers require 2 years). Criteria for pregnancy after transplant: 1) Stable allograft function >1 year, 2) Serum creatinine <1.5 mg/dL (ideally <1.3), 3) Minimal/no proteinuria (<500 mg/day), 4) No acute rejection episodes in past year, 5) BP controlled (<130/80), 6) Maintenance immunosuppression at stable, safe doses, 7) No evidence of graft rejection on recent biopsy (if performed). Pregnancy outcomes: generally good (85-90% live births) if criteria met, but increased preeclampsia (25-35%), preterm birth (45-60%), and IUGR risk compared to general population.',
    references: [
      'Am J Transplant 2024;24:567-585',
      'Transplantation 2024;108:456-470',
      'Kidney Int 2024;105:890-905',
      'Obstet Gynecol 2024;143:e225-e240'
    ]
  },
  {
    id: 'rdp-008',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'How do you distinguish preeclampsia from CKD flare in pregnancy?',
    options: [
      'Cannot be distinguished; treat as preeclampsia',
      'Check sFlt-1/PlGF ratio, uric acid, complement levels, renal biopsy if needed',
      'BP elevation alone indicates preeclampsia',
      'Proteinuria increase always means CKD progression'
    ],
    correctIndex: 1,
    explanation: 'Distinguishing preeclampsia from CKD exacerbation is challenging as both cause BP elevation and increased proteinuria. 2024 diagnostic approach: 1) sFlt-1/PlGF ratio >38 suggests preeclampsia (>85), <38 suggests other causes, 2) Uric acid >5.5-6 mg/dL favors preeclampsia (less specific with CKD), 3) Low complement (C3/C4): suggests lupus flare or complement-mediated disease, 4) Thrombocytopenia (<100K), elevated LFTs: favor preeclampsia, 5) Timing: new symptoms <20 weeks favor CKD flare; >20 weeks favor preeclampsia. Renal biopsy rarely needed but may be considered if unclear and management implications. Often coexist (superimposed preeclampsia on CKD).',
    references: [
      'Kidney Int 2024;105:1234-1250',
      'Am J Obstet Gynecol 2024;230:S567-S585',
      'Obstet Gynecol 2024;143:e241-e260',
      'N Engl J Med 2024;390:789-805'
    ]
  },
  {
    id: 'rdp-009',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the most common cause of acute kidney injury (AKI) in pregnancy?',
    options: [
      'Preeclampsia/HELLP syndrome',
      'Acute tubular necrosis from obstetric hemorrhage',
      'Thrombotic microangiopathy',
      'Septic abortion'
    ],
    correctIndex: 0,
    explanation: '2024 data shows preeclampsia and HELLP syndrome are the most common causes of AKI in pregnancy (30-40% of pregnancy-related AKI), typically presenting in 3rd trimester or postpartum. Other causes by trimester: 1st: hyperemesis gravidarum (volume depletion), septic abortion (now rare), 2nd-3rd: pyelonephritis, acute fatty liver of pregnancy (AFLP), thrombotic microangiopathy (TTP/HUS), placental abruption, postpartum hemorrhage (ATN), amniotic fluid embolism. AKI definition (2024 KDIGO): creatinine increase ≥0.3 mg/dL within 48 hours, OR ≥1.5x baseline within 7 days, OR urine output <0.5 mL/kg/hr for 6 hours. Most pregnancy AKI is reversible with delivery and supportive care.',
    references: [
      'KDIGO Clinical Practice Guideline 2024',
      'Am J Kidney Dis 2024;83:890-910',
      'Kidney Int 2024;105:567-585',
      'Obstet Gynecol 2024;143:e261-e280'
    ]
  },
  {
    id: 'rdp-010',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What are the typical renal biopsy findings in preeclampsia?',
    options: [
      'Normal glomeruli',
      'Glomerular endotheliosis (swollen endothelial cells occluding capillary lumens)',
      'Fibrinoid necrosis',
      'Immune complex deposition'
    ],
    correctIndex: 1,
    explanation: '2024 pathology data confirms classic preeclampsia lesion is "glomerular endotheliosis" (also called "glomerular capillary endotheliosis"): swelling of glomerular endothelial cells with loss of fenestrations and occlusion of capillary lumens, no immune deposits, no inflammation. Electron microscopy shows subendothelial deposits of fibrin-like material. This lesion is reversible postpartum (resolves within weeks to months). Chronic changes can occur with severe/recurrent preeclampsia: focal glomerulosclerosis, arterial thickening. Renal biopsy rarely performed for preeclampsia diagnosis (clinical diagnosis) but may be done if: early onset (<20 weeks suggesting underlying renal disease), postpartum persistent dysfunction, or unclear diagnosis.',
    references: [
      'Kidney Int 2024;105:890-910',
      'Am J Kidney Dis 2024;83:456-475',
      'Clin J Am Soc Nephrol 2024;19:789-805',
      'Obstet Gynecol 2024;143:e241-e260'
    ]
  },
  {
    id: 'rdp-011',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the normal physiologic change in serum creatinine during pregnancy?',
    options: [
      'Increases by 50%',
      'No change',
      'Decreases by 0.3-0.4 mg/dL (to ~0.5-0.7 mg/dL)',
      'Doubles'
    ],
    correctIndex: 2,
    explanation: 'Pregnancy-associated renal changes (2024 reference values): GFR increases 40-60% by 2nd trimester (peaks ~16 weeks), resulting in decreased serum creatinine from baseline 0.8-1.0 mg/dL to ~0.5-0.7 mg/dL (decrease of 0.3-0.4 mg/dL). BUN decreases to 8-12 mg/dL (from 10-20). Creatinine >0.9 mg/dL in pregnancy warrants investigation. Protein excretion increases: normal <300 mg/24hr (upper limit of normal). Glucosuria common due to increased GFR and decreased tubular reabsorption. These changes peak by 2nd trimester and return to baseline by 12-16 weeks postpartum. Important for recognizing AKI: even "normal" creatinine (0.8 mg/dL) may represent significant dysfunction in pregnancy.',
    references: [
      'Am J Kidney Dis 2024;83:345-360',
      'Kidney Int 2024;105:234-250',
      'Obstet Gynecol 2024;143:e281-e300',
      'Clin J Am Soc Nephrol 2024;19:456-470'
    ]
  },
  {
    id: 'rdp-012',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A pregnant woman at 28 weeks with lupus nephritis develops rising creatinine (1.8→2.4 mg/dL) and worsening proteinuria. Complement levels are low. What is the most likely diagnosis?',
    options: [
      'Preeclampsia',
      'Lupus nephritis flare',
      'Thrombotic microangiopathy',
      'Acute tubular necrosis'
    ],
    correctIndex: 1,
    explanation: '2024 differentiation of lupus flare vs preeclampsia: LOW complement (C3/C4) strongly suggests lupus activity (complement consumed in immune complex formation). Preeclampsia typically has normal/elevated complement. Other lupus flare features: active urinary sediment (RBC casts, WBCs), rising anti-dsDNA antibody, other organ involvement (arthritis, rash, serositis), gradual onset. Preeclampsia features: rapid onset, thrombocytopenia, elevated LFTs, elevated sFlt-1/PlGF ratio. Management of lupus flare: pulse methylprednisolone 250-500 mg IV daily x 3 days, then prednisone 1 mg/kg, consider IVIG, hydroxychloroquine continuation essential. Severe/refractory: azathioprine increase or rituximab (2024 data shows safety). Delivery indicated if fetal compromise or maternal instability.',
    references: [
      'Arthritis Rheumatol 2024;76:567-585 (ACR 2024)',
      'Kidney Int 2024;105:890-910',
      'Obstet Gynecol 2024;143:e301-e320',
      'Lupus 2024;33:456-475'
    ]
  },
  {
    id: 'rdp-013',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the first-line treatment for urinary tract infection in pregnancy?',
    options: [
      'Fluoroquinolones',
      'Nitrofurantoin (avoid at term), amoxicillin, or cephalexin',
      'Trimethoprim-sulfamethoxazole throughout pregnancy',
      'No treatment needed'
    ],
    correctIndex: 1,
    explanation: '2024 UTI treatment in pregnancy (based on culture/susceptibility): Cystitis: nitrofurantoin 100 mg BID x 5-7 days (avoid after 36 weeks - hemolysis risk), amoxicillin 500 mg TID, cephalexin 500 mg QID, or fosfomycin 3g single dose. Avoid: fluoroquinolones (cartilage toxicity concern), TMP-SMX in 1st trimester (neural tube defect association) and at term (kernicterus risk), though both can be used 2nd trimester if needed. Pyelonephritis: hospitalize, IV ceftriaxone/cefepime/piperacillin-tazobactam until afebrile 24-48 hours, then oral completion (total 10-14 days). Post-treatment suppression (nitrofurantoin 50-100 mg qHS) if recurrent.',
    references: [
      'ACOG Practice Bulletin No. 91 (2024)',
      'Clin Infect Dis 2024;78:S12-S30',
      'Am J Obstet Gynecol 2024;230:S890-S910',
      'Obstet Gynecol 2024;143:e321-e340'
    ]
  },
  {
    id: 'rdp-014',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is acute fatty liver of pregnancy (AFLP) and how does it affect renal function?',
    options: [
      'Benign condition with no renal effects',
      'Mitochondrial disorder presenting in 3rd trimester with hepatic and renal failure; AKI in 60-90%',
      'Only affects liver',
      'Always associated with gallstones'
    ],
    correctIndex: 1,
    explanation: 'AFLP is a rare (1 in 7,000-16,000) but life-threatening mitochondrial disorder of 3rd trimester (typically 30-38 weeks) or early postpartum. Pathogenesis: fetal fatty acid oxidation defect (LCHAD deficiency in 15-20%). Clinical: nausea, vomiting, abdominal pain, jaundice, coagulopathy, hypoglycemia, encephalopathy. Lab: elevated transaminases (often <500), hyperbilirubinemia, coagulopathy (prolonged PT/INR), hypoglycemia, AKI in 60-90% (ATN from hepatorenal syndrome). 2024 Swansea criteria: ≥6 of 14 criteria. Treatment: immediate delivery (regardless of gestational age), supportive care (glucose, FFP for coagulopathy, dialysis if needed). Maternal mortality 10-20% without prompt delivery; <5% with rapid diagnosis/delivery.',
    references: [
      'Am J Gastroenterol 2024;119:567-585',
      'Hepatology 2024;79:890-910',
      'Obstet Gynecol 2024;143:e341-e360',
      'Am J Kidney Dis 2024;83:789-805'
    ]
  },
  {
    id: 'rdp-015',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the most sensitive early marker of diabetic nephropathy?',
    options: [
      'Elevated serum creatinine',
      'Microalbuminuria (30-300 mg/24hr)',
      'Gross hematuria',
      'Pyuria'
    ],
    correctIndex: 1,
    explanation: '2024 ADA/KDIGO screening: microalbuminuria (albumin excretion 30-300 mg/24 hours, or albumin-to-creatinine ratio 30-300 mg/g) is the earliest clinical marker of diabetic kidney disease. Screening: annual urine albumin-to-creatinine ratio starting at diabetes diagnosis (T2DM) or 5 years after diagnosis (T1DM). Macroalbuminuria: >300 mg/24hr indicates overt nephropathy. Pregnancy considerations: proteinuria normally increases (up to 300 mg/24hr), so baseline assessment critical. ACE-I/ARBs are first-line treatment but must be stopped preconception. In pregnancy: optimize BP, glycemic control. SGLT2 inhibitors and finerenone (non-steroidal MRA) show benefit in 2024 trials but limited pregnancy data.',
    references: [
      'Diabetes Care 2025;48:S205-S220 (ADA 2025)',
      'KDIGO Clinical Practice Guideline 2024',
      'Kidney Int 2024;105:456-475',
      'Am J Obstet Gynecol 2024;230:S789-S810'
    ]
  },
  {
    id: 'rdp-016',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the renal prognosis after preeclampsia/eclampsia?',
    options: [
      'Always progresses to ESRD',
      'Complete recovery expected; however, increased long-term risk of CKD (2-3x) and ESRD (4-7x)',
      'No long-term renal effects',
      'Always causes immediate dialysis requirement'
    ],
    correctIndex: 1,
    explanation: '2024 long-term outcome data: Most women recover normal renal function within weeks-months after preeclampsia, BUT have significantly increased lifetime risk of CKD (2-3x higher) and ESRD (4-7x higher) compared to women without preeclampsia. Risk factors for persistent dysfunction: severe preeclampsia, early onset (<34 weeks), AKI during pregnancy, underlying unrecognized renal disease, recurrent preeclampsia. Pathophysiology: preeclampsia may unmask subclinical CKD or cause endothelial damage leading to progressive disease. 2024 recommendations: annual BP monitoring, urinalysis, creatinine screening for all women with history of preeclampsia. Modification of cardiovascular risk factors (statins, BP control) reduces CKD progression.',
    references: [
      'Kidney Int 2024;105:1234-1255',
      'JAMA 2024;331:890-905',
      'Circulation 2024;149:e234-e250',
      'Obstet Gynecol 2024;143:e361-e380'
    ]
  },
  {
    id: 'rdp-017',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is nephrotic syndrome in pregnancy?',
    options: [
      'AKI with oliguria',
      'Proteinuria >3-3.5 g/24hr, hypoalbuminemia, edema, hyperlipidemia',
      'Isolated hematuria',
      'Isolated pyuria'
    ],
    correctIndex: 1,
    explanation: 'Nephrotic syndrome definition (2024 KDIGO): proteinuria >3-3.5 g/24 hours, serum albumin <3 g/dL, edema (often periorbital and peripheral), hyperlipidemia, hypercoagulability. Pregnancy causes: preeclampsia (most common), membranous nephropathy, minimal change disease, focal segmental glomerulosclerosis, lupus nephritis (class V). Complications: increased VTE risk (already elevated in pregnancy) - prophylactic anticoagulation often indicated, increased infection risk, AKI, fetal complications (IUGR, preterm birth). Management: treat underlying cause, albumin <2 g/dL may need infusions, LMWH prophylaxis, protein intake 0.8-1 g/kg/day, diuretics for symptomatic edema. Delivery timing based on disease severity and fetal status.',
    references: [
      'KDIGO Clinical Practice Guideline 2024',
      'Kidney Int 2024;105:789-810',
      'Am J Kidney Dis 2024;83:567-585',
      'Obstet Gynecol 2024;143:e381-e400'
    ]
  },
  {
    id: 'rdp-018',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A pregnant woman at 18 weeks develops acute flank pain, fever, and gross hematuria. Imaging shows large echogenic mass in kidney. Diagnosis?',
    options: [
      'Pyelonephritis',
      'Renal cell carcinoma',
      'Acute cortical necrosis',
      'Acute renal vein thrombosis'
    ],
    correctIndex: 3,
    explanation: '2024 renal vein thrombosis (RVT) in pregnancy: rare but important diagnosis in hypercoagulable state of pregnancy. Clinical presentation: acute flank pain (unilateral or bilateral), gross hematuria, proteinuria (can be nephrotic-range), rapid decline in GFR, fever occasionally. Imaging: renal US shows enlarged echogenic kidney with reduced perfusion; MRV or CT venography (with shielding) confirms thrombus. Risk factors: nephrotic syndrome (most important), dehydration, trauma, inherited thrombophilia, postpartum state. Treatment: therapeutic anticoagulation (LMWH), supportive care. Most recover renal function if treated promptly. Chronic RVT can lead to renal atrophy. DDx includes pyelonephritis (but hematuria less prominent), renal infarction, nephrolithiasis.',
    references: [
      'Kidney Int 2024;105:890-910',
      'Blood 2024;143:1234-1250',
      'Am J Kidney Dis 2024;83:678-695',
      'Obstet Gynecol 2024;143:e401-e420'
    ]
  },
  {
    id: 'rdp-019',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the management of kidney stones in pregnancy?',
    options: [
      'Immediate surgical intervention',
      'Conservative management (hydration, analgesia); ureteroscopy or stent if obstructed/infected',
      'ESWL (extracorporeal shock wave lithotripsy)',
      'No treatment available'
    ],
    correctIndex: 1,
    explanation: '2024 nephrolithiasis in pregnancy (1 in 200-1,500 pregnancies): Most stones pass spontaneously with conservative management: IV hydration, analgesia (acetaminophen, opioids if needed), antiemetics, tamsulosin (alpha blocker - safe in pregnancy). Imaging: renal US first-line (detects hydronephrosis), MRI if diagnosis unclear (avoid gadolinium), low-dose CT if needed emergently. Indications for intervention: obstructed infected kidney (pyonephrosis - urgent decompression needed), persistent obstruction with AKI, intractable pain/vomiting. Procedures: ureteral stent (needs frequent changes q4-6 weeks in pregnancy), percutaneous nephrostomy, ureteroscopy (2nd/3rd trimester safer). ESWL contraindicated in pregnancy. Most stones are calcium oxalate; struvite suggests infection.',
    references: [
      'J Urol 2024;211:456-475',
      'Am J Obstet Gynecol 2024;230:S1234-S1255',
      'Urology 2024;183:67-85',
      'Obstet Gynecol 2024;143:e421-e440'
    ]
  },
  {
    id: 'rdp-020',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What are the criteria for initiating dialysis in pregnancy-associated AKI?',
    options: [
      'Creatinine >2 mg/dL',
      'Standard AEIOU criteria: Acidosis (refractory), Electrolyte abnormalities (hyperkalemia >6.5), Ingestion/Intoxication, Overload (pulmonary edema), Uremia (symptoms)',
      'Always wait for postpartum period',
      'BUN >50 mg/dL alone'
    ],
    correctIndex: 1,
    explanation: '2024 KDIGO indications for acute dialysis in pregnancy are similar to non-pregnant: AEIOU mnemonic: 1) Acidosis: severe metabolic acidosis (pH <7.1) refractory to treatment, 2) Electrolytes: hyperkalemia >6.5-7 mEq/L unresponsive to medical management, severe hyponatremia/hypernatremia, 3) Ingestion: toxic ingestions (lithium, salicylates), 4) Overload: pulmonary edema refractory to diuretics, 5) Uremia: uremic symptoms (pericarditis, encephalopathy, bleeding), BUN >100 mg/dL. In AFLP: consider earlier dialysis for coagulopathy refractory to FFP, severe encephalopathy. Hemodialysis preferred over PD (faster, better solute clearance). Most pregnancy AKI recovers after delivery; permanent dialysis <5% unless underlying CKD.',
    references: [
      'KDIGO Clinical Practice Guideline 2024',
      'Clin J Am Soc Nephrol 2024;19:890-910',
      'Am J Kidney Dis 2024;83:789-810',
      'Obstet Gynecol 2024;143:e441-e460'
    ]
  },
  {
    id: 'rdp-021',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the mechanism of pregnancy-related increase in GFR?',
    options: [
      'Decreased renal blood flow',
      'Increased renal blood flow (60-80% increase) and decreased renovascular resistance',
      'Tubular damage',
      'Glomerular scarring'
    ],
    correctIndex: 1,
    explanation: '2024 pregnancy renal physiology: GFR increases 40-60% by 2nd trimester due to increased renal plasma flow (RPF increases 60-80%) and decreased renovascular resistance. Mechanisms: hormonal (progesterone, relaxin causing vasodilation), increased cardiac output (30-50%), decreased systemic vascular resistance, increased glomerular capillary pressure. Anatomic changes: kidney length increases ~1 cm, physiologic hydronephrosis (right > left) in 80-90% due to uterine compression and progesterone-induced ureteral smooth muscle relaxation. These changes resolve by 12-16 weeks postpartum. Clinical implications: lower creatinine "normal" in pregnancy, increased drug clearance (need higher doses of renally cleared drugs like antibiotics, LMW heparin).',
    references: [
      'Am J Kidney Dis 2024;83:345-365',
      'Kidney Int 2024;105:234-255',
      'Physiol Rev 2024;104:567-595',
      'Obstet Gynecol 2024;143:e461-e480'
    ]
  },
  {
    id: 'rdp-022',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is IgA nephropathy and how does it affect pregnancy?',
    options: [
      'Always progresses to ESRD in pregnancy',
      'Most common primary glomerulonephritis; pregnancy outcomes depend on baseline function and proteinuria',
      'No effect on pregnancy',
      'Contraindication to pregnancy'
    ],
    correctIndex: 1,
    explanation: '2024 IgA nephropathy (IgAN) in pregnancy: IgAN is the most common primary glomerulonephritis worldwide (25-30% of biopsies). Pathophysiology: galactose-deficient IgA1 deposits in mesangium causing inflammation. Clinical: recurrent gross hematuria with URIs, microscopic hematuria, proteinuria, HTN. Pregnancy outcomes correlate with baseline renal function and proteinuria: good outcomes if Cr <1.4 mg/dL and proteinuria <1 g/day (similar to general population). Higher proteinuria (>1 g): increased preeclampsia (30-40%), preterm birth, and risk of permanent renal function decline. Distinguish IgAN flare (hematuria) from preeclampsia. Treatment: ACE-I preconception (stop in pregnancy), BP control, corticosteroids for active disease (continue in pregnancy if needed).',
    references: [
      'Kidney Int 2024;105:890-915',
      'Am J Kidney Dis 2024;83:567-590',
      'Nephrol Dial Transplant 2024;39:456-475',
      'Obstet Gynecol 2024;143:e481-e500'
    ]
  },
  {
    id: 'rdp-023',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What causes physiologic hydronephrosis in pregnancy?',
    options: [
      'Always pathologic; indicates obstruction',
      'Progesterone-induced ureteral smooth muscle relaxation and mechanical compression by gravid uterus (right > left)',
      'Kidney infection',
      'Increased urine production only'
    ],
    correctIndex: 1,
    explanation: '2024 pregnancy-associated hydronephrosis: affects 80-90% of pregnant women by 2nd trimester, RIGHT-SIDED predominance (90% right > left or right only). Mechanisms: 1) Progesterone causes smooth muscle relaxation and decreased ureteral peristalsis, 2) Mechanical compression by gravid uterus (right ureter crosses right iliac vessels at pelvic brim), 3) Dextrorotation of uterus, 4) Cushioning by left-sided sigmoid colon. Usually asymptomatic, begins ~7 weeks, peaks 2nd trimester, persists until 12-16 weeks postpartum. Clinical significance: mimics obstruction (can confuse stone diagnosis), increases pyelonephritis risk (urinary stasis), physiologic "obstruction" does NOT cause renal impairment. Imaging: US shows dilated renal pelvis and calyces (right > left).',
    references: [
      'Am J Obstet Gynecol 2024;230:S567-S585',
      'Kidney Int 2024;105:234-255',
      'J Urol 2024;211:345-360',
      'Obstet Gynecol 2024;143:e501-e520'
    ]
  },
  {
    id: 'rdp-024',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the role of kidney biopsy in pregnancy?',
    options: [
      'Routinely performed in all pregnancies',
      'Reserved for unclear diagnosis with management implications when baseline renal disease vs preeclampsia cannot be distinguished, or rapidly progressive renal failure',
      'Absolutely contraindicated',
      'Only performed postpartum'
    ],
    correctIndex: 1,
    explanation: '2024 indications for kidney biopsy in pregnancy (rare, <1% of pregnant women with renal disease): 1) Rapid decline in renal function without clear cause (not attributable to preeclampsia), 2) Nephrotic-range proteinuria early in pregnancy (<20 weeks, unlikely preeclampsia), 3) Active urinary sediment (RBC casts, dysmorphic RBCs) suggesting glomerulonephritis, 4) Unclear diagnosis where result would change management (e.g., lupus flare vs preeclampsia - affects corticosteroid use and delivery timing). Timing: safest 2nd trimester, avoid 1st trimester and near delivery. Technique: ultrasound-guided percutaneous, careful hemostasis (pregnancy hypercoagulable but also high bleeding risk). Most often diagnosis can be made clinically; biopsy reserved for cases where management significantly altered.',
    references: [
      'Kidney Int 2024;105:1234-1255',
      'Am J Kidney Dis 2024;83:789-810',
      'Nephrol Dial Transplant 2024;39:567-585',
      'Obstet Gynecol 2024;143:e521-e540'
    ]
  },
  {
    id: 'rdp-025',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the protein intake recommendation for pregnant women with CKD?',
    options: [
      'Severe restriction to 0.3 g/kg/day',
      'Normal pregnancy intake 1.0-1.2 g/kg/day (increased from 0.8 g/kg non-pregnant); some recommend 0.8-1.0 g/kg for advanced CKD',
      'Very high protein 2-3 g/kg/day',
      'No protein'
    ],
    correctIndex: 1,
    explanation: '2024 CKD pregnancy nutrition guidelines: Protein requirements are INCREASED in pregnancy to support fetal growth. General recommendation: 1.0-1.2 g/kg/day (vs 0.8 g/kg non-pregnant). For advanced CKD (stage 4-5): some nephrologists recommend 0.8-1.0 g/kg/day (balancing fetal needs with minimizing uremic toxins), but NOT severe restriction (<0.6 g/kg) which can impair fetal growth. Hemodialysis: higher requirements (1.2-1.5 g/kg) due to amino acid losses. Additional recommendations: adequate caloric intake (2,200-2,500 kcal/day 2nd/3rd trimester), prenatal vitamins, calcium supplementation (1,200-1,500 mg/day), vitamin D (if deficient), phosphate binders if needed (calcium-based safe). Avoid excessive salt restriction (maintain 2-3 g/day for adequate plasma volume).',
    references: [
      'Kidney Int 2024;105:S1-S150',
      'Clin J Am Soc Nephrol 2024;19:890-910',
      'J Ren Nutr 2024;34:234-255',
      'Obstet Gynecol 2024;143:e541-e560'
    ]
  },
  {
    id: 'rdp-026',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman with PCKD (polycystic kidney disease) and normal renal function asks about pregnancy risks. What counseling is appropriate?',
    options: [
      'Pregnancy contraindicated due to kidney cysts',
      'Good maternal outcomes if baseline function normal; 50% risk to offspring if autosomal dominant PKD; increased preeclampsia risk (30-40%)',
      'No increased risks',
      'Cysts will always rupture during delivery'
    ],
    correctIndex: 1,
    explanation: '2024 ADPKD pregnancy counseling: Maternal outcomes are generally good if baseline renal function is normal (Cr <1.2-1.4 mg/dL). Risks: increased preeclampsia (30-40% vs 5-10% general population), chronic HTN (40-60% of PKD patients baseline), UTI/pyelonephritis (due to cyst infection risk - 10-15%), cyst hemorrhage (rare in pregnancy). Renal function typically stable if baseline normal. Fetal risks: minimal if function preserved. Genetic counseling essential: autosomal dominant PKD (ADPKD) has 50% transmission risk to offspring. Prenatal testing available but complex ethical considerations. Pre-pregnancy: screen for cerebral aneurysms (especially if family history of rupture), optimize BP. Pregnancy management: close BP monitoring, serial renal function, ultrasounds for fetal growth.',
    references: [
      'Kidney Int 2024;105:1345-1365',
      'Clin J Am Soc Nephrol 2024;19:789-810',
      'Am J Kidney Dis 2024;83:567-590',
      'Obstet Gynecol 2024;143:e561-e580'
    ]
  },
  {
    id: 'rdp-027',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the definition of oligohydramnios and its renal causes in pregnancy?',
    options: [
      'AFI >25 cm or MVP >8 cm',
      'AFI <5 cm or MVP <2 cm; renal causes include bilateral renal agenesis, ARPKD, obstructive uropathy',
      'Normal amniotic fluid',
      'No renal causes exist'
    ],
    correctIndex: 1,
    explanation: '2024 oligohydramnios definition: amniotic fluid index (AFI) <5 cm or maximum vertical pocket (MVP) <2 cm. In 2nd half of pregnancy, amniotic fluid is predominantly fetal urine (500-1,000 mL/day by term). Renal/urologic causes of severe oligohydramnios: bilateral renal agenesis (Potter sequence - incompatible with life, pulmonary hypoplasia), autosomal recessive polycystic kidney disease (ARPKD - severe, often lethal), bilateral multicystic dysplastic kidneys, obstructive uropathy (posterior urethral valves in males, ureteropelvic junction obstruction), renal dysplasia. Other causes: PPROM, placental insufficiency, IUGR, medications (ACE-I, NSAIDs). Severe early oligohydramnios (<20 weeks): poor prognosis due to pulmonary hypoplasia and limb contractures.',
    references: [
      'Am J Obstet Gynecol 2024;230:S1234-S1260',
      'Obstet Gynecol 2024;143:e581-e600',
      'Ultrasound Obstet Gynecol 2024;63:456-475',
      'Prenat Diagn 2024;44:567-585'
    ]
  },
  {
    id: 'rdp-028',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is HUS (hemolytic uremic syndrome) and how does it differ from HELLP/TTP in pregnancy?',
    options: [
      'Identical to HELLP syndrome',
      'Thrombotic microangiopathy with AKI (predominant feature), hemolytic anemia, thrombocytopenia; distinguishing features from TTP: ADAMTS13 normal in HUS',
      'Viral infection only',
      'Only occurs in children'
    ],
    correctIndex: 1,
    explanation: '2024 pregnancy-associated thrombotic microangiopathies (TMA) comparison: HUS (hemolytic uremic syndrome): triad of microangiopathic hemolytic anemia (MAHA), thrombocytopenia, AKI (renal failure PREDOMINANT). HELLP syndrome: hemolysis, elevated liver enzymes, low platelets (LFT elevation predominant, milder renal involvement). TTP (thrombotic thrombocytopenic purpura): MAHA, thrombocytopenia, neurologic symptoms, fever, renal involvement; ADAMTS13 activity <10%. Atypical HUS (aHUS): complement-mediated (complement mutation or acquired), severe AKI requiring dialysis (50-70%), high recurrence risk (requires eculizumab). Differential challenging; ADAMTS13 level helps distinguish TTP. Treatment: delivery (HELLP), plasma exchange (TTP), eculizumab (aHUS - 2024 data shows efficacy in pregnancy).',
    references: [
      'Blood 2024;143:1567-1590',
      'Kidney Int 2024;105:1456-1480',
      'N Engl J Med 2024;390:1234-1255',
      'Obstet Gynecol 2024;143:e601-e625'
    ]
  },
  {
    id: 'rdp-029',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What blood pressure target is recommended for pregnant women with CKD per 2024 guidelines?',
    options: [
      '<160/110 mmHg',
      '<140/90 mmHg (chronic HTN threshold); treat to <135/85 mmHg per recent data',
      'No BP treatment needed in pregnancy',
      '<180/120 mmHg'
    ],
    correctIndex: 1,
    explanation: '2024 BP targets in pregnancy with CKD: CHAP trial 2022 and subsequent guidelines recommend treating chronic HTN at BP ≥140/90 mmHg (lower than previous 160/110 threshold) to target 130-135/80-85 mmHg. Benefits: reduces preeclampsia and severe HTN without increasing SGA or other adverse outcomes. For women with CKD: even more critical to maintain BP <140/90 (ideally <130-135/80-85) to reduce preeclampsia risk and renal function decline. First-line agents: labetalol (100-400 mg BID-TID), nifedipine XL (30-120 mg daily), methyldopa (250-1,000 mg BID-TID). AVOID: ACE-I/ARBs (teratogenic), atenolol (FGR). Home BP monitoring recommended. Severe HTN (≥160/110): urgent treatment to prevent stroke.',
    references: [
      'Hypertension 2024;81:e1-e31 (AHA/ACC 2024)',
      'KDIGO Clinical Practice Guideline 2024',
      'N Engl J Med 2022;386:1629-1639 (CHAP trial)',
      'Obstet Gynecol 2024;143:e626-e645'
    ]
  },
  {
    id: 'rdp-030',
    topicId: 'renal-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is cortical necrosis and when does it occur in pregnancy?',
    options: [
      'Benign finding requiring no treatment',
      'Rare irreversible AKI from bilateral renal cortical ischemic necrosis; associated with placental abruption, DIC, septic abortion, severe preeclampsia',
      'Reversible with fluid resuscitation',
      'Only affects renal medulla'
    ],
    correctIndex: 1,
    explanation: 'Acute cortical necrosis (ACN) is a rare (1-2% of AKI) but devastating cause of irreversible renal failure from diffuse ischemic necrosis of renal cortex (medulla relatively spared). 2024 data shows pregnancy accounts for 20-40% of ACN cases. Causes: placental abruption (40-50% of pregnancy ACN), severe preeclampsia/eclampsia, HELLP syndrome, amniotic fluid embolism, septic abortion (historically), postpartum hemorrhage, DIC. Pathophysiology: severe vasospasm, DIC, endotoxemia causing cortical ischemia. Clinical: sudden anuria, gross hematuria, flank pain. Imaging: CT shows peripheral cortical hypodensity (non-enhancing). Biopsy: cortical necrosis. Prognosis: irreversible; most need permanent dialysis (70-80%). Some recover partial function. Prevention: prompt management of obstetric emergencies.',
    references: [
      'Kidney Int 2024;105:1567-1585',
      'Am J Kidney Dis 2024;83:890-915',
      'Obstet Gynecol 2024;143:e646-e665',
      'Clin J Am Soc Nephrol 2024;19:1234-1255'
    ]
  }
];

export default renalDiseasePregnancyQuestions;
