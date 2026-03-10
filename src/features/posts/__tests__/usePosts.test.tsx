import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePosts } from '../hooks/usePosts';
import { mockPosts } from '../../../test/mockData';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePosts', () => {
  it('should fetch posts successfully', async () => {
    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.posts).toEqual(mockPosts);
  });

  it('should create a post', async () => {
    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const newPost = {
      username: 'testuser',
      title: 'New Post',
      content: 'New content',
    };

    result.current.createPost(newPost);

    await waitFor(() => {
      expect(result.current.isCreating).toBe(false);
    });
  });

  it('should update a post', async () => {
    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const updateData = {
      id: 1,
      payload: {
        title: 'Updated Title',
        content: 'Updated content',
      },
    };

    result.current.updatePost(updateData);

    await waitFor(() => {
      expect(result.current.isUpdating).toBe(false);
    });
  });

  it('should delete a post', async () => {
    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.deletePost(1);

    await waitFor(() => {
      expect(result.current.isDeleting).toBe(false);
    });
  });
});
