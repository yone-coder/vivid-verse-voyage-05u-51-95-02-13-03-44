
import React from 'react';
import DeviceRouter from '@/components/common/DeviceRouter';
import MobileMultiStepTransferSheetPage from '@/components/mobile/transfer/MobileMultiStepTransferSheetPage';
import DesktopHomePage from '@/pages/DesktopHomePage';

const ResponsiveHomePage: React.FC = () => {
  return (
    <DeviceRouter
      mobileComponent={MobileMultiStepTransferSheetPage}
      desktopComponent={DesktopHomePage}
    />
  );
};

export default ResponsiveHomePage;
