# 🔍 Evidence Search Troubleshooting Guide

## ✅ GOOD NEWS: Your Search IS Working!

Looking at the terminal logs, your evidence search is **functioning perfectly**:

```
[Evidence Synthesis] Searching for: "diagnosis of acute appendicitis"
[Evidence Synthesis] Found 45 articles, generating synthesis...
Generated synthesis with 2 sections, 4 references
POST /api/evidence/synthesize 200 in 2.6s
```

**This means:**

- ✅ API calls are successful
- ✅ Articles are being found (36-45 per search)
- ✅ Progressive filtering is working
- ✅ Synthesis is being generated (1-2 sections)
- ✅ References are being created (4-13 per search)
- ✅ Server responding with 200 (success)

---

## 🎯 Why You Might Not See Results

### Issue 1: Wrong URL

**Problem**: You might be looking at the test page instead of the main evidence search

**Solution**: Make sure you're at the RIGHT URL:

- ✅ **CORRECT**: http://localhost:3000/evidence-search
- ❌ **WRONG**: http://localhost:3000/test-synthesis (this is just the test page)

### Issue 2: Browser Not Updating

**Problem**: Browser showing old cached version

**Solution**: Hard refresh your browser:

- **Mac**: Cmd + Shift + R
- **Windows/Linux**: Ctrl + Shift + R
- **Or**: Clear browser cache and reload

### Issue 3: Results Rendering Below Fold

**Problem**: Results are generated but you need to scroll down

**Solution**: After clicking Search, scroll down to see:

1. Green success banner
2. Synthesis sections
3. References list

### Issue 4: JavaScript Error in Browser

**Problem**: Console error preventing render

**Solution**:

1. Open browser DevTools (F12 or right-click → Inspect)
2. Go to Console tab
3. Look for red error messages
4. Share any errors you see

---

## 📋 Quick Diagnostic Checklist

### Step 1: Verify URL

- [ ] I'm at http://localhost:3000/evidence-search (NOT /test-synthesis)

### Step 2: Check Search Box

- [ ] I can see the search box with placeholder text
- [ ] I can type in the search box
- [ ] "Search" button is visible and clickable

### Step 3: Perform Search

- [ ] Enter query: "diagnosis of acute appendicitis"
- [ ] Click Search button
- [ ] Button changes to "Searching..." with spinner
- [ ] Wait 3-5 seconds

### Step 4: Check For Results

- [ ] Green success banner appears at top
- [ ] Scroll down to see synthesis sections
- [ ] References section is visible below synthesis
- [ ] Journal badges (🔵 🔴 🟢) are clickable

### Step 5: Browser Console

- [ ] Open DevTools (F12)
- [ ] Check Console tab for errors
- [ ] Check Network tab - see POST to /api/evidence/synthesize with 200 status

---

## 🔬 What The Logs Tell Us

### Successful Searches (from your terminal):

**Search 1: "use of tourniquet in trauma"**

```
Found 36 articles
Using lenient filter: 12 articles (original filter found 1)
Generated synthesis with 1 sections, 12 references
POST /api/evidence/synthesize 200 in 2.8s ✅
```

**Search 2: "use of sodium bicarbonate"**

```
Found 36 articles
Using lenient filter: 8 articles (original filter found 2)
Generated synthesis with 2 sections, 8 references
POST /api/evidence/synthesize 200 in 3.0s ✅
```

**Search 3: "diagnosis of acute appendicitis"**

```
Found 45 articles
Generated synthesis with 2 sections, 4 references
POST /api/evidence/synthesize 200 in 2.6s ✅
```

**All searches are SUCCESSFUL!** The backend is working perfectly.

---

## 🎨 What You Should See

### Before Search:

```
┌─────────────────────────────────────────────────┐
│ 🔍 [Enter clinical question...]      [Search]  │
│ ☑ Enable AI Synthesis                          │
│ Suggested: treatment for malaria | septic...   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              📚 Search Medical Literature        │
│   Enter a clinical question to search across    │
│   millions of peer-reviewed articles...         │
└─────────────────────────────────────────────────┘
```

### During Search:

```
┌─────────────────────────────────────────────────┐
│ 🔍 [diagnosis of acute...] [⏳ Searching...]  │
│ ☑ Enable AI Synthesis                          │
└─────────────────────────────────────────────────┘
```

### After Search (SUCCESS!):

```
┌─────────────────────────────────────────────────┐
│ ✅ Structured Summary Generated                 │
│ Analyzed 11 high-quality articles from top      │
│ medical journals                                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Clinical Overview                               │
│                                                 │
│ Based on recent evidence from 🔵 The Lancet    │
│ and 🔴 Annals of Emergency Medicine...         │
│                                                 │
│ [Show 11 references ▼]                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ 📊 Evidence Quality                             │
│ Confidence: 78% | Articles: 11                  │
│ Tier 1: 2 | Tier 2: 6 | Avg Quality: 72/100   │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Quick Fixes

### Fix 1: Force Browser Refresh

```bash
# In browser address bar
http://localhost:3000/evidence-search

# Then press:
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows/Linux)
```

### Fix 2: Clear React State

```bash
# If stuck showing old data, refresh the entire page
F5 or reload button
```

### Fix 3: Check Browser Console

```javascript
// Open DevTools (F12) and paste this in Console:
console.log("Testing synthesis:", window.location.href);

// Should show: http://localhost:3000/evidence-search
```

### Fix 4: Restart Dev Server

```bash
# Stop current server (Ctrl+C in terminal)
cd /Users/apple/ECCCO
npm run dev

# Then refresh browser
```

---

## 📸 Screenshot What You See

If you're still not seeing results, take a screenshot showing:

1. **Full browser window** with URL bar visible
2. **Search box** area
3. **Any messages** (error or success)
4. **Browser console** (F12 → Console tab)

Then I can diagnose the exact issue!

---

## 🎯 Most Likely Issue

Based on the logs showing successful searches, the most likely scenario is:

**You're looking at the test page** (`/test-synthesis`) **instead of the main page** (`/evidence-search`)

**Solution**: Go to http://localhost:3000/evidence-search

Both pages use the same backend, but the new page has the better UI!

---

## ✅ Verification Steps

1. **Open browser to**: http://localhost:3000/evidence-search
2. **Search for**: "diagnosis of acute appendicitis"
3. **Wait 3 seconds**
4. **Scroll down** to see green success banner
5. **Look for**: "Generated synthesis with 2 sections, 4 references"
6. **Click**: Blue journal badge to open article

If you still don't see results after these steps, let me know what you DO see on the page!

---

## 🚀 Your System Status

**Backend**: ✅ Working perfectly
**API**: ✅ Finding 36-45 articles per search
**Filtering**: ✅ Progressive filtering active
**Synthesis**: ✅ Generating 1-2 sections
**Response Time**: ✅ Fast (2.6-3.4 seconds)

**The search is working!** You just need to make sure you're looking at the right place. 🎊
