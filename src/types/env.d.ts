declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Database
      DATABASE_URL: string;
      ACCELERATE_URL?: string;
      
      // Redis
      REDIS_URL?: string;
      
      // Auth
      CLERK_SECRET_KEY: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      
      // Security
      ENCRYPTION_KEY: string;
      ALLOWED_ORIGINS: string;
      
      // Feature Flags
      NEXT_PUBLIC_USE_MOCK_DB?: string;
      
      // Admin
      ADMIN_USER_IDS?: string;
      DEVELOPER_USER_IDS?: string;
      
      // Sentry
      SENTRY_DSN?: string;
      SENTRY_ORG?: string;
      SENTRY_PROJECT?: string;
      SENTRY_AUTH_TOKEN?: string;
      
      // Node
      NODE_ENV: 'development' | 'production' | 'test';
      
      // Next.js Runtime
      NEXT_RUNTIME?: 'nodejs' | 'edge';
      
      // CI/CD
      CI?: string;
      
      // Vercel
      VERCEL?: string;
      VERCEL_ENV?: 'development' | 'preview' | 'production';
      VERCEL_URL?: string;
      VERCEL_OIDC_TOKEN?: string;
      VERCEL_GIT_COMMIT_SHA?: string;
      VERCEL_GIT_COMMIT_MESSAGE?: string;
      VERCEL_GIT_COMMIT_AUTHOR_NAME?: string;
    }
  }
}

export {};
