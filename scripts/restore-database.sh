#!/bin/bash

###############################################################################
# ECCCO Database Restore Script
#
# This script restores the PostgreSQL database from a backup file
#
# ⚠️  WARNING: This will REPLACE all data in the target database!
#
# Usage:
#   ./scripts/restore-database.sh <backup-file>
#
# Example:
#   ./scripts/restore-database.sh backups/database/eccco_backup_20260120_140530.sql.gz
#
# For safety, this script requires explicit confirmation before proceeding.
###############################################################################

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check arguments
if [ $# -eq 0 ]; then
    echo -e "${RED}❌ ERROR: No backup file specified${NC}"
    echo ""
    echo "Usage: $0 <backup-file>"
    echo ""
    echo "Available backups:"
    ls -lh backups/database/*.sql.gz 2>/dev/null || echo "  (none found)"
    exit 1
fi

BACKUP_FILE="$1"

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ ERROR: Backup file not found: $BACKUP_FILE${NC}"
    exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔄 ECCCO Database Restore"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Backup file: $BACKUP_FILE"
echo "File size: $(du -h "$BACKUP_FILE" | cut -f1)"
echo ""

# Check if DATABASE_URL is set
if [ -z "${DATABASE_URL:-}" ]; then
    echo -e "${RED}❌ ERROR: DATABASE_URL environment variable not set${NC}"
    exit 1
fi

# Extract database name from URL for confirmation
DB_NAME=$(echo "$DATABASE_URL" | sed -n 's/.*\/\([^?]*\).*/\1/p')

echo -e "${YELLOW}⚠️  WARNING: This will REPLACE all data in database: ${DB_NAME}${NC}"
echo ""
echo "Current database contents will be PERMANENTLY DELETED!"
echo ""
read -p "Are you absolutely sure? Type 'YES' to continue: " CONFIRM

if [ "$CONFIRM" != "YES" ]; then
    echo -e "${YELLOW}Restore cancelled.${NC}"
    exit 0
fi

echo ""
echo "⏳ Starting restore process..."

# Decompress if needed
if [[ "$BACKUP_FILE" == *.gz ]]; then
    echo "📦 Decompressing backup..."
    TEMP_FILE="${BACKUP_FILE%.gz}"
    gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"
    RESTORE_FILE="$TEMP_FILE"
    CLEANUP_TEMP=true
else
    RESTORE_FILE="$BACKUP_FILE"
    CLEANUP_TEMP=false
fi

# Restore database
echo "🔄 Restoring database..."
if psql "$DATABASE_URL" < "$RESTORE_FILE"; then
    echo -e "${GREEN}✅ Database restored successfully!${NC}"
else
    echo -e "${RED}❌ Restore failed!${NC}"
    [ "$CLEANUP_TEMP" = true ] && rm -f "$TEMP_FILE"
    exit 1
fi

# Cleanup temporary file
if [ "$CLEANUP_TEMP" = true ]; then
    rm -f "$TEMP_FILE"
    echo "🧹 Cleaned up temporary files"
fi

# Verify restore
echo ""
echo "🔍 Verifying restore..."
USER_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM \"User\";" 2>/dev/null || echo "0")
QUESTION_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM \"Question\";" 2>/dev/null || echo "0")

echo "Users in database: $(echo $USER_COUNT | xargs)"
echo "Questions in database: $(echo $QUESTION_COUNT | xargs)"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Restore completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

exit 0
