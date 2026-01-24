import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Check if user is admin (supports both User IDs and Emails)
async function isUserAdmin(clerkUserId: string): Promise<boolean> {
  // Check by User ID first (faster, no database query needed)
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];
  if (adminUserIds.includes(clerkUserId)) {
    return true;
  }

  // Fallback: Check by email
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  if (adminEmails.length === 0) {
    return false;
  }

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

    // Get recent activity feed (last 20 actions)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    // Get recent quiz attempts
    const recentQuizzes = await prisma.quizAttempt.findMany({
      where: {
        createdAt: {
          gte: oneHourAgo,
        },
      },
      include: {
        User: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // Get recent exam attempts
    const recentExams = await prisma.examAttempt.findMany({
      where: {
        createdAt: {
          gte: oneHourAgo,
        },
      },
      include: {
        User: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // Get recent user signups
    const recentSignups = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: oneHourAgo,
        },
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // Combine and format recent activity
    const recentActivityFeed = [
      ...recentQuizzes.map((quiz) => ({
        id: `quiz-${quiz.id}`,
        type: "quiz" as const,
        userEmail: quiz.User.email || "Anonymous",
        timestamp: quiz.createdAt,
        details: `Completed quiz - Score: ${quiz.score}/${quiz.totalQuestions}`,
      })),
      ...recentExams.map((exam) => ({
        id: `exam-${exam.id}`,
        type: "exam" as const,
        userEmail: exam.User.email || "Anonymous",
        timestamp: exam.createdAt,
        details: `Completed exam - Score: ${exam.score}/${exam.totalQuestions}`,
      })),
      ...recentSignups.map((user) => ({
        id: `signup-${user.id}`,
        type: "signup" as const,
        userEmail: user.email || "New User",
        timestamp: user.createdAt,
        details: "Signed up for ECCCO",
      })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Calculate "online users" - users active in last 5 minutes
    const onlineUsers = await prisma.user.count({
      where: {
        OR: [
          {
            QuestionAttempt: {
              some: {
                createdAt: {
                  gte: fiveMinutesAgo,
                },
              },
            },
          },
          {
            QuizAttempt: {
              some: {
                createdAt: {
                  gte: fiveMinutesAgo,
                },
              },
            },
          },
          {
            ExamAttempt: {
              some: {
                createdAt: {
                  gte: fiveMinutesAgo,
                },
              },
            },
          },
        ],
      },
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
    const avgQuestionsPerUser = totalUsers > 0 ? Math.round((await prisma.questionAttempt.count()) / totalUsers) : 0;

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
        onlineUsers,
        activeNow: onlineUsers,
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
      recentActivity: recentActivityFeed.slice(0, 20),
      onlineUsers,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard statistics" }, { status: 500 });
  }
}
