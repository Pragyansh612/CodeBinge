"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, LogOut, Mail, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

export default function AdminNewsletter() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [newsletterData, setNewsletterData] = useState({
    subject: "",
    content: ""
  })
  
  const [error, setError] = useState<string | null>(null)
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null)
  const [currentAdmin, setCurrentAdmin] = useState<string | null>(null)
  
  // Check auth status on page load
  useEffect(() => {
    checkAuth()
    fetchSubscriberCount()
  }, [])
  
// In AdminNewsletter.tsx, update the checkAuth function
const checkAuth = async () => {
  const { data } = await supabase.auth.getUser()
  if (data.user && data.user.email) {  // Add null check for email
    setCurrentAdmin(data.user.email)
  } else {
    // Redirect to login if not authenticated
    router.push('/admin/login')
  }
}
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }
  
  const fetchSubscriberCount = async () => {
    try {
      const response = await fetch('/api/admin/newsletter/subscribers')
      const data = await response.json()
      console.log(data)
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setSubscriberCount(data.count)
    } catch (error) {
      console.error("Failed to fetch subscriber count:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch subscriber count")
    }
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewsletterData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Validate form
    if (!newsletterData.subject.trim()) {
      setError("Subject is required")
      return
    }
    
    if (!newsletterData.content.trim()) {
      setError("Email content is required")
      return
    }
    
    setIsLoading(true)
    
    try {
      // Make sure this matches your API route structure
      const response = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsletterData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to send newsletter")
      }
      
      toast({
        title: "Newsletter sent successfully!",
        description: `Sent to ${data.sentCount} subscribers`,
      })
      
      // Reset form
      setNewsletterData({
        subject: "",
        content: ""
      })
      
    } catch (error) {
      console.error("Failed to send newsletter:", error)
      setError(error instanceof Error ? error.message : "Failed to send newsletter")
      
      toast({
        title: "Failed to send newsletter",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  if (!currentAdmin) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Newsletter Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Logged in as {currentAdmin}</span>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Newsletter</CardTitle>
              <CardDescription>
                Compose and send a newsletter to all subscribers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Subject</label>
                  <Input
                    name="subject"
                    value={newsletterData.subject}
                    onChange={handleInputChange}
                    placeholder="Newsletter subject"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Content</label>
                  <Textarea
                    name="content"
                    value={newsletterData.content}
                    onChange={handleInputChange}
                    placeholder="Write your newsletter content here..."
                    className="min-h-[200px]"
                    required
                  />
                </div>
                
                {error && (
                  <div className="flex items-center text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Newsletter"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Subscribers</CardTitle>
              <CardDescription>
                Newsletter subscription stats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Total Subscribers</span>
                </div>
                <span className="text-xl font-bold">
                  {subscriberCount !== null ? subscriberCount : "..."}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}