import { Card, CardContent } from "@/components/ui/card"

interface PlatformStatsProps {
  platform: string
  username: string
  solved: number
  icon: string
}

export function PlatformStats({ platform, username, solved, icon }: PlatformStatsProps) {
  return (
    <Card className="glow-card overflow-hidden transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xl">{icon}</div>
            <div>
              <h3 className="font-semibold">{platform}</h3>
              <p className="text-xs text-muted-foreground">{username}</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{solved}</div>
        </div>
      </CardContent>
    </Card>
  )
}

