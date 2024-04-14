import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import CommentsSection from './CommentsSection';

const NewsDetail: React.FC = () => {
  const { newsId } = useParams();
  const newsItem = useAppSelector(
    (state) => state.news.items.find((item) => item.id === Number(newsId))
  );

  const navigate = useNavigate();

  if (!newsItem) return <div>News not found!</div>;

  return (
    <div>
      <h1>{newsItem.title}</h1>
      <p>Author: {newsItem.author}</p>
      <p>Date: {newsItem.date.toDateString()}</p>
      <button onClick={() => navigate('/')}>Back to News List</button>
      <CommentsSection newsId={parseInt(newsId || '0')} />
    </div>
  );
};

export default NewsDetail;
