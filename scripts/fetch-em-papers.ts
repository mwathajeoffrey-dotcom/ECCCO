/**
 * FREE PubMed API Script for Emergency Medicine Papers
 * 
 * This script searches PubMed for high-quality emergency medicine research
 * and outputs formatted results for manual review and addition to Evidence Library.
 * 
 * 100% FREE - No API key needed!
 * 
 * Usage:
 *   npx tsx scripts/fetch-em-papers.ts
 */

interface PubMedPaper {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi: string;
  abstract: string;
  publicationType: string[];
  citationCount?: number;
}

// PubMed search queries for different EM topics
const EM_SEARCH_QUERIES = {
  'Cardiac Arrest': 'cardiac arrest AND (emergency OR resuscitation) AND (randomized controlled trial OR meta-analysis)',
  'Sepsis': 'sepsis OR septic shock AND emergency department AND (randomized controlled trial OR systematic review)',
  'Trauma': 'trauma AND (hemorrhage OR hemorrhagic shock) AND (randomized controlled trial OR meta-analysis)',
  'Stroke': 'acute stroke AND emergency AND (thrombolysis OR thrombectomy) AND (randomized controlled trial OR guideline)',
  'ACS': 'acute coronary syndrome AND emergency department AND (randomized controlled trial OR meta-analysis)',
  'Respiratory': 'acute respiratory failure AND emergency AND (randomized controlled trial OR systematic review)',
  'Pediatric EM': 'pediatric emergency AND (randomized controlled trial OR meta-analysis)',
  'Airway': 'intubation AND (emergency OR critical care) AND (randomized controlled trial OR systematic review)',
  'Pain Management': 'acute pain AND emergency department AND (randomized controlled trial OR meta-analysis)',
  'Toxicology': 'overdose OR poisoning AND emergency department AND (randomized controlled trial OR guideline)'
};

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchPubMed(query: string, maxResults: number = 20): Promise<string[]> {
  const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
  
  // Add filters for recent, high-quality papers
  const filters = [
    '"last 10 years"[PDat]',  // Last 10 years
    'humans[MeSH Terms]',      // Human studies only
    'English[lang]'            // English only
  ].join(' AND ');
  
  const fullQuery = `${query} AND ${filters}`;
  const searchUrl = `${baseUrl}esearch.fcgi?db=pubmed&term=${encodeURIComponent(fullQuery)}&retmode=json&retmax=${maxResults}&sort=relevance`;
  
  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    return data.esearchresult?.idlist || [];
  } catch (error) {
    console.error(`Error searching PubMed: ${error}`);
    return [];
  }
}

async function fetchPaperDetails(pmids: string[]): Promise<PubMedPaper[]> {
  if (pmids.length === 0) return [];
  
  const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
  const fetchUrl = `${baseUrl}efetch.fcgi?db=pubmed&id=${pmids.join(',')}&retmode=xml`;
  
  try {
    const response = await fetch(fetchUrl);
    const xmlText = await response.text();
    return parseXML(xmlText);
  } catch (error) {
    console.error(`Error fetching paper details: ${error}`);
    return [];
  }
}

function parseXML(xml: string): PubMedPaper[] {
  const papers: PubMedPaper[] = [];
  
  // Simple XML parsing (in production, use a proper XML parser)
  const articleMatches = xml.matchAll(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g);
  
  for (const match of articleMatches) {
    const article = match[1];
    
    // Extract PMID
    const pmidMatch = article.match(/<PMID[^>]*>(\d+)<\/PMID>/);
    const pmid = pmidMatch ? pmidMatch[1] : '';
    
    // Extract Title
    const titleMatch = article.match(/<ArticleTitle>(.*?)<\/ArticleTitle>/s);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : '';
    
    // Extract Authors
    const authorMatches = article.matchAll(/<Author[^>]*>[\s\S]*?<LastName>(.*?)<\/LastName>[\s\S]*?<\/Author>/g);
    const authors = Array.from(authorMatches).map(m => m[1]);
    const authorsStr = authors.length > 0 
      ? authors.length > 3 
        ? `${authors.slice(0, 3).join(', ')} et al.`
        : authors.join(', ')
      : 'Unknown';
    
    // Extract Journal
    const journalMatch = article.match(/<Title>(.*?)<\/Title>/);
    const journal = journalMatch ? journalMatch[1] : '';
    
    // Extract Year
    const yearMatch = article.match(/<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>/);
    const year = yearMatch ? yearMatch[1] : '';
    
    // Extract DOI
    const doiMatch = article.match(/<ArticleId IdType="doi">(.*?)<\/ArticleId>/);
    const doi = doiMatch ? doiMatch[1] : '';
    
    // Extract Abstract
    const abstractMatch = article.match(/<Abstract>([\s\S]*?)<\/Abstract>/);
    let abstract = '';
    if (abstractMatch) {
      const abstractTextMatches = abstractMatch[1].matchAll(/<AbstractText[^>]*>(.*?)<\/AbstractText>/gs);
      abstract = Array.from(abstractTextMatches)
        .map(m => m[1].replace(/<[^>]+>/g, ''))
        .join(' ')
        .substring(0, 500) + '...';
    }
    
    // Extract Publication Types
    const pubTypeMatches = article.matchAll(/<PublicationType[^>]*>(.*?)<\/PublicationType>/g);
    const publicationType = Array.from(pubTypeMatches).map(m => m[1]);
    
    if (pmid && title) {
      papers.push({
        pmid,
        title,
        authors: authorsStr,
        journal,
        year,
        doi,
        abstract,
        publicationType
      });
    }
  }
  
  return papers;
}

function isHighImpact(paper: PubMedPaper): boolean {
  // Filter for high-quality study types
  const highQualityTypes = [
    'Randomized Controlled Trial',
    'Meta-Analysis',
    'Systematic Review',
    'Practice Guideline',
    'Multicenter Study'
  ];
  
  return paper.publicationType.some(type => 
    highQualityTypes.some(hq => type.includes(hq))
  );
}

function categorizeForEvidenceLibrary(paper: PubMedPaper): string {
  const title = paper.title.toLowerCase();
  
  if (title.includes('cardiac arrest') || title.includes('resuscitation') || title.includes('cpr')) {
    return 'Cardiac Arrest & Resuscitation';
  }
  if (title.includes('sepsis') || title.includes('septic shock')) {
    return 'Sepsis & Septic Shock';
  }
  if (title.includes('trauma') || title.includes('hemorrhage')) {
    return 'Trauma & Hemorrhagic Shock';
  }
  if (title.includes('stroke') || title.includes('thrombolysis')) {
    return 'Acute Stroke';
  }
  if (title.includes('coronary') || title.includes('myocardial infarction') || title.includes('stemi')) {
    return 'Acute Coronary Syndromes';
  }
  if (title.includes('respiratory') || title.includes('ards') || title.includes('intubation')) {
    return 'Respiratory & Airway Management';
  }
  if (title.includes('pediatric') || title.includes('child')) {
    return 'Pediatric Advanced Life Support';
  }
  
  return 'Other Emergency Medicine';
}

function formatPaperForOutput(paper: PubMedPaper, category: string): string {
  const studyType = paper.publicationType.find(type => 
    type.includes('Randomized') || type.includes('Meta-Analysis') || type.includes('Systematic')
  ) || 'Study';
  
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 ${paper.title}

📊 Study Type: ${studyType}
👥 Authors: ${paper.authors}
📰 Journal: ${paper.journal}
📅 Year: ${paper.year}
🔗 PMID: ${paper.pmid}
🆔 DOI: ${paper.doi || 'N/A'}

📂 Suggested Category: ${category}

📝 Abstract Preview:
${paper.abstract}

🔗 PubMed Link: https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/
${paper.doi ? `🔗 DOI Link: https://doi.org/${paper.doi}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
}

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║   🏥 Emergency Medicine Research Paper Finder                 ║
║   Powered by PubMed API (100% FREE)                           ║
╚═══════════════════════════════════════════════════════════════╝

Searching for high-quality emergency medicine papers...
(Randomized trials, meta-analyses, systematic reviews, guidelines)

`);

  const allPapers: Array<{ paper: PubMedPaper; category: string }> = [];

  for (const [topic, query] of Object.entries(EM_SEARCH_QUERIES)) {
    console.log(`\n🔍 Searching: ${topic}...`);
    
    // Search PubMed
    const pmids = await searchPubMed(query, 10);
    console.log(`   Found ${pmids.length} papers`);
    
    if (pmids.length > 0) {
      // Wait 350ms between requests (rate limit: 3 req/sec)
      await sleep(350);
      
      // Fetch details
      const papers = await fetchPaperDetails(pmids);
      
      // Filter for high-impact only
      const highImpactPapers = papers.filter(isHighImpact);
      console.log(`   ✅ ${highImpactPapers.length} high-quality papers found`);
      
      // Categorize
      for (const paper of highImpactPapers) {
        const category = categorizeForEvidenceLibrary(paper);
        allPapers.push({ paper, category });
      }
      
      // Wait before next search
      await sleep(350);
    }
  }

  // Sort by year (newest first)
  allPapers.sort((a, b) => parseInt(b.paper.year) - parseInt(a.paper.year));

  console.log(`\n
╔═══════════════════════════════════════════════════════════════╗
║   📊 RESULTS SUMMARY                                          ║
╚═══════════════════════════════════════════════════════════════╝

Total High-Quality Papers Found: ${allPapers.length}

By Category:
${Object.entries(
  allPapers.reduce((acc, { category }) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([cat, count]) => `  • ${cat}: ${count}`).join('\n')}

By Year:
${Object.entries(
  allPapers.reduce((acc, { paper }) => {
    acc[paper.year] = (acc[paper.year] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
  .map(([year, count]) => `  • ${year}: ${count}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DETAILED RESULTS
(Review these papers and add the best ones to your Evidence Library)

`);

  // Output all papers
  allPapers.forEach(({ paper, category }, index) => {
    console.log(`\n[${index + 1}/${allPapers.length}]`);
    console.log(formatPaperForOutput(paper, category));
  });

  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║   ✅ SEARCH COMPLETE!                                         ║
╚═══════════════════════════════════════════════════════════════╝

📊 Found ${allPapers.length} high-quality emergency medicine papers

Next Steps:
1. Review the papers above
2. Visit PubMed links to read full abstracts
3. Select papers most relevant to your Evidence Library
4. Add them to: /src/app/emergency-references/page.tsx

💡 Pro Tip: 
- Look for high citation counts on PubMed
- Prioritize landmark trials (CRASH-2, PROSEVA, etc.)
- Focus on practice-changing studies
- Recent papers (last 5 years) for current guidelines

🚀 Want more papers? 
Edit EM_SEARCH_QUERIES in this script to add more topics!

`);
}

// Run the script
main().catch(console.error);
