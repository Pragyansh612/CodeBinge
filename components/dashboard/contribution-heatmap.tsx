"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"

export function ContributionHeatmap() {
  // Generate some random data for the heatmap
  const months = ["Jun", "Jul", "Aug", "Sep"]
  const generateHeatmapData = () => {
    const data = []
    for (let month = 0; month < 4; month++) {
      for (let week = 0; week < 4; week++) {
        for (let day = 0; day < 7; day++) {
          const value = Math.random()
          const intensity = value > 0.8 ? 3 : value > 0.6 ? 2 : value > 0.3 ? 1 : 0
          data.push({
            month,
            week,
            day,
            intensity,
          })
        }
      }
    }
    return data
  }

  const heatmapData = generateHeatmapData()

  const getColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return "bg-secondary/30"
      case 1:
        return "bg-teal-900/70"
      case 2:
        return "bg-teal-700/80"
      case 3:
        return "bg-teal-500"
      default:
        return "bg-secondary/30"
    }
  }

  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-neon-cyan" />
            <CardTitle className="text-lg font-medium">Contribution Graph</CardTitle>
          </div>
          <Badge variant="outline" className="bg-secondary/50">
            0 Days streak
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">past 4 months</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          {months.map((month) => (
            <div key={month} className="text-sm text-muted-foreground">
              {month}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-28 gap-1">
          {heatmapData.map((cell, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-sm ${getColor(cell.intensity)}`}
              title={`${cell.intensity} contributions`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

