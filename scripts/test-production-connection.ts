/**
 * Test Production Database Connection
 * Simple test to verify Accelerate connectivity
 */

async function testProductionConnection() {
  console.log('🧪 Testing production database connection...')
  
  const accelerateUrl = process.env.ACCELERATE_URL
  if (!accelerateUrl) {
    console.error('❌ ACCELERATE_URL environment variable is required')
    process.exit(1)
  }
  
  // Import the production Prisma client
  const { PrismaClient } = require('@prisma/client-production')
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: accelerateUrl
      }
    }
  })
  
  try {
    console.log('🔗 Connecting to Prisma Accelerate...')
    await prisma.$connect()
    console.log('✅ Connection successful!')
    
    // Test a simple query
    console.log('🔍 Testing basic query...')
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Basic query successful:', result)
    
    // Try to check what tables exist
    console.log('📋 Checking existing tables...')
    try {
      const tables = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
      `
      console.log('📊 Existing tables:', tables)
    } catch (tableError: any) {
      console.log('❌ Could not list tables:', tableError.message)
    }
    
    // Try a simple count query on each expected table
    console.log('🧮 Testing table access...')
    const tables = ['User', 'Module', 'Topic', 'Question', 'ExamSession']
    
    for (const table of tables) {
      try {
        const count = await prisma.$queryRaw`SELECT COUNT(*) as count FROM ${table}`
        console.log(`✅ ${table}: accessible (${count[0].count} records)`)
      } catch (error: any) {
        console.log(`❌ ${table}: ${error.message}`)
      }
    }
    
  } catch (error: any) {
    console.error('❌ Connection test failed:', error.message)
  } finally {
    await prisma.$disconnect()
    process.exit(0)
  }
}

testProductionConnection()