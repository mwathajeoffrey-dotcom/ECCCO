# ⚡ IMMEDIATE ACTION REQUIRED - Security Fixes

**Date**: January 21, 2026
**Priority**: CRITICAL
**Time Required**: 15 minutes

---

## 🚨 Two Critical Issues to Fix NOW

### Issue 1: Groq API Key Compromised

- **Expires**: January 24, 2026 (3 days!)
- **Impact**: All AI features will stop working
- **Time**: 10 minutes

### Issue 2: Supabase Security Warnings

- **Status**: 18 errors detected
- **Impact**: Database potentially exposed
- **Time**: 5 minutes to review + fixes as needed

---

## ✅ Step-by-Step Fix (15 minutes)

### STEP 1: Create New Groq API Key (3 minutes)

**You're currently on**: Vercel Environment Variables page ✅

**Open in new tab**: https://console.groq.com/keys

1. **Login to Groq**
2. **Click "Create API Key"**
3. **Name**: `ECCCO Evidence Search v2 - Secure - Jan 2026`
4. **Click "Create"**
5. **COPY THE KEY** (⌘+C / Ctrl+C) - You can only see it once!

---

### STEP 2: Update Vercel (2 minutes)

**Switch back to your Vercel tab** (you're already there!)

1. **Find `GROQ_API_KEY`** in the list (I can see it in your screenshot)
2. **Click the three dots (•••)** on the right
3. **Click "Edit"**
4. **Delete old value**
5. **Paste new key** (⌘+V / Ctrl+V)
6. **Verify all 3 environments are checked**:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
7. **Click "Save"**
8. **Wait for "Redeploying..."** message (~30 seconds)

---

### STEP 3: Update Local Environment (1 minute)

**In VS Code**:

1. **Open `.env.local`** (you already have it open!)
2. **Find line 13**: `GROQ_API_KEY=gsk_XsXtxtlf6AVhz2Ug4J24...`
3. **Select the value** (everything after the `=`)
4. **Paste new key**
5. **Save file** (⌘+S / Ctrl+S)

---

### STEP 4: Revoke Old Key (1 minute)

**Back in Groq Console**: https://console.groq.com/keys

1. **Find**: `ECCCO Evidence Search` (ends in `...C3te`)
2. **Click "Delete" or "Revoke"** button
3. **Confirm deletion**
4. **Verify**: Key is removed from list

---

### STEP 5: Test Everything Works (3 minutes)

**Local Test**:

```bash
# In VS Code terminal
npm run dev

# Open: http://localhost:3000/evidence-search
# Search: "management of septic shock"
# Expected: Full AI synthesis with blue clickable journal links
```

**Production Test** (after Vercel redeploys - ~2 min):

```
# Open: https://eccco.vercel.app/evidence-search
# Search: "management of septic shock"
# Expected: Full AI synthesis (not "temporarily unavailable")
```

---

### STEP 6: Fix Supabase Security (5 minutes review)

**Open in new tab**: https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer

1. **Click "Security Advisor"** (or find it in left sidebar)
2. **Review all 18 errors**
3. **Take screenshots** or copy error details
4. **Share with me** so I can help create fixes

**Common issues** (we'll fix together):

- Row Level Security (RLS) not enabled
- Missing auth policies
- Public table access

---

## ⏱️ Timeline

| Step | Action              | Time  | When            |
| ---- | ------------------- | ----- | --------------- |
| 1    | Create new Groq key | 3 min | NOW             |
| 2    | Update Vercel       | 2 min | NOW             |
| 3    | Update .env.local   | 1 min | NOW             |
| 4    | Revoke old key      | 1 min | NOW             |
| 5    | Test                | 3 min | After steps 1-4 |
| 6    | Supabase review     | 5 min | After step 5    |

**Total**: ~15 minutes

---

## ✅ Success Checklist

### Groq API Key Fixed

- [ ] New key created in Groq console
- [ ] Vercel `GROQ_API_KEY` updated
- [ ] Local `.env.local` updated
- [ ] Old key revoked in Groq
- [ ] Local dev works (AI synthesis shows)
- [ ] Production works (AI synthesis shows)
- [ ] Journal links are blue and clickable

### Supabase Review Started

- [ ] Opened Security Advisor
- [ ] Reviewed 18 errors
- [ ] Documented error types
- [ ] Ready to fix with agent's help

---

## 🎯 What You Should See After Fix

### Before (Current - Broken)

```
Evidence Search Results:
Summary: AI synthesis temporarily unavailable. Please check back soon.
```

### After (Fixed - Working)

```
Evidence Search Results:
Summary: The management of septic shock is complex, with guidelines
from the Surviving Sepsis Campaign published in [Critical Care Medicine]
suggesting early recognition and treatment. Studies in [NEJM] and [JAMA]
have shown that...
         ↑ Blue clickable links    ↑ Blue    ↑ Blue
```

---

## 🆘 If You Get Stuck

### Groq Console Won't Load

- Try: https://groq.com → Login → API Keys
- Or: Clear browser cache and retry

### Can't Find Vercel Environment Variable

- Search: Type "GROQ" in the search box (top of env vars list)
- Or: Scroll down - it's alphabetically sorted

### Vercel Won't Save

- Check: All required fields filled
- Check: Environment checkboxes are checked
- Refresh page and try again

### Old Key Still Works

- Wait 5 minutes - revocation takes time
- Check: You revoked the right key (ends in `...C3te`)

### Test Fails

- Check: Vercel deployment finished (green checkmark)
- Check: Browser cache - try incognito/private window
- Check: `.env.local` saved correctly

---

## 📞 Support

**If you need help during this process**:

1. **Share screenshots** of any errors
2. **Tell me which step** you're on
3. **Describe what happened** vs what you expected

**After you're done**:

1. **Confirm**: "Groq API key updated ✅"
2. **Share**: Supabase Security Advisor screenshots
3. **We'll**: Fix the 18 Supabase errors together

---

## 🔐 Why This Happened

**Root Cause**: I accidentally included your real API key in documentation files when creating guides for you.

**GitHub's Response**: Secret scanning detected it and reported to Groq (good security!)

**Groq's Response**: Proactive warning with 3-day grace period to fix

**Lesson Learned**:

- ✅ Always use placeholders in docs
- ✅ Never commit real secrets
- ✅ Use git-secrets to prevent this
- ✅ Keep `.env.local` in `.gitignore`

**We've now fixed**:

- ✅ Removed all exposed secrets from docs
- ✅ Added security audit script
- ✅ Ensured `.env.local` in `.gitignore`
- ✅ Created prevention measures

**You need to**:

- ⏳ Create new API keys
- ⏳ Update all environments
- ⏳ Revoke old keys

---

## Ready? Let's Do This! 🚀

**Start with STEP 1** above. Take your time, follow each step carefully.

**I'm here to help** if you get stuck on any step!

When you're done, let me know and we'll tackle the Supabase security issues together.
