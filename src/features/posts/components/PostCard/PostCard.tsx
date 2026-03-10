import { motion } from 'framer-motion';
import type { Post } from '../../../../shared/types';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  currentUsername: string;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
  onLike: (postId: number) => void;
  likesCount: number;
  hasLiked: boolean;
}

export const PostCard = ({ post, currentUsername, onEdit, onDelete, onLike, likesCount, hasLiked }: PostCardProps) => {
  const isOwner = post.username === currentUsername;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  return (
    <motion.div
      className="post-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        {isOwner && (
          <div className="post-actions">
            <button className="icon-button" onClick={() => onDelete(post)} title="Delete">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 8v8M10 8v8M14 8v8M3 4h14M16 4l-1 12H5L4 4M8 4V2h4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="icon-button" onClick={() => onEdit(post)} title="Edit">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M14.5 2.5l3 3L7 16H4v-3L14.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="post-meta">
        <span className="post-author">@{post.username}</span>
        <span className="post-date">{formatDate(post.created_datetime)}</span>
      </div>
      <p className="post-content">{post.content}</p>
      <div className="post-footer">
        <button
          className={`like-button ${hasLiked ? 'liked' : ''}`}
          onClick={() => onLike(post.id)}
          title={hasLiked ? 'Unlike' : 'Like'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill={hasLiked ? 'currentColor' : 'none'}>
            <path
              d="M10 17.5l-1.45-1.32C4.4 12.36 2 10.28 2 7.5 2 5.5 3.5 4 5.5 4c1.54 0 3.04.99 3.57 2.36h1.87C11.46 4.99 12.96 4 14.5 4c2 0 3.5 1.5 3.5 3.5 0 2.78-2.4 4.86-6.55 8.68L10 17.5z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span>{likesCount}</span>
        </button>
      </div>
    </motion.div>
  );
};
