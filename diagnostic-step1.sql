-- 🔍 STEP 1: DIAGNOSTIC - Run this FIRST in Supabase SQL Editor
-- This will show you exactly what's in your database

-- Check what tables exist
SELECT
    '=== YOUR DATABASE TABLES ===' as info;

SELECT
    schemaname,
    tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check if User table exists
SELECT
    '=== CHECKING USER TABLE ===' as info;

SELECT EXISTS (
    SELECT 1 FROM pg_tables
    WHERE schemaname = 'public' AND tablename = 'User'
) as user_table_exists;

-- Check if UserNote table exists
SELECT
    '=== CHECKING USERNOTE TABLE ===' as info;

SELECT EXISTS (
    SELECT 1 FROM pg_tables
    WHERE schemaname = 'public' AND tablename = 'UserNote'
) as usernote_table_exists;

-- Try to find the table with any casing
SELECT
    '=== SEARCHING FOR USERNOTE (ANY CASE) ===' as info;

SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND lower(tablename) LIKE '%usernote%'
OR lower(tablename) LIKE '%note%';

-- Show database connection info
SELECT
    '=== DATABASE INFO ===' as info;

SELECT
    current_database() as database,
    current_user as user,
    version() as postgres_version;
