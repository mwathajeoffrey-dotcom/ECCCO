# URGENT: Fix "Google Sign In Unidentified" Error

## What "Unidentified" Means
Google is saying: "I don't recognize this OAuth app" because the **OAuth Consent Screen** isn't configured properly.

## Quick Fix (5 Minutes)

### Step 1: Configure OAuth Consent Screen
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. If you see "OAuth consent screen" setup:
   - Click **EDIT APP**
   - Make sure these are filled in:
     - **App name**: ECCCO Medical
     - **User support email**: YOUR_EMAIL
     - **Developer contact**: YOUR_EMAIL
   - Click **SAVE AND CONTINUE**

3. **Scopes** page:
   - Click **ADD OR REMOVE SCOPES**
   - Select: `userinfo.email` and `userinfo.profile`
   - Click **UPDATE**
   - Click **SAVE AND CONTINUE**

4. **Test users** page (CRITICAL!):
   - Click **ADD USERS**
   - Add your email: YOUR_EMAIL
   - Add any other emails you want to test
   - Click **SAVE**
   - Click **SAVE AND CONTINUE**

5. Click **BACK TO DASHBOARD**

### Step 2: Verify Redirect URI
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth 2.0 Client
3. Under **Authorized redirect URIs**, make sure you have EXACTLY:
   ```
   https://eccco.vercel.app/api/auth/callback/google
   ```
   (No trailing slash, exact match!)

4. Click **SAVE**

### Step 3: Test Again
1. Go to https://eccco.vercel.app/auth/signin
2. Click "Continue with Google"
3. You might see "Google hasn't verified this app" - this is NORMAL
4. Click **Continue** or **Advanced** > **Go to ECCCO (unsafe)**
5. Sign in should work!

## Why You See "Unverified App" Warning

This is NORMAL for development apps! To remove it completely, you need to:
1. Publish the app (takes 1-2 weeks for Google review)
2. Add privacy policy & terms of service
3. Submit for verification

**For now**: Just click "Continue" - the app works fine!

## Current Google OAuth Client ID

You're using: `897673089355-e4jsmihesrp4hchumm4kh4td1tl32n1d.apps.googleusercontent.com`

This is already configured in Vercel. Just make sure the **OAuth consent screen** and **test users** are set up in Google Cloud Console.

## Test It

After making these changes, try again:
1. https://eccco.vercel.app/auth/signin
2. Click "Continue with Google"
3. Should redirect to Google OAuth (might show "unverified" but will work)
4. Click "Continue" 
5. Select your Google account
6. Should redirect back and sign you in! ✅
