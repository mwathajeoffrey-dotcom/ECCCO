# 🛡️ File Corruption Prevention Guide

**Last Updated:** January 3, 2026

---

## ✅ Protections Added

### 1. **VS Code Settings** (`.vscode/settings.json`)
Automatically:
- ✅ Auto-saves files (prevents loss)
- ✅ Removes trailing whitespace
- ✅ Ensures consistent line endings
- ✅ Formats code on save
- ✅ Hides docs folders from search
- ✅ Confirms git operations

### 2. **Git Pre-Commit Hook** (`.git/hooks/pre-commit`)
Blocks commits with:
- ❌ Corrupted file patterns (like "months ago i couldn't")
- ❌ Empty code files
- ❌ Text accidentally pasted at start of files
- ❌ Multiple imports on one line

### 3. **EditorConfig** (`.editorconfig`)
Enforces:
- ✅ UTF-8 encoding
- ✅ Unix line endings (LF)
- ✅ Consistent indentation (2 spaces)
- ✅ Final newline in files
- ✅ No trailing whitespace

---

## 🚫 Common Corruption Causes (Now Prevented!)

### **What Happened Before:**
1. Accidentally pasted LinkedIn text into Sidebar.tsx
2. File started with: `"3 months ago i couldn't write..."`
3. Corrupted the file syntax
4. Committed to git
5. Deployment failed

### **What Happens Now:**
1. If you accidentally paste text → **Pre-commit hook catches it** ❌
2. Commit is **blocked** with clear error message
3. You fix the file **before** it gets committed
4. No corrupted code reaches GitHub ✅

---

## 📝 Safe Workflow (Best Practices)

### **When Writing Notes/Emails:**
```bash
# ✅ DO THIS: Write in docs folder
code docs/outreach/my-notes.md

# ❌ DON'T: Edit code files
# Never paste text into .tsx or .ts files
```

### **When Editing Code:**
```bash
# 1. Open the correct file
code src/components/MyComponent.tsx

# 2. Edit ONLY code (not notes)

# 3. Save (auto-formats)

# 4. Check what changed
git diff

# 5. Commit (pre-commit hook runs)
git commit -m "fix: update component"
# ✅ If clean: commits
# ❌ If corrupted: blocks with error
```

---

## 🔍 How to Check Files Before Committing

### **Quick Check:**
```bash
# See what you're about to commit
git diff --cached

# Look for:
# ❌ Random text at top of files
# ❌ Duplicate imports
# ❌ Broken syntax
```

### **Build Check:**
```bash
# Always test build before committing
npm run build

# ✅ If successful: safe to commit
# ❌ If failed: fix errors first
```

---

## 🚨 If Pre-Commit Hook Blocks You

### **What You'll See:**
```
❌ ERROR: Detected potential file corruption pattern: 'months ago i couldn't'
   Please check your staged files for accidental text insertion.

❌ Commit blocked due to potential file corruption!
```

### **What to Do:**
```bash
# 1. See what files are staged
git status

# 2. Check the flagged file
git diff src/components/navigation/Sidebar.tsx

# 3. If corrupted, restore clean version
git restore src/components/navigation/Sidebar.tsx

# 4. Make changes correctly (edit only code)

# 5. Try committing again
git add .
git commit -m "your message"
# ✅ Should work now!
```

---

## 🛠️ Manual Corruption Check

If you want to manually check for corruption:

```bash
# Check for common patterns
grep -r "months ago i" src/

# Check for empty files
find src -type f -empty

# Check for duplicate 'use client'
grep -r "'use client';'use client'" src/
```

---

## 💡 Prevention Tips

### ✅ **DO:**
- Edit code in VS Code (auto-formats)
- Write notes in `docs/` folder
- Test build before committing
- Review `git diff` before committing
- Let pre-commit hook run (don't skip)

### ❌ **DON'T:**
- Paste LinkedIn/email text into code files
- Edit files on GitHub web interface
- Use `git commit --no-verify` (skips protection)
- Create backup files (.bak, .backup)
- Ignore pre-commit warnings

---

## 📊 Testing the Protection

Want to test if it works?

```bash
# Try to commit a corrupted file
echo "months ago i couldn't code" > test-corrupt.txt
git add test-corrupt.txt
git commit -m "test"

# ❌ Should be blocked by pre-commit hook!
# Clean up
git reset HEAD test-corrupt.txt
rm test-corrupt.txt
```

---

## 🔧 If You Need to Disable Protection (Emergency Only!)

```bash
# Skip pre-commit hook (NOT RECOMMENDED!)
git commit --no-verify -m "emergency commit"

# Or temporarily disable
mv .git/hooks/pre-commit .git/hooks/pre-commit.disabled

# Remember to re-enable!
mv .git/hooks/pre-commit.disabled .git/hooks/pre-commit
```

---

## 📋 Checklist Before Each Commit

- [ ] Files contain only code (no notes/emails)
- [ ] `npm run build` succeeds
- [ ] `git diff` looks correct
- [ ] No corruption warnings
- [ ] Pre-commit hook passed

---

## 🎯 Summary

**3 Layers of Protection:**
1. **VS Code** auto-formats and prevents common issues
2. **EditorConfig** enforces consistency
3. **Git hook** blocks corrupted commits

**Result:**
- ✅ Clean code always
- ✅ No corrupted files in git
- ✅ Deployments succeed
- ✅ Easy to maintain

---

**Your code is now protected! The corruption that happened before CAN'T happen again.** 🛡️
