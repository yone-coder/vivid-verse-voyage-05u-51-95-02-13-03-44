
import React from 'react';
import { Send, Receipt, Search, User, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PaytmBottomNavProps {
  amount?: string;
  transferType?: 'international' | 'local';
  onSendClick?: () => void;
}

export default function PaytmBottomNav({ amount, transferType, onSendClick }: PaytmBottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Send,
    },
    {
      name: 'History',
      path: '/transfer-history',
      icon: Receipt,
    },
    {
      name: 'Track',
      path: '/track-transfer',
      icon: Search,
    },
    {
      name: 'Account',
      path: '/account',
      icon: User,
    },
  ];

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (path !== location.pathname) {
      navigate(path);
    }
  };

  const hasAmount = amount && parseFloat(amount) > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-sm mx-auto">
        {/* Continue Button - Only show when amount is entered */}
        {hasAmount && (
          <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
            <button
              onClick={onSendClick}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#ff4747] to-[#ff6b6b] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Continue - Send {transferType === 'international' ? '$' : 'HTG'}{amount} {transferType === 'local' ? 'locally' : 'to Haiti'}
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
        
        <nav className="flex items-center justify-around py-3 px-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            
            return (
              <button
                key={item.name}
                onClick={(e) => handleNavClick(item.path, e)}
                className="flex flex-col items-center justify-center p-1 min-w-0 flex-1 transition-colors duration-200"
              >
                <IconComponent 
                  className={cn(
                    "w-5 h-5 mb-1", 
                    isActive ? "text-[#ff4747]" : "text-gray-500"
                  )} 
                />
                <span 
                  className={cn(
                    "text-xs", 
                    isActive ? "text-[#ff4747] font-medium" : "text-gray-500"
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
