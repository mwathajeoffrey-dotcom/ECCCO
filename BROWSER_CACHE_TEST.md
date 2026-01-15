# 🧪 Quick Browser Test for Caching

## Step 1: Open Your Browser Console

1. Open http://localhost:3000/evidence-search
2. Press F12 (or Cmd+Option+I on Mac)
3. Click on "Console" tab

## Step 2: Run First Search (Cache MISS)

Paste this in console:

```javascript
console.log("⏱️ First Search - Cache MISS (should be slow ~15 seconds)");
const start1 = performance.now();

fetch("/api/evidence/synthesize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "management of dka" }),
})
  .then((r) => r.json())
  .then((data) => {
    const duration1 = (performance.now() - start1).toFixed(0);
    console.log(`✅ First request: ${duration1}ms`);
    console.log(`   Cached: ${data._meta?.cached}`);
    console.log(`   Confidence: ${data.confidence}`);
    console.log(`   Articles: ${data.articles?.length}`);
    console.log("\n📝 Now run the SECOND search (copy from below)");
  });
```

## Step 3: Wait 3 Seconds, Then Run Second Search (Cache HIT)

Paste this in console:

```javascript
console.log("⚡ Second Search - Cache HIT (should be FAST < 500ms)");
const start2 = performance.now();

fetch("/api/evidence/synthesize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "management of dka" }),
})
  .then((r) => r.json())
  .then((data) => {
    const duration2 = (performance.now() - start2).toFixed(0);
    console.log(`✅ Second request: ${duration2}ms`);
    console.log(`   Cached: ${data._meta?.cached}`);
    console.log(`   Confidence: ${data.confidence}`);
    console.log(`   Articles: ${data.articles?.length}`);
    console.log(`\n🚀 Second search was ${duration2}ms!`);

    if (data._meta?.cached === true && duration2 < 1000) {
      console.log("\n✅✅✅ CACHING IS WORKING! ✅✅✅");
    } else {
      console.log("\n❌ Cache may not be working");
      console.log("   Check: data._meta.cached =", data._meta?.cached);
    }
  });
```

## What You Should See:

**First Request:**

```
✅ First request: ~15000ms
   Cached: false
   Confidence: 0.87
   Articles: 6
```

**Second Request (SHOULD BE INSTANT!):**

```
✅ Second request: ~200ms  ← MUCH FASTER!
   Cached: true  ← FROM CACHE!
   Confidence: 0.87
   Articles: 6

🚀 Second search was 200ms!
✅✅✅ CACHING IS WORKING! ✅✅✅
```

## Also Check Server Logs

In your terminal running `npm run dev`, you should see:

**First search:**

```
[Cache] MISS - No cached result for: "management of dka"
[Evidence Synthesis] Complete in 14012ms
[Cache] STORED - Cached synthesis for: "management of dka"
```

**Second search:**

```
[Cache] ⚡ HIT - Using cached result from 0 minutes ago for: "management of dka"
[Evidence Synthesis] Returned cached result in 200ms ⚡
```

---

**This is THE definitive test!** If the second request shows `cached: true` and is < 1 second, caching is working! 🎉
