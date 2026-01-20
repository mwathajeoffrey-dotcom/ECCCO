import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    // Fetch topics from database with question counts
    const topics = await prisma.topic.findMany({
      include: {
        _count: {
          select: {
            Question: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    // Transform to match expected format
    const formattedTopics = topics.map((topic: any) => ({
      id: topic.id,
      name: topic.name,
      description: topic.description,
      _count: {
        questions: topic._count.Question,
      },
    }));

    return NextResponse.json(formattedTopics);
  } catch (error) {
    // Check for specific database errors
    if (error instanceof Prisma.PrismaClientInitializationError) {
      logger.error("Database connection failed in topics API", error instanceof Error ? error : new Error(String(error)));
      return NextResponse.json({ error: "Database temporarily unavailable" }, { status: 503 });
    }

    logger.error("Failed to fetch topics", error instanceof Error ? error : undefined);

    // Return empty array as fallback for backwards compatibility
    return NextResponse.json([]);
  }
}
