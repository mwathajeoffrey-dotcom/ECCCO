// API Route: Get study statistics
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStudyStats } from '@/lib/spacedRepetition';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Get study sessions (last 30 days for streak calculation)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const studySessions = await prisma.studySession.findMany({
      where: {
        userId,
        createdAt: { gte: thirtyDaysAgo },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get all bookmarks
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
    });

    // Calculate stats
    const stats = getStudyStats(studySessions, bookmarks);

    // Get activity by day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentSessions = studySessions.filter(s => 
      new Date(s.createdAt) >= sevenDaysAgo
    );

    const activityByDay = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const count = recentSessions.filter(s => {
        const sessionDate = new Date(s.createdAt);
        return sessionDate >= date && sessionDate < nextDate;
      }).length;
      
      return {
        date: date.toISOString().split('T')[0],
        count,
      };
    });

    return NextResponse.json({
      success: true,
      stats: {
        ...stats,
        activityByDay,
      },
    });
  } catch (error) {
    console.error('Error fetching study stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch study stats' },
      { status: 500 }
    );
  }
}
