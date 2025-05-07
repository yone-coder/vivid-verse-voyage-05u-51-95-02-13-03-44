
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, KeyRound } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, handleTabChange }: TabNavigationProps) => {
  return (
    <TabsList className="flex w-full bg-transparent p-0 h-auto border-b border-[#eaeaea]">  
      <TabsTrigger 
        value="email" 
        className="flex-1 flex items-center justify-center text-xs font-medium py-2 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:border-transparent rounded-none data-[state=inactive]:text-gray-500 transition-all hover:bg-gray-50"
        onClick={() => handleTabChange('email')}
      >  
        <Mail className="h-3.5 w-3.5 mr-1.5" />  
        <span>Email</span>
      </TabsTrigger>  
      <TabsTrigger 
        value="phone" 
        className="flex-1 flex items-center justify-center text-xs font-medium py-2 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:border-transparent rounded-none data-[state=inactive]:text-gray-500 transition-all hover:bg-gray-50"
        onClick={() => handleTabChange('phone')}
      >  
        <Phone className="h-3.5 w-3.5 mr-1.5" />  
        <span>Phone</span>
      </TabsTrigger>  
      <TabsTrigger 
        value="passkey" 
        className="flex-1 flex items-center justify-center text-xs font-medium py-2 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:border-transparent rounded-none data-[state=inactive]:text-gray-500 transition-all hover:bg-gray-50"
        onClick={() => handleTabChange('passkey')}
      >  
        <KeyRound className="h-3.5 w-3.5 mr-1.5" />  
        <span>Passkey</span>
      </TabsTrigger>  
    </TabsList>
  );
};

export default TabNavigation;
