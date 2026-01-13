# 🎮 Quiz Arena - Setup & Testing Guide

## Step 1: Run Database Migration ✅

The Quiz Arena tables need to be created in your Supabase PostgreSQL database.

### Option A: Via Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard:**

   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor:**

   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Migration:**

   - Copy the contents of `migrate-quiz-arena.sql`
   - Paste into the SQL editor
   - Click "Run" (or press Cmd/Ctrl + Enter)

4. **Verify Success:**
   - You should see output showing:
     ```
     QuizSession: 0 rows
     Participant: 0 rows
     Answer: 0 rows
     ```
   - This means tables were created successfully!

### Option B: Via Command Line

```bash
# From project root
cat migrate-quiz-arena.sql | DATABASE_URL="postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres" npx prisma db execute --stdin
```

---

## Step 2: Test Quiz Arena Locally 🧪

### Terminal 1: Start Dev Server

```bash
npm run dev
# Wait for "Ready in XXXms"
```

### Terminal 2: Verify Tables Exist

```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  const sessions = await prisma.quizSession.count();
  console.log('✅ QuizSession table exists, count:', sessions);
  await prisma.\$disconnect();
})();
"
```

### Browser: Create & Test Quiz

1. **Create a Quiz:**

   ```
   http://localhost:3000/quiz-arena/create
   ```

   - Select topic: "ACLS" (or any topic)
   - Number of questions: 5
   - Time per question: 30 seconds
   - Click "Create Quiz"
   - **COPY THE ACCESS CODE** shown

2. **Open Second Browser Window (Incognito):**

   ```
   http://localhost:3000/quiz-arena/play/[YOUR-ACCESS-CODE]
   ```

   - Enter your name (e.g., "Player 1")
   - Click "Join Quiz"

3. **Back to First Window (Host):**

   - You should see "Player 1" in the participants list
   - Click "Start Quiz"

4. **Both Windows:**

   - Questions should appear
   - Answer them!
   - Watch scores update
   - See leaderboard

5. **Host Window:**
   - Click "Next Question" after each round
   - Click "End Quiz" when done

---

## Step 3: Deploy to Production 🚀

### Commit the Migration File

```bash
git add migrate-quiz-arena.sql QUIZ_ARENA_STATUS.md QUIZ_ARENA_SETUP.md
git commit -m "Add Quiz Arena database migration and documentation"
git push
```

### Run Migration on Production

1. **Go to Supabase Dashboard**
2. **Select your production project**
3. **SQL Editor → New query**
4. **Paste contents of `migrate-quiz-arena.sql`**
5. **Run the query**
6. **Verify tables created**

### Test on Production

1. **Create Quiz:**

   ```
   https://eccco.vercel.app/quiz-arena/create
   ```

2. **Join Quiz (different device/browser):**

   ```
   https://eccco.vercel.app/quiz-arena/play/[ACCESS-CODE]
   ```

3. **Run through complete flow**

---

## Step 4: Multi-Player Testing 🎯

### Invite Real Players

1. **Create a quiz** on production
2. **Share the access code** via:

   - Text message
   - Email
   - Slack/Discord
   - QR code (if you want to build that)

3. **Have multiple people join** from different devices
4. **Test the flow:**
   - Do all see the same questions?
   - Do scores update correctly?
   - Is there any lag?
   - Does the leaderboard work?

---

## Common Issues & Solutions

### Issue 1: "Failed to create quiz session"

**Cause:** Tables don't exist in database
**Solution:** Run the migration SQL in Supabase

### Issue 2: "Invalid access code"

**Cause:** Quiz session not found
**Solution:** Make sure access code is correct (6 characters)

### Issue 3: Questions not loading

**Cause:** Topic has no questions or wrong topic ID
**Solution:**

- Check topic exists: `curl https://eccco.vercel.app/api/topics`
- Use valid topic ID from the list

### Issue 4: Participants not seeing updates

**Cause:** Polling delay (2-3 seconds)
**Solution:** This is normal with polling. For instant updates, we need to implement SSE (Phase 4)

---

## What's Working ✅

- ✅ Quiz creation with any of the 1,845 questions
- ✅ Unique access code generation
- ✅ Participant joining
- ✅ Question display with timer
- ✅ Answer submission
- ✅ Score calculation
- ✅ Leaderboard ranking
- ✅ Final results

## What Needs Work ⚠️

- ⏳ Real-time updates (currently 2-3 second delay due to polling)
- ⏳ Sound effects (code is there but sounds not implemented)
- ⏳ Animations (basic, could be enhanced)
- ⏳ Session cleanup (old quizzes stay in database)
- ⏳ Reconnection (if participant disconnects, can't rejoin)

---

## Next Steps

### Immediate:

1. ✅ Run migration (create tables)
2. ✅ Test locally with 2 windows
3. ✅ Test on production with friends

### Short-term:

1. Implement Server-Sent Events (SSE) for real-time updates
2. Add sound effects
3. Add quiz session cleanup (auto-delete after 24 hours)
4. Add reconnection support

### Long-term:

1. Team mode (2v2, 3v3)
2. Custom question sets
3. Quiz templates
4. Analytics dashboard
5. Mobile app (React Native)

---

## 🎉 Ready to Play!

Once you run the migration, you're all set! The Quiz Arena will have access to all **1,845 questions** across **46 topics** including:

- ACLS, ATLS, BLS, PALS (emergency protocols)
- All OB/GYN topics (Placenta Previa, Preeclampsia, etc.)
- Cardiac emergencies (195 questions!)
- Trauma, Toxicology, Neurological emergencies
- And 40+ more topics!

**Have fun testing!** 🚀
