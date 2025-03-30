import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Code2 } from "lucide-react"

export function FeaturedArticle() {
  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary/50">
            <Code2 className="h-5 w-5 text-neon-cyan" />
          </div>
          <div>
            <h3 className="font-semibold">The Role of Component Libraries in Modern React Development</h3>
            <p className="text-xs text-muted-foreground">~ louise_antony</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          In the fast-paced world of web development, efficiency and consistency are paramount. Component libraries in
          React play a crucial role in maintaining these qualities while accelerating development...
        </p>
        <button className="mt-4 text-sm font-medium text-neon-cyan hover:underline">Read more</button>
      </CardContent>
    </Card>
  )
}

