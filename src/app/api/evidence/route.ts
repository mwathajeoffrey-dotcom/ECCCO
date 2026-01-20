import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/admin';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Some environments may not have generated Prisma types available during linting
// so access the model via `any` to avoid compile-time errors while still using runtime client.
const evidenceModel: any = (prisma as any).evidenceReference;

export function safeParseJson<T = any>(value: string | null | undefined, fallback: T) {
  try {
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch (e) {
    return fallback;
  }
}

/**
 * GET /api/evidence
 * Get all evidence references (published only for non-admin, all for admin)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

    // If includeUnpublished is requested, check admin auth
    if (includeUnpublished) {
      const { authorized } = await requireAdmin();
      if (!authorized) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const where = includeUnpublished ? {} : { published: true };

    // If id param provided, return single reference
    if (id) {
      const reference = await evidenceModel.findUnique({
        where: { referenceId: id },
      });

      if (!reference) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      const parsed = {
        ...reference,
        keyRecommendations: JSON.parse(reference.keyRecommendations),
        clinicalPearls: JSON.parse(reference.clinicalPearls),
        references: JSON.parse(reference.references),
        topics: reference.topics ? JSON.parse(reference.topics) : [],
      };

      // Prevent returning unpublished to non-admins
      if (!reference.published) {
        const { authorized } = await requireAdmin();
        if (!authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      return NextResponse.json(parsed);
    }

    const references = await evidenceModel.findMany({
      where,
      orderBy: [
        { displayOrder: 'asc' },
        { year: 'desc' },
        { name: 'asc' },
      ],
    });

    // Parse JSON fields
    const parsed = references.map((ref: any) => ({
      ...ref,
      keyRecommendations: safeParseJson<string[]>(ref.keyRecommendations, []),
      clinicalPearls: safeParseJson<string[]>(ref.clinicalPearls, []),
      references: safeParseJson<any[]>(ref.references, []),
      topics: ref.topics ? safeParseJson<string[]>(ref.topics, []) : [],
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    logger.error('Error fetching evidence references:', error);
    return NextResponse.json(
      { error: 'Failed to fetch references' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/evidence
 * Create a new evidence reference (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const { authorized, user } = await requireAdmin();
    if (!authorized) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const required = [
      'referenceId',
      'category',
      'name',
      'year',
      'summary',
      'evidenceLevel',
      'citation',
    ];

    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if referenceId already exists
    const existing = await evidenceModel.findUnique({
      where: { referenceId: body.referenceId },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Reference ID already exists' },
        { status: 409 }
      );
    }

    // Create the reference
    const reference = await evidenceModel.create({
      data: {
        referenceId: body.referenceId,
        category: body.category,
        name: body.name,
        organization: body.organization || null,
        year: parseInt(body.year),
        summary: body.summary,
        keyRecommendations: JSON.stringify(body.keyRecommendations || []),
        clinicalPearls: JSON.stringify(body.clinicalPearls || []),
        evidenceLevel: body.evidenceLevel,
        citation: body.citation,
        references: JSON.stringify(body.references || []),
        topics: body.topics ? JSON.stringify(body.topics) : null,
        journal: body.journal || null,
        doi: body.doi || null,
        pmid: body.pmid || null,
        published: body.published !== undefined ? body.published : true,
        featured: body.featured || false,
        displayOrder: body.displayOrder || 0,
        createdBy: user?.id || null,
        updatedBy: user?.id || null,
      },
    });

    // Parse JSON fields for response
    const parsed = {
      ...reference,
      keyRecommendations: safeParseJson<string[]>(reference.keyRecommendations, []),
      clinicalPearls: safeParseJson<string[]>(reference.clinicalPearls, []),
      references: safeParseJson<any[]>(reference.references, []),
      topics: reference.topics ? safeParseJson<string[]>(reference.topics, []) : [],
    };

    return NextResponse.json(parsed, { status: 201 });
  } catch (error) {
    logger.error('Error creating evidence reference:', error);
    return NextResponse.json(
      { error: 'Failed to create reference' },
      { status: 500 }
    );
  }
}


/**
 * PUT /api/evidence
 * Update an existing evidence reference (admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const { authorized, user } = await requireAdmin();
    if (!authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const id = body.referenceId || body.id;
    if (!id) return NextResponse.json({ error: 'Missing referenceId' }, { status: 400 });

  const existing = await evidenceModel.findUnique({ where: { referenceId: id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const updateData: any = {};
    // Allow updating fields if present in body
    const updatable = [
      'category','name','organization','year','summary','keyRecommendations','clinicalPearls',
      'evidenceLevel','citation','references','topics','journal','doi','pmid','published','featured','displayOrder'
    ];

    for (const field of updatable) {
      if (body[field] !== undefined) {
        if (field === 'year') updateData.year = parseInt(body.year);
        else if (field === 'keyRecommendations' || field === 'clinicalPearls' || field === 'references' || field === 'topics') {
          updateData[field] = JSON.stringify(body[field] || []);
        } else {
          updateData[field] = body[field];
        }
      }
    }

    updateData.updatedBy = user?.id || null;

    const updated = await evidenceModel.update({
      where: { referenceId: id },
      data: updateData,
    });

    const parsed = {
      ...updated,
      keyRecommendations: safeParseJson<string[]>(updated.keyRecommendations, []),
      clinicalPearls: safeParseJson<string[]>(updated.clinicalPearls, []),
      references: safeParseJson<any[]>(updated.references, []),
      topics: updated.topics ? safeParseJson<string[]>(updated.topics, []) : [],
    };

    return NextResponse.json(parsed);
  } catch (error) {
    logger.error('Error updating evidence reference:', error);
    return NextResponse.json({ error: 'Failed to update reference' }, { status: 500 });
  }
}


/**
 * DELETE /api/evidence
 * Delete an evidence reference by referenceId (admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const { authorized } = await requireAdmin();
    if (!authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Allow body with referenceId as fallback
    let bodyId = id;
    try {
      const body = await request.json().catch(() => null);
      if (!bodyId && body && body.referenceId) bodyId = body.referenceId;
    } catch (e) {
      // ignore
    }

    if (!bodyId) return NextResponse.json({ error: 'Missing referenceId' }, { status: 400 });

  const existing = await evidenceModel.findUnique({ where: { referenceId: bodyId } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await evidenceModel.delete({ where: { referenceId: bodyId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error deleting evidence reference:', error);
    return NextResponse.json({ error: 'Failed to delete reference' }, { status: 500 });
  }
}
