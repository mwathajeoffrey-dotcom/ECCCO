/**
 * Environment Variable Initialization & Validation
 * 
 * This file should be imported FIRST in your app to validate all
 * environment variables before any other code runs.
 * 
 * Import this in:
 * - instrumentation.ts (for Next.js instrumentation hook)
 * - middleware.ts (for edge runtime)
 * - Any server entry points
 */

import { config, validateEnv } from './config';

// Run validation immediately when this module is imported
validateEnv();

/**
 * Type-safe environment variable exports
 * Use these instead of process.env throughout your app
 */
export const env = {
  // Node environment
  NODE_ENV: config.app.environment,
  isProduction: config.app.isProduction,
  isDevelopment: config.app.isDevelopment,
  
  // Database
  DATABASE_URL: config.database.url,
  ACCELERATE_URL: config.database.accelerateUrl,
  
  // Authentication
  CLERK_PUBLISHABLE_KEY: config.clerk.publishableKey,
  CLERK_SECRET_KEY: config.clerk.secretKey,
  
  // Admin
  ADMIN_USER_IDS: config.admin.userIds,
  DEVELOPER_USER_IDS: config.admin.developerIds,
  
  // AI
  GROQ_API_KEY: config.ai.groqApiKey,
  OLLAMA_BASE_URL: config.ai.ollamaBaseUrl,
  OLLAMA_MODEL: config.ai.ollamaModel,
  
  // Cache
  REDIS_URL: config.cache.redisUrl,
  KV_URL: config.cache.kvUrl,
  KV_TOKEN: config.cache.kvToken,
  
  // Monitoring
  SENTRY_DSN: config.sentry.dsn,
  SENTRY_PUBLIC_DSN: config.sentry.publicDsn,
  SENTRY_ORG: config.sentry.org,
  SENTRY_PROJECT: config.sentry.project,
  SENTRY_AUTH_TOKEN: config.sentry.authToken,
  
  // Security
  ALLOWED_ORIGINS: config.security.allowedOrigins,
  ENCRYPTION_KEY: config.security.encryptionKey,
  
  // App
  APP_URL: config.app.url,
} as const;

// Type exports for better TypeScript support
export type Environment = typeof env;

/**
 * Helper function to check if we're in production
 */
export const isProduction = () => env.NODE_ENV === 'production';

/**
 * Helper function to check if we're in development
 */
export const isDevelopment = () => env.NODE_ENV === 'development';

/**
 * Helper function to check if we're in test mode
 */
export const isTest = () => env.NODE_ENV === 'test';

/**
 * Get environment variable with type safety
 * Falls back to process.env if not in typed config
 */
export function getEnv(key: string, fallback?: string): string | undefined {
  return process.env[key] || fallback;
}

/**
 * Get required environment variable
 * Throws error if not found
 */
export function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
}

export default env;
