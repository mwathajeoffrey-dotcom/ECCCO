#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Determine environment
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

console.log('🔧 Setting up build environment...');
console.log('Environment:', isProduction ? 'Production' : 'Development');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VERCEL:', process.env.VERCEL);
console.log('DATABASE_URL configured:', !!process.env.DATABASE_URL);

// Schema file path
const schemaPath = path.join(__dirname, '../prisma/schema.prisma');

try {
  // Verify schema exists
  if (!fs.existsSync(schemaPath)) {
    console.error('❌ Prisma schema not found at:', schemaPath);
    process.exit(1);
  }

  console.log('✅ Using unified Prisma schema');
  console.log('📋 Schema supports both SQLite (dev) and PostgreSQL (prod)');

  // Clear any existing Prisma client
  const prismaClientPath = path.join(__dirname, '../node_modules/.prisma/client');
  if (fs.existsSync(prismaClientPath)) {
    console.log('🧹 Clearing existing Prisma client...');
    fs.rmSync(prismaClientPath, { recursive: true, force: true });
  }

  // Generate Prisma client with new schema
  console.log('🔄 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully');

  // Verify the generated client
  const generatedSchemaPath = path.join(__dirname, '../node_modules/.prisma/client/schema.prisma');
  if (fs.existsSync(generatedSchemaPath)) {
    const generatedSchema = fs.readFileSync(generatedSchemaPath, 'utf8');
    const providerMatch = generatedSchema.match(/provider = "([^"]+)"/);
    const provider = providerMatch ? providerMatch[1] : 'unknown';
    console.log('📋 Generated client uses provider:', provider);
  }

} catch (error) {
  console.error('❌ Build setup failed:', error.message);
  process.exit(1);
}