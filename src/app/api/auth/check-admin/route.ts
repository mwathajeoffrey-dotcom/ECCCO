import { logger } from '@/lib/logger';
import { NextResponse } from "next/server";
import { getAdminStatus } from "@/lib/auth/admin";

// Force dynamic rendering
export const dynamic = "force-dynamic";

/**
 * API route to check if the current user has admin access
 * Used by admin pages to determine access
 */
export async function GET() {
  try {
    const status = await getAdminStatus();

    return NextResponse.json({
      isAdmin: status.isAdmin,
      userId: status.userId,
      error: status.error,
    });
  } catch (error) {
    logger.error("Error checking admin status:", error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json(
      {
        isAdmin: false,
        error: "Failed to check admin status",
      },
      { status: 500 }
    );
  }
}
