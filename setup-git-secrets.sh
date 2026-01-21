#!/bin/bash

# Configure git-secrets for ECCCO repository
# This prevents committing API keys, passwords, and other secrets

cd /Users/apple/ECCCO

echo "🔐 Configuring git-secrets..."
echo ""

# Install hooks (might already exist)
git secrets --install -f 2>/dev/null || git secrets --install

# Add patterns for all our secret types
echo "Adding secret patterns..."

# Groq API keys
git secrets --add "gsk_[a-zA-Z0-9]{50,}"

# Clerk API keys
git secrets --add "sk_test_[a-zA-Z0-9]{40,}"
git secrets --add "sk_live_[a-zA-Z0-9]{40,}"
git secrets --add "pk_live_[a-zA-Z0-9]{40,}"

# Sentry tokens
git secrets --add "sntryu_[a-zA-Z0-9]{50,}"

# Database passwords (Supabase pattern)
git secrets --add "postgres\.[a-z]+:[a-zA-Z0-9]{15,}@"

# Redis passwords
git secrets --add "redis://default:[a-zA-Z0-9]{20,}@"

# AWS patterns (standard)
git secrets --register-aws

echo ""
echo "✅ git-secrets configured successfully!"
echo ""
echo "Registered patterns:"
git secrets --list
echo ""
echo "🎯 What this does:"
echo "  - Blocks git commit if secrets detected"
echo "  - Scans files before commit"
echo "  - Prevents accidental exposure"
echo ""
echo "Test it: Try to commit a file with 'gsk_test123456...' and it will block!"
