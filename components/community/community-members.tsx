import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const members = [
  {
    name: "Alex Morgan",
    username: "alex_morgan",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Top Contributor",
  },
  {
    name: "Sarah Chen",
    username: "sarah_chen",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Mentor",
  },
  {
    name: "David Kim",
    username: "david_kim",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Contest Winner",
  },
  {
    name: "Emily Johnson",
    username: "emily_j",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Article Writer",
  },
]

export function CommunityMembers() {
  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Active Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.username}
              className="flex items-center justify-between rounded-md bg-secondary/20 p-2 transition-colors hover:bg-secondary/30"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-xs text-muted-foreground">@{member.username}</div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`
                  ${
                    member.badge === "Top Contributor"
                      ? "bg-blue-950/50 text-blue-400"
                      : member.badge === "Mentor"
                        ? "bg-purple-950/50 text-purple-400"
                        : member.badge === "Contest Winner"
                          ? "bg-yellow-950/50 text-yellow-400"
                          : "bg-green-950/50 text-green-400"
                  }
                `}
              >
                {member.badge}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

