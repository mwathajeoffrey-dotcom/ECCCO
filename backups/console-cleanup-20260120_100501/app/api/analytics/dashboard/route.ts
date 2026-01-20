import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

/**
 * GET /api/analytics/dashboard
 * Returns dashboard analytics data
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    // Check database availability
    const isDatabaseAvailable = await checkDatabaseConnection();

    if (!isDatabaseAvailable) {
      // Return empty analytics when database is unavailable
      return NextResponse.json({
        success: true,
        data: {
          totalSessions: 0,
          totalQuestions: 0,
          totalCorrect: 0,
          averageScore: 0,
          totalTimeSpent: 0,
          strongestTopic: { name: 'Complete an exam to see your strongest topic', score: 0 },
          weakestTopic: { name: 'Complete an exam to see improvement areas', score: 0 },
          recentSessions: [],
          topicPerformance: [],
          lastUpdated: new Date()
        },
        storageMode: 'local',
        message: 'Using local analytics data'
      });
    }

    // Query database for session data
    const sessions = sessionId 
      ? await prisma.examSession.findMany({
          where: { sessionId },
          orderBy: { createdAt: 'desc' }
        })
      : await prisma.examSession.findMany({
          orderBy: { createdAt: 'desc' },
          take: 100 // Limit to recent sessions
        });

    // Process sessions into analytics summary
    const analytics = processSessionsToAnalytics(sessions);

    return NextResponse.json({
      success: true,
      data: analytics,
      storageMode: 'database',
      sessionCount: sessions.length
    });

  } catch (error) {
    console.error('[Analytics Dashboard API] Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: getEmptyAnalytics()
    }, { status: 500 });
  }
}

function processSessionsToAnalytics(sessions: any[]) {
  if (sessions.length === 0) {
    return getEmptyAnalytics();
  }

  const totalSessions = sessions.length;
  const totalQuestions = sessions.reduce((sum: number, s: any) => sum + s.totalQuestions, 0);
  const totalCorrect = sessions.reduce((sum: number, s: any) => sum + s.correctAnswers, 0);
  const averageScore = Math.round(sessions.reduce((sum: number, s: any) => sum + (s.score || 0), 0) / totalSessions);
  const totalTimeSpent = sessions.reduce((sum: number, s: any) => sum + (s.timeSpent || s.totalTime || 0), 0);

  // Calculate topic performance
  const topicStats = new Map<string, { name: string; sessions: number; totalQuestions: number; correctAnswers: number; scores: number[] }>();

  sessions.forEach((session: any) => {
    const key = session.topicId;
    if (!topicStats.has(key)) {
      topicStats.set(key, {
        name: session.topicName,
        sessions: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        scores: []
      });
    }
    const stats = topicStats.get(key)!;
    stats.sessions++;
    stats.totalQuestions += session.totalQuestions;
    stats.correctAnswers += session.correctAnswers;
    stats.scores.push(session.score || 0);
  });

  const topicPerformance = Array.from(topicStats.entries()).map(([topicId, stats]) => ({
    topicId,
    topicName: stats.name,
    sessions: stats.sessions,
    averageScore: Math.round(stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length),
    totalQuestions: stats.totalQuestions,
    correctAnswers: stats.correctAnswers
  }));

  // Find strongest and weakest topics
  const sortedTopics = topicPerformance.sort((a, b) => b.averageScore - a.averageScore);
  const strongestTopic = sortedTopics[0] || { topicName: 'N/A', averageScore: 0 };
  const weakestTopic = sortedTopics[sortedTopics.length - 1] || { topicName: 'N/A', averageScore: 0 };

  return {
    totalSessions,
    totalQuestions,
    totalCorrect,
    averageScore,
    totalTimeSpent,
    strongestTopic: { name: strongestTopic.topicName, score: strongestTopic.averageScore },
    weakestTopic: { name: weakestTopic.topicName, score: weakestTopic.averageScore },
    recentSessions: sessions.slice(0, 10).map((s: any) => ({
      id: s.id,
      sessionId: s.sessionId,
      topicId: s.topicId,
      topicName: s.topicName,
      score: s.score || 0,
      totalQuestions: s.totalQuestions,
      correctAnswers: s.correctAnswers,
      timeSpent: s.timeSpent || s.totalTime || 0,
      completedAt: s.completedAt || s.createdAt
    })),
    topicPerformance,
    lastUpdated: new Date()
  };
}

function getEmptyAnalytics() {
  return {
    totalSessions: 0,
    totalQuestions: 0,
    totalCorrect: 0,
    averageScore: 0,
    totalTimeSpent: 0,
    strongestTopic: { name: 'Complete an exam to see your strongest topic', score: 0 },
    weakestTopic: { name: 'Complete an exam to see improvement areas', score: 0 },
    recentSessions: [],
    topicPerformance: [],
    lastUpdated: new Date()
  };
}

async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.log('[Analytics Dashboard API] Database unavailable:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  } finally {
    await prisma.$disconnect();
  }
}