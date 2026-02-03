# 📱 LOCAL TESTING GUIDE - Navigation System v2.0

**Status:** Dev server running at http://localhost:3000  
**Date:** February 3, 2026  
**What to Test:** New Hybrid Navigation System  

---

## 🚀 Quick Start

**Dev Server:** Running on http://localhost:3000  
**Ready to test:** YES ✅

---

## 📱 Mobile Testing (< 768px)

### How to Test on Desktop
1. Open DevTools (F12 or Cmd+Option+I)
2. Click device toolbar (phone icon)
3. Select mobile device (iPhone 12, Pixel 5, etc)
4. Viewport will be < 768px

### What to Look For

#### Bottom Navigation Tabs
- [ ] See 4 tabs at bottom of screen
  - 🏠 Home
  - 📚 Practice
  - 🎮 Quiz
  - 👤 Profile
- [ ] Tabs have icons
- [ ] Tabs have labels
- [ ] Active tab highlighted in blue
- [ ] Tabs stay visible while scrolling

#### Menu Drawer
- [ ] See "Menu" button in bottom nav
- [ ] Click/tap Menu → Drawer slides in from left
- [ ] Drawer has 7 sections:
  - 🚀 Quick Access
  - 📚 Practice & Exams
  - 🎮 Quiz Arena
  - 📊 Learning & Progress
  - 📚 Resources
  - ⚙️ Admin Tools (if admin)
  - 👤 Account
- [ ] Sections are collapsible (click to expand/collapse)
- [ ] Items have icons
- [ ] Items have descriptions
- [ ] Some items have badges (NEW, Featured, ⭐)

#### Interactions
- [ ] Click section header → expands/collapses
- [ ] Click item → navigates to page
- [ ] Page navigates smoothly
- [ ] Drawer auto-closes after selection
- [ ] Tap overlay (dark background) → closes drawer
- [ ] Scroll page → drawer closes (auto-hide)

---

## 🖥️ Desktop Testing (≥ 768px)

### How to Test on Desktop
1. Close DevTools device toolbar (or set to full width)
2. Resize browser to ≥ 768px wide
3. Or use desktop view

### What to Look For

#### Sidebar Visibility
- [ ] See sidebar on left side (320px wide)
- [ ] Sidebar shows ECCCO logo at top
- [ ] Sidebar is always visible (doesn't hide on scroll)
- [ ] 7 sections visible:
  - 🚀 Quick Access
  - 📚 Practice & Exams
  - 🎮 Quiz Arena
  - 📊 Learning & Progress
  - 📚 Resources
  - ⚙️ Admin Tools (if admin)
  - 👤 Account

#### Section Organization
- [ ] Each section has a header (emoji + title)
- [ ] Click section header → expands/collapses
- [ ] Chevron icon shows expand/collapse state
- [ ] Multiple sections can be open simultaneously

#### Menu Items
- [ ] Items show icon + label + description
- [ ] Descriptions are visible on desktop
- [ ] Some items have badges:
  - "Featured" (Evidence Search)
  - "NEW" (Clinical Notes, Create Quiz)
  - "⭐ PRIORITY" (User Management for admins)
- [ ] Active page is highlighted in blue

#### Interactions
- [ ] Click item → navigates to page
- [ ] Active state shows blue highlight
- [ ] Hover shows gray background
- [ ] Sidebar remains visible after navigation

---

## 🎨 Dark Mode Testing

### How to Test
1. Look for theme toggle (usually moon/sun icon)
2. Or check browser's dark mode preference
3. Toggle between light/dark

### What to Look For (Both Themes)
- [ ] Colors are visible and readable
- [ ] Text contrast is good
- [ ] Icons are visible
- [ ] Backgrounds are appropriate (light/dark)
- [ ] Navigation structure same in both themes
- [ ] Buttons and links work in both themes

---

## ⚙️ Admin Features Testing

### Admin Dashboard Access
- [ ] If logged in as admin, see Admin Tools section
- [ ] If not admin, Admin Tools section NOT visible
- [ ] User Management item has ⭐ PRIORITY badge
- [ ] User Management description: "Monitor & manage users"

### Admin Navigation
- [ ] Mobile: Menu → ⚙️ Admin Tools → 👥 User Management
- [ ] Desktop: Sidebar → ⚙️ Admin Tools → 👥 User Management
- [ ] Click User Management → navigates to /admin/users

---

## 🎯 Feature Navigation Testing

### Quick Access Features
- [ ] Evidence Search navigates to /evidence-search
- [ ] Dashboard navigates to /dashboard
- [ ] Clinical Notes navigates to /clinical-notes

### Practice & Exams
- [ ] All Questions → /practice
- [ ] Random Practice → /practice?mode=random
- [ ] ACLS Training → /practice/acls
- [ ] PALS Training → /practice/pals
- [ ] Full Timed Exam → /exam
- [ ] Custom Exam → /exam?mode=custom

### Quiz Arena
- [ ] Quiz Home → /quiz-arena
- [ ] Create Quiz → /quiz-arena/create
- [ ] Join Quiz → /quiz-arena/join

### Learning & Progress
- [ ] Analytics → /learning-analytics
- [ ] Bookmarks → /bookmarks
- [ ] My Notes → /notes

### Resources
- [ ] Guidelines → /guidelines
- [ ] Guidelines Search → /guidelines-search
- [ ] Emergency References → /emergency-references
- [ ] Flowcharts → /flowcharts

### Account
- [ ] Profile → /profile
- [ ] Settings → /settings
- [ ] Support → /support

---

## 🔄 Responsive Testing

### Breakpoint Transition (768px)
1. Open DevTools with device toolbar
2. Start with mobile width (< 768px)
   - [ ] See bottom tabs
   - [ ] See menu drawer
   - [ ] Sidebar NOT visible
3. Gradually resize to desktop (≥ 768px)
   - [ ] Tabs disappear
   - [ ] Sidebar appears
   - [ ] Content area expands
   - [ ] Transition is smooth (no jump)
4. Resize back to mobile
   - [ ] Sidebar disappears
   - [ ] Bottom tabs appear
   - [ ] Drawer functionality works
   - [ ] Transition is smooth

---

## ⚡ Performance Testing

### Load Time
- [ ] Page loads quickly on localhost
- [ ] Navigation items appear immediately
- [ ] No lag when clicking sections

### Animations
- [ ] Drawer slides smoothly (no stuttering)
- [ ] Section expand/collapse smooth
- [ ] Navigation transitions smooth (60fps)

### Responsiveness
- [ ] Touch/click response < 100ms
- [ ] No hanging or freezing
- [ ] Scroll is smooth

---

## 🐛 Bug Hunting Checklist

### Console Errors
- [ ] Open DevTools Console tab
- [ ] No red error messages
- [ ] No TypeScript errors
- [ ] No warnings about missing imports

### Functionality Issues
- [ ] All links work (no 404s)
- [ ] Navigation doesn't break page
- [ ] Drawer closes properly
- [ ] Sections expand/collapse correctly

### Visual Issues
- [ ] No overlapping elements
- [ ] Text not cut off
- [ ] Icons display correctly
- [ ] Spacing looks consistent
- [ ] Colors look right in light/dark mode

### Mobile-Specific
- [ ] Touch targets are large enough
- [ ] No horizontal scrolling needed
- [ ] Safe area respected (notches)
- [ ] Bottom nav doesn't cover content

### Desktop-Specific
- [ ] Sidebar doesn't cover content
- [ ] Content area fully visible
- [ ] Descriptions fully displayed
- [ ] No horizontal scroll needed

---

## ✅ Testing Checklist

### Navigation Structure
- [ ] Mobile tabs visible (< 768px)
- [ ] Desktop sidebar visible (≥ 768px)
- [ ] All 7 sections present
- [ ] 25+ features accessible

### User Experience
- [ ] Navigation intuitive
- [ ] Fast response time
- [ ] Smooth animations
- [ ] Easy feature discovery

### Functionality
- [ ] All links work
- [ ] Admin features conditional
- [ ] Dark mode works
- [ ] Responsive works

### Quality
- [ ] No console errors
- [ ] No visual glitches
- [ ] Professional appearance
- [ ] Touch-friendly on mobile

---

## 📊 Testing Scenarios

### Scenario 1: Mobile User
1. Open on phone or mobile view
2. See home page with 4 tabs at bottom
3. Tap Menu → drawer opens
4. Tap "Practice & Exams" section → expands
5. Tap "ACLS Training" → navigates
6. See ACLS page loads
7. Drawer closed automatically
8. Bottom tabs still visible
9. Try scrolling → tabs auto-hide (good UX)
10. Scroll back up → tabs reappear

### Scenario 2: Desktop User
1. Open on desktop (768px+ width)
2. See sidebar on left
3. See main content on right
4. Click "Quiz Arena" section → expands
5. See Quiz Arena items
6. Click "Join Quiz" → navigates
7. See Quiz page with sidebar still visible
8. Click different section → expands
9. Other section doesn't collapse
10. Hover over items → shows hover effect

### Scenario 3: Admin Testing
1. Login as admin user
2. Open navigation (mobile or desktop)
3. See Admin Tools section
4. See User Management with ⭐ badge
5. Click User Management → goes to /admin/users
6. See user management interface
7. Logout
8. See Admin Tools section now gone

### Scenario 4: Responsive Testing
1. Start at mobile (< 768px)
2. Verify mobile nav works
3. Slowly resize to tablet (768px)
4. Watch transition happen
5. Verify desktop nav works
6. Resize back to mobile
7. Verify mobile nav still works
8. No broken state between sizes

---

## 📱 Testing on Real Device (Optional)

### Mobile Testing
1. Connect to: http://10.154.166.108:3000
2. (Replace IP if different - see dev server output)
3. Test mobile experience
4. Check touch responsiveness
5. Verify safe areas

---

## 🎯 Sign-Off Checklist

After testing, confirm:
- [ ] Mobile navigation works
- [ ] Desktop navigation works
- [ ] All features accessible
- [ ] Admin features work (if admin)
- [ ] No console errors
- [ ] No visual glitches
- [ ] Performance good
- [ ] Dark mode works
- [ ] Responsive works
- [ ] Ready to deploy

---

## 🚀 Next Steps

If all tests pass:
1. Close dev server (Ctrl+C)
2. Run: `git add . && git commit -m "feat: Hybrid navigation" && git push`
3. Wait for Vercel deployment (2-3 min)
4. Verify on production

---

## 📞 Troubleshooting

### Mobile tabs not visible
- [ ] Check viewport is < 768px
- [ ] Check DevTools device toolbar is on
- [ ] Refresh page

### Sidebar not visible on desktop
- [ ] Check viewport is ≥ 768px
- [ ] Check DevTools device toolbar is off
- [ ] Refresh page

### Drawer won't open
- [ ] Check Menu button is visible
- [ ] Check click on correct button
- [ ] Check browser console for errors

### Links not working
- [ ] Check console for errors
- [ ] Check routes are correct
- [ ] Check auth is working

### Animations jerky
- [ ] Check browser is not overloaded
- [ ] Close other tabs
- [ ] Check performance in DevTools

---

**Happy Testing!** 🧪

Once you're satisfied with the local testing, we can deploy to production.

---

*Testing Guide - Navigation System v2.0*  
*Date: February 3, 2026*
