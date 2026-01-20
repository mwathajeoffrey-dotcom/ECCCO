// Admin authorization helper with proper security checks
import { auth } from "@clerk/nextjs/server";

/**
 * Admin Authorization Helper
 *
 * SECURITY: Only users with Clerk user IDs listed in ADMIN_USER_IDS environment
 * variable are granted admin access. Add your admin user IDs to .env.local:
 *
 * ADMIN_USER_IDS=user_xxxxx,user_yyyyy,user_zzzzz
 *
 * Get user IDs from: Clerk Dashboard > Users > click on user > copy User ID
 */
export async function requireAdmin() {
  const { userId } = await auth();

  if (!userId) {
    return {
      authorized: false,
      error: "Unauthorized - Authentication required",
      user: null,
    };
  }

  // Get admin user IDs from environment variable
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(",").map((id) => id.trim()) || [];

  // SECURITY FIX: Actually check if user is in admin list
  const isAdmin = adminUserIds.includes(userId);

  if (!isAdmin) {
    return {
      authorized: false,
      error: "Forbidden - Admin access required",
      user: null,
    };
  }

  return {
    authorized: true,
    error: null,
    user: { id: userId },
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
      error: "Not authenticated",
    };
  }

  // Get admin user IDs from environment variable
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(",").map((id) => id.trim()) || [];
  const isAdmin = adminUserIds.includes(userId);

  return {
    isAdmin: isAdmin,
    userId: userId,
    user: { id: userId, email: null, name: null, role: isAdmin ? "admin" : "user" },
    error: null,
  };
}

/**
 * Check if a specific user ID is an admin (without requiring authentication context)
 */
export function isUserAdmin(userId: string): boolean {
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(",").map((id) => id.trim()) || [];
  return adminUserIds.includes(userId);
}
