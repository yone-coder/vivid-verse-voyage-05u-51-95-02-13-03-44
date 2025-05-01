export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface GameRoom {
  id: string
  code: string
  board: Json
  current_player: string
  created_at: string
  last_move: Json | null
  player1_id: string | null
  player2_id: string | null
  status: string
  time_left_o: number
  time_left_x: number
  winner: string | null
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount_price: number | null
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  src: string
  alt: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Tournament {
  id: string
  title: string
  banner_url: string
  game: string
  prize_pool: number
  max_participants: number
  current_participants: number
  position: number | null
  start_date: string
  end_date: string
  status: "in-progress" | "closed" | "completed" | "upcoming"
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  order_id: string
  amount: number
  currency: string
  status: string
  payment_provider: string
  payment_token: string | null
  reference: string | null
  transaction_id: string | null
  created_at: string
  updated_at: string
}

export interface VerificationCode {
  id: string
  email: string
  phone: string | null
  code: string
  expires_at: string
  verified: boolean | null
  created_at: string
}