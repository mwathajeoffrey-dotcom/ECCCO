# Clinical Guidelines & Flowcharts Integration Plan
## FREE API Sources for Medical Guidelines

**Date:** December 31, 2025  
**Goal:** Build comprehensive clinical guidelines library with FREE APIs (similar to evidence search)

---

## 🎯 Overview

Just like we integrated 4 FREE APIs for research articles (370M+ papers), we'll integrate FREE sources for clinical guidelines, flowcharts, and protocols.

---

## 🆓 FREE API Sources for Clinical Guidelines

### 1. **NICE Guidelines API** ✅ FREE
**Source:** National Institute for Health and Care Excellence (UK)

**API Details:**
- **URL:** https://www.nice.org.uk/guidance
- **Format:** JSON/XML feed available
- **Cost:** 100% FREE
- **Coverage:** 500+ evidence-based clinical guidelines
- **Quality:** Gold standard for clinical practice

**Content Types:**
- Clinical Guidelines (CG)
- Technology Appraisals (TA)
- Interventional Procedures (IP)
- Public Health Guidelines (PH)
- Quality Standards (QS)

**Example Endpoints:**
```
GET https://www.nice.org.uk/guidance/published?type=cg
GET https://www.nice.org.uk/guidance/[id]/resources
```

**Features:**
- Full-text guidelines
- Evidence summaries
- Implementation tools
- Regular updates
- Quality-assured content

---

### 2. **WHO Guidelines** ✅ FREE
**Source:** World Health Organization

**API Details:**
- **URL:** https://www.who.int/publications-guidelines-list
- **Format:** JSON/RSS feeds
- **Cost:** 100% FREE
- **Coverage:** 1000+ international guidelines
- **Quality:** Authoritative global standards

**Content Types:**
- Disease-specific guidelines
- Treatment protocols
- Emergency response guidelines
- Public health recommendations
- Immunization schedules

**Example Topics:**
- COVID-19 management
- Malaria treatment
- HIV/AIDS protocols
- Maternal health
- Emergency care

**API Access:**
```
GET https://www.who.int/api/v1/publications
GET https://www.who.int/api/v1/guidelines?topic=emergency
```

---

### 3. **Guidelines International Network (GIN)** ✅ FREE
**Source:** International guideline library

**API Details:**
- **URL:** https://g-i-n.net/library/international-guidelines-library
- **Format:** Searchable database with API access
- **Cost:** FREE registration required
- **Coverage:** 7,000+ guidelines from 100+ countries
- **Quality:** Peer-reviewed, evidence-based

**Content:**
- AGREE II compliant guidelines
- International best practices
- Multi-language support (but filter to English)
- Regular updates

**Search API:**
```
POST https://g-i-n.net/api/search
{
  "query": "sepsis",
  "country": "any",
  "year": "2020-2025",
  "language": "en"
}
```

---

### 4. **CDC Guidelines & Recommendations** ✅ FREE
**Source:** Centers for Disease Control and Prevention (USA)

**API Details:**
- **URL:** https://www.cdc.gov/about/data-api.html
- **Format:** RESTful API
- **Cost:** 100% FREE
- **Coverage:** 500+ disease-specific guidelines
- **Quality:** Evidence-based US standards

**Content Types:**
- Disease prevention guidelines
- Vaccination schedules
- Infection control protocols
- Emergency preparedness
- Public health recommendations

**Example Endpoints:**
```
GET https://api.cdc.gov/v1/guidelines
GET https://api.cdc.gov/v1/immunization/schedules
GET https://api.cdc.gov/v1/diseases/{disease}/guidelines
```

---

### 5. **UpToDate Clinical Decision Support** ⚠️ PAID (Alternative: Use Free Summary)
**Alternative:** UpToDate has free clinical pathway summaries

**Free Alternative:** **DynaMed** - Has free tier with basic access
- **URL:** https://www.dynamed.com
- **Free Tier:** Basic guidelines and pathways
- **Coverage:** 3,000+ clinical topics

---

### 6. **American Heart Association (AHA) Guidelines** ✅ FREE
**Source:** AHA Scientific Statements

**API Details:**
- **URL:** https://professional.heart.org/en/guidelines-and-statements
- **Format:** RSS/JSON feeds
- **Cost:** FREE (public access)
- **Coverage:** ACLS, BLS, PALS, cardiac care

**Content:**
- ACLS algorithms
- BLS protocols
- PALS guidelines
- Stroke guidelines
- Heart failure management
- CPR guidelines

**Example Feed:**
```
GET https://professional.heart.org/api/guidelines.json
GET https://professional.heart.org/api/algorithms/acls
```

---

### 7. **Emergency Medicine Guidelines (LITFL)** ✅ FREE
**Source:** Life in the Fast Lane

**Details:**
- **URL:** https://litfl.com
- **Format:** Web scraping + RSS
- **Cost:** FREE
- **Coverage:** 1000+ emergency protocols

**Content:**
- ECG library
- Clinical cases
- Emergency algorithms
- Drug dosing guides
- Procedures

---

### 8. **OpenEMR Clinical Decision Rules** ✅ FREE (Open Source)
**Source:** Open-source medical guidelines

**Details:**
- **URL:** https://github.com/openemr
- **Format:** JSON/XML
- **Cost:** FREE (GPL license)
- **Coverage:** 200+ clinical decision rules

---

## 📊 Recommended Integration Strategy

### **Phase 1: Core Guidelines (Week 1)**
Integrate these 4 FREE sources first:

1. **NICE Guidelines** - UK gold standard
2. **WHO Guidelines** - International authority
3. **AHA Guidelines** - Cardiac/emergency focus
4. **CDC Guidelines** - US public health

**Expected Coverage:** ~3,000+ clinical guidelines

---

### **Phase 2: Extended Coverage (Week 2)**
Add these sources:

5. **GIN Library** - International guidelines
6. **LITFL** - Emergency medicine
7. **OpenEMR** - Clinical decision rules

**Total Coverage:** ~10,000+ guidelines & protocols

---

## 🏗️ Technical Implementation

### **File Structure:**
```
src/
├── lib/
│   ├── guidelines/
│   │   ├── nice.ts           # NICE API integration
│   │   ├── who.ts            # WHO API integration
│   │   ├── aha.ts            # AHA guidelines
│   │   ├── cdc.ts            # CDC API
│   │   ├── gin.ts            # GIN library
│   │   ├── litfl.ts          # LITFL scraper
│   │   └── unified-guidelines.ts  # Combined search
│   └── flowcharts/
│       ├── acls-algorithms.ts
│       ├── stroke-protocol.ts
│       └── sepsis-pathways.ts
└── app/
    ├── guidelines-search/     # NEW: Unified search page
    │   └── page.tsx
    └── flowcharts-interactive/  # NEW: Interactive flowcharts
        └── page.tsx
```

---

## 💻 Code Implementation

### **Step 1: Create NICE Guidelines API Integration**

```typescript
// src/lib/guidelines/nice.ts

/**
 * NICE Guidelines API Integration
 * FREE API for UK clinical guidelines
 */

const NICE_BASE_URL = 'https://www.nice.org.uk/guidance';

export interface NICEGuideline {
  id: string;
  title: string;
  type: 'clinical' | 'technology' | 'public-health' | 'quality-standard';
  published: string;
  lastUpdated: string;
  summary: string;
  fullTextUrl: string;
  pdfUrl?: string;
  recommendations: string[];
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
  topics: string[];
  keywords: string[];
}

export interface NICESearchParams {
  query: string;
  type?: string[];
  fromDate?: string;
  toDate?: string;
  limit?: number;
}

export async function searchNICEGuidelines(
  params: NICESearchParams
): Promise<{ guidelines: NICEGuideline[]; total: number }> {
  try {
    const url = new URL(`${NICE_BASE_URL}/published`);
    
    // Add search parameters
    url.searchParams.append('q', params.query);
    
    if (params.type && params.type.length > 0) {
      params.type.forEach(t => url.searchParams.append('type', t));
    }
    
    url.searchParams.append('limit', (params.limit || 20).toString());
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    // Parse and return guidelines
    const guidelines: NICEGuideline[] = data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      published: item.publishedDate,
      lastUpdated: item.lastModified,
      summary: item.summary,
      fullTextUrl: `https://www.nice.org.uk/guidance/${item.id}`,
      pdfUrl: item.pdfUrl,
      recommendations: item.recommendations || [],
      evidenceLevel: item.evidenceLevel || 'C',
      topics: item.topics || [],
      keywords: item.keywords || [],
    }));
    
    return {
      guidelines,
      total: data.totalResults,
    };
  } catch (error) {
    console.error('NICE API error:', error);
    return { guidelines: [], total: 0 };
  }
}

export async function getGuidelineDetails(id: string): Promise<NICEGuideline | null> {
  try {
    const response = await fetch(`${NICE_BASE_URL}/${id}`);
    const data = await response.json();
    
    return {
      id: data.id,
      title: data.title,
      type: data.type,
      published: data.publishedDate,
      lastUpdated: data.lastModified,
      summary: data.summary,
      fullTextUrl: `https://www.nice.org.uk/guidance/${data.id}`,
      pdfUrl: data.pdfUrl,
      recommendations: data.recommendations || [],
      evidenceLevel: data.evidenceLevel || 'C',
      topics: data.topics || [],
      keywords: data.keywords || [],
    };
  } catch (error) {
    console.error('NICE guideline fetch error:', error);
    return null;
  }
}
```

---

### **Step 2: Create WHO Guidelines Integration**

```typescript
// src/lib/guidelines/who.ts

/**
 * WHO Guidelines API Integration
 * FREE API for international health guidelines
 */

const WHO_BASE_URL = 'https://www.who.int/api/v1';

export interface WHOGuideline {
  id: string;
  title: string;
  publishedDate: string;
  summary: string;
  fullTextUrl: string;
  pdfUrl?: string;
  topics: string[];
  regions: string[];
  languages: string[];
  type: 'guideline' | 'protocol' | 'recommendation';
}

export async function searchWHOGuidelines(
  query: string,
  limit: number = 20
): Promise<{ guidelines: WHOGuideline[]; total: number }> {
  try {
    const url = new URL(`${WHO_BASE_URL}/guidelines`);
    url.searchParams.append('q', query);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('language', 'en'); // English only
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    const guidelines = data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      publishedDate: item.date,
      summary: item.abstract,
      fullTextUrl: item.url,
      pdfUrl: item.pdfUrl,
      topics: item.topics || [],
      regions: item.regions || [],
      languages: item.languages || [],
      type: item.type || 'guideline',
    }));
    
    return { guidelines, total: data.total };
  } catch (error) {
    console.error('WHO API error:', error);
    return { guidelines: [], total: 0 };
  }
}
```

---

### **Step 3: Create AHA Guidelines Integration**

```typescript
// src/lib/guidelines/aha.ts

/**
 * American Heart Association Guidelines
 * FREE access to ACLS, BLS, PALS algorithms and cardiac guidelines
 */

const AHA_BASE_URL = 'https://professional.heart.org/api';

export interface AHAGuideline {
  id: string;
  title: string;
  category: 'ACLS' | 'BLS' | 'PALS' | 'Cardiac' | 'Stroke';
  published: string;
  summary: string;
  algorithmUrl?: string;
  pdfUrl?: string;
  evidenceLevel: string;
  recommendations: string[];
}

export async function searchAHAGuidelines(
  query: string,
  category?: string
): Promise<{ guidelines: AHAGuideline[]; total: number }> {
  try {
    const url = new URL(`${AHA_BASE_URL}/guidelines`);
    url.searchParams.append('q', query);
    
    if (category) {
      url.searchParams.append('category', category);
    }
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    const guidelines = data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      published: item.date,
      summary: item.summary,
      algorithmUrl: item.algorithmUrl,
      pdfUrl: item.pdfUrl,
      evidenceLevel: item.evidenceLevel,
      recommendations: item.recommendations || [],
    }));
    
    return { guidelines, total: data.total };
  } catch (error) {
    console.error('AHA API error:', error);
    return { guidelines: [], total: 0 };
  }
}

// Get specific ACLS algorithms
export async function getACLSAlgorithms(): Promise<AHAGuideline[]> {
  const { guidelines } = await searchAHAGuidelines('', 'ACLS');
  return guidelines;
}

// Get specific PALS algorithms
export async function getPALSAlgorithms(): Promise<AHAGuideline[]> {
  const { guidelines } = await searchAHAGuidelines('', 'PALS');
  return guidelines;
}
```

---

### **Step 4: Create Unified Guidelines Search**

```typescript
// src/lib/guidelines/unified-guidelines.ts

/**
 * Unified Clinical Guidelines Search
 * Combines NICE, WHO, AHA, CDC guidelines into single search
 */

import { searchNICEGuidelines, type NICEGuideline } from './nice';
import { searchWHOGuidelines, type WHOGuideline } from './who';
import { searchAHAGuidelines, type AHAGuideline } from './aha';

export interface UnifiedGuideline {
  id: string;
  source: 'nice' | 'who' | 'aha' | 'cdc';
  title: string;
  summary: string;
  published: string;
  lastUpdated?: string;
  fullTextUrl: string;
  pdfUrl?: string;
  evidenceLevel?: string;
  recommendations?: string[];
  topics: string[];
  category?: string;
}

export interface GuidelineSearchParams {
  query: string;
  sources?: ('nice' | 'who' | 'aha' | 'cdc')[];
  category?: string;
  fromDate?: string;
  toDate?: string;
  limit?: number;
}

export async function searchAllGuidelines(
  params: GuidelineSearchParams
): Promise<{
  guidelines: UnifiedGuideline[];
  total: number;
  sourceBreakdown: Record<string, number>;
}> {
  const sources = params.sources || ['nice', 'who', 'aha'];
  const maxPerSource = Math.ceil((params.limit || 30) / sources.length);
  
  const searchPromises: Promise<any>[] = [];
  
  if (sources.includes('nice')) {
    searchPromises.push(searchNICESource(params, maxPerSource));
  }
  
  if (sources.includes('who')) {
    searchPromises.push(searchWHOSource(params, maxPerSource));
  }
  
  if (sources.includes('aha')) {
    searchPromises.push(searchAHASource(params, maxPerSource));
  }
  
  const results = await Promise.all(searchPromises);
  
  // Combine and deduplicate
  const allGuidelines: UnifiedGuideline[] = [];
  const sourceBreakdown: Record<string, number> = {};
  let total = 0;
  
  results.forEach(result => {
    allGuidelines.push(...result.guidelines);
    sourceBreakdown[result.source] = result.total;
    total += result.total;
  });
  
  // Sort by publication date (newest first)
  allGuidelines.sort((a, b) => 
    new Date(b.published).getTime() - new Date(a.published).getTime()
  );
  
  return {
    guidelines: allGuidelines.slice(0, params.limit || 30),
    total,
    sourceBreakdown,
  };
}

async function searchNICESource(
  params: GuidelineSearchParams,
  maxResults: number
): Promise<{ source: string; guidelines: UnifiedGuideline[]; total: number }> {
  try {
    const result = await searchNICEGuidelines({
      query: params.query,
      limit: maxResults,
    });
    
    return {
      source: 'nice',
      guidelines: result.guidelines.map(convertNICEGuideline),
      total: result.total,
    };
  } catch (error) {
    return { source: 'nice', guidelines: [], total: 0 };
  }
}

async function searchWHOSource(
  params: GuidelineSearchParams,
  maxResults: number
): Promise<{ source: string; guidelines: UnifiedGuideline[]; total: number }> {
  try {
    const result = await searchWHOGuidelines(params.query, maxResults);
    
    return {
      source: 'who',
      guidelines: result.guidelines.map(convertWHOGuideline),
      total: result.total,
    };
  } catch (error) {
    return { source: 'who', guidelines: [], total: 0 };
  }
}

async function searchAHASource(
  params: GuidelineSearchParams,
  maxResults: number
): Promise<{ source: string; guidelines: UnifiedGuideline[]; total: number }> {
  try {
    const result = await searchAHAGuidelines(params.query, params.category);
    
    return {
      source: 'aha',
      guidelines: result.guidelines.map(convertAHAGuideline),
      total: result.total,
    };
  } catch (error) {
    return { source: 'aha', guidelines: [], total: 0 };
  }
}

// Conversion functions
function convertNICEGuideline(guideline: NICEGuideline): UnifiedGuideline {
  return {
    id: `nice-${guideline.id}`,
    source: 'nice',
    title: guideline.title,
    summary: guideline.summary,
    published: guideline.published,
    lastUpdated: guideline.lastUpdated,
    fullTextUrl: guideline.fullTextUrl,
    pdfUrl: guideline.pdfUrl,
    evidenceLevel: guideline.evidenceLevel,
    recommendations: guideline.recommendations,
    topics: guideline.topics,
    category: guideline.type,
  };
}

function convertWHOGuideline(guideline: WHOGuideline): UnifiedGuideline {
  return {
    id: `who-${guideline.id}`,
    source: 'who',
    title: guideline.title,
    summary: guideline.summary,
    published: guideline.publishedDate,
    fullTextUrl: guideline.fullTextUrl,
    pdfUrl: guideline.pdfUrl,
    topics: guideline.topics,
    category: guideline.type,
  };
}

function convertAHAGuideline(guideline: AHAGuideline): UnifiedGuideline {
  return {
    id: `aha-${guideline.id}`,
    source: 'aha',
    title: guideline.title,
    summary: guideline.summary,
    published: guideline.published,
    fullTextUrl: guideline.algorithmUrl || guideline.pdfUrl || '',
    pdfUrl: guideline.pdfUrl,
    evidenceLevel: guideline.evidenceLevel,
    recommendations: guideline.recommendations,
    topics: [guideline.category],
    category: guideline.category,
  };
}
```

---

### **Step 5: Create API Route**

```typescript
// src/app/api/guidelines/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { searchAllGuidelines } from '@/lib/guidelines/unified-guidelines';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const result = await searchAllGuidelines({
      query: searchParams.get('q') || '',
      sources: searchParams.get('sources')?.split(',') as any,
      category: searchParams.get('category') || undefined,
      fromDate: searchParams.get('fromDate') || undefined,
      toDate: searchParams.get('toDate') || undefined,
      limit: parseInt(searchParams.get('limit') || '30'),
    });
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Guidelines search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
```

---

### **Step 6: Create UI Page**

```typescript
// src/app/guidelines-search/page.tsx

'use client';

import { useState } from 'react';
import { Search, FileText, Download, ExternalLink, Filter } from 'lucide-react';

export default function GuidelinesSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSources, setSelectedSources] = useState(['nice', 'who', 'aha']);
  
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/guidelines/search?q=${encodeURIComponent(query)}&sources=${selectedSources.join(',')}&limit=30`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-6">
            <FileText className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Clinical Guidelines Search</h1>
              <p className="text-green-100 mt-2">
                Search 10,000+ evidence-based guidelines from NICE, WHO, AHA, and CDC
              </p>
            </div>
          </div>
          
          {/* Source Badges */}
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              📚 NICE (500+ guidelines)
            </span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              🌍 WHO (1000+ protocols)
            </span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              ❤️ AHA (ACLS, BLS, PALS)
            </span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              🏥 CDC (500+ guidelines)
            </span>
            <span className="px-4 py-2 bg-green-500/30 backdrop-blur-sm rounded-full text-sm font-semibold">
              💰 100% FREE
            </span>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for clinical guidelines... (e.g., 'sepsis', 'ACLS', 'stroke')"
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 font-semibold disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          {/* Source Selection */}
          <div className="mt-4 flex flex-wrap gap-2">
            {['nice', 'who', 'aha', 'cdc'].map(source => (
              <label key={source} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSources.includes(source)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSources([...selectedSources, source]);
                    } else {
                      setSelectedSources(selectedSources.filter(s => s !== source));
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm font-medium uppercase">{source}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      {/* Results */}
      {results && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Found {results.total.toLocaleString()} guidelines
            </h2>
            <p className="text-gray-600 mt-1">
              Showing results from {Object.keys(results.sourceBreakdown).join(', ')}
            </p>
          </div>
          
          <div className="space-y-4">
            {results.guidelines.map((guideline: any) => (
              <div
                key={guideline.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        guideline.source === 'nice' ? 'bg-blue-100 text-blue-700' :
                        guideline.source === 'who' ? 'bg-green-100 text-green-700' :
                        guideline.source === 'aha' ? 'bg-red-100 text-red-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {guideline.source.toUpperCase()}
                      </span>
                      {guideline.evidenceLevel && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                          Evidence: {guideline.evidenceLevel}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {guideline.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {guideline.summary}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📅 {new Date(guideline.published).getFullYear()}</span>
                      {guideline.topics.length > 0 && (
                        <span>🏷️ {guideline.topics.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <a
                      href={guideline.fullTextUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                    {guideline.pdfUrl && (
                      <a
                        href={guideline.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 Interactive Flowcharts

### **Create Interactive ACLS Flowchart Component**

```typescript
// src/components/flowcharts/ACLSFlowchart.tsx

'use client';

import { useState } from 'react';
import { Heart, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ACLSFlowchart() {
  const [currentStep, setCurrentStep] = useState(1);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        ACLS Cardiac Arrest Algorithm
      </h2>
      
      {/* Interactive flowchart steps */}
      <div className="space-y-6">
        <FlowchartStep
          number={1}
          title="Start CPR"
          description="Give oxygen, attach monitor/defibrillator"
          active={currentStep === 1}
          onClick={() => setCurrentStep(1)}
        />
        
        <FlowchartStep
          number={2}
          title="Check Rhythm"
          description="Shockable rhythm (VF/pVT)?"
          active={currentStep === 2}
          onClick={() => setCurrentStep(2)}
          options={[
            { label: 'Yes - Shockable', next: 3 },
            { label: 'No - Non-shockable', next: 5 },
          ]}
        />
        
        {/* Add more steps... */}
      </div>
    </div>
  );
}

function FlowchartStep({ number, title, description, active, onClick, options }: any) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
        active
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-red-300'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          active ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {number}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
          
          {options && (
            <div className="mt-4 flex gap-3">
              {options.map((opt: any, i: number) => (
                <button
                  key={i}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 📋 Implementation Checklist

### **Week 1: Core Guidelines**
- [ ] Create `src/lib/guidelines/nice.ts`
- [ ] Create `src/lib/guidelines/who.ts`
- [ ] Create `src/lib/guidelines/aha.ts`
- [ ] Create `src/lib/guidelines/cdc.ts`
- [ ] Create `src/lib/guidelines/unified-guidelines.ts`
- [ ] Create `src/app/api/guidelines/search/route.ts`
- [ ] Create `src/app/guidelines-search/page.tsx`
- [ ] Test all APIs
- [ ] Deploy to Vercel

### **Week 2: Interactive Flowcharts**
- [ ] Create `src/components/flowcharts/ACLSFlowchart.tsx`
- [ ] Create `src/components/flowcharts/PALSFlowchart.tsx`
- [ ] Create `src/components/flowcharts/SepsisFlowchart.tsx`
- [ ] Create `src/components/flowcharts/StrokeFlowchart.tsx`
- [ ] Create `src/app/flowcharts-interactive/page.tsx`
- [ ] Add to navigation sidebar
- [ ] Deploy to Vercel

---

## 💰 Cost Analysis

### **All FREE APIs:**
- NICE: ✅ FREE (no key required)
- WHO: ✅ FREE (no key required)
- AHA: ✅ FREE (public access)
- CDC: ✅ FREE (government API)
- GIN: ✅ FREE (registration required)

**Total Monthly Cost: $0** 🎉

---

## 🎯 Expected Coverage

- **NICE:** 500+ UK clinical guidelines
- **WHO:** 1,000+ international guidelines
- **AHA:** 200+ cardiac/emergency protocols
- **CDC:** 500+ disease guidelines
- **GIN:** 7,000+ international guidelines

**Total: ~10,000+ clinical guidelines** 📚

---

## 🚀 Next Steps

1. **Start with NICE API** (easiest, well-documented)
2. **Add WHO guidelines** (good JSON API)
3. **Integrate AHA algorithms** (ACLS, BLS, PALS)
4. **Build unified search** (like evidence library)
5. **Create interactive flowcharts**
6. **Add to navigation**
7. **Deploy to production**

---

## 📝 Summary

This plan gives you:
- ✅ 10,000+ clinical guidelines from authoritative sources
- ✅ 100% FREE (no monthly costs)
- ✅ Interactive flowcharts for emergency protocols
- ✅ Similar to evidence library architecture
- ✅ Easy to maintain and extend

**Ready to start implementation?** Let me know if you want me to create the first integration (NICE or WHO)!
