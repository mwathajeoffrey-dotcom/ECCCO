# 🚀 Deployment & Migration Guide

## ✅ Status: Code Deployed to Vercel

**Commit:** `06616b9` - "feat: Add bookmarks, ratings, and case-based learning features"  
**Pushed to:** GitHub main branch  
**Vercel Status:** Automatic deployment triggered

---

## 📦 What Was Deployed

### New Features:
1. **📚 Bookmarks** - Save questions with notes (`/bookmarks`)
2. **👍 Ratings** - Rate explanations with comments
3. **🏥 Cases** - Case-based learning scenarios (`/cases`)

### New Files:
- 3 API routes (`/api/bookmarks`, `/api/questions/[id]/rating`)
- 2 pages (`/bookmarks`, `/cases`)
- 2 components (`BookmarkButton`, `QuestionRating`)
- 1 data structure (`clinical-cases.ts`)
- Database migration with 4 new tables

---

## ⚠️ CRITICAL: Database Migration Required

Your code is deployed, but the **database migration hasn't been run yet**.

### What Happens Without Migration:
- ❌ Bookmarks will fail (table doesn't exist)
- ❌ Ratings will fail (table doesn't exist)
- ❌ Cases will fail (table doesn't exist)
- ✅ Existing features still work

---

## 🔧 Apply Database Migration (Choose One Method)

### **Method 1: Vercel Dashboard (Recommended)**

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Verify `DATABASE_URL` is set to your PostgreSQL connection string
4. Go to **Deployments** tab
5. Find your latest deployment (commit `06616b9`)
6. Click the **3 dots** → **View Deployment**
7. Open **Functions** → **Find any function** → **View Logs**
8. Run migration manually via Vercel terminal or SSH

### **Method 2: Run from Your Local Machine**

**IMPORTANT:** Make sure you have your production `DATABASE_URL` available.

```bash
# Set production database URL (get from Vercel dashboard)
export DATABASE_URL="postgresql://user:password@host:5432/database"

# Run migration
npx prisma migrate deploy

# Verify tables were created
npx prisma studio
```

### **Method 3: Use Vercel CLI**

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Set environment variable
vercel env pull

# Run migration
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

---

## ✅ Verify Migration Success

After running the migration, check that these 4 tables exist:

1. **Bookmark** - Stores user bookmarks with notes
2. **QuestionRating** - Stores ratings and comments
3. **CaseScenario** - Stores clinical cases
4. **CaseSession** - Tracks case progress

### Verification Query (PostgreSQL):
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('Bookmark', 'QuestionRating', 'CaseScenario', 'CaseSession');
```

Expected output:
```
  table_name   
---------------
 Bookmark
 CaseScenario
 CaseSession
 QuestionRating
```

---

## 🧪 Test the Deployed Features

### 1. Test Bookmarks:
```bash
# Visit your production URL
https://your-app.vercel.app/bookmarks

# Should show empty state: "No bookmarks found"
# Click "Start Practicing" → Answer a question → Bookmark it
# Return to /bookmarks → Should see your bookmark
```

### 2. Test Ratings:
```bash
# Go to practice mode
https://your-app.vercel.app/practice

# Answer a question
# Scroll to "Was this explanation helpful?"
# Click Helpful/Not Helpful
# Should save successfully (check browser console for errors)
```

### 3. Test Cases:
```bash
# Visit cases page
https://your-app.vercel.app/cases

# Should show empty state (no cases populated yet)
# Page should load without errors
```

---

## 🐛 Troubleshooting

### Error: "Table 'Bookmark' does not exist"
**Solution:** Migration hasn't been run. Follow Method 1, 2, or 3 above.

### Error: "Cannot connect to database"
**Solution:** Check `DATABASE_URL` environment variable in Vercel:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify `DATABASE_URL` is set correctly
3. Redeploy if you added/changed it

### Error: "Migration already applied"
**Solution:** This is normal. Your database is up to date.

### Error: "Prisma Client not generated"
**Solution:** Vercel automatically runs `prisma generate` during build. If it fails:
1. Check build logs in Vercel
2. Look for TypeScript errors
3. Ensure `prisma` is in `dependencies` (not `devDependencies`)

---

## 📊 Monitor Deployment

### Vercel Dashboard:
1. **Deployments** tab - See build status
2. **Functions** tab - View API route logs
3. **Analytics** tab - Track usage
4. **Settings** → **Environment Variables** - Manage secrets

### Check Build Logs:
```
vercel logs [deployment-url]
```

### Check Runtime Logs:
```
vercel logs [deployment-url] --follow
```

---

## 🎯 Post-Deployment Checklist

After migration is successful:

- [ ] Visit https://your-app.vercel.app/bookmarks
- [ ] Test bookmark creation
- [ ] Visit https://your-app.vercel.app/cases
- [ ] Verify page loads (empty state is expected)
- [ ] Test rating a question explanation
- [ ] Check browser console for errors
- [ ] Monitor Vercel function logs for any issues
- [ ] Test on mobile device
- [ ] Share with beta users for feedback

---

## 🔄 Rolling Back (If Needed)

If something goes wrong and you need to revert:

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback deployment in Vercel dashboard:
# Deployments → Find previous working deployment → Promote to Production
```

**Note:** You **cannot** easily undo database migrations. Plan migrations carefully.

---

## 📝 Next Steps

### Immediate (After Migration):
1. Test all 3 new features in production
2. Monitor error logs for 24 hours
3. Fix any issues that arise

### Short-term (Next Week):
1. Populate clinical cases in `clinical-cases.ts`
2. Add navigation links to homepage
3. Integrate BookmarkButton into practice page
4. Collect user feedback

### Medium-term (Next Month):
1. Add 10-20 clinical cases with full content
2. Implement spaced repetition for bookmarks
3. Add analytics dashboard for ratings
4. Build community features

---

## 🆘 Need Help?

### Common Issues:
- **Database Connection Errors:** Check `DATABASE_URL` format
- **Migration Conflicts:** May need to reset dev database
- **Build Failures:** Check TypeScript errors in Vercel logs
- **Runtime Errors:** Check browser console and Vercel function logs

### Resources:
- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

---

## ✅ Summary

**You've successfully deployed:**
- ✅ Bookmarks feature (backend + frontend)
- ✅ Ratings feature (backend + frontend)
- ✅ Cases feature (backend + frontend + infrastructure)
- ✅ Database schema updates
- ✅ API endpoints
- ✅ UI components

**Next Critical Step:**
👉 **Run database migration** using one of the 3 methods above

**Expected Timeline:**
- Migration: 2-5 minutes
- Verification: 5-10 minutes
- Testing: 15-30 minutes
- **Total: ~30-45 minutes**

---

**Deployment Status:** 🟡 **PENDING MIGRATION**  
After migration: 🟢 **FULLY OPERATIONAL**

Good luck! 🚀
