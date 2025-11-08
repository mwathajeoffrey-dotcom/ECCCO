import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Sample questions for pediatric topics
const pediatricQuestions = {
  ventilation: [
    {
      topic: "Pediatric Mechanical Ventilation",
      questions: [
        {
          question: "What is the appropriate initial tidal volume for a 10 kg child on mechanical ventilation?",
          options: ["40-60 mL", "60-80 mL", "80-100 mL", "100-120 mL"],
          correctIndex: 1,
          explanation: "For pediatric patients, the initial tidal volume should be 6-8 mL/kg. For a 10 kg child, this would be 60-80 mL.",
          references: ["PALS Guidelines 2020", "Pediatric Critical Care Medicine"],
          difficulty: "medium"
        },
        {
          question: "Which ventilator mode is most commonly used initially for pediatric patients with respiratory failure?",
          options: ["Volume control", "Pressure control", "SIMV", "CPAP only"],
          correctIndex: 1,
          explanation: "Pressure control ventilation is often preferred in pediatric patients due to better tolerance and lower risk of barotrauma.",
          references: ["Pediatric Critical Care Guidelines"],
          difficulty: "medium"
        }
      ]
    },
    {
      topic: "Pediatric Airway Management",
      questions: [
        {
          question: "What is the most common cause of airway obstruction in unconscious pediatric patients?",
          options: ["Foreign body", "Tongue", "Laryngeal edema", "Bronchospasm"],
          correctIndex: 1,
          explanation: "The tongue is the most common cause of airway obstruction in unconscious children due to their relatively large tongue and small airway.",
          references: ["PALS Provider Manual 2020"],
          difficulty: "easy"
        }
      ]
    }
  ],
  sepsis: [
    {
      topic: "Pediatric Sepsis Recognition",
      questions: [
        {
          question: "According to pediatric sepsis criteria, what heart rate threshold indicates tachycardia in a 2-year-old child?",
          options: [">120 bpm", ">130 bpm", ">150 bpm", ">180 bpm"],
          correctIndex: 2,
          explanation: "For children 2-5 years old, tachycardia is defined as heart rate >150 bpm according to pediatric sepsis criteria.",
          references: ["Pediatric Sepsis Guidelines 2020"],
          difficulty: "medium"
        }
      ]
    },
    {
      topic: "Pediatric Sepsis Management",
      questions: [
        {
          question: "What is the recommended initial fluid bolus for a pediatric patient with septic shock?",
          options: ["10 mL/kg", "20 mL/kg", "30 mL/kg", "40 mL/kg"],
          correctIndex: 1,
          explanation: "The initial fluid bolus for pediatric septic shock should be 20 mL/kg of isotonic crystalloid given rapidly.",
          references: ["Surviving Sepsis Campaign Pediatric Guidelines"],
          difficulty: "easy"
        }
      ]
    }
  ],
  pediatric_advanced_life_support: [
    {
      topic: "PALS Algorithms",
      questions: [
        {
          question: "In the PALS cardiac arrest algorithm, what is the recommended dose of epinephrine for a 15 kg child?",
          options: ["0.15 mg", "0.3 mg", "1.5 mg", "3 mg"],
          correctIndex: 0,
          explanation: "Epinephrine dose for pediatric cardiac arrest is 0.01 mg/kg IV/IO. For a 15 kg child: 15 × 0.01 = 0.15 mg.",
          references: ["PALS Provider Manual 2020"],
          difficulty: "medium"
        }
      ]
    },
    {
      topic: "Pediatric Drug Dosing",
      questions: [
        {
          question: "What is the correct adenosine dose for SVT in a 20 kg pediatric patient?",
          options: ["2 mg", "4 mg", "6 mg", "12 mg"],
          correctIndex: 1,
          explanation: "Initial adenosine dose for pediatric SVT is 0.1 mg/kg (max 6 mg). For 20 kg: 0.1 × 20 = 2 mg, but 4 mg is the practical first dose.",
          references: ["PALS Pharmacology"],
          difficulty: "hard"
        }
      ]
    }
  ]
}

// Sample questions for adult topics  
const adultQuestions = {
  ventilation: [
    {
      topic: "Adult Mechanical Ventilation",
      questions: [
        {
          question: "What is the recommended tidal volume for a 70 kg patient with ARDS?",
          options: ["420-490 mL", "490-560 mL", "560-630 mL", "630-700 mL"],
          correctIndex: 0,
          explanation: "For ARDS patients, low tidal volume ventilation of 6-7 mL/kg predicted body weight is recommended. For 70 kg: 6-7 × 70 = 420-490 mL.",
          references: ["ARDS Network Protocol"],
          difficulty: "medium"
        }
      ]
    },
    {
      topic: "Adult ARDS Management",
      questions: [
        {
          question: "What PEEP level is typically started in moderate to severe ARDS?",
          options: ["5 cmH2O", "8 cmH2O", "12 cmH2O", "20 cmH2O"],
          correctIndex: 2,
          explanation: "In moderate to severe ARDS, PEEP is typically started at 10-12 cmH2O and titrated based on FiO2 requirements and hemodynamics.",
          references: ["ARDSnet PEEP/FiO2 Tables"],
          difficulty: "medium"
        }
      ]
    }
  ],
  sepsis: [
    {
      topic: "Adult Sepsis Recognition",
      questions: [
        {
          question: "According to Sepsis-3 criteria, what qSOFA score indicates high risk for poor outcomes?",
          options: ["≥1", "≥2", "≥3", "≥4"],
          correctIndex: 1,
          explanation: "A qSOFA score of ≥2 indicates high risk for poor outcomes and should prompt consideration of sepsis and ICU care.",
          references: ["Sepsis-3 Consensus Definitions"],
          difficulty: "easy"
        }
      ]
    },
    {
      topic: "Adult Septic Shock",
      questions: [
        {
          question: "What is the first-line vasopressor for septic shock according to Surviving Sepsis Campaign guidelines?",
          options: ["Dopamine", "Norepinephrine", "Epinephrine", "Vasopressin"],
          correctIndex: 1,
          explanation: "Norepinephrine is the first-line vasopressor for septic shock due to its potent α1-adrenergic effects and minimal β2-agonist activity.",
          references: ["Surviving Sepsis Campaign 2021"],
          difficulty: "easy"
        }
      ]
    }
  ],
  cardiac: [
    {
      topic: "ACLS Algorithms",
      questions: [
        {
          question: "In the ACLS cardiac arrest algorithm, what is the recommended dose of epinephrine?",
          options: ["0.1 mg", "1 mg", "10 mg", "Variable by weight"],
          correctIndex: 1,
          explanation: "The standard epinephrine dose for adult cardiac arrest is 1 mg IV/IO every 3-5 minutes during CPR.",
          references: ["AHA ACLS Provider Manual 2020"],
          difficulty: "easy"
        }
      ]
    },
    {
      topic: "Acute Coronary Syndromes",
      questions: [
        {
          question: "What is the maximum time from symptom onset to PCI for STEMI patients (door-to-balloon time)?",
          options: ["60 minutes", "90 minutes", "120 minutes", "180 minutes"],
          correctIndex: 1,
          explanation: "The goal door-to-balloon time for STEMI patients is ≤90 minutes to minimize myocardial damage.",
          references: ["AHA/ACC STEMI Guidelines"],
          difficulty: "easy"
        }
      ]
    }
  ]
}

async function generateQuestions() {
  try {
    console.log('🎯 Generating sample questions for pediatric and adult modules...')
    
    // Get modules
    const pediatricModule = await prisma.module.findFirst({
      where: { ageGroup: 'pediatric' },
      include: { topics: true }
    })
    
    const adultModule = await prisma.module.findFirst({
      where: { ageGroup: 'adult' },
      include: { topics: true }
    })

    if (!pediatricModule || !adultModule) {
      throw new Error('Modules not found. Please run setup-pediatric-adult-modules.ts first.')
    }

    let totalQuestionsGenerated = 0

    // Generate pediatric questions
    console.log('\n👶 Generating Pediatric Questions...')
    for (const [category, categoryQuestions] of Object.entries(pediatricQuestions)) {
      for (const topicData of categoryQuestions) {
        const topic = pediatricModule.topics.find(t => t.name === topicData.topic)
        if (!topic) {
          console.log(`   ⚠️ Topic not found: ${topicData.topic}`)
          continue
        }

        for (const questionData of topicData.questions) {
          await prisma.question.create({
            data: {
              question: questionData.question,
              options: JSON.stringify(questionData.options),
              correctIndex: questionData.correctIndex,
              explanation: questionData.explanation,
              references: JSON.stringify(questionData.references),
              difficulty: questionData.difficulty,
              topicId: topic.id
            }
          })
          totalQuestionsGenerated++
        }
        console.log(`   ✅ ${topicData.topic}: ${topicData.questions.length} questions`)
      }
    }

    // Generate adult questions
    console.log('\n👨 Generating Adult Questions...')
    for (const [category, categoryQuestions] of Object.entries(adultQuestions)) {
      for (const topicData of categoryQuestions) {
        const topic = adultModule.topics.find(t => t.name === topicData.topic)
        if (!topic) {
          console.log(`   ⚠️ Topic not found: ${topicData.topic}`)
          continue
        }

        for (const questionData of topicData.questions) {
          await prisma.question.create({
            data: {
              question: questionData.question,
              options: JSON.stringify(questionData.options),
              correctIndex: questionData.correctIndex,
              explanation: questionData.explanation,
              references: JSON.stringify(questionData.references),
              difficulty: questionData.difficulty,
              topicId: topic.id
            }
          })
          totalQuestionsGenerated++
        }
        console.log(`   ✅ ${topicData.topic}: ${topicData.questions.length} questions`)
      }
    }

    // Generate summary
    const finalCounts = await prisma.topic.findMany({
      include: {
        module: true,
        _count: {
          select: { questions: true }
        }
      }
    })

    console.log('\n📊 Question Generation Summary:')
    console.log('='.repeat(50))

    const pediatricTopics = finalCounts.filter(t => t.module.ageGroup === 'pediatric')
    const adultTopics = finalCounts.filter(t => t.module.ageGroup === 'adult')

    console.log(`\n👶 PEDIATRIC MODULE:`)
    pediatricTopics.forEach(topic => {
      if (topic._count.questions > 0) {
        console.log(`   ${topic.name}: ${topic._count.questions} questions`)
      }
    })

    console.log(`\n👨 ADULT MODULE:`)
    adultTopics.forEach(topic => {
      if (topic._count.questions > 0) {
        console.log(`   ${topic.name}: ${topic._count.questions} questions`)
      }
    })

    const totalPediatric = pediatricTopics.reduce((sum, t) => sum + t._count.questions, 0)
    const totalAdult = adultTopics.reduce((sum, t) => sum + t._count.questions, 0)

    console.log(`\n🎯 TOTALS:`)
    console.log(`   Pediatric Questions: ${totalPediatric}`)
    console.log(`   Adult Questions: ${totalAdult}`)
    console.log(`   Total Questions Generated: ${totalQuestionsGenerated}`)
    console.log(`   Topics with Questions: ${finalCounts.filter(t => t._count.questions > 0).length}`)

  } catch (error) {
    console.error('❌ Error generating questions:', error)
  } finally {
    await prisma.$disconnect()
  }
}

generateQuestions()