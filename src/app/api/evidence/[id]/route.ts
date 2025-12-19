// API Route: Update evidence paper status
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.evidence.update({
      where: { id },
      data: {
        status: body.status,
        reviewedBy: body.reviewedBy,
        specialty: body.specialty,
        category: body.category,
        summary: body.summary,
        keyPoints: body.keyPoints,
        clinicalImpact: body.clinicalImpact,
        tags: body.tags,
      },
    });

    return NextResponse.json({
      success: true,
      paper: updated,
    });
  } catch (error: any) {
    console.error('Error updating evidence:', error);
    return NextResponse.json(
      { error: 'Failed to update paper', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.evidence.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Paper deleted',
    });
  } catch (error: any) {
    console.error('Error deleting evidence:', error);
    return NextResponse.json(
      { error: 'Failed to delete paper', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const paper = await prisma.evidence.findUnique({
      where: { id },
    });

    if (!paper) {
      return NextResponse.json(
        { error: 'Paper not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.evidence.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      paper: {
        ...paper,
        views: paper.views + 1,
      },
    });
  } catch (error: any) {
    console.error('Error fetching evidence:', error);
    return NextResponse.json(
      { error: 'Failed to fetch paper', details: error.message },
      { status: 500 }
    );
  }
}
