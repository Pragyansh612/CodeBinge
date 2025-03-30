import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash } from "lucide-react"

const topics = [
  { name: "Dynamic Programming", count: 245 },
  { name: "Interview Prep", count: 189 },
  { name: "System Design", count: 156 },
  { name: "Competitive Programming", count: 132 },
  { name: "Algorithms", count: 124 },
  { name: "Career Advice", count: 98 },
]

export function PopularTopics() {
  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Popular Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.name}
              className="flex items-center justify-between rounded-md bg-secondary/20 p-2 transition-colors hover:bg-secondary/30"
            >
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-neon-cyan" />
                <span className="text-sm font-medium">{topic.name}</span>
              </div>
              <Badge variant="outline" className="bg-secondary/50">
                {topic.count}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

