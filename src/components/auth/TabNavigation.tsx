import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, KeyRound, Shield, Fingerprint, User, AlertCircle } from 'lucide-react';
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion"; // Note: You would need to install this package

// Extended interface with more customization options
interface TabNavigationProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  // Customization properties
  tabsData?: TabItem[];                   
  theme?: 'light' | 'dark' | 'system';     // Color theme
  appearance?: 'minimal' | 'elevated' | 'filled' | 'subtle' | 'outlined';  // Visual style
  showBadges?: boolean;                   
  showTooltips?: boolean;                 
  onTabHover?: (tab: string) => void;     
  tabDirection?: 'horizontal' | 'vertical'; 
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  allowDisabledTabs?: boolean;            
  className?: string;                     
  motionPreset?: 'slide' | 'fade' | 'scale' | 'bounce' | 'none';
  iconPosition?: 'left' | 'top' | 'right';
  groupLabels?: Record<string, string>;   // Group tabs with labels
  fullWidth?: boolean;                    // Take up full container width
  indicatorStyle?: 'line' | 'filled' | 'pill' | 'dot';
  equalWidth?: boolean;                   // Make all tabs equal width
  roundedCorners?: boolean;               // Apply rounded corners to tabs
  dense?: boolean;                        // Compact layout option
  showIconsOnly?: boolean;                // Show only icons on small screens
  preserveIconSpace?: boolean;            // Keep consistent spacing for tabs without icons
  scrollable?: boolean;                   // Enable horizontal scrolling for many tabs
  showActiveIndicator?: boolean;          // Show/hide the active indicator
  indicatorAnimation?: 'slide' | 'fade' | 'grow' | 'none';
  underlineHeight?: number;               // Height of the underline indicator in px
  highlightStrength?: 'light' | 'medium' | 'strong'; // Hover highlight intensity
  hoverEffect?: 'tint' | 'elevate' | 'glow' | 'none'; // Hover effect style
  activeTabShadow?: boolean;              // Apply shadow to active tab
  initialAnimation?: boolean;             // Animate tabs on initial render
}

// Enhanced tab item interface
interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badgeCount?: number;
  tooltip?: string;
  testId?: string;
  accentColor?: string;          // Per-tab accent color
  group?: string;                // Group identifier for tab grouping
  trailingIcon?: React.ReactNode; // Icon at the end of tab
  description?: string;          // Optional secondary text for richer tabs
  shortcutKey?: string;          // Keyboard shortcut display
  status?: 'default' | 'error' | 'warning' | 'success' | 'info'; // Status indicators
  hidden?: boolean;              // Hide tab but keep in DOM
  analyticsId?: string;          // For tracking
}

// Extended default tab data with richer content
const defaultTabsData: TabItem[] = [
  {
    id: 'email',
    label: 'Email',
    icon: <Mail className="h-4 w-4" />,
    tooltip: 'Sign in with email address',
    badgeCount: 0,
    shortcutKey: '⌘E',
    group: 'standard'
  },
  {
    id: 'phone',
    label: 'Phone',
    icon: <Phone className="h-4 w-4" />,
    tooltip: 'Sign in with phone number',
    badgeCount: 0,
    shortcutKey: '⌘P',
    group: 'standard'
  },
  {
    id: 'passkey',
    label: 'Passkey',
    icon: <KeyRound className="h-4 w-4" />,
    tooltip: 'Sign in using passkey',
    badgeCount: 0,
    shortcutKey: '⌘K',
    group: 'secure',
    status: 'success'
  },
  {
    id: 'fingerprint',
    label: 'Biometric',
    icon: <Fingerprint className="h-4 w-4" />,
    tooltip: 'Sign in with fingerprint or Face ID',
    badgeCount: 0,
    group: 'secure',
    status: 'info'
  }
];

// Map status to appropriate styling
const getStatusStyles = (status?: TabItem['status']) => {
  switch (status) {
    case 'error':
      return 'text-red-500 bg-red-50 dark:bg-red-900/20';
    case 'warning':
      return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
    case 'success':
      return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
    case 'info':
      return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    default:
      return '';
  }
};

const TabNavigation = ({
  activeTab,
  handleTabChange,
  tabsData = defaultTabsData,
  theme = 'light',
  appearance = 'minimal',
  showBadges = true,
  showTooltips = true,
  onTabHover,
  tabDirection = 'horizontal',
  size = 'md',
  allowDisabledTabs = false,
  className = '',
  motionPreset = 'slide',
  iconPosition = 'left',
  groupLabels = { standard: 'Standard Methods', secure: 'Secure Methods' },
  fullWidth = true,
  indicatorStyle = 'line',
  equalWidth = false,
  roundedCorners = true,
  dense = false,
  showIconsOnly = false,
  preserveIconSpace = true,
  scrollable = false,
  showActiveIndicator = true,
  indicatorAnimation = 'slide',
  underlineHeight = 2,
  highlightStrength = 'medium',
  hoverEffect = 'tint',
  activeTabShadow = false,
  initialAnimation = true
}: TabNavigationProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [indicatorProps, setIndicatorProps] = useState({ left: 0, width: 0, top: 0, height: 0 });
  const tabsRef = useRef<Map<string, HTMLElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get all tabs by group
  const groupedTabs: Record<string, TabItem[]> = tabsData.reduce((acc, tab) => {
    const group = tab.group || 'default';
    if (!acc[group]) acc[group] = [];
    if (!tab.hidden) acc[group].push(tab);
    return acc;
  }, {} as Record<string, TabItem[]>);

  // Calculate position for animated indicator
  useEffect(() => {
    if (isMounted && showActiveIndicator) {
      const activeTabElement = tabsRef.current.get(activeTab);
      if (activeTabElement) {
        const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = activeTabElement;
        setIndicatorProps({
          left: offsetLeft,
          width: offsetWidth,
          top: offsetTop + (tabDirection === 'vertical' ? 0 : offsetHeight - underlineHeight),
          height: tabDirection === 'vertical' ? offsetHeight : underlineHeight
        });
      }
    }
  }, [activeTab, isMounted, showActiveIndicator, tabDirection, underlineHeight]);

  // Animation effect on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, tabId: string, disabled?: boolean) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      handleTabChange(tabId);
    } else if (tabDirection === 'horizontal' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      navigateWithArrowKeys(e.key === 'ArrowRight' ? 'next' : 'prev');
    } else if (tabDirection === 'vertical' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault();
      navigateWithArrowKeys(e.key === 'ArrowDown' ? 'next' : 'prev');
    }
  };

  // Arrow key navigation
  const navigateWithArrowKeys = (direction: 'next' | 'prev') => {
    const allTabs = tabsData.filter(tab => !tab.hidden && !tab.disabled);
    const currentIndex = allTabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex === -1) return;

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0) nextIndex = allTabs.length - 1;
    if (nextIndex >= allTabs.length) nextIndex = 0;

    handleTabChange(allTabs[nextIndex].id);
  };

  // Apply background theme
  const getThemeClass = () => {
    if (theme === 'dark') {
      return 'bg-gray-800 text-white';
    }
    return 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white';
  };

  // Get style based on appearance
  const getAppearanceClass = () => {
    switch (appearance) {
      case 'elevated':
        return 'shadow-md bg-white dark:bg-gray-800';
      case 'filled':
        return 'bg-gray-100 dark:bg-gray-700';
      case 'subtle':
        return 'bg-gray-50 dark:bg-gray-900';
      case 'outlined':
        return 'border border-gray-200 dark:border-gray-700';
      case 'minimal':
      default:
        return '';
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'text-xs py-1 px-2';
      case 'sm':
        return 'text-xs py-1.5 px-3';
      case 'lg':
        return 'text-sm py-2.5 px-4';
      case 'xl':
        return 'text-base py-3 px-5';
      case 'md':
      default:
        return 'text-xs py-2 px-3';
    }
  };

  // Get motion variants based on selected preset
  const getMotionVariants = () => {
    switch (motionPreset) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'bounce':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 10 } }
        };
      case 'slide':
      default:
        return {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  // Calculate hover effect classes
  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case 'elevate':
        return 'hover:shadow-md hover:translate-y-[-1px]';
      case 'glow':
        return 'hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]';
      case 'tint':
      default:
        return 'hover:bg-gray-100 dark:hover:bg-gray-700';
    }
  };

  // Get strength of highlight
  const getHighlightStrengthClass = () => {
    switch (highlightStrength) {
      case 'light':
        return 'hover:bg-opacity-30 dark:hover:bg-opacity-20';
      case 'strong':
        return 'hover:bg-opacity-80 dark:hover:bg-opacity-60';
      case 'medium':
      default:
        return 'hover:bg-opacity-50 dark:hover:bg-opacity-40';
    }
  };

  // Get indicator style
  const getIndicatorStyleClass = () => {
    if (!showActiveIndicator) return '';
    
    switch (indicatorStyle) {
      case 'filled':
        return 'data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20';
      case 'pill':
        return 'data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:rounded-full';
      case 'dot':
        return 'before:absolute before:bottom-1 before:left-1/2 before:transform before:-translate-x-1/2 before:w-1 before:h-1 before:rounded-full before:bg-current data-[state=active]:before:opacity-100 before:opacity-0';
      case 'line':
      default:
        return '';
    }
  };

  // Main TabsList className construction
  const tabsListClass = `
    relative
    ${getThemeClass()}
    ${getAppearanceClass()}
    ${scrollable ? 'overflow-x-auto scrollbar-thin' : 'overflow-hidden'}
    ${tabDirection === 'vertical' ? 'flex-col' : 'flex-row'}
    ${fullWidth ? 'w-full' : 'w-auto'}
    flex 
    border-${tabDirection === 'vertical' ? 'r' : 'b'} 
    border-[#eaeaea] dark:border-gray-700
    ${roundedCorners ? 'rounded-lg' : 'rounded-none'} 
    ${isMounted && initialAnimation ? 'opacity-100' : 'opacity-0'}
    transition-all duration-300
    ${className}
  `;

  // Base className for TabsTrigger
  const baseTabClass = `
    relative
    ${equalWidth && tabDirection === 'horizontal' ? 'flex-1' : ''}
    ${tabDirection === 'vertical' ? 'justify-start text-left' : 'justify-center text-center'} 
    flex 
    items-center 
    gap-2
    ${getSizeClasses()}
    ${dense ? 'leading-none' : 'leading-relaxed'}
    font-medium 
    ${getIndicatorStyleClass()}
    rounded-${roundedCorners ? (size === 'sm' || size === 'xs' ? 'md' : 'lg') : 'none'} 
    data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-gray-400
    transition-all 
    duration-300 
    ease-in-out 
    ${getHoverEffectClass()}
    ${getHighlightStrengthClass()}
    ${activeTabShadow ? 'data-[state=active]:shadow-md' : ''}
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-blue-500
    focus-visible:ring-offset-2
    group
  `;

  const renderTabContent = (tab: TabItem) => {
    const iconComponent = tab.icon && (
      <span className={`transition-all duration-300 ease-in-out
        ${showIconsOnly ? 'h-5 w-5' : 'h-4 w-4'} 
        ${showIconsOnly ? 'mr-0' : iconPosition === 'left' ? 'mr-1.5' : iconPosition === 'right' ? 'ml-1.5 order-last' : 'mb-1'}
        ${iconPosition === 'top' ? 'block' : 'inline-block'}
        ${tab.status ? getStatusStyles(tab.status) : ''}
        ${tab.accentColor ? `text-[${tab.accentColor}]` : ''}
      `}>
        {tab.icon}
      </span>
    );
    
    return (
      <>
        {/* Display icon based on position */}
        {tab.icon && (iconPosition === 'left' || iconPosition === 'top' || showIconsOnly) && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {iconComponent}
          </motion.div>
        )}
        
        {/* Hide labels on small screens if showIconsOnly is true */}
        {(!showIconsOnly || (showIconsOnly && window.innerWidth > 640)) && (
          <div className={`${iconPosition === 'top' ? 'text-center' : ''} ${tab.description ? 'flex flex-col items-start' : ''}`}>
            <span>{tab.label}</span>
            {tab.description && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">{tab.description}</span>
            )}
          </div>
        )}
        
        {/* Display icon if position is right */}
        {tab.icon && iconPosition === 'right' && !showIconsOnly && iconComponent}
        
        {/* Badge counter */}
        {showBadges && tab.badgeCount && tab.badgeCount > 0 && (
          <Badge 
            className={`ml-1 ${tab.status ? getStatusStyles(tab.status) : 'bg-blue-500 text-white'} text-xs px-1.5 rounded-full`}
          >
            {tab.badgeCount > 99 ? '99+' : tab.badgeCount}
          </Badge>
        )}
        
        {/* Trailing icon (e.g. for additional actions) */}
        {tab.trailingIcon && (
          <span className="ml-1.5">{tab.trailingIcon}</span>
        )}
        
        {/* Display keyboard shortcut if available */}
        {tab.shortcutKey && (
          <kbd className="hidden sm:inline-flex ml-1.5 px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded">
            {tab.shortcutKey}
          </kbd>
        )}
      </>
    );
  };

  return (
    <div className="w-full" ref={containerRef}>
      {/* Render each group with label */}
      {Object.entries(groupedTabs).map(([groupKey, groupTabs]) => (
        <div key={groupKey} className="mb-4 last:mb-0">
          {/* Group label if available */}
          {groupLabels[groupKey] && (
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-1">
              {groupLabels[groupKey]}
            </div>
          )}
          
          {/* Tabs list */}
          <TabsList className={tabsListClass} data-testid="tab-navigation">
            {/* Animated indicator */}
            {showActiveIndicator && isMounted && indicatorStyle === 'line' && (
              <motion.div
                className="absolute bg-blue-500 dark:bg-blue-400 z-10 pointer-events-none"
                style={{
                  left: tabDirection === 'horizontal' ? indicatorProps.left : undefined,
                  width: tabDirection === 'horizontal' ? indicatorProps.width : underlineHeight,
                  top: indicatorProps.top,
                  height: indicatorProps.height,
                  right: tabDirection === 'vertical' ? 0 : undefined,
                }}
                initial={false}
                animate={{
                  left: tabDirection === 'horizontal' ? indicatorProps.left : undefined,
                  width: tabDirection === 'horizontal' ? indicatorProps.width : underlineHeight,
                  top: indicatorProps.top,
                  height: indicatorProps.height,
                }}
                transition={{
                  type: indicatorAnimation === 'grow' ? 'spring' : 'tween',
                  stiffness: 500,
                  damping: 30,
                  duration: 0.2
                }}
              />
            )}
            
            {/* Render tabs */}
            <AnimatePresence>
              {groupTabs.map((tab) => {
                // Tab element
                const tabElement = (
                  <motion.div
                    key={tab.id}
                    variants={initialAnimation ? getMotionVariants() : undefined}
                    initial={initialAnimation ? "hidden" : "visible"}
                    animate="visible"
                    transition={{ duration: 0.3, delay: tabsData.findIndex(t => t.id === tab.id) * 0.05 }}
                    className={tabDirection === 'vertical' ? 'w-full' : ''}
                  >
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      disabled={!allowDisabledTabs && tab.disabled}
                      data-disabled={tab.disabled}
                      data-state={activeTab === tab.id ? 'active' : 'inactive'}
                      data-testid={tab.testId || `tab-${tab.id}`}
                      className={`${baseTabClass} ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        ${tab.accentColor ? `data-[state=active]:text-[${tab.accentColor}] data-[state=active]:border-[${tab.accentColor}]` : 'data-[state=active]:text-blue-500 data-[state=active]:border-blue-500'}`}
                      onClick={() => !tab.disabled && handleTabChange(tab.id)}
                      onMouseEnter={() => onTabHover && onTabHover(tab.id)}
                      onKeyDown={(e) => handleKeyDown(e, tab.id, tab.disabled)}
                      tabIndex={tab.disabled ? -1 : 0}
                      aria-disabled={tab.disabled}
                      ref={(el) => {
                        if (el) tabsRef.current.set(tab.id, el);
                      }}
                    >
                      {renderTabContent(tab)}
                    </TabsTrigger>
                  </motion.div>
                );

                // Return with or without tooltip
                return showTooltips && tab.tooltip ? (
                  <TooltipProvider key={tab.id}>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        {tabElement}
                      </TooltipTrigger>
                      <TooltipContent 
                        className="px-3 py-1.5 text-sm bg-gray-800 text-white dark:bg-white dark:text-gray-800"
                        side={tabDirection === 'vertical' ? 'right' : 'bottom'}
                      >
                        <p>{tab.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : tabElement;
              })}
            </AnimatePresence>
          </TabsList>
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;