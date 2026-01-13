import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest, context: { params: Promise<{ sessionId: string }> }) {
  try {
    const { sessionId } = await context.params;

    // Fetch session with participants and their answers
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: {
        participants: {
          orderBy: {
            score: "desc",
          },
        },
        answers: {
          orderBy: {
            answeredAt: "desc",
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
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
      
      logger.debug("Session questions parsed successfully", {
        sessionId,
        questionCount: questions.length,
      });
    } catch (error) {
      logger.error("Failed to parse session questions", error instanceof Error ? error : undefined, {
        sessionId,
        questionsRaw: session.questions,
      });
      questions = [];
    }

    return NextResponse.json({
      ...session,
      questions,
    });
  } catch (error) {
    logger.error("Error fetching session", error instanceof Error ? error : undefined);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
