import './EmptyState.css';

export const EmptyState = () => {
  return (
    <div className="empty-state">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="50" fill="#E8EEFF" />
        <path
          d="M40 55C40 52.2386 42.2386 50 45 50C47.7614 50 50 52.2386 50 55C50 57.7614 47.7614 60 45 60C42.2386 60 40 57.7614 40 55Z"
          fill="#7695EC"
        />
        <path
          d="M70 55C70 52.2386 72.2386 50 75 50C77.7614 50 80 52.2386 80 55C80 57.7614 77.7614 60 75 60C72.2386 60 70 57.7614 70 55Z"
          fill="#7695EC"
        />
        <path
          d="M40 75C40 75 45 80 60 80C75 80 80 75 80 75"
          stroke="#7695EC"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <h2>No posts yet!</h2>
      <p>Be the first one to share something with the community.</p>
    </div>
  );
};
