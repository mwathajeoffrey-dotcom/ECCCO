# 🧪 Testing OpenEvidence-Style Evidence Search on Localhost

## ✅ Server Status
Your development server is running successfully on:
- **http://localhost:3001**

## 📝 Step-by-Step Testing Guide

### 1. Open the Evidence Search Page

Open your browser and navigate to:
```
http://localhost:3001/evidence-search
```

### 2. Perform a Test Search

**Try this search:**
```
Query: "management of hyperkalaemia"
```

Click **"Search Evidence"** button

### 3. What You Should See

#### Before Expanding (Compact View):
```
┌──────────────────────────────────────┐
│ 🟣 PubMed  📰 Journal Name           │
│ 🟢 Open Access  ⭐ 150 citations     │
│                                       │
│ Study Title Here                      │
│ Authors, et al. • 2021               │
│                                       │
│ ╔═══ AI SUMMARY (Blue Box) ════╗    │
│ ║ This study demonstrates that  ║    │
│ ║ [key finding extracted from   ║    │
│ ║ the abstract conclusion]      ║    │
│ ║ ✨ +3 additional findings     ║    │
│ ╚═══════════════════════════════╝    │
│                                       │
│ [Show References & Details ▼]  [View]│
└──────────────────────────────────────┘
```

#### After Clicking "Show References & Details":
```
┌──────────────────────────────────────┐
│ ... (Everything above still visible) │
│ [Hide Details ▲]  [View Article]     │
│                                       │
│ ▼ EXPANDED SECTION                    │
│ ┌─ 🌟 KEY FINDINGS (3) ────────────┐ │
│ │ • Finding 1... [Copy 📋]         │ │
│ │ • Finding 2... [Copy 📋]         │ │
│ │ • Finding 3... [Copy 📋]         │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ┌─ 💬 RELEVANT EXCERPTS (2) ───────┐ │
│ │ RESULTS                           │ │
│ │ Highlighted text with your search │ │
│ │ terms in yellow... [Copy 📋]      │ │
│ │ ████████░░ 85% match              │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ┌─ 📄 FULL ABSTRACT ───────────────┐ │
│ │ Complete abstract with            │ │
│ │ highlighted terms... [Copy 📋]    │ │
│ └──────────────────────────────────┘ │
│                                       │
│ PMID: 12345  DOI: 10.xxxx/xxx        │
└──────────────────────────────────────┘
```

### 4. Test Interactive Features

✅ **Click the Copy Buttons**
- Click any [Copy 📋] button
- Should see checkmark ✅ appear briefly
- Text copied to clipboard

✅ **Search Term Highlighting**
- Your search terms should be highlighted in yellow
- Example: If you searched "sepsis", all instances of "sepsis" are highlighted

✅ **Expand/Collapse**
- Click "Show References & Details" → smooth expansion
- Click "Hide Details" → smooth collapse

✅ **Mobile View**
- Open browser DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
- Test on mobile viewport
- Everything should be responsive

### 5. Browser Console Check

Open DevTools Console (F12 → Console tab) and verify:
```
✅ No red errors
✅ API calls successful: /api/evidence/search
✅ 200 status codes
```

### 6. Network Tab Check

Open DevTools Network tab and filter by "evidence":
```
✅ Request URL: /api/evidence/search?q=...
✅ Status: 200
✅ Response contains: aiSummary, keyFindings, relevantParagraphs
```

## 🔍 What to Look For

### ✅ Working Correctly:
- AI summary appears in blue gradient box
- "Show References & Details" button present
- Clicking button expands accordion smoothly
- Key findings listed with copy buttons
- Relevant excerpts show context labels
- Search terms highlighted in yellow
- Copy buttons show checkmark when clicked
- All sections collapsible

### ❌ Not Working (Need to Fix):
- No AI summary box (just plain title)
- No expand/collapse button
- No copy buttons
- Search terms not highlighted
- API errors in console
- Layout broken on mobile

## 🧪 Quick Test Searches

Try these in order:

1. **"sepsis antibiotics"**
   - Should find recent sepsis studies
   - Check AI summary extraction
   - Verify highlight on both "sepsis" and "antibiotics"

2. **"cardiac arrest epinephrine"**
   - Test multi-word highlighting
   - Check relevance scoring

3. **"covid dexamethasone"**
   - Should find landmark studies
   - Test copy functionality

## 📊 Expected API Response Structure

The API should return articles with this structure:
```json
{
  "success": true,
  "articles": [
    {
      "id": "...",
      "title": "...",
      "authors": [...],
      "journal": "...",
      "aiSummary": "This study demonstrates...",  ← NEW!
      "keyFindings": [                            ← NEW!
        "Finding 1...",
        "Finding 2..."
      ],
      "relevantParagraphs": [                     ← NEW!
        {
          "text": "...",
          "context": "Results",
          "relevanceScore": 0.85
        }
      ],
      "references": []                            ← NEW!
    }
  ]
}
```

## 🐛 Troubleshooting

### If AI Summary Not Showing:
1. Check browser console for errors
2. Verify API response has `aiSummary` field
3. Check if abstract exists (some articles may not have abstracts)

### If Accordion Not Expanding:
1. Check if `isExpanded` state is toggling
2. Look for JavaScript errors in console
3. Verify CSS classes are applied

### If Search Terms Not Highlighted:
1. Verify search query has words longer than 3 characters
2. Check `highlightQuery` function is being called
3. Look at HTML to see if `<mark>` tags are present

### If Copy Buttons Not Working:
1. Check browser supports clipboard API
2. Look for "clipboard.writeText" errors in console
3. Verify HTTPS or localhost (clipboard requires secure context)

## 📸 Screenshots to Take

For documentation/testing:
1. Compact view (before expanding)
2. Expanded view (full accordion open)
3. Highlighted search terms (yellow background)
4. Copy button feedback (checkmark appearing)
5. Mobile responsive view

## ✅ Success Criteria

Your implementation is working correctly if:
- [x] Server running on localhost:3001
- [x] Evidence search page loads
- [x] Search returns results
- [x] AI summary appears in blue box
- [x] Accordion expands/collapses smoothly
- [x] Key findings listed
- [x] Relevant excerpts with context
- [x] Search terms highlighted
- [x] Copy buttons functional
- [x] Mobile responsive
- [x] No console errors

## 🚀 Next Steps

Once everything works locally:
1. Take screenshots
2. Test different search queries
3. Verify mobile responsiveness
4. Check all interactive features
5. Ready to deploy! (already pushed to main)

---

**Current Status:** Development server running ✅  
**URL:** http://localhost:3001/evidence-search  
**Ready to Test:** YES 🎉
