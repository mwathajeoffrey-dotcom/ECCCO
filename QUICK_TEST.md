# 🧪 QUICK TEST CHECKLIST

**Dev Server:** http://localhost:3000 ✅ Running  
**Date:** February 3, 2026  
**Time to Test:** ~5-10 minutes  

---

## 📱 MOBILE TEST (DevTools Mobile View)

**What to Do:**
1. Open DevTools (F12)
2. Click mobile device icon
3. Select any phone (iPhone 12, Pixel, etc)

**Quick Checks:**
- [ ] See 4 tabs at bottom (Home, Practice, Quiz, Profile)
- [ ] Click "Menu" button → drawer slides in
- [ ] See 7 sections in drawer
- [ ] Click section header → expands/collapses
- [ ] Click item → navigates & closes drawer
- [ ] All items have icons + text
- [ ] Some items have badges (NEW, Featured, ⭐)

---

## 🖥️ DESKTOP TEST (Full Width)

**What to Do:**
1. Close mobile view / Resize to full width
2. Viewport should be ≥ 768px

**Quick Checks:**
- [ ] See sidebar on LEFT side (always visible)
- [ ] See 7 sections with headers
- [ ] Click section → expands/collapses
- [ ] Items show icon + label + description
- [ ] Click item → navigates
- [ ] Sidebar stays visible
- [ ] Badges visible (NEW, Featured, ⭐)

---

## ⚙️ ADMIN TEST

**If you're logged in as Admin:**
- [ ] See "⚙️ Admin Tools" section
- [ ] See "👥 User Management" with ⭐ badge
- [ ] Click it → goes to /admin/users

**If not Admin:**
- [ ] Admin Tools section NOT visible

---

## 🎯 KEY FEATURES TO TEST

**Quick Access:**
- Evidence Search (Featured)
- Dashboard
- Clinical Notes (NEW)

**Practice:**
- All Questions
- Random
- ACLS
- PALS

**Quiz Arena:**
- Create Quiz (NEW)
- Join Quiz (Live)

**Resources:**
- Guidelines
- Flowcharts
- Emergency References

**Admin (if applicable):**
- User Management ⭐

---

## 🔄 RESPONSIVE TEST

1. Start at mobile (< 768px)
2. Verify mobile nav works
3. Resize to desktop (≥ 768px)
4. Watch sidebar appear
5. Verify desktop nav works
6. Scroll desktop sidebar → should scroll
7. Everything smooth? ✅

---

## 🎨 DARK MODE TEST

- [ ] Find theme toggle
- [ ] Switch to dark mode
- [ ] Check text is readable
- [ ] Check colors look good
- [ ] Switch back to light mode
- [ ] Everything looks right?

---

## ✅ FINAL CHECK

- [ ] Mobile navigation works
- [ ] Desktop navigation works
- [ ] All features accessible
- [ ] No red errors in console
- [ ] Animations smooth
- [ ] Responsive works
- [ ] Dark mode works

**All Good?** → Ready to deploy! 🚀

---

## 🚀 WHEN READY TO DEPLOY

```bash
# Stop dev server (Ctrl+C)
# Then run:
git add .
git commit -m "feat: Hybrid navigation system"
git push origin main
# Wait 2-3 min for Vercel
```

---

*Quick Testing Guide - 5 minutes to deployment*
