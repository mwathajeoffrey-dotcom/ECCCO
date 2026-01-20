import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    stats: {
      dueToday: 0,
      reviewed: 0,
      totalCards: 0
    }
  });
}
