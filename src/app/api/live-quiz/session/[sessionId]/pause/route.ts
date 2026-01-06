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

    // Only allow pausing if quiz is in progress
    if (session.status !== "IN_PROGRESS") {
      return NextResponse.json(
        { error: "Can only pause a quiz that is in progress" },
        { status: 400 }
      );
    }

    // Update session to paused
    const updatedSession = await prisma.liveQuizSession.update({
      where: { id: sessionId },
      data: {
        status: "PAUSED",
        pausedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      session: updatedSession,
      message: "Quiz paused successfully",
    });
  } catch (error) {
    console.error("Error pausing quiz session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
