// API Route: Record study session and update review schedule
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateNextReview } from '@/lib/spacedRepetition';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId, reviewGrade, wasCorrect, timeSpent } = body;

    if (!userId || !questionId || typeof reviewGrade !== 'number') {
      return NextResponse.json(
        { error: 'userId, questionId, and reviewGrade are required' },
        { status: 400 }
      );
    }

    // Get current bookmark
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_questionId: { userId, questionId },
      },
    });

    if (!bookmark) {
      return NextResponse.json(
        { error: 'Bookmark not found' },
        { status: 404 }
      );
    }

    // Calculate next review using SM-2 algorithm
    const { nextReviewDate, easeFactor, interval, reviewCount } = calculateNextReview(
      reviewGrade,
      bookmark.easeFactor,
      bookmark.interval,
      bookmark.reviewCount
    );

    // Update bookmark with new review schedule
    const updatedBookmark = await prisma.bookmark.update({
      where: {
        userId_questionId: { userId, questionId },
      },
      data: {
        nextReviewDate,
        easeFactor,
        interval,
        reviewCount,
        lastReviewGrade: reviewGrade,
        updatedAt: new Date(),
      },
    });

    // Create study session record
    const studySession = await prisma.studySession.create({
      data: {
        userId,
        questionId,
        reviewGrade,
        wasCorrect: wasCorrect ?? (reviewGrade >= 3),
        timeSpent: timeSpent || null,
        wasReview: true,
        previousInterval: bookmark.interval,
        newInterval: interval,
      },
    });

    return NextResponse.json({
      success: true,
      bookmark: updatedBookmark,
      session: studySession,
      message: `Next review in ${interval} day${interval !== 1 ? 's' : ''}`,
    });
  } catch (error) {
    console.error('Error recording study session:', error);
    return NextResponse.json(
      { error: 'Failed to record study session' },
      { status: 500 }
    );
  }
}
