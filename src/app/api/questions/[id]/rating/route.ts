import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  
  return NextResponse.json({
    success: true,
    questionId: id,
    rating: body.rating,
    message: 'Rating submitted'
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  return NextResponse.json({
    questionId: id,
    rating: null,
    message: 'No rating found'
  });
}
