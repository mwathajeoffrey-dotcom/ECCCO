import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId } = await context.params;

    // Verify session exists and user is host
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    if (session.hostId !== userId) {
      return NextResponse.json(
        { error: 'Only the host can control the quiz' },
        { status: 403 }
      );
    }

    const questions = JSON.parse(session.questions as string) as any[];
    const nextQuestionIndex = session.currentQuestion + 1;

    // Check if there are more questions
    if (nextQuestionIndex >= questions.length) {
      // No more questions - end the quiz
      const updatedSession = await prisma.quizSession.update({
        where: { id: sessionId },
        data: {
          status: 'FINISHED',
          endedAt: new Date()
        }
      });
      return NextResponse.json(updatedSession);
    }

    // Move to next question
    const updatedSession = await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        status: 'QUESTION',
        currentQuestion: nextQuestionIndex
      }
    });

    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Error moving to next question:', error);
    return NextResponse.json(
      { error: 'Failed to move to next question' },
      { status: 500 }
    );
  }
}
