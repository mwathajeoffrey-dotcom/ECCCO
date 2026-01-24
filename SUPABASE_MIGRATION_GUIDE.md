# 🔧 SUPABASE DATABASE MIGRATION GUIDE

**Date:** January 24, 2026  
**Issue:** Clinical Notes not saving - Supabase database missing columns  
**Status:** 🎯 MANUAL MIGRATION REQUIRED  

---

## 🔍 THE REAL PROBLEM

**Supabase databases require manual migration!**

Unlike some hosting platforms, **Supabase does NOT automatically run Prisma migrations** when you deploy to Vercel. The build command runs migrations against the DATABASE_URL, but:

1. ✅ Vercel runs `prisma migrate deploy` (after our fix)
2. ❌ But Supabase connection might timeout during build
3. ❌ Or migration requires interactive confirmation
4. ❌ Or Supabase RLS policies block the migration
5. ❌ Result: **Columns never added to database**

---

## ✅ SOLUTION: Run Migration Directly on Supabase

You have **3 options** to fix this:

---

## 🎯 OPTION 1: Use Supabase SQL Editor (EASIEST)

### Step 1: Go to Supabase Dashboard
```
1. Open: https://supabase.com/dashboard
2. Select: Your ECCCO project
3. Click: SQL Editor (in left sidebar)
4. Click: "+ New query"
```

### Step 2: Copy and Run This SQL
```sql
-- Clinical Notes Migration
BEGIN;

-- Add searchQuery column
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "searchQuery" TEXT;

-- Add evidenceSummary column
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "evidenceSummary" TEXT;

-- Add specialty column
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "specialty" TEXT;

-- Add patientContext column
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "patientContext" TEXT;

-- Add version column
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "version" INTEGER NOT NULL DEFAULT 1;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx" 
    ON "UserNote"("searchQuery") 
    WHERE "searchQuery" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx" 
    ON "UserNote"("specialty") 
    WHERE "specialty" IS NOT NULL;

-- Update existing records
UPDATE "UserNote" SET "version" = 1 WHERE "version" IS NULL;

COMMIT;

-- Verify columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'UserNote' 
  AND column_name IN ('searchQuery', 'evidenceSummary', 'specialty', 'patientContext', 'version')
ORDER BY column_name;
```

### Step 3: Click "Run"
- ✅ Should see: "Success. No rows returned" (or 5 rows showing columns)
- ✅ Columns are now added!

### Step 4: Test Clinical Notes
```
1. Go to: https://eccco.vercel.app
2. Sign in
3. Search for evidence
4. Click: "📝 Take Clinical Notes"
5. Fill form and save
6. Expected: ✅ SUCCESS! No 500 error!
```

---

## 🎯 OPTION 2: Use Terminal with psql

### Step 1: Get Your Supabase Connection String
```
1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT
2. Click: Settings → Database
3. Scroll to: Connection String → URI
4. Copy: The postgres:// connection string
5. Replace: [YOUR-PASSWORD] with your actual database password
```

**Example:**
```
postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
```

### Step 2: Set Environment Variable
```bash
export DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

### Step 3: Run the Script
```bash
./run-supabase-migration.sh
```

**Or use Prisma directly:**
```bash
npx prisma migrate deploy
```

### Step 4: Verify
```bash
psql "$DATABASE_URL" -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'UserNote' AND column_name IN ('searchQuery', 'evidenceSummary', 'specialty', 'patientContext', 'version');"
```

**Expected output:** 5 rows

---

## 🎯 OPTION 3: Use Supabase CLI

### Step 1: Install Supabase CLI
```bash
npm install -g supabase
```

### Step 2: Link to Your Project
```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### Step 3: Apply Migration
```bash
supabase db push
```

---

## 🔍 WHY VERCEL BUILD DIDN'T WORK

**Even with `prisma migrate deploy` in build command:**

### Issue 1: Connection Timeout
```
Build → Run prisma migrate deploy
       → Connect to Supabase...
       → Timeout after 30 seconds ❌
       → Build continues without migration
       → App deploys without database changes
```

### Issue 2: Row Level Security (RLS)
```
Build → Run prisma migrate deploy
       → Connect to Supabase
       → Try: ALTER TABLE "UserNote"
       → RLS Policy: "Access denied" ❌
       → Migration fails
       → Build continues, app deploys broken
```

### Issue 3: Transaction Isolation
```
Build → Multiple builds running simultaneously
       → Both try to run same migration
       → One succeeds, one fails
       → Unclear which completed successfully
```

**Solution:** Run migration directly on Supabase (guaranteed to work)

---

## 📊 VERIFICATION STEPS

### Check 1: Verify Columns Exist
```sql
-- Run in Supabase SQL Editor
SELECT 
    table_name,
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'UserNote'
ORDER BY ordinal_position;
```

**Look for:**
- ✅ searchQuery | text | YES
- ✅ evidenceSummary | text | YES
- ✅ specialty | text | YES
- ✅ patientContext | text | YES
- ✅ version | integer | NO

### Check 2: Test Insert
```sql
-- Run in Supabase SQL Editor
INSERT INTO "UserNote" (
    id, 
    "userId", 
    content, 
    "searchQuery", 
    "evidenceSummary",
    specialty,
    "patientContext",
    version,
    "createdAt",
    "updatedAt"
) VALUES (
    'test_' || extract(epoch from now()),
    'test_user_id',
    'Test note content',
    'STEMI management',
    'AI-generated summary of evidence',
    'Cardiology',
    'Adult patient with chest pain',
    1,
    NOW(),
    NOW()
);

-- If successful → Columns exist! ✅
-- If error → Columns still missing ❌
```

### Check 3: Verify Indexes
```sql
-- Run in Supabase SQL Editor
SELECT 
    indexname, 
    indexdef
FROM pg_indexes 
WHERE tablename = 'UserNote' 
  AND indexname LIKE '%searchQuery%' 
   OR indexname LIKE '%specialty%';
```

**Expected:** 2 indexes

---

## 🚨 TROUBLESHOOTING

### Error: "column 'searchQuery' does not exist"
**Cause:** Migration hasn't run yet  
**Fix:** Run Option 1 (SQL Editor) above

### Error: "permission denied for table UserNote"
**Cause:** Supabase RLS blocking ALTER TABLE  
**Fix:**
```sql
-- Temporarily disable RLS
ALTER TABLE "UserNote" DISABLE ROW LEVEL SECURITY;

-- Run migration SQL (from Option 1)

-- Re-enable RLS
ALTER TABLE "UserNote" ENABLE ROW LEVEL SECURITY;
```

### Error: "relation 'UserNote' does not exist"
**Cause:** Table name case sensitivity  
**Fix:** Check actual table name:
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

### Error: "database connection failed"
**Cause:** Wrong DATABASE_URL or network issue  
**Fix:**
1. Verify connection string from Supabase dashboard
2. Check password is correct (no special chars issues)
3. Try connecting with psql first to test

---

## 🎓 SUPABASE-SPECIFIC CONSIDERATIONS

### 1. Row Level Security (RLS)
```sql
-- Check if RLS is blocking migrations
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'UserNote';

-- If rowsecurity = true, temporarily disable:
ALTER TABLE "UserNote" DISABLE ROW LEVEL SECURITY;
-- Run migration
ALTER TABLE "UserNote" ENABLE ROW LEVEL SECURITY;
```

### 2. Connection Pooling
```
Supabase uses connection pooling (PgBouncer)
- Use transaction mode for migrations
- Or connect directly to database (port 5432)
- Not through pooler (port 6543)
```

### 3. Backups
```
Supabase auto-backs up daily
- Safe to run migrations
- Can restore if something goes wrong
- Check: Database → Backups in dashboard
```

---

## 📋 COMPLETE MIGRATION CHECKLIST

**Before Migration:**
- [ ] Backed up database (Supabase auto-backup exists)
- [ ] Have Supabase dashboard access
- [ ] Know project password/connection string
- [ ] Verified UserNote table exists

**Run Migration:**
- [ ] Option 1: SQL Editor (recommended)
- [ ] OR Option 2: Terminal psql
- [ ] OR Option 3: Supabase CLI

**After Migration:**
- [ ] Verified 5 columns exist (run verification SQL)
- [ ] Tested insert with new columns (run test SQL)
- [ ] Checked indexes created
- [ ] Tested in production (save a note)

**Success Criteria:**
- [ ] No 500 errors when saving notes ✅
- [ ] Notes save successfully ✅
- [ ] Notes appear in Clinical Notes tab ✅
- [ ] All CRUD operations work ✅

---

## 🎯 RECOMMENDED APPROACH

**EASIEST & FASTEST (5 minutes):**

1. **Open Supabase SQL Editor**
   - https://supabase.com/dashboard → Your Project → SQL Editor

2. **Paste the migration SQL** (from Option 1 above)

3. **Click "Run"**

4. **Verify** - Should see 5 rows with column details

5. **Test** - Go to https://eccco.vercel.app and save a note

6. **Success!** ✅

---

## 📊 EXPECTED RESULTS

### Before Migration:
```
Save Note → API Call → Database Insert
                    ↓
            Error: column "searchQuery" does not exist
                    ↓
            500 Internal Server Error ❌
```

### After Migration:
```
Save Note → API Call → Database Insert
                    ↓
            INSERT INTO UserNote (searchQuery, specialty, ...)
                    ↓
            Success! Note saved ✅
                    ↓
            Return 201 Created
                    ↓
            "Clinical note saved" message 🎉
```

---

## 🔧 QUICK COMMANDS

### Check if columns exist:
```bash
psql "$DATABASE_URL" -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'UserNote' AND column_name IN ('searchQuery', 'evidenceSummary', 'specialty', 'patientContext', 'version');"
```

### Run migration:
```bash
psql "$DATABASE_URL" -f prisma/migrations/20260121_add_clinical_notes_fields/migration.sql
```

### Test connection:
```bash
psql "$DATABASE_URL" -c "SELECT current_database(), current_user, version();"
```

---

## 📞 STILL NOT WORKING?

**If migration runs but still getting errors:**

1. **Check Vercel environment variables:**
   - Go to: Vercel → Settings → Environment Variables
   - Verify: DATABASE_URL matches Supabase connection string
   - Redeploy: After verifying URL is correct

2. **Check Supabase project:**
   - Verify: Correct project (not staging/dev)
   - Check: Database region matches expectations
   - Confirm: Connection pooling settings

3. **Check app code:**
   - Verify: Prisma schema includes new fields
   - Check: API routes use correct field names
   - Confirm: Frontend sends correct data

---

## 🎉 FINAL STEPS

**After successful migration:**

1. ✅ Commit the migration fix (already done - 175385d)
2. ✅ Run migration on Supabase (do this now)
3. ✅ Test in production
4. ✅ Verify all CRUD operations
5. ✅ Monitor for errors
6. ✅ Celebrate! Clinical Notes working! 🎊

---

**Status:** 🟡 AWAITING MANUAL MIGRATION  
**Action Required:** Run SQL in Supabase SQL Editor  
**Time Required:** 5 minutes  
**Difficulty:** Easy (just copy/paste SQL)  

**DO THIS NOW:**
1. Open: https://supabase.com/dashboard
2. SQL Editor → New Query
3. Paste migration SQL (from Option 1)
4. Click: Run
5. Test: Save a clinical note
6. Success! ✅

**THIS WILL FIX IT! 🚀**
