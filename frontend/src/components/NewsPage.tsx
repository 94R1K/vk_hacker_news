import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsItem } from '../api/hackerNewsAPI';
import { NewsItem, Comment } from '../types';
import './NewsPage.css'; // Ensure the CSS is properly imported

const NewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadNewsItem = async () => {
    if (id) {
      try {
        const item = await fetchNewsItem(id);
        setNewsItem(item);
        setError(null);
      } catch (error) {
        setError('Не удалось загрузить подробную информацию о новостях');
      }
    }
  };


  useEffect(() => {
    if (id) {
      loadNewsItem();
    }
  }, [id]);

  const renderComments = (comments: Comment[]) => (
    <ul className="news-comments">
      {comments.map(comment => (
        <li key={comment.id}>
          <strong>{comment.author}</strong> в {new Date(comment.date_time).toLocaleString()} написал:
          <p>{comment.content}</p>
          {/*{comment.children.length > 0 && renderComments(comment.children)}*/}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="container">
      <div className="news-card">
        {newsItem ? (
            <div className="news-item">
              <h1>{newsItem.title}</h1>
              <div>Рейтинг: {newsItem.rating}</div>
              <div>Автор: {newsItem.author}</div>
              <div>Дата публикации: {new Date(newsItem.date_time).toLocaleString()}</div>
              <p>Количество комментариев: {newsItem.comments_count}</p>
              <Link to="/" className="back-link">Вернуться к списку новостей</Link>
              <button onClick={() => {
                if (id) {
                  loadNewsItem();
                }
              }}>Обновить комментарии
              </button>
              <h3>Комментарии:</h3>
              {newsItem.comments && newsItem.comments.length > 0 ? renderComments(newsItem.comments) : <p>Комментариев пока нет.</p>}
            </div>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <p>Загрузка...</p>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
