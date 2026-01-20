import { Question } from '../types';

export const pretermLabourQuestions: Question[] = [
  {
    id: 'ptl-001',
    question: 'A 28-year-old G2P1 at 32 weeks presents with regular contractions every 5 minutes and cervical dilation of 3 cm. What is the first-line tocolytic agent?',
    options: [
      'Magnesium sulfate',
      'Nifedipine',
      'Terbutaline',
      'Indomethacin'
    ],
    correctIndex: 1,
    explanation: 'Nifedipine (calcium channel blocker) is first-line tocolytic: 20 mg PO loading dose, then 10-20 mg q4-6h. Effective, well-tolerated, oral administration. Delays delivery 48 hours for steroid administration. Contraindicated in hypotension or cardiac disease. Beta-agonists (terbutaline) have more side effects.',
    references: [
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164',
      'Haas DM, et al. Tocolytic therapy for preterm delivery. Cochrane Database Syst Rev. 2012;11:CD003246'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-002',
    question: 'At what gestational age is betamethasone administration most beneficial for fetal lung maturity?',
    options: [
      '20-23 weeks',
      '24-34 weeks',
      '35-37 weeks',
      'After 37 weeks'
    ],
    correctIndex: 1,
    explanation: 'Antenatal corticosteroids (betamethasone 12 mg IM x 2 doses 24 hours apart OR dexamethasone 6 mg IM q12h x 4 doses) given between 24-34 weeks reduce neonatal morbidity/mortality by 30-50%: respiratory distress syndrome, intraventricular hemorrhage, necrotizing enterocolitis. Single rescue course may be given if >14 days from initial course.',
    references: [
      'ACOG Committee Opinion No. 713: Antenatal Corticosteroid Therapy for Fetal Maturation. Obstet Gynecol. 2017;130(2):e102-e109',
      'Roberts D, et al. Antenatal corticosteroids for accelerating fetal lung maturation. Cochrane Database Syst Rev. 2017;3:CD004454'
    ],
    difficulty: 'easy',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-003',
    question: 'What is the primary indication for magnesium sulfate administration in preterm labor at 28 weeks?',
    options: [
      'Tocolysis',
      'Fetal neuroprotection',
      'Maternal seizure prophylaxis',
      'Cervical ripening'
    ],
    correctIndex: 1,
    explanation: 'Magnesium sulfate for fetal neuroprotection (<32 weeks): reduces risk of cerebral palsy by 30-40% and gross motor dysfunction. Dose: 4-6g IV loading dose, then 1-2g/hr maintenance until delivery or 12-24 hours. Not effective tocolytic (no longer recommended for this). Separate indication from preeclampsia seizure prophylaxis.',
    references: [
      'ACOG Committee Opinion No. 652: Magnesium Sulfate Use in Obstetrics. Obstet Gynecol. 2016;127(1):e52-e53',
      'Doyle LW, et al. Magnesium sulphate for women at risk of preterm birth for neuroprotection of the fetus. Cochrane Database Syst Rev. 2009;1:CD004661'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-004',
    question: 'A patient at 26 weeks with preterm labor receives betamethasone. When does maximum fetal benefit occur?',
    options: [
      'Immediately after first dose',
      '24 hours after first dose',
      '48 hours after completing course',
      '7 days after completing course'
    ],
    correctIndex: 1,
    explanation: 'Corticosteroid benefit begins 24 hours after first dose, peaks at 48 hours, and lasts 7 days. Maximum benefit requires completing full course (2 doses 24 hours apart). If delivery imminent, give first dose immediately - even partial course beneficial. Consider rescue dose if >14 days from initial course and still <34 weeks.',
    references: [
      'ACOG Committee Opinion No. 713: Antenatal Corticosteroid Therapy. Obstet Gynecol. 2017;130(2):e102-e109',
      'Roberts D, et al. Antenatal corticosteroids for accelerating fetal lung maturation. Cochrane Database Syst Rev. 2017;3:CD004454'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-005',
    question: 'Which statement about indomethacin use as a tocolytic is correct?',
    options: [
      'Safe throughout pregnancy',
      'Should not be used beyond 32 weeks gestation',
      'First-line agent for all preterm labor',
      'No fetal risks'
    ],
    correctIndex: 1,
    explanation: 'Indomethacin (NSAID) is effective tocolytic but use limited to <32 weeks and <48-72 hours duration due to risks: premature closure of ductus arteriosus (>32 weeks), oligohydramnios (reversible), neonatal pulmonary hypertension, necrotizing enterocolitis. Requires fetal echo monitoring if used >48 hours. Dose: 50-100 mg loading, then 25-50 mg q6h.',
    references: [
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164',
      'Koren G, et al. Nonsteroidal antiinflammatory drugs during third trimester and risk of premature closure of ductus arteriosus. Lancet. 2006;368(9550):1749-1753'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-006',
    question: 'What is the role of prophylactic cerclage in preventing preterm birth?',
    options: [
      'Indicated for all multiple gestations',
      'Indicated for history of preterm birth with short cervix (<25mm before 24 weeks)',
      'No proven benefit',
      'Standard of care for all nulliparous women'
    ],
    correctIndex: 1,
    explanation: 'Cerclage indications: 1) History-indicated: ≥3 prior spontaneous preterm births or 2nd trimester losses, 2) Ultrasound-indicated: prior spontaneous preterm birth AND short cervix (<25mm) before 24 weeks, 3) Physical exam-indicated: cervical dilation in 2nd trimester without contractions. Placed 12-14 weeks, removed 36-37 weeks.',
    references: [
      'ACOG Practice Bulletin No. 142: Cerclage for the Management of Cervical Insufficiency. Obstet Gynecol. 2014;123(2 Pt 1):372-379',
      'Berghella V, et al. Cerclage for short cervix on ultrasonography. Obstet Gynecol. 2011;117(3):663-671'
    ],
    difficulty: 'hard',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-007',
    question: 'A patient at 30 weeks with intact membranes and preterm contractions has positive fetal fibronectin. What is the significance?',
    options: [
      'Definitive diagnosis of preterm labor',
      'Negative predictive value >99% for delivery within 7-14 days',
      'No clinical utility',
      'Indicates infection requiring antibiotics'
    ],
    correctIndex: 1,
    explanation: 'Fetal fibronectin (fFN) test (22-34 weeks): NEGATIVE result highly predictive (>99% NPV) of NOT delivering within 7-14 days - useful to avoid unnecessary interventions. Positive result has low PPV (~20-30%) but warrants close monitoring. Test between 22-34+6 weeks in symptomatic women with intact membranes and cervical dilation <3cm.',
    references: [
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164',
      'Honest H, et al. Accuracy of cervical transvaginal sonography in predicting preterm birth. Ultrasound Obstet Gynecol. 2003;22(3):305-322'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-008',
    question: 'What cervical length on transvaginal ultrasound at 20 weeks is associated with increased preterm birth risk?',
    options: [
      '<40 mm',
      '<30 mm',
      '<25 mm',
      '<15 mm'
    ],
    correctIndex: 2,
    explanation: 'Cervical length <25 mm on transvaginal ultrasound at 16-24 weeks indicates increased preterm birth risk. Management depends on history: Singleton with prior spontaneous preterm birth: offer cerclage or vaginal progesterone. Singleton without prior preterm birth: vaginal progesterone 200mg daily reduces risk. Twins: progesterone NOT effective. Screen at 18-24 weeks.',
    references: [
      'ACOG Practice Bulletin No. 142: Cerclage for Cervical Insufficiency. Obstet Gynecol. 2014;123(2 Pt 1):372-379',
      'Iams JD, et al. The length of the cervix and the risk of spontaneous premature delivery. N Engl J Med. 1996;334(9):567-572'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-009',
    question: 'When should Group B Streptococcus (GBS) prophylaxis be administered in preterm labor?',
    options: [
      'Only if prior positive culture',
      'All women in preterm labor <37 weeks with unknown GBS status',
      'Never in preterm labor',
      'Only if membranes ruptured'
    ],
    correctIndex: 1,
    explanation: 'GBS prophylaxis indicated in preterm labor <37 weeks if: 1) Prior infant with invasive GBS disease, 2) GBS bacteriuria current pregnancy, 3) Positive GBS culture current pregnancy, 4) UNKNOWN GBS status (insufficient time for rapid testing). If negative culture within 5 weeks, no prophylaxis needed. Penicillin G 5 million units IV loading, then 2.5-3 million units q4h.',
    references: [
      'ACOG Committee Opinion No. 797: Prevention of Group B Streptococcal Early-Onset Disease. Obstet Gynecol. 2020;135(2):e51-e72',
      'Verani JR, et al. Prevention of perinatal group B streptococcal disease. MMWR Recomm Rep. 2010;59(RR-10):1-36'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-010',
    question: 'A patient at 31 weeks with preterm labor is receiving nifedipine. What maternal side effect should be monitored?',
    options: [
      'Hypertension',
      'Bradycardia',
      'Hypotension and tachycardia',
      'Hyperglycemia'
    ],
    correctIndex: 2,
    explanation: 'Nifedipine (calcium channel blocker) side effects: maternal hypotension, reflex tachycardia, headache, flushing. Monitor BP and HR. Contraindications: hypotension, cardiac disease, concurrent magnesium sulfate (increased risk of cardiovascular side effects). Less maternal side effects than beta-agonists (terbutaline - causes tachycardia, pulmonary edema).',
    references: [
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164',
      'Haas DM, et al. Tocolytic therapy for preterm delivery. Cochrane Database Syst Rev. 2012;11:CD003246'
    ],
    difficulty: 'easy',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-011',
    question: 'What is the maximum duration recommended for tocolytic therapy in preterm labor?',
    options: [
      '24 hours',
      '48 hours',
      '7 days',
      '14 days'
    ],
    correctIndex: 1,
    explanation: 'Tocolytics should be used for 48 hours maximum - goal is to delay delivery for steroid administration and maternal transport to tertiary center, NOT to stop preterm labor indefinitely. Prolonged tocolysis does not improve neonatal outcomes and increases maternal risk. If contractions persist after 48 hours despite tocolytics, delivery likely inevitable.',
    references: [
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164',
      'Haas DM, et al. Tocolytic therapy for preterm delivery. Cochrane Database Syst Rev. 2012;11:CD003246'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-012',
    question: 'A patient with preterm contractions at 35 weeks is found to have cervical dilation of 4 cm. What management is most appropriate?',
    options: [
      'Administer tocolytics and corticosteroids',
      'Proceed with delivery without intervention',
      'Give corticosteroids and expectant management',
      'Emergency cesarean delivery'
    ],
    correctIndex: 1,
    explanation: 'At 35 weeks with advanced cervical dilation (4 cm), proceed with delivery. Late preterm corticosteroids (34+0 to 36+6 weeks) may be considered if likely to deliver within 7 days and no prior course, but with 4 cm dilation, delivery is imminent. Tocolytics not indicated ≥34 weeks. No cesarean indication unless obstetric factors present.',
    references: [
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164',
      'ACOG Committee Opinion No. 764: Medically Indicated Late-Preterm and Early-Term Deliveries. Obstet Gynecol. 2019;133(2):e151-e155'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-013',
    question: 'What is the role of vaginal progesterone in preventing preterm birth?',
    options: [
      'Effective in all pregnancies',
      'Reduces preterm birth in women with short cervix (<25mm) and no prior preterm birth',
      'Only effective in multiple gestations',
      'No proven benefit'
    ],
    correctIndex: 1,
    explanation: 'Vaginal progesterone (200 mg nightly) reduces preterm birth by ~45% in singleton pregnancies with short cervix (<25mm at 16-24 weeks) WITHOUT prior spontaneous preterm birth. Alternative to cerclage. For women WITH prior spontaneous preterm birth: 17-hydroxyprogesterone caproate (17-OHP, Makena) 250 mg IM weekly starting 16-20 weeks until 36 weeks. NOT effective in twins.',
    references: [
      'ACOG Committee Opinion No. 419: Use of Progesterone to Reduce Preterm Birth. Obstet Gynecol. 2008;112(4):963-965',
      'Romero R, et al. Vaginal progesterone in women with an asymptomatic sonographic short cervix. Am J Obstet Gynecol. 2012;206(2):124.e1-19'
    ],
    difficulty: 'hard',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-014',
    question: 'A patient at 29 weeks with preterm labor receives magnesium sulfate for neuroprotection. At what gestational age is this no longer indicated?',
    options: [
      '28 weeks',
      '30 weeks',
      '32 weeks',
      '34 weeks'
    ],
    correctIndex: 2,
    explanation: 'Magnesium sulfate for fetal neuroprotection is indicated <32 weeks gestation when delivery is anticipated within 24 hours. Reduces cerebral palsy risk by 30-40%. Dose: 4-6g IV loading, then 1-2g/hr maintenance. Continue until delivery or 12-24 hours maximum. Not indicated ≥32 weeks due to lower risk of severe neurologic injury at later gestational ages.',
    references: [
      'ACOG Committee Opinion No. 652: Magnesium Sulfate Use in Obstetrics. Obstet Gynecol. 2016;127(1):e52-e53',
      'Doyle LW, et al. Magnesium sulphate for women at risk of preterm birth. Cochrane Database Syst Rev. 2009;1:CD004661'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-015',
    question: 'Which condition is a contraindication to tocolytic therapy?',
    options: [
      'Gestational age 30 weeks',
      'Twin gestation',
      'Chorioamnionitis',
      'Maternal obesity'
    ],
    correctIndex: 2,
    explanation: 'Absolute contraindications to tocolysis: chorioamnionitis, fetal demise, lethal fetal anomaly, nonreassuring fetal status, severe preeclampsia/eclampsia, maternal hemodynamic instability, placental abruption. Relative contraindications: advanced cervical dilation (≥4 cm), maternal cardiac disease, poorly controlled diabetes, hyperthyroidism. Twins are NOT a contraindication.',
    references: [
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164',
      'Cunningham FG, et al. Williams Obstetrics, 25th Edition. Chapter 42: Preterm Birth'
    ],
    difficulty: 'easy',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-016',
    question: 'What is the recommended management for a patient at 23 weeks with painless cervical dilation to 3 cm and bulging membranes?',
    options: [
      'Immediate delivery',
      'Emergency cerclage',
      'Expectant management with antibiotics',
      'Rescue cerclage may be considered after counseling'
    ],
    correctIndex: 3,
    explanation: 'This is cervical insufficiency. Physical exam-indicated (rescue) cerclage may be offered at <24 weeks with counseling about risks (PPROM 30-50%, infection, bleeding). Contraindications: active bleeding, contractions, infection. If cerclage placed: bed rest, tocolytics (controversial), antibiotics (controversial). Alternative: expectant management. No clear survival benefit but may prolong pregnancy if successful.',
    references: [
      'ACOG Practice Bulletin No. 142: Cerclage for Cervical Insufficiency. Obstet Gynecol. 2014;123(2 Pt 1):372-379',
      'Berghella V, et al. Cerclage for sonographic short cervix in singletons without prior spontaneous preterm birth. Obstet Gynecol. 2017;130(4):892-899'
    ],
    difficulty: 'hard',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-017',
    question: 'A patient at 33 weeks with preterm labor has ruptured membranes for 12 hours. What is the appropriate management?',
    options: [
      'Tocolytics and expectant management until 37 weeks',
      'Antibiotics, corticosteroids, and delivery at 34 weeks',
      'Immediate delivery',
      'Cerclage placement'
    ],
    correctIndex: 1,
    explanation: 'Preterm premature rupture of membranes (PPROM) at 34 weeks: give antibiotics (latency, reduces infection/neonatal morbidity), corticosteroids if not previously given, and deliver at 34 weeks. Tocolytics NOT routinely recommended. Earlier gestation (24-33+6 weeks): expectant management with antibiotics, steroids, monitoring for infection/abruption. Delivery at 34 weeks balances infection risk vs prematurity.',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'Mercer BM. Preterm premature rupture of the membranes. Obstet Gynecol. 2003;101(1):178-193'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-018',
    question: 'What antibiotic regimen is recommended for latency in PPROM?',
    options: [
      'Penicillin alone',
      'Ampicillin and erythromycin IV for 48 hours, then amoxicillin and azithromycin PO',
      'Ceftriaxone only',
      'Doxycycline'
    ],
    correctIndex: 1,
    explanation: 'Recommended PPROM antibiotic regimen (prolongs latency ~7 days, reduces chorioamnionitis and neonatal sepsis): Ampicillin 2g IV q6h + erythromycin 250mg IV q6h for 48 hours, THEN amoxicillin 250mg PO q8h + azithromycin 250mg PO daily for total 7 days. Avoid amoxicillin-clavulanate (associated with increased necrotizing enterocolitis).',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'Mercer BM, et al. Antibiotic therapy for reduction of infant morbidity after preterm premature rupture of membranes. JAMA. 1997;278(12):989-995'
    ],
    difficulty: 'hard',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-019',
    question: 'Which test is most accurate for diagnosing rupture of membranes when clinical examination is equivocal?',
    options: [
      'Nitrazine paper (pH test)',
      'Ferning pattern on microscopy',
      'AmniSure or similar PAMG-1 test',
      'Ultrasound for oligohydramnios'
    ],
    correctIndex: 2,
    explanation: 'AmniSure (PAMG-1) or similar immunoassay tests have highest accuracy (sensitivity 98-99%, specificity 98-99%) for ROM diagnosis. Ferning test: 90-95% sensitive but requires expertise. Nitrazine: 90% sensitive but false positives (blood, semen, bacterial vaginosis). Oligohydramnios suggests ROM but nonspecific. Sterile speculum exam showing pooling is diagnostic if present.',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'Lee SE, et al. Clinical significance of proteins of the insulin-like growth factor axis in amniotic fluid. J Perinat Med. 2008;36(4):334-341'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-020',
    question: 'A patient with PPROM at 26 weeks develops fever 38.5°C and uterine tenderness. What is the immediate management?',
    options: [
      'Continue expectant management with antibiotics',
      'Tocolytics to stop contractions',
      'Immediate delivery and broad-spectrum antibiotics',
      'Amniocentesis for culture'
    ],
    correctIndex: 2,
    explanation: 'Fever and uterine tenderness indicate chorioamnionitis - requires IMMEDIATE delivery (vaginal delivery preferred unless obstetric indications for cesarean) and broad-spectrum antibiotics (ampicillin + gentamicin; add clindamycin/metronidazole if cesarean). Tocolytics contraindicated. Delay in delivery increases maternal (sepsis, DIC) and fetal (sepsis, neurologic injury) morbidity.',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'Tita AT, Andrews WW. Diagnosis and management of clinical chorioamnionitis. Clin Perinatol. 2010;37(2):339-354'
    ],
    difficulty: 'easy',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-021',
    question: 'What is the gestational age threshold for initiating expectant management versus immediate delivery in PPROM with reassuring fetal status and no infection?',
    options: [
      '28 weeks',
      '30 weeks',
      '32 weeks',
      '34 weeks'
    ],
    correctIndex: 3,
    explanation: 'PPROM management: <34 weeks - expectant management with antibiotics, steroids, daily monitoring (maternal fever, fetal heart rate, WBC, contractions). ≥34 weeks - proceed with delivery (neonatal outcomes similar to expectant management; lower infection risk with delivery). Exception: <24 weeks requires individualized counseling regarding viability and outcomes.',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'Mercer BM, et al. Is antibiotic therapy for preterm premature rupture of membranes sufficient? Clin Obstet Gynecol. 2011;54(2):357-366'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-022',
    question: 'A patient at 25 weeks with PPROM has been managed expectantly for 48 hours. Which finding is an indication for immediate delivery?',
    options: [
      'Oligohydramnios with AFI 3 cm',
      'Persistent variable decelerations with normal baseline',
      'Category II fetal heart tracing with recurrent late decelerations',
      'Maternal white blood cell count 12,000/μL'
    ],
    correctIndex: 2,
    explanation: 'Indications for delivery in PPROM: nonreassuring fetal status (recurrent late/severe variable decelerations, absent variability), chorioamnionitis (fever, uterine tenderness, maternal/fetal tachycardia, purulent discharge), placental abruption, advanced labor. Isolated oligohydramnios expected with PPROM. WBC 12,000-15,000 normal in pregnancy/labor; concerning if rising or >20,000.',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'Mercer BM. Preterm premature rupture of the membranes. Obstet Gynecol. 2003;101(1):178-193'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-023',
    question: 'What is the most common neonatal complication of late preterm birth (34-36 weeks)?',
    options: [
      'Necrotizing enterocolitis',
      'Intraventricular hemorrhage',
      'Respiratory distress syndrome',
      'Retinopathy of prematurity'
    ],
    correctIndex: 2,
    explanation: 'Late preterm infants (34-36 weeks) have increased risk of respiratory distress syndrome (RDS), transient tachypnea of newborn, hypoglycemia, jaundice, temperature instability, and feeding difficulties compared to term. RDS most common. Risk decreases with each additional week. This is why delivery without indication should be avoided before 39 weeks.',
    references: [
      'ACOG Committee Opinion No. 764: Medically Indicated Late-Preterm Deliveries. Obstet Gynecol. 2019;133(2):e151-e155',
      'Raju TN, et al. Morbidity and mortality in late preterm infants. Clin Perinatol. 2006;33(4):803-830'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-024',
    question: 'Which maternal condition is associated with highest risk of spontaneous preterm birth?',
    options: [
      'Gestational diabetes',
      'Prior spontaneous preterm birth <34 weeks',
      'Obesity BMI >40',
      'Advanced maternal age'
    ],
    correctIndex: 1,
    explanation: 'Strongest risk factor for spontaneous preterm birth is PRIOR spontaneous preterm birth: recurrence risk 15-50% depending on gestational age (earlier = higher risk). Other major risks: short cervix, multiple gestation, uterine anomalies, history of cervical surgery (LEEP, cone biopsy), periodontal disease, smoking, low BMI, African American race. Gestational diabetes associated with indicated preterm birth, not spontaneous.',
    references: [
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164',
      'Iams JD, et al. Primary, secondary, and tertiary interventions to reduce the morbidity and mortality of preterm birth. Lancet. 2008;371(9607):164-175'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-025',
    question: 'When should late preterm corticosteroids be administered?',
    options: [
      '32-33 weeks if delivery likely within 7 days',
      '34-36 weeks if delivery likely within 7 days and no prior course',
      'Not indicated after 34 weeks',
      'Routinely for all patients 34-37 weeks'
    ],
    correctIndex: 1,
    explanation: 'Late preterm corticosteroids (betamethasone): May be considered 34+0 to 36+6 weeks if delivery likely within 7 days AND no prior course. Reduces neonatal respiratory complications by 40%. Single course only. Not given if prior course at any gestational age. Requires shared decision-making - small increased risk of neonatal hypoglycemia.',
    references: [
      'ACOG Committee Opinion No. 713: Antenatal Corticosteroid Therapy. Obstet Gynecol. 2017;130(2):e102-e109',
      'Gyamfi-Bannerman C, et al. Antenatal betamethasone for women at risk for late preterm delivery. N Engl J Med. 2016;374(14):1311-1320'
    ],
    difficulty: 'hard',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-026',
    question: 'A patient at 27 weeks with preterm labor has HIV. Should tocolytics and expectant management be pursued?',
    options: [
      'No, HIV is contraindication to tocolysis',
      'Yes, manage preterm labor as usual with continuation of antiretroviral therapy',
      'Immediate delivery required',
      'Tocolysis only if viral load undetectable'
    ],
    correctIndex: 1,
    explanation: 'HIV is NOT a contraindication to standard preterm labor management. Give tocolytics, corticosteroids, GBS prophylaxis as indicated. Continue antiretroviral therapy (ART) throughout. Goal: suppress viral load to reduce vertical transmission risk. Cesarean at 38 weeks recommended if viral load >1000 copies/mL near delivery. Mode of delivery at preterm gestation individualized.',
    references: [
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164',
      'Panel on Treatment of Pregnant Women with HIV Infection. Recommendations for Use of Antiretroviral Drugs in Pregnant HIV-Infected Women. 2021'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-027',
    question: 'What is the purpose of administering ampicillin plus gentamicin during active labor in a patient with PPROM at 32 weeks?',
    options: [
      'Latency prolongation',
      'GBS prophylaxis',
      'Treatment of chorioamnionitis',
      'Prevention of neonatal pneumonia'
    ],
    correctIndex: 1,
    explanation: 'During ACTIVE labor: switch from latency antibiotics (ampicillin + erythromycin or oral equivalent) to GBS prophylaxis (penicillin G or ampicillin). If chorioamnionitis develops, give broad-spectrum coverage: ampicillin 2g IV q6h + gentamicin 2mg/kg loading then 1.5mg/kg q8h (or single daily dosing 5mg/kg). Add clindamycin/metronidazole if cesarean delivery.',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'ACOG Committee Opinion No. 797: Prevention of Group B Streptococcal Disease. Obstet Gynecol. 2020;135(2):e51-e72'
    ],
    difficulty: 'hard',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-028',
    question: 'A patient with prior history-indicated cerclage placed at 13 weeks now presents at 33 weeks in active labor. When should the cerclage be removed?',
    options: [
      'After delivery',
      'Immediately upon diagnosis of labor',
      'At 36 weeks as originally planned',
      'Only if cervix dilates to 4 cm'
    ],
    correctIndex: 1,
    explanation: 'Cerclage must be removed IMMEDIATELY when active labor begins (regardless of gestational age) or electively at 36-37 weeks to prevent cervical laceration, uterine rupture, and hemorrhage. If ROM occurs, remove cerclage and proceed based on gestational age. Emergency cerclage removal requires adequate anesthesia; may need operating room if technically difficult.',
    references: [
      'ACOG Practice Bulletin No. 142: Cerclage for Cervical Insufficiency. Obstet Gynecol. 2014;123(2 Pt 1):372-379',
      'Berghella V, et al. Cerclage for short cervix on ultrasonography. Obstet Gynecol. 2011;117(3):663-671'
    ],
    difficulty: 'easy',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-029',
    question: 'Which intervention has been shown to reduce preterm birth rates in women with incidental finding of short cervix (<25mm) at 20-week anatomy scan with no prior preterm birth?',
    options: [
      'Prophylactic cerclage',
      'Vaginal progesterone',
      'Activity restriction and bed rest',
      'Weekly cervical length monitoring alone'
    ],
    correctIndex: 1,
    explanation: 'For singleton pregnancy with incidental short cervix (<25mm) at 16-24 weeks WITHOUT prior spontaneous preterm birth: vaginal progesterone 200mg nightly reduces preterm birth <34 weeks by 45%. Cerclage NOT superior to progesterone in this group. WITH prior spontaneous preterm birth: either ultrasound-indicated cerclage OR progesterone (both effective). Bed rest not effective.',
    references: [
      'ACOG Committee Opinion No. 419: Use of Progesterone to Reduce Preterm Birth. Obstet Gynecol. 2008;112(4):963-965',
      'Romero R, et al. Vaginal progesterone in women with asymptomatic sonographic short cervix. Am J Obstet Gynecol. 2012;206(2):124.e1-19'
    ],
    difficulty: 'hard',
    topicId: 'preterm-labour',
    category: 'obstetric'
  },
  {
    id: 'ptl-030',
    question: 'A patient at 31 weeks with preterm contractions has been given nifedipine for 48 hours. Contractions have stopped. What is the next step?',
    options: [
      'Continue nifedipine for maintenance tocolysis',
      'Switch to different tocolytic agent',
      'Discontinue tocolysis and monitor',
      'Start vaginal progesterone'
    ],
    correctIndex: 2,
    explanation: 'Maintenance tocolytic therapy (continuing beyond initial 48-hour course) does NOT improve outcomes and is NOT recommended. After initial 48-hour course for steroid administration, STOP tocolysis and observe. If contractions recur: reassess for true labor vs Braxton-Hicks, check cervical change, consider fetal well-being. Repeat tocolysis course generally not beneficial.',
    references: [
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164',
      'Nanda K, et al. Terbutaline pump maintenance therapy after threatened preterm labor. Cochrane Database Syst Rev. 2002;(4):CD003933'
    ],
    difficulty: 'medium',
    topicId: 'preterm-labour',
    category: 'obstetric'
  }
];
