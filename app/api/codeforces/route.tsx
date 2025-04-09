import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }
  
  try {
    const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`)
    
    if (!userInfoResponse.ok) {
      throw new Error(`Error fetching Codeforces data: ${userInfoResponse.status}`)
    }
    
    const userInfo = await userInfoResponse.json()
    const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${username}&from=1&count=100`)
    
    if (!submissionsResponse.ok) {
      throw new Error(`Error fetching Codeforces submissions: ${submissionsResponse.status}`)
    }
    
    const submissions = await submissionsResponse.json()
    
    const userData = {
      userInfo: userInfo.result[0],
      submissions: submissions.result,
      solvedCount: new Set(
        submissions.result
          .filter((sub:any) => sub.verdict === "OK")
          .map((sub:any)  => sub.problem.contestId + '-' + sub.problem.index)
      ).size
    }
    
    return NextResponse.json(userData)
  } catch (error) {
    console.error('Codeforces API error:', error)
    return NextResponse.json({ error: 'Failed to fetch Codeforces data' }, { status: 500 })
  }
}