# Environment Variables Guide

This project uses centralized environment variable validation to ensure all required configuration is present before the app starts.

## 📁 Files

- **`src/lib/config.ts`** - Schema validation using Zod
- **`src/lib/env.ts`** - Type-safe environment variable exports
- **`.env.local`** - Your local development environment variables (gitignored)
- **`.env.example`** - Template for required environment variables

## ✅ Required Variables

### Always Required
```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

### Required in Production
```bash
# Security
ENCRYPTION_KEY="..." # min 32 characters - generate with: openssl rand -base64 32
ALLOWED_ORIGINS="https://yourdomain.com"
```

## 🔧 Optional Variables

```bash
# Admin Access
ADMIN_USER_IDS="user_123,user_456"
DEVELOPER_USER_IDS="user_789"

# AI Services
GROQ_API_KEY="gsk_..."

# Caching
REDIS_URL="redis://..."

# Monitoring (Sentry)
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."
SENTRY_DSN="https://...@sentry.io/..."
SENTRY_ORG="your-org"
SENTRY_PROJECT="your-project"
SENTRY_AUTH_TOKEN="sntryu_..."
```

## 🚀 Usage

### Import the validated environment

Instead of using `process.env` directly:

```typescript
// ❌ Don't do this
const dbUrl = process.env.DATABASE_URL;

// ✅ Do this instead
import { env } from '@/lib/env';
const dbUrl = env.DATABASE_URL;
```

### Benefits

1. **Type Safety** - Autocomplete and type checking
2. **Early Validation** - Errors caught at startup, not runtime
3. **Documentation** - All env vars defined in one place
4. **Defaults** - Sensible defaults for optional vars

### Helper Functions

```typescript
import { isProduction, isDevelopment, getEnv, getRequiredEnv } from '@/lib/env';

if (isProduction()) {
  // Production-only code
}

// Get with fallback
const apiKey = getEnv('OPTIONAL_API_KEY', 'default-value');

// Get required (throws if missing)
const criticalKey = getRequiredEnv('CRITICAL_KEY');
```

## 🐛 Troubleshooting

### "Invalid environment configuration" error

This means a required environment variable is missing or invalid.

**Fix:**
1. Check the error message for which variable is missing
2. Add it to your `.env.local` file
3. Restart your dev server

### "ENCRYPTION_KEY must be at least 32 characters"

Generate a secure key:
```bash
openssl rand -base64 32
```

Then add to `.env.local`:
```bash
ENCRYPTION_KEY="your-generated-key-here"
```

### Variables not updating

After changing `.env.local`, you must restart the dev server:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

## 📝 Adding New Environment Variables

1. **Add to schema** in `src/lib/config.ts`:
```typescript
const envSchema = z.object({
  // ... existing vars
  MY_NEW_VAR: z.string().optional(),
});
```

2. **Add to config object** in `src/lib/config.ts`:
```typescript
export const config = {
  myFeature: {
    apiKey: process.env.MY_NEW_VAR,
  },
};
```

3. **Export from env.ts**:
```typescript
export const env = {
  // ... existing exports
  MY_NEW_VAR: config.myFeature.apiKey,
};
```

4. **Update `.env.example`**:
```bash
# My Feature
MY_NEW_VAR="optional-value"
```

5. **Restart dev server**

## 🔒 Security

- Never commit `.env.local` to git (it's in `.gitignore`)
- Use `.env.example` as a template (without real values)
- In production, set env vars in your hosting platform (Vercel, etc.)
- Rotate sensitive keys regularly

## 📚 Learn More

- [Zod Documentation](https://zod.dev)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
