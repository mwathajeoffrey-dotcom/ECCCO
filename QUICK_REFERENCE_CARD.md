# 🎯 Quick Reference: Avoid Common Mistakes

## The Golden Rules

### 1. ONE WAY to Do Each Thing

```typescript
// ✅ DO: Always import Prisma the same way
import prisma from "@/lib/prisma";

// ❌ DON'T: Mix different imports
import { prisma } from "@/lib/database/prisma-client";
import prisma from "@/lib/db";
```

### 2. Environment Variables = Configuration File

```bash
# ✅ DO: Document all env vars in .env.example
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."

# ❌ DON'T: Hardcode or assume they exist
const url = "postgresql://localhost..." // Wrong!
```

### 3. Types Everywhere

```typescript
// ✅ DO: Define types for everything
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// ❌ DON'T: Use 'any' or no types
const data = await response.json(); // data is 'any' - bad!
```

### 4. Handle Errors Properly

```typescript
// ✅ DO: Specific error messages
catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return json({ error: 'Database error' }, { status: 500 });
  }
  if (!session) {
    return json({ error: 'Not found' }, { status: 404 });
  }
}

// ❌ DON'T: Generic errors
catch (error) {
  return json({ error: 'Error' }); // Unhelpful!
}
```

### 5. No Magic Numbers

```typescript
// ✅ DO: Use constants
const POLLING_INTERVAL = 2000;
setInterval(fetchData, POLLING_INTERVAL);

// ❌ DON'T: Hardcode values
setInterval(fetchData, 2000); // What's 2000?
```

### 6. DRY - Don't Repeat Yourself

```typescript
// ✅ DO: Extract common code
function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ❌ DON'T: Copy-paste
const code1 = Math.floor(100000 + Math.random() * 900000).toString();
const code2 = Math.floor(100000 + Math.random() * 900000).toString();
```

### 7. Validate Input

```typescript
// ✅ DO: Check inputs early
if (!sessionId || typeof sessionId !== "string") {
  return json({ error: "Invalid session ID" }, { status: 400 });
}

// ❌ DON'T: Assume input is valid
const session = await prisma.findUnique({ where: { id: sessionId } });
// sessionId could be undefined!
```

### 8. Use Migrations, Not Push

```bash
# ✅ DO: Create migrations
npx prisma migrate dev --name add_feature

# ❌ DON'T: Use db push in production
npx prisma db push # Can lose data!
```

### 9. Same Database Provider Everywhere

```prisma
// ✅ DO: Use PostgreSQL everywhere
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ❌ DON'T: Mix SQLite and PostgreSQL
// Local: SQLite, Production: PostgreSQL = Problems!
```

### 10. Automate Everything

```json
// ✅ DO: Add scripts
{
  "scripts": {
    "db:seed": "tsx scripts/seed.ts",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  }
}

// ❌ DON'T: Manual processes
// "Just remember to seed the database" = Will forget!
```

---

## Before You Code Checklist

- [ ] Does this file already exist? (Avoid duplicates)
- [ ] Am I using the standard import? (Check existing files)
- [ ] Do I have proper types? (No 'any')
- [ ] Am I handling errors? (Try-catch with specific errors)
- [ ] Are there magic numbers? (Extract to constants)
- [ ] Is this code duplicated? (Extract to function/util)
- [ ] Am I validating input? (Check before using)
- [ ] Are my env vars documented? (Add to .env.example)

---

## When Adding a New Feature

1. ✅ Check if similar feature exists (avoid duplication)
2. ✅ Create types first (`types/feature.ts`)
3. ✅ Add config constants (`config/feature.ts`)
4. ✅ Write API route with proper error handling
5. ✅ Test locally AND in production-like environment
6. ✅ Document any new environment variables
7. ✅ Run migrations if database changed
8. ✅ Commit migration files to git

---

## Quick Fix Priority

**Fix Today** (Breaking Issues):

1. Consolidate to ONE Prisma import
2. Switch to PostgreSQL everywhere
3. Add .env.example file

**Fix This Week** (Quality Issues):

1. Add TypeScript types for APIs
2. Improve error handling
3. Extract magic numbers to config

**Fix When You Can** (Nice to Have):

1. Reorganize folder structure
2. Add tests
3. Set up linting rules

---

## Emergency Debugging

When something breaks:

1. **Check environment variables first**

   ```bash
   echo $DATABASE_URL
   # Make sure it's set and correct
   ```

2. **Check Prisma connection**

   ```bash
   npx prisma db pull
   # Should work if DB is accessible
   ```

3. **Check for TypeScript errors**

   ```bash
   npm run build
   # Fix all TS errors
   ```

4. **Check the logs**

   ```typescript
   console.error("Full error:", JSON.stringify(error, null, 2));
   // Don't just log error.message
   ```

5. **Isolate the problem**
   - Comment out code until it works
   - Add it back piece by piece
   - Find exact line that breaks

---

## Remember

> "The best code is no code. The second best is simple, boring code that works."

- Simple beats clever
- Consistent beats optimal
- Working beats perfect
- Documented beats elegant

**Your goal**: Write code that your future self (6 months from now) can understand and maintain!
