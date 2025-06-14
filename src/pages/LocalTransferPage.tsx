
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import DeviceRouter from '@/components/common/DeviceRouter';
import { LanguageProvider } from '@/context/LanguageContext';
import { useLocation, Navigate } from 'react-router-dom';

const LocalTransferPage = () => {
  const location = useLocation();
  
  // Since MobileLocalTransferSheetPage was deleted, redirect to home
  const RedirectComponent = () => <Navigate to="/" replace />;

  return (
    <LanguageProvider>
      <DeviceRouter
        mobileComponent={RedirectComponent}
        desktopComponent={RedirectComponent}
      />
    </LanguageProvider>
  );
};

export default LocalTransferPage;
