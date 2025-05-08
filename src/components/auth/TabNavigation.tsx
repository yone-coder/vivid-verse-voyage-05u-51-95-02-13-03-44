import React, { useRef, useEffect, useState } from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabNavigationProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, handleTabChange }: TabNavigationProps) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const tabs = [
    { key: 'email', icon: Mail, label: 'Email' },
    { key: 'phone', icon: Phone, label: 'Phone' },
    { key: 'passkey', icon: KeyRound, label: 'Passkey' },
  ];

  useEffect(() => {
    const index = tabs.findIndex(tab => tab.key === activeTab);
    const el = tabsRef.current[index];
    if (el) {
      setUnderlineStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
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
              <motion.div
                className="relative w-6 h-6 flex items-center justify-center"
                initial={false}
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Background Circle */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#ff4747]/10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Icon */}
                <Icon
                  className={`h-4 w-4 text-current transition-transform ${
                    isActive ? 'drop-shadow-[0_0_6px_#ff4747]' : ''
                  }`}
                />
              </motion.div>

              <motion.span
                className="ml-1.5"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.25 }}
              >
                {label}
              </motion.span>
            </TabsTrigger>
          );
        })}

        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 h-[2px] bg-[#ff4747] rounded-full"
          animate={{ left: underlineStyle.left, width: underlineStyle.width }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </TabsList>
    </div>
  );
};

export default TabNavigation;