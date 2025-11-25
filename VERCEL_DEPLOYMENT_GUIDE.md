# ECCCO Platform - Vercel Deployment Guide

## Prerequisites
- GitHub account with this repository pushed
- Vercel account (sign up at vercel.com)
- Node.js 18+ locally installed

## Step 1: Setup Vercel Postgres Database

### Create Database
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** → **Create Database**
3. Select **Postgres**
4. Choose a name: `eccco-production-db`
5. Select region closest to your users (recommended: US East for North America)
6. Click **Create**

### Get Connection String
After creation, you'll see connection strings. Copy the **POSTGRES_PRISMA_URL** value.

It will look like:
```
postgres://default:xxxxx@xxxx-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15
```

## Step 2: Configure Environment Variables in Vercel

### Required Environment Variables

Go to your Vercel project → **Settings** → **Environment Variables** and add:

```bash
# Database
DATABASE_URL=postgres://default:xxxxx@xxxx-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15

# NextAuth
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=<generate-using-command-below>

# Optional: OAuth Providers (if using Google/GitHub sign-in)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Generate NEXTAUTH_SECRET

Run locally:
```bash
openssl rand -base64 32
```

Copy the output and use it as `NEXTAUTH_SECRET`.

### Important Notes
- Set all variables for **Production**, **Preview**, and **Development** environments
- After adding variables, you'll need to redeploy for them to take effect

## Step 3: Deploy to Vercel

### Method 1: Import from GitHub (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **Import Project**
3. Select your GitHub repository: `mwathajeoffrey-dotcom/ECCCO`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
5. Click **Deploy**

### Method 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 4: Run Database Migrations

After first deployment:

### Option A: Via Vercel CLI (Recommended)
```bash
# Connect to your Vercel project
vercel link

# Run migrations
vercel env pull .env.production
npx prisma migrate deploy --schema=./prisma/schema.prisma
```

### Option B: Via Build Command
Add to your Vercel project settings:
- **Build Command**: `npm run build && npx prisma migrate deploy`

This will run migrations automatically on each deployment.

## Step 5: Seed Production Database

After migrations complete:

```bash
# Option 1: Locally with production DB URL
DATABASE_URL="postgres://..." npx tsx scripts/seed-production.ts

# Option 2: Create a seed API endpoint and call it once
# POST https://your-app.vercel.app/api/admin/seed
# (Add authentication to this endpoint!)
```

**Seed Script includes**:
- 28 topics across Adult & Pediatric modules
- 839 questions with explanations
- Demo user and sample exam sessions

## Step 6: Configure Custom Domain (Optional)

1. Go to your project → **Settings** → **Domains**
2. Add your custom domain (e.g., `eccco.app`)
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to your custom domain

## Step 7: Post-Deployment Verification

### Test Checklist
- [ ] Homepage loads correctly
- [ ] Sign-in/Sign-up works
- [ ] Dashboard displays properly
- [ ] Exam interface loads questions
- [ ] Practice mode functions
- [ ] Live quiz creation works
- [ ] Analytics page loads
- [ ] Guidelines viewer works
- [ ] No console errors in browser DevTools

### Performance Check
- [ ] Run Lighthouse audit (target: >90 Performance)
- [ ] Test mobile responsiveness
- [ ] Verify images load quickly
- [ ] Check time to first contentful paint

### Database Check
```bash
# Connect to production database
npx prisma studio --schema=./prisma/schema.prisma

# Verify:
- Topics: Should have ~28 topics
- Questions: Should have 839 questions
- Modules: Should have Adult & Pediatric
```

## Step 8: Enable Monitoring

### Vercel Analytics
1. Go to project → **Analytics** tab
2. Enable Vercel Analytics (included in Pro plan)
3. View real-time traffic and performance metrics

### Error Tracking (Optional but Recommended)
Consider integrating:
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and error tracking
- **Datadog**: Full observability platform

## Troubleshooting

### Build Failures

**Error: Module not found**
```bash
# Ensure all dependencies are in package.json
npm install
npm run build  # Test locally first
```

**Error: Prisma Client generation failed**
```bash
# Add postinstall script to package.json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Database Connection Issues

**Error: Can't reach database server**
- Verify `DATABASE_URL` is set correctly in Vercel
- Ensure using POSTGRES_PRISMA_URL (with pgbouncer)
- Check database is in same region as Vercel deployment

**Error: Too many connections**
- Use connection pooling: Add `?pgbouncer=true` to connection string
- Consider upgrading Vercel Postgres plan
- Implement Prisma connection pooling

### Authentication Issues

**Error: NEXTAUTH_URL not set**
- Add `NEXTAUTH_URL` environment variable
- Must match your deployment URL exactly

**Error: Invalid callback URL**
- Update OAuth provider redirect URIs
- Format: `https://your-app.vercel.app/api/auth/callback/google`

## Continuous Deployment

After initial setup, every push to `main` branch will:
1. Trigger automatic deployment
2. Run build process
3. Execute migrations (if configured)
4. Deploy to production

### Preview Deployments
- Every pull request gets a preview deployment
- Test changes before merging to main
- Preview URLs: `your-app-git-branch-name.vercel.app`

## Rollback Procedure

If deployment fails or has issues:

1. Go to **Deployments** tab
2. Find last working deployment
3. Click **•••** → **Promote to Production**
4. Previous version will be live immediately

## Cost Estimation (Vercel Pro)

- **Hosting**: $20/month (Pro plan)
- **Postgres**: Free tier: 256MB, $20/month for 512MB
- **Bandwidth**: Included in Pro plan
- **Analytics**: Included in Pro plan

**Total**: ~$20-40/month depending on usage

## Production-Ready Checklist

Before launching:
- [ ] All environment variables configured
- [ ] Database migrated and seeded
- [ ] Authentication tested with real users
- [ ] Error monitoring enabled
- [ ] Custom domain configured (optional)
- [ ] Lighthouse score >90
- [ ] Mobile testing completed
- [ ] Security headers verified
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Backup strategy in place

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Vercel Support**: support@vercel.com (Pro plan)

## Next Steps After Deployment

1. **Monitor Performance**: Use Vercel Analytics to track usage
2. **Complete Live Quiz**: Implement participant answer submission and polling
3. **Add More Questions**: Expand question bank to 5000+
4. **User Feedback**: Collect feedback and iterate
5. **Marketing**: Share with target users (medical students, residents)

---

**Deployment Date**: {{ DATE }}
**Deployed By**: {{ YOUR_NAME }}
**Production URL**: https://{{ YOUR_APP }}.vercel.app
