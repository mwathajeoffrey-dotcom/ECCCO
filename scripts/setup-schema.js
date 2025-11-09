#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Determine environment
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

// Schema file paths
const productionSchema = path.join(__dirname, '../prisma/schema.production.prisma');
const developmentSchema = path.join(__dirname, '../prisma/schema.development.prisma');
const targetSchema = path.join(__dirname, '../prisma/schema.prisma');

try {
  if (isProduction) {
    console.log('📦 Setting up production schema (PostgreSQL)...');
    if (fs.existsSync(productionSchema)) {
      fs.copyFileSync(productionSchema, targetSchema);
      console.log('✅ Production schema ready');
    }
  } else {
    console.log('🔧 Setting up development schema (SQLite)...');
    if (fs.existsSync(developmentSchema)) {
      fs.copyFileSync(developmentSchema, targetSchema);
      console.log('✅ Development schema ready');
    }
  }
} catch (error) {
  console.error('❌ Schema setup failed:', error.message);
  // Don't fail the build, just warn
}