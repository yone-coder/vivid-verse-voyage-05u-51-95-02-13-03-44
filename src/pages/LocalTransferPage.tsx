
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import DeviceRouter from '@/components/common/DeviceRouter';
import MobileLocalTransferSheetPage from '@/components/mobile/transfer/MobileLocalTransferSheetPage';
import { LanguageProvider } from '@/context/LanguageContext';
import { useLocation } from 'react-router-dom';

const LocalTransferPage = () => {
  const location = useLocation();
  
  // Pass the state to the mobile component
  const MobileComponentWithProps = () => (
    <MobileLocalTransferSheetPage initialState={location.state} />
  );

  return (
    <LanguageProvider>
      <DeviceRouter
        mobileComponent={MobileComponentWithProps}
        desktopComponent={MobileComponentWithProps}
      />
    </LanguageProvider>
  );
};

export default LocalTransferPage;
