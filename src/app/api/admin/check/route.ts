import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminStatus } from '@/lib/auth/admin';

/**
 * GET /api/admin/check
 * Check if the current user has admin privileges
 * Returns: { isAdmin: boolean, user: object | null, error: string | null }
 */
export async function GET(request: NextRequest) {
  try {
    const { isAdmin, user, error } = await getAdminStatus();

    if (error) {
      return NextResponse.json(
        { isAdmin: false, user: null, error },
        { status: 401 }
      );
    }

    return NextResponse.json({
      isAdmin,
      user: user
        ? {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        : null,
      error: null,
    });
  } catch (error) {
    logger.error('Admin check error:', error);
    return NextResponse.json(
      {
        isAdmin: false,
        user: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
