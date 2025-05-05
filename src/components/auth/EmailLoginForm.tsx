
import { Mail } from 'lucide-react';

interface EmailLoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  theme: string;
}

export function EmailLoginForm({ email, setEmail, theme }: EmailLoginFormProps) {
  return (
    <div className="mb-4">  
      <div className="relative group">  
        <Mail className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-orange-500'} transition-colors`} />  
        <input  
          type="email"  
          value={email}  
          onChange={(e) => setEmail(e.target.value)}  
          placeholder="Email address"  
          className={`w-full pl-10 pr-3 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 ${
            theme === 'dark' 
              ? 'bg-gray-800 focus:ring-blue-500 focus:bg-gray-700 border border-gray-700 focus:border-blue-500 text-white' 
              : 'bg-gray-50 focus:ring-orange-500 focus:bg-white border border-transparent focus:border-orange-500'
          } transition-all`}
          required  
        />  
      </div>  
    </div>
  );
}
