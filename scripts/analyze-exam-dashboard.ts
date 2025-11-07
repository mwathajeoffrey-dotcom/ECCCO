/**
 * Comprehensive Exam Dashboard Analytics
 * Provides detailed insights into exam completion patterns and user engagement
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ExamAnalytics {
  totalExams: number;
  completedExams: number;
  incompleteExams: number;
  completionRate: number;
  averageScore: number;
  averageTime: number;
  topicAnalytics: TopicAnalytic[];
  recentActivity: RecentActivity[];
}

interface TopicAnalytic {
  topicName: string;
  totalExams: number;
  completed: number;
  incomplete: number;
  completionRate: number;
  averageScore: number;
}

interface RecentActivity {
  id: string;
  topicName: string;
  completed: boolean;
  score: number | null;
  timeElapsed: string;
  questionsAnswered: number;
  totalQuestions: number;
}

async function analyzeExamDashboard() {
  try {
    console.log('📊 Analyzing exam dashboard data...\n');

    // Get all exam sessions with topic information
    const allExams = await prisma.examSession.findMany({
      include: {
        topic: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (allExams.length === 0) {
      console.log('📭 No exam sessions found in the database.');
      return null;
    }

    // Calculate overall statistics
    const totalExams = allExams.length;
    const completedExams = allExams.filter(exam => exam.completed).length;
    const incompleteExams = totalExams - completedExams;
    const completionRate = (completedExams / totalExams) * 100;

    const completedExamSessions = allExams.filter(exam => exam.completed && exam.score !== null);
    const averageScore = completedExamSessions.length > 0
      ? completedExamSessions.reduce((sum, exam) => sum + (exam.score || 0), 0) / completedExamSessions.length
      : 0;

    const completedWithTime = allExams.filter(exam => exam.completed && exam.totalTime);
    const averageTime = completedWithTime.length > 0
      ? completedWithTime.reduce((sum, exam) => sum + (exam.totalTime || 0), 0) / completedWithTime.length
      : 0;

    console.log('🎯 Overall Statistics:');
    console.log(`   Total exam sessions: ${totalExams}`);
    console.log(`   Completed exams: ${completedExams}`);
    console.log(`   Incomplete exams: ${incompleteExams}`);
    console.log(`   Completion rate: ${completionRate.toFixed(1)}%`);
    console.log(`   Average score: ${averageScore.toFixed(1)}%`);
    console.log(`   Average time: ${Math.round(averageTime / 60)} minutes\n`);

    // Analyze by topic
    const topicGroups = allExams.reduce((groups, exam) => {
      const topicName = exam.topic.name;
      if (!groups[topicName]) {
        groups[topicName] = [];
      }
      groups[topicName].push(exam);
      return groups;
    }, {} as Record<string, typeof allExams>);

    console.log('📚 Topic-wise Analysis:');
    const topicAnalytics: TopicAnalytic[] = Object.entries(topicGroups).map(([topicName, exams]) => {
      const totalExams = exams.length;
      const completed = exams.filter(exam => exam.completed).length;
      const incomplete = totalExams - completed;
      const completionRate = (completed / totalExams) * 100;
      
      const completedWithScores = exams.filter(exam => exam.completed && exam.score !== null);
      const averageScore = completedWithScores.length > 0
        ? completedWithScores.reduce((sum, exam) => sum + (exam.score || 0), 0) / completedWithScores.length
        : 0;

      console.log(`   📖 ${topicName}:`);
      console.log(`      Total: ${totalExams} | Completed: ${completed} | Incomplete: ${incomplete}`);
      console.log(`      Completion rate: ${completionRate.toFixed(1)}% | Avg score: ${averageScore.toFixed(1)}%`);

      return {
        topicName,
        totalExams,
        completed,
        incomplete,
        completionRate,
        averageScore
      };
    });

    // Show recent activity (last 10 sessions)
    console.log('\n📅 Recent Activity (Last 10 sessions):');
    const recentActivity: RecentActivity[] = allExams.slice(0, 10).map((exam, index) => {
      // Count answered questions
      let questionsAnswered = 0;
      try {
        const answers = JSON.parse(exam.answers || '[]');
        questionsAnswered = answers.filter((answer: any) => answer !== null && answer !== undefined).length;
      } catch (error) {
        // Ignore parsing errors
      }

      const timeElapsed = getTimeElapsed(exam.createdAt);
      
      console.log(`   ${index + 1}. ${exam.completed ? '✅' : '⏳'} ${exam.topic.name}`);
      console.log(`      Progress: ${questionsAnswered}/${exam.totalQuestions} questions`);
      console.log(`      ${exam.completed ? `Score: ${exam.score}%` : 'Incomplete'} | ${timeElapsed}`);

      return {
        id: exam.id,
        topicName: exam.topic.name,
        completed: exam.completed,
        score: exam.score,
        timeElapsed,
        questionsAnswered,
        totalQuestions: exam.totalQuestions
      };
    });

    // Identify problematic patterns
    console.log('\n🔍 Insights:');
    
    // Topics with low completion rates
    const lowCompletionTopics = topicAnalytics.filter(topic => topic.completionRate < 50 && topic.totalExams > 2);
    if (lowCompletionTopics.length > 0) {
      console.log('   ⚠️  Topics with low completion rates (< 50%):');
      lowCompletionTopics.forEach(topic => {
        console.log(`      - ${topic.topicName}: ${topic.completionRate.toFixed(1)}% completion`);
      });
    }

    // Topics with low average scores
    const lowScoreTopics = topicAnalytics.filter(topic => topic.averageScore < 60 && topic.completed > 0);
    if (lowScoreTopics.length > 0) {
      console.log('   📉 Topics with low average scores (< 60%):');
      lowScoreTopics.forEach(topic => {
        console.log(`      - ${topic.topicName}: ${topic.averageScore.toFixed(1)}% average score`);
      });
    }

    // Best performing topics
    const bestTopics = topicAnalytics.filter(topic => topic.completionRate > 80 && topic.averageScore > 75);
    if (bestTopics.length > 0) {
      console.log('   🏆 High-performing topics (>80% completion, >75% score):');
      bestTopics.forEach(topic => {
        console.log(`      - ${topic.topicName}: ${topic.completionRate.toFixed(1)}% completion, ${topic.averageScore.toFixed(1)}% score`);
      });
    }

    const analytics: ExamAnalytics = {
      totalExams,
      completedExams,
      incompleteExams,
      completionRate,
      averageScore,
      averageTime,
      topicAnalytics,
      recentActivity
    };

    return analytics;

  } catch (error) {
    console.error('❌ Error analyzing exam dashboard:', error);
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
  analyzeExamDashboard()
    .then((results) => {
      if (results) {
        console.log(`\n✅ Dashboard analysis complete!`);
        console.log(`📊 Overall completion rate: ${results.completionRate.toFixed(1)}%`);
        console.log(`📈 Average performance: ${results.averageScore.toFixed(1)}%`);
      }
    })
    .catch((error) => {
      console.error('❌ Analysis failed:', error);
      process.exit(1);
    });
}

export { analyzeExamDashboard };
export type { ExamAnalytics, TopicAnalytic, RecentActivity };