#!/usr/bin/env tsx
console.log('🌱 Generating comprehensive medical question bank...');

import { default as prisma } from '../src/lib/database/prisma-client';

interface QuestionData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  references: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

const adultCardiovascularQuestions: QuestionData[] = [
  {
    question: "A 55-year-old male presents with crushing chest pain radiating to the left arm, diaphoresis, and nausea. His ECG shows ST elevation in leads II, III, and aVF. What is the most likely diagnosis?",
    options: [
      "Anterior wall STEMI",
      "Inferior wall STEMI", 
      "Lateral wall STEMI",
      "Posterior wall STEMI"
    ],
    correctIndex: 1,
    explanation: "ST elevation in leads II, III, and aVF indicates an inferior wall STEMI, typically caused by occlusion of the right coronary artery or posterior descending artery.",
    references: [
      "Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction. Circulation. 2018",
      "AHA/ACC Guidelines for STEMI Management. Circulation. 2023"
    ],
    difficulty: "medium"
  },
  {
    question: "In acute heart failure with pulmonary edema, which of the following is the FIRST-LINE treatment?",
    options: [
      "Dobutamine infusion",
      "Nitroglycerin and loop diuretics",
      "Immediate intubation",
      "Beta-blocker therapy"
    ],
    correctIndex: 1,
    explanation: "Nitroglycerin (for preload reduction) and loop diuretics (for volume removal) are first-line treatments for acute heart failure with pulmonary edema, providing rapid symptom relief.",
    references: [
      "2022 AHA/ACC/HFSA Heart Failure Guidelines",
      "ESC Guidelines for Heart Failure. Eur Heart J. 2021"
    ],
    difficulty: "medium"
  },
  {
    question: "A 28-year-old athlete collapses during a basketball game. Which cardiac condition is the MOST common cause of sudden cardiac death in young athletes?",
    options: [
      "Coronary artery disease",
      "Hypertrophic cardiomyopathy",
      "Long QT syndrome", 
      "Wolff-Parkinson-White syndrome"
    ],
    correctIndex: 1,
    explanation: "Hypertrophic cardiomyopathy is the leading cause of sudden cardiac death in young athletes, often presenting as the first manifestation of the disease during intense physical activity.",
    references: [
      "Maron BJ. Sudden Death in Athletes. N Engl J Med. 2003",
      "AHA Scientific Statement on Sports Participation. Circulation. 2015"
    ],
    difficulty: "hard"
  },
  {
    question: "What is the target blood pressure for a patient with acute ischemic stroke in the emergency department?",
    options: [
      "< 140/90 mmHg",
      "< 180/105 mmHg",
      "< 160/100 mmHg",
      "< 120/80 mmHg"
    ],
    correctIndex: 1,
    explanation: "In acute ischemic stroke, blood pressure should be kept < 180/105 mmHg to maintain cerebral perfusion while preventing hemorrhagic transformation, unless thrombolytic therapy is planned.",
    references: [
      "AHA/ASA Stroke Guidelines 2023",
      "Powers WJ, et al. Guidelines for Early Management of Acute Ischemic Stroke. Stroke. 2019"
    ],
    difficulty: "medium"
  },
  {
    question: "A patient presents with chest pain and an ECG showing a new left bundle branch block (LBBB). What is the most appropriate next step?",
    options: [
      "Discharge with cardiology follow-up",
      "Treat as STEMI equivalent and consider primary PCI",
      "Order stress testing",
      "Start beta-blocker therapy"
    ],
    correctIndex: 1,
    explanation: "A new LBBB in the setting of chest pain is considered a STEMI equivalent and requires immediate reperfusion therapy, preferably primary percutaneous coronary intervention.",
    references: [
      "2013 ACCF/AHA STEMI Guidelines",
      "Sgarbossa EB, et al. Electrocardiographic diagnosis of evolving acute myocardial infarction. NEJM. 1996"
    ],
    difficulty: "hard"
  }
];

const pediatricResuscitationQuestions: QuestionData[] = [
  {
    question: "What is the initial compression-to-ventilation ratio for pediatric CPR in a 6-year-old child with two rescuers?",
    options: [
      "30:2",
      "15:2", 
      "20:2",
      "5:1"
    ],
    correctIndex: 1,
    explanation: "For pediatric CPR with two rescuers, the compression-to-ventilation ratio is 15:2 for children and infants, providing more frequent ventilations than adult CPR.",
    references: [
      "2020 American Heart Association Guidelines for CPR and ECC",
      "Pediatric Advanced Life Support Provider Manual 2020"
    ],
    difficulty: "easy"
  },
  {
    question: "A 3-year-old child presents with stridor, drooling, and high fever. The child is sitting upright and appears toxic. What is the most likely diagnosis?",
    options: [
      "Viral croup",
      "Bacterial tracheitis",
      "Acute epiglottitis",
      "Foreign body aspiration"
    ],
    correctIndex: 2,
    explanation: "The triad of stridor, drooling, and toxic appearance in a febrile child suggests acute epiglottitis. The tripod position (sitting upright) is classic for maintaining airway patency.",
    references: [
      "Clinical Practice Guideline: Acute Bacterial Sinusitis. Pediatrics. 2021",
      "Kliegman RM. Nelson Textbook of Pediatrics. 21st Edition"
    ],
    difficulty: "medium"
  },
  {
    question: "What is the recommended dose of epinephrine for pediatric anaphylaxis in a 20 kg child?",
    options: [
      "0.1 mg (0.1 mL of 1:1000)",
      "0.2 mg (0.2 mL of 1:1000)",
      "0.3 mg (0.3 mL of 1:1000)",
      "0.5 mg (0.5 mL of 1:1000)"
    ],
    correctIndex: 1,
    explanation: "Pediatric epinephrine dosing for anaphylaxis is 0.01 mg/kg (max 0.3 mg) of 1:1000 concentration IM. For a 20 kg child: 20 × 0.01 = 0.2 mg.",
    references: [
      "Guidelines for the Diagnosis and Management of Food Allergy. NIAID 2020",
      "Anaphylaxis: a practice parameter update. Ann Allergy Asthma Immunol. 2015"
    ],
    difficulty: "hard"
  },
  {
    question: "In pediatric shock, what percentage of blood volume loss typically results in hypotension?",
    options: [
      "15-20%",
      "25-30%",
      "35-40%",
      "45-50%"
    ],
    correctIndex: 2,
    explanation: "Children can maintain blood pressure until 35-40% blood volume loss due to excellent compensatory mechanisms. Hypotension is a late and ominous sign in pediatric shock.",
    references: [
      "Advanced Pediatric Life Support Provider Manual",
      "Pediatric Shock: Recognition and Management. Pediatr Emerg Care. 2018"
    ],
    difficulty: "medium"
  },
  {
    question: "A 2-month-old infant presents with poor feeding, lethargy, and weak cry. Heart rate is 260 bpm with narrow QRS complexes. What is the first-line treatment?",
    options: [
      "Synchronized cardioversion",
      "Adenosine 0.1 mg/kg IV",
      "Verapamil 0.1 mg/kg IV",
      "Amiodarone 5 mg/kg IV"
    ],
    correctIndex: 1,
    explanation: "For stable supraventricular tachycardia (SVT) in infants, adenosine 0.1 mg/kg (max 6 mg) is first-line treatment. Verapamil is contraindicated in infants under 1 year.",
    references: [
      "2020 AHA Guidelines for CPR and ECC - Pediatric Advanced Life Support",
      "Pediatric Arrhythmias: Diagnosis and Management. Curr Probl Pediatr Adolesc Health Care. 2019"
    ],
    difficulty: "hard"
  }
];

const additionalTopicQuestions = {
  "Adult Respiratory Emergencies": [
    {
      question: "A 65-year-old COPD patient presents with increased dyspnea and purulent sputum. ABG shows pH 7.25, PCO2 65 mmHg, HCO3 28 mEq/L. What type of respiratory failure is this?",
      options: [
        "Type I (hypoxemic) respiratory failure",
        "Type II (hypercapnic) respiratory failure with acute on chronic respiratory acidosis",
        "Pure metabolic acidosis",
        "Normal acid-base status"
      ],
      correctIndex: 1,
      explanation: "This represents Type II respiratory failure with acute on chronic CO2 retention. The elevated PCO2 with compensated metabolic alkalosis (HCO3 28) and acute acidosis (pH 7.25) indicates acute exacerbation.",
      references: [
        "Global Strategy for COPD Diagnosis and Management - GOLD 2023",
        "Acute exacerbations of COPD. Lancet. 2017"
      ],
      difficulty: "hard"
    }
  ],
  "Pediatric Infectious Diseases": [
    {
      question: "A 4-year-old presents with high fever, neck stiffness, and photophobia. What is the empirical antibiotic treatment before CSF results?",
      options: [
        "Ampicillin + gentamicin",
        "Ceftriaxone + vancomycin", 
        "Penicillin G alone",
        "Azithromycin + doxycycline"
      ],
      correctIndex: 1,
      explanation: "For suspected bacterial meningitis in children > 1 month, empirical treatment is ceftriaxone (covers S. pneumoniae, N. meningitidis, H. influenzae) plus vancomycin (covers resistant S. pneumoniae).",
      references: [
        "Clinical Practice Guidelines for Bacterial Meningitis. Clin Infect Dis. 2019",
        "AAP Red Book: Report of the Committee on Infectious Diseases. 32nd Edition"
      ],
      difficulty: "medium"
    }
  ]
};

async function generateQuestionBank() {
  try {
    console.log('🔍 Finding existing modules and topics...');
    
    // Get modules and topics
    const adultModule = await prisma.module.findFirst({
      where: { ageGroup: 'adult' },
      include: { topics: true }
    });
    
    const pediatricModule = await prisma.module.findFirst({
      where: { ageGroup: 'pediatric' },
      include: { topics: true }
    });

    if (!adultModule || !pediatricModule) {
      console.error('❌ Required modules not found');
      return;
    }

    console.log('📝 Adding cardiovascular questions...');
    // Find or create cardiovascular topic
    let cardiovascularTopic = adultModule.topics.find((t: any) => t.name.includes('Cardiovascular'));
    
    if (!cardiovascularTopic) {
      cardiovascularTopic = await prisma.topic.create({
        data: {
          name: 'Cardiovascular Emergencies',
          description: 'Emergency cardiovascular conditions and management',
          moduleId: adultModule.id,
          category: 'cardiovascular'
        }
      });
    }

    // Add cardiovascular questions
    for (const questionData of adultCardiovascularQuestions) {
      await prisma.question.create({
        data: {
          question: questionData.question,
          options: JSON.stringify(questionData.options),
          correctIndex: questionData.correctIndex,
          explanation: questionData.explanation,
          references: JSON.stringify(questionData.references),
          difficulty: questionData.difficulty,
          topicId: cardiovascularTopic.id
        }
      });
    }

    console.log('🚑 Adding pediatric resuscitation questions...');
    // Find or create pediatric resuscitation topic
    let resuscitationTopic = pediatricModule.topics.find((t: any) => t.name.includes('Resuscitation'));
    
    if (!resuscitationTopic) {
      resuscitationTopic = await prisma.topic.create({
        data: {
          name: 'Pediatric Resuscitation',
          description: 'Pediatric emergency resuscitation protocols and procedures',
          moduleId: pediatricModule.id,
          category: 'resuscitation'
        }
      });
    }

    // Add pediatric questions
    for (const questionData of pediatricResuscitationQuestions) {
      await prisma.question.create({
        data: {
          question: questionData.question,
          options: JSON.stringify(questionData.options),
          correctIndex: questionData.correctIndex,
          explanation: questionData.explanation,
          references: JSON.stringify(questionData.references),
          difficulty: questionData.difficulty,
          topicId: resuscitationTopic.id
        }
      });
    }

    console.log('🫁 Adding additional specialty topics...');
    // Add respiratory emergencies topic for adults
    const respiratoryTopic = await prisma.topic.create({
      data: {
        name: 'Respiratory Emergencies',
        description: 'Acute respiratory conditions and management',
        moduleId: adultModule.id,
        category: 'respiratory'
      }
    });

    // Add infectious diseases topic for pediatrics  
    const infectiousTopic = await prisma.topic.create({
      data: {
        name: 'Infectious Diseases',
        description: 'Pediatric infectious disease emergencies',
        moduleId: pediatricModule.id,
        category: 'infectious'
      }
    });

    // Add additional questions
    for (const [topicName, questions] of Object.entries(additionalTopicQuestions)) {
      const targetTopicId = topicName.includes('Respiratory') ? respiratoryTopic.id : infectiousTopic.id;
      
      for (const questionData of questions) {
        await prisma.question.create({
          data: {
            question: questionData.question,
            options: JSON.stringify(questionData.options),
            correctIndex: questionData.correctIndex,
            explanation: questionData.explanation,
            references: JSON.stringify(questionData.references),
            difficulty: questionData.difficulty,
            topicId: targetTopicId
          }
        });
      }
    }

    console.log('📊 Generating final summary...');
    await prisma.$disconnect();

  } catch (error) {
    console.error('❌ Error generating questions:', error);
  }
}

generateQuestionBank();