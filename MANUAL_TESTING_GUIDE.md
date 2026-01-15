# 🧪 Manual Testing Guide

## Prerequisites

1. Server must be running: `npm run dev`
2. Wait for "✓ Ready" message

## Test Using the Browser UI

### 🎯 Easiest Way: Use the Evidence Search Page

1. **Open browser**: http://localhost:3000/evidence-search

2. **Test 1: Basic Search (Will Cache)**

   - Search for: "management of DKA"
   - Wait ~15 seconds for results
   - Note the time it took

3. **Test 2: Cache Hit**

   - Search again for: "management of DKA" (exact same query)
   - Should be INSTANT (< 1 second)
   - This proves caching works! ⚡

4. **Test 3: Check Browser Console**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Search for: "management of septic shock"
   - Look for `_meta.cached: false` in response
   - Search again
   - Look for `_meta.cached: true` in response

---

## Manual API Testing (Using Browser Console)

Open browser console (F12) and paste these tests:

### Test 1: ⚡ Caching

```javascript
// First request (will cache)
console.time("First Request");
fetch("http://localhost:3000/api/evidence/synthesize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: "management of diabetic ketoacidosis",
  }),
})
  .then((r) => r.json())
  .then((data) => {
    console.timeEnd("First Request");
    console.log("Cached?", data._meta?.cached);
    console.log("Articles:", data.metadata?.articlesAnalyzed);
    console.log("Confidence:", data.metadata?.confidenceScore + "%");

    // Second request (should hit cache)
    console.log("\n--- Second Request (same query) ---");
    console.time("Second Request (Cached)");

    fetch("http://localhost:3000/api/evidence/synthesize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "management of diabetic ketoacidosis",
      }),
    })
      .then((r) => r.json())
      .then((cachedData) => {
        console.timeEnd("Second Request (Cached)");
        console.log("Cached?", cachedData._meta?.cached);
        console.log("✅ Caching test complete!");
      });
  });
```

**Expected Output:**

```
First Request: 12000-15000ms
Cached? false
Articles: 29
Confidence: 87%

--- Second Request (same query) ---
Second Request (Cached): 50-200ms
Cached? true
✅ Caching test complete!
```

---

### Test 2: 🎯 Clinical Decision Support

```javascript
fetch("http://localhost:3000/api/evidence/synthesize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: "management of septic shock",
    includeDecisionSupport: true, // ← This triggers protocol generation
  }),
})
  .then((r) => r.json())
  .then((data) => {
    console.log("=== DECISION SUPPORT TEST ===");
    console.log("Has Decision Support?", !!data.decisionSupport);

    if (data.decisionSupport) {
      console.log("Protocol:", data.decisionSupport.title);
      console.log("Steps:", data.decisionSupport.steps.length);
      console.log("\nStep 1:", data.decisionSupport.steps[0]);
      console.log("✅ Decision Support working!");
    } else {
      console.log("⚠️ No decision support generated");
      console.log("Check server logs for errors");
    }
  });
```

**Expected Output:**

```
=== DECISION SUPPORT TEST ===
Has Decision Support? true
Protocol: Management Protocol for Septic Shock
Steps: 4

Step 1: {
  id: "step-1",
  title: "Initial Resuscitation",
  actions: [...],
  timeframe: "Within first hour"
}
✅ Decision Support working!
```

---

### Test 3: 👤 Patient-Specific Customization

```javascript
fetch("http://localhost:3000/api/evidence/synthesize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: "antibiotic therapy for pneumonia",
    includeDecisionSupport: true,
    patientContext: {
      // ← Patient-specific parameters
      ageYears: 5,
      weightKg: 20,
      creatinineClearance: 40,
      allergies: ["penicillin"],
    },
  }),
})
  .then((r) => r.json())
  .then((data) => {
    console.log("=== PATIENT CONTEXT TEST ===");
    console.log("Patient Context Applied?", !!data.patientContext);

    if (data.decisionSupport?.patientConsiderations) {
      console.log("\nPatient Considerations:");
      data.decisionSupport.patientConsiderations.forEach((c) => {
        console.log(" -", c);
      });
      console.log("✅ Patient customization working!");
    } else {
      console.log("⚠️ No patient considerations generated");
    }
  });
```

**Expected Output:**

```
=== PATIENT CONTEXT TEST ===
Patient Context Applied? true

Patient Considerations:
 - 🧒 Pediatric patient - use weight-based dosing
 - 🩺 Renal impairment - dose adjustments may be necessary
 - ⚠️ Drug allergies: penicillin - check for cross-reactivity
✅ Patient customization working!
```

---

## Check Server Logs

While testing, watch the terminal running `npm run dev`. You should see:

### For Caching:

```
[Cache] Using in-memory cache (local only)
[Cache] MISS - No cached result for: "management of dka"
...
[Cache] STORED - Cached synthesis for: "management of DKA"
[Cache] HIT - Using cached result from 2 minutes ago
```

### For Decision Support:

```
[Decision Support] Generating clinical protocol...
[Groq] Generated 643 tokens in response
[Decision Support] Generated protocol with 4 steps
```

### For Patient Context:

```
[Evidence Synthesis] Searching for: "antibiotic therapy" (patient-specific)
```

---

## Quick Verification Checklist

Run each test and check off:

### Feature 1: Caching

- [ ] First search takes 12-15 seconds
- [ ] Second search (same query) takes < 1 second
- [ ] Console shows `cached: false` then `cached: true`
- [ ] Server logs show `[Cache] MISS` then `[Cache] HIT`

### Feature 2: Decision Support

- [ ] Response has `decisionSupport` field
- [ ] Protocol has multiple `steps`
- [ ] Steps include `dosage`, `route`, `frequency`
- [ ] Server logs show `[Decision Support] Generated protocol`

### Feature 3: Patient Context

- [ ] Response has `patientContext` field
- [ ] `patientConsiderations` array present
- [ ] Considerations mention age/renal/allergies
- [ ] Server logs show `(patient-specific)`

---

## Troubleshooting

### If caching doesn't work:

- Check server logs for `[Cache]` messages
- Ensure exact same query (case-insensitive)
- Try clearing cache and testing again

### If decision support doesn't generate:

- Check if `includeDecisionSupport: true` in request
- Check server logs for `[Decision Support]` or Groq errors
- Verify GROQ_API_KEY is set in .env.local

### If patient context doesn't apply:

- Check if `patientContext` object in request
- Look for `patientConsiderations` in response
- Check server logs for "(patient-specific)" marker

---

## Success Criteria

✅ **You'll know it's working when:**

1. **Caching**: Second search is 100x+ faster
2. **Decision Support**: You see step-by-step protocols with dosages
3. **Patient Context**: You see age/renal/allergy warnings

All 3 features maintain the existing 87% confidence and high-quality evidence!

---

## Visual Testing in Browser

The easiest way to see everything working:

1. Open http://localhost:3000/evidence-search
2. Search for "management of DKA"
3. Wait for results
4. Open DevTools (F12) → Network tab
5. Search again for "management of DKA"
6. Check response time in Network tab
7. Should be < 100ms vs 12000ms!

That's it! If step 7 shows fast response, caching is working! 🎉
