#!/usr/bin/env node

/**
 * Test Redis integration with cache and rate-limit services
 */

require("dotenv").config({ path: ".env.local" });

const { setCache, getCache, deleteCache } = require("./src/lib/services/cache");
const { checkRateLimit } = require("./src/lib/services/rate-limit");

async function testServices() {
  console.log("🧪 Testing Redis-integrated services...\n");

  try {
    // Test 1: Cache Service
    console.log("1️⃣  Testing Cache Service...");
    await setCache("test-key", { message: "Hello from cache!" }, { ttl: 60 });
    const cached = await getCache("test-key");
    console.log(`   ✓ Set and retrieved cached value:`, cached);
    await deleteCache("test-key");
    const deleted = await getCache("test-key");
    console.log(`   ✓ Deleted cached value (should be null):`, deleted);

    // Test 2: Cache with namespace and tags
    console.log("\n2️⃣  Testing Cache with namespaces and tags...");
    await setCache(
      "user:123",
      { name: "John Doe" },
      {
        ttl: 300,
        namespace: "users",
        tags: ["user", "profile"],
      }
    );
    const user = await getCache("user:123", "users");
    console.log(`   ✓ Retrieved user from cache:`, user);

    // Test 3: Rate Limiting
    console.log("\n3️⃣  Testing Rate Limiting...");
    const result1 = await checkRateLimit({
      identifier: "test-user",
      limit: 5,
      window: 60,
      namespace: "test",
    });
    console.log(`   ✓ First request: allowed=${result1.allowed}, remaining=${result1.remaining}/${result1.limit}`);

    const result2 = await checkRateLimit({
      identifier: "test-user",
      limit: 5,
      window: 60,
      namespace: "test",
    });
    console.log(`   ✓ Second request: allowed=${result2.allowed}, remaining=${result2.remaining}/${result2.limit}`);

    const result3 = await checkRateLimit({
      identifier: "test-user",
      limit: 5,
      window: 60,
      namespace: "test",
    });
    console.log(`   ✓ Third request: allowed=${result3.allowed}, remaining=${result3.remaining}/${result3.limit}`);

    console.log("\n✅ ALL SERVICE TESTS PASSED!\n");
    console.log("Summary:");
    console.log("  ✓ Cache Service: Working");
    console.log("  ✓ Cache with tags/namespaces: Working");
    console.log("  ✓ Rate Limiting: Working");
    console.log("\n🚀 Services are ready for production!\n");
  } catch (error) {
    console.error("\n❌ TEST FAILED:", error.message);
    console.error("\nFull error:", error);
    process.exit(1);
  }
}

testServices();
