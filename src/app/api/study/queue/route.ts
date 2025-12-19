// API Route: Get study queue (due reviews)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isDueForReview, getReviewPriority } from '@/lib/spacedRepetition';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Get all bookmarks for user
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      orderBy: { nextReviewDate: 'asc' },
    });

    // Filter for due reviews and calculate priority
    const dueReviews = bookmarks
      .filter(b => isDueForReview(b.nextReviewDate))
      .map(b => ({
        ...b,
        priority: getReviewPriority(b.nextReviewDate),
      }))
      .sort((a, b) => b.priority - a.priority) // Sort by priority descending
      .slice(0, limit);

    // Get study stats
    const totalDue = bookmarks.filter(b => isDueForReview(b.nextReviewDate)).length;
    const totalBookmarks = bookmarks.length;

    return NextResponse.json({
      success: true,
      reviews: dueReviews,
      stats: {
        totalDue,
        totalBookmarks,
        duePercentage: totalBookmarks > 0 ? Math.round((totalDue / totalBookmarks) * 100) : 0,
      },
    });
  } catch (error) {
    console.error('Error fetching study queue:', error);
    return NextResponse.json(
      { error: 'Failed to fetch study queue' },
      { status: 500 }
    );
  }
}
