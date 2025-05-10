
import React, { useState, useCallback, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TabNavigation from './TabNavigation';
import EmailTab from './EmailTab';
import PhoneTab from './PhoneTab';
import PasskeyTab from './PasskeyTab';

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
  onSubmit?: (e: React.FormEvent) => void;
  step: number;
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
  onSubmit,
  step
}: AuthTabsProps) => {
  const [tabTransition, setTabTransition] = useState(false);
  // Add a key state to force re-render of tabs when switching
  const [tabKey, setTabKey] = useState(Date.now());

  // Handle tab switching with animation - use useCallback to prevent recreating this function on each render
  const handleTabChange = useCallback((tab: string) => {
    if (tab === activeTab) return;

    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(tab);
      // Generate a new key to force tab content to unmount/remount
      setTabKey(Date.now());
      setTabTransition(false);
    }, 150);
  }, [activeTab, setActiveTab]);

  // Only show forms in the tabs during step 1
  const showFormsInTabs = step === 1;
  const showInlineButtons = false;

  return (
    <div className="mb-4 flex flex-col items-center w-full max-w-md mx-auto">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabNavigation 
          activeTab={activeTab} 
          handleTabChange={handleTabChange} 
          showTooltips={true}
          animationStyle="grow"
        />
        
        <div className={`transition-all duration-200 w-full flex justify-center ${tabTransition ? 'opacity-0 transform -translate-y-1' : 'opacity-100 transform translate-y-0'}`}>
          <TabsContent value="email" className="pt-3 mb-0 w-full">
            <EmailTab 
              email={email} 
              setEmail={setEmail} 
              onSubmit={showFormsInTabs ? onSubmit : undefined} 
              showSubmitButton={showInlineButtons} 
              key={`email-tab-${tabKey}-${activeTab === 'email'}`}
            />
          </TabsContent>
          <TabsContent value="phone" className="pt-3 mb-0 w-full">
            <PhoneTab 
              phone={phone} 
              setPhone={setPhone} 
              countryCode={countryCode} 
              setCountryCode={setCountryCode} 
              onSubmit={showFormsInTabs ? onSubmit : undefined}
              showSubmitButton={showInlineButtons}
              key={`phone-tab-${tabKey}-${activeTab === 'phone'}`}
            />
          </TabsContent>
          <TabsContent value="passkey" className="pt-3 mb-0 w-full">
            <PasskeyTab 
              onSubmit={showFormsInTabs ? onSubmit : undefined} 
              showSubmitButton={showInlineButtons}
              key={`passkey-tab-${tabKey}-${activeTab === 'passkey'}`}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AuthTabs;
