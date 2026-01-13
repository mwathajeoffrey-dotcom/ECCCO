# Vercel Environment Variables Setup

## ⚠️ CRITICAL: Update Your Vercel Environment Variables

Your local `.env` now has pgbouncer parameters, but **Vercel needs the same update**!

### 1. Go to Vercel Dashboard
https://vercel.com/mwathajeoffrey-dotcom/eccco/settings/environment-variables

### 2. Update DATABASE_URL

**Current value (broken):**
```
postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres
```

**New value (with pgbouncer):**
```
postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10&pool_timeout=10
```

### 3. Redeploy
After updating, click "Redeploy" on your latest deployment to apply the changes.

## Why This Fixes The Issue

### Problem:
- Vercel serverless functions have **10-second timeout**
- Without `pgbouncer=true`, Prisma tries to open new connections
- Connection pooling exhausts, causing timeouts
- Results in intermittent 500 errors

### Solution:
- `pgbouncer=true` - Tells Prisma to use transaction pooling mode
- `connect_timeout=10` - Prevents hanging connections
- `pool_timeout=10` - Manages pool efficiently

## Additional Vercel Settings to Verify

Make sure these are also set:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cOcy5kZXYk...
CLERK_SECRET_KEY=sk_test_kJh2JlCDgw...
NEXTAUTH_URL=https://eccco.vercel.app
NEXTAUTH_SECRET=<your-secret>
```

## After Deployment

Test these endpoints:
1. https://eccco.vercel.app/api/topics (should return 46 topics)
2. https://eccco.vercel.app/api/questions?topicId=bls&limit=5 (should return 5 questions)
3. https://eccco.vercel.app/exam (should load topic dropdown)

