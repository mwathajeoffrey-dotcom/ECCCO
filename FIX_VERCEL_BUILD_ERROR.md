# Fix Vercel Build Error - DATABASE_URL Missing

## Problem
Vercel build is failing with: `Error: Command "npx prisma generate && npm run build" exited with 1`

This happens because Prisma needs `DATABASE_URL` to generate the client, but it's not set in Vercel's environment variables.

## Solution: Add DATABASE_URL to Vercel

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco
2. Click on **Settings** tab
3. Click on **Environment Variables** in the left sidebar

### Step 2: Add DATABASE_URL
Click **Add New** and enter:

**Key:**
```
DATABASE_URL
```

**Value:**
```
postgresql://postgres.jvgsawvgdewhcafwlwyj:Gm@34078614@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

**Environment:** Select all environments (Production, Preview, Development)

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the **•••** menu on the latest failed deployment
3. Click **Redeploy**

OR just push a new commit:
```bash
git commit --allow-empty -m "Trigger rebuild after adding DATABASE_URL"
git push
```

## Why This Happened
When we cleaned up the old auth code, we removed the User model from Prisma schema. The schema is now valid, but Vercel needs the DATABASE_URL environment variable to run `prisma generate` during the build process.

## Expected Result
After adding DATABASE_URL and redeploying:
✅ Prisma generates successfully
✅ Build completes
✅ Site deploys with new auth working
✅ You can sign in on production with Clerk

---

**Current Status:** DATABASE_URL is in `.env.local` (local only) but missing from Vercel environment variables.
