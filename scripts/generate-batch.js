#!/usr/bin/env node

/**
 * ECCCO Batch Generator Script
 * 
 * Usage: node scripts/generate-batch.js [specialty] [type] [batch-number]
 * Example: node scripts/generate-batch.js adult cardiology 2
 * 
 * This script generates:
 * 1. Question file template
 * 2. API integration instructions
 * 3. Testing checklist
 */

const fs = require('fs');
const path = require('path');

function generateBatch(specialty, type, batchNumber) {
  const fileName = `${specialty}-${type}-batch-${batchNumber}`;
  const filePath = path.join(__dirname, '..', 'src', 'lib', 'questions', `${fileName}.ts`);
  
  // Generate ID prefix (first letter of specialty + first letter of type)
  const idPrefix = `${specialty.charAt(0)}${type.charAt(0)}e`.toLowerCase();
  
  // Calculate starting ID number (assuming 30 questions per batch)
  const startId = ((batchNumber - 1) * 30) + 1;
  
  const template = `// ${specialty.charAt(0).toUpperCase() + specialty.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)} Emergencies - Batch ${batchNumber} (30 Questions)
// Generated on ${new Date().toISOString().split('T')[0]}
import { Question } from '../types';

export const ${specialty}${type.charAt(0).toUpperCase() + type.slice(1)}Batch${batchNumber}Questions: Question[] = [
  // Question 1: [Condition/Emergency Type]
  {
    id: '${idPrefix}-${String(startId).padStart(3, '0')}',
    question: 'A [age]-year-old [patient description] presents with [chief complaint]. [Clinical details]. What is the most appropriate [management/treatment/intervention]?',
    options: [
      '[Option A - usually incorrect]',
      '[Option B - correct answer]',
      '[Option C - usually incorrect]',
      '[Option D - usually incorrect]'
    ],
    correctIndex: 1,
    difficulty: 'medium', // 'easy', 'medium', 'hard'
    explanation: '[Detailed explanation of why option B is correct, including pathophysiology, treatment rationale, and clinical reasoning]',
    category: '${specialty.charAt(0).toUpperCase() + specialty.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)} Emergencies',
    references: ['[Author et al. Title. Journal. Year;Volume(Issue):Pages.]']
  },

  // Question 2: [Condition/Emergency Type]
  {
    id: '${idPrefix}-${String(startId + 1).padStart(3, '0')}',
    question: '[Question template - modify as needed]',
    options: [
      '[Option A]',
      '[Option B]', 
      '[Option C]',
      '[Option D]'
    ],
    correctIndex: 0,
    difficulty: 'medium',
    explanation: '[Explanation]',
    category: '${specialty.charAt(0).toUpperCase() + specialty.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)} Emergencies',
    references: ['[Reference]']
  },

  // TODO: Add remaining 28 questions (${idPrefix}-${String(startId + 2).padStart(3, '0')} to ${idPrefix}-${String(startId + 29).padStart(3, '0')})
  // Follow the same pattern for all 30 questions
];

export default ${specialty}${type.charAt(0).toUpperCase() + type.slice(1)}Batch${batchNumber}Questions;`;

  // Write the template file
  fs.writeFileSync(filePath, template);

  // Generate integration instructions
  const instructions = `
# Integration Instructions for ${fileName}

## 1. Complete the Question File
- Edit: src/lib/questions/${fileName}.ts
- Add all 30 questions (currently has 2 templates)
- Ensure medical accuracy and proper citations

## 2. Update Index File
Add to src/lib/questions/index.ts:

\`\`\`typescript
// Add import
import { ${specialty}${type.charAt(0).toUpperCase() + type.slice(1)}Batch${batchNumber}Questions } from './${fileName}';

// Add to allQuestions array
export const allQuestions: Question[] = [
  // ... existing questions
  ...${specialty}${type.charAt(0).toUpperCase() + type.slice(1)}Batch${batchNumber}Questions,
];

// Add to exports
export {
  // ... existing exports
  ${specialty}${type.charAt(0).toUpperCase() + type.slice(1)}Batch${batchNumber}Questions,
};

// Add to questionsByCategory
export const questionsByCategory = {
  // ... existing categories
  '${specialty.charAt(0).toUpperCase() + specialty.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)} Emergencies - Batch ${batchNumber}': ${specialty}${type.charAt(0).toUpperCase() + type.slice(1)}Batch${batchNumber}Questions,
};
\`\`\`

## 3. Update Questions API
Add to src/app/api/questions/route.ts:

\`\`\`typescript
// Add import
import ${specialty}${type.charAt(0).toUpperCase() + type.slice(1)}Batch${batchNumber}Questions from '@/lib/questions/${fileName}';

// Add to questionsByTopic object
const questionsByTopic: { [key: string]: Question[] } = {
  // ... existing topics
  '${fileName}': ${specialty}${type.charAt(0).toUpperCase() + type.slice(1)}Batch${batchNumber}Questions,
};
\`\`\`

## 4. Update Topics API
Add to src/app/api/topics/route.ts:

\`\`\`typescript
const topics = [
  // ... existing topics
  { value: '${fileName}', label: '${specialty.charAt(0).toUpperCase() + specialty.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)} Emergencies - Batch ${batchNumber}' },
];
\`\`\`

## 5. Testing Checklist
- [ ] Complete all 30 questions
- [ ] Verify medical accuracy
- [ ] Check all references
- [ ] Run: npm run build
- [ ] Test locally: npm run dev
- [ ] Test API: curl "http://localhost:3000/api/questions?topicId=${fileName}&limit=5"
- [ ] Test frontend: http://localhost:3000/exam?topic=${fileName}
- [ ] Commit and push changes

## 6. Deployment
- [ ] Commit with message: "Add ${specialty} ${type} batch ${batchNumber} with 30 questions"
- [ ] Push to trigger Vercel deployment
- [ ] Verify on production
`;

  const instructionsPath = path.join(__dirname, '..', 'docs', `${fileName}-integration.md`);
  fs.writeFileSync(instructionsPath, instructions);

  console.log(`✅ Generated batch template: ${fileName}`);
  console.log(`📝 Question file: src/lib/questions/${fileName}.ts`);
  console.log(`📋 Instructions: docs/${fileName}-integration.md`);
  console.log(`\n🚀 Next steps:`);
  console.log(`1. Complete the 30 questions in the template file`);
  console.log(`2. Follow the integration instructions`);
  console.log(`3. Test thoroughly before deployment`);
}

// Parse command line arguments
const [,, specialty, type, batchNumber] = process.argv;

if (!specialty || !type || !batchNumber) {
  console.log('Usage: node scripts/generate-batch.js [specialty] [type] [batch-number]');
  console.log('Example: node scripts/generate-batch.js adult cardiology 2');
  console.log('Example: node scripts/generate-batch.js pediatric respiratory 1');
  process.exit(1);
}

generateBatch(specialty, type, parseInt(batchNumber));