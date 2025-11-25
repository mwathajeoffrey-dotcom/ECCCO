// Simplified auth configuration for API routes
import { getServerSession } from "next-auth";
import { authOptions } from "./next-auth";

// Simple auth function for API routes
export async function auth() {
  return await getServerSession(authOptions);
}

// Export auth options for other uses
export { authOptions };