
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import MobileMultiStepTransferSheetPage from "@/components/mobile/transfer/MobileMultiStepTransferSheetPage";
import NotFound from "@/components/NotFound";
import TransferHistoryPage from "@/pages/TransferHistoryPage";
import TrackTransferPage from "@/pages/TrackTransferPage";
import LocationsPage from "@/pages/LocationsPage";
import AccountPage from "@/pages/AccountPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MobileMultiStepTransferSheetPage /> },
      { path: "/transfer-history", element: <TransferHistoryPage /> },
      { path: "/track-transfer", element: <TrackTransferPage /> },
      { path: "/locations", element: <LocationsPage /> },
      { path: "/account", element: <AccountPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
