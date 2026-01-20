import { NextResponse } from "next/server";

export async function GET() {
  // Extract database info from connection string without exposing password
  const dbUrl = process.env.DATABASE_URL || "NOT SET";

  // Parse the connection string to get safe info
  let dbInfo = {
    status: "NOT SET",
    host: "unknown",
    port: "unknown",
    database: "unknown",
  };

  if (dbUrl !== "NOT SET") {
    try {
      // Parse postgresql://user:pass@host:port/database
      const match = dbUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
      if (match) {
        dbInfo = {
          status: "CONFIGURED",
          host: match[3], // e.g., aws-1-us-east-1.pooler.supabase.com
          port: match[4], // e.g., 6543
          database: match[5], // e.g., postgres
        };
      }
    } catch (e) {
      dbInfo.status = "PARSE_ERROR";
    }
  }

  return NextResponse.json({
    database: dbInfo,
    expectedHost: "aws-1-us-east-1.pooler.supabase.com",
    expectedPort: "6543",
    expectedDatabase: "postgres",
    isCorrect: dbInfo.host === "aws-1-us-east-1.pooler.supabase.com" && dbInfo.port === "6543",
  });
}
