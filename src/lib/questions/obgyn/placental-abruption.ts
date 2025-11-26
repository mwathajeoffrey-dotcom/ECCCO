import { Question } from '../types';

export const placentalAbruptionQuestions: Question[] = [
  {
    id: 'pa-001',
    question: 'A 28-year-old G2P1 at 32 weeks gestation presents with sudden onset severe abdominal pain and vaginal bleeding. On exam, the uterus is firm and tender. Fetal heart rate shows late decelerations. What is the most likely diagnosis?',
    options: [
      'Placenta previa',
      'Placental abruption',
      'Uterine rupture',
      'Vasa previa'
    ],
    correctIndex: 1,
    explanation: 'This presentation is classic for placental abruption: sudden onset painful bleeding, uterine tenderness/rigidity, and fetal distress. This contrasts with placenta previa which presents with painless bleeding and a soft uterus.',
    references: [
      'Ananth CV, et al. Placental abruption among singleton and twin births in the United States. Am J Obstet Gynecol. 2001;184(4):757-762',
      'Tikkanen M. Placental abruption: epidemiology, risk factors and consequences. Acta Obstet Gynecol Scand. 2011;90(2):140-149'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-002',
    question: 'What is the most common cause of placental abruption?',
    options: [
      'Maternal trauma',
      'Chronic hypertension',
      'Cocaine use',
      'Unknown/idiopathic'
    ],
    correctIndex: 3,
    explanation: 'The majority (40-60%) of placental abruptions are idiopathic with no identifiable cause. However, important risk factors include hypertension, trauma, cocaine use, smoking, prior abruption, and PPROM.',
    references: [
      'Ananth CV, Wilcox AJ. Placental abruption and perinatal mortality in the United States. Am J Epidemiol. 2001;153(4):332-337',
      'Tikkanen M. Placental abruption: epidemiology, risk factors and consequences. Acta Obstet Gynecol Scand. 2011;90(2):140-149'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-003',
    question: 'A patient at 35 weeks with severe placental abruption requires emergency cesarean delivery. During surgery, a large retroplacental clot is noted. What postpartum complication is this patient at highest risk for?',
    options: [
      'Postpartum hemorrhage from uterine atony',
      'Retained placenta',
      'Uterine inversion',
      'Placenta accreta'
    ],
    correctIndex: 0,
    explanation: 'Placental abruption significantly increases risk of postpartum hemorrhage from uterine atony. The area where the placenta separated becomes infiltrated with blood (Couvelaire uterus), impairing myometrial contractility. Coagulopathy from DIC also contributes to bleeding risk.',
    references: [
      'Kramer MS, et al. Incidence, risk factors, and temporal trends in severe postpartum hemorrhage. Am J Obstet Gynecol. 2013;209(5):449.e1-7',
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-004',
    question: 'What laboratory finding is most concerning for DIC in a patient with placental abruption?',
    options: [
      'Fibrinogen <200 mg/dL',
      'Platelets <100,000/μL',
      'Elevated D-dimer',
      'INR >1.5'
    ],
    correctIndex: 0,
    explanation: 'Fibrinogen <200 mg/dL is concerning for consumptive coagulopathy/DIC in pregnancy (normal pregnancy fibrinogen is 300-600 mg/dL). Severe abruption releases tissue factor triggering DIC. Other findings include thrombocytopenia, elevated PT/PTT, elevated D-dimer, and microangiopathic hemolytic anemia.',
    references: [
      'Erez O, et al. Disseminated intravascular coagulation in pregnancy: insights in pathophysiology, diagnosis and management. Am J Obstet Gynecol. 2015;213(4):452-463',
      'Thachil J, Toh CH. Disseminated intravascular coagulation in obstetric disorders and its acute haematological management. Blood Rev. 2009;23(4):167-176'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-005',
    question: 'A patient presents at 30 weeks with vaginal bleeding and a tender, firm uterus. Fetal heart tones are absent. Ultrasound shows a large retroplacental hematoma. What is the most appropriate immediate management?',
    options: [
      'Emergency cesarean delivery',
      'Expectant management with tocolysis',
      'Induction of labor',
      'Observation for 48 hours'
    ],
    correctIndex: 2,
    explanation: 'With fetal demise and hemodynamically stable mother, induction of labor is preferred over cesarean delivery unless maternal status deteriorates. Vaginal delivery reduces maternal surgical risk and allows better assessment/management of coagulopathy. Monitor closely for hemorrhage and DIC.',
    references: [
      'Oyelese Y, Ananth CV. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016',
      'Cunningham FG, et al. Williams Obstetrics, 25th Edition. Chapter 41: Obstetrical Hemorrhage'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-006',
    question: 'What is the recurrence risk of placental abruption in a subsequent pregnancy?',
    options: [
      '1-2%',
      '10-15%',
      '25-30%',
      '40-50%'
    ],
    correctIndex: 1,
    explanation: 'The recurrence risk of placental abruption is approximately 10-15% after one previous abruption and increases to 20-25% after two prior abruptions. This is significantly higher than the general population risk of 0.5-1%.',
    references: [
      'Ananth CV, et al. Recurrence of placental abruption. Obstet Gynecol. 2007;110(1):128-133',
      'Tikkanen M, et al. Preeclampsia associates with increased risk of placental abruption in term deliveries. Acta Obstet Gynecol Scand. 2011;90(9):1024-1029'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-007',
    question: 'Which clinical scenario represents a "concealed" placental abruption?',
    options: [
      'Vaginal bleeding with uterine tenderness',
      'No vaginal bleeding but uterine tenderness and fetal distress',
      'Heavy vaginal bleeding without pain',
      'Painless vaginal bleeding with soft uterus'
    ],
    correctIndex: 1,
    explanation: 'Concealed abruption (10-20% of cases) occurs when blood is trapped between the placenta and uterine wall without vaginal bleeding. Patient presents with abdominal pain, uterine tenderness, and fetal distress but minimal or no external bleeding. This can be more dangerous as blood loss is underestimated.',
    references: [
      'Oyelese Y, Ananth CV. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016',
      'Tikkanen M. Placental abruption: epidemiology, risk factors and consequences. Acta Obstet Gynecol Scand. 2011;90(2):140-149'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-008',
    question: 'A pregnant patient involved in a motor vehicle collision at 28 weeks presents to the ED. She denies pain or bleeding. Fetal heart rate is reassuring. What is the minimum observation period recommended?',
    options: [
      '2 hours',
      '4 hours',
      '6 hours',
      '24 hours'
    ],
    correctIndex: 1,
    explanation: 'After maternal trauma, continuous fetal monitoring for at least 4 hours is recommended. If contractions, vaginal bleeding, abdominal pain, or non-reassuring fetal status develop, extend monitoring to 24 hours. Most abruptions after trauma present within 4-6 hours.',
    references: [
      'ACOG Committee Opinion No. 711: Opioid Use and Opioid Use Disorder in Pregnancy. Obstet Gynecol. 2017;130(2):e81-e94',
      'Mendez-Figueroa H, et al. Trauma in pregnancy: an updated systematic review. Am J Obstet Gynecol. 2013;209(1):1-10'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-009',
    question: 'Which ultrasound finding is LEAST sensitive for diagnosing placental abruption?',
    options: [
      'Retroplacental hematoma',
      'Increased placental thickness',
      'Subchorionic hematoma',
      'Normal appearance'
    ],
    correctIndex: 3,
    explanation: 'Ultrasound has low sensitivity (25-50%) for diagnosing abruption - many abruptions show normal ultrasound. Diagnosis is primarily clinical. When visible, findings include retroplacental hematoma, thickened placenta, or subchorionic bleeding. A normal ultrasound does NOT rule out abruption.',
    references: [
      'Glantz C, Purnell L. Clinical utility of sonography in the diagnosis and treatment of placental abruption. J Ultrasound Med. 2002;21(8):837-840',
      'Sholl JS. Abruptio placentae: clinical management in nonacute cases. Am J Obstet Gynecol. 1987;156(1):40-51'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-010',
    question: 'A patient with known chronic hypertension presents at 34 weeks with sudden onset abdominal pain and vaginal bleeding. Blood pressure is 180/110. What medication should be avoided?',
    options: [
      'Labetalol',
      'Nifedipine',
      'Hydralazine',
      'Magnesium sulfate'
    ],
    correctIndex: 3,
    explanation: 'While magnesium sulfate is used for seizure prophylaxis in preeclampsia, in the setting of active placental abruption with bleeding, it should be used cautiously as it can worsen coagulopathy and is a tocolytic that could delay delivery. Focus is on blood pressure control and expedited delivery.',
    references: [
      'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260',
      'Oyelese Y, Ananth CV. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-011',
    question: 'What percentage of patients with severe placental abruption develop DIC?',
    options: [
      '5-10%',
      '10-20%',
      '30-40%',
      '50-60%'
    ],
    correctIndex: 2,
    explanation: 'Approximately 30-40% of patients with severe abruption develop DIC. Risk factors for DIC include massive abruption (>50% separation), fetal demise, and delayed delivery. Monitor coagulation studies closely and have blood products available.',
    references: [
      'Levi M, et al. Disseminated intravascular coagulation. N Engl J Med. 1999;341(8):586-592',
      'Erez O, et al. DIC in pregnancy: insights in pathophysiology, diagnosis and management. Am J Obstet Gynecol. 2015;213(4):452-463'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-012',
    question: 'A patient with severe abruption undergoes emergency cesarean. Estimated blood loss is 2500 mL. Which blood product should be prioritized after packed RBCs?',
    options: [
      'Fresh frozen plasma',
      'Platelets',
      'Cryoprecipitate',
      'Whole blood'
    ],
    correctIndex: 2,
    explanation: 'In obstetric hemorrhage with DIC, cryoprecipitate should be given early to replete fibrinogen. Obstetric hemorrhage uniquely depletes fibrinogen first. Goal fibrinogen is >200 mg/dL (some recommend >300 mg/dL). Massive transfusion protocols often use 1:1:1 ratio of RBC:FFP:platelets with early cryoprecipitate.',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Collins PW, et al. Management of coagulopathy associated with postpartum hemorrhage: guidance from the SSC of the ISTH. J Thromb Haemost. 2016;14(1):205-210'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-013',
    question: 'Which patient population has the highest risk of placental abruption?',
    options: [
      'Primigravidas',
      'Women with prior abruption and chronic hypertension',
      'Women <20 years old',
      'Women with gestational diabetes'
    ],
    correctIndex: 1,
    explanation: 'The highest risk is in women with both prior abruption AND chronic hypertension - risk can exceed 25%. Individual risk factors: prior abruption (10-15% recurrence), chronic hypertension (2-3x risk), smoking (2-3x risk), cocaine use (10x risk), thrombophilia (risk varies).',
    references: [
      'Ananth CV, et al. Placental abruption and adverse perinatal outcomes. JAMA. 1999;282(17):1646-1651',
      'Tikkanen M. Placental abruption: epidemiology, risk factors and consequences. Acta Obstet Gynecol Scand. 2011;90(2):140-149'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-014',
    question: 'A patient at 26 weeks with mild abruption is hemodynamically stable with reassuring fetal status. What is the most appropriate management?',
    options: [
      'Immediate delivery',
      'Hospitalization, steroids, close monitoring',
      'Outpatient management with weekly follow-up',
      'Tocolysis for 48 hours then discharge'
    ],
    correctIndex: 1,
    explanation: 'For preterm gestation with mild abruption and stable maternal-fetal status, hospitalization with close monitoring is appropriate. Administer corticosteroids for fetal lung maturity. Avoid tocolysis as it may mask ongoing abruption. Deliver for maternal instability, fetal compromise, or progression.',
    references: [
      'Oyelese Y, Ananth CV. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016',
      'Sholl JS. Abruptio placentae: clinical management in nonacute cases. Am J Obstet Gynecol. 1987;156(1):40-51'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-015',
    question: 'What is the perinatal mortality rate associated with severe placental abruption?',
    options: [
      '5-10%',
      '15-20%',
      '30-50%',
      '60-80%'
    ],
    correctIndex: 2,
    explanation: 'Severe placental abruption carries a perinatal mortality rate of 30-50% or higher, depending on gestational age and severity. Causes include hypoxia, prematurity, and exsanguination. Even with optimal management, outcomes depend largely on extent of placental separation and gestational age at occurrence.',
    references: [
      'Ananth CV, Wilcox AJ. Placental abruption and perinatal mortality in the United States. Am J Epidemiol. 2001;153(4):332-337',
      'Tikkanen M, et al. Preeclampsia associates with increased risk of placental abruption in term deliveries. Acta Obstet Gynecol Scand. 2011;90(9):1024-1029'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-016',
    question: 'A patient with known placental abruption is receiving massive transfusion. Her fibrinogen level is 85 mg/dL. How many units of cryoprecipitate are needed to raise fibrinogen by approximately 50 mg/dL?',
    options: [
      '5 units',
      '10 units',
      '15 units',
      '20 units'
    ],
    correctIndex: 1,
    explanation: 'Each unit of cryoprecipitate contains approximately 200-250 mg of fibrinogen. To raise fibrinogen by 50 mg/dL in an average adult (70 kg, 5L plasma volume), approximately 10 units are needed. Cryoprecipitate is the most concentrated source of fibrinogen and should be given early in obstetric hemorrhage.',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Collins PW, et al. Management of coagulopathy associated with postpartum hemorrhage. J Thromb Haemost. 2016;14(1):205-210'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-017',
    question: 'What is the "Couvelaire uterus" associated with placental abruption?',
    options: [
      'Uterine rupture with placental extrusion',
      'Blood infiltration into myometrium causing purple discoloration',
      'Uterine inversion from placental separation',
      'Placental calcification visible on ultrasound'
    ],
    correctIndex: 1,
    explanation: 'Couvelaire uterus (uteroplacental apoplexy) occurs when blood from placental abruption dissects into the myometrium, causing blue-purple discoloration and ecchymoses on the uterine surface. This infiltration impairs myometrial contractility, increasing risk of postpartum hemorrhage and may necessitate hysterectomy.',
    references: [
      'Cunningham FG, et al. Williams Obstetrics, 25th Edition. Chapter 41: Obstetrical Hemorrhage',
      'Oyelese Y, Ananth CV. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-018',
    question: 'A 38-year-old G5P4 with chronic hypertension presents at 36 weeks with abdominal pain and vaginal bleeding. She smokes 1 pack per day and uses cocaine occasionally. What is her approximate risk of placental abruption?',
    options: [
      '2-3%',
      '5-10%',
      '15-20%',
      '30-40%'
    ],
    correctIndex: 2,
    explanation: 'This patient has multiple high-risk factors: chronic hypertension (2-3x risk), multiparity (increased risk), smoking (2-3x risk), and cocaine use (up to 10x risk). Combined risk factors have multiplicative effects. Her risk is approximately 15-20% or higher, much greater than the general population risk of 0.5-1%.',
    references: [
      'Tikkanen M. Placental abruption: epidemiology, risk factors and consequences. Acta Obstet Gynecol Scand. 2011;90(2):140-149',
      'Ananth CV, et al. Placental abruption and adverse perinatal outcomes. JAMA. 1999;282(17):1646-1651'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-019',
    question: 'Which fetal heart rate pattern is most concerning in the setting of placental abruption?',
    options: [
      'Early decelerations',
      'Variable decelerations',
      'Late decelerations with minimal variability',
      'Accelerations with good variability'
    ],
    correctIndex: 2,
    explanation: 'Late decelerations with minimal variability indicate uteroplacental insufficiency and fetal hypoxia - a critical finding in abruption. This pattern reflects compromised placental gas exchange from the separation. Sinusoidal pattern and prolonged deceleration to bradycardia are also ominous signs requiring immediate delivery.',
    references: [
      'Macones GA, et al. The 2008 NICHD workshop report on electronic fetal monitoring. Obstet Gynecol. 2008;112(3):661-666',
      'Oyelese Y, Ananth CV. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-020',
    question: 'A patient with placental abruption and massive hemorrhage receives 10 units of PRBCs. What is the target platelet count before attempting cesarean delivery?',
    options: [
      '>20,000/μL',
      '>50,000/μL',
      '>75,000/μL',
      '>100,000/μL'
    ],
    correctIndex: 1,
    explanation: 'For cesarean delivery or other surgical procedures, platelet count >50,000/μL is generally adequate for hemostasis. For neuraxial anesthesia, >70,000-80,000/μL is preferred. In massive transfusion, give 1 unit of platelets for every 4-6 units of RBCs (or follow 1:1:1 ratio of RBC:FFP:platelets).',
    references: [
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186',
      'Kaufman RM, et al. Platelet transfusion: a clinical practice guideline from the AABB. Ann Intern Med. 2015;162(3):205-213'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-021',
    question: 'What is the role of tranexamic acid in placental abruption with active bleeding?',
    options: [
      'Contraindicated due to thrombosis risk',
      'Should be given within 3 hours of bleeding onset',
      'Only for postpartum hemorrhage, not antepartum',
      'No proven benefit in pregnancy'
    ],
    correctIndex: 1,
    explanation: 'Tranexamic acid (TXA) is an antifibrinolytic that should be given within 3 hours of bleeding onset (1g IV over 10 minutes, repeat once if needed). The WOMAN trial showed reduced maternal mortality from hemorrhage. It is safe in pregnancy and increasingly used for both antepartum and postpartum hemorrhage.',
    references: [
      'WOMAN Trial Collaborators. Effect of early tranexamic acid administration on mortality, hysterectomy, and other morbidities in women with post-partum haemorrhage. Lancet. 2017;389(10084):2105-2116',
      'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-022',
    question: 'A patient at 24 weeks presents with mild abruption and contractions every 3 minutes. Should tocolysis be administered?',
    options: [
      'Yes, to prevent preterm delivery',
      'No, tocolysis is contraindicated with abruption',
      'Only if bleeding has stopped for 6 hours',
      'Yes, but only nifedipine, not magnesium'
    ],
    correctIndex: 1,
    explanation: 'Tocolysis is generally contraindicated in placental abruption. Stopping contractions may mask ongoing abruption and delay necessary delivery. Contractions may be a physiologic response to abruption. Focus should be on maternal stabilization, steroid administration for fetal lung maturity, and close monitoring for need to deliver.',
    references: [
      'Oyelese Y, Ananth CV. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016',
      'ACOG Practice Bulletin No. 171: Management of Preterm Labor. Obstet Gynecol. 2016;128(4):e155-e164'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-023',
    question: 'What laboratory value best predicts the need for blood product transfusion in placental abruption?',
    options: [
      'Hemoglobin <7 g/dL',
      'Platelets <50,000/μL',
      'Fibrinogen <200 mg/dL',
      'INR >2.0'
    ],
    correctIndex: 2,
    explanation: 'Fibrinogen <200 mg/dL (especially <150 mg/dL) is highly predictive of severe hemorrhage requiring massive transfusion in obstetric patients. Fibrinogen is depleted first in obstetric hemorrhage and is a more sensitive early marker than other coagulation parameters. Target fibrinogen >200 mg/dL, ideally >300 mg/dL.',
    references: [
      'Charbitit K, et al. Early fibrinogen concentration and transfusion requirements in postpartum haemorrhage. BJOG. 2007;114(6):688-695',
      'Collins PW, et al. Management of coagulopathy associated with postpartum hemorrhage. J Thromb Haemost. 2016;14(1):205-210'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-024',
    question: 'A pregnant patient presents after a high-speed motor vehicle collision with seat belt use. She has abdominal ecchymosis in a "seat belt sign" pattern. What is the significance?',
    options: [
      'Indicates proper seat belt use, no concern',
      '50% risk of placental abruption',
      'Associated with bowel and vascular injury',
      'Requires immediate cesarean delivery'
    ],
    correctIndex: 2,
    explanation: 'The "seat belt sign" (abdominal wall ecchymosis from seat belt) is associated with increased risk of intra-abdominal injury including bowel perforation, mesenteric injury, and placental abruption. These patients require extended monitoring (24+ hours), serial abdominal exams, and consideration of CT imaging for concerning findings.',
    references: [
      'Mendez-Figueroa H, et al. Trauma in pregnancy: an updated systematic review. Am J Obstet Gynecol. 2013;209(1):1-10',
      'Schiff MA, et al. Pregnant occupants in motor vehicle crashes. Obstet Gynecol. 2002;100(1):115-119'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-025',
    question: 'What is the appropriate dose of Rh immune globulin for a Rh-negative patient with severe abruption and massive fetomaternal hemorrhage?',
    options: [
      '50 mcg',
      '300 mcg regardless of hemorrhage size',
      'Calculate dose based on Kleihauer-Betke test',
      'Not needed after 28 weeks'
    ],
    correctIndex: 2,
    explanation: 'For massive fetomaternal hemorrhage, standard 300 mcg dose may be insufficient. Perform Kleihauer-Betke (KB) test or flow cytometry to quantify fetal cells in maternal circulation. Calculate required RhIG dose: (% fetal cells × maternal blood volume)/30 mL. Additional doses may be needed for large hemorrhages.',
    references: [
      'ACOG Practice Bulletin No. 181: Prevention of Rh D Alloimmunization. Obstet Gynecol. 2017;130(2):e57-e70',
      'Moise KJ Jr. Management of rhesus alloimmunization in pregnancy. Obstet Gynecol. 2008;112(1):164-176'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-026',
    question: 'Which finding on ultrasound is most specific (though not sensitive) for acute placental abruption?',
    options: [
      'Thickened placenta >5 cm',
      'Retroplacental hypoechoic or hyperechoic mass',
      'Oligohydramnios',
      'Fetal growth restriction'
    ],
    correctIndex: 1,
    explanation: 'Retroplacental hematoma (hypoechoic if acute, hyperechoic if subacute/chronic) is the most specific sonographic finding for abruption. However, ultrasound sensitivity is only 25-50% - many abruptions show normal ultrasound. Other findings include increased placental thickness and separation of membranes from placenta.',
    references: [
      'Glantz C, Purnell L. Clinical utility of sonography in the diagnosis and treatment of placental abruption. J Ultrasound Med. 2002;21(8):837-840',
      'Oyelese Y, Ananth CV. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-027',
    question: 'A patient with severe abruption develops acute kidney injury with creatinine rising from 0.8 to 3.5 mg/dL. Urine output is 15 mL/hr despite fluid resuscitation. What is the most likely cause?',
    options: [
      'Prerenal azotemia from hypovolemia',
      'Acute tubular necrosis from hypoperfusion',
      'Acute cortical necrosis',
      'Obstructive uropathy'
    ],
    correctIndex: 2,
    explanation: 'Acute cortical necrosis is a rare but devastating complication of severe placental abruption, occurring in ~2% of cases. It involves thrombotic occlusion of cortical vessels leading to irreversible renal failure. Associated with severe hemorrhage, DIC, and prolonged hypotension. May require dialysis permanently.',
    references: [
      'Prakash J, et al. Acute kidney injury in late pregnancy in developing countries. Ren Fail. 2010;32(3):309-313',
      'Turney JH, et al. Acute renal failure attributable to acute cortical necrosis. BMJ. 2001;322(7296):1207-1208'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-028',
    question: 'In chronic placental abruption (abruption occurring weeks before delivery), what is the most common presenting symptom?',
    options: [
      'Sudden severe abdominal pain',
      'Recurrent small episodes of vaginal bleeding',
      'Decreased fetal movement',
      'Hypertensive crisis'
    ],
    correctIndex: 1,
    explanation: 'Chronic abruption presents differently from acute abruption - typically with recurrent small episodes of vaginal bleeding over days to weeks, often with oligohydramnios and fetal growth restriction. The hemorrhage occurs more gradually, allowing partial compensation and continued pregnancy, but increases risk of preterm delivery and adverse outcomes.',
    references: [
      'Oyelese Y, Ananth CV. Placental abruption. Obstet Gynecol. 2006;108(4):1005-1016',
      'Tikkanen M. Placental abruption: epidemiology, risk factors and consequences. Acta Obstet Gynecol Scand. 2011;90(2):140-149'
    ],
    difficulty: 'medium',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-029',
    question: 'What is the recommended maximum time from decision for cesarean delivery to incision in a patient with severe abruption and category III fetal heart tracing?',
    options: [
      '15 minutes',
      '30 minutes',
      '60 minutes',
      '90 minutes'
    ],
    correctIndex: 1,
    explanation: 'For category III (abnormal) fetal heart rate tracing indicating fetal compromise, delivery should be accomplished as rapidly as possible, ideally within 30 minutes (decision-to-incision time). This is a "stat" or emergency cesarean. However, safety of mother and staff must be balanced with urgency - the goal is rapid but controlled delivery.',
    references: [
      'ACOG Committee Opinion No. 487: Preparing for Clinical Emergencies in Obstetrics and Gynecology. Obstet Gynecol. 2011;117(4):1032-1034',
      'Simpson KR, et al. AWHONN Practice Brief Number 3: Perinatal Patient Safety. J Obstet Gynecol Neonatal Nurs. 2016;45(5):749-751'
    ],
    difficulty: 'easy',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  },
  {
    id: 'pa-030',
    question: 'Which thrombophilia is most strongly associated with increased risk of placental abruption?',
    options: [
      'Factor V Leiden heterozygosity',
      'Prothrombin G20210A mutation',
      'Antiphospholipid syndrome',
      'Protein C deficiency'
    ],
    correctIndex: 2,
    explanation: 'Antiphospholipid syndrome (APS) has the strongest association with placental abruption, with 3-5x increased risk. APS causes placental thrombosis and infarction. Other thrombophilias (Factor V Leiden, Prothrombin mutation) have weaker associations. Women with APS typically receive aspirin and heparin during pregnancy to reduce complications.',
    references: [
      'Miyakis S, et al. International consensus statement on an update of the classification criteria for antiphospholipid syndrome. J Thromb Haemost. 2006;4(2):295-306',
      'Bramham K, et al. Pregnancy outcomes in systemic lupus erythematosus with and without previous nephritis. J Rheumatol. 2011;38(9):1906-1913'
    ],
    difficulty: 'hard',
    topicId: 'obstetric-gynecologic-emergencies',
    category: 'obstetric'
  }
];
