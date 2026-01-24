# Clerk Webhook Setup Guide

## Problem
Users are signing up through Clerk but not being added to the Supabase database automatically. This causes a mismatch between Clerk users (4 users) and database users (0 users).

## Solution
Set up a Clerk webhook to automatically sync users to the database when they sign up.

## Setup Steps

### 1. Create Webhook Endpoint (✅ DONE)
Created webhook handler at `/api/webhooks/clerk` that:
- Listens for `user.created`, `user.updated`, and `user.deleted` events
- Automatically creates/updates users in Supabase database
- Verifies webhook signature using Svix

### 2. Configure Clerk Dashboard

1. **Go to Clerk Dashboard:**
   - Visit: https://dashboard.clerk.com
   - Select your ECCCO application

2. **Navigate to Webhooks:**
   - In the sidebar, click **Webhooks**
   - Click **Add Endpoint**

3. **Configure Endpoint:**
   - **Endpoint URL:** `https://eccco.vercel.app/api/webhooks/clerk`
   - **Subscribe to events:**
     - ✅ `user.created`
     - ✅ `user.updated`
     - ✅ `user.deleted`
   - Click **Create**

4. **Copy Webhook Secret:**
   - After creating, Clerk will show you a **Signing Secret**
   - It starts with `whsec_...`
   - **COPY THIS SECRET** - you'll need it next

### 3. Add Webhook Secret to Environment Variables

**Local Development (.env.local):**
```bash
CLERK_WEBHOOK_SECRET=whsec_your_secret_here
```

**Production (Vercel):**
1. Go to: https://vercel.com/your-username/eccco/settings/environment-variables
2. Add new variable:
   - **Name:** `CLERK_WEBHOOK_SECRET`
   - **Value:** `whsec_your_secret_here` (paste from Clerk)
   - **Environments:** Production, Preview, Development
3. Click **Save**
4. **Redeploy** your application for changes to take effect

### 4. Install Required Package

The webhook uses the `svix` package for signature verification:

```bash
npm install svix
```

This is already in your `package.json` as `standardwebhooks`, but we need the `svix` package specifically.

### 5. Sync Existing Users (One-Time)

Since you already have 4 users in Clerk but 0 in the database, you need to sync them manually once:

**Option A: Ask users to re-login** (Easiest)
- When they next login and visit any page, they'll be auto-created
- The existing code in profile/notes routes creates users on-demand

**Option B: Manual sync script** (Faster)
Create a script to sync all Clerk users:

```bash
# I can create this script if needed
```

### 6. Test the Webhook

1. **Deploy the changes:**
   ```bash
   git add .
   git commit -m "feat: Add Clerk webhook for automatic user sync"
   git push origin main
   ```

2. **Test in Clerk Dashboard:**
   - Go to Webhooks → Your endpoint
   - Click **Testing** tab
   - Send a test `user.created` event
   - Check if user appears in your admin dashboard

3. **Test with real signup:**
   - Sign up a new test user
   - Check admin dashboard to see if user count increases immediately

## How It Works

### Before (Current):
```
User signs up → Clerk creates account → User visits app
→ First API call creates user in database (lazy creation)
```

### After (With Webhook):
```
User signs up → Clerk creates account → Webhook fires
→ User instantly created in database → Shows in admin dashboard
```

## Benefits

✅ **Real-time user sync** - Users appear in dashboard immediately after signup
✅ **Accurate metrics** - Admin dashboard shows correct user count
✅ **No delay** - Don't have to wait for user to visit a page
✅ **Reliable** - Webhook ensures all Clerk users are in database

## Troubleshooting

### Webhook not firing:
1. Check Clerk Dashboard → Webhooks → Your endpoint → Logs
2. Verify endpoint URL is correct: `https://eccco.vercel.app/api/webhooks/clerk`
3. Check that events are subscribed: `user.created`, `user.updated`, `user.deleted`

### Webhook failing:
1. Check Vercel logs: `https://vercel.com/your-username/eccco/logs`
2. Verify `CLERK_WEBHOOK_SECRET` is set in Vercel environment variables
3. Check webhook signature is valid (Svix verification)

### Users still not syncing:
1. Verify the webhook endpoint is deployed (check Vercel deployment)
2. Test with Clerk Dashboard test events
3. Check database connection (Supabase is accessible)
4. Review API route logs for errors

## Current Status

- ✅ Webhook endpoint created
- ⏳ Need to configure in Clerk Dashboard
- ⏳ Need to add `CLERK_WEBHOOK_SECRET` to environment variables
- ⏳ Need to install `svix` package
- ⏳ Need to sync existing 4 users

## Next Steps

1. Install svix package: `npm install svix`
2. Follow "Configure Clerk Dashboard" steps above
3. Add webhook secret to Vercel environment variables
4. Deploy changes
5. Test with a new signup
6. Optionally sync existing users

---

**Need help?** Check the Clerk webhook docs: https://clerk.com/docs/integrations/webhooks
