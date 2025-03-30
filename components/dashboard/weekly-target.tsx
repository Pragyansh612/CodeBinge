import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WeeklyTarget() {
  const days = ["M", "T", "W", "T", "F", "S", "S"]
  const progress = [2, 3, 4, 3, 2, 0, 0] // Progress for each day
  const target = 7 // Target for the week
  const achieved = progress.reduce((sum, day) => sum + (day > 0 ? 1 : 0), 0)

  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Weekly Target</CardTitle>
          <div className="text-sm">
            <span className="text-neon-cyan">{achieved}</span>
            <span className="text-muted-foreground">/{target} Achieved</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">9 Sept - 15 Sept</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {days.map((day, index) => (
            <div key={day + index} className="flex flex-col items-center">
              <div className="relative h-12 w-12">
                <svg className="h-12 w-12" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-secondary" strokeWidth="2" />
                  {progress[index] > 0 && (
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-neon-cyan"
                      strokeWidth="2"
                      strokeDasharray="100"
                      strokeDashoffset={100 - (progress[index] / 5) * 100}
                      transform="rotate(-90 18 18)"
                    />
                  )}
                </svg>
              </div>
              <span className="mt-1 text-sm">{day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

