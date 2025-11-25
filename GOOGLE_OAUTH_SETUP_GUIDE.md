# 🔐 Google OAuth Setup Guide for ECCCO

## Quick Overview
Enable "Sign in with Google" for your ECCCO platform in 3 steps:
1. Create Google Cloud Project
2. Configure OAuth credentials
3. Add environment variables to Vercel

**Time Required**: 10-15 minutes  
**Difficulty**: Easy

---

## Step 1: Create Google Cloud Project

### 1.1 Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 1.2 Create New Project
1. Click "Select a project" at the top
2. Click "NEW PROJECT"
3. Enter project name: `ECCCO Platform`
4. Click "CREATE"

---

## Step 2: Configure OAuth Consent Screen

### 2.1 Navigate to OAuth Consent Screen
1. In left sidebar, go to: **APIs & Services** → **OAuth consent screen**
2. Choose **External** (for public users)
3. Click "CREATE"

### 2.2 Fill in App Information
**Required fields:**
- **App name**: `ECCCO Medical Education Platform`
- **User support email**: Your email address
- **Developer contact email**: Your email address

**Optional but recommended:**
- **App logo**: Upload your ECCCO logo (optional)
- **App domain**: `your-app.vercel.app`
- **Authorized domains**: `vercel.app`

Click "SAVE AND CONTINUE"

### 2.3 Scopes (Step 2)
Click "ADD OR REMOVE SCOPES"

Select these scopes:
- ✅ `.../auth/userinfo.email`
- ✅ `.../auth/userinfo.profile`
- ✅ `openid`

Click "UPDATE" then "SAVE AND CONTINUE"

### 2.4 Test Users (Step 3)
- For development: Add your email as a test user
- For production: Skip this (or keep for testing)

Click "SAVE AND CONTINUE"

### 2.5 Summary (Step 4)
Review and click "BACK TO DASHBOARD"

---

## Step 3: Create OAuth Credentials

### 3.1 Navigate to Credentials
1. In left sidebar, go to: **APIs & Services** → **Credentials**
2. Click "+ CREATE CREDENTIALS" at top
3. Select "OAuth client ID"

### 3.2 Configure OAuth Client
**Application type**: `Web application`

**Name**: `ECCCO Web Client`

**Authorized JavaScript origins**:
```
https://your-app.vercel.app
http://localhost:3000
```

**Authorized redirect URIs**:
```
https://your-app.vercel.app/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

⚠️ **Important**: Replace `your-app.vercel.app` with your actual Vercel domain!

Click "CREATE"

### 3.3 Save Your Credentials
You'll see a popup with:
- **Client ID**: `1234567890-abc...xyz.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-abc...xyz`

**⚠️ SAVE THESE NOW** - You'll need them for environment variables!

---

## Step 4: Add Environment Variables to Vercel

### 4.1 Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### 4.2 Navigate to Your Project Settings
1. Click on your **ECCCO** project
2. Go to **Settings** tab
3. Click **Environment Variables** in sidebar

### 4.3 Add the Following Variables

**Variable 1: GOOGLE_CLIENT_ID**
- **Name**: `GOOGLE_CLIENT_ID`
- **Value**: `<paste your Client ID from Step 3.3>`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

**Variable 2: GOOGLE_CLIENT_SECRET**
- **Name**: `GOOGLE_CLIENT_SECRET`
- **Value**: `<paste your Client Secret from Step 3.3>`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

Click "Save" for each variable.

### 4.4 Verify NEXTAUTH_URL
Make sure you have:
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://your-app.vercel.app`
- Replace with your actual domain!

### 4.5 Verify NEXTAUTH_SECRET
Ensure this is set (should already exist):
- **Name**: `NEXTAUTH_SECRET`
- **Value**: `<your secret from deployment>`

---

## Step 5: Redeploy Your Application

### 5.1 Trigger Redeployment
In Vercel dashboard:
1. Go to **Deployments** tab
2. Find latest deployment
3. Click "..." menu → "Redeploy"

OR simply push a small change to GitHub:
```bash
git commit --allow-empty -m "Trigger redeploy for Google OAuth"
git push origin main
```

### 5.2 Wait for Deployment (2-5 minutes)
Monitor the build in Vercel dashboard.

---

## Step 6: Test Google Sign-In

### 6.1 Visit Your Sign-In Page
```
https://your-app.vercel.app/auth/signin
```

### 6.2 Click "Sign in with Google"
You should see the Google sign-in popup!

### 6.3 Verify Success
- After signing in with Google, you should be redirected to `/dashboard`
- Your profile should show your Google name and email
- Check database to confirm user was created

---

## 🔧 Troubleshooting

### Issue: "Error 400: redirect_uri_mismatch"
**Solution**: 
1. Go back to Google Cloud Console
2. Check your redirect URIs match EXACTLY:
   - `https://your-app.vercel.app/api/auth/callback/google`
3. Make sure there's no trailing slash
4. Wait 5 minutes for Google to propagate changes

### Issue: "Access blocked: This app's request is invalid"
**Solution**:
1. Verify OAuth consent screen is configured
2. Add your email as a test user (if still in testing mode)
3. Publish the app (OAuth Consent Screen → PUBLISH APP)

### Issue: Google button doesn't appear
**Solution**:
1. Check browser console for errors
2. Verify environment variables are set in Vercel
3. Clear browser cache
4. Try incognito mode

### Issue: "Sign in failed" after Google login
**Solution**:
1. Check Vercel logs: `vercel logs`
2. Verify database migration was run: `npx prisma migrate deploy`
3. Check that `Account` and `Session` tables exist in database
4. Verify `NEXTAUTH_SECRET` is set

---

## 🎯 Local Development Setup (Optional)

### For Testing Locally

#### 1. Create `.env.local` file:
```bash
GOOGLE_CLIENT_ID="your-client-id-here"
GOOGLE_CLIENT_SECRET="your-client-secret-here"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
DATABASE_URL="file:./prisma/dev.db"
```

#### 2. Add localhost to Google OAuth:
In Google Cloud Console → Credentials:
- **Authorized JavaScript origins**: `http://localhost:3000`
- **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

#### 3. Test locally:
```bash
npm run dev
```
Visit: http://localhost:3000/auth/signin

---

## 📊 Verification Checklist

After setup, verify:
- [ ] Google button appears on sign-in page
- [ ] Clicking button opens Google sign-in popup
- [ ] After signing in, redirected to dashboard
- [ ] User profile shows Google name/email
- [ ] Can access protected features
- [ ] Sign out and sign back in works
- [ ] Works in incognito mode (fresh session)

---

## 🔒 Security Best Practices

### Production Checklist
- [ ] OAuth consent screen set to "Published" (not "Testing")
- [ ] Remove localhost from authorized origins (production)
- [ ] Only add your actual domain to authorized origins
- [ ] Keep Client Secret secure (never commit to git)
- [ ] Rotate NEXTAUTH_SECRET periodically
- [ ] Enable 2FA on your Google Cloud account
- [ ] Monitor OAuth usage in Google Cloud Console

### Environment Variables Security
- ✅ Store in Vercel (encrypted)
- ✅ Never commit to git
- ✅ Different values for dev/prod
- ✅ Rotate secrets regularly
- ❌ Never share secrets publicly
- ❌ Don't hardcode in source code

---

## 📈 Expected User Flow

### New User (First Time)
1. Clicks "Sign in with Google"
2. Google popup appears
3. User selects Google account
4. User grants permissions (email, profile)
5. Google redirects back to ECCCO
6. **New user account created automatically** in database
7. User redirected to dashboard
8. User can now access all features

### Returning User
1. Clicks "Sign in with Google"
2. Google popup appears (or auto-signs in)
3. User redirected to dashboard
4. Session restored, full access

### What Gets Stored
From Google, ECCCO receives:
- ✅ Email address
- ✅ Full name
- ✅ Profile picture URL
- ❌ No password (Google handles authentication)
- ❌ No other personal data

---

## 🎨 UI Features

### Sign-In Page Shows
- Email/password sign-in form
- **"Sign in with Google" button** (with Google logo)
- Development test account (local only)
- Guest access option
- Benefits of creating account

### Google Button Features
- Google logo and branding
- Loading spinner during authentication
- Error handling with user-friendly messages
- Disabled state while processing

---

## 📞 Support Resources

### Official Documentation
- **Google OAuth**: https://developers.google.com/identity/protocols/oauth2
- **NextAuth.js**: https://next-auth.js.org/providers/google
- **Vercel Environment Variables**: https://vercel.com/docs/environment-variables

### Common Links
- **Google Cloud Console**: https://console.cloud.google.com/
- **Vercel Dashboard**: https://vercel.com/dashboard
- **NextAuth Debug**: Add `debug: true` in auth config (dev only)

---

## 🎉 Benefits for Users

### Why Google Sign-In is Great
1. **Faster**: No password to remember
2. **Secure**: Google's enterprise-grade security
3. **Convenient**: One-click sign-in
4. **Trusted**: Users trust Google authentication
5. **Profile sync**: Name and email auto-filled

### For Your Platform
1. **Higher conversion**: Easier sign-up = more users
2. **Less support**: No password reset emails
3. **Better security**: Google handles 2FA, security
4. **Professional**: Industry-standard OAuth
5. **User trust**: Recognized authentication method

---

## ✅ Summary

**What you've enabled:**
- ✅ Sign in with Google button
- ✅ Automatic user account creation
- ✅ Secure OAuth 2.0 authentication
- ✅ Profile picture sync
- ✅ Email verification (handled by Google)

**What users can do:**
- ✅ Sign in with one click
- ✅ No password to remember
- ✅ Automatic profile setup
- ✅ Access all ECCCO features
- ✅ Secure session management

**Time to complete:** 10-15 minutes  
**Difficulty:** Easy  
**Cost:** Free (Google Cloud free tier)

---

## 🚀 Next Steps

After Google OAuth is working:
1. Test thoroughly with multiple accounts
2. Monitor sign-in analytics in Vercel
3. Consider adding more providers (GitHub, Microsoft, etc.)
4. Set up email notifications for new sign-ups
5. Add user onboarding flow for Google sign-ins

---

**Need help?** Check Vercel logs or Google Cloud Console audit logs for debugging.

**Questions?** All authentication code is in `/src/lib/auth/next-auth.ts`
