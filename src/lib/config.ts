import { logger } from "@/lib/logger";
/**
 * Centralized Configuration & Environment Variable Validation
 *
 * This ensures all required environment variables are present before the app starts.
 * Add any new required env vars to the appropriate array below.
 */

import { z } from "zod";

// Define environment variable schema
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Authentication (Clerk)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),

  // Optional: Admin/Developer Access
  ADMIN_USER_IDS: z.string().optional(),
  DEVELOPER_USER_IDS: z.string().optional(),

  // Optional: AI Services
  GROQ_API_KEY: z.string().optional(),
  OLLAMA_BASE_URL: z.string().url().optional(),
  OLLAMA_MODEL: z.string().optional(),

  // Optional: Caching
  KV_REST_API_URL: z.string().url().optional(),
  KV_REST_API_TOKEN: z.string().optional(),
  REDIS_URL: z.string().optional(),

  // Optional: Monitoring
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // Optional: Security
  ALLOWED_ORIGINS: z.string().optional(),
  ENCRYPTION_KEY: z.string().min(32).optional(),

  // Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

// Production-specific required variables
const productionRequiredVars = ["ENCRYPTION_KEY", "ALLOWED_ORIGINS"] as const;

/**
 * Validates environment variables at startup
 * Throws error if critical vars are missing in production
 */
export function validateEnv() {
  try {
    // Parse and validate base schema
    const env = envSchema.parse(process.env);

    // Additional production checks
    if (env.NODE_ENV === "production") {
      const missing = productionRequiredVars.filter((key) => !process.env[key] || process.env[key] === "");

      if (missing.length > 0) {
        throw new Error(
          `🔴 PRODUCTION ERROR: Missing required environment variables:\n` +
            missing.map((key) => `  - ${key}`).join("\n") +
            "\n\nSet these in your production environment (Vercel, .env.production, etc.)"
        );
      }

      // Validate encryption key strength in production
      if (process.env.ENCRYPTION_KEY && process.env.ENCRYPTION_KEY.length < 32) {
        throw new Error(
          "🔴 ENCRYPTION_KEY must be at least 32 characters long in production.\n" +
            "Generate a secure key with: openssl rand -base64 32"
        );
      }
    }

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error("❌ Environment Variable Validation Failed:");
      error.errors.forEach((err) => {
        logger.error(`  - ${err.path.join(".")}: ${err.message}`);
      });
      throw new Error("Invalid environment configuration");
    }
    throw error;
  }
}

/**
 * Type-safe environment variable access
 * Use this instead of process.env for better TypeScript support
 */
export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL!,
    accelerateUrl: process.env.ACCELERATE_URL,
  },

  // Auth
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!,
  },

  // Admin Access
  admin: {
    userIds: process.env.ADMIN_USER_IDS?.split(",").map((id) => id.trim()) || [],
    developerIds: process.env.DEVELOPER_USER_IDS?.split(",").map((id) => id.trim()) || [],
  },

  // AI Services
  ai: {
    groqApiKey: process.env.GROQ_API_KEY,
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
    ollamaModel: process.env.OLLAMA_MODEL || "meditron:7b-instruct",
  },

  // Caching
  cache: {
    kvUrl: process.env.KV_REST_API_URL,
    kvToken: process.env.KV_REST_API_TOKEN,
    redisUrl: process.env.REDIS_URL,
  },

  // Monitoring
  sentry: {
    dsn: process.env.SENTRY_DSN,
    publicDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
  },

  // Security
  security: {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [],
    encryptionKey: process.env.ENCRYPTION_KEY,
  },

  // App
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || "https://eccco.vercel.app",
    environment: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
  },
} as const;

// Validate on module load - this runs when the module is first imported
// Validates all environments to catch config errors early
try {
  validateEnv();
  logger.info("✅ Environment variables validated successfully");
} catch (error) {
  logger.error("❌ Environment validation failed:", error);
  // In development, log the error but continue
  // In production, the error will be thrown and crash the app (desired behavior)
  if (process.env.NODE_ENV === "production") {
    throw error;
  }
}

export default config;
