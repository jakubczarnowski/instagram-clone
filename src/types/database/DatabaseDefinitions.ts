export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comment_likes: {
        Row: {
          created_at: string
          post_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: number
          user_id?: string
        }
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: number
          post_id: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          post_id: number
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          post_id?: number
          user_id?: string
        }
      }
      post_likes: {
        Row: {
          created_at: string
          post_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: number
          user_id?: string
        }
      }
      posts: {
        Row: {
          created_at: string
          id: number
          image_url: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          image_url: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          image_url?: string
          title?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
