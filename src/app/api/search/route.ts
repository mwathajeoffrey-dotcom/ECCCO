// API Route: Global search endpoint
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { searchAll } from '@/lib/search';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        results: [],
      });
    }

    // Fetch data from database (limited for performance)
    const [evidence, cases] = await Promise.all([
      prisma.evidence.findMany({
        where: { status: 'approved' },
        take: 100,
        orderBy: { year: 'desc' },
      }),
      prisma.caseScenario.findMany({
        take: 50,
      }),
    ]);

    // For now, we'll search static guidelines (could be moved to DB later)
    const guidelines = [
      {
        id: 'acls',
        title: 'ACLS Guidelines',
        content: 'Advanced Cardiac Life Support protocols and algorithms',
      },
      {
        id: 'pals',
        title: 'PALS Guidelines',
        content: 'Pediatric Advanced Life Support protocols',
      },
      {
        id: 'bls',
        title: 'BLS Guidelines',
        content: 'Basic Life Support guidelines for healthcare providers',
      },
    ];

    // Note: Questions are typically loaded from static files
    // For search, we could index them in the database or search files
    // For now, returning placeholder
    const questions: any[] = [];

    // Perform fuzzy search
    const results = searchAll(query, questions, evidence, guidelines, cases);

    return NextResponse.json({
      success: true,
      results: results.slice(0, limit),
      total: results.length,
    });
  } catch (error) {
    console.error('Error performing search:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
