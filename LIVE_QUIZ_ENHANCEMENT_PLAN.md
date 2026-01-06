# Live Quiz Enhancement Plan
**Date:** January 6, 2026  
**Status:** In Progress

## 🎯 Objectives
Transform the live quiz system into a fully-featured Kahoot-style experience with comprehensive settings, templates, animations, and real-time features.

## ✅ Phase 1: UI Fixes (PRIORITY)
### Issues to Fix
1. **Dropdown Button Issues**
   - Topic dropdown not showing properly
   - Filter difficulty dropdown positioning/z-index issues
   - Select component max-height causing overflow

2. **Filter Difficulty Button**
   - Button not visible or clickable
   - Dropdown menu positioning

### Solutions
- Fix SelectContent z-index and positioning
- Remove conflicting max-height constraints
- Add proper portal rendering for dropdowns
- Ensure proper stacking context

## 🚀 Phase 2: Quiz Settings & Configuration
### Features to Implement

#### 2.1 Points Per Question
- ✅ Schema field: `pointsPerQuestion` (default: 1000)
- Add UI control in create page
- Display in host view
- Calculate scores based on points + time bonus

#### 2.2 Time Limits Per Question
- ✅ Schema field: `timePerQuestion` (default: 30 seconds)
- Add UI control (15s, 30s, 45s, 60s, 90s, 120s)
- Show countdown timer during quiz
- Auto-submit when time expires

#### 2.3 Show Correct Answers
- ✅ Schema field: `showCorrectAnswers` (default: true)
- Toggle in settings
- Display after each question
- Show explanation if enabled

#### 2.4 Sound Effects
- ✅ Schema field: `playSound` (default: false)
- Toggle in settings
- Add sounds for:
  - Countdown tick
  - Correct answer
  - Wrong answer
  - Time's up
  - Quiz start/end

## 🎨 Phase 3: Lobby & Waiting Experience

### 3.1 Lobby Animations
- Animated waiting screen for participants
- Pulse effect on "Waiting for host..."
- Participant count updates
- Confetti animation when quiz starts

### 3.2 Copy Access Code Button
- One-click copy button
- Toast notification on copy
- Share via QR code
- Share link option

### 3.3 Share Quiz Link
- Generate shareable URL: `/live-quiz/join?code=XXXXXX`
- Copy link button
- QR code generation
- Social media share buttons (optional)

## 📝 Phase 4: Quiz Templates

### 4.1 Save Quiz Template
- ✅ Schema: `QuizTemplate` model
- Save current quiz configuration
- Name and describe template
- Public/private toggle
- Template library view

### 4.2 Load Template
- Browse saved templates
- One-click load
- Edit before creating
- Template usage tracking

### 4.3 Auto-Generate Quiz Title
- Format: "{Topic} - {Count}Q Quiz"
- Examples:
  - "Cardiac Emergencies - 20Q Quiz"
  - "BLS - 10Q Quick Quiz"
  - "ACLS - 30Q Practice"
- Auto-fill based on selection
- Editable by user

## ⏱️ Phase 5: Host Controls Enhancement

### 5.1 Question Timer Countdown
- Large visual timer
- Color changes (green → yellow → red)
- Progress bar
- Time remaining for all participants

### 5.2 Skip Question
- Skip button for host
- Confirmation dialog
- Mark as skipped in results
- Move to next question

### 5.3 Pause/Resume
- ✅ Schema field: `status` includes "PAUSED"
- ✅ Schema field: `pausedAt`
- Pause button during quiz
- Freeze all participant screens
- Resume countdown
- Track pause duration

### 5.4 Real-Time Leaderboard
- Top 10 participants
- Live score updates
- Position changes animation
- Show after each question
- Final leaderboard at end

## 🎮 Phase 6: Participant Experience

### 6.1 Show Correct Answer
- Display after answering
- Highlight correct option in green
- Show wrong selection in red
- Display explanation
- Show reference links

### 6.2 Score/Ranking Display
- Current score
- Current position
- Points earned this question
- Time bonus indicator
- Streak indicator (consecutive correct)

### 6.3 Sound Effects & Animations
- Correct answer: Success sound + confetti
- Wrong answer: Buzz sound + shake
- Time running out: Tick sound
- Leaderboard reveal: Drum roll
- Victory podium animation

### 6.4 Mobile Responsiveness
- Touch-friendly answer buttons
- Optimized layouts for mobile
- Prevent zoom on tap
- Landscape mode support
- PWA install prompt

## 📊 Phase 7: Preview Mode

### 7.1 Quiz Preview
- Preview all questions before creating
- See question difficulty distribution
- Review time limits
- Test settings
- Edit questions inline

### 7.2 Question Preview Cards
- Question text
- All options
- Correct answer indicator
- Difficulty badge
- Topic badge
- Reorder questions (drag-drop)

## 🎯 Implementation Order

### Sprint 1: Critical UI Fixes (Day 1)
1. Fix dropdown positioning issues
2. Fix filter difficulty button
3. Test on mobile devices

### Sprint 2: Core Settings (Day 1-2)
1. Quiz settings UI
2. Points per question
3. Time limits per question
4. Auto-generate title
5. Copy access code button

### Sprint 3: Enhanced Features (Day 2-3)
1. Quiz templates (save/load)
2. Share quiz link
3. Preview mode
4. Skip question
5. Pause/resume

### Sprint 4: Real-Time Features (Day 3-4)
1. Question timer countdown
2. Real-time leaderboard
3. Live score updates
4. Answer reveal animations

### Sprint 5: Participant Polish (Day 4-5)
1. Show correct answer with explanation
2. Score/ranking display
3. Sound effects
4. Animations (confetti, shake, etc.)
5. Lobby animations

### Sprint 6: Mobile & Final Polish (Day 5-6)
1. Mobile responsiveness fixes
2. Touch optimizations
3. PWA features
4. Performance optimizations
5. End-to-end testing

## 📦 New Dependencies Needed

```json
{
  "react-confetti": "^6.1.0",
  "react-qr-code": "^2.0.12",
  "use-sound": "^4.0.1",
  "framer-motion": "^10.16.16",
  "react-hot-toast": "^2.4.1",
  "react-beautiful-dnd": "^13.1.1"
}
```

## 🎵 Sound Assets Needed
- `sounds/countdown-tick.mp3`
- `sounds/correct-answer.mp3`
- `sounds/wrong-answer.mp3`
- `sounds/times-up.mp3`
- `sounds/quiz-start.mp3`
- `sounds/drum-roll.mp3`

## 🎨 Animation Assets
- Confetti particles
- Trophy/medal icons
- Progress bars
- Pulse effects
- Shake animations

## 📝 API Routes to Create/Update

1. `POST /api/live-quiz/templates` - Save template
2. `GET /api/live-quiz/templates` - List templates
3. `GET /api/live-quiz/templates/[id]` - Get template
4. `DELETE /api/live-quiz/templates/[id]` - Delete template
5. `PATCH /api/live-quiz/sessions/[id]/pause` - Pause quiz
6. `PATCH /api/live-quiz/sessions/[id]/resume` - Resume quiz
7. `PATCH /api/live-quiz/sessions/[id]/skip` - Skip question

## 🧪 Testing Checklist

- [ ] Quiz creation with all settings
- [ ] Template save/load
- [ ] Copy access code
- [ ] Share quiz link
- [ ] Preview mode
- [ ] Host controls (pause/resume/skip)
- [ ] Timer countdown
- [ ] Real-time leaderboard
- [ ] Participant answer flow
- [ ] Sound effects
- [ ] Animations
- [ ] Mobile responsiveness
- [ ] Multiple participants simultaneously
- [ ] Edge cases (disconnections, rejoins)

## 🚀 Success Metrics

- Quiz creation time < 2 minutes
- Zero UI/UX bugs
- Mobile-first design
- Real-time updates < 1 second latency
- Smooth animations (60fps)
- Kahoot-level user experience

---

**Next Steps:** Start with Sprint 1 - Fix UI issues immediately, then proceed with feature implementation.
