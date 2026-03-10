import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EditModal.css';

interface EditModalProps {
  title: string;
  content: string;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
  isUpdating: boolean;
}

export const EditModal = ({ title: initialTitle, content: initialContent, onSave, onCancel, isUpdating }: EditModalProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave(title.trim(), content.trim());
    }
  };

  const isDisabled = !title.trim() || !content.trim() || isUpdating;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        onClick={onCancel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="modal edit-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
        <h2 className="modal-title">Edit item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title">Title</label>
            <input
              id="edit-title"
              type="text"
              placeholder="Hello world"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-content">Content</label>
            <textarea
              id="edit-content"
              placeholder="Content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              disabled={isUpdating}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onCancel} disabled={isUpdating}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={isDisabled}>
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
