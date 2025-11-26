import { Question } from '../types';

export const preeclampsiaQuestions: Question[] = [
  {
    id: 'pre-001',
    question: 'A 32-year-old primigravida at 34 weeks presents with blood pressure 155/105 mmHg on two occasions 4 hours apart. Urinalysis shows 2+ protein. What is the diagnosis?',
    options: [
      'Gestational hypertension',
      'Chronic hypertension',
      'Preeclampsia without severe features',
      'Preeclampsia with severe features'
    ],
    correctIndex: 3,
    explanation: 'Blood pressure ≥160/110 mmHg (severe range) on a single reading or ≥140/90 on two occasions plus proteinuria indicates preeclampsia. BP ≥160/110 automatically classifies as severe features, requiring immediate treatment and consideration for delivery.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Magee LA, et al. Diagnosis, evaluation, and management of the hypertensive disorders of pregnancy. Pregnancy Hypertens. 2014;4(2):105-145'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-002',
    question: 'Which of the following is a severe feature of preeclampsia?',
    options: [
      'Blood pressure 145/95 mmHg',
      'Platelet count 120,000/μL',
      'New-onset headache unresponsive to acetaminophen',
      'Trace pedal edema'
    ],
    correctIndex: 2,
    explanation: 'Severe features include: BP ≥160/110, thrombocytopenia (<100,000/μL), elevated liver enzymes (2x normal), creatinine >1.1 mg/dL, pulmonary edema, new-onset headache unresponsive to medication, or visual disturbances. Edema is no longer diagnostic.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Tranquilli AL, et al. The classification, diagnosis and management of the hypertensive disorders of pregnancy. Int J Gynaecol Obstet. 2014;124(2):89-96'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-003',
    question: 'What is the loading dose of magnesium sulfate for seizure prophylaxis in preeclampsia?',
    options: [
      '2 grams IV over 20 minutes',
      '4 grams IV over 20 minutes',
      '4-6 grams IV over 15-20 minutes',
      '10 grams IV bolus'
    ],
    correctIndex: 2,
    explanation: 'Standard magnesium sulfate loading dose is 4-6 grams IV over 15-20 minutes, followed by maintenance infusion of 1-2 g/hr. This achieves therapeutic levels (4-7 mEq/L) for seizure prophylaxis. The Magpie trial demonstrated 58% reduction in eclampsia risk.',
    references: [
      'Magpie Trial Collaborative Group. Do women with pre-eclampsia, and their babies, benefit from magnesium sulphate? Lancet. 2002;359(9321):1877-1890',
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-004',
    question: 'A patient on magnesium sulfate develops absent deep tendon reflexes and respiratory rate of 8/min. What is the immediate management?',
    options: [
      'Continue current dose and recheck in 1 hour',
      'Stop magnesium, give calcium gluconate 1g IV',
      'Reduce magnesium infusion rate by half',
      'Intubate immediately'
    ],
    correctIndex: 1,
    explanation: 'Absent reflexes and respiratory depression indicate magnesium toxicity. STOP magnesium immediately and give calcium gluconate 1g (10 mL of 10% solution) IV over 3 minutes as antidote. Monitor respirations, oxygen saturation, and consider checking magnesium level. Toxicity progression: loss of reflexes (7-10 mEq/L) → respiratory depression (>10 mEq/L) → cardiac arrest (>12 mEq/L).',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Sibai BM. Magnesium sulfate prophylaxis in preeclampsia. Am J Obstet Gynecol. 2014;211(3):191-203'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-005',
    question: 'At what gestational age should delivery be recommended for preeclampsia without severe features?',
    options: [
      '34 weeks',
      '37 weeks',
      '39 weeks',
      '40 weeks'
    ],
    correctIndex: 1,
    explanation: 'For preeclampsia without severe features, delivery is recommended at 37 weeks (early term). This balances maternal risk of progression to severe disease against neonatal risks of prematurity. Earlier delivery indicated for severe features or maternal/fetal compromise.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Spong CY, et al. Timing of indicated late-preterm and early-term birth. Obstet Gynecol. 2011;118(2 Pt 1):323-333'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-006',
    question: 'A patient with severe preeclampsia at 32 weeks has persistent severe-range blood pressures despite two antihypertensive agents. What is the recommended management?',
    options: [
      'Continue expectant management with close monitoring',
      'Add a third antihypertensive agent',
      'Proceed with delivery after corticosteroids',
      'Wait until 34 weeks for delivery'
    ],
    correctIndex: 2,
    explanation: 'Persistent severe-range hypertension despite maximal medical therapy is an indication for delivery regardless of gestational age. Administer corticosteroids and deliver within 24-48 hours if possible. Maternal safety takes priority when disease cannot be controlled.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Sibai BM. Evaluation and management of severe preeclampsia before 34 weeks. Am J Obstet Gynecol. 2011;205(3):191-198'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-007',
    question: 'What is the definition of HELLP syndrome?',
    options: [
      'Hypertension, Elevated Liver enzymes, Low Platelets',
      'Hemolysis, Elevated Liver enzymes, Low Platelets',
      'Hemolysis, Eclampsia, Liver failure, Pulmonary edema',
      'Hypertension, Eclampsia, Liver dysfunction, Proteinuria'
    ],
    correctIndex: 1,
    explanation: 'HELLP syndrome: Hemolysis (schistocytes, elevated LDH, low haptoglobin), Elevated Liver enzymes (AST/ALT >2x normal), Low Platelets (<100,000/μL). It is a severe variant of preeclampsia. Up to 15% of cases may not have hypertension or proteinuria at presentation.',
    references: [
      'Sibai BM. Diagnosis, controversies, and management of the syndrome of hemolysis, elevated liver enzymes, and low platelet count. Obstet Gynecol. 2004;103(5 Pt 1):981-991',
      'Haram K, et al. The HELLP syndrome: Clinical issues and management. BMC Pregnancy Childbirth. 2009;9:8'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-008',
    question: 'A patient develops a seizure at 38 weeks gestation. Blood pressure is 170/110 mmHg. What is the most appropriate initial management?',
    options: [
      'Immediate cesarean delivery during seizure',
      'Protect airway, give magnesium sulfate, then deliver',
      'Give diazepam, then expectant management',
      'Emergency intubation, then cesarean'
    ],
    correctIndex: 1,
    explanation: 'For eclamptic seizure: 1) Protect airway (left lateral position, oxygen, suction), 2) Give magnesium sulfate 4-6g IV loading dose, 3) Control severe hypertension, 4) Stabilize then deliver (usually within hours, not during active seizure). Most seizures are self-limited (<2 minutes). Delivery is definitive treatment but stabilization first.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Sibai BM. Diagnosis and management of gestational hypertension and preeclampsia. Obstet Gynecol. 2003;102(1):181-192'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-009',
    question: 'Which first-line antihypertensive is preferred for acute severe hypertension in pregnancy?',
    options: [
      'ACE inhibitors',
      'Labetalol IV',
      'Atenolol',
      'Diuretics'
    ],
    correctIndex: 1,
    explanation: 'First-line agents for acute severe hypertension (BP ≥160/110): Labetalol 20mg IV (then 40, 80mg q10min, max 220mg), hydralazine 5-10mg IV q20min, or nifedipine immediate-release 10-20mg PO q20min. ACE inhibitors and ARBs are CONTRAINDICATED in pregnancy (fetal renal toxicity).',
    references: [
      'ACOG Committee Opinion No. 767: Emergent Therapy for Acute-Onset, Severe Hypertension During Pregnancy and the Postpartum Period. Obstet Gynecol. 2019;133(2):e174-e180',
      'Magee LA, et al. Hydralazine for treatment of severe hypertension in pregnancy: meta-analysis. BMJ. 2003;327(7421):955-960'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-010',
    question: 'How long should magnesium sulfate be continued postpartum after preeclampsia with severe features?',
    options: [
      '12 hours',
      '24 hours',
      '48 hours',
      'Until blood pressure normalizes'
    ],
    correctIndex: 1,
    explanation: 'Magnesium sulfate should be continued for 24 hours postpartum after delivery for preeclampsia with severe features or eclampsia. Risk of eclampsia persists in postpartum period (up to 44% of eclamptic seizures occur postpartum). Monitor for 72 hours postpartum even after magnesium stopped.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Chames MC, et al. Late postpartum eclampsia: a preventable disease? Am J Obstet Gynecol. 2002;186(6):1174-1177'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-011',
    question: 'A patient at 28 weeks with preeclampsia with severe features receives betamethasone. When is the optimal delivery timing?',
    options: [
      'Immediately',
      '24 hours after first steroid dose',
      '48 hours after completing steroid course',
      '34 weeks gestation'
    ],
    correctIndex: 1,
    explanation: 'For preeclampsia with severe features <34 weeks, administer corticosteroids and deliver at 34 weeks if stable. However, delivery should not be delayed beyond 48 hours after starting steroids if maternal condition worsens. Benefit of steroids begins at 24 hours, peaks at 48 hours, lasts 7 days.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Sibai BM. Evaluation and management of severe preeclampsia before 34 weeks. Am J Obstet Gynecol. 2011;205(3):191-198'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-012',
    question: 'What protein-to-creatinine ratio on spot urine is diagnostic of significant proteinuria in preeclampsia?',
    options: [
      '≥0.1',
      '≥0.3',
      '≥0.5',
      '≥1.0'
    ],
    correctIndex: 1,
    explanation: 'Protein-to-creatinine ratio ≥0.3 mg/dL or ≥300 mg/24hr urine protein is diagnostic of significant proteinuria. However, preeclampsia can be diagnosed WITHOUT proteinuria if BP elevation plus severe features present (thrombocytopenia, elevated liver enzymes, renal insufficiency, pulmonary edema, or cerebral symptoms).',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Côté AM, et al. Diagnostic accuracy of urinary spot protein:creatinine ratio for proteinuria in hypertensive pregnant women. BMJ. 2008;336(7651):1003-1006'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-013',
    question: 'Which statement about aspirin prophylaxis for preeclampsia is correct?',
    options: [
      'Should be started in third trimester',
      'Recommended dose is 40 mg daily',
      'Should be started before 16 weeks for high-risk patients',
      'Not effective in preventing preeclampsia'
    ],
    correctIndex: 2,
    explanation: 'Low-dose aspirin (81mg daily) started before 16 weeks gestation in high-risk women reduces preeclampsia by ~15-20%. High risk: history of preeclampsia, multifetal gestation, chronic hypertension, diabetes, renal disease, autoimmune disease. Continue until delivery.',
    references: [
      'ACOG Committee Opinion No. 743: Low-Dose Aspirin Use During Pregnancy. Obstet Gynecol. 2018;132(1):e44-e52',
      'Roberge S, et al. Early administration of low-dose aspirin for the prevention of preterm and term preeclampsia. Obstet Gynecol. 2012;119(3):562-571'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-014',
    question: 'A patient with HELLP syndrome has platelets of 45,000/μL and needs emergency cesarean delivery. What is the minimum platelet count for neuraxial anesthesia?',
    options: [
      '40,000/μL',
      '50,000/μL',
      '70,000/μL',
      '100,000/μL'
    ],
    correctIndex: 2,
    explanation: 'For neuraxial anesthesia (spinal/epidural), most anesthesiologists require platelet count ≥70,000-80,000/μL due to risk of spinal hematoma. Below this threshold, general anesthesia is preferred. Platelet transfusion may be given if cesarean needed and platelets <50,000/μL, though effect is transient in HELLP syndrome.',
    references: [
      'Practice Guidelines for Obstetric Anesthesia: An Updated Report by the ASA Task Force. Anesthesiology. 2016;124(2):270-300',
      'Sibai BM. Diagnosis, controversies, and management of HELLP syndrome. Obstet Gynecol. 2004;103(5 Pt 1):981-991'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-015',
    question: 'What is the recurrence risk of preeclampsia in a subsequent pregnancy after severe preeclampsia in the first pregnancy?',
    options: [
      '5-10%',
      '15-25%',
      '30-40%',
      '50-65%'
    ],
    correctIndex: 1,
    explanation: 'Recurrence risk is approximately 15-25% overall, higher with earlier onset and more severe disease in first pregnancy. Risk factors for recurrence: severe disease <34 weeks (40% recurrence), underlying chronic hypertension, obesity, kidney disease. Low-dose aspirin reduces recurrence risk.',
    references: [
      'Bramham K, et al. Chronic hypertension and pregnancy outcomes. Circulation. 2014;129(13):1403-1410',
      'ACOG Committee Opinion No. 743: Low-Dose Aspirin Use During Pregnancy. Obstet Gynecol. 2018;132(1):e44-e52'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-016',
    question: 'A postpartum patient on magnesium sulfate has urine output of 20 mL/hr for 4 hours. What is the appropriate action?',
    options: [
      'Continue current dose',
      'Increase IV fluid rate',
      'Reduce or stop magnesium infusion',
      'Give furosemide'
    ],
    correctIndex: 2,
    explanation: 'Magnesium is renally excreted. Oliguria (<30 mL/hr) increases risk of toxicity. Reduce or hold magnesium infusion until urine output improves. Monitor for signs of toxicity (loss of reflexes, respiratory depression). Consider checking magnesium level. Resume at lower rate once output >30 mL/hr.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Sibai BM. Magnesium sulfate prophylaxis in preeclampsia. Am J Obstet Gynecol. 2014;211(3):191-203'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-017',
    question: 'Which laboratory finding in HELLP syndrome indicates hemolysis?',
    options: [
      'Elevated alkaline phosphatase',
      'Elevated indirect bilirubin and LDH',
      'Elevated direct bilirubin',
      'Low hematocrit alone'
    ],
    correctIndex: 1,
    explanation: 'Hemolysis in HELLP is demonstrated by: elevated indirect (unconjugated) bilirubin >1.2 mg/dL, elevated LDH (>600 IU/L), peripheral smear showing schistocytes (fragmented RBCs), low haptoglobin (<25 mg/dL). This is microangiopathic hemolytic anemia from RBC fragmentation in damaged microvasculature.',
    references: [
      'Sibai BM. Diagnosis, controversies, and management of HELLP syndrome. Obstet Gynecol. 2004;103(5 Pt 1):981-991',
      'Haram K, et al. The HELLP syndrome: Clinical issues and management. BMC Pregnancy Childbirth. 2009;9:8'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-018',
    question: 'A patient at 39 weeks with preeclampsia without severe features is admitted for induction. What is the preferred method of cervical ripening?',
    options: [
      'Mechanical methods (Foley balloon)',
      'Misoprostol',
      'Dinoprostone',
      'All are equally safe'
    ],
    correctIndex: 3,
    explanation: 'All cervical ripening methods (mechanical, misoprostol, dinoprostone) are safe in preeclampsia without severe features. For severe preeclampsia, some prefer to avoid prostaglandins due to theoretical increased risk of uterine hyperstimulation causing fetal distress. Cesarean delivery not required unless obstetric indications present.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'ACOG Practice Bulletin No. 107: Induction of Labor. Obstet Gynecol. 2009;114(2 Pt 1):386-397'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-019',
    question: 'What is the most common cause of maternal mortality in preeclampsia-eclampsia?',
    options: [
      'Hemorrhagic stroke',
      'Hepatic rupture',
      'Pulmonary edema',
      'Placental abruption'
    ],
    correctIndex: 0,
    explanation: 'Hemorrhagic stroke (intracerebral hemorrhage) is the leading cause of maternal death in preeclampsia-eclampsia, emphasizing importance of treating severe-range hypertension (BP ≥160/110) urgently. Goal: reduce BP to <160/110 within 30-60 minutes. Other causes: hepatic rupture, DIC, pulmonary edema, renal failure.',
    references: [
      'Martin JN Jr, et al. Stroke and severe preeclampsia and eclampsia. Stroke. 2005;36(4):852-856',
      'Bushnell C, et al. Guidelines for the Prevention of Stroke in Women. Stroke. 2014;45(5):1545-1588'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-020',
    question: 'A patient presents at 24 weeks with BP 190/120 mmHg, severe headache, and visual disturbances. Urinalysis shows 4+ protein. What is the most appropriate management?',
    options: [
      'Expectant management until 34 weeks',
      'Aggressive antihypertensive therapy and expectant management',
      'Delivery after stabilization and corticosteroids',
      'Immediate delivery without stabilization'
    ],
    correctIndex: 2,
    explanation: 'This is preeclampsia with severe features at extremely preterm gestation. Stabilize (control BP, magnesium for seizure prophylaxis), give corticosteroids, and deliver within 24-48 hours. Expectant management at <24 weeks with severe features has poor maternal outcomes. Maternal safety is priority despite extreme prematurity.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Sibai BM. Evaluation and management of severe preeclampsia before 34 weeks. Am J Obstet Gynecol. 2011;205(3):191-198'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-021',
    question: 'Which visual symptom in preeclampsia indicates severe features requiring immediate evaluation?',
    options: [
      'Mild blurred vision',
      'Scotomata (visual field defects) or photopsia (flashing lights)',
      'Dry eyes',
      'Presbyopia'
    ],
    correctIndex: 1,
    explanation: 'Scotomata (blind spots), photopsia (light flashes), diplopia, or cortical blindness indicate severe preeclampsia requiring immediate delivery consideration. These suggest cerebral vasospasm, edema, or posterior reversible encephalopathy syndrome (PRES). Requires urgent MRI if symptoms persist or worsen.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Schwartz RB, et al. Preeclampsia-eclampsia: clinical and neuroradiographic correlates and insights. Radiology. 2000;217(2):371-376'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-022',
    question: 'A patient develops pulmonary edema during magnesium sulfate infusion. What is the most likely contributing factor?',
    options: [
      'Magnesium toxicity',
      'Fluid overload from aggressive IV hydration',
      'Heart failure',
      'Pneumonia'
    ],
    correctIndex: 1,
    explanation: 'Pulmonary edema in preeclampsia results from capillary leak (low oncotic pressure, increased capillary permeability) plus fluid overload. Avoid excessive IV fluids - limit to 80-100 mL/hr unless bleeding. Magnesium itself does not cause pulmonary edema but oliguria during treatment can worsen fluid retention.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Sciscione AC, et al. Acute pulmonary edema in pregnancy. Obstet Gynecol. 2003;101(3):511-515'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-023',
    question: 'What is the target blood pressure goal when treating acute severe hypertension in pregnancy?',
    options: [
      '<120/80 mmHg',
      '<140/90 mmHg',
      '140-150/90-100 mmHg',
      '150-160/100-105 mmHg'
    ],
    correctIndex: 2,
    explanation: 'Target BP is 140-150/90-100 mmHg. Avoid aggressive lowering <140/90 to prevent compromising uteroplacental perfusion. Goal is to prevent maternal stroke (reduce from severe range) while maintaining adequate placental blood flow. Treatment should be initiated when BP ≥160/110 and lowered over 30-60 minutes.',
    references: [
      'ACOG Committee Opinion No. 767: Emergent Therapy for Acute-Onset, Severe Hypertension. Obstet Gynecol. 2019;133(2):e174-e180',
      'Magee LA, et al. The management of severe hypertension. Semin Perinatol. 2009;33(3):138-142'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-024',
    question: 'Which condition is NOT part of the differential diagnosis for HELLP syndrome?',
    options: [
      'Acute fatty liver of pregnancy',
      'Thrombotic thrombocytopenic purpura (TTP)',
      'Hemolytic uremic syndrome (HUS)',
      'Cholestasis of pregnancy'
    ],
    correctIndex: 3,
    explanation: 'HELLP syndrome differential: acute fatty liver of pregnancy (AFLP - hypoglycemia, elevated ammonia), TTP (fever, renal failure, neurologic changes, normal/mildly elevated LFTs), HUS (prominent renal failure), and systemic lupus. Cholestasis presents with pruritus and elevated bile acids, not hemolysis or thrombocytopenia.',
    references: [
      'Sibai BM. Diagnosis, controversies, and management of HELLP syndrome. Obstet Gynecol. 2004;103(5 Pt 1):981-991',
      'Cunningham FG, et al. Williams Obstetrics, 25th Edition. Chapter 40: Hypertensive Disorders'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-025',
    question: 'When should postpartum blood pressure be checked in a patient who had preeclampsia?',
    options: [
      'No follow-up needed once discharged',
      'At 6-week postpartum visit only',
      'Within 7-10 days postpartum',
      'Monthly for 3 months'
    ],
    correctIndex: 2,
    explanation: 'Blood pressure should be checked within 7-10 days postpartum (earlier if severe features). Peak risk for complications is 3-6 days postpartum. Educate on warning signs (headache, visual changes, RUQ pain). Many cases of postpartum preeclampsia/eclampsia present after hospital discharge. BP should normalize by 12 weeks postpartum.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Too G, Hill JB. Hypertensive crisis during pregnancy and postpartum period. Semin Perinatol. 2013;37(4):280-287'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-026',
    question: 'What imaging finding on head CT/MRI is characteristic of posterior reversible encephalopathy syndrome (PRES) in eclampsia?',
    options: [
      'Frontal lobe hemorrhage',
      'Parietal-occipital white matter edema',
      'Basal ganglia infarcts',
      'Cerebellar atrophy'
    ],
    correctIndex: 1,
    explanation: 'PRES shows bilateral parietal-occipital white matter vasogenic edema on MRI (T2/FLAIR hyperintensity). Results from hypertensive encephalopathy with loss of cerebral autoregulation. Usually reversible with blood pressure control and delivery. Symptoms: seizures, visual disturbances, altered mental status, headache.',
    references: [
      'Schwartz RB, et al. Preeclampsia-eclampsia: clinical and neuroradiographic correlates. Radiology. 2000;217(2):371-376',
      'Fugate JE, et al. Posterior reversible encephalopathy syndrome. J Clin Neurol. 2011;7(1):1-9'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-027',
    question: 'A patient with HELLP syndrome shows improving platelet count and liver enzymes on postpartum day 3. How long should she be monitored before discharge?',
    options: [
      'Can discharge immediately if stable',
      'Monitor until platelets >100,000/μL',
      'Monitor for at least 48-72 hours after delivery',
      'Monitor for 7 days postpartum'
    ],
    correctIndex: 2,
    explanation: 'HELLP syndrome often worsens in first 24-48 hours postpartum before improvement. Monitor for at least 48-72 hours postpartum. Platelet nadir typically occurs at 24-48 hours postdelivery. Risk of complications (hepatic rupture, stroke, DIC) highest in immediate postpartum period. Discharge when stable and improving.',
    references: [
      'Sibai BM. Diagnosis, controversies, and management of HELLP syndrome. Obstet Gynecol. 2004;103(5 Pt 1):981-991',
      'Haram K, et al. The HELLP syndrome: Clinical issues and management. BMC Pregnancy Childbirth. 2009;9:8'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-028',
    question: 'Which medication is safe for chronic blood pressure management postpartum in a breastfeeding mother with preeclampsia?',
    options: [
      'Enalapril',
      'Atenolol',
      'Methyldopa',
      'All of the above'
    ],
    correctIndex: 0,
    explanation: 'Enalapril (ACE inhibitor) and nifedipine are safe for breastfeeding and effective for postpartum hypertension management. Methyldopa is safe but less effective. Atenolol may cause bradycardia in infant. Avoid diuretics initially as they may decrease milk supply. ACE inhibitors contraindicated during pregnancy but SAFE postpartum/breastfeeding.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Podymow T, August P. Postpartum course of gestational hypertension and preeclampsia. Hypertens Pregnancy. 2010;29(3):294-300'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-029',
    question: 'What long-term health counseling should be provided to a patient who had severe preeclampsia at 30 weeks?',
    options: [
      'No long-term risks if BP normalizes',
      'Increased lifetime cardiovascular disease risk',
      'Only monitor in subsequent pregnancies',
      'Risk limited to kidney disease only'
    ],
    correctIndex: 1,
    explanation: 'Preeclampsia (especially severe/early-onset) increases lifetime risk of cardiovascular disease (CVD) 2-4x, chronic hypertension, stroke, and end-stage renal disease. Counsel on CVD risk reduction: healthy weight, exercise, smoking cessation, lipid screening. Consider cardiology referral. Repeat screening for chronic hypertension, diabetes.',
    references: [
      'ACOG Committee Opinion No. 736: Optimizing Postpartum Care. Obstet Gynecol. 2018;131(5):e140-e150',
      'Bellamy L, et al. Pre-eclampsia and risk of cardiovascular disease and cancer in later life. BMJ. 2007;335(7627):974'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pre-030',
    question: 'A patient develops right upper quadrant pain and nausea at 35 weeks with BP 165/105 mmHg. AST 850 U/L, ALT 920 U/L, platelets 85,000/μL. What is the most concerning potential complication?',
    options: [
      'Cholecystitis',
      'Subcapsular hepatic hematoma with rupture',
      'Acute pancreatitis',
      'Hepatic infarction'
    ],
    correctIndex: 1,
    explanation: 'This is HELLP syndrome with severe RUQ pain - concerning for subcapsular hepatic hematoma, which can rupture (life-threatening, up to 75% mortality). Requires imaging (CT/MRI), immediate delivery, surgical consultation. Signs: severe RUQ/epigastric pain, shoulder pain (diaphragm irritation), shock. May require hepatic artery embolization or surgical intervention.',
    references: [
      'Sibai BM. Diagnosis, controversies, and management of HELLP syndrome. Obstet Gynecol. 2004;103(5 Pt 1):981-991',
      'Reck T, et al. Spontaneous hepatic hemorrhage in HELLP syndrome. Eur J Obstet Gynecol Reprod Biol. 2001;99(1):57-70'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  }
];
