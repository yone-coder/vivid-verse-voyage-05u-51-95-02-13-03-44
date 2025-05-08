
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import EmailTab from './EmailTab';
import PhoneTab from './PhoneTab';
import PasskeyTab from './PasskeyTab';

interface TabContentProps {
  activeTab: string;
  tabTransition: boolean;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showForms: boolean; // Add a new property to control form visibility
  showInlineButtons?: boolean; // New prop to control whether to show buttons in tabs
  isSignUp?: boolean; // Add isSignUp property
}

const TabContent = ({ 
  activeTab, 
  tabTransition, 
  email, 
  setEmail, 
  phone, 
  setPhone, 
  countryCode, 
  setCountryCode,
  onSubmit,
  showForms,
  showInlineButtons = false, // Default to not showing inline buttons
  isSignUp = false
}: TabContentProps) => {
  return (
    <div className={`transition-all duration-200 ${tabTransition ? 'opacity-0 transform -translate-y-1' : 'opacity-100 transform translate-y-0'}`}>
      <TabsContent value="email" className="pt-3 mb-0">
        <EmailTab 
          email={email} 
          setEmail={setEmail} 
          onSubmit={showForms ? onSubmit : undefined} 
          showSubmitButton={showInlineButtons} 
        />
      </TabsContent>
      <TabsContent value="phone" className="pt-3 mb-0">
        <PhoneTab 
          phone={phone} 
          setPhone={setPhone} 
          countryCode={countryCode} 
          setCountryCode={setCountryCode} 
          onSubmit={showForms ? onSubmit : undefined}
          showSubmitButton={showInlineButtons}
        />
      </TabsContent>
      <TabsContent value="passkey" className="pt-3 mb-0">
        <PasskeyTab 
          onSubmit={showForms ? onSubmit : undefined} 
          showSubmitButton={showInlineButtons} 
        />
      </TabsContent>
    </div>
  );
};

export default TabContent;
