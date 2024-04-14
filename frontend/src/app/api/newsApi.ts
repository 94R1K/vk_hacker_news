import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsResponse, CommentsResponse } from '../../features/news/newsTypes';



export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    fetchNews: builder.query<NewsResponse, void>({
      query: () => 'news/'
    }),
    fetchComments: builder.query<CommentsResponse, number>({
      query: (newsId) => `comments/${newsId}`
    }),
  }),
});

export const { useFetchNewsQuery, useFetchCommentsQuery } = newsApi;
