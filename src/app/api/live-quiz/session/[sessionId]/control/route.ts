// Enhanced live quiz session management API with state persistence
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';
import { LiveQuizSessionState } from '@/lib/live-quiz/session-state';
import { liveQuizWSManager } from '@/lib/live-quiz/websocket-manager';
import { logger } from '@/lib/logger';
import { auth } from '@/lib/auth/auth-config';
import { rateLimit } from '@/lib/middleware/rate-limit';

// Rate limiting for live quiz operations
const liveQuizLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many live quiz requests from this IP, please try again later.',
});

// Start a new question in the session
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    // Apply rate limiting
    const rateLimitResult = await liveQuizLimiter(request);
    if (rateLimitResult) return rateLimitResult;

    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId } = await params;
    const { action, questionId, timeLimit } = await request.json();

    // Get current session state
    const sessionState = await LiveQuizSessionState.getSessionState(sessionId);
    if (!sessionState) {
      return Response.json({ error: 'Session not found' }, { status: 404 });
    }

    // Verify user can control this session
    const dbSession = await prisma.liveQuizSession.findUnique({
      where: { id: sessionId },
      include: { quiz: true },
    });

    if (dbSession?.quiz.userId !== session.user.id) {
      return Response.json({ error: 'Unauthorized to control this session' }, { status: 403 });
    }

    switch (action) {
      case 'start_question':
        return await startQuestion(sessionState, questionId, timeLimit);
      
      case 'end_question':
        return await endQuestion(sessionState);
      
      case 'pause_session':
        return await pauseSession(sessionState);
      
      case 'resume_session':
        return await resumeSession(sessionState);
      
      case 'end_session':
        return await endSession(sessionState);

      default:
        return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Error in live quiz session control', error as Error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Get session state and status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    
    // Get session state
    const sessionState = await LiveQuizSessionState.getSessionState(sessionId);
    if (!sessionState) {
      return Response.json({ error: 'Session not found' }, { status: 404 });
    }

    // Get current question details if active
    let currentQuestion = null;
    if (sessionState.currentQuestionId) {
      currentQuestion = await prisma.question.findUnique({
        where: { id: sessionState.currentQuestionId },
        select: {
          id: true,
          question: true,
          options: true,
          type: true,
          order: true,
        },
      });
    }

    // Calculate time remaining for current question
    let timeRemaining = null;
    if (sessionState.questionStartTime && sessionState.questionTimeLimit) {
      const elapsed = Date.now() - sessionState.questionStartTime;
      timeRemaining = Math.max(0, sessionState.questionTimeLimit - elapsed);
    }

    // Get leaderboard
    const leaderboard = sessionState.participants
      .map(p => ({
        id: p.id,
        nickname: p.nickname,
        score: p.score,
        isOnline: p.isOnline,
        answersSubmitted: p.answers.length,
      }))
      .sort((a, b) => b.score - a.score);

    // Session statistics
    const stats = {
      totalParticipants: sessionState.participants.length,
      activeParticipants: sessionState.participants.filter(p => p.isOnline).length,
      questionsCompleted: sessionState.currentQuestionIndex,
      totalQuestions: sessionState.metadata.totalQuestions,
      averageScore: sessionState.participants.length > 0 
        ? sessionState.participants.reduce((sum, p) => sum + p.score, 0) / sessionState.participants.length 
        : 0,
    };

    return Response.json({
      session: {
        id: sessionState.sessionId,
        status: sessionState.status,
        currentQuestionIndex: sessionState.currentQuestionIndex,
        currentQuestion,
        timeRemaining,
        settings: sessionState.settings,
        metadata: sessionState.metadata,
      },
      participants: sessionState.participants,
      leaderboard,
      stats,
    });

  } catch (error) {
    logger.error('Error getting live quiz session state', error as Error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Start a question
async function startQuestion(sessionState: any, questionId: string, timeLimit?: number) {
  try {
    // Validate question exists and belongs to quiz
    const question = await prisma.question.findFirst({
      where: { 
        id: questionId,
        quizId: await getSessionQuizId(sessionState.sessionId),
      },
    });

    if (!question) {
      return Response.json({ error: 'Question not found' }, { status: 404 });
    }

    // Update session state
    sessionState.status = 'ACTIVE';
    sessionState.currentQuestionId = questionId;
    sessionState.questionStartTime = Date.now();
    sessionState.questionTimeLimit = timeLimit || sessionState.settings.questionTimeLimit;
    
    // Save to database and cache
    const updated = await LiveQuizSessionState.updateSessionState(sessionState);
    if (!updated) {
      return Response.json({ error: 'Failed to update session' }, { status: 500 });
    }

    // Broadcast to all participants
    liveQuizWSManager.broadcastToSession(sessionState.sessionId, {
      type: 'question_started',
      sessionId: sessionState.sessionId,
      data: {
        question: {
          id: question.id,
          question: question.question,
          options: question.options,
          type: question.type,
          timeLimit: sessionState.questionTimeLimit,
        },
        timeRemaining: sessionState.questionTimeLimit,
        participants: sessionState.participants,
      },
      timestamp: Date.now(),
    });

    // Auto-end question after time limit
    if (sessionState.questionTimeLimit) {
      setTimeout(async () => {
        try {
          const currentState = await LiveQuizSessionState.getSessionState(sessionState.sessionId);
          if (currentState?.currentQuestionId === questionId) {
            await endQuestion(currentState);
          }
        } catch (error) {
          logger.error('Error auto-ending question', error as Error);
        }
      }, sessionState.questionTimeLimit);
    }

    logger.info('Question started', {
      sessionId: sessionState.sessionId,
      questionId,
      timeLimit: sessionState.questionTimeLimit,
    });

    return Response.json({ 
      success: true,
      question: {
        id: question.id,
        timeLimit: sessionState.questionTimeLimit,
      },
    });

  } catch (error) {
    logger.error('Error starting question', error as Error);
    return Response.json({ error: 'Failed to start question' }, { status: 500 });
  }
}

// End current question
async function endQuestion(sessionState: any) {
  try {
    const questionId = sessionState.currentQuestionId;
    
    // Update session state
    sessionState.currentQuestionId = undefined;
    sessionState.questionStartTime = undefined;
    sessionState.questionTimeLimit = undefined;
    sessionState.currentQuestionIndex += 1;

    // Check if this was the last question
    if (sessionState.currentQuestionIndex >= sessionState.metadata.totalQuestions) {
      sessionState.status = 'COMPLETED';
    }

    // Save state
    const updated = await LiveQuizSessionState.updateSessionState(sessionState);
    if (!updated) {
      return Response.json({ error: 'Failed to update session' }, { status: 500 });
    }

    // Get question results for broadcasting
    const questionResults = await getQuestionResults(sessionState.sessionId, questionId);

    // Broadcast to all participants
    liveQuizWSManager.broadcastToSession(sessionState.sessionId, {
      type: 'question_ended',
      sessionId: sessionState.sessionId,
      data: {
        questionId,
        results: questionResults,
        participants: sessionState.participants,
        sessionCompleted: sessionState.status === 'COMPLETED',
      },
      timestamp: Date.now(),
    });

    logger.info('Question ended', {
      sessionId: sessionState.sessionId,
      questionId,
      sessionCompleted: sessionState.status === 'COMPLETED',
    });

    return Response.json({ 
      success: true,
      results: questionResults,
      sessionCompleted: sessionState.status === 'COMPLETED',
    });

  } catch (error) {
    logger.error('Error ending question', error as Error);
    return Response.json({ error: 'Failed to end question' }, { status: 500 });
  }
}

// Pause session
async function pauseSession(sessionState: any) {
  sessionState.status = 'PAUSED';
  
  const updated = await LiveQuizSessionState.updateSessionState(sessionState);
  if (!updated) {
    return Response.json({ error: 'Failed to pause session' }, { status: 500 });
  }

  liveQuizWSManager.broadcastToSession(sessionState.sessionId, {
    type: 'session_update',
    sessionId: sessionState.sessionId,
    data: { status: 'PAUSED' },
    timestamp: Date.now(),
  });

  return Response.json({ success: true });
}

// Resume session
async function resumeSession(sessionState: any) {
  sessionState.status = sessionState.currentQuestionId ? 'ACTIVE' : 'WAITING';
  
  const updated = await LiveQuizSessionState.updateSessionState(sessionState);
  if (!updated) {
    return Response.json({ error: 'Failed to resume session' }, { status: 500 });
  }

  liveQuizWSManager.broadcastToSession(sessionState.sessionId, {
    type: 'session_update',
    sessionId: sessionState.sessionId,
    data: { status: sessionState.status },
    timestamp: Date.now(),
  });

  return Response.json({ success: true });
}

// End session completely
async function endSession(sessionState: any) {
  sessionState.status = 'COMPLETED';
  
  const updated = await LiveQuizSessionState.updateSessionState(sessionState);
  if (!updated) {
    return Response.json({ error: 'Failed to end session' }, { status: 500 });
  }

  // Get final results
  const finalResults = await getFinalResults(sessionState.sessionId);

  liveQuizWSManager.broadcastToSession(sessionState.sessionId, {
    type: 'session_completed',
    sessionId: sessionState.sessionId,
    data: finalResults,
    timestamp: Date.now(),
  });

  return Response.json({ 
    success: true,
    finalResults,
  });
}

// Helper functions
async function getSessionQuizId(sessionId: string): Promise<string> {
  const session = await prisma.liveQuizSession.findUnique({
    where: { id: sessionId },
    select: { quizId: true },
  });
  return session?.quizId || '';
}

async function getQuestionResults(sessionId: string, questionId: string) {
  const answers = await prisma.liveQuizAnswer.findMany({
    where: { 
      questionId,
      participant: {
        sessionId,
      },
    },
    include: {
      participant: true,
    },
  });

  const correctAnswers = answers.filter((a: any) => a.isCorrect).length;
  const totalAnswers = answers.length;
  const averageTime = totalAnswers > 0 
    ? answers.reduce((sum: number, a: any) => sum + a.timeToAnswer, 0) / totalAnswers
    : 0;

  return {
    questionId,
    totalSubmissions: totalAnswers,
    correctSubmissions: correctAnswers,
    accuracy: totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0,
    averageResponseTime: averageTime,
  };
}

async function getFinalResults(sessionId: string) {
  const participants = await prisma.liveQuizParticipant.findMany({
    where: { sessionId },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
    },
    orderBy: { score: 'desc' },
  });

  return {
  leaderboard: participants.map((p: any, index: number) => ({
      rank: index + 1,
      id: p.id,
      nickname: p.nickname,
      score: p.score,
  correctAnswers: p.answers.filter((a: any) => a.isCorrect).length,
      totalAnswers: p.answers.length,
      accuracy: p.answers.length > 0 
        ? (p.answers.filter((a: any) => a.isCorrect).length / p.answers.length) * 100
        : 0,
    })),
    sessionStats: {
      totalParticipants: participants.length,
      averageScore: participants.length > 0 
  ? participants.reduce((sum: number, p: any) => sum + p.score, 0) / participants.length
        : 0,
      highestScore: participants[0]?.score || 0,
      completionRate: participants.length > 0 
  ? participants.filter((p: any) => p.answers.length > 0).length / participants.length * 100
        : 0,
    },
  };
}