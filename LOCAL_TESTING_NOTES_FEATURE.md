# 🧪 LOCAL TESTING PLAN - Clinical Notes Feature

**Date:** January 24, 2026
**Objective:** Test notes feature locally BEFORE deploying to Vercel

---

## 📋 PRE-DEPLOYMENT TESTING CHECKLIST

### ✅ Step 1: Development Server Running

- [x] Start dev server: `npm run dev`
- [x] Server running at: http://localhost:3000
- [ ] No console errors on startup

### ✅ Step 2: Test Evidence Search Page

1. [ ] Visit: http://localhost:3000/evidence-search
2. [ ] Page loads without errors
3. [ ] "📝 Take Notes" button is visible
4. [ ] Click the button - modal opens
5. [ ] Modal shows:
   - Title field (pre-filled with search query)
   - Content textarea
   - Tags input
   - Specialty input (optional)
   - Patient Context input (optional)
   - "Save Note" button

### ✅ Step 3: Test Note Creation (Local)

1. [ ] Fill in note content: "Test note from local development"
2. [ ] Add tag: "test"
3. [ ] Add specialty: "Emergency Medicine"
4. [ ] Click "Save Note"
5. [ ] Check browser console (F12):
   - [ ] No CSP errors
   - [ ] No authentication errors
   - [ ] Success message appears
6. [ ] Modal closes after save

### ✅ Step 4: Verify Note Saved

1. [ ] Navigate to: http://localhost:3000/clinical-notes
2. [ ] Page loads without errors
3. [ ] Saved note appears in the list
4. [ ] Note shows correct:
   - Title
   - Content
   - Tags
   - Specialty
   - Timestamp

### ✅ Step 5: Test Note Editing

1. [ ] Click on the saved note
2. [ ] Edit modal opens
3. [ ] Change content
4. [ ] Click "Update Note"
5. [ ] Changes saved successfully
6. [ ] Updated note appears in list

### ✅ Step 6: Test Note Deletion

1. [ ] Click delete on test note
2. [ ] Confirmation appears
3. [ ] Confirm deletion
4. [ ] Note removed from list

---

## 🔍 WHAT TO CHECK IN CONSOLE

**Good signs (✅):**

```
✅ No CSP errors
✅ POST /api/notes → 201 Created
✅ GET /api/notes → 200 OK
✅ Clerk authentication working
✅ Database queries successful
```

**Bad signs (❌):**

```
❌ CSP violation errors
❌ POST /api/notes → 500 Internal Server Error
❌ POST /api/notes → 401 Unauthorized
❌ Prisma errors
❌ Database connection errors
```

---

## 🐛 COMMON ISSUES & FIXES

### Issue: 401 Unauthorized

**Cause:** Not logged in
**Fix:**

- Check if Clerk authentication is working
- Development mode should auto-create test user
- Check `.env.local` has `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

### Issue: 500 Internal Server Error

**Cause:** Database or API error
**Fix:**

- Check terminal for error logs
- Verify database connection
- Check Prisma schema matches database

### Issue: Note doesn't appear

**Cause:** Database query issue
**Fix:**

- Check user ID is correct
- Verify note was actually saved
- Check console for errors

---

## 🚀 ONLY DEPLOY IF ALL TESTS PASS

**DO NOT deploy to Vercel until:**

- ✅ All steps above pass locally
- ✅ No console errors
- ✅ Notes save successfully
- ✅ Notes appear in Clinical Notes tab
- ✅ Edit and delete work

---

## 📝 TESTING SCRIPT

Run this in browser console on http://localhost:3000/evidence-search:

\`\`\`javascript
// Test API endpoint directly
async function testNotesAPI() {
console.log('🧪 Testing /api/notes endpoint...');

const testNote = {
title: 'Local Test Note',
content: 'This is a test from the browser console',
tags: ['test', 'local'],
searchQuery: 'sepsis',
specialty: 'Emergency Medicine'
};

try {
const response = await fetch('/api/notes', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(testNote)
});

    const data = await response.json();

    if (response.ok) {
      console.log('✅ SUCCESS!', data);
      console.log('Note ID:', data.id);
      return data;
    } else {
      console.error('❌ FAILED!', data);
      return null;
    }

} catch (error) {
console.error('❌ ERROR:', error);
return null;
}
}

// Run the test
testNotesAPI();
\`\`\`

---

## ✅ DEPLOYMENT DECISION

**IF all local tests pass:**

```bash
git add .
git commit -m "test: Verified clinical notes feature works locally"
git push origin main
# Vercel will auto-deploy
```

**IF any test fails:**

1. ❌ **DO NOT DEPLOY**
2. Fix the issue locally
3. Test again
4. Only deploy when all tests pass

---

## 🎯 SUCCESS CRITERIA

The feature is **ready for deployment** when:

1. ✅ No console errors in development
2. ✅ Notes save successfully (201 Created)
3. ✅ Notes appear in Clinical Notes tab
4. ✅ Edit works correctly
5. ✅ Delete works correctly
6. ✅ No database errors
7. ✅ No authentication errors

---

## 📊 CURRENT STATUS

- [x] Dev server started
- [ ] Evidence Search page tested
- [ ] Note creation tested
- [ ] Note appears in Clinical Notes
- [ ] Edit tested
- [ ] Delete tested
- [ ] **READY FOR DEPLOYMENT:** ⏳ Pending tests

---

**Next Steps:**

1. Open http://localhost:3000/evidence-search in browser
2. Follow the checklist above
3. Only deploy if ALL tests pass
4. Document any issues found

---

_Created: January 24, 2026_
_Test this BEFORE deploying to production!_
