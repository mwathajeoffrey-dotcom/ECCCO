# Real-time Database + Search Implementation Plan

**Date**: December 17, 2025  
**Goal**: Add real-time updates and search functionality across the app

---

# PART 1: Real-time Database Connection

## Current State vs Desired State

### Current (Static Deployment)
❌ Changes require:
1. Edit code
2. Commit to GitHub
3. Vercel rebuilds (2-3 minutes)
4. Users see changes

❌ Evidence Library papers are **hardcoded** in the file  
❌ No database for papers  
❌ Changes require code deployment  

### Desired (Real-time Database)
✅ Changes happen:
1. Add paper via admin interface
2. Save to database
3. Users see immediately (no rebuild!)

✅ Evidence Library papers in **database**  
✅ Admin dashboard to add/edit papers  
✅ Real-time updates for users  

---

## Architecture Options

### Option A: Prisma + PostgreSQL (RECOMMENDED) ⭐

**What you already have**:
- ✅ Prisma ORM installed
- ✅ PostgreSQL database (Vercel Postgres)
- ✅ User authentication working

**What you need to add**:
- Database schema for research papers
- Admin interface to manage papers
- API routes to fetch papers
- Real-time refresh mechanism

**Cost**: 
- FREE tier: 256MB database
- $20/month: 10GB database (recommended)

**Pros**:
- Already integrated in your stack
- Type-safe with TypeScript
- Easy migrations
- Works with existing auth

**Cons**:
- Not truly "real-time" (need to refresh page or use polling)
- For true real-time, need WebSockets or Server-Sent Events

---

### Option B: Supabase (Real-time Built-in) 🚀

**What it is**:
- PostgreSQL database with real-time subscriptions
- Built-in authentication
- Auto-generated REST and GraphQL APIs
- Real-time changes pushed to browser instantly

**How it works**:
```typescript
// Subscribe to changes
const subscription = supabase
  .from('research_papers')
  .on('INSERT', payload => {
    // New paper added, update UI immediately!
    addPaperToUI(payload.new);
  })
  .subscribe();
```

**Cost**:
- FREE tier: 500MB database, 2GB bandwidth
- $25/month: 8GB database, 250GB bandwidth

**Pros**:
- ✅ TRUE real-time (instant updates)
- ✅ No page refresh needed
- ✅ Built-in auth
- ✅ Row-level security
- ✅ File storage included

**Cons**:
- Would replace your current Prisma + PostgreSQL setup
- Migration needed

---

### Option C: Firebase Firestore (Google's Real-time DB)

**What it is**:
- NoSQL real-time database
- Instant synchronization
- Offline support

**Cost**:
- FREE tier: 1GB storage, 10GB/month bandwidth
- Pay-as-you-go after that

**Pros**:
- ✅ TRUE real-time
- ✅ Offline-first
- ✅ Easy to set up
- ✅ Scales automatically

**Cons**:
- NoSQL (different from your current SQL setup)
- Vendor lock-in
- Can get expensive at scale

---

### Option D: Prisma + Polling (Simplest Upgrade)

**What it is**:
- Keep current Prisma setup
- Add database table for papers
- Poll for changes every 30-60 seconds

**How it works**:
```typescript
// Check for new papers every 30 seconds
setInterval(async () => {
  const papers = await fetch('/api/papers');
  updateUI(papers);
}, 30000);
```

**Cost**:
- $0 extra (use existing database)

**Pros**:
- ✅ Minimal code changes
- ✅ No migration needed
- ✅ Works with existing stack
- ✅ Good enough for most use cases

**Cons**:
- Not truly real-time (30-60 second delay)
- More API calls (but negligible cost)

---

## 🎯 RECOMMENDED APPROACH

### Phase 1: Database Schema (Week 1)
Move Evidence Library from hardcoded to database

### Phase 2: Admin Interface (Week 2)
Build UI to add/edit papers without code changes

### Phase 3: Auto-refresh (Week 3)
Add polling or real-time subscriptions

---

# PART 2: Search Functionality

## Where to Add Search Bars

### 1. Evidence Library Search (PRIORITY 1) 🔍

**Location**: `/emergency-references` page  
**Search by**:
- Paper title
- Authors
- Keywords (cardiac arrest, sepsis, stroke, etc.)
- Category
- Year range
- Evidence level (RCT, meta-analysis, etc.)

**UI Design**:
```
┌─────────────────────────────────────────────────────────┐
│ 🔍 Search Evidence Library                              │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Search by title, keyword, or author...            │  │
│ └───────────────────────────────────────────────────┘  │
│                                                          │
│ Filters: [All Categories ▼] [2020-2025 ▼] [RCT ▼]     │
└─────────────────────────────────────────────────────────┘

Results: 12 papers found
- Cardiac Arrest & Resuscitation (4)
- Sepsis & Septic Shock (3)
- Trauma (2)
...
```

---

### 2. Question Bank Search (PRIORITY 2) 🔍

**Location**: Exam/Practice pages  
**Search by**:
- Topic (cardiology, trauma, pediatrics)
- Difficulty level
- Question content
- Bookmarked status
- Previously answered

**UI Design**:
```
┌─────────────────────────────────────────────────────────┐
│ 🔍 Find Questions                                        │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Search topics, keywords...                        │  │
│ └───────────────────────────────────────────────────┘  │
│                                                          │
│ [Cardiology ▼] [All Difficulty ▼] [Bookmarked only ☐] │
└─────────────────────────────────────────────────────────┘

Found 45 questions matching "cardiac arrest"
```

---

### 3. Dashboard Search (PRIORITY 3) 🔍

**Location**: `/dashboard` page  
**Search by**:
- Practice sessions
- Quiz history
- Bookmarked questions
- Study materials

---

### 4. Global Search (PRIORITY 4) 🔍

**Location**: Header/Navigation bar  
**Search everything**:
- Questions
- Evidence Library papers
- Clinical case scenarios
- Flowcharts
- Emergency guidelines

**UI Design**:
```
┌──────────────────────────────────────────────────────────┐
│ ECCCO Platform          🔍 [Search...] 🔔 👤             │
└──────────────────────────────────────────────────────────┘

Quick results dropdown:
┌──────────────────────────────────────────────────┐
│ 🔍 Search Results for "sepsis"                   │
├──────────────────────────────────────────────────┤
│ 📄 Papers (3)                                    │
│   • Septic Shock Guidelines 2021                │
│   • Fluid Resuscitation in Sepsis               │
│                                                  │
│ ❓ Questions (12)                                │
│   • Sepsis 6 bundle implementation              │
│   • Vasopressor choice in septic shock          │
│                                                  │
│ 📚 Resources (2)                                 │
│   • Surviving Sepsis Campaign Flowchart         │
└──────────────────────────────────────────────────┘
```

---

# Implementation Plan

## PHASE 1: Database Schema (Week 1)

### Step 1: Create Research Paper Schema

```prisma
// prisma/schema.prisma

model ResearchPaper {
  id                   String   @id @default(cuid())
  
  // Basic Info
  title                String
  authors              String[]
  journal              String
  year                 Int
  doi                  String   @unique
  pmid                 String?  @unique
  
  // Content
  abstract             String   @db.Text
  summary              String   @db.Text
  keyRecommendations   String[]
  clinicalPearls       String[]
  
  // Categorization
  category             String
  topics               String[]
  evidenceLevel        String
  
  // Metadata
  organization         String
  citation             String
  pdfUrl               String?
  
  // Search optimization
  searchVector         Unsupported("tsvector")? // Full-text search
  
  // Timestamps
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  
  // Relations
  createdBy            User?    @relation(fields: [createdById], references: [id])
  createdById          String?
  
  @@index([category])
  @@index([year])
  @@index([doi])
  @@fulltext([title, abstract])
}
```

### Step 2: Migrate Existing Papers to Database

```typescript
// scripts/migrate-papers-to-db.ts

import { PrismaClient } from '@prisma/client';
import { guidelines } from '@/app/emergency-references/page';

const prisma = new PrismaClient();

async function migratePapers() {
  console.log('Migrating papers to database...');
  
  for (const categoryData of guidelines) {
    for (const paper of categoryData.guidelines) {
      await prisma.researchPaper.create({
        data: {
          title: paper.name,
          authors: [paper.organization],
          journal: paper.organization,
          year: parseInt(paper.year),
          doi: paper.references[0]?.doi || '',
          abstract: paper.summary,
          summary: paper.summary,
          keyRecommendations: paper.keyRecommendations,
          clinicalPearls: paper.clinicalPearls,
          category: categoryData.category,
          topics: categoryData.topics,
          evidenceLevel: paper.evidenceLevel,
          organization: paper.organization,
          citation: paper.citation,
        }
      });
    }
  }
  
  console.log('✅ Migration complete!');
}

migratePapers();
```

---

## PHASE 2: Search Implementation (Week 2)

### Evidence Library Search Component

```typescript
// src/components/search/EvidenceLibrarySearch.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilters {
  query: string;
  category: string;
  yearRange: [number, number];
  evidenceLevel: string;
}

export default function EvidenceLibrarySearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    yearRange: [2015, 2025],
    evidenceLevel: 'all'
  });
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (filters.query.length > 2) {
        setLoading(true);
        const res = await fetch('/api/papers/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filters)
        });
        const data = await res.json();
        setResults(data.papers);
        setLoading(false);
      }
    }, 300); // Wait 300ms after typing stops
    
    return () => clearTimeout(timer);
  }, [filters]);
  
  return (
    <div className="mb-8 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title, keyword, author, or DOI..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
        />
        {filters.query && (
          <button
            onClick={() => setFilters({ ...filters, query: '' })}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="Cardiac Arrest & Resuscitation">Cardiac Arrest</option>
          <option value="Sepsis & Septic Shock">Sepsis</option>
          <option value="Trauma & Hemorrhagic Shock">Trauma</option>
          <option value="Acute Stroke">Stroke</option>
          {/* Add more categories */}
        </select>
        
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg"
          value={filters.evidenceLevel}
          onChange={(e) => setFilters({ ...filters, evidenceLevel: e.target.value })}
        >
          <option value="all">All Evidence Levels</option>
          <option value="Level I">Level I (RCT)</option>
          <option value="Meta-Analysis">Meta-Analysis</option>
          <option value="Systematic Review">Systematic Review</option>
        </select>
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Year:</label>
          <input
            type="number"
            min="1990"
            max="2025"
            className="w-20 px-2 py-2 border border-gray-300 rounded"
            value={filters.yearRange[0]}
            onChange={(e) => setFilters({
              ...filters,
              yearRange: [parseInt(e.target.value), filters.yearRange[1]]
            })}
          />
          <span>to</span>
          <input
            type="number"
            min="1990"
            max="2025"
            className="w-20 px-2 py-2 border border-gray-300 rounded"
            value={filters.yearRange[1]}
            onChange={(e) => setFilters({
              ...filters,
              yearRange: [filters.yearRange[0], parseInt(e.target.value)]
            })}
          />
        </div>
      </div>
      
      {/* Results Count */}
      {filters.query && (
        <div className="text-sm text-gray-600">
          {loading ? (
            <span>Searching...</span>
          ) : (
            <span>Found {results.length} papers</span>
          )}
        </div>
      )}
      
      {/* Search Results */}
      {results.length > 0 && (
        <div className="mt-4 space-y-3">
          {results.map((paper: any) => (
            <div key={paper.id} className="p-4 border border-gray-200 rounded-lg hover:border-red-300">
              <h3 className="font-semibold text-gray-900">{paper.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {paper.journal} • {paper.year} • {paper.category}
              </p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">{paper.summary}</p>
              <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-red-600 hover:text-red-700 mt-2 inline-block"
              >
                View Paper →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Search API Route

```typescript
// src/app/api/papers/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { query, category, yearRange, evidenceLevel } = await request.json();
    
    const papers = await prisma.researchPaper.findMany({
      where: {
        AND: [
          // Text search
          query ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { abstract: { contains: query, mode: 'insensitive' } },
              { authors: { has: query } },
              { doi: { contains: query } },
              { topics: { has: query } }
            ]
          } : {},
          
          // Category filter
          category !== 'all' ? { category } : {},
          
          // Year range
          {
            year: {
              gte: yearRange[0],
              lte: yearRange[1]
            }
          },
          
          // Evidence level
          evidenceLevel !== 'all' ? {
            evidenceLevel: { contains: evidenceLevel }
          } : {}
        ]
      },
      orderBy: [
        { year: 'desc' },
        { title: 'asc' }
      ],
      take: 50 // Limit results
    });
    
    return NextResponse.json({ papers });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
```

---

## PHASE 3: Admin Interface (Week 3)

### Admin Dashboard to Add Papers

```typescript
// src/app/admin/papers/page.tsx

'use client';

import { useState } from 'react';
import { Plus, Save } from 'lucide-react';

export default function AdminPapersPage() {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: 2025,
    doi: '',
    summary: '',
    category: '',
    evidenceLevel: ''
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/admin/papers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        authors: formData.authors.split(',').map(a => a.trim())
      })
    });
    
    if (response.ok) {
      alert('Paper added successfully!');
      // Reset form or redirect
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Add Research Paper</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Authors (comma-separated)</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.authors}
            onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
            placeholder="Smith J, Jones A, Williams B"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Journal</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.journal}
              onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">DOI</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.doi}
            onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
            placeholder="10.1056/NEJMoa..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select category...</option>
            <option value="Cardiac Arrest & Resuscitation">Cardiac Arrest & Resuscitation</option>
            <option value="Sepsis & Septic Shock">Sepsis & Septic Shock</option>
            <option value="Trauma & Hemorrhagic Shock">Trauma & Hemorrhagic Shock</option>
            {/* Add more */}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Summary</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            rows={4}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Add Paper
        </button>
      </form>
    </div>
  );
}
```

---

## PHASE 4: Real-time Updates (Week 4)

### Option A: Simple Polling

```typescript
// src/hooks/useRealtimePapers.ts

import { useEffect, useState } from 'react';

export function useRealtimePapers(category?: string) {
  const [papers, setPapers] = useState([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  useEffect(() => {
    // Fetch immediately
    fetchPapers();
    
    // Then poll every 30 seconds
    const interval = setInterval(fetchPapers, 30000);
    
    return () => clearInterval(interval);
  }, [category]);
  
  async function fetchPapers() {
    const url = category 
      ? `/api/papers?category=${category}`
      : '/api/papers';
      
    const res = await fetch(url);
    const data = await res.json();
    
    if (JSON.stringify(data.papers) !== JSON.stringify(papers)) {
      setPapers(data.papers);
      setLastUpdate(new Date());
    }
  }
  
  return { papers, lastUpdate };
}

// Usage in component:
const { papers, lastUpdate } = useRealtimePapers('Cardiac Arrest');
```

### Option B: Server-Sent Events (True Real-time)

```typescript
// src/app/api/papers/stream/route.ts

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial data
      const papers = await prisma.researchPaper.findMany();
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(papers)}\n\n`)
      );
      
      // Poll for changes every 10 seconds
      const interval = setInterval(async () => {
        const updatedPapers = await prisma.researchPaper.findMany({
          where: {
            updatedAt: { gte: new Date(Date.now() - 10000) }
          }
        });
        
        if (updatedPapers.length > 0) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(updatedPapers)}\n\n`)
          );
        }
      }, 10000);
      
      // Cleanup
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}

// Client usage:
useEffect(() => {
  const eventSource = new EventSource('/api/papers/stream');
  
  eventSource.onmessage = (event) => {
    const papers = JSON.parse(event.data);
    setPapers(papers);
  };
  
  return () => eventSource.close();
}, []);
```

---

## Cost Summary

| Feature | Setup Cost | Monthly Cost | Notes |
|---------|------------|--------------|-------|
| **Database Migration** | $0 | $0-20 | Free tier or $20 for 10GB |
| **Search (basic)** | $0 | $0 | Uses existing DB |
| **Search (advanced)** | $0 | $0 | PostgreSQL full-text search |
| **Admin Interface** | $0 | $0 | Just code |
| **Polling Updates** | $0 | $0 | No extra cost |
| **Real-time (SSE)** | $0 | $0 | Built into Next.js |
| **Real-time (Supabase)** | $0 | $0-25 | Free or Pro tier |
| **TOTAL** | **$0** | **$0-45** | Depends on tier |

---

## Timeline

| Week | Feature | Time Estimate |
|------|---------|---------------|
| **Week 1** | Database schema + migration | 8-10 hours |
| **Week 2** | Evidence Library search | 6-8 hours |
| **Week 3** | Admin interface | 8-10 hours |
| **Week 4** | Real-time updates | 4-6 hours |
| **Week 5** | Question search | 6-8 hours |
| **Week 6** | Global search | 8-10 hours |

**Total**: 40-52 hours (5-6 weeks)

---

## 🎯 My Recommendation

### Start With (Week 1-2):
1. ✅ Move Evidence Library to database
2. ✅ Add basic search to Evidence Library
3. ✅ Simple polling for updates (30-60 sec)

**Why**: Biggest impact, lowest effort, uses existing stack

### Then Add (Week 3-4):
4. ✅ Admin interface for adding papers
5. ✅ Question bank search

**Why**: Makes your life easier, users love search

### Finally (Week 5-6):
6. ✅ Global search
7. ✅ True real-time with SSE or Supabase

**Why**: Nice-to-have features, can wait

---

## 🚀 Want Me To Build This?

I can help you implement:

**Option A**: Just the search bars (simplest)  
**Option B**: Database + search (recommended)  
**Option C**: Full real-time system (ambitious)  

**Which would you like to start with?** 🔍
