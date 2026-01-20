import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering - this route needs database access
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/profile
 * Get the current user's profile and preferences
 */
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: { UserProfile: true },
    });

    if (!user) {
      // Create user if doesn't exist (first time login)
      user = await prisma.user.create({
        data: {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          clerkUserId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserProfile: {
            create: {
              id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              // Default preferences
              difficultyPreference: "medium",
              preferredMode: "practice",
              dailyGoal: 10,
              emailNotifications: true,
              weeklyDigest: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        include: { UserProfile: true },
      });
    } else if (!user.UserProfile) {
      // Create profile if user exists but profile doesn't
      await prisma.userProfile.create({
        data: {
          id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: user.id,
          difficultyPreference: "medium",
          preferredMode: "practice",
          dailyGoal: 10,
          emailNotifications: true,
          weeklyDigest: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // Refetch user with profile
      user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
        include: { UserProfile: true },
      });
    }

    return NextResponse.json({
      success: true,
      user,
      profile: user?.UserProfile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

/**
 * PUT /api/profile
 * Update the current user's profile and preferences
 */
export async function PUT(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          clerkUserId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    // Update email if provided
    if (data.email && data.email !== user.email) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: data.email,
          updatedAt: new Date(),
        },
      });
    }

    // Update or create profile
    const profileData = {
      specialty: data.specialty,
      experienceLevel: data.experienceLevel,
      organization: data.organization,
      role: data.role,
      focusAreas: data.focusAreas ? JSON.stringify(data.focusAreas) : null,
      difficultyPreference: data.difficultyPreference || "medium",
      studyGoals: data.studyGoals,
      preferredMode: data.preferredMode || "practice",
      dailyGoal: data.dailyGoal || 10,
      emailNotifications: data.emailNotifications ?? true,
      weeklyDigest: data.weeklyDigest ?? true,
    };

    const profile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      create: {
        id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...profileData,
      },
      update: {
        ...profileData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
