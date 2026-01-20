import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Create Prisma client with conditional Accelerate support
function createPrismaClient() {
  // Force local database for development
  const isDev = process.env.NODE_ENV === 'development';
  const datasourceUrl = isDev ? process.env.DATABASE_URL : (process.env.ACCELERATE_URL || process.env.DATABASE_URL);
  
  const baseClient = new PrismaClient({
    log: isDev ? ['error', 'warn'] : ['error'],
    datasourceUrl,
  });

  // Only use Accelerate in production with Accelerate URL
  const useAccelerate = !isDev && process.env.ACCELERATE_URL && 
    process.env.NODE_ENV === 'production';

  if (useAccelerate) {
    console.log('🚀 Using Prisma Accelerate for enhanced performance');
    return baseClient.$extends(withAccelerate());
  } else {
    console.log('🔧 Using local Prisma client');
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