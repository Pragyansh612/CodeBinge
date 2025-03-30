"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const difficultyData = [
  { name: "Easy", value: 145, color: "#22c55e" },
  { name: "Medium", value: 98, color: "#eab308" },
  { name: "Hard", value: 43, color: "#ef4444" },
]

const topicData = [
  { name: "Arrays", value: 75, color: "#3b82f6" },
  { name: "Strings", value: 45, color: "#8b5cf6" },
  { name: "DP", value: 38, color: "#ec4899" },
  { name: "Trees", value: 32, color: "#10b981" },
  { name: "Graphs", value: 28, color: "#f97316" },
  { name: "Others", value: 68, color: "#6b7280" },
]

const platformData = [
  { name: "LeetCode", value: 120, color: "#eab308" },
  { name: "Codeforces", value: 85, color: "#3b82f6" },
  { name: "CodeChef", value: 45, color: "#8b5cf6" },
  { name: "GeeksforGeeks", value: 36, color: "#10b981" },
]

export function ProblemDistribution() {
  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Problem Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="difficulty">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="difficulty">Difficulty</TabsTrigger>
            <TabsTrigger value="topic">Topic</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
          </TabsList>

          <TabsContent value="difficulty" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#334155",
                    borderRadius: "0.375rem",
                  }}
                  itemStyle={{ color: "#f8fafc" }}
                  formatter={(value) => [`${value} problems`, ""]}
                />
                <Legend formatter={(value, entry) => <span style={{ color: "#94a3b8" }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="topic" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {topicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#334155",
                    borderRadius: "0.375rem",
                  }}
                  itemStyle={{ color: "#f8fafc" }}
                  formatter={(value) => [`${value} problems`, ""]}
                />
                <Legend formatter={(value, entry) => <span style={{ color: "#94a3b8" }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="platform" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#334155",
                    borderRadius: "0.375rem",
                  }}
                  itemStyle={{ color: "#f8fafc" }}
                  formatter={(value) => [`${value} problems`, ""]}
                />
                <Legend formatter={(value, entry) => <span style={{ color: "#94a3b8" }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

