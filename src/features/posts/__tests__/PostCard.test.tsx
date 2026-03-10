import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { PostCard } from '../components/PostCard';
import { mockPost } from '../../../test/mockData';

describe('PostCard', () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnLike = vi.fn();

  it('should render post information correctly', () => {
    render(
      <PostCard
        post={mockPost}
        currentUsername="otheruser"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onLike={mockOnLike}
        likesCount={5}
        hasLiked={false}
      />
    );

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(`@${mockPost.username}`)).toBeInTheDocument();
  });

  it('should show edit and delete buttons for post owner', () => {
    render(
      <PostCard
        post={mockPost}
        currentUsername={mockPost.username}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onLike={mockOnLike}
        likesCount={0}
        hasLiked={false}
      />
    );

    expect(screen.getByTitle('Edit')).toBeInTheDocument();
    expect(screen.getByTitle('Delete')).toBeInTheDocument();
  });

  it('should NOT show edit and delete buttons for non-owner', () => {
    render(
      <PostCard
        post={mockPost}
        currentUsername="otheruser"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onLike={mockOnLike}
        likesCount={0}
        hasLiked={false}
      />
    );

    expect(screen.queryByTitle('Edit')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Delete')).not.toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <PostCard
        post={mockPost}
        currentUsername={mockPost.username}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onLike={mockOnLike}
        likesCount={0}
        hasLiked={false}
      />
    );

    const editButton = screen.getByTitle('Edit');
    await user.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockPost);
  });

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <PostCard
        post={mockPost}
        currentUsername={mockPost.username}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onLike={mockOnLike}
        likesCount={0}
        hasLiked={false}
      />
    );

    const deleteButton = screen.getByTitle('Delete');
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockPost);
  });

  it('should display like count correctly', () => {
    render(
      <PostCard
        post={mockPost}
        currentUsername="otheruser"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onLike={mockOnLike}
        likesCount={10}
        hasLiked={false}
      />
    );

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should call onLike when like button is clicked', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <PostCard
        post={mockPost}
        currentUsername="otheruser"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onLike={mockOnLike}
        likesCount={0}
        hasLiked={false}
      />
    );

    const likeButton = container.querySelector('.like-button');
    expect(likeButton).toBeInTheDocument();

    await user.click(likeButton!);

    expect(mockOnLike).toHaveBeenCalledWith(mockPost.id);
  });

  it('should show liked state when user has liked', () => {
    const { container } = render(
      <PostCard
        post={mockPost}
        currentUsername="otheruser"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onLike={mockOnLike}
        likesCount={1}
        hasLiked={true}
      />
    );

    const likeButton = container.querySelector('.like-button');
    expect(likeButton).toHaveClass('liked');
  });
});
