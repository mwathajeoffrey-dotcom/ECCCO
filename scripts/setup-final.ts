#!/usr/bin/env tsx
console.log('🚀 Setting up database with new Prisma+Postgres URL...');

import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

async function setupDatabaseWithNewUrl() {
  try {
    // Set environment for PostgreSQL schema
    process.env.DATABASE_URL = process.env.ACCELERATE_URL;
    
    console.log('🔌 Creating Prisma client...');
    const prisma = new PrismaClient().$extends(withAccelerate());

    console.log('🧪 Testing basic connection...');
    
    // Try to check if tables exist
    try {
      const modules = await prisma.module.findMany();
      console.log(`✅ Database connected! Found ${modules.length} modules.`);
      
      if (modules.length === 0) {
        console.log('🌱 Seeding database with initial data...');
        
        // Create Adult Emergency Medicine module
        const adultModule = await prisma.module.create({
          data: {
            name: 'Adult Emergency Medicine',
            description: 'Emergency Medicine for Adult Patients',
            ageGroup: 'adult'
          }
        });
        
        // Create Pediatric Emergency Medicine module  
        const pediatricModule = await prisma.module.create({
          data: {
            name: 'Pediatric Emergency Medicine',
            description: 'Emergency Medicine for Pediatric Patients',
            ageGroup: 'pediatric'
          }
        });
        
        console.log(`✅ Created modules: ${adultModule.name}, ${pediatricModule.name}`);
        
        // Create some basic topics
        await prisma.topic.create({
          data: {
            name: 'Cardiovascular Emergencies',
            description: 'Adult cardiovascular emergency conditions',
            moduleId: adultModule.id,
            category: 'cardiovascular'
          }
        });
        
        await prisma.topic.create({
          data: {
            name: 'Pediatric Resuscitation',
            description: 'Pediatric emergency resuscitation protocols',
            moduleId: pediatricModule.id,
            category: 'resuscitation'
          }
        });
        
        console.log('✅ Created sample topics');
      }
      
      // Final verification
      const finalModules = await prisma.module.findMany({
        include: { topics: true }
      });
      
      console.log('\n📊 Database Summary:');
      finalModules.forEach(module => {
        console.log(`  📚 ${module.name} (${module.topics.length} topics)`);
      });
      
      console.log('\n🎉 Database setup completed successfully!');
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log('❌ Tables not found, might need schema push...');
      console.error('Error details:', errorMessage);
    }

    await prisma.$disconnect();

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Setup failed:', error);
    console.error('Error details:', errorMessage);
  }
}

setupDatabaseWithNewUrl();