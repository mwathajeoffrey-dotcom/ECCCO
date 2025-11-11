import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/next-auth';
import { prisma } from '@/lib/db/prisma';

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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: SaveExamRequest = await request.json();
    const {
      topicId,
      topicName,
      questions,
      userAnswers,
      finalScore,
      totalTimeSpent,
      isStudyMode,
      completed
    } = body;

    const userId = session.user.id;

    // Create or get topic
    let topic = await prisma.topic.findFirst({
      where: { name: topicName }
    });

    if (!topic) {
      topic = await prisma.topic.create({
        data: {
          id: topicId,
          name: topicName,
          description: `Exam topic for ${topicName}`,
          category: 'Emergency Medicine'
        }
      });
    }

    // Create exam session
    const examSession = await prisma.examSession.create({
      data: {
        userId,
        topicId: topic.id,
        finalScore,
        totalTimeSpent,
        isStudyMode,
        completed,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // Process and save questions and answers
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = userAnswers[i];
      
      // Create or get the question in the database
      let dbQuestion = await prisma.question.findFirst({
        where: { question: question.question }
      });

      if (!dbQuestion) {
        dbQuestion = await prisma.question.create({
          data: {
            id: question.id,
            question: question.question,
            options: question.options,
            correctIndex: question.correctIndex,
            explanation: question.explanation,
            difficulty: 'Medium', // Default difficulty
            topicId: topic.id,
            references: [],
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
      }

      // Save the exam question (user's answer to this question in this exam)
      await prisma.examQuestion.create({
        data: {
          examSessionId: examSession.id,
          questionId: dbQuestion.id,
          userAnswer: userAnswer ?? null,
          isCorrect: userAnswer === question.correctIndex,
          timeSpent: totalTimeSpent / questions.length, // Approximate time per question
          createdAt: new Date()
        }
      });
    }

    return NextResponse.json({
      success: true,
      examSessionId: examSession.id,
      message: 'Exam results saved successfully'
    });

  } catch (error) {
    console.error('Error saving exam results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}