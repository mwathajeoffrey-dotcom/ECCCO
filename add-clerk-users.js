/**
 * Simple script to manually add Clerk users to database
 * Run with: node add-clerk-users.js
 */

require("dotenv").config({ path: ".env.local" });

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

// Initialize Prisma with pg adapter
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Your 4 Clerk users (from the screenshot you showed)
const clerkUsers = [
  {
    clerkUserId: "user_38h8JFtkVdyi8TPrzVvp5wrlE6S",
    email: "ecccomedical@gmail.com",
  },
  {
    clerkUserId: "user_371H3N8bQ5kWMu1ExtSo5nf48AV",
    email: "mwathajeoffrey@gmail.com",
  },
  {
    clerkUserId: "user_37bCovuDEScNyzg6A9wSJ5vAsRv",
    email: "mwangijeoffrey@gmail.com",
  },
  {
    clerkUserId: "user_38gz7Cb4twPyDHC8HDPOzxgGiMT",
    email: "ogerofrancisca@gmail.com",
  },
];

async function syncUsers() {
  console.log("🔄 Syncing Clerk users to database...\n");

  let created = 0;
  let existing = 0;
  let errors = 0;

  for (const clerkUser of clerkUsers) {
    try {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { clerkUserId: clerkUser.clerkUserId },
      });

      if (existingUser) {
        console.log(`⏭️  Already exists: ${clerkUser.email}`);
        existing++;
      } else {
        // Create user
        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        await prisma.user.create({
          data: {
            id: userId,
            clerkUserId: clerkUser.clerkUserId,
            email: clerkUser.email,
            updatedAt: new Date(),
          },
        });

        console.log(`✅ Created: ${clerkUser.email}`);
        created++;
      }
    } catch (error) {
      console.error(`❌ Error syncing ${clerkUser.email}:`, error.message);
      errors++;
    }
  }

  console.log("\n📊 Summary:");
  console.log(`   ✅ Created: ${created}`);
  console.log(`   ⏭️  Already existed: ${existing}`);
  console.log(`   ❌ Errors: ${errors}`);

  // Verify total count
  const totalUsers = await prisma.user.count();
  console.log(`\n🗄️  Total users in database: ${totalUsers}`);

  await prisma.$disconnect();
  process.exit(0);
}

syncUsers().catch((error) => {
  console.error("❌ Sync failed:", error);
  process.exit(1);
});
