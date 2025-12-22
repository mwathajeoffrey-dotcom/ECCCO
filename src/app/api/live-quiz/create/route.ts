import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/database/prisma-client';

// Generate a unique 6-character access code
function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Ensure access code is unique
async function generateUniqueAccessCode(): Promise<string> {
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    const code = generateAccessCode();
    const existing = await prisma.liveQuizSession.findUnique({
      where: { accessCode: code },
    });
    
    if (!existing) {
      return code;
    }
    
    attempts++;
  }
  
  // If we can't generate a unique code, add timestamp
  return generateAccessCode() + Date.now().toString().slice(-2);
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      topicId,
      questionIds,
      questionTimeLimit = 30,
      maxParticipants = 100,
    } = body;

    // Validate required fields
    if (!title || !questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
      return NextResponse.json(
        { error: 'Title and questions are required' },
        { status: 400 }
      );
    }

    // Validate questions exist
    const questions = await prisma.question.findMany({
      where: {
        id: {
          in: questionIds,
        },
      },
    });

    if (questions.length !== questionIds.length) {
      return NextResponse.json(
        { error: 'Some questions were not found' },
        { status: 400 }
      );
    }

    // Generate unique access code
    const accessCode = await generateUniqueAccessCode();

    // Prepare settings object
    const settings = {
      questionTimeLimit: questionTimeLimit || 30,
      maxParticipants: maxParticipants || 100,
    };

    // If no topicId provided, use the first topic from the questions
    let finalTopicId = topicId;
    if (!finalTopicId && questions.length > 0) {
      const firstQuestion = await prisma.question.findUnique({
        where: { id: questionIds[0] },
        select: { topicId: true },
      });
      finalTopicId = firstQuestion?.topicId || null;
    }

    // If still no topic, we need to get a default one or create a mixed topic
    if (!finalTopicId) {
      // Get any topic as fallback
      const defaultTopic = await prisma.topic.findFirst();
      if (!defaultTopic) {
        return NextResponse.json(
          { error: 'No topics available in the system' },
          { status: 400 }
        );
      }
      finalTopicId = defaultTopic.id;
    }

    // Create the live quiz session
    const liveQuizSession = await prisma.liveQuizSession.create({
      data: {
        title,
        description,
        accessCode,
        hostId: userId,
        topicId: finalTopicId,
        questionIds: JSON.stringify(questionIds),
        settings: JSON.stringify(settings),
        status: 'WAITING',
      },
      include: {
        topic: {
          include: {
            module: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: liveQuizSession.id,
      title: liveQuizSession.title,
      description: liveQuizSession.description,
      accessCode: liveQuizSession.accessCode,
      status: liveQuizSession.status,
      topicName: liveQuizSession.topic?.name,
      questionCount: questionIds.length,
    });
  } catch (error) {
    console.error('Error creating live quiz session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}