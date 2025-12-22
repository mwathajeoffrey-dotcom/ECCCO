import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';


import { prisma } from '@/lib/database/prisma-client';

export async function GET(
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
        hostId: userId, // Ensure only host can access
      },
      include: {
        participants: {
          where: { isActive: true },
          orderBy: { score: 'desc' },
        },
        topic: true,
      },
    });

    if (!quizSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Parse question IDs and fetch questions
    const questionIds = JSON.parse(quizSession.questionIds || '[]');
    const questions = await prisma.question.findMany({
      where: {
        id: { in: questionIds },
      },
      orderBy: {
        id: 'asc', // Maintain order
      },
    });

    // Format questions for frontend
    const formattedQuestions = questions.map((q: any) => ({
      id: q.id,
      question: q.question,
      options: JSON.parse(q.options),
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    }));

    const response = {
      id: quizSession.id,
      title: quizSession.title,
      description: quizSession.description,
      accessCode: quizSession.accessCode,
      status: quizSession.status,
      currentQuestionIndex: quizSession.currentQuestionIndex,
      questionTimeLimit: quizSession.questionTimeLimit,
      questionIds,
      questions: formattedQuestions,
      participants: quizSession.participants.map((p: any) => ({
        id: p.id,
        nickname: p.nickname,
        score: p.score,
        isActive: p.isActive,
        joinedAt: p.joinedAt.toISOString(),
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching quiz session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}