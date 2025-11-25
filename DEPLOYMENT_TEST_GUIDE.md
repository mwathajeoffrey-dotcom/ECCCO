# Deployment Testing & Google OAuth Setup Guide

**Created**: November 25, 2025  
**Status**: Post-deployment testing phase  
**Latest Commit**: c259ba2 - "Deploy: Add live quiz features + infrastructure improvements"

---

## 🎯 Current Status

✅ **Code Deployed**: Pushed to GitHub (commit c259ba2)  
✅ **Database Migration**: Completed locally (`npx prisma migrate deploy`)  
✅ **Vercel Build**: Should be complete or building  
⏳ **Testing**: Need to verify everything works  
⏳ **Google OAuth**: Need to set up credentials  

---

## 📋 Step-by-Step Testing Plan

### **Step 1: Find Your Vercel URL** (1 minute)

You need to know your deployed URL. Get it from:

**Option A - Vercel Dashboard**:
1. Go to: https://vercel.com/dashboard
2. Find your ECCCO project
3. Click on it
4. Look for the domain (e.g., `eccco-123abc.vercel.app`)
5. Copy the full URL

**Option B - Vercel CLI** (if you have it installed):
```bash
vercel ls
```

**Write your URL here for reference:**
```
https://__________________.vercel.app
```

---

### **Step 2: Check Vercel Build Status** (2 minutes)

Before testing, ensure the build completed successfully:

1. Go to Vercel Dashboard → Your Project
2. Click "Deployments" tab
3. Check the latest deployment (commit c259ba2)
4. Status should be: ✅ **Ready** (not "Building" or "Error")

**If status is "Error"**:
- Click on the deployment to see logs
- Look for the error message
- Common issues: Environment variables missing, build failures
- Contact me with the error if needed

---

### **Step 3: Run Database Migration on Vercel** (2 minutes)

⚠️ **IMPORTANT**: You ran the migration locally, but Vercel needs it too!

**Option A - Using Vercel CLI** (Recommended):
```bash
# Install Vercel CLI if you don't have it
npm i -g vercel

# Login to Vercel
vercel login

# Run migration on production database
vercel env pull .env.vercel
DATABASE_URL=$(grep DATABASE_URL .env.vercel | cut -d '=' -f2-) npx prisma migrate deploy
```

**Option B - Using Vercel Dashboard**:
1. Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
2. Check if `DATABASE_URL` is set
3. If not, add it (should point to your production database)
4. Then redeploy to trigger migrations

**Option C - Manual via Terminal** (if you have direct database access):
```bash
# Set your production DATABASE_URL temporarily
export DATABASE_URL="your-production-database-url"
npx prisma migrate deploy
```

---

### **Step 4: Test Email/Password Sign-Up** (5 minutes)

Now let's test if the sign-up error is fixed!

1. **Visit Sign-Up Page**:
   ```
   https://your-app.vercel.app/auth/register
   ```

2. **Create Test Account**:
   - Email: `test@example.com` (or your real email)
   - Password: `TestPassword123!`
   - Click "Sign Up" or "Create Account"

3. **Expected Result**:
   - ✅ Success message
   - ✅ Redirected to dashboard
   - ✅ User is signed in

4. **If you see "Internal Server Error"**:
   - Database migration may not have run on Vercel
   - Check Vercel logs: `vercel logs` or Dashboard → Deployments → View Logs
   - Verify `DATABASE_URL` environment variable exists in Vercel
   - Try Step 3 again (run migration on Vercel)

---

### **Step 5: Test Email/Password Sign-In** (2 minutes)

Test that existing account sign-in works:

1. **Sign Out** (if signed in from Step 4)

2. **Visit Sign-In Page**:
   ```
   https://your-app.vercel.app/auth/signin
   ```

3. **Sign In**:
   - Email: `test@example.com`
   - Password: `TestPassword123!`
   - Click "Sign In"

4. **Expected Result**:
   - ✅ Successfully signed in
   - ✅ Redirected to dashboard
   - ✅ Your name/email displayed

---

### **Step 6: Test Guest Access** (2 minutes)

Verify guest mode still works:

1. Visit: `https://your-app.vercel.app/auth/signin`
2. Click "Continue as Guest" button
3. **Expected**: Redirected to limited dashboard

---

### **Step 7: Test Existing Features** (10 minutes)

Make sure nothing broke with the deployment:

- [ ] **Dashboard loads**: Visit `/dashboard`
- [ ] **Question Bank**: Browse questions, view details
- [ ] **Practice Mode**: Start practice session, answer questions
- [ ] **Exam Mode**: Start exam, submit answers
- [ ] **Analytics**: View progress charts
- [ ] **Profile**: Update user settings
- [ ] **Navigation**: All links work

**If anything fails**:
- Check browser console for errors (F12 → Console tab)
- Check Vercel logs
- Note the specific feature that failed

---

## 🔐 Google OAuth Setup (10-15 minutes)

Now let's enable "Sign in with Google"!

### **Step 1: Google Cloud Console Setup** (7 minutes)

1. **Create Google Cloud Project**:
   - Go to: https://console.cloud.google.com/
   - Click "Select a project" → "New Project"
   - Name: `ECCCO Platform` (or any name)
   - Click "Create"

2. **Enable OAuth Consent Screen**:
   - Go to: APIs & Services → OAuth consent screen
   - Select: **External** (for public access)
   - Click "Create"
   
   **Fill in required fields**:
   - App name: `ECCCO Platform`
   - User support email: Your email
   - Developer contact: Your email
   - Click "Save and Continue"
   
   **Scopes** (Step 2):
   - Click "Add or Remove Scopes"
   - Select these scopes:
     - ✅ `userinfo.email`
     - ✅ `userinfo.profile`
     - ✅ `openid`
   - Click "Update" → "Save and Continue"
   
   **Test Users** (Step 3):
   - Add your email as test user (for testing)
   - Click "Save and Continue"
   
   **Summary** (Step 4):
   - Review and click "Back to Dashboard"

3. **Create OAuth Credentials**:
   - Go to: APIs & Services → Credentials
   - Click "+ Create Credentials" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `ECCCO Web Client`
   
   **Authorized JavaScript origins**:
   ```
   https://your-app.vercel.app
   ```
   *(Replace with YOUR actual Vercel URL!)*
   
   **Authorized redirect URIs**:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
   *(Must match exactly - no trailing slash!)*
   
   - Click "Create"
   
4. **Copy Credentials**:
   - You'll see a popup with:
     - **Client ID**: `123456789-abc...apps.googleusercontent.com`
     - **Client Secret**: `GOCSPX-...`
   - Copy both (keep them safe!)

### **Step 2: Add to Vercel** (3 minutes)

1. **Go to Vercel Dashboard**:
   - https://vercel.com/dashboard
   - Select your ECCCO project
   - Go to: Settings → Environment Variables

2. **Add Two Variables**:

   **Variable 1**:
   - Name: `GOOGLE_CLIENT_ID`
   - Value: (paste Client ID from Google Console)
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"
   
   **Variable 2**:
   - Name: `GOOGLE_CLIENT_SECRET`
   - Value: (paste Client Secret from Google Console)
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

3. **Important**: Also check these variables exist:
   - `NEXTAUTH_SECRET` (should be a random string)
   - `NEXTAUTH_URL` (should be your Vercel URL)
   - `DATABASE_URL` (your database connection string)

### **Step 3: Redeploy** (2 minutes)

Environment variables don't apply until you redeploy!

**Option A - Git Push**:
```bash
# Create empty commit to trigger redeploy
git commit --allow-empty -m "Enable Google OAuth"
git push origin main
```

**Option B - Vercel Dashboard**:
1. Go to: Deployments tab
2. Click the three dots ⋯ on latest deployment
3. Click "Redeploy"
4. Confirm

**Wait**: 2-3 minutes for build to complete

### **Step 4: Test Google Sign-In** (3 minutes)

1. **Visit Sign-In Page**:
   ```
   https://your-app.vercel.app/auth/signin
   ```

2. **You Should See**:
   - ✅ "Sign in with Google" button
   - ✅ Google logo
   - ✅ Professional appearance

3. **Click "Sign in with Google"**:
   - Choose your Google account
   - Grant permissions (email, profile)
   - Should redirect back to your app
   - **Expected**: Signed in successfully!

4. **Verify**:
   - Check you're signed in
   - Profile picture from Google should appear
   - Name from Google account should show

---

## 🐛 Troubleshooting

### Sign-Up Error: "Internal Server Error"

**Causes**:
- Database migration not run on production
- `DATABASE_URL` not set in Vercel
- Database connection failed

**Fix**:
```bash
# Check Vercel logs
vercel logs --output production

# Run migration on production
vercel env pull .env.vercel
DATABASE_URL=$(grep DATABASE_URL .env.vercel | cut -d '=' -f2-) npx prisma migrate deploy
```

### Google OAuth Error: "redirect_uri_mismatch"

**Cause**: Redirect URI doesn't match Google Console configuration

**Fix**:
1. Go to Google Console → Credentials
2. Edit your OAuth client
3. Verify redirect URI is exactly:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
4. No trailing slash!
5. Replace `your-app` with your actual Vercel subdomain

### Google OAuth: Button Doesn't Appear

**Causes**:
- Environment variables not set
- Didn't redeploy after adding variables
- Still using dummy credentials

**Fix**:
1. Check Vercel environment variables exist:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
2. Redeploy (git push or Vercel dashboard)
3. Clear browser cache (Cmd+Shift+R on Mac)

### Google OAuth: "Access blocked: This app's request is invalid"

**Cause**: OAuth consent screen not configured

**Fix**:
1. Go to Google Console → OAuth consent screen
2. Complete all required fields
3. Add scopes: `userinfo.email`, `userinfo.profile`, `openid`
4. Add yourself as test user
5. Status should be "Testing" (not "In production")

### Vercel Build Failed

**Causes**:
- TypeScript errors
- Missing dependencies
- Environment variable issues

**Fix**:
1. Check build logs in Vercel Dashboard
2. Run locally: `npm run build`
3. Fix any errors shown
4. Commit and push fixes

---

## 📊 Success Checklist

### Basic Authentication
- [ ] Email/password sign-up works (no internal error)
- [ ] Email/password sign-in works
- [ ] User session persists after refresh
- [ ] Sign-out works
- [ ] Guest access works

### Google OAuth
- [ ] "Sign in with Google" button appears
- [ ] Google authentication flow works
- [ ] User account created automatically
- [ ] Profile picture synced from Google
- [ ] Name synced from Google
- [ ] Can sign out and sign in again

### Existing Features
- [ ] Dashboard loads
- [ ] Question bank accessible
- [ ] Practice mode works
- [ ] Exam mode works
- [ ] Analytics display
- [ ] All navigation links work
- [ ] No console errors

### Performance
- [ ] Pages load quickly (< 3 seconds)
- [ ] No visible lag
- [ ] Images load properly
- [ ] Smooth animations

---

## 📝 Notes & Commands

### Useful Commands

```bash
# Check Vercel logs
vercel logs

# Check deployment status
vercel ls

# Pull environment variables
vercel env pull

# Run migration on production
DATABASE_URL="your-url" npx prisma migrate deploy

# Check local migration status
npx prisma migrate status

# Test build locally
npm run build

# Check for TypeScript errors
npm run type-check
```

### Important URLs

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Google Console**: https://console.cloud.google.com/
- **Your Deployed App**: `https://____________.vercel.app`
- **Sign-In Page**: `https://____________.vercel.app/auth/signin`
- **Sign-Up Page**: `https://____________.vercel.app/auth/register`
- **Dashboard**: `https://____________.vercel.app/dashboard`

---

## 🎯 What to Report Back

After completing the tests, let me know:

1. **Vercel URL**: What's your deployed URL?
2. **Sign-Up Test**: ✅ Works or ❌ Failed (with error)
3. **Sign-In Test**: ✅ Works or ❌ Failed (with error)
4. **Google OAuth**: ✅ Completed setup, ⏳ Working on it, or ❓ Need help
5. **Any Issues**: Share error messages, screenshots, or logs

---

## 🚀 Next Steps After Testing

Once everything works:

1. **Monitor Performance**: Check Vercel Analytics
2. **Test on Mobile**: Verify responsive design
3. **Complete Live Quiz**: Continue with JOIN page implementation
4. **Consider Additional OAuth**: GitHub, Microsoft, etc.
5. **User Onboarding**: Improve first-time user experience
6. **Documentation**: Update user-facing docs

---

**Need help at any step?** Just let me know where you're stuck!

**Ready to start?** Begin with Step 1 (Find Your Vercel URL) 👆
