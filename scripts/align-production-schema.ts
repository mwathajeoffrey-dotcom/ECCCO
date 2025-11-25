/**
 * Production Schema Alignment Script
 * Ensures production Prisma Accelerate database has the correct schema
 */

async function alignProductionSchema() {
  console.log('🔧 Aligning production schema for Prisma Accelerate...')
  
  try {
    // Get environment variable
    const accelerateUrl = process.env.ACCELERATE_URL
    if (!accelerateUrl) {
      throw new Error('ACCELERATE_URL environment variable is required')
    }
    
    console.log('📋 Setting up production schema configuration...')
    
    const { execSync } = require('child_process')
    const fs = require('fs')
    
    // Create a temporary schema file for production push
    let productionSchemaContent = fs.readFileSync('prisma/schema.production.prisma', 'utf8')
    
    // Update to use Accelerate URL for direct schema operations
    productionSchemaContent = productionSchemaContent.replace(
      'url      = env("DATABASE_URL")',
      'url      = env("ACCELERATE_URL")'
    )
    
    // Write temporary schema
    fs.writeFileSync('prisma/schema.temp.prisma', productionSchemaContent)
    console.log('✅ Temporary production schema created')
    
    // Generate client with production schema
    console.log('🔧 Generating Prisma client for production...')
    execSync('PRISMA_SCHEMA_LOCATION=prisma/schema.temp.prisma npx prisma generate', { 
      stdio: 'inherit',
      env: { ...process.env, ACCELERATE_URL: accelerateUrl }
    })
    
    console.log('📊 Checking database schema status...')
    
    // Import the client
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: accelerateUrl
        }
      }
    })
    
    try {
      // Test if schema exists
      console.log('🔍 Testing schema connectivity...')
      
      // Try to query a simple table
      const result = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('Module', 'Topic', 'Question', 'User', 'ExamSession')
      `
      
      console.log('📋 Found tables:', result.length > 0 ? result.map((r: any) => r.table_name) : 'None')
      
      if (result.length === 0) {
        console.log('🚀 Creating database schema...')
        
        // Use Prisma's push functionality with temporary schema
        execSync('PRISMA_SCHEMA_LOCATION=prisma/schema.temp.prisma npx prisma db push --force-reset', { 
          stdio: 'inherit',
          env: { ...process.env, ACCELERATE_URL: accelerateUrl }
        })
        
        console.log('✅ Schema pushed successfully')
      } else {
        console.log('✅ Schema already exists and appears complete')
      }
      
      // Verify the schema by testing a simple query
      console.log('🔍 Verifying schema functionality...')
      const moduleCount = await prisma.module.count()
      const topicCount = await prisma.topic.count()
      const questionCount = await prisma.question.count()
      
      console.log(`📊 Schema verification:`)
      console.log(`  ✅ Modules: ${moduleCount}`)
      console.log(`  ✅ Topics: ${topicCount}`)
      console.log(`  ✅ Questions: ${questionCount}`)
      
      console.log('🎉 Production schema alignment completed successfully!')
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('❌ Schema verification failed:', errorMessage)
      
      // If verification fails, try to recreate schema
      console.log('🔄 Attempting to recreate schema...')
      
      try {
        execSync('PRISMA_SCHEMA_LOCATION=prisma/schema.temp.prisma npx prisma db push --force-reset', { 
          stdio: 'inherit',
          env: { ...process.env, ACCELERATE_URL: accelerateUrl }
        })
        
        console.log('✅ Schema recreated successfully')
        
        // Test again
        const moduleCount = await prisma.module.count()
        console.log(`📊 Modules after recreation: ${moduleCount}`)
        
      } catch (recreateError: unknown) {
        const recreateErrorMessage = recreateError instanceof Error ? recreateError.message : String(recreateError);
        console.error('❌ Schema recreation failed:', recreateErrorMessage)
        throw recreateError
      }
    } finally {
      await prisma.$disconnect()
    }
    
    // Clean up temporary files
    console.log('🧹 Cleaning up temporary files...')
    if (fs.existsSync('prisma/schema.temp.prisma')) {
      fs.unlinkSync('prisma/schema.temp.prisma')
    }
    
    console.log('✅ Production schema alignment completed!')
    
  } catch (error) {
    console.error('❌ Schema alignment failed:', error)
    throw error
  }
}

// Run if called directly
if (require.main === module) {
  alignProductionSchema()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Alignment failed:', error)
      process.exit(1)
    })
}

export { alignProductionSchema }