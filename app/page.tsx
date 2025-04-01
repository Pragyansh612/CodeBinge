import type { Metadata } from "next"
import { UserOverview } from "@/components/dashboard/user-overview"
import { DailyStreak } from "@/components/dashboard/daily-streak"
import { WeeklyTarget } from "@/components/dashboard/weekly-target"
import { FeaturedArticle } from "@/components/dashboard/featured-article"
import { PlatformStats } from "@/components/dashboard/platform-stats"
import { PerformanceAnalysis } from "@/components/dashboard/performance-analysis"
import { ContributionCalendar } from "@/components/dashboard/contribution-calendar"
import { RecommendedProblems } from "@/components/dashboard/recommended-problems"
import { Achievements } from "@/components/dashboard/achievements"

export const metadata: Metadata = {
  title: "Dashboard | CodeBinge",
  description: "Your coding profile dashboard",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hello, coding innovator</h1>
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
          <PlatformStats platform="CodeChef" username="codechef" solved={62} icon="🍴" />
          <PlatformStats platform="Codeforces" username="codeforces" solved={286} icon="📊" />
          <PlatformStats platform="LeetCode" username="leetcode" solved={670} icon="⚡" />
          <PlatformStats platform="GeeksforGeeks" username="gfg" solved={124} icon="👨‍💻" />
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

