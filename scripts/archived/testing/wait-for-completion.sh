#!/bin/bash

echo "🎯 Monitoring seed completion..."
echo "Press Ctrl+C to stop monitoring"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

LAST_COUNT=0
SAME_COUNT=0

while true; do
  # Check if process is running
  if ! ps aux | grep -q "[s]cripts/seed-all-questions.ts"; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "⚠️  Process stopped! Checking final status..."
    break
  fi
  
  # Get current progress
  CURRENT=$(grep "Processed.*questions" seed-continue.log 2>/dev/null | tail -1 | grep -o '[0-9]\+' | head -1)
  
  if [ -n "$CURRENT" ]; then
    if [ "$CURRENT" != "$LAST_COUNT" ]; then
      PERCENT=$((CURRENT * 100 / 2816))
      REMAINING=$((2816 - CURRENT))
      echo "[$(date '+%H:%M:%S')] Progress: $CURRENT / 2,816 ($PERCENT%) - $REMAINING remaining"
      LAST_COUNT=$CURRENT
      SAME_COUNT=0
      
      # Check if we're at or past the target
      if [ "$CURRENT" -ge 2816 ]; then
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "🎉 TARGET REACHED! 🎉"
        break
      fi
    else
      SAME_COUNT=$((SAME_COUNT + 1))
      
      # If no change for 10 checks (100 seconds), might be done
      if [ $SAME_COUNT -ge 10 ]; then
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "⏸️  No progress for 100s - checking completion..."
        break
      fi
    fi
  fi
  
  sleep 10
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 FINAL STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for completion message in log
if grep -q "Total questions in database: 2816" seed-continue.log 2>/dev/null; then
  echo "✅ SUCCESS! Seed log shows 2,816 questions!"
elif grep -q "Success:.*2816" seed-continue.log 2>/dev/null; then
  echo "✅ SUCCESS! Seed completed with 2,816 questions!"
else
  LAST=$(grep "Processed" seed-continue.log 2>/dev/null | tail -1)
  if [ -n "$LAST" ]; then
    echo "📝 Last log entry: $LAST"
  fi
  
  # Check if there's a summary
  if grep -q "Success:" seed-continue.log 2>/dev/null; then
    echo ""
    echo "Summary from log:"
    grep -E "Success:|Errors:|Skipped:|Total questions" seed-continue.log | tail -10
  fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ MONITORING COMPLETE"
echo ""
echo "Next steps:"
echo "1. Verify database count with production check"
echo "2. Test Vercel deployment"
echo "3. Continue with Quiz Arena Phase 4 (real-time features)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
