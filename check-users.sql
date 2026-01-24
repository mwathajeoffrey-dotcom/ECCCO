-- Check current users in database
SELECT 
  id,
  "clerkUserId",
  email,
  "createdAt",
  "updatedAt"
FROM "User"
ORDER BY "createdAt" DESC;
