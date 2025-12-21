# Google OAuth Configuration Fix

## Problem
Getting "Error 401: invalid_client" when trying to sign in with Google.

## Root Cause
The **Authorized redirect URIs** in Google Cloud Console don't match what your app is sending.

---

## Solution: Update Google Cloud Console

### Step 1: Open Your OAuth Client

1. Go to: https://console.cloud.google.com/auth/clients?project=shamed-472011
2. Click on **"ECCCO production"** (the blue link)
3. You'll see the edit screen

### Step 2: Find Your Actual Vercel URL

Go to your Vercel dashboard:
- https://vercel.com/mwathajeoffrey-dotcom/eccco

Look for your production deployment URL. It could be:
- `https://eccco.vercel.app` OR
- `https://eccco-something.vercel.app` (with a hash/subdomain)

### Step 3: Update Authorized Redirect URIs

In the Google Cloud Console edit screen, under **"Authorized redirect URIs"**, add these:

**For Production:**
```
https://eccco.vercel.app/api/auth/callback/google
```

**For Local Development:**
```
http://localhost:3000/api/auth/callback/google
```

**If your Vercel URL is different** (e.g., `https://eccco-abc123.vercel.app`), use:
```
https://eccco-abc123.vercel.app/api/auth/callback/google
```

### Step 4: Also Check Authorized JavaScript Origins

Under **"Authorized JavaScript origins"**, make sure you have:

```
https://eccco.vercel.app
http://localhost:3000
```

(Add your actual Vercel URL if different)

### Step 5: Save

Click the **"SAVE"** button at the bottom.

---

## Alternative: Check Your Environment Variables

Make sure these are set correctly in Vercel:

1. Go to: https://vercel.com/mwathajeoffrey-dotcom/eccco/settings/environment-variables

2. Verify you have:
   - `GOOGLE_CLIENT_ID` = `897673089355-e4jsmihesrp4hchumm4kh4td1tl32n1d.apps.googleusercontent.com`
   - `GOOGLE_CLIENT_SECRET` = `G0CSPX-5n9CxnwdzfDQ1lQfdqjFndWtHCQp`
   - `NEXTAUTH_URL` = Your production URL (e.g., `https://eccco.vercel.app`)
   - `NEXTAUTH_SECRET` = (should already exist)

---

## Test After Fix

1. Wait 1-2 minutes for Google to propagate changes
2. Go to: https://eccco.vercel.app
3. Click "Sign In" (top right)
4. Click "Sign in with Google"
5. Should work now! ✅

---

## If Still Not Working

### Test Email/Password Sign Up Instead

1. Go to: https://eccco.vercel.app/auth/signin
2. Click "Sign Up" tab at the top
3. Click "Sign in with Email" button
4. Fill in:
   - Name: Your name
   - Email: Your email
   - Password: At least 6 characters
5. Click "Create Account"
6. Should redirect to /dashboard

This will work immediately since it doesn't need Google OAuth!

---

## What You're Seeing vs What Should Happen

### Current (Error):
```
❌ Click Google Sign In
   → Redirects to Google
   → Error 401: invalid_client
```

### After Fix:
```
✅ Click Google Sign In
   → Redirects to Google
   → Choose account
   → Redirects back to your app
   → Signed in! → Dashboard
```

---

## Quick Summary

**The Issue:** Google doesn't recognize your redirect URI
**The Fix:** Add the correct redirect URI in Google Cloud Console
**The URI:** `https://eccco.vercel.app/api/auth/callback/google`

Go to Google Cloud Console → Edit OAuth Client → Add Redirect URI → Save

Done! 🎉
