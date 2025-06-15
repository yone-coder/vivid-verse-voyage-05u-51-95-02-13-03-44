
import React from 'react';
import DeviceRouter from '@/components/common/DeviceRouter';
import MobileMultiStepTransferSheetPage from '@/components/mobile/transfer/MobileMultiStepTransferSheetPage';

const ResponsiveHomePage: React.FC = () => {
  return (
    <DeviceRouter
      mobileComponent={MobileMultiStepTransferSheetPage}
      desktopComponent={MobileMultiStepTransferSheetPage}
    />
  );
};

export default ResponsiveHomePage;
