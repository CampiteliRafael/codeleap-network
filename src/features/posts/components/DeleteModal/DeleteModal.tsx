import { motion, AnimatePresence } from 'framer-motion';
import './DeleteModal.css';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export const DeleteModal = ({ onConfirm, onCancel, isDeleting }: DeleteModalProps) => {
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
          className="modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="modal-title">Are you sure you want to delete this item?</h2>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={onCancel} disabled={isDeleting}>
              Cancel
            </button>
            <button className="btn-delete" onClick={onConfirm} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
