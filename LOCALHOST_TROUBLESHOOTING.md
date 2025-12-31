# 🔧 Localhost Server Troubleshooting Guide

## ❗ Issue: Localhost Keeps Stopping

**Date:** December 31, 2025  
**Status:** SOLVED ✅

---

## 🐛 Common Causes

### 1. **Port Conflict**
Another process is using port 3001

### 2. **Terminal Window Closed**
If you close the terminal, the server stops

### 3. **Ctrl+C Pressed**
Accidentally stopping the server

### 4. **Memory Issues**
System running low on resources

### 5. **File Changes Breaking Build**
Syntax errors causing server crash

---

## ✅ Quick Fix Solutions

### Solution 1: Use the Restart Script (Easiest!)

I've created a restart script for you:

```bash
cd /Users/apple/ECCCO
./restart-server.sh
```

This script will:
- ✅ Kill any existing process on port 3001
- ✅ Start the development server
- ✅ Keep running until you stop it

---

### Solution 2: Manual Restart

**Step 1: Kill existing process**
```bash
lsof -ti:3001 | xargs kill -9 2>/dev/null
```

**Step 2: Start server**
```bash
cd /Users/apple/ECCCO
npm run dev -- -p 3001
```

**Step 3: Keep terminal open!**
- Don't close the terminal window
- Don't press Ctrl+C

---

### Solution 3: Run in Background (Persistent)

**Option A: Using nohup**
```bash
cd /Users/apple/ECCCO
nohup npm run dev -- -p 3001 > server.log 2>&1 &
echo $! > server.pid
```

**To stop later:**
```bash
kill $(cat server.pid)
rm server.pid
```

**Option B: Using screen (Best for long sessions)**
```bash
screen -S eccco-dev
cd /Users/apple/ECCCO
npm run dev -- -p 3001
# Press Ctrl+A, then D to detach
```

**To reattach:**
```bash
screen -r eccco-dev
```

**To list screens:**
```bash
screen -ls
```

---

## 🔍 Diagnostic Commands

### Check if server is running
```bash
lsof -i :3001
```

**Expected output:**
```
COMMAND   PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node    12345 apple   23u  IPv4 0x...      0t0  TCP *:3001 (LISTEN)
```

**If nothing shows:** Server is not running

---

### Check server logs
```bash
# If running in foreground: Look at terminal output
# If using nohup: 
tail -f /Users/apple/ECCCO/server.log

# If using screen:
screen -r eccco-dev  # Then view output
```

---

### Check for errors
```bash
cd /Users/apple/ECCCO
npm run build
```

If build fails, fix TypeScript/syntax errors first.

---

### Check memory usage
```bash
top -l 1 | grep "PhysMem"
```

If < 500MB free, restart your Mac or close some apps.

---

## 🎯 Best Practices

### 1. **Use a Dedicated Terminal**
- Open a terminal window ONLY for the dev server
- Don't close it
- Label it "ECCCO Server" in terminal preferences

### 2. **Use VS Code Integrated Terminal**
- Open VS Code
- Terminal → New Terminal
- Run: `npm run dev -- -p 3001`
- Keep VS Code open = Server stays running

### 3. **Use tmux or screen**
- Server persists even if terminal closes
- Can detach/reattach anytime
- Best for long development sessions

---

## 🚨 Emergency Server Recovery

### Server won't start?

**Check 1: Port is free**
```bash
lsof -ti:3001 | xargs kill -9
```

**Check 2: Dependencies installed**
```bash
cd /Users/apple/ECCCO
npm install
```

**Check 3: No syntax errors**
```bash
npm run build
```

**Check 4: Environment variables**
```bash
ls -la /Users/apple/ECCCO/.env*
```

Make sure `.env.local` exists.

---

### Server crashes immediately?

**Check 1: View error message**
Look at the terminal output right before crash

**Common errors:**
- `EADDRINUSE`: Port already in use → Run `lsof -ti:3001 | xargs kill -9`
- `Module not found`: Run `npm install`
- `TypeScript error`: Fix the error in your code
- `Out of memory`: Restart your Mac

**Check 2: Clear cache**
```bash
cd /Users/apple/ECCCO
rm -rf .next
npm run dev -- -p 3001
```

---

## 📋 Server Status Checklist

Before assuming server is broken, verify:

- [ ] Terminal window is still open
- [ ] You didn't press Ctrl+C
- [ ] Port 3001 is not used by another app
- [ ] No TypeScript errors in code
- [ ] Dependencies are installed (`node_modules` exists)
- [ ] `.env.local` file exists
- [ ] Mac has enough free memory (>500MB)

---

## 🎯 Current Server Status

**Right now, your server IS running!** ✅

```
✅ Local:   http://localhost:3001
✅ Network: http://10.73.109.108:3001
✅ Status:  Ready
```

**To verify:**
1. Open http://localhost:3001 in your browser
2. You should see the ECCCO homepage

**If it's not working:**
1. Check the terminal where I started it (ID: 6f2f9086-fbf9-430b-8150-631ead4e35be)
2. Look for error messages
3. Run `./restart-server.sh` to restart

---

## 💡 Pro Tips

### Tip 1: Auto-Restart on Crash
Create a watch script:

```bash
# watch-server.sh
while true; do
  npm run dev -- -p 3001
  echo "Server crashed! Restarting in 3 seconds..."
  sleep 3
done
```

### Tip 2: Desktop Notification
Add to your `.zshrc`:

```bash
alias start-eccco="cd /Users/apple/ECCCO && osascript -e 'display notification \"ECCCO server starting on port 3001\" with title \"Development Server\"' && npm run dev -- -p 3001"
```

Then just run:
```bash
start-eccco
```

### Tip 3: VS Code Task
Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Dev Server",
      "type": "npm",
      "script": "dev",
      "args": ["--", "-p", "3001"],
      "isBackground": true,
      "problemMatcher": []
    }
  ]
}
```

Then: Terminal → Run Task → Start Dev Server

---

## 📞 Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│  ECCCO Development Server Quick Reference       │
├─────────────────────────────────────────────────┤
│  Start:    ./restart-server.sh                  │
│  URL:      http://localhost:3001                │
│  Stop:     Ctrl+C (in terminal)                 │
│  Kill:     lsof -ti:3001 | xargs kill -9        │
│  Logs:     Look at terminal output              │
│  Reset:    rm -rf .next && npm run dev          │
└─────────────────────────────────────────────────┘
```

---

## 🎉 Summary

**Your server is currently running!** ✅

If it stops in the future:
1. **Easiest:** Run `./restart-server.sh`
2. **Manual:** `lsof -ti:3001 | xargs kill -9 && npm run dev -- -p 3001`
3. **Persistent:** Use `screen` or `tmux`

**Keep the terminal window open** and it will stay running! 🚀

---

*Last Updated: December 31, 2025*  
*Server Running on Port 3001* ✅
