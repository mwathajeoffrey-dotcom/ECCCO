/**
 * Quick Admin User Setup Script
 * Run this to ensure ecccomedical@gmail.com is in the database with admin privileges
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupAdminUser() {
  try {
    console.log('🔍 Setting up admin user for ecccomedical@gmail.com...\n');

    // Get your Clerk User ID
    // You'll need to get this from Clerk Dashboard after signing in
    const clerkUserId = process.env.ADMIN_CLERK_USER_ID || 'REPLACE_WITH_CLERK_USER_ID';
    const adminEmail = 'ecccomedical@gmail.com';

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { clerkUserId },
      include: { UserProfile: true },
    });

    if (user) {
      console.log('✅ User already exists in database!');
      console.log(`   User ID: ${user.id}`);
      console.log(`   Clerk ID: ${user.clerkUserId}`);
      console.log(`   Email: ${user.email || 'Not set'}`);
      
      // Update email if not set
      if (!user.email || user.email !== adminEmail) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { email: adminEmail },
        });
        console.log(`✅ Updated email to: ${adminEmail}`);
      }
    } else {
      console.log('📝 Creating new admin user...');
      
      user = await prisma.user.create({
        data: {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          clerkUserId,
          email: adminEmail,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserProfile: {
            create: {
              id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              difficultyPreference: 'medium',
              preferredMode: 'practice',
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

      console.log('✅ Admin user created successfully!');
      console.log(`   User ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
    }

    console.log('\n✨ Admin setup complete!\n');
    console.log('Next steps:');
    console.log('1. Make sure ADMIN_EMAILS=ecccomedical@gmail.com is set in Vercel');
    console.log('2. Sign in to the app with ecccomedical@gmail.com');
    console.log('3. Visit /admin/dashboard to verify access\n');

  } catch (error) {
    console.error('❌ Error setting up admin user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

setupAdminUser();
