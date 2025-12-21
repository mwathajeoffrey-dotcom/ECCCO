import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/next-auth';

/**
 * Admin Authentication Middleware
 * Checks if user is authenticated and has admin privileges
 */
export async function checkAdminAuth(request: NextRequest) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session || !session.user) {
    return NextResponse.redirect(new URL('/login?redirect=/admin', request.url));
  }

  // Check if user has admin role
  const isAdmin = await checkIsAdmin(session.user);
  
  if (!isAdmin) {
    return NextResponse.redirect(new URL('/?error=unauthorized', request.url));
  }

  return NextResponse.next();
}

/**
 * Check if a user has admin privileges
 */
export async function checkIsAdmin(user: any): Promise<boolean> {
  if (!user) return false;

  // Method 1: Check user role from session
  if (user.role === 'admin' || user.role === 'ADMIN') {
    return true;
  }

  // Method 2: Check if email is in admin list (from environment variable)
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
  if (user.email && adminEmails.includes(user.email)) {
    return true;
  }

  // Method 3: Check for admin domain (e.g., @admin.eccco.com)
  if (user.email?.endsWith('@admin.eccco.com')) {
    return true;
  }

  // Method 4: Hardcoded admin emails for initial setup
  const defaultAdmins = [
    'admin@eccco.com',
    'jeffreymwatha@gmail.com', // Add your email here
  ];
  if (user.email && defaultAdmins.includes(user.email)) {
    return true;
  }

  return false;
}

/**
 * Get admin status for current session
 * Use this in API routes and server components
 */
export async function getAdminStatus() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { isAdmin: false, user: null, error: 'Not authenticated' };
    }

    const isAdmin = await checkIsAdmin(session.user);

    return { isAdmin, user: session.user, error: null };
  } catch (error) {
    return { isAdmin: false, user: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Protect API routes with admin check
 * Use in API route handlers
 */
export async function requireAdmin() {
  const { isAdmin, user } = await getAdminStatus();

  if (!isAdmin) {
    return {
      authorized: false,
      error: 'Unauthorized: Admin access required',
      user: null,
    };
  }

  return {
    authorized: true,
    error: null,
    user,
  };
}
