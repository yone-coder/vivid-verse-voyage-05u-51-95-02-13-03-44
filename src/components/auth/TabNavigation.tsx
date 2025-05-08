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
          className="group flex-1 flex items-center justify-center text-xs font-medium py-2 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:text-gray-500 data-[state=inactive]:border-transparent transition-all duration-300 ease-in-out hover:bg-gray-50 rounded-none"
        >
          <Icon
            className="h-3.5 w-3.5 mr-1.5 fill-none group-data-[state=active]:fill-[#ff4747] stroke-current text-current transition-all duration-300 ease-in-out transform group-data-[state=active]:scale-110 group-data-[state=active]:translate-y-[-1px] group-hover:rotate-[-5deg]"
          />
          <span className="transition-all duration-300 ease-in-out group-data-[state=active]:font-medium group-hover:tracking-wide">
            {label}
          </span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabNavigation;