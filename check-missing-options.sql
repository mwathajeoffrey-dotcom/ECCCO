-- Check which questions are missing options
SELECT
  id,
  LEFT(question, 100) as question_preview,
  CASE
    WHEN options IS NULL THEN 'NULL'
    WHEN options = '' THEN 'EMPTY'
    WHEN options = '[]' THEN 'EMPTY ARRAY'
    ELSE 'HAS DATA'
  END as options_status,
  LENGTH(options) as options_length
FROM "Question"
WHERE options IS NULL
   OR options = ''
   OR options = '[]'
   OR options NOT LIKE '[%'
ORDER BY "createdAt" DESC
LIMIT 50;

-- Count total questions with issues
SELECT
  COUNT(*) as total_questions,
  COUNT(CASE WHEN options IS NULL THEN 1 END) as null_options,
  COUNT(CASE WHEN options = '' THEN 1 END) as empty_options,
  COUNT(CASE WHEN options = '[]' THEN 1 END) as empty_array_options,
  COUNT(CASE WHEN options IS NOT NULL AND options != '' AND options != '[]' THEN 1 END) as valid_options
FROM "Question";
