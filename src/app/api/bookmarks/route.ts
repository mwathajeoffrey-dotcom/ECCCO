import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for bookmarks (will persist during server runtime)
// TODO: Replace with database storage (Prisma/PostgreSQL)
interface Bookmark {
  questionId: string;
  userId: string;
  category: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const bookmarksStore = new Map<string, Bookmark>();

// Helper to generate unique key
function getBookmarkKey(userId: string, questionId: string): string {
  return `${userId}-${questionId}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'User ID required',
        bookmarks: []
      }, { status: 400 });
    }

    // Filter bookmarks for this user
    const userBookmarks = Array.from(bookmarksStore.values())
      .filter(bookmark => bookmark.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    console.log('📚 Fetching bookmarks for user:', userId, '- Found:', userBookmarks.length);

    return NextResponse.json({
      success: true,
      bookmarks: userBookmarks,
      count: userBookmarks.length
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch bookmarks',
      bookmarks: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId, category } = body;

    if (!userId || !questionId) {
      return NextResponse.json(
        { success: false, message: 'User ID and Question ID required' },
        { status: 400 }
      );
    }

    const key = getBookmarkKey(userId, questionId);
    const now = new Date().toISOString();
    
    const bookmark: Bookmark = {
      userId,
      questionId,
      category: category || 'Unknown',
      notes: body.notes || '',
      createdAt: now,
      updatedAt: now,
    };

    bookmarksStore.set(key, bookmark);
    
    console.log('📚 Creating bookmark:', bookmark);
    console.log('📊 Total bookmarks in store:', bookmarksStore.size);

    return NextResponse.json({
      success: true,
      message: 'Bookmark created',
      data: bookmark
    });
  } catch (error) {
    console.error('Error creating bookmark:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create bookmark' },
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
        { success: false, message: 'User ID and Question ID required' },
        { status: 400 }
      );
    }

    const key = getBookmarkKey(userId, questionId);
    const existing = bookmarksStore.get(key);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Bookmark not found' },
        { status: 404 }
      );
    }

    const updated: Bookmark = {
      ...existing,
      notes: notes || '',
      updatedAt: new Date().toISOString(),
    };

    bookmarksStore.set(key, updated);
    
    console.log('📝 Updating bookmark notes:', updated);

    return NextResponse.json({
      success: true,
      message: 'Notes updated',
      data: updated
    });
  } catch (error) {
    console.error('Error updating notes:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update notes' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId } = body;

    if (!userId || !questionId) {
      return NextResponse.json(
        { success: false, message: 'User ID and Question ID required' },
        { status: 400 }
      );
    }

    const key = getBookmarkKey(userId, questionId);
    const existed = bookmarksStore.has(key);
    
    if (existed) {
      bookmarksStore.delete(key);
      console.log('🗑️ Deleted bookmark:', { userId, questionId });
      console.log('📊 Remaining bookmarks:', bookmarksStore.size);
    }

    return NextResponse.json({
      success: true,
      message: existed ? 'Bookmark deleted' : 'Bookmark not found'
    });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete bookmark' },
      { status: 500 }
    );
  }
}

