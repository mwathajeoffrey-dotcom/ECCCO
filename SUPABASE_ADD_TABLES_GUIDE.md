# 🗄️ Supabase Tables Setup Guide - Clinical Notes

**Goal:** Add the `User` and `UserNote` tables to your Supabase database so Clinical Notes can save data.

**Time Required:** 5-10 minutes

---

## 📋 Quick Overview

You need to run SQL commands in Supabase to create 2 tables:

1. **`User`** table - Stores user information
2. **`UserNote`** table - Stores clinical notes

---

## 🚀 Step-by-Step Instructions

### **Step 1: Open Supabase Dashboard**

1. Go to: **https://supabase.com/dashboard**
2. Sign in if needed
3. Click on your **ECCCO** project
4. You should see your project dashboard

> 💡 **What you'll see:** Project name at top, menu on left side

---

### **Step 2: Navigate to SQL Editor**

1. Look at the **left sidebar**
2. Find and click **"SQL Editor"** (looks like `</>` icon)
3. Click the **"+ New query"** button (top right)
4. You'll see a blank SQL editor

> 💡 **What you'll see:**
>
> - Top: "New query" tab
> - Middle: Large text area for SQL
> - Bottom right: Green "Run" button

---

### **Step 3: Check What Tables Already Exist** ✅

Before creating tables, let's see what's already there:

1. **Copy this SQL** (from `diagnostic-step1.sql`):

```sql
-- Check what tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

2. **Paste** into the SQL editor
3. Click **"Run"** (or press `Cmd + Enter`)
4. Look at the results below

**What to look for:**

- ✅ If you see `User` table → Good! Skip to Step 5
- ✅ If you see `UserNote` table → Good! Skip to Step 5
- ❌ If you DON'T see either → Continue to Step 4

---

### **Step 4: Create the Tables** 🛠️

Now let's create the tables we need.

#### **Option A: Create Both Tables (Most Common)**

If you saw **NO tables** or neither `User` nor `UserNote` in Step 3:

1. **Clear the SQL editor** (select all and delete)
2. **Copy the ENTIRE contents** of the file: `create-tables-step2.sql`
3. **Paste** into the SQL editor
4. Click **"Run"**
5. Wait 2-3 seconds

**Expected Result:**

```
Success. No rows returned
```

or

```
CREATE TABLE
CREATE TABLE
CREATE INDEX
CREATE INDEX
```

> ✅ **Success!** Both tables are now created.

---

#### **Option B: Add Missing Columns to Existing UserNote**

If you saw `UserNote` table in Step 3, but it's missing new columns:

1. **Copy this SQL**:

```sql
-- Add new clinical notes columns
ALTER TABLE "UserNote"
  ADD COLUMN IF NOT EXISTS "searchQuery" TEXT,
  ADD COLUMN IF NOT EXISTS "evidenceSummary" TEXT,
  ADD COLUMN IF NOT EXISTS "specialty" TEXT,
  ADD COLUMN IF NOT EXISTS "patientContext" TEXT,
  ADD COLUMN IF NOT EXISTS "version" INTEGER DEFAULT 1;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx"
  ON "UserNote"("searchQuery");

CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx"
  ON "UserNote"("specialty");
```

2. **Paste** into SQL editor
3. Click **"Run"**

**Expected Result:**

```
ALTER TABLE
CREATE INDEX
CREATE INDEX
```

---

### **Step 5: Verify the Tables Were Created** ✅

Let's confirm everything is set up correctly:

1. **Clear the SQL editor**
2. **Copy and paste this verification query**:

```sql
-- Check UserNote table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'UserNote'
ORDER BY ordinal_position;
```

3. Click **"Run"**
4. **Check the results** - you should see **14 rows** with these columns:

| column_name     | data_type    | is_nullable |
| --------------- | ------------ | ----------- |
| id              | text         | NO          |
| userId          | text         | NO          |
| title           | text         | YES         |
| content         | text         | NO          |
| questionId      | text         | YES         |
| questionText    | text         | YES         |
| category        | text         | YES         |
| searchQuery     | text         | YES         |
| evidenceSummary | text         | YES         |
| specialty       | text         | YES         |
| patientContext  | text         | YES         |
| tags            | ARRAY        | YES         |
| version         | integer      | NO          |
| createdAt       | timestamp... | NO          |
| updatedAt       | timestamp... | NO          |

> ✅ **If you see all 14 columns:** Perfect! Database is ready!
> ❌ **If you see fewer columns:** Some are missing, go back to Step 4B

---

### **Step 6: Optional - View the Tables in Table Editor**

Want to see your tables visually?

1. Click **"Table Editor"** in left sidebar
2. You should see:
   - `User` table
   - `UserNote` table
3. Click on `UserNote` to see its structure
4. You'll see all the columns we just created

> 💡 **This is where your clinical notes will appear** after users save them!

---

## 🎉 Success Checklist

Mark off each item as you complete it:

- [ ] Opened Supabase dashboard
- [ ] Navigated to SQL Editor
- [ ] Ran diagnostic query (checked existing tables)
- [ ] Created User and UserNote tables
- [ ] Verified 14 columns in UserNote table
- [ ] (Optional) Viewed tables in Table Editor

**When all checked:** Your database is ready! 🚀

---

## 🧪 Test It Works

Now test that Clinical Notes can save data:

1. Go to: **https://eccco.vercel.app**
2. Sign in (top right)
3. Click **"Evidence Search"**
4. Search for: `"STEMI management 2024"`
5. Wait for results (~20-30 seconds)
6. Look for **"📝 Take Clinical Notes"** button
7. Click it - modal should open
8. Fill in the form:
   - **Content:** "Test note - checking database works"
   - **Tags:** "test"
   - **Specialty:** "Emergency Medicine"
9. Click **"Save Note"**

**Expected Results:**

- ✅ See: "Clinical note saved successfully!" message
- ✅ Modal closes automatically
- ✅ NO error in browser console (press F12 to check)

**Then verify it saved:**

1. Click **"Clinical Notes"** in Resources menu
2. You should see your test note in the list!
3. Click to expand it - all fields should be visible

> 🎉 **If you see the note:** Everything works perfectly!

---

## 📊 Visual Guide to Supabase Interface

### **Where to Find SQL Editor:**

```
┌─────────────────────────────────────────┐
│  ECCCO Project                     [•]  │  ← Top bar
├─────────────┬───────────────────────────┤
│ 🏠 Home     │                           │
│ 📊 Table    │                           │
│    Editor   │    ← Click "SQL Editor"   │
│ 📝 SQL      │       in this left        │
│    Editor   │       sidebar             │
│ 🔐 Auth     │                           │
│ 📦 Storage  │                           │
│ ⚙️ Settings │                           │
└─────────────┴───────────────────────────┘
```

### **SQL Editor Layout:**

```
┌─────────────────────────────────────────┐
│  + New query  [Saved queries ▼]        │  ← Buttons
├─────────────────────────────────────────┤
│                                         │
│  [Paste your SQL here]                  │  ← Editor area
│                                         │
│                                         │
├─────────────────────────────────────────┤
│                          [Run] [Cancel] │  ← Action buttons
├─────────────────────────────────────────┤
│  Results:                               │
│  ┌─────────────────────────────────┐   │
│  │ [Query results show here]       │   │  ← Results panel
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## ❓ Troubleshooting

### **Problem: "Run" button is greyed out**

**Solution:** Make sure you've pasted SQL into the editor area

### **Problem: "permission denied for table"**

**Solution:**

1. You might not be the project owner
2. Go to Settings → Database → Connection string
3. Make sure you're using the correct project

### **Problem: "relation UserNote already exists"**

**Solution:**

- Table already exists! This is good
- Skip to Step 5 to verify columns
- Or use Option B to add missing columns

### **Problem: Can't find SQL Editor**

**Solution:**

- Look for `</>` icon in left sidebar
- Might be labeled "SQL" or "SQL Editor"
- Try scrolling down the sidebar

### **Problem: Query returns 0 rows in Step 5**

**Solution:**

- Tables weren't created
- Go back to Step 4
- Make sure you clicked "Run" after pasting SQL
- Check for error messages in the Results panel

---

## 📚 Files You Need

All SQL files are in your project root:

1. **`diagnostic-step1.sql`** - Check what tables exist
2. **`create-tables-step2.sql`** - Create both User and UserNote tables
3. **`STEP_BY_STEP_GUIDE.md`** - Comprehensive guide
4. **`VISUAL_FLOW_GUIDE.md`** - Flowchart overview
5. **`SUPABASE_ADD_TABLES_GUIDE.md`** - This file (Supabase-specific)

---

## 🎯 Quick Reference

### **Full SQL to Create Tables** (Copy/Paste Ready)

<details>
<summary>Click to expand complete SQL</summary>

```sql
-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "clerkUserId" TEXT UNIQUE NOT NULL,
  "email" TEXT UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create UserNote table with all clinical notes fields
CREATE TABLE IF NOT EXISTS "UserNote" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "title" TEXT,
  "content" TEXT NOT NULL,
  "questionId" TEXT,
  "questionText" TEXT,
  "category" TEXT,
  "searchQuery" TEXT,
  "evidenceSummary" TEXT,
  "specialty" TEXT,
  "patientContext" TEXT,
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "version" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UserNote_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "UserNote_userId_idx" ON "UserNote"("userId");
CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx" ON "UserNote"("searchQuery");
CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx" ON "UserNote"("specialty");
CREATE INDEX IF NOT EXISTS "UserNote_createdAt_idx" ON "UserNote"("createdAt");
```

</details>

---

## ⏱️ Timeline

| Step      | Time         | What You're Doing          |
| --------- | ------------ | -------------------------- |
| 1-2       | 30 sec       | Open Supabase & SQL Editor |
| 3         | 30 sec       | Check existing tables      |
| 4         | 1-2 min      | Run table creation SQL     |
| 5         | 30 sec       | Verify columns exist       |
| 6         | 1 min        | Test in production         |
| **Total** | **5-10 min** | **Complete setup**         |

---

## 🆘 Need Help?

If you get stuck:

1. **Check the error message** in Supabase Results panel
2. **Look at Troubleshooting section** above
3. **Verify** you copied the entire SQL (no truncation)
4. **Try again** - SQL with `IF NOT EXISTS` is safe to run multiple times
5. **Check** you're in the correct Supabase project

---

## ✅ What Success Looks Like

After completing this guide:

✅ **In Supabase:**

- User table exists with 5 columns
- UserNote table exists with 14 columns
- Indexes created for performance
- Can view tables in Table Editor

✅ **In Production (eccco.vercel.app):**

- Can search for evidence
- "Take Clinical Notes" button appears
- Can save notes (no errors)
- Notes appear in Clinical Notes page
- Can edit/delete notes

✅ **No More Errors:**

- ❌ NO "relation UserNote does not exist"
- ❌ NO "500 Internal Server Error"
- ❌ NO "Failed to save note"
- ✅ YES "Clinical note saved successfully!"

---

## 🚀 You're Done!

Once you see your test note in the Clinical Notes page, everything is working perfectly!

**Clinical Notes is now live and ready for real use!** 🎉

Users can:

- Save notes during evidence searches
- Organize by specialty and tags
- Link notes to specific questions
- Search and filter their notes
- Edit and delete as needed

**Great job!** 🌟
