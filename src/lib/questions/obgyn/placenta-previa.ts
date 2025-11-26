import { Question } from '../types';

export const placentaPreviaQuestions: Question[] = [
  {
    id: 'pp-001',
    question: 'A 32-year-old G3P2 at 28 weeks gestation presents with painless vaginal bleeding. Ultrasound shows the placenta completely covering the internal cervical os. What is the most appropriate initial management?',
    options: [
      'Immediate cesarean delivery',
      'Digital cervical examination',
      'Admit for observation, no vaginal examination',
      'Discharge home with pelvic rest instructions'
    ],
    correctIndex: 2,
    explanation: 'Complete placenta previa with bleeding requires hospital admission for observation. Digital vaginal examination is absolutely contraindicated as it can cause catastrophic hemorrhage. Immediate delivery is not indicated unless there is life-threatening bleeding or fetal compromise.',
    references: [
      'ACOG Practice Bulletin No. 204: Fetal Macrosomia. Obstet Gynecol. 2020;135(1):e18-e35',
      'Oyelese Y, Smulian JC. Placenta previa, placenta accreta, and vasa previa. Obstet Gynecol. 2006;107(4):927-941'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-002',
    question: 'What is the primary risk factor for placenta previa?',
    options: [
      'Advanced maternal age',
      'Prior cesarean delivery',
      'Multiparity',
      'Smoking'
    ],
    correctIndex: 1,
    explanation: 'Prior cesarean delivery is the strongest risk factor for placenta previa, with risk increasing with each subsequent cesarean. The uterine scar disrupts normal placental migration and increases risk of abnormal placentation.',
    references: [
      'Ananth CV, Smulian JC, Vintzileos AM. The association of placenta previa with history of cesarean delivery and abortion: a metaanalysis. Am J Obstet Gynecol. 1997;177(5):1071-1078',
      'Silver RM. Abnormal Placentation: Placenta Previa, Vasa Previa, and Placenta Accreta. Obstet Gynecol. 2015;126(3):654-668'
    ],
    difficulty: 'easy',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-003',
    question: 'At what gestational age should delivery be scheduled for asymptomatic complete placenta previa?',
    options: [
      '34-35 weeks',
      '36-37 weeks',
      '38-39 weeks',
      '39-40 weeks'
    ],
    correctIndex: 1,
    explanation: 'For asymptomatic complete placenta previa, scheduled cesarean delivery at 36-37 weeks balances the risk of preterm birth complications against the risk of spontaneous bleeding. Earlier delivery may be indicated with bleeding episodes.',
    references: [
      'ACOG Committee Opinion No. 764: Medically Indicated Late-Preterm and Early-Term Deliveries. Obstet Gynecol. 2019;133(2):e151-e155',
      'Royal College of Obstetricians and Gynaecologists. Placenta praevia, placenta praevia accreta and vasa praevia: diagnosis and management. Green-top Guideline No. 27. 2011'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-004',
    question: 'A patient with complete placenta previa experiences massive hemorrhage at 35 weeks. After delivery, what additional complication should be anticipated?',
    options: [
      'Amniotic fluid embolism',
      'Placenta accreta spectrum',
      'Uterine inversion',
      'Shoulder dystocia'
    ],
    correctIndex: 1,
    explanation: 'Placenta previa significantly increases risk of placenta accreta spectrum disorders (accreta, increta, percreta), especially with prior uterine surgery. This should be anticipated and prepared for with blood products, possible hysterectomy consent, and multidisciplinary team involvement.',
    references: [
      'Jauniaux E, et al. FIGO consensus guidelines on placenta accreta spectrum disorders: Epidemiology. Int J Gynaecol Obstet. 2018;140(3):265-273',
      'Silver RM, Branch DW. Placenta Accreta Spectrum. N Engl J Med. 2018;378(16):1529-1536'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-005',
    question: 'What is the classic triad presentation of placenta previa?',
    options: [
      'Painful bleeding, uterine tenderness, fetal distress',
      'Painless bleeding, soft non-tender uterus, normal fetal heart rate',
      'Abdominal pain, rigid abdomen, absent fetal heart tones',
      'Contractions, bloody show, cervical dilation'
    ],
    correctIndex: 1,
    explanation: 'Placenta previa classically presents with painless, bright red vaginal bleeding, a soft non-tender uterus, and typically normal fetal heart rate (unless massive hemorrhage occurs). This contrasts with placental abruption which presents with painful bleeding.',
    references: [
      'Oyelese Y, Smulian JC. Placenta previa, placenta accreta, and vasa previa. Obstet Gynecol. 2006;107(4):927-941',
      'Cunningham FG, et al. Williams Obstetrics, 25th Edition. Chapter 41: Obstetrical Hemorrhage'
    ],
    difficulty: 'easy',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-006',
    question: 'A low-lying placenta is noted on 20-week anatomy scan. The placental edge is 1.5 cm from the internal os. What is the appropriate follow-up?',
    options: [
      'Immediate cesarean section planning',
      'Repeat ultrasound at 32 weeks',
      'No further imaging needed, plan vaginal delivery',
      'Weekly ultrasounds until delivery'
    ],
    correctIndex: 1,
    explanation: 'Most low-lying placentas identified in the second trimester will resolve by the third trimester due to differential growth of the lower uterine segment ("placental migration"). Follow-up ultrasound at 32 weeks is recommended to reassess placental position.',
    references: [
      'Bhide A, et al. ISUOG Practice Guidelines: use of Doppler ultrasonography in obstetrics. Ultrasound Obstet Gynecol. 2013;41(2):233-239',
      'Reddy UM, et al. The effect of labor on intrauterine fetal death in the United States. Am J Obstet Gynecol. 2012;206(1):33.e1-8'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-007',
    question: 'Which ultrasound modality is most accurate for diagnosing placenta previa?',
    options: [
      'Transabdominal ultrasound alone',
      'Transvaginal ultrasound',
      'Doppler ultrasound',
      'MRI'
    ],
    correctIndex: 1,
    explanation: 'Transvaginal ultrasound is the gold standard for diagnosing placenta previa and is safe to perform. It provides better visualization of the relationship between the placental edge and internal cervical os compared to transabdominal ultrasound, which can be limited by shadowing from fetal parts or maternal habitus.',
    references: [
      'Oppenheimer L, et al. Diagnosis and Management of Placenta Previa. J Obstet Gynaecol Can. 2007;29(3):261-273',
      'Smith RS, et al. Transvaginal ultrasonography for all placentas that appear to be low-lying or over the internal cervical os. Ultrasound Obstet Gynecol. 1997;9(1):22-24'
    ],
    difficulty: 'easy',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-008',
    question: 'A 35-year-old G4P3 with complete placenta previa and three prior cesareans is scheduled for delivery. What surgical preparation is most important?',
    options: [
      'Prophylactic antibiotics only',
      'Type and screen, 2 units available',
      'Multidisciplinary team, blood products, possible hysterectomy consent',
      'Standard cesarean preparation'
    ],
    correctIndex: 2,
    explanation: 'This patient is at very high risk for placenta accreta spectrum given previa + three prior cesareans (>50% risk). Preparation should include: multidisciplinary team (MFM, anesthesia, blood bank, urology/general surgery), multiple units of blood products readily available, hysterectomy consent, and possible ICU bed.',
    references: [
      'ACOG Committee Opinion No. 529: Placenta accreta. Obstet Gynecol. 2012;120(1):207-211',
      'Jauniaux E, et al. FIGO consensus guidelines on placenta accreta spectrum disorders: Prenatal diagnosis and screening. Int J Gynaecol Obstet. 2018;140(3):274-280'
    ],
    difficulty: 'hard',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-009',
    question: 'What is the minimum distance from the placental edge to the internal os that allows consideration of vaginal delivery?',
    options: [
      '1 cm',
      '2 cm',
      '3 cm',
      '4 cm'
    ],
    correctIndex: 1,
    explanation: 'A placental edge distance of ≥2 cm from the internal cervical os is generally considered safe for trial of labor. Distance <2 cm increases risk of intrapartum bleeding and may warrant cesarean delivery, though some institutions use individualized decision-making.',
    references: [
      'Harper LM, et al. Pregnancy outcomes in women with a low-lying placenta diagnosed on second-trimester sonography. J Ultrasound Med. 2010;29(7):1013-1018',
      'Vergani P, et al. Placenta previa: distance to internal os and mode of delivery. Am J Obstet Gynecol. 2009;201(3):266.e1-5'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-010',
    question: 'A patient with marginal placenta previa presents at 32 weeks with moderate vaginal bleeding. Fetal heart tracing is reassuring. What is the role of corticosteroids?',
    options: [
      'Contraindicated due to bleeding',
      'Should be administered for fetal lung maturity',
      'Only if delivery is imminent',
      'Not indicated at 32 weeks'
    ],
    correctIndex: 1,
    explanation: 'Betamethasone or dexamethasone should be administered between 24-34 weeks gestation when there is risk of preterm delivery within 7 days. This includes patients with placenta previa and bleeding, as they are at significant risk for preterm delivery.',
    references: [
      'ACOG Committee Opinion No. 713: Antenatal Corticosteroid Therapy for Fetal Maturation. Obstet Gynecol. 2017;130(2):e102-e109',
      'Roberts D, et al. Antenatal corticosteroids for accelerating fetal lung maturation for women at risk of preterm birth. Cochrane Database Syst Rev. 2017;3:CD004454'
    ],
    difficulty: 'easy',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-011',
    question: 'During cesarean delivery for complete placenta previa, the surgeon makes a low transverse uterine incision directly through the placenta. What immediate complication is most likely?',
    options: [
      'Fetal anemia requiring transfusion',
      'Uterine atony and hemorrhage',
      'Amniotic fluid embolism',
      'Bladder injury'
    ],
    correctIndex: 0,
    explanation: 'Incising through the placenta causes rapid fetal blood loss. The cord should be clamped immediately, and the baby may require resuscitation and possible transfusion. In some cases, an alternative incision site (vertical, classical, or J-incision) may be considered to avoid the placenta.',
    references: [
      'Silver RM. Abnormal Placentation: Placenta Previa, Vasa Previa, and Placenta Accreta. Obstet Gynecol. 2015;126(3):654-668',
      'Cunningham FG, et al. Williams Obstetrics, 25th Edition. Chapter 41: Obstetrical Hemorrhage'
    ],
    difficulty: 'hard',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-012',
    question: 'What percentage of placenta previas diagnosed before 20 weeks will persist to term?',
    options: [
      '5-10%',
      '25-30%',
      '50-60%',
      '75-80%'
    ],
    correctIndex: 0,
    explanation: 'Approximately 90% of placenta previas diagnosed before 20 weeks will resolve by term due to differential growth of the lower uterine segment. Only about 5-10% persist to delivery. Complete previas and those with placental tissue over the os are less likely to resolve.',
    references: [
      'Dashe JS, et al. Persistence of placenta previa according to gestational age at ultrasound detection. Obstet Gynecol. 2002;99(5 Pt 1):692-697',
      'Becker RH, et al. The relevance of placental location at 20-23 gestational weeks for prediction of placenta previa at delivery. Ultrasound Obstet Gynecol. 2001;17(6):496-501'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-013',
    question: 'A patient with known complete placenta previa arrives in active labor at 36 weeks. The most appropriate management is:',
    options: [
      'Attempt external cephalic version',
      'Allow vaginal delivery if bleeding minimal',
      'Immediate cesarean delivery',
      'Tocolysis and delay delivery 48 hours'
    ],
    correctIndex: 2,
    explanation: 'Complete placenta previa is an absolute indication for cesarean delivery. Labor and cervical dilation will cause placental separation and can lead to life-threatening hemorrhage for both mother and fetus. Delivery should proceed urgently but in controlled fashion.',
    references: [
      'ACOG Practice Bulletin No. 204: Fetal Macrosomia. Obstet Gynecol. 2020;135(1):e18-e35',
      'Royal College of Obstetricians and Gynaecologists. Placenta praevia, placenta praevia accreta and vasa praevia. Green-top Guideline No. 27. 2011'
    ],
    difficulty: 'easy',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-014',
    question: 'Which of the following is NOT a risk factor for placenta previa?',
    options: [
      'Maternal cocaine use',
      'Previous placenta previa',
      'Nulliparity',
      'In vitro fertilization'
    ],
    correctIndex: 2,
    explanation: 'Nulliparity is NOT a risk factor; multiparity actually increases risk. Risk factors include: prior uterine surgery/cesarean, previous placenta previa, advanced maternal age, multiparity, smoking, cocaine use, multifetal gestation, and assisted reproductive technology.',
    references: [
      'Faiz AS, Ananth CV. Etiology and risk factors for placenta previa: an overview and meta-analysis. J Matern Fetal Neonatal Med. 2003;13(3):175-190',
      'Ananth CV, et al. Relationship between pregnancy-induced hypertension and placenta previa. J Matern Fetal Med. 1997;6(5):267-271'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-015',
    question: 'A patient with placenta previa has had three bleeding episodes requiring hospitalization. She is now at 34 weeks. What additional medication should be considered?',
    options: [
      'Prophylactic uterotonics',
      'Magnesium sulfate for neuroprotection',
      'Tocolytics to prevent preterm labor',
      'Prophylactic tranexamic acid'
    ],
    correctIndex: 1,
    explanation: 'At 34 weeks with anticipated delivery, magnesium sulfate for fetal neuroprotection should be considered if delivery is expected within 24 hours and gestational age is <32-34 weeks per local protocols. Tocolytics are generally avoided with active bleeding.',
    references: [
      'ACOG Committee Opinion No. 455: Magnesium sulfate before anticipated preterm birth for neuroprotection. Obstet Gynecol. 2010;115(3):669-671',
      'Doyle LW, et al. Magnesium sulphate for women at risk of preterm birth for neuroprotection of the fetus. Cochrane Database Syst Rev. 2009;(1):CD004661'
    ],
    difficulty: 'hard',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-016',
    question: 'What is the definition of marginal placenta previa?',
    options: [
      'Placental edge reaches but does not cover the internal os',
      'Placental edge is within 2 cm of the internal os',
      'Placenta partially covers the internal os',
      'Placenta completely covers the internal os'
    ],
    correctIndex: 0,
    explanation: 'Marginal placenta previa is when the placental edge reaches the internal cervical os but does not cover it. Complete previa covers the entire os, partial previa partially covers it, and low-lying placenta is within 2 cm but does not reach the os.',
    references: [
      'Jauniaux E, Alfirevic Z, Bhide AG, et al. Placenta Praevia and Placenta Accreta: Diagnosis and Management. BJOG. 2019;126(1):e1-e48',
      'Reddy UM, et al. Practice Bulletin No. 204. Obstet Gynecol. 2019;133(2):e168-e186'
    ],
    difficulty: 'easy',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-017',
    question: 'A patient with complete placenta previa and three prior cesareans undergoes delivery. During the procedure, heavy bleeding occurs and the placenta will not separate. What is the most likely diagnosis?',
    options: [
      'Uterine atony',
      'Placenta accreta',
      'Amniotic fluid embolism',
      'DIC'
    ],
    correctIndex: 1,
    explanation: 'This clinical scenario describes placenta accreta spectrum disorder - failure of normal placental separation due to abnormal invasion into or through the myometrium. Risk is extremely high (50-67%) with placenta previa overlying a prior cesarean scar.',
    references: [
      'Silver RM, Branch DW. Placenta Accreta Spectrum. N Engl J Med. 2018;378(16):1529-1536',
      'Jauniaux E, et al. FIGO consensus guidelines on placenta accreta spectrum disorders. Int J Gynaecol Obstet. 2018;140(3):265-273'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-018',
    question: 'What is the recommended hemoglobin threshold for transfusion in a stable patient with placenta previa and acute bleeding?',
    options: [
      '<10 g/dL',
      '<8 g/dL',
      '<7 g/dL',
      '<6 g/dL'
    ],
    correctIndex: 2,
    explanation: 'For stable pregnant patients, a restrictive transfusion threshold of 7 g/dL is generally recommended, consistent with guidelines for other patient populations. However, clinical judgment considering ongoing bleeding, vital signs, and symptoms should guide transfusion decisions.',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Carson JL, et al. Transfusion thresholds and other strategies for guiding allogeneic red blood cell transfusion. Cochrane Database Syst Rev. 2016;10:CD002042'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-019',
    question: 'Sexual intercourse is absolutely contraindicated in patients with placenta previa because:',
    options: [
      'It always causes severe bleeding',
      'It increases risk of infection',
      'It can trigger bleeding and preterm labor',
      'It causes placental separation'
    ],
    correctIndex: 2,
    explanation: 'Pelvic rest (no intercourse, douching, or vaginal examinations) is recommended for placenta previa because these activities can traumatize the placenta and lower uterine segment, potentially triggering bleeding or preterm labor. Anything inserted into the vagina could precipitate hemorrhage.',
    references: [
      'Oyelese Y, Smulian JC. Placenta previa, placenta accreta, and vasa previa. Obstet Gynecol. 2006;107(4):927-941',
      'ACOG Practice Bulletin No. 204. Obstet Gynecol. 2020;135(1):e18-e35'
    ],
    difficulty: 'easy',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-020',
    question: 'A patient with suspected placenta previa presents with vaginal bleeding at 30 weeks. What laboratory tests should be ordered initially?',
    options: [
      'CBC only',
      'CBC, type and screen, coagulation studies',
      'CBC, liver enzymes, uric acid',
      'Kleihauer-Betke test only'
    ],
    correctIndex: 1,
    explanation: 'Initial workup should include: CBC (hemoglobin/hematocrit), type and screen/crossmatch (in case transfusion needed), and coagulation studies (PT, PTT, fibrinogen) to assess for coagulopathy. Kleihauer-Betke for Rh-negative patients to determine RhoGAM dose.',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Royal College of Obstetricians and Gynaecologists. Antepartum Haemorrhage. Green-top Guideline No. 63. 2011'
    ],
    difficulty: 'easy',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-021',
    question: 'Which anesthesia technique is preferred for elective cesarean delivery with placenta previa without suspected accreta?',
    options: [
      'General anesthesia is mandatory',
      'Spinal or epidural anesthesia is preferred',
      'Local anesthesia only',
      'No anesthesia needed'
    ],
    correctIndex: 1,
    explanation: 'Neuraxial anesthesia (spinal or epidural) is preferred for uncomplicated placenta previa cesarean delivery, as it carries lower maternal risk than general anesthesia. General anesthesia may be chosen if massive hemorrhage is anticipated (suspected accreta) or emergency delivery needed.',
    references: [
      'Practice Guidelines for Obstetric Anesthesia: An Updated Report by the ASA Task Force. Anesthesiology. 2016;124(2):270-300',
      'Palanisamy A, et al. Anesthetic considerations for placenta accreta. Best Pract Res Clin Anaesthesiol. 2017;31(1):107-122'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-022',
    question: 'A patient with placenta previa is Rh-negative. After a bleeding episode at 28 weeks, what is the appropriate dose of RhoGAM?',
    options: [
      '50 mcg',
      '120 mcg',
      '300 mcg',
      'Not indicated'
    ],
    correctIndex: 2,
    explanation: 'For Rh-negative patients with antepartum bleeding after 12 weeks gestation, 300 mcg (full dose) of Rh immune globulin should be administered. Kleihauer-Betke test can determine if additional doses are needed for massive fetomaternal hemorrhage.',
    references: [
      'ACOG Practice Bulletin No. 181: Prevention of Rh D Alloimmunization. Obstet Gynecol. 2017;130(2):e57-e70',
      'Moise KJ Jr. Management of rhesus alloimmunization in pregnancy. Obstet Gynecol. 2008;112(1):164-176'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-023',
    question: 'What is the recurrence risk of placenta previa in a subsequent pregnancy?',
    options: [
      '1-2%',
      '4-8%',
      '15-20%',
      '25-30%'
    ],
    correctIndex: 1,
    explanation: 'The recurrence risk of placenta previa in a subsequent pregnancy is approximately 4-8%, which is significantly higher than the general population risk of 0.3-0.5%. The risk is even higher with multiple prior cesarean deliveries.',
    references: [
      'Ananth CV, Smulian JC, Vintzileos AM. The association of placenta previa with history of cesarean delivery and abortion. Am J Obstet Gynecol. 1997;177(5):1071-1078',
      'Getahun D, et al. Previous cesarean delivery and risks of placenta previa and placental abruption. Obstet Gynecol. 2006;107(4):771-778'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-024',
    question: 'In a patient with anterior placenta previa, which additional complication must be considered during cesarean delivery?',
    options: [
      'Increased risk of shoulder dystocia',
      'Bladder injury',
      'Difficult fetal extraction',
      'Cord prolapse'
    ],
    correctIndex: 1,
    explanation: 'Anterior placenta previa places the placenta directly in the surgical field and increases risk of bladder injury, especially with prior cesarean deliveries where the bladder may be adherent to the lower uterine segment. Careful bladder dissection and possibly cystoscopy may be needed.',
    references: [
      'Silver RM. Abnormal Placentation: Placenta Previa, Vasa Previa, and Placenta Accreta. Obstet Gynecol. 2015;126(3):654-668',
      'Jauniaux E, et al. Surgical Management of PAS Disorders. Int J Gynaecol Obstet. 2018;140(3):281-290'
    ],
    difficulty: 'hard',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-025',
    question: 'What is the typical onset of bleeding in placenta previa?',
    options: [
      'First trimester',
      'Late second to early third trimester',
      'During active labor only',
      'Immediately postpartum'
    ],
    correctIndex: 1,
    explanation: 'Bleeding from placenta previa typically begins in the late second or early third trimester (after 20 weeks) as the lower uterine segment forms and stretches, causing separation of the placenta from the uterine wall. First episode is usually not severe but subsequent bleeds tend to be heavier.',
    references: [
      'Oyelese Y, Smulian JC. Placenta previa, placenta accreta, and vasa previa. Obstet Gynecol. 2006;107(4):927-941',
      'Cunningham FG, et al. Williams Obstetrics, 25th Edition. Chapter 41: Obstetrical Hemorrhage'
    ],
    difficulty: 'easy',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-026',
    question: 'A patient with placenta previa at 33 weeks presents with profuse vaginal bleeding and maternal tachycardia. Hemoglobin is 6.5 g/dL. The fetal heart rate shows repetitive late decelerations. What is the most appropriate management?',
    options: [
      'Transfuse first, then deliver when stable',
      'Emergency cesarean delivery immediately',
      'Tocolysis and observation',
      'Await spontaneous labor'
    ],
    correctIndex: 1,
    explanation: 'With maternal hemodynamic instability (tachycardia, severe anemia) and fetal compromise (repetitive late decelerations), emergency cesarean delivery is indicated. Delivery should proceed simultaneously with resuscitation. Delaying for transfusion could worsen outcomes for mother and baby.',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Towers CV, et al. Incidence of placenta previa and risk factors and pregnancy outcomes. Am J Perinatol. 2000;17(4):181-185'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-027',
    question: 'What MRI finding is most suggestive of placenta accreta in a patient with placenta previa?',
    options: [
      'Enlarged placenta',
      'Loss of the normal myometrial dark signal band',
      'Increased amniotic fluid',
      'Fetal macrosomia'
    ],
    correctIndex: 1,
    explanation: 'On MRI, loss of the normal dark signal band of myometrium between the placenta and bladder is highly suggestive of placenta accreta spectrum. Other MRI findings include placental bulging, heterogeneous placenta, and dark intraplacental bands.',
    references: [
      'Jauniaux E, et al. FIGO consensus guidelines on placenta accreta spectrum disorders: Prenatal diagnosis and screening. Int J Gynaecol Obstet. 2018;140(3):274-280',
      'Familiari A, et al. Diagnostic accuracy of magnetic resonance imaging in detecting the severity of abnormal invasive placenta. Acta Obstet Gynecol Scand. 2018;97(9):1083-1093'
    ],
    difficulty: 'hard',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-028',
    question: 'Which of the following best describes the pathophysiology of placenta previa?',
    options: [
      'Premature separation of normally implanted placenta',
      'Implantation of placenta in lower uterine segment',
      'Invasion of placenta into myometrium',
      'Compression of umbilical cord'
    ],
    correctIndex: 1,
    explanation: 'Placenta previa occurs when the placenta implants in the lower uterine segment rather than the upper uterine segment. As the lower segment develops and stretches in the third trimester, shearing forces cause placental separation and bleeding.',
    references: [
      'Faiz AS, Ananth CV. Etiology and risk factors for placenta previa. J Matern Fetal Neonatal Med. 2003;13(3):175-190',
      'Oyelese Y, Smulian JC. Placenta previa, placenta accreta, and vasa previa. Obstet Gynecol. 2006;107(4):927-941'
    ],
    difficulty: 'easy',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-029',
    question: 'A patient with complete placenta previa undergoes scheduled cesarean at 37 weeks. During delivery, despite multiple uterotonics, the uterus remains atonic with continued heavy bleeding. What is the next step?',
    options: [
      'Additional oxytocin bolus',
      'Hysterectomy',
      'Uterine tamponade (Bakri balloon)',
      'Observation with continued resuscitation'
    ],
    correctIndex: 2,
    explanation: 'After uterotonics, uterine tamponade with Bakri balloon or packing is the next step for atony. This can achieve hemostasis in 80-90% of cases. If this fails, proceed to uterine artery ligation, hypogastric artery ligation, or hysterectomy based on clinical situation and surgeon expertise.',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Doumouchtsis SK, et al. Management of postpartum hemorrhage by uterine balloon tamponade. Acta Obstet Gynecol Scand. 2008;87(8):849-855'
    ],
    difficulty: 'hard',
    topicId: 'placenta-previa',
    category: 'obstetric'
  },
  {
    id: 'pp-030',
    question: 'What is the most common cause of maternal mortality in placenta previa?',
    options: [
      'Amniotic fluid embolism',
      'Infection',
      'Hemorrhagic shock',
      'Anesthesia complications'
    ],
    correctIndex: 2,
    explanation: 'Hemorrhagic shock from uncontrolled bleeding is the leading cause of maternal mortality in placenta previa. Massive transfusion, DIC, and multi-organ failure can occur. Modern maternal mortality rates are <1% with appropriate management, but risk increases significantly with concurrent placenta accreta.',
    references: [
      'Oyelese Y, Smulian JC. Placenta previa, placenta accreta, and vasa previa. Obstet Gynecol. 2006;107(4):927-941',
      'Creanga AA, et al. Maternal mortality and morbidity in the United States. Obstet Gynecol. 2015;125(1):5-12'
    ],
    difficulty: 'medium',
    topicId: 'placenta-previa',
    category: 'obstetric'
  }
];
