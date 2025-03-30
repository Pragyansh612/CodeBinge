import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Zap } from "lucide-react"

const contests = [
  {
    id: 1,
    day: 11,
    month: "Sep",
    platform: "CodeChef",
    name: "Starters 151",
    date: "11 Sep 2024",
    time: "08:00 PM - 10:00 PM",
    duration: "2 hrs",
    added: true,
    icon: "🍴",
  },
  {
    id: 2,
    day: 12,
    month: "Sep",
    platform: "CodeStudio",
    name: "Weekly Contest 143",
    date: "12 Sep 2024",
    time: "02:30 PM - 04:30 PM",
    duration: "2 hrs",
    added: true,
    icon: "🚀",
  },
  {
    id: 3,
    day: 14,
    month: "Sep",
    platform: "LeetCode",
    name: "Biweekly Contest 139",
    date: "14 Sep 2024",
    time: "02:30 PM - 04:00 PM",
    duration: "1 hr 30 mins",
    added: false,
    icon: "⚡",
  },
]

export function UpcomingContests() {
  return (
    <div className="space-y-4">
      {contests.map((contest) => (
        <Card key={contest.id} className="glow-card overflow-hidden">
          <CardContent className="p-0">
            <div className="flex">
              <div className="flex w-16 flex-col items-center justify-center bg-secondary/30 p-4">
                <span className="text-lg font-bold">{contest.day}</span>
                <span className="text-sm text-muted-foreground">{contest.month}</span>
              </div>
              <div className="flex flex-1 items-center justify-between p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{contest.icon}</span>
                    <h3 className="font-semibold">{contest.name}</h3>
                    <Badge variant="outline" className="ml-2 bg-secondary/50">
                      {contest.platform}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{contest.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{contest.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-neon-cyan" />
                    <span className="text-sm">{contest.duration}</span>
                  </div>
                  <button
                    className={`rounded-md px-3 py-1 text-sm ${
                      contest.added ? "bg-teal-900/50 text-teal-400" : "bg-secondary/50 hover:bg-secondary/80"
                    }`}
                  >
                    {contest.added ? "Added to Calendar" : "Add to Calendar"}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

