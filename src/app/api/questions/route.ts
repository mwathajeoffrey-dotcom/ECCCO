import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  // Extract params outside try block for error logging
  const { searchParams } = new URL(request.url);
  const topicId = searchParams.get("topicId");
  const difficulty = searchParams.get("difficulty");
  const limit = parseInt(searchParams.get("limit") || "100");

  try {
    // Build where clause
    const where: any = {};
    if (topicId) {
      where.topicId = topicId;
    }
    if (difficulty) {
      where.difficulty = difficulty;
    }

    // Fetch questions from database
    const questions = await prisma.question.findMany({
      where,
      include: {
        Topic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: limit,
    });

    // Format to match expected structure
    const formattedQuestions = questions.map((q: any) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      difficulty: q.difficulty,
      topicId: q.topicId,
      topic: {
        id: q.Topic.id,
        name: q.Topic.name,
      },
    }));

    logger.debug("Questions fetched successfully", {
      topicId,
      difficulty,
      count: formattedQuestions.length,
      limit,
    });

    return NextResponse.json({
      success: true,
      count: formattedQuestions.length,
      total: formattedQuestions.length,
      questions: formattedQuestions,
    });
  } catch (error) {
    // Check for specific database errors
    if (error instanceof Prisma.PrismaClientInitializationError) {
      logger.error("Database connection failed in questions API", error);
      return NextResponse.json(
        { success: false, error: "Database temporarily unavailable. Please try again." },
        { status: 503 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ success: false, error: "Topic not found" }, { status: 404 });
      }
    }

    logger.error("Failed to fetch questions", error instanceof Error ? error : undefined, {
      topicId,
      difficulty,
      limit,
    });

    return NextResponse.json({ success: false, error: "Failed to fetch questions" }, { status: 500 });
  }
}
