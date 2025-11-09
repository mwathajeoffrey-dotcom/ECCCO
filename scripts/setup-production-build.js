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

// Schema file paths
const productionSchema = path.join(__dirname, '../prisma/schema.production.prisma');
const developmentSchema = path.join(__dirname, '../prisma/schema.development.prisma');
const targetSchema = path.join(__dirname, '../prisma/schema.prisma');

try {
  if (isProduction) {
    console.log('📦 Setting up production build with PostgreSQL...');
    
    // Copy production schema
    if (fs.existsSync(productionSchema)) {
      fs.copyFileSync(productionSchema, targetSchema);
      console.log('✅ Copied production schema (PostgreSQL)');
    } else {
      console.error('❌ Production schema not found!');
      process.exit(1);
    }
  } else {
    console.log('🔧 Setting up development build with SQLite...');
    
    // Copy development schema
    if (fs.existsSync(developmentSchema)) {
      fs.copyFileSync(developmentSchema, targetSchema);
      console.log('✅ Copied development schema (SQLite)');
    } else {
      console.error('❌ Development schema not found!');
      process.exit(1);
    }
  }

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