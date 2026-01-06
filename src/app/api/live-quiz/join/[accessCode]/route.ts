import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/database/prisma-client";

export async function GET(request: NextRequest, { params }: { params: Promise<{ accessCode: string }> }) {
  try {
    const { accessCode: paramAccessCode } = await params;
    const accessCode = paramAccessCode.toUpperCase();

    const session = await prisma.liveQuizSession.findUnique({
      where: {
        accessCode: accessCode,
      },
      include: {
        topic: {
          include: {
            module: true,
          },
        },
        participants: {
          where: { isActive: true },
          orderBy: { joinedAt: "asc" },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Get question count
    const questionIds = JSON.parse(session.questionIds || "[]");

    const response = {
      session: {
        id: session.id,
        title: session.title,
        description: session.description,
        accessCode: session.accessCode,
        status: session.status,
        participantCount: session._count.participants,
        questionCount: questionIds.length,
        topicName: session.topic?.name,
      },
      participants: session.participants.map((p: any) => ({
        id: p.id,
        nickname: p.nickname,
        score: p.score,
        isActive: p.isActive,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching quiz session for join:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ accessCode: string }> }) {
  try {
    const { accessCode: paramAccessCode } = await params;
    const accessCode = paramAccessCode.toUpperCase();
    const body = await request.json();
    const { nickname } = body;

    if (!nickname || !nickname.trim()) {
      return NextResponse.json({ error: "Nickname is required" }, { status: 400 });
    }

    const session = await prisma.liveQuizSession.findUnique({
      where: {
        accessCode: accessCode,
      },
      include: {
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    if (session.status === "COMPLETED" || session.status === "CANCELLED") {
      return NextResponse.json({ error: "Quiz has ended" }, { status: 400 });
    }

    if (session.maxParticipants && session._count.participants >= session.maxParticipants) {
      return NextResponse.json({ error: "Quiz is full" }, { status: 400 });
    }

    // Check if nickname is already taken
    const existingParticipant = await prisma.liveQuizParticipant.findFirst({
      where: {
        sessionId: session.id,
        nickname: nickname.trim(),
        isActive: true,
      },
    });

    if (existingParticipant) {
      return NextResponse.json({ error: "Nickname is already taken" }, { status: 400 });
    }

    // Check for authenticated user
    let userId: string | null = null;
    try {
      const { userId: clerkUserId } = await auth();
      if (clerkUserId) {
        userId = clerkUserId;
      }
    } catch {}

    // Create participant
    const participantId = `participant_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const participant = await prisma.liveQuizParticipant.create({
      data: {
        id: participantId,
        sessionId: session.id,
        nickname: nickname.trim(),
        score: 0,
        isActive: true,
        userId: userId ?? undefined,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      participantId: participant.id,
      nickname: participant.nickname,
      userId: userId ?? null,
      message: "Successfully joined the quiz",
    });
  } catch (error) {
    console.error("Error joining quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
