# Environment Variables to Remove from Vercel

**Date:** December 22, 2025  
**Action:** Clean up Google OAuth and NextAuth environment variables

---

## Steps to Remove from Vercel Dashboard

1. Go to: https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco/settings/environment-variables

2. **Delete these variables:**
   - ❌ `GOOGLE_CLIENT_ID`
   - ❌ `GOOGLE_CLIENT_SECRET`
   - ❌ `NEXTAUTH_SECRET`
   - ❌ `NEXTAUTH_URL`

3. **Keep these variables:**
   - ✅ `DATABASE_URL` - Still need for Prisma Postgres
   - ✅ Any other project-specific variables

---

## Why Remove These?

We're completely removing Google OAuth and NextAuth to start fresh. These environment variables are no longer needed and will cause confusion when we recreate authentication from scratch.

---

## Next Steps

After removing these variables:
1. Redeploy the app (automatic after next commit)
2. Recreate authentication system from scratch
3. Set up new environment variables for new auth system
