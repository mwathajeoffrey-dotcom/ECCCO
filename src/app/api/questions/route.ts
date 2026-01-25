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

    // Format to match expected structure - properly parse options from JSON string
    const formattedQuestions = questions.map((q: any) => {
      // Parse options if it's a string, otherwise use as-is
      let parsedOptions = [];
      if (q.options) {
        if (typeof q.options === "string") {
          try {
            parsedOptions = JSON.parse(q.options);
          } catch (_e) {
            logger.warn("Failed to parse options for question", { questionId: q.id, options: q.options });
            parsedOptions = [];
          }
        } else {
          parsedOptions = q.options;
        }
      } else {
        logger.warn("Question missing options field", { questionId: q.id, question: q.question });
      }

      // Parse references similarly
      let parsedReferences = [];
      if (q.references) {
        if (typeof q.references === "string") {
          try {
            parsedReferences = JSON.parse(q.references);
          } catch (_e) {
            logger.warn("Failed to parse references for question", { questionId: q.id });
            parsedReferences = [];
          }
        } else {
          parsedReferences = q.references;
        }
      }

      return {
        id: q.id,
        question: q.question,
        options: parsedOptions,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        references: parsedReferences,
        difficulty: q.difficulty,
        topicId: q.topicId,
        topic: {
          id: q.Topic.id,
          name: q.Topic.name,
        },
      };
    });

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
      logger.error(
        "Database connection failed in questions API",
        error instanceof Error ? error : new Error(String(error))
      );
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
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch questions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
