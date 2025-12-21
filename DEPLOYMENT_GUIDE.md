# Quick Deployment Guide 🚀

## Before Deploying to Vercel

### 1. Update Database Schema
Run these commands to add the Feedback model:

```bash
# Generate Prisma client
npm run db:generate

# Push to database (development)
npm run db:push

# OR run migration (production)
npm run db:migrate
```

### 2. Set Environment Variables

Make sure these are set in your `.env` and Vercel:

```bash
DATABASE_URL="your-postgres-connection-string"
ADMIN_EMAILS="jeffreymwatha@gmail.com,your@email.com"
NEXTAUTH_URL="https://eccco.vercel.app"
NEXTAUTH_SECRET="your-secret-key"
```

### 3. Deploy to Vercel

```bash
# If using Vercel CLI
vercel --prod

# Or push to main branch
git add .
git commit -m "Add homepage, admin dashboard, and feedback system"
git push origin main
```

---

## New Features on Production

After deployment, these will be live:

### Public URLs:
- **Homepage**: `https://eccco.vercel.app`
- **Support**: `https://eccco.vercel.app/support`
- **All Features**: Accessible from homepage navigation

### Admin URLs:
- **Admin Dashboard**: `https://eccco.vercel.app/admin/dashboard`
- **Manage Evidence**: `https://eccco.vercel.app/admin/evidence`
- **View Feedback**: `https://eccco.vercel.app/admin/feedback`

---

## Testing After Deployment

### 1. Test Public Features ✅
- [ ] Visit homepage and verify all cards load
- [ ] Click each feature link (Practice, Live Quiz, Evidence Library, etc.)
- [ ] Submit feedback via Support page
- [ ] Verify email confirmation

### 2. Test Admin Features ✅
- [ ] Login with admin email
- [ ] Navigate to `/admin/dashboard`
- [ ] Check metrics display correctly
- [ ] Go to `/admin/feedback` and view submitted messages
- [ ] Update feedback status
- [ ] Go to `/admin/evidence` and verify PubMed integration

### 3. Test Mobile 📱
- [ ] Homepage responsive on mobile
- [ ] Forms work on touch devices
- [ ] Navigation menu accessible

---

## Important Notes

1. **Database Migration**: The Feedback table will be created automatically when you run `db:push`

2. **Admin Access**: Only emails in `ADMIN_EMAILS` environment variable or hardcoded admins can access `/admin/*` routes

3. **Prisma Warning**: The warning about `url` in schema.prisma is for Prisma 7 compatibility - safe to ignore for Prisma 6.x

4. **First Time**: First visitor to submit feedback will trigger the Feedback table creation via Prisma

---

## Quick Links for Testing

After deployment, test these URLs:

```
https://eccco.vercel.app/                     → New homepage
https://eccco.vercel.app/dashboard            → User dashboard
https://eccco.vercel.app/practice             → Practice questions
https://eccco.vercel.app/live-quiz            → Live quiz mode
https://eccco.vercel.app/emergency-references → Evidence library
https://eccco.vercel.app/support              → Support/feedback form
https://eccco.vercel.app/admin/dashboard      → Admin dashboard (auth required)
https://eccco.vercel.app/admin/feedback       → Feedback management (auth required)
https://eccco.vercel.app/admin/evidence       → Evidence management (auth required)
```

---

## Monitoring

After deployment, monitor in admin dashboard:
- User activity
- Feedback submissions
- System health
- Feature usage

---

## 🎉 You're Ready!

All new features are complete and ready for deployment. The platform now has:
- ✅ Professional homepage
- ✅ Admin monitoring
- ✅ Customer support system
- ✅ PubMed integration
- ✅ Complete navigation

**Deploy and enjoy!** 🚀
