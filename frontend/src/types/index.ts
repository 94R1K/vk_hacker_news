export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
}

export interface NewsItem {
  id: number;
  title: string;
  rating: number;
  author: string;
  date_time: string;
  comments_count: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date_time: string;
  news: number;
  children: number[];
  childrenComments?: Comment[];
}
