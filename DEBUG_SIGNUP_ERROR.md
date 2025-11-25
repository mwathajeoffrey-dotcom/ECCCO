# Debug: Sign-Up Internal Server Error

**Issue**: Sign-up returns "Internal server error" on production  
**Root Cause**: Database schema mismatch - migration not applied to production database

---

## 🔍 Problem Analysis

### Your Setup
- **Local**: SQLite database (`file:./prisma/dev.db`) ✅ Migration applied
- **Production**: Prisma Accelerate (Postgres) via `ACCELERATE_URL` ❌ Migration NOT applied

### What Happened
1. You ran `npx prisma migrate deploy` locally ✅
2. Local SQLite database got the new schema ✅
3. Production Postgres database (via Accelerate) still has OLD schema ❌
4. Sign-up tries to create user with `role` field → Database rejects it → Error 500

---

## 🎯 Solution: Run Migration on Production Database

### **Option 1: Using Vercel CLI** (Recommended)

```bash
# 1. Install Vercel CLI if needed
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Pull production environment variables
vercel env pull .env.production.local

# 4. Run migration using production database URL
npx prisma migrate deploy
```

**Important**: This will use `ACCELERATE_URL` from your Vercel environment variables.

### **Option 2: Direct Database Connection**

If you have direct Postgres connection string (not Accelerate):

```bash
# Set production DATABASE_URL temporarily
export DATABASE_URL="postgresql://user:password@host:5432/database"

# Run migration
npx prisma migrate deploy

# Unset variable
unset DATABASE_URL
```

### **Option 3: Via Vercel Dashboard Build Hook**

1. Go to Vercel Dashboard → Your Project
2. Settings → Git → Deploy Hooks
3. Create a deploy hook
4. In your `package.json`, add migration to build:
   ```json
   "vercel-build": "prisma generate && prisma migrate deploy && next build"
   ```
5. Commit and push to trigger build with migration

---

## 🔧 Quick Fix: Update Signup Endpoint with Better Error Logging

Let me create an improved version that shows the actual error:

```typescript
// src/app/api/auth/signup/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const { email, password } = signUpSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Generate sessionId
    const sessionId = `user-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        sessionId,
        name: body.name || email.split('@')[0],
        role: 'student',
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    // LOG THE ACTUAL ERROR (important for debugging!)
    console.error('Signup error details:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    
    // In development, return the actual error
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        { 
          message: 'Signup failed',
          error: error instanceof Error ? error.message : 'Unknown error',
          details: error
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
```

---

## 📊 Check Vercel Logs

To see the actual error from production:

```bash
# View recent logs
vercel logs

# Or via dashboard:
# Vercel Dashboard → Your Project → Deployments → Latest → View Function Logs
```

**Look for**: Error messages mentioning `role`, `column does not exist`, or Prisma errors.

---

## ✅ Verification Steps

After running the migration:

### 1. Check Migration Status
```bash
# Using production credentials
vercel env pull .env.vercel
npx prisma migrate status
```

Should show: "Database schema is up to date!"

### 2. Test Database Schema
```bash
# Open Prisma Studio with production database
npx prisma studio
```

Check that `User` model has:
- ✅ `role` field (String)
- ✅ `sessionId` field (String, unique)

### 3. Test Sign-Up
- Visit: `https://your-app.vercel.app/auth/register`
- Try creating account
- Should work! ✅

---

## 🚨 Common Issues

### Issue: "Column 'role' does not exist"
**Cause**: Migration not run on production database  
**Fix**: Run `prisma migrate deploy` with production DATABASE_URL

### Issue: "Environment variable not found: ACCELERATE_URL"
**Cause**: Vercel environment variables not pulled  
**Fix**: Run `vercel env pull` first

### Issue: "Migration failed: Table already exists"
**Cause**: Partial migration or manual schema changes  
**Fix**: Run `npx prisma migrate resolve --applied <migration-name>` then retry

### Issue: "Cannot connect to database"
**Cause**: ACCELERATE_URL is invalid or expired  
**Fix**: 
1. Check `.env` - your Accelerate URL might be expired
2. Go to Prisma Dashboard and get new Accelerate URL
3. Update `ACCELERATE_URL` in Vercel environment variables

---

## 🔑 Environment Variables Checklist

Make sure these exist in Vercel:

```bash
# Required for Prisma
✅ DATABASE_URL or ACCELERATE_URL (Postgres connection)

# Required for NextAuth
✅ NEXTAUTH_SECRET (random string)
✅ NEXTAUTH_URL (your Vercel URL)

# Optional (for Google OAuth)
⏳ GOOGLE_CLIENT_ID
⏳ GOOGLE_CLIENT_SECRET
```

Check them:
```bash
vercel env ls
```

---

## 🎯 Step-by-Step Fix

**Do this RIGHT NOW:**

```bash
# Step 1: Pull production environment variables
vercel env pull .env.production.local

# Step 2: Check if ACCELERATE_URL exists
grep ACCELERATE_URL .env.production.local

# Step 3: Run migration (will use production database)
npx prisma migrate deploy

# Step 4: Verify migration applied
npx prisma migrate status

# Step 5: Test sign-up on your deployed app
# Visit: https://your-app.vercel.app/auth/register
```

---

## 📝 What to Report Back

After trying the fix, tell me:

1. **Output of `vercel env pull`**: Did it succeed?
2. **Output of `npx prisma migrate deploy`**: Any errors?
3. **Output of `npx prisma migrate status`**: Schema up to date?
4. **Sign-up test result**: Still getting error?

If still failing, share:
- Vercel logs (run `vercel logs`)
- Any error messages you see
- Screenshot of the error

---

## 💡 Alternative: Temporary Workaround

If migration is complex, you can temporarily make `role` optional:

```prisma
model User {
  // ... other fields
  role String? @default("student") // Make optional with ?
  // ... rest
}
```

Then:
```bash
npx prisma generate
git add .
git commit -m "Make role optional temporarily"
git push
```

This allows sign-up to work while you fix the migration properly.

---

**Ready to fix this?** Start with Step 1 above! 🚀
