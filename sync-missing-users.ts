import 'dotenv/config';
import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from './src/lib/prisma';

async function syncMissingUsers() {
  console.log('🔄 Syncing missing Clerk users to database...\n');

  try {
    const clerk = await clerkClient();
    const clerkUsers = await clerk.users.getUserList({ limit: 100 });
    
    console.log(`Found ${clerkUsers.data.length} users in Clerk\n`);

    for (const clerkUser of clerkUsers.data) {
      const clerkUserId = clerkUser.id;
      const email = clerkUser.emailAddresses[0]?.emailAddress || '';

      // Check if user exists in database
      const existingUser = await prisma.user.findUnique({
        where: { clerkUserId },
      });

      if (existingUser) {
        console.log(`✅ Already synced: ${email} (${clerkUserId})`);
      } else {
        // Create user
        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        await prisma.user.create({
          data: {
            id: userId,
            clerkUserId,
            email,
            updatedAt: new Date(),
          },
        });

        console.log(`🆕 Created: ${email} (${clerkUserId})`);
      }
    }

    const totalUsers = await prisma.user.count();
    console.log(`\n✅ Sync complete! Total users in database: ${totalUsers}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncMissingUsers();
