import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'ratings.json');

function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeDB(data: any) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: questionId } = await params;
  const all = readDB();
  const questionRatings = all.filter((r: any) => r.questionId === questionId);
  
  const helpful = questionRatings.filter((r: any) => r.isHelpful).length;
  const notHelpful = questionRatings.filter((r: any) => !r.isHelpful).length;
  const total = questionRatings.length;
  const flaggedCount = questionRatings.filter((r: any) => r.flagged).length;
  
  const stats = {
    helpful,
    notHelpful,
    total,
    helpfulPercentage: total > 0 ? Math.round((helpful / total) * 100) : 0,
    flaggedCount,
  };
  
  const comments = questionRatings
    .filter((r: any) => r.comment && r.comment !== 'Flagged for review')
    .map((r: any) => ({
      id: r.id,
      userId: r.userId,
      comment: r.comment,
      isHelpful: r.isHelpful,
      createdAt: r.createdAt,
    }));
  
  return NextResponse.json({ success: true, stats, comments });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: questionId } = await params;
  const body = await req.json();
  const { userId, isHelpful, comment, flagged } = body;
  
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });
  
  const all = readDB();
  const existingIdx = all.findIndex((r: any) => r.userId === userId && r.questionId === questionId);
  
  const rating = {
    id: existingIdx >= 0 ? all[existingIdx].id : 'mock_rating_' + Date.now(),
    userId,
    questionId,
    isHelpful,
    comment: comment || null,
    flagged: flagged || false,
    createdAt: existingIdx >= 0 ? all[existingIdx].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  if (existingIdx >= 0) {
    all[existingIdx] = rating;
  } else {
    all.unshift(rating);
  }
  
  writeDB(all);
  return NextResponse.json({ success: true, rating });
}
