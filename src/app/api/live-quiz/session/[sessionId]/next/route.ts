import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/next-auth';
import { prisma } from '@/lib/database/prisma-client';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quizSession = await prisma.liveQuizSession.findUnique({
      where: {
        id: sessionId,
        hostId: session.user.id,
      },
    });

    if (!quizSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if (quizSession.status !== 'IN_PROGRESS') {
      return NextResponse.json({ error: 'Session not in progress' }, { status: 400 });
    }

    const questionIds = JSON.parse(quizSession.questionIds || '[]');
    const nextQuestionIndex = quizSession.currentQuestionIndex + 1;

    // Check if this is the last question
    if (nextQuestionIndex >= questionIds.length) {
      // Complete the session
      const updatedSession = await prisma.liveQuizSession.update({
        where: { id: sessionId },
        data: {
          status: 'COMPLETED',
          endedAt: new Date(),
        },
        include: {
          participants: {
            where: { isActive: true },
            orderBy: { score: 'desc' },
          },
        },
      });

      // Calculate final positions
      let currentPosition = 1;
      let lastScore = -1;
      
      for (let i = 0; i < updatedSession.participants.length; i++) {
        const participant = updatedSession.participants[i];
        if (participant.score !== lastScore) {
          currentPosition = i + 1;
          lastScore = participant.score;
        }
        
        await prisma.liveQuizParticipant.update({
          where: { id: participant.id },
          data: { position: currentPosition },
        });
      }

      return NextResponse.json({
        status: 'COMPLETED',
        message: 'Quiz completed',
      });
    }

    // Move to next question
    const updatedSession = await prisma.liveQuizSession.update({
      where: { id: sessionId },
      data: {
        currentQuestionIndex: nextQuestionIndex,
        currentQuestionStartedAt: new Date(),
      },
      include: {
        participants: {
          where: { isActive: true },
          orderBy: { score: 'desc' },
        },
      },
    });

    // Get questions for response
    const questions = await prisma.question.findMany({
      where: {
        id: { in: questionIds },
      },
      orderBy: {
        id: 'asc',
      },
    });

    const formattedQuestions = questions.map((q: any) => ({
      id: q.id,
      question: q.question,
      options: JSON.parse(q.options),
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    }));

    const response = {
      id: updatedSession.id,
      title: updatedSession.title,
      description: updatedSession.description,
      accessCode: updatedSession.accessCode,
      status: updatedSession.status,
      currentQuestionIndex: updatedSession.currentQuestionIndex,
      questionTimeLimit: updatedSession.questionTimeLimit,
      questionIds,
      questions: formattedQuestions,
      participants: updatedSession.participants.map((p: any) => ({
        id: p.id,
        nickname: p.nickname,
        score: p.score,
        isActive: p.isActive,
        joinedAt: p.joinedAt.toISOString(),
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error moving to next question:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}