import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * POST /api/feedback
 * Submit user feedback/support message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userName,
      userEmail,
      type,
      category = 'general',
      subject,
      message,
      pageUrl,
      userAgent,
    } = body;

    // Validation
    if (!userEmail || !subject || !message) {
      return NextResponse.json(
        { error: 'Email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create feedback entry
    const feedback = await (prisma as any).feedback.create({
      data: {
        userName: userName || null,
        userEmail,
        type: type || 'question',
        category,
        subject,
        message,
        pageUrl: pageUrl || null,
        userAgent: userAgent || null,
        status: 'new',
        priority: determinePriority(type),
      },
    });

    // TODO: Send email notification to admin
    // await sendAdminNotification(feedback);

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
      id: feedback.id,
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

/**
 * Determine priority based on feedback type
 */
function determinePriority(type: string): string {
  switch (type) {
    case 'bug':
      return 'high';
    case 'feature':
      return 'medium';
    case 'question':
      return 'medium';
    case 'complaint':
      return 'high';
    case 'praise':
      return 'low';
    default:
      return 'medium';
  }
}
