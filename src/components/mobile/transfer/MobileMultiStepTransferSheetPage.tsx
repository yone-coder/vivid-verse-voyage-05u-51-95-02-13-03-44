import React from 'react';
import MultiStepTransferSheet from '@/components/transfer/MultiStepTransferSheet';
import TransferHomeHeader from '@/components/transfer/TransferHomeHeader';
import { useNavigate } from 'react-router-dom';

interface MobileMultiStepTransferSheetPageProps {
  hideHeader?: boolean;
}

const MobileMultiStepTransferSheetPage: React.FC<MobileMultiStepTransferSheetPageProps> = ({
  hideHeader = false,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {!hideHeader && (
        <TransferHomeHeader />
      )}
      <div className="flex-1 flex flex-col">
        <MultiStepTransferSheet 
          onClose={handleClose} 
          variant="page"
          disableSelectorNavigation={true}
        />
      </div>
    </div>
  );
};

export default MobileMultiStepTransferSheetPage;
