
import { createBrowserRouter } from "react-router-dom";
import MobileMultiStepTransferSheetPage from "@/components/mobile/transfer/MobileMultiStepTransferSheetPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MobileMultiStepTransferSheetPage />,
  },
]);
