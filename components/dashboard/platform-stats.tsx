"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useDashboardData } from "@/contexts/dashboard-data-context"
import { Skeleton } from "@/components/ui/skeleton"

interface PlatformStatsProps {
  platform: string
  username?: string
  solved?: number
  icon: string
  type: "leetcode" | "codeforces" | "other"
}

export function PlatformStats({ platform, username, solved, icon, type }: PlatformStatsProps) {
  const { data, isLoading } = useDashboardData()
  
  // Use the actual data from context for LeetCode and Codeforces
  let actualUsername = username
  let actualSolved = solved
  
  if (type === "leetcode" && data.leetcode.username) {
    actualUsername = data.leetcode.username
    actualSolved = data.leetcode.totalSolved
  } else if (type === "codeforces" && data.codeforces.username) {
    actualUsername = data.codeforces.username
    actualSolved = data.codeforces.totalSolved
  }
  
  // If the platform is LeetCode or Codeforces but we don't have data, don't render
  if ((type === "leetcode" && !data.leetcode.username) || 
      (type === "codeforces" && !data.codeforces.username)) {
    return null
  }
  
  // Loading state
  if ((type === "leetcode" && data.leetcode.loading) || 
      (type === "codeforces" && data.codeforces.loading)) {
    return (
      <Card className="glow-card overflow-hidden transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl">{icon}</div>
              <div>
                <h3 className="font-semibold">{platform}</h3>
                <Skeleton className="h-3 w-24 mt-1" />
              </div>
            </div>
            <Skeleton className="h-8 w-12" />
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="glow-card overflow-hidden transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xl">{icon}</div>
            <div>
              <h3 className="font-semibold">{platform}</h3>
              <p className="text-xs text-muted-foreground">{actualUsername}</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{actualSolved}</div>
        </div>
      </CardContent>
    </Card>
  )
}