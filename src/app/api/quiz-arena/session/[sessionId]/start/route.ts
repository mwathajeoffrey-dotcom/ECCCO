import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest, context: { params: Promise<{ sessionId: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await context.params;

    // Verify session exists and user is host
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.hostId !== userId) {
      return NextResponse.json({ error: "Only the host can start the quiz" }, { status: 403 });
    }

    if (session.status !== "LOBBY") {
      return NextResponse.json({ error: "Quiz already started" }, { status: 400 });
    }

    // Verify questions are valid
    let questionCount = 0;
    try {
      const questions = JSON.parse(session.questions as string);
      questionCount = questions.length;
      
      if (questionCount === 0) {
        return NextResponse.json({ error: "Cannot start quiz with no questions" }, { status: 400 });
      }
      
      logger.info("Starting quiz session", {
        sessionId,
        questionCount,
        participantCount: await prisma.participant.count({ where: { sessionId, isActive: true } }),
      });
    } catch (error) {
      logger.error("Invalid questions in session", error instanceof Error ? error : undefined, { sessionId });
      return NextResponse.json({ error: "Quiz has invalid questions" }, { status: 400 });
    }

    // Update session to first question
    const updatedSession = await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        status: "QUESTION",
        currentQuestion: 0,
        startedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    logger.info("Quiz session started successfully", { sessionId, questionCount });

    return NextResponse.json(updatedSession);
  } catch (error) {
    logger.error("Error starting quiz", error instanceof Error ? error : undefined);
    return NextResponse.json({ error: "Failed to start quiz" }, { status: 500 });
  }
}
