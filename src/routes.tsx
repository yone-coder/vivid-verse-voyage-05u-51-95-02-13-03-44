
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import MobileMultiStepTransferSheetPage from "@/components/mobile/transfer/MobileMultiStepTransferSheetPage";
import DesktopMultiStepTransferSheetPage from "@/components/desktop/transfer/DesktopMultiStepTransferSheetPage";
import NotFound from "@/components/NotFound";
import DeviceRouter from "@/components/common/DeviceRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DeviceRouter
        mobileComponent={MobileMultiStepTransferSheetPage}
        desktopComponent={DesktopMultiStepTransferSheetPage}
      />
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
