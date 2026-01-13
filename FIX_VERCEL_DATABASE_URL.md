# 🔧 Fix Vercel Production Database Connection

## Problem
The DATABASE_URL in Vercel is missing the required `pgbouncer` parameters, causing this error:
```
prepared statement "s0" already exists
```

## Solution: Update DATABASE_URL in Vercel

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco/settings/environment-variables
2. Or navigate: Vercel Dashboard → Your Project (eccco) → Settings → Environment Variables

### Step 2: Update DATABASE_URL

Find the `DATABASE_URL` variable and update it to:

```
postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10&pool_timeout=10
```

**Important**: Make sure to add it to all environments:
- ✅ Production
- ✅ Preview  
- ✅ Development

### Step 3: Redeploy

After updating the environment variable, redeploy:
```bash
npx vercel --prod --force
```

---

## Alternatively: Use CLI (Manual Confirmation Required)

```bash
# Remove old variable
npx vercel env rm DATABASE_URL

# Add new variable with pgbouncer parameters (when prompted, select all environments)
echo 'postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10&pool_timeout=10' | npx vercel env add DATABASE_URL

# Redeploy
npx vercel --prod --force
```

---

## What This Fixes

### Before (Broken)
```
DATABASE_URL=postgresql://...postgres
                                    ↑ Missing pgbouncer parameters
```
**Result**: ❌ Prepared statement errors in serverless functions

### After (Working)
```
DATABASE_URL=postgresql://...postgres?pgbouncer=true&connect_timeout=10&pool_timeout=10
                                     ↑ Proper connection pooling
```
**Result**: ✅ Stable database connections

---

## Verification

After redeploying, test:
```bash
curl 'https://eccco.vercel.app/api/questions?topicId=acls&limit=1'
```

Should return:
```json
{
  "success": true,
  "questions": [...]
}
```

---

**Let me know when you've updated the environment variable and I'll help you redeploy!**
