"use client";

import { BookOpen, Brain, Target, BarChart3, Bookmark, Clock, Users, Zap } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Question Bank",
    description: "Access over 1,900 high-yield emergency medicine questions covering all major topics.",
    color: "blue",
    link: "/practice",
  },
  {
    icon: Brain,
    title: "Spaced Repetition Learning",
    description: "Scientifically proven study method that helps you retain information longer.",
    color: "purple",
    link: "/study",
  },
  {
    icon: Target,
    title: "Custom Practice Exams",
    description: "Create tailored exams based on specific topics, difficulty levels, or weak areas.",
    color: "green",
    link: "/exam",
  },
  {
    icon: BarChart3,
    title: "Learning Analytics",
    description: "Track your progress with detailed statistics and performance insights.",
    color: "orange",
    link: "/learning-analytics",
  },
  {
    icon: Bookmark,
    title: "Smart Bookmarking",
    description: "Save important questions and create personalized study collections.",
    color: "pink",
    link: "/bookmarks",
  },
  {
    icon: Clock,
    title: "Timed Exams",
    description: "Simulate real exam conditions with full-length timed practice tests.",
    color: "indigo",
    link: "/exam?mode=timed",
  },
  {
    icon: Zap,
    title: "Evidence Library",
    description: "Access curated emergency medicine research and clinical guidelines.",
    color: "teal",
    link: "/emergency-references",
  },
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
  pink: "bg-pink-100 text-pink-600",
  indigo: "bg-indigo-100 text-indigo-600",
  red: "bg-red-100 text-red-600",
  teal: "bg-teal-100 text-teal-600",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Everything you need to master emergency and critical care medicine
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            const colorClass = colorClasses[feature.color as keyof typeof colorClasses];

            return (
              <Link
                key={feature.title}
                href={feature.link}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 group"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of healthcare professionals preparing for success</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/practice"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Practice
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
