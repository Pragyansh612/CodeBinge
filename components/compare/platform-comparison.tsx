"use client"

import { Card, CardContent } from "@/components/ui/card"

interface PlatformComparisonProps {
  platform: string
  icon: string
  yourUsername: string
  yourScore: number
  friendUsername: string
  friendScore: number
}

export function PlatformComparison({
  platform,
  icon,
  yourUsername,
  yourScore,
  friendUsername,
  friendScore,
}: PlatformComparisonProps) {
  const total = yourScore + friendScore
  const yourPercentage = (yourScore / total) * 100
  const friendPercentage = (friendScore / total) * 100

  return (
    <Card className="glow-card overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <div className="text-xl">{icon}</div>
          <h3 className="font-semibold">{platform}</h3>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="relative h-32 w-32">
            <svg className="h-32 w-32" viewBox="0 0 36 36">
              {/* Background circle */}
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-secondary" strokeWidth="3.8" />

              {/* Friend's progress */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-yellow-400"
                strokeWidth="3.8"
                strokeDasharray="100"
                strokeDashoffset={100 - friendPercentage}
                transform="rotate(-90 18 18)"
              />

              {/* Your progress */}
              <circle
                cx="18"
                cy="18"
                r="12"
                fill="none"
                className="stroke-neon-cyan"
                strokeWidth="3.8"
                strokeDasharray="100"
                strokeDashoffset={100 - yourPercentage}
                transform="rotate(-90 18 18)"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="text-center">
            <p className="text-sm text-yellow-400">{friendUsername}</p>
            <p className="text-xl font-bold">{friendScore}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-neon-cyan">{yourUsername}</p>
            <p className="text-xl font-bold">{yourScore}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

