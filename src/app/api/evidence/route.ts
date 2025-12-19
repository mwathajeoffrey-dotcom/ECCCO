// API Route: Get and manage evidence papers
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const specialty = searchParams.get('specialty');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (specialty) {
      where.specialty = specialty;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { abstract: { contains: search, mode: 'insensitive' } },
        { authors: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [papers, total] = await Promise.all([
      prisma.evidence.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.evidence.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      papers,
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Error fetching evidence:', error);
    return NextResponse.json(
      { error: 'Failed to fetch papers', details: error.message },
      { status: 500 }
    );
  }
}
