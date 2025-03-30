"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const monthlyData = [
  { name: "Jan", problems: 45, difficulty: 2.3, time: 35 },
  { name: "Feb", problems: 52, difficulty: 2.5, time: 32 },
  { name: "Mar", problems: 48, difficulty: 2.7, time: 30 },
  { name: "Apr", problems: 70, difficulty: 2.8, time: 28 },
  { name: "May", problems: 65, difficulty: 3.0, time: 25 },
  { name: "Jun", problems: 58, difficulty: 3.2, time: 22 },
  { name: "Jul", problems: 82, difficulty: 3.5, time: 20 },
  { name: "Aug", problems: 63, difficulty: 3.7, time: 18 },
  { name: "Sep", problems: 75, difficulty: 4.0, time: 15 },
]

const categoryData = [
  { name: "Arrays", count: 145 },
  { name: "Strings", count: 98 },
  { name: "DP", count: 76 },
  { name: "Trees", count: 65 },
  { name: "Graphs", count: 42 },
  { name: "Sorting", count: 38 },
  { name: "Greedy", count: 35 },
]

export function PerformanceAnalysis() {
  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Performance Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="problems">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="problems">Problems Solved</TabsTrigger>
            <TabsTrigger value="difficulty">Difficulty Progress</TabsTrigger>
            <TabsTrigger value="categories">Problem Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="problems" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          </TabsContent>

          <TabsContent value="difficulty" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[0, 5]} tickCount={6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#334155",
                    borderRadius: "0.375rem",
                  }}
                  itemStyle={{ color: "#f8fafc" }}
                  labelStyle={{ color: "#94a3b8" }}
                />
                <Line
                  type="monotone"
                  dataKey="difficulty"
                  stroke="#c026d3"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#c026d3" }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="#eab308"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#eab308" }}
                  activeDot={{ r: 6 }}
                />
                <Legend
                  formatter={(value) => (value === "difficulty" ? "Avg. Difficulty (1-5)" : "Avg. Time (min)")}
                  wrapperStyle={{ color: "#94a3b8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="categories" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" />
                <XAxis type="number" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#334155",
                    borderRadius: "0.375rem",
                  }}
                  itemStyle={{ color: "#f8fafc" }}
                  labelStyle={{ color: "#94a3b8" }}
                />
                <Bar dataKey="count" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={20}>
                  {categoryData.map((entry, index) => (
                    <defs key={`gradient-${index}`}>
                      <linearGradient id={`colorCategory${index}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#c026d3" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  ))}
                  {categoryData.map((entry, index) => (
                    <Bar
                      key={`bar-${index}`}
                      dataKey="count"
                      fill={`url(#colorCategory${index})`}
                      radius={[0, 4, 4, 0]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

