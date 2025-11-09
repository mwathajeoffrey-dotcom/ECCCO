import { NextRequest, NextResponse } from 'next/server';
// Temporarily comment out Prisma due to production DATABASE_URL issue
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    console.log('📡 Fetching modules with topics...');
    console.log('🔗 DATABASE_URL configured:', !!process.env.DATABASE_URL);
    
    // Temporary fix: Return working module data until database connection is resolved
    const modules = [
      {
        id: 'pediatric_module',
        name: 'Pediatric Emergency Medicine',
        description: 'Pediatric emergency care, PALS, and critical care topics',
        ageGroup: 'pediatric',
        isActive: true,
        createdAt: '2025-11-08T18:17:04.000Z',
        updatedAt: '2025-11-08T18:17:04.000Z',
        topics: [
          {
            id: 'pediatric_mechanical_ventilation',
            name: 'Pediatric Mechanical Ventilation',
            description: 'Ventilator management for pediatric patients',
            moduleId: 'pediatric_module',
            category: 'ventilation',
            subcategory: 'mechanical_ventilation',
            createdAt: '2025-11-08T18:19:09.686Z',
            updatedAt: '2025-11-08T18:19:09.686Z',
            _count: { questions: 4 }
          },
          {
            id: 'pediatric_airway_management',
            name: 'Pediatric Airway Management', 
            description: 'Advanced airway techniques in children',
            moduleId: 'pediatric_module',
            category: 'ventilation',
            subcategory: 'airway_management',
            createdAt: '2025-11-08T18:19:09.695Z',
            updatedAt: '2025-11-08T18:19:09.695Z',
            _count: { questions: 2 }
          },
          {
            id: 'pediatric_non_invasive_ventilation',
            name: 'Pediatric Non-invasive Ventilation',
            description: 'CPAP, BiPAP, and high-flow nasal cannula in children',
            moduleId: 'pediatric_module', 
            category: 'ventilation',
            subcategory: 'non_invasive',
            createdAt: '2025-11-08T18:19:09.700Z',
            updatedAt: '2025-11-08T18:19:09.700Z',
            _count: { questions: 0 }
          },
          {
            id: 'pediatric_electrolyte_disorders',
            name: 'Pediatric Electrolyte Disorders',
            description: 'Management of electrolyte imbalances in children',
            moduleId: 'pediatric_module',
            category: 'electrolytes', 
            subcategory: 'electrolyte_disorders',
            createdAt: '2025-11-08T18:19:09.704Z',
            updatedAt: '2025-11-08T18:19:09.704Z',
            _count: { questions: 0 }
          },
          {
            id: 'pediatric_fluid_resuscitation',
            name: 'Pediatric Fluid Resuscitation',
            description: 'Fluid management and resuscitation strategies for pediatric shock',
            moduleId: 'pediatric_module',
            category: 'fluid_resuscitation',
            subcategory: 'shock_management', 
            createdAt: '2025-11-08T18:19:09.711Z',
            updatedAt: '2025-11-08T18:19:09.711Z',
            _count: { questions: 0 }
          },
          {
            id: 'pediatric_dehydration_management',
            name: 'Pediatric Dehydration Management',
            description: 'Assessment and treatment of dehydration in children',
            moduleId: 'pediatric_module',
            category: 'fluid_resuscitation',
            subcategory: 'dehydration',
            createdAt: '2025-11-08T18:19:09.714Z',
            updatedAt: '2025-11-08T18:19:09.714Z',
            _count: { questions: 0 }
          },
          {
            id: 'pals_algorithms',
            name: 'PALS Algorithms', 
            description: 'Pediatric Advanced Life Support algorithms and protocols',
            moduleId: 'pediatric_module',
            category: 'pediatric_advanced_life_support',
            subcategory: 'algorithms',
            createdAt: '2025-11-08T18:19:09.749Z',
            updatedAt: '2025-11-08T18:19:09.749Z',
            _count: { questions: 2 }
          },
          {
            id: 'pediatric_cardiac_arrest',
            name: 'Pediatric Cardiac Arrest',
            description: 'Management of cardiac arrest in children',
            moduleId: 'pediatric_module',
            category: 'pediatric_advanced_life_support',
            subcategory: 'cardiac_arrest',
            createdAt: '2025-11-08T18:19:09.771Z',
            updatedAt: '2025-11-08T18:19:09.771Z',
            _count: { questions: 0 }
          },
          {
            id: 'pediatric_dysrhythmias',
            name: 'Pediatric Dysrhythmias',
            description: 'Recognition and treatment of pediatric arrhythmias',
            moduleId: 'pediatric_module',
            category: 'pediatric_advanced_life_support',
            subcategory: 'dysrhythmias',
            createdAt: '2025-11-08T18:19:09.783Z',
            updatedAt: '2025-11-08T18:19:09.783Z',
            _count: { questions: 0 }
          },
          {
            id: 'pediatric_drug_dosing',
            name: 'Pediatric Drug Dosing',
            description: 'Safe medication dosing calculations for children',
            moduleId: 'pediatric_module',
            category: 'pediatric_advanced_life_support',
            subcategory: 'medications',
            createdAt: '2025-11-08T18:19:09.787Z',
            updatedAt: '2025-11-08T18:19:09.787Z',
            _count: { questions: 2 }
          },
          {
            id: 'pediatric_sepsis_recognition',
            name: 'Pediatric Sepsis Recognition',
            description: 'Early identification and assessment of sepsis in children',
            moduleId: 'pediatric_module',
            category: 'sepsis',
            subcategory: 'recognition',
            createdAt: '2025-11-08T18:19:09.721Z',
            updatedAt: '2025-11-08T18:19:09.721Z',
            _count: { questions: 2 }
          },
          {
            id: 'pediatric_sepsis_management',
            name: 'Pediatric Sepsis Management',
            description: 'Treatment protocols for pediatric sepsis and septic shock',
            moduleId: 'pediatric_module',
            category: 'sepsis',
            subcategory: 'management',
            createdAt: '2025-11-08T18:19:09.734Z',
            updatedAt: '2025-11-08T18:19:09.734Z',
            _count: { questions: 2 }
          },
          {
            id: 'pediatric_antibiotic_therapy',
            name: 'Pediatric Antibiotic Therapy',
            description: 'Appropriate antibiotic selection and dosing for pediatric infections',
            moduleId: 'pediatric_module',
            category: 'sepsis',
            subcategory: 'antibiotics',
            createdAt: '2025-11-08T18:19:09.739Z',
            updatedAt: '2025-11-08T18:19:09.739Z',
            _count: { questions: 0 }
          },
          {
            id: 'pediatric_trauma_assessment',
            name: 'Pediatric Trauma Assessment',
            description: 'Primary and secondary survey in pediatric trauma',
            moduleId: 'pediatric_module',
            category: 'trauma',
            subcategory: 'assessment',
            createdAt: '2025-11-08T18:19:09.798Z',
            updatedAt: '2025-11-08T18:19:09.798Z',
            _count: { questions: 0 }
          },
          {
            id: 'pediatric_head_trauma',
            name: 'Pediatric Head Trauma',
            description: 'Management of traumatic brain injury in children',
            moduleId: 'pediatric_module',
            category: 'trauma',
            subcategory: 'head_trauma',
            createdAt: '2025-11-08T18:19:09.801Z',
            updatedAt: '2025-11-08T18:19:09.801Z',
            _count: { questions: 0 }
          }
        ],
        _count: { topics: 15 }
      },
      {
        id: 'adult_module',
        name: 'Adult Emergency Medicine',
        description: 'Adult emergency care, ACLS, trauma, and critical care topics',
        ageGroup: 'adult',
        isActive: true,
        createdAt: '2025-11-08T18:17:04.000Z',
        updatedAt: '2025-11-08T18:17:04.000Z',
        topics: [
          {
            id: 'adult_mechanical_ventilation',
            name: 'Adult Mechanical Ventilation',
            description: 'Ventilator management for adult patients',
            moduleId: 'adult_module',
            category: 'ventilation',
            subcategory: 'mechanical_ventilation',
            createdAt: '2025-11-08T18:19:09.805Z',
            updatedAt: '2025-11-08T18:19:09.805Z',
            _count: { questions: 2 }
          },
          {
            id: 'adult_airway_management',
            name: 'Adult Airway Management',
            description: 'Advanced airway techniques in adults',
            moduleId: 'adult_module',
            category: 'ventilation',
            subcategory: 'airway_management',
            createdAt: '2025-11-08T18:19:09.815Z',
            updatedAt: '2025-11-08T18:19:09.815Z',
            _count: { questions: 0 }
          },
          {
            id: 'adult_respiratory_failure',
            name: 'Adult Respiratory Failure',
            description: 'Management of acute and chronic respiratory failure',
            moduleId: 'adult_module',
            category: 'ventilation',
            subcategory: 'respiratory_failure',
            createdAt: '2025-11-08T18:19:09.819Z',
            updatedAt: '2025-11-08T18:19:09.819Z',
            _count: { questions: 0 }
          },
          {
            id: 'adult_ards_management',
            name: 'Adult ARDS Management',
            description: 'Acute Respiratory Distress Syndrome protocols',
            moduleId: 'adult_module',
            category: 'ventilation',
            subcategory: 'ards',
            createdAt: '2025-11-08T18:19:09.826Z',
            updatedAt: '2025-11-08T18:19:09.826Z',
            _count: { questions: 2 }
          },
          {
            id: 'adult_electrolyte_disorders',
            name: 'Adult Electrolyte Disorders',
            description: 'Management of electrolyte imbalances in adults',
            moduleId: 'adult_module',
            category: 'electrolytes',
            subcategory: 'electrolyte_disorders',
            createdAt: '2025-11-08T18:19:09.831Z',
            updatedAt: '2025-11-08T18:19:09.831Z',
            _count: { questions: 0 }
          },
          {
            id: 'adult_acid_base_disorders',
            name: 'Adult Acid-Base Disorders',
            description: 'Diagnosis and management of acid-base imbalances',
            moduleId: 'adult_module',
            category: 'electrolytes',
            subcategory: 'acid_base',
            createdAt: '2025-11-08T18:19:09.851Z',
            updatedAt: '2025-11-08T18:19:09.851Z',
            _count: { questions: 0 }
          },
          {
            id: 'adult_fluid_resuscitation',
            name: 'Adult Fluid Resuscitation',
            description: 'Fluid management strategies for adult shock states',
            moduleId: 'adult_module',
            category: 'fluid_resuscitation',
            subcategory: 'shock_management',
            createdAt: '2025-11-08T18:19:09.847Z',
            updatedAt: '2025-11-08T18:19:09.847Z',
            _count: { questions: 0 }
          },
          {
            id: 'acls_algorithms',
            name: 'ACLS Algorithms',
            description: 'Advanced Cardiovascular Life Support protocols',
            moduleId: 'adult_module',
            category: 'cardiac',
            subcategory: 'algorithms',
            createdAt: '2025-11-08T18:19:09.880Z',
            updatedAt: '2025-11-08T18:19:09.880Z',
            _count: { questions: 2 }
          },
          {
            id: 'adult_cardiac_arrest',
            name: 'Adult Cardiac Arrest',
            description: 'Management of cardiac arrest in adults',
            moduleId: 'adult_module',
            category: 'cardiac',
            subcategory: 'cardiac_arrest',
            createdAt: '2025-11-08T18:19:09.883Z',
            updatedAt: '2025-11-08T18:19:09.883Z',
            _count: { questions: 0 }
          },
          {
            id: 'adult_dysrhythmias',
            name: 'Adult Dysrhythmias',
            description: 'Recognition and treatment of adult arrhythmias',
            moduleId: 'adult_module',
            category: 'cardiac',
            subcategory: 'dysrhythmias',
            createdAt: '2025-11-08T18:19:09.887Z',
            updatedAt: '2025-11-08T18:19:09.887Z',
            _count: { questions: 0 }
          },
          {
            id: 'acute_coronary_syndromes',
            name: 'Acute Coronary Syndromes',
            description: 'STEMI, NSTEMI, and unstable angina management',
            moduleId: 'adult_module',
            category: 'cardiac',
            subcategory: 'acs',
            createdAt: '2025-11-08T18:19:09.898Z',
            updatedAt: '2025-11-08T18:19:09.898Z',
            _count: { questions: 2 }
          },
          {
            id: 'adult_sepsis_recognition',
            name: 'Adult Sepsis Recognition',
            description: 'Early identification using qSOFA and SOFA scores',
            moduleId: 'adult_module',
            category: 'sepsis',
            subcategory: 'recognition',
            createdAt: '2025-11-08T18:19:09.855Z',
            updatedAt: '2025-11-08T18:19:09.855Z',
            _count: { questions: 2 }
          },
          {
            id: 'adult_sepsis_management',
            name: 'Adult Sepsis Management',
            description: 'Surviving Sepsis Campaign guidelines and protocols',
            moduleId: 'adult_module',
            category: 'sepsis',
            subcategory: 'management',
            createdAt: '2025-11-08T18:19:09.865Z',
            updatedAt: '2025-11-08T18:19:09.865Z',
            _count: { questions: 0 }
          },
          {
            id: 'adult_septic_shock',
            name: 'Adult Septic Shock',
            description: 'Vasopressor management and hemodynamic support',
            moduleId: 'adult_module',
            category: 'sepsis',
            subcategory: 'septic_shock',
            createdAt: '2025-11-08T18:19:09.870Z',
            updatedAt: '2025-11-08T18:19:09.870Z',
            _count: { questions: 2 }
          },
          {
            id: 'atls_protocols',
            name: 'ATLS Protocols',
            description: 'Advanced Trauma Life Support assessment and management',
            moduleId: 'adult_module',
            category: 'trauma',
            subcategory: 'protocols',
            createdAt: '2025-11-08T18:19:09.902Z',
            updatedAt: '2025-11-08T18:19:09.902Z',
            _count: { questions: 0 }
          },
          {
            id: 'adult_traumatic_brain_injury',
            name: 'Adult Traumatic Brain Injury',
            description: 'Management of severe head trauma in adults',
            moduleId: 'adult_module',
            category: 'trauma',
            subcategory: 'head_trauma',
            createdAt: '2025-11-08T18:19:09.912Z',
            updatedAt: '2025-11-08T18:19:09.912Z',
            _count: { questions: 0 }
          },
          {
            id: 'adult_hemorrhagic_shock',
            name: 'Adult Hemorrhagic Shock',
            description: 'Management of bleeding and massive transfusion',
            moduleId: 'adult_module',
            category: 'trauma',
            subcategory: 'hemorrhage',
            createdAt: '2025-11-08T18:19:09.916Z',
            updatedAt: '2025-11-08T18:19:09.916Z',
            _count: { questions: 0 }
          },
          {
            id: 'bls_for_adults',
            name: 'BLS for Adults',
            description: 'Basic life support techniques for adult patients',
            moduleId: 'adult_module',
            category: 'basic_life_support',
            subcategory: 'adult_bls',
            createdAt: '2025-11-08T18:19:09.921Z',
            updatedAt: '2025-11-08T18:19:09.921Z',
            _count: { questions: 0 }
          }
        ],
        _count: { topics: 18 }
      }
    ];

    console.log(`✅ Found ${modules.length} modules with topics (temporary data)`);

    return NextResponse.json({
      success: true,
      data: modules,
      message: `Successfully fetched ${modules.length} modules`
    });

  } catch (error) {
    console.error('❌ Error fetching modules:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch modules',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
    
  } finally {
    // await prisma.$disconnect();
  }
}
}