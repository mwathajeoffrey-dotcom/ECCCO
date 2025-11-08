import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const pediatricTopicsData = [
  // Pediatric Ventilation & Airway
  {
    name: "Pediatric Mechanical Ventilation",
    description: "Ventilator management for pediatric patients",
    category: "ventilation",
    subcategory: "mechanical_ventilation"
  },
  {
    name: "Pediatric Airway Management",
    description: "Advanced airway techniques in children",
    category: "ventilation", 
    subcategory: "airway_management"
  },
  {
    name: "Pediatric Non-invasive Ventilation",
    description: "CPAP, BiPAP, and high-flow nasal cannula in children",
    category: "ventilation",
    subcategory: "non_invasive"
  },

  // Pediatric Electrolytes & Fluids
  {
    name: "Pediatric Electrolyte Disorders",
    description: "Management of electrolyte imbalances in children",
    category: "electrolytes",
    subcategory: "electrolyte_disorders"
  },
  {
    name: "Pediatric Fluid Resuscitation",
    description: "Fluid management and resuscitation strategies for pediatric shock",
    category: "fluid_resuscitation",
    subcategory: "shock_management"
  },
  {
    name: "Pediatric Dehydration Management",
    description: "Assessment and treatment of dehydration in children",
    category: "fluid_resuscitation",
    subcategory: "dehydration"
  },

  // Pediatric Sepsis & Infection
  {
    name: "Pediatric Sepsis Recognition",
    description: "Early identification and assessment of sepsis in children",
    category: "sepsis",
    subcategory: "recognition"
  },
  {
    name: "Pediatric Sepsis Management",
    description: "Treatment protocols for pediatric sepsis and septic shock",
    category: "sepsis",
    subcategory: "management"
  },
  {
    name: "Pediatric Antibiotic Therapy",
    description: "Appropriate antibiotic selection and dosing for pediatric infections",
    category: "sepsis",
    subcategory: "antibiotics"
  },

  // PALS & Pediatric Emergency Care
  {
    name: "PALS Algorithms",
    description: "Pediatric Advanced Life Support algorithms and protocols",
    category: "pediatric_advanced_life_support",
    subcategory: "algorithms"
  },
  {
    name: "Pediatric Cardiac Arrest",
    description: "Management of cardiac arrest in children",
    category: "pediatric_advanced_life_support",
    subcategory: "cardiac_arrest"
  },
  {
    name: "Pediatric Dysrhythmias",
    description: "Recognition and treatment of pediatric arrhythmias",
    category: "pediatric_advanced_life_support",
    subcategory: "dysrhythmias"
  },
  {
    name: "Pediatric Drug Dosing",
    description: "Safe medication dosing calculations for children",
    category: "pediatric_advanced_life_support",
    subcategory: "medications"
  },

  // Pediatric Trauma & Emergency
  {
    name: "Pediatric Trauma Assessment",
    description: "Primary and secondary survey in pediatric trauma",
    category: "trauma",
    subcategory: "assessment"
  },
  {
    name: "Pediatric Head Trauma",
    description: "Management of traumatic brain injury in children",
    category: "trauma",
    subcategory: "head_trauma"
  }
]

const adultTopicsData = [
  // Adult Ventilation & Airway
  {
    name: "Adult Mechanical Ventilation",
    description: "Ventilator management for adult patients",
    category: "ventilation",
    subcategory: "mechanical_ventilation"
  },
  {
    name: "Adult Airway Management",
    description: "Advanced airway techniques in adults",
    category: "ventilation",
    subcategory: "airway_management"
  },
  {
    name: "Adult Respiratory Failure",
    description: "Management of acute and chronic respiratory failure",
    category: "ventilation",
    subcategory: "respiratory_failure"
  },
  {
    name: "Adult ARDS Management",
    description: "Acute Respiratory Distress Syndrome protocols",
    category: "ventilation",
    subcategory: "ards"
  },

  // Adult Electrolytes & Fluids  
  {
    name: "Adult Electrolyte Disorders",
    description: "Management of electrolyte imbalances in adults",
    category: "electrolytes",
    subcategory: "electrolyte_disorders"
  },
  {
    name: "Adult Fluid Resuscitation",
    description: "Fluid management strategies for adult shock states",
    category: "fluid_resuscitation",
    subcategory: "shock_management"
  },
  {
    name: "Adult Acid-Base Disorders",
    description: "Diagnosis and management of acid-base imbalances",
    category: "electrolytes",
    subcategory: "acid_base"
  },

  // Adult Sepsis & Infection
  {
    name: "Adult Sepsis Recognition",
    description: "Early identification using qSOFA and SOFA scores",
    category: "sepsis",
    subcategory: "recognition"
  },
  {
    name: "Adult Sepsis Management", 
    description: "Surviving Sepsis Campaign guidelines and protocols",
    category: "sepsis",
    subcategory: "management"
  },
  {
    name: "Adult Septic Shock",
    description: "Vasopressor management and hemodynamic support",
    category: "sepsis",
    subcategory: "septic_shock"
  },

  // ACLS & Adult Cardiac Care
  {
    name: "ACLS Algorithms",
    description: "Advanced Cardiovascular Life Support protocols",
    category: "cardiac",
    subcategory: "algorithms"
  },
  {
    name: "Adult Cardiac Arrest",
    description: "Management of cardiac arrest in adults",
    category: "cardiac",
    subcategory: "cardiac_arrest"
  },
  {
    name: "Adult Dysrhythmias",
    description: "Recognition and treatment of adult arrhythmias",
    category: "cardiac", 
    subcategory: "dysrhythmias"
  },
  {
    name: "Acute Coronary Syndromes",
    description: "STEMI, NSTEMI, and unstable angina management",
    category: "cardiac",
    subcategory: "acs"
  },

  // Adult Trauma & Emergency
  {
    name: "ATLS Protocols",
    description: "Advanced Trauma Life Support assessment and management",
    category: "trauma",
    subcategory: "protocols"
  },
  {
    name: "Adult Traumatic Brain Injury",
    description: "Management of severe head trauma in adults",
    category: "trauma", 
    subcategory: "head_trauma"
  },
  {
    name: "Adult Hemorrhagic Shock",
    description: "Management of bleeding and massive transfusion",
    category: "trauma",
    subcategory: "hemorrhage"
  },

  // Basic Life Support
  {
    name: "BLS for Adults",
    description: "Basic life support techniques for adult patients", 
    category: "basic_life_support",
    subcategory: "adult_bls"
  }
]

async function setupModules() {
  try {
    console.log("🏗️ Setting up Pediatric and Adult Modules...")

    // Get existing modules
    const modules = await prisma.module.findMany()
    
    let pediatricModule = modules.find(m => m.ageGroup === 'pediatric')
    let adultModule = modules.find(m => m.ageGroup === 'adult')

    console.log(`📋 Found ${modules.length} existing modules`)

    // Create pediatric topics
    console.log("\n👶 Creating Pediatric Topics...")
    for (const topic of pediatricTopicsData) {
      const created = await prisma.topic.upsert({
        where: {
          moduleId_name: {
            moduleId: pediatricModule!.id,
            name: topic.name
          }
        },
        update: {
          description: topic.description,
          category: topic.category,
          subcategory: topic.subcategory
        },
        create: {
          name: topic.name,
          description: topic.description,
          moduleId: pediatricModule!.id,
          category: topic.category,
          subcategory: topic.subcategory
        }
      })
      console.log(`  ✅ ${created.name} [${created.category}/${created.subcategory}]`)
    }

    // Create adult topics  
    console.log("\n👨 Creating Adult Topics...")
    for (const topic of adultTopicsData) {
      const created = await prisma.topic.upsert({
        where: {
          moduleId_name: {
            moduleId: adultModule!.id,
            name: topic.name
          }
        },
        update: {
          description: topic.description,
          category: topic.category,
          subcategory: topic.subcategory
        },
        create: {
          name: topic.name,
          description: topic.description,
          moduleId: adultModule!.id,
          category: topic.category,
          subcategory: topic.subcategory
        }
      })
      console.log(`  ✅ ${created.name} [${created.category}/${created.subcategory}]`)
    }

    // Summary
    const finalTopics = await prisma.topic.findMany({
      include: {
        module: true,
        _count: {
          select: { questions: true }
        }
      },
      orderBy: [
        { module: { ageGroup: 'asc' } },
        { category: 'asc' },
        { name: 'asc' }
      ]
    })

    console.log("\n📊 Final Module Structure:")
    console.log("=".repeat(50))
    
    const pediatricTopics = finalTopics.filter(t => t.module.ageGroup === 'pediatric')
    const adultTopics = finalTopics.filter(t => t.module.ageGroup === 'adult')
    
    console.log(`\n👶 PEDIATRIC MODULE (${pediatricTopics.length} topics):`)
    const pediatricCategories = [...new Set(pediatricTopics.map(t => t.category))]
    pediatricCategories.forEach(category => {
      console.log(`\n  📁 ${category.toUpperCase().replace(/_/g, ' ')}:`)
      pediatricTopics
        .filter(t => t.category === category)
        .forEach(topic => {
          console.log(`    • ${topic.name} (${topic._count.questions} questions)`)
        })
    })

    console.log(`\n👨 ADULT MODULE (${adultTopics.length} topics):`)
    const adultCategories = [...new Set(adultTopics.map(t => t.category))]
    adultCategories.forEach(category => {
      console.log(`\n  📁 ${category.toUpperCase().replace(/_/g, ' ')}:`)
      adultTopics
        .filter(t => t.category === category)
        .forEach(topic => {
          console.log(`    • ${topic.name} (${topic._count.questions} questions)`)
        })
    })

    console.log(`\n🎯 Summary:`)
    console.log(`   Pediatric Topics: ${pediatricTopics.length}`)
    console.log(`   Adult Topics: ${adultTopics.length}`)
    console.log(`   Total Topics: ${finalTopics.length}`)
    console.log(`   Total Questions: ${finalTopics.reduce((sum, t) => sum + t._count.questions, 0)}`)

  } catch (error) {
    console.error('❌ Error setting up modules:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupModules()