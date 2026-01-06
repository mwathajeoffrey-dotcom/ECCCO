import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topicId');
    const difficulty = searchParams.get('difficulty');
    const limit = parseInt(searchParams.get('limit') || '100');

    console.log('📊 Fetching questions:', { topicId, difficulty, limit });

    // Build where clause
    const where: any = {};
    if (topicId) {
      where.topicId = topicId;
    }
    if (difficulty) {
      where.difficulty = difficulty;
    }

    // Fetch questions from database
    const questions = await prisma.question.findMany({
      where,
      include: {
        Topic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: limit,
    });

    // Format to match expected structure
    const formattedQuestions = questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      difficulty: q.difficulty,
      topicId: q.topicId,
      topic: {
        id: q.Topic.id,
        name: q.Topic.name
      }
    }));

    console.log(`✅ Found ${formattedQuestions.length} questions`);

    return NextResponse.json(formattedQuestions);
  } catch (error) {
    console.error('❌ Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}
