import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/next-auth';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

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
    const completedExams = examSessions.filter(session => session.completed);
    const totalQuestions = examSessions.reduce((sum, session) => 
      sum + session.examQuestions.length, 0
    );
    const totalCorrect = examSessions.reduce((sum, session) => 
      sum + session.examQuestions.filter(q => q.isCorrect).length, 0
    );
    const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const totalTimeSpent = examSessions.reduce((sum, session) => 
      sum + (session.totalTimeSpent || 0), 0
    );
    const bestScore = Math.max(...completedExams.map(session => session.finalScore || 0), 0);

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

    // Get recent activity (last 10 sessions)
    const recentActivity = examSessions.slice(0, 10).map(session => ({
      date: session.createdAt.toLocaleDateString(),
      topicName: session.examQuestions[0]?.question.topic?.name || 'Mixed Topics',
      score: session.finalScore || 0,
      timeSpent: session.totalTimeSpent || 0
    }));

    // Calculate performance by topic
    const topicPerformance = new Map();
    
    examSessions.forEach(session => {
      session.examQuestions.forEach(examQuestion => {
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
    examSessions.forEach(session => {
      const topicsInSession = new Set();
      session.examQuestions.forEach(examQuestion => {
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