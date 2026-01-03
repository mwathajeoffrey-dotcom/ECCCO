# 🧭 Navigation Guide - How to Access ECCCO Features

## 📍 From the Home Page

### Method 1: Using the Sidebar Menu (Recommended)

1. **Open the Sidebar:**
   - Click the **Menu icon** (☰) in the top-left corner
   - Sidebar slides in from the left

2. **Navigate to Features:**

#### 👤 Your Personal Features:
- **🏆 Dashboard** → Your learning progress and stats
- **👤 My Profile** → Customize your learning preferences

#### 🛡️ Admin Features (Only visible if you're an admin):
- **🛡️ Admin Dashboard** → System overview and analytics
- **👥 User Management** → View and manage all users

#### 📝 Practice Questions:
- **All Questions** → Browse all practice questions
- **Random Practice** → Random question practice
- **ACLS Practice** → ACLS-specific questions
- **PALS Practice** → PALS-specific questions

#### 🧠 Study Tools:
- **Full Timed Exam** → Complete exam simulation
- **Custom Exam** → Create your own exam
- **Live Quiz** → Multiplayer quiz mode
- **Learning Analytics** → Detailed performance insights
- **Saved Questions** → Your bookmarked questions

#### 📚 Resources:
- **Evidence Library** → Medical evidence database
- **Evidence Search** → Search medical literature
- **Clinical Guidelines** → Clinical practice guidelines
- **Guidelines Search** → Search guidelines
- **Flowcharts** → Clinical decision flowcharts

---

## 🔗 Direct URLs (Bookmarkable)

### Personal Features:
```
https://eccco.vercel.app/dashboard
https://eccco.vercel.app/profile
```

### Admin Features (Requires Admin Role):
```
https://eccco.vercel.app/admin/dashboard
https://eccco.vercel.app/admin/users
```

### Developer Features (Requires Developer Role):
```
https://eccco.vercel.app/guidelines
```

### Practice:
```
https://eccco.vercel.app/practice
https://eccco.vercel.app/practice/acls
https://eccco.vercel.app/practice/pals
```

### Study Tools:
```
https://eccco.vercel.app/exam
https://eccco.vercel.app/live-quiz
https://eccco.vercel.app/learning-analytics
https://eccco.vercel.app/bookmarks
```

### Resources:
```
https://eccco.vercel.app/emergency-references
https://eccco.vercel.app/evidence-search
https://eccco.vercel.app/guidelines
https://eccco.vercel.app/guidelines-search
https://eccco.vercel.app/flowcharts
```

---

## 🎯 Quick Access on Mobile

1. **Home Screen:**
   - Tap **Menu** (☰) icon
   - Sidebar opens

2. **Scroll to Find:**
   - Profile features at top
   - Admin features (if admin)
   - Practice/Study/Resources sections

3. **Tap to Navigate:**
   - Sidebar automatically closes
   - Page loads

---

## ✨ New Features You Added Today

### 1. **👤 My Profile** (NEW!)
- **How to Access:**
  - Click **Menu** → **👤 My Profile**
  - Or visit: `https://eccco.vercel.app/profile`
  
- **What You Can Do:**
  - Set your specialty (ACLS/PALS/Both/BLS)
  - Select experience level
  - Set daily study goals
  - Configure notifications
  - Personalize learning preferences

### 2. **🛡️ Admin Dashboard** (NEW!)
- **How to Access:**
  - Click **Menu** → **🛡️ Admin Dashboard**
  - Or visit: `https://eccco.vercel.app/admin/dashboard`
  
- **What You Can See:**
  - Total users count
  - Active users today
  - Quiz completion rates
  - Exam statistics
  - System health metrics

### 3. **👥 User Management** (NEW!)
- **How to Access:**
  - Click **Menu** → **👥 User Management**
  - Or visit: `https://eccco.vercel.app/admin/users`
  
- **What You Can Do:**
  - View all registered users
  - Search users by email or ID
  - Filter by active/inactive status
  - Sort by activity or name
  - Export user data to CSV
  - View user performance statistics

---

## 🔐 Role-Based Access

### Everyone (Public):
- Home page
- Practice questions
- Study tools
- Resources

### Signed-In Users:
- Dashboard
- Profile
- Bookmarks
- Learning analytics
- Full exam features

### Admin Users (You!):
- Admin Dashboard
- User Management
- All public features

### Developer Users (You!):
- Clinical Guidelines editor
- All admin features
- All public features

---

## 💡 Tips for Navigation

1. **Sidebar is Always Available:**
   - Click Menu (☰) from any page
   - Quick access to all features

2. **Active Page Highlighted:**
   - Blue background = current page
   - Easy to see where you are

3. **Collapsible Sections:**
   - Click section headers to expand/collapse
   - Keeps sidebar organized

4. **Admin Features Highlighted:**
   - Purple color for admin links
   - Separated by divider lines
   - Only visible to admins

5. **Use Search in Sidebar:**
   - Question search in Practice section
   - Quick find specific questions

---

## 🚀 Testing Your Access

### Local (http://localhost:3000):
1. Open sidebar
2. Look for purple admin links
3. Should see:
   - 🛡️ Admin Dashboard
   - 👥 User Management

### Production (https://eccco.vercel.app):
1. Sign in with your account
2. Open sidebar
3. Verify same admin links appear
4. Test clicking each link

---

## ✅ What Should Work Now

After your Vercel deployment:

- ✅ Sidebar shows admin links (purple section)
- ✅ Profile link appears for all signed-in users
- ✅ Admin dashboard accessible at `/admin/dashboard`
- ✅ User management accessible at `/admin/users`
- ✅ All navigation is role-aware
- ✅ Non-admins don't see admin links

---

## 📱 Mobile Experience

### Home Page:
- Tap **Menu** (☰)
- Sidebar slides in

### Any Page:
- Menu icon always in top-left
- One tap to open navigation
- Smooth slide animation

### Return Home:
- Tap **ECCCO** logo
- Or tap **Home** in sidebar

---

**Last Updated:** January 3, 2026  
**Status:** Navigation enhanced with admin features ✨
