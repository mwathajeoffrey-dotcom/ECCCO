-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- Fix for Supabase Security Advisor warnings
-- ============================================

-- Enable RLS on all tables
ALTER TABLE "Bookmark" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EvidenceReference" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ExamAttempt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ExamSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Feedback" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Question" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuestionAttempt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuestionRating" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuizAttempt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Topic" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuizTemplate" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuizSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LiveQuizSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LiveQuizParticipant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Participant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Answer" ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES FOR PUBLIC READ-ONLY TABLES
-- (Content that anyone can read)
-- ============================================

-- Questions: Public read, no write
CREATE POLICY "Questions are viewable by everyone"
  ON "Question" FOR SELECT
  USING (true);

-- Topics: Public read, no write
CREATE POLICY "Topics are viewable by everyone"
  ON "Topic" FOR SELECT
  USING (true);

-- Evidence References: Public read, no write
CREATE POLICY "Evidence references are viewable by everyone"
  ON "EvidenceReference" FOR SELECT
  USING (true);

-- ============================================
-- POLICIES FOR USER-SPECIFIC DATA
-- (Users can only access their own data)
-- ============================================

-- Bookmarks: Users can only see/manage their own
CREATE POLICY "Users can view their own bookmarks"
  ON "Bookmark" FOR SELECT
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can create their own bookmarks"
  ON "Bookmark" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update their own bookmarks"
  ON "Bookmark" FOR UPDATE
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can delete their own bookmarks"
  ON "Bookmark" FOR DELETE
  USING (auth.uid()::text = "userId");

-- User Profile: Users can only access their own profile
CREATE POLICY "Users can view their own profile"
  ON "UserProfile" FOR SELECT
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can create their own profile"
  ON "UserProfile" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update their own profile"
  ON "UserProfile" FOR UPDATE
  USING (auth.uid()::text = "userId");

-- User: Users can view their own user record
CREATE POLICY "Users can view their own user record"
  ON "User" FOR SELECT
  USING (auth.uid()::text = "clerkUserId");

CREATE POLICY "Users can update their own user record"
  ON "User" FOR UPDATE
  USING (auth.uid()::text = "clerkUserId");

-- Question Attempts: Users can only see their own attempts
CREATE POLICY "Users can view their own question attempts"
  ON "QuestionAttempt" FOR SELECT
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can create their own question attempts"
  ON "QuestionAttempt" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

-- Exam Attempts: Users can only see their own exam attempts
CREATE POLICY "Users can view their own exam attempts"
  ON "ExamAttempt" FOR SELECT
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can create their own exam attempts"
  ON "ExamAttempt" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

-- Exam Sessions: Users can access their own sessions
CREATE POLICY "Users can view their own exam sessions"
  ON "ExamSession" FOR SELECT
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can create their own exam sessions"
  ON "ExamSession" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update their own exam sessions"
  ON "ExamSession" FOR UPDATE
  USING (auth.uid()::text = "userId");

-- Quiz Attempts: Users can only see their own attempts
CREATE POLICY "Users can view their own quiz attempts"
  ON "QuizAttempt" FOR SELECT
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can create their own quiz attempts"
  ON "QuizAttempt" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

-- Question Ratings: Users can view all ratings but only create/update their own
CREATE POLICY "Users can view all question ratings"
  ON "QuestionRating" FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own ratings"
  ON "QuestionRating" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update their own ratings"
  ON "QuestionRating" FOR UPDATE
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can delete their own ratings"
  ON "QuestionRating" FOR DELETE
  USING (auth.uid()::text = "userId");

-- ============================================
-- POLICIES FOR FEEDBACK (MIXED PERMISSIONS)
-- ============================================

-- Feedback: Users can create feedback, view their own
CREATE POLICY "Anyone can submit feedback"
  ON "Feedback" FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own feedback"
  ON "Feedback" FOR SELECT
  USING (auth.uid()::text = "userId" OR "userId" IS NULL);

-- ============================================
-- POLICIES FOR QUIZ ARENA (LIVE QUIZ SYSTEM)
-- ============================================

-- Quiz Sessions: Public read for joining, creator can manage
CREATE POLICY "Anyone can view active quiz sessions"
  ON "QuizSession" FOR SELECT
  USING (true);

CREATE POLICY "Users can create quiz sessions"
  ON "QuizSession" FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Host can update their own sessions"
  ON "QuizSession" FOR UPDATE
  USING (auth.uid()::text = "hostId");

CREATE POLICY "Host can delete their own sessions"
  ON "QuizSession" FOR DELETE
  USING (auth.uid()::text = "hostId");

-- Quiz Templates: Users can view public templates and manage their own
CREATE POLICY "Users can view public templates"
  ON "QuizTemplate" FOR SELECT
  USING ("isPublic" = true OR auth.uid()::text = "createdBy");

CREATE POLICY "Users can create their own templates"
  ON "QuizTemplate" FOR INSERT
  WITH CHECK (auth.uid()::text = "createdBy");

CREATE POLICY "Users can update their own templates"
  ON "QuizTemplate" FOR UPDATE
  USING (auth.uid()::text = "createdBy");

CREATE POLICY "Users can delete their own templates"
  ON "QuizTemplate" FOR DELETE
  USING (auth.uid()::text = "createdBy");

-- Participants: Anyone can join, participants can update themselves
CREATE POLICY "Anyone can view participants"
  ON "Participant" FOR SELECT
  USING (true);

CREATE POLICY "Anyone can join as participant"
  ON "Participant" FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Participants can update themselves"
  ON "Participant" FOR UPDATE
  USING (true); -- Note: In production, add participant ID check

-- Answers: Participants can submit answers, all can view
CREATE POLICY "Anyone can view answers"
  ON "Answer" FOR SELECT
  USING (true);

CREATE POLICY "Participants can submit answers"
  ON "Answer" FOR INSERT
  WITH CHECK (true);

-- LiveQuizSession (if exists): Similar to QuizSession
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'LiveQuizSession') THEN
        EXECUTE 'CREATE POLICY "Anyone can view live quiz sessions" ON "LiveQuizSession" FOR SELECT USING (true)';
        EXECUTE 'CREATE POLICY "Users can create live quiz sessions" ON "LiveQuizSession" FOR INSERT WITH CHECK (true)';
        EXECUTE 'CREATE POLICY "Host can update their live sessions" ON "LiveQuizSession" FOR UPDATE USING (auth.uid()::text = "hostId")';
    END IF;
END $$;

-- LiveQuizParticipant (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'LiveQuizParticipant') THEN
        EXECUTE 'CREATE POLICY "Anyone can view live quiz participants" ON "LiveQuizParticipant" FOR SELECT USING (true)';
        EXECUTE 'CREATE POLICY "Anyone can join as live participant" ON "LiveQuizParticipant" FOR INSERT WITH CHECK (true)';
    END IF;
END $$;

-- ============================================
-- GRANT APPROPRIATE PERMISSIONS
-- ============================================

-- Grant authenticated users access to tables
GRANT SELECT ON "Question" TO authenticated;
GRANT SELECT ON "Topic" TO authenticated;
GRANT SELECT ON "EvidenceReference" TO authenticated;
GRANT ALL ON "Bookmark" TO authenticated;
GRANT ALL ON "UserProfile" TO authenticated;
GRANT ALL ON "QuestionAttempt" TO authenticated;
GRANT ALL ON "ExamAttempt" TO authenticated;
GRANT ALL ON "ExamSession" TO authenticated;
GRANT ALL ON "QuizAttempt" TO authenticated;
GRANT ALL ON "QuestionRating" TO authenticated;
GRANT INSERT ON "Feedback" TO authenticated;
GRANT ALL ON "QuizSession" TO authenticated;
GRANT ALL ON "QuizTemplate" TO authenticated;
GRANT ALL ON "Participant" TO authenticated;
GRANT ALL ON "Answer" TO authenticated;

-- Grant anonymous users read access to public content
GRANT SELECT ON "Question" TO anon;
GRANT SELECT ON "Topic" TO anon;
GRANT SELECT ON "EvidenceReference" TO anon;
GRANT INSERT ON "Feedback" TO anon;
GRANT SELECT ON "QuizSession" TO anon;
GRANT INSERT, SELECT ON "Participant" TO anon;
GRANT INSERT, SELECT ON "Answer" TO anon;

-- ============================================
-- NOTES
-- ============================================
-- This migration enables RLS on all tables and sets up policies that:
-- 1. Allow public read access to questions, topics, and evidence
-- 2. Restrict user data to only the owning user
-- 3. Allow quiz arena functionality for both authenticated and anonymous users
-- 4. Protect sensitive user data while maintaining app functionality
--
-- After applying this migration, run: ALTER DEFAULT PRIVILEGES for future tables
-- ============================================
