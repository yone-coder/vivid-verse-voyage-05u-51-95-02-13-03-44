
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DeviceRouterProps {
  mobileComponent: React.ComponentType;
  desktopComponent: React.ComponentType;
}

const DeviceRouter: React.FC<DeviceRouterProps> = ({ 
  mobileComponent: MobileComponent, 
  desktopComponent: DesktopComponent 
}) => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileComponent /> : <DesktopComponent />;
};

export default DeviceRouter;
