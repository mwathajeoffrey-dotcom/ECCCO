#!/usr/bin/env python3

import os
import sys

files = [
    "src/app/error.tsx",
    "src/app/evidence/page.tsx",
    "src/app/global-error.tsx",
    "src/app/guidelines-search/page.tsx",
    "src/app/learning-analytics/page.tsx",
    "src/app/modules/page.tsx",
    "src/components/navigation/QuestionSearch.tsx",
    "src/components/ui/EnhancedErrorBoundary.tsx",
    "src/components/ui/ErrorBoundary.tsx",
    "src/components/ui/PWAInstallPrompt.tsx",
]

for filepath in files:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    # Find logger import line
    logger_idx = None
    use_client_idx = None
    
    for i, line in enumerate(lines[:10]):  # Check first 10 lines
        if 'import' in line and 'logger' in line:
            logger_idx = i
        if "'use client'" in line or '"use client"' in line:
            use_client_idx = i
    
    # If logger import is before use client or use client doesn't exist
    if logger_idx is not None:
        # Remove logger import
        logger_line = lines.pop(logger_idx)
        
        # If use client exists and is after logger (now one line earlier)
        if use_client_idx is not None and use_client_idx > logger_idx:
            use_client_idx -= 1
        
        # Remove use client if it exists
        if use_client_idx is not None:
            lines.pop(use_client_idx)
        
        # Add use client and logger import at the top
        lines.insert(0, "'use client';\n\n")
        lines.insert(1, logger_line)
        
        # Remove extra blank lines at the start
        while len(lines) > 2 and lines[2].strip() == '' and lines[3].strip() == '':
            lines.pop(3)
        
        with open(filepath, 'w') as f:
            f.writelines(lines)
        
        print(f"✓ Fixed {filepath}")

print("\n✅ All files fixed!")
