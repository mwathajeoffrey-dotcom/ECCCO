# Password Reset System - Production Deployment Guide

## Overview
Complete password reset functionality has been implemented with secure token generation, email integration, and comprehensive UI/UX.

## Features
- ✅ Secure token generation with crypto.randomBytes
- ✅ 1-hour token expiration for security
- ✅ Password hashing with bcryptjs (strength: 12)
- ✅ Input validation with zod schemas
- ✅ User-friendly responsive UI pages
- ✅ Comprehensive error handling
- ✅ Development mode console logging
- ✅ Database schema with unique constraints

## Production Deployment Steps

### 1. Environment Variables
Add these environment variables to your Vercel production environment:

```bash
# Email Service Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=noreply@yourdomain.com

# Next.js/NextAuth (if not already set)
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
```

### 2. Database Migration
The password reset fields have been added to the schema. For production:

```bash
# Generate a proper migration (run locally)
npx prisma migrate dev --name "add_password_reset_fields"

# Deploy to production database
npx prisma migrate deploy
```

### 3. Email Provider Setup

#### Option A: Gmail (Development/Small Scale)
1. Enable 2FA on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password as `EMAIL_PASS`

#### Option B: SendGrid (Recommended for Production)
1. Create SendGrid account
2. Update the transporter in `/src/app/api/auth/forgot-password/route.ts`:
```typescript
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```
3. Add `SENDGRID_API_KEY` environment variable

#### Option C: Amazon SES
```typescript
const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.AWS_SES_USER,
    pass: process.env.AWS_SES_PASS,
  },
});
```

### 4. Testing in Production
1. Deploy with environment variables
2. Visit `/auth/forgot-password`
3. Request reset for a test email
4. Check email delivery
5. Complete password reset flow

## File Structure
```
src/app/
├── api/auth/
│   ├── forgot-password/route.ts  # POST endpoint for requesting reset
│   └── reset-password/route.ts   # GET/POST endpoints for token validation and reset
├── auth/
│   ├── forgot-password/page.tsx  # User request form
│   ├── reset-password/page.tsx   # Password reset form
│   └── signin/page.tsx           # Updated with "Forgot Password?" link
```

## Security Features
- **Token Security**: 32-byte cryptographically secure random tokens
- **Time-based Expiry**: 1-hour expiration prevents replay attacks
- **Password Hashing**: bcryptjs with strength 12 (2^12 = 4096 rounds)
- **Input Validation**: Zod schemas prevent malicious input
- **Error Handling**: No user enumeration (same response for valid/invalid emails)
- **Database Constraints**: Unique constraints prevent token collisions

## Email Template
The system includes a professional HTML email template with:
- ECCCO branding
- Clear reset button
- Fallback URL for copy-paste
- Security notice about expiration
- Support contact information

## API Endpoints
- `POST /api/auth/forgot-password` - Request password reset
- `GET /api/auth/reset-password?token=xxx` - Validate reset token
- `POST /api/auth/reset-password` - Submit new password

## Monitoring & Maintenance
- Monitor email delivery rates
- Check for failed password reset attempts
- Clean up expired tokens periodically (optional background job)
- Monitor authentication logs for security

## Troubleshooting
1. **Emails not sending**: Check email provider credentials and SMTP settings
2. **Token validation fails**: Verify system clock sync and token expiration logic
3. **CORS issues**: Ensure NEXTAUTH_URL matches your domain exactly
4. **Database errors**: Confirm migration ran successfully in production