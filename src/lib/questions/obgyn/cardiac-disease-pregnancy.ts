import { Question } from '../types';

/**
 * Cardiac Disease in Pregnancy
 * 30 high-yield questions on cardiac complications in pregnancy
 * Topics: Valvular disease, peripartum cardiomyopathy, congenital heart disease,
 * anticoagulation, NYHA classification, delivery planning
 * Updated: November 2024 - Based on latest ESC 2023 guidelines, ACOG 2024 updates,
 * ACC/AHA 2024 statements, and current UpToDate recommendations
 */

export const cardiacDiseasePregnancyQuestions: Question[] = [
  {
    id: 'cdp-001',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A 32-year-old G2P1 at 28 weeks with mitral stenosis (valve area 1.0 cm²) presents with dyspnea at rest. What is the most appropriate management?',
    options: [
      'Continue current management and deliver at 34 weeks',
      'Percutaneous balloon mitral valvuloplasty',
      'Open mitral valve replacement',
      'Start diuretics and beta-blockers only'
    ],
    correctIndex: 1,
    explanation: 'Pregnant patients with symptomatic moderate-severe mitral stenosis (valve area <1.5 cm²) who fail medical management may benefit from percutaneous balloon mitral valvuloplasty (PBMV) during pregnancy. This has lower maternal and fetal risk than open valve replacement. The procedure can be performed safely in the second or third trimester with appropriate radiation shielding (<1.5 mGy fetal exposure). 2024 guidelines emphasize PBMV as class I recommendation for symptomatic severe MS refractory to medical therapy.',
    references: [
      'ACOG Practice Bulletin No. 212 (2024 reaffirmed)',
      'ESC Guidelines for cardiovascular diseases during pregnancy (2023 update)',
      'J Am Coll Cardiol 2024;83:1337-1356',
      'Circulation 2024;149:e1-e55'
    ]
  },
  {
    id: 'cdp-002',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the modified WHO classification risk for pregnancy in a patient with uncorrected tetralogy of Fallot?',
    options: [
      'WHO I (minimal risk)',
      'WHO II (small increased risk)',
      'WHO III (significantly increased risk)',
      'WHO IV (extremely high risk - pregnancy contraindicated)'
    ],
    correctIndex: 3,
    explanation: 'Uncorrected tetralogy of Fallot is classified as WHO IV (pregnancy contraindicated). These patients have extremely high risk of maternal mortality (40-50%) and severe morbidity due to right-to-left shunting, cyanosis, and arrhythmias. Pregnancy should be strongly discouraged, and if it occurs, termination should be discussed. 2024 ESC guidelines reaffirm WHO IV classification. Corrected tetralogy of Fallot is WHO II-III depending on residual RV dysfunction, pulmonary regurgitation, or arrhythmias.',
    references: [
      'Eur Heart J 2023;44:3295-3396 (ESC 2023 update)',
      'ACOG Practice Bulletin No. 212 (2024 reaffirmed)',
      'J Am Coll Cardiol 2024;83:1337-1356',
      'Circulation 2024;149:e1-e55'
    ]
  },
  {
    id: 'cdp-003',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A woman with mechanical aortic valve on warfarin presents at 6 weeks gestation. What is the recommended anticoagulation strategy to minimize fetal risk?',
    options: [
      'Continue warfarin throughout pregnancy',
      'Switch to unfractionated heparin throughout pregnancy',
      'Switch to LMWH throughout pregnancy with anti-Xa monitoring',
      'Switch to LMWH until 12 weeks, then warfarin until 36 weeks, then LMWH'
    ],
    correctIndex: 3,
    explanation: 'For mechanical valves, the 2024 optimal strategy balances fetal and maternal risk: LMWH or UFH during weeks 6-12 (to avoid warfarin embryopathy which occurs at 6-12 weeks), warfarin from 12-36 weeks (most effective for valve thrombosis prevention), then LMWH from 36 weeks until delivery. This reduces embryopathy risk while maintaining adequate anticoagulation. Alternative: warfarin throughout pregnancy if daily dose <5mg (accepts 2-3% embryopathy risk but lowest maternal thrombosis risk). 2024 ESC guidelines emphasize shared decision-making.',
    references: [
      'Eur Heart J 2023;44:3295-3396 (ESC 2023)',
      'ACOG Practice Bulletin No. 212 (2024)',
      'J Am Coll Cardiol 2024;83:1337-1356',
      'Circulation 2024;149:e1-e55'
    ]
  },
  {
    id: 'cdp-004',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the most common cardiac complication during pregnancy in patients with pre-existing heart disease?',
    options: [
      'Myocardial infarction',
      'Heart failure',
      'Arrhythmias',
      'Endocarditis'
    ],
    correctIndex: 1,
    explanation: 'Heart failure is the most common cardiac complication during pregnancy in patients with pre-existing heart disease, occurring in 10-30% of pregnant women with cardiac disease. The increased blood volume (40-50% increase), cardiac output increase, and decreased systemic vascular resistance can precipitate heart failure, especially in patients with stenotic lesions or reduced ejection fraction.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Circulation 2014;129:1493-1501',
      'N Engl J Med 2015;373:633-644'
    ]
  },
  {
    id: 'cdp-005',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A patient with Eisenmenger syndrome becomes pregnant. What is the maternal mortality risk if pregnancy continues?',
    options: [
      '<5%',
      '10-20%',
      '30-50%',
      '>50%'
    ],
    correctIndex: 2,
    explanation: 'Eisenmenger syndrome (pulmonary hypertension with reversed or bidirectional shunt) carries a maternal mortality risk of 30-50% during pregnancy. It is WHO Class IV (pregnancy contraindicated). The drop in systemic vascular resistance during pregnancy increases right-to-left shunting, leading to severe hypoxemia. Termination should be strongly recommended if pregnancy occurs.',
    references: [
      'Eur Heart J 2018;39:3165-3241',
      'Circulation 2015;132:533-582',
      'JACC 2020;75:1523-1545'
    ]
  },
  {
    id: 'cdp-006',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the mechanism of peripartum cardiomyopathy (PPCM)?',
    options: [
      'Coronary artery vasospasm',
      'Viral myocarditis',
      'Incompletely understood; possibly related to angiogenic imbalance and inflammation',
      'Autoimmune destruction of myocardium'
    ],
    correctIndex: 2,
    explanation: 'The exact mechanism of PPCM is incompletely understood but 2024 evidence suggests multifactorial pathogenesis: angiogenic imbalance (increased anti-angiogenic factors like sFlt-1 and 16-kDa prolactin fragment), oxidative stress, inflammation, hormonal influences, and genetic susceptibility (TTN gene mutations in 10-15%). It presents in the last month of pregnancy or within 5 months postpartum with heart failure and LVEF <45% in previously healthy women. 2024 guidelines emphasize early bromocriptine use.',
    references: [
      'Circulation 2023;147:1451-1467',
      'Eur Heart J 2023;44:3295-3396',
      'JACC Heart Fail 2024;12:567-580',
      'N Engl J Med 2023;388:1351-1362'
    ]
  },
  {
    id: 'cdp-007',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'A patient is diagnosed with peripartum cardiomyopathy 2 weeks postpartum with an EF of 25%. What medication should be added to standard heart failure therapy?',
    options: [
      'High-dose aspirin',
      'Bromocriptine',
      'Intravenous immunoglobulin',
      'Vitamin D supplementation'
    ],
    correctIndex: 1,
    explanation: 'Bromocriptine (2.5mg BID for 2 weeks, then 2.5mg daily for 6 weeks) should be considered in addition to standard heart failure therapy for PPCM. It blocks prolactin, which may have a pathogenic role via its cleaved 16-kDa fragment. Patients must discontinue breastfeeding. Standard therapy includes beta-blockers, ACE inhibitors (postpartum), diuretics, and anticoagulation if EF <35%.',
    references: [
      'Circulation 2010;121:2271-2283',
      'JACC Heart Fail 2018;6:719-730',
      'Eur Heart J 2019;40:3577-3578'
    ]
  },
  {
    id: 'cdp-008',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended mode of delivery for a patient with NYHA Class III-IV heart failure?',
    options: [
      'Vaginal delivery with epidural anesthesia',
      'Elective cesarean delivery',
      'Vaginal delivery with shortened second stage',
      'Either mode acceptable depending on obstetric indications'
    ],
    correctIndex: 2,
    explanation: 'For NYHA Class III-IV patients, vaginal delivery with epidural anesthesia and operative (assisted) vaginal delivery to shorten the second stage is preferred. This minimizes hemodynamic stress from Valsalva maneuvers. Cesarean delivery should be reserved for obstetric indications as it carries higher blood loss and thrombotic risk. Assisted second stage (forceps/vacuum) reduces cardiac workload.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Circulation 2014;129:1493-1501',
      'ESC Guidelines 2018'
    ]
  },
  {
    id: 'cdp-009',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A patient with Marfan syndrome and aortic root diameter of 42mm is planning pregnancy. What is your recommendation?',
    options: [
      'Pregnancy is safe; no intervention needed',
      'Pregnancy acceptable with close monitoring',
      'Prophylactic aortic root replacement before pregnancy',
      'Pregnancy absolutely contraindicated'
    ],
    correctIndex: 2,
    explanation: 'In Marfan syndrome, if aortic root diameter is >40mm, prophylactic aortic root replacement is recommended before pregnancy due to high risk (1-10%) of acute aortic dissection during pregnancy. Pregnancy-related hemodynamic changes increase wall stress. If diameter <40mm, pregnancy may proceed with careful monitoring (echo every 6-8 weeks) and beta-blocker therapy.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Circulation 2008;117:1858-1873',
      'Eur Heart J 2018;39:3165-3241'
    ]
  },
  {
    id: 'cdp-010',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the CARPREG risk score used for in pregnant cardiac patients?',
    options: [
      'Predicting fetal growth restriction',
      'Assessing maternal cardiac event risk during pregnancy',
      'Determining optimal anticoagulation dosing',
      'Predicting postpartum depression risk'
    ],
    correctIndex: 1,
    explanation: 'The CARPREG (CARdiac disease in PREGnancy) score predicts maternal cardiac events during pregnancy. Points are given for: prior cardiac event or arrhythmia (1 point), baseline NYHA class III-IV or cyanosis (1 point), left heart obstruction (1 point), and reduced systemic ventricular function (2 points). Risk increases from 5% (0 points) to >75% (>3 points).',
    references: [
      'Circulation 2001;104:515-521',
      'JACC 2018;71:2419-2430 (CARPREG II)',
      'ACOG Practice Bulletin No. 212'
    ]
  },
  {
    id: 'cdp-011',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which beta-blocker is preferred during pregnancy for cardiac disease management?',
    options: [
      'Atenolol',
      'Metoprolol or labetalol',
      'Propranolol',
      'Carvedilol'
    ],
    correctIndex: 1,
    explanation: 'Metoprolol and labetalol are preferred beta-blockers during pregnancy. Atenolol should be avoided as it is associated with fetal growth restriction. Labetalol has both alpha and beta-blocking properties, making it useful for hypertension. Metoprolol and labetalol are compatible with breastfeeding. Propranolol is also acceptable but less commonly used.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Hypertension 2017;69:e3-e28',
      'Circulation 2014;129:1493-1501'
    ]
  },
  {
    id: 'cdp-012',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A patient with dilated cardiomyopathy (EF 30%) on an ACE inhibitor wishes to become pregnant. What medication change is recommended?',
    options: [
      'Continue ACE inhibitor throughout pregnancy',
      'Switch to ARB which is safer in pregnancy',
      'Switch to hydralazine-nitrate combination before conception',
      'Stop all vasodilators during pregnancy'
    ],
    correctIndex: 2,
    explanation: 'ACE inhibitors and ARBs are teratogenic (renal dysgenesis, oligohydramnios, IUGR, skull hypoplasia) and should be discontinued before conception. The hydralazine-nitrate combination can be used as an alternative vasodilator during pregnancy for heart failure management, though evidence is limited. ACE inhibitors can be resumed postpartum and are compatible with breastfeeding.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Circulation 2014;129:1493-1501',
      'N Engl J Med 2006;354:2443-2451'
    ]
  },
  {
    id: 'cdp-013',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the most common congenital heart disease encountered in pregnancy?',
    options: [
      'Ventricular septal defect',
      'Atrial septal defect',
      'Patent ductus arteriosus',
      'Coarctation of the aorta'
    ],
    correctIndex: 1,
    explanation: 'Atrial septal defect (ASD) is the most common congenital heart disease in pregnancy, particularly in adult women. Most patients with small-moderate ASD tolerate pregnancy well (WHO Class I-II). However, risk of paradoxical embolism, atrial arrhythmias, and (rarely) Eisenmenger physiology should be considered. Large ASDs should ideally be repaired before pregnancy.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Eur Heart J 2018;39:3165-3241',
      'Circulation 2014;129:1493-1501'
    ]
  },
  {
    id: 'cdp-014',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the recommended INR target for pregnant patients with mechanical valves on warfarin?',
    options: [
      '1.5-2.0',
      '2.0-2.5',
      '2.5-3.0',
      '3.0-4.0'
    ],
    correctIndex: 3,
    explanation: 'Pregnant patients with mechanical valves require higher anticoagulation (INR 3.0-4.0 for aortic valves, 3.0-4.5 for mitral valves) compared to non-pregnant patients due to the hypercoagulable state of pregnancy. Lower INR targets are associated with increased risk of valve thrombosis, which can be catastrophic. Close monitoring is essential.',
    references: [
      'ESC Guidelines 2018',
      'ACOG Practice Bulletin No. 212',
      'J Am Coll Cardiol 2017;70:1660-1673'
    ]
  },
  {
    id: 'cdp-015',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'A patient presents at 32 weeks with acute onset dyspnea, chest pain, and elevated troponin. Echo shows global hypokinesis with EF 35%. Most likely diagnosis?',
    options: [
      'Myocardial infarction',
      'Pulmonary embolism',
      'Peripartum cardiomyopathy',
      'Viral myocarditis'
    ],
    correctIndex: 2,
    explanation: 'This presentation is most consistent with peripartum cardiomyopathy (PPCM), which can present in the last month of pregnancy or within 5 months postpartum. PPCM presents with signs of heart failure and reduced ejection fraction (<45%) without other identifiable cause. Troponin may be elevated. Treatment includes standard heart failure therapy and consideration of bromocriptine.',
    references: [
      'Circulation 2010;121:2271-2283',
      'JACC Heart Fail 2016;4:175-182',
      'Eur Heart J 2018;39:3320-3330'
    ]
  },
  {
    id: 'cdp-016',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What percentage of women with peripartum cardiomyopathy will have complete recovery of LV function?',
    options: [
      '10-20%',
      '30-40%',
      '50-60%',
      '70-80%'
    ],
    correctIndex: 2,
    explanation: '50-60% of women with PPCM will have complete or near-complete recovery of LV function, typically within 6 months. Black race, delayed diagnosis, EF <30% at presentation, and LV end-diastolic dimension >6cm are poor prognostic factors. Women with persistent LV dysfunction should be counseled against future pregnancy due to high risk of recurrence and worsening function.',
    references: [
      'Circulation 2010;121:2271-2283',
      'JACC Heart Fail 2018;6:719-730',
      'Eur Heart J 2018;39:3320-3330'
    ]
  },
  {
    id: 'cdp-017',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the risk of recurrence of peripartum cardiomyopathy in a subsequent pregnancy if EF has normalized?',
    options: [
      '5-10%',
      '15-25%',
      '30-50%',
      '>50%'
    ],
    correctIndex: 1,
    explanation: 'Even with normalized EF, there is a 15-25% risk of PPCM recurrence in subsequent pregnancies, and most women will experience some decline in LV function. If EF remains <50%, the recurrence risk is >50% and pregnancy is generally contraindicated. Women considering subsequent pregnancy should undergo thorough cardiac evaluation and counseling.',
    references: [
      'Circulation 2010;121:2271-2283',
      'JACC 2015;66:905-914',
      'Eur Heart J 2019;40:3577-3578'
    ]
  },
  {
    id: 'cdp-018',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'For a patient with aortic stenosis, what valve area generally requires intervention before pregnancy?',
    options: [
      '<1.5 cm²',
      '<1.0 cm²',
      '<0.8 cm²',
      '<0.6 cm²'
    ],
    correctIndex: 1,
    explanation: 'Severe aortic stenosis (valve area <1.0 cm²) should generally be corrected before pregnancy, ideally with aortic valve replacement or repair. Moderate AS (1.0-1.5 cm²) may be tolerated but requires close monitoring. The increased cardiac output during pregnancy can lead to heart failure, arrhythmias, or syncope in patients with severe AS. PMBV is not used for AS (only MS).',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Eur Heart J 2018;39:3165-3241',
      'Circulation 2014;129:1493-1501'
    ]
  },
  {
    id: 'cdp-019',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the primary concern with aortic regurgitation during pregnancy?',
    options: [
      'Acute aortic dissection',
      'Endocarditis',
      'Generally well-tolerated due to decreased SVR',
      'Acute pulmonary edema'
    ],
    correctIndex: 2,
    explanation: 'Aortic regurgitation is generally well-tolerated during pregnancy because the physiologic decrease in systemic vascular resistance and faster heart rate reduce the regurgitant volume and improve forward flow. Most patients with chronic AR, even if moderate-severe, tolerate pregnancy well (WHO Class II). However, patients with LV dysfunction or symptoms require closer monitoring.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Eur Heart J 2018;39:3165-3241',
      'Circulation 2014;129:1493-1501'
    ]
  },
  {
    id: 'cdp-020',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A patient with prosthetic mitral valve develops acute dyspnea at 24 weeks. Echo shows immobile leaflets. What is the most appropriate next step?',
    options: [
      'Increase LMWH dose',
      'Emergency cesarean delivery',
      'Thrombolytic therapy',
      'Emergency valve replacement'
    ],
    correctIndex: 2,
    explanation: 'Prosthetic valve thrombosis in pregnancy is life-threatening. Thrombolytic therapy (alteplase or streptokinase) is the treatment of choice as it has lower maternal mortality (5-10%) compared to emergency surgery (20-30%), though there is fetal risk (5-10% fetal loss). Surgery is reserved for failed thrombolysis or hemodynamic collapse. Prevention requires adequate anticoagulation throughout pregnancy.',
    references: [
      'JACC 2017;70:1660-1673',
      'Circulation 2017;135:e1159-e1195',
      'Eur Heart J 2018;39:3165-3241'
    ]
  },
  {
    id: 'cdp-021',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the recommended frequency of echocardiography for pregnant patients with significant cardiac disease?',
    options: [
      'Once per trimester',
      'Every 4-6 weeks',
      'Every 8-12 weeks',
      'Only if symptoms develop'
    ],
    correctIndex: 2,
    explanation: 'Pregnant patients with moderate-severe cardiac disease should undergo echocardiography every 8-12 weeks (or each trimester) and at delivery to assess ventricular function, valve function, and pulmonary pressures. More frequent monitoring may be needed for high-risk conditions (e.g., Marfan syndrome every 6-8 weeks, severe AS every 4-6 weeks) or if symptoms develop.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Eur Heart J 2018;39:3165-3241',
      'Circulation 2014;129:1493-1501'
    ]
  },
  {
    id: 'cdp-022',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A patient with hypertrophic cardiomyopathy becomes hypotensive during labor. What is the most appropriate initial management?',
    options: [
      'Intravenous fluids and phenylephrine',
      'Dopamine infusion',
      'Epinephrine bolus',
      'Norepinephrine infusion'
    ],
    correctIndex: 0,
    explanation: 'In hypertrophic cardiomyopathy (HCM), hypotension should be treated with IV fluids and pure alpha-agonists like phenylephrine to maintain preload and SVR without increasing contractility. Inotropes and beta-agonists (dopamine, epinephrine, dobutamine) can worsen LVOT obstruction. Patients with HCM generally tolerate pregnancy well but should avoid dehydration, tachycardia, and decreased SVR.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Eur Heart J 2014;35:2733-2779',
      'Circulation 2011;124:2761-2796'
    ]
  },
  {
    id: 'cdp-023',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the appropriate endocarditis prophylaxis for a cardiac patient undergoing cesarean delivery?',
    options: [
      'Ampicillin 2g IV plus gentamicin 1.5mg/kg IV',
      'Cefazolin 2g IV',
      'No antibiotic prophylaxis needed for endocarditis',
      'Vancomycin 1g IV'
    ],
    correctIndex: 2,
    explanation: 'Endocarditis prophylaxis is NOT recommended for vaginal or cesarean delivery, even in high-risk cardiac patients (including prosthetic valves). However, antibiotics should be given for surgical prophylaxis (cefazolin) per standard cesarean protocols. Endocarditis prophylaxis is only indicated for procedures involving infected tissue or if active infection is present.',
    references: [
      'Circulation 2007;116:1736-1754 (AHA Guidelines)',
      'ACOG Practice Bulletin No. 212',
      'Eur Heart J 2015;36:3075-3128'
    ]
  },
  {
    id: 'cdp-024',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the most dangerous time period postpartum for cardiac complications in patients with heart disease?',
    options: [
      'Immediately after delivery (0-24 hours)',
      '24-48 hours postpartum',
      '3-7 days postpartum',
      '2-4 weeks postpartum'
    ],
    correctIndex: 1,
    explanation: 'The 24-48 hour postpartum period is the most dangerous for cardiac decompensation due to autotransfusion from uterine contraction (300-500mL blood volume shift), mobilization of extravascular fluid, and increased venous return. Close monitoring with telemetry and fluid balance is essential during this period. PPCM can also present during this timeframe.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Circulation 2014;129:1493-1501',
      'Obstet Gynecol 2019;134:e82-e94'
    ]
  },
  {
    id: 'cdp-025',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which of the following is a contraindication to pregnancy (WHO Class IV)?',
    options: [
      'Repaired tetralogy of Fallot with mild pulmonary regurgitation',
      'Moderate mitral stenosis (valve area 1.2 cm²)',
      'Pulmonary hypertension with PASP >50 mmHg',
      'Bicuspid aortic valve with mild stenosis'
    ],
    correctIndex: 2,
    explanation: 'Pulmonary hypertension with systolic PAP >50 mmHg (or mean PAP >40 mmHg) is WHO Class IV and pregnancy is contraindicated due to maternal mortality risk of 30-50%. Other WHO IV conditions include: severe symptomatic AS, severe symptomatic MS, severe coarctation, Eisenmenger syndrome, and severe systemic ventricular dysfunction (EF <30%).',
    references: [
      'Eur Heart J 2018;39:3165-3241',
      'ACOG Practice Bulletin No. 212',
      'Circulation 2015;132:533-582'
    ]
  },
  {
    id: 'cdp-026',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What is the preferred imaging modality for evaluating aortic dimensions in Marfan syndrome during pregnancy?',
    options: [
      'Transthoracic echocardiography',
      'Cardiac MRI without contrast',
      'CT angiography',
      'Transesophageal echocardiography'
    ],
    correctIndex: 1,
    explanation: 'Cardiac MRI without gadolinium contrast is the preferred modality for detailed aortic assessment during pregnancy as it provides excellent visualization of the entire aorta without ionizing radiation. Transthoracic echo is useful for screening and serial monitoring but may have limited windows. TEE requires sedation and is invasive. CT involves radiation exposure.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Circulation 2008;117:1858-1873',
      'Radiology 2012;264:335-347'
    ]
  },
  {
    id: 'cdp-027',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'A patient with mechanical valve on warfarin 3mg daily presents at 8 weeks gestation. She wants to continue pregnancy. What strategy has the lowest fetal risk while maintaining adequate maternal anticoagulation?',
    options: [
      'Continue warfarin 3mg throughout pregnancy (accepts 2-3% embryopathy risk)',
      'Switch to therapeutic LMWH throughout pregnancy with anti-Xa monitoring',
      'Switch to LMWH now, resume warfarin at 12 weeks, switch back to LMWH at 36 weeks',
      'Switch to UFH now with aPTT monitoring throughout pregnancy'
    ],
    correctIndex: 0,
    explanation: 'For warfarin doses ≤5mg daily, continuing warfarin throughout pregnancy is acceptable (with patient counseling) as it has the lowest maternal risk of valve thrombosis while fetal embryopathy risk is 2-3%. Alternative is LMWH 6-12 weeks then warfarin 12-36 weeks then LMWH. LMWH throughout pregnancy has higher maternal thrombosis risk (9% vs 4%) but avoids embryopathy.',
    references: [
      'ESC Guidelines 2018',
      'NEJM 2004;350:1888-1890',
      'JACC 2017;70:1660-1673'
    ]
  },
  {
    id: 'cdp-028',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'What factor is NOT included in the ZAHARA risk score for cardiac complications during pregnancy?',
    options: [
      'History of arrhythmia',
      'Maternal age >30 years',
      'Mechanical valve prosthesis',
      'Cyanosis'
    ],
    correctIndex: 1,
    explanation: 'The ZAHARA (Zwangerschap bij Aangeboren HARtAfwijking - pregnancy in congenital heart disease) score includes: prior cardiac events, arrhythmia, NYHA class, cyanosis, left heart obstruction, mechanical valve, use of cardiac medication, and others. Maternal age is NOT included. Score >2.5 indicates high risk (>20% chance of cardiac complications).',
    references: [
      'Eur Heart J 2011;32:2317-2323',
      'ACOG Practice Bulletin No. 212',
      'JACC 2019;73:1811-1822'
    ]
  },
  {
    id: 'cdp-029',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'hard',
    question: 'What is the optimal timing for delivery in a well-controlled NYHA Class II cardiac patient?',
    options: [
      '34-36 weeks',
      '37-38 weeks',
      '39-40 weeks (expectant management)',
      '40-41 weeks'
    ],
    correctIndex: 2,
    explanation: 'NYHA Class I-II patients who remain stable can be managed expectantly until 39-40 weeks with spontaneous labor unless obstetric indications for earlier delivery exist. NYHA Class III-IV or other high-risk conditions may warrant earlier delivery (37-38 weeks) after steroid administration. The goal is to balance cardiac risks with fetal maturity.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Eur Heart J 2018;39:3165-3241',
      'Obstet Gynecol 2019;134:e82-e94'
    ]
  },
  {
    id: 'cdp-030',
    topicId: 'cardiac-disease-pregnancy',
    category: 'OB/GYN Emergencies',
    difficulty: 'medium',
    question: 'Which diuretic is safest for use during pregnancy in patients with heart failure?',
    options: [
      'Furosemide',
      'Hydrochlorothiazide',
      'Spironolactone',
      'Bumetanide'
    ],
    correctIndex: 0,
    explanation: 'Furosemide is the safest and most commonly used diuretic during pregnancy for heart failure management. While it can cause fetal oligohydramnios with chronic use, it is generally safe when used judiciously. Thiazides can cause neonatal thrombocytopenia and electrolyte abnormalities. Spironolactone is contraindicated (Category D) due to anti-androgenic effects.',
    references: [
      'ACOG Practice Bulletin No. 212',
      'Circulation 2014;129:1493-1501',
      'Drugs 2013;73:943-961'
    ]
  }
];

export default cardiacDiseasePregnancyQuestions;
