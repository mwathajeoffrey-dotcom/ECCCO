#!/bin/bash

# Fix dark mode text visibility in Quiz Arena files
files=(
  "src/app/quiz-arena/play/[accessCode]/page.tsx"
  "src/app/quiz-arena/host/[sessionId]/page.tsx"
  "src/app/quiz-arena/join/page.tsx"
  "src/app/quiz-arena/create/page.tsx"
  "src/app/quiz-arena/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    
    # Fix text-gray-900 to be visible in dark mode
    sed -i '' 's/text-gray-900\([^"]*\)/text-gray-900 dark:text-white\1/g' "$file"
    
    # Fix text-gray-600 to be visible in dark mode
    sed -i '' 's/text-gray-600\([^"]*\)/text-gray-600 dark:text-gray-300\1/g' "$file"
    
    # Fix text-gray-700 to be visible in dark mode
    sed -i '' 's/text-gray-700\([^"]*\)/text-gray-700 dark:text-gray-300\1/g' "$file"
    
    # Fix bg-white to be dark in dark mode (for cards and panels)
    sed -i '' 's/bg-white rounded/bg-white dark:bg-gray-800 rounded/g' "$file"
    sed -i '' 's/bg-white"/bg-white dark:bg-gray-800"/g' "$file"
    
    # Fix borders for dark mode
    sed -i '' 's/border-gray-200\([^"]*\)/border-gray-200 dark:border-gray-700\1/g' "$file"
    sed -i '' 's/border-gray-300\([^"]*\)/border-gray-300 dark:border-gray-600\1/g' "$file"
    
    echo "✓ Fixed $file"
  fi
done

echo "Dark mode fixes applied to all Quiz Arena pages!"
