#!/bin/bash
# Clean up excessive documentation files
# Keep only essential docs, move rest to archive

echo "🧹 Starting documentation cleanup..."

# Create archive directory
mkdir -p docs/archive/deployment-logs
mkdir -p docs/archive/feature-logs
mkdir -p docs/archive/fix-logs
mkdir -p docs/archive/guides

# Files to KEEP at root level (essential)
KEEP_FILES=(
    "README.md"
    "CHANGELOG.md"
    "DEPLOYMENT_COMPLETE_2026-01-15.md"
    "EVIDENCE_SEARCH_FINAL_VERIFICATION.md"
    "CURRENT_STATUS.md"
)

# Move evidence-related docs to archive
echo "📦 Archiving evidence search documentation..."
mv EVIDENCE_*.md docs/archive/feature-logs/ 2>/dev/null
mv CLINICAL_*.md docs/archive/feature-logs/ 2>/dev/null
mv OPENEVIDENCE_*.md docs/archive/feature-logs/ 2>/dev/null
mv GROQ_*.md docs/archive/feature-logs/ 2>/dev/null
mv OLLAMA_*.md docs/archive/feature-logs/ 2>/dev/null

# Move deployment docs to archive
echo "📦 Archiving deployment documentation..."
mv DEPLOYMENT_*.md docs/archive/deployment-logs/ 2>/dev/null
mv VERCEL_*.md docs/archive/deployment-logs/ 2>/dev/null
mv READY_TO_*.md docs/archive/deployment-logs/ 2>/dev/null

# Move fix/debug docs to archive
echo "📦 Archiving fix documentation..."
mv *_FIX*.md docs/archive/fix-logs/ 2>/dev/null
mv *_FIXED*.md docs/archive/fix-logs/ 2>/dev/null
mv *_ERROR*.md docs/archive/fix-logs/ 2>/dev/null
mv *_DEBUG*.md docs/archive/fix-logs/ 2>/dev/null
mv *_TROUBLESHOOTING*.md docs/archive/fix-logs/ 2>/dev/null

# Move feature completion docs
echo "📦 Archiving feature completion logs..."
mv *_COMPLETE*.md docs/archive/feature-logs/ 2>/dev/null
mv DAY_*.md docs/archive/feature-logs/ 2>/dev/null
mv DARK_MODE_*.md docs/archive/feature-logs/ 2>/dev/null
mv QUIZ_*.md docs/archive/feature-logs/ 2>/dev/null
mv MOBILE_*.md docs/archive/feature-logs/ 2>/dev/null

# Move guides to guides archive
echo "📦 Archiving guides..."
mv *_GUIDE*.md docs/archive/guides/ 2>/dev/null
mv GETTING_STARTED.md docs/archive/guides/ 2>/dev/null
mv MANUAL_*.md docs/archive/guides/ 2>/dev/null
mv TESTING_*.md docs/archive/guides/ 2>/dev/null
mv INTEGRATION_*.md docs/archive/guides/ 2>/dev/null

# Move miscellaneous
echo "📦 Archiving miscellaneous docs..."
mv *_PLAN*.md docs/archive/feature-logs/ 2>/dev/null
mv *_ROADMAP*.md docs/archive/feature-logs/ 2>/dev/null
mv *_SUMMARY*.md docs/archive/deployment-logs/ 2>/dev/null
mv WHATS_LEFT_TODO.md docs/archive/ 2>/dev/null

# Restore essential files back to root
echo "📌 Restoring essential files to root..."
for file in "${KEEP_FILES[@]}"; do
    if [ -f "docs/archive/deployment-logs/$file" ]; then
        mv "docs/archive/deployment-logs/$file" .
    elif [ -f "docs/archive/feature-logs/$file" ]; then
        mv "docs/archive/feature-logs/$file" .
    elif [ -f "docs/archive/fix-logs/$file" ]; then
        mv "docs/archive/fix-logs/$file" .
    fi
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Summary:"
echo "  Root MD files remaining: $(ls -1 *.md 2>/dev/null | wc -l)"
echo "  Archived deployment logs: $(ls -1 docs/archive/deployment-logs/*.md 2>/dev/null | wc -l)"
echo "  Archived feature logs: $(ls -1 docs/archive/feature-logs/*.md 2>/dev/null | wc -l)"
echo "  Archived fix logs: $(ls -1 docs/archive/fix-logs/*.md 2>/dev/null | wc -l)"
echo "  Archived guides: $(ls -1 docs/archive/guides/*.md 2>/dev/null | wc -l)"
echo ""
echo "📁 Essential files kept at root:"
ls -1 *.md 2>/dev/null
