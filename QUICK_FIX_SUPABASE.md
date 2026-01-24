# 🚀 QUICK FIX - Run This SQL in Supabase NOW!

**Problem:** Clinical Notes not saving (500 error)
**Cause:** Supabase database missing columns
**Solution:** Run this SQL in Supabase SQL Editor (takes 2 minutes)

---

## ⚡ QUICK STEPS:

### 1. Open Supabase SQL Editor

```
Go to: https://supabase.com/dashboard
→ Select your ECCCO project
→ Click: "SQL Editor" (left sidebar)
→ Click: "+ New query"
```

### 2. Copy & Paste This SQL:

```sql
-- Add Clinical Notes columns to UserNote table
BEGIN;

ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "searchQuery" TEXT;
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "evidenceSummary" TEXT;
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "specialty" TEXT;
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "patientContext" TEXT;
ALTER TABLE "UserNote" ADD COLUMN IF NOT EXISTS "version" INTEGER NOT NULL DEFAULT 1;

CREATE INDEX IF NOT EXISTS "UserNote_searchQuery_idx" ON "UserNote"("searchQuery") WHERE "searchQuery" IS NOT NULL;
CREATE INDEX IF NOT EXISTS "UserNote_specialty_idx" ON "UserNote"("specialty") WHERE "specialty" IS NOT NULL;

UPDATE "UserNote" SET "version" = 1 WHERE "version" IS NULL;

COMMIT;

-- Verify (should show 5 rows)
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'UserNote'
  AND column_name IN ('searchQuery', 'evidenceSummary', 'specialty', 'patientContext', 'version')
ORDER BY column_name;
```

### 3. Click "Run"

✅ Should see: "Success" or 5 rows showing the columns

### 4. Test Clinical Notes

```
1. Go to: https://eccco.vercel.app
2. Sign in
3. Search for evidence
4. Click: "📝 Take Clinical Notes"
5. Fill form and save
6. Expected: ✅ SUCCESS! No more 500 error!
```

---

## 🎯 That's It!

**Time:** 2 minutes
**Difficulty:** Easy (just copy/paste)
**Result:** Clinical Notes will work! 🎉

---

**Why Supabase?**

- Supabase doesn't auto-run Prisma migrations during Vercel builds
- Must run migrations manually in Supabase dashboard
- This is normal and expected for Supabase + Vercel setup

**This SQL is safe:**

- Uses `IF NOT EXISTS` (won't break if columns already exist)
- Wrapped in transaction (all-or-nothing)
- Creates indexes for better performance
- Idempotent (can run multiple times safely)

---

## 🆘 Need Help?

See full guide: `SUPABASE_MIGRATION_GUIDE.md`

Or use the script:

```bash
export DATABASE_URL="your-supabase-connection-string"
./run-supabase-migration.sh
```

---

**DO THIS NOW** → Then Clinical Notes will work! ✅
