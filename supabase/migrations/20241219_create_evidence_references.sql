-- Create evidence_references table for storing evidence library content
-- This replaces the hard-coded references in the React component

CREATE TABLE IF NOT EXISTS evidence_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Information
  reference_id VARCHAR(100) UNIQUE NOT NULL, -- e.g., "acls-2020", "clovers-trial-2023"
  category VARCHAR(255) NOT NULL, -- e.g., "Cardiac Arrest & Resuscitation"
  name TEXT NOT NULL, -- e.g., "2020 AHA Guidelines for CPR"
  organization TEXT, -- e.g., "American Heart Association"
  year INTEGER NOT NULL,
  
  -- Content
  summary TEXT NOT NULL,
  key_recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  clinical_pearls JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Evidence & Citation
  evidence_level VARCHAR(255) NOT NULL,
  citation TEXT NOT NULL,
  
  -- References (array of {title, journal, doi, url})
  references JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Additional Metadata
  topics JSONB DEFAULT '[]'::jsonb, -- e.g., ["ACLS", "CPR", "Cardiac Arrest Management"]
  journal VARCHAR(255),
  doi VARCHAR(255),
  pmid VARCHAR(50), -- PubMed ID for future integration
  
  -- Publishing & Workflow
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Audit Fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  
  -- Constraints
  CONSTRAINT valid_year CHECK (year >= 1900 AND year <= 2100)
);

-- Create indexes for common queries
CREATE INDEX idx_evidence_category ON evidence_references(category);
CREATE INDEX idx_evidence_year ON evidence_references(year DESC);
CREATE INDEX idx_evidence_published ON evidence_references(published) WHERE published = true;
CREATE INDEX idx_evidence_featured ON evidence_references(featured) WHERE featured = true;
CREATE INDEX idx_evidence_reference_id ON evidence_references(reference_id);
CREATE INDEX idx_evidence_display_order ON evidence_references(display_order);

-- GIN index for JSONB fields to enable efficient searching
CREATE INDEX idx_evidence_topics ON evidence_references USING GIN (topics);
CREATE INDEX idx_evidence_recommendations ON evidence_references USING GIN (key_recommendations);

-- Full-text search index
CREATE INDEX idx_evidence_search ON evidence_references USING GIN (
  to_tsvector('english', 
    COALESCE(name, '') || ' ' || 
    COALESCE(summary, '') || ' ' || 
    COALESCE(organization, '')
  )
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_evidence_references_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_evidence_references_updated_at
  BEFORE UPDATE ON evidence_references
  FOR EACH ROW
  EXECUTE FUNCTION update_evidence_references_updated_at();

-- Row Level Security (RLS) Policies
ALTER TABLE evidence_references ENABLE ROW LEVEL SECURITY;

-- Public can read published references
CREATE POLICY "Public can view published evidence"
  ON evidence_references
  FOR SELECT
  USING (published = true);

-- Authenticated users can view all references
CREATE POLICY "Authenticated users can view all evidence"
  ON evidence_references
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can insert/update/delete (we'll check admin role in app logic)
CREATE POLICY "Admins can manage evidence"
  ON evidence_references
  FOR ALL
  TO authenticated
  USING (
    -- Check if user has admin role (adjust based on your auth setup)
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.raw_user_meta_data->>'role' = 'admin'
        OR auth.users.email LIKE '%@admin.eccco%' -- Temporary admin check
      )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.raw_user_meta_data->>'role' = 'admin'
        OR auth.users.email LIKE '%@admin.eccco%'
      )
    )
  );

-- Create a view for public consumption (only published references)
CREATE OR REPLACE VIEW evidence_references_public AS
SELECT 
  id,
  reference_id,
  category,
  name,
  organization,
  year,
  summary,
  key_recommendations,
  clinical_pearls,
  evidence_level,
  citation,
  references,
  topics,
  display_order,
  created_at,
  updated_at
FROM evidence_references
WHERE published = true
ORDER BY display_order, year DESC, name;

-- Grant access to the view
GRANT SELECT ON evidence_references_public TO anon;
GRANT SELECT ON evidence_references_public TO authenticated;

-- Create function to get references by category
CREATE OR REPLACE FUNCTION get_evidence_by_category()
RETURNS TABLE (
  category TEXT,
  topics JSONB,
  guidelines JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    er.category,
    COALESCE(
      jsonb_agg(DISTINCT topic) FILTER (WHERE topic IS NOT NULL),
      '[]'::jsonb
    ) as topics,
    jsonb_agg(
      jsonb_build_object(
        'id', er.reference_id,
        'name', er.name,
        'organization', er.organization,
        'year', er.year,
        'summary', er.summary,
        'keyRecommendations', er.key_recommendations,
        'clinicalPearls', er.clinical_pearls,
        'evidenceLevel', er.evidence_level,
        'citation', er.citation,
        'references', er.references
      )
      ORDER BY er.display_order, er.year DESC
    ) as guidelines
  FROM evidence_references er
  CROSS JOIN LATERAL jsonb_array_elements_text(er.topics) as topic
  WHERE er.published = true
  GROUP BY er.category
  ORDER BY MIN(er.display_order);
END;
$$ LANGUAGE plpgsql STABLE;

GRANT EXECUTE ON FUNCTION get_evidence_by_category() TO anon;
GRANT EXECUTE ON FUNCTION get_evidence_by_category() TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE evidence_references IS 'Stores evidence-based medical references, guidelines, and trials for the evidence library';
COMMENT ON COLUMN evidence_references.reference_id IS 'Unique identifier used in URLs and code (e.g., acls-2020)';
COMMENT ON COLUMN evidence_references.key_recommendations IS 'Array of key recommendation strings';
COMMENT ON COLUMN evidence_references.clinical_pearls IS 'Array of clinical pearl strings (with emojis)';
COMMENT ON COLUMN evidence_references.references IS 'Array of reference objects with title, journal, doi, url fields';
COMMENT ON COLUMN evidence_references.display_order IS 'Order for displaying references (lower numbers appear first)';
