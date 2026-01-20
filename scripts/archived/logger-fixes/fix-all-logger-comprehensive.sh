#!/bin/bash

echo "Fixing all logger.error calls with error parameters..."
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec perl -i -pe '
  s/logger\.error\((.*?),\s*(error|err|e|dbError|syncError|validationError|parseError)\)/logger.error($1, $2 instanceof Error ? $2 : new Error(String($2)))/g
' {} \;

echo "Fixing logger.debug calls with string values (pattern: logger.debug('msg:', value))..."
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec perl -i -pe '
  s/logger\.debug\((.*?):\x27,\s*([a-zA-Z0-9_]+)\)/logger.debug($1\x27, { value: $2 })/g;
  s/logger\.debug\((.*?):",\s*([a-zA-Z0-9_]+)\)/logger.debug($1", { value: $2 })/g;
' {} \;

echo "Fixing logger.debug calls with JSON.stringify..."
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec perl -i -pe '
  s/logger\.debug\((.*?),\s*JSON\.stringify\((.*?)\)\)/logger.debug($1, { data: JSON.parse(JSON.stringify($2)) })/g
' {} \;

echo "All logger issues should now be fixed!"
