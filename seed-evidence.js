#!/usr/bin/env node

/**
 * Seed Evidence Library with Initial Papers
 * 
 * This script fetches papers from PubMed and imports them into the Evidence table
 * Run with: node seed-evidence.js
 */

const topics = [
  'sepsis management emergency medicine',
  'cardiac arrest ACLS',
  'trauma resuscitation',
  'stroke emergency treatment',
  'respiratory failure emergency',
];

async function seedPapers() {
  console.log('🌱 Seeding Evidence Library...\n');

  for (const topic of topics) {
    console.log(`📚 Fetching papers for: ${topic}`);
    
    try {
      // Fetch from PubMed API
      const searchUrl = `https://eccco.vercel.app/api/pubmed?q=${encodeURIComponent(topic)}&limit=3`;
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      if (!searchData.success || !searchData.articles?.length) {
        console.log(`   ⚠️  No papers found for ${topic}`);
        continue;
      }

      console.log(`   ✓ Found ${searchData.articles.length} papers`);

      // Import papers
      const importUrl = 'https://eccco.vercel.app/api/evidence/import';
      const importResponse = await fetch(importUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          papers: searchData.articles.map(article => ({
            ...article,
            specialty: 'Emergency Medicine',
            category: article.journal?.toLowerCase().includes('trial') 
              ? 'Clinical Trial' 
              : 'Research Article',
          })),
          addedBy: 'seed-script',
        }),
      });

      const importData = await importResponse.json();

      if (importData.success) {
        console.log(`   ✓ Imported ${importData.imported} papers (${importData.duplicates} duplicates skipped)`);
      } else {
        console.log(`   ✗ Import failed: ${importData.error}`);
      }

      // Wait 1 second between requests (rate limiting)
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`   ✗ Error: ${error.message}`);
    }
  }

  console.log('\n✅ Seeding complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Visit https://eccco.vercel.app/admin/evidence');
  console.log('2. Go to "Pending Papers" tab');
  console.log('3. Review and approve papers');
  console.log('4. Visit https://eccco.vercel.app/evidence to see approved papers\n');
}

seedPapers();
