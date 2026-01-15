# 🎯 IMMEDIATE ACTION PLAN - Next Steps

**Created**: January 14, 2026
**Estimated Time**: 1-2 hours to full deployment

---

## ⚡ What to Do RIGHT NOW (In Order)

### Step 1: Run System Test (5 minutes)

```bash
# Make sure you're in the project directory
cd /Users/apple/ECCCO

# Run the automated test
./test-clinical-synthesis.sh
```

**What this does:**

- ✅ Checks Ollama is installed and running
- ✅ Verifies Meditron model is downloaded
- ✅ Tests AI connection
- ✅ Confirms all files are present
- ✅ Validates API endpoint

**If anything fails:** See troubleshooting below ⬇️

---

### Step 2: Install Ollama (5 minutes) - ONLY IF NOT INSTALLED

```bash
# Install Ollama
brew install ollama

# Start Ollama server
ollama serve
```

**Open a NEW terminal window**, then:

```bash
# Download Meditron (7B model - 4.5GB download)
ollama pull meditron:7b-instruct

# This takes 3-5 minutes depending on internet speed
# You'll see progress bar
```

**Verify it worked:**

```bash
ollama list
# Should show: meditron:7b-instruct
```

---

### Step 3: Test Meditron Locally (2 minutes)

```bash
# Quick test
ollama run meditron:7b-instruct "What is the first-line treatment for uncomplicated malaria? Answer in one sentence."
```

**Expected response:**

> "Artemisinin-based combination therapy (ACT) is the recommended first-line treatment for uncomplicated malaria caused by P. falciparum."

**If you get a response like that, you're good!** ✅

---

### Step 4: Start Your Dev Server (1 minute)

```bash
# In your ECCCO directory
npm run dev
```

**Wait for:**

```
✓ Ready on http://localhost:3000
```

---

### Step 5: Test the API (3 minutes)

**Open a NEW terminal window:**

```bash
# Test 1: Health check
curl http://localhost:3000/api/evidence/synthesize | jq

# Test 2: Simple synthesis (NO AI)
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "malaria treatment",
    "useAI": false,
    "maxArticles": 5
  }' | jq '.sections | length'

# Test 3: Full AI synthesis (this takes ~15-20 seconds)
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is the treatment for uncomplicated malaria?",
    "useAI": true,
    "minQualityScore": 75,
    "maxArticles": 15
  }' | jq '{
    sections: .sections | length,
    references: .references | length,
    confidence: .metadata.confidenceScore,
    used_ai: .metadata.usedAI
  }'
```

**Expected output for Test 3:**

```json
{
  "sections": 2-4,
  "references": 10-15,
  "confidence": 80-90,
  "used_ai": true
}
```

**If `used_ai: false`:** Ollama might not be running or Meditron not available (fallback mode activated)

---

### Step 6: Integrate into Evidence Search Page (20 minutes)

**File to edit:** `/src/app/evidence-search/page.tsx`

I'll help you integrate this. Let me check what's in that file first:

---

### Step 7: Test in Browser (10 minutes)

1. **Open browser:** http://localhost:3000/evidence-search

2. **Try these queries:**

   - "treatment for uncomplicated malaria"
   - "management of septic shock"
   - "diagnosis of acute appendicitis"

3. **Check for:**
   - ✅ Multi-paragraph summaries
   - ✅ Inline journal badges (🔵 🔴 🟢)
   - ✅ Expandable references
   - ✅ Quality scores
   - ✅ Confidence score

---

### Step 8: Deploy to Production (15 minutes)

**Choose your deployment method:**

#### Option A: Vercel (Easiest, but NO AI unless you host Ollama separately)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Note:** Vercel serverless can't run Ollama, so AI synthesis won't work. System will auto-fallback to structured summaries (still good quality!).

**To enable AI on Vercel:** You need to host Ollama on a separate server (Railway, Fly.io, Render) and set `OLLAMA_BASE_URL` environment variable.

#### Option B: Railway/Fly.io (Best for AI support)

```bash
# Railway
npm i -g @railway/cli
railway login
railway init
railway up

# Then SSH into server and install Ollama (see guide)
```

#### Option C: Keep it local for now

Just use on your Mac for testing. Deploy later when ready.

---

## 🚨 Troubleshooting Quick Fixes

### "Ollama not found"

```bash
brew install ollama
ollama serve
```

### "Meditron not available"

```bash
ollama pull meditron:7b-instruct
# Wait for download to complete
```

### "Port 11434 already in use"

```bash
pkill -f ollama
sleep 2
ollama serve
```

### "API returns 404"

```bash
# Make sure dev server is running
npm run dev
```

### "TypeScript errors"

```bash
npm run type-check
# Fix any errors shown
```

---

## 📋 Status Check (Where Are You?)

Check your current status:

- [ ] **Ollama installed** - `which ollama` returns path
- [ ] **Ollama running** - `curl http://localhost:11434/api/tags` returns JSON
- [ ] **Meditron downloaded** - `ollama list` shows meditron
- [ ] **Dev server running** - `http://localhost:3000` loads
- [ ] **API working** - `curl http://localhost:3000/api/evidence/synthesize` returns JSON
- [ ] **Test script passes** - `./test-clinical-synthesis.sh` shows all ✅

**All checked?** You're ready to integrate into your evidence-search page!

**Some unchecked?** Do those steps first.

---

## 🎯 Priority Decision Tree

### Do you want to TEST LOCALLY first?

**YES → Do Steps 1-7 above** (1 hour total)

Result: Working system on your Mac, ready to demo

### Do you want to DEPLOY NOW?

**For testing/demo (no AI):**

```bash
vercel --prod
```

**For production (with AI):**

1. Deploy app to Railway/Fly.io
2. Install Ollama on server
3. Test production endpoint

### Do you want to INTEGRATE into existing page?

**YES → I'll help you now!**

Just let me know and I'll:

1. Read your current evidence-search page
2. Show you exactly what to add
3. Test it with you

---

## 🔥 Fastest Path to Working System

**If you just want it WORKING NOW:**

```bash
# Terminal 1: Start Ollama
ollama serve

# Terminal 2: Download Meditron (one-time, 5 min)
ollama pull meditron:7b-instruct

# Terminal 3: Start dev server
cd /Users/apple/ECCCO
npm run dev

# Terminal 4: Test it
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{"query": "malaria treatment", "useAI": true}'
```

**If you see a JSON response with `sections`, `references`, and `metadata` → YOU'RE DONE!** 🎉

---

## 💬 What Do You Want to Do Next?

**Tell me ONE of these:**

1. **"Run the test script"** → I'll guide you through `./test-clinical-synthesis.sh`

2. **"Install Ollama"** → I'll help you install and configure

3. **"Integrate into evidence-search page"** → I'll read your page and show you exactly what to add

4. **"Test the API"** → I'll run the API tests with you

5. **"Deploy to production"** → I'll guide you through deployment

6. **"I want to see it working in the browser"** → I'll help you build a test page

**What's your priority?** 🚀
