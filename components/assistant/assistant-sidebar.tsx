"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Target, HelpCircle } from "lucide-react"

const weaknesses = [
  { topic: "Dynamic Programming", count: 12, percentage: 35 },
  { topic: "Graph Algorithms", count: 8, percentage: 42 },
  { topic: "Bit Manipulation", count: 5, percentage: 28 },
]

const strengths = [
  { topic: "Array Manipulation", count: 45, percentage: 92 },
  { topic: "String Algorithms", count: 38, percentage: 85 },
  { topic: "Binary Search", count: 32, percentage: 88 },
]

const recommendations = [
  {
    id: 1,
    title: "Coin Change",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Dynamic Programming",
  },
  {
    id: 2,
    title: "Number of Islands",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Graph Algorithms",
  },
  {
    id: 3,
    title: "Counting Bits",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Bit Manipulation",
  },
]

const sampleQuestions = [
  "How many problems have I solved in total?",
  "What's my progress on LeetCode?",
  "What are my weakest topics?",
  "Show me my monthly performance",
  "What's my current streak?",
  "Recommend problems for my weak areas",
  "How am I doing on my weekly target?",
  "Show me a DP code example",
  "What topics should I focus on?",
  "Compare my CodeChef and Codeforces stats",
]

export function AssistantSidebar() {
  return (
    <div className="space-y-6">
      <Card className="glow-card">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-neon-cyan" />
            <CardTitle className="text-lg font-medium">Sample Questions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sampleQuestions.map((question, index) => (
              <div
                key={index}
                className="rounded-md bg-secondary/20 p-2 text-sm cursor-pointer hover:bg-secondary/30 transition-colors"
                onClick={() => {
                  const inputElement = document.getElementById("assistant-input") as HTMLInputElement
                  if (inputElement) {
                    inputElement.value = question
                    inputElement.focus()
                    // Trigger input event to update state
                    const event = new Event("input", { bubbles: true })
                    inputElement.dispatchEvent(event)
                  }
                }}
              >
                {question}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glow-card">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-neon-purple" />
            <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weaknesses">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
            </TabsList>

            <TabsContent value="weaknesses" className="mt-0 space-y-3">
              {weaknesses.map((item) => (
                <div key={item.topic} className="rounded-md bg-secondary/20 p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{item.topic}</h3>
                    <Badge variant="outline" className="bg-red-950/50 text-red-400">
                      {item.percentage}%
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Solved {item.count} problems in this category</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/30">
                    <div className="h-full rounded-full bg-red-500/70" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="strengths" className="mt-0 space-y-3">
              {strengths.map((item) => (
                <div key={item.topic} className="rounded-md bg-secondary/20 p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{item.topic}</h3>
                    <Badge variant="outline" className="bg-green-950/50 text-green-400">
                      {item.percentage}%
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Solved {item.count} problems in this category</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/30">
                    <div className="h-full rounded-full bg-green-500/70" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="glow-card">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-neon-cyan" />
            <CardTitle className="text-lg font-medium">Recommended Problems</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((problem) => (
              <div key={problem.id} className="rounded-md bg-secondary/20 p-3 transition-colors hover:bg-secondary/30">
                <h3 className="font-medium">{problem.title}</h3>
                <div className="mt-1 flex flex-wrap gap-2">
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
                    {problem.topic}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

