import "dotenv/config";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "./src/lib/prisma";

async function compareClerkAndDatabase() {
  console.log("🔍 Comparing Clerk users with Database users...\n");

  try {
    // Get Clerk users
    console.log("📥 Fetching users from Clerk...");
    const clerk = await clerkClient();
    const clerkUsers = await clerk.users.getUserList({ limit: 100 });

    console.log(`✅ Found ${clerkUsers.data.length} users in Clerk\n`);
    console.log("Clerk Users:");
    clerkUsers.data.forEach((user, index) => {
      const email = user.emailAddresses[0]?.emailAddress || "No email";
      console.log(`${index + 1}. ${email}`);
      console.log(`   Clerk ID: ${user.id}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log("");
    });

    // Get Database users
    console.log("\n📊 Fetching users from Database...");
    const dbUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log(`✅ Found ${dbUsers.length} users in Database\n`);
    console.log("Database Users:");
    dbUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email || "No email"}`);
      console.log(`   Database ID: ${user.id}`);
      console.log(`   Clerk ID: ${user.clerkUserId}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log("");
    });

    // Compare
    console.log("\n🔄 Comparison:");
    const clerkUserIds = new Set(clerkUsers.data.map((u) => u.id));
    const dbClerkIds = new Set(dbUsers.map((u) => u.clerkUserId));

    console.log("\n❌ Users in Clerk but NOT in Database:");
    clerkUsers.data.forEach((clerkUser) => {
      if (!dbClerkIds.has(clerkUser.id)) {
        const email = clerkUser.emailAddresses[0]?.emailAddress || "No email";
        console.log(`   - ${email} (${clerkUser.id})`);
      }
    });

    console.log("\n❌ Users in Database but NOT in Clerk:");
    dbUsers.forEach((dbUser) => {
      if (!clerkUserIds.has(dbUser.clerkUserId)) {
        console.log(`   - ${dbUser.email || "No email"} (${dbUser.clerkUserId})`);
      }
    });

    console.log("\n✅ Users in BOTH Clerk and Database:");
    let matchCount = 0;
    clerkUsers.data.forEach((clerkUser) => {
      if (dbClerkIds.has(clerkUser.id)) {
        const email = clerkUser.emailAddresses[0]?.emailAddress || "No email";
        console.log(`   - ${email} (${clerkUser.id})`);
        matchCount++;
      }
    });

    console.log(`\n📊 Summary:`);
    console.log(`   Total in Clerk: ${clerkUsers.data.length}`);
    console.log(`   Total in Database: ${dbUsers.length}`);
    console.log(`   Matched: ${matchCount}`);
    console.log(`   Missing from Database: ${clerkUsers.data.length - matchCount}`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

compareClerkAndDatabase();
