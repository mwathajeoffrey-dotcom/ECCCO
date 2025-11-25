# CRITICAL: Production Errors - Complete Analysis

**Date**: November 25, 2025  
**Status**: 🔴 CRITICAL - Multiple API failures  
**URL**: https://eccco.vercel.app  
**Root Cause**: Database migration not applied to production

---

## 🚨 Current Errors

### Error 1: `/api/topics` - 500 Internal Server Error
```
GET https://eccco.vercel.app/api/topics 500 (Internal Server Error)
```

**Impact**: Dashboard fails to load, showing "TypeError: e.map is not a function"

**Why**: Frontend code expects an array from `/api/topics`, but API returns error object `{ error: "..." }` instead. When frontend tries to do `topics.map(...)`, it crashes because an object doesn't have `.map()`.

---

### Error 2: `/api/auth/signup` - 500 Internal Server Error
```
Internal server error (when creating new account)
```

**Impact**: Users cannot create new accounts

**Why**: Database schema missing `role` and `sessionId` fields on User model

---

### Error 3: Frontend Crash
```javascript
TypeError: e.map is not a function
    at c (6d6e8b8b22a86478.js:1:11721)
```

**Impact**: White screen / app crash

**Why**: Cascading failure from API errors above

---

## 🎯 Root Cause

**Your production database schema is out of date!**

### What Happened:
1. You created migration `20251125090844_add_live_quiz_models` locally
2. You ran `npx prisma migrate deploy` **on your local SQLite database** ✅
3. Your **production PostgreSQL database** (via Prisma Accelerate) never got the migration ❌
4. All API endpoints querying the database are failing ❌

### Schema Mismatch:
```
Local (SQLite)     ✅ Has: User.role, User.sessionId, LiveQuizSession, etc.
Production (Postgres) ❌ Missing: User.role, User.sessionId, LiveQuizSession, etc.
```

---

## ✅ Complete Fix (5 minutes)

### **Step 1: Confirm the Issue** (30 seconds)

Visit this diagnostic endpoint:
```
https://eccco.vercel.app/api/debug/db-check
```

**Expected result**: You'll see something like:
```json
{
  "status": "error",
  "error": {
    "message": "column 'role' does not exist",
    "missingFields": ["role", "sessionId"],
    "suggestion": "Run database migration: npx prisma migrate deploy"
  }
}
```

---

### **Step 2: Install Vercel CLI** (if needed)

```bash
# Check if you have it
vercel --version

# If not, install it
npm install -g vercel
```

---

### **Step 3: Login to Vercel** (30 seconds)

```bash
vercel login
```

Follow the prompts to authenticate.

---

### **Step 4: Pull Production Environment Variables** (1 minute)

```bash
# This downloads your production .env from Vercel
vercel env pull .env.production.local
```

**Expected output**:
```
Vercel CLI 33.x.x
✔ Downloading Development Environment Variables for Project eccco
✔ Created .env.production.local file
```

---

### **Step 5: Run Migration on Production Database** (2 minutes)

```bash
# This applies the migration to your production Postgres database
npx prisma migrate deploy
```

**Expected output**:
```
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database

10 migrations found in prisma/migrations

Applying migration `20251125090844_add_live_quiz_models`

The following migration(s) have been applied:

migrations/
  └─ 20251125090844_add_live_quiz_models/
    └─ migration.sql

✔ Generated Prisma Client

All migrations have been successfully applied.
```

---

### **Step 6: Verify the Fix** (1 minute)

**Check 1 - Database Health:**
```
https://eccco.vercel.app/api/debug/db-check
```

Should now show:
```json
{
  "status": "ok",
  "database": {
    "connected": true,
    "hasRoleField": true,
    "hasSessionIdField": true
  }
}
```

**Check 2 - Topics API:**
```
https://eccco.vercel.app/api/topics
```

Should return an array of topics (not an error).

**Check 3 - Main App:**
```
https://eccco.vercel.app
```

Should load without "e.map is not a function" error.

**Check 4 - Sign-Up:**
```
https://eccco.vercel.app/auth/register
```

Try creating a test account - should work!

---

## 📋 Verification Checklist

After running the migration, test these:

- [ ] Visit homepage - loads without errors
- [ ] Click on dashboard - no "e.map" error
- [ ] Try to create account - no "internal server error"
- [ ] Check `/api/topics` - returns JSON array
- [ ] Check `/api/debug/db-check` - shows "ok" status
- [ ] Browser console - no red errors

---

## 🔧 If Migration Fails

### Error: "Environment variable not found: ACCELERATE_URL"

**Fix**: Check your `.env.production.local` file. If `ACCELERATE_URL` is missing, you need to set it in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Check if `ACCELERATE_URL` or `DATABASE_URL` exists
3. If missing, you need to set up your production database URL

### Error: "Connection refused"

**Fix**: Your Prisma Accelerate URL might be expired. Check your `.env` file:

```bash
cat .env | grep ACCELERATE_URL
```

If the token looks old, you may need to regenerate it from Prisma Dashboard.

### Error: "Migration already applied"

**Good!** This means the migration was already run. Just verify the endpoints work.

---

## 📊 What the Migration Does

The migration `20251125090844_add_live_quiz_models` adds:

1. **User table changes**:
   - `role` column (String, default: "student")
   - `sessionId` column (String, unique)

2. **New tables**:
   - `LiveQuizSession` - For hosting live quizzes
   - `LiveQuizParticipant` - For tracking participants
   - `LiveQuizAnswer` - For storing answers

All changes are **non-destructive** - existing data is preserved.

---

## 🎯 Why This Happened

**Development vs Production Databases:**

- **Local**: You use SQLite (`file:./prisma/dev.db`)
- **Production**: Vercel uses PostgreSQL (via Prisma Accelerate)

When you ran `npx prisma migrate deploy` locally, it only updated your local SQLite database. The production PostgreSQL database on Vercel didn't receive the update.

**Fix**: Always run migrations on BOTH databases:
1. Local: `npx prisma migrate deploy` (you did this ✅)
2. Production: `vercel env pull` + `npx prisma migrate deploy` (you need to do this ❌)

---

## 🚀 Quick Command Summary

```bash
# 1. Pull production env vars
vercel env pull .env.production.local

# 2. Run migration on production
npx prisma migrate deploy

# 3. Verify it worked
curl https://eccco.vercel.app/api/debug/db-check

# 4. Test topics API
curl https://eccco.vercel.app/api/topics

# 5. Test sign-up (optional - use browser)
open https://eccco.vercel.app/auth/register
```

---

## 📞 Need Help?

If migration still fails, share:
1. Output of `vercel env pull`
2. Output of `npx prisma migrate deploy`
3. Content of `.env.production.local` (redact secrets)
4. What `/api/debug/db-check` shows

---

## ✅ Success Indicators

You'll know it's fixed when:
- ✅ No more "e.map is not a function" errors
- ✅ `/api/topics` returns an array
- ✅ Dashboard loads properly
- ✅ Sign-up works without errors
- ✅ `/api/debug/db-check` shows "ok" status

---

**Start with Step 1 above!** The entire fix takes about 5 minutes. 🚀
