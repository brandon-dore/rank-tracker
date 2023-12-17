export interface Rank {
  rank_id: number;
  user_id: number;
  game_id: number;
  text_rank: string | null;
  numeric_rank: number | null;
  rank_date: Date;
}
