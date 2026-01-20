#!/bin/bash

###############################################################################
# Logger Signature Fix Script
# 
# Fixes logger calls that were auto-converted from console.log but don't
# match the proper TypeScript signatures
###############################################################################

set -e

echo "🔧 Fixing logger signatures to match TypeScript definitions..."
echo ""

# Strategy:
# 1. Find all files with logger calls
# 2. For each problematic pattern, fix it

FILES=$(find src -type f \( -name "*.ts" -o -name "*.tsx" \))

echo "📁 Processing files..."

for file in $FILES; do
  # Fix pattern: logger.debug("msg:", value) -> logger.debug("msg", { value })
  # This handles the most common case where console.log had key-value pairs
  perl -i -pe 's/logger\.(debug|info|warn)\((["\x27])([^"\x27]+):\2,\s*([a-zA-Z_][\w.]*)\)/logger.$1($2$3$2, { $4 })/g' "$file"
  
  # Fix pattern: logger.error("msg:", error) -> logger.error("msg", error instanceof Error ? error : new Error(String(error)))
  # Ensures error parameter is properly typed
  perl -i -pe 's/logger\.error\((["\x27])([^"\x27]+):\1,\s*(\w+)\s*\)/logger.error($1$2$1, $3 instanceof Error ? $3 : new Error(String($3)))/g' "$file"
done

echo "✅ Phase 1 complete: Fixed colon-pattern logger calls"
echo ""

# Now run the build to find remaining errors
echo "🏗️  Running build to find remaining issues..."
npm run build 2>&1 | tee build-errors.log || true

# Extract unique error patterns
echo ""
echo "📊 Analyzing remaining errors..."
grep "Type error:" build-errors.log | sort | uniq -c | sort -rn | head -20

echo ""
echo "✅ Script complete!"
echo ""
echo "Next steps:"
echo "1. Review build-errors.log for specific issues"
echo "2. Most common patterns have been fixed"
echo "3. Manual fixes may be needed for complex cases"
