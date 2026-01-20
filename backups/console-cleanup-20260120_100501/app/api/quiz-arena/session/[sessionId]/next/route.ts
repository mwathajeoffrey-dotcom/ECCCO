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
      return NextResponse.json({ error: "Only the host can control the quiz" }, { status: 403 });
    }

    let questions: any[] = [];
    try {
      questions = JSON.parse(session.questions as string);
    } catch (error) {
      logger.error("Failed to parse questions in next", error instanceof Error ? error : undefined, { sessionId });
      return NextResponse.json({ error: "Invalid quiz questions" }, { status: 500 });
    }

    const nextQuestionIndex = session.currentQuestion + 1;

    // Check if there are more questions
    if (nextQuestionIndex >= questions.length) {
      // No more questions - end the quiz
      const updatedSession = await prisma.quizSession.update({
        where: { id: sessionId },
        data: {
          status: "FINISHED",
          endedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      logger.info("Quiz session finished", { sessionId, totalQuestions: questions.length });

      return NextResponse.json(updatedSession);
    }

    // Move to next question
    const updatedSession = await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        status: "QUESTION",
        currentQuestion: nextQuestionIndex,
        updatedAt: new Date(),
      },
    });

    logger.debug("Moved to next question", { sessionId, questionIndex: nextQuestionIndex });

    return NextResponse.json(updatedSession);
  } catch (error) {
    logger.error("Error moving to next question", error instanceof Error ? error : undefined);
    return NextResponse.json({ error: "Failed to move to next question" }, { status: 500 });
  }
}
