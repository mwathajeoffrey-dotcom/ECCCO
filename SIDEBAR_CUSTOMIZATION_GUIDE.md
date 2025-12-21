# 🛠️ Sidebar Customization Guide

## Quick Customization Examples

### 1. Change Default Open/Closed State

**Make all sections closed by default:**
```tsx
const [expandedSections, setExpandedSections] = useState<string[]>([]);
```

**Open only Practice section:**
```tsx
const [expandedSections, setExpandedSections] = useState<string[]>(['Practice']);
```

### 2. Add Badge to Any Section

**Add badge to Study Tools:**
```tsx
<span className="font-semibold">
  {section.title === 'Practice' && '📝 '}
  {section.title === 'Study Tools' && '🧠 '}
  {section.title === 'Resources' && '📚 '}
  {section.title}
  {section.title === 'Resources' && (
    <span className="ml-2 px-2 py-0.5 text-xs font-bold text-blue-600 bg-blue-100 rounded-full">
      New
    </span>
  )}
  {section.title === 'Study Tools' && (
    <span className="ml-2 px-2 py-0.5 text-xs font-bold text-green-600 bg-green-100 rounded-full">
      Updated
    </span>
  )}
</span>
```

### 3. Add Custom Section

**Add an Admin section:**
```tsx
const navigationSections: NavSection[] = [
  // ... existing sections
  {
    title: 'Admin',
    icon: Shield,
    items: [
      {
        label: 'User Management',
        href: '/admin/users',
        icon: Users,
      },
      {
        label: 'Content Review',
        href: '/admin/content',
        icon: FileCheck,
      },
    ],
  },
];
```

### 4. Add User Profile Section

**At the top of the sidebar:**
```tsx
<div className="p-4 border-b border-gray-200">
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-lg">
        {session?.user?.name?.[0] || 'U'}
      </span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-gray-900 truncate">
        {session?.user?.name || 'Guest User'}
      </p>
      <p className="text-xs text-gray-600 truncate">
        {session?.user?.email}
      </p>
    </div>
  </div>
  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
    <div className="bg-blue-50 rounded-lg px-2 py-1.5 text-center">
      <div className="font-bold text-blue-700">85%</div>
      <div className="text-gray-600">Score</div>
    </div>
    <div className="bg-green-50 rounded-lg px-2 py-1.5 text-center">
      <div className="font-bold text-green-700">234</div>
      <div className="text-gray-600">Questions</div>
    </div>
  </div>
</div>
```

### 5. Add Progress Indicators

**Show completion status on items:**
```tsx
{section.items.map((item) => {
  const ItemIcon = item.icon;
  const isActive = isActiveLink(item.href);
  const progress = getProgressForItem(item.label); // Your function

  return (
    <Link
      key={item.label}
      href={item.href}
      onClick={onClose}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
        isActive
          ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
      <ItemIcon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1">{item.label}</span>
      {progress && (
        <div className="flex items-center gap-1">
          <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{progress}%</span>
        </div>
      )}
    </Link>
  );
})}
```

### 6. Add Quick Actions Widget

**Above the footer:**
```tsx
<div className="p-4 border-t border-gray-200">
  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
    Quick Actions
  </h3>
  <div className="space-y-2">
    <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      <Zap className="w-4 h-4" />
      <span className="text-sm font-medium">Start Practice</span>
    </button>
    <button className="w-full flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
      <Clock className="w-4 h-4" />
      <span className="text-sm font-medium">Take Exam</span>
    </button>
  </div>
</div>
```

### 7. Change Color Scheme

**Purple theme:**
```tsx
// Active link
className={`... ${
  isActive
    ? 'bg-purple-50 text-purple-700 font-medium shadow-sm'
    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
}`}

// Badge
<span className="ml-2 px-2 py-0.5 text-xs font-bold text-purple-600 bg-purple-100 rounded-full">
  New
</span>
```

**Dark theme:**
```tsx
className="fixed left-0 top-16 bottom-0 w-72 bg-gray-900 border-r border-gray-800 z-40 overflow-y-auto shadow-lg"

// Links
className={`... ${
  isActive
    ? 'bg-blue-900 text-blue-300 font-medium'
    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
}`}
```

### 8. Add Notifications/Counts

**Show unread counts:**
```tsx
<Link
  href="/live-quiz"
  className="..."
>
  <Users className="w-4 h-4 flex-shrink-0" />
  <span className="flex-1">Live Quiz</span>
  {activeQuizCount > 0 && (
    <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
      {activeQuizCount}
    </span>
  )}
</Link>
```

### 9. Add Keyboard Shortcuts

**In the Sidebar component:**
```tsx
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Ctrl/Cmd + B to toggle sidebar
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      onClose?.();
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [onClose]);
```

### 10. Add Search in Sidebar

**At the top of nav:**
```tsx
<div className="p-4 border-b border-gray-200">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search navigation..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      onChange={(e) => handleSearch(e.target.value)}
    />
  </div>
</div>
```

### 11. Make Sidebar Resizable

**Add resize handle:**
```tsx
const [sidebarWidth, setSidebarWidth] = useState(288);
const [isResizing, setIsResizing] = useState(false);

<motion.aside
  style={{ width: sidebarWidth }}
  className="..."
>
  {/* ... sidebar content ... */}
  
  {/* Resize handle */}
  <div
    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 transition-colors"
    onMouseDown={(e) => {
      setIsResizing(true);
      // Handle resize logic
    }}
  />
</motion.aside>
```

### 12. Add Recently Visited Section

**Above main navigation:**
```tsx
{recentPages.length > 0 && (
  <div className="mb-4">
    <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
      Recent
    </h3>
    <div className="space-y-1">
      {recentPages.slice(0, 3).map((page) => (
        <Link
          key={page.href}
          href={page.href}
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{page.title}</span>
        </Link>
      ))}
    </div>
  </div>
)}
```

### 13. Add Favorites/Bookmarks

**Star icon to bookmark pages:**
```tsx
const [favorites, setFavorites] = useState<string[]>([]);

<button
  onClick={(e) => {
    e.preventDefault();
    toggleFavorite(item.href);
  }}
  className="p-1 hover:bg-gray-200 rounded"
>
  <Star 
    className={`w-4 h-4 ${
      favorites.includes(item.href) 
        ? 'fill-yellow-400 text-yellow-400' 
        : 'text-gray-400'
    }`}
  />
</button>
```

### 14. Add Help Tooltips

**Using Radix UI or similar:**
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Link href="/practice" className="...">
      {/* ... link content ... */}
    </Link>
  </TooltipTrigger>
  <TooltipContent>
    <p>Practice with 30 questions per topic</p>
  </TooltipContent>
</Tooltip>
```

### 15. Persist Sidebar State

**Save to localStorage:**
```tsx
const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('sidebarOpen') !== 'false';
  }
  return true;
});

const handleToggle = () => {
  const newState = !isSidebarOpen;
  setIsSidebarOpen(newState);
  localStorage.setItem('sidebarOpen', String(newState));
};
```

## Common Customizations by Use Case

### For Medical Students
- Add "Study Schedule" section
- Show upcoming deadlines
- Add "Weak Topics" quick access
- Display study streak

### For Administrators
- Add admin-only sections (conditional rendering)
- Show system stats widget
- Add bulk actions
- Include audit log access

### For Teams
- Add team collaboration section
- Show online team members
- Group chat access
- Shared resources

### For Multi-language
- Add language switcher in footer
- RTL support for Arabic/Hebrew
- Localized section titles
- Flag icons for languages

---

**Note**: All customizations maintain the same design principles and accessibility standards. Test thoroughly on mobile devices after making changes.
