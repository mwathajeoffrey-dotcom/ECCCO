import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/next-auth';
import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessions = await prisma.liveQuizSession.findMany({
      where: {
        hostId: session.user.id,
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