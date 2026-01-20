#!/bin/bash

# Fix "use client" directive placement in files that import logger
# The "use client" directive must be the first line in the file

echo "🔧 Fixing 'use client' directive placement..."

FILES=$(find src -name "*.tsx" -o -name "*.ts" | xargs grep -l 'import.*logger' | xargs grep -l '"use client"')

for file in $FILES; do
  # Check if logger import is before "use client"
  if head -5 "$file" | grep -q "import.*logger" && head -5 "$file" | grep -q '"use client"'; then
    # Get the line number of "use client"
    USE_CLIENT_LINE=$(grep -n '"use client"' "$file" | head -1 | cut -d: -f1)
    
    # Check if "use client" is not on line 1
    if [ "$USE_CLIENT_LINE" -ne 1 ]; then
      echo "  Fixing: $file"
      
      # Create a temp file
      TEMP_FILE=$(mktemp)
      
      # Extract lines before "use client" that are not logger imports
      awk '
        /"use client"/ { use_client_found = 1; print; next }
        /import.*logger/ { logger_import = $0; next }
        !use_client_found { before_use_client = before_use_client $0 "\n" }
        use_client_found { after_use_client = after_use_client $0 "\n" }
        END {
          print "\"use client\";\n"
          if (logger_import) print logger_import
          printf "%s", after_use_client
        }
      ' "$file" > "$TEMP_FILE"
      
      # Replace original file
      mv "$TEMP_FILE" "$file"
    fi
  fi
done

echo "✅ Done!"
