"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ContestCalendar() {
  const [currentMonth, setCurrentMonth] = useState("Sep 2024")

  // Generate calendar data
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const dates = Array.from({ length: 30 }, (_, i) => i + 1)

  // Contest indicators (red dots)
  const contestDays = [11, 12, 15, 18, 19, 20, 23, 30]

  // Current selected date
  const [selectedDate, setSelectedDate] = useState(9)

  return (
    <Card className="glow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <button className="rounded-full p-1 hover:bg-secondary/50">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold">{currentMonth}</h2>
        <button className="rounded-full p-1 hover:bg-secondary/50">
          <ChevronRight className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center">
          {days.map((day) => (
            <div key={day} className="py-1 text-sm text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Empty cells for days before the 1st */}
          {Array.from({ length: 0 }, (_, i) => (
            <div key={`empty-${i}`} className="h-8" />
          ))}

          {dates.map((date) => (
            <div
              key={date}
              className={`relative flex h-8 cursor-pointer items-center justify-center rounded-md text-sm transition-colors ${
                date === selectedDate ? "bg-secondary/80 font-medium text-white" : "hover:bg-secondary/50"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
              {contestDays.includes(date) && (
                <div className="absolute -bottom-1 flex justify-center">
                  <div className="h-1 w-1 rounded-full bg-red-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

