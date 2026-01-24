#!/usr/bin/env node

/**
 * Fix "use client" directive placement
 * Moves "use client" to the first line if logger import comes before it
 */

const fs = require("fs");
const { execSync } = require("child_process");

console.log('🔧 Fixing "use client" directive placement...\n');

// Find files with both logger import and "use client"
const files = execSync(
  'find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "import.*logger" | xargs grep -l \'"use client"\'',
  { encoding: "utf-8" }
)
  .trim()
  .split("\n")
  .filter(Boolean);

let fixedCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");

  // Find the "use client" line
  const useClientIndex = lines.findIndex((line) => line.trim() === '"use client";' || line.trim() === "'use client';");

  if (useClientIndex === -1 || useClientIndex === 0) {
    continue; // Already at top or not found
  }

  // Find logger import line
  const loggerImportIndex = lines.findIndex((line) => line.includes("import") && line.includes("logger"));

  // If logger import is before "use client", fix it
  if (loggerImportIndex !== -1 && loggerImportIndex < useClientIndex) {
    console.log(`  Fixing: ${file}`);

    // Extract the logger import line
    const loggerImport = lines[loggerImportIndex];

    // Remove logger import from its current position
    lines.splice(loggerImportIndex, 1);

    // Adjust useClientIndex since we removed a line
    const newUseClientIndex = useClientIndex - 1;

    // Extract "use client" directive
    const useClientLine = lines[newUseClientIndex];

    // Remove "use client" from its current position
    lines.splice(newUseClientIndex, 1);

    // Insert "use client" at the top
    lines.unshift(useClientLine);

    // Insert logger import after "use client" (skip empty line if exists)
    let insertIndex = 1;
    if (lines[1] && lines[1].trim() === "") {
      insertIndex = 2;
    }
    lines.splice(insertIndex, 0, loggerImport);

    // Write back to file
    fs.writeFileSync(file, lines.join("\n"), "utf-8");
    fixedCount++;
  }
}

console.log(`\n✅ Fixed ${fixedCount} file(s)!\n`);
