import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';


import { prisma } from '@/lib/database/prisma-client';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quizSession = await prisma.liveQuizSession.findUnique({
      where: {
        id: sessionId,
        hostId: userId,
      },
    });

    if (!quizSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if (quizSession.status !== 'WAITING') {
      return NextResponse.json({ error: 'Session already started' }, { status: 400 });
    }

    // Update session status to IN_PROGRESS and set current question start time
    const updatedSession = await prisma.liveQuizSession.update({
      where: { id: sessionId },
      data: {
        status: 'IN_PROGRESS',
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
    const questionIds = JSON.parse(updatedSession.questionIds || '[]');
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
    console.error('Error starting quiz session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}