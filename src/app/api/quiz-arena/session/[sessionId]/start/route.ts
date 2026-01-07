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
        { error: 'Only the host can start the quiz' },
        { status: 403 }
      );
    }

    if (session.status !== 'LOBBY') {
      return NextResponse.json(
        { error: 'Quiz already started' },
        { status: 400 }
      );
    }

    // Update session to first question
    const updatedSession = await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        status: 'QUESTION',
        currentQuestion: 0,
        startedAt: new Date()
      }
    });

    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Error starting quiz:', error);
    return NextResponse.json(
      { error: 'Failed to start quiz' },
      { status: 500 }
    );
  }
}
