import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    // Use the IPv4 address explicitly to avoid IPv6 issues
    const backendUrl = "http://127.0.0.1:8000";

    console.log("Connecting to backend at:", backendUrl);

    const response = await fetch(`${backendUrl}/api/assistant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend returned status ${response.status}:`, errorText);
      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in assistant API route:", error);

    // Create a more informative error response
    return NextResponse.json(
      {
        text: "I'm having trouble connecting to my AI services. Please ensure the backend server is running at http://127.0.0.1:8000.",
        code: "",
        data: null,
      },
      { status: 500 }
    );
  }
}
