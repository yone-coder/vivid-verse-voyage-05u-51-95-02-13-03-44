
import React from 'react';
import DeviceRouter from '@/components/common/DeviceRouter';
import MobileMultiStepTransferSheetPage from '@/components/mobile/transfer/MobileMultiStepTransferSheetPage';
import DesktopMultiStepTransferPage from '@/components/desktop/transfer/DesktopMultiStepTransferPage';

const LocalTransferPage: React.FC = () => {
  return (
    <DeviceRouter
      mobileComponent={MobileMultiStepTransferSheetPage}
      desktopComponent={DesktopMultiStepTransferPage}
    />
  );
};

export default LocalTransferPage;
