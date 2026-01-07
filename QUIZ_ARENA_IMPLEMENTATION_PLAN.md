# Live Quiz Arena - Complete Implementation Plan

## Overview
A live, competitive, multiplayer quiz platform for medical education with real-time scoring, leaderboards, countdown timers, music, and engagement features.

## Core Features

### 1. **Host Experience**
- Create quiz sessions with custom or database questions
- Generate unique join codes (6-digit codes)
- Control quiz flow (start, pause, next question, end)
- Real-time participant monitoring
- Live leaderboard view
- Question preview before showing to participants

### 2. **Participant Experience**
- Join with simple code (no login required for guests)
- Colorful, engaging lobby with participant list
- Large, tappable answer buttons (A, B, C, D)
- Countdown timer for each question
- Instant feedback (correct/incorrect)
- Points based on speed + correctness
- Live leaderboard after each question
- Celebratory animations for winners
- Sound effects and background music

### 3. **Question Management**
- **Option 1**: Select from existing question database (839 questions)
- **Option 2**: Create custom questions on-the-fly
- Support for 2-6 answer options
- Image support for questions
- Time limit per question (10-60 seconds)
- Point values (100-2000 points)

### 4. **Scoring System**
- Base points for correct answers
- Speed bonus (faster = more points)
- Streak multipliers (consecutive correct answers)
- Wrong answer penalties (optional)
- Final rankings with podium (1st, 2nd, 3rd)

### 5. **Engagement Features**
- 🎵 Background music (toggle on/off)
- 🔊 Sound effects (correct, wrong, countdown)
- 🎉 Celebration animations
- 🏆 Achievement badges (speed demon, perfect score, comeback king)
- 📊 Live statistics (accuracy, response time)
- 💬 Emoji reactions during gameplay

## Technical Architecture

### Database Schema

```prisma
// Quiz Session
model QuizSession {
  id                String              @id @default(cuid())
  title             String
  description       String?
  accessCode        String              @unique // 6-digit code
  hostId            String              // User who created it
  
  // Session State
  status            SessionStatus       @default(LOBBY)
  currentQuestion   Int                 @default(0)
  
  // Settings
  timePerQuestion   Int                 @default(20) // seconds
  pointsPerQuestion Int                 @default(1000)
  playMusic         Boolean             @default(true)
  playSound         Boolean             @default(true)
  showAnswerAfter   Boolean             @default(true)
  allowLateJoin     Boolean             @default(false)
  
  // Questions (JSON array of question IDs or custom questions)
  questions         Json
  
  // Timestamps
  startedAt         DateTime?
  endedAt           DateTime?
  createdAt         DateTime            @default(now())
  
  // Relations
  participants      Participant[]
  answers           Answer[]
  
  @@index([accessCode])
  @@index([hostId])
  @@index([status])
}

enum SessionStatus {
  LOBBY           // Waiting for participants
  QUESTION        // Showing question
  ANSWER          // Showing answer/results
  LEADERBOARD     // Showing leaderboard
  FINISHED        // Quiz ended
}

// Participant
model Participant {
  id            String       @id @default(cuid())
  sessionId     String
  nickname      String
  avatar        String?      // Color or emoji
  score         Int          @default(0)
  streak        Int          @default(0)
  rank          Int?
  isActive      Boolean      @default(true)
  joinedAt      DateTime     @default(now())
  
  // Relations
  session       QuizSession  @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  answers       Answer[]
  
  @@index([sessionId])
}

// Answer
model Answer {
  id              String       @id @default(cuid())
  sessionId       String
  participantId   String
  questionIndex   Int
  selectedOption  Int          // 0, 1, 2, 3, etc.
  isCorrect       Boolean
  timeToAnswer    Int          // milliseconds
  pointsEarned    Int
  answeredAt      DateTime     @default(now())
  
  // Relations
  session         QuizSession  @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  participant     Participant  @relation(fields: [participantId], references: [id], onDelete: Cascade)
  
  @@unique([sessionId, participantId, questionIndex])
  @@index([sessionId])
  @@index([participantId])
}
```

### Page Structure

```
src/app/quiz-arena/
├── page.tsx                          # Landing/Dashboard
├── create/
│   └── page.tsx                      # Create new quiz
├── host/
│   └── [sessionId]/
│       └── page.tsx                  # Host control panel
├── join/
│   └── page.tsx                      # Enter join code
└── play/
    └── [accessCode]/
        └── page.tsx                  # Participant game view
```

### API Routes

```
src/app/api/quiz-arena/
├── create/route.ts                   # POST - Create session
├── join/route.ts                     # POST - Join session
├── session/
│   └── [sessionId]/
│       ├── route.ts                  # GET - Session details
│       ├── start/route.ts            # POST - Start quiz
│       ├── next/route.ts             # POST - Next question
│       ├── answer/route.ts           # POST - Submit answer
│       ├── end/route.ts              # POST - End quiz
│       └── state/route.ts            # GET - Real-time state (SSE)
└── code/
    └── [code]/route.ts               # GET - Session by code
```

## UI/UX Design

### Color Scheme (Vibrant & Engaging)
```typescript
const colors = {
  primary: '#6366F1',      // Indigo
  success: '#10B981',      // Green
  error: '#EF4444',        // Red
  warning: '#F59E0B',      // Amber
  
  answers: {
    A: '#EF4444',         // Red
    B: '#3B82F6',         // Blue
    C: '#F59E0B',         // Amber
    D: '#10B981',         // Green
    E: '#8B5CF6',         // Purple
    F: '#EC4899',         // Pink
  }
}
```

### Key Components

1. **JoinCodeInput** - Large, animated code entry
2. **ParticipantAvatar** - Colorful user icons
3. **CountdownTimer** - Circular progress timer
4. **AnswerButton** - Large, colorful, tappable
5. **Leaderboard** - Animated rankings with podium
6. **QuestionCard** - Clean question display
7. **ScoreBadge** - Points earned animation
8. **StreakIndicator** - Fire emoji + count
9. **MusicToggle** - Background music control
10. **HostControls** - Admin panel for host

## Implementation Phases

### Phase 1: Core Setup ✅ (Start Here)
- [ ] Database schema
- [ ] Basic page structure
- [ ] API routes skeleton
- [ ] Session creation
- [ ] Join code generation

### Phase 2: Host Experience
- [ ] Quiz creation interface
- [ ] Question selection from database
- [ ] Custom question builder
- [ ] Host control panel
- [ ] Session state management

### Phase 3: Participant Experience
- [ ] Join flow with code
- [ ] Lobby with participant list
- [ ] Question display
- [ ] Answer submission
- [ ] Results view

### Phase 4: Real-time Features
- [ ] WebSocket or Server-Sent Events
- [ ] Live participant updates
- [ ] Synchronized question display
- [ ] Real-time scoring
- [ ] Live leaderboard

### Phase 5: Engagement Features
- [ ] Background music
- [ ] Sound effects
- [ ] Animations (confetti, streaks)
- [ ] Achievement badges
- [ ] Emoji reactions

### Phase 6: Advanced Features
- [ ] Question images
- [ ] Custom timer per question
- [ ] Team mode
- [ ] Question reports
- [ ] Session replay

## Key Interactions

### Host Flow:
1. Create Quiz → Select Questions → Generate Code
2. Wait in Lobby (see participants joining)
3. Start Quiz → Show Question
4. Wait for answers → Show Results
5. Show Leaderboard → Next Question
6. Repeat until done → Final Results

### Participant Flow:
1. Enter Code → Enter Nickname
2. Wait in Lobby (see other participants)
3. See Question → Select Answer
4. See if Correct + Points Earned
5. See Leaderboard Position
6. Next Question
7. Final Results + Rank

## Scoring Formula

```typescript
function calculatePoints(
  isCorrect: boolean,
  timeToAnswer: number, // ms
  timeLimit: number,    // ms
  basePoints: number,
  streak: number
): number {
  if (!isCorrect) return 0;
  
  // Speed bonus (0-50% extra points)
  const timeRatio = timeToAnswer / timeLimit;
  const speedBonus = Math.max(0, 1 - timeRatio) * 0.5;
  
  // Streak multiplier
  const streakMultiplier = 1 + (Math.min(streak, 10) * 0.1);
  
  return Math.round(
    basePoints * (1 + speedBonus) * streakMultiplier
  );
}
```

## Real-time State Management

Use **Server-Sent Events (SSE)** for simplicity:

```typescript
// Host and participants subscribe to session updates
GET /api/quiz-arena/session/[sessionId]/state

// Events sent:
- participant_joined
- participant_left
- question_started
- answer_submitted
- question_ended
- leaderboard_updated
- session_ended
```

## Next Steps

Ready to implement? I'll start with:

1. ✅ Database schema (Prisma models)
2. ✅ Create quiz page (host)
3. ✅ Join page (participant)
4. ✅ Basic API routes
5. ✅ Real-time updates

**Should I proceed with Phase 1?** 🚀
