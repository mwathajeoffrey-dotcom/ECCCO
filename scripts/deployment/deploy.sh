#!/bin/bash

# ECCCO Production Deployment Script
# Usage: ./scripts/deployment/deploy.sh [environment]
# Environments: staging, production

set -e

ENVIRONMENT=${1:-staging}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 Starting ECCCO deployment to $ENVIRONMENT environment..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Validate environment
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    error "Invalid environment. Use 'staging' or 'production'"
fi

# Check prerequisites
log "Checking prerequisites..."

# Check if required files exist
required_files=(".env.example" "package.json" "next.config.ts" "prisma/schema.prisma")
for file in "${required_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        error "Required file missing: $file"
    fi
done

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    error "Node.js is not installed"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    error "npm is not installed"
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"
if ! npx semver --range ">=$REQUIRED_VERSION" "$NODE_VERSION" &> /dev/null; then
    error "Node.js version $NODE_VERSION is below required version $REQUIRED_VERSION"
fi

log "Prerequisites check passed ✅"

# Install dependencies
log "Installing dependencies..."
npm ci --no-audit --no-fund

# Generate Prisma client
log "Generating Prisma client..."
npx prisma generate

# Run type checking
log "Running TypeScript type checking..."
npm run type-check

# Run linting
log "Running ESLint..."
npm run lint

# Run tests if available
if npm run test --dry-run &> /dev/null; then
    log "Running tests..."
    npm run test
fi

# Build application
log "Building application..."
npm run build

# Database operations for production
if [[ "$ENVIRONMENT" == "production" ]]; then
    warn "Production deployment detected. Please ensure database migrations are ready."
    echo "Run 'npm run db:migrate:prod' manually after verifying migration scripts."
fi

# Create deployment package
log "Creating deployment package..."
PACKAGE_NAME="eccco-$ENVIRONMENT-$TIMESTAMP.tar.gz"
tar -czf "$PACKAGE_NAME" \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=.next \
    --exclude=coverage \
    --exclude="*.log" \
    --exclude=.env.local \
    .

log "Deployment package created: $PACKAGE_NAME"

# Deployment instructions
log "=== DEPLOYMENT INSTRUCTIONS ==="
echo ""
echo "📦 Package: $PACKAGE_NAME"
echo "🌐 Environment: $ENVIRONMENT"
echo ""
echo "Next steps:"
echo "1. Upload package to your server"
echo "2. Extract: tar -xzf $PACKAGE_NAME"
echo "3. Set environment variables based on .env.example"
echo "4. Install dependencies: npm ci --production"
echo "5. Run database migrations: npm run db:migrate:$ENVIRONMENT"
echo "6. Start application: npm run start"
echo ""

if [[ "$ENVIRONMENT" == "production" ]]; then
    echo "⚠️  PRODUCTION CHECKLIST:"
    echo "   □ Environment variables configured"
    echo "   □ Database connection tested"
    echo "   □ SSL certificates installed"
    echo "   □ Backup systems in place"
    echo "   □ Monitoring configured"
    echo "   □ Health checks working"
    echo ""
fi

log "Deployment preparation completed successfully! 🎉"

# Optional: Deploy to Vercel if vercel CLI is available
if command -v vercel &> /dev/null; then
    echo ""
    read -p "Deploy to Vercel now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log "Deploying to Vercel..."
        if [[ "$ENVIRONMENT" == "production" ]]; then
            vercel --prod
        else
            vercel
        fi
        log "Vercel deployment completed!"
    fi
fi