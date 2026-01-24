/**
 * Command Palette Component
 * Provides quick access to all application features via keyboard
 * Inspired by VS Code's command palette (Cmd/Ctrl + K)
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { logger } from "@/lib/services/logger";
import { useKeyboardShortcutsModal } from "@/components/providers/keyboard-shortcuts-provider";
import {
  Search,
  Home,
  BookOpen,
  FileText,
  Bookmark,
  Settings,
  HelpCircle,
  Activity,
  Calendar,
  Users,
  TrendingUp,
  FileSearch,
  PlayCircle,
  Award,
  X,
  Keyboard,
} from "lucide-react";

export interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action: () => void;
  category: string;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { open: openShortcutsModal } = useKeyboardShortcutsModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Define all available commands
  const allCommands: Command[] = useMemo(() => {
    return [
      // Navigation
      {
        id: "nav-dashboard",
        label: "Go to Dashboard",
        description: "View your learning dashboard",
        icon: Home,
        action: () => {
          router.push("/dashboard");
          onClose();
        },
        category: "Navigation",
        keywords: ["home", "main", "overview"],
      },
      {
        id: "nav-practice",
        label: "Go to Practice",
        description: "Start practicing with quiz questions",
        icon: PlayCircle,
        action: () => {
          router.push("/practice");
          onClose();
        },
        category: "Navigation",
        keywords: ["quiz", "questions", "test", "exam"],
      },
      {
        id: "nav-evidence",
        label: "Go to Evidence Search",
        description: "Search clinical evidence and guidelines",
        icon: FileSearch,
        action: () => {
          router.push("/evidence");
          onClose();
        },
        category: "Navigation",
        keywords: ["research", "pubmed", "guidelines", "clinical"],
      },
      {
        id: "nav-modules",
        label: "Go to Modules",
        description: "Browse learning modules",
        icon: BookOpen,
        action: () => {
          router.push("/modules");
          onClose();
        },
        category: "Navigation",
        keywords: ["courses", "lessons", "learning"],
      },
      {
        id: "nav-bookmarks",
        label: "Go to Bookmarks",
        description: "View your saved items",
        icon: Bookmark,
        action: () => {
          router.push("/bookmarks");
          onClose();
        },
        category: "Navigation",
        keywords: ["saved", "favorites", "starred"],
      },
      {
        id: "nav-progress",
        label: "Go to Progress",
        description: "Track your learning progress",
        icon: TrendingUp,
        action: () => {
          router.push("/progress");
          onClose();
        },
        category: "Navigation",
        keywords: ["stats", "analytics", "performance"],
      },
      {
        id: "nav-settings",
        label: "Go to Settings",
        description: "Manage your preferences",
        icon: Settings,
        action: () => {
          router.push("/settings");
          onClose();
        },
        category: "Navigation",
        keywords: ["preferences", "config", "account"],
      },

      // Practice Actions
      {
        id: "practice-acls",
        label: "Practice ACLS",
        description: "Start ACLS practice session",
        icon: Activity,
        action: () => {
          router.push("/practice/acls");
          onClose();
        },
        category: "Practice",
        keywords: ["adult", "cardiac", "advanced"],
      },
      {
        id: "practice-pals",
        label: "Practice PALS",
        description: "Start PALS practice session",
        icon: Users,
        action: () => {
          router.push("/practice/pals");
          onClose();
        },
        category: "Practice",
        keywords: ["pediatric", "children", "kids"],
      },
      {
        id: "practice-bls",
        label: "Practice BLS",
        description: "Start BLS practice session",
        icon: PlayCircle,
        action: () => {
          router.push("/practice/bls");
          onClose();
        },
        category: "Practice",
        keywords: ["basic", "cpr", "resuscitation"],
      },
      {
        id: "practice-random",
        label: "Random Practice",
        description: "Practice with random questions",
        icon: PlayCircle,
        action: () => {
          router.push("/practice?mode=random");
          onClose();
        },
        category: "Practice",
        keywords: ["mixed", "shuffle", "all"],
      },

      // Quick Actions
      {
        id: "action-search",
        label: "Focus Search",
        description: "Jump to search bar",
        icon: Search,
        action: () => {
          const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
          searchInput?.focus();
          onClose();
        },
        category: "Actions",
        keywords: ["find", "query"],
      },
      {
        id: "action-shortcuts",
        label: "Show Keyboard Shortcuts",
        description: "View all available keyboard shortcuts",
        icon: Keyboard,
        action: () => {
          openShortcutsModal();
          onClose();
        },
        category: "Actions",
        keywords: ["help", "keys", "hotkeys", "?"],
      },
      {
        id: "action-help",
        label: "Show Help",
        description: "View keyboard shortcuts and help",
        icon: HelpCircle,
        action: () => {
          router.push("/help");
          onClose();
        },
        category: "Actions",
        keywords: ["shortcuts", "guide", "tutorial"],
      },
      {
        id: "action-stats",
        label: "View Statistics",
        description: "See your performance statistics",
        icon: TrendingUp,
        action: () => {
          router.push("/dashboard/stats");
          onClose();
        },
        category: "Actions",
        keywords: ["analytics", "metrics", "data"],
      },
      {
        id: "action-calendar",
        label: "Study Calendar",
        description: "View your study schedule",
        icon: Calendar,
        action: () => {
          router.push("/calendar");
          onClose();
        },
        category: "Actions",
        keywords: ["schedule", "plan", "dates"],
      },
      {
        id: "action-certificates",
        label: "My Certificates",
        description: "View earned certificates",
        icon: Award,
        action: () => {
          router.push("/certificates");
          onClose();
        },
        category: "Actions",
        keywords: ["achievements", "awards", "completion"],
      },
    ];
  }, [router, onClose, openShortcutsModal]);

  // Filter commands based on search query
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) {
      return allCommands;
    }

    const query = searchQuery.toLowerCase();
    return allCommands.filter((command) => {
      const matchesLabel = command.label.toLowerCase().includes(query);
      const matchesDescription = command.description?.toLowerCase().includes(query);
      const matchesKeywords = command.keywords?.some((keyword) => keyword.toLowerCase().includes(query));
      const matchesCategory = command.category.toLowerCase().includes(query);

      return matchesLabel || matchesDescription || matchesKeywords || matchesCategory;
    });
  }, [searchQuery, allCommands]);

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, Command[]> = {};
    filteredCommands.forEach((command) => {
      if (!groups[command.category]) {
        groups[command.category] = [];
      }
      groups[command.category].push(command);
    });
    return groups;
  }, [filteredCommands]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selectedCommand = filteredCommands[selectedIndex];
        if (selectedCommand) {
          logger.debug("Command executed from palette", {
            commandId: selectedCommand.id,
            label: selectedCommand.label,
          });
          selectedCommand.action();
        }
      }
    },
    [filteredCommands, selectedIndex, onClose]
  );

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        const input = document.getElementById("command-palette-input");
        input?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle click outside to close
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[20vh]"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            id="command-palette-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            autoComplete="off"
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded" aria-label="Close">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Commands List */}
        <div className="max-h-[50vh] overflow-y-auto">
          {Object.keys(groupedCommands).length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No commands found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, commands]) => (
              <div key={category} className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {category}
                </div>
                {commands.map((command, index) => {
                  const globalIndex = filteredCommands.indexOf(command);
                  const isSelected = globalIndex === selectedIndex;
                  const Icon = command.icon;

                  return (
                    <button
                      key={command.id}
                      onClick={() => {
                        logger.debug("Command clicked", {
                          commandId: command.id,
                          label: command.label,
                        });
                        command.action();
                      }}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {Icon && (
                        <Icon
                          className={`w-5 h-5 flex-shrink-0 ${
                            isSelected ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
                          }`}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{command.label}</div>
                        {command.description && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{command.description}</div>
                        )}
                      </div>
                      {isSelected && (
                        <Badge variant="secondary" className="text-xs">
                          ↵
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer with hints */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Badge variant="outline" className="px-1.5 py-0.5 text-xs">
                ↑↓
              </Badge>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <Badge variant="outline" className="px-1.5 py-0.5 text-xs">
                ↵
              </Badge>
              Select
            </span>
            <span className="flex items-center gap-1">
              <Badge variant="outline" className="px-1.5 py-0.5 text-xs">
                esc
              </Badge>
              Close
            </span>
          </div>
          <span>{filteredCommands.length} commands</span>
        </div>
      </div>
    </div>
  );
}
