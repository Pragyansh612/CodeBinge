import type { Metadata } from "next"
import { ContestCalendar } from "@/components/contests/contest-calendar"
import { UpcomingContests } from "@/components/contests/upcoming-contests"

export const metadata: Metadata = {
  title: "Contests | CodeBinge",
  description: "Track upcoming coding contests",
}

export default function ContestsPage() {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Contests</h1>
        <p className="text-muted-foreground">Track and prepare for upcoming coding contests</p>
      </div>

      <ContestCalendar />

      <div className="mt-6">
        <UpcomingContests />
      </div>
    </div>
  )
}

