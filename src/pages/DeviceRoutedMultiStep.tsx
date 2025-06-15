
import React from "react";
import DeviceRouter from "@/components/common/DeviceRouter";
import MobileMultiStepTransferSheetPage from "@/components/mobile/transfer/MobileMultiStepTransferSheetPage";
import DesktopMultiStepTransferSheetPage from "@/components/desktop/transfer/DesktopMultiStepTransferSheetPage";

/**
 * Device-routed multi-step transfer page for index route.
 */
const DeviceRoutedMultiStep: React.FC = () => (
  <DeviceRouter
    mobileComponent={MobileMultiStepTransferSheetPage}
    desktopComponent={DesktopMultiStepTransferSheetPage}
  />
);

export default DeviceRoutedMultiStep;
