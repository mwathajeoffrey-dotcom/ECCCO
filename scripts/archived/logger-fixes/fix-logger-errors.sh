#!/bin/bash

# Fix all logger.error calls to handle unknown error type

echo "🔧 Fixing logger.error calls..."

# Pattern 1: logger.error('message:', error)
# Pattern 2: logger.error('message', error)
# Replace with: logger.error('message', error instanceof Error ? error : new Error(String(error)))

find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Skip files that already have the fix
  if grep -q "logger\.error.*error instanceof Error" "$file" 2>/dev/null; then
    continue
  fi
  
  # Check if file has logger.error calls with error variable
  if grep -q "logger\.error.*error)" "$file" 2>/dev/null; then
    echo "  Fixing: $file"
    
    # Use perl for more complex regex replacement
    perl -i -pe 's/logger\.error\((.*?),\s*(error|err|e)\)/logger.error($1, $2 instanceof Error ? $2 : new Error(String($2)))/g' "$file"
  fi
done

echo "✅ Done!"
