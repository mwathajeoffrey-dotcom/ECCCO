import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Check if user is admin
async function isUserAdmin(clerkUserId: string): Promise<boolean> {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { email: true },
  });

  return user?.email ? adminEmails.includes(user.email) : false;
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin status
    const isAdmin = await isUserAdmin(userId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get current date for "today" calculations
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Parallel queries for better performance
    const [
      totalUsers,
      activeToday,
      totalQuestions,
      totalReferences,
      totalQuizAttempts,
      totalFeedback,
      recentUsers,
      recentActivity,
    ] = await Promise.all([
      // Total users count
      prisma.user.count(),

      // Active users today (users who attempted questions today)
      prisma.user.count({
        where: {
          QuestionAttempt: {
            some: {
              createdAt: {
                gte: today,
              },
            },
          },
        },
      }),

      // Total questions
      prisma.question.count(),

      // Total evidence references
      prisma.evidenceReference.count(),

      // Total quiz attempts
      prisma.quizAttempt.count(),

      // Total feedback
      prisma.feedback.count(),

      // Recent users (last 7 days)
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Recent activity (question attempts in last 24 hours)
      prisma.questionAttempt.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    // Get user growth over last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const usersByDay = await prisma.user.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _count: true,
    });

    // Get most active topics
    const topicActivity = await prisma.questionAttempt.groupBy({
      by: ["questionId"],
      _count: true,
      orderBy: {
        _count: {
          questionId: "desc",
        },
      },
      take: 5,
    });

    // Calculate system health based on activity
    let systemHealth: "healthy" | "warning" | "error" = "healthy";
    if (activeToday === 0 && totalUsers > 0) {
      systemHealth = "warning";
    }
    if (recentActivity === 0 && totalUsers > 10) {
      systemHealth = "error";
    }

    // Average questions per user
    const avgQuestionsPerUser = totalUsers > 0 
      ? Math.round((await prisma.questionAttempt.count()) / totalUsers)
      : 0;

    return NextResponse.json({
      stats: {
        totalUsers,
        activeToday,
        totalQuestions,
        totalReferences,
        quizzesCompleted: totalQuizAttempts,
        feedbackMessages: totalFeedback,
        systemHealth,
        recentUsers,
        recentActivity,
        avgQuestionsPerUser,
      },
      growth: {
        usersByDay: usersByDay.map((day) => ({
          date: day.createdAt,
          count: day._count,
        })),
      },
      activity: {
        topQuestions: topicActivity.map((item) => ({
          questionId: item.questionId,
          attempts: item._count,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
