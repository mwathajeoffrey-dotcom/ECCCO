# 🧪 Testing Evidence Search - January 15, 2026

## ✅ Fix Applied

**Issue Found**: Citation parsing error
**Error**: `Cannot read properties of undefined (reading 'id')`
**Cause**: AI generating citations like `{ref-7}` when only 6 references exist

**Fix**: Added safety check in `parseSynthesisResponse`:

```typescript
if (ref && ref.id && ref.journal) {
  // Only add citation if reference exists and has data
  citations.push({...});
} else {
  console.warn(`Reference ${refNum} not found. Total refs: ${references.length}`);
}
```

---

## 🧪 Testing Instructions

### Test 1: Evidence Search Page (Browser)

✅ **OPENED**: http://localhost:3000/evidence-search

**Steps**:

1. Enter query: "treatment of acute coronary syndrome"
2. Click "Search Evidence"
3. Wait for results (15-30 seconds)
4. **Expected Result**: Clinical protocols matching screenshot
   - Initial Management of Acute Coronary Syndrome
   - Specific dosages (aspirin 162-325 mg, etc.)
   - Journal badges (🔴 JAMA, 🔵 Lancet)
   - 95%+ confidence score

### Test 2: API Direct Call

```bash
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "treatment of acute coronary syndrome",
    "useAI": true,
    "minQualityScore": 50,
    "maxArticles": 8
  }'
```

**Expected**: JSON response with sections, references, metadata

### Test 3: Different Queries

Try these to verify robustness:

- "diabetic foot management"
- "treatment of septic shock"
- "management of acute MI"
- "hypertension guidelines"

---

## 📊 Success Criteria

### Must Have:

- [ ] No JavaScript errors in console
- [ ] Synthesis completes without 500 errors
- [ ] Clinical sections generated (2-4 sections)
- [ ] Specific dosages and drug names
- [ ] Journal badges displayed correctly
- [ ] Citations formatted properly
- [ ] Confidence score shown
- [ ] References list displayed

### Nice to Have:

- [ ] Matches screenshot quality
- [ ] 95%+ confidence score
- [ ] 6-8 references
- [ ] Action verbs (Administer, Give, Monitor)
- [ ] Timing guidance (within X minutes, etc.)

---

## 🐛 Known Issues (Fixed)

1. ✅ **Citation Out of Range**: Fixed with safety check
2. ⚠️ **Long Response Time**: Expected (15-30s) due to:
   - Multi-source evidence search
   - Full-text fetching from Europe PMC
   - AI synthesis with Groq
   - Quality scoring and filtering

---

## 🔧 If Test Fails

### Check 1: GROQ_API_KEY

```bash
grep GROQ_API_KEY .env.local
# Should show: GROQ_API_KEY=gsk_...
```

### Check 2: Dev Server Logs

Look for errors in the terminal running `npm run dev`

### Check 3: Browser Console

Open DevTools (F12) and check Console tab for errors

### Check 4: Network Tab

Check if API calls are completing or timing out

---

## 📝 Test Results

**Date**: January 15, 2026
**Time**: 5:45 PM
**Tester**: (Fill in after testing)

### Browser Test Results:

- [ ] Page loads without errors
- [ ] Search box functional
- [ ] Results display correctly
- [ ] Citations work
- [ ] Matches screenshot quality

### API Test Results:

- [ ] Returns 200 OK
- [ ] JSON structure correct
- [ ] No undefined errors
- [ ] Synthesis quality good

### Issues Found:

(List any problems here)

---

## ✅ Ready for Deployment When:

- [x] Citation parsing fixed
- [ ] Browser test passes
- [ ] API test passes
- [ ] No console errors
- [ ] Results match screenshot quality
- [ ] All test queries work

---

**Next Step**: Test in browser at http://localhost:3000/evidence-search
