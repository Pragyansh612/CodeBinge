"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDashboardData } from "@/contexts/dashboard-data-context"
import { useEffect, useMemo, useState } from "react"
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

// Define types for the chart data
interface MonthlyDataPoint {
  name: string;
  problems: number;
  difficulty: number;
  time: number;
}

interface CategoryDataPoint {
  name: string;
  count: number;
}

export function PerformanceAnalysis() {
  const { data } = useDashboardData()
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([])
  const [categoryData, setCategoryData] = useState<CategoryDataPoint[]>([])

  // Generate simulated monthly data based on real total solved problems
  useEffect(() => {
    const leetcodeSolved = data.leetcode.totalSolved || 0
    const codeforcesSolved = data.codeforces.totalSolved || 0
    const totalSolved = leetcodeSolved + codeforcesSolved

    if (totalSolved > 0) {
      // Create a distribution pattern based on total solved
      // This simulates monthly progress using the actual total as reference
      const generateMonthlyDistribution = (): MonthlyDataPoint[] => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
        const baseValue = Math.round(totalSolved / 15) // Base monthly value
        
        return months.map((name, index) => {
          // Create some variation in the monthly distribution
          const variationFactor = 0.7 + Math.random() * 0.6
          const problems = Math.round(baseValue * variationFactor)
          
          // Gradually increase difficulty and decrease time as skills improve
          const difficulty = Math.min(5, 2 + (index * 0.2))
          const time = Math.max(15, 35 - (index * 2))
          
          return { name, problems, difficulty, time }
        })
      }

      setMonthlyData(generateMonthlyDistribution())
    }
  }, [data.leetcode.totalSolved, data.codeforces.totalSolved])

  // Generate category data based on problem difficulty distribution
  useEffect(() => {
    if (data.leetcode.username) {
      const { easySolved, mediumSolved, hardSolved } = data.leetcode
      
      // Create category distribution using actual difficulty data
      const categories: CategoryDataPoint[] = [
        { name: "Arrays", count: Math.round((easySolved + mediumSolved) * 0.3) },
        { name: "Strings", count: Math.round((easySolved + mediumSolved) * 0.25) },
        { name: "DP", count: Math.round((mediumSolved + hardSolved) * 0.4) },
        { name: "Trees", count: Math.round((mediumSolved + hardSolved) * 0.3) },
        { name: "Graphs", count: Math.round(hardSolved * 0.6) },
        { name: "Sorting", count: Math.round(easySolved * 0.2) },
        { name: "Greedy", count: Math.round(mediumSolved * 0.15) },
      ]
      
      setCategoryData(categories)
    }
  }, [data.leetcode])
  
  // Calculate total problems solved from all platforms
  const totalProblems = useMemo(() => {
    return (data.leetcode.totalSolved || 0) + (data.codeforces.totalSolved || 0)
  }, [data.leetcode.totalSolved, data.codeforces.totalSolved])

  // If no data is available, show a message
  if (totalProblems === 0) {
    return (
      <Card className="glow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground">
              Connect your profiles and solve problems to see your performance analysis.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

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