// Developer check helper for Clerk authentication
import { auth } from '@clerk/nextjs/server';

/**
 * Check if the current user is a developer
 * In production, check against a list of developer user IDs or use Clerk roles
 */
export async function isDeveloper(): Promise<boolean> {
  const { userId } = await auth();
  
  if (!userId) {
    return false;
  }

  // TODO: In production, add proper developer role checking
  // For example:
  // const devUserIds = process.env.DEVELOPER_USER_IDS?.split(',') || [];
  // return devUserIds.includes(userId);
  
  // For now, any authenticated user has developer access
  return true;
}
