# Vercel Deployment Deletion Guide

## ⚠️ CRITICAL: Deployments Cannot Be Deleted via CLI

Vercel does **NOT** allow deployment deletion through the CLI. You **MUST** use the web dashboard.

## 📍 Step-by-Step Manual Deletion Process

### 1. Open Vercel Dashboard

Go to: **https://vercel.com/mwathajeoffrey-dotcom/eccco/deployments**

### 2. Identify Old Deployments

You'll see a list like:

```
✓ Production    eccco-abc123.vercel.app    main    2 minutes ago
✓ Production    eccco-xyz456.vercel.app    main    15 minutes ago  ← DELETE THIS
✓ Production    eccco-def789.vercel.app    main    1 hour ago     ← DELETE THIS
✓ Production    eccco-ghi012.vercel.app    main    2 hours ago    ← DELETE THIS
```

### 3. Delete Each Old Deployment

For **EACH** deployment (except the newest):

1. **Click** on the deployment row (the whole row is clickable)
2. You'll be taken to the deployment details page
3. Look for the **"..."** (three dots) menu button in the top right
4. Click **"..."** → Select **"Delete"**
5. Confirm the deletion in the popup dialog
6. **REPEAT** for each old deployment

### 4. How to Tell Which to Keep

- **KEEP**: The deployment with the **MOST RECENT** timestamp
- **DELETE**: Everything else marked "Production"

### 5. Verification

After deletion, the deployments page should show:

- **Only 1 production deployment** remaining
- That deployment should be the one from your latest `git push`

## 🔄 Alternative: Use Vercel's Auto-Cleanup (Slower)

If manual deletion is too tedious:

1. Go to: **https://vercel.com/mwathajeoffrey-dotcom/eccco/settings/general**
2. Scroll to **"Deployment Retention"**
3. Set to **"Delete deployments older than: 1 day"**
4. This will auto-delete old deployments but takes 24 hours

## ⚡ Quick Access URLs

- **Deployments List**: https://vercel.com/mwathajeoffrey-dotcom/eccco/deployments
- **Project Settings**: https://vercel.com/mwathajeoffrey-dotcom/eccco/settings

## 🎯 Why This Matters

Multiple active production deployments = Vercel randomly routes users between old and new code.

- User hits OLD deployment → sees deleted `MobileMenuDrawer` → **BROKEN NAVIGATION**
- User hits NEW deployment → sees `EnhancedSidebar` → **WORKING NAVIGATION**

**Solution**: Delete all old deployments → All users hit the same (new) deployment → Everyone sees working code

## 📝 After Deletion

Once you have **only 1 deployment** remaining:

1. Copy the deployment URL (e.g., `eccco-abc123.vercel.app`)
2. Open it in **Incognito mode**
3. Test navigation - it should work perfectly
4. Check Sentry - errors should stop

Then you can proceed with deploying the infrastructure fixes.
