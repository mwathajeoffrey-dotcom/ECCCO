import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Create Prisma client with conditional Accelerate support
function createPrismaClient() {
  const baseClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasourceUrl: process.env.ACCELERATE_URL || process.env.DATABASE_URL,
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