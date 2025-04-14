export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          leetcode_username: string | null
          codeforces_username: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          username: string
          leetcode_username?: string | null
          codeforces_username?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          leetcode_username?: string | null
          codeforces_username?: string | null
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          subscribed_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          subscribed_at?: string
          is_active?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}