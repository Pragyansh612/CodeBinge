export async function processQueryOnBackend(query: string, userData: any) {
  try {
    console.log("usedata", userData);
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        userData,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling assistant API:", error);
    return {
      text: "I'm having trouble connecting to my AI services. Please try again later.",
      code: "",
      data: null,
    };
  }
}
