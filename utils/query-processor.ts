import type { DashboardData } from "@/contexts/dashboard-data-context"

interface QueryResponse {
  text: string
  code?: string
  data?: any
}

export function processQuery(query: string, dashboardData: DashboardData): QueryResponse {
  // Convert query to lowercase for easier matching
  const q = query.toLowerCase()

  // Total problems solved
  if (q.includes("how many problems") || q.includes("total solved") || q.includes("problems solved")) {
    return {
      text: `You have solved a total of ${dashboardData.totalSolved} problems across all platforms. This includes ${dashboardData.easyProblems} easy problems, ${dashboardData.mediumProblems} medium problems, and ${dashboardData.hardProblems} hard problems.`,
      data: {
        total: dashboardData.totalSolved,
        easy: dashboardData.easyProblems,
        medium: dashboardData.mediumProblems,
        hard: dashboardData.hardProblems,
      },
    }
  }

  // Daily streak
  if (q.includes("streak") || q.includes("consecutive days")) {
    return {
      text: `Your current daily streak is ${dashboardData.dailyStreak} days. Keep it up!`,
      data: { streak: dashboardData.dailyStreak },
    }
  }

  // Weekly target
  if (q.includes("weekly target") || q.includes("weekly goal") || q.includes("this week")) {
    return {
      text: `You've achieved ${dashboardData.weeklyTarget.achieved} out of ${dashboardData.weeklyTarget.target} days this week. ${
        dashboardData.weeklyTarget.achieved >= dashboardData.weeklyTarget.target
          ? "Great job meeting your target!"
          : `You need ${dashboardData.weeklyTarget.target - dashboardData.weeklyTarget.achieved} more days to reach your weekly target.`
      }`,
      data: dashboardData.weeklyTarget,
    }
  }

  // Platform specific queries
  const platformQueries = [
    { keywords: ["leetcode", "leet code"], index: 2 },
    { keywords: ["codeforces", "code forces"], index: 1 },
    { keywords: ["codechef", "code chef"], index: 0 },
    { keywords: ["geeksforgeeks", "gfg", "geeks"], index: 3 },
  ]

  for (const platformQuery of platformQueries) {
    if (platformQuery.keywords.some((keyword) => q.includes(keyword))) {
      const platform = dashboardData.platforms[platformQuery.index]
      return {
        text: `On ${platform.name}, you've solved ${platform.solved} problems with the username "${platform.username}".`,
        data: platform,
      }
    }
  }

  // Topic distribution
  if (q.includes("topic") || q.includes("category") || q.includes("categories")) {
    const topTopics = dashboardData.topicData.slice(0, 3)
    return {
      text: `Your top problem categories are: ${topTopics.map((t) => `${t.name} (${t.count} problems)`).join(", ")}. You've solved problems across ${dashboardData.topicData.length} different categories.`,
      data: dashboardData.topicData,
    }
  }

  // Monthly performance
  if (q.includes("month") || q.includes("performance") || q.includes("progress")) {
    const lastMonth = dashboardData.monthlyData[dashboardData.monthlyData.length - 1]
    const previousMonth = dashboardData.monthlyData[dashboardData.monthlyData.length - 2]

    const trend =
      lastMonth.problems > previousMonth.problems
        ? "an increase"
        : lastMonth.problems < previousMonth.problems
          ? "a decrease"
          : "no change"

    return {
      text: `In ${lastMonth.name}, you solved ${lastMonth.problems} problems with an average difficulty of ${lastMonth.difficulty.toFixed(1)}/5. This is ${trend} compared to ${previousMonth.name} when you solved ${previousMonth.problems} problems.`,
      data: { lastMonth, previousMonth },
    }
  }

  // Recommendations
  if (q.includes("recommend") || q.includes("suggestion") || q.includes("what should i solve")) {
    const recommendations = dashboardData.recommendedProblems.slice(0, 3)
    return {
      text: `Based on your profile, I recommend these problems: ${recommendations.map((p) => `"${p.title}" (${p.difficulty}) on ${p.platform}`).join(", ")}. Would you like more specific recommendations?`,
      data: recommendations,
    }
  }

  // Weaknesses or areas to improve
  if (q.includes("weakness") || q.includes("improve") || q.includes("focus on")) {
    // Find topics with lowest counts
    const sortedTopics = [...dashboardData.topicData].sort((a, b) => a.count - b.count)
    const weakestTopics = sortedTopics.slice(0, 3)

    return {
      text: `Based on your solving patterns, you might want to focus more on: ${weakestTopics.map((t) => t.name).join(", ")}. These are areas where you've solved fewer problems compared to other topics.`,
      data: weakestTopics,
    }
  }

  // Code example for a specific topic
  if (q.includes("example") || q.includes("code for") || q.includes("solution for")) {
    let topic = ""

    if (q.includes("dynamic") || q.includes("dp")) {
      topic = "Dynamic Programming"
      return {
        text: `Here's a simple example of a Dynamic Programming solution for the Fibonacci sequence:`,
        code: `function fibonacci(n) {
  // Create an array to store Fibonacci numbers
  const dp = new Array(n + 1);
  
  // Base cases
  dp[0] = 0;
  dp[1] = 1;
  
  // Fill dp array
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}`,
      }
    } else if (q.includes("graph") || q.includes("dfs") || q.includes("bfs")) {
      topic = "Graph Algorithms"
      return {
        text: `Here's a simple implementation of Breadth-First Search (BFS) for a graph:`,
        code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    console.log(vertex); // Process the vertex
    
    // Visit all adjacent vertices
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
      }
    }
  }

  // Default response if no specific query is matched
  return {
    text: "I can help you with information about your solved problems, daily streak, platform statistics, topic distribution, and recommendations. What would you like to know about your coding profile?",
  }
}

