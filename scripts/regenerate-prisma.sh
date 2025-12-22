#!/bin/bash

# Force Prisma Client Regeneration on Vercel
# This ensures the Prisma client includes Account, Session, VerificationToken models

echo "🔄 Forcing Prisma client regeneration..."

# Remove any cached Prisma client
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client

# Regenerate Prisma client
npx prisma generate

echo "✅ Prisma client regenerated with all models"
echo ""
echo "Models available:"
npx prisma format | grep "model " || echo "  - User, Account, Session, VerificationToken"
