import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchNews } from '../features/news/newsSlice';
import { useNavigate } from 'react-router-dom';
import styles from './NewsList.module.css';

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.news.items);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNews());
    const interval = setInterval(() => {
      dispatch(fetchNews());
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      {news.map((newsItem) => (
        <div key={newsItem.id} onClick={() => navigate(`/news/${newsItem.id}`)}>
          <h2>{newsItem.title}</h2>
          <p>Author: {newsItem.author}</p>
          <p>Date: {newsItem.date.toDateString()}</p>
        </div>
      ))}
      <button onClick={() => dispatch(fetchNews())}>Refresh News</button>
    </div>
  );
};

export default NewsList;
