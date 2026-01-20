# ECCCO Batch System Documentation

## Overview
The ECCCO platform uses a batch system for organizing medical questions into manageable groups of 30 questions each. This prevents deployment issues and provides better user experience.

## Current Implementation

### Batch 1 (Implemented)
- **Adult Oncologic Emergencies - Batch 1**: 30 questions (IDs: aoe-001 to aoe-030)
- **Pediatric Oncologic Emergencies - Batch 1**: 30 questions (IDs: poe-001 to poe-030)

## Adding New Batches

### Step 1: Create Question File
Create a new file following the naming convention:
```
src/lib/questions/[specialty]-[type]-batch-[number].ts
```

Example for Batch 2:
```typescript
// src/lib/questions/adult-oncology-batch-2.ts
import { Question } from '../types';

export const adultOncologyBatch2Questions: Question[] = [
  {
    id: 'aoe-031', // Continue numbering from previous batch
    question: 'Your question text here...',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctIndex: 0,
    difficulty: 'medium', // 'easy', 'medium', 'hard'
    explanation: 'Detailed explanation with medical reasoning...',
    category: 'Adult Oncologic Emergencies',
    references: ['Medical reference citation...']
  },
  // ... 29 more questions (total 30)
];

export default adultOncologyBatch2Questions;
```

### Step 2: Update Index File
Add imports and exports to `src/lib/questions/index.ts`:

```typescript
// Add import
import { adultOncologyBatch2Questions } from './adult-oncology-batch-2';

// Add to allQuestions array
export const allQuestions: Question[] = [
  // ... existing questions
  ...adultOncologyBatch2Questions,
];

// Add to exports
export {
  // ... existing exports
  adultOncologyBatch2Questions,
};

// Add to questionsByCategory
export const questionsByCategory = {
  // ... existing categories
  'Adult Oncologic Emergencies - Batch 2': adultOncologyBatch2Questions,
};
```

### Step 3: Update API Routes

#### Questions API (`src/app/api/questions/route.ts`)
```typescript
// Add import
import adultOncologyBatch2Questions from '@/lib/questions/adult-oncology-batch-2';

// Add to questionsByTopic object
const questionsByTopic: { [key: string]: Question[] } = {
  // ... existing topics
  'adult-oncology-batch-2': adultOncologyBatch2Questions,
};
```

#### Topics API (`src/app/api/topics/route.ts`)
```typescript
const topics = [
  // ... existing topics
  { value: 'adult-oncology-batch-2', label: 'Adult Oncologic Emergencies - Batch 2' },
];
```

### Step 4: Question ID Guidelines
- **Adult Oncology**: aoe-001, aoe-002, ... (continue numbering across batches)
- **Pediatric Oncology**: poe-001, poe-002, ... (continue numbering across batches)
- **New Specialties**: Use 3-letter abbreviation + sequential numbering

Examples:
- Cardiology Emergency: ce-001, ce-002, ...
- Respiratory Emergency: re-001, re-002, ...
- Neurological Emergency: ne-001, ne-002, ...

## Quality Standards

### Question Format
- **Question Text**: Clear, clinical scenario-based
- **Options**: 4 options (A, B, C, D)
- **Explanation**: Detailed with medical reasoning
- **References**: Current medical literature citations
- **Difficulty**: Appropriate level (easy/medium/hard)

### Medical Standards
- Evidence-based content
- Current guidelines compliance
- Peer-reviewed references
- Clinical relevance

## Deployment Checklist

Before adding new batches:
1. [ ] Questions follow naming convention
2. [ ] All 30 questions have unique IDs
3. [ ] Medical content is accurate
4. [ ] References are current
5. [ ] API routes updated
6. [ ] Build test passes (`npm run build`)
7. [ ] Local testing completed
8. [ ] Commit with descriptive message

## Future Expansion Examples

### Cardiology Batch System
```
- adult-cardiology-batch-1
- adult-cardiology-batch-2
- pediatric-cardiology-batch-1
```

### Respiratory Batch System  
```
- adult-respiratory-batch-1
- adult-respiratory-batch-2
- pediatric-respiratory-batch-1
```

This system allows for unlimited expansion while maintaining performance and avoiding deployment issues.