#!/usr/bin/env node

/**
 * Test Redis/KV connection
 */

const Redis = require("ioredis");

async function testRedis() {
  console.log("🔍 Testing Redis connection...\n");

  try {
    // Check if REDIS_URL is set
    if (!process.env.REDIS_URL) {
      console.error("❌ REDIS_URL not found in environment variables");
      console.log("\nRun: vercel env pull .env.local");
      process.exit(1);
    }

    console.log("✓ REDIS_URL found");

    // Create Redis client
    const redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
    });

    // Wait for connection
    await new Promise((resolve, reject) => {
      redis.on("ready", resolve);
      redis.on("error", reject);
      setTimeout(() => reject(new Error("Connection timeout")), 5000);
    });

    // Test 1: Set a value
    console.log("\n1️⃣  Testing SET operation...");
    await redis.set("test:key", "Hello from ECCCO!", "EX", 60);
    console.log("   ✓ Successfully set test:key");

    // Test 2: Get the value
    console.log("\n2️⃣  Testing GET operation...");
    const value = await redis.get("test:key");
    console.log(`   ✓ Retrieved value: "${value}"`);

    // Test 3: Set with expiry
    console.log("\n3️⃣  Testing TTL (expiry)...");
    await redis.set("test:expiry", "This will expire in 5 seconds", "EX", 5);
    const ttl = await redis.ttl("test:expiry");
    console.log(`   ✓ Key will expire in ${ttl} seconds`);

    // Test 4: Increment counter
    console.log("\n4️⃣  Testing INCR (rate limiting)...");
    await redis.set("test:counter", 0);
    const count1 = await redis.incr("test:counter");
    const count2 = await redis.incr("test:counter");
    const count3 = await redis.incr("test:counter");
    console.log(`   ✓ Counter: ${count1} → ${count2} → ${count3}`);

    // Test 5: Cleanup
    console.log("\n5️⃣  Cleaning up test keys...");
    await redis.del("test:key", "test:expiry", "test:counter");
    console.log("   ✓ Test keys deleted");

    // Disconnect
    redis.disconnect();

    console.log("\n✅ ALL REDIS TESTS PASSED!\n");
    console.log("Summary:");
    console.log("  ✓ Connection: Working");
    console.log("  ✓ SET/GET: Working");
    console.log("  ✓ TTL/Expiry: Working");
    console.log("  ✓ INCR (Rate Limiting): Working");
    console.log("\n🚀 Redis is ready for production!\n");
  } catch (error) {
    console.error("\n❌ REDIS TEST FAILED:", error.message);
    console.error("\nPossible causes:");
    console.error("  1. REDIS_URL is incorrect");
    console.error("  2. Redis database not accessible");
    console.error("  3. Network connectivity issue");
    console.error("\nFull error:", error);
    process.exit(1);
  }
}

// Load environment variables
require("dotenv").config({ path: ".env.local" });

testRedis();
