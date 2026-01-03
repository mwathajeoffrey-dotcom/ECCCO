import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/admin';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/users
 * Fetch all users with their statistics and activity
 * Requires admin authorization
 */
export async function GET() {
  try {
    // Check admin authorization
    const adminCheck = await requireAdmin();
    
    if (!adminCheck.authorized) {
      return NextResponse.json(
        { error: adminCheck.error },
        { status: 401 }
      );
    }

    // Fetch all users with their quiz attempts and performance
    const users = await prisma.user.findMany({
      select: {
        id: true,
        clerkUserId: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        // Include related data
        quizAttempts: {
          select: {
            id: true,
            score: true,
            totalQuestions: true,
            createdAt: true,
            mode: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5 // Last 5 attempts
        },
        examAttempts: {
          select: {
            id: true,
            score: true,
            totalQuestions: true,
            passed: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        },
        questionAttempts: {
          select: {
            id: true,
            isCorrect: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 20
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate statistics for each user
    const usersWithStats = users.map(user => {
      const totalQuizzes = user.quizAttempts.length;
      const totalExams = user.examAttempts.length;
      const totalQuestions = user.questionAttempts.length;
      
      const correctAnswers = user.questionAttempts.filter(qa => qa.isCorrect).length;
      const accuracy = totalQuestions > 0 
        ? Math.round((correctAnswers / totalQuestions) * 100) 
        : 0;

      const passedExams = user.examAttempts.filter(ea => ea.passed).length;
      const examPassRate = totalExams > 0
        ? Math.round((passedExams / totalExams) * 100)
        : 0;

      // Check if active in last 7 days
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      
      const recentActivity = [
        ...user.quizAttempts.map(qa => qa.createdAt),
        ...user.examAttempts.map(ea => ea.createdAt),
        ...user.questionAttempts.map(qa => qa.createdAt)
      ].filter(date => new Date(date) > lastWeek);

      const isActive = recentActivity.length > 0;
      const lastActiveDate = recentActivity.length > 0
        ? new Date(Math.max(...recentActivity.map(d => new Date(d).getTime())))
        : user.updatedAt;

      return {
        id: user.id,
        clerkUserId: user.clerkUserId,
        email: user.email || 'N/A',
        createdAt: user.createdAt,
        lastActive: lastActiveDate,
        isActive,
        stats: {
          totalQuizzes,
          totalExams,
          totalQuestions,
          accuracy,
          passedExams,
          examPassRate
        },
        recentQuizzes: user.quizAttempts.slice(0, 3),
        recentExams: user.examAttempts.slice(0, 3)
      };
    });

    // Calculate global statistics
    const totalUsers = users.length;
    const activeUsers = usersWithStats.filter(u => u.isActive).length;
    const totalQuizAttempts = users.reduce((sum, u) => sum + u.quizAttempts.length, 0);
    const totalExamAttempts = users.reduce((sum, u) => sum + u.examAttempts.length, 0);

    return NextResponse.json({
      success: true,
      users: usersWithStats,
      summary: {
        totalUsers,
        activeUsers,
        totalQuizAttempts,
        totalExamAttempts
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
