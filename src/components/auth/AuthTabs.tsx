
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mail, Smartphone, KeyRound } from 'lucide-react';
import EmailTab from './EmailTab';
import PhoneTab from './PhoneTab';
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
      <div className="flex items-center my-2">
        <div className="flex-grow border-t border-[#eaeaea]"></div>
        <span className="px-3 text-xs text-[#999] font-medium">OR</span>
        <div className="flex-grow border-t border-[#eaeaea]"></div>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="flex w-full bg-transparent p-0 h-auto">  
          <TabsTrigger 
            value="email" 
            className="flex-1 flex items-center justify-center text-sm py-3 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:border-transparent rounded-none data-[state=inactive]:text-gray-500 transition-all"
          >  
            <Mail className="h-5 w-5 mr-2 data-[state=active]:text-[#ff4747]" />  
            Email  
          </TabsTrigger>  
          <TabsTrigger 
            value="phone" 
            className="flex-1 flex items-center justify-center text-sm py-3 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:border-transparent rounded-none data-[state=inactive]:text-gray-500 transition-all"
          >  
            <Smartphone className="h-5 w-5 mr-2" />  
            Phone  
          </TabsTrigger>  
          <TabsTrigger 
            value="passkey" 
            className="flex-1 flex items-center justify-center text-sm py-3 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:border-transparent rounded-none data-[state=inactive]:text-gray-500 transition-all"
          >  
            <KeyRound className="h-5 w-5 mr-2" />  
            Passkey  
          </TabsTrigger>  
        </TabsList>
        <div className={`transition-opacity duration-150 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
          <TabsContent value="email" className="pt-4 mb-0">
            <EmailTab email={email} setEmail={setEmail} />
          </TabsContent>
          <TabsContent value="phone" className="pt-4 mb-0">
            <PhoneTab 
              phone={phone} 
              setPhone={setPhone} 
              countryCode={countryCode} 
              setCountryCode={setCountryCode} 
            />
          </TabsContent>
          <TabsContent value="passkey" className="pt-4 mb-0">
            <div className="text-center p-4">
              <KeyRound className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-600">Use a security key or biometric authentication</p>
              <button className="mt-4 px-6 py-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                Continue with Passkey
              </button>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {isSignUp && <FullNameField fullName={fullName} setFullName={setFullName} />}
    </div>
  );
};

export default AuthTabs;
