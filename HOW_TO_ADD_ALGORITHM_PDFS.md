# 🎯 HOW TO ADD ALGORITHM FLOWCHART PDFs

## ✅ What We Have Now

**Locally Hosted:**
- ✅ **Sepsis Algorithm** - `/public/algorithms/acls/sepsis-algorithm.pdf` (YOUR PDF - LIVE!)

**Placeholders (Need Real PDFs):**
- ⚠️ ACLS Cardiac Arrest
- ⚠️ ACLS Bradycardia  
- ⚠️ ACLS Tachycardia
- ⚠️ ACLS ACS
- ⚠️ ACLS Stroke
- ⚠️ PALS Cardiac Arrest, Bradycardia, Tachycardia
- ⚠️ BLS Adult CPR, Opioid Overdose
- ⚠️ NRP Neonatal Resuscitation

---

## 📥 How to Add a New Algorithm PDF

### Step 1: Get the PDF

**Where to Find Algorithm PDFs:**

1. **AHA Official** - https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms
   - Download official AHA algorithm PDFs
   - Free for educational use

2. **ACLS.net** - https://www.acls.net/
   - Has algorithm charts (may need to screenshot → PDF)

3. **Your Institution**
   - Hospital protocols
   - ACLS/PALS training materials
   - Scan physical cards

4. **Scan from Cards**
   - ACLS pocket reference cards
   - PALS pocket cards
   - Use phone scanner app → save as PDF

5. **Screenshot Method**
   - Find algorithm image online
   - Screenshot
   - Convert to PDF (Mac: Preview → Export as PDF)

---

### Step 2: Name the File

Use **kebab-case** (lowercase with hyphens):

```
✅ cardiac-arrest-algorithm.pdf
✅ sepsis-algorithm.pdf  
✅ neonatal-resuscitation-algorithm.pdf

❌ Cardiac Arrest.pdf
❌ ACLS_Algorithm.pdf
❌ algorithm1.pdf
```

**Naming Convention:**
- ACLS: `{condition}-algorithm.pdf` → `cardiac-arrest-algorithm.pdf`
- PALS: `{condition}-algorithm.pdf` → `pediatric-sepsis-algorithm.pdf`  
- BLS: `{action}-algorithm.pdf` → `adult-cpr-algorithm.pdf`
- NRP: `neonatal-{condition}-algorithm.pdf` → `neonatal-resuscitation-algorithm.pdf`

---

### Step 3: Place in Correct Folder

```bash
# Navigate to ECCCO project
cd /Users/apple/ECCCO

# ACLS algorithms
cp ~/Downloads/cardiac-arrest-algorithm.pdf public/algorithms/acls/

# PALS algorithms
cp ~/Downloads/pediatric-bradycardia.pdf public/algorithms/pals/

# BLS algorithms
cp ~/Downloads/adult-cpr.pdf public/algorithms/bls/

# NRP algorithms
cp ~/Downloads/neonatal-resus.pdf public/algorithms/nrp/
```

**Or Use Finder:**
1. Open Finder
2. Navigate to `/Users/apple/ECCCO/public/algorithms/`
3. Open the category folder (acls, pals, bls, or nrp)
4. Drag and drop your PDF into the folder

---

### Step 4: Update src/lib/guidelines/aha.ts

**Find the algorithm** in the file and update the `pdfUrl`:

**BEFORE:**
```typescript
{
  id: 'aha-acls-cardiac-arrest',
  title: 'Adult Cardiac Arrest Algorithm - ACLS',
  category: 'ACLS',
  published: '2020-10-21',
  summary: 'Complete ACLS cardiac arrest algorithm...',
  pdfUrl: 'https://www.acls.net/images/algo-acls-cardiac-arrest.pdf',  // ❌ BROKEN
  fullTextUrl: 'https://cpr.heart.org/...',
  evidenceLevel: 'Class I',
  recommendations: [...],
  topics: [...]
}
```

**AFTER:**
```typescript
{
  id: 'aha-acls-cardiac-arrest',
  title: 'Adult Cardiac Arrest Algorithm - ACLS',
  category: 'ACLS',
  published: '2020-10-21',
  summary: 'Complete ACLS cardiac arrest algorithm...',
  pdfUrl: '/algorithms/acls/cardiac-arrest-algorithm.pdf',  // ✅ LOCAL
  fullTextUrl: 'https://cpr.heart.org/...',
  evidenceLevel: 'Class I',
  recommendations: [...],
  topics: [...]
}
```

**Key Change:**
- Replace external URL with `/algorithms/{category}/{filename}.pdf`
- Remove `imageUrl` field if present (not needed)

---

### Step 5: Test Locally

```bash
# Build the project
npm run build

# Start development server
npm run dev

# Open browser
# Go to: http://localhost:3000/guidelines-search
# Search for your algorithm (e.g., "cardiac arrest")
# Click "View Algorithm PDF" button
# PDF should open!
```

---

### Step 6: Deploy to Vercel

```bash
# Commit the PDF and code changes
git add public/algorithms/
git add src/lib/guidelines/aha.ts
git commit -m "feat: Add [Algorithm Name] flowchart PDF"
git push

# Vercel automatically deploys!
# Wait 1-2 minutes
# Visit: https://eccco.vercel.app/guidelines-search
# Test the PDF link
```

---

## 🎯 Quick Add Checklist

For each new algorithm:

- [ ] 1. Download/scan PDF
- [ ] 2. Rename using kebab-case
- [ ] 3. Copy to `/public/algorithms/{category}/`
- [ ] 4. Update `pdfUrl` in `src/lib/guidelines/aha.ts`
- [ ] 5. Run `npm run build` (check for errors)
- [ ] 6. Test locally at http://localhost:3000/guidelines-search
- [ ] 7. Commit and push to deploy
- [ ] 8. Test on production: https://eccco.vercel.app/guidelines-search

---

## 📋 Priority List (What to Add Next)

### HIGH PRIORITY (Most Searched)
1. **ACLS Cardiac Arrest** - `/algorithms/acls/cardiac-arrest-algorithm.pdf`
2. **ACLS Bradycardia** - `/algorithms/acls/bradycardia-algorithm.pdf`
3. **ACLS Tachycardia** - `/algorithms/acls/tachycardia-algorithm.pdf`
4. **BLS Adult CPR** - `/algorithms/bls/adult-cpr-algorithm.pdf`

### MEDIUM PRIORITY  
5. **ACLS ACS (STEMI/NSTEMI)** - `/algorithms/acls/acs-algorithm.pdf`
6. **ACLS Stroke** - `/algorithms/acls/stroke-algorithm.pdf`
7. **PALS Cardiac Arrest** - `/algorithms/pals/cardiac-arrest-algorithm.pdf`

### LOWER PRIORITY
8. **PALS Bradycardia** - `/algorithms/pals/bradycardia-algorithm.pdf`
9. **PALS Tachycardia** - `/algorithms/pals/tachycardia-algorithm.pdf`
10. **BLS Opioid Overdose** - `/algorithms/bls/opioid-overdose-algorithm.pdf`
11. **NRP Neonatal Resus** - `/algorithms/nrp/neonatal-resuscitation-algorithm.pdf`

---

## 💡 Tips & Best Practices

### File Size
- **Ideal:** < 2 MB (fast loading)
- **Maximum:** < 5 MB
- **Compress if needed:** Use PDF compression tools

### Quality
- High resolution (readable when zoomed)
- Clear text and arrows
- Professional appearance
- No watermarks if possible

### Copyright
- ✅ AHA official PDFs (free for education)
- ✅ Scanned from your own training cards
- ✅ Institution-specific protocols you own
- ✅ Creative Commons licensed
- ⚠️ Verify licensing before using

### Organization
```
public/algorithms/
├── acls/
│   ├── sepsis-algorithm.pdf ✅ (YOUR PDF!)
│   ├── cardiac-arrest-algorithm.pdf (TODO)
│   ├── bradycardia-algorithm.pdf (TODO)
│   └── ...
├── pals/
│   └── (PDFs go here)
├── bls/
│   └── (PDFs go here)
└── nrp/
    └── (PDFs go here)
```

---

## 🚀 Example: Adding Cardiac Arrest Algorithm

```bash
# 1. Download from AHA website
# Save as: cardiac-arrest-algorithm.pdf

# 2. Copy to project
cp ~/Downloads/cardiac-arrest-algorithm.pdf /Users/apple/ECCCO/public/algorithms/acls/

# 3. Edit aha.ts - change line ~110:
# FROM: pdfUrl: 'https://www.acls.net/images/algo-acls-cardiac-arrest.pdf',
# TO:   pdfUrl: '/algorithms/acls/cardiac-arrest-algorithm.pdf',

# 4. Test
cd /Users/apple/ECCCO
npm run build
npm run dev
# Visit: http://localhost:3000/guidelines-search
# Search: "cardiac arrest"
# Click: "View Algorithm PDF"

# 5. Deploy
git add public/algorithms/acls/cardiac-arrest-algorithm.pdf
git add src/lib/guidelines/aha.ts
git commit -m "feat: Add ACLS cardiac arrest algorithm PDF"
git push
```

**Done!** ✅

---

## ❓ Troubleshooting

### PDF Link Shows 404
- Check filename matches exactly (case-sensitive on some systems)
- Verify file is in correct folder
- Restart dev server after adding PDF

### PDF Won't Open
- Check file isn't corrupted
- Try opening PDF locally first
- Verify it's actually a PDF (not renamed image)

### Build Errors
- Check `aha.ts` for syntax errors
- Verify all strings have matching quotes
- Run `npm run build` to see specific errors

### PDF Too Large
- Compress using online tool (e.g., ilovepdf.com/compress_pdf)
- Or use Preview on Mac: File → Export → Reduce File Size

---

## 📞 Need Help?

1. Check build errors: `npm run build`
2. Check browser console: Right-click → Inspect → Console
3. Verify file path: `ls -la public/algorithms/acls/`
4. Test PDF directly: `open public/algorithms/acls/sepsis-algorithm.pdf`

---

**🎊 You now have a complete system for hosting algorithm PDFs!**

Just drag & drop PDFs, update one line of code, and deploy! 🚀
