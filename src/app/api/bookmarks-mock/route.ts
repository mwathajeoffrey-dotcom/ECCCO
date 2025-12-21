import { NextRequest, NextResponse } from 'next/server';

/**
 * Mock bookmarks endpoint for testing
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    bookmarks: [],
    message: 'Mock bookmarks endpoint - use /api/bookmarks for production'
  });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Mock bookmark created'
  });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Mock bookmark deleted'
  });
}
