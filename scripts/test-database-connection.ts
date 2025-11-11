#!/usr/bin/env tsx
console.log('🔍 Testing database connection options...');

// Test different URL formats
const urls = {
  accelerate: process.env.ACCELERATE_URL,
  direct: process.env.DIRECT_DATABASE_URL,
  database: process.env.DATABASE_URL,
};

console.log('📋 Available URLs:');
Object.entries(urls).forEach(([key, value]) => {
  if (value) {
    const masked = value.replace(/api_key=[^&]+/, 'api_key=***');
    console.log(`${key}: ${masked}`);
  } else {
    console.log(`${key}: ❌ Not set`);
  }
});

// Try to extract direct PostgreSQL from the prisma+postgres URL
if (process.env.DIRECT_DATABASE_URL?.startsWith('prisma+postgres://')) {
  const url = process.env.DIRECT_DATABASE_URL;
  console.log('\n🔄 Attempting to convert prisma+postgres URL...');
  
  // Extract the API key
  const apiKeyMatch = url.match(/api_key=([^&]+)/);
  if (apiKeyMatch) {
    console.log('✅ Found API key in URL');
    console.log('💡 This appears to be an Accelerate connection URL');
    console.log('');
    console.log('🎯 Recommendation:');
    console.log('1. Use this URL as ACCELERATE_URL in production');
    console.log('2. Keep existing sqlite DATABASE_URL for development');
    console.log('3. Let the prisma client handle the environment switching');
  }
}