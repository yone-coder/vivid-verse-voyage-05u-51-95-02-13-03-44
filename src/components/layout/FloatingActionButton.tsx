
import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      className="fixed bottom-20 right-5 z-30 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Plus size={24} />
    </motion.button>
  );
};

export default FloatingActionButton;
