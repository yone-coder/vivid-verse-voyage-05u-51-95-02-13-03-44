
import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TransferHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <div className="bg-blue-600 flex items-center p-4 sticky top-0 z-50 shadow-sm">
      <button 
        onClick={handleBackClick}
        className="p-2 rounded-full hover:bg-blue-700 text-white"
      >
        <X size={20} />
      </button>
      <h1 className="text-xl font-semibold ml-2 text-white">Global Transfè</h1>
    </div>
  );
};

export default TransferHeader;
