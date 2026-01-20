import { Question } from '../types';

export const vasaRuptureQuestions: Question[] = [
  {
    id: 'vr-001',
    question: 'What is vasa previa?',
    options: [
      'Placenta covering the internal cervical os',
      'Fetal vessels crossing or in close proximity to the internal cervical os',
      'Placental abruption with hemorrhage',
      'Umbilical cord prolapse'
    ],
    correctIndex: 1,
    explanation: 'Vasa previa: fetal vessels (from velamentous cord insertion or accessory placental lobe) traverse fetal membranes in lower uterine segment, crossing or near internal os. Unsupported by placenta/umbilical cord - vulnerable to rupture. Incidence: 1:2,500-5,000. If undiagnosed, rupture at membrane rupture causes rapid fetal exsanguination (fetal mortality >60%). Prenatal diagnosis via ultrasound with Doppler critical.',
    references: [
      'ACOG Committee Opinion No. 543: Timing of Indicated Late-Preterm and Early-Term Birth. Obstet Gynecol. 2012;120(4):908-913',
      'Oyelese Y, et al. Vasa previa: the impact of prenatal diagnosis on outcomes. Obstet Gynecol. 2004;103(5 Pt 1):937-942'
    ],
    difficulty: 'easy',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-002',
    question: 'What is the classic triad of vasa previa presentation?',
    options: [
      'Painless bleeding, placenta previa, fetal distress',
      'Membrane rupture, painless vaginal bleeding, fetal bradycardia',
      'Abdominal pain, vaginal bleeding, hypertension',
      'Contractions, bloody show, fetal tachycardia'
    ],
    correctIndex: 1,
    explanation: 'Vasa previa classic triad: 1) Rupture of membranes (spontaneous or artificial), 2) Painless vaginal bleeding (fetal blood - dark red), 3) Sudden fetal bradycardia or sinusoidal pattern. Apt test (alkali denaturation) differentiates fetal from maternal blood (rarely performed - too slow in emergency). Emergency cesarean delivery required immediately. Fetal mortality >95% if undiagnosed, <3% if diagnosed prenatally with planned cesarean.',
    references: [
      'Oyelese Y, et al. Vasa previa: the impact of prenatal diagnosis on outcomes. Obstet Gynecol. 2004;103(5 Pt 1):937-942',
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619'
    ],
    difficulty: 'easy',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-003',
    question: 'What is the recommended mode and timing of delivery for prenatally diagnosed vasa previa?',
    options: [
      'Vaginal delivery at 39 weeks',
      'Scheduled cesarean at 34-37 weeks',
      'Emergency cesarean only if bleeding occurs',
      'Induction at 38 weeks'
    ],
    correctIndex: 1,
    explanation: 'Vasa previa management: scheduled cesarean delivery at 34-37 weeks (commonly 35-36 weeks) before labor/membrane rupture. Hospitalization from 30-34 weeks controversial but may be considered for rapid access to cesarean if needed. Corticosteroids at diagnosis if <34 weeks. NEVER attempt vaginal delivery. Survival with prenatal diagnosis and planned cesarean: >97%.',
    references: [
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619',
      'Catanzarite V, et al. New approaches to the management of vasa previa. Obstet Gynecol Surv. 2001;56(5):297-303'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-004',
    question: 'Which ultrasound finding is most diagnostic of vasa previa?',
    options: [
      'Low-lying placenta',
      'Fetal vessels crossing internal os on color Doppler',
      'Oligohydramnios',
      'Echogenic amniotic fluid'
    ],
    correctIndex: 1,
    explanation: 'Diagnosis: transvaginal ultrasound with color Doppler showing fetal vessels (umbilical arteries/vein with characteristic waveform) crossing internal cervical os or within 2cm. Pulsed-wave Doppler confirms fetal origin (heart rate). Screen at 18-20 week anatomy scan, particularly if risk factors present. 3D/4D ultrasound may enhance visualization. False positives possible - confirm with repeat scan at 28-32 weeks.',
    references: [
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619',
      'Oyelese Y, Smulian JC. Placenta previa, placenta accreta, and vasa previa. Obstet Gynecol. 2006;107(4):927-941'
    ],
    difficulty: 'easy',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-005',
    question: 'What is a velamentous cord insertion, and why is it a risk factor for vasa previa?',
    options: [
      'Cord inserted into placental edge',
      'Cord vessels insert into membranes away from placenta, traversing to reach placental disk',
      'Cord wrapped around fetal neck',
      'Short umbilical cord'
    ],
    correctIndex: 1,
    explanation: 'Velamentous cord insertion: umbilical vessels separate in membranes before reaching placenta (instead of inserting directly into placental mass). Vessels unprotected by Wharton\'s jelly - vulnerable to compression/rupture. Occurs in 1-2% singleton (higher in multiples). If vessels cross os = vasa previa. Also associated with: placenta previa, bilobed/succenturiate placenta, IVF pregnancies, multiple gestations.',
    references: [
      'Ebbing C, et al. Velamentous or marginal cord insertion and the risk of spontaneous preterm birth. Obstet Gynecol. 2017;130(3):555-562',
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-006',
    question: 'What risk factor is most strongly associated with uterine rupture in labor?',
    options: [
      'Multiparity',
      'Advanced maternal age',
      'Classical cesarean scar',
      'Gestational diabetes'
    ],
    correctIndex: 2,
    explanation: 'Classical (vertical) uterine incision has highest rupture risk: 4-9% (vs 0.5-1% for low transverse). Classical incision indications: extremely preterm cesarean, transverse lie, anterior placenta previa, lower segment myomas, some cancer cases. Classical scar is ABSOLUTE contraindication to TOLAC. Other high-risk scars: T-incision, J-incision, extensive myomectomy entering cavity.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Landon MB, et al. Risk of uterine rupture with a trial of labor in women with multiple and single prior cesarean delivery. Obstet Gynecol. 2006;108(1):12-20'
    ],
    difficulty: 'easy',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-007',
    question: 'What is the uterine rupture risk for TOLAC with one prior low transverse cesarean?',
    options: [
      '0.1%',
      '0.5-1%',
      '3-5%',
      '8-10%'
    ],
    correctIndex: 1,
    explanation: 'Uterine rupture risk with one prior low transverse cesarean: 0.5-1% during TOLAC (vs 0.02% in unscarred uterus). Risk increases with: multiple prior cesareans (1.8-3.7% with 2 prior), short interpregnancy interval (<18-24 months), induction (especially prostaglandins - relatively contraindicated), no prior vaginal delivery. VBAC success rate: 60-80% overall, higher (85-90%) with prior vaginal delivery.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Guise JM, et al. Vaginal birth after cesarean: new insights. Evid Rep Technol Assess. 2010;(191):1-397'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-008',
    question: 'Which intervention is relatively contraindicated during TOLAC due to increased rupture risk?',
    options: [
      'Epidural analgesia',
      'Continuous fetal monitoring',
      'Prostaglandin cervical ripening',
      'IV fluids'
    ],
    correctIndex: 2,
    explanation: 'Prostaglandins (misoprostol, dinoprostone) for cervical ripening/induction are relatively/absolutely contraindicated in TOLAC due to significantly increased rupture risk. Misoprostol: strongest contraindication. If induction necessary: mechanical methods (Foley balloon) preferred, or cautious oxytocin. Epidural analgesia SAFE and recommended - does not mask rupture symptoms (pain often persists despite epidural). Continuous fetal monitoring mandatory.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Landon MB, et al. Maternal and perinatal outcomes associated with a trial of labor after prior cesarean delivery. N Engl J Med. 2004;351(25):2581-2589'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-009',
    question: 'A patient at 32 weeks status post myomectomy with entry into endometrial cavity now desires TOLAC. What is the appropriate counseling?',
    options: [
      'TOLAC is safe and recommended',
      'Elective cesarean delivery recommended due to increased rupture risk',
      'TOLAC acceptable with close monitoring',
      'Induce labor at 37 weeks'
    ],
    correctIndex: 1,
    explanation: 'Myomectomy with entry into endometrial cavity treated similar to classical cesarean - high rupture risk (0.5-4%). Elective cesarean recommended. Intramural myomectomy NOT entering cavity: risk unclear but generally considered for TOLAC candidacy. Documentation of myomectomy details (location, depth, cavity entry) crucial. Other extensive uterine surgery (adenomyosis resection, metroplasty) also high risk.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Parker WH. Uterine myomas: management. Fertil Steril. 2007;88(2):255-271'
    ],
    difficulty: 'hard',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-010',
    question: 'What is the most common cause of maternal mortality from uterine rupture?',
    options: [
      'Infection',
      'Hemorrhage',
      'Anesthesia complications',
      'Thromboembolism'
    ],
    correctIndex: 1,
    explanation: 'Hemorrhage is leading cause of maternal mortality from uterine rupture. Maternal mortality: 1-2% (developed countries), higher in resource-limited settings. Maternal morbidity common: hysterectomy (10-20%), bladder injury, transfusion, surgical complications. Fetal consequences: perinatal mortality 6-30%, hypoxic-ischemic encephalopathy. Complete rupture worse outcomes than dehiscence (scar separation without symptoms).',
    references: [
      'Guise JM, et al. Vaginal birth after cesarean: new insights. Evid Rep Technol Assess. 2010;(191):1-397',
      'Landon MB, et al. Risk of uterine rupture with a trial of labor in women with multiple and single prior cesarean delivery. Obstet Gynecol. 2006;108(1):12-20'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-011',
    question: 'Which patient is the BEST candidate for TOLAC?',
    options: [
      'One prior cesarean for arrest of dilation, no prior vaginal delivery',
      'One prior cesarean for breech, two prior vaginal deliveries',
      'Two prior cesareans, one prior vaginal delivery',
      'One prior cesarean, BMI 45, gestational diabetes'
    ],
    correctIndex: 1,
    explanation: 'Best TOLAC candidate: one prior low transverse cesarean, prior vaginal delivery (especially prior VBAC - 85-90% success), spontaneous labor, favorable cervix, normal-weight. Worst candidates: multiple prior cesareans, no prior vaginal delivery, recurrent indication (CPD), obesity, advanced maternal age, short interpregnancy interval, macrosomia, postterm. Shared decision-making incorporating individual risk factors essential.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Grobman WA, et al. Development of a nomogram for prediction of vaginal birth after cesarean delivery. Obstet Gynecol. 2007;109(4):806-812'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-012',
    question: 'What is the requirement for offering TOLAC according to ACOG guidelines?',
    options: [
      'Available operating room 24/7',
      'Physician immediately available (in-house)',
      'Capability for emergency cesarean available throughout active labor',
      'Academic medical center only'
    ],
    correctIndex: 2,
    explanation: 'ACOG: TOLAC can be offered when resources for emergency cesarean available THROUGHOUT active labor ("immediately available" - defined by each facility, not necessarily in-house physician). Some hospitals require in-house physician/anesthesia. Risk-benefit discussion essential. "Ban" on TOLAC not evidence-based. Community hospitals with appropriate resources can offer TOLAC. Document informed consent thoroughly.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'ACOG Committee Opinion No. 649: Racial and Ethnic Disparities in Obstetrics and Gynecology. Obstet Gynecol. 2015;126(6):e130-e134'
    ],
    difficulty: 'hard',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-013',
    question: 'A patient attempting TOLAC has been in second stage for 2.5 hours with adequate pushing and no fetal descent. What is the appropriate management?',
    options: [
      'Continue pushing for another 2 hours',
      'Cesarean delivery',
      'Operative vaginal delivery if safe',
      'Await spontaneous delivery'
    ],
    correctIndex: 1,
    explanation: 'Prolonged second stage with no descent in TOLAC increases rupture risk. TOLAC patients should have same labor management as unscarred patients but with lower threshold for cesarean. Cesarean indicated for: arrested descent (prolonged second stage without progress), Category III fetal heart tracing, signs of rupture. Operative vaginal delivery acceptable if criteria met (position, station, skill available). No definitive evidence for specific second-stage time limits in TOLAC.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Landon MB, et al. The MFMU Cesarean Registry: factors affecting the success of trial of labor after previous cesarean delivery. Am J Obstet Gynecol. 2005;193(3 Pt 2):1016-1023'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-014',
    question: 'Which type of vasa previa has the highest risk?',
    options: [
      'Type I (velamentous insertion)',
      'Type II (connecting lobes of bilobed/succenturiate placenta)',
      'Both equal risk',
      'Neither is high risk'
    ],
    correctIndex: 2,
    explanation: 'Vasa previa types: Type I (70%) - velamentous cord insertion with vessels crossing os. Type II (30%) - vessels connecting main placental lobe to succenturiate/accessory lobe crossing os. Both carry equal risk of vessel rupture and fetal exsanguination. Management identical: prenatal diagnosis with Doppler ultrasound, cesarean at 34-37 weeks before labor. Both require same vigilance.',
    references: [
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619',
      'Oyelese Y, Smulian JC. Placenta previa, placenta accreta, and vasa previa. Obstet Gynecol. 2006;107(4):927-941'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-015',
    question: 'A patient has spontaneous rupture of membranes at 35 weeks with diagnosed vasa previa. Fetal heart rate is 160 bpm and reassuring. What is the management?',
    options: [
      'Expectant management until 37 weeks',
      'Immediate cesarean delivery',
      'Tocolysis and steroids',
      'Amnioinfusion'
    ],
    correctIndex: 1,
    explanation: 'Membrane rupture with vasa previa = OBSTETRIC EMERGENCY even if fetal status currently reassuring. Vessels can rupture with membrane rupture or compress during labor. Immediate cesarean delivery required regardless of gestational age. No time for steroids. Fetal exsanguination can occur rapidly (within minutes). Neonatal resuscitation team should be present. Blood products for neonatal transfusion available.',
    references: [
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619',
      'Oyelese Y, et al. Vasa previa: the impact of prenatal diagnosis on outcomes. Obstet Gynecol. 2004;103(5 Pt 1):937-942'
    ],
    difficulty: 'easy',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-016',
    question: 'What is the definition of a short interpregnancy interval that increases uterine rupture risk in subsequent TOLAC?',
    options: [
      '<6 months',
      '<12 months',
      '<18 months',
      '<24 months'
    ],
    correctIndex: 2,
    explanation: 'Interpregnancy interval <18 months (time from delivery to conception of next pregnancy) associated with increased rupture risk during TOLAC (2-3x). Mechanisms: inadequate scar healing, uterine involution incomplete. Optimal interval: 18-24 months between pregnancies. Also associated with other risks: preterm birth, low birth weight. Counsel on optimal spacing but respect patient autonomy.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Shipp TD, et al. Interdelivery interval and risk of symptomatic uterine rupture. Obstet Gynecol. 2001;97(2):175-177'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-017',
    question: 'A patient with two prior cesareans desires TOLAC. What is the uterine rupture risk?',
    options: [
      '0.5%',
      '1.8-3.7%',
      '5-7%',
      '10-15%'
    ],
    correctIndex: 1,
    explanation: 'Two prior cesareans: rupture risk 1.8-3.7% (higher than one prior cesarean at 0.5-1%). ACOG: women with two prior low transverse cesareans are TOLAC candidates if appropriate. Success rate lower (~70% vs 75-80% with one). Three or more prior cesareans: insufficient data, individualized counseling. Prior successful VBAC improves odds. Patient counseling should include specific numerical risks.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Landon MB, et al. Risk of uterine rupture with a trial of labor in women with multiple and single prior cesarean delivery. Obstet Gynecol. 2006;108(1):12-20'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-018',
    question: 'Which uterine closure technique during cesarean is associated with lower rupture risk in future TOLAC?',
    options: [
      'Single-layer closure',
      'Double-layer closure',
      'No significant difference',
      'Three-layer closure'
    ],
    correctIndex: 1,
    explanation: 'Double-layer uterine closure associated with lower rupture risk (0.9-2.6%) vs single-layer (2.6-6.6%) in meta-analyses, though data conflicting. Closure technique should ensure hemostasis, adequate thickness, no dead space. Locked vs unlocked sutures: unclear impact. Document closure technique for future reference. Other factors: adequate hemostasis, no infection, proper healing time.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Roberge S, et al. Single- versus double-layer closure of the hysterotomy incision during cesarean delivery and risk of uterine rupture. Int J Gynaecol Obstet. 2011;115(1):5-10'
    ],
    difficulty: 'hard',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-019',
    question: 'A patient with vasa previa diagnosed at 20 weeks asks about activity restrictions. What is the evidence-based recommendation?',
    options: [
      'Strict bed rest from diagnosis',
      'Pelvic rest (no intercourse), otherwise normal activity until 30-32 weeks',
      'Wheelchair-bound from diagnosis',
      'No activity restrictions necessary'
    ],
    correctIndex: 1,
    explanation: 'Vasa previa activity recommendations: pelvic rest (avoid intercourse, vaginal exams) due to theoretical rupture risk. Routine activity restriction/bed rest NOT evidence-based but commonly recommended from 28-32 weeks until delivery. Hospitalization from 30-34 weeks controversial - balance rapid access to cesarean vs risks of prolonged hospitalization. Patient preference important. Corticosteroids if diagnosed <34 weeks.',
    references: [
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619',
      'Gagnon R, et al. Guidelines for the management of vasa previa. J Obstet Gynaecol Can. 2009;31(8):748-753'
    ],
    difficulty: 'hard',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-020',
    question: 'What factor does NOT increase the likelihood of successful VBAC?',
    options: [
      'Prior vaginal delivery',
      'Spontaneous labor',
      'Maternal obesity (BMI >40)',
      'Favorable Bishop score'
    ],
    correctIndex: 2,
    explanation: 'Factors INCREASING VBAC success: prior vaginal delivery (especially prior VBAC - strongest predictor), spontaneous labor, favorable cervix (Bishop score >6), younger age, normal BMI, smaller estimated fetal weight, non-recurrent cesarean indication. Factors DECREASING success: obesity (BMI >30), recurrent indication (CPD, arrest), induction, postterm, macrosomia, advanced maternal age, no prior vaginal delivery. VBAC calculators available to estimate individual probability.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Grobman WA, et al. Development of a nomogram for prediction of vaginal birth after cesarean delivery. Obstet Gynecol. 2007;109(4):806-812'
    ],
    difficulty: 'easy',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-021',
    question: 'A patient attempting TOLAC develops new-onset constant severe abdominal pain and Category III fetal heart tracing at 6 cm dilation. What is the most likely diagnosis?',
    options: [
      'Normal labor pain',
      'Uterine rupture',
      'Placental abruption',
      'Appendicitis'
    ],
    correctIndex: 1,
    explanation: 'Uterine rupture signs/symptoms: sudden severe abdominal pain (may "break through" epidural), Category II/III fetal heart tracing (most common: prolonged deceleration/bradycardia), vaginal bleeding, maternal shock, loss of fetal station, palpable fetal parts abdominally, cessation of contractions. Requires immediate laparotomy. Any concerning symptom in TOLAC patient warrants urgent evaluation. High index of suspicion essential.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Leung AS, et al. Uterine rupture after previous cesarean delivery: maternal and fetal consequences. Am J Obstet Gynecol. 1993;169(4):945-950'
    ],
    difficulty: 'easy',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-022',
    question: 'What is the difference between uterine rupture and uterine dehiscence?',
    options: [
      'Rupture is partial thickness, dehiscence is full thickness',
      'Dehiscence is asymptomatic scar separation found incidentally; rupture is symptomatic with complications',
      'No difference - same condition',
      'Dehiscence only occurs antepartum'
    ],
    correctIndex: 1,
    explanation: 'Uterine dehiscence: asymptomatic separation of previous scar found incidentally at cesarean (intact serosa, often with peritoneum covering defect). Occurs in 0.5-2% of TOLACs. No clinical consequences, may not require repair. Uterine rupture: complete disruption through all layers with clinical signs (pain, bleeding, fetal distress), requires emergency intervention. Dehiscence has good prognosis; rupture carries significant maternal/fetal risk.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Guise JM, et al. Vaginal birth after cesarean: new insights. Evid Rep Technol Assess. 2010;(191):1-397'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-023',
    question: 'A patient had cesarean for "failure to progress" at 8 cm with the previous pregnancy. What is the significance for TOLAC counseling?',
    options: [
      'No significance - proceed with TOLAC',
      'Recurrent indication suggests possible CPD, may have lower success but not contraindication',
      'Absolute contraindication to TOLAC',
      'Requires early cesarean in current pregnancy'
    ],
    correctIndex: 1,
    explanation: 'Recurrent indication (arrest disorder, CPD, FTP) suggests possible anatomic limitation, associated with lower VBAC success (60-70% vs 85% for non-recurrent). However, NOT a contraindication - many achieve VBAC. Factors differ each pregnancy: fetal size/position, cervical status, labor progress. Non-recurrent indications (breech, placenta previa, NRFHT) have highest success rates. Shared decision-making crucial.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Landon MB, et al. Factors affecting the success of trial of labor after previous cesarean delivery. Am J Obstet Gynecol. 2005;193(3 Pt 2):1016-1023'
    ],
    difficulty: 'hard',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-024',
    question: 'Which statement about TOLAC and epidural analgesia is correct?',
    options: [
      'Epidural contraindicated - masks rupture symptoms',
      'Epidural recommended - improves VBAC success and does not mask rupture',
      'Epidural delays recognition of rupture by several hours',
      'Only light sedation permitted during TOLAC'
    ],
    correctIndex: 1,
    explanation: 'Epidural analgesia is SAFE and RECOMMENDED during TOLAC. Does NOT mask rupture symptoms - pain often persists or "breaks through" epidural with rupture. Fetal heart rate changes (most sensitive rupture sign) detected regardless. Epidural improves satisfaction, reduces need for general anesthesia if emergency cesarean needed. No evidence of adverse effect on VBAC success. Continuous fetal monitoring mandatory.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Flamm BL, et al. Vaginal birth after cesarean delivery: results of a multicenter study. Am J Obstet Gynecol. 1988;158(5):1079-1084'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-025',
    question: 'A patient with IVF twin pregnancy has first-trimester ultrasound showing velamentous cord insertion of Twin A. What is the appropriate management?',
    options: [
      'No special precautions needed',
      'Follow-up ultrasound at 18-20 weeks to assess for vasa previa',
      'Immediate cesarean planning',
      'Selective reduction'
    ],
    correctIndex: 1,
    explanation: 'Risk factors for vasa previa: velamentous cord insertion (most important), IVF/ART, multiple gestation, bilobed/succenturiate placenta, low-lying placenta. Screen with transvaginal color Doppler at 18-20 weeks and repeat 28-32 weeks. IVF pregnancies have higher velamentous insertion rate (6-9% vs 1-2% spontaneous). Multiple gestations: 15-20% velamentous insertion rate. Early diagnosis critical for optimal outcomes.',
    references: [
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619',
      'Ebbing C, et al. Velamentous or marginal cord insertion and the risk of spontaneous preterm birth. Obstet Gynecol. 2017;130(3):555-562'
    ],
    difficulty: 'hard',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-026',
    question: 'What is the perinatal mortality rate for undiagnosed vasa previa?',
    options: [
      '10-20%',
      '30-40%',
      '56-95%',
      '100%'
    ],
    correctIndex: 2,
    explanation: 'Undiagnosed vasa previa: perinatal mortality 56-95% (varies by study, timing of presentation). Diagnosed prenatally with planned cesarean: mortality <3%. This dramatic difference emphasizes importance of prenatal diagnosis. Fetal blood volume ~80-100 mL/kg - loss of 30-50 mL can be fatal. Rapid recognition and cesarean delivery can be lifesaving even with rupture, but outcomes significantly worse than planned delivery.',
    references: [
      'Oyelese Y, et al. Vasa previa: the impact of prenatal diagnosis on outcomes. Obstet Gynecol. 2004;103(5 Pt 1):937-942',
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-027',
    question: 'A patient with one prior cesarean presents at 41 weeks with unfavorable cervix. What is the most appropriate management?',
    options: [
      'Mechanical cervical ripening (Foley balloon) followed by oxytocin',
      'Misoprostol cervical ripening',
      'Proceed directly to repeat cesarean',
      'Dinoprostone insert'
    ],
    correctIndex: 0,
    explanation: 'Induction in TOLAC: possible but lower success than spontaneous labor. Mechanical methods (Foley balloon, double balloon) PREFERRED for cervical ripening - no increased rupture risk. Oxytocin: acceptable. Prostaglandins (misoprostol, dinoprostone): relatively/absolutely contraindicated due to rupture risk. If induction indicated and cervix unfavorable, Foley + oxytocin reasonable. Patient may choose elective repeat cesarean if induction required.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Jozwiak M, et al. Mechanical methods for induction of labour. Cochrane Database Syst Rev. 2012;(3):CD001233'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-028',
    question: 'After uterine rupture repair, what is the recommendation for future pregnancies?',
    options: [
      'TOLAC acceptable in next pregnancy',
      'Elective cesarean recommended, typically at 36-37 weeks',
      'Avoid future pregnancy',
      'Normal vaginal delivery expected'
    ],
    correctIndex: 1,
    explanation: 'After uterine rupture repair: elective cesarean delivery recommended for all future pregnancies, typically scheduled at 36-37 weeks (before labor onset). TOLAC generally NOT recommended due to high recurrence risk (6-32% in limited data, higher with vertical repair). Consider single-layer vs two-layer repair implications. Counsel regarding future pregnancy risks. Some may require hysterectomy at time of rupture.',
    references: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127',
      'Reyes-Ceja L, et al. Pregnancy following previous uterine rupture. Obstet Gynecol. 1969;34(3):387-389'
    ],
    difficulty: 'medium',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-029',
    question: 'What is the Apt test used for in suspected vasa previa rupture?',
    options: [
      'Confirms fetal vs maternal blood',
      'Tests for amniotic fluid',
      'Measures fetal hemoglobin level',
      'Assesses platelet count'
    ],
    correctIndex: 0,
    explanation: 'Apt test (alkali denaturation test): differentiates fetal from maternal blood. Mix blood with NaOH: fetal hemoglobin (HbF) resistant to alkali denaturation (remains pink), adult hemoglobin denatures (turns brown). Rarely performed now - too slow in emergency. If vasa previa suspected with bleeding, proceed IMMEDIATELY to cesarean without waiting for test. Kleihauer-Betke test also differentiates but takes longer.',
    references: [
      'Oyelese Y, et al. Vasa previa: the impact of prenatal diagnosis on outcomes. Obstet Gynecol. 2004;103(5 Pt 1):937-942',
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619'
    ],
    difficulty: 'hard',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  },
  {
    id: 'vr-030',
    question: 'A patient declines cesarean for diagnosed vasa previa due to religious beliefs. What is the most appropriate response?',
    options: [
      'Mandatory court-ordered cesarean',
      'Respect autonomy, provide detailed counseling on risks, document thoroughly, plan for emergency response',
      'Refuse to provide care',
      'Ignore patient preference and proceed with cesarean'
    ],
    correctIndex: 1,
    explanation: 'Patient autonomy must be respected even when decisions carry significant risk. Provide thorough, non-coercive counseling on: 56-95% perinatal mortality without cesarean, rapid fetal exsanguination risk, potential for neonatal brain injury/death. Document discussions extensively. Avoid labor induction, digital exams. Have emergency cesarean capability immediately available if patient changes mind or emergency develops. Court-ordered cesarean rarely appropriate and ethically controversial.',
    references: [
      'ACOG Committee Opinion No. 664: Refusal of Medically Recommended Treatment During Pregnancy. Obstet Gynecol. 2016;127(6):e175-e182',
      'Society for Maternal-Fetal Medicine. Vasa previa: diagnosis and management. Am J Obstet Gynecol. 2015;213(5):615-619'
    ],
    difficulty: 'hard',
    topicId: 'vasa-previa-rupture',
    category: 'obstetric'
  }
];
