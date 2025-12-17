# 🏥 Free PubMed Paper Finder Script

## What This Does

**100% FREE** script that searches PubMed for high-quality emergency medicine research papers and presents them in an easy-to-review format.

## Features

✅ **Completely Free** - No API keys, no costs, no signup  
✅ **Smart Filtering** - Only RCTs, meta-analyses, systematic reviews, guidelines  
✅ **Auto-Categorized** - Suggests which Evidence Library category each paper belongs to  
✅ **Recent Papers** - Last 10 years only  
✅ **10 EM Topics** - Cardiac arrest, sepsis, trauma, stroke, ACS, respiratory, pediatrics, airway, pain, toxicology  

## Quick Start

### 1. Run the Script

```bash
npx tsx scripts/fetch-em-papers.ts
```

The script will:
- Search PubMed for ~100 papers across 10 EM topics
- Filter for high-quality studies only
- Display formatted results with abstracts
- Suggest Evidence Library categories

### 2. Review Output

You'll see output like:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 Effects of Tranexamic Acid on Death in Trauma Patients

📊 Study Type: Randomized Controlled Trial
👥 Authors: CRASH-2 Collaborators
📰 Journal: The Lancet
📅 Year: 2010
🔗 PMID: 20554319
🆔 DOI: 10.1016/S0140-6736(10)60835-5

📂 Suggested Category: Trauma & Hemorrhagic Shock

📝 Abstract Preview:
Background: Tranexamic acid reduces bleeding in elective surgery...

🔗 PubMed Link: https://pubmed.ncbi.nlm.nih.gov/20554319/
🔗 DOI Link: https://doi.org/10.1016/S0140-6736(10)60835-5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3. Add Papers to Evidence Library

For papers you want to add:

1. Visit the PubMed link to read full details
2. Copy the information
3. Add to `/src/app/emergency-references/page.tsx`
4. Format according to existing entries

## What Papers Does It Find?

### Topics Searched (10 Categories)

1. **Cardiac Arrest** - Resuscitation, CPR trials
2. **Sepsis** - Septic shock management, fluid trials
3. **Trauma** - Hemorrhagic shock, massive transfusion
4. **Stroke** - Thrombolysis, thrombectomy trials
5. **ACS** - STEMI/NSTEMI management
6. **Respiratory** - Acute respiratory failure, ARDS
7. **Pediatric EM** - Pediatric emergency trials
8. **Airway** - Intubation, RSI studies
9. **Pain Management** - Acute pain in ED
10. **Toxicology** - Overdose, poisoning management

### Quality Filters

Only includes papers that are:
- ✅ Randomized Controlled Trials
- ✅ Meta-Analyses
- ✅ Systematic Reviews
- ✅ Practice Guidelines
- ✅ Multicenter Studies
- ✅ Published in last 10 years
- ✅ Human studies only
- ✅ English language

## Customization

### Search More Papers

Edit the `maxResults` parameter in the script:

```typescript
const pmids = await searchPubMed(query, 20); // Change to 50, 100, etc.
```

### Add More Topics

Add to `EM_SEARCH_QUERIES` object:

```typescript
const EM_SEARCH_QUERIES = {
  // ... existing queries
  'Anaphylaxis': 'anaphylaxis AND emergency AND (randomized controlled trial OR guideline)',
  'TBI': 'traumatic brain injury AND emergency AND (randomized controlled trial OR meta-analysis)',
  // Add more...
};
```

### Change Date Range

Edit the filters:

```typescript
const filters = [
  '"last 5 years"[PDat]',  // Change from 10 to 5 years
  'humans[MeSH Terms]',
  'English[lang]'
];
```

## Example Output Summary

```
╔═══════════════════════════════════════════════════════════════╗
║   📊 RESULTS SUMMARY                                          ║
╚═══════════════════════════════════════════════════════════════╝

Total High-Quality Papers Found: 73

By Category:
  • Cardiac Arrest & Resuscitation: 12
  • Sepsis & Septic Shock: 9
  • Trauma & Hemorrhagic Shock: 11
  • Acute Stroke: 8
  • Acute Coronary Syndromes: 7
  • Respiratory & Airway Management: 10
  • Pediatric Advanced Life Support: 6
  • Other Emergency Medicine: 10

By Year:
  • 2024: 15
  • 2023: 18
  • 2022: 12
  • 2021: 11
  • 2020: 9
  • 2019: 8
```

## Rate Limits

PubMed API rate limits:
- **Without API key**: 3 requests per second
- **With free API key**: 10 requests per second

The script automatically waits 350ms between requests to stay under the limit.

### Get a Free API Key (Optional)

To search faster:

1. Create NCBI account: https://www.ncbi.nlm.nih.gov/account/
2. Get API key: https://www.ncbi.nlm.nih.gov/account/settings/
3. Add to script:

```typescript
const searchUrl = `${baseUrl}esearch.fcgi?db=pubmed&api_key=YOUR_KEY&term=...`;
```

## Troubleshooting

### "Command not found: tsx"

Install tsx:

```bash
npm install -D tsx
```

### "Rate limit exceeded"

Increase the sleep time:

```typescript
await sleep(500); // Change from 350 to 500ms
```

### "No papers found"

Check your internet connection and try simpler queries.

## What This Costs

**$0.00** - Completely free!

- ✅ PubMed API: FREE
- ✅ No API key required: FREE
- ✅ Unlimited searches: FREE
- ✅ No database fees: FREE

## Next Steps After Running

1. **Review the results** - Look for landmark trials and high-impact studies
2. **Visit PubMed links** - Read full abstracts
3. **Check citations** - Papers with 100+ citations are usually important
4. **Add to Evidence Library** - Copy best papers to your code
5. **Run regularly** - Run weekly/monthly to find new papers

## Pro Tips

### Find Landmark Papers

Look for papers with these names in title/abstract:
- CRASH-2 (Tranexamic acid)
- PROSEVA (Prone positioning)
- PROPPR (Blood products)
- PARAMEDIC2 (Adrenaline)
- ARREST (Hypothermia)
- Rivers (Early goal-directed therapy)
- NINDS (tPA for stroke)
- GUSTO (Thrombolytics)

### Search Specific Journals

Add journal filter:

```typescript
const query = 'sepsis AND "New England Journal of Medicine"[Journal]';
```

### Find Recent Guidelines

```typescript
const query = 'emergency medicine AND practice guideline AND "last 2 years"[PDat]';
```

## Advanced: Save to JSON

Want to save results to a file for later?

```typescript
// At end of main() function:
import fs from 'fs';

const output = allPapers.map(({ paper, category }) => ({
  title: paper.title,
  authors: paper.authors,
  journal: paper.journal,
  year: paper.year,
  pmid: paper.pmid,
  doi: paper.doi,
  category,
  pubmedUrl: `https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`
}));

fs.writeFileSync('em-papers.json', JSON.stringify(output, null, 2));
console.log('✅ Saved to em-papers.json');
```

## Questions?

This script gives you a curated list of high-quality EM papers to review. Pick the best ones and add them to your Evidence Library manually!

---

**Happy paper hunting! 📚🏥**
