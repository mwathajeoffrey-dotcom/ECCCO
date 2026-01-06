# Vercel Build Fixes - January 5, 2026

## Overview

Fixed multiple TypeScript build errors related to Prisma schema mismatches after creating the Feedback table. The issues stemmed from incorrect relation field names and missing required fields in Prisma create/update operations.

## Build Errors Fixed

### 1. Admin Users API - Relation Field Names

**Error:**

```
Type error: Property 'quizAttempts' does not exist on type 'User'
Line 43: quizAttempts: {
```

**Root Cause:**
The Prisma schema defines relations with capital letters (e.g., `QuizAttempt`, `ExamAttempt`, `QuestionAttempt`), but the code was using lowercase plural versions (`quizAttempts`, `examAttempts`, `questionAttempts`).

**Fix (Commit 573da91):**

- Changed all `quizAttempts` → `QuizAttempt`
- Changed all `examAttempts` → `ExamAttempt`
- Changed all `questionAttempts` → `QuestionAttempt`

**File:** `src/app/api/admin/users/route.ts`

---

### 2. Bookmark Creation - Missing Required Fields

**Error:**

```
Type error: Type '{ userId: any; questionId: any; category: any; notes: any; }' is missing the following properties from type 'BookmarkCreateInput': id, updatedAt, User
Line 67: create: {
```

**Root Cause:**
Bookmark model requires `id`, `createdAt`, and `updatedAt` fields, but they were not provided in the create operation.

**Bookmark Schema:**

```prisma
model Bookmark {
  id         String   @id
  userId     String
  questionId String
  category   String
  notes      String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime
  User       User     @relation(...)
}
```

**Fix (Commit 355e641):**

```typescript
create: {
  id: `${userId}_${questionId}_${Date.now()}`,
  userId,
  questionId,
  category: category || 'Unknown',
  notes: notes || '',
  createdAt: new Date(),
  updatedAt: new Date()
}
```

**File:** `src/app/api/bookmarks/route.ts`

---

### 3. Feedback Creation - Missing Required Fields

**Error:**
Same as Bookmark - missing `id`, `createdAt`, and `updatedAt`.

**Feedback Schema:**

```prisma
model Feedback {
  id         String    @id
  userId     String?
  userName   String?
  userEmail  String
  type       String
  category   String?
  subject    String
  message    String
  pageUrl    String?
  userAgent  String?
  status     String    @default("new")
  priority   String    @default("medium")
  assignedTo String?
  resolution String?
  resolvedAt DateTime?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime
}
```

**Fix (Commit 355e641):**

```typescript
const feedback = await prisma.feedback.create({
  data: {
    id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userName: userName || null,
    userEmail,
    type: type || "question",
    category,
    subject,
    message,
    pageUrl: pageUrl || null,
    userAgent: userAgent || null,
    status: "new",
    priority: determinePriority(type),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
});
```

**File:** `src/app/api/feedback/route.ts`

---

### 4. Profile API - Incorrect Relation Name

**Error:**

```
Type error: Object literal may only specify known properties, and 'profile' does not exist in type 'UserInclude<DefaultArgs>'.
Line 27: include: { profile: true }
```

**Root Cause:**
The User model relation is named `UserProfile` (capital letters), not `profile`.

**User Schema:**

```prisma
model User {
  id              String            @id
  clerkUserId     String            @unique
  email           String?           @unique
  createdAt       DateTime          @default(now())
  updatedAt       DateTime
  Bookmark        Bookmark[]
  ExamAttempt     ExamAttempt[]
  QuestionAttempt QuestionAttempt[]
  QuestionRating  QuestionRating[]
  QuizAttempt     QuizAttempt[]
  UserProfile     UserProfile?      // ← Correct name
}
```

**Fix (Commit 6db9bed):**

1. Changed `include: { profile: true }` → `include: { UserProfile: true }`
2. Changed `user.profile` → `user.UserProfile`
3. Added required fields to User.create():

   ```typescript
   user = await prisma.user.create({
     data: {
       id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
       clerkUserId: userId,
       createdAt: new Date(),
       updatedAt: new Date(),
     },
   });
   ```

4. Added required fields to UserProfile.create():

   ```typescript
   await prisma.userProfile.create({
     data: {
       id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
       userId: user.id,
       difficultyPreference: "medium",
       preferredMode: "practice",
       dailyGoal: 10,
       emailNotifications: true,
       weeklyDigest: true,
       createdAt: new Date(),
       updatedAt: new Date(),
     },
   });
   ```

5. Updated upsert to include required fields and updatedAt:
   ```typescript
   const profile = await prisma.userProfile.upsert({
     where: { userId: user.id },
     create: {
       id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
       userId: user.id,
       createdAt: new Date(),
       updatedAt: new Date(),
       ...profileData,
     },
     update: {
       ...profileData,
       updatedAt: new Date(),
     },
   });
   ```

**File:** `src/app/api/profile/route.ts`

---

## Pattern for ID Generation

For consistency, all generated IDs follow this pattern:

```typescript
`${modelName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
```

Examples:

- `feedback_1736102345678_a3k2j5h9d`
- `profile_1736102345678_k9d2j5a3h`
- `user_1736102345678_h5d9k2j3a`

## Commits

1. **573da91** - Fix Prisma relation field names in admin users API
2. **355e641** - Fix Prisma create operations - add required fields (Bookmark, Feedback)
3. **6db9bed** - Fix User and UserProfile Prisma operations

## Verification

After these fixes, the Vercel build should complete successfully. All Prisma operations now:

1. ✅ Use correct relation field names (matching schema exactly)
2. ✅ Provide all required fields (id, createdAt, updatedAt)
3. ✅ Include updatedAt in update operations
4. ✅ Follow consistent ID generation pattern

## Related Documents

- `FEEDBACK_TABLE_MISSING_FIX.md` - The original database table creation fix
- `PRISMA_SCHEMA_GUIDE.md` - (If needed) Schema reference guide

## Next Steps

Once Vercel deployment completes:

1. Test feedback submission at `/support`
2. Test user profile operations at `/profile`
3. Test admin users page at `/admin/users`
4. Test bookmark functionality
5. Verify all CRUD operations work correctly

## Lessons Learned

1. **Always match schema field names exactly** - Prisma is case-sensitive
2. **All @id fields must be provided** - Even with @default(uuid()), we're providing explicit IDs
3. **DateTime fields need explicit values** - Even with @default(now()), we're providing them
4. **Relation names matter** - Use capital letters as defined in schema (QuizAttempt, not quizAttempts)
5. **Update operations should include updatedAt** - Keep timestamps current
