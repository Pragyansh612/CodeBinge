"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface DashboardData {
  leetcode: {
    username: string | null
    totalSolved: number
    easySolved: number
    mediumSolved: number
    hardSolved: number
    ranking: number | null
    todaySolved: number
    loading: boolean
    error: string | null
  }
  codeforces: {
    username: string | null
    totalSolved: number
    rating: number | null
    rank: string | null
    todaySolved: number
    loading: boolean
    error: string | null
  }
}

interface DashboardDataContextProps {
  data: DashboardData
  updateLeetCodeUsername: (username: string) => void
  updateCodeforcesUsername: (username: string) => void
  fetchLeetCodeData: (username: string) => Promise<void>
  fetchCodeforcesData: (username: string) => Promise<void>
  isLoading: boolean
}

const initialData: DashboardData = {
  leetcode: {
    username: null,
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    ranking: null,
    todaySolved: 0,
    loading: false,
    error: null
  },
  codeforces: {
    username: null,
    totalSolved: 0,
    rating: null,
    rank: null,
    todaySolved: 0,
    loading: false,
    error: null
  }
}

const DashboardDataContext = createContext<DashboardDataContextProps | undefined>(undefined)

export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData>(initialData)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const leetcodeUsername = localStorage.getItem('leetcodeUsername')
        const codeforcesUsername = localStorage.getItem('codeforcesUsername')
        
        if (leetcodeUsername) {
          setData(prev => ({
            ...prev,
            leetcode: { ...prev.leetcode, username: leetcodeUsername }
          }))
          await fetchLeetCodeData(leetcodeUsername)
        }
        
        if (codeforcesUsername) {
          setData(prev => ({
            ...prev,
            codeforces: { ...prev.codeforces, username: codeforcesUsername }
          }))
          await fetchCodeforcesData(codeforcesUsername)
        }
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
    
    loadSavedData()
  }, [])

  const updateLeetCodeUsername = (username: string) => {
    localStorage.setItem('leetcodeUsername', username)

    setData(prev => ({
      ...prev,
      leetcode: { ...prev.leetcode, username }
    }))
  }

  const updateCodeforcesUsername = (username: string) => {
    localStorage.setItem('codeforcesUsername', username)
    
    setData(prev => ({
      ...prev,
      codeforces: { ...prev.codeforces, username }
    }))
  }

  const fetchLeetCodeData = async (username: string) => {
    setData(prev => ({
      ...prev,
      leetcode: { ...prev.leetcode, loading: true, error: null }
    }))
    setIsLoading(true)

    try {
      const response = await fetch(`/api/leetcode?username=${username}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch LeetCode data')
      }
      
      const userData = await response.json()
      
      if (userData.data?.matchedUser) {
        const user = userData.data.matchedUser
        const submitStats = user.submitStats.acSubmissionNum || []
        
        let easySolved = 0
        let mediumSolved = 0
        let hardSolved = 0
        let totalSolved = 0
        
        // Correctly parse submission stats
        submitStats.forEach((stat: any) => {
          if (stat.difficulty === "Easy") easySolved = stat.count
          if (stat.difficulty === "Medium") mediumSolved = stat.count
          if (stat.difficulty === "Hard") hardSolved = stat.count
        })
        
        // Calculate total by adding individual difficulties
        totalSolved = easySolved + mediumSolved + hardSolved
        
        setData(prev => ({
          ...prev,
          leetcode: {
            ...prev.leetcode,
            username,
            totalSolved,
            easySolved,
            mediumSolved,
            hardSolved,
            ranking: user.profile?.ranking || null,
            todaySolved: 0, // This would need a separate API call to get today's submissions
            loading: false,
            error: null
          }
        }))
      } else {
        throw new Error('User data not found')
      }
    } catch (error) {
      setData(prev => ({
        ...prev,
        leetcode: {
          ...prev.leetcode,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      }))
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCodeforcesData = async (username: string) => {
    setData(prev => ({
      ...prev,
      codeforces: { ...prev.codeforces, loading: true, error: null }
    }))
    setIsLoading(true)

    try {
      const response = await fetch(`/api/codeforces?username=${username}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch Codeforces data')
      }
      
      const userData = await response.json()
      
      if (userData.userInfo) {
        const userInfo = userData.userInfo
        
        setData(prev => ({
          ...prev,
          codeforces: {
            ...prev.codeforces,
            username,
            totalSolved: userData.solvedCount || 0,
            rating: userInfo.rating || null,
            rank: userInfo.rank || null,
            todaySolved: 0, // Would need to calculate from submissions
            loading: false,
            error: null
          }
        }))
      } else {
        throw new Error('User data not found')
      }
    } catch (error) {
      setData(prev => ({
        ...prev,
        codeforces: {
          ...prev.codeforces,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      }))
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardDataContext.Provider 
      value={{ 
        data, 
        updateLeetCodeUsername, 
        updateCodeforcesUsername,
        fetchLeetCodeData,
        fetchCodeforcesData,
        isLoading
      }}
    >
      {children}
    </DashboardDataContext.Provider>
  )
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext)
  if (context === undefined) {
    throw new Error("useDashboardData must be used within a DashboardDataProvider")
  }
  return context
}