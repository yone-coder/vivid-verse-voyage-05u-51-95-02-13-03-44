
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Key, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TabNavigationProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  showTooltips?: boolean;
  animationStyle?: 'slide' | 'fade' | 'grow';
}

const TabNavigation = ({
  activeTab,
  handleTabChange,
  showTooltips = false,
  animationStyle = 'slide'
}: TabNavigationProps) => {
  const tabs = [
    { id: "email", label: "Email", icon: <Mail className="h-4 w-4" />, tooltip: "Sign in with email" },
    { id: "phone", label: "Phone", icon: <Phone className="h-4 w-4" />, tooltip: "Sign in with phone number" },
    { id: "passkey", label: "Passkey", icon: <Key className="h-4 w-4" />, tooltip: "Sign in with passkey" },
  ];

  // Animation classes based on style
  const getAnimationClass = () => {
    switch (animationStyle) {
      case 'fade':
        return 'transition-opacity duration-200';
      case 'grow':
        return 'transition-all duration-200 origin-center';
      case 'slide':
      default:
        return 'transition-transform duration-200';
    }
  };

  const renderTabContent = (tab: typeof tabs[0]) => (
    <>
      <span className="sr-only">{tab.label}</span>
      {tab.icon}
    </>
  );

  return (
    <TabsList className="my-3 grid grid-cols-3 h-14">
      {tabs.map((tab) => showTooltips ? (
        <TooltipProvider key={tab.id}>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <TabsTrigger
                value={tab.id}
                className={`flex items-center justify-center data-[state=active]:bg-primary/10 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none ${
                  getAnimationClass()
                } ${
                  animationStyle === 'grow' && activeTab === tab.id
                    ? 'scale-105'
                    : ''
                }`}
              >
                {renderTabContent(tab)}
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tab.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TabsTrigger
          key={tab.id}
          value={tab.id}
          className={`flex items-center justify-center data-[state=active]:bg-primary/10 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none ${
            getAnimationClass()
          } ${
            animationStyle === 'grow' && activeTab === tab.id
              ? 'scale-105'
              : ''
          }`}
        >
          {renderTabContent(tab)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabNavigation;
