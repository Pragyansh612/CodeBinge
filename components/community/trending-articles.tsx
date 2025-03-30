import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

const articles = [
  {
    title: "Mastering Binary Search: A Comprehensive Guide",
    author: "David Kim",
    views: "2.4k",
  },
  {
    title: "Top 10 Dynamic Programming Patterns for Interviews",
    author: "Emily Chen",
    views: "1.8k",
  },
  {
    title: "System Design: Building a Scalable Web Crawler",
    author: "Michael Johnson",
    views: "1.5k",
  },
  {
    title: "From Novice to Expert: My Competitive Programming Journey",
    author: "Sarah Williams",
    views: "1.2k",
  },
]

export function TrendingArticles() {
  return (
    <Card className="glow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Trending Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-md bg-secondary/20 p-3 transition-colors hover:bg-secondary/30"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary/50">
                <FileText className="h-4 w-4 text-neon-purple" />
              </div>
              <div>
                <h3 className="font-medium">{article.title}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

