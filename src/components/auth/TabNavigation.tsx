import React, { useState, useEffect } from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, KeyRound, Shield, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badgeCount?: number;
  progress?: number;
  alert?: boolean;
}

interface EnhancedTabNavigationProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  variant?: 'default' | 'minimal' | 'pills';
  accentColor?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  mobileBreakpoint?: number;
}

const EnhancedTabNavigation = ({ 
  activeTab, 
  handleTabChange, 
  variant = 'default',
  accentColor = '#ff4747',
  showLabels = true,
  size = 'md',
  mobileBreakpoint = 640
}: EnhancedTabNavigationProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Define tab items with their properties
  const tabs: TabItem[] = [
    { 
      id: 'email', 
      label: 'Email', 
      icon: <Mail className={`${getIconSize(size)}`} />,
      badgeCount: 3,
    },
    { 
      id: 'phone', 
      label: 'Phone', 
      icon: <Phone className={`${getIconSize(size)}`} />,
      progress: 65,
    },
    { 
      id: 'passkey', 
      label: 'Passkey', 
      icon: <KeyRound className={`${getIconSize(size)}`} />
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: <Shield className={`${getIconSize(size)}`} />,
      alert: true
    }
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [mobileBreakpoint]);

  // Helper function to get icon size based on size prop
  function getIconSize(size: string): string {
    switch (size) {
      case 'sm': return 'h-3 w-3 mr-1';
      case 'lg': return 'h-5 w-5 mr-2';
      default: return 'h-4 w-4 mr-1.5';
    }
  }

  // Helper function to get tab container styles based on variant
  function getTabContainerStyles(): string {
    const baseStyles = "flex w-full transition-all";
    
    switch (variant) {
      case 'minimal':
        return `${baseStyles} bg-transparent p-0 h-auto`;
      case 'pills':
        return `${baseStyles} bg-gray-100 p-1 rounded-lg gap-1`;
      default:
        return `${baseStyles} bg-transparent p-0 h-auto border-b border-gray-200`;
    }
  }

  // Helper function to get tab trigger styles based on variant
  function getTabTriggerStyles(tabId: string): string {
    const isActive = activeTab === tabId;
    const baseStyles = "flex items-center justify-center font-medium transition-all relative";
    const sizeStyles = size === 'sm' ? 'text-xs py-1.5 px-2' : size === 'lg' ? 'text-sm py-3 px-4' : 'text-xs py-2 px-3';
    
    switch (variant) {
      case 'minimal':
        return `${baseStyles} ${sizeStyles} ${isActive ? `text-[${accentColor}]` : 'text-gray-500'} hover:text-gray-700`;
      case 'pills':
        return `${baseStyles} ${sizeStyles} rounded-md ${isActive ? `bg-white shadow-sm text-[${accentColor}]` : 'text-gray-500'} hover:text-gray-700`;
      default:
        return `${baseStyles} ${sizeStyles} flex-1 border-b-2 rounded-none ${isActive ? `border-[${accentColor}] text-[${accentColor}]` : 'border-transparent text-gray-500'} hover:bg-gray-50`;
    }
  }

  return (
    <div className="w-full">
      <TabsList className={getTabContainerStyles()}>
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.id}
            value={tab.id} 
            className={getTabTriggerStyles(tab.id)}
            onClick={() => handleTabChange(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div className="relative flex items-center">
              {/* Tab icon with potential indicator */}
              <div className="relative">
                {tab.icon}
                
                {/* Badge count indicator */}
                {tab.badgeCount && tab.badgeCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs rounded-full bg-red-500 text-white font-medium"
                    style={{ fontSize: '0.65rem' }}
                  >
                    {tab.badgeCount}
                  </span>
                )}
                
                {/* Alert indicator */}
                {tab.alert && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
                )}
              </div>
              
              {/* Tab label */}
              {(showLabels || hoveredTab === tab.id) && (
                <AnimatePresence>
                  <motion.span 
                    initial={isMobile ? { opacity: 0 } : { opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={isMobile ? { opacity: 0 } : { opacity: 1 }}
                    className="ml-1.5"
                  >
                    {tab.label}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
            
            {/* Progress bar */}
            {tab.progress !== undefined && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200">
                <motion.div 
                  className="h-full" 
                  style={{ 
                    backgroundColor: accentColor,
                    width: `${tab.progress}%` 
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${tab.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default EnhancedTabNavigation;