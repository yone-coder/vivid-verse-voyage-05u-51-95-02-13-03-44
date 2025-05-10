
import React from 'react';
import { X } from 'lucide-react';

interface AuthContainerProps {
  isOverlay?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const AuthContainer = ({ isOverlay = true, onClose, children }: AuthContainerProps) => {
  const containerClasses = isOverlay 
    ? "flex flex-col justify-between items-center min-h-full bg-white text-[#333] pt-8 pb-4 relative w-full" 
    : "flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-white to-gray-50 text-[#333] py-8";

  return (
    <div className={containerClasses}>
      {isOverlay && onClose && (
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-10"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      )}
      <div className="w-full max-w-md px-4 flex flex-col items-center justify-center py-4">
        <div className={`w-full ${!isOverlay ? "bg-white shadow-lg rounded-xl p-6 border border-gray-100" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
