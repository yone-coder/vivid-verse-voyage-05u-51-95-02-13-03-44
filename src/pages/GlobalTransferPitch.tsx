
import React from 'react';
import DeviceRouter from '@/components/common/DeviceRouter';
import GlobalTransferPitchMobile from '@/components/mobile/GlobalTransferPitchMobile';
import GlobalTransferPitchDesktop from '@/components/desktop/GlobalTransferPitchDesktop';

export default function GlobalTransferPitch() {
  return (
    <DeviceRouter 
      mobileComponent={GlobalTransferPitchMobile}
      desktopComponent={GlobalTransferPitchDesktop}
    />
  );
}
