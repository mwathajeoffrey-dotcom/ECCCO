# 🚨 OB/GYN Questions Missing - Database Mismatch Issue

**Problem**: Production shows 851 questions, local shows 1,845 questions

## 🔍 Investigation Results

### Production (Vercel):

- **Total Topics**: 36
- **Total Questions**: 851
- **Missing**: "OB/GYN Emergencies" topic (shows 0 in UI)
- **Has**: "Obstetric & Gynecologic Emergencies" with 30 questions

### Local Database:

- **Total Topics**: 46
- **Total Questions**: 1,845
- **All OB/GYN topics present** ✅

## 🎯 Root Cause

**Vercel is connected to a DIFFERENT database than what we seeded!**

### What Happened:

1. We seeded **LOCAL** PostgreSQL with 1,845 questions ✅
2. Vercel has its **OWN** DATABASE_URL in environment variables ❌
3. They're pointing to **two different PostgreSQL databases** ❌

### Evidence:

```bash
# Local DB (what we seeded):
postgresql://postgres.dckhoqbqtxddghojkoer:***@aws-1-us-east-1.pooler.supabase.com:6543/postgres
Total: 1,845 questions, 46 topics

# Vercel DB (production):
Unknown URL - likely different Supabase project or different database
Total: 851 questions, 36 topics
```

## ✅ Solution

We need to **seed the ACTUAL production database** that Vercel is using.

### Steps:

1. **Find Vercel's DATABASE_URL**:

   - Go to vercel.com dashboard
   - Project settings → Environment Variables
   - Copy the actual production DATABASE_URL

2. **Seed the correct database**:

   ```bash
   DATABASE_URL="<vercel-production-url>" npm run seed
   ```

3. **Verify**:
   - Check production API shows 1,845 questions
   - Verify all 46 topics present

---

## 📋 Action Items

- [ ] Get actual Vercel DATABASE_URL
- [ ] Run seed script against production database
- [ ] Verify all questions present
- [ ] Add OB/GYN questions from data/obgyn-questions/ directory
