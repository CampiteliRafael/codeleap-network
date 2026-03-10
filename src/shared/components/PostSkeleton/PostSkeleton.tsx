import './PostSkeleton.css';

export const PostSkeleton = () => {
  return (
    <div className="post-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
      </div>
      <div className="skeleton-meta">
        <div className="skeleton-author"></div>
        <div className="skeleton-date"></div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  );
};
