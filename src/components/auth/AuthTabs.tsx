
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
  onSubmit?: (e: React.FormEvent) => void;
  step: number; // Add step property
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
  setFullName,
  onSubmit,
  step
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

  // Only show forms in the tabs during step 1
  const showFormsInTabs = step === 1;

  return (
    <div className="mb-4">
      <TabDivider />

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabNavigation 
          activeTab={activeTab} 
          handleTabChange={handleTabChange} 
          showTooltips={true}
          animationStyle="grow"
        />
        <TabContent 
          activeTab={activeTab} 
          tabTransition={tabTransition} 
          email={email} 
          setEmail={setEmail} 
          phone={phone} 
          setPhone={setPhone} 
          countryCode={countryCode} 
          setCountryCode={setCountryCode}
          onSubmit={onSubmit}
          showForms={showFormsInTabs}
        />
      </Tabs>

      {isSignUp && <FullNameField fullName={fullName} setFullName={setFullName} />}
    </div>
  );
};

export default AuthTabs;
