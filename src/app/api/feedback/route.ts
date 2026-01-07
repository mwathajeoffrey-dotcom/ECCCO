import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { z } from "zod";

// Validation schema using Zod for better error messages
const FeedbackSchema = z.object({
  userName: z.string().min(1).max(100).optional(),
  userEmail: z.string().email("Invalid email address"),
  type: z.enum(["bug", "feature", "question", "complaint"]).default("question"),
  category: z.string().default("general"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  pageUrl: z.string().url().optional().nullable(),
  userAgent: z.string().optional().nullable(),
});

/**
 * POST /api/feedback
 * Submit user feedback/support message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate with Zod (provides specific error messages)
    const validatedData = FeedbackSchema.parse(body);
    
    // Create feedback entry
    const feedback = await prisma.feedback.create({
      data: {
        id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userName: validatedData.userName || null,
        userEmail: validatedData.userEmail,
        type: validatedData.type,
        category: validatedData.category,
        subject: validatedData.subject,
        message: validatedData.message,
        pageUrl: validatedData.pageUrl || null,
        userAgent: validatedData.userAgent || null,
        status: "new",
        priority: determinePriority(validatedData.type),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Send admin notification (async, don't block response)
    sendAdminNotification(feedback).catch(err => 
      logger.error('Failed to send admin notification', err instanceof Error ? err : undefined, {
        feedbackId: feedback.id
      })
    );

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully",
      id: feedback.id,
    });
    
  } catch (error) {
    // Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }
    
    // Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: "Duplicate feedback submission detected" },
          { status: 409 }
        );
      }
    }
    
    if (error instanceof Prisma.PrismaClientInitializationError) {
      logger.error('Database connection failed in feedback API', error);
      return NextResponse.json(
        { error: "Database temporarily unavailable. Please try again." },
        { status: 503 }
      );
    }
    
    // Unknown errors
    logger.error('Feedback submission failed', error instanceof Error ? error : undefined, {
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
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
      status: "ok",
      database: "connected",
      feedbackCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Feedback API health check failed', error instanceof Error ? error : undefined);
    
    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
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
    case "bug":
      return "high";
    case "feature":
      return "medium";
    case "question":
      return "medium";
    case "complaint":
      return "high";
    case "praise":
      return "low";
    default:
      return "medium";
  }
}

/**
 * Send admin notification about new feedback
 * TODO: Implement email service integration (SendGrid, AWS SES, or Resend)
 */
async function sendAdminNotification(feedback: {
  id: string;
  userEmail: string;
  type: string;
  subject: string;
  message: string;
}) {
  // For now, just log that notification would be sent
  logger.info('Admin notification triggered', {
    feedbackId: feedback.id,
    type: feedback.type,
    subject: feedback.subject,
    userEmail: feedback.userEmail
  });
  
  // Example implementation when ready:
  // const response = await fetch('/api/send-email', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     to: process.env.ADMIN_EMAIL,
  //     subject: `New ${feedback.type}: ${feedback.subject}`,
  //     body: `From: ${feedback.userEmail}\n\n${feedback.message}\n\nFeedback ID: ${feedback.id}`
  //   })
  // });
}
