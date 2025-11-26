import { Question } from '../types';

/**
 * Hypertensive Disorders in Pregnancy
 * 30 high-yield questions on chronic hypertension and complications
 * Topics: Chronic HTN, superimposed preeclampsia, antihypertensives,
 * postpartum management, target blood pressures
 * Updated: November 2024 - Based on CHAP trial 2022, AHA/ACC 2024 guidelines,
 * ACOG 2024 updates, ISSHP 2024 guidelines, and current UpToDate recommendations
 */

export const hypertensiveDisordersQuestions: Question[] = [
  {
    id: 'htd-001',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What defines chronic hypertension in pregnancy?',
    options: [
      'BP ≥140/90 mmHg documented before pregnancy or before 20 weeks gestation',
      'BP ≥160/110 mmHg at any time during pregnancy',
      'BP ≥140/90 mmHg after 20 weeks gestation',
      'BP ≥130/80 mmHg before pregnancy'
    ],
    correctIndex: 0,
    explanation: 'Chronic hypertension is defined as BP ≥140/90 mmHg documented before pregnancy or before 20 weeks gestation. It can also be diagnosed if hypertension persists >12 weeks postpartum. This distinguishes it from gestational hypertension (onset ≥20 weeks) and preeclampsia (≥20 weeks with proteinuria or other features).',
    references: [
      'ACOG Practice Bulletin No. 203: Chronic Hypertension in Pregnancy',
      'Obstet Gynecol 2019;133:e26-e50',
      'Hypertension 2022;79:e21-e41'
    ]
  },
  {
    id: 'htd-002',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the target blood pressure for pregnant women with chronic hypertension on medication?',
    options: [
      '<120/80 mmHg',
      '<130/80 mmHg',
      '<140/90 mmHg',
      '<150/100 mmHg'
    ],
    correctIndex: 1,
    explanation: 'The target BP for pregnant women with chronic hypertension is <140/90 mmHg, with treatment initiation at BP ≥140/90 mmHg (CHAP trial 2022 changed practice from previous 150-160/100-110 threshold). The landmark CHAP trial definitively showed that treating chronic HTN at BP ≥140/90 reduces serious maternal outcomes (preeclampsia with severe features, preterm birth <35 weeks) WITHOUT increasing fetal growth restriction. 2024 ACOG/AHA guidelines recommend target 130-135/80-85 mmHg as optimal, avoiding BP <120/80 to prevent placental hypoperfusion.',
    references: [
      'N Engl J Med 2022;386:1678-1688 (CHAP trial)',
      'ACOG Practice Bulletin No. 203 (2024 reaffirmed)',
      'Hypertension 2024;81:e1-e31 (AHA/ACC 2024)',
      'Pregnancy Hypertens 2024;35:101114 (ISSHP 2024)'
    ]
  },
  {
    id: 'htd-003',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is superimposed preeclampsia?',
    options: [
      'Preeclampsia occurring before 20 weeks gestation',
      'Preeclampsia in a woman with pre-existing chronic hypertension',
      'Preeclampsia that develops postpartum',
      'Severe range blood pressures without proteinuria'
    ],
    correctIndex: 1,
    explanation: 'Superimposed preeclampsia is preeclampsia that develops in a woman with pre-existing chronic hypertension. Diagnosis requires new-onset proteinuria (≥300mg/24hr or P/C ratio ≥0.3) after 20 weeks, OR sudden increase in BP that was previously well-controlled, OR development of severe features (thrombocytopenia, liver dysfunction, renal insufficiency, pulmonary edema, cerebral/visual symptoms). Occurs in 15-25% of women with chronic HTN.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2022;79:e21-e41',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  },
  {
    id: 'htd-004',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which antihypertensive medication is first-line for chronic hypertension in pregnancy?',
    options: [
      'Lisinopril',
      'Hydrochlorothiazide',
      'Labetalol or nifedipine',
      'Atenolol'
    ],
    correctIndex: 2,
    explanation: 'Labetalol and nifedipine (extended-release) are first-line antihypertensives in pregnancy due to safety data and efficacy. Methyldopa is also safe but less commonly used due to side effects. ACE inhibitors (lisinopril) and ARBs are teratogenic. Atenolol is associated with fetal growth restriction. Hydrochlorothiazide can be continued if already on it, but not typically started in pregnancy.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2022;79:e21-e41',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  },
  {
    id: 'htd-005',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman with chronic HTN on lisinopril presents for preconception counseling. What is your recommendation?',
    options: [
      'Continue lisinopril throughout pregnancy',
      'Stop lisinopril and do not start alternative until blood pressure elevates',
      'Switch to labetalol or nifedipine before conception',
      'Switch to ARB which is safer'
    ],
    correctIndex: 2,
    explanation: 'ACE inhibitors should be discontinued before conception or as soon as pregnancy is recognized, and replaced with pregnancy-safe antihypertensives (labetalol, nifedipine, methyldopa) BEFORE conception if possible. While first trimester ACE inhibitor exposure may have lower risk than previously thought, second/third trimester exposure causes renal dysgenesis, oligohydramnios, IUGR, and neonatal renal failure. ARBs have similar risks.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'N Engl J Med 2006;354:2443-2451',
      'Hypertension 2022;79:e21-e41'
    ]
  },
  {
    id: 'htd-006',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the risk of superimposed preeclampsia in women with chronic hypertension?',
    options: [
      '5-10%',
      '15-25%',
      '35-50%',
      '>50%'
    ],
    correctIndex: 1,
    explanation: 'Women with chronic hypertension have a 15-25% risk of developing superimposed preeclampsia (compared to 5-8% baseline preeclampsia risk). Risk is higher with: poorly controlled BP, long-standing HTN, renal disease, diabetes, obesity, thrombophilia, or prior superimposed preeclampsia. Low-dose aspirin (81-162mg daily) starting before 16 weeks reduces preeclampsia risk by 10-15%.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Obstet Gynecol 2019;133:e26-e50',
      'Am J Obstet Gynecol 2016;214:649.e1-11'
    ]
  },
  {
    id: 'htd-007',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What baseline studies should be obtained in early pregnancy for a woman with chronic hypertension?',
    options: [
      'Complete blood count only',
      'Urinalysis and basic metabolic panel',
      'CBC, creatinine, baseline proteinuria (24-hour urine or P/C ratio), AST/ALT, and consider ECG/echocardiogram',
      'No baseline studies needed'
    ],
    correctIndex: 2,
    explanation: 'Baseline evaluation should include: CBC (platelets), comprehensive metabolic panel (creatinine, LFTs), baseline 24-hour urine protein or protein/creatinine ratio (to detect superimposed preeclampsia later), and ECG. Echocardiogram should be considered if long-standing HTN or cardiac symptoms. This establishes baseline organ function and helps detect superimposed preeclampsia or other complications.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2022;79:e21-e41',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  },
  {
    id: 'htd-008',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'When should low-dose aspirin be initiated for preeclampsia prophylaxis in women with chronic hypertension?',
    options: [
      'At conception',
      'Before 16 weeks gestation (ideally by 12 weeks)',
      'At 20 weeks gestation',
      'Not recommended for chronic hypertension'
    ],
    correctIndex: 1,
    explanation: 'Low-dose aspirin (81-162mg daily) should be initiated before 16 weeks gestation, ideally by 12 weeks, in women with chronic hypertension to reduce preeclampsia risk. USPSTF recommends aspirin for women with ≥1 high-risk factor (including chronic HTN). Aspirin is most effective when started early, reduces preeclampsia by 10-15%, and is safe with minimal bleeding risk. Continue until delivery.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'USPSTF JAMA 2021;326:1186-1191',
      'N Engl J Med 2017;377:613-622'
    ]
  },
  {
    id: 'htd-009',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended delivery timing for well-controlled chronic hypertension without complications?',
    options: [
      '37-38 weeks',
      '38-39 weeks',
      '39-40 weeks (expectant management)',
      '40-41 weeks'
    ],
    correctIndex: 1,
    explanation: 'For uncomplicated, well-controlled chronic hypertension, delivery at 38-39 weeks is recommended. If superimposed preeclampsia without severe features develops, delivery at 37 weeks is advised. With severe features, delivery is indicated regardless of gestational age after maternal stabilization (give steroids if <34 weeks). The CHAP trial supports delivery at 38-39 weeks to reduce stillbirth risk.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'N Engl J Med 2022;386:1678-1688',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  },
  {
    id: 'htd-010',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which antihypertensive should be avoided in pregnancy due to fetal growth restriction risk?',
    options: [
      'Labetalol',
      'Nifedipine',
      'Atenolol',
      'Methyldopa'
    ],
    correctIndex: 2,
    explanation: 'Atenolol and other beta-1 selective blockers are associated with fetal growth restriction and should be avoided in pregnancy. Labetalol (mixed alpha/beta blocker) is preferred if beta-blockade is needed. The growth restriction with atenolol may be related to decreased placental perfusion from unopposed alpha-vasoconstriction or direct fetal effects.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2017;69:e3-e28',
      'BMJ 1997;315:1502-1506'
    ]
  },
  {
    id: 'htd-011',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the mechanism of action of hydralazine in acute hypertensive crises?',
    options: [
      'ACE inhibition',
      'Calcium channel blockade',
      'Direct arterial vasodilation',
      'Beta-receptor blockade'
    ],
    correctIndex: 2,
    explanation: 'Hydralazine causes direct arterial vasodilation through nitric oxide-mediated mechanisms. It is used for acute BP management in pregnancy (5-10mg IV boluses every 15-20 minutes). However, labetalol IV and immediate-release nifedipine PO are now preferred first-line agents due to more predictable dose-response and fewer adverse effects (headache, tachycardia with hydralazine).',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia',
      'Obstet Gynecol 2020;135:e237-e260',
      'Hypertension 2017;69:e3-e28'
    ]
  },
  {
    id: 'htd-012',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the most common adverse effect of methyldopa that limits its use?',
    options: [
      'Fetal bradycardia',
      'Maternal sedation and fatigue',
      'Postpartum depression',
      'Preterm labor'
    ],
    correctIndex: 1,
    explanation: 'Methyldopa causes significant maternal sedation, fatigue, and depression in many women, which limits its tolerability despite excellent safety data. It is a central alpha-2 agonist that was the most studied antihypertensive in pregnancy historically. Labetalol and nifedipine are now preferred due to better tolerability, though methyldopa remains a safe alternative.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Cochrane Database Syst Rev 2018;10:CD002252',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  },
  {
    id: 'htd-013',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman at 32 weeks with chronic HTN develops BP 155/105 mmHg, new proteinuria, and platelet count 95,000/μL. What is the diagnosis and management?',
    options: [
      'Gestational hypertension; continue current management',
      'Chronic hypertension exacerbation; increase antihypertensives only',
      'Superimposed preeclampsia with severe features; consider delivery at 34 weeks after steroids',
      'Superimposed preeclampsia without severe features; manage expectantly until 37 weeks'
    ],
    correctIndex: 2,
    explanation: 'This is superimposed preeclampsia with severe features (thrombocytopenia <100,000/μL). At 32 weeks, give betamethasone for fetal lung maturity and plan delivery at 34+0 weeks. If BP reaches severe range (≥160/110), initiate acute treatment. Expectant management until 37 weeks is only appropriate for superimposed preeclampsia WITHOUT severe features.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'ACOG Practice Bulletin No. 222',
      'Obstet Gynecol 2020;135:e237-e260'
    ]
  },
  {
    id: 'htd-014',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What percentage of women with chronic hypertension will require escalation of antihypertensive therapy during pregnancy?',
    options: [
      '10-20%',
      '30-40%',
      '50-60%',
      '70-80%'
    ],
    correctIndex: 2,
    explanation: 'Approximately 50-60% of women with chronic hypertension will require initiation or escalation of antihypertensive therapy during pregnancy, particularly in the third trimester. This is due to increased blood volume, cardiac output, and sometimes development of superimposed preeclampsia. Close BP monitoring (weekly or more in third trimester) is essential.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Obstet Gynecol 2019;133:e26-e50',
      'Am J Obstet Gynecol 2016;214:649.e1-11'
    ]
  },
  {
    id: 'htd-015',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the significance of the CHAP trial for management of chronic hypertension in pregnancy?',
    options: [
      'Showed that treatment increases fetal growth restriction',
      'Showed that tight BP control (<140/90) reduces preeclampsia and preterm birth without increasing FGR',
      'Showed that antihypertensives should be avoided until BP >160/110',
      'Showed no benefit to treating mild chronic hypertension'
    ],
    correctIndex: 1,
    explanation: 'The CHAP trial (2022) definitively showed that treating chronic hypertension at BP ≥140/90 mmHg (vs ≥160/110) reduced composite serious maternal outcomes (including superimposed preeclampsia with severe features, preterm birth <35 weeks) without increasing fetal growth restriction. This changed practice from previous permissive approach. Target is <140/90 mmHg.',
    references: [
      'N Engl J Med 2022;386:1678-1688',
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2022;79:e21-e41'
    ]
  },
  {
    id: 'htd-016',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'When should fetal surveillance begin in pregnancies with chronic hypertension?',
    options: [
      'At 28 weeks',
      'At 32 weeks',
      'At 36 weeks',
      'Only if complications develop'
    ],
    correctIndex: 1,
    explanation: 'Antenatal testing (NST or BPP) should begin at 32-34 weeks in pregnancies with chronic hypertension, performed weekly or twice-weekly. If superimposed preeclampsia develops or there is evidence of fetal growth restriction, testing may begin earlier and be performed more frequently. Serial growth ultrasounds (every 3-4 weeks) are also recommended starting at 28-32 weeks.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'ACOG Practice Bulletin No. 229: Antepartum Fetal Surveillance',
      'Obstet Gynecol 2021;137:e116-e127'
    ]
  },
  {
    id: 'htd-017',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended postpartum blood pressure management for women with chronic hypertension who were on medication during pregnancy?',
    options: [
      'Discontinue all antihypertensives immediately after delivery',
      'Continue pregnancy antihypertensives indefinitely',
      'Resume pre-pregnancy medications (if safe with breastfeeding); monitor BP closely',
      'No postpartum BP monitoring needed'
    ],
    correctIndex: 2,
    explanation: 'Postpartum BP management requires careful transition: resume pre-pregnancy antihypertensives if compatible with breastfeeding (may need to switch ACE-I/ARB back, which are compatible with breastfeeding unlike pregnancy). BP often decreases postpartum but may increase days 3-6. Monitor BP closely (days 3, 7-10, 6 weeks). Watch for postpartum preeclampsia/eclampsia which can occur up to 6 weeks postpartum.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2022;79:e21-e41',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  },
  {
    id: 'htd-018',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which of the following is compatible with breastfeeding?',
    options: [
      'Atenolol',
      'Lisinopril and enalapril',
      'Hydrochlorothiazide in high doses',
      'Spironolactone'
    ],
    correctIndex: 1,
    explanation: 'ACE inhibitors (lisinopril, enalapril, captopril) are compatible with breastfeeding and are preferred postpartum antihypertensives. Labetalol, nifedipine, and methyldopa are also safe. Atenolol should be avoided (concentrated in breast milk, neonatal bradycardia). Hydrochlorothiazide may suppress lactation. Spironolactone is generally avoided due to anti-androgenic effects.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2022;79:e21-e41',
      'Drugs in Pregnancy and Lactation 11th ed'
    ]
  },
  {
    id: 'htd-019',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the pathophysiology of chronic hypertension leading to adverse pregnancy outcomes?',
    options: [
      'Decreased cardiac output',
      'Impaired placental perfusion and abnormal placentation',
      'Increased blood volume',
      'Fetal hyperglycemia'
    ],
    correctIndex: 1,
    explanation: 'Chronic hypertension leads to impaired placental perfusion due to abnormal spiral artery remodeling and endothelial dysfunction. This results in placental insufficiency, increasing risk of fetal growth restriction, placental abruption, superimposed preeclampsia, and stillbirth. Severe or poorly controlled HTN exacerbates these placental abnormalities.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Am J Obstet Gynecol 2016;214:649.e1-11',
      'Placenta 2017;60:S66-S69'
    ]
  },
  {
    id: 'htd-020',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the role of home blood pressure monitoring in chronic hypertension during pregnancy?',
    options: [
      'Not reliable; only office measurements should be used',
      'Recommended to supplement office measurements and detect masked/white coat hypertension',
      'Only useful postpartum',
      'Contraindicated in pregnancy'
    ],
    correctIndex: 1,
    explanation: 'Home BP monitoring is recommended in pregnancy to supplement office measurements. It helps detect white coat hypertension (elevated office BP, normal home BP) and masked hypertension (normal office, elevated home). Patients should use validated devices, take measurements twice daily, and report to provider. Home BP tends to be 5-10 mmHg lower than office BP.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2022;79:e21-e41',
      'Pregnancy Hypertens 2019;15:1-6'
    ]
  },
  {
    id: 'htd-021',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman with chronic HTN at 24 weeks has BP 145/95 mmHg on labetalol 200mg BID. What is the next best step?',
    options: [
      'Increase labetalol to 300mg BID',
      'Add nifedipine XL',
      'Switch to methyldopa',
      'Discontinue medication (BP not severe range)'
    ],
    correctIndex: 0,
    explanation: 'With BP persistently above target (<140/90) on labetalol 200mg BID, the next step is to increase the labetalol dose (can go up to 800mg BID). If BP remains uncontrolled on maximum single-agent dose, add a second agent (nifedipine XL or methyldopa). The CHAP trial supports treating BP ≥140/90 to reduce adverse outcomes. Combination therapy is often needed in third trimester.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'N Engl J Med 2022;386:1678-1688',
      'Hypertension 2022;79:e21-e41'
    ]
  },
  {
    id: 'htd-022',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the risk of placental abruption in women with chronic hypertension?',
    options: [
      'No increased risk',
      '2-3 times increased risk',
      '5-6 times increased risk',
      '10 times increased risk'
    ],
    correctIndex: 1,
    explanation: 'Women with chronic hypertension have a 2-3 fold increased risk of placental abruption compared to normotensive women. Risk is highest with poorly controlled hypertension, superimposed preeclampsia, or history of prior abruption. This is due to abnormal placental vasculature and endothelial damage. Sudden elevation in BP or abdominal trauma further increases risk.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Obstet Gynecol 2019;133:e26-e50',
      'Am J Obstet Gynecol 2016;214:649.e1-11'
    ]
  },
  {
    id: 'htd-023',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What laboratory abnormality most reliably distinguishes superimposed preeclampsia from chronic hypertension exacerbation?',
    options: [
      'Elevated blood pressure alone',
      'New-onset proteinuria or thrombocytopenia',
      'Mild transaminase elevation',
      'Mild creatinine elevation'
    ],
    correctIndex: 1,
    explanation: 'New-onset proteinuria (≥300mg/24hr or P/C ratio ≥0.3) after 20 weeks or new thrombocytopenia (<100,000/μL) are most specific for superimposed preeclampsia. Other severe features include: hepatic dysfunction (transaminases >2x normal), renal insufficiency (creatinine >1.1 or doubling), pulmonary edema, or cerebral/visual symptoms. BP elevation alone is insufficient for diagnosis.',
    references: [
      'ACOG Practice Bulletin No. 222',
      'ACOG Practice Bulletin No. 203',
      'Obstet Gynecol 2020;135:e237-e260'
    ]
  },
  {
    id: 'htd-024',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What dose of immediate-release nifedipine is used for acute hypertensive crisis in pregnancy?',
    options: [
      '5mg PO every 30 minutes',
      '10mg PO every 15-20 minutes',
      '30mg PO once',
      '60mg PO once'
    ],
    correctIndex: 1,
    explanation: 'Immediate-release nifedipine 10mg PO every 15-20 minutes (max 3 doses or 30mg) is first-line for acute BP management (≥160/110 mmHg) in pregnancy. Goal is to reduce BP to 140-150/90-100 mmHg within 30-60 minutes. Alternative is labetalol 20mg IV, then 40mg, 80mg, 80mg every 10-15 minutes (max 220mg cumulative). Hydralazine 5-10mg IV is third-line.',
    references: [
      'ACOG Practice Bulletin No. 222',
      'Obstet Gynecol 2020;135:e237-e260',
      'Hypertension 2017;69:e3-e28'
    ]
  },
  {
    id: 'htd-025',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the impact of chronic hypertension on fetal growth?',
    options: [
      'Increased risk of macrosomia',
      'No effect on fetal growth',
      'Increased risk of fetal growth restriction (2-3x)',
      'Decreased birth weight only with ACE inhibitors'
    ],
    correctIndex: 2,
    explanation: 'Chronic hypertension increases the risk of fetal growth restriction (FGR) 2-3 fold due to uteroplacental insufficiency. Risk is highest with severe or poorly controlled HTN, superimposed preeclampsia, renal disease, or diabetes. Serial growth ultrasounds every 3-4 weeks starting at 28-32 weeks are recommended to detect FGR. This FGR risk is independent of antihypertensive medication use.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Am J Obstet Gynecol 2016;214:649.e1-11',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  },
  {
    id: 'htd-026',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What cardiovascular evaluation is recommended for women with early-onset (<30 years) or severe hypertension?',
    options: [
      'No special testing',
      'Echocardiogram only',
      'Secondary hypertension workup: renal artery duplex, plasma renin/aldosterone, urinary metanephrines',
      'Cardiac catheterization'
    ],
    correctIndex: 2,
    explanation: 'Young women (<30 years) with severe hypertension should be evaluated for secondary causes: renal artery stenosis (renovascular HTN - duplex ultrasound), primary hyperaldosteronism (plasma renin/aldosterone ratio), pheochromocytoma (urinary or plasma metanephrines), and renal parenchymal disease (creatinine, urinalysis). Echocardiogram assesses for end-organ damage (LVH). Coarctation should also be considered.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2017;69:e13-e115',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  },
  {
    id: 'htd-027',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A postpartum patient on methyldopa and nifedipine wishes to resume her pre-pregnancy enalapril. When can ACE inhibitors be restarted safely for breastfeeding?',
    options: [
      'Immediately postpartum',
      'After 3 days postpartum',
      'After completing colostrum phase (3-5 days) or immediately if not breastfeeding',
      'ACE inhibitors are contraindicated during breastfeeding'
    ],
    correctIndex: 2,
    explanation: 'ACE inhibitors are safe during breastfeeding and can be restarted postpartum. They are preferred in breastfeeding women. If desired, can wait 3-5 days (colostrum phase) before restarting, as neonatal renal function is still maturing. However, immediate restart is acceptable. Captopril, enalapril, and quinapril are particularly well-studied. This allows women to return to their most effective pre-pregnancy regimen.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2022;79:e21-e41',
      'Drugs 2013;73:943-961'
    ]
  },
  {
    id: 'htd-028',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the most important predictor of adverse pregnancy outcomes in chronic hypertension?',
    options: [
      'Duration of hypertension',
      'Presence of target organ damage (LVH, renal insufficiency)',
      'Age at diagnosis',
      'Family history of hypertension'
    ],
    correctIndex: 1,
    explanation: 'The presence of target organ damage - particularly left ventricular hypertrophy, renal insufficiency (elevated creatinine, proteinuria), or retinopathy - predicts adverse outcomes more strongly than blood pressure level alone. These indicate long-standing or severe disease and impaired organ reserve. Such patients require more intensive monitoring, earlier delivery (37-38 weeks), and multidisciplinary care.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Circulation 2011;124:2145-2154',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  },
  {
    id: 'htd-029',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the "blood pressure paradox" in pregnancy with chronic hypertension?',
    options: [
      'Blood pressure is always higher in pregnancy',
      'BP typically decreases in first/second trimester then increases in third trimester',
      'Home BP is always higher than office BP',
      'Diastolic BP increases more than systolic'
    ],
    correctIndex: 1,
    explanation: 'The physiologic BP changes in pregnancy can create a "paradox" in women with chronic HTN: BP often decreases in first and early second trimester (due to decreased SVR), sometimes allowing medication reduction or discontinuation. BP then increases in late second and third trimester, often requiring medication escalation. This pattern can make diagnosis of chronic HTN difficult if first presentation is in mid-pregnancy.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Hypertension 2019;73:e30-e39',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  },
  {
    id: 'htd-030',
    topicId: 'hypertensive-disorders',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What percentage of women with chronic hypertension will have a successful vaginal delivery?',
    options: [
      '30-40%',
      '50-60%',
      '70-80%',
      '90-95%'
    ],
    correctIndex: 2,
    explanation: 'Approximately 70-80% of women with chronic hypertension will achieve vaginal delivery, though this is lower than the general population (~85%). Cesarean delivery is more common due to: indicated preterm delivery, fetal growth restriction with non-reassuring testing, failed induction, and superimposed preeclampsia. However, chronic HTN itself is NOT an indication for cesarean delivery.',
    references: [
      'ACOG Practice Bulletin No. 203',
      'Am J Obstet Gynecol 2016;214:649.e1-11',
      'Obstet Gynecol 2019;133:e26-e50'
    ]
  }
];

export default hypertensiveDisordersQuestions;
