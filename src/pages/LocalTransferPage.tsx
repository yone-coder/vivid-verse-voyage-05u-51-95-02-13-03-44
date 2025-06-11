
import React from 'react';
import DeviceRouter from '@/components/common/DeviceRouter';
import MobileLocalTransferSheetPage from '@/components/mobile/transfer/MobileLocalTransferSheetPage';
import DesktopMultiStepTransferPage from '@/components/desktop/transfer/DesktopMultiStepTransferPage';

const LocalTransferPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <DeviceRouter
        mobileComponent={() => <MobileLocalTransferSheetPage defaultTransferType="national" />}
        desktopComponent={() => <DesktopMultiStepTransferPage defaultTransferType="national" />}
      />
    </div>
  );
};

export default LocalTransferPage;
