"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", you: 10, friend: 5 },
  { day: "Tue", you: 2, friend: 18 },
  { day: "Wed", you: 15, friend: 14 },
  { day: "Thu", you: 5, friend: 0 },
  { day: "Fri", you: 3, friend: 0 },
  { day: "Sat", you: 9, friend: 0 },
  { day: "Sun", you: 20, friend: 0 },
]

export function WeeklyComparison() {
  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Current Week Comparison</CardTitle>
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
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
            <XAxis dataKey="day" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.375rem",
              }}
              itemStyle={{ color: "#f8fafc" }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <Bar dataKey="friend" fill="#eab308" radius={[4, 4, 0, 0]} />
            <Bar dataKey="you" fill="#00e5ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

