# ECCCO Production Deployment Guide

## 🚀 Deploying to Vercel

### Prerequisites
- Vercel account connected to GitHub
- Repository pushed to GitHub

### Environment Variables
Set these in Vercel Dashboard → Project → Settings → Environment Variables:

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