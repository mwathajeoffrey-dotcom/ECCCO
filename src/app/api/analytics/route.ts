import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Get IP address for geolocation (if not provided by client)
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded || realIp || 'unknown';
    
    // Create analytics event
    await prisma.analyticsEvent.create({
      data: {
        sessionId: data.sessionId,
        eventType: data.eventType,
        eventData: data.eventData,
        deviceInfo: data.deviceInfo,
        userAgent: data.userAgent,
        ipAddress: hashIP(ip), // Hash IP for privacy
        location: data.location,
        screenSize: data.screenSize,
        timezone: data.timezone,
        referrer: data.referrer
      }
    });

    // Update daily stats if it's a significant event
    if (['page_view', 'exam_start', 'exam_complete'].includes(data.eventType)) {
      await updateDailyStats(data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7'; // days
    const type = searchParams.get('type') || 'overview';

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    switch (type) {
      case 'overview':
        return getOverviewStats(startDate, endDate);
      case 'devices':
        return getDeviceStats(startDate, endDate);
      case 'locations':
        return getLocationStats(startDate, endDate);
      case 'topics':
        return getTopicStats(startDate, endDate);
      default:
        return NextResponse.json({ error: 'Invalid stats type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Analytics GET API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

async function updateDailyStats(data: any) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    // Get or create daily stats record
    const dailyStats = await prisma.dailyStats.upsert({
      where: { date: today },
      update: {},
      create: {
        date: today,
        uniqueDevices: 0,
        totalSessions: 0,
        examsStarted: 0,
        examsCompleted: 0
      }
    });

    // Update counters based on event type
    const updates: any = {};
    
    if (data.eventType === 'page_view') {
      // Count unique sessions for the day
      const uniqueSessions = await prisma.analyticsEvent.groupBy({
        by: ['sessionId'],
        where: {
          createdAt: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
          }
        }
      });
      updates.totalSessions = uniqueSessions.length;
    }
    
    if (data.eventType === 'exam_start') {
      updates.examsStarted = { increment: 1 };
    }
    
    if (data.eventType === 'exam_complete') {
      updates.examsCompleted = { increment: 1 };
    }

    if (Object.keys(updates).length > 0) {
      await prisma.dailyStats.update({
        where: { date: today },
        data: updates
      });
    }
  } catch (error) {
    console.error('Failed to update daily stats:', error);
  }
}

async function getOverviewStats(startDate: Date, endDate: Date) {
  // Get unique sessions and devices
  const sessions = await prisma.analyticsEvent.groupBy({
    by: ['sessionId'],
    where: {
      createdAt: { gte: startDate, lte: endDate }
    }
  });

  const examsStarted = await prisma.analyticsEvent.count({
    where: {
      eventType: 'exam_start',
      createdAt: { gte: startDate, lte: endDate }
    }
  });

  const examsCompleted = await prisma.analyticsEvent.count({
    where: {
      eventType: 'exam_complete',
      createdAt: { gte: startDate, lte: endDate }
    }
  });

  const pageViews = await prisma.analyticsEvent.count({
    where: {
      eventType: 'page_view',
      createdAt: { gte: startDate, lte: endDate }
    }
  });

  return NextResponse.json({
    uniqueDevices: sessions.length,
    pageViews,
    examsStarted,
    examsCompleted,
    completionRate: examsStarted > 0 ? (examsCompleted / examsStarted * 100).toFixed(1) : 0
  });
}

async function getDeviceStats(startDate: Date, endDate: Date) {
  const deviceEvents = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'page_view',
      createdAt: { gte: startDate, lte: endDate },
      deviceInfo: { not: null }
    },
    select: {
      deviceInfo: true,
      sessionId: true
    }
  });

  const deviceCounts: Record<string, number> = {};
  const osCounts: Record<string, number> = {};
  const browserCounts: Record<string, number> = {};
  const uniqueSessions = new Set();

  deviceEvents.forEach(event => {
    if (uniqueSessions.has(event.sessionId)) return;
    uniqueSessions.add(event.sessionId);

    try {
      const device = JSON.parse(event.deviceInfo || '{}');
      deviceCounts[device.type] = (deviceCounts[device.type] || 0) + 1;
      osCounts[device.os] = (osCounts[device.os] || 0) + 1;
      browserCounts[device.browser] = (browserCounts[device.browser] || 0) + 1;
    } catch (e) {
      // Skip invalid JSON
    }
  });

  return NextResponse.json({
    devices: deviceCounts,
    operatingSystems: osCounts,
    browsers: browserCounts
  });
}

async function getLocationStats(startDate: Date, endDate: Date) {
  const locationEvents = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'page_view',
      createdAt: { gte: startDate, lte: endDate },
      location: { not: null }
    },
    select: {
      location: true,
      sessionId: true
    }
  });

  const countryCounts: Record<string, number> = {};
  const cityCounts: Record<string, number> = {};
  const uniqueSessions = new Set();

  locationEvents.forEach(event => {
    if (uniqueSessions.has(event.sessionId)) return;
    uniqueSessions.add(event.sessionId);

    try {
      const location = JSON.parse(event.location || '{}');
      if (location.country) {
        countryCounts[location.country] = (countryCounts[location.country] || 0) + 1;
      }
      if (location.city && location.country) {
        const cityKey = `${location.city}, ${location.country}`;
        cityCounts[cityKey] = (cityCounts[cityKey] || 0) + 1;
      }
    } catch (e) {
      // Skip invalid JSON
    }
  });

  return NextResponse.json({
    countries: countryCounts,
    cities: cityCounts
  });
}

async function getTopicStats(startDate: Date, endDate: Date) {
  const topicEvents = await prisma.analyticsEvent.findMany({
    where: {
      eventType: { in: ['exam_start', 'topic_selected'] },
      createdAt: { gte: startDate, lte: endDate },
      eventData: { not: null }
    },
    select: {
      eventData: true,
      eventType: true
    }
  });

  const topicCounts: Record<string, { starts: number; selections: number; name: string }> = {};

  topicEvents.forEach(event => {
    try {
      const data = JSON.parse(event.eventData || '{}');
      if (data.topicId) {
        if (!topicCounts[data.topicId]) {
          topicCounts[data.topicId] = { starts: 0, selections: 0, name: data.topicName || data.topicId };
        }
        
        if (event.eventType === 'exam_start') {
          topicCounts[data.topicId].starts++;
        } else if (event.eventType === 'topic_selected') {
          topicCounts[data.topicId].selections++;
        }
      }
    } catch (e) {
      // Skip invalid JSON
    }
  });

  return NextResponse.json(topicCounts);
}

// Simple hash function for IP addresses (for privacy)
function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}