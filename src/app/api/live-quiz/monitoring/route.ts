// Analytics: session metrics, engagement, learning outcomes, performance
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getMonitoringOverview(timeRange: number) {
  try {
    if (!timeRange || isNaN(timeRange) || timeRange <= 0) {
      return Response.json({ error: 'Invalid timeRange parameter' }, { status: 400 });
    }
    const since = new Date(Date.now() - timeRange);
    const sessions = await prisma.examSession.findMany({
      where: { createdAt: { gte: since } },
      // include: {
      //   topic: true,
      //   user: true,
      // },
    });
    if (!sessions || sessions.length === 0) {
      return Response.json({ sessions: [], message: 'No sessions found in time range.' });
    }
    // Aggregate metrics
    const sessionMetrics = sessions.map((session: any) => {
      // Parse questions and answers from JSON fields
      const questions = session.questionsData ? JSON.parse(session.questionsData) : [];
      const answers = session.answersData ? JSON.parse(session.answersData) : [];
      const session_id = session.id;
      const start_time = session.createdAt;
      const end_time = session.completedAt;
      const total_questions = session.totalQuestions;
      const total_answers = answers.length;
      const average_score = session.score ?? 0;
      // Engagement
      const response_rate = total_questions > 0 ? total_answers / total_questions : 0;
      const avg_response_time = answers.length > 0 ? answers.reduce((sum: number, a: any) => sum + (a.timeToAnswer || 0), 0) / answers.length : 0;
      const skipped_questions = total_questions - total_answers;
      // Learning outcomes
      // Accuracy by topic
      const topicStats: Record<string, { correct: number; total: number }> = {};
      const difficultyStats: Record<string, { correct: number; total: number }> = {};
      questions.forEach((q: any) => {
        topicStats[q.topic || 'unknown'] = { correct: 0, total: 0 };
        difficultyStats[q.difficulty || 'unknown'] = { correct: 0, total: 0 };
      });
      answers.forEach((a: any) => {
        const question = questions.find((q: any) => q.id === a.questionId);
        if (question) {
          const topic = question.topic || 'unknown';
          const difficulty = question.difficulty || 'unknown';
          topicStats[topic].total++;
          difficultyStats[difficulty].total++;
          if (a.isCorrect) {
            topicStats[topic].correct++;
            difficultyStats[difficulty].correct++;
          }
        }
      });
      const accuracy_by_topic = Object.fromEntries(
        Object.entries(topicStats).map(([topic, stat]) => [topic, stat.total > 0 ? stat.correct / stat.total : null])
      );
      const difficulty_trends = Object.fromEntries(
        Object.entries(difficultyStats).map(([difficulty, stat]) => [difficulty, stat.total > 0 ? stat.correct / stat.total : null])
      );
      // Performance dynamics
      const time_per_question = questions.map((q: any) => {
        const times = answers.filter((a: any) => a.questionId === q.id).map((a: any) => a.timeToAnswer || 0);
        return { questionId: q.id, avgTime: times.length > 0 ? times.reduce((sum: number, t: number) => sum + t, 0) / times.length : 0 };
      });
      // Streaks: longest correct/incorrect streak per session
      let maxCorrect = 0, maxIncorrect = 0, currentCorrect = 0, currentIncorrect = 0;
      answers.forEach((a: any) => {
        if (a.isCorrect) {
          currentCorrect++;
          maxCorrect = Math.max(maxCorrect, currentCorrect);
          currentIncorrect = 0;
        } else {
          currentIncorrect++;
          maxIncorrect = Math.max(maxIncorrect, currentIncorrect);
          currentCorrect = 0;
        }
      });
      const streaks = { maxCorrectStreak: maxCorrect, maxIncorrectStreak: maxIncorrect };
      // Ranking: single user per session
      // Note: user relation removed from schema, using userId field
      const ranking = [{ id: session.userId ?? null, name: null, score: session.score ?? 0 }];
      // Learning gain: compare pre/post quiz scores if available
      let learning_gain = null;
      if (session.metadata) {
        try {
          const meta = JSON.parse(session.metadata);
          if (meta.preQuizScore !== undefined && meta.postQuizScore !== undefined) {
            learning_gain = meta.postQuizScore - meta.preQuizScore;
          }
        } catch {}
      }
      // Engagement rate: always 1 for single-user session
      const engagement_rate = 1;
      // Accuracy trend (mock: mean score)
      const accuracy_trend = average_score;
      // Response latency (avg time to first answer)
      const first_answer = answers.length > 0 ? answers.sort((a: any, b: any) => (a.submittedAt ? new Date(a.submittedAt).getTime() : 0) - (b.submittedAt ? new Date(b.submittedAt).getTime() : 0))[0] : null;
      const response_latency = first_answer ? first_answer.timeToAnswer || 0 : 0;
      // Retention: completed sessions only
      const retention = session.completed ? 1 : 0;
      return {
        session_id,
        start_time,
        end_time,
        average_score,
        engagement: { response_rate, avg_response_time, skipped_questions, engagement_rate },
        learning_outcomes: { accuracy_by_topic, difficulty_trends, accuracy_trend, learning_gain },
        performance: { time_per_question, streaks, ranking, response_latency },
        retention,
      };
    });
    return Response.json({ sessions: sessionMetrics });
  } catch (error) {
    logger.error('Error in monitoring analytics API', error as Error);
    return Response.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
  }
}

// Stub for error analysis
async function getErrorAnalysis(timeRange: number) {
  return Response.json({
    timeRange,
    status: 'ok',
    message: 'Error analysis stub',
  });
}
// Live quiz monitoring and health dashboard API
import { NextRequest } from 'next/server';
import { LiveQuizErrorHandler } from '@/lib/live-quiz/error-handler';
import { LiveQuizSessionState } from '@/lib/live-quiz/session-state';
import { logger } from '@/lib/logger';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For now, allow all authenticated users. In production, you might want to restrict this to admins
    // if (session.user.role !== 'admin') {
    //   return Response.json({ error: 'Insufficient permissions' }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);
    const timeRange = parseInt(searchParams.get('timeRange') || '3600000'); // Default 1 hour
    const action = searchParams.get('action') || 'overview';

    switch (action) {
      case 'overview':
        return await getMonitoringOverview(timeRange);
      case 'errors':
        return await getErrorAnalysis(timeRange);
      default:
        return Response.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    logger.error('Error in monitoring API', error as Error);
    return Response.json({ error: 'Failed to get monitoring data' }, { status: 500 });
  }
}


