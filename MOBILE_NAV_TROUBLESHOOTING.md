# Mobile Navigation Troubleshooting Guide

## Issue Report

**Date:** January 14, 2025
**Issue:** Mobile bottom nav not rendering, floating button still visible on desktop right

## Expected Behavior

### Mobile (< 768px)

- ✅ Bottom navigation bar with 5 items: Menu, Practice, Exam, Quiz, Profile
- ✅ Menu button opens slide-out drawer
- ❌ NO floating practice button (hidden)

### Desktop (>= 768px)

- ❌ NO bottom navigation bar (hidden)
- ✅ Floating practice button at TOP-LEFT corner
- ✅ Tooltip appears on right side of button

## Current Implementation

### Files Involved

1. `src/components/layout/MobileBottomNav.tsx`

   - Responsible for bottom navigation
   - Uses `md:hidden` class (hides on desktop)
   - Z-index: 50

2. `src/components/layout/MobileMenuDrawer.tsx`

   - Slide-out menu drawer
   - Z-index: 60 (backdrop), 70 (drawer)

3. `src/components/practice/FloatingPracticeButton.tsx`
   - Quick practice button
   - Uses `hidden md:flex` (hidden on mobile, visible on desktop)
   - Position: `md:top-6 md:left-6` (TOP-LEFT on desktop)
   - Z-index: 40

### Key Classes

**MobileBottomNav:**

```tsx
className = "md:hidden fixed bottom-0 left-0 right-0 ... z-50";
```

- `md:hidden` = Hidden on screens >= 768px (desktop)
- `fixed bottom-0` = Stuck to bottom on mobile
- `z-50` = Above most content

**FloatingPracticeButton:**

```tsx
className = "hidden md:flex fixed ... md:top-6 md:left-6 z-40";
```

- `hidden md:flex` = Hidden on mobile, flex on desktop
- `md:top-6 md:left-6` = TOP-LEFT corner on desktop (24px from edges)
- `z-40` = Below modals and navigation

## Debugging Steps

### 1. Check if Components are Mounted

Open browser console and run:

```javascript
// Check if MobileBottomNav exists
document.querySelector('nav[aria-label="Mobile bottom navigation"]');

// Check if FloatingPracticeButton exists
document.querySelector('a[aria-label*="Quick Practice"]');
```

### 2. Check CSS Classes

```javascript
// Get bottom nav element
const bottomNav = document.querySelector(
  'nav[aria-label="Mobile bottom navigation"]'
);
console.log("Bottom nav classes:", bottomNav?.className);
console.log(
  "Bottom nav computed display:",
  window.getComputedStyle(bottomNav).display
);

// Get floating button element
const floatingBtn = document.querySelector('a[aria-label*="Quick Practice"]');
console.log("Floating button classes:", floatingBtn?.className);
console.log(
  "Floating button computed display:",
  window.getComputedStyle(floatingBtn).display
);
```

### 3. Check Viewport Width

```javascript
console.log("Window width:", window.innerWidth);
console.log("Is mobile (<768px)?", window.innerWidth < 768);
```

### 4. Force Visibility (Testing Only)

```javascript
// Force show bottom nav
const bottomNav = document.querySelector(
  'nav[aria-label="Mobile bottom navigation"]'
);
if (bottomNav) {
  bottomNav.classList.remove("md:hidden");
  bottomNav.style.display = "block";
}

// Force hide floating button
const floatingBtn = document.querySelector('a[aria-label*="Quick Practice"]');
if (floatingBtn) {
  floatingBtn.style.display = "none";
}
```

## Common Issues & Solutions

### Issue 1: Components Not Rendering

**Symptoms:** Elements not in DOM at all

**Causes:**

- Build not deployed yet
- Component import error
- Client-side hydration issue

**Solutions:**

1. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. Clear browser cache
3. Check browser console for errors
4. Verify Vercel deployment completed

### Issue 2: Wrong Visibility on Mobile/Desktop

**Symptoms:** Bottom nav shows on desktop, or floating button shows on mobile

**Causes:**

- Tailwind classes not applied
- CSS specificity issues
- Viewport detection wrong

**Solutions:**

1. Check Tailwind config includes responsive breakpoints
2. Verify classes: `md:hidden` for mobile-only, `hidden md:flex` for desktop-only
3. Test at exact breakpoint (768px)

### Issue 3: Z-Index Conflicts

**Symptoms:** Elements hidden behind other content

**Causes:**

- Lower z-index than overlapping elements
- Stacking context issues

**Solutions:**

1. Bottom nav should have `z-50`
2. Floating button should have `z-40`
3. Menu drawer should have `z-60` (backdrop) and `z-70` (panel)

## Quick Fix Checklist

- [ ] Hard refresh browser (Cmd+Shift+R)
- [ ] Check browser console for errors
- [ ] Verify window width with DevTools
- [ ] Test responsive mode in DevTools
- [ ] Clear site data and reload
- [ ] Check Vercel deployment status
- [ ] Verify latest commit is deployed

## Testing Procedure

### Mobile Testing (< 768px)

1. Open Chrome DevTools
2. Toggle device emulation (Cmd+Shift+M)
3. Select iPhone 14 Pro or similar
4. Verify:
   - [ ] Bottom nav visible at bottom
   - [ ] 5 items: Menu, Practice, Exam, Quiz, Profile
   - [ ] Menu button opens drawer
   - [ ] No floating button visible

### Desktop Testing (>= 768px)

1. Disable device emulation
2. Set viewport to 1440px width or wider
3. Verify:
   - [ ] No bottom nav visible
   - [ ] Floating button at TOP-LEFT (24px from top, 24px from left)
   - [ ] Hover shows tooltip on right
   - [ ] Gradient effect and glow

### Breakpoint Testing (exactly 768px)

1. Set viewport to exactly 768px
2. Verify transition between mobile/desktop views
3. Should switch at this exact point

## Manual Override (Emergency)

If components still not showing correctly, add this to `globals.css`:

```css
/* TEMPORARY: Force mobile nav on mobile */
@media (max-width: 767px) {
  nav[aria-label="Mobile bottom navigation"] {
    display: flex !important;
  }

  a[aria-label*="Quick Practice"] {
    display: none !important;
  }
}

/* TEMPORARY: Force floating button on desktop */
@media (min-width: 768px) {
  nav[aria-label="Mobile bottom navigation"] {
    display: none !important;
  }

  a[aria-label*="Quick Practice"] {
    display: flex !important;
  }
}
```

**Note:** Remove these after fixing root cause!

## Verification

After deployment, verify on:

- [ ] iPhone 14 Pro (390x844)
- [ ] iPhone 14 Pro Max (428x926)
- [ ] Galaxy S21 (360x800)
- [ ] iPad (810x1080)
- [ ] Desktop 1440px
- [ ] Desktop 1920px

## Contact Info

If issue persists after following this guide:

1. Check latest commit SHA matches Vercel deployment
2. Review browser console for React errors
3. Test in incognito mode (rules out extensions)
4. Try different browser (Safari, Firefox)

**Last Build:** Successful (82 routes)
**Last Deployment:** January 14, 2025
**Commit:** `fd322bc`
