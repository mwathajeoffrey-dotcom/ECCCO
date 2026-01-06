import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/feedback
 * Get all feedback messages (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const feedback = await prisma.feedback.findMany({
      orderBy: [
        { status: "asc" }, // new first
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}
