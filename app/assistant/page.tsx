import type { Metadata } from "next"
import { CodingAssistant } from "@/components/assistant/coding-assistant"
import { AssistantSidebar } from "@/components/assistant/assistant-sidebar"

export const metadata: Metadata = {
  title: "Coding Assistant | Codefolio",
  description: "Get personalized coding help and recommendations",
}

export default function AssistantPage() {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Coding Assistant</h1>
        <p className="text-muted-foreground">Get personalized coding help and recommendations</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CodingAssistant />
        </div>
        <div>
          <AssistantSidebar />
        </div>
      </div>
    </div>
  )
}

