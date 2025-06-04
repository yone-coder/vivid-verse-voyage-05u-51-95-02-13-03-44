
import React from 'react';
import DeviceRouter from '@/components/common/DeviceRouter';
import ForYouMobile from '@/components/mobile/ForYouMobile';
import ForYouDesktop from '@/components/desktop/ForYouDesktop';

export default function ForYou() {
  return (
    <DeviceRouter
      mobileComponent={ForYouMobile}
      desktopComponent={ForYouDesktop}
    />
  );
}
