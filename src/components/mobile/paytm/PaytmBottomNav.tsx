
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
        {/* Curved background for send button */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
          <div className="w-16 h-16 bg-white rounded-full shadow-md border border-gray-100"></div>
        </div>
        
        <nav className="flex items-center justify-around py-1 relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            
            if (item.isSpecial) {
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className="flex flex-col items-center justify-center p-1 relative z-10"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg -mt-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-blue-600 font-medium mt-0.5">
                    {item.name}
                  </span>
                </button>
              );
            }
            
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className="flex flex-col items-center justify-center p-1 min-w-0 flex-1"
              >
                <IconComponent 
                  className={cn(
                    "w-5 h-5 mb-0.5", 
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
