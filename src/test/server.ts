import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { mockPosts, mockPost } from './mockData';

const API_URL = 'https://dev.codeleap.co.uk/careers/';

export const handlers = [
  // GET posts
  http.get(API_URL, () => {
    return HttpResponse.json({ results: mockPosts });
  }),

  // POST create post
  http.post(API_URL, async ({ request }) => {
    const body = await request.json();
    const newPost = {
      ...body,
      id: Date.now(),
      created_datetime: new Date().toISOString(),
    };
    return HttpResponse.json(newPost, { status: 201 });
  }),

  // PATCH update post
  http.patch(`${API_URL}:id/`, async ({ params, request }) => {
    const body = await request.json();
    const updatedPost = {
      ...mockPost,
      id: Number(params.id),
      ...body,
    };
    return HttpResponse.json(updatedPost);
  }),

  // DELETE post
  http.delete(`${API_URL}:id/`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export const server = setupServer(...handlers);
