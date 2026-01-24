-- Direct SQL to insert the 4 Clerk users into the database
-- Run this in Supabase SQL editor: https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer/sql

-- Insert the 4 users (will skip if they already exist due to unique constraints)
INSERT INTO "User" (id, "clerkUserId", email, "createdAt", "updatedAt")
VALUES 
  ('user_sync_1', 'user_38h8JFtkVdyi8TPrzVvp5wrlE6S', 'ecccomedical@gmail.com', NOW(), NOW()),
  ('user_sync_2', 'user_371H3N8bQ5kWMu1ExtSo5nf48AV', 'mwathajeoffrey@gmail.com', NOW(), NOW()),
  ('user_sync_3', 'user_37bCovuDEScNyzg6A9wSJ5vAsRv', 'mwangijeoffrey@gmail.com', NOW(), NOW()),
  ('user_sync_4', 'user_38gz7Cb4twPyDHC8HDPOzxgGiMT', 'ogerofrancisca@gmail.com', NOW(), NOW())
ON CONFLICT ("clerkUserId") DO UPDATE 
SET 
  email = EXCLUDED.email,
  "updatedAt" = NOW();

-- Check the results
SELECT id, "clerkUserId", email, "createdAt" FROM "User" ORDER BY "createdAt" DESC;
