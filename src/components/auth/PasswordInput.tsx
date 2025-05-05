
import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  theme: string;
}

export function PasswordInput({ password, setPassword, theme }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="mb-4 mt-4">  
      <div className="relative group">  
        <Lock className={`absolute left-3 top-3 h-5 w-5 ${
          theme === 'dark' 
            ? 'text-gray-500 group-focus-within:text-blue-400' 
            : 'text-gray-400 group-focus-within:text-orange-500'
        } transition-colors`} />  
        <input  
          type={showPassword ? "text" : "password"}  
          value={password}  
          onChange={(e) => setPassword(e.target.value)}  
          placeholder="Password"  
          className={`w-full pl-10 pr-10 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 ${
            theme === 'dark' 
              ? 'bg-gray-800 focus:ring-blue-500 focus:bg-gray-700 border border-gray-700 focus:border-blue-500 text-white' 
              : 'bg-gray-50 focus:ring-orange-500 focus:bg-white border border-transparent focus:border-orange-500'
          } transition-all`}  
          required  
        />  
        <button  
          type="button"  
          onClick={() => setShowPassword(!showPassword)}  
          className={`absolute right-3 top-3 ${
            theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
          } transition-colors`}  
        >  
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}  
        </button>  
      </div>  
    </div>
  );
}
