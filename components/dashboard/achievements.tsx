"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Award, Zap, Target } from "lucide-react"
import { useDashboardData } from "@/contexts/dashboard-data-context"

// Define types for achievements
interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  completed: boolean;
  date: string;
  category: string;
}

export function Achievements() {
  const { data } = useDashboardData()
  const [filter, setFilter] = useState("all")
  
  // Calculate achievements based on actual user data from API
  const achievements = useMemo((): Achievement[] => {
    const leetcode = data.leetcode
    const codeforces = data.codeforces
    const totalSolved = (leetcode.totalSolved || 0) + (codeforces.totalSolved || 0)
    const currentDate = new Date()
    const formattedDate = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
    
    // Achievement thresholds
    const problemSolverThreshold = 100
    const streakMasterThreshold = 30
    const algorithmAceThreshold = 5 // Categories covered
    const contestChampionThreshold = 1500 // Codeforces rating threshold
    const dpGuruThreshold = Math.round((leetcode.mediumSolved || 0) * 0.3 + (leetcode.hardSolved || 0) * 0.6) // Estimate DP problems
    const graphMasterThreshold = Math.round((leetcode.hardSolved || 0) * 0.5) // Estimate graph problems
    const leetcodeWarriorThreshold = 100 // LeetCode problems
    const codeforcesExpertThreshold = 1600 // Codeforces rating

    // Calculate how many algorithm categories the user has likely covered
    const estimatedCategoriesCovered = Math.min(8, Math.floor(totalSolved / 50) + 1)
    
    return [
      {
        id: 1,
        title: "Problem Solver",
        description: `Solved ${problemSolverThreshold}+ problems across all platforms`,
        icon: Zap,
        progress: Math.min(100, Math.round((totalSolved / problemSolverThreshold) * 100)),
        completed: totalSolved >= problemSolverThreshold,
        date: totalSolved >= problemSolverThreshold ? formattedDate : "",
        category: "milestones",
      },
      {
        id: 2,
        title: "Streak Master",
        description: `Maintained a ${streakMasterThreshold}-day coding streak`,
        icon: Target,
        progress: 40, // Simulated streak progress since we don't have actual streak data
        completed: false,
        date: "",
        category: "milestones",
      },
      {
        id: 3,
        title: "Algorithm Ace",
        description: "Solved problems from all algorithm categories",
        icon: Award,
        progress: Math.min(100, Math.round((estimatedCategoriesCovered / algorithmAceThreshold) * 100)),
        completed: estimatedCategoriesCovered >= algorithmAceThreshold,
        date: estimatedCategoriesCovered >= algorithmAceThreshold ? formattedDate : "",
        category: "milestones",
      },
      {
        id: 4,
        title: "Contest Champion",
        description: "Ranked in the top 10% in a global contest",
        icon: Trophy,
        progress: codeforces.rating ? Math.min(100, Math.round((codeforces.rating / contestChampionThreshold) * 100)) : 0,
        completed: codeforces.rating ? codeforces.rating >= contestChampionThreshold : false,
        date: codeforces.rating && codeforces.rating >= contestChampionThreshold ? formattedDate : "",
        category: "contests",
      },
      {
        id: 5,
        title: "Dynamic Programming Guru",
        description: "Solved 50 DP problems",
        icon: Star,
        progress: Math.min(100, Math.round((dpGuruThreshold / 50) * 100)),
        completed: dpGuruThreshold >= 50,
        date: dpGuruThreshold >= 50 ? formattedDate : "",
        category: "topics",
      },
      {
        id: 6,
        title: "Graph Theory Master",
        description: "Solved 30 graph problems",
        icon: Star,
        progress: Math.min(100, Math.round((graphMasterThreshold / 30) * 100)),
        completed: graphMasterThreshold >= 30,
        date: graphMasterThreshold >= 30 ? formattedDate : "",
        category: "topics",
      },
      {
        id: 7,
        title: "LeetCode Warrior",
        description: `Solved ${leetcodeWarriorThreshold} problems on LeetCode`,
        icon: Award,
        progress: Math.min(100, Math.round(((leetcode.totalSolved || 0) / leetcodeWarriorThreshold) * 100)),
        completed: (leetcode.totalSolved || 0) >= leetcodeWarriorThreshold,
        date: (leetcode.totalSolved || 0) >= leetcodeWarriorThreshold ? formattedDate : "",
        category: "platforms",
      },
      {
        id: 8,
        title: "Codeforces Expert",
        description: `Reached Expert rating (${codeforcesExpertThreshold}+) on Codeforces`,
        icon: Trophy,
        progress: codeforces.rating ? Math.min(100, Math.round((codeforces.rating / codeforcesExpertThreshold) * 100)) : 0,
        completed: codeforces.rating ? codeforces.rating >= codeforcesExpertThreshold : false,
        date: codeforces.rating && codeforces.rating >= codeforcesExpertThreshold ? formattedDate : "",
        category: "platforms",
      },
    ]
  }, [data.leetcode, data.codeforces])

  const filteredAchievements = filter === "all" ? achievements : achievements.filter((a) => a.category === filter)

  // If no platform has been connected, show a message
  if (!data.leetcode.username && !data.codeforces.username) {
    return (
      <Card className="glow-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-lg font-medium">Achievements & Badges</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center">
            <p className="text-muted-foreground">
              Connect your profiles to track achievements.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <CardTitle className="text-lg font-medium">Achievements & Badges</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="mb-4 grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="contests">Contests</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative overflow-hidden rounded-lg border border-secondary/50 bg-secondary/10 p-4 transition-all duration-300 hover:bg-secondary/20 ${
                    achievement.completed ? "ring-1 ring-yellow-500/30" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`rounded-full p-2 ${
                        achievement.completed
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-secondary/30 text-muted-foreground"
                      }`}
                    >
                      <achievement.icon className="h-5 w-5" />
                    </div>

                    {achievement.completed && (
                      <div className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs text-yellow-400">Completed</div>
                    )}
                  </div>

                  <h3 className="mt-3 font-semibold">{achievement.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{achievement.description}</p>

                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary/30">
                    <div
                      className={`h-full rounded-full ${achievement.completed ? "bg-yellow-400" : "bg-neon-cyan"}`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{achievement.progress}% complete</span>
                    {achievement.completed && <span className="text-xs text-muted-foreground">{achievement.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}