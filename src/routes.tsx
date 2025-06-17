
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import MobileMultiStepTransferSheetPage from "@/pages/MobileMultiStepTransferSheetPage";
import DesktopMultiStepTransferPage from "@/components/desktop/DesktopMultiStepTransferPage";
import DeviceRouter from "@/components/common/DeviceRouter";
import TransferHistoryPage from "@/pages/TransferHistoryPage";
import TrackTransferPage from "@/pages/TrackTransferPage";
import LocationsPage from "@/pages/LocationsPage";
import AccountPage from "@/pages/AccountPage";
import NotFound from "@/components/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

// Component that renders the appropriate transfer page based on device
const TransferPageRouter = () => (
  <DeviceRouter
    mobileComponent={MobileMultiStepTransferSheetPage}
    desktopComponent={DesktopMultiStepTransferPage}
  />
);

// Root component that wraps everything with providers
const RootComponent = () => (
  <LanguageProvider>
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  </LanguageProvider>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      { 
        index: true, 
        element: <TransferPageRouter />
      },
      { 
        path: "transfer", 
        element: <TransferPageRouter />
      },
      { 
        path: "transfer-sheet", 
        element: <TransferPageRouter />
      },
      { 
        path: "transfer-history", 
        element: <TransferHistoryPage />
      },
      { 
        path: "track-transfer", 
        element: <TrackTransferPage />
      },
      { 
        path: "locations", 
        element: <LocationsPage />
      },
      { 
        path: "account", 
        element: <AccountPage />
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
