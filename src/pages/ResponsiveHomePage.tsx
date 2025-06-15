
import React from 'react';
import DeviceRouter from '@/components/common/DeviceRouter';
import MobileMultiStepTransferSheetPage from '@/components/mobile/transfer/MobileMultiStepTransferSheetPage';
import MultiStepTransferSheetDesktopPage from '@/pages/MultiStepTransferSheetDesktopPage';

const ResponsiveHomePage: React.FC = () => {
  return (
    <DeviceRouter
      mobileComponent={MobileMultiStepTransferSheetPage}
      desktopComponent={MultiStepTransferSheetDesktopPage}
    />
  );
};

export default ResponsiveHomePage;
