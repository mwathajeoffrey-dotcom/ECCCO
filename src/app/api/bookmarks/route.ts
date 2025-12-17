// API Route: Get all bookmarks for current user
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || request.headers.get('x-session-id');
    const category = searchParams.get('category');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID or session ID required' },
        { status: 400 }
      );
    }

    const where: any = { userId };
    if (category) {
      where.category = category;
    }

    const bookmarks = await prisma.bookmark.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      bookmarks,
      count: bookmarks.length,
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId, notes, category } = body;

    if (!userId || !questionId) {
      return NextResponse.json(
        { error: 'userId and questionId are required' },
        { status: 400 }
      );
    }

    // Check if bookmark already exists
    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Question already bookmarked' },
        { status: 409 }
      );
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        questionId,
        notes,
        category,
      },
    });

    return NextResponse.json({
      success: true,
      bookmark,
      message: 'Question bookmarked successfully',
    });
  } catch (error) {
    console.error('Error creating bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to create bookmark' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const questionId = searchParams.get('questionId');

    if (!userId || !questionId) {
      return NextResponse.json(
        { error: 'userId and questionId are required' },
        { status: 400 }
      );
    }

    await prisma.bookmark.delete({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Bookmark removed successfully',
    });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to delete bookmark' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId, notes } = body;

    if (!userId || !questionId) {
      return NextResponse.json(
        { error: 'userId and questionId are required' },
        { status: 400 }
      );
    }

    const bookmark = await prisma.bookmark.update({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
      data: {
        notes,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      bookmark,
      message: 'Bookmark notes updated successfully',
    });
  } catch (error) {
    console.error('Error updating bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to update bookmark' },
      { status: 500 }
    );
  }
}
