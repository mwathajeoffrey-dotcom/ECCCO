# 🚀 ECCCO Quick Deploy - Phase 1 Checklist

## ⏱️ Total Time: 15 Minutes

---

## Step 1: Get Clerk Production Keys (5 min) 🔑

1. Go to: https://dashboard.clerk.com
2. Select your **ECCCO** application
3. Click **"API Keys"** in left sidebar
4. **Toggle to "Production"** (at the top)
5. Copy both keys:
   - ✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → starts with `pk_live_`
   - ✅ `CLERK_SECRET_KEY` → starts with `sk_live_`

**⚠️ IMPORTANT:** Keep these secret! Don't commit them to Git.

---

## Step 2: Test Build Locally (2 min) 🔨

```bash
# Kill any running dev servers
killall node

# Run production build
npm run build
```

**Expected:** Build completes with `✓ Compiled successfully`  
**If errors:** Fix them before deploying!

---

## Step 3: Push to GitHub (1 min) 📤

```bash
git add .
git commit -m "Phase 1: Ready for production deployment"
git push origin main
```

---

## Step 4: Deploy to Vercel (7 min) ☁️

### 4a. Import Repository
1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Find: `mwathajeoffrey-dotcom/ECCCO`
4. Click **"Import"**

### 4b. Configure Project
- **Framework Preset:** Next.js ✅ (auto-detected)
- **Root Directory:** `.` (leave default)
- **Build Command:** `npm run build` (leave default)
- **Output Directory:** `.next` (leave default)

### 4c. Add Environment Variables
Click **"Environment Variables"** and add:

```bash
# REQUIRED: Clerk Production Keys (from Step 1)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx

# REQUIRED: Mock DB setting
NEXT_PUBLIC_USE_MOCK_DB=false

# REQUIRED: Temporary database URL
DATABASE_URL=file:./dev.db

# OPTIONAL: Your app URL (update after deployment)
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

**Apply to:** Production, Preview, Development ✅

### 4d. Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes ⏳
3. ✅ **Success!** Click "Visit" to see your live app

---

## Step 5: Update Clerk Domain (3 min) 🌐

1. Go back to: https://dashboard.clerk.com
2. Click **"Domains"** in sidebar
3. Click **"Add domain"**
4. Paste your Vercel URL: `https://your-app-name.vercel.app`
5. Click **"Add domain"** ✅

### Verify Redirect URLs:
Click **"Paths"** in Clerk dashboard:
- Sign-in URL: `/sign-in` ✅
- Sign-up URL: `/sign-up` ✅
- After sign-in: `/` ✅
- After sign-up: `/` ✅

---

## ✅ Deployment Complete!

### Test Your Live App:
1. Visit your Vercel URL
2. Click **"Sign Up"** → Create account ✅
3. Browse questions ✅
4. View flashcards ✅
5. Check guidelines ✅
6. Test flowcharts ✅

### ⚠️ Known Limitations (Phase 1):
- ❌ Bookmarks won't persist (refresh will lose them)
- ❌ Ratings won't persist (refresh will lose them)
- ✅ All other features work perfectly!

---

## 🗄️ Phase 2: Add Database (Coming Soon)

After Phase 1 is live and working:

### Recommended: Vercel Postgres
1. Vercel Dashboard → Your Project → **Storage** tab
2. Click **"Create Database"** → Choose **Postgres**
3. Copy connection string
4. Update `DATABASE_URL` in Vercel environment variables
5. Set `NEXT_PUBLIC_USE_MOCK_DB=false`
6. Run: `npx prisma db push`
7. Redeploy ✅

**Time estimate:** 30 minutes  
**Result:** Full bookmark/rating persistence!

---

## 🆘 Troubleshooting

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Run `npm run build` locally to see errors
- Verify all environment variables are set

### "Clerk: Invalid publishable key"
- Verify you copied the `pk_live_` key (not `pk_test_`)
- Check no extra spaces in environment variable
- Domain must be added in Clerk dashboard

### Sign In Redirects to Wrong URL
- Update `NEXT_PUBLIC_APP_URL` with your Vercel URL
- Add domain in Clerk dashboard
- Clear browser cache and try again

### Questions Don't Load
- Check API routes are deployed (not just static files)
- Verify `data/` folder is included in deployment
- Check Vercel function logs

---

## 📊 What Works in Phase 1

| Feature | Status |
|---------|--------|
| User sign up/sign in | ✅ Working |
| Browse all questions | ✅ Working |
| Take exams | ✅ Working |
| View answers & explanations | ✅ Working |
| Flashcards | ✅ Working |
| Clinical guidelines | ✅ Working |
| Interactive flowcharts | ✅ Working |
| Responsive design | ✅ Working |
| Save bookmarks | ⚠️ Phase 2 |
| Rate questions | ⚠️ Phase 2 |
| Track progress | ⚠️ Phase 2 |

---

## 🎯 Success Criteria

**Phase 1 is successful when:**
- ✅ App loads at Vercel URL
- ✅ Can sign up and sign in
- ✅ Can browse and answer questions
- ✅ All content is accessible
- ✅ No console errors
- ✅ Mobile responsive works

**Ready for Phase 2 when:**
- ✅ Users are actively using the platform
- ✅ Feedback indicates bookmark feature is desired
- ✅ You have 30 minutes to set up database

---

## 🚀 Deploy Now!

**Your command:**
```bash
# 1. Test build
npm run build

# 2. Push to GitHub
git push origin main

# 3. Then go to vercel.com/new
```

**Good luck! 🎉**
