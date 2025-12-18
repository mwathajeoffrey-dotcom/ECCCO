# 🔍 Supabase Connection Troubleshooting Guide

## Current Connection String Analysis

Your current DATABASE_URL:
```
postgresql://postgres:Gm%4034078614@db.jvgsawvgdewhcafwlwyj.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1
```

Let me break this down:
- **Username**: `postgres`
- **Password**: `Gm@34078614` (URL encoded as `Gm%4034078614`)
- **Host**: `db.jvgsawvgdewhcafwlwyj.supabase.co`
- **Port**: `6543` (pooler connection)
- **Database**: `postgres`

---

## ⚠️ Common Supabase Connection Issues

### Issue #1: Wrong Connection String Format
Supabase has **3 different connection strings**:
1. **Session mode** (port 5432) - Direct connection
2. **Transaction mode** (port 6543) - For serverless (Prisma, Vercel)
3. **Session pooler** (port 6543) - Different mode

**For Prisma/Vercel, you MUST use Transaction mode on port 6543.**

### Issue #2: Wrong Password
The password might be different from what you think. Let me help you verify.

### Issue #3: Project Paused
Free tier Supabase projects pause after 1 week of inactivity.

### Issue #4: IPv6 Issues
Some networks block IPv6 connections to Supabase.

---

## 🔧 Step-by-Step Fix

### Step 1: Check if Your Supabase Project is Active

1. Go to: https://supabase.com/dashboard/projects
2. Find your project (should have ID: `jvgsawvgdewhcafwlwyj`)
3. Check the status:
   - ✅ **Active** (green dot) → Project is running
   - ⏸️ **Paused** (yellow/orange) → Project is paused
   - ❌ **Deleted** → Project no longer exists

**If Paused:**
- Click **"Restore project"** or **"Resume"**
- Wait 2-3 minutes for it to wake up
- Try connection again

### Step 2: Get the CORRECT Connection String

**Important: The connection string format changed in recent Supabase updates!**

1. In Supabase Dashboard → Select your project
2. Click **Settings** (gear icon) in left sidebar
3. Click **Database** in the settings menu
4. Scroll to **Connection string** section
5. Select **"Transaction"** mode (NOT Session!)
6. Toggle **"Use connection pooling"** to ON
7. Copy the connection string

**New format looks like this:**
```
postgres://postgres.jvgsawvgdewhcafwlwyj:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Old format (might not work anymore):**
```
postgresql://postgres:[YOUR-PASSWORD]@db.jvgsawvgdewhcafwlwyj.supabase.co:6543/postgres
```

**Notice the differences:**
- New: `postgres://` (not `postgresql://`)
- New: `aws-0-[region].pooler.supabase.com`
- Old: `db.jvgsawvgdewhcafwlwyj.supabase.co`

### Step 3: Verify Your Password

Your connection string shows password: `Gm@34078614`

**Questions to verify:**
1. Is this the **database password** you set during project creation?
2. Or is it your **Supabase account password**? (These are different!)
3. Did you reset the database password at any point?

**To check/reset database password:**
1. Supabase Dashboard → Settings → Database
2. Scroll to **Database Password**
3. You can either:
   - View the current password (if you saved it)
   - Or click **"Reset database password"** to set a new one

**Important**: If you reset the password, you'll need to update all connection strings immediately!

### Step 4: URL Encode the Password Properly

If your password has special characters, make sure they're encoded:

| Character | URL Encoded |
|-----------|-------------|
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |
| `^` | `%5E` |
| `&` | `%26` |
| `=` | `%3D` |
| `+` | `%2B` |
| ` ` (space) | `%20` |

Your password `Gm@34078614` → `Gm%4034078614` ✅ (Correctly encoded)

### Step 5: Test Different Connection Formats

Let me create test commands for you to try:

#### Test 1: Direct Connection (Port 5432)
```bash
DATABASE_URL="postgres://postgres:Gm%4034078614@db.jvgsawvgdewhcafwlwyj.supabase.co:5432/postgres" npx prisma db push
```

#### Test 2: Pooler with pgbouncer (Port 6543)
```bash
DATABASE_URL="postgres://postgres:Gm%4034078614@db.jvgsawvgdewhcafwlwyj.supabase.co:6543/postgres?pgbouncer=true" npx prisma db push
```

#### Test 3: New Supabase Format (if region is us-east-1)
```bash
DATABASE_URL="postgres://postgres.jvgsawvgdewhcafwlwyj:Gm%4034078614@aws-0-us-east-1.pooler.supabase.com:6543/postgres" npx prisma db push
```

#### Test 4: With SSL Mode
```bash
DATABASE_URL="postgres://postgres:Gm%4034078614@db.jvgsawvgdewhcafwlwyj.supabase.co:6543/postgres?pgbouncer=true&sslmode=require" npx prisma db push
```

---

## 🎯 Quick Diagnosis Checklist

Copy this and fill it out by checking your Supabase dashboard:

```
[ ] My Supabase project status is: _________ (Active/Paused/Not Found)
[ ] My project region is: _________ (us-east-1, eu-west-1, etc.)
[ ] My database password is: _________ (the one I set, not account password)
[ ] The connection string I copied from dashboard is: _________
[ ] I'm using Transaction mode (not Session): Yes/No
[ ] Connection pooling is enabled: Yes/No
[ ] My project was created: _________ (date - to check if paused)
```

---

## 🔍 Advanced Diagnostics

### Test 1: Can you reach the host?
```bash
# Test if the server is reachable
ping db.jvgsawvgdewhcafwlwyj.supabase.co
```

### Test 2: Can you connect to the port?
```bash
# Test if port is open (requires telnet or nc)
nc -zv db.jvgsawvgdewhcafwlwyj.supabase.co 6543
```

### Test 3: Test with psql (if installed)
```bash
psql "postgres://postgres:Gm%4034078614@db.jvgsawvgdewhcafwlwyj.supabase.co:6543/postgres?pgbouncer=true"
```

---

## 📋 Information I Need From You

To help you fix this, please check your Supabase dashboard and tell me:

1. **Project Status**: Active, Paused, or Can't Find It?
2. **Project Region**: (Settings → General → Region)
3. **Connection String from Dashboard**: 
   - Go to Settings → Database → Connection String
   - Select "Transaction" mode
   - Copy what it shows (replace password with `****`)
4. **When was the project created?**: (To check if it's paused)
5. **Database Password**: Did you set one during creation, or did Supabase generate one?

---

## 🚨 If All Else Fails

### Option A: Create New Supabase Project (15 min)
1. Create a fresh Supabase project
2. Copy the new connection string
3. Should work immediately with no legacy issues

### Option B: Switch to Vercel Postgres (20 min)
1. Faster setup
2. Zero configuration
3. Guaranteed to work with your Vercel deployment

---

## Next Steps

**Tell me the answers to these questions:**

1. What's your project status in Supabase dashboard? (Active/Paused/Not found)
2. Can you copy the connection string exactly as shown in: Settings → Database → Connection String (Transaction mode)?
3. What region is your project in?

Once you provide this info, I'll give you the **exact** connection string to use!
