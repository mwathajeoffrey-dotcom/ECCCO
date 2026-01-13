# 🎯 Common Coding Mistakes & How to Fix Them

**Analysis Date**: January 7, 2026
**Seed Progress**: 1,300/2,816 questions (46% complete)

---

## 🚨 Critical Issues Found in Your Codebase

### 1. **INCONSISTENT PRISMA IMPORTS** ⚠️ HIGH SEVERITY

**The Problem**:
You have **THREE different ways** to import Prisma across your codebase:

```typescript
// Method 1: Some files use this
import { prisma } from "@/lib/database/prisma-client";

// Method 2: Other files use this
import prisma from "@/lib/db";

// Method 3: Scripts use this
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```

**Why This Breaks Things**:

- Different imports may connect to different databases
- Some imports use Accelerate extension, others don't
- Causes confusion about which instance is being used
- Hard to debug connection issues
- Makes refactoring dangerous

**Files Affected**:

- ✅ `src/lib/db.ts` - Simple singleton
- ✅ `src/lib/database/prisma-client.ts` - With Accelerate
- ✅ `src/lib/database/prisma.ts` - Another singleton
- ❌ Mix of imports across API routes

**The Fix**:

```typescript
// ✅ CREATE ONE FILE: src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

```typescript
// ✅ EVERYWHERE ELSE: Always import the same way
import prisma from "@/lib/prisma";

// Never do this again:
// ❌ import { prisma } from '@/lib/database/prisma-client';
// ❌ import prisma from '@/lib/db';
```

---

### 2. **ENVIRONMENT VARIABLE CHAOS** ⚠️ HIGH SEVERITY

**The Problem**:
You're using environment variables inconsistently:

```typescript
// Found in your code:
const datasourceUrl = isDev
  ? process.env.DATABASE_URL
  : process.env.ACCELERATE_URL || process.env.DATABASE_URL;
```

**Why This Breaks Things**:

- Local dev uses SQLite (`DATABASE_URL="file:./prisma/dev.db"`)
- Production uses PostgreSQL but wasn't seeded
- No clear documentation of which env vars are needed
- Easy to forget to set production environment variables

**Current State**:

```bash
# Local (.env.development.local)
DATABASE_URL="file:./prisma/prisma/dev.db"  # SQLite

# Production (Vercel - should be set)
DATABASE_URL="postgresql://..." # PostgreSQL
ACCELERATE_URL="prisma://..." # Optional for caching
```

**The Fix**:

1. **Document ALL environment variables**:

```bash
# .env.example (commit this to git)
# Database
DATABASE_URL="file:./prisma/dev.db"  # Local: SQLite
# DATABASE_URL="postgresql://..." # Production: PostgreSQL

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-secure-secret-for-production"

# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Sentry (Error Tracking)
SENTRY_DSN="https://..."

# Optional: Prisma Accelerate for caching
# ACCELERATE_URL="prisma://..."
```

2. **Create validation script**:

```typescript
// src/lib/env-validation.ts
const requiredEnvVars = [
  "DATABASE_URL",
  "NEXTAUTH_SECRET",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
];

export function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.join("\n")}\n\n` +
        `Please check .env.example for required variables.`
    );
  }
}

// Call this in your app
validateEnv();
```

---

### 3. **NO ERROR HANDLING IN API ROUTES** ⚠️ MEDIUM SEVERITY

**The Problem**:
Many of your API routes have try-catch blocks, but they don't properly log or handle specific errors:

```typescript
// ❌ Your current pattern:
try {
  const session = await prisma.quizSession.findUnique({
    where: { id: sessionId },
  });
  // ... more code
} catch (error) {
  console.error("Error:", error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
```

**Why This Breaks Things**:

- Generic error messages make debugging impossible
- No distinction between database errors, validation errors, not found errors
- Users see unhelpful "Internal server error" messages
- Difficult to track down issues in production

**The Fix**:

```typescript
// ✅ Better error handling pattern:
import { Prisma } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = params.sessionId;

    // Validate input
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Database constraint violations, etc.
      console.error("Database error:", error.code, error.message);
      return NextResponse.json(
        { error: "Database operation failed", code: error.code },
        { status: 500 }
      );
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      // Invalid query
      console.error("Validation error:", error.message);
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }

    // Unknown error
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
```

---

### 4. **HARDCODED VALUES & MAGIC NUMBERS** ⚠️ LOW SEVERITY

**The Problem**:
You have hardcoded values scattered throughout your code:

```typescript
// Found in your code:
const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
setInterval(() => fetchSession(), 2000); // 2 second polling
```

**Why This Breaks Things**:

- Difficult to change behavior later
- No single source of truth for configuration
- Hard to test with different values

**The Fix**:

```typescript
// ✅ config/quiz-arena.ts
export const QUIZ_ARENA_CONFIG = {
  ACCESS_CODE_LENGTH: 6,
  ACCESS_CODE_MIN: 100000,
  ACCESS_CODE_MAX: 999999,
  POLLING_INTERVAL_MS: 2000,
  COUNTDOWN_INTERVAL_MS: 1000,
  DEFAULT_TIME_PER_QUESTION: 30,
  MIN_TIME_PER_QUESTION: 10,
  MAX_TIME_PER_QUESTION: 300,
  MAX_PARTICIPANTS: 100,
  SESSION_EXPIRY_HOURS: 24,
} as const;

// ✅ Usage:
const accessCode = Math.floor(
  QUIZ_ARENA_CONFIG.ACCESS_CODE_MIN +
    Math.random() *
      (QUIZ_ARENA_CONFIG.ACCESS_CODE_MAX - QUIZ_ARENA_CONFIG.ACCESS_CODE_MIN)
).toString();

// ✅ Easy to change later:
// Want 8-digit codes? Change config once, works everywhere!
```

---

### 5. **DUPLICATE CODE / COPY-PASTE PROGRAMMING** ⚠️ MEDIUM SEVERITY

**The Problem**:
You have the same Prisma client initialization code in multiple files:

```typescript
// Found in THREE different files:
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**Why This Breaks Things**:

- If you need to fix a bug, you have to fix it in 3+ places
- Easy to forget to update all copies
- Increases codebase size unnecessarily
- Makes it unclear which is the "real" implementation

**The Fix**:

```typescript
// ✅ DELETE these files:
// - src/lib/db.ts
// - src/lib/database/prisma.ts
// - src/lib/database/prisma-client.ts

// ✅ KEEP ONLY ONE: src/lib/prisma.ts
// Update all imports to use this single file
```

---

### 6. **NO TYPE SAFETY ON API RESPONSES** ⚠️ MEDIUM SEVERITY

**The Problem**:
Your API routes return `any` types implicitly:

```typescript
// ❌ No types:
const response = await fetch(`/api/quiz-arena/session/${sessionId}`);
const data = await response.json(); // data is 'any'
```

**Why This Breaks Things**:

- TypeScript can't catch errors
- Refactoring becomes dangerous
- No autocomplete in your IDE
- Runtime errors that should be caught at compile time

**The Fix**:

```typescript
// ✅ types/api.ts - Define all your API types
export interface QuizSession {
  id: string;
  hostId: string;
  accessCode: string;
  questionIds: string[];
  status: 'waiting' | 'in-progress' | 'finished';
  currentQuestionIndex: number;
  timePerQuestion: number;
  createdAt: Date;
  startedAt?: Date;
  endedAt?: Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// ✅ Usage in API route:
export async function GET(): Promise<NextResponse<ApiResponse<QuizSession>>> {
  try {
    const session = await prisma.quizSession.findUnique({...});
    return NextResponse.json({ data: session });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 });
  }
}

// ✅ Usage in client:
const response = await fetch(`/api/quiz-arena/session/${sessionId}`);
const { data, error }: ApiResponse<QuizSession> = await response.json();

if (error) {
  console.error(error); // Now you have proper error handling
} else {
  console.log(data.accessCode); // TypeScript knows this exists!
}
```

---

### 7. **NO DATABASE MIGRATIONS STRATEGY** ⚠️ HIGH SEVERITY

**The Problem**:
You're using Prisma but not properly managing schema changes:

```typescript
// What you probably did:
npx prisma db push // Dangerous in production!
npx prisma generate
```

**Why This Breaks Things**:

- `prisma db push` can lose data
- No migration history
- Can't rollback changes
- Difficult to coordinate schema changes with code deploys

**The Fix**:

```bash
# ✅ Proper workflow for schema changes:

# 1. Make changes to prisma/schema.prisma

# 2. Create a migration (NOT db push)
npx prisma migrate dev --name add_quiz_arena_tables

# 3. This creates a migration file you can review and commit to git

# 4. In production (run this on deploy):
npx prisma migrate deploy

# 5. Generate types:
npx prisma generate
```

**Add to package.json**:

```json
{
  "scripts": {
    "db:migrate": "prisma migrate dev",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio",
    "db:seed": "tsx scripts/seed-all-questions.ts",
    "db:reset": "prisma migrate reset",
    "postinstall": "prisma generate"
  }
}
```

---

### 8. **MIXING DATABASE PROVIDERS** ⚠️ CRITICAL SEVERITY

**The Problem** (This is the one that caused your current issue!):

```prisma
// You keep switching between:
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// and:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Why This Breaks Things**:

- SQLite and PostgreSQL have different features
- Prisma Client is generated differently for each
- Data types differ (JSON handling, dates, etc.)
- Migration files become incompatible
- THIS is why you lost your questions!

**The Fix**:

```prisma
// ✅ schema.prisma - Choose ONE provider
datasource db {
  // For production-like development, use PostgreSQL everywhere:
  provider = "postgresql"
  url      = env("DATABASE_URL")

  // Or use conditional databases:
  // provider = env("DATABASE_PROVIDER") // "sqlite" or "postgresql"
}
```

**Environment setup**:

```bash
# .env.development.local - LOCAL PostgreSQL (better)
DATABASE_URL="postgresql://user:pass@localhost:5432/eccco_dev"

# OR use Docker:
# docker run -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:15

# .env.production (Vercel)
DATABASE_URL="postgresql://...supabase.com..."
```

**Why PostgreSQL everywhere is better**:

- ✅ Identical behavior in dev and production
- ✅ No surprises when deploying
- ✅ Can test production features locally
- ✅ Full PostgreSQL features available

---

### 9. **NO AUTOMATED SEEDING PROCESS** ⚠️ HIGH SEVERITY

**The Problem**:
You had questions in code but never seeded production:

```typescript
// No package.json script for seeding
// No CI/CD integration
// Manual process that was forgotten
```

**Why This Breaks Things**:

- Easy to forget to seed new environments
- Inconsistent data between environments
- Manual process is error-prone
- Takes time we just spent fixing!

**The Fix**:

```json
// package.json
{
  "scripts": {
    "db:seed": "tsx scripts/seed-all-questions.ts",
    "db:seed:prod": "DATABASE_URL=$PROD_DATABASE_URL npm run db:seed",
    "postinstall": "prisma generate && npm run db:seed"
  },
  "prisma": {
    "seed": "tsx scripts/seed-all-questions.ts"
  }
}
```

**Vercel configuration** (vercel.json):

```json
{
  "buildCommand": "prisma generate && prisma migrate deploy && npm run build",
  "installCommand": "npm install && npm run db:seed"
}
```

---

### 10. **NO CODE ORGANIZATION STRUCTURE** ⚠️ MEDIUM SEVERITY

**The Problem**:
Your files are somewhat organized but lack clear patterns:

```
src/app/api/
  ├── topics/
  ├── questions/
  ├── quiz-arena/
  ├── live-quiz/  # Redundant with quiz-arena?
  ├── analytics/
```

**Why This Breaks Things**:

- Hard to find related code
- Duplicate functionality (live-quiz vs quiz-arena)
- Unclear ownership of features
- Difficult to delete old code

**The Fix**:

```
src/
├── app/
│   ├── (marketing)/          # Public pages
│   │   ├── page.tsx
│   │   └── about/
│   ├── (dashboard)/          # Protected pages
│   │   ├── quiz-arena/
│   │   └── practice/
│   └── api/
│       ├── v1/               # Versioned API
│       │   ├── quiz-arena/
│       │   ├── questions/
│       │   └── topics/
│       └── webhooks/
├── lib/
│   ├── prisma.ts             # SINGLE database client
│   ├── validations/          # Zod schemas
│   ├── utils/                # Helpers
│   └── hooks/                # React hooks
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── quiz-arena/           # Feature-specific
│   └── shared/               # Reusable
├── config/
│   ├── site.ts
│   ├── quiz-arena.ts
│   └── constants.ts
└── types/
    ├── api.ts                # API types
    ├── database.ts           # Prisma types
    └── components.ts         # Component props
```

---

## 📋 Action Plan: Fix Your Codebase

### Phase 1: Critical Fixes (Do Today)

- [ ] **Consolidate Prisma imports** → Use single `src/lib/prisma.ts`
- [ ] **Document environment variables** → Create `.env.example`
- [ ] **Switch to PostgreSQL everywhere** → No more SQLite
- [ ] **Add seed script to package.json** → Automate seeding

### Phase 2: Quality Improvements (This Week)

- [ ] **Add TypeScript types for APIs** → Create `types/api.ts`
- [ ] **Improve error handling** → Use proper Prisma error types
- [ ] **Extract magic numbers** → Create config files
- [ ] **Remove duplicate code** → DRY principle

### Phase 3: Architecture (Next Week)

- [ ] **Reorganize folder structure** → Clear feature separation
- [ ] **Add environment validation** → Fail fast on missing vars
- [ ] **Set up proper migrations** → Use `prisma migrate`
- [ ] **Add API versioning** → `/api/v1/`

---

## 🎓 Learning Resources

**Books**:

- "Clean Code" by Robert C. Martin
- "The Pragmatic Programmer" by Hunt & Thomas

**Concepts to Study**:

- **DRY**: Don't Repeat Yourself
- **SOLID Principles**: Single Responsibility, etc.
- **Type Safety**: Leverage TypeScript fully
- **Error Handling**: Fail gracefully, log properly
- **Configuration Management**: Centralize settings

**Tools to Use**:

- **ESLint**: Catch common mistakes
- **Prettier**: Consistent formatting
- **TypeScript strict mode**: `"strict": true`
- **Husky**: Pre-commit hooks to prevent bad code

---

## ✅ Quick Wins You Can Do Right Now

1. **Delete duplicate Prisma files**:

```bash
rm src/lib/db.ts src/lib/database/prisma.ts src/lib/database/prisma-client.ts
# Keep only one!
```

2. **Create `.env.example`**:

```bash
cp .env.development.local .env.example
# Remove sensitive values, commit to git
```

3. **Add this to your next API route**:

```typescript
import { Prisma } from "@prisma/client";
// Use proper error handling from examples above
```

4. **Create a config file**:

```typescript
// config/constants.ts
export const APP_CONFIG = {
  QUIZ_ARENA: {
    MAX_PARTICIPANTS: 100,
    CODE_LENGTH: 6,
  },
  API: {
    VERSION: "v1",
    TIMEOUT_MS: 30000,
  },
} as const;
```

---

## 🚀 Current Seed Progress

**Status**: 1,300 / 2,816 questions (46%)
**ETA**: ~45 more minutes

Once complete, you'll have a working system, but apply these learnings to make it maintainable long-term!
