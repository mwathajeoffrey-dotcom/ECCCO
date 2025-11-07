# Algorithm-Based Question Generation Report

## Overview
- **Generation Date**: 2025-11-06T22:44:27.662Z
- **Total Questions Generated**: 48
- **Source Algorithms**: 7
- **Generator Version**: ECCCO Algorithm Question Generator v1.0

## Question Statistics

### By Difficulty Level
- **medium**: 21 questions
- **easy**: 22 questions
- **hard**: 5 questions

### By Category
- **cardiac**: 28 questions
- **respiratory**: 13 questions
- **neurological**: 7 questions

### By Algorithm
- **stemi**: 8 questions
- **pulmonary**: 7 questions
- **shock**: 6 questions
- **severe**: 6 questions
- **acute**: 7 questions
- **status**: 7 questions
- **hypertensive**: 7 questions

## Question Types Generated

### 1. Scenario-Based Questions
Clinical scenarios testing application of algorithms in realistic patient presentations.

### 2. Sequence Questions
Testing knowledge of correct algorithm steps and critical action sequences.

### 3. Medication Questions
Dosing, contraindications, monitoring parameters, and pediatric considerations.

### 4. Timing Questions
Critical timeframes and time-sensitive interventions.

### 5. Recognition Questions
Diagnostic criteria and indications for algorithm implementation.

### 6. Complications Questions
Contraindications, monitoring for adverse effects, and complication management.

## Quality Assurance

### Evidence-Based Content
- All questions derived from current clinical guidelines
- References to authoritative organizations (AHA, ACC, ACEP, etc.)
- Version-controlled guideline references

### Educational Value
- Progressive difficulty levels (easy → medium → hard)
- Comprehensive explanations with clinical pearls
- Real-world applicability

### Technical Implementation
- Consistent question format
- Proper topicId mapping
- Guideline version tracking
- Duplicate prevention IDs

## Files Generated

- `stemi-algorithm-questions.ts` (8 questions)
- `pulmonary-algorithm-questions.ts` (7 questions)
- `shock-algorithm-questions.ts` (6 questions)
- `severe-algorithm-questions.ts` (6 questions)
- `acute-algorithm-questions.ts` (7 questions)
- `status-algorithm-questions.ts` (7 questions)
- `hypertensive-algorithm-questions.ts` (7 questions)
- `algorithm-questions-generated.ts` (Combined file with all 48 questions)

## Integration Instructions

### 1. Review Questions
Review generated questions for medical accuracy and appropriateness.

### 2. Import into Main System
```typescript
// Add to src/lib/questions/index.ts
import { algorithmGeneratedQuestions } from './algorithm-questions-generated';

export const allQuestions = [
  ...existingQuestions,
  ...algorithmGeneratedQuestions
];
```

### 3. Update API Routes
```typescript
// Add to src/app/api/questions/route.ts
import { algorithmGeneratedQuestions } from '@/lib/questions/algorithm-questions-generated';

const questionsByTopic = {
  // existing mappings...
  'algorithm-generated': algorithmGeneratedQuestions
};
```

### 4. Test Implementation
- Verify questions display correctly in exam interface
- Test answer validation
- Check explanation rendering
- Validate topic routing

## Algorithm Sources

### STEMI Management Protocol
- **Organization**: AHA/ACC
- **Category**: cardiac
- **Version**: 2024 Guidelines
- **Last Updated**: 2024
- **Questions Generated**: 0

### Pulmonary Embolism Protocol
- **Organization**: ESC/ATS
- **Category**: respiratory
- **Version**: 2024 Guidelines
- **Last Updated**: 2024
- **Questions Generated**: 0

### Undifferentiated Shock Protocol
- **Organization**: SCCM
- **Category**: cardiac
- **Version**: 2024 Guidelines
- **Last Updated**: 2024
- **Questions Generated**: 0

### Severe Asthma Exacerbation Protocol
- **Organization**: GINA
- **Category**: respiratory
- **Version**: 2024 GINA Guidelines
- **Last Updated**: 2024
- **Questions Generated**: 0

### Acute Heart Failure Management
- **Organization**: AHA/ACC
- **Category**: cardiac
- **Version**: 2024 Guidelines
- **Last Updated**: 2024
- **Questions Generated**: 0

### Status Epilepticus Protocol
- **Organization**: AES
- **Category**: neurological
- **Version**: 2024 Guidelines
- **Last Updated**: 2024
- **Questions Generated**: 0

### Hypertensive Emergency Protocol
- **Organization**: AHA/ACC
- **Category**: cardiac
- **Version**: 2024 Guidelines
- **Last Updated**: 2024
- **Questions Generated**: 0

## Maintenance

This report and questions were auto-generated. To update:

1. Modify algorithms in `extended-algorithm-database.ts`
2. Adjust generation parameters in `algorithm-question-generator.ts`
3. Re-run: `npx tsx scripts/generate-algorithm-questions.ts`
4. Review and integrate new questions

## Quality Metrics

- **Medical Accuracy**: ✅ Based on current guidelines
- **Educational Value**: ✅ Progressive difficulty with explanations
- **Technical Quality**: ✅ Consistent formatting and structure
- **Completeness**: ✅ Covers major emergency medicine algorithms
- **Duplicate Prevention**: ✅ Unique IDs and content verification needed

---
Generated by ECCCO Algorithm Question Generator
