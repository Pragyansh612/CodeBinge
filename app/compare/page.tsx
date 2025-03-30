import type { Metadata } from "next"
import { CompareForm } from "@/components/compare/compare-form"
import { WeeklyComparison } from "@/components/compare/weekly-comparison"
import { PlatformComparison } from "@/components/compare/platform-comparison"

export const metadata: Metadata = {
  title: "Compare | Codefolio",
  description: "Compare your coding profile with friends",
}

export default function ComparePage() {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Compare</h1>
        <p className="text-muted-foreground">Compare your performance with friends</p>
      </div>

      <CompareForm />

      <div className="mt-6">
        <WeeklyComparison />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
  )
}

