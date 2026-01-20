import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

/**
 * GET /api/analytics/sync?sessionId=xxx
 * Syncs local session data with server data
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    // Check database availability
    const isDatabaseAvailable = await checkDatabaseConnection();

    if (!isDatabaseAvailable) {
      return NextResponse.json({
        success: true,
        sessions: [],
        message: 'Database unavailable, using local data only',
        storageMode: 'local'
      });
    }

    // Get sessions for this sessionId
    const sessions = await prisma.examSession.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' }
    });

    const processedSessions = sessions.map((session: any) => ({
      id: session.id,
      sessionId: session.sessionId,
      topicId: session.topicId,
      topicName: session.topicName,
      questions: session.questionsData ? JSON.parse(session.questionsData as string) : [],
      answers: session.answersData ? JSON.parse(session.answersData as string) : {},
      score: session.score,
      totalQuestions: session.totalQuestions,
      correctAnswers: session.correctAnswers,
      timeSpent: session.timeSpent || session.totalTime,
      completedAt: session.completedAt || session.createdAt,
      metadata: session.metadata ? JSON.parse(session.metadata as string) : {}
    }));

    return NextResponse.json({
      success: true,
      sessions: processedSessions,
      count: processedSessions.length,
      storageMode: 'database'
    });

  } catch (error) {
    logger.error('[Analytics Sync API] Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      sessions: [],
      storageMode: 'local'
    }, { status: 500 });
  }
}

async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.debug('[Analytics Sync API] Database unavailable:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  } finally {
    await prisma.$disconnect();
  }
}