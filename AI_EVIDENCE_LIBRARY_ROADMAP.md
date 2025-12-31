# 🚀 AI-Enhanced Evidence Library Development Roadmap
**Target Date: December 31, 2025**

## 🎯 Vision
Transform the ECCCO Evidence Library into an **AI-powered, multi-source research hub** that seamlessly integrates PubMed, Cochrane, Google Scholar, NEJM, Lancet, JAMA, and other top journals with intelligent search and personalized learning recommendations.

---

## 📋 Current State Analysis

### ✅ What We Have
- **PubMed Integration**: Fully functional API (`/api/pubmed`) with search, fetch, and citation formatting
- **Basic Evidence Library**: Database schema, CRUD operations, 30+ curated references
- **Search Functionality**: Basic text search with category filtering
- **Database**: Prisma with PostgreSQL, `evidence_references` table
- **UI Components**: Evidence page with search bar and filters

### 🔧 What Needs Enhancement
- **Limited Sources**: Only manual curation + PubMed
- **No AI Features**: No intelligent summarization or recommendations
- **Basic Search**: No natural language processing or advanced filters
- **Static Content**: No real-time article discovery from multiple journals
- **No Personalization**: Search not tailored to user learning history

---

## 🎨 Phase 1: Enhanced UI/UX Design (2-3 hours)

### Goals
Create a modern, intuitive interface that rivals Google Scholar and PubMed interfaces

### Tasks
1. **Redesign Evidence Library Homepage**
   - Hero section with AI search bar (natural language)
   - Quick filters: Journal, Date Range, Evidence Level, Article Type
   - Trending topics section
   - Recent searches and saved searches
   - AI recommendations widget

2. **Advanced Search Interface**
   ```tsx
   - Natural language search box: "Latest sepsis trials from NEJM"
   - Auto-complete suggestions powered by AI
   - Filter sidebar:
     * Journals: NEJM, Lancet, JAMA, BMJ, Cochrane, ACEP, etc.
     * Date range slider (last week, month, year, 5 years)
     * Evidence level: Meta-analysis, RCT, Cohort, Case series
     * Specialties: Cardiology, Trauma, Pediatrics, etc.
     * Article type: Guideline, Trial, Review, Case report
   ```

3. **Article Card Design**
   ```tsx
   - Large readable title
   - Authors (first 3 + et al.)
   - Journal badge with impact factor
   - Publication date
   - AI-generated summary (2-3 sentences)
   - Evidence level badge
   - Quick actions: Save, Share, Export citation, Full text
   - Visual indicators: Open access, DOI link, PDF available
   ```

4. **Reading Experience**
   - Full article viewer with tabs: Abstract, Key Points, AI Summary, References
   - Highlight and annotate functionality
   - Text-to-speech option
   - Export as PDF with highlights

### Files to Create/Modify
- `src/app/evidence/page.tsx` - Complete redesign
- `src/components/evidence/SearchBar.tsx` - AI-powered search
- `src/components/evidence/ArticleCard.tsx` - Enhanced article display
- `src/components/evidence/FilterSidebar.tsx` - Advanced filters
- `src/components/evidence/ArticleViewer.tsx` - Full article reader

---

## 🔌 Phase 2: Multi-Source Integration (3-4 hours)

### Database APIs to Integrate

#### 1. **PubMed/NCBI** ✅ (Already working)
- **Status**: Implemented in `src/lib/pubmed.ts`
- **Coverage**: 35M+ citations
- **Enhancements needed**: Add MeSH term filtering, related articles

#### 2. **Cochrane Library**
- **API**: Cochrane Central Register of Controlled Trials (CENTRAL)
- **Access**: Free API with registration
- **Coverage**: Systematic reviews and meta-analyses
- **Implementation**:
  ```typescript
  // src/lib/cochrane.ts
  export async function searchCochrane(query: string) {
    // Use Cochrane API
    // Filter by: Reviews, Trials, Editorials
  }
  ```

#### 3. **Google Scholar**
- **API**: SerpAPI (Google Scholar API wrapper)
- **Cost**: $50/month for 5,000 searches
- **Coverage**: All academic publications
- **Implementation**:
  ```typescript
  // src/lib/google-scholar.ts
  import axios from 'axios';
  
  export async function searchGoogleScholar(query: string) {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_scholar',
        q: query,
        api_key: process.env.SERPAPI_KEY
      }
    });
    return response.data.organic_results;
  }
  ```

#### 4. **NEJM, Lancet, JAMA (Publisher APIs)**
- **NEJM**: Use RSS feeds + CrossRef API
- **Lancet**: Elsevier Developer Portal API
- **JAMA**: CrossRef API + web scraping (with rate limiting)
- **Implementation**: Unified journal search interface

#### 5. **CrossRef API** (Unified Journal Search)
- **Free API** for DOI metadata across 130M+ articles
- **Coverage**: All major journals with DOIs
- **Implementation**:
  ```typescript
  // src/lib/crossref.ts
  export async function searchCrossRef(query: string, filters: {
    publisher?: string[], // 'NEJM', 'Elsevier', 'BMJ', etc.
    fromDate?: string,
    untilDate?: string,
    type?: string[] // 'journal-article', 'review', etc.
  }) {
    // Search CrossRef API
    // Filter by journal, date, type
  }
  ```

### Unified Search Architecture
```typescript
// src/lib/evidence/unified-search.ts
export async function searchAllSources(query: string, options: SearchOptions) {
  const results = await Promise.all([
    searchPubMed(query, options),
    searchCochrane(query, options),
    searchGoogleScholar(query, options),
    searchCrossRef(query, {...options, publisher: ['NEJM', 'Lancet', 'JAMA']}),
  ]);
  
  return mergeAndRankResults(results);
}
```

### Files to Create
- `src/lib/cochrane.ts` - Cochrane integration
- `src/lib/google-scholar.ts` - Google Scholar via SerpAPI
- `src/lib/crossref.ts` - CrossRef API for journal articles
- `src/lib/evidence/unified-search.ts` - Combine all sources
- `src/lib/evidence/result-merger.ts` - Deduplicate and rank results

---

## 🤖 Phase 3: AI Integration (4-5 hours)

### AI Features to Implement

#### 1. **Intelligent Query Understanding**
```typescript
// src/lib/ai/query-processor.ts
import OpenAI from 'openai';

export async function processQuery(userQuery: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{
      role: 'system',
      content: 'Convert user queries into structured medical literature searches.'
    }, {
      role: 'user',
      content: `Query: "${userQuery}". Extract: main topic, filters, date constraints, article types.`
    }],
    response_format: { type: 'json_object' }
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

**Examples**:
- "Latest sepsis trials" → `{topic: 'sepsis', articleType: 'clinical trial', dateRange: 'last-year'}`
- "NEJM stroke guidelines 2023" → `{topic: 'stroke', journal: 'NEJM', articleType: 'guideline', year: 2023}`

#### 2. **AI Article Summarization**
```typescript
// src/lib/ai/summarizer.ts
export async function summarizeArticle(abstract: string, title: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{
      role: 'system',
      content: 'You are an emergency medicine expert. Summarize articles in 2-3 sentences with key clinical takeaways.'
    }, {
      role: 'user',
      content: `Title: ${title}\n\nAbstract: ${abstract}\n\nProvide: (1) One-sentence summary (2) Key clinical pearl (3) Practice implication`
    }]
  });
  
  return response.choices[0].message.content;
}
```

#### 3. **Clinical Pearl Extraction**
```typescript
// src/lib/ai/pearl-extractor.ts
export async function extractClinicalPearls(article: Article) {
  // Use GPT-4 to identify:
  // - Novel findings
  // - Practice-changing recommendations
  // - Clinical pearls for exam prep
  // - Memorable teaching points
}
```

#### 4. **Personalized Recommendations**
```typescript
// src/lib/ai/recommender.ts
export async function getPersonalizedRecommendations(userId: string) {
  // Analyze user's:
  // - Quiz performance (weak topics)
  // - Bookmark history
  // - Search history
  // - Learning goals
  
  // Recommend articles that:
  // - Address knowledge gaps
  // - Align with upcoming exams
  // - Build on previous readings
}
```

#### 5. **AI Search Assistant (Chat Interface)**
```tsx
// src/components/evidence/AIAssistant.tsx
// Floating chat widget:
// "What should I read about cardiac arrest?"
// → AI suggests: ACLS guidelines, CLOVERS trial, recent CPR meta-analyses
```

### Files to Create
- `src/lib/ai/query-processor.ts` - NLP query understanding
- `src/lib/ai/summarizer.ts` - Article summarization
- `src/lib/ai/pearl-extractor.ts` - Extract clinical pearls
- `src/lib/ai/recommender.ts` - Personalized recommendations
- `src/components/evidence/AIAssistant.tsx` - Chat interface
- `src/app/api/ai/summarize/route.ts` - Summarization API
- `src/app/api/ai/recommend/route.ts` - Recommendations API

---

## 💾 Phase 4: Enhanced Database Schema (2 hours)

### New Tables

#### 1. **evidence_articles** (Multi-source articles)
```sql
CREATE TABLE evidence_articles (
  id UUID PRIMARY KEY,
  source VARCHAR(50) NOT NULL, -- 'pubmed', 'cochrane', 'google_scholar'
  source_id VARCHAR(255) NOT NULL, -- PMID, DOI, etc.
  
  -- Article metadata
  title TEXT NOT NULL,
  authors JSONB, -- [{name, affiliation}]
  abstract TEXT,
  journal VARCHAR(255),
  publication_date DATE,
  
  -- Classification
  article_type VARCHAR(100), -- 'trial', 'review', 'guideline'
  evidence_level VARCHAR(10),
  specialty VARCHAR(100),
  
  -- Links
  doi VARCHAR(255),
  pmid VARCHAR(50),
  url TEXT,
  pdf_url TEXT,
  
  -- AI-generated content
  ai_summary TEXT,
  clinical_pearls JSONB,
  key_findings JSONB,
  
  -- Metadata
  citation_count INTEGER,
  impact_factor DECIMAL,
  open_access BOOLEAN,
  
  -- User interactions
  view_count INTEGER DEFAULT 0,
  bookmark_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_articles_source ON evidence_articles(source, source_id);
CREATE INDEX idx_articles_journal ON evidence_articles(journal);
CREATE INDEX idx_articles_date ON evidence_articles(publication_date);
CREATE INDEX idx_articles_specialty ON evidence_articles(specialty);
```

#### 2. **user_evidence_interactions**
```sql
CREATE TABLE user_evidence_interactions (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  article_id UUID REFERENCES evidence_articles(id),
  
  -- Interaction types
  bookmarked BOOLEAN DEFAULT FALSE,
  read BOOLEAN DEFAULT FALSE,
  annotated BOOLEAN DEFAULT FALSE,
  
  -- Reading progress
  reading_time INTEGER, -- seconds
  last_position TEXT, -- for resuming reading
  
  -- User notes
  annotations JSONB,
  highlights JSONB,
  rating INTEGER, -- 1-5 stars
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. **search_history**
```sql
CREATE TABLE search_history (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255),
  query TEXT NOT NULL,
  filters JSONB,
  results_count INTEGER,
  clicked_article_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Files to Create
- `prisma/migrations/add_evidence_articles.sql`
- `prisma/migrations/add_user_interactions.sql`
- `src/lib/database/evidence-articles.ts` - ORM functions

---

## 🔍 Phase 5: Smart Search Features (3 hours)

### Features to Implement

#### 1. **Natural Language Search**
- Input: "Show me recent sepsis guidelines from 2024"
- AI processes → Structured query → Search all sources

#### 2. **Autocomplete & Suggestions**
```typescript
// src/lib/evidence/autocomplete.ts
export async function getSearchSuggestions(partial: string) {
  // Combine:
  // - Common search terms
  // - MeSH terms from PubMed
  // - User's past searches
  // - Trending topics
}
```

#### 3. **Saved Searches & Alerts**
- Save frequent searches
- Email alerts for new articles matching criteria
- RSS feeds for custom searches

#### 4. **Advanced Filters**
- **Date ranges**: Last week, month, year, custom
- **Journals**: Multi-select top journals
- **Evidence level**: Meta-analysis, RCT, observational
- **Article type**: Guidelines, trials, reviews
- **Open access only**: Toggle for free full-text
- **Citation count**: Minimum citations threshold

#### 5. **Smart Sorting**
- Relevance (AI-ranked)
- Publication date (newest first)
- Citation count (most cited)
- Impact factor (top journals)
- User engagement (most bookmarked)

### Files to Create
- `src/components/evidence/NaturalLanguageSearch.tsx`
- `src/components/evidence/AutocompleteSearch.tsx`
- `src/components/evidence/AdvancedFilters.tsx`
- `src/components/evidence/SavedSearches.tsx`
- `src/lib/evidence/autocomplete.ts`
- `src/lib/evidence/search-ranker.ts` - AI-powered relevance ranking

---

## 📊 Phase 6: Analytics & Personalization (2 hours)

### Features

#### 1. **Reading Analytics**
- Track which articles users read
- Time spent on each article
- Completion rate
- Topics of interest

#### 2. **Personalized Dashboard**
```tsx
// User sees:
- "Recommended for you" (based on quiz performance)
- "Continue reading" (resume articles)
- "Trending in your specialty"
- "Your reading stats this week"
```

#### 3. **Learning Path Integration**
- Link articles to quiz topics
- Suggest readings based on wrong answers
- Pre-exam reading lists

---

## 🚀 Phase 7: Deployment & Testing (1-2 hours)

### Deployment Checklist
- [ ] Set up OpenAI API key in Vercel environment
- [ ] Configure SerpAPI key (Google Scholar)
- [ ] Set up Cochrane API credentials
- [ ] Test all API integrations with rate limiting
- [ ] Verify database migrations on production
- [ ] Test search performance (< 2s response time)
- [ ] Load test with 100 concurrent users
- [ ] Mobile responsiveness testing
- [ ] Accessibility audit (WCAG 2.1)

### Environment Variables Needed
```env
# OpenAI
OPENAI_API_KEY=sk-...

# Google Scholar
SERPAPI_KEY=...

# Cochrane
COCHRANE_API_KEY=...

# Rate Limiting
RATE_LIMIT_REQUESTS_PER_MINUTE=60
```

---

## 💰 Cost Estimation

### API Costs (Monthly)
- **OpenAI GPT-4 Turbo**: $10-50 (depending on usage)
  - Query processing: ~$0.01 per 1K tokens
  - Summarization: ~$0.03 per 1K tokens
  - Expected: 1,000-5,000 requests/month = $20-40

- **SerpAPI (Google Scholar)**: $50/month
  - 5,000 searches included
  - Additional searches: $0.002 each

- **CrossRef API**: FREE ✅
- **PubMed API**: FREE ✅
- **Cochrane API**: FREE with registration ✅

**Total Monthly Cost**: ~$60-100

### Infrastructure
- Vercel hosting: FREE (Hobby tier sufficient) ✅
- Supabase/Prisma Cloud database: FREE tier ✅

---

## 📈 Success Metrics

### User Engagement
- [ ] 50+ evidence searches per day
- [ ] 20+ articles bookmarked per day
- [ ] Average reading time: 5+ minutes per article
- [ ] 80% user satisfaction with AI summaries

### Content Quality
- [ ] 1,000+ articles indexed from multiple sources
- [ ] 95% accuracy in AI summaries (peer-reviewed)
- [ ] 90% of top journal articles available

### Performance
- [ ] Search results in < 2 seconds
- [ ] Page load time < 1 second
- [ ] 99.9% uptime

---

## 🎯 Quick Win - Today's Implementation

### Most Impactful Features (4-6 hours total)
1. **Enhanced UI** (1.5 hours) - Modern search interface
2. **CrossRef Integration** (1 hour) - Access to all major journals
3. **AI Summarization** (1.5 hours) - GPT-4 powered summaries
4. **Advanced Filters** (1 hour) - Journal, date, evidence level filters
5. **Database Schema** (1 hour) - Prepare for multi-source storage

### Tomorrow's Next Steps
- Google Scholar integration
- Cochrane database
- Personalized recommendations
- Reading analytics

---

## 📚 Resources & Documentation

### API Documentation
- [PubMed E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25501/)
- [CrossRef API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/)
- [SerpAPI Google Scholar](https://serpapi.com/google-scholar-api)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Cochrane Library API](https://community.cochrane.org/style-manual/references/databases)

### Design Inspiration
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/)
- [Google Scholar](https://scholar.google.com/)
- [Semantic Scholar](https://www.semanticscholar.org/)
- [Connected Papers](https://www.connectedpapers.com/)

---

## ✅ Next Actions

**Immediate (Today)**:
1. Review this roadmap
2. Set up OpenAI API key
3. Start with Phase 1: Enhanced UI design
4. Implement CrossRef integration for instant journal access
5. Add GPT-4 summarization to existing PubMed results

**This Week**:
- Complete all 6 phases
- Deploy to production
- Gather user feedback
- Iterate on AI features

---

**Status**: Ready to begin implementation! 🚀
**Last Updated**: December 31, 2025
