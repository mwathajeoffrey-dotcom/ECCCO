import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";

// GET - Fetch rating for a specific question by a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const questionId = searchParams.get("questionId");

    if (!userId || !questionId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID and Question ID required",
          rating: null,
        },
        { status: 400 }
      );
    }

    // Fetch rating from database
    const rating = await prisma.questionRating.findUnique({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      rating,
    });
  } catch (error) {
    logger.error("Error fetching rating:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch rating",
        rating: null,
      },
      { status: 500 }
    );
  }
}

// POST - Create or update a question rating
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId, stars, helpful, feedback } = body;

    if (!userId || !questionId || stars === undefined) {
      return NextResponse.json(
        { success: false, message: "User ID, Question ID, and stars rating required" },
        { status: 400 }
      );
    }

    // Validate stars is between 1-5
    if (stars < 1 || stars > 5) {
      return NextResponse.json({ success: false, message: "Stars must be between 1 and 5" }, { status: 400 });
    }

    // Create or update rating
    const rating = await prisma.questionRating.upsert({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
      update: {
        stars,
        helpful: helpful ?? null,
        feedback: feedback || null,
        updatedAt: new Date(),
      },
      create: {
        id: `rating_${userId}_${questionId}_${Date.now()}`,
        userId,
        questionId,
        stars,
        helpful: helpful ?? null,
        feedback: feedback || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    logger.debug("⭐ Created/Updated rating:", rating);

    return NextResponse.json({
      success: true,
      message: "Rating saved",
      data: rating,
    });
  } catch (error) {
    logger.error("Error saving rating:", error);
    return NextResponse.json({ success: false, message: "Failed to save rating" }, { status: 500 });
  }
}

// DELETE - Remove a rating
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId } = body;

    if (!userId || !questionId) {
      return NextResponse.json({ success: false, message: "User ID and Question ID required" }, { status: 400 });
    }

    // Delete rating
    await prisma.questionRating.delete({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });

    logger.debug("🗑️ Deleted rating:", { userId, questionId });

    return NextResponse.json({
      success: true,
      message: "Rating deleted",
    });
  } catch (error) {
    logger.error("Error deleting rating:", error);

    // If rating doesn't exist, still return success
    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return NextResponse.json({
        success: true,
        message: "Rating not found",
      });
    }

    return NextResponse.json({ success: false, message: "Failed to delete rating" }, { status: 500 });
  }
}
