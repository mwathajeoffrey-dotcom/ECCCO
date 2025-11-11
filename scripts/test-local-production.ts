#!/usr/bin/env tsx
console.log('🧪 Testing local connection to production database...');

// Set production environment variables
process.env.NODE_ENV = 'production';
process.env.ACCELERATE_URL = 'prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza184UEg4a0diUzJKZmRqNGhKdjlkd20iLCJhcGlfa2V5IjoiMDFLOVM4QVQzRE5ONTFaSDFDS05SNFpIMTIiLCJ0ZW5hbnRfaWQiOiI4OGY4NDliNWJmMjE3ZjQwMTBkNjZjYTJiOTkxNzUzYTUwZDE1MjIyNzM2OGZhNjhlYTE1YzFmZjBhZTZiZTk4IiwiaW50ZXJuYWxfc2VjcmV0IjoiOTgwMDI2MjgtOGQ3ZC00MmJlLThkNjQtYWIzZTUzZTcwMGRlIn0.do9nCwZRLC0L2ED_0GjvTlKhOrIk1tY9SU_l4rJkTjU';

async function testLocalProductionConnection() {
  try {
    console.log('🔄 Importing Prisma client...');
    
    // Import the default prisma client
    const { default: prisma } = await import('../src/lib/database/prisma-client');
    
    console.log('🧪 Testing basic connection...');
    await prisma.$connect();
    console.log('✅ Connected to database');
    
    console.log('📊 Fetching modules...');
    const modules = await prisma.module.findMany();
    
    console.log(`✅ Found ${modules.length} modules`);
    
    if (modules.length === 0) {
      console.log('🌱 Creating sample modules...');
      
      const adultModule = await prisma.module.upsert({
        where: { name: 'Adult Emergency Medicine' },
        update: {},
        create: {
          name: 'Adult Emergency Medicine',
          description: 'Emergency Medicine for Adult Patients',
          ageGroup: 'adult'
        }
      });
      
      const pediatricModule = await prisma.module.upsert({
        where: { name: 'Pediatric Emergency Medicine' },
        update: {},
        create: {
          name: 'Pediatric Emergency Medicine',
          description: 'Emergency Medicine for Pediatric Patients',
          ageGroup: 'pediatric'
        }
      });
      
      console.log(`✅ Created modules: ${adultModule.name}, ${pediatricModule.name}`);
      
      // Create some topics
      await prisma.topic.upsert({
        where: { moduleId_name: { moduleId: adultModule.id, name: 'Cardiovascular Emergencies' } },
        update: {},
        create: {
          name: 'Cardiovascular Emergencies',
          description: 'Adult cardiovascular emergency conditions',
          moduleId: adultModule.id,
          category: 'cardiovascular'
        }
      });
      
      console.log('✅ Created sample topic');
    } else {
      console.log('📋 Existing modules:');
      modules.forEach(module => {
        console.log(`  - ${module.name} (${module.ageGroup})`);
      });
    }
    
    await prisma.$disconnect();
    console.log('🎉 Local production test successful!');
    
    return { success: true, modules: modules.length };
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Error details:', error.message);
    return { success: false, error: error.message };
  }
}

testLocalProductionConnection();