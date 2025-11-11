import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/next-auth';
import { prisma } from '@/lib/database/prisma-client';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({
        totalAttempts: 0,
        completedExams: 0,
        averageScore: 0,
        totalTimeSpent: 0,
        recentActivity: [],
        topicStats: [],
        weeklyActivity: []
      });
    }

    const userId = user.id;

    // Get user exam sessions
    const examSessions = await prisma.examSession.findMany({
      where: { userId },
      include: {
        examQuestions: {
          include: {
            question: {
              include: {
                topic: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate overall statistics
    const totalExams = examSessions.length;
    const completedExams = examSessions.filter((session: any) => session.completed);
    const totalQuestions = examSessions.reduce((sum: number, session: any) => 
      sum + session.examQuestions.length, 0
    );
    const totalCorrect = examSessions.reduce((sum: number, session: any) => 
      sum + session.examQuestions.filter((q: any) => q.isCorrect).length, 0
    );
    const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const totalTimeSpent = examSessions.reduce((sum: number, session: any) => 
      sum + (session.totalTimeSpent || 0), 0
    );
    const bestScore = Math.max(...completedExams.map((session: any) => session.finalScore || 0), 0);

    // Calculate current streak
    const sortedSessions = examSessions
      .filter((session: any) => session.completed)
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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

    // Get recent activity (last 10 sessions)
    const recentActivity = examSessions.slice(0, 10).map((session: any) => ({
      date: session.createdAt.toLocaleDateString(),
      topicName: session.examQuestions[0]?.question.topic?.name || 'Mixed Topics',
      score: session.finalScore || 0,
      timeSpent: session.totalTimeSpent || 0
    }));

    // Calculate performance by topic
    const topicPerformance = new Map();
    
    examSessions.forEach((session: any) => {
      session.examQuestions.forEach((examQuestion: any) => {
        const topicName = examQuestion.question.topic?.name || 'Unknown';
        
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
        topic.totalQuestions++;
        if (examQuestion.isCorrect) {
          topic.correctAnswers++;
        }
        if (session.createdAt > topic.lastAttempted) {
          topic.lastAttempted = session.createdAt;
        }
      });
    });

    // Update attempt counts
    examSessions.forEach((session: any) => {
      const topicsInSession = new Set();
      session.examQuestions.forEach((examQuestion: any) => {
        const topicName = examQuestion.question.topic?.name || 'Unknown';
        topicsInSession.add(topicName);
      });
      
      topicsInSession.forEach(topicName => {
        if (topicPerformance.has(topicName)) {
          topicPerformance.get(topicName).attemptCount++;
        }
      });
    });

    const performanceByTopic = Array.from(topicPerformance.values()).map(topic => ({
      topicName: topic.topicName,
      attemptCount: topic.attemptCount,
      averageScore: topic.totalQuestions > 0 ? Math.round((topic.correctAnswers / topic.totalQuestions) * 100) : 0,
      lastAttempted: topic.lastAttempted.toLocaleDateString()
    }));

    return NextResponse.json({
      totalExams,
      averageScore,
      totalTimeSpent,
      bestScore,
      currentStreak,
      recentActivity,
      performanceByTopic
    });

  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}