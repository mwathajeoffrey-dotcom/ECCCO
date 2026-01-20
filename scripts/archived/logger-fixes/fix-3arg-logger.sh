#!/bin/bash

# Fix QuestionSearch.tsx line 57
perl -i -pe "s/logger\.debug\('📚 Extracted topics:', topics\.length, topics\)/logger.debug('📚 Extracted topics', { count: topics.length, topics })/g" src/components/navigation/QuestionSearch.tsx

# Fix analytics service line 11
perl -i -pe "s/logger\.debug\('📊 Analytics:', event, properties\)/logger.debug('📊 Analytics', { event, properties })/g" src/lib/analytics/service.ts

echo "Fixed 3-argument logger calls"
