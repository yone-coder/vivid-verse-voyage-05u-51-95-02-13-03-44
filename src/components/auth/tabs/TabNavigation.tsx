
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, KeyRound } from 'lucide-react';

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
  return (
    <TabsList className="grid grid-cols-3 mb-4 shadow-sm">
      <TabsTrigger 
        value="email" 
        onClick={() => handleTabChange('email')}
        className="flex items-center gap-1.5 data-[state=active]:text-[#ff4747] data-[state=active]:shadow-sm"
      >
        <Mail className="h-4 w-4" />
        <span>Email</span>
      </TabsTrigger>
      <TabsTrigger 
        value="phone" 
        onClick={() => handleTabChange('phone')}
        className="flex items-center gap-1.5 data-[state=active]:text-[#ff4747] data-[state=active]:shadow-sm"
      >
        <Phone className="h-4 w-4" />
        <span>Phone</span>
      </TabsTrigger>
      <TabsTrigger 
        value="passkey" 
        onClick={() => handleTabChange('passkey')}
        className="flex items-center gap-1.5 data-[state=active]:text-[#ff4747] data-[state=active]:shadow-sm"
      >
        <KeyRound className="h-4 w-4" />
        <span>Passkey</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
