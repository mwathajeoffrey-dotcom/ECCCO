import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * SM-2 Spaced Repetition Algorithm
 * Based on SuperMemo 2 algorithm
 * 
 * @param grade - Quality of recall (0-5)
 *   5: Perfect recall
 *   4: Correct after hesitation
 *   3: Correct with difficulty
 *   2: Incorrect but remembered
 *   1: Incorrect, vague memory
 *   0: Complete blackout
 * 
 * @param easeFactor - Current ease factor (≥1.3)
 * @param interval - Current interval in days
 * @param reviewCount - Number of times reviewed
 */
function calculateNextReview(
  grade: number,
  easeFactor: number,
  interval: number,
  reviewCount: number
): { nextEaseFactor: number; nextInterval: number; nextReviewDate: Date } {
  // Calculate new ease factor
  let newEaseFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  
  // Ensure ease factor doesn't go below 1.3
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }

  let newInterval: number;

  if (grade < 3) {
    // If recall was poor, restart interval
    newInterval = 1;
  } else {
    // Good recall - increase interval
    if (reviewCount === 0) {
      newInterval = 1;
    } else if (reviewCount === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEaseFactor);
    }
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    nextEaseFactor: newEaseFactor,
    nextInterval: newInterval,
    nextReviewDate
  };
}

/**
 * GET /api/bookmarks/review
 * Get bookmarks due for review
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'anonymous';

    const today = new Date();

    // Get bookmarks due for review (nextReviewDate is null or <= today)
    const bookmarksDue = await prisma.bookmark.findMany({
      where: {
        userId,
        OR: [
          { nextReviewDate: null }, // Never reviewed
          { nextReviewDate: { lte: today } } // Due for review
        ]
      },
      orderBy: [
        { nextReviewDate: 'asc' },
        { createdAt: 'asc' }
      ]
    });

    // Get stats
    const totalBookmarks = await prisma.bookmark.count({ where: { userId } });
    const reviewedCount = await prisma.bookmark.count({
      where: {
        userId,
        reviewCount: { gt: 0 }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        bookmarksDue,
        stats: {
          total: totalBookmarks,
          reviewed: reviewedCount,
          dueToday: bookmarksDue.length,
          upToDate: totalBookmarks - bookmarksDue.length
        }
      }
    });
  } catch (error) {
    console.error('Error fetching review bookmarks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review bookmarks' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookmarks/review
 * Submit review result for a bookmark
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookmarkId, grade } = body;

    if (!bookmarkId || grade === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing bookmarkId or grade' },
        { status: 400 }
      );
    }

    // Validate grade is 0-5
    if (grade < 0 || grade > 5) {
      return NextResponse.json(
        { success: false, error: 'Grade must be between 0 and 5' },
        { status: 400 }
      );
    }

    // Get current bookmark
    const bookmark = await prisma.bookmark.findUnique({
      where: { id: bookmarkId }
    });

    if (!bookmark) {
      return NextResponse.json(
        { success: false, error: 'Bookmark not found' },
        { status: 404 }
      );
    }

    // Calculate next review using SM-2 algorithm
    const { nextEaseFactor, nextInterval, nextReviewDate } = calculateNextReview(
      grade,
      bookmark.easeFactor,
      bookmark.interval,
      bookmark.reviewCount
    );

    // Update bookmark with new review data
    const updatedBookmark = await prisma.bookmark.update({
      where: { id: bookmarkId },
      data: {
        nextReviewDate,
        easeFactor: nextEaseFactor,
        interval: nextInterval,
        reviewCount: bookmark.reviewCount + 1,
        lastReviewGrade: grade,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        bookmark: updatedBookmark,
        nextInterval,
        nextReviewDate
      }
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}
