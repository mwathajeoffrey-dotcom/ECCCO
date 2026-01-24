import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * GET /api/whoami
 * Returns current user's Clerk ID and email
 * Helps identify your user ID to add to ADMIN_USER_IDS
 */
export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return NextResponse.json({ 
        error: "Not authenticated",
        message: "Please sign in first" 
      }, { status: 401 });
    }

    return NextResponse.json({
      clerkUserId: userId,
      email: user?.emailAddresses?.[0]?.emailAddress || null,
      firstName: user?.firstName || null,
      lastName: user?.lastName || null,
      fullName: user?.firstName && user?.lastName 
        ? `${user.firstName} ${user.lastName}` 
        : null,
      createdAt: user?.createdAt || null,
      message: "Copy the 'clerkUserId' value and add it to ADMIN_USER_IDS in your .env.local file"
    });

  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json({ 
      error: "Failed to fetch user information" 
    }, { status: 500 });
  }
}
