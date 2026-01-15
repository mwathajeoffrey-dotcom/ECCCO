# 🔒 Supabase Row Level Security (RLS) Fix

## Date: 2026-01-14

## Issue: 18 Security Errors

**Supabase Security Advisor** detected 18 errors:

- **RLS Disabled in Public** on multiple tables
- Tables are publicly accessible without authentication checks
- Critical security vulnerability

### Affected Tables:

1. LiveQuizSession
2. LiveQuizParticipant
3. ExamAttempt
4. QuizAttempt
5. QuestionAttempt
6. Topic
7. Question
8. EvidenceReference
9. Feedback
10. QuizTemplate
11. QuizSession
12. Participant
13. Answer
14. Bookmark
15. User
16. UserProfile
17. ExamSession
18. QuestionRating

---

## ⚠️ Security Risk

**Without RLS:**

- Anyone can read/write to your database
- User data is exposed
- Malicious users could delete or modify data
- No access control whatsoever

**With RLS:**

- Users can only access their own data
- Public content (questions, topics) is read-only
- Proper authentication required for sensitive operations
- Quiz Arena can still function for anonymous users

---

## ✅ Solution: Apply RLS Policies

I've created a comprehensive SQL migration file: `enable-rls-security.sql`

### What It Does:

#### 1. **Enables RLS on ALL Tables**

```sql
ALTER TABLE "Bookmark" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Question" ENABLE ROW LEVEL SECURITY;
-- ... (18 tables total)
```

#### 2. **Public Read-Only Tables**

Content everyone can view (but not modify):

- ✅ Questions
- ✅ Topics
- ✅ Evidence References

#### 3. **User-Specific Data Protection**

Users can ONLY access their own:

- ✅ Bookmarks
- ✅ User Profile
- ✅ Exam Attempts
- ✅ Question Attempts
- ✅ Quiz Attempts
- ✅ Exam Sessions
- ✅ Question Ratings (can view all, edit own)

#### 4. **Quiz Arena Access**

Special permissions for live quiz functionality:

- ✅ Anyone can view active sessions
- ✅ Anyone can join as participant (anonymous OK)
- ✅ Anyone can submit answers
- ✅ Only host can manage their sessions
- ✅ Users can manage their own templates

#### 5. **Feedback System**

- ✅ Anyone can submit feedback (authenticated or not)
- ✅ Users can view their own submissions

---

## 🚀 How to Apply

### Option 1: Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**

   - Visit: https://supabase.com/dashboard
   - Select your project: `ECCCO-Exam`

2. **Open SQL Editor**

   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Copy & Paste SQL**

   - Open `enable-rls-security.sql`
   - Copy ALL contents
   - Paste into SQL Editor

4. **Run the Migration**

   - Click "Run" button
   - Wait for success message
   - Should see: "Success. No rows returned"

5. **Verify**
   - Go to "Security Advisor" in dashboard
   - Click "Refresh"
   - All 18 errors should be GONE! ✅

### Option 2: Command Line (Alternative)

```bash
# Using psql
psql $DATABASE_URL < enable-rls-security.sql

# Or using Supabase CLI
supabase db push --include-all
```

---

## 📋 Policy Summary

### Read-Only Public Content:

```sql
-- Anyone can read questions
CREATE POLICY "Questions are viewable by everyone"
  ON "Question" FOR SELECT USING (true);
```

### User-Owned Data:

```sql
-- Users can only see their own bookmarks
CREATE POLICY "Users can view their own bookmarks"
  ON "Bookmark" FOR SELECT
  USING (auth.uid()::text = "userId");
```

### Quiz Arena (Mixed):

```sql
-- Anyone can view sessions
CREATE POLICY "Anyone can view active quiz sessions"
  ON "QuizSession" FOR SELECT USING (true);

-- Only host can update
CREATE POLICY "Host can update their own sessions"
  ON "QuizSession" FOR UPDATE
  USING (auth.uid()::text = "hostId");
```

---

## 🔍 How RLS Works

### Before RLS:

```
User A requests data → Database → Returns ALL data (🚨 insecure)
```

### After RLS:

```
User A requests data → Database checks policies → Returns ONLY User A's data ✅
```

### Example:

```sql
-- User tries to access bookmarks
SELECT * FROM "Bookmark";

-- RLS Policy automatically adds:
WHERE userId = auth.uid();

-- User only sees their own bookmarks!
```

---

## 🧪 Testing After Migration

### Test 1: Public Content

```sql
-- Should work (anyone can view)
SELECT * FROM "Question" LIMIT 5;
SELECT * FROM "Topic";
```

### Test 2: User Data (Authenticated)

```sql
-- Should only return YOUR bookmarks
SELECT * FROM "Bookmark";

-- Should only return YOUR profile
SELECT * FROM "UserProfile";
```

### Test 3: User Data (Wrong User)

```sql
-- Try to access another user's bookmarks
SELECT * FROM "Bookmark" WHERE userId = 'other-user-id';

-- Should return EMPTY (RLS blocks it)
```

### Test 4: Quiz Arena

```sql
-- Should work (anonymous can join)
SELECT * FROM "QuizSession" WHERE status = 'LOBBY';
INSERT INTO "Participant" (...) VALUES (...);
```

---

## ⚙️ Maintenance

### Add RLS to New Tables

When you create a new table, ALWAYS add RLS:

```sql
-- 1. Enable RLS
ALTER TABLE "YourNewTable" ENABLE ROW LEVEL SECURITY;

-- 2. Create policies
CREATE POLICY "policy_name"
  ON "YourNewTable"
  FOR SELECT
  USING (your_condition);

-- 3. Grant permissions
GRANT SELECT ON "YourNewTable" TO authenticated;
```

### Check RLS Status

```sql
-- See which tables have RLS enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

---

## 🎯 Expected Results

### Before Migration:

```
Security Advisor: 🔴 18 Errors
- RLS Disabled in Public (18 tables)
```

### After Migration:

```
Security Advisor: ✅ 0 Errors
- All tables protected
- Policies in place
- Data secured
```

---

## 📊 Security Levels by Table

| Table             | Access Level | Policy Type           |
| ----------------- | ------------ | --------------------- |
| Question          | Public Read  | Everyone can SELECT   |
| Topic             | Public Read  | Everyone can SELECT   |
| EvidenceReference | Public Read  | Everyone can SELECT   |
| Bookmark          | User-Owned   | Only own data         |
| UserProfile       | User-Owned   | Only own data         |
| ExamAttempt       | User-Owned   | Only own data         |
| QuestionAttempt   | User-Owned   | Only own data         |
| QuizAttempt       | User-Owned   | Only own data         |
| ExamSession       | User-Owned   | Only own data         |
| QuestionRating    | Mixed        | View all, edit own    |
| Feedback          | Mixed        | Submit all, view own  |
| QuizSession       | Mixed        | View all, host edits  |
| QuizTemplate      | Mixed        | View public, edit own |
| Participant       | Public       | Anyone can join       |
| Answer            | Public       | Anyone can submit     |

---

## 🚨 Important Notes

1. **Backup First**: Although this is non-destructive, always good practice
2. **Test in Dev**: If you have a dev environment, test there first
3. **Monitor Logs**: Check for any access errors after deployment
4. **Update Code**: Ensure your API code respects these policies
5. **Anonymous Access**: Quiz Arena specifically allows anonymous users

---

## 🔧 Troubleshooting

### If queries fail after migration:

**Error:** "new row violates row-level security policy"
**Fix:** Check that your code is passing correct user IDs

**Error:** "permission denied for table"
**Fix:** Run the GRANT statements in the SQL file

**Error:** "infinite recursion detected in policy"
**Fix:** Check for circular policy references

### Rollback (Emergency Only):

```sql
-- Disable RLS (not recommended for production)
ALTER TABLE "TableName" DISABLE ROW LEVEL SECURITY;

-- Or drop specific policy
DROP POLICY "policy_name" ON "TableName";
```

---

## ✅ Checklist

Before applying migration:

- [ ] Backup database (Supabase does this automatically)
- [ ] Read through SQL file
- [ ] Understand which tables get which policies

Apply migration:

- [ ] Open Supabase Dashboard
- [ ] Go to SQL Editor
- [ ] Paste `enable-rls-security.sql` contents
- [ ] Click Run
- [ ] Wait for success

After migration:

- [ ] Check Security Advisor (should show 0 errors)
- [ ] Test public content access (questions, topics)
- [ ] Test user-specific data (bookmarks, profile)
- [ ] Test Quiz Arena functionality
- [ ] Monitor application logs for errors
- [ ] Verify Vercel deployment still works

---

## 📞 Support

If you encounter issues:

1. Check Supabase logs: Dashboard → Logs → Database
2. Check application errors: Vercel → Deployments → Logs
3. Review RLS policies: Dashboard → Authentication → Policies
4. Test with SQL Editor: Dashboard → SQL Editor

---

## Status: READY TO APPLY ✅

File created: `enable-rls-security.sql`
Next step: **Apply in Supabase Dashboard → SQL Editor**

This will fix all 18 security errors! 🔒
