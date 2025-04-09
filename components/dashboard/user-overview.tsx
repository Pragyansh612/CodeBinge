"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Settings } from "lucide-react"
import { useDashboardData } from "@/contexts/dashboard-data-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function UserOverview() {
  const { data, isLoading } = useDashboardData()
  
  const totalSolved = data.leetcode.totalSolved + data.codeforces.totalSolved
  const todaySolved = data.leetcode.todaySolved + data.codeforces.todaySolved
  
  const easySolved = data.leetcode.easySolved
  const mediumSolved = data.leetcode.mediumSolved
  const hardSolved = data.leetcode.hardSolved
  
  const hasProfiles = data.leetcode.username || data.codeforces.username
  
  if (!hasProfiles) {
    return (
      <Card className="glow-card overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Solved Problems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-6">
            <p className="text-muted-foreground mb-4 text-center">
              Connect your coding profiles to view your stats
            </p>
            <Link href="/profile">
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Set Up Profiles
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (isLoading) {
    return (
      <Card className="glow-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Solved Problems</CardTitle>
            <Skeleton className="h-6 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Skeleton className="h-16 w-16" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="glow-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Solved Problems</CardTitle>
          <Badge variant="outline" className="bg-secondary/50">
            {todaySolved} Solved today
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-6xl font-bold text-white">{totalSolved}</div>
          <div className="rounded-full bg-secondary/30 p-2">
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </div>
        </div>
        
        {data.leetcode.username && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-secondary/50">
              Easy: {easySolved}
            </Badge>
            <Badge variant="secondary" className="bg-secondary/50">
              Medium: {mediumSolved}
            </Badge>
            <Badge variant="secondary" className="bg-secondary/50">
              Hard: {hardSolved}
            </Badge>
          </div>
        )}
        
        {data.codeforces.username && data.codeforces.rating && (
          <div className="mt-2">
            <Badge variant="secondary" className="bg-secondary/50">
              Rating: {data.codeforces.rating}
            </Badge>
            {data.codeforces.rank && (
              <Badge variant="secondary" className="bg-secondary/50 ml-2">
                Rank: {data.codeforces.rank}
              </Badge>
            )}
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <Settings className="mr-1 h-3 w-3" />
              Edit Profiles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}