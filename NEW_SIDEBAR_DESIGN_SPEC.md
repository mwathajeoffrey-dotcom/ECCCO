# 🎨 NEW SIDEBAR DESIGN SPECIFICATION

**Date:** February 5, 2026
**Status:** CLEAN SLATE - Building from scratch

---

## 📋 REQUIREMENTS

### Desktop Mode (≥768px):

- ✅ Sidebar ALWAYS visible on left side
- ✅ Hamburger button INVISIBLE (hidden)
- ✅ Sidebar takes up ~240-280px width
- ✅ Content area adjusts automatically
- ✅ Fixed position, scrollable sidebar

### Mobile Mode (<768px):

- ✅ Sidebar HIDDEN by default
- ✅ Hamburger button VISIBLE in bottom-left corner
- ✅ Sidebar slides in from left when hamburger clicked
- ✅ Overlay/backdrop appears behind sidebar
- ✅ Click outside or X button closes sidebar
- ✅ Bottom navigation tabs remain visible (4 tabs + hamburger)

### Bottom Navigation (Mobile Only):

- ✅ 5 items total:
  1. Hamburger (left corner) - opens sidebar
  2. Practice
  3. Exam
  4. Quiz
  5. Profile
- ✅ Fixed at bottom of screen
- ✅ Hidden on desktop

---

## 🏗️ ARCHITECTURE

### New Components (Zero old code):

1. `NewSidebar.tsx` - Main sidebar component
2. `NewMobileNav.tsx` - Bottom navigation for mobile
3. `NewAppLayout.tsx` - Layout wrapper managing sidebar state

### Files to Delete/Clean:

- ❌ All old sidebar components
- ❌ Old mobile menu/drawer code
- ❌ Old hamburger button components

### State Management:

```typescript
// Simple React state - no complex libraries
const [sidebarOpen, setSidebarOpen] = useState(false);

// Desktop: sidebar always visible (state ignored)
// Mobile: state controls slide-in/out
```

---

## 🎨 DESIGN SPECS

### Sidebar Content:

```
┌─────────────────────┐
│   ECCCO Logo        │
├─────────────────────┤
│ 🏠 Dashboard        │
│ 📚 Practice         │
│ 📝 Exams            │
│ 🎯 Quiz Arena       │
│ 📊 Analytics        │
│ 📖 Study Materials  │
│ 🔖 Bookmarks        │
│ ⚙️  Settings        │
│ 👤 Profile          │
└─────────────────────┘
```

### Bottom Nav (Mobile):

```
┌──────┬──────┬──────┬──────┬──────┐
│  ☰   │ 📚   │ 📝   │ 🎯   │ 👤   │
│ Menu │ Prac │ Exam │ Quiz │ Prof │
└──────┴──────┴──────┴──────┴──────┘
```

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Delete all old sidebar code
- [ ] Create NewSidebar.tsx
- [ ] Create NewMobileNav.tsx
- [ ] Create NewAppLayout.tsx
- [ ] Update RootLayoutContent to use NewAppLayout
- [ ] Test on localhost (desktop)
- [ ] Test on localhost (mobile)
- [ ] Verify scroll works
- [ ] Build successfully
- [ ] Deploy to production
- [ ] Test on production (mobile device)

---

**Status:** Ready to implement 🚀
