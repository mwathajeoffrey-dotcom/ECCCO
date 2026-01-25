/**
 * Test script to check dashboard functionality locally
 * This will test the admin dashboard API endpoint
 */

async function testDashboard() {
  console.log("🧪 Testing Admin Dashboard API locally...\n");

  try {
    // Test the dashboard API endpoint
    const response = await fetch("http://localhost:3000/api/admin/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`❌ Dashboard API returned status: ${response.status}`);
      const text = await response.text();
      console.error("Response:", text);
      return;
    }

    const data = await response.json();

    console.log("📊 Dashboard Data:");
    console.log("==================");
    console.log(`Total Users: ${data.totalUsers}`);
    console.log(`Online Now: ${data.onlineUsers}`);
    console.log(`Total Questions: ${data.totalQuestions}`);
    console.log(`Total Attempts: ${data.totalAttempts}`);
    console.log(`Total Exams: ${data.totalExams}`);
    console.log(`Total Quizzes: ${data.totalQuizzes}`);
    console.log(`Total Notes: ${data.totalNotes}`);
    console.log("\n📋 Recent Activity:");
    console.log(`Activities found: ${data.recentActivity?.length || 0}`);

    if (data.recentActivity && data.recentActivity.length > 0) {
      data.recentActivity.slice(0, 5).forEach((activity, i) => {
        console.log(`${i + 1}. [${activity.type}] ${activity.user} - ${activity.action} (${activity.time})`);
      });
    }

    console.log("\n✅ Dashboard API is working!");

    // Check if users are synced
    if (data.totalUsers === 0) {
      console.log("\n⚠️  WARNING: No users found in database!");
      console.log("   The 4 Clerk users need to be synced.");
      console.log("   They will be auto-created when they login and use features.");
    } else {
      console.log(`\n✅ Found ${data.totalUsers} users in database`);
    }

    if (data.onlineUsers === 0) {
      console.log("\n💡 TIP: To test online users:");
      console.log("   1. Login at http://localhost:3000");
      console.log("   2. Browse any page (Practice, Notes, etc.)");
      console.log("   3. The heartbeat will ping every 30 seconds");
      console.log('   4. Check dashboard - you should show as "Online"');
    }
  } catch (error) {
    console.error("❌ Error testing dashboard:", error.message);
    console.error("\n💡 Make sure the dev server is running: npm run dev");
  }
}

// Wait a few seconds for server to be fully ready
console.log("⏳ Waiting for dev server to be ready...\n");
setTimeout(testDashboard, 5000);
