/**
 * Script to identify incomplete exam sessions
 * Helps monitor user engagement and identify abandoned exams
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IncompleteExam {
  id: string;
  sessionId: string;
  userId?: string;
  topicName: string;
  totalQuestions: number;
  questionsAnswered: number;
  createdAt: Date;
  timeElapsed?: string;
}

async function findIncompleteExams() {
  try {
    console.log('🔍 Searching for incomplete exam sessions...\n');

    // Find all incomplete exam sessions
    const incompleteExams = await prisma.examSession.findMany({
      where: {
        completed: false
      },
      include: {
        topic: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (incompleteExams.length === 0) {
      console.log('✅ No incomplete exam sessions found!');
      return [];
    }

    console.log(`📊 Found ${incompleteExams.length} incomplete exam session(s):\n`);

    const incompleteResults: IncompleteExam[] = incompleteExams.map((exam, index) => {
      // Parse answers to count how many questions were answered
      let questionsAnswered = 0;
      try {
        const answers = JSON.parse(exam.answers || '[]');
        questionsAnswered = answers.filter((answer: any) => answer !== null && answer !== undefined).length;
      } catch (error) {
        console.warn(`⚠️  Could not parse answers for exam ${exam.id}`);
      }

      // Calculate time elapsed since creation
      const timeElapsed = getTimeElapsed(exam.createdAt);
      
      const result: IncompleteExam = {
        id: exam.id,
        sessionId: exam.sessionId,
        userId: exam.userId || undefined,
        topicName: exam.topic.name,
        totalQuestions: exam.totalQuestions,
        questionsAnswered,
        createdAt: exam.createdAt,
        timeElapsed
      };

      console.log(`${index + 1}. 📝 Exam ID: ${exam.id}`);
      console.log(`   👤 Session: ${exam.sessionId}`);
      if (exam.user?.name) {
        console.log(`   🧑‍💼 User: ${exam.user.name} (${exam.user.email})`);
      } else {
        console.log(`   👤 Anonymous user`);
      }
      console.log(`   📚 Topic: ${exam.topic.name}`);
      console.log(`   📊 Progress: ${questionsAnswered}/${exam.totalQuestions} questions answered`);
      console.log(`   ⏱️  Started: ${exam.createdAt.toLocaleString()}`);
      console.log(`   ⌛ Time elapsed: ${timeElapsed}`);
      console.log(`   📈 Completion rate: ${((questionsAnswered / exam.totalQuestions) * 100).toFixed(1)}%\n`);

      return result;
    });

    // Generate summary statistics
    console.log('📈 Summary Statistics:');
    console.log(`   Total incomplete exams: ${incompleteExams.length}`);
    
    const topicCounts = incompleteExams.reduce((acc, exam) => {
      acc[exam.topic.name] = (acc[exam.topic.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('   Most abandoned topics:');
    Object.entries(topicCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([topic, count]) => {
        console.log(`     - ${topic}: ${count} incomplete exam(s)`);
      });

    // Check for very old incomplete exams (older than 1 hour)
    const oldIncompleteExams = incompleteExams.filter(exam => {
      const hoursSinceCreation = (Date.now() - exam.createdAt.getTime()) / (1000 * 60 * 60);
      return hoursSinceCreation > 1;
    });

    if (oldIncompleteExams.length > 0) {
      console.log(`\n⚠️  ${oldIncompleteExams.length} exam(s) have been incomplete for more than 1 hour:`);
      oldIncompleteExams.forEach(exam => {
        const hoursSinceCreation = (Date.now() - exam.createdAt.getTime()) / (1000 * 60 * 60);
        console.log(`   - ${exam.id}: ${exam.topic.name} (${hoursSinceCreation.toFixed(1)} hours ago)`);
      });
      console.log('\n💡 Consider these for automatic cleanup or user re-engagement.');
    }

    return incompleteResults;

  } catch (error) {
    console.error('❌ Error checking incomplete exams:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function getTimeElapsed(createdAt: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();
  
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} day(s) ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour(s) ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute(s) ago`;
  } else {
    return 'Just now';
  }
}

// Run the script
if (require.main === module) {
  findIncompleteExams()
    .then((results) => {
      console.log(`\n✅ Analysis complete! Found ${results.length} incomplete exam session(s).`);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

export { findIncompleteExams };
export type { IncompleteExam };