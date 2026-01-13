# ✅ TESTING CHECKLIST

## Pre-Test Setup

- [x] Server running on port 3000 ✅
- [ ] Browser 1 ready (main - you're signed in)
- [ ] Browser 2 ready (incognito or different browser)

---

## Test Flow

### 1. CREATE QUIZ (2 minutes)

- [ ] Go to http://localhost:3000/dashboard
- [ ] Click "Create Live Quiz" (purple button)
- [ ] Add 2 questions (use "Quick Add Random" twice)
- [ ] Click "Create Quiz Session"
- [ ] **Access Code:** **\*\*\*\***\_**\*\*\*\*** (write it here)

### 2. JOIN QUIZ (1 minute)

**Open incognito window:**

- [ ] Go to http://localhost:3000/quiz-arena/join
- [ ] Enter access code: **\*\***\_\_\_\_**\*\***
- [ ] Enter nickname: TestPlayer
- [ ] Click "Join Quiz"
- [ ] See lobby screen ✅

### 3. START QUIZ (30 seconds)

**Back to main browser:**

- [ ] See "TestPlayer" in participant list
- [ ] Click "Start Quiz" button
- [ ] Both windows show Question 1 ✅

### 4. QUESTION 1 (30 seconds)

**Incognito window:**

- [ ] Select an answer
- [ ] See feedback (✓ or ✗)
      **Main browser:**
- [ ] Click "Next Question"
- [ ] Both windows show Question 2 ✅

### 5. QUESTION 2 - LAST ONE (30 seconds)

**Incognito window:**

- [ ] Select an answer
- [ ] See feedback
      **Main browser:**
- [ ] Click "Next Question" (finishes quiz)

### 6. 🎯 THE CRITICAL TEST

**Incognito window - What do you see?**

**✅ SUCCESS - You should see:**

- [ ] 🏆 Trophy or medal emoji
- [ ] "Quiz Complete!" or "You Won!"
- [ ] Your score displayed
- [ ] Your rank (#1, #2, etc.)
- [ ] Final Rankings section
- [ ] "Play Again" button

**❌ FAILURE - If you see:**

- [ ] Blank white page
- [ ] "Loading question..." (stuck)
- [ ] Error message
- [ ] Nothing at all

---

## Quick Results

### It Worked! ✅

**Next steps:**

- Test with more questions
- Test with multiple participants
- Ready for production!

### It Failed ❌

**What I saw:**

---

---

**Console errors (F12):**

---

---

**Screenshot location:**

---

---

## Fast Debug Commands

```bash
# Check server is running
lsof -ti:3000

# If not running, start it
npm run dev

# Check for errors
# (Look in VS Code Problems panel or terminal)
```

---

## Browser Console Check

**If blank page appears, press F12 and paste:**

```javascript
fetch(
  "/api/quiz-arena/join/YOUR_CODE_HERE".replace(
    "YOUR_CODE_HERE",
    "PASTE_ACCESS_CODE"
  )
)
  .then((r) => r.json())
  .then(console.log);
```

**Should show:** `status: "FINISHED"`

---

**Start testing now! ⬆️ Follow checklist above ⬆️**

Time needed: ~5 minutes total
