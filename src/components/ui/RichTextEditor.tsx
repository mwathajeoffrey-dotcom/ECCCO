"use client";

import { useState, useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Highlighter,
  Type,
  Heading1,
  Heading2,
  Quote,
  Code,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function RichTextEditor({ value, onChange, placeholder, rows = 12 }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  const insertMarkdown = useCallback(
    (before: string, after: string = "", placeholder: string = "text") => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      const textToInsert = selectedText || placeholder;

      const newValue = value.substring(0, start) + before + textToInsert + after + value.substring(end);

      onChange(newValue);

      // Set cursor position after insertion
      setTimeout(() => {
        const newCursorPos = start + before.length + textToInsert.length;
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [value, onChange]
  );

  const formatTools = [
    {
      icon: Bold,
      label: "Bold",
      action: () => insertMarkdown("**", "**", "bold text"),
      shortcut: "⌘B",
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => insertMarkdown("*", "*", "italic text"),
      shortcut: "⌘I",
    },
    {
      icon: Underline,
      label: "Underline",
      action: () => insertMarkdown("<u>", "</u>", "underlined text"),
      shortcut: "",
    },
    {
      icon: Highlighter,
      label: "Highlight",
      action: () => insertMarkdown("==", "==", "highlighted text"),
      shortcut: "⌘H",
    },
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const newValue = value.substring(0, lineStart) + "# " + value.substring(lineStart);
        onChange(newValue);
        textarea.focus();
      },
      shortcut: "",
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const newValue = value.substring(0, lineStart) + "## " + value.substring(lineStart);
        onChange(newValue);
        textarea.focus();
      },
      shortcut: "",
    },
    {
      icon: List,
      label: "Bullet List",
      action: () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const newValue = value.substring(0, lineStart) + "- " + value.substring(lineStart);
        onChange(newValue);
        textarea.focus();
      },
      shortcut: "",
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const newValue = value.substring(0, lineStart) + "1. " + value.substring(lineStart);
        onChange(newValue);
        textarea.focus();
      },
      shortcut: "",
    },
    {
      icon: Quote,
      label: "Quote",
      action: () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const newValue = value.substring(0, lineStart) + "> " + value.substring(lineStart);
        onChange(newValue);
        textarea.focus();
      },
      shortcut: "",
    },
    {
      icon: Code,
      label: "Code Block",
      action: () => insertMarkdown("```\n", "\n```", "code here"),
      shortcut: "",
    },
  ];

  // Render markdown preview
  const renderPreview = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Headings
      if (line.startsWith("# ")) {
        return (
          <h1 key={i} className="text-2xl font-bold mb-2 mt-4">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="text-xl font-bold mb-2 mt-3">
            {line.substring(3)}
          </h2>
        );
      }
      // Bullet list
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="ml-4">
            {line.substring(2)}
          </li>
        );
      }
      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={i} className="ml-4 list-decimal">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      }
      // Quote
      if (line.startsWith("> ")) {
        return (
          <blockquote key={i} className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400">
            {line.substring(2)}
          </blockquote>
        );
      }
      // Regular text with inline formatting
      let formattedLine = line;
      // Bold
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Italic
      formattedLine = formattedLine.replace(/\*(.*?)\*/g, "<em>$1</em>");
      // Highlight
      formattedLine = formattedLine.replace(/==(.*?)==/g, '<mark class="bg-yellow-200 dark:bg-yellow-500">$1</mark>');
      // Underline
      formattedLine = formattedLine.replace(/<u>(.*?)<\/u>/g, "<u>$1</u>");

      return <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedLine || "&nbsp;" }} />;
    });
  };

  return (
    <div className="space-y-2">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {formatTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <button
              key={index}
              type="button"
              onClick={tool.action}
              title={`${tool.label} ${tool.shortcut}`}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors
                       text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}

        <div className="flex-1" />

        {/* Preview Toggle */}
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="px-3 py-1 text-xs font-medium rounded
                   bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                   hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {/* Editor / Preview */}
      {showPreview ? (
        <div
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                     min-h-[300px] prose dark:prose-invert max-w-none"
        >
          {renderPreview(value)}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                     placeholder-gray-400 dark:placeholder-gray-500 resize-y font-mono text-sm"
        />
      )}

      {/* Helper Text */}
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <div>
          <span className="font-medium">{value.length}</span> characters • Markdown supported
        </div>
        <div className="flex gap-4">
          <span className="hidden sm:inline">⌘B = Bold</span>
          <span className="hidden sm:inline">⌘I = Italic</span>
          <span className="hidden sm:inline">⌘H = Highlight</span>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
        <p className="font-medium mb-1">💡 Quick Tips:</p>
        <ul className="space-y-1 ml-4 list-disc">
          <li>Use toolbar buttons or type markdown directly</li>
          <li>**bold**, *italic*, ==highlight==, # heading</li>
          <li>Click "Preview" to see formatted output</li>
        </ul>
      </div>
    </div>
  );
}
