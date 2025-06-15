
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import DeviceRouter from "@/components/common/DeviceRouter";
import MobileMultiStepTransferSheetPage from "@/components/mobile/transfer/MobileMultiStepTransferSheetPage";
import DesktopHomePage from "@/components/desktop/DesktopHomePage";
import DesktopTransferPage from "@/components/desktop/DesktopTransferPage";
import TransferHistoryPage from "@/pages/TransferHistoryPage";
import TrackTransferPage from "@/pages/TrackTransferPage";
import LocationsPage from "@/pages/LocationsPage";
import AccountPage from "@/pages/AccountPage";
import DesktopTransferHistoryPage from "@/components/desktop/DesktopTransferHistoryPage";
import DesktopTrackTransferPage from "@/components/desktop/DesktopTrackTransferPage";
import DesktopLocationsPage from "@/components/desktop/DesktopLocationsPage";
import DesktopAccountPage from "@/components/desktop/DesktopAccountPage";
import NotFound from "@/components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        index: true, 
        element: <DeviceRouter 
          mobileComponent={MobileMultiStepTransferSheetPage} 
          desktopComponent={DesktopHomePage}
        /> 
      },
      { 
        path: "transfer", 
        element: <DeviceRouter 
          mobileComponent={MobileMultiStepTransferSheetPage} 
          desktopComponent={DesktopTransferPage}
        /> 
      },
      { 
        path: "transfer-history", 
        element: <DeviceRouter 
          mobileComponent={TransferHistoryPage} 
          desktopComponent={DesktopTransferHistoryPage}
        /> 
      },
      { 
        path: "track-transfer", 
        element: <DeviceRouter 
          mobileComponent={TrackTransferPage} 
          desktopComponent={DesktopTrackTransferPage}
        /> 
      },
      { 
        path: "locations", 
        element: <DeviceRouter 
          mobileComponent={LocationsPage} 
          desktopComponent={DesktopLocationsPage}
        /> 
      },
      { 
        path: "account", 
        element: <DeviceRouter 
          mobileComponent={AccountPage} 
          desktopComponent={DesktopAccountPage}
        /> 
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
