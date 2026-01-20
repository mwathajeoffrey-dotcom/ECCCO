#!/bin/bash

# Fix src/app/evidence-search/page.tsx
perl -i -pe 's/logger\.error\("Failed to load search history:", e\)/logger.error("Failed to load search history", e instanceof Error ? e : new Error(String(e)))/g' src/app/evidence-search/page.tsx

# Fix src/lib/security.ts
perl -i -pe 's/logger\.debug\(\x27AUDIT:\x27, JSON\.stringify\(logEntry\)\)/logger.debug(\x27AUDIT\x27, logEntry)/g' src/lib/security.ts

echo "Fixed specific logger files"
