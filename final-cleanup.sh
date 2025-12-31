#!/bin/bash

# ECCCO - Final Documentation Cleanup
# Keep ONLY essential documentation, remove ALL temporary/status files

echo "🗑️  Final Documentation Cleanup"
echo ""

# Essential files to KEEP (only these)
essential_files=(
  "README.md"
  "CHANGELOG.md"
  "CLEANUP_SUMMARY.md"
  "CLERK_AUTH_SETUP_GUIDE.md"
  "DEPLOYMENT_GUIDE.md"
  "LOCAL_TESTING_GUIDE.md"
)

# Move to temp array for checking
keep_pattern=""
for file in "${essential_files[@]}"; do
  keep_pattern="$keep_pattern -e $file"
done

echo "📋 Keeping ONLY these essential files:"
for file in "${essential_files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  fi
done

echo ""
echo "🗑️  Removing all other .md files..."

deleted=0

# Delete all .md files except the essential ones
for file in *.md; do
  if [ -f "$file" ]; then
    # Check if file is NOT in essential list
    if [[ ! " ${essential_files[@]} " =~ " ${file} " ]]; then
      echo "  Deleting: $file"
      rm "$file"
      ((deleted++))
    fi
  fi
done

echo ""
echo "✅ Cleanup Complete!"
echo "   Deleted: $deleted files"
echo "   Kept: ${#essential_files[@]} essential files"
echo ""
echo "📊 Final state:"
ls -1 *.md 2>/dev/null | wc -l | xargs echo "  Total .md files:"
