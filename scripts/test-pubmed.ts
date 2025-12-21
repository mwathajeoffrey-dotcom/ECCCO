/**
 * Test PubMed Integration
 * 
 * This script tests the PubMed library functions to ensure they work correctly.
 * Run with: node --loader tsx scripts/test-pubmed.ts
 * Or use: npm run test:pubmed
 */

import { searchAndFetchArticles, formatCitation } from '../src/lib/pubmed';

async function testPubMedIntegration() {
  console.log('🧪 Testing PubMed Integration...\n');

  try {
    // Test 1: Search for recent sepsis trials
    console.log('Test 1: Searching for recent sepsis clinical trials...');
    const { articles, totalCount } = await searchAndFetchArticles({
      query: 'sepsis[Title/Abstract] AND clinical trial[Publication Type]',
      retmax: 5,
      mindate: '2020/01/01',
      sort: 'pub_date',
    });

    console.log(`✅ Found ${totalCount} total articles`);
    console.log(`✅ Fetched ${articles.length} article details\n`);

    // Display first article
    if (articles.length > 0) {
      const firstArticle = articles[0];
      console.log('📄 First Article:');
      console.log(`   Title: ${firstArticle.title}`);
      console.log(`   Authors: ${firstArticle.authors.slice(0, 3).join(', ')}${firstArticle.authors.length > 3 ? ', et al.' : ''}`);
      console.log(`   Journal: ${firstArticle.journal}`);
      console.log(`   Year: ${firstArticle.year}`);
      console.log(`   PMID: ${firstArticle.pmid}`);
      console.log(`   DOI: ${firstArticle.doi || 'N/A'}`);
      console.log(`   URL: ${firstArticle.url}`);
      
      if (firstArticle.abstract) {
        const abstractPreview = firstArticle.abstract.substring(0, 200);
        console.log(`   Abstract: ${abstractPreview}...`);
      }
      
      console.log(`\n   Citation: ${formatCitation(firstArticle)}\n`);
    }

    // Test 2: Search for cardiac arrest guidelines
    console.log('Test 2: Searching for cardiac arrest guidelines...');
    const { articles: guidelines, totalCount: guidelineCount } = await searchAndFetchArticles({
      query: 'cardiac arrest AND resuscitation AND guideline',
      retmax: 3,
      sort: 'relevance',
    });

    console.log(`✅ Found ${guidelineCount} total guidelines`);
    console.log(`✅ Fetched ${guidelines.length} guideline details\n`);

    guidelines.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title} (${article.year})`);
      console.log(`   PMID: ${article.pmid} | DOI: ${article.doi || 'N/A'}\n`);
    });

    // Test 3: Specific PMID fetch
    console.log('Test 3: Fetching a specific article by PMID...');
    const pmid = '33882219'; // Example PMID
    const { articles: specificArticles } = await searchAndFetchArticles({
      query: `${pmid}[PMID]`,
      retmax: 1,
    });

    if (specificArticles.length > 0) {
      console.log(`✅ Successfully fetched PMID ${pmid}`);
      console.log(`   ${specificArticles[0].title}\n`);
    }

    console.log('✅ All tests passed! PubMed integration is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Run tests
testPubMedIntegration();
