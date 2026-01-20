import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface ErrorReport {
  type: 'network' | 'component' | 'api';
  message: string;
  stack?: string;
  timestamp: number;
  sessionId: string;
  userAgent: string;
  url: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
  userId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const errorReport: ErrorReport = await request.json();
    
    // Validate the error report
    if (!errorReport.message || !errorReport.type || !errorReport.sessionId) {
      return NextResponse.json(
        { error: 'Invalid error report format' },
        { status: 400 }
      );
    }

    // Get additional context from headers
    const headersList = await headers();
    const clientIP = headersList.get('x-forwarded-for') || 
                     headersList.get('x-real-ip') || 
                     'unknown';
    
    // Enhance error report with server-side data
    const enhancedReport = {
      ...errorReport,
      receivedAt: new Date().toISOString(),
      clientIP: clientIP.split(',')[0].trim(), // Take first IP if multiple
      serverTimestamp: Date.now()
    };

    // Log error based on severity
    if (errorReport.severity === 'critical' || errorReport.severity === 'high') {
      const error = errorReport.stack 
        ? new Error(errorReport.message)
        : undefined;
      if (error && errorReport.stack) {
        error.stack = errorReport.stack;
      }
      logger.error('Critical/High severity error', error, enhancedReport as Record<string, any>);
    } else {
      logger.warn('Error reported', enhancedReport as Record<string, any>);
    }

    // In production, you would typically:
    // 1. Store in database
    // 2. Send to external monitoring service (Sentry, LogRocket, etc.)
    // 3. Alert team for critical errors
    // 4. Aggregate for analytics
    
    if (process.env.NODE_ENV === 'production') {
      // Example: Store in database
      // await prisma.errorLog.create({ data: enhancedReport });
      
      // Example: Send to external service
      // await sendToMonitoringService(enhancedReport);
      
      // Example: Send critical alerts
      if (errorReport.severity === 'critical') {
        // await sendCriticalAlert(enhancedReport);
      }
    }

    // Return success response
    return NextResponse.json({ 
      success: true, 
      errorId: `err_${errorReport.sessionId}_${Date.now()}` 
    });

  } catch (error) {
    logger.error('Failed to process error report:', error instanceof Error ? error : new Error(String(error)));
    
    return NextResponse.json(
      { error: 'Failed to process error report' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'error-reporting',
    timestamp: new Date().toISOString()
  });
}