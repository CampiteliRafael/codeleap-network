import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { CreatePost } from '../components/CreatePost';

describe('CreatePost', () => {
  const mockOnSubmit = vi.fn();

  it('should render form fields correctly', () => {
    render(<CreatePost username="testuser" onSubmit={mockOnSubmit} isCreating={false} />);

    expect(screen.getByPlaceholderText('Hello world')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Content here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('should have disabled submit button when fields are empty', () => {
    render(<CreatePost username="testuser" onSubmit={mockOnSubmit} isCreating={false} />);

    const submitButton = screen.getByRole('button', { name: /create/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when fields are filled', async () => {
    const user = userEvent.setup();

    render(<CreatePost username="testuser" onSubmit={mockOnSubmit} isCreating={false} />);

    const titleInput = screen.getByPlaceholderText('Hello world');
    const contentInput = screen.getByPlaceholderText('Content here');
    const submitButton = screen.getByRole('button', { name: /create/i });

    await user.type(titleInput, 'Test Title');
    await user.type(contentInput, 'Test Content');

    expect(submitButton).not.toBeDisabled();
  });

  it('should call onSubmit with correct data', async () => {
    const user = userEvent.setup();

    render(<CreatePost username="testuser" onSubmit={mockOnSubmit} isCreating={false} />);

    const titleInput = screen.getByPlaceholderText('Hello world');
    const contentInput = screen.getByPlaceholderText('Content here');
    const submitButton = screen.getByRole('button', { name: /create/i });

    await user.type(titleInput, 'Test Title');
    await user.type(contentInput, 'Test Content');
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('Test Title', 'Test Content');
  });

  it('should clear form after submission', async () => {
    const user = userEvent.setup();

    render(<CreatePost username="testuser" onSubmit={mockOnSubmit} isCreating={false} />);

    const titleInput = screen.getByPlaceholderText('Hello world') as HTMLInputElement;
    const contentInput = screen.getByPlaceholderText('Content here') as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /create/i });

    await user.type(titleInput, 'Test Title');
    await user.type(contentInput, 'Test Content');
    await user.click(submitButton);

    expect(titleInput.value).toBe('');
    expect(contentInput.value).toBe('');
  });

  it('should disable button when isCreating is true', () => {
    render(<CreatePost username="testuser" onSubmit={mockOnSubmit} isCreating={true} />);

    const submitButton = screen.getByRole('button', { name: /create/i });
    expect(submitButton).toBeDisabled();
  });

  it('should not submit with only whitespace', async () => {
    const user = userEvent.setup();

    render(<CreatePost username="testuser" onSubmit={mockOnSubmit} isCreating={false} />);

    const titleInput = screen.getByPlaceholderText('Hello world');
    const contentInput = screen.getByPlaceholderText('Content here');
    const submitButton = screen.getByRole('button', { name: /create/i });

    await user.type(titleInput, '   ');
    await user.type(contentInput, '   ');

    expect(submitButton).toBeDisabled();
  });
});
