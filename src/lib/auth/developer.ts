// Developer authorization helper with proper security checks
import { auth } from "@clerk/nextjs/server";

/**
 * Developer Authorization Helper
 *
 * SECURITY: Only users with Clerk user IDs listed in DEVELOPER_USER_IDS environment
 * variable are granted developer access. Add your developer user IDs to .env.local:
 *
 * DEVELOPER_USER_IDS=user_xxxxx,user_yyyyy,user_zzzzz
 *
 * Get user IDs from: Clerk Dashboard > Users > click on user > copy User ID
 */
export async function isDeveloper(): Promise<boolean> {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  // Get developer user IDs from environment variable
  const devUserIds = process.env.DEVELOPER_USER_IDS?.split(",").map((id) => id.trim()) || [];

  // SECURITY FIX: Actually check if user is in developer list
  return devUserIds.includes(userId);
}

/**
 * Check if a specific user ID is a developer (without requiring authentication context)
 */
export function isUserDeveloper(userId: string): boolean {
  const devUserIds = process.env.DEVELOPER_USER_IDS?.split(",").map((id) => id.trim()) || [];
  return devUserIds.includes(userId);
}

/**
 * Require developer access (throws error if not authorized)
 */
export async function requireDeveloper() {
  const { userId } = await auth();

  if (!userId) {
    return {
      authorized: false,
      error: "Unauthorized - Please sign in",
      user: null,
    };
  }

  const devUserIds = process.env.DEVELOPER_USER_IDS?.split(",").map((id) => id.trim()) || [];
  const isDev = devUserIds.includes(userId);

  if (!isDev) {
    return {
      authorized: false,
      error: "Forbidden - Developer access required",
      user: null,
    };
  }

  return {
    authorized: true,
    error: null,
    user: { id: userId },
  };
}
