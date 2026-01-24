#!/bin/bash

###############################################################################
# Console.log Cleanup Script
#
# This script helps identify and replace console.log statements with
# structured logging using the logger service.
#
# Usage:
#   ./scripts/cleanup-console-logs.sh [--dry-run] [--auto]
#
# Options:
#   --dry-run   Show what would be changed without making changes
#   --auto      Automatically replace all console.log with logger
#   --stats     Just show statistics
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DRY_RUN=false
AUTO_MODE=false
STATS_ONLY=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --auto)
      AUTO_MODE=true
      shift
      ;;
    --stats)
      STATS_ONLY=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧹 Console.log Cleanup Tool"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Find all console.log occurrences
echo "🔍 Scanning codebase..."
CONSOLE_LOGS=$(grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true)
CONSOLE_WARNS=$(grep -r "console\.warn" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true)
CONSOLE_ERRORS=$(grep -r "console\.error" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true)

LOG_COUNT=$(echo "$CONSOLE_LOGS" | grep -v "^$" | wc -l | xargs)
WARN_COUNT=$(echo "$CONSOLE_WARNS" | grep -v "^$" | wc -l | xargs)
ERROR_COUNT=$(echo "$CONSOLE_ERRORS" | grep -v "^$" | wc -l | xargs)
TOTAL=$((LOG_COUNT + WARN_COUNT + ERROR_COUNT))

echo -e "${BLUE}📊 Statistics:${NC}"
echo "  console.log:   $LOG_COUNT occurrences"
echo "  console.warn:  $WARN_COUNT occurrences"
echo "  console.error: $ERROR_COUNT occurrences"
echo "  ─────────────────────────"
echo "  Total:         $TOTAL occurrences"
echo ""

if [ "$STATS_ONLY" = true ]; then
  exit 0
fi

# Show top offenders
echo -e "${BLUE}🎯 Top files with most console statements:${NC}"
grep -r "console\." src/ --include="*.ts" --include="*.tsx" 2>/dev/null | \
  cut -d: -f1 | sort | uniq -c | sort -rn | head -10
echo ""

if [ "$TOTAL" -eq 0 ]; then
  echo -e "${GREEN}✅ No console.log statements found!${NC}"
  exit 0
fi

# Create backup
if [ "$DRY_RUN" = false ] && [ "$AUTO_MODE" = true ]; then
  BACKUP_DIR="backups/console-cleanup-$(date +%Y%m%d_%H%M%S)"
  echo "💾 Creating backup in $BACKUP_DIR..."
  mkdir -p "$BACKUP_DIR"
  cp -r src/ "$BACKUP_DIR/"
  echo -e "${GREEN}✅ Backup created${NC}"
  echo ""
fi

# Function to replace console statements in a file
replace_in_file() {
  local file="$1"
  local changes=0

  if [ "$DRY_RUN" = true ]; then
    echo "  Would update: $file"
  else
    # Add logger import if not present
    if ! grep -q "import.*logger.*from.*@/lib/logger" "$file"; then
      # Add import after other imports
      sed -i '' "1i\\
import { logger } from '@/lib/logger';\\
" "$file"
      changes=$((changes + 1))
    fi

    # Replace console.log with logger.debug (development only)
    if grep -q "console\.log" "$file"; then
      sed -i '' 's/console\.log(/logger.debug(/g' "$file"
      changes=$((changes + 1))
    fi

    # Replace console.warn with logger.warn
    if grep -q "console\.warn" "$file"; then
      sed -i '' 's/console\.warn(/logger.warn(/g' "$file"
      changes=$((changes + 1))
    fi

    # Replace console.error with logger.error
    if grep -q "console\.error" "$file"; then
      sed -i '' 's/console\.error(/logger.error(/g' "$file"
      changes=$((changes + 1))
    fi

    if [ $changes -gt 0 ]; then
      echo -e "  ${GREEN}✅ Updated: $file${NC}"
    fi
  fi
}

if [ "$AUTO_MODE" = true ]; then
  echo -e "${YELLOW}🔄 Automatically replacing console statements...${NC}"
  echo ""

  # Get list of files with console statements
  FILES=$(grep -r "console\." src/ --include="*.ts" --include="*.tsx" -l 2>/dev/null || true)

  for file in $FILES; do
    replace_in_file "$file"
  done

  if [ "$DRY_RUN" = false ]; then
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Cleanup complete!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Review changes: git diff"
    echo "2. Test application: npm run dev"
    echo "3. Commit changes: git commit -am 'refactor: Replace console.log with structured logger'"
    echo ""
    echo "Backup location: $BACKUP_DIR"
  fi
else
  echo -e "${YELLOW}⚠️  Manual mode - please review each file${NC}"
  echo ""
  echo "Recommend running with --auto flag:"
  echo "  ./scripts/cleanup-console-logs.sh --auto"
  echo ""
  echo "Or do a dry run first:"
  echo "  ./scripts/cleanup-console-logs.sh --dry-run --auto"
fi

exit 0
