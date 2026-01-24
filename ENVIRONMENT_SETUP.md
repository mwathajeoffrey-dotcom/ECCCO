# 🔐 ECCCO Security & Environment Setup Guide

## Required Environment Variables

### 🔴 Critical (Required for Production)

#### 1. ENCRYPTION_KEY

**Purpose:** Encrypts sensitive user data (PII, health information)

**Generate:**

```bash
openssl rand -base64 32
```

**Set in Vercel:**

```bash
vercel env add ENCRYPTION_KEY production
# Paste generated key when prompted
```

**Example:** `xK8pL2mN9qR5tU7vW3xY6zA1bC4dE8fG0hI2jK5lM7nO9pQ=`

---

#### 2. DATABASE_URL

**Purpose:** PostgreSQL connection string

**Format:**

```
postgresql://username:password@host:port/database
```

**Set in Vercel:**

- Already set if using Vercel Postgres
- For external DB: `vercel env add DATABASE_URL production`

---

#### 3. CLERK_SECRET_KEY

**Purpose:** Server-side authentication

**Get from:** https://dashboard.clerk.com

**Set in Vercel:**

```bash
vercel env add CLERK_SECRET_KEY production
```

**Example:** `sk_live_xxxxxxxxxxxxxxxxxxxxx`

---

#### 4. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

**Purpose:** Client-side authentication

**Get from:** https://dashboard.clerk.com

**Set in Vercel:**

```bash
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
```

**Example:** `pk_live_xxxxxxxxxxxxxxxxxxxxx`

---

### 🟡 Important (Recommended for Production)

#### 5. ALLOWED_ORIGINS

**Purpose:** CORS security - which domains can access your API

**Format:** Comma-separated list of domains

```
https://eccco.vercel.app,https://www.eccco.app
```

**Set in Vercel:**

```bash
vercel env add ALLOWED_ORIGINS production
```

---

#### 6. ADMIN_USER_IDS

**Purpose:** Clerk user IDs with admin access

**Get your ID:** https://dashboard.clerk.com → Users → Click user → Copy ID

**Format:** Comma-separated Clerk user IDs

```
user_2abc123def,user_2xyz789ghi
```

**Set in Vercel:**

```bash
vercel env add ADMIN_USER_IDS production
```

---

#### 7. GROQ_API_KEY

**Purpose:** AI-powered evidence synthesis

**Get free key:** https://console.groq.com

**Set in Vercel:**

```bash
vercel env add GROQ_API_KEY production
```

**Example:** `gsk_xxxxxxxxxxxxxxxxxxxxx`

---

### 🟢 Optional

#### 8. KV_REST_API_URL & KV_REST_API_TOKEN

**Purpose:** Vercel KV for caching (improves performance)

**Setup:**

```bash
vercel kv create eccco-cache
# Automatically adds KV_REST_API_URL and KV_REST_API_TOKEN
```

---

#### 9. SENTRY_DSN

**Purpose:** Error tracking and monitoring

**Get from:** https://sentry.io

**Set in Vercel:**

```bash
vercel env add SENTRY_DSN production
```

---

## 🚀 Quick Setup Guide

### For Production Deployment

1. **Generate Encryption Key**

   ```bash
   openssl rand -base64 32
   ```

   Copy the output.

2. **Set All Required Variables in Vercel**

   ```bash
   # Navigate to project
   cd /Users/apple/ECCCO

   # Login to Vercel
   vercel login

   # Link project (if not already)
   vercel link

   # Add encryption key
   vercel env add ENCRYPTION_KEY production
   # Paste the key generated in step 1

   # Add allowed origins
   vercel env add ALLOWED_ORIGINS production
   # Enter: https://eccco.vercel.app

   # Add admin user IDs
   vercel env add ADMIN_USER_IDS production
   # Enter: your_clerk_user_id

   # Add Groq API key (optional but recommended)
   vercel env add GROQ_API_KEY production
   # Enter: your_groq_api_key
   ```

3. **Verify Environment Variables**

   ```bash
   vercel env ls
   ```

4. **Redeploy**
   ```bash
   vercel --prod
   ```

---

## 🔒 Security Checklist

Before going to production:

- [ ] `ENCRYPTION_KEY` is set and is at least 32 characters
- [ ] `DATABASE_URL` is set and points to production database
- [ ] `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` are set
- [ ] `ALLOWED_ORIGINS` only includes your production domain(s)
- [ ] `ADMIN_USER_IDS` is set to your Clerk user ID
- [ ] All secrets are stored in Vercel (not in code)
- [ ] `.env.local` is in `.gitignore` and never committed
- [ ] Old commits don't contain secrets (check: `git log --all --full-history -- "*.env*"`)

---

## 🧪 Testing Environment Variables Locally

Create `.env.local` (never commit this!):

```bash
# Copy example
cp .env.example .env.local

# Add your local values
cat > .env.local << 'EOF'
# Clerk Authentication (get from https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Database (local)
DATABASE_URL=postgresql://localhost:5432/eccco_dev

# Security (development)
ENCRYPTION_KEY=development-key-do-not-use-in-production
ALLOWED_ORIGINS=http://localhost:3000

# Admin Access (get your user ID from Clerk dashboard)
ADMIN_USER_IDS=user_xxxxx
DEVELOPER_USER_IDS=user_xxxxx

# Optional: AI Services
GROQ_API_KEY=gsk_xxxxx
EOF
```

**Test:**

```bash
npm run dev
# Check for any environment variable errors
```

---

## 🔄 Rotating Secrets

If secrets are compromised:

1. **Rotate Clerk Keys**

   - Go to https://dashboard.clerk.com
   - Generate new keys
   - Update in Vercel
   - Redeploy

2. **Rotate Encryption Key**

   ```bash
   # Generate new key
   openssl rand -base64 32

   # Update in Vercel
   vercel env add ENCRYPTION_KEY production

   # NOTE: This will invalidate old encrypted data!
   # You may need to re-encrypt existing data
   ```

3. **Rotate Database Password**
   - Update password in database provider
   - Update `DATABASE_URL` in Vercel
   - Redeploy immediately

---

## 📞 Troubleshooting

### "ENCRYPTION_KEY must be set in production"

**Solution:**

```bash
openssl rand -base64 32
vercel env add ENCRYPTION_KEY production
# Paste generated key
vercel --prod
```

### "Invalid environment configuration"

**Check:**

1. All required variables are set: `vercel env ls`
2. Values are not empty
3. URLs are properly formatted (start with http:// or https://)

### "Failed to connect to database"

**Check:**

1. `DATABASE_URL` is correct
2. Database is accessible from Vercel
3. IP allowlist includes Vercel IPs (if using external DB)

---

## 📚 References

- [Clerk Dashboard](https://dashboard.clerk.com)
- [Groq Console](https://console.groq.com)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [OpenSSL Documentation](https://www.openssl.org/docs/)

---

**Last Updated:** January 20, 2026
**Maintained by:** ECCCO Development Team
