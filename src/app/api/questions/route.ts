import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topicId');
    const limit = parseInt(searchParams.get('limit') || '30');
    const difficulty = searchParams.get('difficulty');

    const whereCondition: {
      topicId?: string;
      difficulty?: string;
    } = {};

    if (topicId) {
      whereCondition.topicId = topicId;
    }

    if (difficulty) {
      whereCondition.difficulty = difficulty;
    }

    const questions = await prisma.question.findMany({
      where: whereCondition,
      take: limit,
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Shuffle questions for randomization
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    return NextResponse.json(shuffledQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}