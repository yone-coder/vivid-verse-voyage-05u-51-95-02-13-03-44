
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import MobileMultiStepTransferSheetPage from "@/components/mobile/transfer/MobileMultiStepTransferSheetPage";
import NotFound from "@/components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MobileMultiStepTransferSheetPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
