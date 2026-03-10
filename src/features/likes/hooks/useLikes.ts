import { useState, useEffect } from 'react';

const LIKES_KEY = 'codeleap_likes';

interface LikesData {
  [postId: number]: {
    count: number;
    likedBy: string[];
  };
}

export const useLikes = () => {
  const [likes, setLikes] = useState<LikesData>(() => {
    const stored = localStorage.getItem(LIKES_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
  }, [likes]);

  const toggleLike = (postId: number, username: string) => {
    setLikes((prev) => {
      const postLikes = prev[postId] || { count: 0, likedBy: [] };
      const hasLiked = postLikes.likedBy.includes(username);

      if (hasLiked) {
        return {
          ...prev,
          [postId]: {
            count: Math.max(0, postLikes.count - 1),
            likedBy: postLikes.likedBy.filter((u) => u !== username),
          },
        };
      } else {
        return {
          ...prev,
          [postId]: {
            count: postLikes.count + 1,
            likedBy: [...postLikes.likedBy, username],
          },
        };
      }
    });
  };

  const getLikes = (postId: number) => {
    return likes[postId]?.count || 0;
  };

  const hasLiked = (postId: number, username: string) => {
    return likes[postId]?.likedBy.includes(username) || false;
  };

  return { toggleLike, getLikes, hasLiked };
};
