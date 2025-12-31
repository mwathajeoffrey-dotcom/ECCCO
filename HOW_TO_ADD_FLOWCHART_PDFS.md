# 📋 HOW TO ADD FLOWCHART PDFs TO GUIDELINES SEARCH

**Status:** Currently only 1 algorithm has a flowchart PDF (Sepsis)  
**Goal:** Add more visual flowchart PDFs to differentiate from Evidence Search

---

## 🎯 Current State

### ✅ Working (1 Flowchart)
- **Sepsis and Septic Shock Algorithm** - Local PDF at `/algorithms/acls/sepsis-algorithm.pdf`
  - Shows animated "FLOWCHART PDF" badge
  - Shows red/pink "View Algorithm PDF" button
  - PDF opens perfectly

### ⚠️ Need PDFs (11 Algorithms)
All these show as text guidelines until you add flowchart PDFs:
- ACLS: Cardiac Arrest, Bradycardia, Tachycardia, ACS, Stroke (5)
- PALS: Cardiac Arrest, Bradycardia, Tachycardia (3)
- BLS: Adult CPR, Choking/Opioid (2)
- NRP: Neonatal Resuscitation (1)

---

## 📁 Directory Structure

```
public/algorithms/
├── acls/
│   └── sepsis-algorithm.pdf      ✅ EXISTS
│   └── cardiac-arrest.pdf        ❌ NEEDED
│   └── bradycardia.pdf          ❌ NEEDED
│   └── tachycardia.pdf          ❌ NEEDED
│   └── acs.pdf                  ❌ NEEDED
│   └── stroke.pdf               ❌ NEEDED
├── pals/
│   └── cardiac-arrest.pdf       ❌ NEEDED
│   └── bradycardia.pdf          ❌ NEEDED
│   └── tachycardia.pdf          ❌ NEEDED
├── bls/
│   └── adult-cpr.pdf            ❌ NEEDED
│   └── opioid-overdose.pdf      ❌ NEEDED
└── nrp/
    └── neonatal-resuscitation.pdf ❌ NEEDED
```

---

## 🔍 WHERE TO FIND FLOWCHART PDFs

### Option 1: Official AHA Sources (Best Quality)
1. **Visit:** https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms
2. **Look for:** "Download PDF" buttons or algorithm pages
3. **Save:** Right-click on flowchart images → "Save Image As" or find PDF download links

### Option 2: ACLS Training Sites
1. **ACLS Training Center:** https://www.aclstraining.com/algorithms/
2. **ProACLS:** https://www.proacls.com/algorithms
3. **ACLS.com:** Look for free algorithm downloads

### Option 3: Academic/Hospital Resources
1. Check your institution's ACLS training materials
2. Many hospitals provide algorithm flowcharts in PDF
3. Medical school resources

### Option 4: Create Your Own
1. Use the sepsis PDF as a template
2. Create simple flowcharts using:
   - PowerPoint/Keynote → Export as PDF
   - Canva.com (free)
   - Draw.io / Lucidchart
   - Adobe Illustrator/InDesign

---

## ➕ STEP-BY-STEP: Adding a New Flowchart PDF

### Step 1: Get the PDF
Download or create a flowchart PDF for an algorithm (e.g., ACLS Cardiac Arrest)

### Step 2: Name it Correctly
Use simple, descriptive names:
```
cardiac-arrest.pdf        ✅ Good
bradycardia.pdf          ✅ Good
tachycardia.pdf          ✅ Good
acs.pdf                  ✅ Good (Acute Coronary Syndrome)
stroke.pdf               ✅ Good

acls_cardiac_arrest.pdf  ❌ Avoid underscores
Cardiac Arrest.pdf       ❌ Avoid spaces
algorithm1.pdf           ❌ Not descriptive
```

### Step 3: Place in Correct Folder
```bash
# For ACLS algorithms
cp your-pdf.pdf /Users/apple/ECCCO/public/algorithms/acls/

# For PALS algorithms
cp your-pdf.pdf /Users/apple/ECCCO/public/algorithms/pals/

# For BLS algorithms
cp your-pdf.pdf /Users/apple/ECCCO/public/algorithms/bls/

# For NRP algorithms
cp your-pdf.pdf /Users/apple/ECCCO/public/algorithms/nrp/
```

### Step 4: Update `src/lib/guidelines/aha.ts`

Find the algorithm in the file and update the `pdfUrl` from empty string to local path:

**BEFORE:**
```typescript
{
  id: 'aha-acls-cardiac-arrest',
  title: 'Adult Cardiac Arrest Algorithm - ACLS',
  category: 'ACLS',
  published: '2020-10-21',
  summary: '...',
  pdfUrl: '',  // ❌ No local PDF yet
  fullTextUrl: 'https://cpr.heart.org/...',
  evidenceLevel: 'Class I',
  recommendations: [ ... ]
}
```

**AFTER:**
```typescript
{
  id: 'aha-acls-cardiac-arrest',
  title: 'Adult Cardiac Arrest Algorithm - ACLS',
  category: 'ACLS',
  published: '2020-10-21',
  summary: '...',
  pdfUrl: '/algorithms/acls/cardiac-arrest.pdf',  // ✅ LOCAL PDF!
  fullTextUrl: 'https://cpr.heart.org/...',
  evidenceLevel: 'Class I',
  recommendations: [ ... ]
}
```

### Step 5: Test Locally
```bash
cd /Users/apple/ECCCO
npm run dev
```

1. Open http://localhost:3000/guidelines-search
2. Search for the algorithm (e.g., "cardiac arrest")
3. Verify you see the animated **FLOWCHART PDF** badge
4. Click **"View Algorithm PDF"** button
5. Confirm PDF opens correctly

### Step 6: Deploy
```bash
git add public/algorithms/
git add src/lib/guidelines/aha.ts
git commit -m "feat: Add [Algorithm Name] flowchart PDF"
git push
```

Vercel will automatically deploy! 🚀

---

## 🎨 VISUAL INDICATORS (Automatic)

Once you add a PDF and update `pdfUrl`:

### Guideline Card Will Show:
1. **Animated Badge:** 🔴 **FLOWCHART PDF** (red/pink, pulsing)
2. **Primary Button:** Large **"View Algorithm PDF"** (red/pink gradient)
3. **Secondary Button:** Smaller **"Full Guideline"** (green)

### If NO PDF (`pdfUrl: ''`):
1. **No badge** - just category/evidence badges
2. **Only "Full Guideline" button** shows
3. Recommendations display as text

---

## 📊 QUICK REFERENCE: What to Add

### High Priority (Most Used)
1. **ACLS Cardiac Arrest** - Most critical algorithm
2. **ACLS Bradycardia** - Common emergency
3. **ACLS Tachycardia** - Common emergency
4. **BLS Adult CPR** - Foundation algorithm
5. **PALS Cardiac Arrest** - Pediatric critical

### Medium Priority
6. **ACLS ACS** - Chest pain pathway
7. **ACLS Stroke** - Time-critical
8. **BLS Opioid Overdose** - Public health priority

### Lower Priority (Specialized)
9. **PALS Bradycardia** - Specialized pediatric
10. **PALS Tachycardia** - Specialized pediatric
11. **NRP Neonatal** - Delivery room only

---

## 🔗 URL PATTERNS

After deployment, PDFs will be accessible at:

```
https://eccco.vercel.app/algorithms/acls/sepsis-algorithm.pdf          ✅ LIVE
https://eccco.vercel.app/algorithms/acls/cardiac-arrest.pdf            🔜 Add this
https://eccco.vercel.app/algorithms/acls/bradycardia.pdf               🔜 Add this
https://eccco.vercel.app/algorithms/pals/cardiac-arrest.pdf            🔜 Add this
```

---

## 💡 TIPS FOR SUCCESS

### PDF Quality
- ✅ **Min Resolution:** 150 DPI (readable on phone)
- ✅ **Ideal Size:** < 2 MB (fast loading)
- ✅ **Format:** PDF (not JPG/PNG in guidelines code)
- ✅ **Orientation:** Portrait or Landscape (both work)

### Finding PDFs
- Check institutional training materials first
- Google: "[Algorithm Name] AHA flowchart PDF"
- Many are available for educational use
- Can screenshot and convert to PDF if needed

### Legal/Copyright
- ✅ AHA algorithms for educational purposes are generally OK
- ✅ Verify "fair use" or educational licensing
- ✅ Give attribution in fullTextUrl
- ⚠️ Don't claim ownership of AHA content
- ⚠️ If in doubt, create your own based on guidelines

---

## 🎯 EXAMPLE: Adding ACLS Cardiac Arrest PDF

```bash
# 1. Download or create cardiac-arrest.pdf

# 2. Copy to correct location
cp ~/Downloads/acls-cardiac-arrest-flowchart.pdf \
   /Users/apple/ECCCO/public/algorithms/acls/cardiac-arrest.pdf

# 3. Edit src/lib/guidelines/aha.ts
# Find the 'aha-acls-cardiac-arrest' entry
# Change: pdfUrl: ''
# To: pdfUrl: '/algorithms/acls/cardiac-arrest.pdf'

# 4. Test locally
npm run dev
# Visit http://localhost:3000/guidelines-search
# Search "cardiac arrest"
# Click "View Algorithm PDF" - should open!

# 5. Deploy
git add public/algorithms/acls/cardiac-arrest.pdf
git add src/lib/guidelines/aha.ts
git commit -m "feat: Add ACLS Cardiac Arrest flowchart PDF"
git push
```

Done! Your flowchart is live with animated badge and prominent button! 🎉

---

## 🚨 TROUBLESHOOTING

### PDF Not Showing
- ✅ Check file is in `public/algorithms/[category]/`
- ✅ Check `pdfUrl` path matches exactly (case-sensitive)
- ✅ Clear browser cache (Cmd+Shift+R)
- ✅ Check PDF file isn't corrupted (open locally first)

### Badge Not Appearing
- ✅ `pdfUrl` must not be empty string
- ✅ Path must start with `/algorithms/`
- ✅ Wait for Vercel deployment to complete (1-2 min)

### PDF Won't Open
- ✅ Check file permissions (should be readable)
- ✅ Verify PDF isn't password-protected
- ✅ Try different browser
- ✅ Check browser console for errors

---

## 📞 NEXT STEPS

1. **Find 1-2 PDFs** (Start with Cardiac Arrest and Bradycardia)
2. **Add to public/algorithms/acls/**
3. **Update aha.ts** pdfUrl fields
4. **Test locally** (npm run dev)
5. **Deploy** (git push)
6. **Repeat** for more algorithms!

**Goal:** Get 5-10 flowchart PDFs to really differentiate from Evidence Search!

---

**Built with ❤️ for ECCCO**  
*Visual algorithms at your fingertips - because seconds matter in emergency medicine.*
