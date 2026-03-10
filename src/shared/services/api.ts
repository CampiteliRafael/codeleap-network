import axios from 'axios';
import type { Post, CreatePostPayload, UpdatePostPayload } from '../types';

const API_BASE_URL = 'https://dev.codeleap.co.uk/careers/';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postsApi = {
  getPosts: async (): Promise<Post[]> => {
    const { data } = await api.get<{ results: Post[] }>('');
    return data.results;
  },

  createPost: async (payload: CreatePostPayload): Promise<Post> => {
    const { data } = await api.post<Post>('', payload);
    return data;
  },

  updatePost: async (id: number, payload: UpdatePostPayload): Promise<Post> => {
    const { data } = await api.patch<Post>(`${id}/`, payload);
    return data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`${id}/`);
  },
};
