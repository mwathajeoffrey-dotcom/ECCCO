# 🎨 Sidebar Visual Design Guide

## Layout Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  [≡] ECCCO Logo              Practice ▼ Study Tools ▼ Resources ▼ │ ← Header (Fixed Top)
└─────────────────────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────────────────────────┐
│              │                                                  │
│  Sidebar     │              Main Content Area                   │
│  (288px)     │                                                  │
│              │                                                  │
│  🏠 Home     │                                                  │
│              │                                                  │
│  🏆 Dashboard│                                                  │
│              │                                                  │
│  📝 Practice▼│                                                  │
│    • Topic P │                                                  │
│    • Random  │                                                  │
│    • ACLS    │                                                  │
│    • PALS    │                                                  │
│              │                                                  │
│  🧠 Study T.▼│                                                  │
│    • Full Ex │                                                  │
│    • Custom  │                                                  │
│    • Live Q. │                                                  │
│    • Analyti │                                                  │
│              │                                                  │
│  📚 Resource▼│                                                  │
│    • Evidenc │  [New]                                          │
│    • Guideli │                                                  │
│    • Flowcha │                                                  │
│              │                                                  │
│  ❓ Support  │                                                  │
│              │                                                  │
│  ⚙️ Settings │                                                  │
│              │                                                  │
│  ─────────── │                                                  │
│  ECCCO       │                                                  │
│  © 2025      │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

## Color Scheme

### Active Link
- Background: `bg-blue-50` (#EFF6FF)
- Text: `text-blue-700` (#1D4ED8)
- Font: `font-semibold`
- Shadow: `shadow-sm`

### Hover State
- Background: `bg-gray-50` (#F9FAFB)
- Text: `text-gray-900` (#111827)

### Default State
- Background: `transparent`
- Text: `text-gray-700` (#374151)

### Section Headers
- Text: `text-gray-700` (#374151)
- Font: `font-semibold`
- Icon: `text-gray-500` (#6B7280)

### Sub-items
- Text: `text-gray-600` (#4B5563)
- Font: `text-sm` (14px)
- Bullet: `w-1 h-1 rounded-full bg-gray-300`

## Component Hierarchy

```
Sidebar
├── Home Link
├── Dashboard Link
├── Practice Section (Collapsible)
│   ├── Section Header (📝 Practice ▼)
│   └── Dropdown Items
│       ├── Topic Practice
│       ├── Random Practice
│       ├── ACLS Practice
│       └── PALS Practice
├── Study Tools Section (Collapsible)
│   ├── Section Header (🧠 Study Tools ▼)
│   └── Dropdown Items
│       ├── Full Timed Exam
│       ├── Custom Exam
│       ├── Live Quiz
│       └── Learning Analytics
├── Resources Section (Collapsible)
│   ├── Section Header (📚 Resources ▼ [New])
│   └── Dropdown Items
│       ├── Evidence Library
│       ├── Clinical Guidelines
│       └── Flowcharts
├── Support Link
├── Settings Link
└── Footer
    └── Copyright Info
```

## Spacing & Sizing

### Sidebar
- Width: `288px` (w-72)
- Padding: `16px` (p-4)
- Gap between items: `8px` (space-y-2)

### Links
- Padding: `12px 16px` (py-3 px-4)
- Border radius: `8px` (rounded-lg)
- Icon size: `20px` (w-5 h-5)
- Icon-text gap: `12px` (gap-3)

### Section Headers
- Padding: `12px 16px` (py-3 px-4)
- Icon size: `20px` (w-5 h-5)
- Chevron size: `16px` (w-4 h-4)

### Sub-items
- Left indent: `16px` (pl-4)
- Padding: `10px 16px` (py-2.5 px-4)
- Font size: `14px` (text-sm)
- Icon size: `16px` (w-4 h-4)
- Bullet size: `4px` (w-1 h-1)

## Animation Details

### Sidebar Slide-in
```javascript
initial={{ x: -300 }}
animate={{ x: 0 }}
exit={{ x: -300 }}
transition={{ type: 'spring', damping: 25, stiffness: 200 }}
```

### Dropdown Expand/Collapse
```javascript
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.2 }}
```

### Backdrop Fade
```javascript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
```

## Icons Used

- 🏠 Home - `<Home />`
- 🏆 Dashboard - `<Trophy />`
- 📝 Practice - `<FileText />`
- 🧠 Study Tools - `<Brain />`
- 📚 Resources - `<Library />`
- ❓ Support - `<HelpCircle />`
- ⚙️ Settings - `<Settings />`

### Sub-item Icons
- Topic Practice - `<FileText />`
- Random Practice - `<Zap />`
- ACLS - `<Activity />`
- PALS - `<Heart />`
- Full Timed Exam - `<Clock />`
- Custom Exam - `<Target />`
- Live Quiz - `<Users />`
- Learning Analytics - `<BarChart3 />`
- Evidence Library - `<Library />`
- Clinical Guidelines - `<BookOpen />`
- Flowcharts - `<GitBranch />`

## Responsive Behavior

### Desktop (≥1024px)
- Sidebar always visible when toggled open
- Toggle button in header
- Content shifts with margin-left: 288px
- No backdrop

### Mobile (<1024px)
- Sidebar overlays content
- Black backdrop with 50% opacity
- Click outside to close
- Hamburger menu in header
- Full-height slide-in from left

## Accessibility Features

- ARIA labels on buttons
- Keyboard navigation support
- Focus states on all interactive elements
- Semantic HTML structure
- Screen reader friendly

## Badge System

### "New" Badge on Resources
```jsx
<span className="ml-2 px-2 py-0.5 text-xs font-bold text-blue-600 bg-blue-100 rounded-full">
  New
</span>
```

- Background: Light blue (`bg-blue-100`)
- Text: Blue (`text-blue-600`)
- Font: Extra small, bold
- Shape: Fully rounded pill

## State Management

```typescript
const [expandedSections, setExpandedSections] = useState<string[]>([
  'Practice',
  'Study Tools',
  'Resources',
]);
```

All sections start expanded by default. Users can toggle each independently.

## Z-Index Layers

- Backdrop: `z-30`
- Sidebar: `z-40`
- Header: `z-50`

This ensures proper stacking and overlay behavior.

---

**Visual Preview**: The sidebar provides a clean, professional navigation experience with smooth animations, clear hierarchy, and intuitive interactions. All elements are touch-friendly and accessible.
