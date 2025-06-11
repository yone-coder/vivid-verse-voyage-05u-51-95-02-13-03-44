
import React from 'react';
import MobileMultiStepTransferSheetPage from '@/components/mobile/transfer/MobileMultiStepTransferSheetPage';

interface DesktopMultiStepTransferPageProps {
  defaultTransferType?: 'international' | 'national';
}

const DesktopMultiStepTransferPage: React.FC<DesktopMultiStepTransferPageProps> = ({ 
  defaultTransferType = 'international' 
}) => {
  return <MobileMultiStepTransferSheetPage defaultTransferType={defaultTransferType} />;
};

export default DesktopMultiStepTransferPage;
