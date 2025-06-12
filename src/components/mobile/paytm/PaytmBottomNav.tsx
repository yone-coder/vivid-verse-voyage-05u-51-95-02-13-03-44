
import React from 'react';
import { Home, Receipt, Send, Search, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function PaytmBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
    },
    {
      name: 'Transactions',
      path: '/transactions',
      icon: Receipt,
    },
    {
      name: 'Send',
      path: '/multi-step-transfer-page',
      icon: Send,
      isSpecial: true,
    },
    {
      name: 'Track',
      path: '/track',
      icon: Search,
    },
    {
      name: 'Account',
      path: '/account',
      icon: User,
    },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-sm mx-auto">
        <nav className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            
            if (item.isSpecial) {
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className="flex flex-col items-center justify-center p-2"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-blue-600 font-medium mt-1">
                    {item.name}
                  </span>
                </button>
              );
            }
            
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className="flex flex-col items-center justify-center p-2 min-w-0 flex-1"
              >
                <IconComponent 
                  className={cn(
                    "w-6 h-6 mb-1", 
                    isActive ? "text-blue-600" : "text-gray-500"
                  )} 
                />
                <span 
                  className={cn(
                    "text-xs", 
                    isActive ? "text-blue-600 font-medium" : "text-gray-500"
                  )}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
