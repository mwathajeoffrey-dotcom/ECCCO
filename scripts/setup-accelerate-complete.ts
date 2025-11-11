/**
 * Comprehensive Database Setup for Prisma Accelerate
 * Handles both direct PostgreSQL setup and migration guidance
 */

async function setupAccelerateDatabase() {
  console.log('🚀 Setting up Prisma Accelerate database...')
  
  // Check for required environment variables
  const accelerateUrl = process.env.ACCELERATE_URL
  const directDbUrl = process.env.DIRECT_DATABASE_URL || process.env.POSTGRES_URL
  
  console.log('\n📊 Environment Check:')
  console.log(`Accelerate URL: ${accelerateUrl ? '✅ Set' : '❌ Missing'}`)
  console.log(`Direct DB URL: ${directDbUrl ? '✅ Set' : '❌ Missing'}`)
  
  if (directDbUrl) {
    await setupWithDirectUrl(directDbUrl)
  } else if (accelerateUrl) {
    await setupWithAccelerateOnly(accelerateUrl)
  } else {
    console.log('\n❌ No database URLs available. Please provide either:')
    console.log('   - ACCELERATE_URL (for Accelerate setup)')
    console.log('   - DIRECT_DATABASE_URL (for direct schema setup)')
    process.exit(1)
  }
}

async function setupWithDirectUrl(directDbUrl: string) {
  console.log('\n🎯 Setting up with direct PostgreSQL URL...')
  
  const { execSync } = require('child_process')
  const fs = require('fs')
  
  try {
    // Backup current environment
    console.log('💾 Backing up environment...')
    if (fs.existsSync('.env')) {
      fs.copyFileSync('.env', '.env.backup')
    }
    
    // Update environment to use direct URL temporarily
    console.log('🔄 Configuring for direct database access...')
    
    let envContent = fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : ''
    
    // Update DATABASE_URL to direct URL
    if (envContent.includes('DATABASE_URL=')) {
      envContent = envContent.replace(/DATABASE_URL=.*/g, `DATABASE_URL="${directDbUrl}"`)
    } else {
      envContent += `\nDATABASE_URL="${directDbUrl}"\n`
    }
    
    fs.writeFileSync('.env.temp', envContent)
    console.log('✅ Temporary environment configured')
    
    // Set up production schema
    console.log('🏗️  Setting up production schema...')
    execSync('cp .env.temp .env', { stdio: 'inherit' })
    execSync('npm run db:setup:prod', { stdio: 'inherit' })
    
    // Push schema to database
    console.log('📤 Pushing schema to database...')
    execSync('npx prisma db push --force-reset', { stdio: 'inherit' })
    
    // Seed database
    console.log('🌱 Seeding database...')
    try {
      execSync('npm run db:seed:prod', { stdio: 'inherit' })
    } catch (seedError) {
      console.log('⚠️  Seeding failed, but schema should be created. You can seed manually later.')
    }
    
    // Restore original environment
    console.log('🔄 Restoring original environment...')
    if (fs.existsSync('.env.backup')) {
      fs.copyFileSync('.env.backup', '.env')
      fs.unlinkSync('.env.backup')
    }
    fs.unlinkSync('.env.temp')
    
    console.log('✅ Database setup completed!')
    console.log('\n🧪 Testing production API in 10 seconds...')
    
    setTimeout(async () => {
      try {
        const { execSync } = require('child_process')
        const result = execSync('curl -s "https://eccco.vercel.app/api/modules"', { encoding: 'utf8' })
        console.log('\n📊 Production API Response:')
        console.log(result.substring(0, 500) + (result.length > 500 ? '...' : ''))
        
        if (result.includes('"success":true')) {
          console.log('\n🎉 SUCCESS! Production database is working!')
        } else {
          console.log('\n⚠️  API response indicates issues. Check the full response above.')
        }
      } catch (error) {
        console.log('\n❌ Error testing API:', error)
      }
    }, 10000)
    
  } catch (error: any) {
    console.error('\n❌ Setup failed:', error.message)
    
    // Restore environment on error
    if (require('fs').existsSync('.env.backup')) {
      require('fs').copyFileSync('.env.backup', '.env')
      require('fs').unlinkSync('.env.backup')
    }
    throw error
  }
}

async function setupWithAccelerateOnly(accelerateUrl: string) {
  console.log('\n🔗 Working with Accelerate URL only...')
  console.log('\n📝 Manual setup required through Prisma Console:')
  console.log('\n1. 🌐 Go to: https://console.prisma.io/')
  console.log('2. 🔍 Find your ECCCO project')
  console.log('3. 📊 Navigate to Database settings')
  console.log('4. 🔗 Copy the direct PostgreSQL URL (not Accelerate URL)')
  console.log('5. 🔄 Run: DIRECT_DATABASE_URL="postgresql://..." npx tsx scripts/setup-accelerate-complete.ts')
  
  // Test current Accelerate connectivity
  console.log('\n🧪 Testing Accelerate connectivity...')
  
  try {
    const { PrismaClient } = require('@prisma/client-production')
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: accelerateUrl
        }
      }
    })
    
    await prisma.$connect()
    const result = await prisma.$queryRaw`SELECT 1 as test`
    await prisma.$disconnect()
    
    console.log('✅ Accelerate connection working')
    console.log('❌ Database schema missing - manual setup required')
    
  } catch (error: any) {
    console.log('❌ Accelerate connection failed:', error.message)
  }
}

// Add to package.json scripts
console.log('\n💡 TIP: Add this to your package.json scripts:')
console.log('"setup-accelerate-db": "npx tsx scripts/setup-accelerate-complete.ts"')

// Run if called directly
if (require.main === module) {
  setupAccelerateDatabase()
    .then(() => {
      if (!process.env.DIRECT_DATABASE_URL) {
        console.log('\n🎯 Next: Get direct PostgreSQL URL from Prisma Console')
      }
    })
    .catch((error) => {
      console.error('Setup failed:', error)
      process.exit(1)
    })
}