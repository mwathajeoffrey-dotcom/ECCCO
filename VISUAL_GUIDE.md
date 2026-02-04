# 📸 EXPECTED BEHAVIOR - Visual Guide

## 🖥️ DESKTOP VIEW (≥768px width)

```
┌─────────────────────────────────────────────────────────┐
│ ┌─────────┐                                             │
│ │         │  ECCCO                    [User] [Sign Out] │
│ │  SIDEBAR│  Emergency Care                             │
│ │         │─────────────────────────────────────────────│
│ │ ECCCO   │                                             │
│ │ Emergen │          MAIN CONTENT                       │
│ │         │          (Your pages)                       │
│ │ Quick   │                                             │
│ │ Access  │                                             │
│ │         │                                             │
│ │ Practice│                                             │
│ │ & Exams │                                             │
│ │         │                                             │
│ │ Quiz    │                                             │
│ │ Arena   │                                             │
│ │         │                                             │
│ │ Learning│                                             │
│ │         │                                             │
│ │ Resource│                                             │
│ │         │                                             │
│ │ Admin   │                                             │
│ │         │                                             │
│ │ Account │                                             │
│ └─────────┘                                             │
└─────────────────────────────────────────────────────────┘
```

**What you should see:**
- ✅ Sidebar permanently visible on LEFT
- ✅ NO hamburger button (it's hidden on desktop)
- ✅ NO bottom navigation bar
- ✅ Sidebar width: 320px (80rem)
- ✅ All navigation sections expanded/collapsible

---

## 📱 MOBILE VIEW (<768px width)

### **Drawer CLOSED** (default state):

```
┌─────────────────────────────┐
│ [☰]    ECCCO      [Sign In] │ ← Hamburger button
│─────────────────────────────│
│                             │
│                             │
│      MAIN CONTENT           │
│      (Your pages)           │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│─────────────────────────────│
│ Menu Practice Exam Quiz  👤 │ ← Bottom nav
└─────────────────────────────┘
```

**What you should see:**
- ✅ Blue hamburger button [☰] in top-left
- ✅ Bottom navigation bar with 5 buttons
- ✅ NO sidebar visible initially
- ✅ Content scrolls normally

---

### **Drawer OPEN** (after clicking hamburger or Menu):

```
┌──────────────┬──────────────┐
│ ECCCO     [X]│░░░░░░░░░░░░░░│ ← X button + overlay
│──────────────│░░░░░░░░░░░░░░│
│ Quick Access │░░░░░░░░░░░░░░│
│  Dashboard   │░░░░░░░░░░░░░░│
│  Profile     │░░░░░░░░░░░░░░│
│              │░░░░░░░░░░░░░░│
│ Practice &...│░░░░░░░░░░░░░░│
│  Practice    │░░░░░░░░░░░░░░│
│  Exam        │░░░░░░░░░░░░░░│
│              │░░░░░░░░░░░░░░│
│ Quiz Arena   │░░░░░░░░░░░░░░│
│  Quick Quiz  │░░░░░░░░░░░░░░│
│  Live Quiz   │░░░░░░░░░░░░░░│
│              │░░░░░░░░░░░░░░│
│ Learning &...│░░░░░░░░░░░░░░│
│──────────────│░░░░░░░░░░░░░░│
│ Menu Prac... │ ← Bottom nav │
└──────────────┴──────────────┘
```

**What you should see:**
- ✅ Drawer slides in from LEFT
- ✅ Width: 320px (80rem)
- ✅ Gray overlay on right (semi-transparent black)
- ✅ X button in top-right of drawer
- ✅ Bottom nav still visible
- ✅ Smooth slide animation (300ms spring)

---

## 🎬 INTERACTIONS

### **Opening Drawer** (3 ways):
1. Click **blue hamburger button** [☰] top-left
2. Click **Menu button** in bottom nav
3. Result: Drawer slides in from left with smooth animation

### **Closing Drawer** (4 ways):
1. Click **X button** in drawer header
2. Click **gray overlay** (anywhere on dimmed area)
3. Click **any navigation link** (drawer closes AND navigates)
4. Resize window to desktop width (auto-closes)

### **Bottom Navigation Auto-Hide**:
- Scrolling **DOWN** → bottom nav slides down (hidden)
- Scrolling **UP** → bottom nav slides up (visible)
- Always visible when at top of page

---

## 🎨 COLOR SCHEME

### Drawer:
- Background: White (dark mode: gray-900)
- Border: Gray-200 (dark mode: gray-700)
- Shadow: xl
- Z-index: 40

### Overlay:
- Background: Black with 50% opacity
- Z-index: 30

### Hamburger Button:
- Background: Blue-600 (hover: blue-700)
- Text: White
- Shadow: lg
- Z-index: 50 (always on top)

### Bottom Navigation:
- Background: White (dark mode: gray-900)
- Border-top: Gray-200 (dark mode: gray-700)
- Z-index: 30
- Height: Auto with safe-area padding

---

## ✅ SUCCESS INDICATORS

### Desktop:
- [ ] Sidebar always visible on left
- [ ] No hamburger button visible
- [ ] No bottom navigation
- [ ] Sidebar sections clickable
- [ ] Smooth scrolling

### Mobile:
- [ ] Blue hamburger button visible
- [ ] Bottom nav with 5 buttons visible
- [ ] Click hamburger → drawer slides in
- [ ] Click Menu → drawer slides in
- [ ] Click X → drawer slides out
- [ ] Click overlay → drawer slides out
- [ ] Click nav link → navigates AND closes drawer
- [ ] Bottom nav auto-hides on scroll

### Console:
- [ ] NO errors
- [ ] NO warnings about "MobileMenuDrawer"
- [ ] NO duplicate component warnings
- [ ] All resources load successfully

---

## 🧪 HOW TO TEST

### Desktop Test:
1. Open in full screen (>768px width)
2. Should see sidebar immediately
3. No hamburger button should appear
4. Click sidebar links to navigate

### Mobile Test:
1. Open DevTools (F12)
2. Click device toggle (Cmd+Shift+M)
3. Select iPhone or narrow viewport
4. Should see hamburger + bottom nav
5. Test all interactions listed above

### Animation Test:
1. Click hamburger → watch drawer slide in (smooth)
2. Click overlay → watch drawer slide out (smooth)
3. Should feel responsive, not janky
4. No layout shift or flashing

---

## 🎯 THIS IS WHAT PRODUCTION SHOULD LOOK LIKE!

After deployment, verify everything matches this guide.  
Use **Incognito mode** to avoid cache issues!

**Happy deploying! 🚀**
