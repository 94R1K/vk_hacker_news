import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { News } from './newsTypes'; // Убедитесь, что путь верный и типы импортируются корректно

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await axios.get<News[]>('http://localhost:8000/api/news/');
  return response.data;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    items: [] as News[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default newsSlice.reducer;
