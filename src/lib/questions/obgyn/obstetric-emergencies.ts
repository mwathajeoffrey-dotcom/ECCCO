import { Question } from '../types';

export const obEmergenciesQuestions: Question[] = [
  {
    id: 'obe-001',
    question: 'A patient presents with sudden-onset severe abdominal pain and vaginal bleeding at 38 weeks. Exam shows umbilical cord prolapse at 7 cm dilation. What is the immediate management?',
    options: [
      'Immediate cesarean delivery',
      'Elevate presenting part, emergency cesarean',
      'Amnioinfusion',
      'Expectant management'
    ],
    correctIndex: 1,
    explanation: 'Umbilical cord prolapse is obstetric emergency requiring immediate delivery. Management: 1) Call for help, 2) Elevate presenting part manually (push fetal head up) or position patient in knee-chest/Trendelenburg, 3) Keep cord moist and warm, 4) Emergency cesarean (if not fully dilated) or operative vaginal delivery (if conditions met). Time to delivery critical - aim for <10 minutes.',
    references: [
      'ACOG Committee Opinion No. 773: The Use of Tocolysis in the Setting of Previable Birth. Obstet Gynecol. 2019;133(3):e189-e191',
      'Lin MG. Umbilical cord prolapse. Obstet Gynecol Surv. 2006;61(4):269-277'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-002',
    question: 'During delivery of the fetal head, the anterior shoulder becomes impacted behind the pubic symphysis. What is the first maneuver to attempt?',
    options: [
      'Zavanelli maneuver (cephalic replacement)',
      'McRoberts maneuver with suprapubic pressure',
      'Fundal pressure',
      'Immediate cesarean delivery'
    ],
    correctIndex: 1,
    explanation: 'Shoulder dystocia management follows HELPERR mnemonic: H-call for Help, E-Evaluate for episiotomy, L-Legs (McRoberts position - hyperflexion of maternal thighs), P-suprapubic Pressure (NOT fundal), E-Enter vagina (Rubin/Woods screw maneuvers), R-Remove posterior arm, R-Roll patient to all-fours. Start with McRoberts + suprapubic pressure (resolves 50-60% cases).',
    references: [
      'ACOG Practice Bulletin No. 178: Shoulder Dystocia. Obstet Gynecol. 2017;129(5):e123-e133',
      'Hoffman MK, et al. A comparison of obstetric maneuvers for the acute management of shoulder dystocia. Obstet Gynecol. 2011;117(6):1272-1278'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-003',
    question: 'A patient with PPROM at 28 weeks has greenish-brown amniotic fluid and fetal tachycardia (170 bpm). What is the most appropriate management?',
    options: [
      'Continue expectant management',
      'Amnioinfusion',
      'Immediate delivery with antibiotics',
      'Tocolysis and steroids'
    ],
    correctIndex: 2,
    explanation: 'This presentation suggests chorioamnionitis (fetal tachycardia, discolored fluid). Chorioamnionitis requires IMMEDIATE delivery regardless of gestational age plus broad-spectrum antibiotics (ampicillin + gentamicin ± clindamycin). Tocolytics contraindicated. Delay increases risk of maternal sepsis, fetal sepsis, and neonatal neurologic injury. Vaginal delivery preferred unless obstetric indications for cesarean.',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'Tita AT, Andrews WW. Diagnosis and management of clinical chorioamnionitis. Clin Perinatol. 2010;37(2):339-354'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-004',
    question: 'What is the most common cause of antepartum hemorrhage in the third trimester?',
    options: [
      'Placenta previa',
      'Placental abruption',
      'Vasa previa',
      'Unknown etiology'
    ],
    correctIndex: 3,
    explanation: 'Unknown etiology is most common cause of third-trimester bleeding (20-30% of cases), followed by placental abruption (30%), placenta previa (20%), vasa previa (rare <1%). Evaluation includes: maternal stabilization, fetal monitoring, speculum exam (NOT digital if previa suspected), ultrasound for placental location, Kleihauer-Betke if Rh-negative. Management based on gestational age and severity.',
    references: [
      'Francois KE, Foley MR. Antepartum and postpartum hemorrhage. In: Gabbe SG, et al. Obstetrics: Normal and Problem Pregnancies. 7th ed. 2017',
      'Oyelese Y, Ananth CV. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-005',
    question: 'A patient at 26 weeks with PPROM develops severe oligohydramnios (AFI 2 cm). What is the most concerning neonatal complication?',
    options: [
      'Necrotizing enterocolitis',
      'Pulmonary hypoplasia',
      'Intraventricular hemorrhage',
      'Retinopathy of prematurity'
    ],
    correctIndex: 1,
    explanation: 'Prolonged severe oligohydramnios from PPROM at <24 weeks carries high risk (up to 50%) of pulmonary hypoplasia (inadequate lung development) leading to respiratory failure. Critical period: 16-24 weeks (alveolar development). Also associated with limb contractures (Potter sequence), facial deformities. Survival depends on gestational age at PPROM and latency period. Requires extensive neonatal counseling.',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'Mercer BM. Preterm premature rupture of the membranes. Obstet Gynecol. 2003;101(1):178-193'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-006',
    question: 'During repair of fourth-degree laceration, which layer should be repaired first?',
    options: [
      'Anal mucosa',
      'External anal sphincter',
      'Vaginal mucosa',
      'Perineal skin'
    ],
    correctIndex: 0,
    explanation: 'Fourth-degree laceration repair sequence: 1) Rectal mucosa (3-0 or 4-0 absorbable suture, running or interrupted), 2) Internal anal sphincter (if identified), 3) External anal sphincter (end-to-end or overlapping technique with 2-0 or 3-0 delayed absorbable), 4) Perineal muscles, 5) Vaginal mucosa, 6) Perineal skin. Stool softeners, antibiotics considered. Follow-up for fecal incontinence symptoms.',
    references: [
      'ACOG Practice Bulletin No. 198: Prevention and Management of Obstetric Lacerations at Vaginal Delivery. Obstet Gynecol. 2018;132(3):e87-e102',
      'Sultan AH, et al. Third- and fourth-degree perineal tears. Green-top Guideline No. 29. RCOG. 2015'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-007',
    question: 'A patient develops sudden-onset chest pain, dyspnea, and hypoxia immediately postpartum. Vital signs: BP 85/50, HR 130, RR 32, O2 sat 88%. What is the most likely diagnosis?',
    options: [
      'Pulmonary embolism',
      'Amniotic fluid embolism',
      'Myocardial infarction',
      'Aortic dissection'
    ],
    correctIndex: 1,
    explanation: 'Amniotic fluid embolism (AFE): rare (1:10,000-40,000) but catastrophic. Classic triad: sudden hypoxia/respiratory distress, cardiovascular collapse, DIC. Occurs during labor/delivery or immediately postpartum. Management: aggressive resuscitation (airway/oxygen, IV access, fluid/pressors), treat DIC (blood products), emergency delivery if undelivered. Mortality 20-60%. Survivors may have neurologic sequelae.',
    references: [
      'ACOG Practice Bulletin No. 211: Critical Care in Pregnancy. Obstet Gynecol. 2019;133(5):e303-e319',
      'Clark SL, et al. Amniotic fluid embolism: analysis of the national registry. Am J Obstet Gynecol. 1995;172(4 Pt 1):1158-1167'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-008',
    question: 'What is the definition of postpartum hemorrhage in vaginal delivery?',
    options: [
      'Blood loss >300 mL',
      'Blood loss >500 mL or causing hemodynamic instability',
      'Blood loss >1000 mL',
      'Any bleeding requiring transfusion'
    ],
    correctIndex: 1,
    explanation: 'Postpartum hemorrhage (PPH) definitions: Vaginal delivery - blood loss ≥500 mL OR any amount causing hemodynamic instability. Cesarean delivery - ≥1000 mL OR hemodynamic instability. Visual estimation underestimates blood loss. Quantitative blood loss (weigh pads/drapes) recommended. Severe PPH: ≥1000 mL or transfusion required. Most common cause: uterine atony (80%).',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'WHO recommendations for the prevention and treatment of postpartum haemorrhage. WHO. 2012'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-009',
    question: 'During management of postpartum hemorrhage from uterine atony, uterine massage and oxytocin have failed. What is the next medication?',
    options: [
      'Methergine (methylergonovine)',
      'Misoprostol',
      'Tranexamic acid',
      'Either A or B'
    ],
    correctIndex: 3,
    explanation: 'PPH from atony - medication sequence: 1) Oxytocin 10-40 units in 1L NS at 250 mL/hr OR 10 units IM, 2) Methergine 0.2 mg IM q2-4h (contraindicated in hypertension) OR Misoprostol 800-1000 mcg rectal/sublingual, 3) Hemabate (carboprost) 250 mcg IM q15min (max 8 doses, contraindicated in asthma), 4) Consider tranexamic acid 1g IV over 10 minutes. Concurrent bimanual massage, empty bladder.',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'WHO recommendations for prevention and treatment of postpartum haemorrhage. WHO. 2012'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-010',
    question: 'A patient with postpartum hemorrhage requires intrauterine balloon tamponade. What volume should the balloon be filled to?',
    options: [
      '50-100 mL',
      '150-250 mL',
      '300-500 mL or until bleeding stops',
      'Fill to maximum capacity'
    ],
    correctIndex: 2,
    explanation: 'Intrauterine balloon tamponade (Bakri balloon, BT-Cath): Fill with 300-500 mL saline OR until bleeding controlled. Success rate 80-90% for atony. Insert under ultrasound guidance if available. Leave vaginal component loose to monitor ongoing bleeding. Remove after 12-24 hours. If fails: consider uterine artery embolization, surgical intervention (B-Lynch suture, hysterectomy).',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Georgiou C. Balloon tamponade in the management of postpartum haemorrhage. BJOG. 2009;116(6):748-757'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-011',
    question: 'What is the most important risk factor for uterine rupture in a patient attempting TOLAC (trial of labor after cesarean)?',
    options: [
      'Maternal age >35',
      'Previous classical (vertical) uterine incision',
      'Twin gestation',
      'Obesity'
    ],
    correctIndex: 1,
    explanation: 'Classical or T-shaped uterine incision is ABSOLUTE contraindication to TOLAC due to high rupture risk (4-9%). Low transverse incision rupture risk ~0.5-1%. Risk factors for rupture with low transverse scar: short inter-pregnancy interval (<18 months), labor induction (especially with prostaglandins), no prior vaginal delivery, multiple prior cesareans, single-layer closure. Signs: fetal heart rate abnormalities, abdominal pain, vaginal bleeding.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Guise JM, et al. Vaginal birth after cesarean: new insights. Evid Rep Technol Assess. 2010;(191):1-397'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-012',
    question: 'A patient attempting VBAC develops sudden onset of severe abdominal pain, vaginal bleeding, and Category III fetal heart tracing. What is the most likely diagnosis and management?',
    options: [
      'Placental abruption - consider cesarean',
      'Uterine rupture - immediate laparotomy',
      'Cervical laceration - vaginal repair',
      'Normal labor - expectant management'
    ],
    correctIndex: 1,
    explanation: 'Uterine rupture presentation: sudden severe pain (may lose epidural effect), vaginal bleeding, abnormal fetal heart rate (bradycardia, late/variable decelerations), loss of station, palpable fetal parts abdominally, maternal shock. Requires IMMEDIATE laparotomy, hysterectomy often necessary. Maternal mortality 1-2%, fetal mortality 6-30% if complete rupture. This is obstetric emergency.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Holmgren C, et al. Uterine rupture associated with VBAC. Obstet Gynecol Surv. 2012;67(8):503-516'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-013',
    question: 'What is the most sensitive sign of impending uterine rupture during TOLAC?',
    options: [
      'Maternal tachycardia',
      'Abnormal fetal heart rate pattern',
      'Loss of epidural pain relief',
      'Vaginal bleeding'
    ],
    correctIndex: 1,
    explanation: 'Fetal heart rate abnormalities (prolonged decelerations, bradycardia, severe variable decelerations) are MOST SENSITIVE (but not specific) sign of uterine rupture. May be ONLY sign. Other signs: abdominal pain (sudden, severe, or loss of epidural effect), vaginal bleeding, maternal shock, loss of fetal station, palpable fetal parts. High index of suspicion during TOLAC essential.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean. Obstet Gynecol. 2019;133(2):e110-e127',
      'Leung AS, et al. Uterine rupture after previous cesarean delivery: maternal and fetal consequences. Am J Obstet Gynecol. 1993;169(4):945-950'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-014',
    question: 'A patient presents at 35 weeks with painless bright red vaginal bleeding. Ultrasound shows complete placenta previa. What is the appropriate management?',
    options: [
      'Immediate delivery',
      'Digital cervical exam to assess labor',
      'Expectant management with pelvic rest, deliver at 36-37 weeks',
      'Tocolysis to prevent preterm delivery'
    ],
    correctIndex: 2,
    explanation: 'Stable placenta previa with bleeding: hospitalization vs outpatient depends on bleeding severity, access to care, and compliance. Pelvic rest (no intercourse, tampons, digital exams). Corticosteroids if <34 weeks. Delivery timing: 36-37+6 weeks for complete previa (balance bleeding risk vs prematurity). Never digital exam if previa (can precipitate massive hemorrhage). Have blood products available.',
    references: [
      'ACOG Practice Bulletin No. 204: Fetal Growth Restriction. Obstet Gynecol. 2019;133(2):e97-e109',
      'Silver RM, et al. Abnormal placentation: placenta previa, vasa previa, and placenta accreta. Obstet Gynecol. 2015;126(3):654-668'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-015',
    question: 'What is the "double setup" procedure in obstetrics?',
    options: [
      'Having two surgeons for cesarean delivery',
      'Speculum exam in operating room with preparations for immediate cesarean if needed',
      'Simultaneous vaginal and cesarean preparation',
      'Backup blood bank supply'
    ],
    correctIndex: 1,
    explanation: 'Double setup: historically used for marginal previa - sterile speculum exam performed in operating room with complete preparations for emergency cesarean if significant bleeding occurs. Rarely performed now due to improved ultrasound diagnosis. If previa present on imaging, proceed directly to cesarean without cervical examination. Term used for being prepared for immediate surgical intervention.',
    references: [
      'Cunningham FG, et al. Williams Obstetrics, 25th Edition. Chapter 41: Obstetrical Hemorrhage',
      'ACOG Practice Bulletin No. 204: Fetal Growth Restriction. Obstet Gynecol. 2019;133(2):e97-e109'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-016',
    question: 'A patient develops uterine inversion immediately after placental delivery. What is the immediate management?',
    options: [
      'Attempt immediate manual replacement before cervix contracts',
      'Administer uterotonic agents first',
      'Emergency hysterectomy',
      'Wait for operating room availability'
    ],
    correctIndex: 0,
    explanation: 'Uterine inversion (1:2,000-20,000): immediate manual replacement essential before cervical ring contracts. Johnson maneuver: grasp fundus with hand, push up through vagina toward umbilicus. If fails: use tocolytics (terbutaline, nitroglycerin) to relax uterus, then attempt replacement. After replacement: give uterotonics. Delay = shock, hemorrhage. May require laparotomy (Huntington/Haultain procedures).',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Witteveen T, et al. Puerperal uterine inversion in the Netherlands: a nationwide cohort study. Acta Obstet Gynecol Scand. 2013;92(3):334-337'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-017',
    question: 'What is the recommended ratio for massive transfusion protocol in obstetric hemorrhage?',
    options: [
      '1:1:1 (RBC:FFP:Platelets)',
      '2:1:1 (RBC:FFP:Platelets)',
      '3:1:1 (RBC:FFP:Platelets)',
      '1:2:1 (RBC:FFP:Platelets)'
    ],
    correctIndex: 0,
    explanation: 'Massive transfusion protocol uses 1:1:1 ratio (packed RBC : fresh frozen plasma : platelets) to prevent/treat coagulopathy. Obstetric pack typically: 4-6 units pRBCs, 4 units FFP, 1 apheresis platelet unit (or 4-6 platelet concentrates). Add cryoprecipitate if fibrinogen <200 mg/dL. Tranexamic acid (1g IV) if PPH within 3 hours. Goal: maintain Hgb >7, platelets >50,000, fibrinogen >200.',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Pacheco LD, et al. An update on the use of massive transfusion protocols in obstetrics. Am J Obstet Gynecol. 2016;214(3):340-344'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-018',
    question: 'A neonate is delivered with Apgar scores 2 at 1 minute and 4 at 5 minutes despite resuscitation. What is the next appropriate step?',
    options: [
      'Declare stillbirth',
      'Continue resuscitation and check 10-minute Apgar',
      'Stop resuscitation',
      'Hypothermia protocol only'
    ],
    correctIndex: 1,
    explanation: 'Continue neonatal resuscitation with Apgar scores at 1, 5, and 10 minutes (extend to 15, 20 minutes if resuscitation continues). Apgar alone does NOT determine resuscitation decisions - follow NRP guidelines. Consider therapeutic hypothermia if criteria met (≥36 weeks, perinatal hypoxia-ischemia, moderate-severe encephalopathy). Extended low Apgars associated with neurologic injury but not definitive for prognosis.',
    references: [
      'ACOG Committee Opinion No. 644: The Apgar Score. Obstet Gynecol. 2015;126(4):e52-e55',
      'American Academy of Pediatrics. Neonatal Resuscitation Program (NRP) 8th Edition. 2020'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-019',
    question: 'What is the time frame for administering tranexamic acid to be effective in postpartum hemorrhage?',
    options: [
      'Within 1 hour of delivery',
      'Within 3 hours of bleeding onset',
      'Within 6 hours of delivery',
      'Any time in first 24 hours'
    ],
    correctIndex: 1,
    explanation: 'Tranexamic acid (TXA) most effective when given within 3 hours of bleeding onset. Dose: 1 gram IV over 10 minutes, may repeat once after 30 minutes if needed. WOMAN trial: reduced death from bleeding by 19% overall, 31% if given <3 hours. Mechanism: antifibrinolytic (inhibits plasminogen activation). Side effects: nausea, rare thromboembolic events.',
    references: [
      'WOMAN Trial Collaborators. Effect of early tranexamic acid administration on mortality, hysterectomy, and other morbidities in women with postpartum haemorrhage. Lancet. 2017;389(10084):2105-2116',
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-020',
    question: 'During cesarean delivery for placenta previa, the placenta is adherent and cannot be removed. What is the most appropriate management?',
    options: [
      'Forcefully remove placenta manually',
      'Suspect placenta accreta - call for help, consider leaving placenta in situ',
      'Give uterotonics and try again',
      'Immediate hysterectomy'
    ],
    correctIndex: 1,
    explanation: 'Placenta accreta spectrum suspected if placenta cannot be removed or attempts cause significant bleeding. Management: STOP attempting removal (worsens bleeding), call for experienced help (MFM, GYN-onc, urology, vascular surgery), blood bank notification. Options: cesarean hysterectomy (definitive) or conservative management (leave placenta in situ - selected cases). Accreta often diagnosed prenatally with ultrasound/MRI.',
    references: [
      'ACOG Committee Opinion No. 529: Placenta Accreta. Obstet Gynecol. 2012;120(1):207-211',
      'Silver RM, et al. Maternal morbidity associated with multiple repeat cesarean deliveries. Obstet Gynecol. 2006;107(6):1226-1232'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-021',
    question: 'A patient with severe preeclampsia at 37 weeks develops repetitive late decelerations during labor induction. What is the appropriate management?',
    options: [
      'Continue induction with close monitoring',
      'Intrauterine resuscitation measures, then cesarean if not improved',
      'Immediate cesarean without resuscitation',
      'Stop oxytocin and expectant management'
    ],
    correctIndex: 1,
    explanation: 'Recurrent late decelerations (Category II or III tracing) require intrauterine resuscitation: 1) Maternal repositioning (left lateral), 2) IV fluid bolus, 3) Oxygen (if maternal hypoxia), 4) Reduce/stop oxytocin, 5) Treat maternal hypotension if present, 6) Consider tocolysis (terbutaline 0.25mg SQ). If pattern persists or worsens to Category III, proceed with expedited delivery (operative vaginal if appropriate, otherwise cesarean).',
    references: [
      'ACOG Practice Bulletin No. 106: Intrapartum Fetal Heart Rate Monitoring. Obstet Gynecol. 2009;114(1):192-202',
      'Macones GA, et al. The 2008 National Institute of Child Health and Human Development workshop report on electronic fetal monitoring. Obstet Gynecol. 2008;112(3):661-666'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-022',
    question: 'What is the most common cause of maternal mortality in the United States?',
    options: [
      'Postpartum hemorrhage',
      'Cardiovascular disease',
      'Thromboembolic disease',
      'Infection'
    ],
    correctIndex: 1,
    explanation: 'Cardiovascular disease is leading cause of pregnancy-related mortality in US (>15% of deaths), including cardiomyopathy, MI, congenital heart disease. Other leading causes: hemorrhage, infection/sepsis, thromboembolism, hypertensive disorders, amniotic fluid embolism. Over 50% pregnancy-related deaths occur postpartum. Racial disparities exist (Black women 2-3x higher mortality). Many deaths preventable with timely recognition/intervention.',
    references: [
      'ACOG Committee Opinion No. 736: Optimizing Postpartum Care. Obstet Gynecol. 2018;131(5):e140-e150',
      'Creanga AA, et al. Pregnancy-related mortality in the United States, 2011-2013. Obstet Gynecol. 2017;130(2):366-373'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-023',
    question: 'A patient develops sudden dyspnea, chest pain, and hypoxia on postpartum day 3. Wells score suggests high probability of pulmonary embolism. What is the appropriate management?',
    options: [
      'Wait for confirmatory imaging before treatment',
      'Start therapeutic anticoagulation immediately while arranging imaging',
      'Give aspirin and observe',
      'Discharge with outpatient follow-up'
    ],
    correctIndex: 1,
    explanation: 'High clinical suspicion for PE: start therapeutic anticoagulation IMMEDIATELY (don\'t wait for imaging). Low molecular weight heparin (enoxaparin 1mg/kg SQ q12h) or unfractionated heparin. Then obtain imaging: CT pulmonary angiography (CTPA) or V/Q scan. PE leading cause of maternal mortality in developed countries. Pregnancy/postpartum = 5x increased VTE risk. D-dimer not useful (elevated in normal pregnancy).',
    references: [
      'ACOG Practice Bulletin No. 196: Thromboembolism in Pregnancy. Obstet Gynecol. 2018;132(1):e1-e17',
      'Leung AN, et al. An assessment of the utility of chest radiographs and helical CT in pregnant patients with suspected pulmonary embolism. J Comput Assist Tomogr. 2006;30(2):226-231'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-024',
    question: 'What is the modified shock index in pregnancy, and what value indicates severe maternal morbidity risk?',
    options: [
      'HR/BP; >0.7 concerning',
      'HR/systolic BP; >0.9 concerning',
      'Systolic BP/HR; <100 concerning',
      'MAP/HR; <50 concerning'
    ],
    correctIndex: 1,
    explanation: 'Shock Index (SI) = Heart Rate ÷ Systolic Blood Pressure. Normal pregnancy SI: 0.7-0.9. SI >0.9 indicates hemodynamic instability and increased risk of severe maternal morbidity (ICU admission, transfusion, maternal death). SI >1.4 = critical. More sensitive than vital signs alone for identifying occult shock in obstetric hemorrhage. Activate massive transfusion protocol if SI >0.9 with ongoing bleeding.',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Le Bas A, et al. Shock index in obstetrics: a review. Aust N Z J Obstet Gynaecol. 2015;55(3):209-213'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-025',
    question: 'A patient presents at 32 weeks with sudden severe abdominal pain following motor vehicle collision. Fetal heart rate shows Category III pattern. Ultrasound shows free fluid in abdomen. What is the diagnosis and management?',
    options: [
      'Placental abruption - expectant management',
      'Hepatic rupture - immediate laparotomy',
      'Uterine rupture - immediate cesarean delivery',
      'Splenic rupture - transfusion and observation'
    ],
    correctIndex: 2,
    explanation: 'Traumatic uterine rupture presentation: severe abdominal pain, Category III tracing, hemoperitoneum (free fluid), shock. More common with blunt trauma than previously appreciated. Requires immediate laparotomy with delivery. Fetal mortality high (>50%). Also assess for maternal injuries (splenic/hepatic injury, pelvic fracture). All pregnant trauma patients >20 weeks need continuous fetal monitoring ≥4 hours minimum.',
    references: [
      'ACOG Committee Opinion No. 723: Guidelines for Diagnostic Imaging During Pregnancy and Lactation. Obstet Gynecol. 2017;130(4):e210-e216',
      'Jain V, et al. Guidelines for the management of a pregnant trauma patient. J Obstet Gynaecol Can. 2015;37(6):553-571'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-026',
    question: 'What is the appropriate RhoGAM dose for a Rh-negative patient with massive fetomaternal hemorrhage?',
    options: [
      'Standard 300 mcg dose',
      'Double dose (600 mcg)',
      'Dose based on Kleihauer-Betke test results',
      'RhoGAM not needed if >28 weeks'
    ],
    correctIndex: 2,
    explanation: 'Massive fetomaternal hemorrhage requires Kleihauer-Betke test to quantify fetal blood volume. Calculate RhoGAM dose: (fetal blood volume in mL ÷ 30) + 1 vial. Standard 300 mcg dose covers up to 30 mL fetal whole blood (15 mL RBCs). For trauma, abruption, or clinical suspicion of large hemorrhage, check Kleihauer-Betke and adjust dose accordingly. Recheck in 48-72 hours to ensure adequate coverage.',
    references: [
      'ACOG Practice Bulletin No. 181: Prevention of Rh D Alloimmunization. Obstet Gynecol. 2017;130(2):e57-e70',
      'Moise KJ. Fetal anemia due to non-Rhesus-D red-cell alloimmunization. Semin Fetal Neonatal Med. 2008;13(4):207-214'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-027',
    question: 'During vacuum-assisted delivery, what is the maximum number of "pop-offs" (detachments) allowed before abandoning the attempt?',
    options: [
      '1',
      '2',
      '3',
      'No limit'
    ],
    correctIndex: 2,
    explanation: 'Vacuum delivery guidelines: Maximum 3 pop-offs (cup detachments), 20-30 minutes total application time, 3 contractions/pulls maximum. If no descent or delivery not imminent, abandon attempt and proceed to cesarean. Sequential use of vacuum then forceps NOT recommended (increased trauma). Vacuum contraindications: <34 weeks (intraventricular hemorrhage risk), face/breech presentation, suspected bleeding disorder.',
    references: [
      'ACOG Practice Bulletin No. 154: Operative Vaginal Delivery. Obstet Gynecol. 2015;126(5):e56-e65',
      'Bailey PE. The disappearing art of instrumental delivery: time to reverse the trend. Int J Gynaecol Obstet. 2005;91(1):89-96'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-028',
    question: 'A patient at 24 weeks presents with painless vaginal bleeding and passage of tissue. Ultrasound shows dilated cervix with membranes bulging into vagina. What is the diagnosis?',
    options: [
      'Threatened abortion',
      'Inevitable abortion',
      'Cervical insufficiency',
      'Placental abruption'
    ],
    correctIndex: 1,
    explanation: 'Inevitable abortion: cervical dilation with rupture of membranes and/or passage of tissue at previable gestational age. At 24 weeks (potential viability), this is complicated scenario. Management options: expectant management (high infection risk), induction of labor, or D&E. Cervical insufficiency presents with painless dilation BEFORE membrane rupture. Discuss outcomes, neonatal prognosis if resuscitation attempted.',
    references: [
      'ACOG Practice Bulletin No. 200: Early Pregnancy Loss. Obstet Gynecol. 2018;132(5):e197-e207',
      'ACOG Committee Opinion No. 700: Methods for Estimating the Due Date. Obstet Gynecol. 2017;129(5):e150-e154'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-029',
    question: 'What intervention reduces the risk of brachial plexus injury during shoulder dystocia?',
    options: [
      'Fundal pressure',
      'Avoiding excessive traction and using appropriate maneuvers',
      'Routine episiotomy',
      'Immediate clavicle fracture'
    ],
    correctIndex: 1,
    explanation: 'Prevention of brachial plexus injury: avoid excessive downward traction on fetal head, use appropriate maneuvers (McRoberts, suprapubic pressure, rotational maneuvers, posterior arm delivery), avoid fundal pressure (worsens impaction). Most injuries (90%) resolve spontaneously. Permanent injury in ~10%. Document head-to-body delivery time, maneuvers used, personnel present. Shoulder dystocia often unpredictable (50% occur without risk factors).',
    references: [
      'ACOG Practice Bulletin No. 178: Shoulder Dystocia. Obstet Gynecol. 2017;129(5):e123-e133',
      'Gherman RB, et al. Analysis of McRoberts\' maneuver by x-ray pelvimetry. Obstet Gynecol. 2000;95(1):43-47'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  },
  {
    id: 'obe-030',
    question: 'A patient at 18 weeks with PPROM desires expectant management. What counseling should be provided?',
    options: [
      'Excellent prognosis with appropriate management',
      'High risk of chorioamnionitis, pulmonary hypoplasia, and perinatal mortality',
      'Routine expectant management until 34 weeks',
      'Cerclage will prevent complications'
    ],
    correctIndex: 1,
    explanation: 'PPROM <24 weeks has grave prognosis: perinatal mortality 40-90%, pulmonary hypoplasia risk 50% (if PPROM <20 weeks), chorioamnionitis 40-50%, limb contractures. Latency inversely related to gestational age at PPROM. Survival depends on: gestational age at PPROM, latency achieved, absence of infection. Requires extensive counseling about outcomes. Options: expectant management, induction of labor, or termination where legal.',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'Mercer BM, et al. Outcome of twin gestation complicated by preterm premature rupture of membranes. Am J Perinatol. 2000;17(3):145-150'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-emergencies',
    category: 'obstetric'
  }
];
