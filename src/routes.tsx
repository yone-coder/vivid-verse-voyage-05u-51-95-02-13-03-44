
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
import ResponsiveMultiStepTransferPage from "@/pages/ResponsiveMultiStepTransferPage";
import ResponsiveHomePage from "@/pages/ResponsiveHomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <ResponsiveHomePage /> },
      { path: "transfer", element: <ResponsiveMultiStepTransferPage /> },
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
