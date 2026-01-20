import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface SaveExamRequest {
  topicId: string;
  topicName: string;
  questions: ExamQuestion[];
  userAnswers: { [key: number]: number };
  finalScore: number;
  totalTimeSpent: number;
  isStudyMode: boolean;
  completed: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: SaveExamRequest = await request.json();
    const { topicId, topicName, questions, userAnswers, finalScore, totalTimeSpent, isStudyMode, completed } = body;

    // Use Clerk userId directly - no need to find/create user in our DB
    const userId = clerkUserId;

    // Create or get topic
    let topic = await prisma.topic.findFirst({
      where: { name: topicName },
    });

    if (!topic) {
      topic = await prisma.topic.create({
        data: {
          id: topicId,
          name: topicName,
          description: `Exam topic for ${topicName}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    // Create exam session
    const examSession = await prisma.examSession.create({
      data: {
        id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        sessionId: `${userId}_${Date.now()}`,
        topicId: topic.id,
        questions: JSON.stringify(questions.map((q) => q.id)),
        answers: JSON.stringify(userAnswers),
        score: finalScore,
        totalTime: totalTimeSpent,
        completed,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Process and save questions and answers
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = userAnswers[i];

      // Create or get the question in the database
      let dbQuestion = await prisma.question.findFirst({
        where: { question: question.question },
      });

      if (!dbQuestion) {
        dbQuestion = await prisma.question.create({
          data: {
            id: question.id,
            question: question.question,
            options: JSON.stringify(question.options),
            correctIndex: question.correctIndex,
            explanation: question.explanation,
            references: JSON.stringify([]),
            difficulty: "medium",
            topicId: topic.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      // Save the question attempt
      await prisma.questionAttempt.create({
        data: {
          id: `attempt_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
          userId,
          questionId: dbQuestion.id,
          topicId: topic.id,
          selectedAnswer: userAnswer ?? 0,
          isCorrect: userAnswer === question.correctIndex,
          timeSpent: Math.floor(totalTimeSpent / questions.length),
          attemptMode: isStudyMode ? "study" : "exam",
          createdAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      examSessionId: examSession.id,
      message: "Exam results saved successfully",
    });
  } catch (error) {
    console.error("Error saving exam results:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
