# Deployment Error Troubleshooting Guide

**Date:** December 21, 2025  
**Build Status:** ✅ Passes locally, ❌ Failing on Vercel

---

## 🔍 Common Vercel Build Failures

### 1. **Environment Variables Missing**
**Symptoms:** Database connection errors, Prisma errors
**Fix:**
```bash
# Ensure these are set in Vercel Dashboard → Settings → Environment Variables:
DATABASE_URL=postgresql://...
POSTGRES_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 2. **TypeScript Errors**
**Symptoms:** Type errors during build
**Fix:**
- Already handled - all pages have proper types
- Check Vercel logs for specific line numbers

### 3. **Module Resolution**
**Symptoms:** Cannot find module errors
**Fix:**
```bash
# Ensure all imports use proper paths
# Check that all dependencies are in package.json
npm install
```

### 4. **Prisma Client Generation**
**Symptoms:** Prisma client not found
**Fix:**
Add to `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "next build"
  }
}
```

### 5. **Next.js Config Issues**
**Symptoms:** Build configuration errors
**Current Config:**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // Removed 'standalone' to prevent static export issues
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};
```

---

## 🛠️ Fixed Issues (Already Done)

✅ Empty page files - All created with proper content  
✅ Empty API routes - All have handlers  
✅ Next.js 16 async params - Updated to Promise<>  
✅ Multi-line string literals - Fixed in clinical-cases.ts  
✅ Pre-render errors - Removed useSession from static pages  
✅ TypeScript compilation - No errors  

---

## 📋 Debugging Steps

### Step 1: Check Vercel Logs
Go to Vercel Dashboard → Your Project → Deployments → Click Failed Build → View Logs

Look for:
- `Error:` lines
- `Failed to compile` messages
- Environment variable warnings

### Step 2: Verify Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
- ✅ `DATABASE_URL` is set
- ✅ `POSTGRES_URL` is set  
- ✅ `NEXTAUTH_SECRET` is set
- ✅ `NEXTAUTH_URL` is set

### Step 3: Check Prisma Setup
Ensure `prisma/schema.prisma` exists and is valid:
```bash
npx prisma validate
npx prisma generate
```

### Step 4: Test Build Locally
```bash
# Clean build
rm -rf .next node_modules
npm install
npm run build
```

### Step 5: Check Node Version
Vercel uses Node 18 by default. Check `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 🔧 Quick Fixes to Try

### Fix 1: Add Vercel-Specific Build Command
In `package.json`:
```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

### Fix 2: Disable Output File Tracing
In `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
};
```

### Fix 3: Increase Build Timeout
In Vercel Dashboard → Settings → General:
- Build timeout: 15 minutes (default is 5)

### Fix 4: Use Vercel Postgres Integration
Instead of external database:
1. Go to Vercel Dashboard → Storage → Create Database → Postgres
2. Connect to your project
3. Vercel auto-sets environment variables

---

## 🚨 Most Likely Issues

Based on previous deployments:

### 1. **Prisma Client Not Generated**
**Solution:** Add postinstall script
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### 2. **Missing .env Variables**
**Solution:** Copy from `.env.production` to Vercel:
```bash
# Get your production values
cat .env.production

# Add each one in Vercel Dashboard
```

### 3. **Middleware Warning (Proxy)**
**Current:** We have `middleware.ts` which Next.js warns about
**Solution:** Rename if needed:
```bash
mv middleware.ts proxy.ts
```

---

## 📊 Current Build Status

### Local Build ✅
```bash
✓ Compiled successfully in 26.7s
✓ Generating static pages (84/84)
✓ Build completed
```

### Vercel Build ❌
**Error:** (Pending - need logs to diagnose)

---

## 🎯 Action Items

1. **Share Vercel Error Logs**
   - Screenshot or copy/paste full error from Vercel
   
2. **Verify Environment Variables**
   - Check all DB credentials in Vercel dashboard
   
3. **Check Prisma Migration Status**
   - Ensure database schema matches code

4. **Test with Minimal Config**
   - Temporarily disable middleware
   - Check if that resolves the issue

---

## 💡 Prevention Checklist

For future deployments:

- [ ] Run `npm run build` locally before pushing
- [ ] Check all environment variables are set in Vercel
- [ ] Verify Prisma schema is migrated
- [ ] Test in production mode locally: `npm run start`
- [ ] Check Node version compatibility
- [ ] Review Vercel build logs after each push

---

## 🔗 Useful Commands

```bash
# Local production build
npm run build && npm run start

# Check Prisma status
npx prisma validate
npx prisma generate
npx prisma migrate status

# Clean install
rm -rf .next node_modules package-lock.json
npm install

# Check for TypeScript errors
npx tsc --noEmit

# Test API routes locally
curl http://localhost:3000/api/health
```

---

## 📞 Next Steps

1. **Get Exact Error from Vercel**
   - Go to failed deployment logs
   - Copy the full error message
   
2. **Apply Appropriate Fix**
   - Based on error type from sections above
   
3. **Re-deploy**
   - Push fix to GitHub
   - Vercel auto-deploys

---

**Status:** Awaiting Vercel error logs to diagnose specific issue

**Note:** Build works perfectly locally (84 pages generated successfully), so the issue is likely environment-specific (Vercel configuration, environment variables, or Prisma setup).
