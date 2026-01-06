# 🔑 Setup Your Admin & Developer Access

## Quick Start

Your development server is running at: **http://localhost:3000**

### Step 1: Get Your User ID

1. **Sign in to your app** at http://localhost:3000
2. **Visit this page**: http://localhost:3000/get-user-id
3. **Copy your Clerk user ID** (it will look like: `user_xxxxxxxxxxxxx`)

### Step 2: Update Local Environment (.env.local)

Replace the placeholder values in `.env.local` with your actual user ID:

```bash
# Change these lines in .env.local:
ADMIN_USER_IDS=your_actual_user_id_here
DEVELOPER_USER_IDS=your_actual_user_id_here
```

The `/get-user-id` page has a "Copy both lines" button that makes this super easy!

### Step 3: Restart Development Server

After updating `.env.local`:

```bash
# Press Ctrl+C to stop the current server
# Then restart:
npm run dev
```

### Step 4: Test Your Access

Once restarted, try accessing these pages:

- ✅ http://localhost:3000/admin/dashboard - Admin panel
- ✅ http://localhost:3000/admin/users - User management
- ✅ http://localhost:3000/guidelines - Guidelines editor
- ✅ http://localhost:3000/profile - Your profile page

If the environment variables are set correctly, you should have full access!

---

## For Production (Vercel)

### Step 5: Add Environment Variables to Vercel

1. Go to: https://vercel.com/mwathajeoffrey-dotcom/eccco
2. Click **Settings** → **Environment Variables**
3. Add these two variables:

| Name                 | Value                      |
| -------------------- | -------------------------- |
| `ADMIN_USER_IDS`     | `your_user_id_from_step_1` |
| `DEVELOPER_USER_IDS` | `your_user_id_from_step_1` |

4. Click **Save**
5. Go to **Deployments** tab
6. Click the 3 dots (**...**) on the latest deployment
7. Click **Redeploy**

---

## What You Get

### ✅ Admin Access

- View all users and their statistics
- Export user data to CSV
- See platform analytics
- Manage evidence library
- View feedback submissions

### ✅ Developer Access

- Edit medical guidelines
- Modify clinical content
- Update algorithm PDFs
- Manage system settings

---

## Security Notes

- ⚠️ **Never commit `.env.local`** to git (it's already in .gitignore)
- ⚠️ Only give admin/developer access to trusted users
- ⚠️ You can add multiple user IDs separated by commas:
  ```
  ADMIN_USER_IDS=user_abc123,user_def456,user_ghi789
  ```

---

## Troubleshooting

### "Access Denied" when visiting admin pages?

**Cause:** Environment variables not set or dev server not restarted

**Fix:**

1. Check `.env.local` has your actual user ID (not the placeholder)
2. Restart dev server (`npm run dev`)
3. Sign out and sign back in

### Can't see the /get-user-id page?

**Cause:** Not signed in

**Fix:** Sign in first at http://localhost:3000/sign-in

### Changes not taking effect in production?

**Cause:** Environment variables not added to Vercel or deployment not restarted

**Fix:**

1. Verify variables are in Vercel Settings → Environment Variables
2. Redeploy the application
3. Clear your browser cache

---

## Current Status

✅ **Security fixes deployed** (commit: fc07f00)
✅ **Admin dashboard created** (commit: 3b36265)
✅ **User profiles implemented** (commit: 05e16ef)
✅ **Build errors fixed** (commit: 6442030)
✅ **User ID helper tool added** (commit: abc9f3b)

**Next:** Set up your user ID and test the features!

---

**Need Help?**
The `/get-user-id` page has detailed step-by-step instructions with copy-paste ready commands!
