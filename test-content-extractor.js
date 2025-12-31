/**
 * Test file for content extractor
 * Run this to verify the OpenEvidence-style extraction works
 */

import { 
  generateAISummary, 
  extractKeyFindings, 
  extractRelevantParagraphs,
  enhanceArticleWithContent 
} from '../src/lib/evidence/content-extractor';

// Test abstract
const testAbstract = `
Background: Sodium bicarbonate therapy has been proposed for treating metabolic acidosis in sepsis.
Methods: We conducted a randomized controlled trial with 389 patients with severe metabolic acidosis.
Results: We found that sodium bicarbonate infusion did not improve survival compared to placebo (28% vs 30%, p=0.52).
Conclusion: Our study demonstrates that sodium bicarbonate therapy in sepsis is not routinely recommended for the correction of lactic acidosis.
`;

const testArticle = {
  title: 'Sodium Bicarbonate Therapy in Septic Shock',
  abstract: testAbstract,
  authors: ['Smith J', 'Jones K'],
  journal: 'Critical Care Medicine',
  citationCount: 150
};

console.log('🧪 Testing Content Extractor...\n');

console.log('1️⃣ AI Summary:');
const summary = generateAISummary(testAbstract, testArticle.title, 'sepsis bicarbonate');
console.log(summary);
console.log('');

console.log('2️⃣ Key Findings:');
const findings = extractKeyFindings(testAbstract);
findings.forEach((f, i) => console.log(`   ${i + 1}. ${f}`));
console.log('');

console.log('3️⃣ Relevant Paragraphs:');
const paragraphs = extractRelevantParagraphs(testAbstract, 'sepsis bicarbonate');
paragraphs.forEach((p, i) => {
  console.log(`   ${i + 1}. [${p.context}] ${p.text.substring(0, 80)}...`);
  console.log(`      Relevance: ${Math.round((p.relevanceScore || 0) * 100)}%`);
});
console.log('');

console.log('4️⃣ Full Enhancement:');
const enhanced = enhanceArticleWithContent(testArticle, 'sepsis bicarbonate');
console.log('   ✅ AI Summary:', enhanced.aiSummary);
console.log('   ✅ Key Findings:', enhanced.keyFindings.length);
console.log('   ✅ Relevant Paragraphs:', enhanced.relevantParagraphs.length);
console.log('');

console.log('✅ All tests completed!');
