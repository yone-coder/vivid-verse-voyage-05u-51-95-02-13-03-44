
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { AuthOverlayProvider } from "./context/AuthOverlayContext";
import Index from "./pages/Index";
import ForYou from "./pages/ForYou";
import Posts from "./pages/Posts";
import Reels from "./pages/Reels";
import Videos from "./pages/Videos";
import Trending from "./pages/Trending";
import Messages from "./pages/Messages";
import ProfilePage from "./pages/ProfilePage";
import MoreMenu from "./pages/MoreMenu";
import TransferPage from "./pages/TransferPage";
import AuthPage from "./pages/AuthPage";
import SignupPage from "./pages/SignupPage";
import TopUpPage from "./pages/TopUpPage";
import DepositPage from "./pages/DepositPage";
import PayPalDepositPage from "./pages/PayPalDepositPage";
import NFTPaymentPage from "./pages/NFTPaymentPage";
import NetflixPage from "./pages/NetflixPage";
import SearchPage from "./pages/SearchPage";
import ProductDetail from "./pages/ProductDetail";
import CategoriesPage from "./pages/CategoriesPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import FashionPage from "./pages/FashionPage";
import HomeLivingPage from "./pages/HomeLivingPage";
import SportsOutdoorsPage from "./pages/SportsOutdoorsPage";
import AutomotivePage from "./pages/AutomotivePage";
import KidsHobbiesPage from "./pages/KidsHobbiesPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import PayPalGuestCheckout from "./pages/PayPalGuestCheckout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <AuthOverlayProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/for-you" element={<ForYou />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/reels" element={<Reels />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/more" element={<MoreMenu />} />
                <Route path="/transfer" element={<TransferPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/top-up" element={<TopUpPage />} />
                <Route path="/deposit" element={<DepositPage />} />
                <Route path="/paypal-deposit" element={<PayPalDepositPage />} />
                <Route path="/nft-payment" element={<NFTPaymentPage />} />
                <Route path="/netflix" element={<NetflixPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/electronics" element={<ElectronicsPage />} />
                <Route path="/fashion" element={<FashionPage />} />
                <Route path="/home-living" element={<HomeLivingPage />} />
                <Route path="/sports-outdoors" element={<SportsOutdoorsPage />} />
                <Route path="/automotive" element={<AutomotivePage />} />
                <Route path="/kids-hobbies" element={<KidsHobbiesPage />} />
                <Route path="/entertainment" element={<EntertainmentPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/paypal-guest-checkout" element={<PayPalGuestCheckout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthOverlayProvider>
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
