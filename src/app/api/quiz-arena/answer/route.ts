import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const {
      sessionId,
      participantId,
      questionIndex,
      selectedOption,
      timeToAnswer
    } = await request.json();

    // Validation
    if (!sessionId || !participantId || questionIndex === undefined || selectedOption === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch session and participant
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId }
    });

    const participant = await prisma.participant.findUnique({
      where: { id: participantId }
    });

    if (!session || !participant) {
      return NextResponse.json(
        { error: 'Session or participant not found' },
        { status: 404 }
      );
    }

    // Parse questions
    const questions = JSON.parse(session.questions as string);
    const currentQuestion = questions[questionIndex];

    if (!currentQuestion) {
      return NextResponse.json(
        { error: 'Invalid question index' },
        { status: 400 }
      );
    }

    // Check if answer is correct
    const isCorrect = selectedOption === currentQuestion.correctIndex;

    // Calculate points based on time (faster = more points)
    let pointsEarned = 0;
    if (isCorrect) {
      const maxTime = session.timePerQuestion * 1000; // Convert to milliseconds
      const timeBonus = Math.max(0, 1 - (timeToAnswer / maxTime));
      pointsEarned = Math.round(session.pointsPerQuestion * (0.5 + (0.5 * timeBonus)));
    }

    // Update streak
    const newStreak = isCorrect ? participant.streak + 1 : 0;
    
    // Apply streak bonus
    if (newStreak >= 3) {
      pointsEarned = Math.round(pointsEarned * (1 + (newStreak - 2) * 0.1)); // 10% bonus per streak after 3
    }

    const newScore = participant.score + pointsEarned;

    // Save answer
    const answer = await prisma.answer.create({
      data: {
        id: `answer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sessionId,
        participantId,
        questionIndex,
        selectedOption,
        isCorrect,
        timeToAnswer,
        pointsEarned,
        answeredAt: new Date()
      }
    });

    // Update participant score and streak
    await prisma.participant.update({
      where: { id: participantId },
      data: {
        score: newScore,
        streak: newStreak
      }
    });

    return NextResponse.json({
      isCorrect,
      pointsEarned,
      newScore,
      newStreak,
      correctAnswer: currentQuestion.correctIndex
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}
