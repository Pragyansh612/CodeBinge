"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jun", problems: 45 },
  { name: "Jul", problems: 82 },
  { name: "Aug", problems: 63 },
  { name: "Sep", problems: 75 },
]

export function ActivityGraph() {
  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-neon-cyan" />
            <CardTitle className="text-lg font-medium">Solved Problems</CardTitle>
          </div>
          <Badge variant="outline" className="bg-secondary/50">
            7 Active days
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">past 4 months</p>
      </CardHeader>
      <CardContent className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.375rem",
              }}
              itemStyle={{ color: "#f8fafc" }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <Area type="monotone" dataKey="problems" stroke="#00e5ff" fillOpacity={1} fill="url(#colorProblems)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

