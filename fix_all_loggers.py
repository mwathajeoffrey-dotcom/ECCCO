#!/usr/bin/env python3
import re
import os
import glob

def fix_logger_calls(content):
    """Fix all logger calls to match TypeScript signatures"""
    
    # Pattern 1: logger.error("msg:", error) -> logger.error("msg", error instanceof Error ? error : new Error(String(error)))
    content = re.sub(
        r'logger\.error\((["\'])(.*?):\1,\s*(\w+)\)',
        r'logger.error(\1\2\1, \3 instanceof Error ? \3 : new Error(String(\3)))',
        content
    )
    
    # Pattern 2: logger.debug("msg:", value) -> logger.debug("msg", { value })
    content = re.sub(
        r'logger\.debug\((["\'])(.*?):\1,\s*([a-zA-Z_][\w.]*)\)',
        r'logger.debug(\1\2\1, { value: \3 })',
        content
    )
    
    # Pattern 2b: logger.info/warn with colon pattern
    content = re.sub(
        r'logger\.(info|warn)\((["\'])(.*?):\2,\s*([a-zA-Z_][\w.]*)\)',
        r'logger.\1(\2\3\2, { value: \4 })',
        content
    )
    
    # Pattern 3: logger.debug("msg", value1, "msg2", value2) -> logger.debug("msg msg2", { value1, value2 })
    # This one is complex, skip for now
    
    # Pattern 4: logger.debug('AUDIT:', JSON.stringify(x)) -> logger.debug('AUDIT', x)
    content = re.sub(
        r'logger\.debug\((["\'])(.*?):\1,\s*JSON\.stringify\((.*?)\)\)',
        r'logger.debug(\1\2\1, \3)',
        content
    )
    
    return content

def process_file(filepath):
    """Process a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = fix_logger_calls(content)
        
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Fixed: {filepath}")
            return True
        return False
    except Exception as e:
        print(f"✗ Error processing {filepath}: {e}")
        return False

def main():
    """Process all TypeScript files"""
    patterns = ['src/**/*.ts', 'src/**/*.tsx']
    files = []
    
    for pattern in patterns:
        files.extend(glob.glob(pattern, recursive=True))
    
    print(f"Found {len(files)} files to process...")
    fixed_count = 0
    
    for filepath in files:
        if process_file(filepath):
            fixed_count += 1
    
    print(f"\nCompleted! Fixed {fixed_count} files.")

if __name__ == '__main__':
    main()
