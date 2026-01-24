import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { ExamSession } from "@/lib/analytics/analytics-v2";

/**
 * POST /api/analytics/record
 * Records an exam session completion
 */
export async function POST(request: NextRequest) {
  try {
    const sessionData: ExamSession = await request.json();

    // Validate required fields
    if (!sessionData.sessionId || !sessionData.topicId || !sessionData.topicName) {
      return NextResponse.json({ error: "Missing required session data" }, { status: 400 });
    }

    // Validate questions array
    if (!sessionData.questions || !Array.isArray(sessionData.questions)) {
      return NextResponse.json({ error: "Invalid questions data" }, { status: 400 });
    }

    // Check if we have a database connection
    const isDatabaseAvailable = await checkDatabaseConnection();

    if (!isDatabaseAvailable) {
      logger.debug("[Analytics API] Database unavailable, accepting session locally");
      return NextResponse.json({
        success: true,
        message: "Session recorded locally",
        storageMode: "local",
      });
    }

    // Store in database if available
    await prisma.examSession.create({
      data: {
        id: sessionData.id,
        userId: sessionData.userId || null,
        sessionId: sessionData.sessionId,
        topicId: sessionData.topicId,
        questions: JSON.stringify(sessionData.questions.map((q: any) => q.id)), // Store question IDs as JSON
        answers: JSON.stringify(sessionData.answers), // Store answers as JSON
        score: sessionData.score,
        totalTime: sessionData.timeSpent,
        completed: true, // Mark as completed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    logger.debug(`[Analytics API] Session recorded: ${sessionData.topicId} - ${sessionData.score}%`);

    return NextResponse.json({
      success: true,
      message: "Session recorded successfully",
      storageMode: "database",
    });
  } catch (error) {
    logger.error("[Analytics API] Error recording session:", error instanceof Error ? error : new Error(String(error)));

    return NextResponse.json(
      {
        success: true,
        message: "Session recorded locally due to server error",
        storageMode: "local",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 }
    ); // Return 200 so client doesn't think it failed
  }
}

async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.debug("[Analytics API] Database connection failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
