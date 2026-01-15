# 🔒 RLS SECURITY - APPLY NOW (CRITICAL)

## ⚠️ URGENT: Apply This Today

Your database currently has **18 security vulnerabilities** because Row Level Security (RLS) is disabled. This means:

- ❌ Anyone can read ALL user data
- ❌ Anyone can modify quiz sessions
- ❌ Anyone can see all bookmarks
- ❌ Anyone can delete questions
- ❌ Serious HIPAA/privacy risk

**Time to fix: 5 minutes**

---

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your ECCCO project

### Step 2: Open SQL Editor

1. In the left sidebar, click **"SQL Editor"**
2. Click **"New Query"** button (top right)

### Step 3: Copy the SQL Migration

1. Open the file: `enable-rls-security.sql` in your project root
2. Select ALL the contents (Cmd+A / Ctrl+A)
3. Copy (Cmd+C / Ctrl+C)

### Step 4: Paste and Run

1. Paste the SQL into the Supabase SQL Editor
2. Click **"Run"** button (or Cmd+Enter)
3. Wait for completion (should take 2-3 seconds)

### Step 5: Verify Success ✅

1. In Supabase dashboard, go to **Database → Security Advisor**
2. Confirm you see: **"0 critical issues"** 🎉
3. Previously showed **"18 RLS Disabled in Public"** - now should be ZERO

---

## 🔍 What This SQL Does

The migration enables Row Level Security on 18 tables and creates policies that:

### Public Read-Only Tables (No Auth Required)

✅ **Question** - Anyone can browse questions
✅ **Topic** - Anyone can see topics
✅ **EvidenceReference** - Anyone can read evidence

### User-Owned Tables (Auth Required)

🔐 **Bookmarks** - Users see only THEIR bookmarks
🔐 **User** - Users see only THEIR profile
🔐 **Attempt** - Users see only THEIR attempts
🔐 **QuestionSession** - Users see only THEIR sessions
🔐 **Note** - Users see only THEIR notes
🔐 **StudyProgress** - Users see only THEIR progress

### Quiz Arena Tables (Mixed Access)

🎮 **QuizSession** - Public read, host can modify
🎮 **Participant** - See participants in YOUR sessions
🎮 **Answer** - See answers in YOUR sessions
🎮 **Leaderboard** - Public read

### Feedback Tables

💬 **Feedback** - Anyone can submit, users see their own
💬 **QuestionFeedback** - Anyone can submit feedback

### Admin Tables

👑 **AdminLog** - Admins only
👑 **EvidenceReference** (write) - Admins can edit

---

## 🧪 Test After Applying

### Test 1: Anonymous User (Not Signed In)

```bash
# Should work:
- Browse questions ✅
- View topics ✅
- Join quiz with access code ✅

# Should fail:
- View bookmarks ❌
- Create quiz session ❌
- Delete questions ❌
```

### Test 2: Signed-In User

```bash
# Should work:
- All anonymous features ✅
- View OWN bookmarks ✅
- Create quiz sessions ✅
- Submit answers ✅

# Should fail:
- View OTHER users' bookmarks ❌
- Delete OTHER users' sessions ❌
- Modify questions directly ❌
```

### Test 3: Admin User

```bash
# Should work:
- All user features ✅
- View all feedback ✅
- Edit evidence references ✅
- View admin logs ✅
```

---

## 🚨 If You See Errors

### Error: "permission denied for table"

**Solution:** The policy isn't applied yet. Re-run the SQL.

### Error: "column does not exist"

**Solution:** Your schema might be different. Check table names match.

### Error: "already exists"

**Solution:** RLS already enabled. You can skip or drop existing policies first:

```sql
-- Run this first if you get "already exists" errors
ALTER TABLE "Question" DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON "Question";
-- Then run the main SQL
```

---

## 📊 Before vs After

### BEFORE (Current - INSECURE ❌)

```sql
-- Anyone can do this:
SELECT * FROM "User";  -- See ALL users
SELECT * FROM "Bookmark";  -- See ALL bookmarks
DELETE FROM "QuizSession";  -- Delete ANY quiz
```

### AFTER (Secure ✅)

```sql
-- Anonymous users:
SELECT * FROM "Question";  -- ✅ Works
SELECT * FROM "Bookmark";  -- ❌ Returns empty (needs auth)

-- Signed-in users:
SELECT * FROM "Bookmark" WHERE "userId" = auth.uid();  -- ✅ Own bookmarks only
DELETE FROM "QuizSession" WHERE "ownerId" = auth.uid();  -- ✅ Own sessions only
```

---

## ✅ Completion Checklist

- [ ] Opened Supabase Dashboard
- [ ] Navigated to SQL Editor
- [ ] Copied contents of `enable-rls-security.sql`
- [ ] Pasted into SQL Editor
- [ ] Clicked "Run"
- [ ] Verified Security Advisor shows 0 errors
- [ ] Tested: Can still browse questions (anonymous)
- [ ] Tested: Can still sign in and view own bookmarks
- [ ] Tested: Can create quiz sessions (signed in)
- [ ] Confirmed no unexpected errors in production

---

## 🎯 Next Steps After Applying

Once RLS is enabled, you can:

1. **Monitor Security**

   - Regularly check Security Advisor
   - Review RLS policies quarterly
   - Update as new tables are added

2. **Enhanced Security**

   - Add rate limiting (covered in roadmap)
   - Implement content security policy
   - Add input sanitization

3. **Compliance**
   - Document security measures
   - Create privacy policy
   - Implement data retention rules

---

## 💡 Pro Tips

1. **Backup First** (Optional but Recommended)

   - Go to Database → Backups
   - Create a snapshot before applying

2. **Test in Development**

   - If you have a dev database, test there first
   - Verify queries still work as expected

3. **Monitor After Deploy**
   - Watch for any 403 errors in logs
   - Check user reports for access issues
   - Review Sentry errors (if configured)

---

## 🆘 Need Help?

If you encounter issues after applying RLS:

1. **Check browser console** for 403 errors
2. **Review Supabase logs** in dashboard
3. **Temporarily disable RLS** on problematic table:
   ```sql
   ALTER TABLE "TableName" DISABLE ROW LEVEL SECURITY;
   ```
4. **Re-enable after debugging**:
   ```sql
   ALTER TABLE "TableName" ENABLE ROW LEVEL SECURITY;
   ```

---

## 🎉 Success!

Once applied, your ECCCO platform will be:

- ✅ **Secure** - Users can only access their own data
- ✅ **Compliant** - Meets privacy standards
- ✅ **Safe** - No unauthorized data access
- ✅ **Production-ready** - Industry-standard security

**This is the single most important security fix you can make today!** 🔒

---

**Last Updated:** January 14, 2026
**Priority:** CRITICAL 🚨
**Time Required:** 5 minutes
**Difficulty:** Easy (copy-paste)
