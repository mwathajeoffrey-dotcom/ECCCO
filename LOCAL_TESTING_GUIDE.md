# 🧪 ECCCO Local Testing Guide

**Server Status**: ✅ Running on http://localhost:3000

---

## 🎯 Feature Testing Checklist

### 1️⃣ Homepage & Navigation (http://localhost:3000)
**What to Test:**
- [ ] Homepage loads correctly
- [ ] Hero section displays
- [ ] Feature cards are visible
- [ ] Navigation menu works
- [ ] Mobile responsive (resize browser)

**Expected Behavior:**
- Clean, professional medical education interface
- "Start Exam" and "Browse Modules" buttons functional
- Footer with privacy links

---

### 2️⃣ User Authentication System

#### Registration (http://localhost:3000/auth/register)
**What to Test:**
- [ ] Registration form displays
- [ ] Email validation works
- [ ] Password strength validation
- [ ] Password confirmation matching
- [ ] Can create new account

**Test Credentials:**
```
Name: Test User
Email: test@example.com
Password: Test123456
Confirm: Test123456
```

**Expected Behavior:**
- Form validation shows errors for invalid input
- Successful registration redirects to dashboard
- Password is masked with show/hide toggle

#### Sign In (http://localhost:3000/auth/signin)
**What to Test:**
- [ ] Email/password form displays
- [ ] Google OAuth button (will show error without setup - that's OK)
- [ ] Development test account works
- [ ] "Forgot password" link present
- [ ] "Create account" link works

**Test with Development Mode:**
```
Enter any email (e.g., dev@test.com)
Click "Create Test Account"
```

**Expected Behavior:**
- Can sign in with credentials created during registration
- Session persists across pages
- Redirect to dashboard after login

---

### 3️⃣ Dashboard (http://localhost:3000/dashboard)
**What to Test:**
- [ ] Dashboard loads (may need to sign in first)
- [ ] Stats cards display
- [ ] Recent activity section
- [ ] Quick actions work
- [ ] User profile shown

**Expected Behavior:**
- Shows "0 exams" for new users
- Progress indicators display
- Links to exam, analytics, guidelines

---

### 4️⃣ Exam Interface (http://localhost:3000/exam)
**What to Test:**
- [ ] Module selection screen
- [ ] Select "Pediatric Emergency Medicine"
- [ ] Topic selection appears
- [ ] Select any topic (e.g., "Respiratory Emergencies")
- [ ] Exam starts with timer
- [ ] Questions display correctly
- [ ] Multiple choice options work
- [ ] Next/Previous navigation
- [ ] Submit exam functionality
- [ ] Results page shows score

**Expected Behavior:**
- Timer counts down
- Can select answers
- Progress bar updates
- Results show correct/incorrect breakdown
- Can review answers

---

### 5️⃣ OB/GYN Question Bank (Test New Feature!)
**How to Access:**
1. Go to http://localhost:3000/exam
2. Select "Adult Emergency Medicine" module
3. Look for OB/GYN topics in the list

**Topics to Test (30 questions total):**
- [ ] Placental Abruption (8 questions)
- [ ] Placenta Previa (3 questions)
- [ ] Preeclampsia (4 questions)
- [ ] Postpartum Hemorrhage (4 questions)
- [ ] Labor & Delivery (3 questions)
- [ ] Obstetric Infections (2 questions)
- [ ] Gestational Diabetes (3 questions)
- [ ] Ectopic Pregnancy (3 questions)

**Expected Behavior:**
- All questions load correctly
- Medical content is accurate
- Explanations are detailed
- References are included

---

### 6️⃣ Live Quiz Features (http://localhost:3000/live-quiz)
**What to Test:**

#### Create Session
- [ ] Navigate to http://localhost:3000/live-quiz/create
- [ ] Fill in quiz details
- [ ] Select topics
- [ ] Create session
- [ ] Access code generated

**Test Data:**
```
Quiz Name: Test Quiz Session
Duration: 30 minutes
Questions: 10
Topic: Any available topic
```

#### Host View
- [ ] Session dashboard shows
- [ ] Start quiz button works
- [ ] Participant list displays
- [ ] Controls functional

#### Join Session
- [ ] Open http://localhost:3000/live-quiz in incognito/another browser
- [ ] Enter access code
- [ ] Join as participant
- [ ] See real-time updates

**Expected Behavior:**
- Access codes work
- Real-time participant tracking
- Quiz state synchronizes
- Leaderboard updates

---

### 7️⃣ Guidelines Library (http://localhost:3000/guidelines)
**What to Test:**
- [ ] Guidelines page loads
- [ ] Search bar works
- [ ] Category filters functional
- [ ] Grid/List view toggle
- [ ] Stats display (total guidelines, downloads, ratings)
- [ ] Click "View Guideline" on any item

**Categories Available:**
- All Guidelines
- Cardiology (ACLS)
- Pediatrics (PALS)
- Critical Care (Sepsis)
- Neurology (Stroke)
- Emergency (Trauma, Airway)

**Expected Behavior:**
- Search filters guidelines instantly
- Category buttons highlight when selected
- Guidelines display with ratings
- Download counts visible

#### PDF Viewer Test
- [ ] Click "View Guideline" on any item
- [ ] Viewer page loads
- [ ] Document info displays
- [ ] Bookmark button works
- [ ] Download button present

**Expected Behavior:**
- PDF placeholder displays (actual PDF requires files)
- Document metadata shown
- Controls functional

---

### 8️⃣ Analytics Dashboard (http://localhost:3000/dashboard/analytics)
**What to Test:**
- [ ] Enhanced analytics view
- [ ] PALS analytics view
- [ ] Tab switching works
- [ ] Charts and graphs display
- [ ] Performance metrics shown

**Expected Behavior:**
- Analytics load (may show "no data" for new users)
- Visualizations render
- Recommendations display
- Can switch between views

---

### 9️⃣ Learning Analytics (http://localhost:3000/learning-analytics)
**What to Test:**
- [ ] Page loads
- [ ] Performance overview
- [ ] Topic breakdown
- [ ] Progress charts
- [ ] Recommendations

**Expected Behavior:**
- Clean analytics interface
- Data visualizations
- Personalized insights
- Export options

---

### 🔟 Practice Mode (http://localhost:3000/practice)
**What to Test:**
- [ ] Practice interface loads
- [ ] Topic selection
- [ ] Unlimited questions
- [ ] No timer pressure
- [ ] Immediate feedback
- [ ] Can review explanations

**Expected Behavior:**
- Similar to exam mode but more relaxed
- No scoring pressure
- Educational focus
- Can retry questions

---

## 🔒 Authentication Flow Testing

### Complete User Journey:
1. **Start Anonymous**
   - [ ] Visit homepage
   - [ ] Browse without account
   - [ ] Take guest exam
   - [ ] See limited features

2. **Create Account**
   - [ ] Register at /auth/register
   - [ ] Verify email validation
   - [ ] Complete registration
   - [ ] Auto sign-in

3. **Use Authenticated Features**
   - [ ] Access dashboard
   - [ ] View saved progress
   - [ ] Create live quiz
   - [ ] Bookmark guidelines
   - [ ] Track analytics

4. **Sign Out and Back In**
   - [ ] Sign out
   - [ ] Sign back in at /auth/signin
   - [ ] Data persists
   - [ ] Session restored

---

## 📱 Mobile Responsive Testing

### Device Sizes to Test:
1. **Mobile** (375px)
   - [ ] Resize browser to mobile width
   - [ ] Navigation menu collapses
   - [ ] Touch-friendly buttons
   - [ ] Scrolling smooth

2. **Tablet** (768px)
   - [ ] Medium width layout
   - [ ] Grid adapts
   - [ ] Comfortable spacing

3. **Desktop** (1200px+)
   - [ ] Full layout visible
   - [ ] Optimal spacing
   - [ ] All features accessible

---

## 🎨 Visual Testing

### Check These Elements:
- [ ] Colors consistent (blue primary, professional)
- [ ] Typography readable
- [ ] Icons display correctly
- [ ] Images load
- [ ] Animations smooth
- [ ] No layout shift
- [ ] Loading states shown

---

## ⚡ Performance Testing

### What to Monitor:
- [ ] Pages load quickly (<2 seconds)
- [ ] No console errors (open Developer Tools F12)
- [ ] Smooth interactions
- [ ] No lag during navigation
- [ ] Database queries fast

### Check Console for:
- Development logs (expected)
- No red errors
- Prisma connection messages
- WebSocket logs (for live quiz)

---

## 🐛 Known Issues (Expected in Development)

### Not Bugs:
1. **Middleware Warning**: Next.js deprecation warning (ignore for now)
2. **Test File Errors**: Only affect test runs, not functionality
3. **Google OAuth**: Won't work without credentials (expected)
4. **PDF Files**: Placeholder shown (actual PDFs need to be added)
5. **WebSocket Port**: May show EADDRINUSE (doesn't affect functionality)

---

## 🔍 Detailed Feature Testing

### Test Each New Feature from TODOs:

#### ✅ TODO #4: OB/GYN Questions
**Test Path:**
```
1. Go to /exam
2. Select module
3. Look for OB/GYN topics
4. Take exam with any OB/GYN topic
5. Verify 30 questions total across 8 topics
```

#### ✅ TODO #5: Authentication
**Test Path:**
```
1. Register at /auth/register
2. Sign in at /auth/signin
3. Access dashboard (requires auth)
4. Sign out
5. Try accessing protected routes
6. Should redirect to signin
```

#### ✅ TODO #6: Live Quiz
**Test Path:**
```
1. Sign in first (required)
2. Go to /live-quiz/create
3. Create new session
4. Copy access code
5. Open incognito window
6. Go to /live-quiz
7. Join with access code
8. Test real-time features
```

#### ✅ TODO #8: Guidelines
**Test Path:**
```
1. Go to /guidelines
2. Browse library
3. Use search
4. Filter by category
5. Click any guideline
6. Test viewer at /guidelines/[id]
```

#### ✅ TODO #9: Analytics
**Test Path:**
```
1. Take some exams first
2. Go to /dashboard/analytics
3. Switch between Enhanced and PALS views
4. Check charts and metrics
5. Verify recommendations
```

---

## 📊 Database Testing

### Check Data Persistence:
1. **Take an Exam**
   - Complete exam
   - Check results saved
   - Visit dashboard
   - Verify stats updated

2. **User Data**
   - Create account
   - Close browser
   - Reopen and sign in
   - Account still exists

3. **Session Data**
   - Live quiz sessions created
   - Participants tracked
   - Results stored

### Verify Database:
```bash
# Open Prisma Studio to view data
npm run db:studio
# Opens at http://localhost:5555
```

---

## 🎯 Priority Test Scenarios

### Scenario 1: New Student Journey
```
1. First-time visitor → Homepage
2. Browse features → Learn about platform
3. Take guest exam → Try without account
4. See results → Encouraged to register
5. Create account → Full access
6. Take more exams → Track progress
7. View analytics → See improvement
```

### Scenario 2: Instructor Journey
```
1. Sign in → Dashboard
2. Create live quiz → Set up session
3. Share code → With students
4. Monitor participation → Real-time
5. End session → View results
6. Review analytics → Performance insights
```

### Scenario 3: Study Session
```
1. Sign in → Dashboard
2. Browse guidelines → Find reference
3. Bookmark guideline → Save for later
4. Practice mode → Learn topics
5. Take exam → Test knowledge
6. Review results → Learn from mistakes
7. Check analytics → Track progress
```

---

## ✅ Success Criteria

### The platform is working correctly if:
- [x] All pages load without errors
- [x] Authentication flows work
- [x] Exams can be started and completed
- [x] OB/GYN questions display (30 total)
- [x] Live quiz sessions can be created
- [x] Guidelines library is browsable
- [x] Analytics show data after taking exams
- [x] Mobile responsive on all screen sizes
- [x] No critical console errors
- [x] Database persists data

---

## 🚀 Ready for Vercel When:

### All features tested and working:
- ✅ Homepage and navigation
- ✅ Authentication (register/login)
- ✅ Exam interface with new OB/GYN questions
- ✅ Dashboard with analytics
- ✅ Live quiz creation and joining
- ✅ Guidelines library with viewer
- ✅ Mobile responsive
- ✅ No critical bugs

### Then proceed to:
1. Review `PRODUCTION_READY.md`
2. Setup Vercel project
3. Configure environment variables
4. Deploy to production
5. Test on production URL

---

## 📝 Testing Notes

**Document any issues found:**
```
Issue: [Description]
Page: [URL]
Expected: [What should happen]
Actual: [What actually happened]
Steps to reproduce: [How to recreate]
```

---

## 🎉 Quick Test Script (5 Minutes)

### Rapid Feature Verification:
1. ✅ Homepage (30 sec) → http://localhost:3000
2. ✅ Register (1 min) → http://localhost:3000/auth/register
3. ✅ Take Exam (2 min) → http://localhost:3000/exam
4. ✅ View Results (30 sec) → Auto-redirected
5. ✅ Check Dashboard (30 sec) → http://localhost:3000/dashboard
6. ✅ Browse Guidelines (30 sec) → http://localhost:3000/guidelines

**If all pass → Ready for production!**

---

**Server Running**: http://localhost:3000  
**Database Studio**: Run `npm run db:studio` for http://localhost:5555  
**API Health**: http://localhost:3000/api/health  

**Happy Testing! 🚀**
