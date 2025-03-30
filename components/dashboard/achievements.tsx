"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Award, Zap, Target } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "Problem Solver",
    description: "Solved 1000+ problems across all platforms",
    icon: Zap,
    progress: 100,
    completed: true,
    date: "Aug 15, 2024",
    category: "milestones",
  },
  {
    id: 2,
    title: "Streak Master",
    description: "Maintained a 30-day coding streak",
    icon: Target,
    progress: 100,
    completed: true,
    date: "Jul 22, 2024",
    category: "milestones",
  },
  {
    id: 3,
    title: "Algorithm Ace",
    description: "Solved problems from all algorithm categories",
    icon: Award,
    progress: 85,
    completed: false,
    date: "",
    category: "milestones",
  },
  {
    id: 4,
    title: "Contest Champion",
    description: "Ranked in the top 10% in a global contest",
    icon: Trophy,
    progress: 100,
    completed: true,
    date: "Sep 5, 2024",
    category: "contests",
  },
  {
    id: 5,
    title: "Dynamic Programming Guru",
    description: "Solved 50 DP problems",
    icon: Star,
    progress: 72,
    completed: false,
    date: "",
    category: "topics",
  },
  {
    id: 6,
    title: "Graph Theory Master",
    description: "Solved 30 graph problems",
    icon: Star,
    progress: 60,
    completed: false,
    date: "",
    category: "topics",
  },
  {
    id: 7,
    title: "LeetCode Warrior",
    description: "Solved 500 problems on LeetCode",
    icon: Award,
    progress: 100,
    completed: true,
    date: "Jun 10, 2024",
    category: "platforms",
  },
  {
    id: 8,
    title: "Codeforces Expert",
    description: "Reached Expert rating (1600+) on Codeforces",
    icon: Trophy,
    progress: 80,
    completed: false,
    date: "",
    category: "platforms",
  },
]

export function Achievements() {
  const [filter, setFilter] = useState("all")

  const filteredAchievements = filter === "all" ? achievements : achievements.filter((a) => a.category === filter)

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

