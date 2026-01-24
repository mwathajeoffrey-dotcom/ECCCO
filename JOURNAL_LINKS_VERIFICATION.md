# 📚 Journal Links Feature - Complete Guide

## What We Built

The journal links feature automatically converts journal names mentioned in AI-generated evidence summaries into clickable links that take users directly to the source article.

### Example

**Before:**

> "A study published in JAMA found that..."

**After:**

> "A study published in [JAMA](https://doi.org/...) found..."
> _(JAMA is now a clickable blue underlined link)_

---

## Where It Works

✅ **AI Synthesis Summary** - Main paragraph synthesis
✅ **Key Clinical Points** - Bullet point summaries
✅ **Evidence Summary Section** - Detailed narrative text

---

## Supported Journals (50+)

### Tier 1 - Most Prestigious

- **NEJM** / New England Journal of Medicine / N Engl J Med
- **JAMA** (all variants: JAMA Internal Medicine, JAMA Cardiology, etc.)
- **The Lancet** (all variants: Lancet Respiratory Medicine, Lancet Infectious Diseases, etc.)
- **BMJ** / British Medical Journal / The BMJ

### Critical Care & Emergency

- Critical Care Medicine / Crit Care Med
- Intensive Care Medicine / Intens Care Med
- Chest / CHEST
- Annals of Emergency Medicine / Ann Emerg Med
- American Journal of Emergency Medicine

### Cardiology

- Circulation / Circulation: Cardiovascular Interventions
- JACC / Journal of the American College of Cardiology
- European Heart Journal / Eur Heart J

### Anesthesia & Pain

- **Anesthesia and Analgesia** / Anesthesia & Analgesia / Anesth Analg
- Anesthesiology

### Infectious Diseases

- **Clinical Infectious Diseases** / Clin Infect Dis
- Journal of Infectious Diseases / J Infect Dis
- Lancet Infectious Diseases

### Internal Medicine

- Annals of Internal Medicine / Ann Intern Med
- American Journal of Medicine / Am J Med

### Neurology

- Neurology
- Stroke
- Lancet Neurology

### Evidence-Based Medicine

- **Cochrane** / Cochrane Database of Systematic Reviews

### Specialty Journals

- Pediatrics, JAMA Pediatrics
- Diabetes Care
- Kidney International
- American Journal of Kidney Diseases
- Annals of Surgery / Ann Surg
- Clinical Pharmacology and Therapeutics
- And 20+ more variations...

---

## How It Works (Technical)

1. **User searches**: "management of ventilator associated pneumonia"

2. **AI generates summary** with journal mentions:

   ```
   "...guidelines from IDSA and ATS published in Clinical Infectious Diseases
   suggesting that... A meta-analysis in The Lancet found that... A study
   published in JAMA found that..."
   ```

3. **System matches journals to sources**:

   - Scans the 10 source articles returned
   - Creates a map: "Clinical Infectious Diseases" → DOI URL
   - Creates a map: "The Lancet" → DOI URL
   - Creates a map: "JAMA" → DOI URL

4. **Renders clickable links**:

   - Uses regex with word boundaries (avoids false matches)
   - Longest names matched first (prevents partial matches)
   - Priority system (exact > abbreviated)
   - Generates `<a>` tags with proper styling

5. **User clicks** → Opens source article in new tab

---

## Visual Styling

- **Color**: Blue (#1d4ed8)
- **Hover**: Darker blue (#1e40af)
- **Underline**: Blue (#60a5fa)
- **Hover Underline**: Darker blue (#2563eb)
- **Font Weight**: Medium (500)
- **Cursor**: Pointer
- **Tooltip**: "View article in [Journal Name]"
- **New Tab**: Opens with `target="_blank" rel="noopener noreferrer"`

---

## Testing Guide

### 1. Test in Development (localhost:3000)

```bash
npm run dev
```

**Test Queries:**

1. **Ventilator-Associated Pneumonia**

   - Query: `management of ventilator associated pneumonia`
   - Expected journals: Clinical Infectious Diseases, The Lancet, JAMA, Anesthesia & Analgesia
   - **Verify**: All journal names are clickable and blue

2. **Septic Shock**

   - Query: `management of septic shock`
   - Expected journals: NEJM, Critical Care Medicine, JAMA, Intensive Care Medicine
   - **Verify**: All journal names are clickable

3. **STEMI Guidelines**

   - Query: `STEMI guidelines 2024`
   - Expected journals: JACC, Circulation, European Heart Journal
   - **Verify**: Cardiology journals are clickable

4. **Drug Query**
   - Query: `vancomycin dosing for MRSA pneumonia`
   - Expected journals: Clinical Infectious Diseases, Antimicrobial Agents and Chemotherapy
   - **Verify**: Pharmacy journals are clickable

### 2. Verify Implementation

**Check the Summary Section:**

```tsx
// Should see journal links in blue
The management of ventilator-associated pneumonia (VAP) is a
critical aspect of intensive care, with guidelines from the
Infectious Diseases Society of America (IDSA) and the American
Thoracic Society (ATS) published in [Clinical Infectious Diseases]...
```

**Check Key Clinical Points:**

```tsx
• All patients with VAP should be treated based on
  guidelines from [JAMA] and [The Lancet]
• Broad-spectrum antibiotics improve outcomes per
  [Critical Care Medicine]
```

### 3. Test in Production (after deployment)

**URL**: https://eccco.vercel.app/evidence-search

**Same test queries as above**

**What to look for:**

- Journal names should be **blue and underlined**
- Hovering should show **darker blue**
- Clicking should **open article in new tab**
- Should work in **both summary and key points**

---

## Current Deployment Status

### ✅ Code Status

- **Commit**: `19d6b80` - Enhanced Clickable Journal Links
- **Files Modified**:
  - `src/app/evidence-search/page.tsx`
  - `src/app/evidence/page.tsx`
- **Pushed**: Yes (to main branch)
- **Code Quality**: ✅ Pre-commit checks passed

### ⚠️ Production Status

**BLOCKERS:**

1. **GROQ_API_KEY Missing** (CRITICAL)

   - AI synthesis not working in production
   - Shows: "AI synthesis temporarily unavailable"
   - Fix: Add `GROQ_API_KEY` to Vercel environment variables
   - Time: 5 minutes
   - Instructions: See `URGENT_FIX_AI_SYNTHESIS.md`

2. **Deployment Status**
   - Latest commit may not be deployed yet
   - Vercel auto-deploys on push (usually 2-3 minutes)
   - Check: https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco

---

## Troubleshooting

### Issue: Journal names not clickable in production

**Possible Causes:**

1. **Vercel hasn't deployed latest code**

   - Solution: Check deployment dashboard
   - Force redeploy if needed

2. **GROQ_API_KEY missing**

   - AI synthesis fails → no summary generated → no journal names to link
   - Solution: Add API key to Vercel (see URGENT_FIX_AI_SYNTHESIS.md)

3. **Journal name doesn't match our patterns**

   - Check: Is the journal in our supported list?
   - Solution: Add to `highlightJournalNames()` function

4. **Source has no URL**
   - Journal linking only works if source has valid DOI/PubMed URL
   - Solution: Check source quality, may need better search results

### Issue: Wrong article opens when clicking journal

**Possible Causes:**

1. **Multiple sources from same journal**

   - System matches first occurrence
   - This is expected behavior (links to relevant article from that journal)

2. **Journal name ambiguous**
   - e.g., "JAMA" vs "JAMA Internal Medicine"
   - Solution: Priority system handles this (exact match > abbreviation)

### Issue: Links work locally but not in production

**Likely Cause:** Deployment issue

**Solution:**

```bash
# Check latest deployment
git log --oneline -1

# Verify Vercel has deployed this commit
# Go to: https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco

# Force redeploy if needed
git commit --allow-empty -m "Force redeploy"
git push
```

---

## Next Steps

### CRITICAL (5 minutes)

1. **Add GROQ_API_KEY to Vercel**
   - Go to: https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco/settings/environment-variables
   - Add: `GROQ_API_KEY` = `gsk_XsXt...c3te` (from `.env.local`)
   - Check all 3 environments (Production, Preview, Development)
   - Save and redeploy

### HIGH (2 minutes)

2. **Verify Vercel Deployment**
   - Check: https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco
   - Confirm: Latest commit `19d6b80` is deployed
   - If not: Wait 2-3 minutes or force redeploy

### MEDIUM (5 minutes)

3. **Test Production**
   - Go to: https://eccco.vercel.app/evidence-search
   - Search: "management of ventilator associated pneumonia"
   - Verify: Journal names are clickable
   - Click: Opens article in new tab

### LOW (10 minutes)

4. **Comprehensive Testing**
   - Run all test queries from Testing Guide above
   - Test on mobile devices (responsive design)
   - Test different browsers (Chrome, Safari, Firefox)

---

## Success Metrics

✅ **Visual**: Journal names appear in blue with underline
✅ **Interaction**: Hovering shows darker blue
✅ **Functionality**: Clicking opens source article in new tab
✅ **Coverage**: Works in summary, key points, and evidence summary
✅ **Accuracy**: Links to correct source article
✅ **Performance**: No lag when rendering links
✅ **Mobile**: Works on touch devices

---

## Code Location

**Main Implementation:**

- File: `src/app/evidence-search/page.tsx`
- Function: `highlightJournalNames(text, sources)` (lines 595-852)
- Function: `renderSummaryWithLinks(summary, sources)` (lines 518-580)

**Usage:**

- Summary: Line 360 - `{renderSummaryWithLinks(result.summary, result.sources)}`
- Key Points: Line 384 - `{renderSummaryWithLinks(point, result.sources)}`

**Testing:**

- Local: http://localhost:3000/evidence-search
- Production: https://eccco.vercel.app/evidence-search

---

## Future Enhancements

### Potential Improvements

1. **Citation Tooltips**

   - Show full citation on hover
   - "JAMA. 2024;331(4):123-456. DOI: 10.1001/..."

2. **Journal Logos**

   - Display journal favicons/logos next to name
   - Visual recognition for major journals

3. **Open Access Indicators**

   - Show 🔓 icon for open access articles
   - Show 🔒 icon for paywalled content

4. **Alternative Access**

   - Link to Sci-Hub / LibGen for paywalled articles
   - Show institutional access options

5. **Reading List**

   - "Save for later" button
   - Export citations to reference manager (Zotero, Mendeley)

6. **Journal Impact Factor**
   - Show IF on hover
   - Color-code by prestige (Tier 1 = gold, Tier 2 = silver, etc.)

---

## Support

**Questions?** Check these docs:

- `EVIDENCE_SEARCH_IMPROVEMENTS.md` - Feature overview
- `EVIDENCE_SEARCH_TESTING_GUIDE.md` - Comprehensive testing
- `URGENT_FIX_AI_SYNTHESIS.md` - Production fix (GROQ_API_KEY)

**Issues?**

- Check Vercel deployment logs
- Verify GROQ_API_KEY is set
- Test locally first (npm run dev)
- Check browser console for errors
