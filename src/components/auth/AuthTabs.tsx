
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mail, Smartphone } from 'lucide-react';
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
  return (
    <div className="mb-4">
      <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full bg-[#f5f5f5]">  
          <TabsTrigger value="email" className="flex items-center justify-center data-[state=active]:bg-white data-[state=active]:text-[#ff4747]">  
            <Mail className="h-4 w-4 mr-2" />  
            Email  
          </TabsTrigger>  
          <TabsTrigger value="phone" className="flex items-center justify-center data-[state=active]:bg-white data-[state=active]:text-[#ff4747]">  
            <Smartphone className="h-4 w-4 mr-2" />  
            Phone  
          </TabsTrigger>  
        </TabsList>
        <TabsContent value="email" className="pt-4">
          <EmailTab email={email} setEmail={setEmail} />
        </TabsContent>
        <TabsContent value="phone" className="pt-4">
          <PhoneTab 
            phone={phone} 
            setPhone={setPhone} 
            countryCode={countryCode} 
            setCountryCode={setCountryCode} 
          />
        </TabsContent>
      </Tabs>

      {isSignUp && <FullNameField fullName={fullName} setFullName={setFullName} />}
    </div>
  );
};

export default AuthTabs;
