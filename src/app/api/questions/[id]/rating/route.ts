// API Route: Get ratings and comments for a specific question
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questionId } = await params;

    // Get all ratings for this question
    const ratings = await prisma.questionRating.findMany({
      where: { questionId },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate helpful stats
    const helpful = ratings.filter((r) => r.isHelpful).length;
    const notHelpful = ratings.filter((r) => !r.isHelpful).length;
    const total = ratings.length;
    const helpfulPercentage = total > 0 ? Math.round((helpful / total) * 100) : 0;

    // Get comments (filter out empty ones)
    const comments = ratings
      .filter((r) => r.comment && r.comment.trim().length > 0)
      .map((r) => ({
        id: r.id,
        comment: r.comment,
        isHelpful: r.isHelpful,
        createdAt: r.createdAt,
      }));

    // Count flagged reports
    const flaggedCount = ratings.filter((r) => r.flagged).length;

    return NextResponse.json({
      success: true,
      stats: {
        helpful,
        notHelpful,
        total,
        helpfulPercentage,
        flaggedCount,
      },
      comments,
    });
  } catch (error) {
    console.error('Error fetching question ratings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questionId } = await params;
    const body = await request.json();
    const { userId, isHelpful, comment, flagged } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    if (typeof isHelpful !== 'boolean') {
      return NextResponse.json(
        { error: 'isHelpful must be a boolean' },
        { status: 400 }
      );
    }

    // Check if user already rated this question
    const existing = await prisma.questionRating.findUnique({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });

    if (existing) {
      // Update existing rating
      const updated = await prisma.questionRating.update({
        where: {
          userId_questionId: {
            userId,
            questionId,
          },
        },
        data: {
          isHelpful,
          comment,
          flagged: flagged || false,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        rating: updated,
        message: 'Rating updated successfully',
      });
    }

    // Create new rating
    const rating = await prisma.questionRating.create({
      data: {
        userId,
        questionId,
        isHelpful,
        comment,
        flagged: flagged || false,
      },
    });

    return NextResponse.json({
      success: true,
      rating,
      message: 'Rating submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json(
      { error: 'Failed to submit rating' },
      { status: 500 }
    );
  }
}
