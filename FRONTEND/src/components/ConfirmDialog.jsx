// src/components/ConfirmDialog.jsx
import { motion } from "framer-motion";

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex backdrop-blur-sm items-center justify-center text-secondary/50 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-primary border border-secondary/20 rounded-2xl shadow-xl p-6 w-full max-w-sm"
      >
        <h2 className="text-lg font-semibold text-secondary/70">{title}</h2>
        <p className="text-secondary/60 mt-2">{message}</p>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary/60"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-secondary"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}
