# 🔬 Evidence Search Improvements Plan

## Issues Identified

1. **Lost AI Synthesis**: Main `/evidence` page shows simple library, not AI-powered search
2. **Search Limitations**: Current search references abstracts only, not full content
3. **Drug Search Missing**: No specialized search for medications (indications, dosages, contraindications)

## Current State

### Two Evidence Pages:

- `/evidence` - Simple library view ❌ (currently in use)
- `/evidence-search` - Advanced AI synthesis ✅ (hidden but functional)

### What Works:

- `/evidence-search` has full AI synthesis via `/api/evidence/consensus-search`
- Quality scoring prioritizes guidelines, meta-analyses, tier-1 journals
- Consensus search generates structured clinical summaries

## Proposed Solutions

### Option 1: Replace Main Evidence Page (Recommended)

**Effort**: 30 minutes

- Rename `/evidence-search/page.tsx` → `/evidence/page.tsx`
- Archive old library view to backups
- Update navigation links
- **Result**: Full AI synthesis becomes default experience

### Option 2: Hybrid Approach

**Effort**: 2-3 hours

- Add tab switcher to `/evidence` page
- Tab 1: "AI Search" (consensus search)
- Tab 2: "Library" (simple view)
- Tab 3: "Drug Database" (new feature)
- **Result**: Best of both worlds

### Option 3: Drug-Specific Search Enhancement

**Effort**: 4-6 hours

- Create `/api/evidence/drug-search` endpoint
- Specialized prompts for medication queries
- Structured output: indications, dosing, contraindications, monitoring
- Integration with DrugBank/RxNorm APIs (optional)

## Implementation Plan

### Phase 1: Restore AI Synthesis (Quick Win - 30 min)

```bash
# Backup old evidence page
mv src/app/evidence/page.tsx src/app/evidence/page.library.backup.tsx

# Use advanced search as main page
cp src/app/evidence-search/page.tsx src/app/evidence/page.tsx

# Update redirect
# evidence-search → evidence
```

### Phase 2: Add Drug Search Capability (4-6 hours)

**New API Route**: `src/app/api/evidence/drug-search/route.ts`

**Features**:

1. Detect drug name in query
2. Search with medication-specific filters
3. Generate structured response:
   - Drug class & mechanism
   - Clinical indications
   - Dosing (adult/pediatric)
   - Contraindications
   - Monitoring parameters
   - Key drug interactions
   - Evidence quality scores

**Example Queries**:

- "amoxicillin dosing for pneumonia"
- "lisinopril contraindications"
- "metformin indications"
- "warfarin drug interactions"

### Phase 3: Enhanced Search UI (2 hours)

**Quick Search Templates**:

```tsx
const searchTemplates = [
  { label: "Drug Dosing", placeholder: "e.g., vancomycin dosing for sepsis" },
  {
    label: "Clinical Question",
    placeholder: "e.g., management of diabetic ketoacidosis",
  },
  { label: "Guideline", placeholder: "e.g., STEMI guidelines 2024" },
  { label: "Drug Interaction", placeholder: "e.g., warfarin and antibiotics" },
];
```

**Smart Query Detection**:

- Medication queries → Use drug search
- Procedure queries → Use clinical search
- Guideline queries → Filter for guidelines
- Drug interaction queries → Cross-reference mode

## Drug Search Implementation

### API Enhancement

```typescript
// src/app/api/evidence/drug-search/route.ts
export async function POST(request: NextRequest) {
  const { query } = await request.json();

  // Detect if this is a drug query
  const drugKeywords = [
    "dosing",
    "dose",
    "indication",
    "contraindication",
    "interaction",
    "adverse effect",
    "monitoring",
  ];

  const isDrugQuery = drugKeywords.some((k) => query.toLowerCase().includes(k));

  if (isDrugQuery) {
    // Search with medication-specific filters
    const results = await searchAllSources({
      query,
      filters: {
        articleType: ["guideline", "systematic-review", "clinical-trial"],
        hasAbstract: true,
        journal: [...TIER_1_JOURNALS, "Clinical Pharmacology"],
      },
    });

    // Generate drug-specific synthesis
    const synthesis = await generateDrugSynthesis(query, results);

    return NextResponse.json({
      type: "drug",
      drug: extractDrugName(query),
      sections: [
        { title: "Indications", content: synthesis.indications },
        { title: "Dosing", content: synthesis.dosing },
        { title: "Contraindications", content: synthesis.contraindications },
        { title: "Monitoring", content: synthesis.monitoring },
        { title: "Interactions", content: synthesis.interactions },
      ],
      sources: results.articles,
    });
  }
}
```

### Specialized Prompt Template

```typescript
const DRUG_SYNTHESIS_PROMPT = `
You are a clinical pharmacist providing evidence-based drug information.

Query: {query}

Based on the following research articles, provide a comprehensive drug monograph:

1. **Indications**: FDA-approved and off-label uses
2. **Dosing**:
   - Adult dosing (with renal/hepatic adjustments)
   - Pediatric dosing (if applicable)
   - Route and frequency
3. **Contraindications**: Absolute and relative
4. **Adverse Effects**: Common and serious
5. **Drug Interactions**: Clinically significant interactions
6. **Monitoring**: Required lab monitoring and clinical parameters
7. **Clinical Pearls**: Key points for safe prescribing

Format: Structured sections with citations [1], [2], etc.
Prioritize high-quality evidence (guidelines, systematic reviews).
`;
```

## Benefits

### User Experience:

✅ **One-click AI synthesis** - Default experience
✅ **Drug-specific results** - Structured medication info
✅ **Better search relevance** - Full content, not just abstracts
✅ **Quality indicators** - Tier-1 journals, guidelines highlighted
✅ **Recent evidence** - Prioritizes current guidelines

### Clinical Value:

✅ **Point-of-care ready** - Actionable information
✅ **Evidence-graded** - Quality scores visible
✅ **Citation tracking** - All claims referenced
✅ **Safe prescribing** - Contraindications highlighted

## Timeline

| Phase | Task                       | Effort  | Priority |
| ----- | -------------------------- | ------- | -------- |
| 1     | Replace main evidence page | 30 min  | HIGH     |
| 2     | Test AI synthesis          | 15 min  | HIGH     |
| 3     | Add drug search API        | 3 hours | MEDIUM   |
| 4     | Create drug UI templates   | 2 hours | MEDIUM   |
| 5     | Add search suggestions     | 1 hour  | LOW      |
| 6     | Integration testing        | 1 hour  | MEDIUM   |

**Total Effort**: 7-8 hours
**Quick Win**: Phase 1+2 (45 min) restores AI synthesis

## Testing Plan

### Test Cases:

1. **General Clinical Query**:

   - Input: "management of diabetic ketoacidosis"
   - Expected: Structured synthesis with guidelines

2. **Drug Dosing**:

   - Input: "vancomycin dosing for MRSA pneumonia"
   - Expected: Adult/pediatric dosing, renal adjustments

3. **Drug Interactions**:

   - Input: "warfarin and amoxicillin interaction"
   - Expected: INR monitoring, dose adjustment guidance

4. **Indications**:
   - Input: "metformin indications"
   - Expected: T2DM, PCOS, prediabetes with evidence

## Success Metrics

- ✅ AI synthesis visible on main evidence page
- ✅ Drug queries return structured medication info
- ✅ Search results include full content, not just abstracts
- ✅ Response time < 15 seconds (first search)
- ✅ Response time < 1 second (cached searches)
- ✅ High-quality sources prioritized (guidelines, tier-1 journals)

## Next Steps

1. **Immediate** (30 min): Replace `/evidence` page with AI search
2. **This Week** (4 hours): Add drug search capability
3. **Future**: Integrate DrugBank API for comprehensive drug database

---

**Status**: Ready for implementation
**Created**: January 21, 2026
**Priority**: HIGH (User-reported issue)
