#!/bin/bash
# Second pass - archive more non-essential files

echo "🧹 Second cleanup pass - removing more non-essential docs..."

mkdir -p docs/archive/misc

# Move testing/debug files
mv BROWSER_CACHE_TEST.md docs/archive/misc/ 2>/dev/null
mv FRESH_TEST_NOW.md docs/archive/misc/ 2>/dev/null
mv QUICK_TEST_*.md docs/archive/misc/ 2>/dev/null
mv TEST_*.md docs/archive/misc/ 2>/dev/null
mv README_TESTING.md docs/archive/misc/ 2>/dev/null

# Move how-to guides
mv HOW_TO_*.md docs/archive/guides/ 2>/dev/null
mv WHERE_TO_*.md docs/archive/guides/ 2>/dev/null

# Move investigation/analysis files
mv *_INVESTIGATION.md docs/archive/misc/ 2>/dev/null
mv *_ANALYSIS.md docs/archive/misc/ 2>/dev/null
mv *_AUDIT.md docs/archive/misc/ 2>/dev/null
mv *_REVIEW.md docs/archive/misc/ 2>/dev/null
mv *_REPORT.md docs/archive/misc/ 2>/dev/null
mv *_STATUS.md docs/archive/misc/ 2>/dev/null
mv *_MONITOR.md docs/archive/misc/ 2>/dev/null

# Move specific files
mv BUTTON_FUNCTIONALITY_AUDIT.md docs/archive/misc/ 2>/dev/null
mv CHECK_VERCEL_ENV.md docs/archive/misc/ 2>/dev/null
mv CLEAN_REPOSITORY.md docs/archive/misc/ 2>/dev/null
mv CLICKABLE_JOURNAL_BADGES.md docs/archive/feature-logs/ 2>/dev/null
mv CLICK_HERE_CREATE_QUIZ.md docs/archive/guides/ 2>/dev/null
mv CODING_MISTAKES_ANALYSIS.md docs/archive/misc/ 2>/dev/null
mv COMPREHENSIVE_DEVELOPMENT_REVIEW.md docs/archive/misc/ 2>/dev/null
mv CONSOLE_MESSAGES_EXPLAINED.md docs/archive/misc/ 2>/dev/null
mv CORRUPTION_PREVENTION.md docs/archive/misc/ 2>/dev/null
mv CURRENT_STATUS_AND_PENDING.md docs/archive/misc/ 2>/dev/null
mv DATABASE_RESTORED.md docs/archive/misc/ 2>/dev/null
mv FILES_YOU_ARE_STRUGGLING_WITH.md docs/archive/misc/ 2>/dev/null
mv FINAL_CLEAN_NAVIGATION.md docs/archive/feature-logs/ 2>/dev/null
mv FINAL_DEPLOYMENT.md docs/archive/deployment-logs/ 2>/dev/null
mv FIX_VERCEL_DATABASE_URL.md docs/archive/fix-logs/ 2>/dev/null
mv FREE_EVIDENCE_AI_IMPLEMENTATION.md docs/archive/feature-logs/ 2>/dev/null
mv INCREASED_ARTICLE_LIMITS.md docs/archive/feature-logs/ 2>/dev/null
mv LIVE_QUIZ_ENHANCEMENTS.md docs/archive/feature-logs/ 2>/dev/null
mv LIVE_QUIZ_REMOVED.md docs/archive/feature-logs/ 2>/dev/null
mv NAVIGATION_FINAL_DESIGN.md docs/archive/feature-logs/ 2>/dev/null
mv NAVIGATION_FLOW_AUDIT.md docs/archive/misc/ 2>/dev/null
mv PRODUCTION_SEED_STATUS.md docs/archive/misc/ 2>/dev/null
mv PRODUCTION_VERIFICATION_CHECKLIST.md docs/archive/misc/ 2>/dev/null
mv QUICKSTART_GROQ.md docs/archive/guides/ 2>/dev/null
mv QUICK_REFERENCE_CARD.md docs/archive/guides/ 2>/dev/null
mv QUICK_TEST_WITHOUT_OLLAMA.md docs/archive/guides/ 2>/dev/null
mv QUICK_WINS_CHECKLIST.md docs/archive/misc/ 2>/dev/null
mv RLS_SECURITY_APPLY_NOW.md docs/archive/misc/ 2>/dev/null
mv SECURITY_ENHANCEMENTS.md docs/archive/feature-logs/ 2>/dev/null
mv SETUP_ADMIN_ACCESS.md docs/archive/guides/ 2>/dev/null
mv SUPPORT_FEEDBACK_FLOW_ANALYSIS.md docs/archive/misc/ 2>/dev/null
mv SUPPORT_PAGE_AUDIT.md docs/archive/misc/ 2>/dev/null
mv SUPPORT_SYSTEM_STATUS.md docs/archive/misc/ 2>/dev/null
mv TODAYS_PROGRESS.md docs/archive/misc/ 2>/dev/null
mv UNIVERSAL_SIDEBAR_SLIDE.md docs/archive/feature-logs/ 2>/dev/null
mv USE_LATEST_DEPLOYMENT.md docs/archive/misc/ 2>/dev/null
mv YOUR_NEXT_STEPS.md docs/archive/misc/ 2>/dev/null

# Create a clean README for docs/archive
cat > docs/archive/README.md << 'EOF'
# Archived Documentation

This folder contains archived documentation files from the development process.

## Structure

- **deployment-logs/** - Deployment records and summaries
- **feature-logs/** - Feature implementation and completion logs
- **fix-logs/** - Bug fixes and troubleshooting records
- **guides/** - How-to guides and setup instructions
- **misc/** - Miscellaneous analysis, audits, and status reports

## Current Documentation

For current, active documentation, see the root-level markdown files:
- `README.md` - Project overview
- `CHANGELOG.md` - Version history
- `CURRENT_STATUS.md` - Current project status
- `DEPLOYMENT_COMPLETE_2026-01-15.md` - Latest deployment
- `EVIDENCE_SEARCH_FINAL_VERIFICATION.md` - Evidence search feature docs

## Note

These archived files are kept for historical reference but are not actively maintained.
EOF

echo ""
echo "✅ Second cleanup complete!"
echo ""
echo "📊 Final Summary:"
echo "  Root MD files remaining: $(ls -1 *.md 2>/dev/null | wc -l)"
echo "  Total archived files: $(find docs/archive -name "*.md" 2>/dev/null | wc -l)"
echo ""
echo "📁 Essential files kept at root:"
ls -1 *.md 2>/dev/null
