# URGENT: Vercel Environment Variable Setup Required

## ⚠️ CRITICAL ACTION REQUIRED

The dashboard is failing because **Vercel doesn't have the PostgreSQL DATABASE_URL** configured.

### Current Situation
- ✅ Local development: Uses SQLite (`file:./dev.db`)
- ❌ Vercel production: **Missing PostgreSQL connection string**
- ✅ Schema fixed: Now correctly configured for PostgreSQL

## Step-by-Step Fix

### 1. Get Your Supabase Connection String

Go to your Supabase dashboard:
https://supabase.com/dashboard/project/[your-project-id]/settings/database

Look for **"Connection string"** → **"URI"** (should start with `postgresql://`)

Example format:
```
postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### 2. Add DATABASE_URL to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to: https://vercel.com/mwathajeoffrey-dotcom/eccco/settings/environment-variables
2. Click **"Add New"**
3. Enter:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://postgres.xxxxx:[password]@[host].supabase.com:6543/postgres`
   - **Environments**: Check **Production**, **Preview**, and **Development**
4. Click **"Save"**

#### Option B: Using Vercel CLI
```bash
cd /Users/apple/ECCCO
npx vercel env add DATABASE_URL production
# Paste your Supabase PostgreSQL connection string when prompted
```

### 3. Redeploy

After adding the environment variable:

**Option A: Automatic (if git push triggers)**
```bash
git commit --allow-empty -m "Trigger redeploy after env var update"
git push
```

**Option B: Manual via Vercel Dashboard**
1. Go to: https://vercel.com/mwathajeoffrey-dotcom/eccco/deployments
2. Click on the latest deployment (commit 9b6c95c)
3. Click the three dots (⋯) → "Redeploy"
4. Check "Use existing Build Cache" → Click "Redeploy"

### 4. Verify Database Connection

After deployment completes:
```bash
npx vercel logs eccco.vercel.app --follow
```

Look for these success logs:
```
[Dashboard API] Fetching exam sessions for user: user_...
[Dashboard API] Found X exam sessions
```

## Common Connection String Formats

### Direct PostgreSQL (Supabase)
```
postgresql://postgres:[PASSWORD]@db.[project-id].supabase.co:5432/postgres
```

### Connection Pooler (Supabase - Recommended for serverless)
```
postgresql://postgres:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
```

### With SSL Mode (if required)
```
postgresql://postgres:[PASSWORD]@[host]:5432/postgres?sslmode=require
```

## Troubleshooting

### If you don't have a Supabase project yet:
1. Go to: https://supabase.com/dashboard
2. Click **"New Project"**
3. Create a project named "ECCCO"
4. Wait for setup to complete
5. Get connection string from Settings → Database

### If you want to use a different PostgreSQL provider:
- **Neon**: https://neon.tech
- **Railway**: https://railway.app
- **Render**: https://render.com
- **Heroku Postgres**: https://heroku.com

## What Happens Next

1. ✅ Vercel deployment will use PostgreSQL instead of SQLite
2. ✅ Prisma Client will connect to your production database
3. ✅ Dashboard API will successfully query exam sessions
4. ✅ Statistics will display correctly

## Verification Checklist

After completing the steps above:

- [ ] DATABASE_URL added to Vercel environment variables
- [ ] Latest deployment completed successfully
- [ ] Dashboard at https://eccco.vercel.app/dashboard loads
- [ ] Browser console shows `[Dashboard API]` success logs
- [ ] No 500 errors in Network tab

## Files Ready
- ✅ `prisma/schema.prisma` - PostgreSQL configuration
- ✅ Prisma Client regenerated
- ✅ Code deployed (commit 9b6c95c)
- ❌ **Environment variable needed** ← YOU ARE HERE

## Quick Test Command

After setting up, test the API directly:
```bash
curl -H "Cookie: __clerk_session=[your-session-cookie]" https://eccco.vercel.app/api/user/stats
```

Should return JSON with stats instead of 500 error.

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs/guides/database/connecting-to-postgres
- Vercel Env Vars: https://vercel.com/docs/projects/environment-variables
- Prisma + Supabase: https://www.prisma.io/docs/guides/database/supabase
