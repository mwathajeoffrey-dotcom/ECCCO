# 🔍 SUPABASE DATABASE DIAGNOSTIC & FIX

**Error:** `relation "UserNote" does not exist`  
**Cause:** Table hasn't been created OR using wrong schema  
**Solution:** Run full database setup  

---

## ⚡ QUICK FIX - Copy/Paste into Supabase SQL Editor

### Step 1: Check What Tables Exist

```sql
-- See all tables in your database
SELECT 
    schemaname,
    tablename 
FROM pg_tables 
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY schemaname, tablename;
```

**This will show you all your tables. Look for:**
- `UserNote` or `user_note` or `usernote`
- Other tables like `User`, `QuizAttempt`, etc.

---

### Step 2A: If UserNote Table EXISTS (Different Case)

**If you see the table with different casing:**

```sql
-- Check current UserNote structure
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public'
  AND table_name IN ('UserNote', 'user_note', 'usernote')
ORDER BY ordinal_position;
```

**Then add missing columns:**

```sql
BEGIN;

-- Try all possible table name variations
DO $$
DECLARE
    table_exists boolean;
    actual_table_name text;
BEGIN
    -- Find the actual table name
    SELECT tablename INTO actual_table_name
    FROM pg_tables 
    WHERE schemaname = 'public' 
      AND lower(tablename) = 'usernote'
    LIMIT 1;
    
    IF actual_table_name IS NOT NULL THEN
        RAISE NOTICE 'Found table: %', actual_table_name;
        
        -- Add columns using dynamic SQL
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "searchQuery" TEXT', actual_table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "evidenceSummary" TEXT', actual_table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "specialty" TEXT', actual_table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "patientContext" TEXT', actual_table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "version" INTEGER NOT NULL DEFAULT 1', actual_table_name);
        
        RAISE NOTICE 'Columns added successfully';
    ELSE
        RAISE NOTICE 'Table not found - need to create it';
    END IF;
END $$;

COMMIT;
```

---

### Step 2B: If UserNote Table DOESN'T EXIST

**Run the FULL Prisma migration to create all tables:**

```sql
-- This will create the entire database schema
-- Run this in Supabase SQL Editor

BEGIN;

-- Create User table if not exists
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "clerkUserId" TEXT UNIQUE NOT NULL,
  "email" TEXT UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create UserNote table
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
  CONSTRAINT "UserNote_userId_fkey" FOREIGN KEY ("userId") 
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "UserNote_userId_idx" ON "UserNote"("userId");
CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx" ON "UserNote"("searchQuery") WHERE "searchQuery" IS NOT NULL;
CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx" ON "UserNote"("specialty") WHERE "specialty" IS NOT NULL;
CREATE INDEX IF NOT EXISTS "User_clerkUserId_idx" ON "User"("clerkUserId");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");

COMMIT;

-- Verify creation
SELECT 'UserNote table created!' as status;
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'UserNote' 
ORDER BY ordinal_position;
```

---

## 🔍 DEPLOYMENT FAILED - Check This

### Issue: Vercel Build Failed

**Go to Vercel Deployment Logs:**
```
https://vercel.com/mwathajeoffrey-dotcom/eccco/deployments
→ Click latest deployment
→ Check "Build Logs"
→ Look for error messages
```

**Common Errors:**

#### 1. Database Connection Failed
```
Error: P1001: Can't reach database server at `db.xxx.supabase.co`
```
**Fix:**
- Check DATABASE_URL in Vercel environment variables
- Ensure Supabase project is running (not paused)
- Verify connection string format

#### 2. Migration Failed (Table Not Exists)
```
Error: P3009: migrate found failed migrations
```
**Fix:**
- Run the SQL in Step 2B above to create tables
- Then redeploy on Vercel

#### 3. Timeout During Migration
```
Error: Migration engine timed out
```
**Fix:**
- Database too slow or connection pool exhausted
- Run migration manually (this guide)
- Remove `prisma migrate deploy` from build temporarily

---

## 🎯 RECOMMENDED FIX SEQUENCE

### 1. Diagnose Database State
```sql
-- Run in Supabase SQL Editor
SELECT 
    'Checking database state...' as status;

-- Check if User table exists
SELECT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'User'
) as user_table_exists;

-- Check if UserNote table exists
SELECT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'UserNote'
) as usernote_table_exists;

-- List all tables
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

### 2. Create Missing Tables
**If `UserNote` doesn't exist, run Step 2B above**

### 3. Verify Schema
```sql
-- Check UserNote structure
\d "UserNote"

-- Or use this:
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'UserNote'
ORDER BY ordinal_position;
```

### 4. Test Insert
```sql
-- Try inserting a test note
INSERT INTO "UserNote" (
    "id",
    "userId",
    "content",
    "searchQuery",
    "specialty",
    "version",
    "createdAt",
    "updatedAt"
) VALUES (
    'test_' || extract(epoch from now())::text,
    'test_user',
    'Test content',
    'Test search',
    'Cardiology',
    1,
    NOW(),
    NOW()
);

-- If successful, delete test data
DELETE FROM "UserNote" WHERE "userId" = 'test_user';
```

---

## 🚨 NUCLEAR OPTION - Reset Everything

**If tables are completely messed up:**

```sql
-- WARNING: This will DELETE ALL DATA!
-- Only use if you're sure you want to start fresh

BEGIN;

-- Drop tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS "UserNote" CASCADE;
DROP TABLE IF EXISTS "UserProfile" CASCADE;
DROP TABLE IF EXISTS "Bookmark" CASCADE;
DROP TABLE IF EXISTS "QuestionRating" CASCADE;
DROP TABLE IF EXISTS "QuestionAttempt" CASCADE;
DROP TABLE IF EXISTS "QuizAttempt" CASCADE;
DROP TABLE IF EXISTS "ExamAttempt" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

COMMIT;
```

**Then run full schema from Step 2B**

---

## 📋 CHECKLIST

**After running fixes:**
- [ ] UserNote table exists (check with query)
- [ ] Table has all required columns
- [ ] Can insert test data
- [ ] Foreign key to User table works
- [ ] Indexes created successfully

**Then in Vercel:**
- [ ] Redeploy (should succeed now)
- [ ] Check build logs (no migration errors)
- [ ] Test in production

**Then in app:**
- [ ] Sign in works
- [ ] Can save clinical notes
- [ ] Notes appear in Clinical Notes tab
- [ ] No 500 errors

---

## 🔧 TEMPORARY WORKAROUND

**If you need to deploy urgently while fixing database:**

### Remove migration from build (temporarily)

**In `vercel.json`:**
```json
{
  "buildCommand": "npx prisma generate && npm run build"
}
```

**Then:**
1. Redeploy (will succeed without migration)
2. Fix database manually (this guide)  
3. Restore migration to build command
4. Redeploy again

---

## 📞 NEXT STEPS

1. **Run Step 1** (diagnostic) to see what tables exist
2. **Based on result:**
   - Tables exist but wrong case → Step 2A
   - UserNote missing → Step 2B (create all tables)
3. **Verify** with test insert
4. **Redeploy** on Vercel
5. **Test** in production

---

**Start with Step 1 diagnostic SQL** - that will tell us exactly what's in your database!
