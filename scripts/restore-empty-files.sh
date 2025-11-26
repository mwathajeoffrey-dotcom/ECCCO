#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🔧 Finding and restoring empty files from git..."

# Find all empty TS/TSX files in src/
EMPTY_FILES=$(find src -type f \( -name "*.ts" -o -name "*.tsx" \) -size 0)

if [ -z "$EMPTY_FILES" ]; then
    echo "✅ No empty files found!"
    exit 0
fi

echo "Found empty files:"
echo "$EMPTY_FILES"
echo ""

# Try to restore from the most recent commit where they weren't empty
RESTORE_COMMIT="f8a9d87" # Known good commit

echo "Restoring from commit $RESTORE_COMMIT..."

RESTORED_COUNT=0
FAILED_COUNT=0

while IFS= read -r file; do
    if [ -n "$file" ]; then
        echo -n "Restoring $file... "
        
        # Try to restore from git
        if git show "$RESTORE_COMMIT:$file" > "$file" 2>/dev/null; then
            echo -e "${GREEN}✓${NC}"
            RESTORED_COUNT=$((RESTORED_COUNT + 1))
        else
            echo -e "${RED}✗ (not in git history)${NC}"
            FAILED_COUNT=$((FAILED_COUNT + 1))
        fi
    fi
done <<< "$EMPTY_FILES"

echo ""
echo "📊 Summary:"
echo "  Restored: $RESTORED_COUNT files"
echo "  Failed: $FAILED_COUNT files"

if [ $FAILED_COUNT -gt 0 ]; then
    echo ""
    echo "⚠️  Some files couldn't be restored from git."
    echo "They may need to be recreated manually."
fi
