"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Flame } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContributionCalendar() {
  const [currentMonth, setCurrentMonth] = useState("September")
  const [currentYear, setCurrentYear] = useState("2024")
  const [viewMode, setViewMode] = useState("month")

  // Generate calendar data
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const years = ["2022", "2023", "2024", "2025"]

  // Days of the week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Generate dates for the month
  const getDaysInMonth = (month: string, year: string) => {
    const monthIndex = months.indexOf(month)
    return new Date(Number.parseInt(year), monthIndex + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: string, year: string) => {
    const monthIndex = months.indexOf(month)
    return new Date(Number.parseInt(year), monthIndex, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

  // Generate contribution data (random for demo)
  const generateContributionData = () => {
    const data: Record<number, number> = {}
    for (let i = 1; i <= daysInMonth; i++) {
      // Random intensity between 0-4
      const random = Math.random()
      if (random < 0.5) {
        data[i] = 0 // 50% chance of no contribution
      } else if (random < 0.7) {
        data[i] = 1 // 20% chance of light contribution
      } else if (random < 0.85) {
        data[i] = 2 // 15% chance of medium contribution
      } else if (random < 0.95) {
        data[i] = 3 // 10% chance of high contribution
      } else {
        data[i] = 4 // 5% chance of very high contribution
      }
    }
    return data
  }

  const contributionData = generateContributionData()

  // Get color based on contribution intensity
  const getContributionColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return "bg-secondary/30"
      case 1:
        return "bg-teal-900/70"
      case 2:
        return "bg-teal-700/80"
      case 3:
        return "bg-teal-500/90"
      case 4:
        return "bg-teal-400"
      default:
        return "bg-secondary/30"
    }
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    const currentMonthIndex = months.indexOf(currentMonth)
    if (currentMonthIndex === 0) {
      setCurrentMonth(months[11])
      setCurrentYear((Number.parseInt(currentYear) - 1).toString())
    } else {
      setCurrentMonth(months[currentMonthIndex - 1])
    }
  }

  const goToNextMonth = () => {
    const currentMonthIndex = months.indexOf(currentMonth)
    if (currentMonthIndex === 11) {
      setCurrentMonth(months[0])
      setCurrentYear((Number.parseInt(currentYear) + 1).toString())
    } else {
      setCurrentMonth(months[currentMonthIndex + 1])
    }
  }

  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-neon-cyan" />
            <CardTitle className="text-lg font-medium">Contribution Calendar</CardTitle>
          </div>
          <Badge variant="outline" className="bg-secondary/50">
            {Object.values(contributionData).filter((v) => v > 0).length} Active days
          </Badge>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={goToPreviousMonth} className="rounded-full p-1 hover:bg-secondary/50">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <Select value={currentMonth} onValueChange={setCurrentMonth}>
                <SelectTrigger className="w-[130px] bg-secondary/20 border-none">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={currentYear} onValueChange={setCurrentYear}>
                <SelectTrigger className="w-[90px] bg-secondary/20 border-none">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button onClick={goToNextMonth} className="rounded-full p-1 hover:bg-secondary/50">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Less</span>
            <div className="flex gap-1">
              <div className={`h-3 w-3 rounded-sm bg-secondary/30`}></div>
              <div className={`h-3 w-3 rounded-sm bg-teal-900/70`}></div>
              <div className={`h-3 w-3 rounded-sm bg-teal-700/80`}></div>
              <div className={`h-3 w-3 rounded-sm bg-teal-500/90`}></div>
              <div className={`h-3 w-3 rounded-sm bg-teal-400`}></div>
            </div>
            <span className="text-xs text-muted-foreground">More</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center">
          {days.map((day) => (
            <div key={day} className="py-1 text-xs text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Empty cells for days before the 1st */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="h-8" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const date = i + 1
            const intensity = contributionData[date] || 0

            return (
              <div
                key={date}
                className={`flex h-8 items-center justify-center rounded-md text-xs ${getContributionColor(intensity)}`}
                title={`${date} ${currentMonth}: ${intensity} contributions`}
              >
                {date}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

