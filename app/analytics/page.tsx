import type { Metadata } from "next"
import { CompareForm } from "@/components/analytics/compare-form"
import { WeeklyComparison } from "@/components/analytics/weekly-comparison"
import { PlatformComparison } from "@/components/analytics/platform-comparison"
import { SkillRadar } from "@/components/analytics/skill-radar"
import { ProblemDistribution } from "@/components/analytics/problem-distribution"

export const metadata: Metadata = {
  title: "Analytics | CodeBinge",
  description: "Analyze your coding performance and compare with friends",
}

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Analyze your performance and compare with friends</p>
      </div>

      <CompareForm />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeeklyComparison />
        <SkillRadar />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProblemDistribution />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <PlatformComparison
            platform="Codeforces"
            icon="📊"
            yourUsername="amansaxena1"
            yourScore={286}
            friendUsername="touris"
            friendScore={1382}
          />
          <PlatformComparison
            platform="LeetCode"
            icon="⚡"
            yourUsername="amansaxena1"
            yourScore={670}
            friendUsername="amansaxena"
            friendScore={48}
          />
          <PlatformComparison
            platform="CodeChef"
            icon="🍴"
            yourUsername="codechef"
            yourScore={62}
            friendUsername="friend"
            friendScore={89}
          />
          <PlatformComparison
            platform="GeeksforGeeks"
            icon="👨‍💻"
            yourUsername="gfg"
            yourScore={124}
            friendUsername="friend"
            friendScore={156}
          />
        </div>
      </div>
    </div>
  )
}

