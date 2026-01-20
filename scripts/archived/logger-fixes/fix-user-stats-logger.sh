#!/bin/bash

FILE="src/app/api/user/stats/route.ts"

# Fix all logger.debug calls with multiple arguments
perl -i -pe 's/logger\.debug\("\[Dashboard API\] Fetching exam sessions for user:", userId\)/logger.debug("[Dashboard API] Fetching exam sessions for user", { userId })/g' "$FILE"
perl -i -pe 's/logger\.debug\("\[Dashboard API\] Found", examSessions\.length, "exam sessions"\)/logger.debug("[Dashboard API] Found exam sessions", { count: examSessions.length })/g' "$FILE"
perl -i -pe 's/logger\.debug\("\[Dashboard API\] Found", topicIds\.length, "unique topics"\)/logger.debug("[Dashboard API] Found unique topics", { count: topicIds.length })/g' "$FILE"
perl -i -pe 's/logger\.debug\("\[Dashboard API\] Fetched", topics\.length, "topic records"\)/logger.debug("[Dashboard API] Fetched topic records", { count: topics.length })/g' "$FILE"

# Fix logger.error calls
perl -i -pe 's/logger\.error\("\[Dashboard API\] Database error fetching exam sessions:", dbError\)/logger.error("[Dashboard API] Database error fetching exam sessions", dbError instanceof Error ? dbError : new Error(String(dbError)))/g' "$FILE"
perl -i -pe 's/logger\.error\("\[Dashboard API\] Database error fetching topics:", dbError\)/logger.error("[Dashboard API] Database error fetching topics", dbError instanceof Error ? dbError : new Error(String(dbError)))/g' "$FILE"
perl -i -pe 's/logger\.error\("Failed to parse session questions:", e\)/logger.error("Failed to parse session questions", e instanceof Error ? e : new Error(String(e)))/g' "$FILE"
perl -i -pe 's/logger\.error\("Failed to parse session questions for topic:", e\)/logger.error("Failed to parse session questions for topic", e instanceof Error ? e : new Error(String(e)))/g' "$FILE"
perl -i -pe 's/logger\.error\("Error fetching user stats:", error\)/logger.error("Error fetching user stats", error instanceof Error ? error : new Error(String(error)))/g' "$FILE"
perl -i -pe 's/logger\.error\("Error stack:", error instanceof Error \? error\.stack : "No stack trace"\)/logger.debug("Error stack", { stack: error instanceof Error ? error.stack : "No stack trace" })/g' "$FILE"
perl -i -pe 's/logger\.error\("Error details:", JSON\.stringify\(error, null, 2\)\)/logger.debug("Error details", { details: JSON.stringify(error, null, 2) })/g' "$FILE"

echo "Fixed all logger calls in $FILE"
