
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Send, History, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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

  // Animation variants
  const navBarVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      } 
    }
  };

  const iconVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: [1, 1.2, 1],
      transition: { 
        duration: 0.3,
        times: [0, 0.5, 1]
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navBarVariants}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 z-40 px-1 shadow-lg"
    >
      <nav className="h-full">
        <ul className="flex items-center justify-between h-full">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path === '/multi-step-transfer' && currentPath.startsWith('/multi-step-transfer'));
            const IconComponent = item.icon;
            
            return (
              <li key={item.name} className="flex-1">
                <Link 
                  to={item.path} 
                  className="flex flex-col items-center justify-center h-full py-2"
                >
                  <motion.div 
                    className="relative"
                    initial="inactive"
                    animate={isActive ? "active" : "inactive"}
                    variants={iconVariants}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconComponent 
                      className={cn(
                        "w-6 h-6 mb-1", 
                        isActive ? "text-blue-600" : "text-gray-500"
                      )} 
                    />
                  </motion.div>
                  <motion.span 
                    className={cn(
                      "text-xs", 
                      isActive ? "text-blue-600 font-medium" : "text-gray-500"
                    )}
                    animate={{
                      fontWeight: isActive ? 600 : 400,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.div>
  );
}
