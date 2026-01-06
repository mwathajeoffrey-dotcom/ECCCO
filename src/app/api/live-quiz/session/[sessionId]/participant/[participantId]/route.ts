import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string; participantId: string }> }
) {
  try {
    const { sessionId, participantId } = await params;

    // Get participant data
    const participant = await prisma.liveQuizParticipant.findFirst({
      where: {
        sessionId,
        id: participantId,
      },
    });

    if (!participant) {
      return NextResponse.json(
        { error: 'Participant not found' },
        { status: 404 }
      );
    }

    // Get all participants sorted by score
    const allParticipants = await prisma.liveQuizParticipant.findMany({
      where: {
        sessionId,
      },
      orderBy: {
        score: 'desc',
      },
      select: {
        id: true,
        score: true,
      },
    });

    // Calculate rank
    const rank = allParticipants.findIndex((p: { id: string; score: number }) => p.id === participantId) + 1;

    return NextResponse.json({
      ...participant,
      rank,
      totalParticipants: allParticipants.length,
    });
  } catch (error) {
    console.error('Error fetching participant:', error);
    return NextResponse.json(
      { error: 'Failed to fetch participant data' },
      { status: 500 }
    );
  }
}
