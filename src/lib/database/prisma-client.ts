import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Create a singleton Prisma client with Accelerate support
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Environment-aware Prisma client initialization
function createPrismaClient() {
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

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;