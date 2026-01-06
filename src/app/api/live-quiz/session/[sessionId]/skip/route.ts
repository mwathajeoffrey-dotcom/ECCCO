import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma-client";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Get current session
    const session = await prisma.liveQuizSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Only allow skipping if quiz is in progress
    if (session.status !== "IN_PROGRESS") {
      return NextResponse.json(
        { error: "Can only skip questions during an active quiz" },
        { status: 400 }
      );
    }

    const questionIds = JSON.parse(session.questionIds);
    const nextIndex = session.currentQuestionIndex + 1;

    // Check if this was the last question
    if (nextIndex >= questionIds.length) {
      // Complete the quiz
      const completedSession = await prisma.liveQuizSession.update({
        where: { id: sessionId },
        data: {
          status: "COMPLETED",
          endedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        session: completedSession,
        message: "Quiz completed (last question skipped)",
      });
    }

    // Move to next question
    const updatedSession = await prisma.liveQuizSession.update({
      where: { id: sessionId },
      data: {
        currentQuestionIndex: nextIndex,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      session: updatedSession,
      message: "Question skipped successfully",
    });
  } catch (error) {
    console.error("Error skipping question:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
