
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthPage from "@/pages/AuthPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import AccountPage from "@/pages/AccountPage";
import NotFound from "@/pages/NotFound";
import TransferHistoryPage from "@/pages/TransferHistoryPage";
import LocationsPage from "@/pages/LocationsPage";
import TrackTransferPage from "@/pages/TrackTransferPage";
import MobileMultiStepTransferSheetPage from "@/components/mobile/transfer/MobileMultiStepTransferSheetPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MobileMultiStepTransferSheetPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "account", element: <AccountPage /> },
      { path: "transfer-history", element: <TransferHistoryPage /> },
      { path: "locations", element: <LocationsPage /> },
      { path: "track-transfer", element: <TrackTransferPage /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);
