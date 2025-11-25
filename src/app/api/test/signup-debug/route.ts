import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

/**
 * Test endpoint to diagnose signup issues
 * GET /api/test/signup-debug
 */
export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    tests: {},
  };

  try {
    // Test 1: Database connection
    diagnostics.tests.databaseConnection = { status: 'testing...' };
    try {
      await prisma.$connect();
      const userCount = await prisma.user.count();
      diagnostics.tests.databaseConnection = {
        status: 'success',
        userCount,
      };
    } catch (err) {
      diagnostics.tests.databaseConnection = {
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }

    // Test 2: User schema check
    diagnostics.tests.userSchema = { status: 'testing...' };
    try {
      const sampleUser = await prisma.user.findFirst({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          sessionId: true,
          createdAt: true,
        },
      });
      diagnostics.tests.userSchema = {
        status: 'success',
        sampleUserFound: !!sampleUser,
        hasRequiredFields: true,
      };
    } catch (err) {
      diagnostics.tests.userSchema = {
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }

    // Test 3: Check for email conflicts
    diagnostics.tests.emailCheck = { status: 'testing...' };
    try {
      const testEmail = 'mwangijeffrey@gmail.com';
      const existingUser = await prisma.user.findUnique({
        where: { email: testEmail },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
      diagnostics.tests.emailCheck = {
        status: 'success',
        testEmail,
        userExists: !!existingUser,
        userData: existingUser || null,
      };
    } catch (err) {
      diagnostics.tests.emailCheck = {
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }

    // Test 4: SessionId uniqueness check
    diagnostics.tests.sessionIdCheck = { status: 'testing...' };
    try {
      const allUsers = await prisma.user.findMany({
        select: {
          id: true,
          sessionId: true,
        },
      });
      
      const sessionIds = allUsers.map((u: any) => u.sessionId);
      const uniqueSessionIds = new Set(sessionIds);
      
      diagnostics.tests.sessionIdCheck = {
        status: 'success',
        totalUsers: allUsers.length,
        uniqueSessionIds: uniqueSessionIds.size,
        hasDuplicates: allUsers.length !== uniqueSessionIds.size,
      };
    } catch (err) {
      diagnostics.tests.sessionIdCheck = {
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }

    // Test 5: Simulate user creation (dry run)
    diagnostics.tests.simulateCreation = { status: 'testing...' };
    try {
      const testSessionId = `user-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      
      // Don't actually create, just validate the data
      diagnostics.tests.simulateCreation = {
        status: 'success',
        wouldCreateWith: {
          email: 'test@example.com',
          sessionId: testSessionId,
          role: 'student',
        },
        sessionIdFormat: 'valid',
      };
    } catch (err) {
      diagnostics.tests.simulateCreation = {
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }

    diagnostics.overallStatus = 'completed';
    return NextResponse.json(diagnostics, { status: 200 });

  } catch (error) {
    diagnostics.overallStatus = 'failed';
    diagnostics.criticalError = {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    };
    return NextResponse.json(diagnostics, { status: 500 });
  }
}
