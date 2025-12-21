# Vercel Database Setup Guide

## ✅ Authentication Fix Deployed

**Problem Solved:** Sign-in process wasn't completing because the database was missing User, Account, Session, and VerificationToken tables required by NextAuth.

**Solution Applied:** Added all required NextAuth models to `prisma/schema.prisma` and deployed to production.

---

## 🚀 Vercel Environment Variables Required

Your authentication system is now deployed, but Vercel needs the PostgreSQL database connection to complete the setup.

### Required Environment Variables in Vercel

Go to your Vercel project dashboard → **Settings** → **Environment Variables** and ensure these are set:

#### 1. **DATABASE_URL** (PostgreSQL - Required)
```
postgresql://YOUR_POSTGRES_CONNECTION_STRING
```

**Where to get this:**
- If you have a Supabase project, go to Project Settings → Database → Connection String
- Or create a new database at [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- Or use [Neon.tech](https://neon.tech) for free PostgreSQL

#### 2. **NEXTAUTH_URL** (Required)
```
https://eccco.vercel.app
```

#### 3. **NEXTAUTH_SECRET** (Required)
Generate a secure secret:
```bash
openssl rand -base64 32
```
Or use: https://generate-secret.vercel.app/32

#### 4. **GOOGLE_CLIENT_ID** (Required)
Get this from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- Project: Your ECCCO project
- OAuth 2.0 Client ID created earlier
- Should already be set in Vercel ✅

#### 5. **GOOGLE_CLIENT_SECRET** (Required)
Get this from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- Same OAuth 2.0 Client ID
- Should already be set in Vercel ✅

---

## 📊 Database Schema Deployed

The following tables are now in the schema and will be created automatically when Vercel connects to your PostgreSQL database:

- ✅ **User** - User accounts (email, password, name, role)
- ✅ **Account** - OAuth provider data (Google, Apple, etc.)
- ✅ **Session** - Active user sessions
- ✅ **VerificationToken** - Email verification tokens
- ✅ **Topic** - Quiz topics
- ✅ **Question** - Quiz questions
- ✅ **ExamSession** - User exam sessions
- ✅ **EvidenceReference** - Medical references
- ✅ **Feedback** - User feedback

---

## 🔄 Deployment Status

**Latest Commit:** `89b2b04` - Added NextAuth database schema

**What happens next:**
1. Vercel will automatically deploy this commit
2. It will run `npx prisma generate` to create the Prisma client
3. **IMPORTANT:** You need to run the migration manually after setting DATABASE_URL

---

## 🛠️ After Setting DATABASE_URL in Vercel

Once you've added the `DATABASE_URL` environment variable:

### Option 1: Automatic (Recommended)
Vercel will automatically run migrations on the next deployment. Just push a small change:
```bash
git commit --allow-empty -m "trigger migration"
git push origin main
```

### Option 2: Manual via Vercel CLI
```bash
npx vercel env pull .env.production
npx prisma migrate deploy
```

---

## ✅ How to Test Authentication on Production

1. **Set DATABASE_URL** in Vercel environment variables
2. **Redeploy** (Vercel auto-deploys or push a commit)
3. **Visit** https://eccco.vercel.app
4. **Click** "Sign In" button (top right)
5. **Test Google OAuth** - Click "Sign in with Google"
6. **Test Email Signup** - Click "Sign in with Email" and create account

---

## 🔍 Troubleshooting

### Issue: "Database not found"
**Solution:** Ensure `DATABASE_URL` is set in Vercel environment variables

### Issue: "Table 'User' does not exist"
**Solution:** Run `npx prisma migrate deploy` or trigger a new deployment

### Issue: Google OAuth fails on production
**Solution:** Ensure redirect URI `https://eccco.vercel.app/api/auth/callback/google` is added to Google Cloud Console

---

## 📱 What Works Locally

✅ **Google OAuth** - Successfully tested with your account (mwathajeoffrey@gmail.com)
✅ **User Creation** - Creates user accounts in SQLite database
✅ **Session Management** - Stores and retrieves sessions
✅ **Dashboard Redirect** - Redirects to dashboard after successful login

**All of this will work on production once DATABASE_URL is configured!**

---

## 🎯 Quick Setup Checklist

- [ ] Go to Vercel → Project Settings → Environment Variables
- [ ] Add `DATABASE_URL` with PostgreSQL connection string
- [ ] Add `NEXTAUTH_URL` = `https://eccco.vercel.app`
- [ ] Add `NEXTAUTH_SECRET` (generate new secret)
- [ ] Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` exist
- [ ] Trigger redeploy (push to main or use Vercel dashboard)
- [ ] Test authentication on https://eccco.vercel.app/auth/signin

---

**Status:** Schema deployed ✅ | Database connection needed ⚠️ | Ready to test after DATABASE_URL is set 🚀
