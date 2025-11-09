import { NextRequest, NextResponse } from 'next/server';
import { createPrismaClient } from '@/lib/database/prisma-client';

const prisma = createPrismaClient();

// This is a one-time endpoint to seed the production database
// Should be removed or secured after initial deployment
export async function POST(request: NextRequest) {
  // Basic security check - only allow in production if specific header is sent
  const adminKey = request.headers.get('x-admin-key');
  
  if (process.env.NODE_ENV === 'production' && adminKey !== 'seed-production-db-2025') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🌱 Starting production database seed...');

    // Create modules
    const adultModule = await prisma.module.upsert({
      where: { id: 'adult_module' },
      update: {},
      create: {
        id: 'adult_module',
        name: 'Adult Emergency Medicine',
        description: 'Adult emergency care, ACLS, trauma, and critical care topics',
        ageGroup: 'adult',
        isActive: true,
      },
    });

    const pediatricModule = await prisma.module.upsert({
      where: { id: 'pediatric_module' },
      update: {},
      create: {
        id: 'pediatric_module',
        name: 'Pediatric Emergency Medicine',
        description: 'Pediatric emergency care, PALS, and critical care topics',
        ageGroup: 'pediatric',
        isActive: true,
      },
    });

    // Adult topics
    const adultTopics = [
      { name: 'Adult Mechanical Ventilation', description: 'Ventilator management for adult patients', category: 'ventilation', subcategory: 'mechanical_ventilation' },
      { name: 'Adult Airway Management', description: 'Advanced airway techniques in adults', category: 'ventilation', subcategory: 'airway_management' },
      { name: 'Adult Respiratory Failure', description: 'Management of acute and chronic respiratory failure', category: 'ventilation', subcategory: 'respiratory_failure' },
      { name: 'Adult ARDS Management', description: 'Acute Respiratory Distress Syndrome protocols', category: 'ventilation', subcategory: 'ards' },
      { name: 'Adult Electrolyte Disorders', description: 'Management of electrolyte imbalances in adults', category: 'electrolytes', subcategory: 'electrolyte_disorders' },
      { name: 'Adult Acid-Base Disorders', description: 'Diagnosis and management of acid-base imbalances', category: 'electrolytes', subcategory: 'acid_base' },
      { name: 'Adult Fluid Resuscitation', description: 'Fluid management strategies for adult shock states', category: 'fluid_resuscitation', subcategory: 'shock_management' },
      { name: 'ACLS Algorithms', description: 'Advanced Cardiovascular Life Support protocols', category: 'cardiac', subcategory: 'algorithms' },
      { name: 'Adult Cardiac Arrest', description: 'Management of cardiac arrest in adults', category: 'cardiac', subcategory: 'cardiac_arrest' },
      { name: 'Adult Dysrhythmias', description: 'Recognition and treatment of adult arrhythmias', category: 'cardiac', subcategory: 'dysrhythmias' },
      { name: 'Acute Coronary Syndromes', description: 'STEMI, NSTEMI, and unstable angina management', category: 'cardiac', subcategory: 'acs' },
      { name: 'Adult Sepsis Recognition', description: 'Early identification using qSOFA and SOFA scores', category: 'sepsis', subcategory: 'recognition' },
      { name: 'Adult Sepsis Management', description: 'Surviving Sepsis Campaign guidelines and protocols', category: 'sepsis', subcategory: 'management' },
      { name: 'Adult Septic Shock', description: 'Vasopressor management and hemodynamic support', category: 'sepsis', subcategory: 'septic_shock' },
      { name: 'ATLS Protocols', description: 'Advanced Trauma Life Support assessment and management', category: 'trauma', subcategory: 'protocols' },
      { name: 'Adult Traumatic Brain Injury', description: 'Management of severe head trauma in adults', category: 'trauma', subcategory: 'head_trauma' },
      { name: 'Adult Hemorrhagic Shock', description: 'Management of bleeding and massive transfusion', category: 'trauma', subcategory: 'hemorrhage' },
      { name: 'BLS for Adults', description: 'Basic life support techniques for adult patients', category: 'basic_life_support', subcategory: 'adult_bls' },
    ];

    // Pediatric topics
    const pediatricTopics = [
      { name: 'Pediatric Mechanical Ventilation', description: 'Ventilator management for pediatric patients', category: 'ventilation', subcategory: 'mechanical_ventilation' },
      { name: 'Pediatric Airway Management', description: 'Advanced airway techniques in children', category: 'ventilation', subcategory: 'airway_management' },
      { name: 'Pediatric Non-invasive Ventilation', description: 'CPAP, BiPAP, and high-flow nasal cannula in children', category: 'ventilation', subcategory: 'non_invasive' },
      { name: 'Pediatric Electrolyte Disorders', description: 'Management of electrolyte imbalances in children', category: 'electrolytes', subcategory: 'electrolyte_disorders' },
      { name: 'Pediatric Fluid Resuscitation', description: 'Fluid management and resuscitation strategies for pediatric shock', category: 'fluid_resuscitation', subcategory: 'shock_management' },
      { name: 'Pediatric Dehydration Management', description: 'Assessment and treatment of dehydration in children', category: 'fluid_resuscitation', subcategory: 'dehydration' },
      { name: 'PALS Algorithms', description: 'Pediatric Advanced Life Support algorithms and protocols', category: 'pediatric_advanced_life_support', subcategory: 'algorithms' },
      { name: 'Pediatric Cardiac Arrest', description: 'Management of cardiac arrest in children', category: 'pediatric_advanced_life_support', subcategory: 'cardiac_arrest' },
      { name: 'Pediatric Dysrhythmias', description: 'Recognition and treatment of pediatric arrhythmias', category: 'pediatric_advanced_life_support', subcategory: 'dysrhythmias' },
      { name: 'Pediatric Drug Dosing', description: 'Safe medication dosing calculations for children', category: 'pediatric_advanced_life_support', subcategory: 'medications' },
      { name: 'Pediatric Sepsis Recognition', description: 'Early identification and assessment of sepsis in children', category: 'sepsis', subcategory: 'recognition' },
      { name: 'Pediatric Sepsis Management', description: 'Treatment protocols for pediatric sepsis and septic shock', category: 'sepsis', subcategory: 'management' },
      { name: 'Pediatric Antibiotic Therapy', description: 'Appropriate antibiotic selection and dosing for pediatric infections', category: 'sepsis', subcategory: 'antibiotics' },
      { name: 'Pediatric Trauma Assessment', description: 'Primary and secondary survey in pediatric trauma', category: 'trauma', subcategory: 'assessment' },
      { name: 'Pediatric Head Trauma', description: 'Management of traumatic brain injury in children', category: 'trauma', subcategory: 'head_trauma' },
    ];

    // Create adult topics
    for (const topicData of adultTopics) {
      await prisma.topic.upsert({
        where: { 
          moduleId_name: { 
            moduleId: adultModule.id, 
            name: topicData.name 
          } 
        },
        update: {},
        create: {
          ...topicData,
          moduleId: adultModule.id,
        },
      });
    }

    // Create pediatric topics
    for (const topicData of pediatricTopics) {
      await prisma.topic.upsert({
        where: { 
          moduleId_name: { 
            moduleId: pediatricModule.id, 
            name: topicData.name 
          } 
        },
        update: {},
        create: {
          ...topicData,
          moduleId: pediatricModule.id,
        },
      });
    }

    const finalModules = await prisma.module.findMany({
      include: {
        _count: {
          select: {
            topics: true,
          },
        },
      },
    });

    console.log('✅ Production database seeded successfully!');
    
    return NextResponse.json({
      success: true,
      message: 'Production database seeded successfully',
      modules: finalModules.map(m => ({ 
        name: m.name, 
        ageGroup: m.ageGroup, 
        topics: m._count.topics 
      }))
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to seed database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}