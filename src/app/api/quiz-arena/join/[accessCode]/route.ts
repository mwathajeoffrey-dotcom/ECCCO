import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest, context: { params: Promise<{ accessCode: string }> }) {
  try {
    const { accessCode } = await context.params;

    // Fetch session by access code
    const session = await prisma.quizSession.findUnique({
      where: { accessCode: accessCode.toUpperCase() },
      include: {
        participants: {
          where: { isActive: true },
          orderBy: { score: "desc" },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Quiz session not found" }, { status: 404 });
    }

    // Parse questions from JSON with error handling
    let questions = [];
    try {
      questions = JSON.parse(session.questions as string);
      
      // Ensure each question has both 'question' and 'questionText' fields
      questions = questions.map((q: any) => ({
        ...q,
        question: q.question || q.questionText,
        questionText: q.questionText || q.question,
      }));
      
      logger.debug("Join session questions parsed successfully", {
        accessCode,
        questionCount: questions.length,
      });
    } catch (error) {
      logger.error("Failed to parse join session questions", error instanceof Error ? error : undefined, {
        accessCode,
        questionsRaw: session.questions,
      });
      questions = [];
    }

    return NextResponse.json({
      ...session,
      questions,
    });
  } catch (error) {
    logger.error("Error fetching session by access code", error instanceof Error ? error : undefined, {
      accessCode: context.params,
    });
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ accessCode: string }> }) {
  try {
    const { accessCode } = await context.params;
    const { nickname } = await request.json();

    if (!nickname || nickname.trim().length === 0) {
      return NextResponse.json({ error: "Nickname is required" }, { status: 400 });
    }

    // Find session
    const session = await prisma.quizSession.findUnique({
      where: { accessCode: accessCode.toUpperCase() },
    });

    if (!session) {
      return NextResponse.json({ error: "Quiz session not found" }, { status: 404 });
    }

    // Check if session allows joining
    if (session.status === "FINISHED") {
      return NextResponse.json({ error: "This quiz has already finished" }, { status: 400 });
    }

    if (session.status !== "LOBBY" && !session.allowLateJoin) {
      return NextResponse.json({ error: "Quiz already started and late join is disabled" }, { status: 400 });
    }

    // Create participant
    const participant = await prisma.participant.create({
      data: {
        id: `participant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sessionId: session.id,
        nickname: nickname.trim(),
        score: 0,
        streak: 0,
        isActive: true,
      },
    });

    return NextResponse.json({
      participantId: participant.id,
      sessionId: session.id,
      nickname: participant.nickname,
    });
  } catch (error) {
    console.error("Error joining session:", error);
    return NextResponse.json({ error: "Failed to join session" }, { status: 500 });
  }
}
