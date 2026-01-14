#!/bin/bash

# Fix sidebar dark mode for all navigation links

FILE="src/components/navigation/Sidebar.tsx"

# Backup
cp "$FILE" "$FILE.bak"

# Admin purple links
sed -i '' 's/text-purple-700 hover:bg-purple-50 hover:text-purple-900/text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900\/30 hover:text-purple-900 dark:hover:text-purple-300/g' "$FILE"

# Purple active states for admin
sed -i '' 's/bg-purple-50 text-purple-700 font-semibold shadow-sm/bg-purple-50 dark:bg-purple-900\/30 text-purple-700 dark:text-purple-400 font-semibold shadow-sm/g' "$FILE"

# Section headers (gray hover)
sed -i '' 's/text-gray-700 hover:bg-gray-50 transition-all/text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all/g' "$FILE"

# Regular navigation links (not yet updated)
sed -i '' 's/"bg-blue-50 text-blue-700 font-semibold shadow-sm"/"bg-blue-50 dark:bg-blue-900\/30 text-blue-700 dark:text-blue-400 font-semibold shadow-sm"/g' "$FILE"

sed -i '' 's/"text-gray-700 hover:bg-gray-50 hover:text-gray-900"/"text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"/g' "$FILE"

# Sub-navigation items
sed -i '' 's/"bg-blue-50 text-blue-700 font-medium shadow-sm"/"bg-blue-50 dark:bg-blue-900\/30 text-blue-700 dark:text-blue-400 font-medium shadow-sm"/g' "$FILE"

# Footer text
sed -i '' 's/text-gray-500 text-center/text-gray-500 dark:text-gray-400 text-center/g' "$FILE"

sed -i '' 's/font-semibold text-gray-700 mb-1/font-semibold text-gray-700 dark:text-gray-300 mb-1/g' "$FILE"

# Border dividers
sed -i '' 's/border-t border-gray-200 my-2/border-t border-gray-200 dark:border-gray-700 my-2/g' "$FILE"

sed -i '' 's/border-t border-gray-200 mt-auto/border-t border-gray-200 dark:border-gray-700 mt-auto/g' "$FILE"

echo "✓ Dark mode classes added to all Sidebar navigation links!"
