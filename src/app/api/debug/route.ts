import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    useMockDb: process.env.NEXT_PUBLIC_USE_MOCK_DB,
    hasClerkKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
  });
}
