
import { Smartphone, Mail } from 'lucide-react';

interface LoginTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
}

export function LoginTabs({ activeTab, setActiveTab, theme }: LoginTabsProps) {
  return (
    <div className={`flex w-full mt-2 border-b ${theme === 'dark' ? 'border-gray-700' : ''}`}>  
      <button  
        onClick={() => setActiveTab('email')}  
        className={`pb-2 px-3 text-sm font-medium transition-all relative ${  
          activeTab === 'email'  
            ? theme === 'dark' ? 'text-blue-500' : 'text-orange-500'
            : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
        }`}  
      >  
        <Mail className="h-4 w-4 inline mr-2" />
        Email  
        {activeTab === 'email' && (  
          <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-t-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-orange-500'}`}></span>  
        )}  
      </button>  
      <button  
        onClick={() => setActiveTab('phone')}  
        className={`pb-2 px-3 text-sm font-medium transition-all relative ${  
          activeTab === 'phone'  
            ? theme === 'dark' ? 'text-blue-500' : 'text-orange-500'
            : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
        }`}  
      >  
        <Smartphone className="h-4 w-4 inline mr-2" />
        Phone  
        {activeTab === 'phone' && (  
          <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-t-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-orange-500'}`}></span>  
        )}  
      </button>  
    </div>
  );
}
