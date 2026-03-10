import type { Post } from '../shared/types';

export const mockPost: Post = {
  id: 1,
  username: 'testuser',
  title: 'Test Post',
  content: 'This is a test post content',
  created_datetime: new Date().toISOString(),
};

export const mockPosts: Post[] = [
  {
    id: 1,
    username: 'john',
    title: 'First Post',
    content: 'Content of first post',
    created_datetime: new Date('2024-01-01').toISOString(),
  },
  {
    id: 2,
    username: 'jane',
    title: 'Second Post',
    content: 'Content of second post',
    created_datetime: new Date('2024-01-02').toISOString(),
  },
  {
    id: 3,
    username: 'john',
    title: 'Third Post',
    content: 'Content of third post',
    created_datetime: new Date('2024-01-03').toISOString(),
  },
];
