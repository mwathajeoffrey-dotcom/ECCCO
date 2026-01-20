import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // Get actual count from database
    const questionCount = await prisma.$queryRaw`SELECT COUNT(*)::int as count FROM "Question"`;
    const topicCount = await prisma.$queryRaw`SELECT COUNT(*)::int as count FROM "Topic"`;

    // Get first 5 topics
    const topics = await prisma.topic.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        _count: {
          select: { Question: true },
        },
      },
    });

    // Parse DATABASE_URL
    const dbUrl = process.env.DATABASE_URL || "NOT SET";
    let dbInfo: any = { status: "NOT SET" };

    if (dbUrl !== "NOT SET") {
      const match = dbUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
      if (match) {
        dbInfo = {
          status: "CONFIGURED",
          user: match[1],
          host: match[3],
          port: match[4],
          database: match[5],
        };
      }
    }

    return NextResponse.json({
      success: true,
      database: {
        connection: dbInfo,
        questions: (questionCount as any)[0].count,
        topics: (topicCount as any)[0].count,
        sampleTopics: topics,
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasAccelerateUrl: !!process.env.ACCELERATE_URL,
      },
      diagnosis: {
        isCorrectDatabase: (questionCount as any)[0].count === 1845 || (questionCount as any)[0].count > 1800,
        expectedQuestions: 1845,
        actualQuestions: (questionCount as any)[0].count,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
