# 🚨 500 ERROR TROUBLESHOOTING - Clinical Notes

**Date:** January 23, 2026
**Error:** 500 Internal Server Error
**Status:** 🔧 DEBUGGING

---

## 🔍 ROOT CAUSE ANALYSIS

**You're getting 500 errors because:**
The database migration (from commit 17b08ff - 2 days ago) **has NOT run yet** on your production database.

**Why?**

1. Migration was committed on Jan 21, 2026
2. Vercel should auto-run migrations on deploy
3. But the columns still don't exist (otherwise no 500 error)
4. Possible causes:
   - Migration failed silently
   - Build cache prevented migration
   - Database permissions issue
   - Migration table out of sync

---

## ✅ IMMEDIATE FIX OPTIONS

### Option 1: Wait for Latest Deployment (Easiest)

**Commit ffb4557 is deploying RIGHT NOW**

1. Wait 3-5 more minutes
2. Check: https://vercel.com/mwathajeoffrey-dotcom/eccco/deployments
3. Look for "Ready" status on ffb4557
4. Once ready, test again
5. If still 500 error → Try Option 2

### Option 2: Force Re-deploy on Vercel (Quick)

**Trigger a fresh deployment**

1. Go to: https://vercel.com/mwathajeoffrey-dotcom/eccco
2. Click: "Deployments" tab
3. Find: Latest deployment (ffb4557 or 17b08ff)
4. Click: "..." menu → "Redeploy"
5. Select: "Use existing build cache" = **UNCHECKED** (important!)
6. Click: "Redeploy"
7. Wait: 5-7 minutes for fresh build
8. Migration should run during build
9. Test again

### Option 3: Run Migration Manually (Direct)

**Connect to production database and run SQL**

1. Get DATABASE_URL from Vercel:

   ```
   → Go to: https://vercel.com/mwathajeoffrey-dotcom/eccco/settings/environment-variables
   → Find: DATABASE_URL
   → Click: "Show" to reveal value
   → Copy: The full postgres://... URL
   ```

2. Run migration using Prisma:

   ```bash
   # In your terminal
   export DATABASE_URL="postgres://your-url-here"
   npx prisma migrate deploy
   ```

3. Or run SQL directly:
   ```bash
   # Use the SQL file I just created
   psql "$DATABASE_URL" < emergency-add-columns.sql
   ```

### Option 4: Add Columns via SQL (Emergency)

**If Prisma migration won't run, use raw SQL**

1. Connect to your production database

   ```bash
   psql "your-database-url"
   ```

2. Run these commands:

   ```sql
   ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "searchQuery" TEXT;
   ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "evidenceSummary" TEXT;
   ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "specialty" TEXT;
   ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "patientContext" TEXT;
   ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "version" INTEGER NOT NULL DEFAULT 1;

   CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx" ON "UserNote"("searchQuery");
   CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx" ON "UserNote"("specialty");
   ```

3. Verify columns exist:

   ```sql
   SELECT column_name FROM information_schema.columns
   WHERE table_name = 'UserNote'
     AND column_name IN ('searchQuery', 'evidenceSummary', 'specialty', 'patientContext', 'version');
   ```

   **Expected:** 5 rows returned

---

## 🔎 HOW TO CHECK IF MIGRATION RAN

### Method 1: Check Vercel Build Logs

```
1. Go to: https://vercel.com/mwathajeoffrey-dotcom/eccco/deployments
2. Click: Latest deployment (ffb4557 or 17b08ff)
3. Click: "Build Logs" tab
4. Search for: "prisma migrate"
5. Look for:
   ✅ "Running migrations..."
   ✅ "Applying migration: 20260121_add_clinical_notes_fields"
   ✅ "Migration applied successfully"

   OR

   ❌ "Migration failed"
   ❌ "Error: relation 'UserNote' ..."
   ❌ No migration logs at all
```

### Method 2: Query Database Directly

```sql
-- Check if columns exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'UserNote'
  AND column_name IN ('searchQuery', 'evidenceSummary', 'specialty', 'patientContext', 'version');

-- If 5 rows → Migration ran ✅
-- If 0 rows → Migration NOT run ❌
```

### Method 3: Check Migration History Table

```sql
-- Check Prisma migration history
SELECT migration_name, started_at, finished_at
FROM "_prisma_migrations"
WHERE migration_name LIKE '%clinical_notes%'
   OR migration_name = '20260121_add_clinical_notes_fields';

-- If row exists → Migration attempted
-- Check finished_at and logs for success/failure
```

---

## 🎯 MOST LIKELY SCENARIO

**Based on your errors:**

1. ✅ User auto-creation now working (commit ffb4557 just deployed)
2. ❌ Database columns still missing (migration from 17b08ff didn't run)
3. ⏳ ffb4557 is currently building/deploying

**What's happening:**

- Your API tries to create a note
- User gets created successfully (new fix)
- But when inserting note with `searchQuery`, `evidenceSummary`, etc.
- Database rejects it: "column 'searchQuery' does not exist"
- Returns 500 error

**The Fix:**
Wait for ffb4557 deployment to complete (should trigger migration), or manually run migration using Option 3 above.

---

## 📊 DEBUGGING CHECKLIST

**Check these in order:**

1. **Is ffb4557 deployed?**

   - [ ] Go to Vercel deployments
   - [ ] Check status: Building / Ready / Error
   - [ ] If Ready: Wait deployed < 5 min ago, wait more
   - [ ] If Error: Check build logs

2. **Did migration run?**

   - [ ] Check Vercel build logs for "prisma migrate"
   - [ ] Look for success/error messages
   - [ ] If no logs: Migration didn't trigger

3. **Do columns exist?**

   - [ ] Connect to database
   - [ ] Run: `\d "UserNote"` (if using psql)
   - [ ] Look for: searchQuery, evidenceSummary, specialty, patientContext, version
   - [ ] If missing: Run manual migration

4. **Test in production:**
   - [ ] Go to https://eccco.vercel.app
   - [ ] Sign in
   - [ ] Search for evidence
   - [ ] Try to save note
   - [ ] Check browser console
   - [ ] If 500: Migration still not run

---

## 🚦 STATUS TIMELINE

**January 21, 2026 (2 days ago):**

- ✅ Created migration file (17b08ff)
- ✅ Committed to GitHub
- ✅ Pushed to main
- ⏳ Vercel should have deployed...
- ❌ But migration apparently didn't run (you're getting 500 errors)

**January 23, 2026 (Today):**

- ✅ Fixed user auto-creation (commit ffb4557)
- ✅ Pushed to GitHub
- ⏳ Vercel currently deploying
- ⏳ Migration should run during this deployment
- 🎯 Test again in 5 minutes

---

## 💡 WHY MIGRATIONS SOMETIMES DON'T RUN

**Common Reasons:**

1. **Build Cache:**

   - Vercel uses cached build if code unchanged
   - Might skip migration thinking it already ran
   - Fix: Force redeploy without cache

2. **Migration Already "Applied":**

   - `_prisma_migrations` table has entry
   - Prisma thinks migration ran already
   - But columns weren't actually created
   - Fix: Delete migration entry, redeploy

3. **Database Permissions:**

   - DB user lacks ALTER TABLE permission
   - Migration fails silently
   - Fix: Check database user permissions

4. **Connection Issues:**
   - DATABASE_URL incorrect/expired
   - Can't connect during build
   - Fix: Verify DATABASE_URL in Vercel settings

---

## 🔧 NUCLEAR OPTION (If all else fails)

**Complete Reset:**

1. **Delete migration entry from database:**

   ```sql
   DELETE FROM "_prisma_migrations"
   WHERE migration_name = '20260121_add_clinical_notes_fields';
   ```

2. **Add columns manually:**

   ```bash
   psql "$DATABASE_URL" < emergency-add-columns.sql
   ```

3. **Mark migration as applied:**

   ```sql
   INSERT INTO "_prisma_migrations" (
     id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count
   ) VALUES (
     gen_random_uuid(),
     'checksum-value',
     NOW(),
     '20260121_add_clinical_notes_fields',
     '',
     NULL,
     NOW(),
     1
   );
   ```

4. **Test:**
   - Try saving a note
   - Should work now ✅

---

## 📞 SUPPORT COMMANDS

**Check database connection:**

```bash
# Test if you can connect
psql "$DATABASE_URL" -c "SELECT current_database(), current_user;"
```

**List all UserNote columns:**

```bash
psql "$DATABASE_URL" -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'UserNote' ORDER BY column_name;"
```

**Check migration history:**

```bash
psql "$DATABASE_URL" -c "SELECT migration_name, finished_at FROM \"_prisma_migrations\" ORDER BY started_at DESC LIMIT 10;"
```

**Manually run migration:**

```bash
export DATABASE_URL="your-url"
npx prisma migrate deploy --schema=./prisma/schema.prisma
```

---

## 🎯 RECOMMENDED ACTION NOW

**Since ffb4557 just deployed:**

1. **Wait 3-5 minutes** for deployment to complete
2. **Check Vercel dashboard** for "Ready" status
3. **Test Clinical Notes** again
4. **If still 500 error:**
   - Check Vercel build logs for migration
   - If no migration logs → Run manually (Option 3)
   - If migration failed → Check error, fix, redeploy

**Most Efficient Path:**

1. Wait for current deployment (ffb4557)
2. If doesn't work → Force redeploy without cache
3. If still doesn't work → Manual SQL migration (Option 4)

---

## ✅ VERIFICATION

**After applying fix, verify:**

```bash
# 1. Check columns exist
psql "$DATABASE_URL" -c "\\d \"UserNote\""

# 2. Try inserting test note
psql "$DATABASE_URL" -c "
  INSERT INTO \"UserNote\" (id, \"userId\", content, \"searchQuery\", \"specialty\", \"createdAt\", \"updatedAt\")
  VALUES (
    'test_' || extract(epoch from now()),
    'test_user_id',
    'Test note content',
    'test search query',
    'Cardiology',
    NOW(),
    NOW()
  );
"

# 3. If no error → Columns exist! ✅
# 4. If error → Columns still missing ❌
```

---

**Status:** 🟡 WAITING FOR DEPLOYMENT
**Next Check:** 5 minutes
**Expected:** Migration runs, 500 errors disappear
**If not:** Manual migration required
