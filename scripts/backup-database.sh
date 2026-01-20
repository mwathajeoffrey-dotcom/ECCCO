#!/bin/bash

###############################################################################
# ECCCO Database Backup Script
# 
# This script creates automated backups of the PostgreSQL database
# 
# Usage:
#   ./scripts/backup-database.sh
#
# Environment Variables Required:
#   DATABASE_URL - PostgreSQL connection string
#
# Schedule with cron:
#   0 2 * * * /path/to/scripts/backup-database.sh >> /var/log/eccco-backup.log 2>&1
###############################################################################

set -e  # Exit on error
set -u  # Exit on undefined variable

# Configuration
BACKUP_DIR="backups/database"
RETENTION_DAYS=30
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="eccco_backup_${DATE}.sql"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🗄️  ECCCO Database Backup - $(date)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if DATABASE_URL is set
if [ -z "${DATABASE_URL:-}" ]; then
    echo -e "${RED}❌ ERROR: DATABASE_URL environment variable not set${NC}"
    echo "Load from .env file or set manually:"
    echo "  export DATABASE_URL='postgresql://...'"
    exit 1
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"
echo "📁 Backup directory: $BACKUP_DIR"

# Create backup
echo "⏳ Creating database backup..."
if pg_dump "$DATABASE_URL" > "$BACKUP_DIR/$BACKUP_FILE"; then
    echo -e "${GREEN}✅ Backup created: $BACKUP_FILE${NC}"
else
    echo -e "${RED}❌ Backup failed!${NC}"
    exit 1
fi

# Get file size
BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_FILE" | cut -f1)
echo "📊 Backup size: $BACKUP_SIZE"

# Compress backup
echo "🗜️  Compressing backup..."
if gzip "$BACKUP_DIR/$BACKUP_FILE"; then
    echo -e "${GREEN}✅ Compressed: ${BACKUP_FILE}.gz${NC}"
    COMPRESSED_SIZE=$(du -h "$BACKUP_DIR/${BACKUP_FILE}.gz" | cut -f1)
    echo "📊 Compressed size: $COMPRESSED_SIZE"
else
    echo -e "${YELLOW}⚠️  Compression failed, keeping uncompressed backup${NC}"
fi

# Clean old backups
echo "🧹 Cleaning old backups (older than $RETENTION_DAYS days)..."
DELETED_COUNT=$(find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete -print | wc -l)
echo "🗑️  Deleted $DELETED_COUNT old backup(s)"

# List current backups
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "*.sql.gz" | wc -l)
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
echo ""
echo "📦 Current backups: $BACKUP_COUNT files"
echo "💾 Total backup size: $TOTAL_SIZE"

# Optional: Upload to cloud storage (uncomment if using)
# echo "☁️  Uploading to cloud storage..."
# if command -v aws &> /dev/null; then
#     aws s3 cp "$BACKUP_DIR/${BACKUP_FILE}.gz" "s3://eccco-backups/" && \
#         echo -e "${GREEN}✅ Uploaded to S3${NC}"
# fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Backup completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Latest backup: $BACKUP_DIR/${BACKUP_FILE}.gz"
echo ""

# Test backup integrity (sample check)
echo "🔍 Testing backup integrity..."
if gunzip -t "$BACKUP_DIR/${BACKUP_FILE}.gz" 2>/dev/null; then
    echo -e "${GREEN}✅ Backup file is valid${NC}"
else
    echo -e "${RED}❌ Backup file may be corrupted!${NC}"
    exit 1
fi

exit 0
