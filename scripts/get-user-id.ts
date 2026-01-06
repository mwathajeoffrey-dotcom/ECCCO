import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Quick script to get your Clerk user ID
 * Run this in a Next.js API route or server component
 */
export async function getUserId() {
  const { userId } = await auth();
  const user = await currentUser();

  console.log("\n=== YOUR CLERK USER ID ===");
  console.log("User ID:", userId);
  console.log("Email:", user?.emailAddresses[0]?.emailAddress);
  console.log("========================\n");

  return { userId, email: user?.emailAddresses[0]?.emailAddress };
}
