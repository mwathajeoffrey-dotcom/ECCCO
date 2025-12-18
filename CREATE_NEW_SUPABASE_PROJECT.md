# 🚀 Create New Supabase Project - Step by Step Guide

## Overview
We're creating a fresh Supabase project for your ECCCO platform. This will take about 15 minutes total.

---

## Step 1: Create New Supabase Project (5 min)

### 1.1 Go to Supabase Dashboard
Open: **https://supabase.com/dashboard/projects**

### 1.2 Create New Project
1. Click the **"New Project"** button (green button in top right)
2. Select your organization (or create one if needed)

### 1.3 Configure Project Settings

Fill in these details:

**Project Name:**
```
eccco-production
```

**Database Password:**
⚠️ **VERY IMPORTANT** - Create a strong password and SAVE IT!

**Recommended format:** 
```
Eccco_2025_Prod_[Random4Digits]
```

Example: `Eccco_2025_Prod_7829`

**DO NOT use special characters like:** `@`, `#`, `$`, `%`, `&` in the password  
(These cause encoding issues)

✅ **SAVE THIS PASSWORD SOMEWHERE SAFE!** (Notes app, password manager, etc.)

**Region:**
Choose the region closest to your users:
- 🇺🇸 **US East (N. Virginia)** - `us-east-1` (Most US users)
- 🇺🇸 **US West (Oregon)** - `us-west-1` (West Coast US)
- 🇪🇺 **Europe (Ireland)** - `eu-west-1` (Europe/Africa)
- 🇸🇬 **Southeast Asia (Singapore)** - `ap-southeast-1` (Asia/Pacific)

**Pricing Plan:**
- ✅ Select **"Free"** (sufficient for your needs)

### 1.4 Create Project
1. Click **"Create new project"** button
2. ⏳ Wait 2-3 minutes for Supabase to provision the database
3. You'll see a progress screen - don't close the browser!

---

## Step 2: Get Connection String (3 min)

### 2.1 Wait for Project to be Ready
- The dashboard will show "Setting up project..."
- Wait until you see the main project dashboard
- ✅ When ready, you'll see graphs and metrics

### 2.2 Navigate to Database Settings
1. Click **"Settings"** (⚙️ gear icon) in the left sidebar
2. Click **"Database"** in the settings menu

### 2.3 Find Connection String Section
Scroll down to the **"Connection string"** section

### 2.4 Get the CORRECT Connection String
⚠️ **This is critical - follow exactly:**

1. Look for the **"Connection string"** dropdown
2. Select **"Transaction"** mode (NOT Session!)
3. Toggle **"Use connection pooling"** to **ON** (green)
4. You'll see a connection string like this:

```
postgres://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
```

5. Copy the ENTIRE string

### 2.5 Replace Password Placeholder
The connection string shows `[YOUR-PASSWORD]` - replace it with your actual password

**Example:**
```
Before:
postgres://postgres.abcdefg:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres

After (if your password is Eccco_2025_Prod_7829):
postgres://postgres.abcdefg:Eccco_2025_Prod_7829@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### 2.6 URL Encode if Needed
⚠️ If you used special characters in your password (not recommended), encode them:

| Character | Replace With |
|-----------|--------------|
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `=` | `%3D` |

**If you followed our recommendation, you won't need encoding!**

---

## Step 3: Update Your Environment Files (2 min)

### 3.1 Update .env File
Your `.env` file currently has the old connection string. We need to replace it.

**Current (old):**
```bash
DATABASE_URL="postgresql://postgres:Gm%4034078614@db.jvgsawvgdewhcafwlwyj.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
```

**New (paste your connection string from Step 2.5):**
```bash
DATABASE_URL="postgres://postgres.YOUR-PROJECT-REF:YOUR-PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres"
```

### 3.2 Update .env.local File
Do the same in `.env.local`:

```bash
DATABASE_URL="postgres://postgres.YOUR-PROJECT-REF:YOUR-PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres"

NEXT_PUBLIC_USE_MOCK_DB=false

# Clerk keys (keep these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cG9zaXRpdmUtZ3JvdXBlci05Ni5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_k7CjKgtrc4LhQEN8ukLu75xU3DXmmr8qdfh2JlCDgw
```

### 3.3 Update .env.development.local File
```bash
DATABASE_URL="postgres://postgres.YOUR-PROJECT-REF:YOUR-PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres"

NEXT_PUBLIC_USE_MOCK_DB=false

# Clerk keys (keep these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cG9zaXRpdmUtZ3JvdXBlci05Ni5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_k7CjKgtrc4LhQEN8ukLu75xU3DXmmr8qdfh2JlCDgw
```

---

## Step 4: Push Database Schema (2 min)

Now we'll create all the tables (Bookmark, QuestionRating, etc.) in your new database.

### 4.1 Push Schema
```bash
npx prisma db push
```

**Expected output:**
```
✔ Database synchronized with Prisma schema.
✔ Running generate... (Use --skip-generate to skip the generators)
✔ Generated Prisma Client
```

✅ **Success indicators:**
- No errors
- Says "Database synchronized"
- Tables created: Topic, Question, ExamSession, Bookmark, QuestionRating, CaseScenario, CaseSession

❌ **If you get errors:**
- Check the connection string is correct
- Check password doesn't have typos
- Make sure project is active in Supabase dashboard
- Tell me the exact error message

### 4.2 Generate Prisma Client
```bash
npx prisma generate
```

**Expected output:**
```
✔ Generated Prisma Client
```

---

## Step 5: Test Locally (5 min)

### 5.1 Start Development Server
```bash
npm run dev
```

### 5.2 Test Bookmarks
1. Open browser: http://localhost:3000
2. Sign in to your account
3. Go to any exam (e.g., /exam → select a topic)
4. Click on a question
5. Click the **bookmark icon** (⭐)
6. You should see a success message
7. **Refresh the page** (F5 or Cmd+R)
8. ✅ Bookmark should still be there!

### 5.3 Test Ratings
1. On the same question
2. Click **"Helpful"** or **"Not Helpful"**
3. You should see it update
4. **Refresh the page**
5. ✅ Your rating should persist!

### 5.4 Test Notes (Optional)
1. Click bookmark icon again
2. Add a note in the modal
3. Save
4. Refresh page
5. Click bookmark icon
6. ✅ Your note should be there!

---

## Step 6: Update Vercel Environment Variables (3 min)

### 6.1 Go to Vercel Dashboard
Open: **https://vercel.com/dashboard**

### 6.2 Select Your ECCCO Project
Click on your deployed ECCCO project

### 6.3 Go to Settings
Click **"Settings"** tab → **"Environment Variables"**

### 6.4 Update DATABASE_URL
Find `DATABASE_URL` (or add it if missing):

1. Click **"Edit"** or **"Add New"**
2. Key: `DATABASE_URL`
3. Value: Your new Supabase connection string
4. **Important:** Select all environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **"Save"**

### 6.5 Update NEXT_PUBLIC_USE_MOCK_DB
Find `NEXT_PUBLIC_USE_MOCK_DB`:

1. Click **"Edit"** or **"Add New"**
2. Key: `NEXT_PUBLIC_USE_MOCK_DB`
3. Value: `false`
4. Select all environments
5. Click **"Save"**

### 6.6 Verify Clerk Production Keys
Make sure these are set to **production keys** (pk_live_ and sk_live_):

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
```

If still using test keys (pk_test_), update them to production.

---

## Step 7: Deploy to Vercel (2 min)

### 7.1 Commit Your Changes
```bash
git add .
git commit -m "feat: Connect to new Supabase database for bookmarks and ratings"
git push origin main
```

### 7.2 Wait for Deployment
1. Vercel will auto-deploy (triggered by git push)
2. Go to Vercel dashboard to watch progress
3. Wait 2-3 minutes for build and deployment
4. ✅ You'll see "Deployment successful"

### 7.3 Test Production
1. Visit your live Vercel URL
2. Sign in
3. Bookmark a question
4. Refresh → Should persist ✅
5. Rate a question
6. Refresh → Should persist ✅

---

## 🎉 Success Checklist

After completing all steps, verify:

- [x] New Supabase project created and active
- [x] Connection string copied and saved
- [x] `.env` files updated with new DATABASE_URL
- [x] `npx prisma db push` completed successfully
- [x] Local testing: bookmarks persist after refresh
- [x] Local testing: ratings persist after refresh
- [x] Vercel environment variables updated
- [x] Deployed to Vercel successfully
- [x] Production testing: bookmarks work
- [x] Production testing: ratings work

---

## 🆘 Troubleshooting

### Issue: "Can't reach database server"
- Check connection string has no typos
- Verify project is Active in Supabase dashboard
- Make sure you used Transaction mode (not Session)

### Issue: "Authentication failed"
- Password is incorrect
- Check for special characters that need encoding
- Try resetting database password in Supabase

### Issue: Build fails on Vercel
- Check environment variables are set correctly
- Make sure DATABASE_URL is in all environments
- Check build logs for specific error

### Issue: Bookmarks work locally but not in production
- Verify Vercel environment variables are saved
- Redeploy after updating environment variables
- Check Vercel function logs for errors

---

## 📋 Information to Save

**Keep these details for future reference:**

```
Supabase Project Name: eccco-production
Supabase Project URL: https://[project-ref].supabase.co
Database Password: [YOUR-PASSWORD]
Connection String: postgres://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
Region: [your-selected-region]
Created: [today's date]
```

---

## ⏭️ What's Next?

Once everything is working:

1. ✅ Monitor bookmark/rating usage in Supabase dashboard
2. ✅ Consider adding database backups
3. ✅ Monitor free tier limits (500 MB storage, 2 GB bandwidth)
4. ✅ Upgrade to paid plan if needed ($25/month for more resources)

---

**Ready to start? Follow Step 1 and tell me when you've created the project and have your connection string!**
