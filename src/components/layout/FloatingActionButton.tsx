
import React from 'react';
import { Plus, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  const location = useLocation();
  const isTransferPage = location.pathname === '/transfer-old';

  return (
    <motion.button
      className={`fixed bottom-20 right-5 z-50 bg-red-500 text-white rounded-full ${
        isTransferPage ? 'px-6 py-3 h-auto' : 'w-14 h-14'
      } flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors`}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {isTransferPage ? (
        <>
          <Send size={20} className="mr-2" />
          <span className="text-sm font-medium">Send</span>
        </>
      ) : (
        <Plus size={28} />
      )}
    </motion.button>
  );
};

export default FloatingActionButton;
