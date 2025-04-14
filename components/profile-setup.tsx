"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowRight, CheckCircle2, Mail } from "lucide-react"
import { useDashboardData } from "@/contexts/dashboard-data-context"
import { supabase } from "@/lib/supabase"
import { Checkbox } from "@/components/ui/checkbox"

// Define types for our state
type ValidationState = {
  valid: boolean;
  error: string | null;
}

type LoadingValidationState = ValidationState & {
  loading: boolean;
}

type SubmissionState = {
  loading: boolean;
  error: string | null;
}

type StatusState = {
  email: ValidationState;
  username: ValidationState;
  leetcode: LoadingValidationState;
  codeforces: LoadingValidationState;
  submission: SubmissionState;
}

type UserInfoState = {
  email: string;
  username: string;
  leetcode: string;
  codeforces: string;
  subscribeToNewsletter: boolean;
}

export function ProfileSetup() {
  const router = useRouter()
  const { 
    updateLeetCodeUsername, 
    updateCodeforcesUsername,
    fetchLeetCodeData,
    fetchCodeforcesData
  } = useDashboardData()
  
  const [userInfo, setUserInfo] = useState<UserInfoState>({
    email: "",
    username: "",
    leetcode: "",
    codeforces: "",
    subscribeToNewsletter: true
  })
  
  const [status, setStatus] = useState<StatusState>({
    email: { valid: false, error: null },
    username: { valid: false, error: null },
    leetcode: { loading: false, valid: false, error: null },
    codeforces: { loading: false, valid: false, error: null },
    submission: { loading: false, error: null }
  })
  
  // Validate email format
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (userInfo.email) {
      const isValid = emailRegex.test(userInfo.email)
      setStatus(prev => ({
        ...prev,
        email: { 
          valid: isValid, 
          error: isValid ? null : "Please enter a valid email address" 
        }
      }))
    }
  }, [userInfo.email])
  
  // Validate username (simple validation)
  useEffect(() => {
    if (userInfo.username) {
      const isValid = userInfo.username.length >= 3
      setStatus(prev => ({
        ...prev,
        username: { 
          valid: isValid, 
          error: isValid ? null : "Username must be at least 3 characters" 
        }
      }))
    }
  }, [userInfo.username])

  const validateLeetCode = async () => {
    if (!userInfo.leetcode) return
    
    setStatus(prev => ({
      ...prev,
      leetcode: { loading: true, valid: false, error: null }
    }))
    
    try {
      await fetchLeetCodeData(userInfo.leetcode)
      setStatus(prev => ({
        ...prev,
        leetcode: { loading: false, valid: true, error: null }
      }))
      updateLeetCodeUsername(userInfo.leetcode)
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
    if (!userInfo.codeforces) return
    
    setStatus(prev => ({
      ...prev,
      codeforces: { loading: true, valid: false, error: null }
    }))
    
    try {
      await fetchCodeforcesData(userInfo.codeforces)
      setStatus(prev => ({
        ...prev,
        codeforces: { loading: false, valid: true, error: null }
      }))
      updateCodeforcesUsername(userInfo.codeforces)
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check required fields
    if (!status.email.valid || !status.username.valid) {
      return
    }
    
    // At least one coding profile should be valid
    if (!(status.leetcode.valid || status.codeforces.valid)) {
      setStatus(prev => ({
        ...prev,
        submission: { 
          loading: false, 
          error: "Please validate at least one coding profile" 
        }
      }))
      return
    }
    
    setStatus(prev => ({
      ...prev,
      submission: { loading: true, error: null }
    }))
    
    try {
      // Save user data to Supabase
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          { 
            email: userInfo.email,
            username: userInfo.username,
            leetcode_username: status.leetcode.valid ? userInfo.leetcode : null,
            codeforces_username: status.codeforces.valid ? userInfo.codeforces : null
          }
        ])
        .select()
      
      if (userError) throw new Error(userError.message)
      
      // If user opted in for newsletter
      if (userInfo.subscribeToNewsletter) {
        const { error: newsletterError } = await supabase
          .from('newsletter_subscribers')
          .insert([{ email: userInfo.email }])
        
        if (newsletterError && newsletterError.code !== '23505') { // Ignore duplicate key errors
          console.error("Newsletter subscription error:", newsletterError)
        }
      }
      
      // Redirect to dashboard
      router.push('/')
      
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        submission: { 
          loading: false, 
          error: error instanceof Error ? error.message : "Failed to save profile" 
        }
      }))
    }
  }
  
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle>Setup Your Profile</CardTitle>
        <CardDescription>
          Enter your details and connect your coding profiles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Information Section */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <div className="relative">
                <Input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  placeholder="your@email.com"
                  className={`pr-10 ${status.email.valid ? 'border-green-500' : ''}`}
                  required
                />
                {status.email.valid && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
                )}
              </div>
              {status.email.error && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {status.email.error}
                </div>
              )}
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Username *</label>
              <div className="relative">
                <Input
                  value={userInfo.username}
                  onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                  placeholder="Choose a username"
                  className={`pr-10 ${status.username.valid ? 'border-green-500' : ''}`}
                  required
                />
                {status.username.valid && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
                )}
              </div>
              {status.username.error && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {status.username.error}
                </div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-secondary"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Coding Profiles</span>
            </div>
          </div>
          
          {/* Coding Profiles Section */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">LeetCode</label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    value={userInfo.leetcode}
                    onChange={(e) => setUserInfo({ ...userInfo, leetcode: e.target.value })}
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
                  disabled={!userInfo.leetcode || status.leetcode.loading}
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
            
            <div>
              <label className="text-sm font-medium mb-1 block">Codeforces</label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    value={userInfo.codeforces}
                    onChange={(e) => setUserInfo({ ...userInfo, codeforces: e.target.value })}
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
                  disabled={!userInfo.codeforces || status.codeforces.loading}
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
            
            {/* Newsletter Subscription */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="newsletter" 
                checked={userInfo.subscribeToNewsletter}
                onCheckedChange={(checked) => 
                  setUserInfo({ ...userInfo, subscribeToNewsletter: checked === true })
                }
              />
              <label 
                htmlFor="newsletter" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Subscribe to our newsletter for coding tips and updates
              </label>
            </div>
          </div>
          
          {/* Error message for form submission */}
          {status.submission.error && (
            <div className="flex items-center text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {status.submission.error}
            </div>
          )}
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full group"
              disabled={
                status.submission.loading || 
                !status.email.valid || 
                !status.username.valid || 
                !(status.leetcode.valid || status.codeforces.valid)
              }
            >
              {status.submission.loading ? "Setting up..." : "Complete Setup"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}