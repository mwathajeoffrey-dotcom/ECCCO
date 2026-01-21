# 🔧 URGENT FIX: AI Synthesis Not Working in Production

## Problem
AI synthesis shows "temporarily unavailable" on production (eccco.vercel.app).

## Root Cause
**GROQ_API_KEY environment variable is NOT set in Vercel production environment.**

The API key exists in `.env.local` (local development) but Vercel deployments need environment variables configured separately.

## Quick Fix (5 minutes)

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/mwathajeoffrey-dotcoms-projects/eccco
2. Click on "Settings" tab
3. Click on "Environment Variables" in left sidebar

### Step 2: Add GROQ_API_KEY
1. Click "Add New" button
2. Fill in:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Copy from your `.env.local` file (starts with `gsk_`)
   - **Environments**: Select all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. Click "Save"

### Step 3: Redeploy
1. Go to "Deployments" tab
2. Find latest deployment
3. Click "..." (three dots)
4. Click "Redeploy"
5. Wait 2-3 minutes for deployment

### Step 4: Test
1. Open: https://eccco.vercel.app/evidence
2. Search: "management of diabetic ketoacidosis"
3. Should see full AI synthesis (not "temporarily unavailable")

---

## Verification

### Before Fix:
```json
{
  "summary": "AI synthesis temporarily unavailable. Evidence found successfully - please review the high-quality sources below."
}
```

### After Fix:
```json
{
  "summary": "When managing diabetic ketoacidosis (DKA), it is crucial to...[full 3-5 paragraphs]",
  "keyPoints": [
    "Insulin therapy: 0.1 units/kg/hour IV continuous infusion (JAMA ⁽¹⁾)",
    "Fluid resuscitation: 15-20 mL/kg isotonic saline in first hour (NEJM ⁽²⁾)",
    ...
  ]
}
```

---

## Why This Happened

1. **Local Development**: Works because `.env.local` has GROQ_API_KEY
2. **Production**: Fails because Vercel doesn't use `.env.local` files
3. **Solution**: Must add env vars to Vercel dashboard

---

## Other Missing Environment Variables?

While you're in Vercel environment variables, verify these are also set:

### Required for Full Functionality:
- ✅ `DATABASE_URL` - Supabase connection (should already be set)
- ✅ `CLERK_SECRET_KEY` - Authentication
- ✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Auth (public)
- ✅ `GROQ_API_KEY` - **ADD THIS NOW** ⚠️

### Optional (for enhanced features):
- `REDIS_URL` - Caching (faster searches)
- `NEXT_PUBLIC_SENTRY_DSN` - Error tracking
- `SENTRY_AUTH_TOKEN` - Source maps

---

## Quick Check Script

After adding the env var and redeploying, run this to verify:

```bash
curl -s 'https://eccco.vercel.app/api/evidence/consensus-search' \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"query":"septic shock treatment"}' \
  | jq '.summary' \
  | head -3
```

**Expected output**: Should show actual medical synthesis, not "temporarily unavailable"

---

## Alternative: Test Locally First

If you want to verify the fix works before deploying:

```bash
# Start local dev server
npm run dev

# Test in browser
open http://localhost:3000/evidence

# Search any medical query
# Should see full AI synthesis
```

---

## Timeline

1. **Add env var**: 2 minutes
2. **Redeploy**: 2-3 minutes  
3. **Test**: 1 minute
4. **Total**: ~5 minutes

---

## Status After Fix

✅ AI synthesis working
✅ Drug search working
✅ Full evidence synthesis
✅ Quality indicators showing
✅ Citations linking properly

---

**Priority**: 🔴 **CRITICAL** - Core feature broken
**Effort**: 5 minutes
**Impact**: Restores all AI-powered features

**Next Step**: Go to Vercel dashboard NOW and add GROQ_API_KEY!
