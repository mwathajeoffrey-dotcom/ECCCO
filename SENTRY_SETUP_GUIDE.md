# Task 10: Sentry Source Maps Setup Guide

## 🎯 Objective
Enable source maps upload to Sentry for better error tracking and debugging in production.

## ✅ Current Status
- ✅ Sentry SDK installed (`@sentry/nextjs`)
- ✅ Sentry configuration files exist (client, server, edge)
- ✅ `next.config.ts` properly configured with `withSentryConfig`
- ⚠️ Missing: Sentry auth token and environment variables

## 📋 Setup Steps

### Step 1: Create Sentry Account & Project (if not already done)
1. Go to [https://sentry.io](https://sentry.io)
2. Sign up or log in
3. Create a new project or use existing one
4. Note down:
   - Organization slug (e.g., `your-org`)
   - Project name (e.g., `eccco`)
   - DSN (Data Source Name)

### Step 2: Generate Sentry Auth Token
1. Go to: [https://sentry.io/settings/account/api/auth-tokens/](https://sentry.io/settings/account/api/auth-tokens/)
2. Click **"Create New Token"**
3. Give it a name: `ECCCO Production Builds`
4. Select scopes:
   - ✅ `project:read`
   - ✅ `project:releases`  ← **REQUIRED for source maps**
   - ✅ `org:read`
5. Click **"Create Token"**
6. **Copy the token immediately** (you won't see it again!)

### Step 3: Add Environment Variables

Add these to your `.env.local` file:

```bash
# Sentry Configuration
SENTRY_DSN=https://YOUR_KEY@YOUR_ORG.ingest.sentry.io/YOUR_PROJECT_ID
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=eccco
SENTRY_AUTH_TOKEN=your_auth_token_here
```

### Step 4: Add to Vercel Environment Variables (Production)

If deploying to Vercel:
1. Go to your Vercel project settings
2. Navigate to **Settings → Environment Variables**
3. Add the same 4 variables:
   - `SENTRY_DSN`
   - `SENTRY_ORG`
   - `SENTRY_PROJECT`
   - `SENTRY_AUTH_TOKEN`
4. Make sure they're set for **Production**, **Preview**, and **Development** environments

### Step 5: Test Source Maps Upload

Run a production build:
```bash
npm run build
```

You should see output like:
```
Uploading source maps to Sentry...
✓ Source maps uploaded successfully
```

### Step 6: Verify in Sentry

1. Go to your Sentry project dashboard
2. Navigate to **Settings → Source Maps**
3. You should see uploaded source maps for your releases
4. Trigger a test error and verify the stack trace shows original file names and line numbers

## 🔒 Security Best Practices

### ✅ DO:
- Keep `SENTRY_AUTH_TOKEN` secret (never commit to git)
- Use separate Sentry projects for dev/staging/prod
- Set appropriate token scopes (minimum required)
- Rotate tokens periodically

### ❌ DON'T:
- Commit `.env.local` to git
- Share auth tokens in chat/email
- Use production tokens in development
- Give tokens unnecessary permissions

## 📊 What This Enables

Once configured, you'll get:

1. **Readable Stack Traces**
   - See original TypeScript code in errors
   - Exact line numbers and function names
   - Full context around errors

2. **Better Debugging**
   - Click directly to source code in Sentry
   - Understand user-reported issues faster
   - Track error trends over time

3. **Performance Monitoring**
   - Web Vitals tracking (already configured)
   - Custom metrics (already integrated)
   - User session replay (optional)

## 🧪 Testing

### Test in Development:
```bash
# Run dev server
npm run dev

# Trigger a test error in browser console:
throw new Error("Test Sentry error from development");
```

### Test in Production:
```bash
# Build and start production server
npm run build
npm start

# Visit your app and trigger an error
# Check Sentry dashboard for the error
```

## 📝 Current Configuration

Your `next.config.ts` already has:
- ✅ `widenClientFileUpload: true` - uploads more source maps
- ✅ `hideSourceMaps: true` - hides maps from client bundles
- ✅ `treeshake.removeDebugLogging: true` - removes debug logs
- ✅ `automaticVercelMonitors: true` - Vercel Cron monitoring

## 🎯 Success Criteria

Task is complete when:
- [ ] Sentry account created
- [ ] Auth token generated
- [ ] Environment variables added to `.env.local`
- [ ] Environment variables added to Vercel (if applicable)
- [ ] Production build uploads source maps successfully
- [ ] Test error appears in Sentry with readable stack trace
- [ ] Original file names and line numbers visible

## ⏱️ Estimated Time

- **If you have Sentry account**: 10-15 minutes
- **If creating new account**: 20-30 minutes

## 🆘 Troubleshooting

### Source maps not uploading:
1. Check `SENTRY_AUTH_TOKEN` has `project:releases` scope
2. Verify `SENTRY_ORG` and `SENTRY_PROJECT` match exactly
3. Ensure token is set for the build environment (local/.env or Vercel)

### Errors not appearing in Sentry:
1. Check `SENTRY_DSN` is correct
2. Verify browser isn't blocking Sentry requests (check Network tab)
3. Ensure you're in production mode (`NODE_ENV=production`)

### Stack traces still minified:
1. Verify source maps were uploaded (check Sentry Settings → Source Maps)
2. Ensure release version matches between upload and error
3. Check that `hideSourceMaps` is `true` in next.config.ts

## 📚 Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Source Maps Guide](https://docs.sentry.io/platforms/javascript/sourcemaps/)
- [Sentry Webpack Plugin](https://github.com/getsentry/sentry-webpack-plugin)

---

**Once you've completed these steps, update TODO.md and mark Task 10 as complete!** ✅
