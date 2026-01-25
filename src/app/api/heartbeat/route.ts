import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Heartbeat endpoint to track active users
 * Called every 30 seconds from the client to update lastSeenAt
 */
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update or create user with current timestamp
    await prisma.user.upsert({
      where: { clerkUserId: user.id },
      update: {
        updatedAt: new Date(), // This acts as "lastSeenAt"
      },
      create: {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        clerkUserId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Heartbeat error:", error);
    return NextResponse.json({ error: "Failed to update heartbeat" }, { status: 500 });
  }
}
