"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useState } from "react";

export default function FloatingPracticeButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/exam?count=10&mode=quick"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Quick Practice - 10 Random Questions"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Button */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all hover:scale-110 flex items-center justify-center">
        <Zap className="w-6 h-6" />
      </div>

      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-3 transition-all duration-200 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
          <span className="font-semibold">Quick Practice</span>
          <span className="text-gray-300 ml-2">• 10 Random Questions</span>
        </div>
        {/* Arrow */}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-900" />
      </div>

      {/* Pulse Effect */}
      <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" />
    </Link>
  );
}
