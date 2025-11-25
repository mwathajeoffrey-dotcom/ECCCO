// Secure answer submission API for live quiz sessions
import { NextRequest } from 'next/server';
import { LiveQuizSecurityManager } from '@/lib/live-quiz/security-manager';
import { LiveQuizSessionState } from '@/lib/live-quiz/session-state';
import { liveQuizWSManager } from '@/lib/live-quiz/websocket-manager';
import { prisma } from '@/lib/database/prisma-client';
import { logger } from '@/lib/logger';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string; participantId: string }> }
) {
  try {
    const { sessionId, participantId } = await params;
    const { questionId, answer } = await request.json();

    // Validate required parameters
    if (!questionId || answer === undefined) {
      return Response.json(
        { error: 'Missing required parameters: questionId, answer' },
        { status: 400 }
      );
    }

    // Security validation for session access
    const sessionAccessValidation = await LiveQuizSecurityManager.validateSessionAccess(
      sessionId,
      participantId,
      request
    );

    if (!sessionAccessValidation.authorized) {
      logger.warn('Unauthorized answer submission attempt', {
        sessionId,
        participantId,
        reason: sessionAccessValidation.reason,
  // ip: request.ip, // NextRequest does not have 'ip' property
      });

      return Response.json(
        { error: sessionAccessValidation.reason || 'Unauthorized' },
        { status: 403 }
      );
    }

    // Security validation for answer submission
    const answerSecurityValidation = await LiveQuizSecurityManager.validateAnswerSubmission(
      sessionId,
      participantId,
      questionId,
      answer,
      request
    );

    if (!answerSecurityValidation.allowed) {
      logger.warn('Answer submission blocked by security', {
        sessionId,
        participantId,
        questionId,
        reason: answerSecurityValidation.reason,
  // ip: request.ip, // NextRequest does not have 'ip' property
      });

      return Response.json(
        { error: answerSecurityValidation.reason || 'Security validation failed' },
        { status: 400 }
      );
    }

    // Validate session state and question
    const sessionState = await LiveQuizSessionState.getSessionState(sessionId);
    if (!sessionState) {
      return Response.json({ error: 'Session not found' }, { status: 404 });
    }

    // Check if session is active and question is current
    if (sessionState.status !== 'ACTIVE') {
      return Response.json({ error: 'Session is not active' }, { status: 400 });
    }

    if (sessionState.currentQuestionId !== questionId) {
      return Response.json({ error: 'Question is not currently active' }, { status: 400 });
    }

    // Submit answer using session state manager
    const result = await LiveQuizSessionState.submitAnswer(
      sessionId,
      participantId,
      questionId,
      answer
    );

    if (!result.success) {
      logger.error('Answer submission failed', {
        sessionId,
        participantId,
        questionId,
      } as any);
      return Response.json({ error: 'Failed to submit answer' }, { status: 500 });
    }

    // Broadcast answer submission to other participants via WebSocket
    liveQuizWSManager.broadcastToSession(sessionId, {
      type: 'answer_submitted',
      sessionId,
      data: {
        participantId,
        questionId,
        isCorrect: result.isCorrect,
        points: result.points,
        participants: sessionState.participants, // Updated participant list
      },
      timestamp: Date.now(),
    });

    logger.info('Answer submitted successfully via API', {
      sessionId,
      participantId,
      questionId,
      isCorrect: result.isCorrect,
      points: result.points,
    });

    // Return success response
    return Response.json({
      success: true,
      result: {
        isCorrect: result.isCorrect,
        points: result.points,
        submittedAt: Date.now(),
      },
    });

  } catch (error) {
    logger.error('Error in answer submission API', error as Error);

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get participant's answers for a session (for review/audit)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string; participantId: string }> }
) {
  try {
    const { sessionId, participantId } = await params;

    // Security validation for session access
    const sessionAccessValidation = await LiveQuizSecurityManager.validateSessionAccess(
      sessionId,
      participantId,
      request
    );

    if (!sessionAccessValidation.authorized) {
      return Response.json(
        { error: sessionAccessValidation.reason || 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get participant's answers
    const answers = await prisma.liveQuizAnswer.findMany({
      where: {
        participantId,
        participant: {
          sessionId,
        },
      },
      include: {
        question: {
          select: {
            id: true,
            question: true,
            type: true,
            order: true,
          },
        },
      },
      orderBy: {
        submittedAt: 'asc',
      },
    });

    // Get participant info
    const participant = await prisma.liveQuizParticipant.findUnique({
      where: { id: participantId },
      select: {
        id: true,
        nickname: true,
        score: true,
        joinedAt: true,
        session: {
          select: {
            id: true,
            status: true,
            quiz: {
              select: {
                title: true,
                _count: {
                  select: {
                    questions: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!participant) {
      return Response.json({ error: 'Participant not found' }, { status: 404 });
    }

    const responseData = {
      participant: {
        id: participant.id,
        nickname: participant.nickname,
        score: participant.score,
        joinedAt: participant.joinedAt,
      },
      session: {
        id: participant.session.id,
        status: participant.session.status,
        title: participant.session.quiz.title,
        totalQuestions: participant.session.quiz._count.questions,
      },
  answers: answers.map((answer: any) => ({
        questionId: answer.questionId,
        question: answer.question.question,
        questionType: answer.question.type,
        questionOrder: answer.question.order,
        answer: answer.answer,
        isCorrect: answer.isCorrect,
        points: answer.points,
        submittedAt: answer.submittedAt,
        timeToAnswer: answer.timeToAnswer,
      })),
      summary: {
        totalAnswers: answers.length,
  correctAnswers: answers.filter((a: any) => a.isCorrect).length,
  totalPoints: answers.reduce((sum: number, a: any) => sum + a.points, 0),
        averageResponseTime: answers.length > 0 
          ? answers.reduce((sum: number, a: any) => sum + a.timeToAnswer, 0) / answers.length
          : 0,
      },
    };

    return Response.json(responseData);

  } catch (error) {
    logger.error('Error getting participant answers', error as Error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}