import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame } from "lucide-react"

export function DailyStreak() {
  const current = 15
  const target = 20
  const percentage = (current / target) * 100

  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Daily Streak</CardTitle>
          <div className="rounded-full bg-secondary/30 p-1.5">
            <Flame className="h-4 w-4 text-neon-cyan" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Solve 20 Problems</p>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-2xl font-bold text-neon-cyan">{current}</span>
          <span className="text-sm text-muted-foreground">of {target}</span>
        </div>
        <Progress value={percentage} className="h-2 bg-secondary" />
      </CardContent>
    </Card>
  )
}

