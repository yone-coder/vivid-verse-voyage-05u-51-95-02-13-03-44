
import { ChevronRight, Shield } from 'lucide-react';

interface RegistrationLinkProps {
  theme: string;
  showSecurityTips: boolean;
  setShowSecurityTips: (show: boolean) => void;
}

export function RegistrationLink({ theme, showSecurityTips, setShowSecurityTips }: RegistrationLinkProps) {
  return (
    <div className={`py-4 flex items-center justify-between w-full ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
    }`}>  
      <div className="flex items-center">
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Don't have an account?</p>  
        <a className={`ml-2 inline-flex items-center text-sm font-medium cursor-pointer group ${
          theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-orange-500 hover:text-orange-600'
        } transition-colors`}>  
          Register now  
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />  
        </a>  
      </div>
      <button 
        onClick={() => setShowSecurityTips(!showSecurityTips)} 
        className={`flex items-center text-sm ${
          theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-orange-500 hover:text-orange-600'
        }`}
      >
        <Shield className="h-4 w-4 mr-1" /> Security tips
      </button>
    </div>
  );
}
