# Local Dashboard Testing Guide

## ✅ What to Test

### 1. **Start Dev Server**

```bash
npm run dev
```

Wait for "✓ Ready" message (usually 10-15 seconds)

### 2. **Access Admin Dashboard**

Open in browser: http://localhost:3000/admin/dashboard

You should see:

- ✅ Total Users count
- ✅ Online Now count (will be 0 initially)
- ✅ Total Questions, Attempts, Exams, Quizzes, Notes
- ✅ Recent Activity feed
- ✅ Auto-refresh every 30 seconds

### 3. **Test Online User Detection (HEARTBEAT SYSTEM)**

**Step 1: Login**

1. Go to http://localhost:3000
2. Login with your Clerk account (mwathajeoffrey@gmail.com or any other)
3. Once logged in, **stay on ANY page** (Practice, Notes, Profile, etc.)

**Step 2: Wait for Heartbeat**

- The UserHeartbeat component will:
  - Send an immediate ping when you login
  - Then ping every 30 seconds while you're browsing
  - Update your `updatedAt` timestamp in database

**Step 3: Check Dashboard**

1. Open admin dashboard: http://localhost:3000/admin/dashboard
2. Look at "Online Now" counter
3. Should show **1** (you) within 30 seconds of logging in
4. Leave dashboard open - it auto-refreshes every 30 seconds

**Step 4: Test Timeout**

1. Close the app tab (logout or just close)
2. Wait 5+ minutes
3. Refresh dashboard
4. "Online Now" should go back to **0**

### 4. **Verify Clerk Webhook (Production Only)**

⚠️ **Webhook only works in production** (Vercel deployment)

Local testing for webhooks requires:

- ngrok or similar tunnel (to expose localhost to internet)
- Clerk webhook URL pointing to your tunnel
- Not practical for quick testing

**Instead, test webhook in production:**

1. Deploy to Vercel: `git push origin main`
2. Create a NEW test user account at https://eccco.vercel.app/sign-up
3. Check database - new user should appear immediately
4. Check Vercel logs for webhook execution

### 5. **Check User Sync Status**

**Current State:**

- 4 Clerk users exist:
  - ecccomedical@gmail.com (user_38h8JFtkVdyi8TPrzVvp5wrlE6S)
  - mwathajeoffrey@gmail.com (user_371H3N8bQ5kWMu1ExtSo5nf48AV)
  - mwangijeoffrey@gmail.com (user_37bCovuDEScNyzg6A9wSJ5vAsRv)
  - ogerofrancisca@gmail.com (user_38gz7Cb4twPyDHC8HDPOzxgGiMT)

**Database sync options:**

**Option A: Manual SQL (Recommended)**

1. Go to Supabase SQL Editor:
   https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer/sql/new

2. Run this SQL:

```sql
-- Sync Clerk users to database
INSERT INTO "User" (id, "clerkUserId", email, "createdAt", "updatedAt")
VALUES
  (
    'db_user_1738130400000',
    'user_38h8JFtkVdyi8TPrzVvp5wrlE6S',
    'ecccomedical@gmail.com',
    NOW(),
    NOW()
  ),
  (
    'db_user_1738130400001',
    'user_371H3N8bQ5kWMu1ExtSo5nf48AV',
    'mwathajeoffrey@gmail.com',
    NOW(),
    NOW()
  ),
  (
    'db_user_1738130400002',
    'user_37bCovuDEScNyzg6A9wSJ5vAsRv',
    'mwangijeoffrey@gmail.com',
    NOW(),
    NOW()
  ),
  (
    'db_user_1738130400003',
    'user_38gz7Cb4twPyDHC8HDPOzxgGiMT',
    'ogerofrancisca@gmail.com',
    NOW(),
    NOW()
  )
ON CONFLICT ("clerkUserId") DO UPDATE SET
  email = EXCLUDED.email,
  "updatedAt" = NOW();
```

3. Refresh dashboard - "Total Users" should show **4**

**Option B: Auto-sync on Login**

- Each existing user logs in
- Browses any page (Practice, Notes, etc.)
- Heartbeat endpoint will auto-create user in database
- Slower but requires no manual intervention

### 6. **Verify Dashboard Metrics**

After syncing users, dashboard should show:

- **Total Users**: 4 (or more if you created test accounts)
- **Online Now**: Number of users who browsed within last 5 minutes
- **Total Questions**: 1845 (from seed data)
- **Total Attempts**: Count of QuestionAttempt records
- **Recent Activity**: Last hour of user actions

### 7. **Test Auto-Refresh**

1. Leave dashboard open
2. In another tab, login and browse pages
3. Watch dashboard - should update every 30 seconds
4. "Online Now" should increment within 30-60 seconds

### 8. **Check for Errors**

**Terminal logs:**

```bash
# Watch for errors
npm run dev
```

Look for:

- ❌ Database connection errors
- ❌ Clerk authentication errors
- ❌ Prisma query errors
- ✅ Successful heartbeat pings (no error = working)

**Browser console:**

1. Open DevTools (F12 or Cmd+Option+I)
2. Go to Console tab
3. Should see:
   - ✅ No errors
   - ✅ Heartbeat fetch requests every 30 seconds (in Network tab)
   - ✅ Dashboard polling every 30 seconds

## 📊 Expected Results

### ✅ Working State

- Dashboard loads without errors
- Metrics display correct counts
- Online users increment when you browse
- Auto-refresh updates data
- Recent activity shows user actions
- Heartbeat pings every 30 seconds (check Network tab)

### ❌ Issues to Watch For

**"Total Users: 0"**
→ Users not synced from Clerk
→ Solution: Run SQL insert or wait for auto-sync

**"Online Now: 0" even when browsing**
→ Heartbeat not working
→ Check: Browser console for errors, Network tab for fetch requests
→ Verify: UserHeartbeat component is rendering (check React DevTools)

**"Unauthorized" or 401 errors**
→ Not logged in as admin
→ Solution: Login with ecccomedical@gmail.com

**Dashboard doesn't auto-refresh**
→ Check browser console for errors
→ Verify: setInterval is running (check Sources > Snippets)

## 🔧 Troubleshooting

### Heartbeat Not Working

```typescript
// Check if UserHeartbeat is rendering
// In browser console:
window.addEventListener("fetch", (e) => {
  if (e.request.url.includes("/api/heartbeat")) {
    console.log("Heartbeat ping sent!", new Date());
  }
});
```

### Database Connection Issues

```bash
# Test database connection
npx prisma db pull

# If error: "Tenant or user not found"
# This is a Supabase pooling issue for external scripts
# Solution: Use Supabase SQL Editor instead
```

### Check User Count

```sql
-- Run in Supabase SQL Editor
SELECT COUNT(*) as user_count FROM "User";
SELECT * FROM "User" ORDER BY "createdAt" DESC LIMIT 10;
```

## 🚀 Production Verification

After deploying to Vercel:

1. **Check deployment**: https://vercel.com/mwathajeoffrey-dotcom/eccco/deployments
2. **Test dashboard**: https://eccco.vercel.app/admin/dashboard
3. **Login from phone**: Test online detection on mobile
4. **Create new user**: Test webhook auto-sync
5. **Monitor logs**: Check Vercel function logs for errors

## 📝 Summary

**What's Working:**
✅ Heartbeat system implemented
✅ Dashboard API endpoint created
✅ Auto-refresh functionality
✅ Online user detection logic
✅ Webhook ready for new signups

**What Needs Testing:**
🔄 Online user counter with real browsing
🔄 User sync from Clerk to database
🔄 Heartbeat pings every 30 seconds
🔄 Dashboard metrics accuracy

**Next Steps:**

1. Start dev server: `npm run dev`
2. Open dashboard: http://localhost:3000/admin/dashboard
3. Login and browse pages
4. Verify "Online Now" increments
5. Run SQL to sync existing users (if needed)
