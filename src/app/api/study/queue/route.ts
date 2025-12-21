import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    queue: [],
    message: 'Study queue endpoint'
  });
}
