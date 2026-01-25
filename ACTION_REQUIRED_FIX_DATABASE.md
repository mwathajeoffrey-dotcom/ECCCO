# ✅ ACTION REQUIRED: Fix Broken Questions in Database

## What You Found

You're 100% correct - the issue is questions **referencing missing answer options**!

The questions exist in the database, but the `options` field (the actual A/B/C/D answer choices) is **NULL or empty**.

---

## Quick Fix (Do This Now in Supabase)

### Step 1: Check How Many Questions Are Broken

1. Go to **Supabase Dashboard**
2. Click **SQL Editor**
3. Run this query:

```sql
SELECT COUNT(*) as broken_questions
FROM "Question"
WHERE options IS NULL OR options = '' OR options = '[]';
```

### Step 2: See Which Questions Are Broken

```sql
SELECT
  id,
  LEFT(question, 80) as question_text,
  "topicId",
  difficulty
FROM "Question"
WHERE options IS NULL OR options = '' OR options = '[]'
ORDER BY "createdAt" DESC
LIMIT 20;
```

### Step 3: Quick Temporary Fix

**This adds placeholder options so the app works:**

```sql
UPDATE "Question"
SET
  options = '["Option A", "Option B", "Option C", "Option D"]',
  correctIndex = 0,
  "updatedAt" = NOW()
WHERE options IS NULL OR options = '' OR options = '[]';
```

⚠️ **Note:** This creates fake options! You'll need to add real answers later.

### Step 4: Verify It Worked

```sql
SELECT
  id,
  question,
  options,
  correctIndex
FROM "Question"
LIMIT 5;
```

Should now show questions with options like:

```json
["Option A", "Option B", "Option C", "Option D"]
```

---

## Proper Fix (Do This After App Works)

For each broken question, add real answer choices:

```sql
UPDATE "Question"
SET
  options = '["Correct answer here", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"]',
  correctIndex = 0,  -- Index of correct answer (0=A, 1=B, 2=C, 3=D)
  explanation = 'Explanation of why the correct answer is right',
  references = '["Reference 1", "Reference 2"]',
  "updatedAt" = NOW()
WHERE id = 'the-question-id-here';
```

Example for a real PALS question:

```sql
UPDATE "Question"
SET
  options = '["0.01 mg/kg IV/IO", "0.1 mg/kg IV/IO", "1 mg/kg IV/IO", "0.01 mg/kg ET"]',
  correctIndex = 0,
  explanation = 'The initial dose of epinephrine in pediatric cardiac arrest is 0.01 mg/kg (1:10,000 solution) administered IV or IO.',
  references = '["2020 AHA PALS Guidelines", "PALS Provider Manual 2020"]',
  "updatedAt" = NOW()
WHERE question LIKE '%initial dose of epinephrine%';
```

---

## Code Fixes Already Deployed

I've added three layers of protection:

### ✅ Layer 1: API Protection

`/src/app/api/questions/route.ts` now:

- Checks if `options` exists before parsing
- Returns `[]` instead of `null` if missing
- Logs warnings so you can see which questions are broken

### ✅ Layer 2: Frontend Exam Interface

Checks for options before rendering:

```typescript
{currentQuestion && currentQuestion.options ? (
  // Show options
) : (
  <div>No options available</div>
)}
```

### ✅ Layer 3: Frontend Results Screen

Uses safe defaults:

```typescript
const options = question.options ? JSON.parse(question.options) : [];
```

---

## Timeline to Fix

### Right Now (5 minutes):

1. ✅ Run Step 1 SQL query to see how many questions broken
2. ✅ Run Step 3 SQL to add placeholder options
3. ✅ Wait 2 minutes for Vercel deployment
4. ✅ Test app - should work now!

### This Weekend (1-2 hours):

1. ⏳ Export list of questions with placeholder options
2. ⏳ Research correct answers for each question
3. ⏳ Update questions with proper options using Step 4 SQL
4. ⏳ Verify all questions have real answers

---

## Why It's Crashing

```
Database Question:
{
  id: "pals-123",
  question: "What is the dose?",
  options: NULL,  ← THIS IS THE PROBLEM!
  correctIndex: 0
}

↓ API tries to parse ↓

parsedOptions = undefined

↓ Frontend tries to render ↓

undefined.map(...)  ← CRASH! Cannot read 'map' of undefined
```

---

## What Success Looks Like

After fixing, questions should look like:

```json
{
  "id": "pals-123",
  "question": "What is the initial dose of epinephrine in pediatric cardiac arrest?",
  "options": [
    "0.01 mg/kg IV/IO",
    "0.1 mg/kg IV/IO",
    "1 mg/kg IV/IO",
    "0.01 mg/kg ET"
  ],
  "correctIndex": 0,
  "explanation": "The initial dose is 0.01 mg/kg...",
  "references": ["2020 AHA PALS Guidelines"],
  "difficulty": "medium",
  "topicId": "pals"
}
```

Then:

- ✅ App loads without crashes
- ✅ Exams show all 4 answer choices
- ✅ Results screen shows correct/incorrect
- ✅ Explanations display properly

---

## Current Status

**Code Fixes:**

- ✅ API protection: Deployed (commit f85d112)
- ✅ Frontend protection: Deployed (commit d71438b)
- ⏳ Vercel building now (2-3 minutes)

**Database Fixes:**

- ⚠️ **YOU NEED TO RUN THE SQL QUERIES**
- ⚠️ Questions still have NULL/empty options
- ⚠️ App will crash until database is fixed

---

## Do This NOW

1. Open Supabase SQL Editor
2. Copy-paste the Step 3 SQL query
3. Click "Run"
4. Wait for "Success" message
5. Wait 2 minutes for Vercel deployment
6. Refresh your browser (Cmd+Shift+R)
7. Try the exam again

**The app should work after these steps!** 🎉

Then you can properly fix the questions later with real answer choices.
