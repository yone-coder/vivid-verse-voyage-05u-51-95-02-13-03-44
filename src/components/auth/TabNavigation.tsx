import React, { useState, useEffect } from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, KeyRound, AlertCircle } from 'lucide-react';
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// Extended interface with more customization options
interface TabNavigationProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  // New properties
  tabsData?: TabItem[];                   // Custom tabs data
  accentColor?: string;                   // Custom accent color
  showBadges?: boolean;                   // Option to show notification badges
  showTooltips?: boolean;                 // Option to show tooltips
  onTabHover?: (tab: string) => void;     // Event handler for tab hover
  tabDirection?: 'horizontal' | 'vertical'; // Tab layout direction
  size?: 'sm' | 'md' | 'lg';              // Size variants
  allowDisabledTabs?: boolean;            // Allow disabled tabs option
  className?: string;                     // Additional custom classes
  animationStyle?: 'rotate' | 'bounce' | 'grow' | 'none'; // Animation style
}

// Tab item interface
interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  badgeCount?: number;
  tooltip?: string;
  testId?: string; // For testing purposes
}

// Default tab data
const defaultTabsData: TabItem[] = [
  {
    id: 'email',
    label: 'Email',
    icon: <Mail className="h-3.5 w-3.5 mr-1.5" />,
    tooltip: 'Sign in with email',
    badgeCount: 0
  },
  {
    id: 'phone',
    label: 'Phone',
    icon: <Phone className="h-3.5 w-3.5 mr-1.5" />,
    tooltip: 'Sign in with phone number',
    badgeCount: 0
  },
  {
    id: 'passkey',
    label: 'Passkey',
    icon: <KeyRound className="h-3.5 w-3.5 mr-1.5" />,
    tooltip: 'Sign in with passkey',
    badgeCount: 0
  }
];

const TabNavigation = ({
  activeTab,
  handleTabChange,
  tabsData = defaultTabsData,
  accentColor = "#ff4747",
  showBadges = false,
  showTooltips = false,
  onTabHover,
  tabDirection = 'horizontal',
  size = 'md',
  allowDisabledTabs = false,
  className = '',
  animationStyle = 'rotate'
}: TabNavigationProps) => {
  // Track if component is mounted (for animations)
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, tabId: string, disabled?: boolean) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      handleTabChange(tabId);
    }
  };

  // Get animation class based on selected style
  const getAnimationClass = () => {
    switch (animationStyle) {
      case 'bounce':
        return 'group-hover:animate-bounce';
      case 'grow':
        return 'group-data-[state=active]:scale-110 group-hover:scale-105';
      case 'none':
        return '';
      case 'rotate':
      default:
        return 'group-hover:rotate-[-5deg]';
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs py-1';
      case 'lg':
        return 'text-sm py-3';
      case 'md':
      default:
        return 'text-xs py-2';
    }
  };

  // Animation effect on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Main className for TabsList
  const tabsListClass = `
    flex 
    ${tabDirection === 'vertical' ? 'flex-col' : 'w-full'} 
    bg-transparent 
    p-0 
    h-auto 
    border-${tabDirection === 'vertical' ? 'r' : 'b'} 
    border-[#eaeaea] 
    rounded-none 
    !rounded-none
    ${isMounted ? 'opacity-100' : 'opacity-0'}
    transition-opacity duration-300
    ${className}
  `;

  // Base className for TabsTrigger
  const baseTabClass = `
    ${tabDirection === 'vertical' ? 'justify-start px-3' : 'flex-1 justify-center'} 
    flex 
    items-center 
    ${getSizeClasses()}
    font-medium 
    border-${tabDirection === 'vertical' ? 'r-2' : 'b-2'} 
    data-[state=active]:border-[${accentColor}] 
    data-[state=active]:text-[${accentColor}] 
    data-[state=inactive]:border-transparent 
    rounded-none 
    data-[state=inactive]:text-gray-500 
    transition-all 
    duration-300 
    ease-in-out 
    hover:bg-gray-50 
    !rounded-none 
    group
  `;

  return (
    <TabsList className={tabsListClass} data-testid="tab-navigation">
      {tabsData.map((tab) => {
        // Wrapped tab content for tooltip support
        const tabContent = (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            disabled={!allowDisabledTabs && tab.disabled}
            data-disabled={tab.disabled}
            data-testid={tab.testId || `tab-${tab.id}`}
            className={`${baseTabClass} ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            onMouseEnter={() => onTabHover && onTabHover(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id, tab.disabled)}
            tabIndex={tab.disabled ? -1 : 0}
            aria-disabled={tab.disabled}
          >
            <span className={`transition-all duration-300 ease-in-out transform ${getAnimationClass()}`}>
              {tab.icon}
            </span>
            <span className="transition-all duration-300 ease-in-out group-data-[state=active]:font-medium group-hover:tracking-wide">
              {tab.label}
            </span>
            
            {/* Badge counter */}
            {showBadges && tab.badgeCount && tab.badgeCount > 0 && (
              <Badge 
                className="ml-1.5 bg-[#ff4747] hover:bg-[#ff4747] text-white text-xs px-1.5 rounded-full"
                variant="destructive"
              >
                {tab.badgeCount > 99 ? '99+' : tab.badgeCount}
              </Badge>
            )}
          </TabsTrigger>
        );

        // Return with or without tooltip
        return showTooltips && tab.tooltip ? (
          <TooltipProvider key={tab.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                {tabContent}
              </TooltipTrigger>
              <TooltipContent>
                <p>{tab.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : tabContent;
      })}
    </TabsList>
  );
};

export default TabNavigation;