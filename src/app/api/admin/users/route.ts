import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering - this route needs database access
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
      return NextResponse.json({ error: adminCheck.error }, { status: 401 });
    }

    // Check if prisma client is available
    if (!prisma) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
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
        QuizAttempt: {
          select: {
            id: true,
            score: true,
            totalQuestions: true,
            createdAt: true,
            mode: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5, // Last 5 attempts
        },
        ExamAttempt: {
          select: {
            id: true,
            score: true,
            totalQuestions: true,
            passed: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
        QuestionAttempt: {
          select: {
            id: true,
            isCorrect: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 20,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate statistics for each user
    const usersWithStats = users.map((user) => {
      const totalQuizzes = user.QuizAttempt.length;
      const totalExams = user.ExamAttempt.length;
      const totalQuestions = user.QuestionAttempt.length;

      const correctAnswers = user.QuestionAttempt.filter((qa) => qa.isCorrect).length;
      const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

      const passedExams = user.ExamAttempt.filter((ea) => ea.passed).length;
      const examPassRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;

      // Check if active in last 7 days
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      const recentActivity = [
        ...user.QuizAttempt.map((qa) => qa.createdAt),
        ...user.ExamAttempt.map((ea) => ea.createdAt),
        ...user.QuestionAttempt.map((qa) => qa.createdAt),
      ].filter((date) => new Date(date) > lastWeek);

      const isActive = recentActivity.length > 0;
      const lastActiveDate =
        recentActivity.length > 0
          ? new Date(Math.max(...recentActivity.map((d) => new Date(d).getTime())))
          : user.updatedAt;

      return {
        id: user.id,
        clerkUserId: user.clerkUserId,
        email: user.email || "N/A",
        createdAt: user.createdAt,
        lastActive: lastActiveDate,
        isActive,
        stats: {
          totalQuizzes,
          totalExams,
          totalQuestions,
          accuracy,
          passedExams,
          examPassRate,
        },
        recentQuizzes: user.QuizAttempt.slice(0, 3),
        recentExams: user.ExamAttempt.slice(0, 3),
      };
    });

    // Calculate global statistics
    const totalUsers = users.length;
    const activeUsers = usersWithStats.filter((u) => u.isActive).length;
    const totalQuizAttempts = users.reduce((sum, u) => sum + u.QuizAttempt.length, 0);
    const totalExamAttempts = users.reduce((sum, u) => sum + u.ExamAttempt.length, 0);

    return NextResponse.json({
      success: true,
      users: usersWithStats,
      summary: {
        totalUsers,
        activeUsers,
        totalQuizAttempts,
        totalExamAttempts,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
