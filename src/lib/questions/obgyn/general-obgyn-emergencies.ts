import { Question } from '../types';

/**
 * General OB/GYN Emergencies Question Bank
 * 
 * This collection covers a broad spectrum of obstetric and gynecologic emergencies
 * including ectopic pregnancy, ovarian torsion, hyperemesis, PID, trauma, and more.
 * 
 * Topics include:
 * - Ectopic pregnancy
 * - Ovarian torsion
 * - Hyperemesis gravidarum
 * - Pelvic inflammatory disease
 * - Gestational trophoblastic disease
 * - Postpartum complications
 * - Gynecologic oncology emergencies
 * - Trauma in pregnancy
 * - Vulvovaginal conditions
 */

export const generalObgynEmergenciesQuestions: Question[] = [
  {
    id: 'goe-001',
    question: 'A 28-year-old woman at 32 weeks gestation presents with severe abdominal pain and vaginal bleeding. Fetal heart rate is absent. What is the most likely diagnosis?',
    options: [
      'Placenta previa',
      'Placental abruption',
      'Uterine rupture',
      'Preterm labor'
    ],
    correctIndex: 1,
    explanation: 'Placental abruption presents with painful vaginal bleeding, abdominal pain, and potentially fetal demise. Unlike placenta previa (painless bleeding), abruption is associated with severe pain and can cause rapid fetal deterioration due to uteroplacental insufficiency.',
    references: [
      'Oyelese Y, et al. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016',
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-002',
    question: 'A pregnant patient at 38 weeks presents with painless vaginal bleeding. Fetal heart rate is normal. What is the most appropriate initial management?',
    options: [
      'Digital cervical examination',
      'Pelvic examination with speculum',
      'Ultrasound to evaluate placental location',
      'Immediate cesarean section'
    ],
    correctIndex: 2,
    explanation: 'Painless vaginal bleeding in the third trimester suggests placenta previa. Digital cervical examination should be avoided until placental location is confirmed by ultrasound, as it can precipitate massive hemorrhage if the placenta covers the cervical os.',
    references: [
      'Oyelese Y, et al. Placenta previa, placenta accreta, and vasa previa. Obstet Gynecol. 2006;107(4):927-941',
      'ACOG Committee Opinion No. 713: Antenatal Corticosteroid Therapy for Fetal Maturation'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-003',
    question: 'A 35-year-old woman presents with severe lower abdominal pain, amenorrhea for 6 weeks, and a positive pregnancy test. Vital signs show hypotension and tachycardia. What is the most likely diagnosis?',
    options: [
      'Threatened abortion',
      'Ruptured ectopic pregnancy',
      'Ovarian torsion',
      'Appendicitis'
    ],
    correctIndex: 1,
    explanation: 'The triad of amenorrhea, abdominal pain, and hemodynamic instability with a positive pregnancy test is classic for ruptured ectopic pregnancy. This is a surgical emergency requiring immediate intervention to control hemorrhage.',
    references: [
      'Barnhart KT. Clinical practice. Ectopic pregnancy. N Engl J Med. 2009;361(4):379-387',
      'ACOG Practice Bulletin No. 193: Tubal Ectopic Pregnancy. Obstet Gynecol. 2018;131(3):e91-e103'
    ],
    difficulty: 'easy',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-004',
    question: 'A pregnant patient at 24 weeks presents with severe hypertension (180/110 mmHg) and proteinuria. She develops a seizure. What is the most appropriate immediate treatment?',
    options: [
      'Hydralazine',
      'Magnesium sulfate',
      'Phenytoin',
      'Labetalol'
    ],
    correctIndex: 1,
    explanation: 'Magnesium sulfate is the drug of choice for treating and preventing eclamptic seizures. It is more effective than phenytoin or other anticonvulsants for pregnancy-related seizures. Blood pressure management is also important but seizure control takes priority.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Duley L, et al. Magnesium sulphate versus phenytoin for eclampsia. Cochrane Database Syst Rev. 2010;(10):CD000128'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-005',
    question: 'A postpartum woman develops massive bleeding 2 hours after delivery. The uterus feels soft and boggy. What is the most likely cause?',
    options: [
      'Uterine atony',
      'Retained placenta',
      'Cervical laceration',
      'Uterine rupture'
    ],
    correctIndex: 0,
    explanation: 'Uterine atony (failure of the uterus to contract) is the most common cause of postpartum hemorrhage. A soft, boggy uterus is characteristic. Initial treatment includes uterine massage, oxytocin, and other uterotonic agents.',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Begley CM, et al. Active versus expectant management for women in the third stage of labour. Cochrane Database Syst Rev. 2015;(3):CD007412'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-006',
    question: 'A 25-year-old woman presents with sudden onset severe pelvic pain and nausea. She is not pregnant. On examination, there is a tender adnexal mass. What is the most likely diagnosis?',
    options: [
      'Ovarian cyst rupture',
      'Ovarian torsion',
      'Pelvic inflammatory disease',
      'Appendicitis'
    ],
    correctIndex: 1,
    explanation: 'Sudden onset severe pelvic pain with a palpable adnexal mass suggests ovarian torsion. This is a surgical emergency as ovarian necrosis can occur rapidly. Doppler ultrasound may show decreased ovarian blood flow.',
    references: [
      'Adeyemi-Fowode OA, et al. Adnexal torsion. J Pediatr Adolesc Gynecol. 2018;31(4):333-338',
      'Mashiach R, et al. Adnexal torsion of hyperstimulated ovaries in pregnancies after assisted reproductive technologies'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-007',
    question: 'A pregnant patient at 28 weeks gestation presents with regular contractions and cervical dilation of 4 cm. What is the most appropriate initial treatment?',
    options: [
      'Magnesium sulfate',
      'Nifedipine',
      'Corticosteroids',
      'Antibiotics'
    ],
    correctIndex: 2,
    explanation: 'For preterm labor between 24-34 weeks, antenatal corticosteroids should be given to accelerate fetal lung maturity and reduce the risk of respiratory distress syndrome, intraventricular hemorrhage, and other complications of prematurity.',
    references: [
      'ACOG Committee Opinion No. 713: Antenatal Corticosteroid Therapy for Fetal Maturation. Obstet Gynecol. 2017;130(2):e102-e109',
      'Roberts D, et al. Antenatal corticosteroids for accelerating fetal lung maturation for women at risk of preterm birth. Cochrane Database Syst Rev. 2017;3:CD004454'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-008',
    question: 'A woman presents with heavy menstrual bleeding and hemoglobin of 6.5 g/dL. She is hemodynamically stable. What is the most appropriate acute management?',
    options: [
      'Emergency hysterectomy',
      'High-dose estrogen therapy',
      'Tranexamic acid',
      'Immediate blood transfusion'
    ],
    correctIndex: 2,
    explanation: 'Tranexamic acid is effective for acute heavy menstrual bleeding by inhibiting fibrinolysis. While the patient may need transfusion for severe anemia, controlling the bleeding is the immediate priority if she is hemodynamically stable.',
    references: [
      'ACOG Committee Opinion No. 557: Management of Acute Abnormal Uterine Bleeding in Nonpregnant Reproductive-Aged Women. Obstet Gynecol. 2013;121(4):891-896',
      'Shakur H, et al. Antifibrinolytic drugs for treating primary postpartum haemorrhage. Cochrane Database Syst Rev. 2018;2:CD012964'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-009',
    question: 'A pregnant patient presents with severe abdominal pain and shock. She reports feeling a "popping" sensation. What is the most likely diagnosis?',
    options: [
      'Placental abruption',
      'Uterine rupture',
      'Amniotic fluid embolism',
      'Preterm labor'
    ],
    correctIndex: 1,
    explanation: 'Uterine rupture typically presents with sudden severe abdominal pain, often described as a "popping" or "tearing" sensation, followed by relief of pain and then shock. This is most common in patients with prior uterine surgery.',
    references: [
      'Zwart JJ, et al. Uterine rupture in The Netherlands: a nationwide population-based cohort study. BJOG. 2009;116(8):1069-1078',
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-010',
    question: 'A pregnant patient at 39 weeks presents with sudden onset dyspnea, cyanosis, and shock during labor. What is the most likely diagnosis?',
    options: [
      'Pulmonary embolism',
      'Amniotic fluid embolism',
      'Pneumonia',
      'Cardiac arrest'
    ],
    correctIndex: 1,
    explanation: 'Amniotic fluid embolism presents with sudden onset respiratory distress, cardiovascular collapse, and often DIC during labor or delivery. It has a high mortality rate and requires immediate supportive care.',
    references: [
      'Knight M, et al. Amniotic fluid embolism incidence, risk factors and outcomes: a review and recommendations. BMC Pregnancy Childbirth. 2012;12:7',
      'Clark SL. Amniotic fluid embolism. Obstet Gynecol. 2014;123(2 Pt 1):337-348'
    ],
    difficulty: 'hard',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-011',
    question: 'A woman at 8 weeks gestation presents with severe nausea, vomiting, and ketonuria. She has lost 10% of her body weight. What is the diagnosis?',
    options: [
      'Normal morning sickness',
      'Hyperemesis gravidarum',
      'Gastroenteritis',
      'Preeclampsia'
    ],
    correctIndex: 1,
    explanation: 'Hyperemesis gravidarum is severe nausea and vomiting in pregnancy with weight loss >5%, dehydration, and ketonuria. It requires aggressive fluid resuscitation and antiemetic therapy. Some patients may require parenteral nutrition.',
    references: [
      'ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30',
      'Fejzo MS, et al. Hyperemesis gravidarum and the risk of emotional distress during and after pregnancy'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-012',
    question: 'A 22-year-old woman presents with fever, purulent vaginal discharge, and pelvic pain. She has multiple sexual partners. What is the most likely diagnosis?',
    options: [
      'Urinary tract infection',
      'Pelvic inflammatory disease',
      'Bacterial vaginosis',
      'Endometriosis'
    ],
    correctIndex: 1,
    explanation: 'Pelvic inflammatory disease (PID) typically presents with fever, purulent vaginal discharge, and pelvic pain in sexually active women. It requires immediate antibiotic treatment to prevent complications like infertility and ectopic pregnancy.',
    references: [
      'CDC. Sexually Transmitted Diseases Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187',
      'Brunham RC, et al. Pelvic inflammatory disease. N Engl J Med. 2015;372(21):2039-2048'
    ],
    difficulty: 'easy',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-013',
    question: 'A postmenopausal woman presents with sudden onset severe abdominal pain and an adnexal mass on CT. What is the most appropriate management?',
    options: [
      'Observation',
      'Hormonal therapy',
      'Urgent surgical exploration',
      'Antibiotics'
    ],
    correctIndex: 2,
    explanation: 'Adnexal masses in postmenopausal women with acute pain raise concern for ovarian torsion or malignancy. Given the acute presentation, surgical exploration is warranted to prevent ovarian necrosis and evaluate for malignancy.',
    references: [
      'ACOG Practice Bulletin No. 174: Evaluation and Management of Adnexal Masses. Obstet Gynecol. 2016;128(5):e210-e226',
      'Goff BA, et al. Frequency of symptoms of ovarian cancer in women presenting to primary care clinics'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-014',
    question: 'A pregnant patient at 20 weeks presents with membrane rupture confirmed by pooling, nitrazine, and ferning tests. What is the major concern?',
    options: [
      'Preterm labor',
      'Infection (chorioamnionitis)',
      'Placental abruption',
      'Fetal distress'
    ],
    correctIndex: 1,
    explanation: 'Preterm prelabor rupture of membranes (PPROM) carries significant risk of ascending infection leading to chorioamnionitis, which can cause maternal sepsis and fetal compromise. Close monitoring for signs of infection is essential.',
    references: [
      'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97',
      'Mercer BM. Preterm premature rupture of the membranes. Obstet Gynecol. 2003;101(1):178-193'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-015',
    question: 'A pregnant patient develops HELLP syndrome. What does this acronym represent?',
    options: [
      'Hemolysis, Elevated Liver enzymes, Low Platelets',
      'Hypertension, Edema, Liver failure, Proteinuria',
      'Hepatic Encephalopathy, Low Lipids, Preeclampsia',
      'Heart failure, Elevated creatinine, Low Protein'
    ],
    correctIndex: 0,
    explanation: 'HELLP syndrome consists of Hemolysis, Elevated Liver enzymes, and Low Platelets. It is a severe form of preeclampsia that can occur without severe hypertension and requires immediate delivery for maternal and fetal safety.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Abildgaard U, et al. Pathogenesis of the syndrome of hemolysis, elevated liver enzymes, and low platelet count (HELLP)'
    ],
    difficulty: 'easy',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-016',
    question: 'A woman presents with severe dysmenorrhea, dyspareunia, and infertility. Pelvic examination reveals fixed, retroverted uterus and nodularity. What is the most likely diagnosis?',
    options: [
      'Uterine fibroids',
      'Endometriosis',
      'Adenomyosis',
      'Ovarian cysts'
    ],
    correctIndex: 1,
    explanation: 'The triad of dysmenorrhea, dyspareunia, and infertility with a fixed retroverted uterus and pelvic nodularity is classic for endometriosis. Definitive diagnosis requires laparoscopy, but clinical presentation is highly suggestive.',
    references: [
      'ACOG Practice Bulletin No. 114: Management of Endometriosis. Obstet Gynecol. 2010;116(1):223-236',
      'Giudice LC, et al. Endometriosis. Lancet. 2004;364(9447):1789-1799'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-017',
    question: 'A pregnant patient at 28 weeks presents with sudden gush of fluid and cord prolapse is visualized. What is the most appropriate immediate management?',
    options: [
      'Emergency cesarean section',
      'Trendelenburg position and manual elevation of presenting part',
      'Push cord back into vagina',
      'Immediate vaginal delivery'
    ],
    correctIndex: 1,
    explanation: 'Umbilical cord prolapse is an obstetric emergency. Immediate management includes putting the patient in Trendelenburg position and manually elevating the presenting part to relieve cord compression while preparing for emergency cesarean delivery.',
    references: [
      'ACOG Committee Opinion No. 543: Timing of Umbilical Cord Clamping After Birth. Obstet Gynecol. 2012;120(6):1522-1526',
      'Usta IM, et al. Current obstetrical practice and umbilical cord prolapse'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-018',
    question: 'A woman presents with breast pain, erythema, and fever 2 weeks postpartum while breastfeeding. What is the most likely diagnosis?',
    options: [
      'Mastitis',
      'Breast engorgement',
      'Inflammatory breast cancer',
      'Breast abscess'
    ],
    correctIndex: 0,
    explanation: 'Mastitis typically occurs 2-6 weeks postpartum in breastfeeding women, presenting with breast pain, erythema, fever, and flu-like symptoms. It\'s usually caused by Staphylococcus aureus and responds to antibiotics while continuing breastfeeding.',
    references: [
      'ACOG Committee Opinion No. 756: Optimizing Support for Breastfeeding as Part of Obstetric Practice. Obstet Gynecol. 2018;132(4):e187-e196',
      'Jahanfar S, et al. Antibiotics for mastitis in breastfeeding women. Cochrane Database Syst Rev. 2013;(2):CD005458'
    ],
    difficulty: 'easy',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-019',
    question: 'A pregnant patient at 36 weeks presents with sudden onset severe back pain and decreased fetal movement. What is the most concerning diagnosis?',
    options: [
      'Preterm labor',
      'Placental abruption',
      'Kidney stones',
      'Muscle strain'
    ],
    correctIndex: 1,
    explanation: 'Sudden severe back pain with decreased fetal movement suggests placental abruption, particularly a posterior (concealed) abruption. This can present with back pain rather than abdominal pain and is associated with fetal compromise.',
    references: [
      'Oyelese Y, et al. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016',
      'Ananth CV, et al. Maternal-fetal conditions necessitating a medical intervention resulting in preterm birth'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-020',
    question: 'A woman at 10 weeks gestation presents with severe abdominal pain and an adnexal mass larger than 8 cm. Beta-hCG is appropriate for gestational age. What is the most likely diagnosis?',
    options: [
      'Ectopic pregnancy',
      'Ovarian hyperstimulation syndrome',
      'Corpus luteum cyst with torsion',
      'Ovarian cancer'
    ],
    correctIndex: 2,
    explanation: 'Large corpus luteum cysts can develop in early pregnancy and are prone to torsion, causing severe pain. The appropriate beta-hCG for gestational age suggests normal intrauterine pregnancy, making ectopic pregnancy less likely.',
    references: [
      'Bottomley C, et al. Diagnosis and management of ovarian cyst accidents. Best Pract Res Clin Obstet Gynaecol. 2009;23(5):711-724',
      'Swire MN, et al. Emergency department management of ovarian cysts in reproductive-age women'
    ],
    difficulty: 'hard',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-021',
    question: 'A patient with known uterine fibroids presents with severe pelvic pain and fever. MRI shows signal changes in a fibroid. What is the most likely diagnosis?',
    options: [
      'Malignant transformation',
      'Fibroid degeneration',
      'Pelvic inflammatory disease',
      'Endometriosis'
    ],
    correctIndex: 1,
    explanation: 'Acute fibroid degeneration can cause severe pain and fever, especially during pregnancy or after embolization procedures. MRI changes showing areas of necrosis or hemorrhage within the fibroid support this diagnosis.',
    references: [
      'ACOG Practice Bulletin No. 96: Alternatives to Hysterectomy in the Management of Leiomyomas. Obstet Gynecol. 2008;112(2 Pt 1):387-400',
      'Parker WH. Etiology, symptomatology, and diagnosis of uterine myomas'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-022',
    question: 'A pregnant patient presents with severe itching, particularly on palms and soles, and elevated bile acids. What is the diagnosis and main concern?',
    options: [
      'PUPPP rash; maternal discomfort',
      'Intrahepatic cholestasis; fetal demise',
      'Allergic reaction; anaphylaxis',
      'Eczema; skin infection'
    ],
    correctIndex: 1,
    explanation: 'Intrahepatic cholestasis of pregnancy presents with severe pruritus and elevated bile acids. The main concern is sudden fetal demise, which can occur without warning. Close fetal monitoring and early delivery may be necessary.',
    references: [
      'ACOG Committee Opinion No. 764: Medically Indicated Late-Preterm and Early-Term Deliveries. Obstet Gynecol. 2019;133(2):e151-e155',
      'Geenes V, et al. Intrahepatic cholestasis of pregnancy. World J Gastroenterol. 2009;15(17):2049-2066'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-023',
    question: 'A woman presents with irregular vaginal bleeding and a "grape-like" mass protruding from the vagina. Beta-hCG is markedly elevated. What is the diagnosis?',
    options: [
      'Incomplete abortion',
      'Cervical cancer',
      'Hydatidiform mole',
      'Uterine prolapse'
    ],
    correctIndex: 2,
    explanation: 'Hydatidiform mole (molar pregnancy) can present with vaginal bleeding, passage of grape-like vesicles, and markedly elevated beta-hCG levels. It requires immediate evacuation and follow-up due to risk of malignant transformation.',
    references: [
      'ACOG Practice Bulletin No. 53: Diagnosis and Treatment of Gestational Trophoblastic Disease. Obstet Gynecol. 2004;103(6):1365-1377',
      'Seckl MJ, et al. Gestational trophoblastic disease. Lancet. 2010;376(9742):717-729'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-024',
    question: 'A pregnant patient at 35 weeks presents with persistent uterine contractions, fetal tachycardia, and maternal fever of 101.5°F. What is the diagnosis?',
    options: [
      'Normal labor',
      'Chorioamnionitis',
      'Urinary tract infection',
      'Viral syndrome'
    ],
    correctIndex: 1,
    explanation: 'The combination of uterine contractions, fetal tachycardia, and maternal fever suggests chorioamnionitis (intraamniotic infection). This requires immediate antibiotic therapy and delivery to prevent maternal sepsis and fetal compromise.',
    references: [
      'ACOG Committee Opinion No. 712: Intrapartum Management of Intraamniotic Infection. Obstet Gynecol. 2017;130(2):e95-e101',
      'Tita AT, et al. Diagnosis and management of clinical chorioamnionitis'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-025',
    question: 'A woman presents with severe right lower quadrant pain, nausea, and a positive pregnancy test. Transvaginal ultrasound shows an empty uterus and free fluid in the pelvis. What is the most appropriate management?',
    options: [
      'Methotrexate therapy',
      'Observation with serial beta-hCG',
      'Immediate surgical intervention',
      'Antibiotics'
    ],
    correctIndex: 2,
    explanation: 'Empty uterus with positive pregnancy test and free fluid in pelvis suggests ruptured ectopic pregnancy with hemoperitoneum. This requires immediate surgical intervention (laparoscopy or laparotomy) to control bleeding.',
    references: [
      'Barnhart KT. Clinical practice. Ectopic pregnancy. N Engl J Med. 2009;361(4):379-387',
      'ACOG Practice Bulletin No. 193: Tubal Ectopic Pregnancy. Obstet Gynecol. 2018;131(3):e91-e103'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-026',
    question: 'A postpartum patient develops sudden shortness of breath, chest pain, and hypoxemia. She had a cesarean section 3 days ago. What is the most likely diagnosis?',
    options: [
      'Pneumonia',
      'Pulmonary embolism',
      'Pneumothorax',
      'Pulmonary edema'
    ],
    correctIndex: 1,
    explanation: 'Pregnancy and the postpartum period are hypercoagulable states with increased risk of venous thromboembolism. Recent cesarean section further increases risk. Pulmonary embolism should be strongly suspected with these symptoms.',
    references: [
      'ACOG Practice Bulletin No. 196: Thromboembolism in Pregnancy. Obstet Gynecol. 2018;132(1):e1-e17',
      'Sultan AA, et al. Risk of first venous thromboembolism in pregnant women in hospital'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-027',
    question: 'A pregnant patient at 32 weeks is involved in a motor vehicle accident. She complains of abdominal pain and vaginal bleeding. What is the most appropriate initial assessment?',
    options: [
      'Fetal heart rate monitoring',
      'Pelvic examination',
      'Maternal hemodynamic assessment',
      'Ultrasound for placental location'
    ],
    correctIndex: 2,
    explanation: 'In pregnant trauma patients, maternal hemodynamic assessment takes priority. The best chance for fetal survival is maternal survival. Once maternal stability is ensured, fetal assessment should follow.',
    references: [
      'ACOG Committee Opinion No. 711: Opioid Use and Opioid Use Disorder in Pregnancy. Obstet Gynecol. 2017;130(2):e81-e94',
      'Mendez-Figueroa H, et al. Trauma in pregnancy: an updated systematic review'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-028',
    question: 'A woman presents with vulvar pain, dysuria, and multiple painful shallow ulcers. She reports this is a recurrent problem. What is the most likely diagnosis?',
    options: [
      'Herpes simplex virus',
      'Behçet disease',
      'Aphthous ulcers',
      'Crohn disease'
    ],
    correctIndex: 0,
    explanation: 'Recurrent painful vulvar ulcers are most commonly caused by herpes simplex virus. The painful nature and recurrent pattern are characteristic. First episodes are typically more severe than recurrences.',
    references: [
      'CDC. Sexually Transmitted Diseases Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187',
      'Wald A, et al. Reactivation of genital herpes simplex virus type 2 infection in asymptomatic seropositive persons'
    ],
    difficulty: 'easy',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-029',
    question: 'A pregnant patient develops severe right upper quadrant pain and elevated liver enzymes. Platelet count is 50,000. What is the most appropriate management?',
    options: [
      'Observation',
      'Antiviral therapy',
      'Immediate delivery',
      'Liver biopsy'
    ],
    correctIndex: 2,
    explanation: 'This presentation suggests HELLP syndrome (hemolysis, elevated liver enzymes, low platelets), which requires immediate delivery regardless of gestational age due to high maternal and fetal morbidity and mortality.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Sibai BM. Diagnosis, controversies, and management of the syndrome of hemolysis, elevated liver enzymes, and low platelet count'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  },
  {
    id: 'goe-030',
    question: 'A woman presents with postcoital bleeding and an irregularly shaped cervical lesion on speculum examination. What is the most appropriate next step?',
    options: [
      'HPV testing',
      'Colposcopy and biopsy',
      'Cervical cytology only',
      'Observation'
    ],
    correctIndex: 1,
    explanation: 'Any visible cervical lesion, especially with postcoital bleeding, requires tissue diagnosis through colposcopy and biopsy to rule out cervical cancer. Cytology alone is insufficient for evaluating a visible lesion.',
    references: [
      'ACOG Practice Bulletin No. 168: Cervical Cancer Screening and Prevention. Obstet Gynecol. 2016;128(4):e111-e130',
      'Saslow D, et al. American Cancer Society, American Society for Colposcopy and Cervical Pathology, and American Society for Clinical Pathology screening guidelines'
    ],
    difficulty: 'medium',
    topicId: 'general-obgyn-emergencies'
  }
];