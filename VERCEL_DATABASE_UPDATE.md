# 🎯 Vercel Environment Variable Update Guide

## Update Vercel to Use Our Seeded Database

We've already seeded 1,845 questions into this PostgreSQL database:
```
postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres
```

### Steps to Update Vercel:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/
   - Login with your account

2. **Select Your Project**
   - Find and click on "ECCCO" project
   - Or go directly to: https://vercel.com/mwathajeoffrey-dotcom/eccco

3. **Open Environment Variables**
   - Click "Settings" tab
   - Click "Environment Variables" in left sidebar

4. **Update DATABASE_URL**
   - Find the `DATABASE_URL` variable
   - Click the three dots (⋯) on the right
   - Click "Edit"
   - Replace the value with:
   ```
   postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres
   ```
   - Make sure it's set for: **Production**, **Preview**, and **Development** environments
   - Click "Save"

5. **Redeploy**
   - Vercel will ask if you want to redeploy
   - Click "Redeploy" or go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"
   
   OR simply push a small change to trigger auto-deploy:
   ```bash
   git commit --allow-empty -m "Trigger redeploy with updated database"
   git push origin main
   ```

6. **Wait for Build** (2-3 minutes)
   - Watch the deployment progress
   - Wait for "Ready" status

7. **Verify**
   - Visit: https://eccco.vercel.app/exam
   - You should now see all questions!
   - OB/GYN Emergencies should show 30+ questions

---

## 🔒 Important Security Note

The DATABASE_URL contains your password. In production, you should:
- ✅ Use Vercel's secret encryption (which it does automatically)
- ✅ Never commit the password to Git (already in .gitignore)
- ✅ Use environment-specific URLs if possible

---

## ✅ Expected Result After Update

**Before:**
```
OB/GYN Emergencies: 0 questions
Total: 851 questions in 36 topics
```

**After:**
```
OB/GYN Emergencies: 30 questions
Cardiac Emergencies: 195 questions
Total: 1,845 questions in 46 topics
```

---

## 🧪 Quick Test

After deployment completes, test the API:

```bash
curl 'https://eccco.vercel.app/api/topics' | python3 -c "
import sys, json
data = json.load(sys.stdin)
total_q = sum(t.get('_count', {}).get('questions', 0) for t in data)
print(f'Total topics: {len(data)}')
print(f'Total questions: {total_q}')
"
```

Should show: **46 topics, 1,845 questions** ✅

