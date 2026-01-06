import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';


import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
    // NOTE: Authentication made optional for development/testing
    // Get userId if available, but don't require it
    let userId: string | null = null;
    try {
      const authResult = await auth();
      userId = authResult.userId;
    } catch (authError) {
      // Continue without auth - will return all sessions
      console.log('No auth available, returning all sessions');
    }

    // If userId exists, filter by hostId. Otherwise return all recent sessions
    const sessions = await prisma.liveQuizSession.findMany({
      where: userId ? {
        hostId: userId,
      } : undefined,
      include: {
        topic: {
          include: {
            module: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to 50 most recent sessions
    });

    const formattedSessions = sessions.map((session: any) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      accessCode: session.accessCode,
      status: session.status,
      participantCount: session._count.participants,
      topicName: session.topic?.name,
      createdAt: session.createdAt.toISOString(),
      questionCount: JSON.parse(session.questionIds || '[]').length,
    }));

    return NextResponse.json(formattedSessions);
  } catch (error) {
    console.error('Error fetching live quiz sessions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}