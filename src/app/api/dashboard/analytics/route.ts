import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId') || 'anonymous';
    const userId = searchParams.get('userId') || null;

    // Get all exam sessions for the user/session
    const sessions = await prisma.examSession.findMany({
      where: {
        OR: [
          { sessionId },
          { userId: userId || undefined }
        ]
      },
      include: {
        topic: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate overall statistics
    const completedSessions = sessions.filter(session => session.completed && session.score !== null);
    const totalQuestions = completedSessions.reduce((sum, session) => {
      return sum + (session.totalQuestions || 0);
    }, 0);

    const totalCorrect = completedSessions.reduce((sum, session) => {
      return sum + (session.correctAnswers || 0);
    }, 0);

    const averageScore = completedSessions.length > 0 
      ? Math.round(completedSessions.reduce((sum, session) => sum + (session.score || 0), 0) / completedSessions.length)
      : 0;

    // Calculate performance by topic
    const topicPerformance: Record<string, {
      topicId: string;
      topicName: string;
      attempted: number;
      correct: number;
      totalQuestions: number;
      averageScore: number;
      sessionCount: number;
    }> = {};

    for (const session of completedSessions) {
      const topicKey = session.topicId;
      if (!topicPerformance[topicKey]) {
        topicPerformance[topicKey] = {
          topicId: session.topicId,
          topicName: session.topic?.name || 'Unknown Topic',
          attempted: 0,
          correct: 0,
          totalQuestions: 0,
          averageScore: 0,
          sessionCount: 0
        };
      }

      topicPerformance[topicKey].attempted += session.totalQuestions || 0;
      topicPerformance[topicKey].correct += session.correctAnswers || 0;
      topicPerformance[topicKey].totalQuestions += session.totalQuestions || 0;
      topicPerformance[topicKey].sessionCount += 1;
    }

    // Calculate average scores for each topic
    Object.keys(topicPerformance).forEach(key => {
      const perf = topicPerformance[key];
      if (perf.attempted > 0) {
        perf.averageScore = Math.round((perf.correct / perf.attempted) * 100);
      }
    });

    const performanceArray = Object.values(topicPerformance);

    // Find strongest and weakest topics
    const strongestTopic = performanceArray.reduce((max, current) => 
      current.averageScore > max.averageScore ? current : max, 
      { topicName: 'N/A', averageScore: 0 }
    );

    const weakestTopic = performanceArray.reduce((min, current) => 
      current.averageScore < min.averageScore ? current : min, 
      { topicName: 'N/A', averageScore: 100 }
    );

    // Calculate total study time (in hours)
    const totalStudyTime = completedSessions.reduce((sum, session) => {
      return sum + (session.totalTime || 0);
    }, 0);

    const studyTimeHours = Math.round((totalStudyTime / 3600) * 10) / 10; // Round to 1 decimal

    // Recent activity (last 10 sessions)
    const recentActivity = sessions.slice(0, 10).map(session => ({
      id: session.id,
      topicName: session.topic?.name || 'Unknown Topic',
      score: session.score,
      completed: session.completed,
      createdAt: session.createdAt,
      totalTime: session.totalTime
    }));

    // Learning streak (consecutive days with activity)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);
    
    for (let i = 0; i < 30; i++) { // Check last 30 days
      const dayStart = new Date(currentDate);
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);
      
      const hasActivity = sessions.some(session => {
        const sessionDate = new Date(session.createdAt);
        return sessionDate >= dayStart && sessionDate <= dayEnd && session.completed;
      });
      
      if (hasActivity) {
        streak++;
      } else if (i > 0) { // Don't break on first day (today might not have activity yet)
        break;
      }
      
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return NextResponse.json({
      success: true,
      data: {
        overallStats: {
          totalQuestions,
          totalCorrect,
          averageScore,
          studyTimeHours,
          sessionCount: completedSessions.length,
          learningStreak: streak,
          strongestTopic: {
            name: strongestTopic.topicName,
            score: strongestTopic.averageScore
          },
          weakestTopic: {
            name: weakestTopic.topicName,
            score: weakestTopic.averageScore
          }
        },
        topicPerformance: performanceArray,
        recentActivity,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Dashboard analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

// POST endpoint to record exam session data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      userId = null,
      topicId,
      questions,
      answers,
      score,
      totalQuestions,
      correctAnswers,
      totalTime,
      completed = true
    } = body;

    // Validate required fields
    if (!sessionId || !topicId || !questions) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate derived values if not provided
    const calculatedTotalQuestions = totalQuestions || (Array.isArray(questions) ? questions.length : JSON.parse(questions || '[]').length);
    const calculatedCorrectAnswers = correctAnswers || (score ? Math.round((score / 100) * calculatedTotalQuestions) : 0);

    // Check if session already exists by finding with sessionId
    const existingSession = await prisma.examSession.findFirst({
      where: { sessionId }
    });

    let session;
    if (existingSession) {
      // Update existing session
      session = await prisma.examSession.update({
        where: { id: existingSession.id },
        data: {
          answers: typeof answers === 'string' ? answers : JSON.stringify(answers),
          score,
          totalQuestions: calculatedTotalQuestions,
          correctAnswers: calculatedCorrectAnswers,
          totalTime,
          completed,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new session
      session = await prisma.examSession.create({
        data: {
          sessionId,
          userId,
          topicId,
          questions: typeof questions === 'string' ? questions : JSON.stringify(questions),
          answers: typeof answers === 'string' ? answers : JSON.stringify(answers),
          score,
          totalQuestions: calculatedTotalQuestions,
          correctAnswers: calculatedCorrectAnswers,
          totalTime,
          completed
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: session
    });

  } catch (error) {
    console.error('Session recording error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record session data' },
      { status: 500 }
    );
  }
}
