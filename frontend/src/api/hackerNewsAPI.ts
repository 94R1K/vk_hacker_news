import axios from 'axios';
import { ApiResponse, NewsItem } from '../types';

const API_BASE_URL = 'http://localhost:8000/api/';

export const fetchLatestNews = async (): Promise<NewsItem[]> => {
  const response = await axios.get<ApiResponse>(`${API_BASE_URL}news/`);
  return response.data.results;
};

export const fetchNewsItem = async (id: string): Promise<NewsItem> => {
  const response = await axios.get<NewsItem>(`${API_BASE_URL}news/${id}/`);
  return response.data;
};
