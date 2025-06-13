
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Send, History, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MobileTransferBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      name: 'Send',
      path: '/multi-step-transfer',
      icon: Send,
    },
    {
      name: 'History',
      path: '/transfer-history',
      icon: History,
    },
    {
      name: 'Track',
      path: '/track-transfer',
      icon: MapPin,
    },
    {
      name: 'Account',
      path: '/account',
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-16 z-40">
      <nav className="h-full">
        <ul className="flex items-center justify-around h-full px-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path === '/multi-step-transfer' && currentPath.startsWith('/multi-step-transfer'));
            const IconComponent = item.icon;
            
            return (
              <li key={item.name} className="flex-1">
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex flex-col items-center justify-center h-full py-2 px-2 transition-colors duration-200",
                    isActive ? "text-blue-600" : "text-gray-400"
                  )}
                >
                  <IconComponent 
                    className={cn(
                      "w-6 h-6 mb-1", 
                      isActive ? "text-blue-600" : "text-gray-400"
                    )} 
                  />
                  <span 
                    className={cn(
                      "text-xs", 
                      isActive ? "text-blue-600 font-medium" : "text-gray-400"
                    )}
                  >
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
