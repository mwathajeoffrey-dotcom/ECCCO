import 'dotenv/config';
import { prisma } from './src/lib/prisma';

async function checkUsers() {
  try {
    console.log('🔍 Checking users in database...\n');

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        clerkUserId: true,
        email: true,
        createdAt: true,
      },
    });

    console.log(`📊 Total users: ${users.length}\n`);

    if (users.length === 0) {
      console.log('❌ No users found in database!');
      console.log('This is why the admin dashboard shows 0 users.');
    } else {
      console.log('Users in database:');
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.email || 'No email'}`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Clerk ID: ${user.clerkUserId}`);
        console.log(`   Created: ${user.createdAt}`);
      });
    }

    // Check Clerk user IDs
    console.log('\n\n🔑 Admin Clerk User IDs from .env.local:');
    console.log('ADMIN_USER_IDS:', process.env.ADMIN_USER_IDS);
    console.log('ADMIN_EMAILS:', process.env.ADMIN_EMAILS);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
