"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"

const platforms = [
  { name: "Codeforces", icon: "📊" },
  { name: "LeetCode", icon: "⚡" },
  { name: "CodeChef", icon: "🍴" },
  { name: "GeeksforGeeks", icon: "👨‍💻" },
  { name: "CodeStudio", icon: "🚀" },
  { name: "HackerEarth", icon: "🌍" },
  { name: "InterviewBit", icon: "💼" },
]

export function CompareForm() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="glow-card overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Compare</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center rounded-full bg-secondary/30 p-1"
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-medium text-yellow-400">Your Usernames</h3>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <div key={platform.name} className="flex items-center gap-2">
                    <div className="flex w-8 items-center justify-center text-lg">{platform.icon}</div>
                    <div className="font-medium">{platform.name}</div>
                    <Input
                      className="ml-auto w-48 bg-secondary/20"
                      placeholder={platform.name === "Codeforces" ? "amansaxena1" : "Not provided"}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium text-neon-cyan">Friend Usernames</h3>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <div key={platform.name} className="flex items-center gap-2">
                    <div className="flex w-8 items-center justify-center text-lg">{platform.icon}</div>
                    <div className="font-medium">{platform.name}</div>
                    <Input className="ml-auto w-48 bg-secondary/20" placeholder="Friend's username" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

