// API Route: Import papers to evidence library
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { papers, specialty, category, addedBy } = await request.json();

    if (!papers || !Array.isArray(papers) || papers.length === 0) {
      return NextResponse.json(
        { error: 'Papers array is required' },
        { status: 400 }
      );
    }

    let imported = 0;
    const errors = [];

    for (const paper of papers) {
      try {
        // Check if paper already exists by PMID
        if (paper.pmid) {
          const existing = await prisma.evidence.findUnique({
            where: { pmid: paper.pmid },
          });

          if (existing) {
            errors.push(`Paper with PMID ${paper.pmid} already exists`);
            continue;
          }
        }

        // Create evidence record
        await prisma.evidence.create({
          data: {
            pmid: paper.pmid || null,
            doi: paper.doi || null,
            title: paper.title,
            authors: JSON.stringify(paper.authors || []),
            journal: paper.journal || 'Unknown',
            year: paper.year || new Date().getFullYear(),
            abstract: paper.abstract || null,
            specialty: specialty || 'Emergency Medicine',
            category: category || 'Clinical Trial',
            status: 'pending',
            source: 'pubmed',
            addedBy: addedBy || null,
            tags: JSON.stringify([]),
            views: 0,
            bookmarks: 0,
          },
        });

        imported++;
      } catch (error: any) {
        console.error('Error importing paper:', error);
        errors.push(`Failed to import "${paper.title}": ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      total: papers.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to import papers', details: error.message },
      { status: 500 }
    );
  }
}
