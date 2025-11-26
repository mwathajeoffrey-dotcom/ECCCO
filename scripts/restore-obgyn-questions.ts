import { promises as fs } from 'fs';
import path from 'path';

const obgynQuestions = {
  gestational_diabetes: [
    {
      id: "gd_001",
      question: "A 28-year-old woman at 24 weeks gestation has a 1-hour glucose challenge test result of 165 mg/dL. What is the most appropriate next step?",
      options: [
        "A) Diagnose gestational diabetes and start insulin",
        "B) Perform a 3-hour glucose tolerance test",
        "C) Repeat the 1-hour test in 4 weeks",
        "D) Start dietary modifications only"
      ],
      correctAnswer: "B",
      explanation: "A 1-hour glucose challenge test ≥140 mg/dL (some use ≥130 mg/dL) is considered abnormal and requires confirmation with a 3-hour 100g oral glucose tolerance test. The diagnosis of GDM requires 2 or more abnormal values on the 3-hour test.",
      topic: "Gestational Diabetes",
      learningObjectives: [
        "Understand screening criteria for gestational diabetes",
        "Know the two-step diagnostic approach for GDM",
        "Recognize threshold values for glucose testing"
      ]
    },
    {
      id: "gd_002",
      question: "A pregnant woman with gestational diabetes at 32 weeks has fasting glucose consistently 105-110 mg/dL despite dietary modifications. What is the best management?",
      options: [
        "A) Continue dietary management only",
        "B) Start metformin",
        "C) Start insulin therapy",
        "D) Add exercise regimen only"
      ],
      correctAnswer: "C",
      explanation: "Fasting glucose >95 mg/dL despite dietary modifications is an indication for insulin therapy in GDM. Insulin is the first-line pharmacologic treatment. Metformin and glyburide are alternatives but insulin remains preferred, especially for fasting hyperglycemia.",
      topic: "Gestational Diabetes",
      learningObjectives: [
        "Know glucose targets in gestational diabetes",
        "Understand indications for insulin therapy",
        "Recognize limitations of oral hypoglycemics in pregnancy"
      ]
    },
    {
      id: "gd_003",
      question: "What are the target glucose levels for a woman with gestational diabetes?",
      options: [
        "A) Fasting <95 mg/dL, 1-hr postprandial <140 mg/dL, 2-hr postprandial <120 mg/dL",
        "B) Fasting <105 mg/dL, 1-hr postprandial <160 mg/dL, 2-hr postprandial <140 mg/dL",
        "C) Fasting <100 mg/dL, 1-hr postprandial <150 mg/dL, 2-hr postprandial <130 mg/dL",
        "D) Fasting <90 mg/dL, 1-hr postprandial <130 mg/dL, 2-hr postprandial <110 mg/dL"
      ],
      correctAnswer: "A",
      explanation: "ACOG and ADA recommend glucose targets for GDM: fasting <95 mg/dL, 1-hour postprandial <140 mg/dL, or 2-hour postprandial <120 mg/dL. Meeting these targets reduces the risk of macrosomia and neonatal complications.",
      topic: "Gestational Diabetes",
      learningObjectives: [
        "Know glycemic targets in gestational diabetes",
        "Understand the rationale for tight glucose control",
        "Recognize when targets are not being met"
      ]
    }
  ],
  
  ectopic_pregnancy: [
    {
      id: "ep_001",
      question: "A 26-year-old woman presents with 6 weeks amenorrhea, right lower quadrant pain, and vaginal spotting. Beta-hCG is 1,500 mIU/mL. Transvaginal ultrasound shows an empty uterus and no adnexal masses. What is the most appropriate next step?",
      options: [
        "A) Repeat beta-hCG in 48 hours",
        "B) Immediate laparoscopy",
        "C) Administer methotrexate",
        "D) Dilation and curettage"
      ],
      correctAnswer: "A",
      explanation: "With beta-hCG between 1,500-2,000 mIU/mL (discriminatory zone), an intrauterine pregnancy should be visible on transvaginal ultrasound. If not seen, ectopic pregnancy is suspected but the patient is stable. Repeating beta-hCG in 48 hours helps determine if pregnancy is viable: normal pregnancy shows >50% increase, while ectopic or failing pregnancy shows suboptimal rise.",
      topic: "Ectopic Pregnancy",
      learningObjectives: [
        "Understand the discriminatory zone for beta-hCG",
        "Know the approach to pregnancy of unknown location",
        "Recognize when expectant management is appropriate"
      ]
    },
    {
      id: "ep_002",
      question: "A 28-year-old woman with a confirmed tubal ectopic pregnancy has beta-hCG of 3,000 mIU/mL, is hemodynamically stable, and has no contraindications. What is the most appropriate management?",
      options: [
        "A) Immediate laparoscopy",
        "B) Single-dose methotrexate",
        "C) Expectant management",
        "D) Laparotomy"
      ],
      correctAnswer: "B",
      explanation: "Medical management with methotrexate is appropriate for stable patients with unruptured ectopic pregnancy, beta-hCG <5,000 mIU/mL, no fetal cardiac activity, and no contraindications to methotrexate. Success rates are ~90% with single-dose protocol.",
      topic: "Ectopic Pregnancy",
      learningObjectives: [
        "Know criteria for medical management of ectopic pregnancy",
        "Understand methotrexate eligibility criteria",
        "Recognize when surgical management is preferred"
      ]
    },
    {
      id: "ep_003",
      question: "Which of the following is a contraindication to methotrexate therapy for ectopic pregnancy?",
      options: [
        "A) Beta-hCG level of 4,000 mIU/mL",
        "B) Ectopic mass size of 3 cm",
        "C) Breastfeeding",
        "D) History of one prior ectopic pregnancy"
      ],
      correctAnswer: "C",
      explanation: "Contraindications to methotrexate include: breastfeeding, immunodeficiency, active pulmonary disease, peptic ulcer disease, hepatic/renal/hematologic dysfunction, and inability to comply with follow-up. Beta-hCG <5,000 mIU/mL and mass <3.5-4 cm are generally acceptable for medical management.",
      topic: "Ectopic Pregnancy",
      learningObjectives: [
        "Identify contraindications to methotrexate",
        "Understand patient selection for medical management",
        "Recognize relative vs absolute contraindications"
      ]
    }
  ],
  
  preeclampsia: [
    {
      id: "pe_001",
      question: "A 30-year-old primigravida at 34 weeks presents with BP 160/110 mmHg, 3+ proteinuria, and headache. Which finding indicates severe features of preeclampsia?",
      options: [
        "A) Systolic BP ≥140 mmHg",
        "B) Proteinuria 3+ on dipstick",
        "C) Thrombocytopenia (<100,000/μL)",
        "D) Mild peripheral edema"
      ],
      correctAnswer: "C",
      explanation: "Severe features of preeclampsia include: BP ≥160/110 mmHg, thrombocytopenia <100,000/μL, elevated liver enzymes (2x normal), serum creatinine >1.1 mg/dL, pulmonary edema, new-onset headache unresponsive to medication, or visual disturbances. The presence of any severe feature requires immediate management.",
      topic: "Preeclampsia",
      learningObjectives: [
        "Identify severe features of preeclampsia",
        "Understand criteria for immediate intervention",
        "Recognize complications requiring delivery"
      ]
    },
    {
      id: "pe_002",
      question: "A woman at 36 weeks with preeclampsia with severe features is being prepared for delivery. What is the most appropriate seizure prophylaxis?",
      options: [
        "A) Phenytoin IV",
        "B) Magnesium sulfate IV",
        "C) Diazepam IV",
        "D) Lorazepam IV"
      ],
      correctAnswer: "B",
      explanation: "Magnesium sulfate is the drug of choice for seizure prophylaxis in preeclampsia with severe features and treatment of eclamptic seizures. Standard regimen: 4-6g IV loading dose over 15-20 minutes, followed by 2g/hr continuous infusion. Monitor for toxicity (reflexes, respirations, urine output).",
      topic: "Preeclampsia",
      learningObjectives: [
        "Know first-line seizure prophylaxis for preeclampsia",
        "Understand magnesium sulfate dosing",
        "Recognize signs of magnesium toxicity"
      ]
    },
    {
      id: "pe_003",
      question: "What is the antidote for magnesium sulfate toxicity?",
      options: [
        "A) Calcium gluconate",
        "B) Sodium bicarbonate",
        "C) Protamine sulfate",
        "D) Naloxone"
      ],
      correctAnswer: "A",
      explanation: "Calcium gluconate (1g IV or 10 mL of 10% solution over 3 minutes) is the antidote for magnesium toxicity. Signs of toxicity include: loss of patellar reflexes (8-12 mg/dL), respiratory depression (12-15 mg/dL), and cardiac arrest (>15 mg/dL). Therapeutic range is 4-7 mg/dL.",
      topic: "Preeclampsia",
      learningObjectives: [
        "Recognize magnesium sulfate toxicity",
        "Know the antidote and administration",
        "Understand therapeutic vs toxic levels"
      ]
    }
  ],

  postpartum_hemorrhage: [
    {
      id: "pph_001",
      question: "A woman has 800 mL blood loss 30 minutes after vaginal delivery. Uterine atony is suspected. What is the first-line medication?",
      options: [
        "A) Oxytocin IV bolus",
        "B) Methylergonovine IM",
        "C) Carboprost IM",
        "D) Misoprostol rectal"
      ],
      correctAnswer: "A",
      explanation: "Oxytocin is the first-line uterotonic for postpartum hemorrhage due to uterine atony. It can be given as IV infusion (preferred) or IM. Typical dosing: 10-40 units in 1L crystalloid at 125-200 mL/hr. Other agents (methylergonovine, carboprost, misoprostol) are second-line when oxytocin fails or is contraindicated.",
      topic: "Postpartum Hemorrhage",
      learningObjectives: [
        "Know first-line management of uterine atony",
        "Understand the uterotonic medication hierarchy",
        "Recognize when to escalate therapy"
      ]
    },
    {
      id: "pph_002",
      question: "Which medication for postpartum hemorrhage is contraindicated in patients with asthma?",
      options: [
        "A) Oxytocin",
        "B) Methylergonovine",
        "C) Carboprost (Hemabate)",
        "D) Misoprostol"
      ],
      correctAnswer: "C",
      explanation: "Carboprost (15-methyl PGF2α) is contraindicated in patients with asthma as it can cause bronchospasm. Other contraindications include active cardiac, pulmonary, renal, or hepatic disease. It's a prostaglandin that causes strong uterine contractions but has significant side effects.",
      topic: "Postpartum Hemorrhage",
      learningObjectives: [
        "Know contraindications to uterotonic medications",
        "Understand medication selection based on patient factors",
        "Recognize side effects of prostaglandins"
      ]
    },
    {
      id: "pph_003",
      question: "A patient with postpartum hemorrhage has failed medical management. What is the next appropriate intervention?",
      options: [
        "A) Immediate hysterectomy",
        "B) Uterine artery embolization",
        "C) Intrauterine balloon tamponade",
        "D) Observe for 30 more minutes"
      ],
      correctAnswer: "C",
      explanation: "After failed medical management, intrauterine balloon tamponade (Bakri balloon) is often the next step before surgical intervention. It provides mechanical compression and can control hemorrhage in ~85% of cases. If this fails, uterine artery embolization (if stable) or surgical options (B-Lynch suture, ligation, hysterectomy) are considered.",
      topic: "Postpartum Hemorrhage",
      learningObjectives: [
        "Understand escalation of PPH management",
        "Know role of balloon tamponade",
        "Recognize when surgical intervention is needed"
      ]
    }
  ],

  labor: [
    {
      id: "lab_001",
      question: "A woman at 39 weeks in active labor has regular contractions every 3 minutes. She is 6 cm dilated. What stage of labor is she in?",
      options: [
        "A) Latent first stage",
        "B) Active first stage",
        "C) Second stage",
        "D) Transition phase"
      ],
      correctAnswer: "B",
      explanation: "Active first stage of labor begins at 6 cm dilation and continues until complete dilation (10 cm). Latent phase is from onset of labor to 6 cm. Second stage begins at complete dilation and ends with delivery of baby. Third stage is from baby delivery to placenta delivery.",
      topic: "Labor Management",
      learningObjectives: [
        "Understand stages of labor",
        "Recognize cervical dilation landmarks",
        "Know normal labor progression"
      ]
    },
    {
      id: "lab_002",
      question: "A nulliparous woman at term has had no cervical change in 4 hours despite adequate contractions (>200 Montevideo units). What is this called?",
      options: [
        "A) Arrest of dilation",
        "B) Protracted labor",
        "C) Precipitous labor",
        "D) Normal labor"
      ],
      correctAnswer: "A",
      explanation: "Arrest of dilation is defined as: no cervical change for ≥4 hours with adequate contractions (>200 MVU) OR ≥6 hours with inadequate contractions. This may warrant augmentation with oxytocin or cesarean delivery if augmentation fails.",
      topic: "Labor Management",
      learningObjectives: [
        "Define arrest of labor",
        "Understand Montevideo units",
        "Know management of labor dystocia"
      ]
    },
    {
      id: "lab_003",
      question: "Which fetal heart rate pattern requires immediate intervention?",
      options: [
        "A) Early decelerations with contractions",
        "B) Moderate variability with accelerations",
        "C) Recurrent late decelerations",
        "D) Variable decelerations resolving quickly"
      ],
      correctAnswer: "C",
      explanation: "Recurrent late decelerations indicate uteroplacental insufficiency and fetal hypoxemia. Immediate interventions include: maternal repositioning, oxygen administration, IV fluid bolus, discontinuing oxytocin, and considering urgent delivery if pattern persists. Early decelerations are benign (head compression).",
      topic: "Labor Management",
      learningObjectives: [
        "Interpret fetal heart rate patterns",
        "Recognize concerning patterns",
        "Know immediate management of non-reassuring tracings"
      ]
    }
  ],

  infections: [
    {
      id: "inf_001",
      question: "A pregnant woman at 28 weeks has a positive Group B Streptococcus culture. When should intrapartum antibiotic prophylaxis be administered?",
      options: [
        "A) Immediately upon diagnosis",
        "B) At 36 weeks gestation",
        "C) When labor begins or membranes rupture",
        "D) Only if fever develops"
      ],
      correctAnswer: "C",
      explanation: "GBS-positive women should receive intrapartum antibiotic prophylaxis (typically penicillin G 5 million units IV loading, then 2.5-3 million units IV q4h) when labor begins or membranes rupture, regardless of gestational age. This reduces the risk of early-onset neonatal GBS disease by ~80%.",
      topic: "Obstetric Infections",
      learningObjectives: [
        "Know GBS prophylaxis timing",
        "Understand prevention of neonatal GBS disease",
        "Recognize appropriate antibiotic choices"
      ]
    },
    {
      id: "inf_002",
      question: "A woman in labor at term develops fever of 39°C, maternal tachycardia, and fetal tachycardia. What is the most likely diagnosis?",
      options: [
        "A) Chorioamnionitis",
        "B) Pyelonephritis",
        "C) Appendicitis",
        "D) Viral syndrome"
      ],
      correctAnswer: "A",
      explanation: "Chorioamnionitis is diagnosed clinically with: maternal fever (>38°C or 100.4°F) plus one or more of: maternal tachycardia, fetal tachycardia, uterine tenderness, foul-smelling amniotic fluid, or maternal leukocytosis. Treatment includes broad-spectrum IV antibiotics (ampicillin + gentamicin) and delivery.",
      topic: "Obstetric Infections",
      learningObjectives: [
        "Recognize clinical chorioamnionitis",
        "Understand diagnostic criteria",
        "Know management and antibiotic selection"
      ]
    },
    {
      id: "inf_003",
      question: "What is the appropriate management for a pregnant woman with primary herpes simplex virus outbreak at 36 weeks?",
      options: [
        "A) No treatment, plan vaginal delivery",
        "B) Acyclovir therapy, plan cesarean if lesions at delivery",
        "C) Immediate cesarean delivery",
        "D) Valacyclovir only, no delivery planning changes"
      ],
      correctAnswer: "B",
      explanation: "Primary HSV outbreak in pregnancy is treated with acyclovir (400mg PO TID) or valacyclovir. Suppressive therapy should continue until delivery. Cesarean delivery is recommended if active genital lesions or prodromal symptoms are present at time of delivery to reduce risk of neonatal transmission.",
      topic: "Obstetric Infections",
      learningObjectives: [
        "Manage HSV in pregnancy",
        "Know indications for cesarean delivery with HSV",
        "Understand antiviral therapy in pregnancy"
      ]
    }
  ]
};

async function restoreQuestions() {
  const dataDir = path.join(process.cwd(), 'data/obgyn-questions');
  
  console.log('🔧 Starting OB/GYN Questions Restoration...\n');
  
  let totalQuestions = 0;
  
  for (const [filename, questions] of Object.entries(obgynQuestions)) {
    const filepath = path.join(dataDir, `${filename}.json`);
    
    try {
      await fs.writeFile(filepath, JSON.stringify(questions, null, 2), 'utf-8');
      console.log(`✅ Restored: ${filename}.json (${questions.length} questions)`);
      totalQuestions += questions.length;
    } catch (error) {
      console.error(`❌ Failed to restore ${filename}.json:`, error);
    }
  }
  
  console.log(`\n🎉 Successfully restored ${totalQuestions} OB/GYN questions across ${Object.keys(obgynQuestions).length} files!`);
}

restoreQuestions().catch(console.error);
