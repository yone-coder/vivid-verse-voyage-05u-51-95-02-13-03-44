
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Send, History, MapPin, User, Route
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

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

  useEffect(() => {
    const path = location.pathname;
    console.log('Current path:', path);
    
    if (path === '/' || path.startsWith('/multi-step-transfer')) {
      setActiveTab('send');
    } else if (path.startsWith('/transfer-history')) {
      setActiveTab('history');
    } else if (path.startsWith('/track-transfer')) {
      setActiveTab('track');
    } else if (path.startsWith('/locations')) {
      setActiveTab('locations');
    } else if (path.startsWith('/account')) {
      setActiveTab('account');
    }
  }, [location.pathname]);

  const handleTabClick = useCallback((item: BottomNavTab, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('Tab clicked:', item.id, 'Current path:', location.pathname, 'Target path:', item.path);

    // If clicking on already active tab, do nothing
    if (item.id === activeTab) {
      console.log('Already on active tab, ignoring click');
      return;
    }

    console.log('Proceeding with navigation to:', item.path);
    
    // Navigate to the target path
    navigate(item.path, { replace: true });
  }, [navigate, activeTab, location.pathname]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 z-50 shadow-lg">
      <div className="flex justify-between items-center h-12 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={(e) => handleTabClick(item, e)}
              className={cn(
                'flex items-center justify-center relative transition-colors duration-200 px-3 py-1 rounded-full',
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
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
                    className="w-5 h-5"
                    width={20}
                    height={20}
                  />
                )}
                {item.badge && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">
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
    </div>
  );
}
