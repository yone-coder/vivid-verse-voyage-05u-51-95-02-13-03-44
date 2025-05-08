import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, KeyRound } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, handleTabChange }: TabNavigationProps) => {
  return (
    <TabsList className="flex w-full bg-transparent p-0 h-auto border-b border-[#eaeaea] rounded-none">
      {[
        { key: 'email', icon: Mail, label: 'Email' },
        { key: 'phone', icon: Phone, label: 'Phone' },
        { key: 'passkey', icon: KeyRound, label: 'Passkey' }
      ].map(({ key, icon: Icon, label }) => (
        <TabsTrigger
          key={key}
          value={key}
          onClick={() => handleTabChange(key)}
          className="group relative flex-1 flex items-center justify-center text-xs font-medium py-2 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:text-gray-500 data-[state=inactive]:border-transparent transition-all duration-300 ease-in-out hover:bg-gray-50 rounded-none"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Background Circle */}
            <div className="absolute inset-0 rounded-full bg-[#ff4747]/10 scale-0 group-data-[state=active]:scale-100 transition-transform duration-300 ease-out" />
            {/* Glow Effect */}
            <Icon
              className="h-4 w-4 text-current transition-all duration-300 ease-in-out group-data-[state=active]:scale-110 group-hover:rotate-[-5deg] group-data-[state=active]:drop-shadow-[0_0_6px_#ff4747]"
            />
          </div>
          <span className="ml-1.5 transition-all duration-300 ease-in-out group-data-[state=active]:font-medium group-hover:tracking-wide">
            {label}
          </span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabNavigation;