"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { subject: "Arrays", you: 80, friend: 65 },
  { subject: "Strings", you: 70, friend: 75 },
  { subject: "DP", you: 60, friend: 90 },
  { subject: "Trees", you: 85, friend: 70 },
  { subject: "Graphs", you: 65, friend: 80 },
  { subject: "Sorting", you: 90, friend: 85 },
  { subject: "Greedy", you: 75, friend: 60 },
]

export function SkillRadar() {
  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Skill Comparison</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <div className="mb-2 flex justify-end gap-4">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-neon-cyan" />
            <span className="text-sm">You</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="text-sm">Friend</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8" }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#94a3b8" }} axisLine={false} />
            <Radar name="You" dataKey="you" stroke="#00e5ff" fill="#00e5ff" fillOpacity={0.3} />
            <Radar name="Friend" dataKey="friend" stroke="#eab308" fill="#eab308" fillOpacity={0.3} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.375rem",
              }}
              itemStyle={{ color: "#f8fafc" }}
              labelStyle={{ color: "#94a3b8" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

