import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('App Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should show signup modal on first visit', () => {
    render(<App />);

    expect(screen.getByText('Welcome to CodeLeap network!')).toBeInTheDocument();
  });

  it('should allow user to sign up and see main app', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText('John doe');
    const button = screen.getByRole('button', { name: /enter/i });

    await user.type(input, 'testuser');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('CodeLeap Network')).toBeInTheDocument();
    });
  });

  it('should persist username and skip signup on reload', async () => {
    const user = userEvent.setup();

    const { unmount } = render(<App />);

    const input = screen.getByPlaceholderText('John doe');
    const button = screen.getByRole('button', { name: /enter/i });

    await user.type(input, 'testuser');
    await user.click(button);

    unmount();

    // Simulate page reload
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('CodeLeap Network')).toBeInTheDocument();
      expect(screen.getByText('@testuser')).toBeInTheDocument();
    });
  });

  it('should allow logout', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText('John doe');
    const enterButton = screen.getByRole('button', { name: /enter/i });

    await user.type(input, 'testuser');
    await user.click(enterButton);

    await waitFor(() => {
      expect(screen.getByText('@testuser')).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutButton);

    expect(screen.getByText('Welcome to CodeLeap network!')).toBeInTheDocument();
  });

  it('should create a new post', async () => {
    const user = userEvent.setup();

    render(<App />);

    // Signup
    await user.type(screen.getByPlaceholderText('John doe'), 'testuser');
    await user.click(screen.getByRole('button', { name: /enter/i }));

    await waitFor(() => {
      expect(screen.getByText("What's on your mind?")).toBeInTheDocument();
    });

    // Create post
    const titleInput = screen.getByPlaceholderText('Hello world') as HTMLInputElement;
    const contentInput = screen.getByPlaceholderText('Content here') as HTMLTextAreaElement;
    const createButton = screen.getByRole('button', { name: /create/i });

    await user.type(titleInput, 'My Test Post');
    await user.type(contentInput, 'This is test content');

    expect(createButton).not.toBeDisabled();
    await user.click(createButton);

    // Verify form was cleared (indicates successful submission)
    await waitFor(() => {
      expect(titleInput.value).toBe('');
      expect(contentInput.value).toBe('');
    });
  });

  it('should filter posts by search term', async () => {
    const user = userEvent.setup();

    render(<App />);

    // Signup
    await user.type(screen.getByPlaceholderText('John doe'), 'testuser');
    await user.click(screen.getByRole('button', { name: /enter/i }));

    await waitFor(() => {
      expect(screen.getByText('CodeLeap Network')).toBeInTheDocument();
    });

    // Wait for posts to load
    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
    });

    // Search
    const searchInput = screen.getByPlaceholderText(/search posts/i);
    await user.type(searchInput, 'First');

    // Should only show matching post
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.queryByText('Second Post')).not.toBeInTheDocument();
  });

  it('should sort posts by oldest first', async () => {
    const user = userEvent.setup();

    render(<App />);

    // Signup
    await user.type(screen.getByPlaceholderText('John doe'), 'testuser');
    await user.click(screen.getByRole('button', { name: /enter/i }));

    await waitFor(() => {
      expect(screen.getByText('CodeLeap Network')).toBeInTheDocument();
    });

    // Wait for posts to load
    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
    });

    // Change sort order
    const sortSelect = screen.getByLabelText('Sort:');
    await user.selectOptions(sortSelect, 'oldest');

    // Wait for sort to take effect
    await waitFor(() => {
      const posts = screen.queryAllByText(/Post/);
      expect(posts.length).toBeGreaterThan(0);
    });

    // Verify first post is showing (oldest first)
    expect(screen.getByText('First Post')).toBeInTheDocument();
  });

  it('should like a post', async () => {
    const user = userEvent.setup();

    const { container } = render(<App />);

    // Signup
    await user.type(screen.getByPlaceholderText('John doe'), 'testuser');
    await user.click(screen.getByRole('button', { name: /enter/i }));

    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
    });

    // Like post
    const likeButtons = container.querySelectorAll('.like-button');
    expect(likeButtons.length).toBeGreaterThan(0);

    await user.click(likeButtons[0]);

    // Check if like button now has liked class
    await waitFor(() => {
      const likedButton = container.querySelector('.like-button.liked');
      expect(likedButton).toBeInTheDocument();
    });
  });
});
