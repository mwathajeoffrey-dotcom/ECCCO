#!/bin/bash

# Security Audit and Fix Script for ECCCO
# Run this after creating new API keys to verify everything is secure

echo "🔐 ECCCO Security Audit"
echo "======================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: Scan for exposed secrets in codebase
echo "1️⃣  Scanning for exposed secrets in codebase..."
echo ""

# Old Groq key pattern (the exposed one - redacted for security)
OLD_GROQ_PATTERN="PATTERN_REDACTED_TO_PREVENT_EXPOSURE"
if grep -r "$OLD_GROQ_PATTERN" . --exclude-dir=.git --exclude=.env.local 2>/dev/null | grep -v "node_modules" | grep -v "Binary"; then
    echo -e "${RED}❌ CRITICAL: Old exposed Groq API key found in files!${NC}"
    echo "   Files containing old key:"
    grep -r "$OLD_GROQ_PATTERN" . --exclude-dir=.git --exclude=.env.local 2>/dev/null | grep -v "node_modules" | cut -d: -f1 | sort -u
    echo ""
    echo "   ACTION: Remove the old key from these files immediately!"
    echo ""
else
    echo -e "${GREEN}✅ No exposed Groq API key found in tracked files${NC}"
    echo ""
fi

# Check 2: Verify .env.local exists and has required keys
echo "2️⃣  Checking local environment configuration..."
echo ""

if [ -f .env.local ]; then
    echo -e "${GREEN}✅ .env.local exists${NC}"
    
    # Check for required keys (without showing values)
    required_keys=("GROQ_API_KEY" "DATABASE_URL" "CLERK_SECRET_KEY" "REDIS_URL")
    
    for key in "${required_keys[@]}"; do
        if grep -q "^$key=" .env.local; then
            echo -e "${GREEN}✅ $key is set${NC}"
        else
            echo -e "${RED}❌ $key is missing${NC}"
        fi
    done
    echo ""
else
    echo -e "${RED}❌ .env.local not found${NC}"
    echo "   ACTION: Create .env.local with your environment variables"
    echo ""
fi

# Check 3: Verify .env.local is in .gitignore
echo "3️⃣  Checking .gitignore configuration..."
echo ""

if [ -f .gitignore ]; then
    if grep -q ".env.local" .gitignore; then
        echo -e "${GREEN}✅ .env.local is in .gitignore${NC}"
    else
        echo -e "${YELLOW}⚠️  .env.local not in .gitignore${NC}"
        echo "   ACTION: Add .env.local to .gitignore"
        echo "   Run: echo '.env.local' >> .gitignore"
    fi
    
    if grep -q ".env*.local" .gitignore; then
        echo -e "${GREEN}✅ .env*.local pattern in .gitignore${NC}"
    else
        echo -e "${YELLOW}⚠️  .env*.local pattern not in .gitignore${NC}"
        echo "   ACTION: Add .env*.local to .gitignore"
        echo "   Run: echo '.env*.local' >> .gitignore"
    fi
    echo ""
else
    echo -e "${RED}❌ .gitignore not found${NC}"
    echo ""
fi

# Check 4: Look for any hardcoded secrets in common files
echo "4️⃣  Scanning common files for hardcoded secrets..."
echo ""

secret_patterns=(
    "sk_test_"
    "sk_live_"
    "pk_live_"
    "gsk_"
    "sntryu_"
    "postgres:[a-zA-Z0-9]{10,}"
)

found_secrets=0
for pattern in "${secret_patterns[@]}"; do
    # Search in TypeScript/JavaScript files, excluding node_modules and .env.local
    if grep -r -E "$pattern" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.md" \
        --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next --exclude=.env.local . 2>/dev/null | \
        grep -v "your_.*_here" | grep -v "xxx" | grep -v "Copy from"; then
        found_secrets=1
    fi
done

if [ $found_secrets -eq 0 ]; then
    echo -e "${GREEN}✅ No obvious hardcoded secrets found in source files${NC}"
    echo ""
else
    echo -e "${RED}❌ Potential hardcoded secrets found (see above)${NC}"
    echo "   ACTION: Remove these secrets and use environment variables"
    echo ""
fi

# Check 5: Verify .env.example exists
echo "5️⃣  Checking for .env.example template..."
echo ""

if [ -f .env.example ]; then
    echo -e "${GREEN}✅ .env.example exists${NC}"
    
    # Check that .env.example doesn't contain real secrets
    if grep -E "gsk_[a-zA-Z0-9]{50,}|sk_test_[a-zA-Z0-9]{24,}|postgres\.[a-z]+:[a-zA-Z0-9]+" .env.example 2>/dev/null; then
        echo -e "${RED}❌ .env.example contains real secrets!${NC}"
        echo "   ACTION: Replace with placeholder values"
    else
        echo -e "${GREEN}✅ .env.example uses placeholder values${NC}"
    fi
    echo ""
else
    echo -e "${YELLOW}⚠️  .env.example not found${NC}"
    echo "   ACTION: Create .env.example with placeholder values for documentation"
    echo ""
fi

# Check 6: Test if git-secrets is installed
echo "6️⃣  Checking for git-secrets installation..."
echo ""

if command -v git-secrets &> /dev/null; then
    echo -e "${GREEN}✅ git-secrets is installed${NC}"
    
    # Check if git-secrets is initialized in this repo
    if [ -f .git/hooks/commit-msg ] && grep -q "git-secrets" .git/hooks/commit-msg; then
        echo -e "${GREEN}✅ git-secrets hooks are installed${NC}"
    else
        echo -e "${YELLOW}⚠️  git-secrets not initialized in this repo${NC}"
        echo "   ACTION: Run 'git secrets --install' in this repo"
    fi
    echo ""
else
    echo -e "${YELLOW}⚠️  git-secrets not installed${NC}"
    echo "   ACTION: Install with 'brew install git-secrets' (macOS)"
    echo ""
fi

# Check 7: Recent commits for potential leaks
echo "7️⃣  Checking recent commits for potential secret exposure..."
echo ""

# Check last 5 commits for patterns that might be secrets
recent_commits=$(git log --oneline -5 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "Recent commits:"
    echo "$recent_commits"
    echo ""
    
    # Check if any recent commits mention keys or secrets
    if echo "$recent_commits" | grep -iE "key|secret|password|token|credential"; then
        echo -e "${YELLOW}⚠️  Recent commits mention keys/secrets${NC}"
        echo "   VERIFY: These commits don't contain actual secret values"
        echo "   Run: git show <commit-hash> | grep -E 'gsk_|sk_test_|postgres:'"
        echo ""
    else
        echo -e "${GREEN}✅ Recent commits don't mention keys/secrets${NC}"
        echo ""
    fi
else
    echo -e "${YELLOW}⚠️  Not a git repository or no commits${NC}"
    echo ""
fi

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 SUMMARY & NEXT STEPS"
echo ""

# Count issues
issues=0

# Recheck for old key
if grep -r "$OLD_GROQ_PATTERN" . --exclude-dir=.git --exclude=.env.local 2>/dev/null | grep -v "node_modules" | grep -v "Binary" > /dev/null; then
    ((issues++))
fi

# Check .env.local
if [ ! -f .env.local ]; then
    ((issues++))
fi

# Check .gitignore
if [ -f .gitignore ]; then
    if ! grep -q ".env.local" .gitignore; then
        ((issues++))
    fi
fi

# Check git-secrets
if ! command -v git-secrets &> /dev/null; then
    ((issues++))
fi

if [ $issues -eq 0 ]; then
    echo -e "${GREEN}🎉 All security checks passed!${NC}"
    echo ""
    echo "Your codebase appears to be secure. Good job!"
    echo ""
else
    echo -e "${YELLOW}⚠️  Found $issues potential security issue(s)${NC}"
    echo ""
    echo "Review the output above and take the recommended actions."
    echo ""
fi

echo "CRITICAL REMINDERS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. 🔑 GROQ API KEY:"
echo "   - Create NEW key at: https://console.groq.com/keys"
echo "   - Update Vercel: https://vercel.com/.../eccco/settings/environment-variables"
echo "   - Update local .env.local"
echo "   - Revoke OLD key (gsk_****C3te) - expires Jan 24, 2026!"
echo ""
echo "2. 🗄️  SUPABASE SECURITY:"
echo "   - Check Security Advisor: https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer"
echo "   - Fix 18 security errors"
echo "   - Enable RLS on all tables"
echo "   - Consider rotating database password"
echo ""
echo "3. 🛡️  PREVENTION:"
echo "   - Install git-secrets: brew install git-secrets"
echo "   - Never commit .env.local"
echo "   - Use .env.example for documentation"
echo "   - Double-check before git push"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Offer to create .env.example if it doesn't exist
if [ ! -f .env.example ]; then
    echo ""
    read -p "Would you like to create .env.example now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cat > .env.example << 'EOF'
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Database (Supabase)
DATABASE_URL=postgresql://postgres.xxx:your_password_here@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Admin & Developer Authorization
ADMIN_USER_IDS=user_your_admin_id_here
DEVELOPER_USER_IDS=user_your_developer_id_here

# Groq AI (Medical Evidence Synthesis)
GROQ_API_KEY=gsk_your_groq_api_key_here

# Redis (Optional - for caching)
REDIS_URL=redis://default:your_password_here@xxx.redislabs.com:11940

# Sentry Error Tracking & Performance Monitoring (Optional)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.us.sentry.io/xxx
SENTRY_DSN=https://xxx@xxx.ingest.us.sentry.io/xxx
SENTRY_ORG=your_org_name
SENTRY_PROJECT=your_project_name
SENTRY_AUTH_TOKEN=sntryu_your_auth_token_here
EOF
        echo -e "${GREEN}✅ Created .env.example${NC}"
        echo "   Remember to commit this file (it's safe - no real secrets)"
        echo ""
    fi
fi

echo "For detailed instructions, see: SECURITY_FIX_PLAN.md"
echo ""
