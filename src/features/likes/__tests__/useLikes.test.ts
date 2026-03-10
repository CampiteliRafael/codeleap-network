import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLikes } from '../hooks/useLikes';

describe('useLikes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with no likes', () => {
    const { result } = renderHook(() => useLikes());

    expect(result.current.getLikes(1)).toBe(0);
    expect(result.current.hasLiked(1, 'user1')).toBe(false);
  });

  it('should toggle like on a post', () => {
    const { result } = renderHook(() => useLikes());

    act(() => {
      result.current.toggleLike(1, 'user1');
    });

    expect(result.current.getLikes(1)).toBe(1);
    expect(result.current.hasLiked(1, 'user1')).toBe(true);
  });

  it('should unlike a post', () => {
    const { result } = renderHook(() => useLikes());

    act(() => {
      result.current.toggleLike(1, 'user1');
    });

    expect(result.current.getLikes(1)).toBe(1);

    act(() => {
      result.current.toggleLike(1, 'user1');
    });

    expect(result.current.getLikes(1)).toBe(0);
    expect(result.current.hasLiked(1, 'user1')).toBe(false);
  });

  it('should handle multiple users liking the same post', () => {
    const { result } = renderHook(() => useLikes());

    act(() => {
      result.current.toggleLike(1, 'user1');
      result.current.toggleLike(1, 'user2');
      result.current.toggleLike(1, 'user3');
    });

    expect(result.current.getLikes(1)).toBe(3);
    expect(result.current.hasLiked(1, 'user1')).toBe(true);
    expect(result.current.hasLiked(1, 'user2')).toBe(true);
    expect(result.current.hasLiked(1, 'user3')).toBe(true);
  });

  it('should persist likes in localStorage', () => {
    const { result: result1 } = renderHook(() => useLikes());

    act(() => {
      result1.current.toggleLike(1, 'user1');
    });

    // Simulate a new hook instance (like page reload)
    const { result: result2 } = renderHook(() => useLikes());

    expect(result2.current.getLikes(1)).toBe(1);
    expect(result2.current.hasLiked(1, 'user1')).toBe(true);
  });

  it('should handle likes for multiple posts', () => {
    const { result } = renderHook(() => useLikes());

    act(() => {
      result.current.toggleLike(1, 'user1');
      result.current.toggleLike(2, 'user1');
      result.current.toggleLike(3, 'user1');
    });

    expect(result.current.getLikes(1)).toBe(1);
    expect(result.current.getLikes(2)).toBe(1);
    expect(result.current.getLikes(3)).toBe(1);
  });
});
