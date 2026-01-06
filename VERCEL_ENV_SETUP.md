# Vercel Environment Variables Setup

## 📋 Environment Variables to Add

Add these **TWO** environment variables to your Vercel project:

### 1. ADMIN_USER_IDS

```
user_371H3N8bQ5kWMu1ExtSo5nf48AV
```

### 2. DEVELOPER_USER_IDS

```
user_371H3N8bQ5kWMu1ExtSo5nf48AV
```

---

## 🚀 How to Add to Vercel

### Step-by-Step Instructions:

1. **Go to Vercel Dashboard:**

   - Visit: https://vercel.com
   - Select your **ECCCO** project

2. **Navigate to Settings:**

   - Click **Settings** tab
   - Click **Environment Variables** in the left sidebar

3. **Add First Variable:**

   - Click **Add New** button
   - **Name:** `ADMIN_USER_IDS`
   - **Value:** `user_371H3N8bQ5kWMu1ExtSo5nf48AV`
   - **Environment:** Select **Production**, **Preview**, and **Development**
   - Click **Save**

4. **Add Second Variable:**

   - Click **Add New** button again
   - **Name:** `DEVELOPER_USER_IDS`
   - **Value:** `user_371H3N8bQ5kWMu1ExtSo5nf48AV`
   - **Environment:** Select **Production**, **Preview**, and **Development**
   - Click **Save**

5. **Redeploy:**
   - Go to **Deployments** tab
   - Click the 3 dots (**...**) on the latest deployment
   - Click **Redeploy**
   - ✅ Your production site will now recognize you as admin/developer!

---

## ✅ Testing Locally (Before Vercel)

Your `.env.local` file has been updated! Test your access:

### 1. Visit Admin Dashboard:

**http://localhost:3000/admin/dashboard**

- ✅ You should now have access
- ✅ You should see the admin panel

### 2. Visit User Management:

**http://localhost:3000/admin/users**

- ✅ You should see all users
- ✅ You can export user data

### 3. Visit Guidelines Editor:

**http://localhost:3000/guidelines**

- ✅ You should have developer access
- ✅ No password prompt anymore

### 4. Visit Your Profile:

**http://localhost:3000/profile**

- ✅ Personalize your learning experience
- ✅ Set your specialty and preferences

---

## 🔍 Verification Checklist

Before deploying to Vercel, verify locally:

- [ ] Can access `/admin/dashboard` without errors
- [ ] Can access `/admin/users` and see user list
- [ ] Can access `/guidelines` without password prompt
- [ ] Can access `/profile` and save preferences
- [ ] No "Unauthorized" or "Forbidden" errors

After deploying to Vercel, verify production:

- [ ] Can access production `/admin/dashboard`
- [ ] Can access production `/admin/users`
- [ ] Can access production `/guidelines`
- [ ] Can access production `/profile`

---

## 🎯 Current Setup Status

✅ **Local Environment:**

- User ID: `user_371H3N8bQ5kWMu1ExtSo5nf48AV`
- `.env.local` updated with your user ID
- Dev server restarted with new variables

⏳ **Production Environment:**

- Waiting for you to add variables to Vercel
- Follow steps above to complete setup

---

## 📝 Quick Reference

**Your Clerk User ID:**

```
user_371H3N8bQ5kWMu1ExtSo5nf48AV
```

**Copy-paste for Vercel:**

```
ADMIN_USER_IDS=user_371H3N8bQ5kWMu1ExtSo5nf48AV
DEVELOPER_USER_IDS=user_371H3N8bQ5kWMu1ExtSo5nf48AV
```

---

## 🚨 Security Reminder

- ✅ `.env.local` is in `.gitignore` (never commit it)
- ✅ User ID is safe to add to Vercel
- ✅ Only trusted users should be added to these lists
- ✅ Separate with commas to add multiple admins

---

**Last Updated:** January 3, 2026
**Status:** Ready for Vercel deployment
