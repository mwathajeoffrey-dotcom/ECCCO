# Database Migration Tracking Guide

This document outlines our Prisma migration strategy and best practices for the ECCCO project.

## 📁 Migration Structure

All migrations are stored in `prisma/migrations/` with timestamps:

```
prisma/
├── schema.prisma              # Single source of truth for database schema
└── migrations/
    ├── 20251031111139_init/
    ├── 20251103031745_add_analytics_tracking/
    ├── ...
    └── migration_lock.toml    # Lock file for migration history
```

## 🔄 Migration Workflow

### Development Environment

#### 1. Create a Migration

When you modify `schema.prisma`, create a migration:

```bash
npx prisma migrate dev --name descriptive_name_here
```

**Example:**

```bash
npx prisma migrate dev --name add_user_preferences
```

This will:

1. Create a new migration in `prisma/migrations/`
2. Apply the migration to your dev database
3. Regenerate Prisma Client
4. Update `_prisma_migrations` table

#### 2. Reset Database (when things go wrong)

```bash
npx prisma migrate reset
```

⚠️ **WARNING**: This will:

- Drop the database
- Recreate it
- Run all migrations from scratch
- Run seed data (if configured)

**Only use in development!**

### Production Environment

#### 1. Deploy Migrations

In production, use `migrate deploy` instead of `migrate dev`:

```bash
npx prisma migrate deploy
```

This will:

- Apply pending migrations only
- NOT create new migrations
- NOT prompt for input
- Fail if migration history is out of sync

#### 2. Check Migration Status

Before deploying:

```bash
npx prisma migrate status
```

Expected output:

```
Database schema is up to date!
```

Or if migrations are pending:

```
1 migration has not yet been applied:

20260121123456_add_new_feature
```

## 📝 Migration Best Practices

### Naming Conventions

Use descriptive, snake_case names:

- ✅ `add_user_preferences`
- ✅ `remove_deprecated_fields`
- ✅ `create_quiz_arena_tables`
- ❌ `update`
- ❌ `changes`
- ❌ `fix_stuff`

### Schema Changes

#### Safe Changes (non-breaking)

- Adding optional fields
- Adding new tables
- Adding indexes
- Creating new models

#### Dangerous Changes (breaking)

- Removing fields
- Renaming fields
- Changing field types
- Adding required fields without defaults

**For dangerous changes:**

1. Create a multi-step migration:

   - Step 1: Add new field as optional
   - Step 2: Backfill data
   - Step 3: Make field required
   - Step 4: Remove old field

2. Or use custom SQL migration:

```bash
npx prisma migrate dev --create-only --name custom_migration
# Edit the generated migration.sql file
npx prisma migrate dev
```

### Data Migrations

For data transformations, create an empty migration:

```bash
npx prisma migrate dev --create-only --name migrate_user_data
```

Then edit the generated `migration.sql` file:

```sql
-- Custom data migration
UPDATE "User"
SET "emailVerified" = NOW()
WHERE "emailVerified" IS NULL AND "email" IS NOT NULL;
```

Then apply it:

```bash
npx prisma migrate dev
```

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Check migration status
        run: npx prisma migrate status
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      - name: Deploy migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      - name: Generate Prisma Client
        run: npx prisma generate
```

### Vercel Deployment

Add to `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "vercel-build": "prisma migrate deploy && next build"
  }
}
```

## 🐛 Troubleshooting

### "Migration history diverged"

**Problem**: Local and remote migration histories don't match.

**Solution**:

1. Check status: `npx prisma migrate status`
2. If in development: `npx prisma migrate reset`
3. If in production: Contact team lead

### "Migration failed to apply"

**Problem**: Migration has SQL errors or conflicts.

**Solution**:

1. Check the migration file for errors
2. Fix the SQL
3. Create a new migration: `npx prisma migrate dev`

### "Database schema is not in sync"

**Problem**: Schema file doesn't match database.

**Solution**:

```bash
# Pull current database schema
npx prisma db pull

# OR create a migration to sync
npx prisma migrate dev --name sync_schema
```

## 📊 Migration History

### Current Migrations (as of Jan 21, 2026)

1. `20251031111139_init` - Initial database schema
2. `20251103031745_add_analytics_tracking` - Analytics tables
3. `20251104034945_add_learning_analytics_tables` - Learning progress tracking
4. `20251106180112_production_ready_schema` - Production optimizations
5. `20251107234819_add_analytics_fields` - Extended analytics
6. `20251107235144_add_analytics_fields_v2` - Analytics refinements
7. `20251107235610_analytics` - Analytics updates
8. `20251108181622_add_module_structure_for_pediatric_adult_separation` - Module categorization
9. `20251111140042_add_password_and_nextauth_models` - Authentication models
10. `20251125090844_add_live_quiz_models` - Quiz Arena feature
11. `20251205075817_add_bookmarks_ratings_cases` - User interactions
12. `20251217000000_add_spaced_repetition` - Spaced repetition system
13. `20251221111504_add_nextauth_models` - NextAuth integration
14. `20260102180026_add_bookmarks_and_ratings` - Enhanced user features
15. `20260103090433_add_user_profiles_and_preferences` - User customization
16. `20260120_add_comprehensive_models` - Full schema completion

### Total: 16 migrations applied ✅

## 🔒 Security

### Sensitive Data

- Never commit `.env` files
- Use environment variables for DATABASE_URL
- Rotate production database credentials regularly

### Backup Strategy

Before major migrations:

```bash
# Backup production database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```

## 📚 Resources

- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Migration Troubleshooting](https://www.prisma.io/docs/guides/migrate/production-troubleshooting)

## 🎯 Quick Reference

```bash
# Development
npx prisma migrate dev --name my_migration  # Create & apply migration
npx prisma migrate reset                    # Reset database (dev only!)
npx prisma migrate status                   # Check migration status
npx prisma studio                           # Open Prisma Studio GUI

# Production
npx prisma migrate deploy                   # Apply pending migrations
npx prisma generate                         # Generate Prisma Client

# Database Operations
npx prisma db pull                          # Introspect database
npx prisma db push                          # Push schema without migration (prototyping)
npx prisma db seed                          # Run seed scripts

# Debugging
npx prisma validate                         # Validate schema file
npx prisma format                           # Format schema file
```

---

**Last Updated**: January 21, 2026
**Schema Version**: Prisma 7.2.0
**Migrations**: 16 applied
