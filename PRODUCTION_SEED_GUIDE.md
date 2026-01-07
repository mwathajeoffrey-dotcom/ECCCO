# 🔧 PRODUCTION DATABASE SETUP GUIDE

## Current Situation

✅ **Local Development**: 839 questions in SQLite  
❌ **Production (Vercel)**: 0 questions (PostgreSQL not seeded)  
📦 **Available**: 2,816 questions in codebase

## Supabase PostgreSQL Database

Your production database:
```
DATABASE_URL="postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres"
```

## Steps to Seed Production Database

### Step 1: Update Schema in Production

```bash
# Push schema to PostgreSQL
DATABASE_URL="postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres" npx prisma db push
```

### Step 2: Run Production Seed

```bash
# Seed all 2,816 questions to PostgreSQL
DATABASE_URL="postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres" npx tsx scripts/seed-all-questions.ts
```

### Step 3: Verify in Production

```bash
# Connect to Supabase and check count
DATABASE_URL="postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres" npx prisma studio

# Or use psql:
psql "postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres" -c "SELECT COUNT(*) FROM \"Question\";"
```

### Step 4: Update Vercel Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```env
DATABASE_URL=postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres
```

## Alternative: Seed Both Databases

### Local SQLite (Development)
```bash
#  Stop dev server first
pkill -f "next dev"

# Seed SQLite with all questions
DATABASE_URL="file:./prisma/prisma/dev.db" npx tsx scripts/seed-all-questions.ts

# Verify
sqlite3 prisma/prisma/dev.db "SELECT COUNT(*) FROM Question;"
# Expected: 2816
```

### Production PostgreSQL (Vercel)
```bash
# Seed PostgreSQL with all questions
DATABASE_URL="postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres" npx tsx scripts/seed-all-questions.ts
```

## Troubleshooting

### If Database is Locked (SQLite)
```bash
# Find and kill processes using the database
lsof prisma/prisma/dev.db
kill -9 <PID>

# Or just kill all Node processes
pkill -9 node
```

### If PostgreSQL Connection Fails
```bash
# Test connection first
psql "postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres" -c "SELECT version();"

# If SSL error, try adding ?sslmode=require
DATABASE_URL="postgresql://...?sslmode=require"
```

### If Seed Script Hangs
- Check Supabase dashboard for connection limits
- Try using direct connection URL (port 5432) instead of pooler (port 6543)
- Break into smaller batches if timeout occurs

## Schema Update Required

Since you switched from PostgreSQL back to SQLite, you need to update `prisma/schema.prisma`:

**For Production (PostgreSQL)**:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**For Local Development (SQLite)**:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**RECOMMENDED**: Use environment-based provider:
```prisma
datasource db {
  provider = env("DATABASE_PROVIDER")  // "sqlite" or "postgresql"
  url      = env("DATABASE_URL")
}
```

Then in `.env.development.local`:
```env
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./prisma/prisma/dev.db"
```

And in Vercel (production):
```env
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://..."
```

## Quick Commands

```bash
# Seed local development database
npm run seed:local

# Seed production database
npm run seed:production

# Seed both
npm run seed:all
```

Add to `package.json`:
```json
{
  "scripts": {
    "seed:local": "DATABASE_URL=file:./prisma/prisma/dev.db npx tsx scripts/seed-all-questions.ts",
    "seed:production": "npx tsx scripts/seed-all-questions.ts",
    "seed:all": "npm run seed:local && npm run seed:production"
  }
}
```

## Expected Results

After successful seeding:

- **Local Database**: 2,816 questions ✅
- **Production Database**: 2,816 questions ✅
- **Vercel Frontend**: All questions available ✅
- **Quiz Arena**: 2,816 questions to select from ✅

## Next Steps

1. ✅ Run production seed (main priority)
2. ✅ Update Vercel environment variables
3. ✅ Test Vercel deployment has questions
4. ✅ Run local seed for development
5. ✅ Add seed scripts to package.json
6. ✅ Document in README

**Priority**: Seed the production PostgreSQL database ASAP so Vercel has all 2,816 questions! 🚀
