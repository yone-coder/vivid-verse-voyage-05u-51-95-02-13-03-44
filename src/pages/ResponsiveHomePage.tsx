
import React from 'react';
import DeviceRouter from '@/components/common/DeviceRouter';
import MobileMultiStepTransferSheetPage from '@/components/mobile/transfer/MobileMultiStepTransferSheetPage';
import DesktopHomeWithTabs from '@/components/desktop/DesktopHomeWithTabs';

const ResponsiveHomePage: React.FC = () => {
  return (
    <DeviceRouter
      mobileComponent={MobileMultiStepTransferSheetPage}
      desktopComponent={DesktopHomeWithTabs}
    />
  );
};

export default ResponsiveHomePage;
