
import React from 'react';
import MultiStepTransferSheet from '@/components/transfer/MultiStepTransferSheet';
import { useNavigate } from 'react-router-dom';

const MobileMultiStepTransferSheetPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="h-screen bg-gray-50">
      <MultiStepTransferSheet onClose={handleClose} />
    </div>
  );
};

export default MobileMultiStepTransferSheetPage;
