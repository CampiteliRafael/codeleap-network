import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { SignupModal } from '../components/SignupModal';

describe('SignupModal', () => {
  const mockOnSubmit = vi.fn();

  it('should render modal with title and input', () => {
    render(<SignupModal onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Welcome to CodeLeap network!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('John doe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument();
  });

  it('should have disabled button when input is empty', () => {
    render(<SignupModal onSubmit={mockOnSubmit} />);

    const button = screen.getByRole('button', { name: /enter/i });
    expect(button).toBeDisabled();
  });

  it('should enable button when username is entered', async () => {
    const user = userEvent.setup();

    render(<SignupModal onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('John doe');
    const button = screen.getByRole('button', { name: /enter/i });

    await user.type(input, 'testuser');

    expect(button).not.toBeDisabled();
  });

  it('should call onSubmit with username when form is submitted', async () => {
    const user = userEvent.setup();

    render(<SignupModal onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('John doe');
    const button = screen.getByRole('button', { name: /enter/i });

    await user.type(input, 'testuser');
    await user.click(button);

    expect(mockOnSubmit).toHaveBeenCalledWith('testuser');
  });

  it('should trim whitespace from username', async () => {
    const user = userEvent.setup();

    render(<SignupModal onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('John doe');
    const button = screen.getByRole('button', { name: /enter/i });

    await user.type(input, '  testuser  ');
    await user.click(button);

    expect(mockOnSubmit).toHaveBeenCalledWith('testuser');
  });

  it('should not submit with only whitespace', async () => {
    const user = userEvent.setup();

    render(<SignupModal onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('John doe');

    await user.type(input, '   ');

    const button = screen.getByRole('button', { name: /enter/i });
    expect(button).toBeDisabled();
  });
});
