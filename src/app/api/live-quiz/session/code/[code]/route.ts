import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    const session = await prisma.liveQuizSession.findUnique({
      where: { accessCode: code },
      include: {
        LiveQuizParticipant: {
          orderBy: {
            score: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Fetch full question data
    const questionIds = JSON.parse(session.questionIds) as string[];
    const questions = await prisma.question.findMany({
      where: {
        id: {
          in: questionIds,
        },
      },
    });

    // Sort questions in the order of questionIds
    const sortedQuestions = questionIds.map(id =>
      questions.find(q => q.id === id)
    ).filter(Boolean);

    return NextResponse.json({
      ...session,
      questions: sortedQuestions,
    });
  } catch (error) {
    console.error('Error fetching session by code:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}
