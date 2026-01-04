import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user exam sessions directly with Clerk userId
    const examSessions = await prisma.examSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    // Get all unique topic IDs
    const topicIds = [...new Set(examSessions.map(session => session.topicId))];
    
    // Fetch topics to get their names
    const topics = await prisma.topic.findMany({
      where: {
        id: { in: topicIds }
      }
    });
    
    // Create topic ID to name mapping
    const topicMap = new Map(topics.map(t => [t.id, t.name]));

    // Calculate overall statistics
    const totalExams = examSessions.length;
    const completedExams = examSessions.filter(session => session.completed);
    
    // Calculate total questions by parsing the questions JSON
    let totalQuestions = 0;
    let totalCorrect = 0;
    
    examSessions.forEach(session => {
      try {
        const questions = JSON.parse(session.questions);
        const questionCount = questions.length;
        totalQuestions += questionCount;
        
        // Calculate correct answers based on score
        // Score is typically stored as percentage or actual score
        if (session.score !== null) {
          // If score is 0-100, calculate correct answers
          if (session.score <= 100) {
            totalCorrect += Math.round((session.score / 100) * questionCount);
          } else {
            // If score is actual number correct
            totalCorrect += session.score;
          }
        }
      } catch (e) {
        // If JSON parsing fails, skip this session
        console.error('Failed to parse session questions:', e);
      }
    });
    
    const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const totalTimeSpent = examSessions.reduce((sum, session) => 
      sum + (session.totalTime || 0), 0
    );
    const bestScore = Math.max(...completedExams.map(session => session.score || 0), 0);

    // Calculate current streak
    const sortedSessions = examSessions
      .filter(session => session.completed)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    let currentStreak = 0;
    if (sortedSessions.length > 0) {
      const today = new Date();
      let checkDate = new Date(today);
      
      for (const session of sortedSessions) {
        const sessionDate = new Date(session.createdAt);
        const daysDiff = Math.floor((checkDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 1) {
          currentStreak++;
          checkDate = new Date(sessionDate);
        } else {
          break;
        }
      }
    }

    // Calculate performance by topic
    const topicPerformance = new Map();
    
    examSessions.forEach(session => {
      const topicName = topicMap.get(session.topicId) || 'Unknown Topic';
      
      if (!topicPerformance.has(topicName)) {
        topicPerformance.set(topicName, {
          topicName,
          attemptCount: 0,
          totalQuestions: 0,
          correctAnswers: 0,
          lastAttempted: session.createdAt
        });
      }
      
      const topic = topicPerformance.get(topicName);
      topic.attemptCount++;
      
      try {
        const questions = JSON.parse(session.questions);
        const questionCount = questions.length;
        topic.totalQuestions += questionCount;
        
        if (session.score !== null) {
          if (session.score <= 100) {
            topic.correctAnswers += Math.round((session.score / 100) * questionCount);
          } else {
            topic.correctAnswers += session.score;
          }
        }
      } catch (e) {
        console.error('Failed to parse session questions for topic:', e);
      }
      
      if (session.createdAt > topic.lastAttempted) {
        topic.lastAttempted = session.createdAt;
      }
    });

    const performanceByTopic = Array.from(topicPerformance.values()).map(topic => ({
      topicName: topic.topicName,
      attempted: topic.totalQuestions,
      correct: topic.correctAnswers,
      percentage: topic.totalQuestions > 0 ? Math.round((topic.correctAnswers / topic.totalQuestions) * 100) : 0,
    }));

    // Calculate study hours from time spent (convert to hours)
    const studyHours = Math.round(totalTimeSpent / 3600);

    return NextResponse.json({
      stats: {
        examSessions: {
          total: totalExams,
          completed: completedExams.length,
          averageScore,
          bestScore,
          totalTimeSpent,
          currentStreak,
        },
        questions: {
          total: totalQuestions,
          correct: totalCorrect,
          accuracy: averageScore,
        },
        overall: {
          studyHours,
          totalAttempts: totalExams,
        },
      },
      topicPerformance: performanceByTopic,
    });

  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}