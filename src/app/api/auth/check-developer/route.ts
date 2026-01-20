import { logger } from '@/lib/logger';
import { NextResponse } from "next/server";
import { isDeveloper } from "@/lib/auth/developer";

// Force dynamic rendering
export const dynamic = "force-dynamic";

/**
 * API route to check if the current user has developer access
 * Used by the guidelines page to determine access
 */
export async function GET() {
  try {
    const hasDeveloperAccess = await isDeveloper();

    return NextResponse.json({
      isDeveloper: hasDeveloperAccess,
    });
  } catch (error) {
    logger.error("Error checking developer status:", error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json(
      {
        isDeveloper: false,
        error: "Failed to check developer status",
      },
      { status: 500 }
    );
  }
}
