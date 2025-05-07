import React, { useState } from 'react';
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
        <TabsList className="flex w-full bg-transparent p-0 h-auto border-b border-[#eaeaea]">  
          <TabsTrigger 
            value="email" 
            className="flex-1 flex items-center justify-center text-xs font-medium py-2 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:border-transparent rounded-none data-[state=inactive]:text-gray-500 transition-all hover:bg-gray-50"
          >  
            <Mail className="h-3.5 w-3.5 mr-1.5" />  
            <span>Email</span>
          </TabsTrigger>  
          <TabsTrigger 
            value="phone" 
            className="flex-1 flex items-center justify-center text-xs font-medium py-2 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:border-transparent rounded-none data-[state=inactive]:text-gray-500 transition-all hover:bg-gray-50"
          >  
            <Smartphone className="h-3.5 w-3.5 mr-1.5" />  
            <span>Phone</span>
          </TabsTrigger>  
          <TabsTrigger 
            value="passkey" 
            className="flex-1 flex items-center justify-center text-xs font-medium py-2 border-b-2 data-[state=active]:border-[#ff4747] data-[state=active]:text-[#ff4747] data-[state=inactive]:border-transparent rounded-none data-[state=inactive]:text-gray-500 transition-all hover:bg-gray-50"
          >  
            <KeyRound className="h-3.5 w-3.5 mr-1.5" />  
            <span>Passkey</span>
          </TabsTrigger>  
        </TabsList>
        <div className={`transition-all duration-200 ${tabTransition ? 'opacity-0 transform -translate-y-1' : 'opacity-100 transform translate-y-0'}`}>
          <TabsContent value="email" className="pt-3 mb-0">
            <EmailTab email={email} setEmail={setEmail} />
          </TabsContent>
          <TabsContent value="phone" className="pt-3 mb-0">
            <PhoneTab 
              phone={phone} 
              setPhone={setPhone} 
              countryCode={countryCode} 
              setCountryCode={setCountryCode} 
            />
          </TabsContent>
          <TabsContent value="passkey" className="pt-3 mb-0">
            <div className="text-center py-3">
              <KeyRound className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p className="text-xs text-gray-600">Use a security key or biometric authentication</p>
              <button className="mt-3 px-5 py-1.5 bg-gray-100 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
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