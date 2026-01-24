/**
 * Test script to check if the /api/notes endpoint works
 * Run with: npx ts-node --esm test-notes-api.ts
 */

async function testNotesAPI() {
  const baseUrl = "http://localhost:3000";
  
  console.log("Testing /api/notes POST endpoint...\n");
  
  const noteData = {
    title: "Test Clinical Note",
    content: "This is a test note created from automated testing",
    tags: ["test", "sepsis"],
    searchQuery: "sepsis treatment",
    evidenceSummary: "Test evidence summary",
    specialty: "Emergency Medicine",
    patientContext: "Test patient",
  };
  
  try {
    const response = await fetch(`${baseUrl}/api/notes`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    
    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log("Response data:", JSON.stringify(data, null, 2));
    
    if (!response.ok) {
      console.error("❌ API call failed!");
      console.error("Error:", data);
    } else {
      console.log("✅ API call successful!");
      console.log("Created note ID:", data.id);
    }
  } catch (error) {
    console.error("❌ Error calling API:", error);
  }
}

testNotesAPI();
