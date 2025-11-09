#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 CACHE BUSTER: Complete Prisma client regeneration');
console.log('Environment:', process.env.NODE_ENV);
console.log('VERCEL:', process.env.VERCEL);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

try {
  // Step 1: Clear ALL existing Prisma clients
  console.log('🧹 Clearing all existing Prisma clients...');
  
  const clientPaths = [
    path.join(__dirname, '../node_modules/.prisma'),
    path.join(__dirname, '../node_modules/@prisma/client'),
    path.join(__dirname, '../node_modules/@prisma/client-production'),
    path.join(__dirname, '../node_modules/@prisma/client-development')
  ];
  
  clientPaths.forEach(clientPath => {
    if (fs.existsSync(clientPath)) {
      console.log(`  Removing: ${clientPath}`);
      fs.rmSync(clientPath, { recursive: true, force: true });
    }
  });

  // Step 2: Select and copy correct schema
  const productionSchema = path.join(__dirname, '../prisma/schema.production.prisma');
  const developmentSchema = path.join(__dirname, '../prisma/schema.development.prisma');
  const targetSchema = path.join(__dirname, '../prisma/schema.prisma');
  
  if (isProduction) {
    console.log('📦 Setting up PRODUCTION schema (PostgreSQL)...');
    
    if (!fs.existsSync(productionSchema)) {
      console.error('❌ Production schema not found!');
      process.exit(1);
    }
    
    // Create production-specific schema with unique client path
    let schemaContent = fs.readFileSync(productionSchema, 'utf8');
    
    // Force unique client output for production
    schemaContent = schemaContent.replace(
      /output\s*=\s*"[^"]*"/g, 
      'output = "../node_modules/@prisma/client-production"'
    );
    
    // If no output specified, add it
    if (!schemaContent.includes('output =')) {
      schemaContent = schemaContent.replace(
        /generator client \{[^}]*\}/,
        `generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/@prisma/client-production"
}`
      );
    }
    
    fs.writeFileSync(targetSchema, schemaContent);
    console.log('✅ Production schema ready with unique client path');
    
  } else {
    console.log('🔧 Setting up DEVELOPMENT schema (SQLite)...');
    
    if (!fs.existsSync(developmentSchema)) {
      console.error('❌ Development schema not found!');
      process.exit(1);
    }
    
    // Create development-specific schema with unique client path  
    let schemaContent = fs.readFileSync(developmentSchema, 'utf8');
    
    // Force unique client output for development
    schemaContent = schemaContent.replace(
      /generator client \{[^}]*\}/,
      `generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/@prisma/client-development"
}`
    );
    
    fs.writeFileSync(targetSchema, schemaContent);
    console.log('✅ Development schema ready with unique client path');
  }

  // Step 3: Force fresh client generation
  console.log('🔄 Generating fresh Prisma client...');
  execSync('npx prisma generate --no-engine', { stdio: 'inherit' });
  
  // Step 4: Verify client generation
  const expectedClientPath = isProduction 
    ? path.join(__dirname, '../node_modules/@prisma/client-production')
    : path.join(__dirname, '../node_modules/@prisma/client-development');
    
  if (fs.existsSync(expectedClientPath)) {
    console.log('✅ Client generated at:', expectedClientPath);
    
    // Check schema provider in generated client
    const generatedSchemaPath = path.join(expectedClientPath, 'schema.prisma');
    if (fs.existsSync(generatedSchemaPath)) {
      const generatedSchema = fs.readFileSync(generatedSchemaPath, 'utf8');
      const providerMatch = generatedSchema.match(/provider = "([^"]+)"/);
      const provider = providerMatch ? providerMatch[1] : 'unknown';
      console.log('📋 Generated client database provider:', provider);
      
      if (isProduction && provider !== 'postgresql') {
        console.error('❌ PRODUCTION CLIENT STILL SHOWS:', provider);
        console.error('Expected: postgresql');
      } else if (!isProduction && provider !== 'sqlite') {
        console.error('❌ DEVELOPMENT CLIENT STILL SHOWS:', provider);
        console.error('Expected: sqlite');
      } else {
        console.log('🎯 SUCCESS: Client generated with correct provider!');
      }
    }
  } else {
    console.error('❌ Client not generated at expected path');
  }

  console.log('✨ Cache busting complete!');

} catch (error) {
  console.error('❌ Cache buster failed:', error.message);
  process.exit(1);
}