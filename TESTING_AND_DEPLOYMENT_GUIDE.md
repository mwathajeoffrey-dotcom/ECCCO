# Testing & Deployment Guide - Clinical Evidence Synthesis

**Date**: January 14, 2026
**Status**: Pre-deployment Testing Phase

---

## 📋 Pre-Deployment Checklist

### Phase 1: Local Testing (30-45 minutes)

#### Step 1: System Requirements Check

```bash
# Run the automated test script
./test-clinical-synthesis.sh
```

**Expected Results:**

- ✅ Ollama installed and running
- ✅ Meditron model downloaded
- ✅ Meditron responds to test query
- ✅ All 6 TypeScript files present
- ✅ Next.js dev server accessible
- ✅ API endpoint responding

**If any checks fail**, see troubleshooting section below.

---

#### Step 2: Component Testing (Individual Files)

**Test 1: Journal Database**

```bash
# Create test file
cat > /tmp/test-journal-db.ts << 'EOF'
import { getJournalTier, getJournalBadge, isTopTierJournal } from './src/lib/evidence/journal-database';

console.log('Testing Journal Database...');
console.log('NEJM tier:', getJournalTier('New England Journal of Medicine')); // Should be 1
console.log('NEJM badge:', getJournalBadge('New England Journal of Medicine')); // Should be 'NEJM'
console.log('Is NEJM top tier?', isTopTierJournal('New England Journal of Medicine')); // Should be true
console.log('Unknown journal tier:', getJournalTier('Random Journal')); // Should be 4
console.log('✅ Journal Database Test Complete');
EOF

# Run with ts-node or tsx
npx tsx /tmp/test-journal-db.ts
```

**Expected Output:**

```
NEJM tier: 1
NEJM badge: NEJM
Is NEJM top tier? true
Unknown journal tier: 4
✅ Journal Database Test Complete
```

---

**Test 2: Quality Scorer**

```bash
cat > /tmp/test-quality-scorer.ts << 'EOF'
import { calculateClinicalQuality, filterForClinicalUse } from './src/lib/evidence/clinical-quality-scorer';

const testArticle = {
  journal: 'New England Journal of Medicine',
  citationCount: 850,
  published: '2021-06-15',
  type: 'randomized-controlled-trial',
  abstract: 'Test abstract',
};

console.log('Testing Quality Scorer...');
const quality = calculateClinicalQuality(testArticle as any);
console.log('Quality Score:', quality.totalScore); // Should be ~89
console.log('Grade:', quality.grade); // Should be A+ or A
console.log('Is Clinical Grade?', quality.isClinicalGrade); // Should be true
console.log('✅ Quality Scorer Test Complete');
EOF

npx tsx /tmp/test-quality-scorer.ts
```

**Expected Output:**

```
Quality Score: 89
Grade: A+
Is Clinical Grade? true
✅ Quality Scorer Test Complete
```

---

**Test 3: Meditron Client**

```bash
cat > /tmp/test-meditron.ts << 'EOF'
import { testMeditronConnection, isMeditronAvailable, callMeditron } from './src/lib/ai/meditron-client';

async function testMeditron() {
  console.log('Testing Meditron Client...');

  const isConnected = await testMeditronConnection();
  console.log('Ollama connected?', isConnected);

  const isAvailable = await isMeditronAvailable();
  console.log('Meditron available?', isAvailable);

  if (isAvailable) {
    const response = await callMeditron(
      'What is the first-line treatment for uncomplicated malaria? Answer in one sentence.',
      { maxTokens: 100 }
    );
    console.log('Meditron response:', response.slice(0, 100) + '...');
  }

  console.log('✅ Meditron Client Test Complete');
}

testMeditron();
EOF

npx tsx /tmp/test-meditron.ts
```

**Expected Output:**

```
Ollama connected? true
Meditron available? true
Meditron response: Artemisinin-based combination therapy (ACT) is the recommended first-line treatment for...
✅ Meditron Client Test Complete
```

---

#### Step 3: Integration Testing (API Routes)

**Test 1: API Health Check**

```bash
curl http://localhost:3000/api/evidence/synthesize | jq
```

**Expected Response:**

```json
{
  "message": "Evidence Synthesis API",
  "endpoint": "POST /api/evidence/synthesize",
  "parameters": { ... }
}
```

---

**Test 2: Simple Query (No AI)**

```bash
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "malaria treatment",
    "useAI": false,
    "maxArticles": 5
  }' | jq '.sections | length'
```

**Expected**: Should return number of sections (likely 1-2)

---

**Test 3: AI Synthesis (Full Flow)**

```bash
# Save response to file for inspection
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is the treatment for uncomplicated malaria?",
    "useAI": true,
    "minQualityScore": 75,
    "maxArticles": 15
  }' > /tmp/synthesis-response.json

# Check response structure
cat /tmp/synthesis-response.json | jq '{
  sections_count: .sections | length,
  references_count: .references | length,
  confidence: .metadata.confidenceScore,
  tier1_sources: .metadata.tier1Count,
  avg_quality: .metadata.avgQualityScore,
  used_ai: .metadata.usedAI
}'
```

**Expected Output:**

```json
{
  "sections_count": 2-4,
  "references_count": 10-15,
  "confidence": 80-90,
  "tier1_sources": 5-10,
  "avg_quality": 75-85,
  "used_ai": true
}
```

---

#### Step 4: UI Component Testing

**Option A: Storybook (Recommended)**

Create Storybook story:

```bash
cat > src/components/evidence/ClinicalSynthesisView.stories.tsx << 'EOF'
import type { Meta, StoryObj } from '@storybook/react';
import ClinicalSynthesisView from './ClinicalSynthesisView';

const meta: Meta<typeof ClinicalSynthesisView> = {
  title: 'Evidence/ClinicalSynthesisView',
  component: ClinicalSynthesisView,
};

export default meta;
type Story = StoryObj<typeof ClinicalSynthesisView>;

export const Default: Story = {
  args: {
    synthesis: {
      query: 'What is the treatment for uncomplicated malaria?',
      sections: [
        {
          heading: 'First-Line Treatment',
          paragraphs: [
            {
              text: 'Artemisinin-based combination therapy (ACT) is the recommended first-line treatment for uncomplicated malaria caused by P. falciparum. Artemether-lumefantrine is the most widely used ACT.',
              citations: [
                {
                  position: 100,
                  journalBadge: 'NEJM',
                  count: 1,
                  referenceIds: ['ref-1'],
                  color: 'green',
                },
                {
                  position: 200,
                  journalBadge: 'Lancet',
                  count: 2,
                  referenceIds: ['ref-2', 'ref-3'],
                  color: 'blue',
                },
              ],
            },
          ],
        },
      ],
      references: [
        {
          id: 'ref-1',
          title: 'Artemisinin-based combination therapy for uncomplicated malaria',
          authors: ['Smith J', 'Johnson A', 'Williams B'],
          journal: 'New England Journal of Medicine',
          year: 2021,
          doi: '10.1056/NEJMoa123456',
          pmid: '12345678',
          url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa123456',
          qualityScore: 89,
          evidenceLevel: 'IA',
        },
      ],
      metadata: {
        confidenceScore: 87,
        articlesAnalyzed: 12,
        tier1Count: 8,
        tier2Count: 4,
        avgQualityScore: 82,
        lastUpdated: new Date().toISOString(),
        usedAI: true,
      },
    },
  },
};
EOF

# Run Storybook (if installed)
npm run storybook
```

**Option B: Manual UI Test**

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/evidence-search`
3. Create a test page or integrate into existing page
4. Search for: "treatment for uncomplicated malaria"
5. Verify:
   - ✅ Multi-paragraph text renders
   - ✅ Journal badges appear inline
   - ✅ Correct colors (🔵 blue, 🔴 red, 🟢 green)
   - ✅ References section expands/collapses
   - ✅ Quality scores visible
   - ✅ Evidence levels shown
   - ✅ Thumbs up/down clickable

---

### Phase 2: Edge Case Testing (15-20 minutes)

**Test 1: No Results Found**

```bash
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "xyzabc123nonsensequery",
    "useAI": true
  }' | jq
```

**Expected**: 404 error with helpful message

---

**Test 2: Low Quality Results**

```bash
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "malaria",
    "useAI": true,
    "minQualityScore": 95,
    "maxArticles": 5
  }' | jq
```

**Expected**: Error about insufficient high-quality evidence

---

**Test 3: AI Unavailable (Stop Ollama)**

```bash
# Stop Ollama
pkill -f ollama

# Try synthesis
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "malaria treatment",
    "useAI": true
  }' | jq '.metadata.usedAI'

# Restart Ollama
ollama serve &
```

**Expected**: `usedAI: false`, fallback to structured summary

---

**Test 4: Very Long Query**

```bash
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is the detailed pathophysiology, clinical presentation, differential diagnosis, laboratory workup, imaging studies, treatment options including first-line, second-line, and adjunctive therapies, prognosis, and long-term management of uncomplicated malaria in adult patients?",
    "useAI": true
  }' | jq '.sections | length'
```

**Expected**: Should handle gracefully, return synthesized response

---

**Test 5: Empty Query**

```bash
curl -X POST http://localhost:3000/api/evidence/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "query": "",
    "useAI": true
  }' | jq
```

**Expected**: 400 error - "Query is required"

---

### Phase 3: Performance Testing (10 minutes)

**Test 1: Response Time**

```bash
# Test 5 queries and measure time
for i in {1..5}; do
  echo "Query $i:"
  time curl -X POST http://localhost:3000/api/evidence/synthesize \
    -H "Content-Type: application/json" \
    -d '{
      "query": "treatment for malaria",
      "useAI": true
    }' > /dev/null 2>&1
  echo ""
done
```

**Expected**: 15-25 seconds per query (search ~3s + AI ~10-15s + processing ~2s)

---

**Test 2: Concurrent Requests**

```bash
# Send 3 requests simultaneously
for i in {1..3}; do
  curl -X POST http://localhost:3000/api/evidence/synthesize \
    -H "Content-Type: application/json" \
    -d "{
      \"query\": \"malaria treatment test $i\",
      \"useAI\": false
    }" > /tmp/response-$i.json &
done

wait
echo "All requests complete"
ls -lh /tmp/response-*.json
```

**Expected**: All 3 requests complete successfully

---

### Phase 4: Integration Testing (20-30 minutes)

#### Step 1: Update Your Evidence Search Page

**File**: `/src/app/evidence-search/page.tsx`

Add the synthesis feature:

```typescript
// At the top with imports
import ClinicalSynthesisView from "@/components/evidence/ClinicalSynthesisView";
import type { ClinicalSynthesis } from "@/lib/evidence/clinical-synthesis-engine";

// Add state
const [synthesis, setSynthesis] = useState<ClinicalSynthesis | null>(null);
const [useSynthesis, setUseSynthesis] = useState(true);

// Update search handler
const handleSearch = async (query: string) => {
  setLoading(true);
  setError(null);

  try {
    if (useSynthesis) {
      // NEW: Call synthesis API
      const response = await fetch("/api/evidence/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          useAI: true,
          minQualityScore: 75,
          maxArticles: 15,
        }),
      });

      if (!response.ok) throw new Error("Synthesis failed");

      const data = await response.json();
      setSynthesis(data);
    } else {
      // EXISTING: Your current search logic
      // ... keep your existing code
    }
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

// In your render section
{
  synthesis && useSynthesis && <ClinicalSynthesisView synthesis={synthesis} />;
}
```

#### Step 2: Test Full User Flow

1. **Start Dev Server**

   ```bash
   npm run dev
   ```

2. **Open Evidence Search**

   - Navigate to: `http://localhost:3000/evidence-search`

3. **Test Queries**

   - ✅ "treatment for uncomplicated malaria"
   - ✅ "management of septic shock"
   - ✅ "diagnosis of acute appendicitis"
   - ✅ "antibiotic choice for pneumonia"
   - ✅ "thrombolysis in ischemic stroke"

4. **Verify Each Result**
   - Multi-paragraph synthesis
   - Inline journal badges
   - References expand/collapse
   - Quality scores visible
   - Confidence score shown
   - Loading states work
   - Error handling graceful

#### Step 3: Cross-Browser Testing

Test in:

- ✅ Chrome/Arc
- ✅ Safari
- ✅ Firefox
- ✅ Mobile Safari (iPhone)
- ✅ Mobile Chrome (Android)

Check:

- Layout responsive
- Badges render correctly
- Interactions work (expand/collapse, thumbs up/down)
- No console errors

---

## 🚀 Deployment Steps

### Option 1: Vercel (Recommended)

#### Prerequisites

1. **Environment Variables**

   Vercel dashboard → Your project → Settings → Environment Variables

   Add:

   ```
   OLLAMA_BASE_URL=https://your-ollama-server.com
   # OR leave blank to use localhost (won't work on Vercel serverless)
   ```

   **IMPORTANT**: Vercel serverless functions can't run Ollama locally. You have 3 options:

   **Option A**: Deploy Ollama on separate server (Railway, Fly.io, Render)

   ```bash
   # On your server
   curl -fsSL https://ollama.ai/install.sh | sh
   ollama serve
   ollama pull meditron:7b-instruct

   # Set public URL in Vercel env
   OLLAMA_BASE_URL=https://ollama.yourserver.com
   ```

   **Option B**: Use fallback mode (no AI, structured summary only)

   ```bash
   # No Ollama needed
   # System auto-falls back to structured summaries
   ```

   **Option C**: Use edge runtime with external Meditron API

   ```bash
   # Deploy Meditron as API on Hugging Face Inference
   # Set MEDITRON_API_URL env variable
   ```

2. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Add clinical evidence synthesis system"
   git push origin main
   ```

3. **Deploy to Vercel**

   ```bash
   # Install Vercel CLI if needed
   npm i -g vercel

   # Deploy
   vercel --prod
   ```

4. **Verify Deployment**

   ```bash
   # Test API
   curl https://your-app.vercel.app/api/evidence/synthesize | jq

   # Test synthesis (if Ollama available)
   curl -X POST https://your-app.vercel.app/api/evidence/synthesize \
     -H "Content-Type: application/json" \
     -d '{"query": "malaria treatment", "useAI": true}' | jq
   ```

---

### Option 2: Self-Hosted (VPS/Cloud)

**Best for**: Using Meditron AI (need persistent server)

#### Deploy to Railway/Fly.io/Render

**Railway** (Easiest):

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set OLLAMA_BASE_URL=http://localhost:11434

# Deploy
railway up
```

**Post-Deploy Setup** (SSH into server):

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Start Ollama as service
cat > /etc/systemd/system/ollama.service << 'EOF'
[Unit]
Description=Ollama Service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/ollama serve
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl enable ollama
systemctl start ollama

# Install Meditron
ollama pull meditron:7b-instruct

# Verify
curl http://localhost:11434/api/tags
```

---

### Option 3: Docker Deployment

**File**: Already exists - `Dockerfile` and `docker-compose.yml`

Add Ollama service to `docker-compose.yml`:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    depends_on:
      - ollama

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama-data:/root/.ollama
    command: serve

volumes:
  ollama-data:
```

Deploy:

```bash
# Build and start
docker-compose up -d

# Install Meditron in Ollama container
docker exec -it eccco-ollama-1 ollama pull meditron:7b-instruct

# Verify
curl http://localhost:3000/api/evidence/synthesize
```

---

## ✅ Post-Deployment Verification

### Automated Test Suite

Create test file:

```bash
cat > test-production.sh << 'BASH'
#!/bin/bash

# Production URL
PROD_URL="${1:-https://your-app.vercel.app}"

echo "Testing production deployment: $PROD_URL"
echo "=========================================="
echo ""

# Test 1: API Health
echo "1. API Health Check"
HEALTH=$(curl -s "$PROD_URL/api/evidence/synthesize" | jq -r '.message')
if [ "$HEALTH" = "Evidence Synthesis API" ]; then
  echo "✅ API is healthy"
else
  echo "❌ API health check failed"
  exit 1
fi

# Test 2: Simple Query
echo ""
echo "2. Simple Query Test"
RESPONSE=$(curl -s -X POST "$PROD_URL/api/evidence/synthesize" \
  -H "Content-Type: application/json" \
  -d '{"query": "malaria treatment", "useAI": false, "maxArticles": 5}')

SECTIONS=$(echo "$RESPONSE" | jq -r '.sections | length')
if [ "$SECTIONS" -gt 0 ]; then
  echo "✅ Query successful ($SECTIONS sections)"
else
  echo "❌ Query failed"
  echo "$RESPONSE" | jq
  exit 1
fi

# Test 3: AI Synthesis (if Ollama available)
echo ""
echo "3. AI Synthesis Test"
AI_RESPONSE=$(curl -s -X POST "$PROD_URL/api/evidence/synthesize" \
  -H "Content-Type: application/json" \
  -d '{"query": "malaria treatment", "useAI": true}')

USED_AI=$(echo "$AI_RESPONSE" | jq -r '.metadata.usedAI')
echo "Used AI: $USED_AI"
if [ "$USED_AI" = "true" ] || [ "$USED_AI" = "false" ]; then
  echo "✅ AI synthesis working (fallback: $([ "$USED_AI" = "false" ] && echo "yes" || echo "no"))"
else
  echo "⚠️  AI synthesis may have issues"
fi

echo ""
echo "=========================================="
echo "✅ All production tests passed!"
BASH

chmod +x test-production.sh

# Run tests
./test-production.sh https://your-app.vercel.app
```

---

## 🐛 Troubleshooting

### Issue: "Meditron not available" in production

**Solution**:

1. Check Ollama is running: `curl $OLLAMA_BASE_URL/api/tags`
2. Verify network connectivity from app to Ollama
3. Check environment variable: `echo $OLLAMA_BASE_URL`
4. Fallback will activate automatically (structured summaries)

### Issue: Slow response times (>30s)

**Solution**:

1. Use smaller model: `meditron:7b-instruct` (not 70b)
2. Reduce `maxArticles`: 10 instead of 15
3. Add caching layer (Redis)
4. Consider streaming responses

### Issue: Out of memory errors

**Solution**:

1. Meditron 7B needs 8GB RAM minimum
2. Meditron 70B needs 48GB RAM minimum
3. Use fallback mode if insufficient memory
4. Upgrade server resources

### Issue: TypeScript errors after deployment

**Solution**:

```bash
# Check build locally first
npm run build

# If errors, fix them
npm run type-check

# Then deploy
```

---

## 📊 Monitoring & Analytics

### Add Logging

Update API route:

```typescript
// In /api/evidence/synthesize/route.ts
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const headersList = headers();
  const userAgent = headersList.get("user-agent");

  try {
    // ... your existing code

    const duration = Date.now() - startTime;
    console.log("[Analytics]", {
      query,
      useAI,
      duration,
      articlesFound: searchResults.length,
      synthesisSuccessful: true,
      userAgent,
    });

    return NextResponse.json(synthesis);
  } catch (error) {
    console.error("[Analytics]", {
      query,
      duration: Date.now() - startTime,
      error: error.message,
      userAgent,
    });
    // ... error handling
  }
}
```

### Track Usage

Consider adding:

- Vercel Analytics
- PostHog (open source)
- Plausible Analytics
- Custom database logging

---

## 🎯 Success Metrics

Track these KPIs:

- ✅ Query success rate (>95%)
- ✅ Average response time (<20s)
- ✅ AI synthesis usage (% of queries)
- ✅ User satisfaction (thumbs up/down ratio)
- ✅ Top queries (what are users asking?)
- ✅ Error rate (<5%)

---

## 📝 Summary Checklist

### Pre-Deployment

- [ ] Run `./test-clinical-synthesis.sh`
- [ ] Test all API endpoints
- [ ] Test UI components
- [ ] Test edge cases
- [ ] Test performance
- [ ] Cross-browser testing
- [ ] Mobile responsive testing

### Deployment

- [ ] Choose deployment platform
- [ ] Set up Ollama (if using AI)
- [ ] Configure environment variables
- [ ] Deploy application
- [ ] Run production tests
- [ ] Monitor logs for errors

### Post-Deployment

- [ ] Verify API health
- [ ] Test queries in production
- [ ] Monitor performance
- [ ] Set up analytics
- [ ] Document known issues
- [ ] Create user guide

---

## 🚀 Ready to Deploy?

**Quick Deployment Command** (Vercel):

```bash
# 1. Ensure tests pass
./test-clinical-synthesis.sh

# 2. Build locally
npm run build

# 3. Deploy
vercel --prod

# 4. Test production
./test-production.sh $(vercel --prod 2>&1 | grep -o 'https://[^ ]*')
```

**You're ready!** 🎉

Next: See `CLINICAL_SYNTHESIS_COMPLETE.md` for feature roadmap.
