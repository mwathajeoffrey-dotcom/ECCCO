#!/bin/bash

# Update all practice category pages to support:
# 1. Show answers immediately setting from localStorage
# 2. questionId query parameter from bookmarks

CATEGORIES=("pals" "obgyn" "cardiology" "emergency" "internal-medicine" "pediatrics" "surgery")

for category in "${CATEGORIES[@]}"; do
  PAGE_FILE="src/app/practice/${category}/page.tsx"

  if [ -f "$PAGE_FILE" ]; then
    echo "Updating $PAGE_FILE..."

    # Backup
    cp "$PAGE_FILE" "$PAGE_FILE.bak"

    # Update imports to include useSearchParams
    sed -i '' "s/import { useRouter } from 'next\/navigation';/import { useRouter, useSearchParams } from 'next\/navigation';/" "$PAGE_FILE"

    # Add searchParams and questionIdParam after router
    sed -i '' "/const router = useRouter();/a\\
  const searchParams = useSearchParams();\\
  const questionIdParam = searchParams.get('questionId');\\
" "$PAGE_FILE"

    # Add showAnswersImmediately state
    sed -i '' "/const \[isLoading, setIsLoading\] = useState(true);/a\\
  const [showAnswersImmediately, setShowAnswersImmediately] = useState(true);\\
" "$PAGE_FILE"

    echo "✓ Updated $PAGE_FILE"
  fi
done

echo ""
echo "Done! All practice pages updated."
