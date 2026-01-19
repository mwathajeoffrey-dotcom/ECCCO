# 📁 Current File Structure - Visual Map

## Current State (Before Deployment)

```
/Users/apple/ECCCO/
│
├── .backup/                          ✅ SAFE - DO NOT DELETE
│   └── evidence-search-old/           (Old implementation backup)
│       ├── evidence-search/page.tsx   (Old UI)
│       └── evidence/route.ts          (Old API)
│
├── src/
│   └── app/
│       ├── evidence-search/          🟢 ACTIVE - This is what gets deployed
│       │   └── page.tsx               (NEW UI with sidebar, updated)
│       │
│       ├── evidence-search-new/      🔴 UNUSED - Can delete after deploy
│       │   └── page.tsx               (Blank template, not used)
│       │
│       └── api/
│           └── evidence/
│               └── consensus-search/
│                   └── route.ts      🟢 ACTIVE - This is what gets deployed
│                                      (NEW with rate limiting, validation, error handling)
│
└── SAFE_DEPLOYMENT_GUIDE.md          📖 THIS GUIDE
```

---

## What's Live on Vercel RIGHT NOW

**Unknown!** Could be:
1. ❓ Old version (before updates)
2. ❓ Current version (with updates)
3. ❓ Mixed version (some new, some old)

**That's why we test preview first!**

---

## After Following Deployment Guide

### GOOD State ✅
```
Production (Vercel):
├── /evidence-search → NEW version with sidebar
│   ✅ Search history sidebar
│   ✅ Rate limiting
│   ✅ Input validation
│   ✅ Enhanced error handling
│   ✅ Clickable journals
│   ✅ Key clinical points
│
└── .backup/ → OLD version (safe if rollback needed)
```

### Files to Delete After Successful Deploy
```
/src/app/evidence-search-new/  ← Delete this (unused template)
```

---

## Deployment Flow (Step by Step)

### Step 1: Test Locally
```
Your Computer:
- Build: npm run build ✅
- Test: npm run dev ✅
- Verify: All features work ✅
```

### Step 2: Commit to GitHub
```
Your Computer → GitHub:
- git add .
- git commit -m "..."
- git push origin main

GitHub now has:
✅ Complete commit history
✅ All your new code
✅ Safety backup #1
```

### Step 3: Deploy Preview
```
Your Computer → Vercel Preview:
- vercel (without --prod)

Preview URL: https://eccco-xxx.vercel.app
- Test all features
- Check mobile
- Verify everything works

NOT live to users yet! ✅ Safe to test
```

### Step 4: Deploy Production
```
Your Computer → Vercel Production:
- vercel --prod

Production URL: https://eccco.vercel.app
- NOW live to users
- Test again
- Monitor for issues
```

---

## Safety Nets 🛡️

You have THREE ways to recover if something goes wrong:

### Safety Net #1: Vercel Deployment History
```
Vercel Dashboard:
- See all previous deployments
- Click any old deployment
- "Promote to Production"
- Instant rollback (30 seconds)
```

### Safety Net #2: GitHub Commit History
```
Git:
- git log --oneline (see all commits)
- git revert [commit] (undo changes)
- git push origin main
- vercel --prod (redeploy old version)
```

### Safety Net #3: Local Backup
```
.backup/ folder:
- Complete copy of old code
- Copy files back if needed
- Commit and redeploy
```

**YOU CANNOT LOSE CODE** ✅

---

## What Could Go Wrong? (And How to Fix)

### Scenario 1: Build Fails Locally
```
Problem: npm run build shows errors
Fix: Don't deploy! Fix errors first
Risk: 🟢 ZERO (caught before deploy)
```

### Scenario 2: Tests Fail Locally
```
Problem: Search doesn't work locally
Fix: Don't deploy! Debug first
Risk: 🟢 ZERO (caught before deploy)
```

### Scenario 3: Preview Works, Production Fails
```
Problem: Preview OK, but production broken
Fix: Check environment variables (GROQ_API_KEY)
Risk: 🟡 LOW (easy to fix)
Rollback: Use Safety Net #1 (Vercel dashboard)
```

### Scenario 4: Production Deployed but Has Bug
```
Problem: Deployed but users see errors
Fix: Immediate rollback via Vercel
Risk: 🟡 LOW (rollback in 30 seconds)
Steps:
1. Vercel Dashboard → Deployments
2. Find previous working version
3. "Promote to Production"
4. Fixed in 30 seconds
```

### Scenario 5: Everything Breaks Completely
```
Problem: Total disaster (very unlikely!)
Fix: Use all 3 safety nets
Risk: 🟢 NEAR ZERO (backups exist)
Steps:
1. Vercel rollback (30 sec)
2. If that fails, git revert (2 min)
3. If that fails, restore from .backup/ (5 min)

You have 3 ways to recover!
```

---

## File Conflict Prevention

### Current Active Files:
```
/src/app/evidence-search/page.tsx           → DEPLOY THIS ✅
/src/app/api/evidence/consensus-search/route.ts → DEPLOY THIS ✅
```

### Files to Ignore:
```
/src/app/evidence-search-new/page.tsx       → DON'T DEPLOY (delete after)
/.backup/evidence-search-old/*              → DON'T DEPLOY (keep for safety)
```

### Vercel Auto-Deploy
Vercel will automatically deploy from `/src/app/` folder:
- ✅ Uses `/evidence-search/page.tsx` (correct)
- ❌ Ignores `/evidence-search-new/` (good!)
- ❌ Ignores `/.backup/` (good!)

**No conflicts! Safe to deploy.**

---

## Checklist Before You Start

Before starting Step 1 of deployment guide:

- [ ] I understand there are THREE safety nets
- [ ] I know how to rollback (see scenarios above)
- [ ] I will test locally before deploying
- [ ] I will use preview before production
- [ ] I will NOT delete .backup/ folder
- [ ] I am ready to follow steps in EXACT order
- [ ] I have ~20 minutes available
- [ ] I am deploying from the correct branch (main)

**If all checked**: ✅ Ready to proceed with SAFE_DEPLOYMENT_GUIDE.md

**If any unchecked**: ⏸️ Review this file again

---

## Quick Reference Commands

### Test Locally:
```bash
rm -rf .next && npm run build  # Clean build
npm run dev                     # Test locally
```

### Deploy Process:
```bash
git add .
git commit -m "Production deploy: Evidence search with sidebar"
git push origin main
vercel                         # Preview first
vercel --prod                  # Production (after preview OK)
```

### Emergency Rollback:
```bash
# Method 1: Vercel Dashboard (fastest)
# Go to vercel.com → Deployments → Promote old version

# Method 2: Git Revert
git revert HEAD
git push origin main
vercel --prod

# Method 3: Restore Backup
cp -r .backup/evidence-search-old/evidence-search/page.tsx src/app/evidence-search/
git add . && git commit -m "Rollback" && git push origin main
vercel --prod
```

---

## Visual Deployment Timeline

```
┌─────────────────────────────────────────────────────────────┐
│ BEFORE: Unknown state on Vercel (might be old version)     │
└─────────────────────────────────────────────────────────────┘
                         │
                         ├─ Step 1: Build locally ✅
                         │
                         ├─ Step 2: Test locally ✅
                         │
                         ├─ Step 3: Commit to GitHub ✅
                         │  (Backup #2 created)
                         │
                         ├─ Step 4: Deploy to Preview ✅
                         │  (Test before production)
                         │
                         ├─ Step 5: Check env vars ✅
                         │
                         ├─ Step 6: Deploy to Production 🚀
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ AFTER: Clean production with new features                  │
│   ✅ Search history sidebar                                │
│   ✅ Rate limiting (5/min)                                 │
│   ✅ Input validation                                       │
│   ✅ Enhanced error handling                               │
│   ✅ All existing features preserved                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Summary

**What you're doing**: Deploying evidence search with new features  
**How long**: ~20 minutes  
**Risk level**: 🟢 LOW (3 safety nets, tested, backed up)  
**Can rollback?**: ✅ YES (3 different ways, all easy)  
**Will lose data?**: ❌ NO (everything backed up)  
**Can test first?**: ✅ YES (preview deployment)  
**Need help?**: 📖 SAFE_DEPLOYMENT_GUIDE.md has all steps  

**Ready?** Start with SAFE_DEPLOYMENT_GUIDE.md Step 1! 🚀

---

**Created**: January 19, 2026  
**Purpose**: Visual guide to prevent confusion  
**Confidence**: 🟢 HIGH (everything is backed up)  
**Next**: Follow SAFE_DEPLOYMENT_GUIDE.md  
