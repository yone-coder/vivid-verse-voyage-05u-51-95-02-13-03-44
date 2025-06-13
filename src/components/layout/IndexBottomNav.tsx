
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Send, History, MapPin, User, Route, X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import ProductUploadOverlay from '@/components/product/ProductUploadOverlay';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AuthPage from '@/pages/AuthPage';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/home/Logo';

interface BottomNavTab {
  id: string;
  name: string;
  icon: React.FC<any> | React.ForwardRefExoticComponent<any>;
  path: string;
  isAvatar?: boolean;
  badge?: number;
}

const navItems: BottomNavTab[] = [
  { id: 'send', name: 'Send', icon: Send, path: '/' }, 
  { id: 'history', name: 'History', icon: History, path: '/transfer-history' },
  { id: 'track', name: 'Track', icon: Route, path: '/track-transfer' },
  { id: 'locations', name: 'Locations', icon: MapPin, path: '/locations' },
  { id: 'account', name: 'Account', icon: User, path: '/account' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('send');
  const [previousTab, setPreviousTab] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showProductUpload, setShowProductUpload] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/multi-step-transfer')) setActiveTab('send');
    else if (path.startsWith('/transfer-history')) setActiveTab('history');
    else if (path.startsWith('/track-transfer')) setActiveTab('track');
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
                    <div
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full"
                    >
                      {item.badge}
                    </div>
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
