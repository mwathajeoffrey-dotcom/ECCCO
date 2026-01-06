# 🎯 ECCCO Live Quiz - Complete Implementation Guide

**Date:** January 5, 2026
**Status:** 🟡 Partially Implemented - Schema Added, Database Migration Pending
**Priority:** HIGH - Core Feature

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Current Status](#current-status)
3. [Architecture](#architecture)
4. [Database Schema](#database-schema)
5. [Implementation Tasks](#implementation-tasks)
6. [Testing Plan](#testing-plan)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

**ECCCO Live** is a real-time, multiplayer quiz system that allows instructors to host live medical training sessions with multiple participants answering questions simultaneously.

### **Key Features:**

- ✅ Real-time WebSocket communication
- ✅ Access code-based joining (6-character codes)
- ✅ Host dashboard with live participant tracking
- ✅ Participant leaderboard with scoring
- ✅ Question timing and analytics
- ✅ Support for guest users (no account required)
- ✅ Mobile-responsive interface

### **Use Cases:**

1. **Medical School Lectures** - Professor hosts quiz, students join via code
2. **Grand Rounds** - Attending physician quizzes residents in real-time
3. **Study Groups** - Peer-led practice sessions
4. **CME Events** - Interactive continuing education workshops

---

## 📊 Current Status

### **✅ Completed:**

1. ✅ Frontend UI (create, join, host pages)
2. ✅ WebSocket infrastructure (`src/lib/live-quiz/websocket-manager.ts`)
3. ✅ API routes structure (`src/app/api/live-quiz/`)
4. ✅ Performance monitoring (`src/lib/live-quiz/performance-manager.ts`)
5. ✅ Security manager (`src/lib/live-quiz/security-manager.ts`)
6. ✅ **Database schema added** (Commit 9b74113)

### **🟡 In Progress:**

1. 🟡 Database migration to Supabase (schema ready, push pending)
2. 🟡 API route updates to match new schema
3. 🟡 Error handling improvements

### **❌ Not Started:**

1. ❌ Session cleanup/expiry logic
2. ❌ Debug log removal from production
3. ❌ Comprehensive testing
4. ❌ Admin dashboard for all sessions
5. ❌ Analytics and reporting

---

## 🏗️ Architecture

### **Tech Stack:**

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Supabase)
- **Real-time:** WebSocket Manager (custom implementation)
- **State Management:** React hooks, session state manager

### **Data Flow:**

```
┌─────────────────┐
│  Host Creates   │
│  Quiz Session   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ Generate Access Code    │
│ (6-char: ABC123)        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Participants Join       │
│ via Access Code         │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Host Starts Quiz        │
│ (changes status to      │
│  IN_PROGRESS)           │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ WebSocket broadcasts    │
│ current question to all │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Participants answer     │
│ (timed responses)       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Scores calculated &     │
│ leaderboard updated     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Host moves to next      │
│ question OR ends quiz   │
└─────────────────────────┘
```

### **WebSocket Events:**

```typescript
// Server → Client
interface ServerEvents {
  "session:update": { session: LiveQuizSession };
  "participants:update": { participants: LiveQuizParticipant[] };
  "question:new": { question: Question; questionIndex: number };
  "question:results": { results: QuestionResults };
  "quiz:end": { finalResults: FinalResults };
  error: { message: string };
}

// Client → Server
interface ClientEvents {
  join: { accessCode: string; nickname: string };
  answer: { questionIndex: number; selectedAnswer: number };
  leave: {};
}
```

---

## 💾 Database Schema

### **LiveQuizSession Model:**

```prisma
model LiveQuizSession {
  id                   String                 @id
  title                String                 // "ACLS Practice Quiz"
  description          String?                // Optional description
  accessCode           String                 @unique // "ABC123"
  hostId               String                 // User ID of host
  topicId              String                 // Topic reference
  questionIds          String                 // JSON array: ["q1", "q2", ...]
  currentQuestionIndex Int                    @default(0) // 0-based
  status               String                 @default("WAITING")
                                              // WAITING | IN_PROGRESS | COMPLETED | CANCELLED
  settings             String?                // JSON: {"timePerQuestion": 30, "showResults": true}
  startedAt            DateTime?              // When host started quiz
  endedAt              DateTime?              // When quiz completed
  createdAt            DateTime               @default(now())
  updatedAt            DateTime
  LiveQuizParticipant  LiveQuizParticipant[]
  LiveQuizAnswer       LiveQuizAnswer[]

  @@index([hostId])
  @@index([topicId])
  @@index([accessCode])
  @@index([status])
  @@index([createdAt])
}
```

**Example Record:**

```json
{
  "id": "session_1704484800000_abc123",
  "title": "ACLS Cardiac Arrest Quiz",
  "description": "Interactive practice for ACLS scenarios",
  "accessCode": "HEART5",
  "hostId": "user_371H3N8bQ5kWMu1ExtSo5nf48AV",
  "topicId": "acls_cardiac",
  "questionIds": "[\"q_acls_1\", \"q_acls_2\", \"q_acls_3\"]",
  "currentQuestionIndex": 0,
  "status": "WAITING",
  "settings": "{\"timePerQuestion\": 45, \"showCorrectAnswer\": true}",
  "startedAt": null,
  "endedAt": null,
  "createdAt": "2026-01-05T12:00:00Z",
  "updatedAt": "2026-01-05T12:00:00Z"
}
```

### **LiveQuizParticipant Model:**

```prisma
model LiveQuizParticipant {
  id             String           @id
  sessionId      String
  userId         String?          // Optional - null for guest users
  nickname       String           // Display name
  score          Int              @default(0)
  joinedAt       DateTime         @default(now())
  leftAt         DateTime?        // When they left
  isActive       Boolean          @default(true)
  LiveQuizAnswer LiveQuizAnswer[]
  LiveQuizSession LiveQuizSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)

  @@index([sessionId])
  @@index([userId])
  @@index([joinedAt])
}
```

**Example Record:**

```json
{
  "id": "participant_1704484900000_xyz789",
  "sessionId": "session_1704484800000_abc123",
  "userId": null,
  "nickname": "Dr. Smith",
  "score": 150,
  "joinedAt": "2026-01-05T12:05:00Z",
  "leftAt": null,
  "isActive": true
}
```

### **LiveQuizAnswer Model:**

```prisma
model LiveQuizAnswer {
  id                  String              @id
  sessionId           String
  participantId       String
  questionId          String
  questionIndex       Int                 // 0-based index
  selectedAnswer      Int                 // 0-3 (A, B, C, D)
  isCorrect           Boolean
  timeToAnswer        Int?                // Milliseconds
  answeredAt          DateTime            @default(now())
  LiveQuizSession     LiveQuizSession     @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  LiveQuizParticipant LiveQuizParticipant @relation(fields: [participantId], references: [id], onDelete: Cascade)

  @@unique([sessionId, participantId, questionIndex])
  @@index([sessionId])
  @@index([participantId])
  @@index([questionId])
}
```

**Example Record:**

```json
{
  "id": "answer_1704485000000_answer1",
  "sessionId": "session_1704484800000_abc123",
  "participantId": "participant_1704484900000_xyz789",
  "questionId": "q_acls_1",
  "questionIndex": 0,
  "selectedAnswer": 2,
  "isCorrect": true,
  "timeToAnswer": 12500,
  "answeredAt": "2026-01-05T12:10:00Z"
}
```

---

## ✅ Implementation Tasks

### **Phase 1: Database Migration** (CURRENT)

**Task 1.1: Push Schema to Supabase**

```bash
# Get correct Supabase connection URL
# Use Direct Connection (port 5432) for migrations

npx prisma db push --accept-data-loss
npx prisma generate
```

**Task 1.2: Verify Tables Created**

```sql
-- Check in Supabase dashboard or via psql:
SELECT tablename FROM pg_tables WHERE schemaname = 'public'
AND tablename LIKE 'Live%';

-- Expected output:
-- LiveQuizSession
-- LiveQuizParticipant
-- LiveQuizAnswer
```

**Task 1.3: Test CRUD Operations**

```typescript
// Test create session
const session = await prisma.liveQuizSession.create({
  data: {
    id: "test_session_1",
    title: "Test Quiz",
    accessCode: "TEST01",
    hostId: "test_host",
    topicId: "test_topic",
    questionIds: JSON.stringify(["q1", "q2"]),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
});

// Test create participant
const participant = await prisma.liveQuizParticipant.create({
  data: {
    id: "test_participant_1",
    sessionId: "test_session_1",
    nickname: "Test User",
    createdAt: new Date(),
  },
});

// Test create answer
const answer = await prisma.liveQuizAnswer.create({
  data: {
    id: "test_answer_1",
    sessionId: "test_session_1",
    participantId: "test_participant_1",
    questionId: "q1",
    questionIndex: 0,
    selectedAnswer: 1,
    isCorrect: true,
    answeredAt: new Date(),
  },
});
```

---

### **Phase 2: API Route Updates**

**Files to Update:**

**2.1: `/api/live-quiz/create/route.ts`**

```typescript
// Add required fields: id, createdAt, updatedAt
const session = await prisma.liveQuizSession.create({
  data: {
    id: `session_${Date.now()}_${generateCode()}`,
    title,
    description,
    accessCode: generateAccessCode(),
    hostId,
    topicId,
    questionIds: JSON.stringify(questionIds),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
});
```

**2.2: `/api/live-quiz/join/[accessCode]/route.ts`**

```typescript
// Add id field
const participant = await prisma.liveQuizParticipant.create({
  data: {
    id: `participant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sessionId: session.id,
    userId: userId || null,
    nickname,
    createdAt: new Date(),
  },
});
```

**2.3: `/api/live-quiz/session/[sessionId]/participant/[participantId]/answer/route.ts`**

```typescript
// Add id field
const answer = await prisma.liveQuizAnswer.create({
  data: {
    id: `answer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sessionId,
    participantId,
    questionId,
    questionIndex,
    selectedAnswer,
    isCorrect,
    timeToAnswer,
    answeredAt: new Date(),
  },
});
```

---

### **Phase 3: Clean Up & Optimization**

**3.1: Remove Debug Logging**

```typescript
// File: src/lib/live-quiz/performance-manager.ts
// BEFORE:
logger.debug("Connection added to pool", { poolId, connectionCount });

// AFTER:
// Remove all logger.debug() calls in production
if (process.env.NODE_ENV === "development") {
  logger.debug("Connection added to pool", { poolId, connectionCount });
}
```

**3.2: Add Session Cleanup**

```typescript
// File: src/lib/live-quiz/session-cleanup.ts (NEW)
export async function cleanupOldSessions() {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Auto-end sessions older than 24 hours
  await prisma.liveQuizSession.updateMany({
    where: {
      status: { in: ["WAITING", "IN_PROGRESS"] },
      createdAt: { lt: twentyFourHoursAgo },
    },
    data: {
      status: "CANCELLED",
      endedAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Delete completed sessions older than 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  await prisma.liveQuizSession.deleteMany({
    where: {
      status: { in: ["COMPLETED", "CANCELLED"] },
      endedAt: { lt: sevenDaysAgo },
    },
  });
}

// Run as cron job or API route
// /api/cron/cleanup-sessions
```

**3.3: Add Session Expiry Middleware**

```typescript
// Before returning session, check if expired
if (session.status === "IN_PROGRESS") {
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
  if (session.startedAt && session.startedAt < twoHoursAgo) {
    // Auto-end stale sessions
    await prisma.liveQuizSession.update({
      where: { id: session.id },
      data: {
        status: "COMPLETED",
        endedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
```

---

### **Phase 4: Testing**

**4.1: Create Quiz Flow**

1. Sign in as instructor
2. Go to `/live-quiz`
3. Click "Create New Quiz"
4. Fill in title, select topic, choose questions
5. Submit → Should generate access code
6. Verify session created in database

**4.2: Join Quiz Flow**

1. Open incognito window
2. Go to `/live-quiz`
3. Enter access code from Step 1
4. Enter nickname
5. Join → Should see waiting room
6. Verify participant created in database

**4.3: Host Dashboard Flow**

1. As host, click "Host Quiz" for created session
2. Should see list of participants
3. Click "Start Quiz"
4. Should broadcast first question
5. Verify status changed to IN_PROGRESS

**4.4: Answer Flow**

1. As participant, select an answer
2. Submit answer
3. Should see "Answer submitted" confirmation
4. Verify answer saved in database
5. Check score updated

**4.5: Leaderboard Flow**

1. After all participants answer
2. Host clicks "Next Question"
3. Should show results and leaderboard
4. Verify scores calculated correctly

**4.6: End Quiz Flow**

1. After last question
2. Host clicks "End Quiz"
3. Should show final results
4. Status should be COMPLETED
5. Participants should see final leaderboard

---

## 🐛 Troubleshooting

### **Issue: Sessions not appearing in database**

**Solution:**

```bash
# Check if tables exist
npx prisma studio
# Look for LiveQuizSession, LiveQuizParticipant, LiveQuizAnswer

# If missing, run:
npx prisma db push
```

### **Issue: WebSocket connection fails**

**Solution:**

```typescript
// Check WebSocket manager initialization
// File: src/lib/live-quiz/websocket-manager.ts
// Ensure it's a singleton and properly initialized
```

### **Issue: Participants can't join**

**Solution:**

```typescript
// Check access code generation
// Should be 6 uppercase alphanumeric characters
// No ambiguous characters (0, O, I, 1)

function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
```

### **Issue: Answers not saving**

**Solution:**

```sql
-- Check unique constraint
-- Each participant can only answer each question once
-- Verify questionIndex matches
SELECT * FROM "LiveQuizAnswer"
WHERE "sessionId" = 'xxx'
AND "participantId" = 'yyy'
AND "questionIndex" = 0;
```

---

## 📈 Next Steps

1. ✅ **Complete Database Migration** (In Progress)
2. **Update API Routes** with proper field names
3. **Remove Debug Logs** from production code
4. **Add Session Cleanup** cron job
5. **Comprehensive Testing** of all flows
6. **Performance Testing** with 50+ participants
7. **Documentation** for instructors (how to host)
8. **Analytics Dashboard** for quiz insights

---

## 📚 Related Files

**Frontend:**

- `src/app/live-quiz/page.tsx` - Main landing page
- `src/app/live-quiz/create/page.tsx` - Create quiz form
- `src/app/live-quiz/join/[accessCode]/page.tsx` - Join quiz page
- `src/app/live-quiz/host/[sessionId]/page.tsx` - Host dashboard

**API Routes:**

- `src/app/api/live-quiz/create/route.ts` - Create session
- `src/app/api/live-quiz/join/[accessCode]/route.ts` - Join session
- `src/app/api/live-quiz/session/[sessionId]/route.ts` - Get session
- `src/app/api/live-quiz/session/[sessionId]/start/route.ts` - Start quiz
- `src/app/api/live-quiz/session/[sessionId]/next/route.ts` - Next question
- `src/app/api/live-quiz/session/[sessionId]/end/route.ts` - End quiz
- `src/app/api/live-quiz/session/[sessionId]/participant/[participantId]/answer/route.ts` - Submit answer

**Libraries:**

- `src/lib/live-quiz/websocket-manager.ts` - WebSocket handling
- `src/lib/live-quiz/performance-manager.ts` - Performance monitoring
- `src/lib/live-quiz/security-manager.ts` - Security checks
- `src/lib/live-quiz/session-state.ts` - State management
- `src/lib/live-quiz/error-handler.ts` - Error handling

**Database:**

- `prisma/schema.prisma` - Schema definition

---

**This is a comprehensive implementation guide for completing the ECCCO Live Quiz feature. Follow the phases in order for successful deployment!** 🚀
