// API Route: Search PubMed and import papers
import { NextRequest, NextResponse } from 'next/server';
import { searchAndFetchPubMed, buildEmergencyMedicineQuery } from '@/lib/pubmed';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const maxResults = parseInt(searchParams.get('limit') || '10');
    const specialty = searchParams.get('specialty') || 'Emergency Medicine';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Build enhanced query for emergency medicine
    const enhancedQuery = buildEmergencyMedicineQuery(query);

    // Fetch from PubMed
    const articles = await searchAndFetchPubMed(enhancedQuery, maxResults);

    return NextResponse.json({
      success: true,
      articles,
      count: articles.length,
      query: enhancedQuery,
    });
  } catch (error) {
    console.error('PubMed search error:', error);
    return NextResponse.json(
      { error: 'Failed to search PubMed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articles, specialty = 'Emergency Medicine', addedBy } = body;

    if (!Array.isArray(articles) || articles.length === 0) {
      return NextResponse.json(
        { error: 'Articles array is required' },
        { status: 400 }
      );
    }

    // Import articles to database
    const imported = [];
    for (const article of articles) {
      try {
        const evidence = await prisma.evidence.upsert({
          where: { pmid: article.pmid },
          update: {
            title: article.title,
            authors: JSON.stringify(article.authors),
            journal: article.journal,
            year: article.year,
            abstract: article.abstract,
            doi: article.doi,
            specialty,
            category: 'Trial', // Can be refined later
            status: 'pending', // Requires admin approval
            source: 'pubmed',
            addedBy,
            updatedAt: new Date(),
          },
          create: {
            pmid: article.pmid,
            title: article.title,
            authors: JSON.stringify(article.authors),
            journal: article.journal,
            year: article.year,
            abstract: article.abstract,
            doi: article.doi,
            specialty,
            category: 'Trial',
            status: 'pending',
            source: 'pubmed',
            addedBy,
          },
        });
        imported.push(evidence);
      } catch (error) {
        console.error(`Error importing article ${article.pmid}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      imported: imported.length,
      total: articles.length,
      articles: imported,
    });
  } catch (error) {
    console.error('PubMed import error:', error);
    return NextResponse.json(
      { error: 'Failed to import articles' },
      { status: 500 }
    );
  }
}
