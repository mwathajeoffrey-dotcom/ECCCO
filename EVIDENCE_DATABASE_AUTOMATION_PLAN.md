# Building an Automated Evidence-Based Research Database
## Like Consensus AI for Emergency Medicine

**Date**: December 17, 2025  
**Goal**: Create automated pipeline to populate Evidence Library with research papers

---

## 🎯 What is Consensus AI?

**Consensus** (consensus.app) is an AI-powered academic search engine that:
- Searches 200+ million research papers
- Uses AI to summarize findings
- Extracts key conclusions and consensus from multiple studies
- Provides evidence-based answers with citations
- Shows aggregate findings across multiple papers

**Why it's powerful**: Instead of manually reading dozens of papers, Consensus AI synthesizes findings from hundreds of studies instantly.

---

## 📊 Current State vs Desired State

### Current State (Manual Process)
✅ **What we have**:
- Evidence Library with manually curated papers
- 9 categories (Cardiac, Pediatric, ACS, Stroke, Sepsis, Trauma, etc.)
- Rich metadata (DOI, key recommendations, clinical pearls)
- Beautiful UI with expandable cards

❌ **Limitations**:
- **Manual curation**: Each paper requires 30-60 minutes to add
- **Limited scope**: Only ~20 papers currently
- **Update lag**: New research takes time to discover and add
- **Bias**: Limited to papers we manually find
- **No search**: Users can't search for specific topics

### Desired State (Automated System)
🎯 **What we want**:
- **Automated discovery**: AI finds relevant papers daily
- **Auto-summarization**: AI extracts key findings
- **Search capability**: Users search for specific topics
- **Live updates**: New research auto-added
- **Coverage**: 1000+ papers across all emergency medicine topics
- **Consensus view**: Synthesize multiple papers on same topic

---

## 🏗️ Architecture: 3-Phase Implementation

### **Phase 1: API Integration & Data Pipeline** (2-3 weeks)
Set up connections to research databases

### **Phase 2: AI-Powered Extraction** (2-3 weeks)
Build AI to extract and summarize papers

### **Phase 3: Search & User Features** (2-3 weeks)
Add search, filtering, and consensus views

---

## 📚 PHASE 1: Research Database APIs

### Option A: PubMed API (FREE) ⭐ RECOMMENDED
**Why**: Free, comprehensive, government-maintained

```typescript
// Example: Search PubMed for emergency medicine papers
async function searchPubMed(query: string) {
  const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
  
  // Step 1: Search for paper IDs
  const searchUrl = `${baseUrl}esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmode=json&retmax=100`;
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  const pmids = searchData.esearchresult.idlist;
  
  // Step 2: Fetch full paper details
  const fetchUrl = `${baseUrl}efetch.fcgi?db=pubmed&id=${pmids.join(',')}&retmode=xml`;
  const papersRes = await fetch(fetchUrl);
  const papersXml = await papersRes.text();
  
  return parsePubMedXML(papersXml);
}

// Usage
const papers = await searchPubMed('emergency medicine cardiac arrest randomized controlled trial');
```

**PubMed Coverage**:
- 36+ million citations
- MEDLINE database (trusted medical journals)
- Free full-text for PMC articles
- Structured data: authors, abstract, MeSH terms, DOI

**Rate Limits**: 
- No API key: 3 requests/second
- With API key (free): 10 requests/second

### Option B: Semantic Scholar API (FREE)
**Why**: AI-powered, good for finding influential papers

```typescript
async function searchSemanticScholar(query: string) {
  const response = await fetch(
    `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&fields=title,abstract,authors,citationCount,year,openAccessPdf,externalIds`,
    {
      headers: {
        'x-api-key': process.env.SEMANTIC_SCHOLAR_API_KEY // Free API key
      }
    }
  );
  return await response.json();
}
```

**Semantic Scholar Coverage**:
- 200+ million papers
- AI-powered relevance ranking
- Citation counts (find influential papers)
- Free PDF links when available
- "Highly Influential Citations" metric

### Option C: OpenAlex API (FREE) ⭐ ALTERNATIVE
**Why**: Open-source replacement for Microsoft Academic

```typescript
async function searchOpenAlex(query: string) {
  const response = await fetch(
    `https://api.openalex.org/works?search=${encodeURIComponent(query)}&filter=type:journal-article,is_oa:true&per-page=100`
  );
  return await response.json();
}
```

**OpenAlex Coverage**:
- 250+ million works
- Fully open access data
- No rate limits
- Good for meta-analysis

### Option D: Crossref API (FREE)
**Why**: DOI registry, good for metadata

```typescript
async function searchCrossref(query: string) {
  const response = await fetch(
    `https://api.crossref.org/works?query=${encodeURIComponent(query)}&filter=type:journal-article&rows=100`
  );
  return await response.json();
}
```

---

## 🤖 PHASE 2: AI-Powered Extraction

### Step 1: Use OpenAI to Extract Key Information

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function extractClinicalPearls(paper: {
  title: string;
  abstract: string;
  fullText?: string;
}) {
  const prompt = `You are an emergency medicine expert. Extract key clinical information from this research paper.

PAPER TITLE: ${paper.title}

ABSTRACT: ${paper.abstract}

Extract the following in JSON format:
{
  "keyRecommendations": ["recommendation 1", "recommendation 2", ...],
  "clinicalPearls": ["pearl 1", "pearl 2", ...],
  "evidenceLevel": "Level of evidence classification",
  "practicalTakeaway": "One-sentence practical takeaway for ED physicians",
  "category": "Emergency medicine category (Cardiac, Trauma, Sepsis, etc.)"
}

Focus on:
- Actionable clinical recommendations
- Numbers (NNT, mortality rates, dosing)
- Practice-changing findings
- Key trial data`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are an emergency medicine research expert who extracts actionable clinical insights from papers." },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content);
}
```

### Step 2: Process Full-Text PDFs

```typescript
import pdf from 'pdf-parse';

async function extractFullText(pdfUrl: string) {
  const response = await fetch(pdfUrl);
  const buffer = await response.arrayBuffer();
  const data = await pdf(Buffer.from(buffer));
  return data.text;
}

async function processNewPaper(pmid: string) {
  // 1. Get paper metadata from PubMed
  const metadata = await getPubMedPaper(pmid);
  
  // 2. Try to get full text
  let fullText = metadata.abstract;
  if (metadata.pdfUrl) {
    fullText = await extractFullText(metadata.pdfUrl);
  }
  
  // 3. Extract clinical insights with AI
  const insights = await extractClinicalPearls({
    title: metadata.title,
    abstract: metadata.abstract,
    fullText
  });
  
  // 4. Save to database
  await prisma.researchPaper.create({
    data: {
      pmid,
      doi: metadata.doi,
      title: metadata.title,
      abstract: metadata.abstract,
      authors: metadata.authors,
      journal: metadata.journal,
      year: metadata.year,
      category: insights.category,
      keyRecommendations: insights.keyRecommendations,
      clinicalPearls: insights.clinicalPearls,
      evidenceLevel: insights.evidenceLevel,
      practicalTakeaway: insights.practicalTakeaway
    }
  });
}
```

---

## 🗄️ Database Schema

```prisma
// prisma/schema.prisma

model ResearchPaper {
  id                   String   @id @default(cuid())
  pmid                 String?  @unique
  doi                  String   @unique
  title                String
  abstract             String   @db.Text
  fullText             String?  @db.Text
  authors              String[]
  journal              String
  year                 Int
  category             String
  topics               String[]
  
  // AI-extracted fields
  keyRecommendations   String[]
  clinicalPearls       String[]
  evidenceLevel        String
  practicalTakeaway    String
  
  // Metadata
  citationCount        Int      @default(0)
  isHighImpact         Boolean  @default(false)
  pdfUrl               String?
  
  // Embeddings for semantic search
  titleEmbedding       Float[]  // Vector for semantic search
  abstractEmbedding    Float[]
  
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  
  @@index([category])
  @@index([year])
  @@index([citationCount])
}

model PaperConsensus {
  id                   String   @id @default(cuid())
  topic                String   @unique
  paperCount           Int
  majorFindings        String[]
  consensusStatement   String   @db.Text
  contradictions       String[]
  evidenceQuality      String
  
  // Related papers
  papers               ResearchPaper[]
  
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}
```

---

## 🔍 PHASE 3: Search & User Features

### Feature 1: Semantic Search (Vector Search)

```typescript
import { OpenAI } from 'openai';

const openai = new OpenAI();

// Generate embedding for search query
async function searchPapers(query: string) {
  // 1. Convert query to embedding
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query
  });
  
  // 2. Vector similarity search in database
  // Using Prisma + PostgreSQL with pgvector extension
  const papers = await prisma.$queryRaw`
    SELECT 
      id, title, abstract, category, 
      1 - (title_embedding <=> ${embedding.data[0].embedding}::vector) as similarity
    FROM research_papers
    WHERE 1 - (title_embedding <=> ${embedding.data[0].embedding}::vector) > 0.7
    ORDER BY similarity DESC
    LIMIT 20
  `;
  
  return papers;
}
```

### Feature 2: Consensus View

```typescript
// Synthesize findings from multiple papers on same topic
async function generateConsensus(topic: string) {
  // 1. Find all papers on topic
  const papers = await searchPapers(topic);
  
  // 2. Extract all recommendations
  const allRecommendations = papers.flatMap(p => p.keyRecommendations);
  
  // 3. Use AI to synthesize consensus
  const prompt = `Based on these ${papers.length} research papers on "${topic}", 
  synthesize a consensus statement on best practices.
  
  Papers:
  ${papers.map(p => `- ${p.title} (${p.year}): ${p.practicalTakeaway}`).join('\n')}
  
  All recommendations:
  ${allRecommendations.join('\n- ')}
  
  Provide:
  1. Consensus statement (what most papers agree on)
  2. Contradictions (where papers disagree)
  3. Evidence quality assessment
  4. Practical recommendation for clinicians`;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }]
  });
  
  return completion.choices[0].message.content;
}
```

### Feature 3: Auto-Discovery (Daily Job)

```typescript
// Cron job: Run daily to discover new papers
export async function discoverNewPapers() {
  const topics = [
    'cardiac arrest emergency medicine',
    'septic shock emergency department',
    'traumatic brain injury management',
    'acute coronary syndrome treatment',
    'pediatric emergency medicine',
    'stroke thrombolysis emergency'
  ];
  
  for (const topic of topics) {
    // Search PubMed for papers from last 30 days
    const query = `${topic} AND ("last 30 days"[PDat])`;
    const papers = await searchPubMed(query);
    
    for (const paper of papers) {
      // Check if already in database
      const exists = await prisma.researchPaper.findUnique({
        where: { doi: paper.doi }
      });
      
      if (!exists && isHighQuality(paper)) {
        // Process and add to database
        await processNewPaper(paper.pmid);
      }
    }
  }
}

// Filter for high-quality papers
function isHighQuality(paper: any): boolean {
  return (
    // Only include high-impact journals or RCTs
    paper.publicationType.includes('Randomized Controlled Trial') ||
    paper.publicationType.includes('Meta-Analysis') ||
    paper.publicationType.includes('Systematic Review') ||
    paper.citationCount > 50
  );
}
```

---

## 💰 Cost Analysis

### Free Tier (MVP)
- **PubMed API**: FREE ✅
- **Semantic Scholar API**: FREE (10K requests/month) ✅
- **OpenAI GPT-4o**: $2.50 per 1M input tokens
  - Process 100 papers: ~$2-3
  - Process 1000 papers: ~$20-30
- **Database**: Vercel Postgres (Free tier: 256MB)

**Total for MVP**: ~$30-50/month

### Production Scale
- **OpenAI GPT-4o**: $150/month (5000 papers)
- **Database**: Vercel Postgres ($20/month for 10GB)
- **Vector Search**: Pinecone ($70/month) or pgvector (FREE)

**Total for Production**: ~$200-250/month

---

## 🚀 Implementation Roadmap

### Week 1-2: Foundation
- [ ] Add database schema for ResearchPaper model
- [ ] Integrate PubMed API
- [ ] Test extracting paper metadata
- [ ] Build admin interface to review auto-extracted papers

### Week 3-4: AI Extraction
- [ ] Implement OpenAI extraction pipeline
- [ ] Process 100 papers manually to test quality
- [ ] Refine prompts for better extraction
- [ ] Add manual review/edit capability

### Week 5-6: Search & Discovery
- [ ] Add pgvector extension to PostgreSQL
- [ ] Implement semantic search with embeddings
- [ ] Build search UI component
- [ ] Add filters (category, year, evidence level)

### Week 7-8: Automation
- [ ] Create daily cron job for paper discovery
- [ ] Build consensus generation feature
- [ ] Add email notifications for new papers
- [ ] Launch beta to users

---

## 🎯 Quick Start: Add 10 Papers Today

**Immediate action** (2 hours):

```typescript
// /scripts/bootstrap-papers.ts
const LANDMARK_PAPERS = [
  '32871879', // Hypertonic saline vs mannitol (TBI)
  '27043282', // CRASH-2 TXA trial
  '25594969', // PROPPR trial
  '23782161', // PROSEVA (prone positioning)
  '22738085', // ARREST trial (hypothermia)
  '29526158', // PARAMEDIC2 (adrenaline)
  '27979602', // ANDROMEDA-SHOCK (lactate)
  '31112386', // CLOVERS (sepsis fluids)
  '20068207', // NICE-SUGAR (glucose)
  '26398070'  // TTM trial (temperature)
];

for (const pmid of LANDMARK_PAPERS) {
  await processNewPaper(pmid);
}
```

---

## 📊 Metrics to Track

### Quality Metrics
- Papers added per week
- AI extraction accuracy (manual review)
- User search satisfaction
- Time saved vs manual curation

### Usage Metrics
- Search queries per day
- Most searched topics
- Papers viewed/clicked
- User feedback on recommendations

---

## 🔮 Future Enhancements

### Phase 4: Advanced Features
- **Paper recommendations**: "Based on your specialty, here are new papers"
- **Email digest**: Weekly summary of new research
- **Bookmark & annotations**: Users save papers with notes
- **CME integration**: Track papers read for CME credits
- **Practice guidelines**: Auto-generate guidelines from consensus
- **Clinical calculators**: Extract from papers (e.g., risk scores)

### Phase 5: Community Features
- **Peer reviews**: EM physicians rate paper quality
- **Discussion threads**: Comment on papers
- **Implementation stories**: "How I used this in my ED"
- **Journal club**: Scheduled discussions of papers

---

## 🏆 Success Criteria

**MVP Success** (3 months):
- ✅ 500+ papers in database
- ✅ Search returns relevant results 90% of time
- ✅ 10+ new papers added automatically per week
- ✅ 100+ monthly active users searching

**Full Success** (6 months):
- ✅ 2000+ papers across all EM topics
- ✅ Consensus views for 50+ key topics
- ✅ 500+ monthly active users
- ✅ Cited by other EM resources
- ✅ Featured in FOAM (Free Open Access Medicine) community

---

## 📚 Alternative: Use Existing Services

### Option 1: Partner with Existing APIs
Instead of building from scratch, integrate:

- **PubMed/MEDLINE**: Free government database
- **Up-To-Date API**: Pay for access (~$1000/year)
- **ClinicalKey**: Elsevier's research database
- **DynaMed**: Evidence-based clinical resource

### Option 2: Embed Consensus AI
Pay for Consensus API access (~$500-1000/month) and embed in your app

### Option 3: Curated Manual Approach
Continue manual curation but with better workflow:
- Use Zotero/Mendeley for research management
- Create template for fast paper entry
- Crowdsource from EM community

---

## 🎓 Recommended Approach

**Best Strategy**: **Hybrid Approach**

1. **Short-term** (Next 2 weeks):
   - Manually add 50 landmark papers (use PubMed search)
   - Build better UI for browsing/searching existing papers
   - Add basic keyword search

2. **Medium-term** (1-3 months):
   - Integrate PubMed API for paper metadata
   - Use GPT-4o to extract clinical pearls from abstracts
   - Semi-automated: AI suggests, human reviews

3. **Long-term** (3-6 months):
   - Full automation with quality filters
   - Semantic search with embeddings
   - Consensus generation
   - User contributions & ratings

**Why this works**:
- ✅ Fast time-to-value (manual curation works now)
- ✅ Learn what users actually want
- ✅ Build trust before full automation
- ✅ Iterative quality improvement

---

## 📞 Next Steps

**Choose your path**:

### Path A: Quick Manual Boost (TODAY)
I can help you add 50-100 landmark papers manually in the next few hours using PubMed search.

### Path B: Build API Integration (THIS WEEK)
Set up PubMed API integration and process first 100 papers with AI extraction.

### Path C: Full Automation (THIS MONTH)
Implement complete pipeline with daily discovery, AI extraction, and semantic search.

**What would you like to do first?** 🚀
