
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import DeviceRoutedMultiStep from "@/pages/DeviceRoutedMultiStep";
import NotFound from "@/components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DeviceRoutedMultiStep />,
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
