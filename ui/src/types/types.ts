export interface Game {
  game_id: number
  game_name: string
  rank_format: string[]
  rank_range_low: number
  rank_range_high: number
  rank_types: string[] | null
}

export interface User {
  user_id: number
  username: string
  password_hash: string
  full_name: string
  email: string
  profile_picture_url: string
  status: string
  created_at: Date
}
