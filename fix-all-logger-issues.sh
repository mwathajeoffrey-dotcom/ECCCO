#!/bin/bash

# Fix privacy/route.ts
FILE="src/app/api/privacy/route.ts"
perl -i -pe 's/logger\.debug\(\x27\[Privacy API\] Consent recorded:\x27, consentRecord\)/logger.debug(\x27[Privacy API] Consent recorded\x27, { consentRecord })/g' "$FILE"
perl -i -pe 's/logger\.debug\(\x27\[Privacy API\] Audit event:\x27, auditEvent\)/logger.debug(\x27[Privacy API] Audit event\x27, { auditEvent })/g' "$FILE"
perl -i -pe 's/logger\.debug\(\x27\[Privacy API\] Audit event logged:\x27, auditEvent\)/logger.debug(\x27[Privacy API] Audit event logged\x27, { auditEvent })/g' "$FILE"

# Fix ratings/route.ts
FILE="src/app/api/ratings/route.ts"
perl -i -pe 's/logger\.debug\("⭐ Created\/Updated rating:", rating\)/logger.debug("⭐ Created\/Updated rating", { rating })/g' "$FILE"

echo "Fixed all remaining logger issues"
