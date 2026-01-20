import { logger } from '@/lib/logger';
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * GET /api/auth/my-user-id
 * Simple route to display your Clerk user ID
 * Use this to get your user ID for environment variables
 */
export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Not authenticated",
          message: "Please sign in first",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        userId: userId,
        email: user?.emailAddresses[0]?.emailAddress || "N/A",
        firstName: user?.firstName || "N/A",
        lastName: user?.lastName || "N/A",
        instructions: [
          "1. Copy the userId below",
          "2. Add to .env.local:",
          `   ADMIN_USER_IDS=${userId}`,
          `   DEVELOPER_USER_IDS=${userId}`,
          "3. Restart your dev server (npm run dev)",
          "4. Add the same variables to Vercel environment settings",
        ],
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error getting user ID:", error);
    return NextResponse.json(
      {
        error: "Failed to get user ID",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
