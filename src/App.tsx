import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SignupModal } from './features/auth/components/SignupModal';
import { CreatePost } from './features/posts/components/CreatePost';
import { PostCard } from './features/posts/components/PostCard';
import { DeleteModal } from './features/posts/components/DeleteModal';
import { EditModal } from './features/posts/components/EditModal';
import { FilterBar } from './features/posts/components/FilterBar';
import { PostSkeleton } from './shared/components/PostSkeleton';
import { EmptyState } from './shared/components/EmptyState';
import { usePosts } from './features/posts/hooks';
import { useLikes } from './features/likes/hooks';
import type { Post } from './shared/types';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const USERNAME_KEY = 'codeleap_username';

function MainApp() {
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem(USERNAME_KEY);
  });
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const { posts, createPost, updatePost, deletePost, isCreating, isUpdating, isDeleting, isLoading } = usePosts();
  const { toggleLike, getLikes, hasLiked } = useLikes();

  const handleSignup = (name: string) => {
    setUsername(name);
    localStorage.setItem(USERNAME_KEY, name);
  };

  const handleLogout = () => {
    localStorage.removeItem(USERNAME_KEY);
    setUsername(null);
  };

  const handleCreatePost = (title: string, content: string) => {
    if (username) {
      createPost({ username, title, content });
    }
  };

  const handleLike = (postId: number) => {
    if (username) {
      toggleLike(postId, username);
    }
  };

  const handleEditPost = (title: string, content: string) => {
    if (postToEdit) {
      updatePost(
        { id: postToEdit.id, payload: { title, content } },
        {
          onSuccess: () => setPostToEdit(null),
        }
      );
    }
  };

  const handleDeletePost = () => {
    if (postToDelete) {
      deletePost(postToDelete.id, {
        onSuccess: () => setPostToDelete(null),
      });
    }
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.username.toLowerCase().includes(searchLower)
    );
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.created_datetime).getTime();
    const dateB = new Date(b.created_datetime).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  if (!username) {
    return <SignupModal onSubmit={handleSignup} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>CodeLeap Network</h1>
        <div className="header-user">
          <span className="username-display">@{username}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="app-main">
        <CreatePost username={username} onSubmit={handleCreatePost} isCreating={isCreating} />
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
        <div className="posts-list">
          {isLoading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : sortedPosts.length === 0 ? (
            <EmptyState />
          ) : (
            sortedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUsername={username}
                onEdit={setPostToEdit}
                onDelete={setPostToDelete}
                onLike={handleLike}
                likesCount={getLikes(post.id)}
                hasLiked={hasLiked(post.id, username)}
              />
            ))
          )}
        </div>
      </main>

      {postToDelete && (
        <DeleteModal
          onConfirm={handleDeletePost}
          onCancel={() => setPostToDelete(null)}
          isDeleting={isDeleting}
        />
      )}

      {postToEdit && (
        <EditModal
          title={postToEdit.title}
          content={postToEdit.content}
          onSave={handleEditPost}
          onCancel={() => setPostToEdit(null)}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainApp />
    </QueryClientProvider>
  );
}

export default App;
