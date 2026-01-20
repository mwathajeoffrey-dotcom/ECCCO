import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";

// GET - Fetch all bookmarks for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID required",
          bookmarks: [],
        },
        { status: 400 }
      );
    }

    // Fetch bookmarks from database
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    logger.debug("📚 Fetching bookmarks for user:", userId, "- Found:", bookmarks.length);

    return NextResponse.json({
      success: true,
      bookmarks,
      count: bookmarks.length,
    });
  } catch (error) {
    logger.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookmarks",
        bookmarks: [],
      },
      { status: 500 }
    );
  }
}

// POST - Create a new bookmark
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId, category, notes } = body;

    if (!userId || !questionId) {
      return NextResponse.json({ success: false, message: "User ID and Question ID required" }, { status: 400 });
    }

    // Create or update bookmark
    const bookmark = await prisma.bookmark.upsert({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
      update: {
        notes: notes || "",
        category: category || "Unknown",
        updatedAt: new Date(),
      },
      create: {
        id: `${userId}_${questionId}_${Date.now()}`,
        userId,
        questionId,
        category: category || "Unknown",
        notes: notes || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    logger.debug("� Created/Updated bookmark:", bookmark);

    return NextResponse.json({
      success: true,
      message: "Bookmark created",
      data: bookmark,
    });
  } catch (error) {
    logger.error("Error creating bookmark:", error);
    return NextResponse.json({ success: false, message: "Failed to create bookmark" }, { status: 500 });
  }
}

// PATCH - Update bookmark notes
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId, notes } = body;

    if (!userId || !questionId) {
      return NextResponse.json({ success: false, message: "User ID and Question ID required" }, { status: 400 });
    }

    // Update bookmark notes
    const bookmark = await prisma.bookmark.update({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
      data: {
        notes: notes || "",
        updatedAt: new Date(),
      },
    });

    logger.debug("📝 Updated bookmark notes:", bookmark);

    return NextResponse.json({
      success: true,
      message: "Notes updated",
      data: bookmark,
    });
  } catch (error) {
    logger.error("Error updating notes:", error);
    return NextResponse.json({ success: false, message: "Failed to update notes" }, { status: 500 });
  }
}

// DELETE - Remove a bookmark
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId } = body;

    if (!userId || !questionId) {
      return NextResponse.json({ success: false, message: "User ID and Question ID required" }, { status: 400 });
    }

    // Delete bookmark
    await prisma.bookmark.delete({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });

    logger.debug("🗑️ Deleted bookmark:", { userId, questionId });

    return NextResponse.json({
      success: true,
      message: "Bookmark deleted",
    });
  } catch (error) {
    logger.error("Error deleting bookmark:", error);

    // If bookmark doesn't exist, still return success
    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return NextResponse.json({
        success: true,
        message: "Bookmark not found",
      });
    }

    return NextResponse.json({ success: false, message: "Failed to delete bookmark" }, { status: 500 });
  }
}
