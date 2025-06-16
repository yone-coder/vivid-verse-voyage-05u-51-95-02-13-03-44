
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import MobileMultiStepTransferSheetPage from "@/pages/MobileMultiStepTransferSheetPage";
import TransferHistoryPage from "@/pages/TransferHistoryPage";
import TrackTransferPage from "@/pages/TrackTransferPage";
import LocationsPage from "@/pages/LocationsPage";
import AccountPage from "@/pages/AccountPage";
import NotFound from "@/components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        index: true, 
        element: <MobileMultiStepTransferSheetPage />
      },
      { 
        path: "transfer", 
        element: <MobileMultiStepTransferSheetPage />
      },
      { 
        path: "transfer-sheet", 
        element: <MobileMultiStepTransferSheetPage />
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
