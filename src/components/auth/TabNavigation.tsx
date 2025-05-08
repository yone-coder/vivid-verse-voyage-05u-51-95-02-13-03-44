import React, { useRef, useEffect, useState } from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabNavigationProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, handleTabChange }: TabNavigationProps) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const [showUnderline, setShowUnderline] = useState(true);

  const tabs = [
    { key: 'email', icon: Mail, label: 'Email' },
    { key: 'phone', icon: Phone, label: 'Phone' },
    { key: 'passkey', icon: KeyRound, label: 'Passkey' },
  ];

  useEffect(() => {
    const index = tabs.findIndex(tab => tab.key === activeTab);
    const el = tabsRef.current[index];
    if (el) {
      // Start exit animation
      setShowUnderline(false);

      // Wait for exit to finish, then reposition and grow underline
      setTimeout(() => {
        setUnderline({
          left: el.offsetLeft,
          width: el.offsetWidth,
        });
        setShowUnderline(true);
      }, 200); // exit duration
    }
  }, [activeTab]);

  return (
    <div className="relative">
      <TabsList className="flex w-full bg-transparent p-0 h-auto border-b border-[#eaeaea] rounded-none relative">
        {tabs.map(({ key, icon: Icon, label }, i) => {
          const isActive = key === activeTab;

          return (
            <TabsTrigger
              key={key}
              value={key}
              onClick={() => handleTabChange(key)}
              ref={(el) => (tabsRef.current[i] = el)}
              className="group relative flex-1 flex items-center justify-center text-xs font-medium py-2 border-b-2 border-transparent data-[state=inactive]:text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-50 rounded-none"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#ff4747]/10 scale-0 group-data-[state=active]:scale-100 transition-transform duration-300 ease-out" />
                <Icon
                  className="h-4 w-4 text-current transition-transform duration-300 ease-in-out group-data-[state=active]:scale-110 group-data-[state=active]:drop-shadow-[0_0_6px_#ff4747]"
                />
              </div>
              <span className="ml-1.5 transition-all duration-300 ease-in-out group-data-[state=active]:font-medium group-hover:tracking-wide">
                {label}
              </span>
            </TabsTrigger>
          );
        })}

        {/* Exit and Entry Underline Animation */}
        <motion.div
          className="absolute bottom-0 h-[2px] bg-[#ff4747] origin-left"
          key={showUnderline ? 'grow' : 'shrink'}
          initial={{ scaleX: showUnderline ? 0 : 1 }}
          animate={{ scaleX: showUnderline ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{
            left: underline.left,
            width: underline.width,
            transformOrigin: 'left center',
          }}
        />
      </TabsList>
    </div>
  );
};

export default TabNavigation;