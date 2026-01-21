import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    // Simulate a server error
    const data: any = null;
    
    // This will throw a TypeError
    const result = data.nonExistentProperty.someMethod();
    
    return NextResponse.json({ result });
  } catch (error) {
    // Capture the error with context
    Sentry.captureException(error, {
      tags: {
        test_type: 'server_error',
        endpoint: '/api/test-sentry-error',
      },
      extra: {
        timestamp: new Date().toISOString(),
        message: 'This is a test server error',
      },
    });

    return NextResponse.json(
      { 
        message: '✅ Server error captured! Check Sentry dashboard in a few seconds.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 200 } // Return 200 so we can show the success message
    );
  }
}
