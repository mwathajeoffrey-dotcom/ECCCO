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

    // Only allow resuming if quiz is paused
    if (session.status !== "PAUSED") {
      return NextResponse.json(
        { error: "Can only resume a paused quiz" },
        { status: 400 }
      );
    }

    // Update session to in progress
    const updatedSession = await prisma.liveQuizSession.update({
      where: { id: sessionId },
      data: {
        status: "IN_PROGRESS",
        pausedAt: null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      session: updatedSession,
      message: "Quiz resumed successfully",
    });
  } catch (error) {
    console.error("Error resuming quiz session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
