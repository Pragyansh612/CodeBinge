"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react"
import { useDashboardData } from "@/contexts/dashboard-data-context"

export function ProfileSetup() {
  const router = useRouter()
  const { 
    updateLeetCodeUsername, 
    updateCodeforcesUsername,
    fetchLeetCodeData,
    fetchCodeforcesData
  } = useDashboardData()
  
  const [usernames, setUsernames] = useState({
    leetcode: "",
    codeforces: ""
  })
  
  const [status, setStatus] = useState({
    leetcode: { loading: false, valid: false, error: null as string | null },
    codeforces: { loading: false, valid: false, error: null as string | null }
  })
  
  const validateLeetCode = async () => {
    if (!usernames.leetcode) return
    
    setStatus(prev => ({
      ...prev,
      leetcode: { loading: true, valid: false, error: null }
    }))
    
    try {
      await fetchLeetCodeData(usernames.leetcode)
      setStatus(prev => ({
        ...prev,
        leetcode: { loading: false, valid: true, error: null }
      }))
      updateLeetCodeUsername(usernames.leetcode)
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        leetcode: { 
          loading: false, 
          valid: false, 
          error: error instanceof Error ? error.message : "Failed to validate username" 
        }
      }))
    }
  }
  
  const validateCodeforces = async () => {
    if (!usernames.codeforces) return
    
    setStatus(prev => ({
      ...prev,
      codeforces: { loading: true, valid: false, error: null }
    }))
    
    try {
      await fetchCodeforcesData(usernames.codeforces)
      setStatus(prev => ({
        ...prev,
        codeforces: { loading: false, valid: true, error: null }
      }))
      updateCodeforcesUsername(usernames.codeforces)
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        codeforces: { 
          loading: false, 
          valid: false, 
          error: error instanceof Error ? error.message : "Failed to validate username" 
        }
      }))
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if at least one profile is valid before redirecting
    if (status.leetcode.valid || status.codeforces.valid) {
      router.push('/')
    }
  }
  
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle>Connect Your Coding Profiles</CardTitle>
        <CardDescription>
          Enter your username for at least one platform to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">LeetCode</label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    value={usernames.leetcode}
                    onChange={(e) => setUsernames({ ...usernames, leetcode: e.target.value })}
                    placeholder="Enter LeetCode username"
                    className={`pr-10 ${status.leetcode.valid ? 'border-green-500' : ''}`}
                  />
                  {status.leetcode.valid && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  )}
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={validateLeetCode}
                  disabled={!usernames.leetcode || status.leetcode.loading}
                >
                  {status.leetcode.loading ? "Checking..." : "Verify"}
                </Button>
              </div>
              {status.leetcode.error && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {status.leetcode.error}
                </div>
              )}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-secondary"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Codeforces</label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    value={usernames.codeforces}
                    onChange={(e) => setUsernames({ ...usernames, codeforces: e.target.value })}
                    placeholder="Enter Codeforces username"
                    className={`pr-10 ${status.codeforces.valid ? 'border-green-500' : ''}`}
                  />
                  {status.codeforces.valid && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  )}
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={validateCodeforces}
                  disabled={!usernames.codeforces || status.codeforces.loading}
                >
                  {status.codeforces.loading ? "Checking..." : "Verify"}
                </Button>
              </div>
              {status.codeforces.error && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {status.codeforces.error}
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full group"
              disabled={!(status.leetcode.valid || status.codeforces.valid)}
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}