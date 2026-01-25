/**
 * One-time script to sync existing Clerk users to database
 *
 * This will fetch all users from Clerk and create them in the database
 * if they don't already exist.
 *
 * Run with: npx tsx sync-clerk-users.ts
 */

import "dotenv/config";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "./src/lib/prisma";

async function syncClerkUsers() {
  console.log("🔄 Starting Clerk user sync...\n");

  try {
    // Fetch all users from Clerk
    console.log("📥 Fetching users from Clerk...");
    const clerk = await clerkClient();
    const clerkUsers = await clerk.users.getUserList({
      limit: 100, // Adjust if you have more users
    });

    console.log(`✅ Found ${clerkUsers.data.length} users in Clerk\n`);

    let created = 0;
    let existing = 0;
    let errors = 0;

    // Create each user in database
    for (const clerkUser of clerkUsers.data) {
      const userId = clerkUser.id;
      const email = clerkUser.emailAddresses[0]?.emailAddress || "";
      const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User";

      try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (existingUser) {
          console.log(`⏭️  User already exists: ${email} (${userId})`);
          existing++;
        } else {
          // Create user
          const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

          await prisma.user.create({
            data: {
              id: userId,
              clerkUserId: userId,
              email,
              updatedAt: new Date(),
            },
          });

          console.log(`✅ Created user: ${email} (${userId})`);
          created++;
        }
      } catch (error) {
        console.error(`❌ Error processing user ${email}:`, error);
        errors++;
      }
    }

    console.log("\n📊 Sync Summary:");
    console.log(`   ✅ Created: ${created} users`);
    console.log(`   ⏭️  Skipped (already exist): ${existing} users`);
    console.log(`   ❌ Errors: ${errors} users`);
    console.log(`   📈 Total processed: ${clerkUsers.data.length} users`);

    console.log("\n✨ Sync complete!");

    // Verify database count
    const totalUsers = await prisma.user.count();
    console.log(`\n🗄️  Total users in database: ${totalUsers}`);
  } catch (error: any) {
    console.error("❌ Sync failed:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

syncClerkUsers();
