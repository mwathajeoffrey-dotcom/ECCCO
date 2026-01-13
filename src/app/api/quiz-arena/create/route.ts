import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { Prisma } from "@prisma/client";

// Generate random 6-digit access code
function generateAccessCode(): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Avoid confusing characters
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized - Please sign in to create a quiz" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      timePerQuestion = 20,
      pointsPerQuestion = 1000,
      questionIds = [],
      settings = {},
    } = body;

    // Extract settings
    const { playMusic = true, playSound = true, showAnswerAfter = true, allowLateJoin = false } = settings;

    // Validation
    if (!title || title.trim().length === 0) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return NextResponse.json({ error: "At least one question is required" }, { status: 400 });
    }

    // Fetch the full question objects from the database
    const questions = await prisma.question.findMany({
      where: {
        id: {
          in: questionIds,
        },
      },
      select: {
        id: true,
        question: true,
        options: true,
        correctIndex: true,
        explanation: true,
        difficulty: true,
        topicId: true,
      },
    });

    if (questions.length !== questionIds.length) {
      return NextResponse.json({ error: "One or more questions not found" }, { status: 400 });
    }

    // Parse options from JSON strings and format questions for the quiz
    const formattedQuestions = questions.map((q: any) => ({
      id: q.id,
      questionText: q.question, // Rename to questionText for consistency
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      difficulty: q.difficulty,
      topicId: q.topicId,
    }));

    // Generate unique access code
    let accessCode = generateAccessCode();
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const existing = await prisma.quizSession.findUnique({
        where: { accessCode },
      });

      if (!existing) break;

      accessCode = generateAccessCode();
      attempts++;
    }

    if (attempts === maxAttempts) {
      return NextResponse.json({ error: "Failed to generate unique access code" }, { status: 500 });
    }

    // Create quiz session
    const session = await prisma.quizSession.create({
      data: {
        id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: title.trim(),
        description: description?.trim() || null,
        accessCode,
        hostId: userId,
        status: "LOBBY",
        currentQuestion: 0,
        timePerQuestion,
        pointsPerQuestion,
        playMusic,
        playSound,
        showAnswerAfter,
        allowLateJoin,
        questions: JSON.stringify(formattedQuestions),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      session: {
        id: session.id,
        accessCode: session.accessCode,
        title: session.title,
        status: session.status,
        questionCount: formattedQuestions.length,
      },
    });
  } catch (error) {
    // Check for specific database errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Unique constraint violation (duplicate access code)
        return NextResponse.json(
          { error: "Failed to generate unique access code. Please try again." },
          { status: 409 }
        );
      }
      if (error.code === "P2003") {
        // Foreign key constraint
        return NextResponse.json({ error: "One or more questions not found" }, { status: 400 });
      }
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      logger.error("Database connection failed in quiz-arena create", error);
      return NextResponse.json({ error: "Database temporarily unavailable. Please try again." }, { status: 503 });
    }

    logger.error("Failed to create quiz session", error instanceof Error ? error : undefined);
    return NextResponse.json({ error: "Failed to create quiz session" }, { status: 500 });
  }
}
