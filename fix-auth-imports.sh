#!/bin/bash

# Script to replace NextAuth imports with Clerk imports

echo "Fixing auth imports in API routes..."

# List of files to fix
files=(
  "src/app/api/user/stats/route.ts"
  "src/app/api/live-quiz/join/[accessCode]/route.ts"
  "src/app/api/live-quiz/sessions/route.ts"
  "src/app/api/live-quiz/session/[sessionId]/next/route.ts"
  "src/app/api/live-quiz/session/[sessionId]/start/route.ts"
  "src/app/api/live-quiz/session/[sessionId]/end/route.ts"
  "src/app/api/live-quiz/session/[sessionId]/route.ts"
  "src/app/api/exam/save/route.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Replace import statements
    sed -i '' "s|import { getServerSession } from 'next-auth';||g" "$file"
    sed -i '' "s|import { authOptions } from '@/lib/auth/next-auth';||g" "$file"
    sed -i '' "s|from '@/lib/auth/next-auth'|from '@clerk/nextjs/server'|g" "$file"
    
    # Add Clerk import if not present
    if ! grep -q "import { auth } from '@clerk/nextjs/server'" "$file"; then
      # Add after first import line
      sed -i '' "1a\\
import { auth } from '@clerk/nextjs/server';
" "$file"
    fi
    
    # Replace auth check pattern
    sed -i '' "s|const session = await getServerSession(authOptions);|const { userId } = await auth();|g" "$file"
    sed -i '' "s|if (!session?.user?.id)|if (!userId)|g" "$file"
    sed -i '' "s|if (!session?.user)|if (!userId)|g" "$file"
    sed -i '' "s|session.user.id|userId|g" "$file"
    sed -i '' "s|session.user.email|userId|g" "$file"
    
    echo "  ✓ Fixed $file"
  else
    echo "  ✗ File not found: $file"
  fi
done

echo ""
echo "✅ All files processed!"
echo "Please review the changes and test the build."
