"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ThumbsUp, Share2, Bookmark, Send } from "lucide-react"

const posts = [
  {
    id: 1,
    author: {
      name: "Jane Cooper",
      username: "jane_cooper",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just solved the 'Trapping Rain Water' problem on LeetCode using dynamic programming. It's a great problem to understand how to optimize space complexity. Anyone else tried this one?",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    category: "discussions",
    bookmarked: false,
  },
  {
    id: 2,
    author: {
      name: "Alex Morgan",
      username: "alex_morgan",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I'm preparing for a Google interview next month. Any recommendations for specific topics I should focus on? I've been doing a lot of graph and dynamic programming problems, but I'm wondering if there are other areas I should prioritize.",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 15,
    category: "discussions",
    bookmarked: true,
  },
  {
    id: 3,
    author: {
      name: "Sarah Chen",
      username: "sarah_chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just published a new article on 'Optimizing Recursive Solutions with Memoization'. Check it out if you're struggling with time limit exceeded errors on recursive problems!",
    timestamp: "Yesterday",
    likes: 87,
    comments: 23,
    category: "articles",
    bookmarked: false,
    link: "#article-link",
  },
  {
    id: 4,
    author: {
      name: "Michael Johnson",
      username: "michael_j",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I've created a visualization tool for common sorting algorithms. It helps to understand how bubble sort, merge sort, and quicksort work visually. Would love some feedback!",
    timestamp: "2 days ago",
    likes: 56,
    comments: 12,
    category: "projects",
    bookmarked: false,
    link: "#project-link",
  },
]

export function CommunityFeed() {
  const [activeTab, setActiveTab] = useState("all")
  const [newPostContent, setNewPostContent] = useState("")

  const filteredPosts = activeTab === "all" ? posts : posts.filter((post) => post.category === activeTab)

  return (
    <div className="space-y-6">
      <Card className="glow-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your thoughts, questions, or achievements..."
                className="min-h-[100px] bg-secondary/20 border-secondary/50 resize-none"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="mt-3 flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-secondary/20 border-secondary/50">
                    Add Code
                  </Button>
                  <Button variant="outline" size="sm" className="bg-secondary/20 border-secondary/50">
                    Add Image
                  </Button>
                </div>
                <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/90">
                  <Send className="mr-2 h-4 w-4" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Community Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4 grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0 space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div key={post.id} className="rounded-lg border border-secondary/50 bg-secondary/10 p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{post.author.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              @{post.author.username} · {post.timestamp}
                            </p>
                          </div>
                          {post.category !== "discussions" && (
                            <Button variant="outline" size="sm" className="bg-secondary/20 border-secondary/50" asChild>
                              <a href={post.link}>{post.category === "articles" ? "Read Article" : "View Project"}</a>
                            </Button>
                          )}
                        </div>

                        <p className="mt-2 text-sm">{post.content}</p>

                        <div className="mt-4 flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-neon-cyan">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-neon-cyan">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-neon-cyan">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button
                            className={`ml-auto flex items-center gap-1 text-sm ${post.bookmarked ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`}
                          >
                            <Bookmark className="h-4 w-4" />
                          </button>
                        </div>

                        {post.comments > 0 && (
                          <div className="mt-3">
                            <button className="text-xs font-medium text-neon-cyan hover:underline">
                              View all {post.comments} comments
                            </button>
                          </div>
                        )}

                        <div className="mt-3 flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Your avatar" />
                            <AvatarFallback>YA</AvatarFallback>
                          </Avatar>
                          <Input placeholder="Write a comment..." className="h-8 bg-secondary/20 border-secondary/50" />
                          <Button size="icon" className="h-8 w-8 bg-neon-cyan text-black hover:bg-neon-cyan/90">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 font-medium">No posts found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Be the first to start a conversation in this category
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

