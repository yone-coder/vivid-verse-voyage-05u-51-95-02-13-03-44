
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Home, ShoppingBag, Heart, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  id: string;
  name: string;
  icon: any;
  path: string;
  isAvatar?: boolean;
  badge?: number;
}

export default function IndexBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems: NavItemProps[] = [
    {
      id: 'home',
      name: 'Home',
      icon: Home,
      path: '/',
    },
    {
      id: 'categories',
      name: 'Categories',
      icon: ShoppingBag,
      path: '/categories',
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: MessageCircle,
      path: '/messages',
      badge: 3
    },
    {
      id: 'wishlist',
      name: 'Wishlist',
      icon: Heart,
      path: '/wishlist',
    },
    {
      id: 'account',
      name: 'Account',
      icon: () => (
        <Avatar className="h-5 w-5 border border-muted">
          <div className="bg-gradient-to-br from-orange-400 to-rose-400 h-full w-full" />
        </Avatar>
      ),
      path: '/profile',
      isAvatar: true,
    },
  ];

  // Function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/for-you') return true;
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-white shadow-md border-t border-gray-100 z-30">
      <div className="h-full max-w-lg mx-auto px-4 flex items-center justify-between">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center text-xs w-1/5 h-full transition-colors",
              isActive(item.path)
                ? "text-black font-semibold"
                : "text-gray-500 hover:text-gray-900"
            )}
          >
            <div className="relative">
              {typeof item.icon === 'function' ? (
                item.icon()
              ) : (
                <item.icon className="h-5 w-5 mb-1" />
              )}
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3 h-3 flex items-center justify-center">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </div>
            <span className="mt-0.5">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
