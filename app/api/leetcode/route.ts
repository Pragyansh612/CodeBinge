import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }
  
  try {
    const query = {
      query: `
        query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            profile {
              ranking
              reputation
              starRating
            }
          }
        }
      `,
      variables: { username }
    }
    
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    })
    
    if (!response.ok) {
      throw new Error(`Error fetching LeetCode data: ${response.status}`)
    }
    
    const data = await response.json()
    console.log(data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('LeetCode API error:', error)
    return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 })
  }
}