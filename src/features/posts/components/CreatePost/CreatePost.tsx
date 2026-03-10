import { useState } from 'react';
import './CreatePost.css';

interface CreatePostProps {
  username: string;
  onSubmit: (title: string, content: string) => void;
  isCreating: boolean;
}

export const CreatePost = ({ onSubmit, isCreating }: CreatePostProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
      setTitle('');
      setContent('');
    }
  };

  const isDisabled = !title.trim() || !content.trim() || isCreating;

  return (
    <div className="create-post">
      <h2 className="create-post-title">What's on your mind?</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isCreating}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            disabled={isCreating}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-create" disabled={isDisabled}>
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
};
