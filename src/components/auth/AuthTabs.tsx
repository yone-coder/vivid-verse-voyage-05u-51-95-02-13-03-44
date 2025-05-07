import React, { useState } from 'react';
import { Tabs } from "@/components/ui/tabs";
import { Mail, Phone, KeyRound } from 'lucide-react';
import TabDivider from './TabDivider';
import TabNavigation from './TabNavigation';
import TabContent from './TabContent';
import FullNameField from './FullNameField';

interface AuthTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  isSignUp: boolean;
  fullName: string;
  setFullName: (name: string) => void;
}

const AuthTabs = ({ 
  activeTab, 
  setActiveTab, 
  email, 
  setEmail, 
  phone, 
  setPhone, 
  countryCode, 
  setCountryCode,
  isSignUp,
  fullName,
  setFullName
}: AuthTabsProps) => {
  const [tabTransition, setTabTransition] = useState(false);

  // Handle tab switching with animation
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;

    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTabTransition(false);
    }, 150);
  };

  return (
    <div className="mb-4">
      <TabDivider />

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabNavigation
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          showTooltips={true}
          showBadges={true}
          tabDirection="horizontal"
          size="md"
          accentColor="#0066cc"
          animationStyle="bounce"
          tabsData={[
            {
              id: 'email',
              label: 'Email',
              icon: <Mail className="h-3.5 w-3.5 mr-1.5" />,
              tooltip: 'Sign in with email',
              badgeCount: 2
            },
            {
              id: 'phone',
              label: 'Phone',
              icon: <Phone className="h-3.5 w-3.5 mr-1.5" />,
              tooltip: 'Sign in with phone',
              badgeCount: 0
            },
            {
              id: 'passkey',
              label: 'Passkey',
              icon: <KeyRound className="h-3.5 w-3.5 mr-1.5" />,
              tooltip: 'Use passkey',
              disabled: true
            }
          ]}
        />
      </Tabs>

      {isSignUp && <FullNameField fullName={fullName} setFullName={setFullName} />}
    </div>
  );
};

export default AuthTabs;