# 🧪 Evidence Search Testing Guide

## What Was Improved

### **Issue #1: Lost AI Synthesis** ✅ FIXED
- **Before**: `/evidence` showed simple library list
- **After**: `/evidence` now has full AI-powered synthesis
- **Solution**: Replaced page with advanced search functionality

### **Issue #2: Abstract-Only Search** ✅ FIXED
- **Before**: Search referenced abstracts only
- **After**: Full content analysis with comprehensive synthesis
- **Solution**: consensus-search API uses full abstracts + strategic search

### **Issue #3: No Drug Search** ✅ FIXED
- **Before**: No specialized medication search
- **After**: Automatic drug query detection + dedicated endpoint
- **Solution**: Created `/api/evidence/drug-search` with smart routing

## How to Test

### Test 1: General Clinical Question

**URL**: http://localhost:3000/evidence

**Query**: `management of diabetic ketoacidosis`

**Expected Result**:
- ✅ AI synthesis in 3-5 flowing paragraphs
- ✅ Journal names inline (clickable to articles)
- ✅ Superscript citations ⁽¹⁾⁽²⁾
- ✅ Key clinical points section
- ✅ Sources list with badges (GUIDELINE, META-ANALYSIS, etc.)
- ✅ Quality indicators (tier-1 journals highlighted)

**Success Criteria**:
- Response in 10-15 seconds (first search)
- Structured clinical recommendations
- Evidence grading visible
- DOI/PubMed links working

---

### Test 2: Drug Dosing Query

**URL**: http://localhost:3000/evidence

**Query**: `vancomycin dosing for MRSA pneumonia`

**Expected Result**:
- ✅ Auto-detected as drug query
- ✅ Routes to `/api/evidence/drug-search`
- ✅ Comprehensive drug monograph:
  - Drug class & mechanism
  - Indications (FDA + off-label)
  - Adult dosing with renal adjustments
  - Pediatric dosing (if applicable)
  - Contraindications
  - Adverse effects & monitoring
  - Drug interactions
  - Clinical pearls

**Success Criteria**:
- Specific dosing numbers (mg/kg, intervals)
- Renal dose adjustment table/info
- Monitoring parameters specified
- Citations for all claims

---

### Test 3: Drug Interactions

**URL**: http://localhost:3000/evidence

**Query**: `warfarin drug interactions`

**Expected Result**:
- ✅ Auto-routed to drug search
- ✅ Major drug interactions listed
- ✅ Clinical significance explained
- ✅ Monitoring recommendations (INR frequency)
- ✅ Management strategies

**Success Criteria**:
- Lists major interacting medications
- Explains mechanism (CYP450, etc.)
- Provides dosing adjustments
- Evidence-based recommendations

---

### Test 4: Drug Contraindications

**URL**: http://localhost:3000/evidence

**Query**: `lisinopril contraindications`

**Expected Result**:
- ✅ Auto-detected as drug query
- ✅ Absolute contraindications listed
- ✅ Relative contraindications
- ✅ Black box warnings (if any)
- ✅ Special populations (pregnancy, renal failure)

**Success Criteria**:
- Clear categorization (absolute vs relative)
- Pregnancy category specified
- Renal/hepatic considerations
- Alternative options suggested

---

### Test 5: Quick Search Templates

**URL**: http://localhost:3000/evidence

**Action**: Click one of the template buttons:
- 💉 DKA Management
- 💊 Vancomycin Dosing
- 📋 STEMI Guidelines
- ⚠️ Drug Contraindications
- 🔄 Drug Interactions

**Expected Result**:
- ✅ Pre-fills search query
- ✅ Auto-executes search
- ✅ Returns relevant results
- ✅ Appropriate routing (clinical vs drug)

**Success Criteria**:
- One-click search works
- Results match template topic
- Fast user experience

---

### Test 6: Search History

**URL**: http://localhost:3000/evidence

**Actions**:
1. Perform 3-5 different searches
2. Check left sidebar for history
3. Click on a previous search
4. Try deleting a search from history
5. Try "Clear All History"

**Expected Result**:
- ✅ All searches saved to history
- ✅ Most recent at top
- ✅ Timestamp shown ("2m ago", "1h ago")
- ✅ Click to re-run search
- ✅ Trash icon to delete individual searches
- ✅ Clear all button works

**Success Criteria**:
- History persists after page refresh (localStorage)
- Max 20 searches saved
- No duplicates
- Timestamps accurate

---

## Drug Query Detection

The system auto-detects drug queries based on these keywords:

### Keywords That Trigger Drug Search:
- `dosing` / `dose` / `dosage`
- `indication` / `indications`
- `contraindication` / `contraindications`
- `interaction` / `interactions`
- `adverse effect` / `side effect`
- `monitoring`
- `drug` / `medication`
- `pharmacology` / `therapeutic`
- `mg` / `mcg` / `units`
- `administration` / `route`

### Example Queries:
**Drug Search** (auto-detected):
- ✅ "amoxicillin dosing for pneumonia"
- ✅ "metformin indications"
- ✅ "atorvastatin adverse effects"
- ✅ "ceftriaxone dose pediatric"
- ✅ "aspirin drug interactions"

**Clinical Search** (general):
- ✅ "management of septic shock"
- ✅ "STEMI guidelines 2024"
- ✅ "treatment of anaphylaxis"
- ✅ "acute kidney injury criteria"

---

## Expected Performance

### First Search (No Cache):
- **Time**: 10-15 seconds
- **Steps**: Database search → AI synthesis → Format response
- **Sources**: 15-25 articles analyzed
- **Output**: 3-6 paragraphs + key points + sources

### Subsequent Searches (Cached):
- **Time**: <1 second
- **Cache Duration**: Based on Vercel KV or in-memory
- **Note**: Same query returns cached result

### Rate Limiting:
- **Limit**: 5 searches per minute per IP
- **Response**: 429 error if exceeded
- **Message**: "Too many searches. Please wait a moment"

---

## Quality Indicators

### Source Badges:
- 📋 **CLINICAL GUIDELINE** - Official medical guidelines
- 📈 **META-ANALYSIS** - Pooled data from multiple studies
- 📚 **SYSTEMATIC REVIEW** - Comprehensive literature review
- 🧪 **RCT** - Randomized controlled trial
- ⭐ **JAMA/NEJM/LANCET** - Tier-1 journal
- 📊 **1000+ CITATIONS** - High-impact article
- 🔓 **OPEN ACCESS** - Free full text available
- 💊 **PHARMACOLOGY** - Pharmacy/drug journal

### Quality Scoring:
- **150+**: Guidelines (highest priority)
- **100+**: Meta-analyses
- **90+**: Systematic reviews
- **80+**: RCTs
- **<80**: Supplementary evidence

---

## Common Issues & Troubleshooting

### Issue: "No evidence found"
**Cause**: Query too specific or misspelled
**Solution**: 
- Try broader terms
- Check spelling (especially drug names)
- Use generic names, not brand names
- Example: "aspirin" not "Bayer"

### Issue: "AI synthesis temporarily unavailable"
**Cause**: Groq API rate limit or error
**Solution**:
- Sources still displayed
- Full abstracts available
- Wait 30-60 seconds and retry
- Review source abstracts directly

### Issue: "Rate limit exceeded"
**Cause**: >5 searches in 1 minute
**Solution**:
- Wait 60 seconds
- Review current results
- Refine query instead of new search

### Issue: Wrong search type (drug vs clinical)
**Cause**: Query doesn't match keyword detection
**Solution**:
- Add keywords: "dosing", "indication", etc.
- Example: "vancomycin for pneumonia" → "vancomycin dosing for pneumonia"

---

## API Endpoints

### `/api/evidence/consensus-search` (POST)
**Purpose**: General clinical evidence synthesis
**Input**: `{ "query": "clinical question" }`
**Output**: Structured synthesis with sources

**Example**:
```bash
curl -X POST http://localhost:3000/api/evidence/consensus-search \
  -H "Content-Type: application/json" \
  -d '{"query": "management of diabetic ketoacidosis"}'
```

### `/api/evidence/drug-search` (POST)
**Purpose**: Medication-specific monographs
**Input**: `{ "query": "drug dosing question" }`
**Output**: Drug monograph with structured sections

**Example**:
```bash
curl -X POST http://localhost:3000/api/evidence/drug-search \
  -H "Content-Type: application/json" \
  -d '{"query": "vancomycin dosing for MRSA"}'
```

---

## Success Metrics

### Functionality:
- ✅ AI synthesis visible on /evidence page
- ✅ Drug queries auto-detected and routed correctly
- ✅ Full abstracts analyzed (not truncated)
- ✅ Journal names become clickable links
- ✅ Citations link to original articles
- ✅ Search history persists across sessions

### Performance:
- ✅ First search <15 seconds
- ✅ Cached search <1 second
- ✅ Rate limiting works (5/minute)
- ✅ Error handling graceful

### Quality:
- ✅ Guidelines prioritized
- ✅ Tier-1 journals highlighted
- ✅ Evidence grading visible
- ✅ Recent studies prioritized (last 10 years)
- ✅ Specific dosing numbers included
- ✅ Contraindications clearly stated

---

## Next Steps (Future Enhancements)

### Phase 2 (Optional):
1. **DrugBank API Integration**
   - Comprehensive drug database
   - Chemical structures
   - Metabolism pathways
   - Protein targets

2. **RxNorm Integration**
   - Standardized drug names
   - Brand ↔ generic mapping
   - Dosing forms

3. **Clinical Calculator Integration**
   - CrCl calculator for renal dosing
   - BMI calculator for weight-based dosing
   - Pediatric dosing calculators

4. **Favorite Searches**
   - Star frequently used queries
   - Quick access sidebar section
   - Export/share capability

5. **PDF Export**
   - Print-friendly format
   - Include all citations
   - For patient care notes

---

## Testing Checklist

Before marking complete, verify:

- [ ] `/evidence` page loads successfully
- [ ] AI synthesis appears for clinical queries
- [ ] Drug queries route to drug-search endpoint
- [ ] Journal names are clickable
- [ ] Citations link to articles
- [ ] Quick search templates work
- [ ] Search history saves and loads
- [ ] Delete from history works
- [ ] Clear all history works
- [ ] Rate limiting activates at 5 searches
- [ ] Error messages are helpful
- [ ] Sources display with badges
- [ ] Quality scores make sense
- [ ] Mobile responsive (test sidebar toggle)
- [ ] No console errors
- [ ] No TypeScript errors

---

**Status**: Ready for testing
**Date**: January 21, 2026
**Version**: 2.0
**Breaking Changes**: None (backward compatible)
