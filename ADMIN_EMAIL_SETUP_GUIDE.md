# 🔐 Admin Email Setup Guide

## Professional Email: `ecccomedical@gmail.com`

This guide will help you set up the professional ECCCO admin email across all platforms.

---

## ✅ **Step 1: Local Environment** (COMPLETED)

Updated `.env.local`:

```env
ADMIN_EMAILS=ecccomedical@gmail.com
```

---

## 🚀 **Step 2: Update Vercel Environment Variables**

### Instructions:

1. **Go to Vercel Dashboard:**

   - Navigate to: https://vercel.com/mwathajeoffrey-dotcom/eccco/settings/environment-variables

2. **Add New Environment Variable:**

   - Click **"Add New"**
   - **Key:** `ADMIN_EMAILS`
   - **Value:** `ecccomedical@gmail.com`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

3. **Redeploy:**
   - Go to: https://vercel.com/mwathajeoffrey-dotcom/eccco
   - Click **"Redeploy"** or make a git push to trigger deployment

---

## 👤 **Step 3: Set Up Clerk Account with ecccomedical@gmail.com**

### Option A: Create New Clerk Account (Recommended)

1. **Sign up to Clerk with ecccomedical@gmail.com:**

   - Go to: https://dashboard.clerk.com/sign-up
   - Use email: `ecccomedical@gmail.com`
   - Verify the email

2. **Sign in to your ECCCO app:**

   - Visit: https://eccco.vercel.app
   - Click "Sign In"
   - Sign in with `ecccomedical@gmail.com`
   - Complete profile setup

3. **Test Admin Access:**
   - Visit: https://eccco.vercel.app/admin/dashboard
   - You should now see the dashboard without errors! ✅

### Option B: Add as Secondary Email (Alternative)

If you want to keep your personal account but add ecccomedical:

1. **Go to Clerk User Profile:**

   - Visit: https://eccco.vercel.app/profile (or user settings)

2. **Add Secondary Email:**

   - Add `ecccomedical@gmail.com` as secondary email
   - Verify it

3. **Update ADMIN_EMAILS to include both:**
   ```env
   ADMIN_EMAILS=ecccomedical@gmail.com,mwathajeoffrey@gmail.com
   ```

---

## 📧 **Step 4: Update Other Services**

### Sentry (Error Tracking)

- Go to: https://sentry.io/settings/eccco/
- Update notification email to `ecccomedical@gmail.com`

### Supabase (Database)

- Go to: https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer/settings/general
- Add `ecccomedical@gmail.com` as project member (if needed)

### GitHub Repository

- Consider adding `ecccomedical@gmail.com` as collaborator
- Update repository email notifications

---

## 🎯 **Step 5: Test Everything**

### Local Testing:

```bash
# Restart dev server to pick up new env vars
cd /Users/apple/ECCCO
# Kill existing dev server (Ctrl+C)
npm run dev
```

### Test Admin Dashboard:

1. Sign in with `ecccomedical@gmail.com`
2. Visit: http://localhost:3000/admin/dashboard
3. Should see dashboard stats without errors ✅

### Production Testing:

1. Deploy to Vercel (after adding env var)
2. Sign in with `ecccomedical@gmail.com`
3. Visit: https://eccco.vercel.app/admin/dashboard
4. Verify stats load correctly ✅

---

## 🔒 **Security Best Practices**

### 1. **Enable 2FA on Gmail**

- Go to: https://myaccount.google.com/security
- Enable Two-Factor Authentication
- Save backup codes securely

### 2. **Enable 2FA on Clerk**

- Configure in Clerk Dashboard
- Require 2FA for admin accounts

### 3. **Secure Environment Variables**

- Never commit `.env.local` to git (already in `.gitignore`)
- Store backup of env vars securely (password manager)
- Rotate API keys periodically

### 4. **Access Control**

- Only add trusted emails to `ADMIN_EMAILS`
- Use comma-separated list for multiple admins:
  ```env
  ADMIN_EMAILS=ecccomedical@gmail.com,admin2@eccco.app
  ```

---

## 📋 **Checklist**

- [x] Updated `.env.local` with `ecccomedical@gmail.com`
- [ ] Added `ADMIN_EMAILS` to Vercel environment variables
- [ ] Created/signed in with `ecccomedical@gmail.com` on Clerk
- [ ] Redeployed Vercel app
- [ ] Tested admin dashboard locally
- [ ] Tested admin dashboard in production
- [ ] Updated Sentry notification email
- [ ] Enabled 2FA on Gmail
- [ ] Documented admin email in team docs

---

## 🐛 **Troubleshooting**

### Issue: "Failed to fetch stats" error

**Solution:**

1. Verify `ADMIN_EMAILS` is set in Vercel
2. Redeploy the app
3. Sign in with `ecccomedical@gmail.com`
4. Clear browser cache and try again

### Issue: Still shows "Unauthorized"

**Solution:**

1. Check that email matches exactly: `ecccomedical@gmail.com`
2. Verify you're signed in to Clerk with that email
3. Check Vercel logs: `vercel logs eccco`

### Issue: Environment variable not updating

**Solution:**

1. After adding env var in Vercel, must redeploy
2. Or click "Redeploy" on latest deployment
3. Wait 1-2 minutes for propagation

---

## 📞 **Support**

For questions or issues:

- **Email:** ecccomedical@gmail.com
- **GitHub Issues:** https://github.com/mwathajeoffrey-dotcom/ECCCO/issues

---

## 🎉 **Next Steps After Setup**

Once everything is working:

1. **Update documentation** to reference `ecccomedical@gmail.com`
2. **Add to footer/contact info** in the app
3. **Set up email signatures** for professional communication
4. **Create standard responses** for common support queries
5. **Consider setting up email forwarding** to personal email for notifications

---

## 🚀 **Future Enhancements**

### Custom Domain Email (Optional)

When you get `eccco.app` or `eccco.com` domain:

1. **Set up Google Workspace** or **Zoho Mail**
2. **Create:** `admin@eccco.app`, `support@eccco.app`
3. **Update all environment variables**
4. **Migrate from Gmail to custom domain**

### Multiple Admin Support

```env
ADMIN_EMAILS=ecccomedical@gmail.com,admin@eccco.app,support@eccco.app
```

---

**Last Updated:** January 24, 2026
**Status:** Ready for deployment ✅
