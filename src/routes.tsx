
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Index from "@/pages/Index";
import AuthPage from "@/pages/AuthPage";
import SignupPage from "@/pages/SignupPage";
import ProductDetail from "@/pages/ProductDetail";
import SearchPage from "@/pages/SearchPage";
import ProfilePage from "@/pages/ProfilePage";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Index /> },
      { path: "auth", element: <AuthPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "search", element: <SearchPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "checkout", element: <Checkout /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);
