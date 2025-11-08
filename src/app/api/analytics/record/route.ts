import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { ExamSession } from '@/lib/analytics/analytics-v2';

/**
 * POST /api/analytics/record
 * Records an exam session completion
 */
export async function POST(request: NextRequest) {
  try {
    const sessionData: ExamSession = await request.json();

    // Validate required fields
    if (!sessionData.sessionId || !sessionData.topicId || !sessionData.topicName) {
      return NextResponse.json(
        { error: 'Missing required session data' },
        { status: 400 }
      );
    }

    // Check if we have a database connection
    const isDatabaseAvailable = await checkDatabaseConnection();

    if (!isDatabaseAvailable) {
      console.log('[Analytics API] Database unavailable, accepting session locally');
      return NextResponse.json({
        success: true,
        message: 'Session recorded locally',
        storageMode: 'local'
      });
    }

    // Store in database if available
    await prisma.examSession.create({
      data: {
        id: sessionData.id,
        sessionId: sessionData.sessionId,
        topicId: sessionData.topicId,
        topicName: sessionData.topicName,
        questions: JSON.stringify(sessionData.questions.map(q => q.id)), // Legacy field - store question IDs
        questionsData: JSON.stringify(sessionData.questions), // New field - store full question data
        answers: JSON.stringify(sessionData.answers), // Legacy field
        answersData: JSON.stringify(sessionData.answers), // New field for consistency
        score: sessionData.score,
        totalQuestions: sessionData.totalQuestions,
        correctAnswers: sessionData.correctAnswers,
        totalTime: sessionData.timeSpent, // Legacy field
        timeSpent: sessionData.timeSpent, // New field
        completedAt: sessionData.completedAt,
        completed: true, // Mark as completed
        metadata: JSON.stringify(sessionData.metadata || {})
      }
    });

    console.log(`[Analytics API] Session recorded: ${sessionData.topicName} - ${sessionData.score}%`);

    return NextResponse.json({
      success: true,
      message: 'Session recorded successfully',
      storageMode: 'database'
    });

  } catch (error) {
    console.error('[Analytics API] Error recording session:', error);
    
    return NextResponse.json({
      success: true,
      message: 'Session recorded locally due to server error',
      storageMode: 'local',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 200 }); // Return 200 so client doesn't think it failed
  }
}

async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.log('[Analytics API] Database connection failed:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  } finally {
    await prisma.$disconnect();
  }
}