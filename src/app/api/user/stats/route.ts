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
      include: {
        topic: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate overall statistics
    const totalExams = examSessions.length;
    const completedExams = examSessions.filter((session: any) => session.completed);
    const totalQuestions = examSessions.reduce((sum: number, session: any) => 
      sum + (session.totalQuestions || 0), 0
    );
    const totalCorrect = examSessions.reduce((sum: number, session: any) => 
      sum + (session.correctAnswers || 0), 0
    );
    const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const totalTimeSpent = examSessions.reduce((sum: number, session: any) => 
      sum + (session.timeSpent || session.totalTime || 0), 0
    );
    const bestScore = Math.max(...completedExams.map((session: any) => session.score || 0), 0);

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
      topicName: session.topic?.name || session.topicName || 'Mixed Topics',
      score: session.score || 0,
      timeSpent: session.timeSpent || session.totalTime || 0
    }));

    // Calculate performance by topic
    const topicPerformance = new Map();
    
    examSessions.forEach((session: any) => {
      const topicName = session.topic?.name || session.topicName || 'Unknown';
      
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
      topic.totalQuestions += (session.totalQuestions || 0);
      topic.correctAnswers += (session.correctAnswers || 0);
      
      if (session.createdAt > topic.lastAttempted) {
        topic.lastAttempted = session.createdAt;
      }
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