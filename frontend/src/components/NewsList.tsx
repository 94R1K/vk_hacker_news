import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchLatestNews } from '../api/hackerNewsAPI';
import { NewsItem } from '../types';
import './NewsList.css';
const NewsList: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    try {
      const news = await fetchLatestNews();
      setNewsItems(news);
      setError(null);
    } catch (error) {
      setError('Не удалось получить новости.');
    }
  };

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="news-title">Последние новости «Hacker News» 👨‍💻</h1>
      {error && <p>{error}</p>}
      <button onClick={loadNews} className="news-reload">Обновить новости</button>
      <ul className="news-container">
        {newsItems.map(newsItem => (
          <li key={newsItem.id} className="news-item">
            <Link to={`/news/${newsItem.id}`} className="news-item-link">
              <div>Название: {newsItem.title}</div>
              <div>Рейтинг: {newsItem.rating}</div>
              <div>Автор: {newsItem.author}</div>
              <div>Дата публикации: {new Date(newsItem.date_time).toLocaleString()}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
