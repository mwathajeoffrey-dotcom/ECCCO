# 🚨 CRITICAL SECURITY FIXES - Action Plan

**Date**: January 21, 2026  
**Severity**: HIGH  
**Timeline**: IMMEDIATE (API key expires Jan 24, 2026)

---

## Issue 1: Groq API Key Exposed ⚠️

### What Happened
- API key was accidentally committed to GitHub repository
- GitHub secret scanning detected and reported to Groq
- Groq will disable key on **Saturday, January 24, 2026 at 08:08 UTC**
- We have **~72 hours** to fix this

### Impact
- ❌ Evidence search will stop working after Jan 24
- ❌ AI synthesis will fail
- ❌ Drug search will fail
- ❌ All AI-powered features broken

### ✅ IMMEDIATE FIX (10 minutes)

#### Step 1: Create New Groq API Key (2 minutes)

1. **Go to Groq Console**: https://console.groq.com/keys

2. **Create New Key**:
   - Click "Create API Key"
   - Name: `ECCCO Evidence Search v2 - Secure`
   - Click "Create"
   - **COPY THE KEY IMMEDIATELY** (you can only see it once!)

3. **Save to Local Environment**:
   ```bash
   # Open .env.local
   nano /Users/apple/ECCCO/.env.local
   
   # Replace line 13:
   # OLD: GROQ_API_KEY=gsk_****C3te (the exposed old key)
   # NEW: GROQ_API_KEY=your_new_key_here (from Groq console)
   
   # Save: Ctrl+O, Enter, Ctrl+X
   ```

#### Step 2: Update Vercel (3 minutes)

1. **You're already on the right page!** ✅
   - Current URL: vercel.com/mwathajeoffrey-dotcoms-projects/eccco/settings/environment-variables

2. **Find `GROQ_API_KEY`** (I can see it in your screenshot)

3. **Click the three dots (•••)** on the right

4. **Select "Edit"**

5. **Replace with new key**:
   - Paste the new key from Step 1
   - Keep all 3 environments checked (Production, Preview, Development)
   - Click "Save"

6. **Vercel will auto-redeploy** (takes 2-3 minutes)

#### Step 3: Verify Old Key is Revoked (1 minute)

1. **Go back to Groq Console**: https://console.groq.com/keys

2. **Find old key**: `ECCCO Evidence Search` (ends in `C3te`)

3. **Click "Delete" or "Revoke"**:
   - This prevents unauthorized use
   - Better to revoke ourselves than wait for Groq

#### Step 4: Test New Key Works (2 minutes)

```bash
# Test locally first
cd /Users/apple/ECCCO
npm run dev

# Open browser: http://localhost:3000/evidence-search
# Search: "management of septic shock"
# Should see: Full AI synthesis with journal links
```

#### Step 5: Clean Git History (2 minutes)

The exposed key is in these commits:
- `b380c87` - URGENT_FIX_AI_SYNTHESIS.md (amended, but still in history)
- `3691234` - QUICK_FIX_CHECKLIST.md (amended to c3c665d)

**DON'T REWRITE HISTORY** (already pushed to main, would break collaborators)

Instead, verify the files are clean:
```bash
cd /Users/apple/ECCCO
grep -r "gsk_XsXt" . --exclude-dir=.git --exclude=.env.local
# Should return: NOTHING or only .env.local
```

If any files still contain the old key, remove it immediately.

---

## Issue 2: Supabase Security Warnings ⚠️

### What Happened
- 18 security errors detected
- Report created: January 18, 2026
- Weekly reminder emails being sent

### Likely Issues (based on common patterns)

1. **Row Level Security (RLS) Not Enabled**
   - Tables without RLS policies
   - Public access to sensitive data

2. **Weak Authentication Rules**
   - Missing auth checks
   - Public endpoints

3. **Exposed Database Credentials**
   - Connection strings in public repos
   - API keys not rotated

### ✅ FIX PLAN (30 minutes)

#### Step 1: Check Security Advisor (5 minutes)

1. **Open Supabase Dashboard**: https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer

2. **Go to Security Advisor**:
   - Click "View Security Advisor" in email
   - Or: Dashboard → Project Settings → Security

3. **Review all 18 errors**:
   - Take screenshots
   - Note which tables/policies are affected

#### Step 2: Enable RLS on All Tables (10 minutes)

We have an RLS migration file already: `enable-rls-security.sql`

```bash
cd /Users/apple/ECCCO

# Review the RLS file
cat enable-rls-security.sql

# Apply to database (if not already done)
# Option A: Via Supabase Dashboard
# - Go to SQL Editor
# - Paste contents of enable-rls-security.sql
# - Run

# Option B: Via command line (if you have supabase CLI)
supabase db push
```



Your database URL is also in `.env.local` and might be exposed:

```
DATABASE_URL="postgresql://postgres.xxx:password_redacted@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**To rotate**:
1. Go to: https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer/settings/database
2. Click "Reset Database Password"
3. Copy new password
4. Update `.env.local` with new connection string
5. Update Vercel environment variable `DATABASE_URL`

#### Step 5: Run Security Scan Again (5 minutes)

After fixes:
1. Go to Supabase Security Advisor
2. Click "Re-scan" or "Refresh"
3. Verify: 18 errors → 0 errors ✅

---

## Issue 3: Prevent Future Exposures 🛡️

### Git Secrets Prevention

Install git-secrets to prevent committing keys:

```bash
# Install git-secrets (macOS)
brew install git-secrets

# Initialize in repo
cd /Users/apple/ECCCO
git secrets --install
git secrets --register-aws

# Add patterns for our keys
git secrets --add 'gsk_[a-zA-Z0-9]{50,}'  # Groq keys
git secrets --add 'sk_test_[a-zA-Z0-9]{24,}'  # Clerk secret keys
git secrets --add 'postgres\.[a-z]+:[a-zA-Z0-9]+'  # Supabase passwords

# Test
git secrets --scan
```

### Environment Variable Best Practices

1. **Never commit actual values**:
   ```bash
   # Create .env.example (safe to commit)
   cat > .env.example << 'EOF'
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   
   # Database
   DATABASE_URL=postgresql://postgres.xxx:password@xxx.supabase.com:6543/postgres
   
   # Groq AI
   GROQ_API_KEY=gsk_your_key_here
   
   # Redis
   REDIS_URL=redis://default:password@xxx.redislabs.com:11940
   
   # Sentry
   NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.us.sentry.io/xxx
   SENTRY_AUTH_TOKEN=sntryu_your_token_here
   EOF
   ```

2. **Keep .env.local in .gitignore**:
   ```bash
   echo ".env.local" >> .gitignore
   echo ".env*.local" >> .gitignore
   ```

3. **Use environment-specific files**:
   - `.env.local` - Your local development (NEVER commit)
   - `.env.example` - Template for other developers (safe to commit)
   - Vercel dashboard - Production/Preview (secure)

### Documentation Without Secrets

When creating docs, use placeholders:
```markdown
# Good ✅
GROQ_API_KEY=gsk_your_key_here
DATABASE_URL=postgresql://postgres:your_password@your_host:6543/postgres

# Bad ❌ - Never include real API keys in documentation!
GROQ_API_KEY=gsk_actual_key_value_here  # DON'T DO THIS
```

---

## About Groq API Access

### Your Question: Can we request full API access from Groq?

**Short Answer**: You already have it! Groq's API is free and unlimited.

**Long Answer**:

#### Current Groq Plan
- **Free Tier**: ✅ What you have now
- **Cost**: $0 (completely free)
- **Rate Limits**: 
  - 30 requests/minute
  - 14,400 requests/day
- **Models**: Full access to all models including `llama-3.3-70b-versatile`
- **Use Case**: Perfect for medical evidence synthesis

#### Do You Need More?

**Check your current usage**:
1. Go to: https://console.groq.com/usage
2. Look at requests/day
3. If you're hitting limits, you'll see throttling errors

**For Production App**:
- 30 req/min = enough for ~1800 users/hour (if each searches twice)
- If you need more: Contact support@groq.com for Enterprise plan
- But for current scale: Free tier is perfect ✅

#### Alternative: Email Groq Anyway

**Template Email to Groq**:

```
Subject: API Key Exposure - Request for Security Guidance

Hello Groq Support Team,

Thank you for alerting us about the exposed API key (gsk_****C3te). 
We've immediately:
1. Created a new API key
2. Updated all production environments
3. Revoked the old key
4. Implemented git-secrets to prevent future exposures

Context:
- App: ECCCO Medical Education Platform
- Use Case: Clinical evidence synthesis for healthcare professionals
- Users: Medical students, residents, attending physicians
- Purpose: Evidence-based medicine education

Questions:
1. Can you confirm the old key is fully revoked?
2. Are there any additional security recommendations?
3. Is our current free tier sufficient, or should we consider Enterprise?
4. Any best practices for medical/healthcare applications?

We take security seriously and appreciate your rapid response system.

Best regards,
[Your Name]
ECCCO Development Team
```

**Send to**: support@groq.com

---

## Timeline & Priority

### 🔴 CRITICAL - NOW (Next 30 minutes)
1. ✅ Create new Groq API key
2. ✅ Update Vercel environment variable
3. ✅ Revoke old Groq key
4. ✅ Test new key works

### 🟡 HIGH - TODAY (Next 2 hours)
5. ✅ Review Supabase Security Advisor
6. ✅ Enable RLS on all tables
7. ✅ Rotate database password
8. ✅ Update Vercel DATABASE_URL
9. ✅ Verify all 18 errors resolved

### 🟢 MEDIUM - THIS WEEK
10. ✅ Install git-secrets
11. ✅ Create .env.example file
12. ✅ Email Groq support (optional but recommended)
13. ✅ Document security practices

---

## Success Criteria

### Groq API Fix ✅
- [ ] New API key created
- [ ] Vercel updated with new key
- [ ] Old key revoked in Groq console
- [ ] Production evidence search working
- [ ] Local development working
- [ ] No keys in git history (or documented as fixed)

### Supabase Security ✅
- [ ] All 18 errors identified
- [ ] RLS enabled on all tables
- [ ] Database password rotated
- [ ] Vercel DATABASE_URL updated
- [ ] Security Advisor shows 0 errors
- [ ] Weekly warning emails stop

### Prevention ✅
- [ ] git-secrets installed and configured
- [ ] .env.example created
- [ ] .env.local never committed
- [ ] Team trained on security best practices
- [ ] Documentation uses placeholders only

---

## Support

**If you need help**:
- Groq: support@groq.com
- Supabase: support@supabase.com
- GitHub: Your repo settings → Security → Secret scanning

**Emergency Contacts**:
- Groq revocation: 3 days (Jan 24, 2026)
- Supabase: Already vulnerable, fix ASAP

---

## Next Steps

**Right now** (you're already in Vercel):
1. Go to Groq console (new tab): https://console.groq.com/keys
2. Create new key
3. Come back to Vercel tab
4. Edit GROQ_API_KEY
5. Paste new key
6. Save

**Then** (after Vercel updates):
1. Open another tab: https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer
2. Go to Security Advisor
3. Screenshot all 18 errors
4. Share with me so I can help fix them

**Want me to help with any of these steps?** Let me know which one to tackle first!
