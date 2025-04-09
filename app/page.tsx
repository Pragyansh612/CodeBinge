"use client"

import { UserOverview } from "@/components/dashboard/user-overview"
import { DailyStreak } from "@/components/dashboard/daily-streak"
import { WeeklyTarget } from "@/components/dashboard/weekly-target"
import { FeaturedArticle } from "@/components/dashboard/featured-article"
import { PlatformStats } from "@/components/dashboard/platform-stats"
import { PerformanceAnalysis } from "@/components/dashboard/performance-analysis"
import { ContributionCalendar } from "@/components/dashboard/contribution-calendar"
import { RecommendedProblems } from "@/components/dashboard/recommended-problems"
import { Achievements } from "@/components/dashboard/achievements"
import { useDashboardData } from "@/contexts/dashboard-data-context"
import { Button } from "@/components/ui/button"
import { CircleOff, Settings } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { data } = useDashboardData()
  
  // Check if at least one platform is connected
  const hasProfiles = data.leetcode.username || data.codeforces.username
  
  if (!hasProfiles) {
    return (
      <div className="container mx-auto p-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Welcome to CodeBinge</h1>
          <p className="text-muted-foreground">Connect your coding profiles to get started.</p>
        </div>
        
        <div className="max-w-lg mx-auto mt-16 flex flex-col items-center text-center">
          <CircleOff className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Profiles Connected</h2>
          <p className="text-muted-foreground mb-6">
            To view your coding statistics and recommendations, you need to connect
            at least one profile from LeetCode or Codeforces.
          </p>
          <Link href="/profile">
            <Button size="lg">
              <Settings className="mr-2 h-5 w-5" />
              Connect Your Profiles
            </Button>
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Hello, {data.leetcode.username || data.codeforces.username || "coding innovator"}
        </h1>
        <p className="text-muted-foreground">Let's explore your stats.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UserOverview />
        <DailyStreak />
        <WeeklyTarget />
      </div>
      
      <div className="mt-6">
        <PerformanceAnalysis />
      </div>
      
      <div className="mt-6">
        <ContributionCalendar />
      </div>
      
      <div className="mt-6">
        <h2 className="mb-4 text-2xl font-semibold">Platforms</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.codeforces.username && (
            <PlatformStats
              platform="Codeforces"
              type="codeforces"
              icon="📊"
            />
          )}
          
          {data.leetcode.username && (
            <PlatformStats
              platform="LeetCode"
              type="leetcode"
              icon="⚡"
            />
          )}
          
          {/* These are optional platforms that could be added in the future */}
          <PlatformStats platform="CodeChef" username="N/A" solved={0} icon="🍴" type="other" />
          <PlatformStats platform="GeeksforGeeks" username="N/A" solved={0} icon="👨‍💻" type="other" />
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecommendedProblems />
        </div>
        <div>
          <FeaturedArticle />
        </div>
      </div>
      
      <div className="mt-6">
        <Achievements />
      </div>
    </div>
  )
}