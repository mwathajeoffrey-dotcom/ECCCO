# 👥 User Management Guide - ECCCO App

## 📊 **How to Track Your App Users**

Your ECCCO app has a comprehensive admin dashboard for managing and monitoring users.

---

## 🎯 **Access User Management**

### Admin Dashboard URLs:
- **Main Dashboard:** https://eccco.vercel.app/admin/dashboard
- **User Management:** https://eccco.vercel.app/admin/users
- **Feedback:** https://eccco.vercel.app/admin/feedback

---

## 📈 **User Statistics Dashboard**

### Top-Level Metrics:
Located at: `https://eccco.vercel.app/admin/users`

**What you can see:**
1. **Total Users** - All registered users (currently 4)
2. **Active Users (7 days)** - Users who interacted in the last week (currently 0)
3. **Total Quiz Attempts** - All quiz attempts across all users
4. **Total Exam Attempts** - All exam attempts across all users

---

## 👤 **Individual User Details**

For each user, you can see:

### Basic Info:
- ✅ **Email Address** (or username)
- ✅ **Clerk User ID** (unique identifier)
- ✅ **Join Date** - When they signed up
- ✅ **Last Active** - Most recent activity

### Activity Metrics:
- ✅ **Questions Answered** - Total practice questions
- ✅ **Quizzes Taken** - Number of quiz attempts
- ✅ **Exams Taken** - Number of full exams completed

### Performance Metrics:
- ✅ **Accuracy %** - Percentage of correct answers
- ✅ **Exam Pass Rate %** - Percentage of exams passed

### Status:
- ✅ **Active/Inactive** - Shows if user has been active in last 7 days

---

## 🔍 **Search & Filter Users**

### Search:
- Search by **email** (e.g., "ecccomedical@gmail.com")
- Search by **User ID** (e.g., "user_371H3N8bQ5kWMu1ExtSo5nf48AV")

### Filter Options:
1. **All Users** - Show everyone
2. **Active** - Users active in last 7 days
3. **Inactive** - Users who haven't been active recently

### Sort Options:
1. **Most Recent** - Sort by last active date
2. **Name** - Alphabetical by email
3. **Activity** - Sort by number of questions answered

---

## 📥 **Export User Data**

Click the **"Export"** button to download a CSV file with:
- Email
- User ID
- Created date
- Last active date
- Total quizzes
- Total questions
- Accuracy percentage
- Exam pass rate

---

## 🔄 **How "Active Users" is Calculated**

A user is considered **"Active"** if they have done ANY of the following in the **last 7 days**:

1. ✅ Answered practice questions
2. ✅ Taken a quiz
3. ✅ Taken an exam
4. ✅ Used study tools

**Note:** Just signing in doesn't count as "active" - they need to actually use the app.

---

## 📊 **Real-Time Monitoring**

### Current User Status (from your screenshot):

| User | Email | Status | Last Active |
|------|-------|--------|-------------|
| 1 | N/A | Inactive | 24/01/2026 |
| 2 | test@localhost.dev | Inactive | 24/01/2026 |
| 3 | mwangijeoffrey@gmail.com | Inactive | 13/01/2026 |
| 4 | mwathajeoffrey@gmail.com | Inactive | 12/01/2026 |

**Insights:**
- 4 total users registered
- 0 active users in last 7 days (no one has used the app recently)
- All users show 0% accuracy (haven't answered questions yet)

---

## 🚀 **Enhanced Tracking Features (Available)**

Want to add more tracking? Here are options:

### 1. **Real-Time Online Users**
Track who's currently signed in (requires WebSocket or polling)

### 2. **Email Notifications**
Get notified when:
- New user signs up
- User becomes active after being inactive
- Unusual activity detected

### 3. **User Analytics Dashboard**
- Daily/weekly/monthly active users graph
- User growth chart
- Engagement metrics

### 4. **User Engagement Metrics**
- Average session duration
- Most popular features
- Drop-off points

---

## 🔧 **Additional Admin Features You Have**

### 1. **Feedback Management**
URL: `https://eccco.vercel.app/admin/feedback`
- View user feedback and bug reports
- Respond to user issues
- Track feature requests

### 2. **Evidence Management**
URL: `https://eccco.vercel.app/admin/evidence`
- Manage medical evidence references
- Update clinical guidelines
- Review submitted evidence

### 3. **System Dashboard**
URL: `https://eccco.vercel.app/admin/dashboard`
- Overall system health
- Database statistics
- Performance metrics

---

## 📱 **How to Monitor User Sign-Ups**

### Option 1: Check Admin Dashboard Regularly
- Visit `/admin/users` daily/weekly
- Look at "Total Users" count
- Export data for records

### Option 2: Set Up Email Notifications (Can be added)
We can add automatic emails when:
```
New user signed up: ecccomedical@gmail.com
Total users: 5
Date: January 24, 2026
```

### Option 3: Clerk Dashboard
- Go to: https://dashboard.clerk.com
- View all user sign-ins
- See authentication logs
- Monitor failed login attempts

---

## 🎯 **Quick Actions**

### Daily Monitoring Checklist:
- [ ] Check total user count
- [ ] Review active users (7 days)
- [ ] Check for new feedback
- [ ] Review system health
- [ ] Export user data (weekly)

### Weekly Tasks:
- [ ] Analyze user engagement trends
- [ ] Review inactive users
- [ ] Check average performance metrics
- [ ] Review feedback and issues

---

## 🔐 **User Privacy & Security**

### What You CAN See:
✅ Email addresses
✅ Activity metrics (quizzes, exams, questions)
✅ Performance data (accuracy, pass rates)
✅ Join and last active dates

### What You CANNOT See:
❌ Passwords (managed by Clerk)
❌ Personal medical information
❌ Individual question content answered
❌ Real-time browsing activity

---

## 📊 **Understanding Your Current Users**

Based on your screenshot (4 users, 0 active):

**Status:** Early stage / Testing phase

**Recommendations:**
1. ✅ **Test accounts** (test@localhost.dev) can be deleted
2. ✅ **Personal accounts** are for testing - keep until launch
3. ✅ **ecccomedical@gmail.com** - Use as primary admin
4. ⚠️ **Low activity** - Normal for pre-launch/testing

---

## 🚀 **Improving User Engagement**

To increase "Active Users":

### 1. **Encourage Daily Practice**
- Send daily question via email
- Push notifications for streaks
- Gamification (badges, leaderboards)

### 2. **Monitor Drop-off**
- See where users stop using the app
- Improve onboarding flow
- Add tutorial/welcome guide

### 3. **Re-engagement Campaigns**
- Email inactive users after 7 days
- "We miss you" campaigns
- Share new features/content

---

## 🆘 **Troubleshooting**

### Issue: "Active Users" shows 0 but people are using the app
**Cause:** Users might be browsing but not answering questions  
**Solution:** Activity is only tracked when users:
- Answer practice questions
- Take quizzes/exams
- Not just browsing

### Issue: Users show "N/A" for email
**Cause:** User signed up without email verification  
**Solution:** Check Clerk settings to require email

### Issue: Can't see admin dashboard
**Cause:** Not logged in as admin  
**Solution:** Sign in with `ecccomedical@gmail.com` or your admin account

---

## 📞 **Need More Features?**

Want to add:
- Real-time online users counter?
- Email alerts for new sign-ups?
- Advanced analytics dashboard?
- User engagement metrics?
- Retention analysis?

Let me know and I can implement them! 🚀

---

## 📝 **Quick Summary**

**To check users:**
1. Go to: https://eccco.vercel.app/admin/users
2. View total users, active users, and individual stats
3. Search, filter, or export data as needed

**To monitor sign-ins:**
- Check "Total Users" count daily
- Review "Active Users (7 days)" for engagement
- Use Clerk Dashboard for authentication logs

**Current status:**
- 4 users registered
- 0 active in last 7 days
- Admin dashboard fully functional ✅

---

**Last Updated:** January 24, 2026
