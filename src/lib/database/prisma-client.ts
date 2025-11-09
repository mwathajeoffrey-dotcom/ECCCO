import { withAccelerate } from '@prisma/extension-accelerate';

// Dynamic client creation that works in both development and production
function createPrismaClient() {
  let PrismaClient: any;

  // In production builds, the client is generated to a different location
  try {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      // Try to use production client path
      PrismaClient = require('@prisma/client-production').PrismaClient;
    } else {
      // Use standard development client
      PrismaClient = require('@prisma/client').PrismaClient;
    }
  } catch (error) {
    // Fallback to standard client if production client not found
    try {
      PrismaClient = require('@prisma/client').PrismaClient;
    } catch (fallbackError) {
      console.error('Failed to load Prisma client:', fallbackError);
      throw new Error('Could not load Prisma client');
    }
  }

  const baseClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

  // Check if we should use Accelerate (production with Accelerate URL)
  const useAccelerate = process.env.ACCELERATE_URL || 
    (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL?.includes('accelerate'));

  if (useAccelerate) {
    console.log('🚀 Using Prisma Accelerate for enhanced performance');
    return baseClient.$extends(withAccelerate());
  } else {
    console.log('🔧 Using standard Prisma client');
    return baseClient;
  }
}

// Create a singleton Prisma client with Accelerate support
const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;