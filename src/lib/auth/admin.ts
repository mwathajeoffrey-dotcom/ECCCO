// Simple admin helper for Clerk authentication
import { auth } from '@clerk/nextjs/server';

/**
 * Check if the current user is authenticated
 * In production, you would check against a list of admin user IDs or roles
 * For now, any authenticated user is considered "authorized" for admin routes
 */
export async function requireAdmin() {
  const { userId } = await auth();
  
  if (!userId) {
    return {
      authorized: false,
      error: 'Unauthorized - Authentication required',
      user: null
    };
  }

  // TODO: In production, add proper admin role checking here
  // For example, check if userId is in an admin list or has admin role in Clerk
  // const adminUserIds = process.env.ADMIN_USER_IDS?.split(',') || [];
  // if (!adminUserIds.includes(userId)) {
  //   return { authorized: false, error: 'Insufficient permissions', user: null };
  // }

  return {
    authorized: true,
    error: null,
    user: { id: userId }
  };
}

/**
 * Check admin status without throwing
 */
export async function getAdminStatus() {
  const { userId } = await auth();
  
  if (!userId) {
    return {
      isAdmin: false,
      userId: null,
      user: null,
      error: 'Not authenticated'
    };
  }

  return {
    isAdmin: true, // TODO: Add proper admin check
    userId: userId,
    user: { id: userId, email: null, name: null, role: 'user' }, // TODO: Fetch from Clerk
    error: null
  };
}
