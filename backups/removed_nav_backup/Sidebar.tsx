"use client";
import { logger } from "@/lib/logger";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import QuestionSearch from "./QuestionSearch";
import {
  Home,
  Trophy,
  FileText,
  Zap,
  Activity,
  Heart,
  Brain,
  Clock,
  Target,
  Users,
  BarChart3,
  Library,
  BookOpen,
  GitBranch,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  Bookmark,
  StickyNote,
  LogIn,
  LogOut,
  User,
  Shield,
  UserCog,
  Gamepad2,
  Swords,
} from "lucide-react";

export default function Sidebar() {
  return null; // backup copy
}
