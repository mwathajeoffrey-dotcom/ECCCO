#!/usr/bin/env node

/**
 * Auto-approve all pending papers in the Evidence Library
 * Run with: node approve-all-papers.js
 */

async function approveAllPapers() {
  console.log('✅ Auto-approving all pending papers...\n');

  try {
    // Fetch all pending papers
    const response = await fetch('https://eccco.vercel.app/api/evidence?status=pending&limit=100');
    const data = await response.json();

    if (!data.success || !data.papers?.length) {
      console.log('ℹ️  No pending papers found');
      return;
    }

    console.log(`📚 Found ${data.papers.length} pending papers\n`);

    let approved = 0;
    for (const paper of data.papers) {
      try {
        const approveResponse = await fetch(`https://eccco.vercel.app/api/evidence/${paper.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'approved',
            reviewedBy: 'auto-approve-script',
          }),
        });

        const result = await approveResponse.json();

        if (result.success) {
          console.log(`   ✓ Approved: ${paper.title.substring(0, 60)}...`);
          approved++;
        } else {
          console.log(`   ✗ Failed: ${paper.title.substring(0, 60)}...`);
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.error(`   ✗ Error approving paper: ${error.message}`);
      }
    }

    console.log(`\n✅ Approved ${approved} out of ${data.papers.length} papers`);
    console.log('\n🎉 Evidence Library is now live!');
    console.log('   Visit: https://eccco.vercel.app/evidence\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

approveAllPapers();
