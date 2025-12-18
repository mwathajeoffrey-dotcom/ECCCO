# ECCCO Platform - Two-Phase Deployment Plan

## 🎯 Strategy Overview

Deploy in **two phases** to get your platform live quickly while working on database integration separately.

---

## 📦 PHASE 1: Deploy Core Platform (NOW)

### What Works in Phase 1:
✅ All exam questions and answers  
✅ Flashcards system  
✅ Clinical guidelines  
✅ Interactive flowcharts (ACLS, etc.)  
✅ User authentication (Clerk)  
✅ Full navigation and UI  

### What's Disabled Temporarily:
⚠️ Bookmark saving (UI will show but won't persist)  
⚠️ Question ratings (UI will show but won't persist)  
⚠️ Progress tracking  

### Phase 1 Deployment Steps:

#### Step 1: Get Clerk Production Keys (5 min)
1. Go to https://dashboard.clerk.com
2. Select your application
3. Click **"API Keys"** in sidebar
4. Switch to **"Production"** tab (toggle at top)
5. Copy these two keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_live_`)
   - `CLERK_SECRET_KEY` (starts with `sk_live_`)

#### Step 2: Test Local Build (2 min)
```bash
npm run build
```
✅ Must complete without errors

#### Step 3: Push to GitHub (1 min)
```bash
git add .
git commit -m "Ready for production deployment - Phase 1"
git push origin main
```

#### Step 4: Deploy to Vercel (7 min)

**4a. Connect Repository:**
1. Go to https://vercel.com/new
2. Import your repository: `mwathajeoffrey-dotcom/ECCCO`
3. Click **"Import"**

**4b. Configure Build Settings:**
- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**4c. Set Environment Variables:**
Click **"Environment Variables"**, add these:

```bash
# Clerk Production Keys (from Step 1)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx

# Disable mock database (features will be hidden)
NEXT_PUBLIC_USE_MOCK_DB=false

# Temporary database URL (not used but required for build)
DATABASE_URL=file:./dev.db

# Optional: Your domain
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**4d. Deploy:**
- Click **"Deploy"**
- Wait 2-3 minutes for build
- ✅ Your app is live!

#### Step 5: Update Clerk Settings (3 min)
1. Go back to https://dashboard.clerk.com
2. Click **"Domains"** → Add your Vercel domain
3. Click **"Paths"** → Verify sign-in/sign-up paths:
   - Sign-in: `/sign-in`
   - Sign-up: `/sign-up`
   - After sign-in: `/`
   - After sign-up: `/`

---

## 🗄️ PHASE 2: Add Database (1-2 Days Later)

### Recommended: Vercel Postgres (Easier)

#### Why Vercel Postgres:
✅ One-click setup from Vercel dashboard  
✅ Zero connection configuration  
✅ Free tier: 256 MB storage, 60 hours compute/month  
✅ Built on Neon (reliable, fast)  
✅ Native Prisma support  
✅ No SSL/pooler headaches  

#### Setup Steps:

**1. Create Vercel Postgres Database (5 min):**
1. Go to your Vercel dashboard
2. Select your ECCCO project
3. Click **"Storage"** tab
4. Click **"Create Database"**
5. Choose **"Postgres"**
6. Name it: `eccco-production`
7. Select region closest to users
8. Click **"Create"**

**2. Environment Variables Auto-Added:**
Vercel automatically adds:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` ← Use this for Prisma
- `POSTGRES_URL_NON_POOLING`

**3. Update Prisma Schema (local):**
```bash
# Your schema/prisma.schema already uses env("DATABASE_URL")
# Just update local .env for testing

# .env.local (for local testing)
DATABASE_URL="your-vercel-postgres-url-from-dashboard"
```

**4. Push Database Schema (2 min):**
```bash
npx prisma generate
npx prisma db push
```

**5. Update Vercel Environment Variables:**
In Vercel dashboard → Settings → Environment Variables:
```bash
# Update or add:
DATABASE_URL=${POSTGRES_PRISMA_URL}
NEXT_PUBLIC_USE_MOCK_DB=false
```

**6. Redeploy:**
```bash
git commit -m "Phase 2: Database integration complete"
git push origin main
```
Vercel auto-deploys!

**7. Verify Bookmarks/Ratings Work:**
- Sign in to your live app
- Bookmark a question
- Refresh page → bookmark should persist ✅
- Rate a question → rating should persist ✅

---

### Alternative: Fix Supabase (Harder)

If you prefer to keep Supabase:

**1. Verify Connection String Format:**
```bash
# From Supabase Dashboard → Settings → Database → Connection String
# Use "Connection Pooling" string

DATABASE_URL="postgres://postgres.xxxx:password@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

**2. URL Encode Special Characters:**
If your password has `@`, `#`, `$`, etc:
```bash
# Example: password is "pass@word123"
# Becomes: "pass%40word123"
```

**3. Test Connection:**
```bash
npx prisma db push
```

**4. Common Issues:**
- "Tenant not found" → Wrong project URL
- SSL error → Add `?sslmode=require`
- Timeout → Check Supabase project is not paused
- Pooler error → Try direct connection (port 5432)

---

## 📊 Feature Comparison

| Feature | Phase 1 | Phase 2 |
|---------|---------|---------|
| Browse questions | ✅ | ✅ |
| Take exams | ✅ | ✅ |
| View flashcards | ✅ | ✅ |
| Read guidelines | ✅ | ✅ |
| Use flowcharts | ✅ | ✅ |
| User authentication | ✅ | ✅ |
| Save bookmarks | ❌ | ✅ |
| Rate questions | ❌ | ✅ |
| Track progress | ❌ | ✅ |
| Comment on questions | ❌ | ✅ |

---

## 🚨 Important Notes

### Phase 1 Limitations:
- Users can click bookmark/rating buttons but data won't persist
- Consider adding a banner: "Bookmark features coming soon!"
- Or hide the buttons entirely until Phase 2

### To Hide Bookmark/Rating Buttons (Optional):
Update these components to check database availability:

```tsx
// src/components/BookmarkButton.tsx
const useMockDB = process.env.NEXT_PUBLIC_USE_MOCK_DB === 'true';
if (!useMockDB) return null; // Hide in production until DB ready

// src/components/QuestionRating.tsx
const useMockDB = process.env.NEXT_PUBLIC_USE_MOCK_DB === 'true';
if (!useMockDB) return null; // Hide in production until DB ready
```

### Security Checklist:
- ✅ `.env*.local` files in `.gitignore`
- ✅ Never commit API keys to GitHub
- ✅ Use `pk_live_` and `sk_live_` in production
- ✅ Keep `pk_test_` and `sk_test_` for local development only

---

## 🎯 Timeline Estimate

| Phase | Time | Outcome |
|-------|------|---------|
| Phase 1 | 15 min | Live app with core features |
| Phase 2 | 1-2 days | Full features with database |
| **Total** | **< 3 days** | **Complete platform** |

---

## 🆘 Need Help?

### Vercel Deployment Issues:
- Check build logs in Vercel dashboard
- Verify environment variables are set
- Try `npm run build` locally first

### Clerk Authentication Issues:
- Verify production keys are correct
- Check domain is added in Clerk dashboard
- Ensure sign-in/sign-up paths match

### Database Connection Issues:
- Use Vercel Postgres (recommended)
- Or share Supabase error messages for debugging
- Check Prisma schema matches your database

---

## ✅ Success Checklist

**Phase 1 Complete When:**
- [ ] App deploys to Vercel without errors
- [ ] Can visit live URL
- [ ] Can sign up/sign in
- [ ] Can browse and answer questions
- [ ] Flashcards work
- [ ] Guidelines load
- [ ] Flowcharts are interactive

**Phase 2 Complete When:**
- [ ] Database connected
- [ ] Bookmarks save and persist
- [ ] Question ratings save and persist
- [ ] Progress tracked across sessions
- [ ] Comments display correctly

---

## 🚀 Let's Get Started!

**Right now, start with:**
1. Get your Clerk production keys
2. Test `npm run build` locally
3. Deploy to Vercel
4. Celebrate your live app! 🎉

**In 1-2 days:**
5. Set up Vercel Postgres
6. Push Prisma schema
7. Redeploy with full features
8. Celebrate again! 🎊
