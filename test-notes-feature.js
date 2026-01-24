#!/usr/bin/env node

/**
 * Automated test for Clinical Notes API
 * Tests the /api/notes endpoint locally
 */

const BASE_URL = 'http://localhost:3000';

async function testNotesAPI() {
  console.log('🧪 Testing Clinical Notes Feature Locally\n');
  console.log('='.repeat(50));
  
  // Test 1: Create a note
  console.log('\n📝 Test 1: Creating a clinical note...');
  const testNote = {
    title: 'Local Test Note',
    content: 'This is an automated test of the clinical notes feature. Testing if notes save correctly to the database.',
    tags: ['test', 'automated', 'local'],
    searchQuery: 'sepsis treatment guidelines',
    evidenceSummary: 'Test evidence summary from local testing',
    specialty: 'Emergency Medicine',
    patientContext: 'Test patient scenario'
  };
  
  try {
    const createResponse = await fetch(`${BASE_URL}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testNote)
    });
    
    console.log(`   Status: ${createResponse.status} ${createResponse.statusText}`);
    
    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error('   ❌ FAILED to create note!');
      console.error('   Error:', JSON.stringify(errorData, null, 2));
      return false;
    }
    
    const createdNote = await createResponse.json();
    console.log('   ✅ Note created successfully!');
    console.log('   Note ID:', createdNote.id);
    console.log('   Title:', createdNote.title);
    console.log('   Tags:', createdNote.tags);
    
    // Test 2: Retrieve all notes
    console.log('\n📋 Test 2: Retrieving all notes...');
    const getResponse = await fetch(`${BASE_URL}/api/notes`);
    console.log(`   Status: ${getResponse.status} ${getResponse.statusText}`);
    
    if (!getResponse.ok) {
      console.error('   ❌ FAILED to retrieve notes!');
      return false;
    }
    
    const notes = await getResponse.json();
    console.log('   ✅ Notes retrieved successfully!');
    console.log(`   Total notes: ${notes.length}`);
    
    // Verify our note is in the list
    const ourNote = notes.find(n => n.id === createdNote.id);
    if (ourNote) {
      console.log('   ✅ Our test note found in the list!');
    } else {
      console.log('   ❌ Our test note NOT found in the list!');
      return false;
    }
    
    // Test 3: Update the note
    console.log('\n✏️  Test 3: Updating the note...');
    const updateData = {
      id: createdNote.id,
      title: 'Updated Test Note',
      content: createdNote.content + '\n\nUPDATED: This note was successfully updated.',
      tags: [...createdNote.tags, 'updated']
    };
    
    const updateResponse = await fetch(`${BASE_URL}/api/notes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    
    console.log(`   Status: ${updateResponse.status} ${updateResponse.statusText}`);
    
    if (!updateResponse.ok) {
      console.error('   ❌ FAILED to update note!');
      return false;
    }
    
    const updatedNote = await updateResponse.json();
    console.log('   ✅ Note updated successfully!');
    console.log('   New title:', updatedNote.title);
    console.log('   New tags:', updatedNote.tags);
    
    // Test 4: Delete the note
    console.log('\n🗑️  Test 4: Deleting the test note...');
    const deleteResponse = await fetch(`${BASE_URL}/api/notes/${createdNote.id}`, {
      method: 'DELETE'
    });
    
    console.log(`   Status: ${deleteResponse.status} ${deleteResponse.statusText}`);
    
    if (!deleteResponse.ok) {
      console.error('   ❌ FAILED to delete note!');
      return false;
    }
    
    console.log('   ✅ Note deleted successfully!');
    
    // Verify deletion
    console.log('\n🔍 Test 5: Verifying note was deleted...');
    const verifyResponse = await fetch(`${BASE_URL}/api/notes`);
    const remainingNotes = await verifyResponse.json();
    const deletedNote = remainingNotes.find(n => n.id === createdNote.id);
    
    if (!deletedNote) {
      console.log('   ✅ Note successfully removed from database!');
    } else {
      console.log('   ❌ Note still exists in database!');
      return false;
    }
    
    // All tests passed!
    console.log('\n' + '='.repeat(50));
    console.log('🎉 ALL TESTS PASSED! ✅');
    console.log('='.repeat(50));
    console.log('\n✅ The Clinical Notes feature is working correctly!');
    console.log('✅ Notes can be created, read, updated, and deleted');
    console.log('✅ Database integration is functioning');
    console.log('✅ API endpoints are responding correctly');
    console.log('\n🚀 READY TO DEPLOY TO VERCEL!\n');
    
    return true;
    
  } catch (error) {
    console.error('\n❌ TEST FAILED WITH ERROR:');
    console.error(error);
    console.error('\n⚠️  Make sure the dev server is running: npm run dev');
    return false;
  }
}

// Run the tests
testNotesAPI().then(success => {
  process.exit(success ? 0 : 1);
});
