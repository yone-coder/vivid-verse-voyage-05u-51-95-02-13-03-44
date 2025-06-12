
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import DeviceRouter from '@/components/common/DeviceRouter';
import MobileLocalTransferSheetPage from '@/components/mobile/transfer/MobileLocalTransferSheetPage';
import { LanguageProvider } from '@/context/LanguageContext';

const LocalTransferPage = () => {
  return (
    <LanguageProvider>
      <DeviceRouter
        mobile={<MobileLocalTransferSheetPage />}
        desktop={<MobileLocalTransferSheetPage />}
      />
    </LanguageProvider>
  );
};

export default LocalTransferPage;
