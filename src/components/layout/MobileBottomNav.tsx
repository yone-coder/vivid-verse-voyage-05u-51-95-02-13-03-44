
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MobileBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
    },
    {
      name: 'Categories',
      path: '/categories',
      icon: Search,
    },
    {
      name: 'Cart',
      path: '/cart',
      icon: ShoppingCart,
      badge: 2, // This would normally be dynamic from a cart context
    },
    {
      name: 'Wishlist',
      path: '/wishlist',
      icon: Heart,
    },
    {
      name: 'Account',
      path: '/account',
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-14 z-40 px-1">
      <nav className="h-full">
        <ul className="flex items-center justify-between h-full">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const IconComponent = item.icon;
            
            return (
              <li key={item.name} className="flex-1">
                <Link 
                  to={item.path} 
                  className="flex flex-col items-center justify-center h-full"
                >
                  <div className="relative">
                    <IconComponent 
                      className={cn(
                        "w-5 h-5 mb-1", 
                        isActive ? "text-red-500" : "text-gray-500"
                      )} 
                    />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px]", 
                    isActive ? "text-red-500 font-medium" : "text-gray-500"
                  )}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
