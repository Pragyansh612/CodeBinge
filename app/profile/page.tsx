import { Metadata } from "next"
import { ProfileSetup } from "@/components/profile-setup"

export const metadata: Metadata = {
  title: "Set Up Your Profile | CodeBinge",
  description: "Connect your coding profiles",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Connect Your Profiles</h1>
        <p className="text-muted-foreground">Link your coding accounts to see your stats</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <ProfileSetup />
      </div>
    </div>
  )
}