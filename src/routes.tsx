
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthPage from "@/pages/AuthPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";
import TransferHistoryPage from "@/pages/TransferHistoryPage";
import ResponsiveMultiStepTransferPage from "@/pages/ResponsiveMultiStepTransferPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <ResponsiveMultiStepTransferPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "transfer-history", element: <TransferHistoryPage /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);
