#!/usr/bin/env node

console.log("🧪 Testing Cache Performance\n");

const query = { query: "management of dka" };

console.log("⏱️  Test 1: First request (should be SLOW - cache MISS)");
const start1 = Date.now();

fetch("http://localhost:3000/api/evidence/synthesize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(query),
})
  .then((r) => r.json())
  .then((data) => {
    const duration1 = Date.now() - start1;
    console.log(`✅ First request: ${duration1}ms`);
    console.log(`   Cached: ${data._meta?.cached || "N/A"}`);
    console.log(`   Articles: ${data.articles?.length || 0}`);
    console.log(`   Confidence: ${data.confidence || "N/A"}`);

    console.log("\n⏱️  Test 2: Second request (should be FAST - cache HIT)");
    console.log("   Waiting 2 seconds...\n");

    setTimeout(() => {
      const start2 = Date.now();

      fetch("http://localhost:3000/api/evidence/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      })
        .then((r) => r.json())
        .then((data2) => {
          const duration2 = Date.now() - start2;
          console.log(`✅ Second request: ${duration2}ms`);
          console.log(`   Cached: ${data2._meta?.cached || "N/A"}`);
          console.log(`   Articles: ${data2.articles?.length || 0}`);
          console.log(`   Confidence: ${data2.confidence || "N/A"}`);

          const improvement = Math.round(duration1 / duration2);
          console.log(`\n🚀 SPEED IMPROVEMENT: ${improvement}x faster!`);
          console.log(`   First:  ${duration1}ms (cache MISS)`);
          console.log(`   Second: ${duration2}ms (cache HIT)`);

          if (improvement > 10) {
            console.log("\n✅ ✅ ✅ CACHING IS WORKING! ✅ ✅ ✅");
          } else {
            console.log("\n❌ Caching may not be working properly");
          }
        })
        .catch((err) => console.error("Error in second request:", err));
    }, 2000);
  })
  .catch((err) => console.error("Error in first request:", err));
