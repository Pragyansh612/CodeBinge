import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

// Import the DashboardDataProvider
import { DashboardDataProvider } from "@/contexts/dashboard-data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Codefolio - Coding Profile Dashboard",
  description: "Track your coding journey across multiple platforms",
    generator: 'v0.dev'
}

// Wrap the entire app with the DashboardDataProvider
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <DashboardDataProvider>
            <SidebarProvider>
              <div className="flex h-screen">
                <AppSidebar />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </SidebarProvider>
          </DashboardDataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'