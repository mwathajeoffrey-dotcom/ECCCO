import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'bookmarks.json');

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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });
  const all = readDB();
  const userBookmarks = all.filter((b: any) => b.userId === userId);
  return NextResponse.json({ success: true, bookmarks: userBookmarks });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, questionId, notes, category } = body;
  if (!userId || !questionId) return NextResponse.json({ error: 'userId and questionId required' }, { status: 400 });
  const all = readDB();
  const exists = all.find((b: any) => b.userId === userId && b.questionId === questionId);
  if (exists) return NextResponse.json({ error: 'already exists' }, { status: 409 });
  const bookmark = { id: 'mock_' + Date.now(), userId, questionId, notes: notes || null, category, createdAt: new Date().toISOString() };
  all.unshift(bookmark);
  writeDB(all);
  return NextResponse.json({ success: true, bookmark });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { userId, questionId, notes } = body;
  if (!userId || !questionId) return NextResponse.json({ error: 'userId and questionId required' }, { status: 400 });
  const all = readDB();
  const idx = all.findIndex((b: any) => b.userId === userId && b.questionId === questionId);
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 });
  all[idx].notes = notes;
  all[idx].updatedAt = new Date().toISOString();
  writeDB(all);
  return NextResponse.json({ success: true, bookmark: all[idx] });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  const questionId = url.searchParams.get('questionId');
  if (!userId || !questionId) return NextResponse.json({ error: 'userId and questionId required' }, { status: 400 });
  const all = readDB();
  const filtered = all.filter((b: any) => !(b.userId === userId && b.questionId === questionId));
  writeDB(filtered);
  return NextResponse.json({ success: true });
}
