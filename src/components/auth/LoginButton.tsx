
import { ArrowRight } from 'lucide-react';

interface LoginButtonProps {
  isLoading: boolean;
  primaryColorClasses: string;
}

export function LoginButton({ isLoading, primaryColorClasses }: LoginButtonProps) {
  return (
    <button  
      type="submit"  
      disabled={isLoading}  
      className={`w-full flex items-center justify-center font-medium py-3 px-4 rounded-lg transition-all relative overflow-hidden ${primaryColorClasses} focus:outline-none focus:ring-2 focus:ring-offset-2`}  
    >  
      <span className={`flex items-center transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>  
        Sign in  
        <ArrowRight className="ml-2 h-4 w-4" />  
      </span>  
        
      {isLoading && (  
        <span className="absolute inset-0 flex items-center justify-center">  
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">  
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>  
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>  
          </svg>  
        </span>  
      )}  
    </button>
  );
}
