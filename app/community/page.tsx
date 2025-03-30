import type { Metadata } from "next"
import { CommunityFeed } from "@/components/community/community-feed"
import { PopularTopics } from "@/components/community/popular-topics"
import { TrendingArticles } from "@/components/community/trending-articles"
import { CommunityMembers } from "@/components/community/community-members"

export const metadata: Metadata = {
  title: "Community | Codefolio",
  description: "Connect with other coders and share knowledge",
}

export default function CommunityPage() {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Community</h1>
        <p className="text-muted-foreground">Connect with other coders and share knowledge</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CommunityFeed />
        </div>
        <div className="space-y-6">
          <PopularTopics />
          <TrendingArticles />
          <CommunityMembers />
        </div>
      </div>
    </div>
  )
}

