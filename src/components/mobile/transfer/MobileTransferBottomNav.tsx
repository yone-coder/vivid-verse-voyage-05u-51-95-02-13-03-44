
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
        stiffness: 300,
        damping: 30,
        delay: 0.1,
        staggerChildren: 0.1
      } 
    }
  };

  const navItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const iconVariants = {
    inactive: { 
      scale: 1,
      y: 0,
      transition: { duration: 0.2 }
    },
    active: { 
      scale: [1, 1.3, 1.1],
      y: [-2, -4, -2],
      transition: { 
        duration: 0.4,
        times: [0, 0.5, 1],
        type: "spring",
        stiffness: 400
      }
    }
  };

  const labelVariants = {
    inactive: { 
      y: 0,
      scale: 1,
      transition: { duration: 0.2 }
    },
    active: { 
      y: -1,
      scale: 1.05,
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navBarVariants}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-16 z-40 shadow-lg"
    >
      <nav className="h-full">
        <motion.ul 
          className="flex items-center justify-between h-full px-2"
          variants={navBarVariants}
        >
          {navItems.map((item, index) => {
            const isActive = currentPath === item.path || (item.path === '/multi-step-transfer' && currentPath.startsWith('/multi-step-transfer'));
            const IconComponent = item.icon;
            
            return (
              <motion.li 
                key={item.name} 
                className="flex-1"
                variants={navItemVariants}
                custom={index}
              >
                <Link 
                  to={item.path} 
                  className="flex flex-col items-center justify-center h-full py-2 px-2 rounded-lg transition-colors duration-200 hover:bg-gray-50"
                >
                  <motion.div 
                    className="relative"
                    initial="inactive"
                    animate={isActive ? "active" : "inactive"}
                    variants={iconVariants}
                    whileTap={{ scale: 0.85 }}
                  >
                    <IconComponent 
                      className={cn(
                        "w-6 h-6 mb-1 transition-colors duration-200", 
                        isActive ? "text-blue-600" : "text-gray-400"
                      )} 
                    />
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      />
                    )}
                  </motion.div>
                  <motion.span 
                    className={cn(
                      "text-xs transition-colors duration-200", 
                      isActive ? "text-blue-600 font-semibold" : "text-gray-400 font-medium"
                    )}
                    variants={labelVariants}
                    initial="inactive"
                    animate={isActive ? "active" : "inactive"}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>
    </motion.div>
  );
}
