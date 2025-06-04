
import React from 'react';
import DeviceRouter from '@/components/common/DeviceRouter';
import PaytmMobileHome from '@/components/mobile/paytm/PaytmMobileHome';
import PaytmDesktopHome from '@/components/desktop/paytm/PaytmDesktopHome';

export default function PaytmHome() {
  return (
    <DeviceRouter
      mobileComponent={PaytmMobileHome}
      desktopComponent={PaytmDesktopHome}
    />
  );
}
