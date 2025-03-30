"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const allProblems = [
  {
    id: 1,
    title: "Two Sum",
    platform: "LeetCode",
    difficulty: "Easy",
    tags: ["Arrays", "Hash Table"],
    company: "Amazon",
    recentActivity: true,
  },
  {
    id: 2,
    title: "Valid Parentheses",
    platform: "LeetCode",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    company: "Google",
    recentActivity: true,
  },
  {
    id: 3,
    title: "Merge Intervals",
    platform: "LeetCode",
    difficulty: "Medium",
    tags: ["Arrays", "Sorting"],
    company: "Facebook",
    recentActivity: false,
  },
  {
    id: 4,
    title: "Number of Islands",
    platform: "LeetCode",
    difficulty: "Medium",
    tags: ["DFS", "BFS", "Graph"],
    company: "Amazon",
    recentActivity: false,
  },
  {
    id: 5,
    title: "Trapping Rain Water",
    platform: "LeetCode",
    difficulty: "Hard",
    tags: ["Arrays", "Two Pointers", "Dynamic Programming"],
    company: "Google",
    recentActivity: false,
  },
  {
    id: 6,
    title: "Minimum Spanning Tree",
    platform: "CodeChef",
    difficulty: "Medium",
    tags: ["Graph", "Greedy"],
    company: "Microsoft",
    recentActivity: true,
  },
  {
    id: 7,
    title: "Longest Increasing Subsequence",
    platform: "Codeforces",
    difficulty: "Medium",
    tags: ["Dynamic Programming"],
    company: "Apple",
    recentActivity: false,
  },
]

export function RecommendedProblems() {
  const [difficulties, setDifficulties] = useState<string[]>(["Easy", "Medium", "Hard"])
  const [platforms, setPlatforms] = useState<string[]>(["LeetCode", "CodeChef", "Codeforces"])
  const [companies, setCompanies] = useState<string[]>(["Amazon", "Google", "Facebook", "Microsoft", "Apple"])
  const [showRecentOnly, setShowRecentOnly] = useState<boolean>(false)

  const filteredProblems = allProblems.filter((problem) => {
    if (!difficulties.includes(problem.difficulty)) return false
    if (!platforms.includes(problem.platform)) return false
    if (!companies.includes(problem.company)) return false
    if (showRecentOnly && !problem.recentActivity) return false
    return true
  })

  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-neon-purple" />
            <CardTitle className="text-lg font-medium">Recommended Problems</CardTitle>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1 bg-secondary/20 border-secondary/50">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={difficulties.includes("Easy")}
                  onCheckedChange={(checked) => {
                    checked
                      ? setDifficulties([...difficulties, "Easy"])
                      : setDifficulties(difficulties.filter((d) => d !== "Easy"))
                  }}
                >
                  Easy
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={difficulties.includes("Medium")}
                  onCheckedChange={(checked) => {
                    checked
                      ? setDifficulties([...difficulties, "Medium"])
                      : setDifficulties(difficulties.filter((d) => d !== "Medium"))
                  }}
                >
                  Medium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={difficulties.includes("Hard")}
                  onCheckedChange={(checked) => {
                    checked
                      ? setDifficulties([...difficulties, "Hard"])
                      : setDifficulties(difficulties.filter((d) => d !== "Hard"))
                  }}
                >
                  Hard
                </DropdownMenuCheckboxItem>

                <DropdownMenuLabel className="mt-2">Platform</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={platforms.includes("LeetCode")}
                  onCheckedChange={(checked) => {
                    checked
                      ? setPlatforms([...platforms, "LeetCode"])
                      : setPlatforms(platforms.filter((p) => p !== "LeetCode"))
                  }}
                >
                  LeetCode
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={platforms.includes("CodeChef")}
                  onCheckedChange={(checked) => {
                    checked
                      ? setPlatforms([...platforms, "CodeChef"])
                      : setPlatforms(platforms.filter((p) => p !== "CodeChef"))
                  }}
                >
                  CodeChef
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={platforms.includes("Codeforces")}
                  onCheckedChange={(checked) => {
                    checked
                      ? setPlatforms([...platforms, "Codeforces"])
                      : setPlatforms(platforms.filter((p) => p !== "Codeforces"))
                  }}
                >
                  Codeforces
                </DropdownMenuCheckboxItem>

                <DropdownMenuLabel className="mt-2">Company</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Amazon", "Google", "Facebook", "Microsoft", "Apple"].map((company) => (
                  <DropdownMenuCheckboxItem
                    key={company}
                    checked={companies.includes(company)}
                    onCheckedChange={(checked) => {
                      checked
                        ? setCompanies([...companies, company])
                        : setCompanies(companies.filter((c) => c !== company))
                    }}
                  >
                    {company}
                  </DropdownMenuCheckboxItem>
                ))}

                <DropdownMenuLabel className="mt-2">Activity</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={showRecentOnly} onCheckedChange={setShowRecentOnly}>
                  Recent Activity Only
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Based on your recent activity</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="flex items-center justify-between rounded-lg bg-secondary/20 p-3 transition-all duration-200 hover:bg-secondary/30"
              >
                <div>
                  <h3 className="font-medium">{problem.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="bg-secondary/50 text-xs">
                      {problem.platform}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        problem.difficulty === "Easy"
                          ? "bg-green-950/50 text-green-500"
                          : problem.difficulty === "Medium"
                            ? "bg-yellow-950/50 text-yellow-500"
                            : "bg-red-950/50 text-red-500"
                      }`}
                    >
                      {problem.difficulty}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-950/50 text-purple-400 text-xs">
                      {problem.company}
                    </Badge>
                    {problem.recentActivity && (
                      <Badge variant="outline" className="bg-blue-950/50 text-blue-400 text-xs">
                        Recent
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {problem.tags.map((tag) => (
                    <span key={tag} className="rounded bg-secondary/40 px-1.5 py-0.5 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-secondary/20 p-3">
                <Filter className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-medium">No problems match your filters</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your filter criteria to see more problems
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

