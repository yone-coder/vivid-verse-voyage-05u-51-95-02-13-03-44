
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import AuthContainer from "./components/auth/AuthContainer";
import TransferPage from "./pages/TransferPage";
import MultiStepTransferPage from "./pages/MultiStepTransferPage";
import MultiStepTransferSheetPage from "./pages/MultiStepTransferSheetPage";
import MultiStepTransferSheetDesktopPage from "./pages/MultiStepTransferSheetDesktopPage";
import ForYouPage from "./pages/ForYouPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductPage from "./pages/ProductPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AdminPage from "./pages/AdminPage";
import ShippingInfoPage from "./pages/ShippingInfoPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import CustomerServicePage from "./pages/CustomerServicePage";
import FAQPage from "./pages/FAQPage";
import MainLayout from "./components/layout/MainLayout";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><IndexPage /></MainLayout>} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/transfer" element={<MainLayout><TransferPage /></MainLayout>} />
        <Route path="/multi-step-transfer-page" element={<MultiStepTransferPage />} />
        <Route path="/multi-step-transfer-sheet-page" element={<MultiStepTransferSheetPage />} />
        <Route path="/multi-step-transfer-desktop" element={<MultiStepTransferSheetDesktopPage />} />
        <Route path="/for-you" element={<MainLayout><ForYouPage /></MainLayout>} />
        <Route path="/categories" element={<MainLayout><CategoriesPage /></MainLayout>} />
        <Route path="/product/:id" element={<MainLayout><ProductPage /></MainLayout>} />
        <Route path="/contact-us" element={<MainLayout><ContactUsPage /></MainLayout>} />
        <Route path="/about-us" element={<MainLayout><AboutUsPage /></MainLayout>} />
        <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicyPage /></MainLayout>} />
        <Route path="/terms-of-service" element={<MainLayout><TermsOfServicePage /></MainLayout>} />
        <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
        <Route path="/wishlist" element={<MainLayout><WishlistPage /></MainLayout>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/shipping-info" element={<MainLayout><ShippingInfoPage /></MainLayout>} />
        <Route path="/return-policy" element={<MainLayout><ReturnPolicyPage /></MainLayout>} />
        <Route path="/customer-service" element={<MainLayout><CustomerServicePage /></MainLayout>} />
        <Route path="/faq" element={<MainLayout><FAQPage /></MainLayout>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
