-- Add clinical_notes table to store user notes from evidence searches
-- This enables users to document findings, track evolving understanding, and build personal knowledge base

CREATE TABLE IF NOT EXISTS clinical_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- Clerk user ID

  -- Note content
  title TEXT NOT NULL, -- Usually the search query
  content TEXT NOT NULL, -- User's notes (markdown supported)
  tags TEXT[] DEFAULT '{}', -- Searchable tags (e.g., ["sepsis", "emergency", "ICU"])

  -- Source reference (links back to the search)
  search_query TEXT NOT NULL, -- Original search query
  search_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- When they searched
  evidence_summary TEXT, -- Optional: Store the AI synthesis they were reading

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Soft delete support
  deleted_at TIMESTAMP WITH TIME ZONE,

  -- Clinical context (optional enrichment)
  specialty TEXT, -- e.g., "Emergency Medicine", "ICU", "Cardiology"
  patient_context TEXT, -- e.g., "Elderly patient with comorbidities"

  -- Versioning support (for tracking guideline updates)
  version INTEGER DEFAULT 1,
  previous_version_id UUID REFERENCES clinical_notes(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_clinical_notes_user_id ON clinical_notes(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_clinical_notes_search_query ON clinical_notes(search_query) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_clinical_notes_tags ON clinical_notes USING GIN(tags) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_clinical_notes_created_at ON clinical_notes(created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_clinical_notes_updated_at ON clinical_notes(updated_at DESC) WHERE deleted_at IS NULL;

-- Full-text search support
CREATE INDEX IF NOT EXISTS idx_clinical_notes_content_search
  ON clinical_notes USING GIN(to_tsvector('english', content || ' ' || title))
  WHERE deleted_at IS NULL;

-- Row Level Security (RLS)
ALTER TABLE clinical_notes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own notes
CREATE POLICY "Users can view their own clinical notes"
  ON clinical_notes
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid()::text);

-- Policy: Users can create their own notes
CREATE POLICY "Users can create their own clinical notes"
  ON clinical_notes
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid()::text);

-- Policy: Users can update their own notes
CREATE POLICY "Users can update their own clinical notes"
  ON clinical_notes
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

-- Policy: Users can soft-delete their own notes
CREATE POLICY "Users can delete their own clinical notes"
  ON clinical_notes
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid()::text AND deleted_at IS NULL)
  WITH CHECK (user_id = auth.uid()::text);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_clinical_notes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_clinical_notes_updated_at
  BEFORE UPDATE ON clinical_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_clinical_notes_updated_at();

-- Comments for documentation
COMMENT ON TABLE clinical_notes IS 'User-created notes from evidence searches - enables active learning and knowledge building';
COMMENT ON COLUMN clinical_notes.user_id IS 'Clerk user ID - owner of the note';
COMMENT ON COLUMN clinical_notes.search_query IS 'Original search query that led to this note';
COMMENT ON COLUMN clinical_notes.tags IS 'User-defined tags for organization and search';
COMMENT ON COLUMN clinical_notes.version IS 'Version number - increments when note is updated with new evidence';
COMMENT ON COLUMN clinical_notes.previous_version_id IS 'Links to previous version for audit trail';
