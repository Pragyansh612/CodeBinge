"use client"

import { createContext, useContext, type ReactNode } from "react"

// Define types for our dashboard data
export interface DashboardData {
  // User stats
  totalSolved: number
  easyProblems: number
  mediumProblems: number
  hardProblems: number
  dailyStreak: number
  weeklyTarget: {
    achieved: number
    target: number
    progress: number[]
  }

  // Platform stats
  platforms: {
    name: string
    username: string
    solved: number
    icon: string
  }[]

  // Performance data
  monthlyData: {
    name: string
    problems: number
    difficulty: number
    time: number
  }[]

  // Topic distribution
  topicData: {
    name: string
    count: number
  }[]

  // Recommendations
  recommendedProblems: {
    id: number
    title: string
    platform: string
    difficulty: string
    tags: string[]
    company: string
  }[]
}

// Mock data that matches what's displayed in the dashboard
const dashboardMockData: DashboardData = {
  totalSolved: 2386,
  easyProblems: 1245,
  mediumProblems: 876,
  hardProblems: 265,
  dailyStreak: 15,
  weeklyTarget: {
    achieved: 5,
    target: 7,
    progress: [2, 3, 4, 3, 2, 0, 0],
  },
  platforms: [
    { name: "CodeChef", username: "codechef", solved: 62, icon: "🍴" },
    { name: "Codeforces", username: "codeforces", solved: 286, icon: "📊" },
    { name: "LeetCode", username: "leetcode", solved: 670, icon: "⚡" },
    { name: "GeeksforGeeks", username: "gfg", solved: 124, icon: "👨‍💻" },
  ],
  monthlyData: [
    { name: "Jan", problems: 45, difficulty: 2.3, time: 35 },
    { name: "Feb", problems: 52, difficulty: 2.5, time: 32 },
    { name: "Mar", problems: 48, difficulty: 2.7, time: 30 },
    { name: "Apr", problems: 70, difficulty: 2.8, time: 28 },
    { name: "May", problems: 65, difficulty: 3.0, time: 25 },
    { name: "Jun", problems: 58, difficulty: 3.2, time: 22 },
    { name: "Jul", problems: 82, difficulty: 3.5, time: 20 },
    { name: "Aug", problems: 63, difficulty: 3.7, time: 18 },
    { name: "Sep", problems: 75, difficulty: 4.0, time: 15 },
  ],
  topicData: [
    { name: "Arrays", count: 145 },
    { name: "Strings", count: 98 },
    { name: "DP", count: 76 },
    { name: "Trees", count: 65 },
    { name: "Graphs", count: 42 },
    { name: "Sorting", count: 38 },
    { name: "Greedy", count: 35 },
  ],
  recommendedProblems: [
    {
      id: 1,
      title: "Two Sum",
      platform: "LeetCode",
      difficulty: "Easy",
      tags: ["Arrays", "Hash Table"],
      company: "Amazon",
    },
    {
      id: 2,
      title: "Valid Parentheses",
      platform: "LeetCode",
      difficulty: "Easy",
      tags: ["Stack", "String"],
      company: "Google",
    },
    {
      id: 3,
      title: "Merge Intervals",
      platform: "LeetCode",
      difficulty: "Medium",
      tags: ["Arrays", "Sorting"],
      company: "Facebook",
    },
    {
      id: 4,
      title: "Number of Islands",
      platform: "LeetCode",
      difficulty: "Medium",
      tags: ["DFS", "BFS", "Graph"],
      company: "Amazon",
    },
    {
      id: 5,
      title: "Trapping Rain Water",
      platform: "LeetCode",
      difficulty: "Hard",
      tags: ["Arrays", "Two Pointers", "Dynamic Programming"],
      company: "Google",
    },
  ],
}

// Create context
const DashboardDataContext = createContext<DashboardData | undefined>(undefined)

// Provider component
export function DashboardDataProvider({ children }: { children: ReactNode }) {
  // In a real app, you would fetch this data from an API
  return <DashboardDataContext.Provider value={dashboardMockData}>{children}</DashboardDataContext.Provider>
}

// Hook to use the dashboard data
export function useDashboardData() {
  const context = useContext(DashboardDataContext)
  if (context === undefined) {
    throw new Error("useDashboardData must be used within a DashboardDataProvider")
  }
  return context
}

