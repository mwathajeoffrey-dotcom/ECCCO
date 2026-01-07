#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⏱️  Progress Check - $(date '+%H:%M:%S')"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if process is running
if ps aux | grep -q "[s]cripts/seed-all-questions.ts"; then
  echo "✅ Process: RUNNING"
else
  echo "⚠️  Process: STOPPED"
fi

# Get latest log progress
LATEST=$(grep "Processed" seed-continue.log 2>/dev/null | tail -1)
if [ -n "$LATEST" ]; then
  echo "📝 Log:    $LATEST"
else
  echo "📝 Log:     No progress lines found"
fi

# Count log lines to see if it's growing
LINES=$(wc -l < seed-continue.log 2>/dev/null || echo "0")
echo "📄 Lines:   $LINES"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
