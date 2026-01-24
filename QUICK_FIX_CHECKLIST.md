# ✅ Quick Fix Checklist - Get Journal Links Working in Production

## The Problem

Journal links feature is implemented but **NOT visible in production** because:

- Production is missing `GROQ_API_KEY` environment variable
- Without the API key, AI synthesis fails
- Without AI synthesis, there's no summary text with journal names
- Without journal names in the text, there's nothing to make clickable!

---

## The Solution (5 minutes)

### Step 1: Add GROQ_API_KEY to Vercel (2 minutes)

1. Open Vercel dashboard:

   - https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco/settings/environment-variables

2. Click **"Add New"** button

3. Enter:

   - **Name**: `GROQ_API_KEY`
   - **Value**: Copy from your `.env.local` file (line 13 - starts with `gsk_`)

4. Select environments:

   - ✅ **Production**
   - ✅ **Preview**
   - ✅ **Development**

5. Click **"Save"**

### Step 2: Redeploy (1 minute)

Vercel should auto-redeploy after adding the environment variable, but you can force it:

**Option A: From Dashboard**

- Go to: https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco
- Click **"Redeploy"** button on latest deployment

**Option B: From Terminal**

```bash
# Force redeploy by triggering webhook
git commit --allow-empty -m "🔑 Added GROQ_API_KEY - redeploy"
git push
```

### Step 3: Wait for deployment (2 minutes)

- Watch: https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco
- Status should show: **"Building..."** → **"Ready"**
- Usually takes 2-3 minutes

---

## Verification (2 minutes)

### Test 1: AI Synthesis Working

1. Go to: https://eccco.vercel.app/evidence-search

2. Search: `management of ventilator associated pneumonia`

3. **Expected**: Should see full AI-generated summary instead of:

   ```
   ❌ "AI synthesis temporarily unavailable"
   ```

4. **Should see**:
   ```
   ✅ "The management of ventilator-associated pneumonia (VAP)
       is a critical aspect of intensive care, with guidelines
       from IDSA and ATS published in Clinical Infectious
       Diseases suggesting that..."
   ```

### Test 2: Journal Links Working

1. In the same results, look at the summary text

2. **Expected**: Journal names should be:

   - **Blue color** (not black)
   - **Underlined** (subtle decoration)
   - **Clickable** (cursor changes to pointer on hover)
   - **Open article** when clicked (new tab)

3. **Journals to verify**:

   - "Clinical Infectious Diseases" - should be clickable link
   - "The Lancet" - should be clickable link
   - "JAMA" - should be clickable link
   - "Anesthesia and Analgesia" - should be clickable link

4. **Also check Key Clinical Points section**:
   - Scroll down to green box
   - Bullet points should also have clickable journal links

---

## What To Expect

### Before (Current Production - Broken)

```
Summary: AI synthesis temporarily unavailable. Please check
back soon.

Key Clinical Points:
• Temporary issue with AI synthesis service
• Search results available below
• Try again in a few moments
```

### After (Fixed Production - Working)

```
Summary: The management of ventilator-associated pneumonia
(VAP) is a critical aspect of intensive care, with guidelines
from IDSA and ATS published in [Clinical Infectious Diseases]
suggesting that the diagnosis of VAP should be based on a
combination of clinical, radiologic, and microbiologic criteria ⁽¹⁾.
A meta-analysis in [The Lancet] found that the use of
quantitative cultures... A study published in [JAMA] found...
           ↑ BLUE CLICKABLE    ↑ BLUE CLICKABLE  ↑ BLUE CLICKABLE

Key Clinical Points:
• All patients with VAP should be treated based on
  guidelines from [JAMA] and [Clinical Infectious Diseases]
                   ↑ BLUE CLICKABLE    ↑ BLUE CLICKABLE
• Broad-spectrum antibiotics improve outcomes per
  [Critical Care Medicine]
   ↑ BLUE CLICKABLE
```

---

## Troubleshooting

### Issue: Still seeing "AI synthesis temporarily unavailable"

**Possible causes:**

1. **API key not saved properly**

   - Check: Vercel dashboard → Environment Variables
   - Verify: `GROQ_API_KEY` exists with correct value
   - Verify: All 3 environments checked

2. **Deployment didn't pick up the new env var**

   - Solution: Force redeploy (see Step 2)
   - Or: Wait a few more minutes (cache clearing)

3. **API key is incorrect**
   - Verify: Copy EXACTLY from `.env.local`
   - Should start with: `gsk_`
   - Should be 64+ characters long

### Issue: AI synthesis works but journal names still not clickable

**Possible causes:**

1. **Latest code not deployed**

   - Check: Vercel deployment dashboard
   - Verify: Commit `19d6b80` is deployed
   - Solution: Force redeploy

2. **Browser cache**

   - Solution: Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
   - Or: Open in incognito/private window

3. **Journal name doesn't match our patterns**
   - Check: Is the journal in our list? (see JOURNAL_LINKS_VERIFICATION.md)
   - Solution: May need to add journal variation

### Issue: Wrong article opens

**This is expected!**

- If multiple sources are from the same journal, we link to the first match
- This is intentional - we're linking to "a relevant article from that journal"
- Future enhancement: Link to specific sentence's citation instead

---

## Success Criteria

✅ **AI Synthesis**: Full summary appears (not "temporarily unavailable")
✅ **Journal Links Visible**: Journal names appear in **blue with underline**
✅ **Hover Effect**: Hovering shows **darker blue**
✅ **Click Works**: Opens source article in **new tab**
✅ **Multiple Locations**: Works in **summary AND key clinical points**
✅ **Multiple Journals**: All major journals clickable (NEJM, JAMA, Lancet, etc.)

---

## Timeline

- **Step 1** (Add API key): 2 minutes
- **Step 2** (Redeploy): 1 minute
- **Step 3** (Wait): 2 minutes
- **Verification**: 2 minutes

**Total: ~7 minutes** 🎯

---

## Current Status

### ✅ Code Ready

- Commit: `19d6b80` - Enhanced Clickable Journal Links
- Files: `src/app/evidence-search/page.tsx`, `src/app/evidence/page.tsx`
- Pushed: Yes
- Code Quality: ✅ All checks passed

### ⏳ Deployment Pending

- Environment Variable: ❌ GROQ_API_KEY not in Vercel
- Vercel Status: Waiting for env var
- Latest Deployment: May have code but API key missing

### 📝 Next Action

**YOU**: Add `GROQ_API_KEY` to Vercel (Step 1 above)
**THEN**: Wait for redeploy (Steps 2-3)
**VERIFY**: Test in production (Verification section)

---

## References

- Full Documentation: `JOURNAL_LINKS_VERIFICATION.md`
- Production Fix Guide: `URGENT_FIX_AI_SYNTHESIS.md`
- Testing Guide: `EVIDENCE_SEARCH_TESTING_GUIDE.md`
- Implementation Details: `EVIDENCE_SEARCH_COMPLETE.md`
