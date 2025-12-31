# Clinical Algorithm PDFs

This directory contains visual clinical algorithm flowcharts that are served directly from the ECCCO platform.

## 📁 Directory Structure

```
public/algorithms/
├── acls/          # Advanced Cardiac Life Support algorithms
├── pals/          # Pediatric Advanced Life Support algorithms
├── bls/           # Basic Life Support algorithms
└── nrp/           # Neonatal Resuscitation Program algorithms
```

## 🎯 Currently Available Algorithms

### ACLS (Advanced Cardiac Life Support)
- **sepsis-algorithm.pdf** - Sepsis/Septic Shock Visual Treatment Algorithm

### Coming Soon
- Cardiac Arrest Algorithm (VF/pVT and Asystole/PEA)
- Bradycardia Algorithm
- Tachycardia Algorithm
- Acute Coronary Syndrome (ACS) Algorithm
- Stroke Algorithm

## ➕ How to Add New Algorithm PDFs

### Step 1: Get the PDF
Download or scan high-quality clinical algorithm flowcharts. Ensure they are:
- ✅ Freely accessible or properly licensed
- ✅ From reputable sources (AHA, ACS, Surviving Sepsis, etc.)
- ✅ High resolution (readable when printed)
- ✅ PDF format

### Step 2: Name the File
Use descriptive kebab-case naming:
```
cardiac-arrest-algorithm.pdf
bradycardia-algorithm.pdf
pediatric-sepsis-algorithm.pdf
neonatal-resuscitation-algorithm.pdf
```

### Step 3: Place in Correct Folder
```bash
# For ACLS algorithms
cp algorithm.pdf public/algorithms/acls/

# For PALS algorithms  
cp algorithm.pdf public/algorithms/pals/

# For BLS algorithms
cp algorithm.pdf public/algorithms/bls/

# For NRP algorithms
cp algorithm.pdf public/algorithms/nrp/
```

### Step 4: Update src/lib/guidelines/aha.ts
Add a new guideline entry:

```typescript
{
  id: 'aha-acls-your-algorithm',
  title: 'Your Algorithm Name - ACLS',
  category: 'ACLS',
  published: '2024-01-01',
  summary: 'Description of the algorithm and what it covers.',
  pdfUrl: '/algorithms/acls/your-algorithm.pdf',  // ← Local path
  fullTextUrl: 'https://source-guideline-url.com',
  evidenceLevel: 'Class I',
  recommendations: [
    'Key recommendation 1',
    'Key recommendation 2',
    // ... more recommendations
  ],
  topics: ['keyword1', 'keyword2', 'keyword3']
}
```

### Step 5: Test Locally
```bash
npm run dev
# Visit http://localhost:3000/guidelines-search
# Search for your algorithm
# Click "View Algorithm PDF" to verify it opens
```

### Step 6: Deploy
```bash
git add public/algorithms/
git add src/lib/guidelines/aha.ts
git commit -m "feat: Add [Algorithm Name] flowchart PDF"
git push
```

Vercel will automatically deploy and serve the PDF from their CDN! 🚀

## 📊 File Size Recommendations

- **Ideal:** < 2 MB per PDF (fast loading)
- **Maximum:** < 5 MB per PDF
- **Optimization:** Use PDF compression tools if needed

## 🔗 URL Structure

Once deployed, PDFs are accessible at:
```
https://eccco.vercel.app/algorithms/acls/sepsis-algorithm.pdf
https://eccco.vercel.app/algorithms/pals/pediatric-sepsis.pdf
https://eccco.vercel.app/algorithms/bls/cpr-algorithm.pdf
```

## 📋 Algorithm Sources

### Recommended Sources for Free Algorithms:
1. **AHA Guidelines** - https://www.heart.org/guidelines
2. **Surviving Sepsis Campaign** - https://www.sccm.org/survivingsepsiscampaign
3. **European Resuscitation Council** - https://www.erc.edu
4. **AAP Neonatal Resuscitation** - https://www.aap.org/nrp
5. **ATLS Trauma Algorithms** - Check institutional access
6. **NICE Guidelines** - https://www.nice.org.uk/guidance

### Copyright Considerations
- ✅ Use algorithms marked as "free to use" or "educational purposes"
- ✅ Algorithms from public health organizations (WHO, CDC)
- ✅ Creative Commons licensed content
- ⚠️ Verify licensing before adding copyrighted materials
- ⚠️ Give proper attribution in the guideline metadata

## 🎨 Best Practices

1. **Clear Naming:** Use descriptive names that match the guideline title
2. **Consistent Format:** Keep all files as PDF
3. **Quality Check:** Verify readability on mobile devices
4. **Metadata:** Update aha.ts with complete information
5. **Testing:** Always test locally before deployment
6. **Attribution:** Include source URLs in fullTextUrl field

## 💡 Future Enhancements

Possible improvements:
- [ ] Image preview thumbnails (.jpg versions)
- [ ] Multi-language versions
- [ ] Print-optimized versions
- [ ] Interactive PDF forms
- [ ] Version history tracking

## 📞 Questions?

If you need help adding algorithms, check:
- Project documentation in `/docs`
- AHA guidelines format in `src/lib/guidelines/aha.ts`
- Guidelines search UI in `src/app/guidelines-search/page.tsx`

---

**Built with ❤️ for ECCCO**  
*Making clinical algorithms accessible at the point of care.*
