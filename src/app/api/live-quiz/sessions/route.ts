import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';


import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessions = await prisma.liveQuizSession.findMany({
      where: {
        hostId: userId,
      },
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