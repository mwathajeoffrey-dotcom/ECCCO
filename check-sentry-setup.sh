#!/bin/bash
# Sentry Configuration Checker
# Verifies that all required Sentry environment variables are set

echo "🔍 Checking Sentry Configuration..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local file not found"
    echo "   Create one with: cp .env.example .env.local (if exists)"
    echo ""
fi

# Check for required environment variables
MISSING=0

check_var() {
    VAR_NAME=$1
    if grep -q "^${VAR_NAME}=" .env.local 2>/dev/null; then
        VALUE=$(grep "^${VAR_NAME}=" .env.local | cut -d'=' -f2)
        if [ -z "$VALUE" ]; then
            echo "❌ $VAR_NAME is set but empty"
            MISSING=$((MISSING + 1))
        else
            # Mask the value for security
            MASKED="${VALUE:0:10}..."
            echo "✅ $VAR_NAME is set ($MASKED)"
        fi
    else
        echo "❌ $VAR_NAME is NOT set"
        MISSING=$((MISSING + 1))
    fi
}

echo "Environment Variables Status:"
echo "-----------------------------"
check_var "SENTRY_DSN"
check_var "SENTRY_ORG"
check_var "SENTRY_PROJECT"
check_var "SENTRY_AUTH_TOKEN"
echo ""

# Check Sentry config files
echo "Configuration Files:"
echo "-------------------"
if [ -f "sentry.client.config.ts" ]; then
    echo "✅ sentry.client.config.ts exists"
else
    echo "❌ sentry.client.config.ts missing"
    MISSING=$((MISSING + 1))
fi

if [ -f "sentry.server.config.ts" ]; then
    echo "✅ sentry.server.config.ts exists"
else
    echo "❌ sentry.server.config.ts missing"
    MISSING=$((MISSING + 1))
fi

if [ -f "sentry.edge.config.ts" ]; then
    echo "✅ sentry.edge.config.ts exists"
else
    echo "❌ sentry.edge.config.ts missing"
    MISSING=$((MISSING + 1))
fi
echo ""

# Check next.config.ts
echo "Next.js Configuration:"
echo "---------------------"
if grep -q "withSentryConfig" next.config.ts 2>/dev/null; then
    echo "✅ next.config.ts has Sentry integration"
else
    echo "❌ next.config.ts missing Sentry integration"
    MISSING=$((MISSING + 1))
fi
echo ""

# Summary
echo "======================================"
if [ $MISSING -eq 0 ]; then
    echo "✅ Sentry is fully configured!"
    echo ""
    echo "Next steps:"
    echo "1. Run 'npm run build' to test source map upload"
    echo "2. Check Sentry dashboard for uploaded source maps"
    echo "3. Trigger a test error to verify stack traces"
else
    echo "⚠️  Sentry setup incomplete ($MISSING issues found)"
    echo ""
    echo "To complete setup:"
    echo "1. Follow SENTRY_SETUP_GUIDE.md"
    echo "2. Add missing environment variables to .env.local"
    echo "3. Get auth token from https://sentry.io/settings/account/api/auth-tokens/"
fi
echo "======================================"
