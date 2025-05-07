
import React, { useState } from 'react';
import { Tabs } from "@/components/ui/tabs";
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
        <TabNavigation activeTab={activeTab} handleTabChange={handleTabChange} />
        <TabContent 
          activeTab={activeTab} 
          tabTransition={tabTransition} 
          email={email} 
          setEmail={setEmail} 
          phone={phone} 
          setPhone={setPhone} 
          countryCode={countryCode} 
          setCountryCode={setCountryCode} 
        />
      </Tabs>

      {isSignUp && <FullNameField fullName={fullName} setFullName={setFullName} />}
    </div>
  );
};

export default AuthTabs;
