# ✅ Minimum Article Requirement Fixed - 500 Error Resolved

## Problem Identified

The evidence search was throwing a **500 Internal Server Error** for certain queries because the quality filter was too strict and required at least 3 articles to pass filtering.

### Error Details

```
[Evidence Synthesis Error] Error: Insufficient evidence.
Found 2 articles, need at least 3. Try a broader query.
POST /api/evidence/synthesize 500 in 2.7s
```

### Example Query That Failed

- **Query**: "treatment for uncomplicated malaria"
- **Articles Found**: 45 total articles
- **Articles After Quality Filter**: Only 2 passed
- **Result**: 500 error (needed 3 minimum)

---

## Root Cause

The synthesis engine had a **hardcoded minimum of 3 articles** in two places:

```typescript
// Location 1: Primary filter check
if (clinicalArticles.length < 3) {
  // try lenient filter...
}

// Location 2: Fallback filter check
if (lenientArticles.length < 3) {
  throw new Error(
    "Insufficient evidence. Found 2 articles, need at least 3..."
  );
}
```

This was too strict because:

1. Some medical topics have limited recent high-quality research
2. Specialty topics may only have a few top-tier journal articles
3. The quality filter already ensures article quality
4. Users should see results even with 1-2 excellent articles

---

## Solution Applied

**Changed minimum article requirement from 3 → 1**

### What Changed

**File**: `/src/lib/evidence/clinical-synthesis-engine.ts`

**Before**:

```typescript
if (clinicalArticles.length < 3) {
  const lenientArticles = filterForClinicalUse(articles, {
    minScore: 30,
    maxTier: 3,
    maxAge: 20,
    requireAbstract: false,
  });

  if (lenientArticles.length < 3) {
    throw new Error(
      `Insufficient evidence. Found ${lenientArticles.length} articles, need at least 3. Try a broader query.`
    );
  }
}
```

**After**:

```typescript
if (clinicalArticles.length < 1) {
  const lenientArticles = filterForClinicalUse(articles, {
    minScore: 30,
    maxTier: 3,
    maxAge: 20,
    requireAbstract: false,
  });

  if (lenientArticles.length < 1) {
    throw new Error(
      `Insufficient evidence. Found ${lenientArticles.length} articles, need at least 1. Try a broader query or different search terms.`
    );
  }
}
```

---

## What This Means

### Now Accepts:

✅ **1+ articles** that pass quality filters
✅ **2+ articles** with lenient filters
✅ **Specialized topics** with limited research
✅ **Rare conditions** with few recent studies

### Quality Maintained:

✅ Still uses progressive filtering (strict → lenient)
✅ Still prioritizes high-quality journals
✅ Still scores and ranks articles
✅ Still requires minimum quality score of 30/100

### User Benefits:

✅ **More searches succeed** instead of failing with 500 errors
✅ **See results faster** - less "insufficient evidence" errors
✅ **Better UX** - rare topics now show available evidence
✅ **Informed decisions** - even with 1-2 excellent studies

---

## Testing

### Queries That Previously Failed (Now Should Work):

1. **"treatment for uncomplicated malaria"**

   - Previous: 500 error (found 2, needed 3)
   - Now: Will show synthesis with 2 articles ✅

2. **Specialized queries**:

   - "management of rare genetic disorders"
   - "treatment of zebra diseases"
   - "emerging infectious diseases"

3. **Recent topics**:
   - "new COVID variants treatment"
   - "novel cancer immunotherapies"
   - "experimental treatments"

### Queries That Still Work:

✅ "treatment of acute coronary syndrome" (6 articles)
✅ "diagnosis of acute appendicitis" (4-11 articles)
✅ "antibiotic choice for pneumonia" (4 articles)
✅ "management of septic shock" (8 articles)

---

## Error Scenarios

### Will Still Error (As Expected):

❌ **No articles found at all** (0 articles)

```
Error: Insufficient evidence. Found 0 articles, need at least 1.
Try a broader query or different search terms.
```

This is correct behavior - can't create a synthesis with zero evidence!

### Will Now Succeed:

✅ **1 article found** → Creates synthesis with 1 section
✅ **2 articles found** → Creates synthesis with 1-2 sections
✅ **3+ articles found** → Creates synthesis with 2-3 sections

---

## Quality Assurance

### Filter Levels (From Strictest to Most Lenient):

**Level 1 - Primary Filter** (preferred):

- minScore: 50
- maxTier: 3
- maxAge: 15 years
- requireAbstract: false

**Level 2 - Fallback Filter** (if <1 from Level 1):

- minScore: 30
- maxTier: 3
- maxAge: 20 years
- requireAbstract: false

**Level 3 - Error** (if still <1 article):

- Show error message
- Suggest broader search

---

## Expected Behavior Now

### Scenario 1: High-Quality Topic (Common)

```
Query: "treatment of pneumonia"
→ Found: 45 articles
→ Primary filter: 12 articles pass
→ Result: Full synthesis with 2-3 sections, 12 references ✅
```

### Scenario 2: Moderate-Quality Topic

```
Query: "management of rare disease"
→ Found: 36 articles
→ Primary filter: 2 articles pass
→ Result: Synthesis with 1-2 sections, 2 references ✅
```

### Scenario 3: Limited Research Topic (Previously Failed!)

```
Query: "treatment for uncomplicated malaria"
→ Found: 45 articles
→ Primary filter: 2 articles pass
→ Result: Synthesis with 1-2 sections, 2 references ✅
```

### Scenario 4: Very Specialized Topic

```
Query: "emerging treatment for zebra disease"
→ Found: 24 articles
→ Primary filter: 0 articles
→ Fallback filter: 1 article passes
→ Result: Synthesis with 1 section, 1 reference ✅
```

### Scenario 5: No Evidence Available

```
Query: "treatment using fictional medicine"
→ Found: 0 articles
→ Result: Error - "Insufficient evidence. Found 0 articles..." ❌
```

---

## TypeScript Status

✅ **Zero errors** - Clean compilation

---

## Next Steps

### For You:

1. **Refresh your browser** at http://localhost:3000/evidence-search
2. **Try the query**: "treatment for uncomplicated malaria"
3. **Should now see results** instead of 500 error!

### Test Other Queries:

- "treatment of acute coronary syndrome"
- "diagnosis of acute appendicitis"
- "management of septic shock"
- Any medical question!

---

## Summary

**What was broken**: Required minimum of 3 articles, causing 500 errors for topics with limited research

**What was fixed**: Changed minimum to 1 article, allowing synthesis even with limited but high-quality evidence

**Impact**:

- ✅ More searches succeed
- ✅ Better handling of specialized topics
- ✅ Improved user experience
- ✅ Maintained quality standards

**Status**:

- ✅ Fix applied
- ✅ Zero TypeScript errors
- ✅ Ready to test

---

**Try it now!** Search for "treatment for uncomplicated malaria" and you should see results! 🎉
