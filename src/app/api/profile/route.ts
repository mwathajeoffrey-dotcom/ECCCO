import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/profile
 * Get the current user's profile and preferences
 */
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: { profile: true }
    });

    if (!user) {
      // Create user if doesn't exist (first time login)
      user = await prisma.user.create({
        data: {
          clerkUserId: userId,
          profile: {
            create: {
              // Default preferences
              difficultyPreference: 'medium',
              preferredMode: 'practice',
              dailyGoal: 10,
              emailNotifications: true,
              weeklyDigest: true
            }
          }
        },
        include: { profile: true }
      });
    } else if (!user.profile) {
      // Create profile if user exists but profile doesn't
      await prisma.userProfile.create({
        data: {
          userId: user.id,
          difficultyPreference: 'medium',
          preferredMode: 'practice',
          dailyGoal: 10,
          emailNotifications: true,
          weeklyDigest: true
        }
      });
      
      // Refetch user with profile
      user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
        include: { profile: true }
      });
    }

    return NextResponse.json({
      success: true,
      user,
      profile: user?.profile
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
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
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId }
    });

    if (!user) {
      user = await prisma.user.create({
        data: { clerkUserId: userId }
      });
    }

    // Update email if provided
    if (data.email && data.email !== user.email) {
      await prisma.user.update({
        where: { id: user.id },
        data: { email: data.email }
      });
    }

    // Update or create profile
    const profileData = {
      specialty: data.specialty,
      experienceLevel: data.experienceLevel,
      organization: data.organization,
      role: data.role,
      focusAreas: data.focusAreas ? JSON.stringify(data.focusAreas) : null,
      difficultyPreference: data.difficultyPreference || 'medium',
      studyGoals: data.studyGoals,
      preferredMode: data.preferredMode || 'practice',
      dailyGoal: data.dailyGoal || 10,
      emailNotifications: data.emailNotifications ?? true,
      weeklyDigest: data.weeklyDigest ?? true
    };

    const profile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        ...profileData
      },
      update: profileData
    });

    return NextResponse.json({
      success: true,
      profile
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
