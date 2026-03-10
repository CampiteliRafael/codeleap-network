import { useState } from 'react';
import './SignupModal.css';

interface SignupModalProps {
  onSubmit: (username: string) => void;
}

export const SignupModal = ({ onSubmit }: SignupModalProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="signup-modal-overlay">
      <div className="signup-modal">
        <h1 className="signup-title">Welcome to CodeLeap network!</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="signup-label">
            Please enter your username
          </label>
          <input
            id="username"
            type="text"
            className="signup-input"
            placeholder="John doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="signup-button"
            disabled={!username.trim()}
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
};
