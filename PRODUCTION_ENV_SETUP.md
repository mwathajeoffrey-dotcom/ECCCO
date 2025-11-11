# 🔧 ECCCO Production Environment Configuration

## Environment Variables Setup for Vercel

### 1. Required Variables for Authentication

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://eccco-medical.vercel.app
NEXTAUTH_SECRET=your-secure-32-character-random-string

# Google OAuth (Create at https://console.cloud.google.com)
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

### 2. Database Configuration (Already Set)

```bash
# Prisma Accelerate URL
ACCELERATE_URL=prisma://accelerate.prisma-data.net/...

# Direct Database URL (backup)
DATABASE_URL=postgresql://...
```

### 3. Application Configuration

```bash
# Environment
NODE_ENV=production

# App Version
NEXT_PUBLIC_APP_VERSION=2.0.0

# Features
ENABLE_ANALYTICS=true
```

## Google OAuth Setup Steps

### 1. Google Cloud Console Configuration

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Create/Select Project**: Create a new project or select existing
3. **Enable Google+ API**: In APIs & Services > Library
4. **Create OAuth Credentials**:
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "ECCCO Medical Platform"

### 2. Configure OAuth Settings

```bash
# Authorized JavaScript origins
https://eccco-medical.vercel.app
https://your-custom-domain.com (if using custom domain)

# Authorized redirect URIs
https://eccco-medical.vercel.app/api/auth/callback/google
https://your-custom-domain.com/api/auth/callback/google (if using custom domain)
```

### 3. Copy Credentials

- Copy **Client ID** → Use as `GOOGLE_CLIENT_ID`
- Copy **Client Secret** → Use as `GOOGLE_CLIENT_SECRET`

## Vercel Environment Variables Setup

### Via Vercel Dashboard

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select ECCCO Project**
3. **Settings** → **Environment Variables**
4. **Add each variable**:

```bash
Name: NEXTAUTH_URL
Value: https://eccco-medical.vercel.app
Environment: Production

Name: NEXTAUTH_SECRET
Value: [Generate 32-character random string]
Environment: Production

Name: GOOGLE_CLIENT_ID
Value: [Your Google OAuth Client ID]
Environment: Production

Name: GOOGLE_CLIENT_SECRET
Value: [Your Google OAuth Client Secret]
Environment: Production
```

### Via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
```

## Generate NEXTAUTH_SECRET

### Option 1: OpenSSL
```bash
openssl rand -base64 32
```

### Option 2: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Option 3: Online Generator
Use: https://generate-secret.vercel.app/32

## Deployment Verification Checklist

### Before Deployment
- [ ] Google OAuth credentials created
- [ ] Redirect URIs configured in Google Cloud Console
- [ ] All environment variables set in Vercel
- [ ] NEXTAUTH_SECRET generated and set
- [ ] NEXTAUTH_URL matches production domain

### After Deployment
- [ ] Authentication flow works (sign in with Google)
- [ ] Dashboard shows user data
- [ ] Exam results save to database
- [ ] Anonymous users still work
- [ ] No console errors related to auth

## Troubleshooting

### Common Issues

1. **OAuth Error**: "redirect_uri_mismatch"
   - **Solution**: Check redirect URI in Google Cloud Console matches exactly

2. **Authentication Error**: "Configuration"
   - **Solution**: Verify all NEXTAUTH_ environment variables are set

3. **Database Connection Error**
   - **Solution**: Check ACCELERATE_URL is correctly configured

4. **Build Error**: Missing environment variables
   - **Solution**: Ensure all required variables are set to "Production" environment

### Debug Mode

Add for debugging (remove after):
```bash
NEXTAUTH_DEBUG=1
```

## Production URLs

- **Main Application**: https://eccco-medical.vercel.app
- **Authentication Endpoint**: https://eccco-medical.vercel.app/api/auth
- **Sign In Page**: https://eccco-medical.vercel.app/auth/signin
- **User Dashboard**: https://eccco-medical.vercel.app/dashboard

## Security Notes

- **NEXTAUTH_SECRET**: Must be different for each environment
- **Google Client Secret**: Keep secure, never expose in client-side code
- **Production Only**: Never use development credentials in production
- **HTTPS Required**: All OAuth redirects must use HTTPS

---

**Setup Time**: ~15 minutes  
**Difficulty**: Easy with proper Google Cloud access  
**Required**: Google Cloud Console access for OAuth setup