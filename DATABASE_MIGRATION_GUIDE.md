# Database Migration Guide - Quiz Arena Tables

## 🎯 WHAT THIS DOES

Creates 3 new tables in your PostgreSQL database to enable Quiz Arena:

- `QuizSession` - Stores live quiz sessions
- `Participant` - Stores players who join quizzes
- `Answer` - Stores individual answers from players

---

## 📝 STEP-BY-STEP INSTRUCTIONS

### Step 1: Open Supabase SQL Editor

1. Go to: **https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer/sql/new**
2. You should see a SQL editor with a blank query window

### Step 2: Copy Migration SQL

1. Open file: `/Users/apple/ECCCO/migrate-quiz-arena.sql`
2. Select ALL contents (Cmd+A)
3. Copy (Cmd+C)

### Step 3: Paste and Execute

1. In Supabase SQL Editor, paste the SQL (Cmd+V)
2. Click the **"RUN"** button (or press Cmd+Enter)
3. Wait for execution to complete (should take 1-2 seconds)

### Step 4: Verify Success

You should see output like:

```
table_name    | row_count
--------------+-----------
QuizSession   | 0
Participant   | 0
Answer        | 0
```

This confirms all 3 tables were created successfully!

---

## ✅ VERIFICATION COMMANDS

After running the migration, you can verify the tables exist:

```sql
-- List all Quiz Arena tables
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('QuizSession', 'Participant', 'Answer');
```

Expected output: 3 rows (QuizSession, Participant, Answer)

```sql
-- Check table structures
\d "QuizSession"
\d "Participant"
\d "Answer"
```

---

## 🔧 TROUBLESHOOTING

### Error: "relation already exists"

**Meaning:** Tables were already created previously
**Solution:** This is fine! The migration uses `CREATE TABLE IF NOT EXISTS` so it's safe to run multiple times.

### Error: "permission denied"

**Meaning:** Your Supabase user doesn't have permission to create tables
**Solution:** Make sure you're logged in as the project owner

### Error: "database connection failed"

**Meaning:** Can't connect to PostgreSQL
**Solution:** Check your internet connection and try again

---

## 📊 WHAT GETS CREATED

### QuizSession Table

Stores live quiz game sessions:

- `id` - Unique session identifier
- `accessCode` - 6-digit code players use to join
- `hostId` - User who created the quiz
- `status` - Current state (LOBBY, QUESTION, ANSWER, LEADERBOARD, FINISHED)
- `questions` - JSON array of quiz questions
- `settings` - Time limits, points, etc.

### Participant Table

Stores players who join a quiz:

- `id` - Unique participant identifier
- `sessionId` - Which quiz they joined
- `nickname` - Display name
- `score` - Current points
- `streak` - Consecutive correct answers
- `isActive` - Still connected?

### Answer Table

Stores individual answers:

- `id` - Unique answer identifier
- `sessionId` - Which quiz
- `participantId` - Who answered
- `questionIndex` - Which question
- `selectedOption` - Answer choice (0-3)
- `isCorrect` - Right or wrong?
- `timeToAnswer` - Response time in milliseconds
- `pointsEarned` - Points awarded

### Indexes Created

For better query performance:

- Access code lookup (fast joins)
- Host ID lookup (find my quizzes)
- Session status filtering
- Participant scores (leaderboard)
- Answer lookups

### Triggers Created

- `update_updated_at_column()` - Auto-updates `updatedAt` timestamp on changes

---

## 🚀 AFTER MIGRATION

Once migration is successful, you can:

1. **Test Create Quiz:** http://localhost:3000/quiz-arena/create
2. **Create a quiz session** with 10 questions
3. **Join as participant** using the access code
4. **Play the quiz** end-to-end

---

## 🔗 QUICK LINKS

**Supabase Dashboard:** https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer
**SQL Editor:** https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer/sql/new
**Table Editor:** https://supabase.com/dashboard/project/dckhoqbqtxddghojkoer/editor
**Migration File:** `/Users/apple/ECCCO/migrate-quiz-arena.sql`

---

## ⏭️ NEXT STEPS AFTER MIGRATION

1. ✅ Verify migration successful in Supabase
2. Move middleware: `mv middleware.ts src/middleware.ts`
3. Test Quiz Arena create page
4. Test full quiz flow (create → join → play)
5. Document any bugs found
6. Deploy to production

---

**Last Updated:** January 8, 2026 10:00 AM
