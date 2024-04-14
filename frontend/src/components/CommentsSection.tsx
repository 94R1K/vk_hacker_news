import React from 'react';
import { useFetchCommentsQuery } from '../app/api/newsApi';
import styles from './CommentsSection.module.css';
import { Comment } from '../features/news/newsTypes';


interface Props {
  newsId: number;
}

const CommentsSection: React.FC<Props> = ({ newsId }) => {
  const { data, error, isLoading } = useFetchCommentsQuery(newsId);

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments!</p>;

  return (
    <div className={styles.commentsContainer}>
      {data?.comments.map((comment: Comment) => (
        <div key={comment.id} className={styles.comment}>
          <p>{comment.author} ({comment.date.toString()}): {comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
