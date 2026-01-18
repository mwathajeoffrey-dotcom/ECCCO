# 🧪 Evidence Search Testing Guide

**Date**: January 15, 2026
**Status**: Ready to Test
**Version**: Commit 81d04cb + bug fixes

---

## 🚀 Quick Start

### Option 1: Automated Test (Recommended)

```bash
./test-evidence-search.sh
```

This will:

- Check if GROQ_API_KEY is configured ✅
- Start the dev server if not running
- Run a test query
- Show results summary

### Option 2: Manual Test

**Step 1: Start the dev server**

```bash
npm run dev
```

Wait for: `✓ Ready in X.Xs`

**Step 2: Open browser**

```
http://localhost:3000/evidence-search
```

**Step 3: Test a query**
Enter: `treatment of acute coronary syndrome`

**Expected**: Results matching your screenshot within 15-30 seconds

---

## ✅ What Was Fixed

### 1. Citation Parsing Error (FIXED)

**Error**: `Cannot read properties of undefined (reading 'id')`
**Cause**: AI generating citations beyond available references
**Fix**: Added safety check in `parseSynthesisResponse`

```typescript
if (ref && ref.id && ref.journal) {
  // Only add citation if reference exists
  citations.push({...});
} else {
  console.warn(`Reference ${refNum} not found`);
}
```

### 2. Environment Variable Issue (FIXED)

**Problem**: GROQ_API_KEY not loading
**Cause**: Dev server started before .env.local was read
**Fix**: Server restart required to pick up env changes

### 3. Debug Logging Added

Now shows:

- Whether Groq AI is available
- GROQ_API_KEY status
- AI synthesis progress
- Fallback reasons

---

## 📊 Expected Results

### Browser Test (http://localhost:3000/evidence-search)

**Query**: "treatment of acute coronary syndrome"

**Expected Output**:

```
Initial Management of Acute Coronary Syndrome

For patients presenting with acute coronary syndrome (ACS), immediate
management involves administering aspirin 162-325 mg orally as soon as
possible, followed by a maintenance dose of 81-100 mg daily...
🔴 JAMA +2  🔵 JTAC

Dual Antiplatelet Therapy and Influenza Vaccination

For patients with ACS undergoing PCI, continue dual antiplatelet therapy
(DAPT) with aspirin and a P2Y12 inhibitor for at least 12 months...
🔴 JAMA +2  🔵 Lancet

Morphine and Pain Management

Administer morphine 2-4 mg intravenously for pain relief in ACS patients...
🟣 BMJ
```

**Confidence**: 95%+
**References**: 6-8 high-quality sources
**Sections**: 2-4 clinical sections

### API Test (curl)

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

**Expected**: JSON response with:

- `sections`: Array of clinical sections
- `references`: Array of 6-8 references
- `metadata.confidenceScore`: 90-100
- `metadata.usedAI`: true
- `metadata.tier1Count`: > 0

---

## 🐛 Troubleshooting

### Server Won't Start

**Check port 3000**:

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
```

If something is running, kill it:

```bash
kill $(lsof -ti:3000)
npm run dev
```

### GROQ_API_KEY Not Found

**Check .env.local**:

```bash
grep GROQ_API_KEY .env.local
```

Should show:

```
GROQ_API_KEY=gsk_...
```

If missing, add it:

```bash
echo "GROQ_API_KEY=your_key_here" >> .env.local
```

Then restart the server!

### AI Synthesis Failing

**Check server logs** in the terminal running `npm run dev`:

Look for:

```
[Evidence Synthesis] 🔍 AI Check:
  - Groq Available: true
  - GROQ_API_KEY exists: true
  - GROQ_API_KEY length: 56
```

If `Groq Available: false`:

1. Restart dev server
2. Check .env.local exists
3. Verify GROQ_API_KEY is set

### Slow Response (15-30s)

**This is normal!** The system:

1. Searches 4 evidence sources (PubMed, CrossRef, etc.)
2. Fetches full-text articles from Europe PMC
3. Quality scores each result
4. Calls Groq AI for synthesis
5. Parses and formats citations

**Expected time**: 15-30 seconds

### Browser Shows Errors

**Open DevTools** (F12 or Cmd+Option+I):

- Check **Console** for JavaScript errors
- Check **Network** tab for failed API calls
- Look for red errors in the synthesis response

---

## ✅ Success Criteria

Test passes if you see:

- [ ] No JavaScript errors in console
- [ ] Synthesis completes without 500 errors
- [ ] 2-4 clinical sections generated
- [ ] Specific dosages (aspirin 162-325 mg, etc.)
- [ ] Journal badges (🔴 JAMA, 🔵 Lancet, 🟣 BMJ)
- [ ] Citations formatted correctly
- [ ] Confidence score 90%+
- [ ] 6-8 references listed
- [ ] Matches screenshot quality

---

## 📝 Files Modified

### Fixed

- `src/lib/evidence/clinical-synthesis-engine.ts`
  - Added citation safety check
  - Added debug logging
  - Better error handling

### Created

- `test-evidence-search.sh` - Automated test script
- `TESTING_CHECKLIST.md` - This guide

### Unchanged

- `src/app/api/evidence/synthesize/route.ts` - Working ✅
- `src/lib/evidence/query-expansion.ts` - Working ✅
- `src/app/evidence-search/page.tsx` - Working ✅

---

## 🎯 After Testing

### If Test Passes ✅

1. **Commit changes**:

```bash
git add -A
git commit -m "🐛 Fix citation parsing bug, add test script"
git push origin main
```

2. **Deploy to production**:

- Vercel will auto-deploy from main branch
- Wait 2-3 minutes
- Check https://eccco.vercel.app/evidence-search

### If Test Fails ❌

1. **Capture error details**:

   - Screenshot of browser error
   - Copy server logs from terminal
   - Note which step failed

2. **Check logs**:

   - Server terminal output
   - Browser console errors
   - Network tab in DevTools

3. **Share findings** so we can debug

---

## 🔧 Quick Reference

### Start Server

```bash
npm run dev
```

### Test API

```bash
./test-evidence-search.sh
```

### Check Env

```bash
grep GROQ .env.local
```

### Kill Server

```bash
kill $(lsof -ti:3000)
```

### View Logs

Look at the terminal running `npm run dev`

---

**Ready to test!** Run `./test-evidence-search.sh` or `npm run dev` + open browser.
