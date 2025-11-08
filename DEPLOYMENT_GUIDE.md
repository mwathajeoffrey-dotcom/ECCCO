# Production Deployment Guide for ECCCO Platform

## Overview

This guide provides comprehensive instructions for deploying the ECCCO medical education platform to production with PostgreSQL database support and enhanced security features.

## Prerequisites

### System Requirements
- Node.js 18.17.0 or higher
- npm 9.0.0 or higher
- PostgreSQL 14.0 or higher
- SSL certificates for HTTPS

### Required Environment Variables

Create a `.env.production` file with the following variables:

```bash
# Database Configuration (PostgreSQL for Production)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Environment Configuration
NODE_ENV="production"
VERCEL_ENV="production"

# Authentication
NEXTAUTH_SECRET="your-production-nextauth-secret-here"
NEXTAUTH_URL="https://your-production-domain.com"

# Security & Performance
API_RATE_LIMIT_MAX_REQUESTS=100
API_RATE_LIMIT_WINDOW_MS=900000
SECURITY_HEADERS_ENABLED=true

# Feature Flags
ENABLE_REGISTRATION=false
ENABLE_GUEST_MODE=true
ENABLE_ANALYTICS=true
ENABLE_PWA=true
```

### PostgreSQL Setup

1. **Create Production Database**
```sql
CREATE DATABASE eccco_production;
CREATE USER eccco_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE eccco_production TO eccco_user;
```

2. **Configure Connection Pooling** (recommended for production)
```bash
# Example with connection pooling
DATABASE_URL="postgresql://eccco_user:secure_password@localhost:5432/eccco_production?connection_limit=10&pool_timeout=20"
```

```bash
# Required
DATABASE_URL="file:./production.db"

# Optional (for future features)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

### Build Configuration
The project is configured with automatic build process:

1. **Prisma Client Generation** - `prisma generate`
2. **Database Setup** - `prisma db push` 
3. **Seed Data** - `tsx scripts/seed-production.ts`
4. **Next.js Build** - `next build`

### Database Strategy
- **Development**: SQLite (`./dev.db`)
- **Production**: SQLite (`./production.db`) on Vercel filesystem
- **Future**: Can migrate to PostgreSQL when needed

### Deployment Steps

1. **Commit and Push Changes**
   ```bash
   git add .
   git commit -m "Production deployment ready"
   git push origin main
   ```

2. **Vercel Auto-Deploy**
   - Vercel will automatically detect the push
   - Run build process with database setup
   - Deploy to production URL

3. **Verify Deployment**
   - Check build logs in Vercel dashboard
   - Test dashboard functionality
   - Verify API endpoints

### Production Features
- ✅ Dynamic dashboard with real-time analytics
- ✅ Session tracking for anonymous users
- ✅ Performance metrics and recommendations
- ✅ Responsive design and error handling
- ✅ Medical topic management
- ✅ Progressive Web App capabilities

### Monitoring
- Check Vercel Function logs for API performance
- Monitor dashboard analytics endpoint
- Review user session data

### Database Persistence
⚠️ **Note**: SQLite on Vercel is ephemeral (resets on deployment)
For production with persistent data, consider:
- Vercel Postgres
- PlanetScale
- Supabase
- Railway PostgreSQL

### Support
- GitHub Issues: Repository issues tab
- Documentation: `/docs` folder
- Demo Data: Available for testing dashboard features