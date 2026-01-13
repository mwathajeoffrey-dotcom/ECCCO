# 🔴 DATABASE CONNECTION ERROR - FIX REQUIRED

## **ERROR:** "FATAL: Tenant or user not found"

This means the DATABASE_URL credentials are incorrect or your Supabase project has an issue.

---

## **HOW TO FIX:**

### Step 1: Get Your Current Supabase Connection String

1. **Go to Supabase Dashboard:**
   https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer

2. **Click "Settings" (gear icon on left sidebar)**

3. **Click "Database"**

4. **Scroll down to "Connection String"**

5. **Select "Session pooler" mode**

6. **Copy the connection string** - It should look like:

   ```
   postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

7. **IMPORTANT:** Replace `[YOUR-PASSWORD]` with your actual database password

---

### Step 2: Update Your .env.development.local File

1. **Open:** `/Users/apple/ECCCO/.env.development.local`

2. **Replace the DATABASE_URL line** with your NEW connection string from Supabase

3. **Save the file**

---

### Step 3: Restart Everything

```bash
# Kill server
pkill -9 node

# Clear caches
rm -rf .next node_modules/.prisma

# Regenerate Prisma
npx prisma generate

# Start server
npm run dev
```

---

## **ALTERNATIVE: Check if Supabase Project is Paused**

1. Go to: https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer

2. Look for a banner saying "Project Paused" or "Inactive"

3. If paused, click "Restore" or "Resume Project"

4. Wait 2-3 minutes for project to activate

5. Then try the connection again

---

## **POSSIBLE CAUSES:**

- ✗ Supabase free tier project paused due to inactivity
- ✗ Database password was reset
- ✗ Project was deleted
- ✗ Network/firewall blocking connection
- ✗ Supabase having outages

---

## **QUICK TEST:**

After updating DATABASE_URL, test the connection:

```bash
# Test connection directly
npx prisma db execute --stdin <<< "SELECT 1;"
```

If this works, your connection is good!

---

## **IF SUPABASE PROJECT IS GONE:**

If your Supabase project was deleted/lost, you have 2 options:

### Option A: Create New Supabase Project

1. Create new project at https://supabase.com
2. Get new DATABASE_URL
3. Run migration: `migrate-quiz-arena-FIXED.sql`
4. You'll need to re-import your 1,845 questions

### Option B: Use Local SQLite (Temporary)

1. Change DATABASE_URL to: `file:./prisma/prisma/dev.db`
2. This uses your local 839 questions (less than full set)
3. Works offline but limited question pool

---

**Next Steps:**

1. Check Supabase dashboard for project status
2. Get correct DATABASE_URL
3. Update .env.development.local
4. Restart server
5. Test again

---

**Last Updated:** January 8, 2026
**Status:** ⚠️ BLOCKED - Database credentials need verification
