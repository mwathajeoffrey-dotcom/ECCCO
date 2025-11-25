import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// This endpoint seeds the production database with questions
// Access: https://your-app.vercel.app/api/admin/seed-production

export async function POST() {
  try {
    console.log('🌱 Starting production database seed via API...');
    
    // Production database (this will use ACCELERATE_URL from env)
    const prisma = new PrismaClient();
    
    // Check current state
    const moduleCount = await prisma.module.count();
    const topicCount = await prisma.topic.count();
    const questionCount = await prisma.question.count();
    
    console.log(`📊 Current production state:`);
    console.log(`   - ${moduleCount} modules`);
    console.log(`   - ${topicCount} topics`);
    console.log(`   - ${questionCount} questions`);
    
    if (questionCount > 0) {
      return NextResponse.json({
        success: true,
        message: 'Database already has data',
        counts: { modules: moduleCount, topics: topicCount, questions: questionCount }
      });
    }
    
    // Import all question files
    const { airwayManagementQuestions } = await import('@/lib/questions/airway-management');
    const { mechanicalVentilationQuestions } = await import('@/lib/questions/mechanical-ventilation');
    const { sepsisManagementQuestions } = await import('@/lib/questions/sepsis-management');
    const { cardiacEmergenciesQuestions } = await import('@/lib/questions/cardiac-emergencies');
    const { neurologicalEmergenciesQuestions } = await import('@/lib/questions/neurological-emergencies');
    const { toxicologyQuestions } = await import('@/lib/questions/toxicology');
    const { traumaManagementQuestions } = await import('@/lib/questions/trauma-management');
    const { pediatricEmergenciesQuestions } = await import('@/lib/questions/pediatric-emergencies');
    const { ecgEmergenciesQuestions } = await import('@/lib/questions/ecg-emergencies');
    const { electrolyteEmergenciesQuestions } = await import('@/lib/questions/electrolyte-emergencies');
    const { bloodGasAnalysisQuestions } = await import('@/lib/questions/blood-gas-analysis');
    const { aclsQuestions } = await import('@/lib/questions/acls');
    const { blsQuestions } = await import('@/lib/questions/bls');
    const { atlsQuestions } = await import('@/lib/questions/atls');
    const { palsQuestions } = await import('@/lib/questions/pals');
    const { ecgRhythmIdentificationQuestions } = await import('@/lib/questions/ecg-rhythm-identification');
    const { shockManagementQuestions } = await import('@/lib/questions/shock-management');
    const { respiratoryEmergenciesQuestions } = await import('@/lib/questions/respiratory-emergencies');
    const { renalEmergenciesQuestions } = await import('@/lib/questions/renal-emergencies');
    const { endocrineEmergenciesQuestions } = await import('@/lib/questions/endocrine-emergencies');
    const { infectiousDiseaseQuestions } = await import('@/lib/questions/infectious-diseases');
    const { environmentalEmergenciesQuestions } = await import('@/lib/questions/environmental-emergencies');
    const { obstetricalEmergenciesQuestions } = await import('@/lib/questions/obstetrical-emergencies');
    const { psychiatricEmergenciesQuestions } = await import('@/lib/questions/psychiatric-emergencies');
    
    console.log('📚 Creating modules...');
    
    // Create modules
    const emergencyMedicine = await prisma.module.upsert({
      where: { name: 'Emergency Medicine' },
      update: {},
      create: {
        name: 'Emergency Medicine',
        description: 'Core emergency medicine topics and protocols',
        ageGroup: 'adult',
        isActive: true
      }
    });
    
    const criticalCare = await prisma.module.upsert({
      where: { name: 'Critical Care' },
      update: {},
      create: {
        name: 'Critical Care',
        description: 'Critical care and intensive care medicine',
        ageGroup: 'adult',
        isActive: true
      }
    });
    
    const pediatricEmergency = await prisma.module.upsert({
      where: { name: 'Pediatric Emergency' },
      update: {},
      create: {
        name: 'Pediatric Emergency',
        description: 'Pediatric emergency medicine and critical care',
        ageGroup: 'pediatric',
        isActive: true
      }
    });
    
    console.log('✅ Modules created');
    console.log('📖 Creating topics and questions...');
    
    // Topic and question data
    const topicsData = [
      {
        name: 'Airway Management',
        description: 'Advanced airway management techniques',
        moduleId: emergencyMedicine.id,
        difficulty: 'advanced',
        questions: airwayManagementQuestions
      },
      {
        name: 'Mechanical Ventilation',
        description: 'Mechanical ventilation principles and management',
        moduleId: criticalCare.id,
        difficulty: 'advanced',
        questions: mechanicalVentilationQuestions
      },
      {
        name: 'Sepsis Management',
        description: 'Sepsis recognition and management',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: sepsisManagementQuestions
      },
      {
        name: 'Cardiac Emergencies',
        description: 'Cardiac emergency diagnosis and management',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: cardiacEmergenciesQuestions
      },
      {
        name: 'Neurological Emergencies',
        description: 'Neurological emergency assessment and treatment',
        moduleId: emergencyMedicine.id,
        difficulty: 'advanced',
        questions: neurologicalEmergenciesQuestions
      },
      {
        name: 'Toxicology',
        description: 'Toxicology and poisoning management',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: toxicologyQuestions
      },
      {
        name: 'Trauma Management',
        description: 'Trauma assessment and management',
        moduleId: emergencyMedicine.id,
        difficulty: 'advanced',
        questions: traumaManagementQuestions
      },
      {
        name: 'Pediatric Emergencies',
        description: 'Pediatric emergency presentations',
        moduleId: pediatricEmergency.id,
        difficulty: 'advanced',
        questions: pediatricEmergenciesQuestions
      },
      {
        name: 'ECG Emergencies',
        description: 'ECG interpretation in emergencies',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: ecgEmergenciesQuestions
      },
      {
        name: 'Electrolyte Emergencies',
        description: 'Electrolyte disorders',
        moduleId: criticalCare.id,
        difficulty: 'intermediate',
        questions: electrolyteEmergenciesQuestions
      },
      {
        name: 'Blood Gas Analysis',
        description: 'Arterial blood gas interpretation',
        moduleId: criticalCare.id,
        difficulty: 'intermediate',
        questions: bloodGasAnalysisQuestions
      },
      {
        name: 'ACLS',
        description: 'Advanced Cardiovascular Life Support',
        moduleId: emergencyMedicine.id,
        difficulty: 'advanced',
        questions: aclsQuestions
      },
      {
        name: 'BLS',
        description: 'Basic Life Support',
        moduleId: emergencyMedicine.id,
        difficulty: 'foundational',
        questions: blsQuestions
      },
      {
        name: 'ATLS',
        description: 'Advanced Trauma Life Support',
        moduleId: emergencyMedicine.id,
        difficulty: 'advanced',
        questions: atlsQuestions
      },
      {
        name: 'PALS',
        description: 'Pediatric Advanced Life Support',
        moduleId: pediatricEmergency.id,
        difficulty: 'advanced',
        questions: palsQuestions
      },
      {
        name: 'ECG Rhythm Identification',
        description: 'ECG rhythm recognition',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: ecgRhythmIdentificationQuestions
      },
      {
        name: 'Shock Management',
        description: 'Recognition and management of shock states',
        moduleId: criticalCare.id,
        difficulty: 'advanced',
        questions: shockManagementQuestions
      },
      {
        name: 'Respiratory Emergencies',
        description: 'Acute respiratory emergencies',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: respiratoryEmergenciesQuestions
      },
      {
        name: 'Renal Emergencies',
        description: 'Acute renal and urological emergencies',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: renalEmergenciesQuestions
      },
      {
        name: 'Endocrine Emergencies',
        description: 'Endocrine emergency management',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: endocrineEmergenciesQuestions
      },
      {
        name: 'Infectious Diseases',
        description: 'Infectious disease emergencies',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: infectiousDiseaseQuestions
      },
      {
        name: 'Environmental Emergencies',
        description: 'Environmental exposure emergencies',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: environmentalEmergenciesQuestions
      },
      {
        name: 'Obstetrical Emergencies',
        description: 'Obstetrical emergency management',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: obstetricalEmergenciesQuestions
      },
      {
        name: 'Psychiatric Emergencies',
        description: 'Psychiatric emergency assessment',
        moduleId: emergencyMedicine.id,
        difficulty: 'intermediate',
        questions: psychiatricEmergenciesQuestions
      }
    ];
    
    let totalQuestions = 0;
    
    // Create topics and their questions
    for (const topicData of topicsData) {
      const topic = await prisma.topic.upsert({
        where: {
          name_moduleId: {
            name: topicData.name,
            moduleId: topicData.moduleId
          }
        },
        update: {},
        create: {
          name: topicData.name,
          description: topicData.description,
          moduleId: topicData.moduleId,
          difficulty: topicData.difficulty as any,
          isActive: true
        }
      });
      
      // Create questions for this topic
      for (const question of topicData.questions) {
        try {
          await prisma.question.create({
            data: {
              topicId: topic.id,
              questionText: question.questionText,
              options: question.options,
              correctAnswer: question.correctAnswer,
              explanation: question.explanation,
              difficulty: question.difficulty as any,
              category: question.category,
              tags: question.tags || [],
              references: question.references || [],
              imageUrl: question.imageUrl,
              metadata: question.metadata || {}
            }
          });
          totalQuestions++;
          
          if (totalQuestions % 50 === 0) {
            console.log(`   📦 Created ${totalQuestions} questions...`);
          }
        } catch (error: any) {
          if (error.code === 'P2002') {
            // Duplicate, skip
            continue;
          }
          throw error;
        }
      }
    }
    
    await prisma.$disconnect();
    
    const finalModuleCount = await new PrismaClient().module.count();
    const finalTopicCount = await new PrismaClient().topic.count();
    const finalQuestionCount = await new PrismaClient().question.count();
    
    console.log('✅ Seeding complete!');
    console.log(`   - ${finalModuleCount} modules`);
    console.log(`   - ${finalTopicCount} topics`);
    console.log(`   - ${finalQuestionCount} questions`);
    
    return NextResponse.json({
      success: true,
      message: 'Production database seeded successfully',
      counts: {
        modules: finalModuleCount,
        topics: finalTopicCount,
        questions: finalQuestionCount
      }
    });
    
  } catch (error) {
    console.error('❌ Error seeding production:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error
      },
      { status: 500 }
    );
  }
}

// Also allow GET for easy browser testing
export async function GET() {
  return POST();
}
