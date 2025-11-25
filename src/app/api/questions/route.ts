import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topicId');
    const limit = parseInt(searchParams.get('limit') || '30');
    const difficulty = searchParams.get('difficulty');
    
    console.log('Request params:', { topicId, limit, difficulty });

    // Build where clause
    const where: any = {};
    
    if (topicId) {
      where.topicId = topicId;
    }
    
    if (difficulty) {
      where.difficulty = difficulty;
    }

    // Build include clause - include topic info if browsing all questions
    const include = !topicId ? {
      topic: {
        include: {
          module: true
        }
      }
    } : undefined;

    // Fetch questions from database
    const questions = await prisma.question.findMany({
      where,
      include,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform the data to match expected format
    const transformedQuestions = questions.map((q: any) => ({
      id: q.id,
      question: q.question,
      options: q.options, // Already stored as JSON string
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      references: q.references, // Already stored as JSON string
      difficulty: q.difficulty,
      topicId: q.topicId,
      ...(q.topic && { topic: q.topic }) // Include topic info if available
    }));

    return NextResponse.json(transformedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}