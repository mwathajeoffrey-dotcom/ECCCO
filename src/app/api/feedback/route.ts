import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/feedback
 * Submit user feedback/support message
 */
export async function POST(request: NextRequest) {
  try {
    console.log('[Feedback API] Received submission request');
    console.log('[Feedback API] Environment check - DATABASE_URL exists:', !!process.env.DATABASE_URL);
    
    const body = await request.json();
    console.log('[Feedback API] Request body:', { ...body, message: body.message?.substring(0, 50) + '...' });
    
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
      console.log('[Feedback API] Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'Email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      console.log('[Feedback API] Validation failed - invalid email format:', userEmail);
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('[Feedback API] Validation passed, creating feedback entry...');

    // Create feedback entry
    const feedback = await prisma.feedback.create({
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

    console.log('[Feedback API] Feedback created successfully with ID:', feedback.id);

    // TODO: Send email notification to admin
    // await sendAdminNotification(feedback);

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
      id: feedback.id,
    });
  } catch (error) {
    console.error('[Feedback API] Error submitting feedback:', error);
    console.error('[Feedback API] Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to submit feedback',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/feedback
 * Health check endpoint to test database connection
 */
export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    const feedbackCount = await prisma.feedback.count();
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      feedbackCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Feedback API] Health check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
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
