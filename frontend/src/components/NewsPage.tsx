import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsItem, fetchCommentsItem } from '../api/hackerNewsAPI';
import { NewsItem, Comment } from '../types';
import './NewsPage.css';

const NewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadNewsItem = useCallback(async () => {
    if (id) {
      try {
        const item = await fetchNewsItem(id);
        setNewsItem(item);
        setError(null);
      } catch (error) {
        setError('Не удалось загрузить подробную информацию о новостях');
      }
    }
  }, [id]);

  useEffect(() => {
    loadNewsItem();
  }, [loadNewsItem]);

  const handleCommentClick = async (comment: Comment) => {
    if (comment.children.length > 0 && !comment.childrenComments) {
      comment.childrenComments = await fetchCommentsItem(comment.children);
      if (newsItem) {
        setNewsItem({...newsItem});
      }
    }
  };

  const renderComments = (comments: Comment[]) => (
    <ul className="news-comments">
      {comments.map(comment => (
        <li key={comment.id} onClick={() => handleCommentClick(comment)}>
          <strong>{comment.author}</strong> в {new Date(comment.date_time).toLocaleString()} написал:
          <p>{comment.content}</p>
          {comment.childrenComments && renderComments(comment.childrenComments)}
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
              <button onClick={loadNewsItem}>Обновить комментарии</button>
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
