import { logger } from '@/lib/logger';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Create Prisma client with conditional Accelerate support
function createPrismaClient() {
  // In Prisma 7, we use adapters for database connections
  const isDev = process.env.NODE_ENV === 'development';
  
  // Create connection pool and adapter
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  const baseClient = new PrismaClient({
    log: isDev ? ['error', 'warn'] : ['error'],
    adapter,
  });

  // Only use Accelerate in production with Accelerate URL
  const useAccelerate = !isDev && process.env.ACCELERATE_URL && 
    process.env.NODE_ENV === 'production';

  if (useAccelerate) {
    logger.debug('🚀 Using Prisma Accelerate for enhanced performance');
    return baseClient.$extends(withAccelerate());
  } else {
    logger.debug('🔧 Using local Prisma client');
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