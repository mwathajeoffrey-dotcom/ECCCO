#!/usr/bin/env tsx
console.log('🚀 Testing database schema creation with new Accelerate URL...');

import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Use the new accelerate URL format
const accelerateUrl = 'prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza184UEg4a0diUzJKZmRqNGhKdjlkd20iLCJhcGlfa2V5IjoiMDFLOVM4QVQzRE5ONTFaSDFDS05SNFpIMTIiLCJ0ZW5hbnRfaWQiOiI4OGY4NDliNWJmMjE3ZjQwMTBkNjZjYTJiOTkxNzUzYTUwZDE1MjIyNzM2OGZhNjhlYTE1YzFmZjBhZTZiZTk4IiwiaW50ZXJuYWxfc2VjcmV0IjoiOTgwMDI2MjgtOGQ3ZC00MmJlLThkNjQtYWIzZTUzZTcwMGRlIn0.do9nCwZRLC0L2ED_0GjvTlKhOrIk1tY9SU_l4rJkTjU';

async function testNewAccelerateConnection() {
  try {
    console.log('🔌 Creating Prisma client with new Accelerate URL...');
    
    const prisma = new PrismaClient({
      datasourceUrl: accelerateUrl,
    }).$extends(withAccelerate());

    console.log('📊 Testing connection...');
    const result = await prisma.$executeRaw`SELECT 1 as test`;
    console.log('✅ Connection successful!');

    console.log('📋 Testing module query...');
    const modules = await prisma.module.findMany();
    console.log(`✅ Found ${modules.length} modules`);

    if (modules.length === 0) {
      console.log('🌱 Database is empty, creating sample module...');
      
      const module = await prisma.module.create({
        data: {
          id: 'adult-cardiology',
          title: 'Adult Cardiology',
          description: 'Adult Cardiovascular Medicine',
          category: 'ADULT',
          isActive: true
        }
      });
      
      console.log('✅ Created sample module:', module.title);
    } else {
      console.log('📋 Existing modules:');
      modules.forEach(m => console.log(`  - ${m.title} (${m.category})`));
    }

    await prisma.$disconnect();
    console.log('🎉 Database setup completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Error details:', error.message);
  }
}

testNewAccelerateConnection();