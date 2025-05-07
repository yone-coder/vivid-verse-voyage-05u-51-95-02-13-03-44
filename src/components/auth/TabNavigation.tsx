import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, KeyRound, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Assuming you have this utility function for class merging

// Tab item interface
export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  badgeCount?: number;
  tooltip?: string;
  testId?: string;
  ariaLabel?: string; // For improved accessibility
}

// Animation styles type
export type AnimationStyle = 'rotate' | 'bounce' | 'grow' | 'pulse' | 'slide' | 'none';

// Extended interface with more customization options
export interface TabNavigationProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  // Customization options
  tabsData?: TabItem[];
  accentColor?: string;
  showBadges?: boolean;
  showTooltips?: boolean;
  onTabHover?: (tab: string) => void;
  tabDirection?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  allowDisabledTabs?: boolean;
  className?: string;
  tabClassName?: string;
  animationStyle?: AnimationStyle;
  iconPosition?: 'left' | 'right' | 'top'; // New prop for icon position
  badge?: {
    variant?: 'default' | 'outline' | 'destructive';
    className?: string;
  };
  a11yLabel?: string; // Accessibility label for the tabs list
}

// Default tab data
const defaultTabsData: TabItem[] = [
  {
    id: 'email',
    label: 'Email',
    icon: <Mail className="h-4 w-4" />,
    tooltip: 'Sign in with email',
    badgeCount: 0,
    ariaLabel: 'Email tab'
  },
  {
    id: 'phone',
    label: 'Phone',
    icon: <Phone className="h-4 w-4" />,
    tooltip: 'Sign in with phone number',
    badgeCount: 0,
    ariaLabel: 'Phone tab'
  },
  {
    id: 'passkey',
    label: 'Passkey',
    icon: <KeyRound className="h-4 w-4" />,
    tooltip: 'Sign in with passkey',
    badgeCount: 0,
    ariaLabel: 'Passkey tab'
  }
];

const TabNavigation = ({
  activeTab,
  handleTabChange,
  tabsData = defaultTabsData,
  accentColor = "#0891b2", // More accessible color with better contrast
  showBadges = false,
  showTooltips = true, // Enable tooltips by default for better UX
  onTabHover,
  tabDirection = 'horizontal',
  size = 'md',
  allowDisabledTabs = false,
  className = '',
  tabClassName = '',
  animationStyle = 'slide',
  iconPosition = 'left',
  badge = { variant: 'destructive', className: '' },
  a11yLabel = 'Navigation tabs'
}: TabNavigationProps) => {
  // Track if component is mounted (for animations)
  const [isMounted, setIsMounted] = useState(false);
  
  // Custom CSS variable for the accent color
  const accentColorStyle = useMemo(() => ({
    '--tab-accent-color': accentColor
  } as React.CSSProperties), [accentColor]);

  // Animation effect on mount
  useEffect(() => {
    setIsMounted(true);
    
    // Clean up function
    return () => {
      // Any cleanup if needed
    };
  }, []);

  // Get animation class based on selected style
  const getAnimationClass = (isIcon = false): string => {
    if (isIcon) {
      switch (animationStyle) {
        case 'bounce':
          return 'group-hover:animate-bounce';
        case 'grow':
          return 'group-data-[state=active]:scale-125 group-hover:scale-110 transition-transform';
        case 'pulse':
          return 'group-hover:animate-pulse';
        case 'slide':
          return 'group-hover:translate-x-0.5 group-data-[state=active]:translate-x-1';
        case 'none':
          return '';
        case 'rotate':
        default:
          return 'group-hover:rotate-[-5deg]';
      }
    } else {
      // Text animations
      switch (animationStyle) {
        case 'slide':
          return 'group-hover:translate-x-0.5';
        case 'grow':
          return 'group-hover:tracking-wide';
        default:
          return '';
      }
    }
  };

  // Get size classes
  const getSizeClasses = (): string => {
    switch (size) {
      case 'xs':
        return 'text-xs py-1 gap-1';
      case 'sm':
        return 'text-xs py-1.5 gap-1.5';
      case 'lg':
        return 'text-sm py-3 gap-2.5';
      case 'md':
      default:
        return 'text-sm py-2 gap-2';
    }
  };

  // Get icon container classes based on position
  const getIconContainerClasses = (): string => {
    switch (iconPosition) {
      case 'right':
        return 'order-last';
      case 'top':
        return 'mb-1';
      case 'left':
      default:
        return '';
    }
  };

  // Main layout class for TabsList
  const tabsListClass = cn(
    'flex',
    tabDirection === 'vertical' ? 'flex-col' : 'w-full',
    'bg-white',
    'p-0',
    'h-auto',
    tabDirection === 'vertical' ? 'border-r border-gray-200' : 'border-b border-gray-200',
    'rounded-none',
    isMounted ? 'opacity-100' : 'opacity-0',
    'transition-all duration-300',
    className
  );

  // Render the tabs
  const renderTab = (tab: TabItem) => {
    // Create the layout based on icon position
    const layout = iconPosition === 'top'
      ? <div className="flex flex-col items-center">
          <span className={`transition-all duration-300 ${getAnimationClass(true)}`}>
            {tab.icon}
          </span>
          <span className={`transition-all duration-300 ${getAnimationClass()}`}>
            {tab.label}
          </span>
        </div>
      : <>
          {iconPosition !== 'right' && (
            <span className={`transition-all duration-200 ${getIconContainerClasses()} ${getAnimationClass(true)}`}>
              {tab.icon}
            </span>
          )}
          <span className={`transition-all duration-300 ${getAnimationClass()}`}>
            {tab.label}
          </span>
          {iconPosition === 'right' && (
            <span className={`transition-all duration-200 ${getIconContainerClasses()} ${getAnimationClass(true)}`}>
              {tab.icon}
            </span>
          )}
        </>;

    // Badge component if needed
    const badgeComponent = showBadges && tab.badgeCount && tab.badgeCount > 0 ? (
      <Badge 
        variant={badge.variant}
        className={cn(
          "ml-1 bg-red-500 hover:bg-red-600 text-white text-xs px-1.5 rounded-full transition-all", 
          badge.className
        )}
      >
        {tab.badgeCount > 99 ? '99+' : tab.badgeCount}
      </Badge>
    ) : null;

    // Base tab classes
    const baseTabClass = cn(
      tabDirection === 'vertical' ? 'justify-start px-3 w-full' : 'flex-1 justify-center',
      'flex',
      iconPosition === 'top' ? 'flex-col' : 'flex-row',
      'items-center',
      getSizeClasses(),
      'font-medium',
      tabDirection === 'vertical' ? 'border-r-2' : 'border-b-2',
      'data-[state=active]:border-[var(--tab-accent-color)]',
      'data-[state=active]:text-[var(--tab-accent-color)]',
      'data-[state=inactive]:border-transparent',
      'data-[state=inactive]:text-gray-600',
      'transition-all',
      'duration-200',
      'hover:bg-gray-50',
      'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--tab-accent-color)] focus:ring-opacity-50',
      'group',
      tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      tabClassName
    );

    // Tab content
    const tabContent = (
      <TabsTrigger
        key={tab.id}
        value={tab.id}
        disabled={!allowDisabledTabs && tab.disabled}
        data-disabled={tab.disabled}
        data-testid={tab.testId || `tab-${tab.id}`}
        className={baseTabClass}
        onClick={() => !tab.disabled && handleTabChange(tab.id)}
        onMouseEnter={() => onTabHover && !tab.disabled && onTabHover(tab.id)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !tab.disabled) {
            e.preventDefault();
            handleTabChange(tab.id);
          }
        }}
        tabIndex={tab.disabled ? -1 : 0}
        aria-disabled={tab.disabled}
        aria-label={tab.ariaLabel || tab.label}
      >
        {layout}
        {badgeComponent}
      </TabsTrigger>
    );

    // Return with or without tooltip
    return showTooltips && tab.tooltip ? (
      <TooltipProvider key={tab.id} delayDuration={300}>
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
  };

  return (
    <Tabs defaultValue={activeTab} style={accentColorStyle}>
      <TabsList 
        className={tabsListClass} 
        data-testid="tab-navigation"
        aria-label={a11yLabel}
        role="tablist"
      >
        {tabsData.map(renderTab)}
      </TabsList>
    </Tabs>
  );
};

export default TabNavigation;