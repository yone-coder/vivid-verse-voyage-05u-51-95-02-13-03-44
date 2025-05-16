
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Zap, Rss, MessageCircle, TvMinimalPlay, User, X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import ProductUploadOverlay from '@/components/product/ProductUploadOverlay';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AuthPage from '@/pages/AuthPage';
import SignInBanner from './SignInBanner';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/home/Logo'; // fixed import path (lowercase 'home')

const navItems = [
  { id: 'home', name: 'Home', icon: Logo, path: '/for-you' }, // replaced Home with Logo
  { id: 'shorts', name: 'Shorts', icon: Zap, path: '/reels' },
  { id: 'feeds', name: 'Feeds', icon: Rss, path: '/posts' },
  { id: 'messages', name: 'Messages', icon: MessageCircle, path: '/messages' },
  { id: 'videos', name: 'Videos', icon: TvMinimalPlay, path: '/videos' },
  { id: 'account', name: 'Account', icon: User, path: '/account', isAvatar: true },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('home');
  const [previousTab, setPreviousTab] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showProductUpload, setShowProductUpload] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showSignInBanner, setShowSignInBanner] = useState(true);

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/for-you')) setActiveTab('home');
    else if (path.startsWith('/shorts')) setActiveTab('shorts');
    else if (path.startsWith('/feeds')) setActiveTab('feeds');
    else if (path.startsWith('/messages')) setActiveTab('messages');
    else if (path.startsWith('/videos')) setActiveTab('videos');
    else if (path.startsWith('/account')) setActiveTab('account');
  }, [location.pathname]);

  const handleTabClick = (item) => {
    if (animating || item.id === activeTab) return;

    setAnimating(true);
    setPreviousTab(activeTab);
    setActiveTab(item.id);
    navigate(item.path);
    setTimeout(() => {
      setAnimating(false);
      setPreviousTab(null);
    }, 300);
  };

  return (
    <>
      {showSignInBanner && <SignInBanner openAuthDialog={() => setShowAuthDialog(true)} />}

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="w-full max-w-sm p-0 h-[100dvh] sm:h-auto overflow-auto">
          <button 
            onClick={() => setShowAuthDialog(false)}
            className="absolute left-4 top-4 z-50 rounded-sm opacity-70 text-white bg-gray-800/40 hover:bg-gray-700/40 transition-opacity p-1"
          >
            <X className="h-4 w-4" />
          </button>
          <AuthPage isOverlay onClose={() => setShowAuthDialog(false)} />
        </DialogContent>
      </Dialog>

      <ProductUploadOverlay
        isOpen={showProductUpload}
        onClose={() => setShowProductUpload(false)}
      />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 z-50 shadow-lg"
      >
        <div className="flex justify-between items-center h-12 px-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const wasActive = previousTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={cn(
                  'flex items-center justify-center relative transition-all duration-300 ease-out transform px-3 py-1 rounded-full',
                  isActive
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : wasActive
                      ? 'scale-95 text-gray-500'
                      : 'scale-100 text-gray-500'
                )}
              >
                <div className="relative flex items-center justify-center">
                  {item.isAvatar && user ? (
                    <Avatar className="w-5 h-5 border">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt="User" />
                      <AvatarFallback className="text-xs">{user.email?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                   <Icon
                      className={cn(
                        'transition-transform duration-300',
                        'w-5 h-5',
                        isActive ? 'scale-110' : 'scale-100'
                      )}
                      width={20}
                      height={20}
                    />
                  )}
                  {item.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full"
                    >
                      {item.badge}
                    </motion.div>
                  )}
                  {isActive && item.name && (
                    <span className="ml-2 font-medium whitespace-nowrap max-w-[80px] overflow-hidden">
                      {item.name}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
