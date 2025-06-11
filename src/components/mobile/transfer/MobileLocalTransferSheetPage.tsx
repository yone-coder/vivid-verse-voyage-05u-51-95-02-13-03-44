
import React from 'react';
import MobileMultiStepTransferSheetPage from './MobileMultiStepTransferSheetPage';

interface MobileLocalTransferSheetPageProps {
  defaultTransferType?: 'international' | 'national';
}

const MobileLocalTransferSheetPage: React.FC<MobileLocalTransferSheetPageProps> = ({ 
  defaultTransferType = 'national' 
}) => {
  return <MobileMultiStepTransferSheetPage defaultTransferType={defaultTransferType} />;
};

export default MobileLocalTransferSheetPage;
