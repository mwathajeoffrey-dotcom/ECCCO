# Question Display Issue - Investigation Report

## Issue Reported
**User**: "we have lost some questions we can only see the answers"

## Investigation Status: IN PROGRESS 🔍

### Files Checked ✅
1. **ExamInterface.tsx** - Question display code looks correct:
   ```tsx
   <h2 className="... font-semibold text-gray-900 ...">
     {currentQuestion?.question}
   </h2>
   ```

2. **Questions API** (`/api/questions/route.ts`) - Returns full question objects with `question` field

3. **Question Source Files** (e.g., `acls.ts`) - Questions have proper text:
   ```typescript
   {
     id: 'acls-001',
     question: 'A patient is found in cardiac arrest with ventricular fibrillation...',
     options: [...],
     correctIndex: 1,
     explanation: '...'
   }
   ```

4. **CSS Files** - No rules hiding question text

### Possible Causes

#### 1. Data Issue (LIKELY)
- Questions might be missing the `question` field in database
- API might be returning incomplete data
- Randomization might be breaking question structure

#### 2. Display Issue (POSSIBLE)
- CSS might be making text invisible (white on white)
- Font size might be 0
- Text might be positioned off-screen

#### 3. Component State Issue (POSSIBLE)
- `currentQuestion` might be undefined
- `currentQuestion.question` might be empty string
- Wrong index being used

### Need More Information 📋

**Please provide:**
1. **Which page?** `/exam`, `/practice`, `/test-answers`, or other?
2. **What do you see exactly?**
   - Option buttons A, B, C, D visible?
   - Question text completely missing?
   - Or question text is there but blank/empty?
3. **On what device?** Desktop, mobile, tablet?
4. **Which browser?** Chrome, Safari, Firefox?
5. **Can you see:**
   - The question number (e.g., "Question 1 of 30")?
   - The patient presentation/clinical scenario?
   - Any text at all where the question should be?

### Quick Tests to Run

#### Test 1: Check API Response
Open browser console and run:
```javascript
fetch('/api/questions?limit=2')
  .then(r => r.json())
  .then(data => console.log(data.questions[0]))
```

Expected output should include:
```javascript
{
  id: "acls-001",
  question: "A patient is found in cardiac arrest...", // ← This should be visible
  options: ["option1", "option2", ...],
  correctIndex: 1,
  ...
}
```

#### Test 2: Check Element in DevTools
1. Open exam page
2. Open DevTools (F12)
3. Find the `<h2>` element with class `font-semibold`
4. Check if:
   - Element exists?
   - Has content inside?
   - CSS is hiding it?

#### Test 3: Check Console for Errors
1. Open exam page
2. Open Console (F12)
3. Look for:
   - Red errors
   - "undefined" or "null" warnings
   - API errors

### Potential Fixes (Once We Know the Cause)

#### If Data Issue:
```typescript
// Add fallback in ExamInterface.tsx
<h2>
  {currentQuestion?.question || 'Question text not available'}
</h2>
```

#### If API Issue:
```typescript
// Add validation in API route
if (!question.question || question.question.trim() === '') {
  console.error('Missing question text for:', question.id);
}
```

#### If Display Issue:
```tsx
// Force visibility
<h2 className="... !text-gray-900 !opacity-100 !block">
  {currentQuestion?.question}
</h2>
```

### Next Steps 🎯

1. **User provides more details** about what they see
2. **Test on deployed site**: https://eccco.vercel.app/exam
3. **Check browser console** for errors
4. **Inspect element** to see if question text exists in HTML
5. **Apply appropriate fix** based on findings

---

**Status**: ⏳ AWAITING USER INFORMATION  
**Priority**: 🔴 HIGH (affects core functionality)  
**Impact**: Users cannot take exams properly

---

## Temporary Workaround

If this is urgent, users can:
1. Try the `/test-answers` page which has enhanced visibility
2. Use different browser
3. Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
4. Clear browser cache

---

**Created**: Dec 31, 2025  
**Last Updated**: Dec 31, 2025
