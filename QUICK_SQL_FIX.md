# 🚀 QUICK FIX: Copy-Paste These SQL Queries into Supabase

## 1️⃣ Check Problem (Copy & Run)

```sql
SELECT
  COUNT(*) as total_questions,
  COUNT(CASE WHEN options IS NULL THEN 1 END) as null_options,
  COUNT(CASE WHEN options = '' THEN 1 END) as empty_options,
  COUNT(CASE WHEN options = '[]' THEN 1 END) as empty_array
FROM "Question";
```

---

## 2️⃣ Fix Problem (Copy & Run)

```sql
UPDATE "Question"
SET
  options = '["Option A", "Option B", "Option C", "Option D"]',
  correctIndex = 0,
  "updatedAt" = NOW()
WHERE options IS NULL
   OR options = ''
   OR options = '[]';
```

---

## 3️⃣ Verify Fix (Copy & Run)

```sql
SELECT
  id,
  LEFT(question, 60) as question_preview,
  options,
  correctIndex
FROM "Question"
LIMIT 10;
```

---

## ✅ Done!

After running these 3 queries:

1. Wait 2 minutes for Vercel deployment
2. Clear browser cache (`Cmd+Shift+Delete`)
3. Hard refresh app (`Cmd+Shift+R`)
4. Test exam - should work!

---

## 📍 Where to Run These

1. Go to: https://supabase.com/dashboard
2. Select your ECCCO project
3. Click "SQL Editor" in sidebar
4. Click "+ New query"
5. Paste each query above
6. Click "Run" (or press `Ctrl+Enter`)

---

## 🎯 What Each Query Does

**Query 1:** Shows how many questions are broken
**Query 2:** Fixes all broken questions with placeholder options
**Query 3:** Confirms all questions now have options

---

## ⚠️ Important Note

Query 2 adds **generic placeholder options**. They work to stop crashes, but later you should add real medical answers using:

```sql
UPDATE "Question"
SET
  options = '["Real answer A", "Real answer B", "Real answer C", "Real answer D"]',
  correctIndex = 0,  -- Change to 0, 1, 2, or 3 (which is correct)
  explanation = 'Why this answer is correct...',
  "updatedAt" = NOW()
WHERE id = 'specific-question-id';
```

---

See **SUPABASE_FIX_GUIDE.md** for detailed step-by-step instructions!
